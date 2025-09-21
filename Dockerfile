# Frontend Dockerfile for Railway deployment - v2 (cache bust)
FROM node:18-alpine

WORKDIR /app

# Copy all frontend files
COPY frontend/ ./

# Clean install to avoid cache issues
RUN rm -rf node_modules package-lock.json 2>/dev/null || true
RUN npm install

# Build the application for production
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the production server with Railway's PORT
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]