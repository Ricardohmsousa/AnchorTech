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

# Build the application for production with placeholders
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Copy and set up startup script
COPY start.sh /app/start.sh
RUN chmod +x /app/start.sh

# Expose port (Railway will set this dynamically)
EXPOSE 3000

# Start with our environment injection script and serve
CMD ["/app/start.sh"]