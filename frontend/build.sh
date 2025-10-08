#!/bin/bash
set -e

echo "=== Railway Build Environment Check ==="
echo "NODE_ENV: ${NODE_ENV:-not set}"
echo "REACT_APP_API_URL: ${REACT_APP_API_URL:-not set}"
echo "REACT_APP_STRIPE_PUBLISHABLE_KEY: ${REACT_APP_STRIPE_PUBLISHABLE_KEY:+SET}"
echo "======================================="

# Export environment variables explicitly
export NODE_ENV=${NODE_ENV:-production}
export REACT_APP_API_URL=${REACT_APP_API_URL}
export REACT_APP_STRIPE_PUBLISHABLE_KEY=${REACT_APP_STRIPE_PUBLISHABLE_KEY}

# Run the webpack build
npm run webpack-build