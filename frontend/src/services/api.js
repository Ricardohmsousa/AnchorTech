// Authenticated API utility for making requests with JWT token
import { API_BASE_URL } from '../config';

// Get JWT token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('jwt_token');
};

// Create authenticated fetch wrapper
export const authenticatedFetch = async (endpoint, options = {}) => {
  const token = getAuthToken();
  
  const config = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    },
  };

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
  
  // Handle token expiration
  if (response.status === 401) {
    // Token expired or invalid, redirect to login
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('backend_user');
    window.location.href = '/login';
    throw new Error('Authentication expired');
  }
  
  return response;
};

// Common API methods
export const apiClient = {
  // GET request
  get: (endpoint) => authenticatedFetch(endpoint),
  
  // POST request
  post: (endpoint, data) => authenticatedFetch(endpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  
  // PUT request
  put: (endpoint, data) => authenticatedFetch(endpoint, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  // DELETE request
  delete: (endpoint) => authenticatedFetch(endpoint, {
    method: 'DELETE',
  }),
  
  // File upload
  postFile: (endpoint, formData) => authenticatedFetch(endpoint, {
    method: 'POST',
    headers: {
      // Don't set Content-Type for FormData, let browser set it
      'Authorization': `Bearer ${getAuthToken()}`,
    },
    body: formData,
  }),
};

export default apiClient;