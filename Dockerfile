# Root-level Dockerfile for Railway frontend service
FROM node:18-alpine

WORKDIR /app

# Copy frontend files
COPY frontend/package*.json ./

# Install dependencies  
RUN npm install

# Copy frontend source
COPY frontend/ ./

# Build the application
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the production server
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]