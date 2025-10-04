// API configuration
// Use a fallback since process.env may not be available in production build
let API_BASE_URL;

// Check if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';
const isProduction = process.env.NODE_ENV === 'production' || 
                    window.location.hostname.includes('railway.app') ||
                    window.location.hostname !== 'localhost';

if (isDevelopment && window.location.hostname === 'localhost') {
  // Development: use localhost
  API_BASE_URL = 'http://localhost:8000';
} else {
  // Production: Always use the correct backend URL
  API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shimmering-communication-production.up.railway.app';
  
  // Remove any port numbers from Railway URLs to fix SSL issues
  API_BASE_URL = API_BASE_URL.replace(/:\d+$/, '');
  
  // Ensure HTTPS protocol for Railway URLs
  if (API_BASE_URL.includes('railway.app') && !API_BASE_URL.startsWith('https://')) {
    API_BASE_URL = API_BASE_URL.replace(/^http:\/\//, 'https://');
  }
}
}

console.log('Environment:', process.env.NODE_ENV);
console.log('Hostname:', window.location.hostname);
console.log('Raw REACT_APP_API_URL:', process.env.REACT_APP_API_URL);
console.log('Final API_BASE_URL:', API_BASE_URL);

export { API_BASE_URL };