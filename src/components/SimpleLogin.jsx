import React, { useState } from 'react';

// Create a simple login component that bypasses API calls
const SimpleLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  // Development credentials
  const DEV_CREDENTIALS = {
    email: 'test@example.com',
    password: 'test123'
  };

  // Test user object
  const TEST_USER = {
    id: 1,
    first_name: 'Test',
    last_name: 'User',
    email: 'test@example.com',
    role: 'user'
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    // Simulate network delay
    setTimeout(() => {
      if (email === DEV_CREDENTIALS.email && password === DEV_CREDENTIALS.password) {
        // Store in localStorage for persistent "login"
        localStorage.setItem('testUser', JSON.stringify(TEST_USER));
        localStorage.setItem('testToken', 'dev-token-' + Math.random());
        
        setSuccess('Login successful! Redirecting...');
        
        // Simulate redirect
        setTimeout(() => {
          window.location.href = '/'; // Redirect to home page
        }, 1500);
      } else {
        setError('Invalid credentials. Use test@example.com / test123');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Development Login</h2>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="test@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="test123"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 border-t pt-4">
        <div className="text-center text-sm text-gray-600">
          <p className="font-medium">Development Credentials:</p>
          <p>Email: test@example.com</p>
          <p>Password: test123</p>
        </div>
      </div>
    </div>
  );
};

export default SimpleLogin;
