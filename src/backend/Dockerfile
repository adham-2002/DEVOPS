FROM node:18-bullseye-slim AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install --production=false
COPY . .
RUN npm run build

FROM node:18-bullseye-slim
WORKDIR /app
COPY --from=builder /app /app
RUN npm install --production
EXPOSE 3000
CMD ["npm", "run", "start"]
