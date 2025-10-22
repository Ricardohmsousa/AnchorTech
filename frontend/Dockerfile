# Use Node.js 18 alpine image
FROM node:18-alpine

# Accept build arguments
ARG REACT_APP_API_URL
ARG REACT_APP_STRIPE_PUBLISHABLE_KEY
ARG REACT_APP_FIREBASE_API_KEY
ARG REACT_APP_FIREBASE_AUTH_DOMAIN
ARG REACT_APP_FIREBASE_PROJECT_ID
ARG REACT_APP_FIREBASE_STORAGE_BUCKET
ARG REACT_APP_FIREBASE_MESSAGING_SENDER_ID
ARG REACT_APP_FIREBASE_APP_ID

# Set environment variables from build args
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=$REACT_APP_STRIPE_PUBLISHABLE_KEY
ENV REACT_APP_FIREBASE_API_KEY=$REACT_APP_FIREBASE_API_KEY
ENV REACT_APP_FIREBASE_AUTH_DOMAIN=$REACT_APP_FIREBASE_AUTH_DOMAIN
ENV REACT_APP_FIREBASE_PROJECT_ID=$REACT_APP_FIREBASE_PROJECT_ID
ENV REACT_APP_FIREBASE_STORAGE_BUCKET=$REACT_APP_FIREBASE_STORAGE_BUCKET
ENV REACT_APP_FIREBASE_MESSAGING_SENDER_ID=$REACT_APP_FIREBASE_MESSAGING_SENDER_ID
ENV REACT_APP_FIREBASE_APP_ID=$REACT_APP_FIREBASE_APP_ID

# Set working directory
WORKDIR /app

# Copy package files
COPY package.json ./
COPY package-lock.json* ./

# Install dependencies
RUN npm install

# Copy application code
COPY . .

# Build the application for production (now with env vars available)
RUN echo "=== BUILD TIME DEBUG ===" && \
    echo "REACT_APP_API_URL: $REACT_APP_API_URL" && \
    echo "REACT_APP_STRIPE_PUBLISHABLE_KEY: ${REACT_APP_STRIPE_PUBLISHABLE_KEY:+SET}" && \
    echo "REACT_APP_FIREBASE_API_KEY: ${REACT_APP_FIREBASE_API_KEY:+SET}" && \
    echo "REACT_APP_FIREBASE_AUTH_DOMAIN: $REACT_APP_FIREBASE_AUTH_DOMAIN" && \
    echo "REACT_APP_FIREBASE_PROJECT_ID: $REACT_APP_FIREBASE_PROJECT_ID" && \
    npm run build

# Install serve globally and python3 for runtime replacement
RUN npm install -g serve && apk add --no-cache python3

# Create a simple start script directly in the Dockerfile
RUN cat > /app/docker-start.sh << 'EOF'
#!/bin/bash
set -e

echo "=== Railway Runtime Environment Setup ==="
echo "PORT: ${PORT:-3000}"

# Debug environment variables
echo "=== Environment Variables ==="
echo "REACT_APP_API_URL: ${REACT_APP_API_URL:-NOT_SET}"
echo "REACT_APP_STRIPE_PUBLISHABLE_KEY: ${REACT_APP_STRIPE_PUBLISHABLE_KEY:+SET}"
echo "REACT_APP_FIREBASE_API_KEY: ${REACT_APP_FIREBASE_API_KEY:+SET}"
echo "REACT_APP_FIREBASE_AUTH_DOMAIN: ${REACT_APP_FIREBASE_AUTH_DOMAIN:-NOT_SET}"
echo "REACT_APP_FIREBASE_PROJECT_ID: ${REACT_APP_FIREBASE_PROJECT_ID:-NOT_SET}"

# Check if HTML file exists
if [ ! -f "build/index.html" ]; then
  echo "ERROR: build/index.html not found!"
  ls -la build/ || echo "build directory not found"
  exit 1
fi

echo "=== Before Replacement ==="
grep -o "__REACT_APP_[A-Z_]*__" build/index.html | sort | uniq || echo "No placeholders found"

# Use Python for environment variable replacement
python3 << 'PYEOF'
import os
import re

print("=== Python Environment Variable Injection ===")

try:
    with open('build/index.html', 'r') as f:
        html = f.read()
    print("HTML file read successfully")
except Exception as e:
    print(f"Error reading HTML file: {e}")
    exit(1)

env_vars = {
    '__REACT_APP_API_URL__': os.environ.get('REACT_APP_API_URL', ''),
    '__REACT_APP_STRIPE_PUBLISHABLE_KEY__': os.environ.get('REACT_APP_STRIPE_PUBLISHABLE_KEY', ''),
    '__REACT_APP_FIREBASE_API_KEY__': os.environ.get('REACT_APP_FIREBASE_API_KEY', ''),
    '__REACT_APP_FIREBASE_AUTH_DOMAIN__': os.environ.get('REACT_APP_FIREBASE_AUTH_DOMAIN', ''),
    '__REACT_APP_FIREBASE_PROJECT_ID__': os.environ.get('REACT_APP_FIREBASE_PROJECT_ID', ''),
    '__REACT_APP_FIREBASE_STORAGE_BUCKET__': os.environ.get('REACT_APP_FIREBASE_STORAGE_BUCKET', ''),
    '__REACT_APP_FIREBASE_MESSAGING_SENDER_ID__': os.environ.get('REACT_APP_FIREBASE_MESSAGING_SENDER_ID', ''),
    '__REACT_APP_FIREBASE_APP_ID__': os.environ.get('REACT_APP_FIREBASE_APP_ID', '')
}

for placeholder, value in env_vars.items():
    count = html.count(placeholder)
    print(f"{placeholder}: found {count} occurrences, replacing with '{value[:20]}{'...' if len(value) > 20 else ''}'")
    html = html.replace(placeholder, value)

try:
    with open('build/index.html', 'w') as f:
        f.write(html)
    print("HTML file updated successfully")
except Exception as e:
    print(f"Error writing HTML file: {e}")
    exit(1)

remaining = re.findall(r'__REACT_APP_[A-Z_]*__', html)
if remaining:
    print(f"WARNING: Remaining placeholders: {remaining}")
else:
    print("SUCCESS: All placeholders replaced")
PYEOF

echo "=== After Replacement ==="
grep -o "__REACT_APP_[A-Z_]*__" build/index.html | sort | uniq || echo "No placeholders found (good!)"

echo "Environment variable injection complete"

# Start the server
echo "Starting server on port ${PORT:-3000}..."
exec serve -s build -l ${PORT:-3000}
EOF

# Make the script executable
RUN chmod +x /app/docker-start.sh

# Expose port
EXPOSE 3000

# Use the embedded start script
CMD ["/app/docker-start.sh"]