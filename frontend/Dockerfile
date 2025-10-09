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

# Create runtime environment injection script
RUN echo '#!/bin/sh\n\
set -e\n\
echo "=== Railway Environment Variable Injection ==="\n\
echo "REACT_APP_API_URL: ${REACT_APP_API_URL:-not set}"\n\
echo "REACT_APP_STRIPE_PUBLISHABLE_KEY: ${REACT_APP_STRIPE_PUBLISHABLE_KEY:+SET}"\n\
echo "PORT: ${PORT:-3000}"\n\
\n\
# Create env.js with actual environment variables\n\
cat > /app/build/env.js << EOF\n\
window.ENV = {\n\
  REACT_APP_API_URL: "${REACT_APP_API_URL}",\n\
  REACT_APP_STRIPE_PUBLISHABLE_KEY: "${REACT_APP_STRIPE_PUBLISHABLE_KEY}"\n\
};\n\
console.log("Runtime env loaded:", window.ENV);\n\
EOF\n\
\n\
echo "Environment variables injected into /app/build/env.js"\n\
echo "Starting server on host 0.0.0.0 port ${PORT:-3000}"\n\
echo "Serve command: serve -s build -l ${PORT:-3000} -H 0.0.0.0"\n\
exec serve -s build -l ${PORT:-3000} -H 0.0.0.0 --no-clipboard' > /app/start.sh

RUN chmod +x /app/start.sh

# Expose port (Railway will set this dynamically)
EXPOSE 3000

# Start with our environment injection script
CMD ["/app/start.sh"]