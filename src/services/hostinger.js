import axios from 'axios';

// Base URL for API endpoints
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://virtualsolutionspath.com' 
  : 'http://localhost';

// Create axios instance with common configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false, // Set to true if you want to send cookies with requests
});

// API endpoints
export const endpoints = {
  contact: '/contact.php',
  login: '/login.php',
  signup: '/signup.php',
  emailService: '/email-service.php',
};

// Contact form submission
export const submitContactForm = async (formData) => {
  try {
    const response = await api.post(endpoints.contact, formData);
    return response.data;
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      throw new Error(error.response.data.message || 'An error occurred while submitting the form');
    } else if (error.request) {
      // The request was made but no response was received
      throw new Error('No response from server. Please check your connection');
    } else {
      // Something happened in setting up the request
      throw new Error('Error sending request. Please try again later');
    }
  }
};

// User authentication
export const loginUser = async (credentials) => {
  try {
    const response = await api.post(endpoints.login, credentials);
    
    // Store token in localStorage if successful
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Login failed');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection');
    } else {
      throw new Error('Error sending request. Please try again later');
    }
  }
};

// User registration
export const registerUser = async (userData) => {
  try {
    const response = await api.post(endpoints.signup, userData);
    
    // Store token in localStorage if successful
    if (response.data.token) {
      localStorage.setItem('auth_token', response.data.token);
      localStorage.setItem('user_data', JSON.stringify(response.data.user));
    }
    
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'Registration failed');
    } else if (error.request) {
      throw new Error('No response from server. Please check your connection');
    } else {
      throw new Error('Error sending request. Please try again later');
    }
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('auth_token');
  localStorage.removeItem('user_data');
  
  // You can also call a logout endpoint if needed
  // return api.post('/logout');
};

// Check if user is logged in
export const isAuthenticated = () => {
  return localStorage.getItem('auth_token') !== null;
};

// Get current user data
export const getCurrentUser = () => {
  const userData = localStorage.getItem('user_data');
  return userData ? JSON.parse(userData) : null;
};

// Add authorization header to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default {
  submitContactForm,
  loginUser,
  registerUser,
  logoutUser,
  isAuthenticated,
  getCurrentUser,
};
