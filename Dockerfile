# Frontend Dockerfile for Railway deployment - v5 (multi-stage)
FROM node:18-alpine AS builder

WORKDIR /build

# Copy the entire repository
COPY . .

# Navigate to frontend and build
WORKDIR /build/frontend

# Install dependencies and build
RUN npm install && npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Copy built files from builder stage
COPY --from=builder /build/frontend/build ./build

# Install serve
RUN npm install -g serve

# Debug: Check what we have
RUN echo "=== DEBUG: Build files ===" && ls -la build/

# Expose port
EXPOSE 3000

# Start the production server
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]