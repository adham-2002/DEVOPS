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





