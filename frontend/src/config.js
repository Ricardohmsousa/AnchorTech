// API configuration for TechAnchor frontend

// Helper function to get environment variable from build-time or runtime
function getEnvVar(name) {
  // First try build-time environment variable
  if (process.env[name]) {
    return process.env[name];
  }
  
  // Then try runtime environment variable from window.ENV
  if (typeof window !== 'undefined' && window.ENV && window.ENV[name] && !window.ENV[name].includes('_PLACEHOLDER')) {
    return window.ENV[name];
  }
  
  return null;
}

// Check if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

// API Base URL configuration
let API_BASE_URL;

if (isDevelopment && window.location.hostname === 'localhost') {
  // Development: use localhost backend
  API_BASE_URL = 'http://localhost:8000';
} else {
  // Production: Use environment variable or fallback to Railway URL
  API_BASE_URL = getEnvVar('REACT_APP_API_URL') || 'https://shimmering-communication-production.up.railway.app';
  
  // Clean up Railway URLs - remove port numbers to fix SSL issues
  API_BASE_URL = API_BASE_URL.replace(/:\d+$/, '');
  
  // Ensure HTTPS protocol for Railway URLs
  if (API_BASE_URL.includes('railway.app') && !API_BASE_URL.startsWith('https://')) {
    API_BASE_URL = API_BASE_URL.replace(/^http:\/\//, 'https://');
  }
}

// Stripe configuration
// For production, set REACT_APP_STRIPE_PUBLISHABLE_KEY in Railway environment variables
const STRIPE_PUBLISHABLE_KEY = getEnvVar('REACT_APP_STRIPE_PUBLISHABLE_KEY');

// Firebase configuration
// Add these environment variables to your .env file and Railway deployment
const FIREBASE_CONFIG = {
  apiKey: getEnvVar('REACT_APP_FIREBASE_API_KEY'),
  authDomain: getEnvVar('REACT_APP_FIREBASE_AUTH_DOMAIN'),
  projectId: getEnvVar('REACT_APP_FIREBASE_PROJECT_ID'),
  storageBucket: getEnvVar('REACT_APP_FIREBASE_STORAGE_BUCKET'),
  messagingSenderId: getEnvVar('REACT_APP_FIREBASE_MESSAGING_SENDER_ID'),
  appId: getEnvVar('REACT_APP_FIREBASE_APP_ID')
};

// Debug logging - show what environment variables are available
console.log('=== CONFIG DEBUG ===');
console.log('Environment:', process.env.NODE_ENV);
console.log('Hostname:', window.location.hostname);
console.log('window.ENV exists:', !!window.ENV);
console.log('window.ENV contents:', window.ENV);
console.log('Raw process.env.REACT_APP_API_URL:', process.env.REACT_APP_API_URL || 'NOT SET');
console.log('Raw process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY:', process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');
console.log('Raw process.env.REACT_APP_FIREBASE_API_KEY:', process.env.REACT_APP_FIREBASE_API_KEY ? 'SET' : 'NOT SET');
console.log('Runtime window.ENV.REACT_APP_API_URL:', window.ENV?.REACT_APP_API_URL || 'NOT SET');
console.log('Runtime window.ENV.REACT_APP_STRIPE_PUBLISHABLE_KEY:', window.ENV?.REACT_APP_STRIPE_PUBLISHABLE_KEY ? 'SET' : 'NOT SET');
console.log('Runtime window.ENV.REACT_APP_FIREBASE_API_KEY:', window.ENV?.REACT_APP_FIREBASE_API_KEY ? 'SET' : 'NOT SET');
console.log('Runtime window.ENV.REACT_APP_FIREBASE_AUTH_DOMAIN:', window.ENV?.REACT_APP_FIREBASE_AUTH_DOMAIN || 'NOT SET');
console.log('Runtime window.ENV.REACT_APP_FIREBASE_PROJECT_ID:', window.ENV?.REACT_APP_FIREBASE_PROJECT_ID || 'NOT SET');
console.log('getEnvVar test for STRIPE:', getEnvVar('REACT_APP_STRIPE_PUBLISHABLE_KEY'));
console.log('getEnvVar test for FIREBASE_API_KEY:', getEnvVar('REACT_APP_FIREBASE_API_KEY'));
console.log('Final API_BASE_URL:', API_BASE_URL);
console.log('Final Stripe key available:', !!STRIPE_PUBLISHABLE_KEY);
console.log('Final Stripe key length:', STRIPE_PUBLISHABLE_KEY ? STRIPE_PUBLISHABLE_KEY.length : 0);
console.log('Final Firebase config valid:', !!(FIREBASE_CONFIG.apiKey && FIREBASE_CONFIG.projectId));

// If environment variables are missing, show instructions
if (!getEnvVar('REACT_APP_STRIPE_PUBLISHABLE_KEY')) {
  console.warn('⚠️ REACT_APP_STRIPE_PUBLISHABLE_KEY not found!');
  console.warn('Please add this as a build-time environment variable in Railway.');
  console.warn('Go to Railway → Frontend Service → Variables → Add Variable');
}

if (!getEnvVar('REACT_APP_FIREBASE_API_KEY')) {
  console.warn('⚠️ Firebase configuration not found!');
  console.warn('Please add Firebase environment variables:');
  console.warn('- REACT_APP_FIREBASE_API_KEY');
  console.warn('- REACT_APP_FIREBASE_AUTH_DOMAIN');
  console.warn('- REACT_APP_FIREBASE_PROJECT_ID');
  console.warn('- REACT_APP_FIREBASE_STORAGE_BUCKET');
  console.warn('- REACT_APP_FIREBASE_MESSAGING_SENDER_ID');
  console.warn('- REACT_APP_FIREBASE_APP_ID');
}

console.log('==================');

// Export configuration
export { API_BASE_URL, FIREBASE_CONFIG, STRIPE_PUBLISHABLE_KEY };