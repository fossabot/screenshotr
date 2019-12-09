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
        defaultViewport: resolution,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      };
      const browser = await puppeteer.launch(puppeteerOpts);
      const page = await browser.newPage();
      await page.setViewport({ ...resolution, deviceScaleFactor: 2 });
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
      );
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
      return res.status(400).json({ error });
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
        `https://favicongrabber.com/api/grab/${cleanTargetURL}`
      )
        .then(response => response.json())
        .then(({ icons }) => icons);

      if (!favicons || !favicons.length) {
        return res.status(404);
      }

      const icoArr = favicons.filter(icon => icon.type === 'image/x-icon');

      const { src } = icoArr.length ? icoArr[0] : favicons[0];

      return request(src).pipe(res);
    } catch (error) {
      console.log(error.stack);
      return res.status(400).json(error);
    }
  });
});
