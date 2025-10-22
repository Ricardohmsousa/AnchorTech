#!/bin/bash
set -e

echo "=== Railway Runtime Environment Setup ==="
echo "PORT: ${PORT:-3000}"

# Use Node.js script to inject environment variables
echo "Running environment variable injection script..."
node inject-env.js

echo "Environment variable injection complete"
echo "REACT_APP_FIREBASE_AUTH_DOMAIN: ${REACT_APP_FIREBASE_AUTH_DOMAIN:-not set}"
echo "REACT_APP_FIREBASE_PROJECT_ID: ${REACT_APP_FIREBASE_PROJECT_ID:-not set}"

# Start the application with dynamic port
echo "Starting server on 0.0.0.0:${PORT:-3000}"
exec serve -s build -l ${PORT:-3000} -H 0.0.0.0 --no-clipboard