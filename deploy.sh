gcloud beta functions deploy html2pdf \
    --trigger-http \
    --runtime nodejs14 \
    --memory 1024MB \
    --region us-west2 \
    --security-level secure-always \
    --set-env-vars GCLOUD_PROJECT=$(gcloud config get-value project) \
    --set-env-vars FIREBASE_CONFIG={}
