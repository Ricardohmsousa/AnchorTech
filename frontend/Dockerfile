# Use Node.js 18 alpine image
FROM node:18-alpine

# Install bash for script compatibility
RUN apk add --no-cache bash

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application for production
RUN npm run build

# Install serve globally
RUN npm install -g serve

# Create a simple startup script inline
RUN cat > /app/entrypoint.sh << 'EOF'
#!/bin/bash
set -e

echo "=== Railway Runtime Environment Setup ==="
echo "PORT: ${PORT:-3000}"

# Create the env.js file with actual environment variables
cat > /app/build/env.js << 'ENVEOF'
window.ENV = {
  REACT_APP_API_URL: '${REACT_APP_API_URL}',
  REACT_APP_STRIPE_PUBLISHABLE_KEY: '${REACT_APP_STRIPE_PUBLISHABLE_KEY}'
};
console.log("Runtime env loaded:", window.ENV);
ENVEOF

echo "Environment variables injected into env.js"
echo "REACT_APP_API_URL: ${REACT_APP_API_URL:-not set}"
echo "REACT_APP_STRIPE_PUBLISHABLE_KEY: ${REACT_APP_STRIPE_PUBLISHABLE_KEY:+SET}"

# Start the application with dynamic port
echo "Starting server on 0.0.0.0:${PORT:-3000}"
exec serve -s /app/build -l ${PORT:-3000} -H 0.0.0.0 --no-clipboard
EOF

# Make the script executable
RUN chmod +x /app/entrypoint.sh

# Expose port (Railway will set this dynamically)
EXPOSE 3000

# Start with our embedded script
CMD ["/app/entrypoint.sh"]