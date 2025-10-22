#!/bin/bash
set -e

echo "=== Railway Runtime Environment Setup ==="
echo "PORT: ${PORT:-3000}"

# Replace placeholders in the HTML file with actual environment variables
echo "Injecting environment variables into HTML..."
sed -i "s|__REACT_APP_API_URL__|${REACT_APP_API_URL}|g" build/index.html
sed -i "s|__REACT_APP_STRIPE_PUBLISHABLE_KEY__|${REACT_APP_STRIPE_PUBLISHABLE_KEY}|g" build/index.html
sed -i "s|__REACT_APP_FIREBASE_API_KEY__|${REACT_APP_FIREBASE_API_KEY}|g" build/index.html
sed -i "s|__REACT_APP_FIREBASE_AUTH_DOMAIN__|${REACT_APP_FIREBASE_AUTH_DOMAIN}|g" build/index.html
sed -i "s|__REACT_APP_FIREBASE_PROJECT_ID__|${REACT_APP_FIREBASE_PROJECT_ID}|g" build/index.html
sed -i "s|__REACT_APP_FIREBASE_STORAGE_BUCKET__|${REACT_APP_FIREBASE_STORAGE_BUCKET}|g" build/index.html
sed -i "s|__REACT_APP_FIREBASE_MESSAGING_SENDER_ID__|${REACT_APP_FIREBASE_MESSAGING_SENDER_ID}|g" build/index.html
sed -i "s|__REACT_APP_FIREBASE_APP_ID__|${REACT_APP_FIREBASE_APP_ID}|g" build/index.html

echo "Environment variables injected into HTML"
echo "REACT_APP_API_URL: ${REACT_APP_API_URL:-not set}"
echo "REACT_APP_STRIPE_PUBLISHABLE_KEY: ${REACT_APP_STRIPE_PUBLISHABLE_KEY:+SET}"
echo "REACT_APP_FIREBASE_API_KEY: ${REACT_APP_FIREBASE_API_KEY:+SET}"
echo "REACT_APP_FIREBASE_AUTH_DOMAIN: ${REACT_APP_FIREBASE_AUTH_DOMAIN:-not set}"
echo "REACT_APP_FIREBASE_PROJECT_ID: ${REACT_APP_FIREBASE_PROJECT_ID:-not set}"
echo "REACT_APP_FIREBASE_AUTH_DOMAIN: ${REACT_APP_FIREBASE_AUTH_DOMAIN:-not set}"
echo "REACT_APP_FIREBASE_PROJECT_ID: ${REACT_APP_FIREBASE_PROJECT_ID:-not set}"

# Start the application with dynamic port
echo "Starting server on 0.0.0.0:${PORT:-3000}"
exec serve -s build -l ${PORT:-3000} -H 0.0.0.0 --no-clipboard