import { a } from "framer-motion/client";

// API Configuration
export const API_CONFIG = {
  // Base URLs
  development: 'http://localhost:8080',
  production: 'https://virtualsolutionspath.com',
  
  // Endpoints
  endpoints: {
    contact: '/contact.php',
    auth: {
      login: '/dev-auth.php', // Development-only endpoint
      signup: '/dev-auth.php', // Development-only endpoint
      profile: '/dev-auth.php', // Development-only endpoint
    },
    courses: {
      list: '/courses.php',
      details: '/course.php',
      enroll: '/enroll.php',
    },
  },
  
  // Request timeouts (in milliseconds)
  timeouts: {
    default: 10000, // 10 seconds
    upload: 30000,  // 30 seconds
  },
  
  // Error messages
  errorMessages: {
    network: 'Network error occurred. Please check your connection.',
    server: 'Server error occurred. Please try again later.',
    auth: {
      invalid: 'Invalid email or password',
      expired: 'Your session has expired. Please log in again.',
    },
    validation: {
      required: 'This field is required',
      email: 'Please enter a valid email address',
      password: 'Password must be at least 8 characters long',
    },
  },
};

// Environment-specific configuration
export const getApiConfig = () => {
  const env = process.env.NODE_ENV || 'development';
  return {
    ...API_CONFIG,
    baseURL: API_CONFIG[env as keyof Pick<typeof API_CONFIG, 'development' | 'production'>],
  };
};
