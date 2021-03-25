gcloud beta functions deploy html2pdf \
    --trigger-http \
    --runtime nodejs14 \
    --memory 1024MB \
    --region us-west2 \
    --security-level secure-always
