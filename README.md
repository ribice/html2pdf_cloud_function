# HTML2PDF Cloud Function

Serverless HTML to PDF conversions using Google Cloud Functions, and Puppeteer.

## Deploying

```
# 1. Install `gcloud` CLI tool: https://cloud.google.com/sdk/gcloud

# 2. Authorize gcloud:
gcloud init
gcloud auth application-default login

# 3. Deploy!
./deploy.sh

#4 Consume:

The gloud tool will return URL of cloud function. Invoke by it appending to it `?url=YOUR_URL`
```
