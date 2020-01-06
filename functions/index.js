// new method for speed: https://github.com/puppeteer/puppeteer/issues/3120

const functions = require('firebase-functions');
const chromium = require('chrome-aws-lambda');
const fetch = require('node-fetch');
const request = require('request');
const cors = require('cors')({ origin: true });
require('dotenv').config();

function pause(time = 3000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

function prefixHttps(url) {
  return url.includes('://')
    ? `https://${url.split('://')[1].trim()}`
    : `https://${url.trim()}`;
}

function prefixHttp(url) {
  return url.includes('://')
    ? `http://${url.split('://')[1].trim()}`
    : `http://${url.trim()}`;
}

function getDomain(url) {
  let hostname = url;

  if (hostname.includes('http://') || hostname.includes('https://')) {
    [, hostname] = hostname.split('://');
  }

  [hostname] = hostname.split('/');

  return hostname;
}

exports.takeScreenshot = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { targetURL, resolution } = await req.body;
      const browser = await chromium.puppeteer.launch({
        args: chromium.args,
        // https://github.com/puppeteer/puppeteer/issues/571#issuecomment-325404760
        defaultViewport: {
          ...resolution,
          deviceScaleFactor: 2
        },
        executablePath: await chromium.executablePath,
        headless: true,
        // https://github.com/puppeteer/puppeteer/issues/1088#issuecomment-338353489
        ignoreHTTPSErrors: true
      });
      const page = await browser.newPage();
      try {
        const httpsURL = prefixHttps(targetURL);
        await page.goto(httpsURL, { waitUntil: 'networkidle2' });
      } catch (err) {
        const httpURL = prefixHttp(targetURL);
        await page.goto(httpURL, { waitUntil: 'networkidle2' });
      }
      await pause(200);

      const screenshot = await page.screenshot({
        fullPage: false
      });
      await browser.close();
      res.contentType('image/png');
      return res.send(screenshot);
    } catch (error) {
      console.log(error.stack);
      return res.status(200).json({ error: error.stack });
    }
  });
});

exports.pullFavicon = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      let faviconSrc = 'besticon';
      const { targetURL } = await req.body;
      const httpsURL = encodeURIComponent(prefixHttps(targetURL));
      let faviconJson = await fetch(
        `https://besticon-favicon-service-zlnadqoywq-ue.a.run.app/allicons.json?url=${httpsURL}`
      ).then(response => response.json());
      if (faviconJson.error) {
        const httpURL = encodeURIComponent(prefixHttp(targetURL));
        faviconJson = await fetch(
          `https://besticon-favicon-service-zlnadqoywq-ue.a.run.app/allicons.json?url=${httpURL}`
        ).then(response => response.json());
      }
      if (faviconJson.error) {
        faviconSrc = 'favicongrabber';
        const cleanURL = getDomain(targetURL);
        faviconJson = await fetch(
          `https://favicongrabber.com/api/grab/${cleanURL}`
        ).then(response => response.json());
      }

      const { icons } = faviconJson;

      if (!icons || !icons.length) {
        return res.status(404).json(faviconJson);
      }

      console.log(icons);

      let url = '';

      if (faviconSrc === 'besticon') {
        const smallIcon = icons.find(
          icon => icon.width === 64 || icon.width === 32
        );
        url = smallIcon ? smallIcon.url : icons[0].url;
      } else if (faviconSrc === 'favicongrabber') {
        const smallIcon = icons.find(icon => icon.type === 'image/x-icon');
        url = smallIcon ? smallIcon.src : icons[0].src;
      }

      return request(url).pipe(res);
    } catch (error) {
      console.log(error.stack);
      return res.status(400).json(error);
    }
  });
});
