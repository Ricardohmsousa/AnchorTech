# Frontend Dockerfile for Railway deployment
FROM node:18-alpine

WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code
COPY frontend/ ./

# Build the application for production
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the production server with Railway's PORT
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]