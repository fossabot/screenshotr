const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
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

exports.takeScreenshot = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { targetURL, resolution } = await req.body;
      const httpsURL = prefixHttps(targetURL);
      const httpURL = prefixHttp(targetURL);
      const puppeteerOpts = {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // https://github.com/puppeteer/puppeteer/issues/1088#issuecomment-338353489
        ignoreHTTPSErrors: true
      };
      const browser = await puppeteer.launch(puppeteerOpts);
      const page = await browser.newPage();
      // https://github.com/puppeteer/puppeteer/issues/571#issuecomment-325404760
      await page.setViewport({ ...resolution, deviceScaleFactor: 2 });
      try {
        await page.goto(httpsURL, { waitUntil: 'networkidle2' });
      } catch (err) {
        await page.goto(httpURL, { waitUntil: 'networkidle2' });
      }
      await pause(200);

      const screenshot = await page.screenshot({
        encoding: 'base64',
        type: 'png',
        fullPage: false
      });
      await browser.close();
      return res.status(200).json({ screenshot });
    } catch (error) {
      console.log(error.stack);
      return res.status(200).json({ error: error.stack });
    }
  });
});

exports.pullFavicon = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { targetURL } = await req.body;
      const httpsURL = encodeURIComponent(prefixHttps(targetURL));
      const httpURL = encodeURIComponent(prefixHttp(targetURL));
      let faviconJson = await fetch(
        `https://besticon-favicon-service-zlnadqoywq-ue.a.run.app/allicons.json?url=${httpsURL}`
      ).then(response => response.json());
      if (faviconJson.error) {
        faviconJson = await fetch(
          `https://besticon-favicon-service-zlnadqoywq-ue.a.run.app/allicons.json?url=${httpURL}`
        ).then(response => response.json());
      }

      const { icons } = faviconJson;

      if (!icons || !icons.length) {
        return res.status(404).json(faviconJson);
      }
      const smallIcon = icons.find(
        icon => icon.width === 64 || icon.width === 32
      );

      const { url } = smallIcon || icons[0];

      return request(url).pipe(res);
    } catch (error) {
      console.log(error.stack);
      return res.status(400).json(error);
    }
  });
});
