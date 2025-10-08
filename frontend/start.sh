#!/bin/bash
set -e

echo "=== Railway Runtime Environment Setup ==="

# Create the env.js file with actual environment variables
cat > build/env.js << EOF
window.ENV = {
  REACT_APP_API_URL: '${REACT_APP_API_URL}',
  REACT_APP_STRIPE_PUBLISHABLE_KEY: '${REACT_APP_STRIPE_PUBLISHABLE_KEY}'
};
EOF

echo "Environment variables injected into env.js"
echo "REACT_APP_API_URL: ${REACT_APP_API_URL:-not set}"
echo "REACT_APP_STRIPE_PUBLISHABLE_KEY: ${REACT_APP_STRIPE_PUBLISHABLE_KEY:+SET}"

# Start the application
exec "$@"