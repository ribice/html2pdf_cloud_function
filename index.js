const chromium = require("chrome-aws-lambda");
const puppeteer = require("puppeteer-core");
const functions = require("firebase-functions");

const options = {
  timeoutSeconds: 30
};

let page;

async function getBrowserPage() {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: chromium.headless
  });
  return browser.newPage();
}

exports.html2pdf = functions
  .runWith(options)
  .https.onRequest(async (req, res) => {
    if (!req.originalUrl.startsWith("/?url=")) {
      return res.status(400).send(`url query param must be provided`);
    }

    let url = req.originalUrl.substring(6);

    try {
      if (!page) {
        page = await getBrowserPage();
      }

      await page.goto(url);
      await page.emulateMedia("screen");

      const pdfBuffer = await page.pdf({ printBackground: true });

      res.set("Content-Type", "application/pdf");
      res.status(200).send(pdfBuffer);
    } catch (error) {
      throw error;
    }
  });
