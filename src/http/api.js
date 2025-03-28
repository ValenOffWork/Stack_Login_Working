import axios from 'axios';

// Base API URL
const API_URL = 'https://dummyjson.com';

// Create an Axios instance
const api = axios.create({
  baseURL: API_URL,
  timeout: 5000, // Set request timeout (optional)
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor for requests (Modify headers if needed)
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor for responses
api.interceptors.response.use(
  (response) => {
    console.log('Response:', response);
    return response;
  },
  (error) => {
    console.error('API Error:', error.response || error);
    return Promise.reject(error);
  }
);

export default api;
