# Use official Node.js image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the frontend code
COPY . .

# Expose port 5173 (Vite default)
EXPOSE 5173

# Start the Vite development server
CMD ["npm", "run", "dev", "--", "--host"]