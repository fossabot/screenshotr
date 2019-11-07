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
        width: 1600,
        height: 900
      },
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    };
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
      fullPage: true
    });
    await browser.close();
    return res.status(200).json({ screenshot });
  });
});
