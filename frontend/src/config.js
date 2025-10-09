// API configuration  
let API_BASE_URL;

// Check if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment && window.location.hostname === 'localhost') {
  // Development: use localhost
  API_BASE_URL = 'http://localhost:8000';
} else {
  // Production: Use environment variable or fallback
  API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shimmering-communication-production.up.railway.app';
  
  // Remove any port numbers from Railway URLs to fix SSL issues
  API_BASE_URL = API_BASE_URL.replace(/:\d+$/, '');
  
  // Ensure HTTPS protocol for Railway URLs
  if (API_BASE_URL.includes('railway.app') && !API_BASE_URL.startsWith('https://')) {
    API_BASE_URL = API_BASE_URL.replace(/^http:\/\//, 'https://');
  }
}

// Stripe configuration with temporary test key fallback
export const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_51QCEhOE8WgUB6VyHHT8xQIZVZQE4rz9WTpQGXQpQG0P0XKXEL3BLSp4QcZbJY1G9yGyzE8XQP2UfCKh3ksBuS6Bj00vZAZpBfP';

// Debug logging
console.log('=== CONFIG DEBUG ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Hostname:', window.location.hostname);
console.log('Raw REACT_APP_API_URL:', process.env.REACT_APP_API_URL || 'NOT SET');
console.log('Raw REACT_APP_STRIPE_PUBLISHABLE_KEY:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');
console.log('Final API_BASE_URL:', API_BASE_URL);
console.log('Final Stripe key available:', !!STRIPE_PUBLISHABLE_KEY);
console.log('Final Stripe key length:', STRIPE_PUBLISHABLE_KEY ? STRIPE_PUBLISHABLE_KEY.length : 0);
console.log('==================');

export { API_BASE_URL };