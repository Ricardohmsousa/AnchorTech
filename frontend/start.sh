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
echo "REACT_APP_GA_MEASUREMENT_ID: ${REACT_APP_GA_MEASUREMENT_ID:+SET}"

# Check if HTML file exists
if [ ! -f "build/index.html" ]; then
  echo "ERROR: build/index.html not found!"
  ls -la build/ || echo "build directory not found"
  exit 1
fi

echo "=== Before Replacement ==="
grep -o "__REACT_APP_[A-Z_]*__" build/index.html | sort | uniq || echo "No placeholders found"

# Use Python for more reliable replacement (Python is available on Railway)
python3 << 'EOF'
import os
import re

print("=== Python Environment Variable Injection ===")

# Read the HTML file
try:
    with open('build/index.html', 'r') as f:
        html = f.read()
    print("HTML file read successfully")
except Exception as e:
    print(f"Error reading HTML file: {e}")
    exit(1)

# Environment variables to replace
env_vars = {
    '__REACT_APP_API_URL__': os.environ.get('REACT_APP_API_URL', ''),
    '__REACT_APP_STRIPE_PUBLISHABLE_KEY__': os.environ.get('REACT_APP_STRIPE_PUBLISHABLE_KEY', ''),
    '__REACT_APP_FIREBASE_API_KEY__': os.environ.get('REACT_APP_FIREBASE_API_KEY', ''),
    '__REACT_APP_FIREBASE_AUTH_DOMAIN__': os.environ.get('REACT_APP_FIREBASE_AUTH_DOMAIN', ''),
    '__REACT_APP_FIREBASE_PROJECT_ID__': os.environ.get('REACT_APP_FIREBASE_PROJECT_ID', ''),
    '__REACT_APP_FIREBASE_STORAGE_BUCKET__': os.environ.get('REACT_APP_FIREBASE_STORAGE_BUCKET', ''),
    '__REACT_APP_FIREBASE_MESSAGING_SENDER_ID__': os.environ.get('REACT_APP_FIREBASE_MESSAGING_SENDER_ID', ''),
    '__REACT_APP_FIREBASE_APP_ID__': os.environ.get('REACT_APP_FIREBASE_APP_ID', ''),
    '__REACT_APP_GA_MEASUREMENT_ID__': os.environ.get('REACT_APP_GA_MEASUREMENT_ID', '')
}

# Show what we're replacing
for placeholder, value in env_vars.items():
    count = html.count(placeholder)
    print(f"{placeholder}: found {count} occurrences, replacing with '{value[:20]}{'...' if len(value) > 20 else ''}'")
    html = html.replace(placeholder, value)

# Write back
try:
    with open('build/index.html', 'w') as f:
        f.write(html)
    print("HTML file updated successfully")
except Exception as e:
    print(f"Error writing HTML file: {e}")
    exit(1)

# Check for remaining placeholders
remaining = re.findall(r'__REACT_APP_[A-Z_]*__', html)
if remaining:
    print(f"WARNING: Remaining placeholders: {remaining}")
else:
    print("SUCCESS: All placeholders replaced")
EOF

echo "=== After Replacement ==="
grep -o "__REACT_APP_[A-Z_]*__" build/index.html | sort | uniq || echo "No placeholders found (good!)"

echo "Environment variable injection complete"

# Start the server
echo "Starting server on port ${PORT:-3000}..."
exec serve -s build -l ${PORT:-3000}
echo "REACT_APP_FIREBASE_AUTH_DOMAIN: ${REACT_APP_FIREBASE_AUTH_DOMAIN:-not set}"
echo "REACT_APP_FIREBASE_PROJECT_ID: ${REACT_APP_FIREBASE_PROJECT_ID:-not set}"

# Start the application with dynamic port
echo "Starting server on 0.0.0.0:${PORT:-3000}"
exec serve -s build -l ${PORT:-3000} -H 0.0.0.0 --no-clipboard