// API configuration
// Use a fallback since process.env may not be available in production build
let API_BASE_URL;

// Check if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production' || 
                    window.location.hostname.includes('railway.app') ||
                    window.location.hostname !== 'localhost';

// Get API URL from build-time env vars or runtime window.ENV
const runtimeApiUrl = window.ENV?.REACT_APP_API_URL;
const buildTimeApiUrl = process.env.REACT_APP_API_URL;

if (isDevelopment && window.location.hostname === 'localhost') {
  // Development: use localhost
  API_BASE_URL = 'http://localhost:8000';
} else {
  // Production: Try runtime first, then build-time, then fallback
  API_BASE_URL = runtimeApiUrl || buildTimeApiUrl || 'https://shimmering-communication-production.up.railway.app';
  
  // Remove any port numbers from Railway URLs to fix SSL issues
  API_BASE_URL = API_BASE_URL.replace(/:\d+$/, '');
  
  // Ensure HTTPS protocol for Railway URLs
  if (API_BASE_URL.includes('railway.app') && !API_BASE_URL.startsWith('https://')) {
    API_BASE_URL = API_BASE_URL.replace(/^http:\/\//, 'https://');
  }
}

console.log('Environment:', process.env.NODE_ENV);
console.log('Hostname:', window.location.hostname);
console.log('Runtime API URL:', runtimeApiUrl);
console.log('Build-time API URL:', buildTimeApiUrl);
console.log('Final API_BASE_URL:', API_BASE_URL);

// Stripe configuration - try runtime first, then build-time
const runtimeStripeKey = window.ENV?.REACT_APP_STRIPE_PUBLISHABLE_KEY;
const buildTimeStripeKey = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;
export const STRIPE_PUBLISHABLE_KEY = runtimeStripeKey || buildTimeStripeKey;

console.log('Runtime Stripe key available:', !!runtimeStripeKey);
console.log('Build-time Stripe key available:', !!buildTimeStripeKey);
console.log('Final Stripe key available:', !!STRIPE_PUBLISHABLE_KEY);
console.log('Stripe key length:', STRIPE_PUBLISHABLE_KEY ? STRIPE_PUBLISHABLE_KEY.length : 0);

export { API_BASE_URL };