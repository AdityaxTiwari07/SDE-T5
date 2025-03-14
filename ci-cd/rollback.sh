#!/bin/bash

echo "Rolling back deployment..."

# Get last stable Docker image tag (adjust to your registry)
LAST_TAG=$(docker images fintech-server --format "{{.Tag}}" | head -n 2 | tail -n 1)

# Redeploy last stable version
docker run -d -p 3000:3000 ghcr.io/${{ github.repository }}/fintech-server:$LAST_TAG

echo "Rollback to $LAST_TAG completed."
