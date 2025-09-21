# Use Node.js 18 alpine image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Build the application for production
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Start the production server
CMD ["serve", "-s", "build", "-l", "3000"]