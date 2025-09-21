# Frontend Dockerfile for Railway deployment - v3 (debug paths)
FROM node:18-alpine

WORKDIR /app

# Copy all frontend files
COPY frontend/ ./

# Debug: List files to see what was copied
RUN echo "=== DEBUG: Files in /app ===" && ls -la && echo "=== DEBUG: Public dir ===" && ls -la public/ || echo "Public dir not found"

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