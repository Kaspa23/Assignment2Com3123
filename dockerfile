# Use Node.js official image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code
COPY . .

# Build the frontend
WORKDIR /app/frontend
RUN npm install && npm run build

# Move the build folder to the backend
WORKDIR /app
RUN mv ./frontend/build ./build

# Expose the backend port
EXPOSE 8089

# Start the backend server
CMD ["node", "server.js"]
