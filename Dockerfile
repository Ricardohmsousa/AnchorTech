# Frontend Dockerfile for Railway deployment
FROM node:18-alpine

WORKDIR /app

# Copy frontend package files
COPY frontend/package*.json ./
RUN npm install

# Copy frontend source code and public files
COPY frontend/src ./src
COPY frontend/public ./public
COPY frontend/webpack.config.js ./
COPY frontend/.babelrc ./

# Build the application for production
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the production server with Railway's PORT
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]