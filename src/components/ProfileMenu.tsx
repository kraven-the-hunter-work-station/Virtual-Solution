import { useState, useEffect, useRef } from 'react';
import { User as UserIcon, LogOut, Settings, ShoppingCart, ChevronDown } from 'lucide-react';

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
  role?: string;
}

interface ProfileMenuProps {
  user: User | null;
  onSignOut: () => void;
}

// Hardcoded test user for development purposes
const TEST_USER: User = {
  id: 1,
  first_name: 'Test',
  last_name: 'User',
  email: 'test@example.com',
  role: 'user'
};

/**
 * ProfileMenu component - Shows user profile image with dropdown menu after sign in
 * Contains options like settings, user purchases, cart, and sign out
 */
const ProfileMenu = ({ user, onSignOut }: ProfileMenuProps) => {
  // DEVELOPMENT MODE: Replace with test user if no user is provided
  const currentUser = user || TEST_USER;
  
  const [isOpen, setIsOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  // Default profile image
  const defaultProfileImage = `https://ui-avatars.com/api/?name=${currentUser?.first_name}+${currentUser?.last_name}&background=8B5CF6&color=fff`;

  // Toggle dropdown menu
  const toggleMenu = () => setIsOpen(!isOpen);

  // Handle click outside to close menu and fetch cart data
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    
    // Get cart count on component mount
    if (user && user.id) {
      setError(null);
      setIsLoading(true);
      fetchCartCount(user.id)
        .finally(() => setIsLoading(false));
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      // Cleanup any pending requests
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [user]);

  // Fetch user's cart count with timeout and retry
  const fetchCartCount = async (userId: number) => {
    // For development, just use a random cart count
    setCartCount(Math.floor(Math.random() * 5));
    return;
    
    // The code below is kept for reference but not used in development mode
    const TIMEOUT_MS = 5000; // 5 second timeout
    const MAX_RETRIES = 2;
    let retryCount = 0;

    const fetchWithTimeout = async () => {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);

      try {
        const response = await fetch('/deploy/Server/auth-handler.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'get_cart',
            user_id: userId
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        if (data.success) {
          setCartCount(data.total_items || 0);
        } else {
          throw new Error(data.message || 'Failed to fetch cart count');
        }
      } catch (error: any) {
        clearTimeout(timeoutId);
        if (error.name === 'AbortError') {
          throw new Error('Request timed out');
        }
        throw error;
      }
    };

    while (retryCount < MAX_RETRIES) {
      try {
        await fetchWithTimeout();
        break;
      } catch (error) {
        retryCount++;
        console.error(`Attempt ${retryCount}/${MAX_RETRIES} failed:`, error);
        if (retryCount === MAX_RETRIES) {
          console.error('Failed to fetch cart count after all retries');
        } else {
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * retryCount));
        }
      }
    }
  };

  // If no user, don't show anything (except in dev mode with test user)
  if (!user && !TEST_USER) return null;

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Image Button */}
      <button 
        onClick={toggleMenu}
        className="flex items-center space-x-1 focus:outline-none"
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <div className="relative">
          <img 
            src={currentUser.profile_image || defaultProfileImage} 
            alt={`${currentUser.first_name}'s profile`}
            className="w-10 h-10 rounded-full object-cover border-2 border-indigo-600"
          />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </div>
        <span className="text-sm hidden md:block">{currentUser.first_name}</span>
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 py-1 border border-gray-200">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-200">
            <p className="text-sm font-medium text-gray-900 truncate">{`${currentUser.first_name} ${currentUser.last_name}`}</p>
            <p className="text-sm text-gray-500 truncate">{currentUser.email}</p>
            <p className="text-xs text-gray-400 mt-1">User ID: {currentUser.id}</p>
          </div>
          
          {/* Menu Items */}
          <a 
            href="/user-dashboard" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </a>
          
          <a 
            href="/my-courses" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            My Courses
          </a>
          
          <a 
            href="/cart" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Cart
            {cartCount > 0 && (
              <span className="ml-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
          
          <a 
            href="/settings" 
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </a>
          
          <hr className="my-1 border-gray-200" />
          
          <button 
            onClick={onSignOut} 
            className="block w-full text-left px-4 py-2 text-sm text-red-700 hover:bg-gray-100 flex items-center"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
