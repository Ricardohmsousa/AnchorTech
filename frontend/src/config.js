// API configuration for TechAnchor frontend

// Check if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

// API Base URL configuration
let API_BASE_URL;

if (isDevelopment && window.location.hostname === 'localhost') {
  // Development: use localhost backend
  API_BASE_URL = 'http://localhost:8000';
} else {
  // Production: Use environment variable or fallback to Railway URL
  API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shimmering-communication-production.up.railway.app';
  
  // Clean up Railway URLs - remove port numbers to fix SSL issues
  API_BASE_URL = API_BASE_URL.replace(/:\d+$/, '');
  
  // Ensure HTTPS protocol for Railway URLs
  if (API_BASE_URL.includes('railway.app') && !API_BASE_URL.startsWith('https://')) {
    API_BASE_URL = API_BASE_URL.replace(/^http:\/\//, 'https://');
  }
}

// Stripe configuration
// For production, set REACT_APP_STRIPE_PUBLISHABLE_KEY in Railway environment variables
export const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

// Debug logging - show what environment variables are available
console.log('=== CONFIG DEBUG ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Hostname:', window.location.hostname);
console.log('Raw REACT_APP_API_URL:', process.env.REACT_APP_API_URL || 'NOT SET');
console.log('Raw REACT_APP_STRIPE_PUBLISHABLE_KEY:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');
console.log('Final API_BASE_URL:', API_BASE_URL);
console.log('Final Stripe key available:', !!STRIPE_PUBLISHABLE_KEY);
console.log('Final Stripe key length:', STRIPE_PUBLISHABLE_KEY ? STRIPE_PUBLISHABLE_KEY.length : 0);

// If environment variables are missing, show instructions
if (!process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY) {
  console.warn('⚠️ REACT_APP_STRIPE_PUBLISHABLE_KEY not found!');
  console.warn('Please add this as a build-time environment variable in Railway.');
  console.warn('Go to Railway → Frontend Service → Variables → Add Variable');
}

console.log('==================');

// Export configuration
export { API_BASE_URL };