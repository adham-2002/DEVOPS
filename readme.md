
# CI/CD Pipeline for E-Commerce Platform

This project demonstrates a complete CI/CD pipeline for an e-commerce platform, integrating infrastructure provisioning, Docker-based container builds, and automated deployment using GitHub Actions, Terraform, Ansible, and Docker.

## 🧰 Tech Stack

- **CI/CD:** GitHub Actions
- **Infrastructure as Code:** Terraform
- **Configuration Management:** Ansible
- **Containerization:** Docker, Docker Compose
- **Orchestration (Optional):** Kubernetes, Helm
- **Cloud Provider:** AWS

---

## 📁 Project Structure

```
.github/workflows/main.yaml      # GitHub Actions workflow
infrastructure/
├── ansible/                     # Ansible inventory and playbooks
├── docker/                      # Docker Compose files
├── helm/                        # Helm charts (if applicable)
├── kubernetes/                  # Kubernetes manifests
└── terraform/                   # Terraform IaC configuration
scripts/                         # Utility scripts and secrets management
src/                             # Source code for the application
```

---

## ⚙️ GitHub Actions Workflow Overview

The GitHub Actions workflow file `main.yaml` defines a 3-stage CI/CD pipeline:

### 1. Terraform (`terraform` job)
- Initializes and applies infrastructure using Terraform.
- Destroys and reapplies to ensure a clean setup.
- Outputs instance IPs for use in later stages.

### 2. Docker Build & Push (`build` job)
- Sets up Docker and Docker Compose.
- Builds Docker images and pushes them to Docker Hub.
- Uses cache to speed up build times.

### 3. Ansible Deployment (`deploy` job)
- Generates a dynamic Ansible inventory from Terraform output.
- Connects to the provisioned EC2 instances using SSH.
- Runs Ansible playbooks to deploy Docker containers.

---

## 🔐 Secrets Required

| Secret Name              | Description                              |
|--------------------------|------------------------------------------|
| `AWS_ACCESS_KEY_ID`      | AWS access key for Terraform provisioning |
| `AWS_SECRET_ACCESS_KEY`  | AWS secret key                            |
| `DOCKER_USERNAME`        | Docker Hub username                       |
| `DOCKER_PASSWORD`        | Docker Hub password                       |
| `SSH_PRIVATE_KEY_B64`    | Base64 encoded private SSH key            |

## 🚀 How It Works

1. **Push to Main**:
    - Any code pushed to the `main` branch triggers the pipeline.
2. **Provisioning**:
    - Terraform provisions the required AWS infrastructure.
3. **Build**:
    - Docker images are built and pushed to Docker Hub.
4. **Deployment**:
    - Ansible connects via SSH and deploys containers.

## 📜 How to Use

1. **Set up Secrets** in your GitHub repository.
2. **Push code** or create a **pull request** to trigger the workflow.
3. **Monitor GitHub Actions** under the "Actions" tab.

## 📄 Requirements

- Terraform ≥ 1.0
- Docker & Docker Compose
- AWS Account
- GitHub repository with Actions enabled

## 📌 Notes

- Make sure your AWS instances allow SSH connections from GitHub runners.
- Consider using `terraform plan` before `apply` in production setups.
- The Terraform job currently destroys and recreates infrastructure each time.

## 🧪 Future Improvements

- Add Kubernetes deployment using manifests or Helm.
- Configure monitoring and alerts.
- Enable zero-downtime deployments.