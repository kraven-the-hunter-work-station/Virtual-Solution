import React, { useState, useEffect } from 'react';
import { 
  User,
  LogOut,
  Settings,
  Bell,
  Home,
  FileText,
  Layout,
  Calendar,
  ChevronDown,
  ShoppingCart,
  BookOpen,
  CheckCircle,
  Clock
} from 'lucide-react';

interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}

/**
 * Dashboard Stats interface
 */
interface DashboardStats {
  totalCourses: number;
  completedCourses: number;
  inProgressCourses: number;
  cartItems: number;
}

export default function UserDashboard() {
  // User state
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DashboardStats>({
    totalCourses: 0,
    completedCourses: 0,
    inProgressCourses: 0,
    cartItems: 0
  });
  
  // Fetch user's dashboard data including cart and course stats
  const fetchDashboardData = async (userId: string) => {
    try {
      // Get user's purchased courses
      const purchasesResponse = await fetch('/src/config/auth-handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_purchases', user_id: userId })
      });
      
      // Get user's cart
      const cartResponse = await fetch('/src/config/auth-handler.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'get_cart', user_id: userId })
      });
      
      const purchasesData = await purchasesResponse.json();
      const cartData = await cartResponse.json();
      
      if (purchasesData.success) {
        const courses = purchasesData.purchases || [];
        const completed = courses.filter((c: any) => c.progress_percentage === 100);
        const inProgress = courses.filter((c: any) => c.progress_percentage > 0 && c.progress_percentage < 100);
        
        setStats({
          totalCourses: courses.length,
          completedCourses: completed.length,
          inProgressCourses: inProgress.length,
          cartItems: cartData.success ? (cartData.total_items || 0) : 0
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  useEffect(() => {
    // Check for user authentication on component mount
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      const storedUser = localStorage.getItem('user');
      
      if (!token) {
        // No token found, redirect to login
        window.location.href = '/auth';
        return;
      }
      
      try {
        // First try to use stored user data
        if (storedUser) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setLoading(false);
          
          // Fetch additional dashboard data
          fetchDashboardData(userData.id);
        }
        
        // Verify token with server
        const response = await fetch('/src/config/auth-handler.php?action=check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ token })
        });
        
        const result = await response.json();
        
        if (response.ok && result.success) {
          // Token is valid, set user data
          setUser(result.user);
          localStorage.setItem('user', JSON.stringify(result.user));
          setLoading(false);
          
          // Fetch additional dashboard data
          fetchDashboardData(result.user.id);
        } else {
          // Token invalid, redirect to login
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          window.location.href = '/auth';
        }
      } catch (err) {
        console.error('Authentication check failed:', err);
        setError('Failed to verify your session. Using locally stored data.');
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  const handleLogout = async () => {
    const token = localStorage.getItem('authToken');
    
    try {
      // Call logout endpoint
      await fetch('/src/config/auth-handler.php?action=logout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      });
      
      // Clear local storage and redirect regardless of server response
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    } catch (err) {
      console.error('Logout error:', err);
      // Still logout locally even if server request fails
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      window.location.href = '/auth';
    }
  };
  
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="w-16 h-16 border-t-4 border-purple-500 border-solid rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading your dashboard...</p>
        </div>
      </div>
    );
  }
  
  return (
    <section className="min-h-screen bg-black relative">
      {/* Premium Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20"></div>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>
      
      {/* Dashboard Content */}
      <div className="relative z-10 flex h-screen">
        {/* Sidebar */}
        <div className="w-64 border-r border-gray-700/50 backdrop-blur-xl" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.8), rgba(31,41,55,0.8), rgba(0,0,0,0.8))' }}>
          <div className="p-6">
            <h2 className="text-2xl font-bold text-white">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Virtual Solutions
              </span>
            </h2>
          </div>
          
          <nav className="mt-6">
            <div className="px-4 py-2 text-xs text-gray-400 uppercase">Main</div>
            <a href="#" className="flex items-center px-6 py-3 text-gray-200 bg-gradient-to-r from-purple-500/20 to-pink-500/10 border-l-4 border-purple-500">
              <Home className="w-5 h-5 mr-3" />
              <span>Dashboard</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors">
              <FileText className="w-5 h-5 mr-3" />
              <span>My Courses</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors">
              <Calendar className="w-5 h-5 mr-3" />
              <span>Schedule</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors">
              <Layout className="w-5 h-5 mr-3" />
              <span>Resources</span>
            </a>
            
            <div className="px-4 py-2 mt-8 text-xs text-gray-400 uppercase">Account</div>
            <a href="#" className="flex items-center px-6 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors">
              <User className="w-5 h-5 mr-3" />
              <span>Profile</span>
            </a>
            <a href="#" className="flex items-center px-6 py-3 text-gray-400 hover:text-gray-200 hover:bg-white/5 transition-colors">
              <Settings className="w-5 h-5 mr-3" />
              <span>Settings</span>
            </a>
            <button 
              onClick={handleLogout}
              className="w-full flex items-center px-6 py-3 text-gray-400 hover:text-red-300 hover:bg-red-900/10 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" />
              <span>Log Out</span>
            </button>
          </nav>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          {/* Top Navigation */}
          <header className="sticky top-0 z-30 backdrop-blur-xl border-b border-gray-700/50" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="flex items-center justify-between px-6 py-4">
              <h1 className="text-xl font-semibold text-white">Dashboard</h1>
              
              <div className="flex items-center gap-4">
                <button className="relative p-2 text-gray-400 hover:text-white transition-colors">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                </button>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 rounded-full border border-gray-700 hover:border-gray-500 transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                      <span className="text-white font-semibold text-sm">
                        {user && user.firstName ? user.firstName[0] + user.lastName[0] : 'U'}
                      </span>
                    </div>
                    <span className="text-gray-200 pr-2">{user?.firstName || 'User'}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 border border-gray-700 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                      Your Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-gray-300 hover:bg-gray-700 hover:text-white">
                      Settings
                    </a>
                    <div className="border-t border-gray-700 my-1"></div>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-400 hover:bg-red-900/30 hover:text-red-300"
                    >
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main Dashboard Content */}
          <main className="p-6">
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm">
                {error}
              </div>
            )}
            
            {/* Welcome Card */}
            <div className="mb-8 p-6 rounded-2xl backdrop-blur-xl border border-purple-500/30" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7))' }}>
              <h2 className="text-2xl font-bold text-white mb-2">Welcome back, {user?.firstName || 'User'}!</h2>
              <p className="text-gray-300">
                You're logged in as <span className="text-purple-300">{user?.email}</span>
              </p>
            </div>
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {/* Total courses card */}
              <div className="p-6 rounded-2xl backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7))' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Courses</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.totalCourses}</h3>
                  </div>
                  <div className="bg-purple-900/30 p-3 rounded-full">
                    <BookOpen className="w-5 h-5 text-purple-400" />
                  </div>
                </div>
                <a href="/my-courses" className="text-purple-400 text-xs mt-4 inline-block hover:text-purple-300">
                  View all courses →
                </a>
              </div>
              
              {/* In progress card */}
              <div className="p-6 rounded-2xl backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7))' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">In Progress</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.inProgressCourses}</h3>
                  </div>
                  <div className="bg-blue-900/30 p-3 rounded-full">
                    <Clock className="w-5 h-5 text-blue-400" />
                  </div>
                </div>
                <a href="/my-courses" className="text-blue-400 text-xs mt-4 inline-block hover:text-blue-300">
                  Continue learning →
                </a>
              </div>
              
              {/* Completed card */}
              <div className="p-6 rounded-2xl backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7))' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Completed</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.completedCourses}</h3>
                  </div>
                  <div className="bg-green-900/30 p-3 rounded-full">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                </div>
                <a href="/my-courses" className="text-green-400 text-xs mt-4 inline-block hover:text-green-300">
                  View certificates →
                </a>
              </div>
              
              {/* Cart card */}
              <div className="p-6 rounded-2xl backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7))' }}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Cart Items</p>
                    <h3 className="text-2xl font-bold text-white mt-1">{stats.cartItems}</h3>
                  </div>
                  <div className="bg-pink-900/30 p-3 rounded-full">
                    <ShoppingCart className="w-5 h-5 text-pink-400" />
                  </div>
                </div>
                <a href="/cart" className="text-pink-400 text-xs mt-4 inline-block hover:text-pink-300">
                  View cart →
                </a>
              </div>
            </div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 rounded-2xl backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7))' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Your Account</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Name</span>
                    <span className="text-white">{user?.firstName} {user?.lastName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Email</span>
                    <span className="text-white">{user?.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">User ID</span>
                    <span className="text-white">{user?.id || 'N/A'}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7))' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Course Management</h3>
                <div className="text-sm text-gray-400">
                  <p>Manage your learning journey or add new courses to your collection.</p>
                  <div className="mt-4 grid grid-cols-1 gap-2">
                    <a href="/my-courses" className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs transition-colors flex items-center justify-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      My Learning
                    </a>
                    <a href="/cart" className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-xs transition-colors flex items-center justify-center">
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Go to Cart {stats.cartItems > 0 && `(${stats.cartItems})`}
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="p-6 rounded-2xl backdrop-blur-xl border border-gray-700/50 hover:border-purple-500/30 transition-all duration-300" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.7), rgba(31,41,55,0.7), rgba(0,0,0,0.7))' }}>
                <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                <ul className="space-y-3 text-sm">
                  <li className="flex items-center gap-2 text-gray-400">
                    <div className="w-5 h-5 rounded-full border border-purple-500 flex items-center justify-center">
                      <span className="text-xs text-purple-500">1</span>
                    </div>
                    <span>Browse available courses</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <div className="w-5 h-5 rounded-full border border-purple-500 flex items-center justify-center">
                      <span className="text-xs text-purple-500">2</span>
                    </div>
                    <span>Browse available courses</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-400">
                    <div className="w-5 h-5 rounded-full border border-purple-500 flex items-center justify-center">
                      <span className="text-xs text-purple-500">3</span>
                    </div>
                    <span>Enroll in your first course</span>
                  </li>
                </ul>
              </div>
            </div>
          </main>
        </div>
      </div>
    </section>
  );
}
