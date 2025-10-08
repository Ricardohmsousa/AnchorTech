#!/bin/bash
echo "=== Environment Check ==="
echo "NODE_ENV: $NODE_ENV"
echo "REACT_APP_API_URL: $REACT_APP_API_URL"
echo "REACT_APP_STRIPE_PUBLISHABLE_KEY available: $([ -n "$REACT_APP_STRIPE_PUBLISHABLE_KEY" ] && echo "YES" || echo "NO")"
echo "REACT_APP_STRIPE_PUBLISHABLE_KEY length: ${#REACT_APP_STRIPE_PUBLISHABLE_KEY}"
echo "========================="