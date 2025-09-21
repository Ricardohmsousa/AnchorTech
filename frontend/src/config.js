// API configuration
// Use a fallback since process.env may not be available in production build
let API_BASE_URL;

try {
  API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';
} catch (error) {
  // Fallback for production builds where process.env is not available
  API_BASE_URL = 'http://localhost:8000';
}

export { API_BASE_URL };