# Use Node.js 18 alpine image
FROM node:18-alpine

# Accept build arguments
ARG REACT_APP_API_URL
ARG REACT_APP_STRIPE_PUBLISHABLE_KEY

# Set environment variables from build args
ENV REACT_APP_API_URL=$REACT_APP_API_URL
ENV REACT_APP_STRIPE_PUBLISHABLE_KEY=$REACT_APP_STRIPE_PUBLISHABLE_KEY

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
    npm run build

# Install serve globally
RUN npm install -g serve

# Expose port
EXPOSE 3000

# Start the application with dynamic port
CMD ["sh", "-c", "serve -s build -l ${PORT:-3000}"]