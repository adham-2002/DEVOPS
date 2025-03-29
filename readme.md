# 🛒 E-Commerce Platform with Automated CI/CD Pipeline 🚀
A containerized e-commerce system with Node.js backend, React frontend, MongoDB, and Redis.

⚡ Note: This setup is optimized for local development with Minikube && Docker Compose
## 📂 Project Structure
  <details>
    <summary><strong> Click to expand</strong> </summary>

  ```bash
  E-Commerce-Platform/
  ├── ansible/
  │   ├── inventories/
  │   ├── playbook.yml
  ├── db/
  │   ├── Dockerfile
  │   ├── init-monogo.js
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
  |   |   |   |── kustomization.yaml
  │   │   ├── redis/
  │   │   │   ├── deployment.yaml
  │   │   │   ├── kustomization.yaml
  │   │   │   ├── pvc.yaml
  │   │   │   ├── secret.yaml
  │   │   │   ├── service.yaml
  │   │   ├── ingress.yaml
  │   ├── overlays/
  │   │   ├── dev/
  │   │   │   ├── kustomization.yaml
  │   │   ├── staging/
  │   │   │   ├── kustomization.yaml
  │   │   ├── prod/
  │   │   │   ├── kustomization.yaml
  │   ├── scripts/
  │── helm-chart/
  │   ├── Chart.yaml
  │   ├── values.yaml
  │   ├── templates/
  │   │   ├── backend/
  │   │   ├── frontend/
  │   │   ├── ingress.yaml
  │   │   ├── mongodb/
  │   │   ├── redis/  
  ├── .env
  ├── Jenkinsfile
  ├── Dockerfile
  ├── docker-compose.yaml
  ├── README.md
  ```
</details>


## 📌 Step-by-Step Development Journey

### **1. 🐳 Dockerizing the Frontend & Backend &**

* `Docker File for Frontend`
```Dockerfile
# Use Node.js as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first to take advantage of Docker caching
COPY package*.json ./

# Install dependencies using npm package manager
RUN npm install

# Copy the entire frontend code
COPY . .

# Expose the correct port for Vite
EXPOSE 5173

# Start Vite with the correct options for Docker
CMD ["npm", "run", "dev"]

```
* `Docker File for Backend`

```Dockerfile
#! use node.js as the base image
FROM node:18
#! set the working directory inside the container and if not exist create it
WORKDIR /app
#! copy package.json and package-lock.json to the working directory
COPY package*.json ./
#! install dependencies using npm package manager
RUN npm install
#! copy the entire backend code
COPY . .
#! expose the backend port
EXPOSE 3000
#! start the backend server
CMD ["npm", "run", "dev"]
```
### **2. 🗄️Database Configuration & Initialization**

* `we  Configure MongoDB/Redis official images`
*  `we have init-mongo.js file to initialize the database with the necessary users,roles and create the application database`

### **3. 📦 Setting Up Docker Compose for Local Development**
**We Have 5 containers**

* **Express Backend container**: run on port `3000 `
* **React Frontend container**: run on port `5173`
* **MongoDB container**: run on port `27017`
* **Redis Container**: run on port `6379`

* **Mongo Express** run on port `8081`

**one shared Network For communication between containers** :` ecommerce-network`

**Env File**: Env File which contain all `environment variables` needed by container

**mongo-ecommerce-data &redis-data volume**: These Docker volumes are used to persist data for MongoDB and Redis in an e-commerce application

**Deploy Resources**: used to limit what each container take from resources you can view by typing `docker stats`

```yaml
services:
  backend:
    build: ./backend
    ports:
      - "3000:3000"  
    depends_on:
      - mongodb
      - redis
    environment:
      MONGO_URI: ${MONGO_URI}
      JWT_SECRET: ${JWT_SECRET}
      REFRESH_TOKEN_SECRET: ${REFRESH_TOKEN_SECRET}
      REDIS_HOST: redis
      REDIS_PORT: 6379
      REDIS_PASSWORD: ${REDIS_PASSWORD}
    networks:
      - ecommerce-network
    deploy:
      resources:
        limits:
          memory: "512M"
          cpus: "1.0"
        reservations:
          memory: "256M"
          cpus: "0.5"

  frontend:
    build: ./frontend
    ports:
      - "5173:5173"  
    depends_on:
      - backend
    networks:
      - ecommerce-network
    deploy:
      resources:
        limits:
          memory: "512M"
          cpus: "1.0"
        reservations:
          memory: "256M"
          cpus: "0.5"
  mongodb:
    image: mongo:latest
    container_name: mongodb_container
    restart: always
    ports:
      - "27017:27017"
    command: ["mongod","--auth"]
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USER}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASS}
      MONGO_INITDB_DATABASE: ${MONGO_APP_DB}
      MONGO_APP_USER: ${MONGO_APP_USER}
      MONGO_APP_PASS: ${MONGO_APP_PASS}
    volumes:
      -  mongo-ecommerce-data:/data/db
      - ./db/init-mongo.js:/docker-entrypoint-initdb.d/init-mongo.js:ro
    networks:
      - ecommerce-network
    deploy:
      resources:
        limits:
          cpus: "2.0"  
          memory: "1G" 
        reservations:
          cpus: "1.0"  
          memory: "512M" 
  redis:
    image: redis:latest
    container_name: redis_container
    restart: unless-stopped
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
    networks:
      - ecommerce-network
    environment:
      - REDIS_PASSWORD=${REDIS_PASSWORD}
    command: ["redis-server", "--requirepass", "${REDIS_PASSWORD}"]
    deploy:
      resources:
        limits:
          cpus: "1.0"  
          memory: "1G" 
        reservations:
          cpus: "0.5"  
          memory: "512M"
  mongo-express:
    image: mongo-express:latest
    container_name: mongo_express_container
    restart: always
    ports:
      - "8081:8081"
    depends_on:
      - mongodb
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: ${MONGO_ROOT_USER}
      ME_CONFIG_MONGODB_ADMINPASSWORD: ${MONGO_ROOT_PASS}
      ME_CONFIG_MONGODB_SERVER: mongodb
    networks:
      - ecommerce-network
    deploy:
      resources:
        limits:
          memory: "256M"
          cpus: "0.5"
        reservations:
          memory: "128M"
          cpus: "0.25"
volumes:
   mongo-ecommerce-data:
   redis-data:

networks:
  ecommerce-network:

```
---

smee -u https://smee.io/9HuiZFetpAt65S3j -t http://localhost:8080/github-webhook/
