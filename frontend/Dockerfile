# Stage 1: Build the React App
FROM node:18-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./  
RUN npm ci  # Install both dependencies AND devDependencies
COPY . .     
RUN npm run build  # Build the React app

# Stage 2: Serve with Nginx
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html  

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
