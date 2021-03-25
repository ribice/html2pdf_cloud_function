# HTML2PDF Cloud Function

Serverless HTML to PDF conversions using Google Cloud Functions, and Puppeteer.

## Deploying

```
# 1. Install `gcloud` CLI tool: https://cloud.google.com/sdk/gcloud

# 2. Authorize gcloud:
gcloud init
gcloud auth application-default login

# 3. Deploy!
./deploy.sh

#4 Consume:

The gloud tool will return URL of cloud function. Invoke by it appending to it `?url=YOUR_URL`

```

2021-03: Updated libraries.  Still struggling with setting viewport correctly, but need to make some various webpages
 with different size settings and test.

 Currently using an authenticated URL so this function isn't public in google which means that you have to set up
 authetntication.  From glcoud for testing this is:
 `curl https://<<PROJECT>>.cloudfunctions.net/html2pdf\?url\=website_escaped \
  -H "Authorization: bearer $(gcloud auth print-identity-token)" > output.pdf`

 But, for server to function I will need to set up authentication:
 https://cloud.google.com/functions/docs/securing/authenticating#service-to-function

