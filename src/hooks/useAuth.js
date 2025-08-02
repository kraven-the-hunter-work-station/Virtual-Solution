import React, { createContext, useContext } from 'react';
import useMockAuth from './useMockAuth';

// Create auth context
const AuthContext = createContext(null);

// Provider component
export const AuthProvider = ({ children }) => {
  const auth = useMockAuth();
  
  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook for components to get auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
