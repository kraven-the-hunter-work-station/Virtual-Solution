import { useState } from 'react';

// This is a simple mock authentication component for development purposes only
export function useMockAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('devAuthToken') !== null
  );
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('devUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Development-only credentials
  const DEV_CREDENTIALS = {
    email: 'dev@local',
    password: 'dev123',
    user: {
      id: 999,
      firstName: 'Dev',
      lastName: 'User',
      email: 'dev@local',
      role: 'admin'
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError('');
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (email === DEV_CREDENTIALS.email && password === DEV_CREDENTIALS.password) {
      // Success - store in localStorage
      const token = 'dev_token_' + Math.random().toString(36).substring(2);
      localStorage.setItem('devAuthToken', token);
      localStorage.setItem('devUser', JSON.stringify(DEV_CREDENTIALS.user));
      
      setIsAuthenticated(true);
      setUser(DEV_CREDENTIALS.user);
      setLoading(false);
      
      return {
        success: true,
        user: DEV_CREDENTIALS.user,
        token
      };
    } else {
      // Failed login
      setError('Invalid credentials. Use dev@local / dev123 for development');
      setIsAuthenticated(false);
      setUser(null);
      setLoading(false);
      
      return {
        success: false,
        message: 'Invalid credentials. Use dev@local / dev123 for development'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('devAuthToken');
    localStorage.removeItem('devUser');
    setIsAuthenticated(false);
    setUser(null);
  };

  return {
    isAuthenticated,
    user,
    login,
    logout,
    error,
    loading
  };
}

export default useMockAuth;
