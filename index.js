const chromium = require("chrome-aws-lambda");
const puppeteer = chromium.puppeteer;
const functions = require("firebase-functions");

const options = {
    timeoutSeconds: 30
};

let page;

async function getBrowserPage() {
    const browser = await puppeteer.launch({
        args: chromium.args,
        // args: [
        //     '--window-size=1920,1080',
        //     '--hide-scrollbars',
        //     '--no-sandbox'
        // ],
        // defaultViewport: { width: 1200, height: 1440 },
        defaultViewport: chromium.defaultViewport,
        executablePath: await chromium.executablePath,
        headless: chromium.headless
    });
    return browser.newPage();
}

exports.html2pdf = functions
    .runWith(options)
    .https.onRequest(async (req, res) => {
        let url = req.body.url;
        if (!url) {
            return res.status(400).send(`missing required url\n`);
        }
        try {
            if (!page) {
                page = await getBrowserPage();
            }

            await page.goto(url, {waitUntil: 'networkidle2'});
            // NOT WORKING:
            // await page.setViewport({width: 1024, height: 1440});
            // await page.emulateMediaType("screen");

            const pdfBuffer = await page.pdf({
                printBackground: true,
                format: "Letter"
            });
            await page.close();

            res.set("Content-Type", "application/pdf");
            res.status(200).send(pdfBuffer);
        } catch (error) {
            throw error;
        }
    });
