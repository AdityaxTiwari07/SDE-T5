# Use official Node.js image
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps

# Copy the rest of the backend code
COPY . .

# Expose port 9000
EXPOSE 9000

# Start the server
CMD ["node", "index.js"]
