import React, { useState } from 'react';
import { 
  User,
  Lock,
  Mail,
  CheckCircle,
  AlertTriangle,
  Sparkles,
  LogIn,
  UserPlus,
  ArrowRight
} from 'lucide-react';

export default function AuthPage() {
  // State for tracking login vs signup view
  const [isLogin, setIsLogin] = useState(true);
  
  // Form data state
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // UI states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  
  // Form validation
  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Clear validation errors when typing
    setValidationErrors({
      ...validationErrors,
      [name]: ''
    });
    
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear general error message
    setSubmitError(null);
  };
  
  // Validate form inputs
  const validateForm = () => {
    let isValid = true;
    const errors = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
    
    // Only validate first/last name for sign up
    if (!isLogin) {
      if (!formData.firstName.trim()) {
        errors.firstName = 'First name is required';
        isValid = false;
      }
      
      if (!formData.lastName.trim()) {
        errors.lastName = 'Last name is required';
        isValid = false;
      }
    }
    
    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
      isValid = false;
    }
    
    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (!isLogin && formData.password.length < 8) {
      errors.password = 'Password must be at least 8 characters';
      isValid = false;
    }
    
    // Confirm password validation (sign up only)
    if (!isLogin && formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }
    
    setValidationErrors(errors);
    return isValid;
  };
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Reset states
    setSubmitError(null);
    setSubmitSuccess(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Use the working localStorage-based authentication
      if (isLogin) {
        // Handle Login
        const result = handleLocalLogin(formData.email, formData.password);
        
        if (result.success) {
          setSubmitSuccess('Login successful! Redirecting...');
          
          // Store auth data
          localStorage.setItem('authToken', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          
          // Redirect after delay
          setTimeout(() => {
            window.location.href = '/';
          }, 1500);
        } else {
          setSubmitError(result.message);
        }
      } else {
        // Handle Registration
        const result = handleLocalRegistration(formData);
        
        if (result.success) {
          setSubmitSuccess('Registration successful! You can now log in.');
          
          // Clear form
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
          });
          
          // Switch to login view after successful signup
          setTimeout(() => {
            setIsLogin(true);
            setSubmitSuccess(null);
          }, 2000);
        } else {
          setSubmitError(result.message);
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setSubmitError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Local authentication functions
  const handleLocalLogin = (email: string, password: string) => {
    // Get users from localStorage
    const users = JSON.parse(localStorage.getItem('virtualSolutionsUsers') || JSON.stringify([
      {
        id: 1,
        firstName: 'Test',
        lastName: 'User',
        email: 'test@example.com',
        password: 'Test1234!',
        role: 'user',
        isActive: true
      },
      {
        id: 2,
        firstName: 'Admin',
        lastName: 'User',
        email: 'admin@virtualsolutionspath.com',
        password: 'Admin123!',
        role: 'admin',
        isActive: true
      }
    ]));

    // Find user
    const user = users.find((u: any) => 
      u.email.toLowerCase() === email.toLowerCase() && 
      u.password === password && 
      u.isActive
    );

    if (!user) {
      return { success: false, message: 'Invalid email or password' };
    }

    // Generate token
    const token = 'auth_token_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

    return {
      success: true,
      token,
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    };
  };

  const handleLocalRegistration = (userData: any) => {
    // Get existing users
    const users = JSON.parse(localStorage.getItem('virtualSolutionsUsers') || '[]');

    // Check if email already exists
    const existingUser = users.find((u: any) => 
      u.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (existingUser) {
      return { success: false, message: 'Email already registered' };
    }

    // Validate password strength
    if (userData.password.length < 8) {
      return { success: false, message: 'Password must be at least 8 characters long' };
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: userData.password,
      role: 'user',
      createdAt: new Date().toISOString(),
      isActive: true
    };

    // Add to users array
    users.push(newUser);
    localStorage.setItem('virtualSolutionsUsers', JSON.stringify(users));

    return { success: true, user: newUser };
  };
  
  // Toggle between login and signup views
  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setSubmitError(null);
    setSubmitSuccess(null);
    setValidationErrors({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    });
  };

  return (
    <section className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      {/* Premium Background (same as contact page for consistency) */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20"></div>
        
        {/* Floating Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-600/6 to-pink-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '8s' }}></div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      <div className="relative z-10 w-full max-w-md px-4">
        <div className="group relative">
          {/* Form Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="relative p-10 rounded-3xl backdrop-blur-xl border border-gray-600/30 group-hover:border-purple-500/50 transition-all duration-500"
               style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
            
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
                <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                <div className="w-8 h-0.5 bg-gradient-to-r from-purple-400 to-transparent"></div>
              </div>
              
              <h1 className="text-3xl font-bold mb-2">
                <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                  {isLogin ? 'Welcome Back' : 'Create Account'}
                </span>
              </h1>
              
              <p className="text-gray-300 text-sm">
                {isLogin ? 'Sign in to access your account' : 'Join our community today'}
              </p>
            </div>
            
            {/* Auth Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Sign Up Fields */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="group">
                    <label className="block text-white font-medium mb-2 text-sm">First Name</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={`w-full px-10 py-3 bg-gray-800/50 border ${
                          validationErrors.firstName ? 'border-red-500/50' : 'border-gray-600/50'
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-800/70 transition-all duration-300`}
                        placeholder="John"
                      />
                    </div>
                    {validationErrors.firstName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.firstName}</p>
                    )}
                  </div>
                  
                  <div className="group">
                    <label className="block text-white font-medium mb-2 text-sm">Last Name</label>
                    <div className="relative">
                      <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400">
                        <User className="w-5 h-5" />
                      </div>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={`w-full px-10 py-3 bg-gray-800/50 border ${
                          validationErrors.lastName ? 'border-red-500/50' : 'border-gray-600/50'
                        } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-800/70 transition-all duration-300`}
                        placeholder="Doe"
                      />
                    </div>
                    {validationErrors.lastName && (
                      <p className="text-red-500 text-xs mt-1">{validationErrors.lastName}</p>
                    )}
                  </div>
                </div>
              )}
              
              {/* Email Field */}
              <div className="group">
                <label className="block text-white font-medium mb-2 text-sm">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-10 py-3 bg-gray-800/50 border ${
                      validationErrors.email ? 'border-red-500/50' : 'border-gray-600/50'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-800/70 transition-all duration-300`}
                    placeholder="your@email.com"
                  />
                </div>
                {validationErrors.email && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
                )}
              </div>
              
              {/* Password Field */}
              <div className="group">
                <label className="block text-white font-medium mb-2 text-sm">Password</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-10 py-3 bg-gray-800/50 border ${
                      validationErrors.password ? 'border-red-500/50' : 'border-gray-600/50'
                    } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-800/70 transition-all duration-300`}
                    placeholder="••••••••"
                  />
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-xs mt-1">{validationErrors.password}</p>
                )}
              </div>
              
              {/* Confirm Password Field (Sign Up only) */}
              {!isLogin && (
                <div className="group">
                  <label className="block text-white font-medium mb-2 text-sm">Confirm Password</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -mt-2.5 text-gray-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={`w-full px-10 py-3 bg-gray-800/50 border ${
                        validationErrors.confirmPassword ? 'border-red-500/50' : 'border-gray-600/50'
                      } rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-800/70 transition-all duration-300`}
                      placeholder="••••••••"
                    />
                  </div>
                  {validationErrors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{validationErrors.confirmPassword}</p>
                  )}
                </div>
              )}
              
              {/* Error/Success Messages */}
              {submitError && (
                <div className="p-3 bg-red-900/30 border border-red-500/30 rounded-xl text-white">
                  <div className="flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-red-400" />
                    <p className="text-sm text-red-200">{submitError}</p>
                  </div>
                </div>
              )}
              
              {submitSuccess && (
                <div className="p-3 bg-green-900/30 border border-green-500/30 rounded-xl text-white">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <p className="text-sm text-green-200">{submitSuccess}</p>
                  </div>
                </div>
              )}
              
              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full px-6 py-3 rounded-xl font-bold text-base transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden text-white disabled:opacity-70"
                style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}
              >
                {/* Button Glow */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -top-4 -left-4 w-6 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:animate-shimmer"></div>
                
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {isLogin ? (
                    <>
                      <LogIn className="w-5 h-5" />
                      <span>{isSubmitting ? 'Signing In...' : 'Sign In'}</span>
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-5 h-5" />
                      <span>{isSubmitting ? 'Creating Account...' : 'Create Account'}</span>
                    </>
                  )}
                </span>
              </button>
              
              {/* Toggle Auth Mode */}
              <div className="text-center mt-6">
                <button 
                  type="button" 
                  onClick={toggleAuthMode}
                  className="text-sm text-gray-300 hover:text-white transition-colors flex items-center justify-center gap-1 mx-auto group"
                >
                  {isLogin ? "Don't have an account?" : "Already have an account?"}
                  <span className="text-purple-400 font-medium">
                    {isLogin ? 'Sign Up' : 'Sign In'}
                  </span>
                  <ArrowRight className="w-3 h-3 text-purple-400 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      
      {/* Premium Styles */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%) skewX(-12deg);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: translateX(300%) skewX(-12deg);
            opacity: 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s ease-in-out;
        }
      `}</style>
    </section>
  );
}
