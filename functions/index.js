const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const request = require('request');
require('dotenv').config();
const cors = require('cors')({ origin: true });

function pause(time = 3000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

exports.takeScreenshot = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { targetURL, resolution } = await req.body;
      const puppeteerOpts = {
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
        // https://github.com/puppeteer/puppeteer/issues/1088#issuecomment-338353489
        ignoreHTTPSErrors: true
      };
      const browser = await puppeteer.launch(puppeteerOpts);
      const page = await browser.newPage();
      // https://github.com/puppeteer/puppeteer/issues/571#issuecomment-325404760
      await page.setViewport({ ...resolution, deviceScaleFactor: 2 });
      await page.goto(targetURL, { waitUntil: 'networkidle2' });
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

const cleanUrl = url => {
  return url
    .replace(/https?:\/\//, '')
    .split('/')[0]
    .trim();
};

exports.pullFavicon = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const { targetURL } = await req.body;
      const cleanTargetURL = cleanUrl(targetURL);

      const favicons = await fetch(
        `https://besticon-favicon-service-zlnadqoywq-ue.a.run.app/allicons.json?url=${cleanTargetURL}`
      )
        .then(response => response.json())
        .then(({ icons }) => icons);
      console.log(favicons);

      if (!favicons || !favicons.length) {
        return res.status(404);
      }
      const smallIcon = favicons.find(
        icon => icon.width === 64 || icon.width === 32
      );

      // const icoArr = favicons.filter(icon => icon.type === 'image/x-icon');

      const { url } = smallIcon || favicons[0];

      return request(url).pipe(res);
    } catch (error) {
      console.log(error.stack);
      return res.status(400).json(error);
    }
  });
});
