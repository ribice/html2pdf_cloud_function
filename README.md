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
The gloud tool will return URL of cloud function. Invoke by posting to the function with a url paramter containing the
full url to the destination website with any querystring parameters

```


# Calling from command line:
```
curl -X POST -d 'url=https://www.google.com' https://<<REGION>>-<<PROJECT>>.cloudfunctions.net/html2pdf \
  -H "Authorization: bearer $(gcloud auth print-identity-token)" > output.pdf
```

# Calling from PHP script with authentication:
https://cloud.google.com/functions/docs/securing/authenticating#service-to-function

1. Create a service principal with the following permissions:
  - cloudfunctions.invoker and
  - iam.serviceAccountTokenCreator
2. Install the google/auth library
`composer require google/auth`
3. Obtain a token
```
use Google\Auth\CredentialsLoader;
$jsonKey = json_decode(file_get_contents('your_json_key.json'), true);
$url = <<YOUR CLOUD FUNCTION URL>>;
$targetAudience = $url;
$c = CredentialsLoader::makeCredentials($targetAudience, $jsonKey);
$authToken = $c->fetchAuthToken();
$authHeader = "Authorization: bearer " . $authToken['id_token'];
```

# Changes:
2021-03: Updated libraries.


# TODO:
- Still struggling with setting viewport correctly, but need to make some various webpages with different size settings and test.



