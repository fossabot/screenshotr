const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
const fetch = require('node-fetch');
const https = require('https');
const http = require('http');
const Stream = require('stream').Transform;
require('dotenv').config();
const cors = require('cors')({ origin: true });

function pause(time = 3000) {
  return new Promise(resolve => setTimeout(resolve, time));
}

exports.takeScreenshot = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    const puppeteerOpts = {
      defaultViewport: {
        width: 1920,
        height: 1080
      },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
    try {
      const browser = await puppeteer.launch(puppeteerOpts);
      const page = await browser.newPage();
      await page.setUserAgent(
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3419.0 Safari/537.36'
      );
      const { targetURL } = await req.body;
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
      console.log(targetURL);
      const cleanTargetURL = cleanUrl(targetURL);

      const favicons = await fetch(
        `https://favicongrabber.com/api/grab/${cleanTargetURL}`
      )
        .then(response => response.json())
        .then(({ icons }) => icons);

      console.log(favicons);

      if (!favicons || !favicons.length) {
        return res.status(404);
      }

      const icoArr = favicons.filter(icon => icon.type === 'image/x-icon');

      const { src } = icoArr.length ? icoArr[0] : favicons[0];

      const client = /https/.test(src) ? https : http;

      const fileObj = {
        name: src.split('/')[src.split('/').length - 1]
      };

      console.log(fileObj);

      const faviconDownload = new Promise((resolve, reject) => {
        return client
          .request(src, response => {
            fileObj.contentType = response.headers['content-type'];
            const data = new Stream();
            response.on('data', chunk => {
              console.log('new chunk', chunk);
              data.push(chunk);
            });
            response.on('error', error => reject(error));
            response.on('end', () => {
              console.log('END');
              fileObj.file = data.read();
              console.log(fileObj);
              resolve(fileObj);
            });
          })
          .end();
      });

      await faviconDownload;
      res.set('Content-Type', fileObj.contentType);
      return res.send(fileObj.file);
    } catch (error) {
      console.log(error.stack);
      return res.status(400).json(error);
    }
  });
});
