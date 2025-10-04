// API configuration
// Use a fallback since process.env may not be available in production build
let API_BASE_URL;

// Check if we're in development or production
const isDevelopment = process.env.NODE_ENV === 'development';

if (isDevelopment) {
  // Development: use localhost
  API_BASE_URL = 'http://localhost:8000';
} else {
  // Production: try to get from environment, with better fallback
  try {
    API_BASE_URL = process.env.REACT_APP_API_URL;
    if (!API_BASE_URL) {
      console.warn('REACT_APP_API_URL not set, using relative URLs');
      // Use relative URLs - this will work if frontend and backend are on same domain
      API_BASE_URL = window.location.origin.replace(/:\d+$/, '') + ':' + (window.location.port || '80');
    } else {
      // Make sure the URL has protocol
      if (!API_BASE_URL.startsWith('http://') && !API_BASE_URL.startsWith('https://')) {
        API_BASE_URL = 'https://' + API_BASE_URL;
      }
    }
  } catch (error) {
    console.error('Error reading environment variables:', error);
    // Last resort: try to detect Railway environment
    if (window.location.hostname.includes('railway.app')) {
      console.warn('Detected Railway deployment, but no API URL set');
      // You'll need to replace this with your actual backend URL
      API_BASE_URL = 'https://shimmering-communication-production.up.railway.app';
    } else {
      API_BASE_URL = 'http://localhost:8000';
    }
  }
}

console.log('Environment:', process.env.NODE_ENV);
console.log('API_BASE_URL:', API_BASE_URL);
console.log('REACT_APP_API_URL from env:', process.env.REACT_APP_API_URL);

export { API_BASE_URL };