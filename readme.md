# 🛒 E-Commerce Platform with Automated CI/CD Pipeline 🚀
A containerized e-commerce system with Node.js backend, React frontend, MongoDB, and Redis.

⚡ Note: This setup is optimized for local development with Minikube && Docker Compose
## 📂 Project Structure
```
E-Commerce-Platform/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middlewares/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── index.ts
│   │   ├── app.ts
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── nodemon.json
│   ├── .gitignore
│   ├── README.md
│   ├── docs/
│   └── .env
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── hooks/
│   │   ├── store/
│   │   ├── assets/
│   │   ├── App.tsx
│   │   ├── index.tsx
│   ├── Dockerfile
│   ├── package.json
│   ├── tsconfig.json
│   ├── .gitignore
│   ├── README.md
│   ├── tests/
│   └── .env
├── k8s/
│   ├── base/
│   │   ├── backend/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
|   |   |   |── configmap.yaml
|   |   |   |── secret.yaml
|   |   |   |── kustomization.yaml
│   │   ├── frontend/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
|   |   |   |── kustomization.yaml
│   │   ├── mongo/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
|   |   |   |── configmap.yaml
|   |   |   |── secret.yaml
|   |   |   |── pvc.yaml
|   |   |   |── init-mongo.js
|   |   |   |── kustomization.yaml
│   │   ├── redis/
│   │   │   ├── deployment.yaml
│   │   │   ├── service.yaml
│   │   ├── ingress.yaml
│   ├── overlays/
│   │   ├── dev/
│   │   │   ├── kustomization.yaml
│   │   ├── staging/
│   │   │   ├── kustomization.yaml
│   │   ├── prod/
│   │   │   ├── kustomization.yaml

├── .env
├── docker-compose.yml
├── README.md
```
