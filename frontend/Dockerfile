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
