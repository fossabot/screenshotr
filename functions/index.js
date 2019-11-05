const functions = require('firebase-functions');
const puppeteer = require('puppeteer');
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
      }
    };

    const browser = await puppeteer.launch(puppeteerOpts);

    const page = await browser.newPage();

    await page.goto(req.body.targetURL);

    await pause(1000);

    const screenshot = await page.screenshot({
      encoding: 'base64',
      type: 'png',
      fullPage: true
    });

    await browser.close();

    res.status(200).json({ screenshot });
  });
});
