# E-Commerce Platform with Automated CI/CD Pipeline
A containerized e-commerce system with Node.js backend, React frontend, MongoDB, and Redis.  
**Note**: This setup is optimized for local development with Minikube.
## Project Structure
```
.
├── backend
│   ├── Dockerfile
│   ├── nodemon.json
│   ├── package.json
│   ├── src
│   └── tsconfig.json
├── frontend
│   ├── Dockerfile
│   ├── package.json
│   ├── src
│   └── tsconfig.json
├── k8s
│   ├── k8s-Backend
│   │   ├── configmap.yaml
│   │   ├── deployment.yaml
│   │   ├── secret.yaml
│   │   └── service.yaml
│   ├── readme.md
│   └── some-other-file.yaml
├── README.md
└── docker-compose.yml
```
