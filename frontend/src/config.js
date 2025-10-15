// API configuration  // API configuration  // API configuration  

// Simple, build-safe configuration

// Simple, build-safe configurationlet API_BASE_URL;

// Production API URL from environment or fallback

let API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shimmering-communication-production.up.railway.app';const isDevelopment = process.env.NODE_ENV === 'development';



// Clean up Railway URLs// Check if we're in development or production

API_BASE_URL = API_BASE_URL.replace(/:\d+$/, '');

if (API_BASE_URL.includes('railway.app') && !API_BASE_URL.startsWith('https://')) {// Production API URL from environment or fallbackconst isDevelopment = process.env.NODE_ENV === 'development';

  API_BASE_URL = API_BASE_URL.replace(/^http:\/\//, 'https://');

}let API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shimmering-communication-production.up.railway.app';



// Stripe configurationif (isDevelopment && window.location.hostname === 'localhost') {

const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;

// Clean up Railway URLs  // Development: use localhost

// Export configuration

export { API_BASE_URL, STRIPE_PUBLISHABLE_KEY };API_BASE_URL = API_BASE_URL.replace(/:\d+$/, '');  API_BASE_URL = 'http://localhost:8000';

if (API_BASE_URL.includes('railway.app') && !API_BASE_URL.startsWith('https://')) {} else {

  API_BASE_URL = API_BASE_URL.replace(/^http:\/\//, 'https://');  // Production: Use environment variable or fallback

}  API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shimmering-communication-production.up.railway.app';

  

// Stripe configuration  // Remove any port numbers from Railway URLs to fix SSL issues

const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY;  API_BASE_URL = API_BASE_URL.replace(/:\d+$/, '');

  

// Export configuration  // Ensure HTTPS protocol for Railway URLs

export { API_BASE_URL, STRIPE_PUBLISHABLE_KEY };  if (API_BASE_URL.includes('railway.app') && !API_BASE_URL.startsWith('https://')) {
    API_BASE_URL = API_BASE_URL.replace(/^http:\/\//, 'https://');
  }
}

// Stripe configuration
// For production, set REACT_APP_STRIPE_PUBLISHABLE_KEY in Railway environment variables
// Make sure to also add these as build-time environment variables in Railway
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

export { API_BASE_URL };