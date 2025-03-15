# CI/CD Pipeline for Finance Dashboard App

## Overview
This document outlines the **Continuous Integration and Continuous Deployment (CI/CD) pipeline** for the Finance Dashboard App. The pipeline ensures **automated build, testing, containerization, and deployment to AWS ECS** using GitHub Actions.

---

## **Pipeline Stages**

### **1. Source Code Management**
- The code is hosted on **GitHub**.
- Any changes to the `main` branch trigger the CI/CD pipeline.

### **2. Continuous Integration (CI)**

#### **Build Stage**
- **Checkout Code**: Fetches the latest code from the repository.
- **Install Dependencies**: Installs required dependencies for both frontend (`client`) and backend (`server`).
- **Static Code Analysis**: Runs ESLint for JavaScript linting to enforce code quality.
- **Build Application**:
  - The frontend (React) is built using `npm run build`.
  - The backend (Node.js/Express) is compiled and prepared.

#### **Test Stage**
- **Unit Tests**: Uses Jest for frontend and backend unit testing.
- **Integration Tests**: Ensures API endpoints function correctly with a test database.
- **Code Coverage**: Ensures at least **80% coverage** before deployment.

---

## **3. Continuous Deployment (CD)**

### **Dockerization**
- A **Docker image** is created for both the frontend and backend.
- Docker images are tagged with the latest commit hash and pushed to **Amazon Elastic Container Registry (ECR)**.

### **Deployment to AWS ECS**
- **Amazon ECS (Elastic Container Service)** is used to deploy the application.
- The application is deployed using **Fargate** for serverless compute.
- ECS Task Definitions define container properties.
- ECS Service ensures the application runs with auto-scaling.

---

## **4. Deployment Workflow (GitHub Actions)**

### **Trigger Mechanism**
- The workflow triggers on `push` or `pull_request` to the `main` branch.

### **Workflow Configuration**
```yaml
name: CI/CD Pipeline

on:
  push:
    branches:
      - main

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 18
      
      - name: Install Dependencies
        run: |
          cd client && npm install
          cd ../server && npm install

      - name: Run Tests
        run: |
          cd client && npm test
          cd ../server && npm test

      - name: Build Docker Images
        run: |
          docker build -t finance-app-client:latest ./client
          docker build -t finance-app-server:latest ./server

      - name: Push Images to AWS ECR
        run: |
          aws ecr get-login-password --region us-east-1 | docker login --username AWS --password-stdin <ECR_URL>
          docker tag finance-app-client:latest <ECR_URL>/finance-app-client:latest
          docker tag finance-app-server:latest <ECR_URL>/finance-app-server:latest
          docker push <ECR_URL>/finance-app-client:latest
          docker push <ECR_URL>/finance-app-server:latest

  deploy:
    needs: build
    runs-on: ubuntu-latest
    steps:
      - name: Deploy to AWS ECS
        run: |
          aws ecs update-service --cluster finance-cluster --service finance-app-service --force-new-deployment
```

---

## **5. Rollback Strategy**
- If a deployment fails, the pipeline automatically rolls back to the last stable Docker image.
- AWS ECS maintains **previous task definitions**, ensuring rollback is seamless.

---

## **6. Monitoring & Logging**
- **AWS CloudWatch** monitors application logs and container health.
- **ECS Task Metrics** track CPU/memory usage.
- Alerts notify via **Slack or Email** if failures occur.

---

## **Final Notes**
This CI/CD pipeline ensures rapid, automated deployment while maintaining code quality and stability. Future improvements can include:
- Blue-Green Deployments for zero-downtime updates.
- Canary Releases to test new versions incrementally.
- Auto-healing mechanisms via AWS ALB (Application Load Balancer).

