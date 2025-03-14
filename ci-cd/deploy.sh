#!/bin/bash

echo "Starting deployment..."

# AWS (replace with your region & service)
aws ecs update-service \
  --cluster fintech-cluster \
  --service fintech-service \
  --force-new-deployment

# GCP (adjust to your configuration)
gcloud app deploy --quiet

echo "Deployment completed."
