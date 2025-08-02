import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  BookOpen, 
  ArrowRight,
  Globe,
  User,
  Users,
  Settings,
  LogOut,
  ShoppingCart,
  Mail,
  Lock,
  UserPlus,
  CreditCard,
  Trash2,
  Heart,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  ThumbsUp,
  ArrowUp
} from 'lucide-react';

// Import ThemeToggle component
import ThemeToggle from './components/ThemeToggle';

// Theme style (added separately to avoid styling conflicts)
const ThemeStyles = () => (
      <style>{`
    /* Light Theme Styles */
    .light-theme {
      /* Core Colors */
      --color-primary: #4169E1; /* Royal Blue */
      --color-accent: #FF6B00; /* Vibrant Orange */
      --color-background: #FAFAFA; /* Snow White */
      --color-card-bg: #F0F2F5; /* Light Gray */
      --color-text-primary: #212529; /* Charcoal */
      --color-text-secondary: #6C757D; /* Dim Gray */
      --color-border: #E0E0E0; /* Light Silver */
      --color-success: #28A745; /* Emerald Green */
      --color-warning: #FFC107; /* Golden Yellow */
      
      /* Element Background */
      background-color: var(--color-background);
    }
    
    /* Dropdown Animation */
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    /* Theme-specific display */
    .light-theme .dark-theme-background {
      display: none;
    }
    
    .dark-theme .light-theme-background,
    :root:not(.light-theme) .light-theme-background {
      display: none;
    }    /* Base Dark Theme Styles - Default */
    :root:not(.light-theme), .dark-theme {
      /* Keep existing dark theme colors */
      --color-primary: #8B5CF6; /* Purple */
      --color-accent: #EC4899; /* Pink */
      --color-background: #0F172A; /* Dark blue black */
      --color-card-bg: #1E293B; /* Dark slate */
      --color-text-primary: #F1F5F9; /* White */
      --color-text-secondary: #94A3B8; /* Light gray */
      --color-border: #334155; /* Dark gray */
      --color-success: #10B981; /* Green */
      --color-warning: #F59E0B; /* Amber */
    }
    
    /* Light Theme Component Overrides */
    .light-theme .nav-glass-premium {
      background: rgba(255, 255, 255, 0.9) !important;
      border-color: var(--color-border) !important;
    }
    
    .light-theme .nav-item {
      color: var(--color-text-primary) !important;
    }
    
    .light-theme .nav-item.active {
      background: rgba(65, 105, 225, 0.1) !important;
      border-color: rgba(65, 105, 225, 0.3) !important;
    }
    
    .light-theme .nav-item:hover {
      background: rgba(65, 105, 225, 0.05) !important;
    }
    
    /* Add more component-specific overrides as needed */
  `}</style>
);

import HomePage from './components/HomePage';
import CoursesPage from './components/CoursesPage';
import AboutPage from './components/AboutPage';
import ReviewsPage from './components/ReviewsPageNew';
import ContactPage from './components/ContactPage';
import PrivacyPolicy from './components/PrivacyPolicy';
import BlogPage from './components/BlogPage';
import BlogPost from './components/BlogPost';
import { loginUser, registerUser } from './services/hostinger';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Changed from true to false
  const [user, setUser] = useState({ id: '', name: '', email: '', avatar: '' }); // Reset default user
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Initialize theme on app load
  useEffect(() => {
    // Check for theme preference in localStorage
    const savedTheme = localStorage.getItem('vs-theme') || 'dark';
    
    // Apply theme to body element
    if (savedTheme === 'light') {
      document.body.classList.add('light-theme');
    } else {
      document.body.classList.add('dark-theme');
    }
    
    console.log('Theme initialized:', savedTheme);
  }, []);
  
  // Check for existing authentication on app load
  useEffect(() => {
    const checkAuthentication = () => {
      const token = localStorage.getItem('auth_token') || localStorage.getItem('authToken');
      const userData = localStorage.getItem('user_data') || localStorage.getItem('user');
      
      if (token && userData) {
        try {
          const user = JSON.parse(userData);
          
          setUser({
            id: user.id,
            name: user.firstName ? `${user.firstName} ${user.lastName}` : user.name,
            email: user.email,
            avatar: user.avatar || `https://ui-avatars.com/api/?name=${user.firstName}+${user.lastName}&background=8B5CF6&color=fff`
          });
          
          setIsAuthenticated(true);
          console.log('User authenticated from storage:', user.email);
        } catch (error) {
          console.error('Error parsing authentication data:', error);
          // Clear invalid tokens
          localStorage.removeItem('authToken');
          localStorage.removeItem('auth_token');
          localStorage.removeItem('user');
          localStorage.removeItem('user_data');
        }
      } else {
        // No valid auth data found
        setIsAuthenticated(false);
        setUser({ id: '', name: '', email: '', avatar: '' });
      }
    };
    
    checkAuthentication();
  }, []);

  // Get current page from URL
  const getCurrentPage = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.substring(1); // Remove leading slash
  };

  const currentPage = getCurrentPage();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Click outside handler for cart
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Handle cart menu
      if (isCartOpen) {
        const cartMenu = document.querySelector('[data-cart-menu]');
        const cartButton = document.querySelector('[data-cart-button]');
        
        if (cartMenu && cartButton && 
            !cartMenu.contains(target) && 
            !cartButton.contains(target)) {
          setIsCartOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCartOpen]);

  // Close menus when location changes
  useEffect(() => {
    setIsMenuOpen(false);
    setProfileDropdownOpen(false);
    setIsCartOpen(false);
  }, [location.pathname]);
  
  // Global click handler to close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      // Close profile dropdown when clicking outside
      if (profileDropdownOpen) {
        const profileDropdown = document.querySelector('[data-profile-dropdown]');
        const profileButton = document.querySelector('[data-profile-button]');
        
        if (!profileDropdown || !profileButton) return;
        
        const target = event.target as Node;
        
        // Check if click is outside both dropdown and button
        if (!profileDropdown.contains(target) && !profileButton.contains(target)) {
          setProfileDropdownOpen(false);
        }
      }
    }
    
    // Handle ESC key to close dropdown
    function handleEscKey(event: KeyboardEvent) {
      if (event.key === 'Escape' && profileDropdownOpen) {
        setProfileDropdownOpen(false);
      }
    }
    
    // Add event listeners
    document.addEventListener('mousedown', handleClickOutside, true);
    document.addEventListener('keydown', handleEscKey);
    
    // Clean up
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [profileDropdownOpen]);
  
  const handleNavigation = (page: string) => {
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
    setIsMenuOpen(false);
  };

  const handleAuth = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
  };

  const handleSignIn = async (email: string, password: string) => {
    try {
      const response = await loginUser({ email, password });
      
      if (response.success && response.user && response.token) {
        // Set user data from API response
        setUser({
          id: response.user.id,
          name: `${response.user.firstName} ${response.user.lastName}`,
          email: response.user.email,
          avatar: response.user.avatar || `https://ui-avatars.com/api/?name=${response.user.firstName}+${response.user.lastName}&background=8B5CF6&color=fff`
        });
        
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
        
        console.log('User successfully signed in:', response.user.email);
      } else {
        alert(response.message || 'Login failed. Please check your credentials.');
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      alert(error.message || 'An error occurred during sign in. Please try again.');
    }
  };

  const handleSignUp = async (name: string, email: string, password: string) => {
    try {
      const response = await registerUser({ name, email, password });
      
      if (response.success && response.user && response.token) {
        // Set user data from API response
        setUser({
          id: response.user.id,
          name: `${response.user.firstName} ${response.user.lastName}`,
          email: response.user.email,
          avatar: response.user.avatar || `https://ui-avatars.com/api/?name=${response.user.firstName}+${response.user.lastName}&background=8B5CF6&color=fff`
        });
        
        setIsAuthenticated(true);
        setIsAuthModalOpen(false);
        
        console.log('User successfully registered:', response.user.email);
      } else {
        alert(response.message || 'Registration failed. Please try again.');
      }
    } catch (error: any) {
      console.error('Registration error:', error);
      alert(error.message || 'An error occurred during registration. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser({ id: '', name: '', email: '', avatar: '' });
    setCartItems([]);
    setProfileDropdownOpen(false);
    // Clear all authentication data from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user');
    localStorage.removeItem('user_data');
    console.log('User logged out successfully');
  };

  const addToCart = (courseId: number) => {
    if (!cartItems.includes(courseId)) {
      setCartItems(prev => [...prev, courseId]);
    }
  };

  const removeFromCart = (courseId: number) => {
    setCartItems(prev => prev.filter(id => id !== courseId));
  };
  
  const handleCheckout = () => {
    setIsCheckoutModalOpen(true);
    setIsCartOpen(false);
  };

  const getCartTotal = () => {
    return cartItems.reduce((total, courseId) => {
      const course = courses.find(c => c.id === courseId);
      return total + (course?.price || 0);
    }, 0);
  };

  const courses = [
    {
      id: 1,
      title: "Complete Web Development",
      instructor: "Sarah Johnson",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.9,
      students: 15420,
      duration: "52 hours",
      image: "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      level: "Beginner to Advanced",
      category: "Web Development"
    },
    {
      id: 2,
      title: "Advanced React & Node.js",
      instructor: "Michael Chen",
      price: 79.99,
      originalPrice: 159.99,
      rating: 4.8,
      students: 8930,
      duration: "38 hours",
      image: "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      level: "Intermediate",
      category: "Web Development"
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      instructor: "Emily Rodriguez",
      price: 69.99,
      originalPrice: 149.99,
      rating: 4.7,
      students: 12340,
      duration: "45 hours",
      image: "https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      level: "All Levels",
      category: "Digital Marketing"
    },
    {
      id: 4,
      title: "Data Science with Python",
      instructor: "Dr. James Wilson",
      price: 99.99,
      originalPrice: 249.99,
      rating: 4.9,
      students: 11250,
      duration: "60 hours",
      image: "https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      level: "Intermediate",
      category: "Data Science"
    },
    {
      id: 5,
      title: "UI/UX Design Fundamentals",
      instructor: "Lisa Park",
      price: 74.99,
      originalPrice: 179.99,
      rating: 4.8,
      students: 9870,
      duration: "42 hours",
      image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      level: "Beginner",
      category: "Design"
    },
    {
      id: 6,
      title: "Business Strategy & Leadership",
      instructor: "Robert Martinez",
      price: 89.99,
      originalPrice: 199.99,
      rating: 4.6,
      students: 7650,
      duration: "35 hours",
      image: "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop",
      level: "Advanced",
      category: "Business"
    }
  ];

  const testimonials = [
    {
      name: "Alex Thompson",
      role: "Full Stack Developer",
      content: "This platform transformed my career. The courses are incredibly detailed and the instructors are world-class.",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5
    },
    {
      name: "Maria Garcia",
      role: "Digital Marketing Manager",
      content: "I gained practical skills that I could immediately apply to my work. The return on investment was incredible.",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5
    },
    {
      name: "David Kim",
      role: "Startup Founder",
      content: "The quality of education here rivals traditional universities, but at a fraction of the cost and time.",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Include Theme Styles */}
      <ThemeStyles />
      
      {/* Premium Background - Adaptive to theme */}
      <div className="fixed inset-0 z-0">
        {/* Dark theme background */}
        <div className="dark-theme-background absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20"></div>
          <div className="absolute top-0 left-0 w-full h-full opacity-15">
            <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-2xl animate-pulse"></div>
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
          </div>
        </div>
        
        {/* Light theme background */}
        <div className="light-theme-background absolute inset-0">
          <div className="absolute inset-0 bg-[#FAFAFA]"></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(65, 105, 225, 0.05) 1px, transparent 1px),
                linear-gradient(90deg, rgba(65, 105, 225, 0.05) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}></div>
          </div>
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-[#4169E1]/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      {/* Floating Theme Toggle for Mobile */}
      <div className="block md:hidden">
        <ThemeToggle isFloating={true} />
      </div>

      {/* Premium Navigation */}
      <nav className="fixed top-0 w-full z-50 px-2 sm:px-4 lg:px-8 pt-2 sm:pt-3">
        <div className={`max-w-7xl mx-auto transition-all duration-500 transform ${
          scrollY > 50 
            ? 'bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 shadow-2xl backdrop-blur-2xl shadow-purple-500/20 scale-[0.98]' 
            : 'bg-gradient-to-br from-black/60 via-gray-900/60 to-black/60 backdrop-blur-xl scale-100'
        } rounded-xl sm:rounded-2xl nav-glass-premium border border-gray-600/30 hover:border-purple-500/40`}>
          
          {/* Animated Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-pink-600/5 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          
          <div className="flex justify-between items-center py-2 px-3 sm:py-3 sm:px-6 relative z-10">
            {/* Enhanced Logo */}
            <div className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer" onClick={() => handleNavigation('home')}>
              <div className="relative">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 relative overflow-hidden nav-logo">
                  <img src="/vs-logo.svg" alt="Virtual Solutions Logo" className="w-full h-full object-cover" />
                </div>
              </div>
              
              <div className="flex flex-col justify-center">
                <span className="text-sm sm:text-lg font-bold text-white transition-colors duration-300 group-hover:text-purple-300 leading-tight">
                  Virtual Solutions
                </span>
                <span className="text-xs text-gray-400 group-hover:text-purple-400 transition-colors duration-300 font-medium leading-tight hidden sm:block">
                  ✨ Premium Learning
                </span>
              </div>
            </div>
            
            {/* Enhanced Navigation Links */}
            <div className="hidden lg:flex items-center space-x-1">
              {[
                { key: 'home', label: 'Home' },
                { key: 'courses', label: 'Courses' },
                { key: 'about', label: 'About' },
                { key: 'blog', label: 'Blog' },
                { key: 'reviews', label: 'Reviews' },
                { key: 'contact', label: 'Contact' }
              ].map((item) => (
                <button 
                  key={item.key}
                  onClick={() => handleNavigation(item.key)} 
                  className={`relative px-4 py-2 rounded-xl font-semibold text-sm transition-all duration-300 group nav-item ${
                    currentPage === item.key 
                      ? 'text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50' 
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                  }`}
                >
                  {/* Active indicator */}
                  <div className={`absolute inset-0 rounded-xl transition-all duration-300 ${
                    currentPage === item.key 
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 scale-100 opacity-100' 
                      : 'bg-gradient-to-r from-purple-600/10 to-pink-600/10 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                  }`}></div>
                  
                  {/* Text */}
                  <span className="relative z-10 transition-all duration-200">
                    {item.label}
                  </span>
                  
                  {/* Active dot */}
                  {currentPage === item.key && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                  )}
                </button>
              ))}
            </div>

            {/* Authentication & User Section */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle Button */}
              <ThemeToggle />
              
              {!isAuthenticated ? (
                <>
                  {/* Sign In Button - Hidden on mobile */}
                  <button 
                    onClick={() => handleAuth('signin')}
                    className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </button>
                  
                  {/* Sign Up Button */}
                  <button 
                    onClick={() => handleAuth('signup')}
                    className="relative px-4 py-2 rounded-xl font-bold text-sm text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group cta-button overflow-hidden" 
                    style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}
                  >
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      <span className="hidden sm:inline">Sign Up</span>
                    </span>
                  </button>
                </>
              ) : (
                <div className="flex items-center space-x-2 sm:space-x-3">
                  {/* Cart Button */}
                  <div className="relative">
                    <button 
                      data-cart-button
                      onClick={() => setIsCartOpen(!isCartOpen)}
                      className="relative p-2 rounded-xl font-semibold text-sm text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 group"
                    >
                      <ShoppingCart className="w-5 h-5" />
                      {cartItems.length > 0 && (
                        <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                          {cartItems.length}
                        </div>
                      )}
                    </button>
                  </div>
                  
                  {/* Profile Icon */}
                  <div className="relative z-[100]">
                    <button 
                      data-profile-button
                      onClick={() => {
                        setProfileDropdownOpen(!profileDropdownOpen);
                      }}
                      className={`flex items-center justify-center p-2 rounded-xl overflow-hidden transition-all duration-300 border-2 focus:outline-none ${
                        profileDropdownOpen 
                          ? 'border-purple-500/70 shadow-md shadow-purple-500/30 bg-purple-600/20 scale-105' 
                          : 'border-purple-500/30 hover:border-purple-500/50 hover:bg-purple-600/10'
                      }`}
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden relative group">
                        <img 
                          src={user.avatar || "https://ui-avatars.com/api/?name=User&background=8B5CF6&color=fff"} 
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                          <div className="w-4 h-4 border-2 border-white/80 border-b-transparent rounded-full animate-spin"></div>
                        </div>
                      </div>
                    </button>

                    {/* Profile Dropdown - Positioned relative to viewport */}
                    {profileDropdownOpen && (
                      <div 
                        data-profile-dropdown
                        className="fixed right-4 top-16 sm:top-20 md:absolute md:right-0 md:top-full md:mt-2 w-72 sm:w-64 bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-2xl border border-purple-500/50 rounded-xl overflow-hidden shadow-2xl z-[1000]"
                        style={{
                          transformOrigin: 'top right',
                          animation: 'profileDropdownIn 0.3s ease-out forwards',
                          boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3), 0 8px 10px -6px rgba(0, 0, 0, 0.4)'
                        }}
                      >
                        {/* Card Header with user info */}
                        <div className="p-4 border-b border-gray-700/50 bg-gradient-to-br from-purple-900/20 via-transparent to-purple-900/10">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-purple-500/50 shadow-lg shadow-purple-500/20">
                              <img 
                                src={user.avatar || "https://ui-avatars.com/api/?name=User&background=8B5CF6&color=fff"} 
                                alt="Profile"
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div>
                              <h3 className="text-white font-semibold">{user.name || "User"}</h3>
                              <p className="text-gray-400 text-xs">{user.email || "user@example.com"}</p>
                              <div className="flex items-center mt-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-400 mr-1.5 animate-pulse"></div>
                                <span className="text-green-400 text-xs font-medium">Online</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Card Body with menu options */}
                        <div className="py-2 px-1">
                          <div className="space-y-1">
                            <button 
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                alert('Profile page coming soon!');
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 text-sm text-left focus:outline-none"
                            >
                              <User className="w-4 h-4" />
                              <span>View Profile</span>
                            </button>
                            <button 
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                alert('Settings page coming soon!');
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 text-sm text-left focus:outline-none"
                            >
                              <Settings className="w-4 h-4" />
                              <span>Settings</span>
                            </button>
                            <button 
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                handleNavigation('courses');
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 text-sm text-left focus:outline-none"
                            >
                              <BookOpen className="w-4 h-4" />
                              <span>My Courses</span>
                            </button>
                            <button 
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                alert('Wishlist feature coming soon!');
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300 text-sm text-left focus:outline-none"
                            >
                              <Heart className="w-4 h-4" />
                              <span>Wishlist</span>
                            </button>
                          </div>
                          
                          {/* Divider */}
                          <div className="my-2 border-t border-gray-700/50"></div>
                          
                          {/* Sign Out Button */}
                          <div className="px-1 pb-1">
                            <button 
                              onClick={() => {
                                setProfileDropdownOpen(false);
                                handleLogout();
                              }}
                              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-all duration-300 text-sm text-left focus:outline-none"
                            >
                              <LogOut className="w-4 h-4" />
                              <span>Sign Out</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Premium Mobile Menu Button */}
              <button 
                className="lg:hidden relative p-1.5 sm:p-2 rounded-lg sm:rounded-xl transition-all duration-300 hover:bg-purple-600/20 group"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <div className="w-4 h-4 sm:w-5 sm:h-5 relative">
                  {isMenuOpen ? (
                    <X className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 rotate-0 group-hover:rotate-90" />
                  ) : (
                    <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-white transition-transform duration-300 group-hover:scale-110" />
                  )}
                </div>
              </button>
            </div>
          </div>

        {/* Enhanced Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-2xl border-t border-gray-600/30 rounded-b-xl sm:rounded-b-2xl mt-1 mobile-menu-premium overflow-hidden border-l border-r border-b border-gray-600/30">
            <div className="px-3 py-3 sm:px-6 sm:py-6 space-y-1">
              {[
                { key: 'home', label: 'Home' },
                { key: 'courses', label: 'Courses' },
                { key: 'about', label: 'About Us' },
                { key: 'blog', label: 'Blog' },
                { key: 'reviews', label: 'Reviews' },
                { key: 'contact', label: 'Contact Us' }
              ].map((item) => (
                <button 
                  key={item.key}
                  onClick={() => handleNavigation(item.key)} 
                  className={`block py-2 px-3 sm:py-3 sm:px-4 w-full text-left transition-all duration-300 rounded-lg sm:rounded-xl relative group mobile-nav-item ${
                    currentPage === item.key 
                      ? 'text-white bg-gradient-to-r from-purple-600/30 to-pink-600/30 border border-purple-500/50' 
                      : 'text-gray-300 hover:text-white hover:bg-purple-600/20'
                  }`}
                >
                  <div className={`absolute inset-0 rounded-lg sm:rounded-xl transition-all duration-300 ${
                    currentPage === item.key 
                      ? 'bg-gradient-to-r from-purple-600/20 to-pink-600/20 scale-100 opacity-100' 
                      : 'bg-gradient-to-r from-purple-600/10 to-pink-600/10 scale-95 opacity-0 group-hover:scale-100 group-hover:opacity-100'
                  }`}></div>
                  
                  <span className="relative z-10 font-semibold flex items-center gap-2 text-sm">
                    {currentPage === item.key && (
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                    )}
                    {item.label}
                  </span>
                </button>
              ))}
              
              {!isAuthenticated && (
                <div className="pt-3 border-t border-gray-700/50 space-y-2">
                  <button 
                    onClick={() => handleAuth('signin')}
                    className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-gray-600 text-gray-300 hover:text-white hover:border-purple-500 transition-all duration-300"
                  >
                    <User className="w-4 h-4" />
                    Sign In
                  </button>
                  <button 
                    onClick={() => handleAuth('signup')}
                    className="w-full relative px-4 py-2 rounded-lg font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group cta-button-mobile overflow-hidden" 
                    style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}
                  >
                    <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      <UserPlus className="w-4 h-4" />
                      Sign Up
                    </span>
                  </button>
                </div>
              )}
              
              {isAuthenticated && (
                <div className="pt-3 border-t border-gray-700/50 space-y-2">
                  <div className="flex items-center gap-3 px-3 py-3 rounded-lg bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
                    <div className="w-10 h-10 rounded-lg overflow-hidden border-2 border-purple-500/50">
                      <img 
                        src={user.avatar} 
                        alt={user.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-sm">{user.name}</h3>
                      <p className="text-gray-400 text-xs">{user.email}</p>
                    </div>
                  </div>
                  
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300">
                    <User className="w-4 h-4" />
                    <span>View Profile</span>
                  </button>
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-purple-600/20 transition-all duration-300">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-all duration-300"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </nav>

      {/* Authentication Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsAuthModalOpen(false)}></div>
          <div className="relative w-full max-w-md bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-2xl border border-gray-600/30 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-purple-600/10"></div>
            
            <div className="relative p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center overflow-hidden">
                  <img src="/vs-logo.svg" alt="Virtual Solutions Logo" className="w-full h-full object-cover" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {authMode === 'signin' ? 'Welcome Back' : 'Join Virtual Solutions'}
                </h2>
                <p className="text-gray-400">
                  {authMode === 'signin' ? 'Sign in to your account' : 'Create your premium account'}
                </p>
              </div>

              <form onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target as HTMLFormElement);
                if (authMode === 'signin') {
                  handleSignIn(
                    formData.get('email') as string,
                    formData.get('password') as string
                  );
                } else {
                  const password = formData.get('password') as string;
                  const confirmPassword = formData.get('confirmPassword') as string;
                  
                  if (password !== confirmPassword) {
                    alert("Passwords don't match. Please try again.");
                    return;
                  }
                  
                  handleSignUp(
                    formData.get('name') as string,
                    formData.get('email') as string,
                    password
                  );
                }
              }} className="space-y-6">
                {authMode === 'signup' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        name="name"
                        required
                        className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Enter your email"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="password"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Enter your password"
                    />
                  </div>
                </div>
                
                {authMode === 'signup' && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="password"
                      name="confirmPassword"
                      required
                      className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>
                )}

                <button
                  type="submit"
                  className="w-full relative py-3 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                  <span className="relative z-10">
                    {authMode === 'signin' ? 'Sign In' : 'Create Account'}
                  </span>
                </button>
              </form>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                >
                  {authMode === 'signin' ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {isCartOpen && isAuthenticated && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCartOpen(false)}></div>
          <div className="relative w-full max-w-2xl bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-2xl border border-gray-600/30 rounded-3xl overflow-hidden shadow-2xl max-h-[80vh] overflow-y-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-purple-600/10"></div>
            
            <div className="relative">
              <div className="p-6 border-b border-gray-700/50">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                    <ShoppingCart className="w-6 h-6" />
                    Shopping Cart ({cartItems.length})
                  </h2>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-xl hover:bg-gray-700/50 transition-colors duration-300"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {cartItems.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-400 mb-2">Your cart is empty</h3>
                    <p className="text-gray-500">Add some courses to get started!</p>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4 mb-6">
                      {cartItems.map(courseId => {
                        const course = courses.find(c => c.id === courseId);
                        if (!course) return null;
                        
                        return (
                          <div key={courseId} className="flex items-center gap-4 p-4 rounded-2xl bg-gray-800/30 border border-gray-700/30">
                            <img 
                              src={course.image} 
                              alt={course.title}
                              className="w-16 h-16 rounded-xl object-cover"
                            />
                            <div className="flex-1">
                              <h3 className="font-semibold text-white">{course.title}</h3>
                              <p className="text-gray-400 text-sm">{course.instructor}</p>
                              <p className="text-purple-400 font-bold">${course.price}</p>
                            </div>
                            <button
                              onClick={() => removeFromCart(courseId)}
                              className="p-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-600/20 transition-all duration-300"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    <div className="border-t border-gray-700/50 pt-6">
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-xl font-bold text-white">Total:</span>
                        <span className="text-2xl font-bold text-purple-400">${getCartTotal().toFixed(2)}</span>
                      </div>
                      
                      <button 
                        onClick={handleCheckout}
                        className="w-full relative py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group overflow-hidden"
                        style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}
                      >
                        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          <CreditCard className="w-5 h-5" />
                          Proceed to Checkout
                        </span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setIsCheckoutModalOpen(false)}></div>
          <div className="relative w-full max-w-xl bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 backdrop-blur-2xl border border-gray-600/30 rounded-3xl overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-pink-600/5 to-purple-600/10"></div>
            
            <div className="relative p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                  <CreditCard className="w-6 h-6" />
                  Checkout
                </h2>
                <button
                  onClick={() => setIsCheckoutModalOpen(false)}
                  className="p-2 rounded-xl hover:bg-gray-700/50 transition-colors duration-300"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={(e) => {
                e.preventDefault();
                // Process checkout logic here
                setCartItems([]);
                setIsCheckoutModalOpen(false);
                alert("Your order has been placed successfully!");
              }} className="space-y-6">
                {/* Order Summary */}
                <div className="p-4 rounded-xl bg-gray-800/30 border border-gray-700/30">
                  <h3 className="text-lg font-semibold text-white mb-3">Order Summary</h3>
                  <div className="space-y-2 mb-3">
                    {cartItems.map(courseId => {
                      const course = courses.find(c => c.id === courseId);
                      if (!course) return null;
                      return (
                        <div key={courseId} className="flex justify-between text-sm">
                          <span className="text-gray-300">{course.title}</span>
                          <span className="font-semibold text-purple-400">${course.price.toFixed(2)}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="border-t border-gray-700/50 pt-3 mt-3 flex justify-between">
                    <span className="font-semibold text-white">Total:</span>
                    <span className="font-bold text-lg text-purple-400">
                      ${cartItems.reduce((total, id) => {
                        const course = courses.find(c => c.id === id);
                        return total + (course ? course.price : 0);
                      }, 0).toFixed(2)}
                    </span>
                  </div>
                </div>
                
                {/* Payment Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Card Number</label>
                      <div className="relative">
                        <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Expiration Date</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="MM / YY"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">CVC</label>
                        <input
                          type="text"
                          required
                          className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">Cardholder Name</label>
                      <input
                        type="text"
                        required
                        className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Enter cardholder name"
                      />
                    </div>
                  </div>
                </div>
                
                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full relative py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20 group overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}
                >
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-300"></div>
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Complete Purchase
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Page Content */}
      <div className="relative min-h-screen pt-12 sm:pt-16 z-10">
        <div className="page-section">
          <Routes>
            <Route path="/" element={<HomePage courses={courses} testimonials={testimonials} addToCart={addToCart} />} />
            <Route path="/courses" element={<CoursesPage courses={courses} addToCart={addToCart} />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            {/* Catch-all route for 404 - redirect to home */}
            <Route path="*" element={<HomePage courses={courses} testimonials={testimonials} addToCart={addToCart} />} />
          </Routes>
        </div>
      </div>

      {/* Premium Footer - New Design */}
      <footer className="relative overflow-hidden">
        {/* Modern Glass Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900/95 via-black/95 to-gray-900/95"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-[0.07]"></div>
        <div className="absolute inset-0 backdrop-blur-xl"></div>
        
        {/* Animated Gradient Elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-700/20 rounded-full blur-[100px] animate-pulse"></div>
          <div className="absolute top-1/3 -right-40 w-96 h-96 bg-pink-600/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-blue-700/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '6s' }}></div>
        </div>
        
        {/* Premium Border Top */}
        <div className="absolute top-0 left-0 right-0 h-[2px]">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/50 to-transparent blur-sm"></div>
        </div>
        
        <div className="relative pt-20 pb-12 z-10">
          {/* Main Footer Content */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-16 mb-10">
              
              {/* Brand Column */}
              <div className="lg:col-span-4 space-y-8">
                {/* Enhanced Logo */}
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center relative overflow-hidden">
                      <img src="/vs-logo.svg" alt="Virtual Solutions Logo" className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/30 to-pink-400/30 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-2xl blur-lg opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-2xl font-bold text-white">Virtual Solutions</span>
                    <span className="text-sm text-purple-300 font-medium">Premium Learning Platform</span>
                  </div>
                </div>
                
                <p className="text-gray-300 leading-relaxed">
                  We're on a mission to transform education and empower learners worldwide with cutting-edge courses and expert instruction. Join over <span className="text-purple-300 font-semibold">50,000+ professionals</span> who've elevated their careers.
                </p>
                
                {/* Social Links with Hover Effects */}
                <div className="flex gap-4 flex-wrap">
                  {[
                    { icon: Globe, color: 'from-blue-400 to-cyan-400', tooltip: 'Website' },
                    { icon: Twitter, color: 'from-sky-400 to-blue-500', tooltip: 'Twitter' },
                    { icon: Instagram, color: 'from-pink-500 to-orange-400', tooltip: 'Instagram' },
                    { icon: Linkedin, color: 'from-blue-500 to-blue-600', tooltip: 'LinkedIn' },
                    { icon: Youtube, color: 'from-red-500 to-red-600', tooltip: 'YouTube' }
                  ].map((social, index) => (
                    <div key={index} className="group relative">
                      <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-purple-600/50 to-pink-600/50 opacity-0 group-hover:opacity-100 blur-sm transition-opacity"></div>
                      <button 
                        className="relative group w-10 h-10 rounded-xl flex items-center justify-center bg-gray-800/80 border border-gray-700/50 hover:border-gray-500/50 transition-all duration-300"
                        title={social.tooltip}
                      >
                        <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${social.color} opacity-0 group-hover:opacity-20 transition-opacity duration-300`}></div>
                        <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors duration-300" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Links Columns */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-white">Courses</h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    'Web Development', 
                    'Data Science', 
                    'Mobile Development',
                    'UX/UI Design', 
                    'Cloud Computing',
                    'Cybersecurity'
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="group inline-flex items-center hover:text-purple-300 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-white">Company</h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    'About Us', 
                    'Careers', 
                    'Partners',
                    'Blog', 
                    'Press Kit',
                    'Contact Us'
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="group inline-flex items-center hover:text-purple-300 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-white">Resources</h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    'Help Center', 
                    'Community', 
                    'Tutorials',
                    'Documentation', 
                    'Webinars',
                    'Open Source'
                  ].map((item, index) => (
                    <li key={index}>
                      <a href="#" className="group inline-flex items-center hover:text-purple-300 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="lg:col-span-2 space-y-6">
                <h3 className="text-xl font-bold text-white">Legal</h3>
                <ul className="space-y-3 text-gray-400">
                  {[
                    { name: 'Terms of Service', path: '#' },
                    { name: 'Privacy Policy', path: '/privacy-policy' },
                    { name: 'Cookie Policy', path: '#' },
                    { name: 'GDPR Compliance', path: '#' },
                    { name: 'Accessibility', path: '#' },
                    { name: 'Refund Policy', path: '#' }
                  ].map((item, index) => (
                    <li key={index}>
                      <a href={item.path} className="group inline-flex items-center hover:text-purple-300 transition-colors duration-300">
                        <ArrowRight className="w-4 h-4 mr-2 opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
                        <span>{item.name}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {/* Featured Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-16">
              {/* Students Stat */}
              <div className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-purple-500/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-blue-400 to-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    50K+
                  </div>
                  <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
                    Students
                  </div>
                </div>
              </div>

              {/* Courses Stat */}
              <div className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-purple-500/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <img src="/vs-logo.svg" alt="VS Logo" className="w-8 h-8" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    200+
                  </div>
                  <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
                    Courses
                  </div>
                </div>
              </div>

              {/* Satisfaction Stat */}
              <div className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-purple-500/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-green-400 to-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <ThumbsUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                    95%
                  </div>
                  <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
                    Satisfaction
                  </div>
                </div>
              </div>

              {/* Countries Stat */}
              <div className="group relative overflow-hidden rounded-2xl p-6 backdrop-blur-sm border border-gray-800/50 hover:border-purple-500/40 transition-all duration-500">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 to-black/90"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/5 to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="relative flex flex-col items-center">
                  <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold mb-1 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                    40+
                  </div>
                  <div className="text-gray-400 text-sm font-medium group-hover:text-gray-300 transition-colors duration-300">
                    Countries
                  </div>
                </div>
              </div>
            </div>
            
            {/* Copyright and Bottom Section */}
            <div className="border-t border-gray-800/50 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
                  <p className="text-gray-400">
                    &copy; 2025 <span className="text-white">Virtual Solutions</span>. All rights reserved.
                  </p>
                  
                  <div className="flex items-center gap-4">
                    <a href="/privacy-policy" className="text-gray-400 hover:text-purple-300 text-sm">Privacy</a>
                    <a href="#" className="text-gray-400 hover:text-purple-300 text-sm">Terms</a>
                    <a href="#" className="text-gray-400 hover:text-purple-300 text-sm">Cookies</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-purple-300 text-sm font-medium">Online: 1,240 Students</span>
                  </div>
                  
                  <button className="group p-2.5 rounded-full bg-gray-800/80 border border-gray-700/50 hover:border-purple-500/30 transition-colors duration-300" aria-label="Scroll to top">
                    <ArrowUp className="w-4 h-4 text-gray-400 group-hover:text-purple-300 transition-colors duration-300" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        /* Enhanced Navigation Glass Effect */
        .nav-glass-premium {
          backdrop-filter: blur(20px) saturate(150%);
          -webkit-backdrop-filter: blur(20px) saturate(150%);
          border: 1px solid transparent;
          background: linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6)) padding-box,
                      linear-gradient(135deg, rgba(153, 27, 179, 0.3), rgba(185, 28, 124, 0.3), rgba(124, 58, 237, 0.3)) border-box;
          border-radius: 1.5rem;
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.05) inset;
        }

        /* Smooth Border Transitions */
        .nav-glass-premium:hover {
          background: linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7)) padding-box,
                      linear-gradient(135deg, rgba(153, 27, 179, 0.5), rgba(185, 28, 124, 0.5), rgba(124, 58, 237, 0.5)) border-box;
          transition: all 0.3s ease;
        }

        /* Logo Animation */
        .nav-logo {
          background-size: 200% 200%;
          animation: gradientShift 10s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Navigation Item Hover Effects */
        .nav-item {
          transform: translateY(0);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .nav-item:hover {
          transform: translateY(-1px);
        }

        /* CTA Button Professional Animation */
        .cta-button {
          background-size: 200% 200%;
          animation: gradientFlow 8s ease infinite;
          transform: translateY(0);
        }

        .cta-button:hover {
          transform: translateY(-1px);
        }

        @keyframes gradientFlow {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Mobile Menu Professional Animation */
        .mobile-menu-premium {
          animation: slideDownProfessional 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border-radius: 0 0 1.5rem 1.5rem;
          border: 1px solid rgba(107, 114, 128, 0.3);
          border-top: 1px solid rgba(107, 114, 128, 0.3);
        }

        @keyframes slideDownProfessional {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Mobile Navigation Items */
        .mobile-nav-item {
          transition: all 0.3s ease;
        }

        /* CTA Button Mobile */
        .cta-button-mobile {
          background-size: 200% 200%;
          animation: gradientPulse 8s ease infinite;
        }

        @keyframes gradientPulse {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        /* Premium Button Effects */
        .premium-button {
          position: relative;
          overflow: hidden;
          transform: translateY(0);
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-button:hover::before {
          left: 100%;
        }

        .premium-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 35px -10px rgba(153, 27, 179, 0.5);
        }

        /* Page Section Transitions */
        .page-section {
          position: relative;
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          min-height: calc(100vh - 80px);
        }

        .page-section::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, 
            rgba(153, 27, 179, 0.05),
            rgba(204, 115, 248, 0.05),
            rgba(153, 27, 179, 0.08)
          );
          opacity: 0;
          transition: opacity 0.7s ease;
          pointer-events: none;
          z-index: 1;
        }

        .page-section:hover::before {
          opacity: 1;
        }

        .page-section > * {
          position: relative;
          z-index: 2;
        }

        /* Enhanced Course Card Animations */
        .course-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0) scale(1);
          position: relative;
        }

        .course-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(153, 27, 179, 0.15), rgba(204, 115, 248, 0.15));
          border-radius: 1.5rem;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .course-card:hover {
          transform: translateY(-12px) scale(1.03);
          box-shadow: 0 30px 60px -15px rgba(153, 27, 179, 0.5);
        }

        .course-card:hover::before {
          opacity: 1;
        }

        .course-card:hover .course-card-overlay {
          opacity: 1;
        }

        .course-card-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0) 60%
          );
          opacity: 0;
          transition: opacity 0.5s ease;
          border-radius: 1.5rem;
        }

        /* Floating Animation */
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .float-animation {
          animation: float 8s ease-in-out infinite;
        }

        /* Advanced Fade Animations */
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fade-in-left {
          from {
            opacity: 0;
            transform: translateX(-50px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 1s ease-out forwards;
        }

        .animate-fade-in-left {
          animation: fade-in-left 1s ease-out forwards;
        }

        /* Grid Flow Animations */
        @keyframes grid-flow {
          0% {
            transform: translateY(0) translateX(0);
          }
          100% {
            transform: translateY(-30px) translateX(-30px);
          }
        }

        @keyframes grid-diagonal {
          0% {
            transform: translate(-15px, -15px);
          }
          50% {
            transform: translate(15px, 15px);
          }
          100% {
            transform: translate(-15px, -15px);
          }
        }

        @keyframes pulse-slow {
          0% {
            opacity: 0.4;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            opacity: 0.4;
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 3s infinite;
        }

        /* Premium Scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }

        ::-webkit-scrollbar-track {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 5px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #991bb3, #b91c7c, #7c3aed);
          border-radius: 5px;
          transition: background 0.3s ease;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #b91c7c, #7c3aed, #8b5cf6);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .nav-glass-premium {
            margin: 0 1rem;
            border-radius: 1.5rem;
            border: 1px solid rgba(107, 114, 128, 0.3);
          }
          
          .mobile-nav-item:nth-child(1) { animation-delay: 0.1s; }
          .mobile-nav-item:nth-child(2) { animation-delay: 0.2s; }
          .mobile-nav-item:nth-child(3) { animation-delay: 0.3s; }
          .mobile-nav-item:nth-child(4) { animation-delay: 0.4s; }
          .mobile-nav-item:nth-child(5) { animation-delay: 0.5s; }
          .mobile-nav-item:nth-child(6) { animation-delay: 0.6s; }
        }

        /* Fix for Border Rendering Issues */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .nav-glass-premium,
        .mobile-menu-premium,
        .nav-item,
        .premium-button {
          transform: translateZ(0);
          -webkit-transform: translateZ(0);
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .nav-logo,
          .cta-button,
          .cta-button-mobile,
          .mobile-menu-premium,
          .mobile-nav-item {
            animation: none;
          }
          
          .nav-item,
          .premium-button,
          .course-card {
            transition: none;
          }
        }

        /* Performance optimization for low-end devices */
        @media (max-width: 768px) {
          .nav-logo,
          .cta-button,
          .cta-button-mobile {
            animation-duration: 12s;
          }
          
          .nav-glass-premium {
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
          }
        }

        /* Disable heavy effects on slower devices */
        @media (max-width: 480px) {
          .nav-logo,
          .cta-button,
          .cta-button-mobile {
            animation: none;
          }
          
          .backdrop-blur-3xl,
          .backdrop-blur-2xl {
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
          }
        }
      `}</style>
    </div>
  );
}

export default App;