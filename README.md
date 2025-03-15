# Finance Dashboard CI/CD Pipeline with Automated Rollback & Multi-Cloud Deployment

## 📈 Overview
This project implements a fully automated, end-to-end **CI/CD pipeline** for a **finance dashboard application**. The pipeline ensures seamless deployment, testing, monitoring, and rollback capabilities. It is designed using **GitHub Actions** for CI/CD automation and **AWS ECS (Elastic Container Service)** for deployment, along with an automated rollback mechanism to recover from deployment failures.

## 👑 Table of Contents
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [Task Breakdown](#task-breakdown)
  - [Task 1: Repository & Application Preparation](#task-1-repository--application-preparation)
  - [Task 2: CI/CD Platform & Workflow Configuration](#task-2-cicd-platform--workflow-configuration)
  - [Task 3: Automated Testing & Multi-Cloud Deployment](#task-3-automated-testing--multi-cloud-deployment)
  - [Task 4: Documentation & Submission](#task-4-documentation--submission)
- [AWS ECS Deployment Explanation](#aws-ecs-deployment-explanation)
- [Rollback Mechanism](#rollback-mechanism)
- [Final Submission Details](#final-submission-details)

---

## 📚 Project Structure

```
finance-dashboard-app/
├── client/              # Frontend (React)
├── server/              # Backend (Node.js, Express)
├── ci-cd/               # CI/CD workflow files
│   ├── Dockerfile       # Docker configuration
│   ├── deploy.sh        # Deployment script
│   ├── rollback.sh      # Rollback script
│   ├── ecs-task-def.json # AWS ECS Task Definition
│   ├── aws-config.yml   # AWS deployment settings
├── tests/               # Automated test cases
│   ├── unit/            # Unit tests
│   ├── integration/     # Integration tests
├── docs/                # Documentation files
├── scripts/             # Utility scripts for deployment & monitoring
├── .github/workflows/   # GitHub Actions workflows
│   ├── ci-cd.yml        # CI/CD automation pipeline
│   ├── test.yml         # Automated testing workflow
├── README.md            # Project documentation
```

---

## 🔧 Technology Stack

| Component      | Technology Used                  |
|---------------|----------------------------------|
| **Frontend**  | React.js                         |
| **Backend**   | Node.js, Express                 |
| **Database**  | MongoDB                          |
| **CI/CD**     | GitHub Actions, Docker           |
| **Containerization** | Docker, AWS ECS            |
| **Testing**   | Jest, Cypress                    |
| **Infrastructure** | AWS (ECS, S3, IAM, CloudWatch) |

---

## 🏆 Task Breakdown

### 📀 Task 1: Repository & Application Preparation
1. **Cloned the finance dashboard app** from GitHub.
2. **Restructured the project** into a production-grade repository with `client`, `server`, `tests`, `ci-cd`, and `docs` folders.
3. Ensured the application **runs locally without issues** using:
   ```bash
   cd client && npm install && npm start
   cd ../server && npm install && npm start
   ```
4. Documented **key features & known issues**.

---

### 📀 Task 2: CI/CD Platform & Workflow Configuration

#### ✅ **GitHub Actions CI/CD Workflow**
- Created a **GitHub Actions workflow** (`.github/workflows/ci-cd.yml`) that includes the following stages:
  - **Build Stage:** Installs dependencies, performs static code analysis, and builds the application.
  - **Test Stage:** Executes unit & integration tests ensuring at least 80% code coverage.
  - **Dockerization:** Builds a Docker image and pushes it to AWS ECR.
  - **Deployment:** Deploys the application to AWS ECS.
  - **Rollback Mechanism:** Triggers a `rollback.sh` script if the deployment fails.

---

### 📀 Task 3: Automated Testing & Multi-Cloud Deployment
1. **Automated Test Suite Integration:**
   - Integrated **Jest** for backend unit tests.
   - Integrated **Cypress** for frontend end-to-end tests.
2. **Multi-Region Deployment Setup:**
   - Configured AWS ECS deployments in multiple regions (e.g., **us-east-1** & **eu-west-1**).
   - Extended GitHub Actions to deploy the application to at least two cloud regions (using AWS and simulating another cloud provider).
3. **Rollback Validation:**
   - Manually simulated deployment failures.
   - Captured logs and screenshots to demonstrate successful execution of the rollback script.

---

### 📀 Task 4: Documentation & Submission
- Created this **comprehensive README.md** to document every stage of the CI/CD pipeline.
- Provided detailed explanations of workflow steps, code snippets, and architectural diagrams.
- Final repository submission includes:
  - Complete source code.
  - CI/CD workflow files.
  - Docker and AWS ECS configuration.
  - Automated test reports.
  - Rollback logs and deployment screenshots.
  - Detailed documentation on all aspects of the project.

---

## 📆 AWS ECS Deployment Explanation

AWS ECS (Elastic Container Service) is a fully managed container orchestration service that makes it easy to deploy, manage, and scale containerized applications.

### **Deployment Steps:**
1. **AWS ECR Setup:**
   - Created an AWS ECR (Elastic Container Registry) repository to store Docker images.
2. **Cluster Configuration:**
   - Set up an AWS ECS Fargate cluster to manage containers without managing servers.
   ```bash
   aws ecs create-cluster --cluster-name finance-dashboard-cluster
   ```
3. **Task Definition:**
   - Created an **ECS Task Definition** (`ecs-task-def.json`) that specifies:
     - Docker image details.
     - CPU and memory requirements.
     - Networking settings.
4. **Service Creation:**
   - Deployed an ECS Service linked to an Application Load Balancer (ALB) for high availability.
5. **Automated Deployment via GitHub Actions:**
   - Every push to the repository triggers the GitHub Actions workflow:
     - The workflow builds and tests the application.
     - It then builds a new Docker image, pushes it to AWS ECR, and deploys it to ECS.

---

## 🛂 Rollback Mechanism

### **Automated Rollback Implementation:**
1. **Monitoring Deployment Health:**
   - Integrated health checks during the deployment process.
   - Error thresholds are set to detect any issues during deployment.
2. **Rollback Script:**
   - A `rollback.sh` script automatically reverts to the last stable Docker image if a failure is detected.
   - The script logs all actions for troubleshooting purposes.
3. **Testing the Rollback:**
   - Manual failure simulations were conducted to ensure the rollback mechanism functions as expected.

---

### 🎯 Conclusion
This project delivers a production-grade CI/CD pipeline for a finance dashboard application that encompasses automated builds, testing, deployment, and an intelligent rollback mechanism using AWS ECS.

