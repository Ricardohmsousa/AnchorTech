#!/bin/bash
set -e

echo "=== Railway Runtime Environment Setup ==="
echo "PORT: ${PORT:-3000}"

# Replace any remaining placeholders in HTML (in case build didn't replace them)
if grep -q "PLACEHOLDER" build/index.html 2>/dev/null; then
  echo "Replacing environment variable placeholders in HTML..."
  sed -i "s|REACT_APP_API_URL_PLACEHOLDER|${REACT_APP_API_URL}|g" build/index.html
  sed -i "s|REACT_APP_STRIPE_PUBLISHABLE_KEY_PLACEHOLDER|${REACT_APP_STRIPE_PUBLISHABLE_KEY}|g" build/index.html
  sed -i "s|REACT_APP_FIREBASE_API_KEY_PLACEHOLDER|${REACT_APP_FIREBASE_API_KEY}|g" build/index.html
  sed -i "s|REACT_APP_FIREBASE_AUTH_DOMAIN_PLACEHOLDER|${REACT_APP_FIREBASE_AUTH_DOMAIN}|g" build/index.html
  sed -i "s|REACT_APP_FIREBASE_PROJECT_ID_PLACEHOLDER|${REACT_APP_FIREBASE_PROJECT_ID}|g" build/index.html
  sed -i "s|REACT_APP_FIREBASE_STORAGE_BUCKET_PLACEHOLDER|${REACT_APP_FIREBASE_STORAGE_BUCKET}|g" build/index.html
  sed -i "s|REACT_APP_FIREBASE_MESSAGING_SENDER_ID_PLACEHOLDER|${REACT_APP_FIREBASE_MESSAGING_SENDER_ID}|g" build/index.html
  sed -i "s|REACT_APP_FIREBASE_APP_ID_PLACEHOLDER|${REACT_APP_FIREBASE_APP_ID}|g" build/index.html
  echo "Placeholders replaced in HTML"
fi

echo "Environment variables status:"
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