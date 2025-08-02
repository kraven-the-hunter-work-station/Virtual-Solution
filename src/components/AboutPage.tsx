import { Globe, Award, Zap, Users, Heart, Lightbulb, Target, Sparkles, Shield, TrendingUp, Clock, Sun, Moon } from 'lucide-react';
import TeamSection from './TeamSection';
import { useState, useEffect } from 'react';

export default function AboutPage() {
  const [theme, setTheme] = useState('dark');

  // Theme switching function
  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    localStorage.setItem('vs-theme', newTheme);
  };

  // Load saved theme on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('vs-theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  const stats = [
    { number: '50K+', label: 'Active Students', icon: '👨‍🎓', gradient: 'from-blue-400 to-cyan-400' },
    { number: '200+', label: 'Expert Instructors', icon: '👩‍🏫', gradient: 'from-purple-400 to-pink-400' },
    { number: '500+', label: 'Courses Available', icon: '📚', gradient: 'from-green-400 to-emerald-400' },
    { number: '98%', label: 'Student Satisfaction', icon: '⭐', gradient: 'from-yellow-400 to-orange-400' }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Excellence',
      description: 'We strive for the highest quality in everything we do, from course content to student support.',
      gradient: 'from-red-400 to-pink-400'
    },
    {
      icon: <Heart className="w-8 h-8" />,
      title: 'Accessibility',
      description: 'Education should be available to everyone, regardless of location, background, or financial situation.',
      gradient: 'from-pink-400 to-purple-400'
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Innovation',
      description: 'We continuously evolve our platform and teaching methods to provide the best learning experience.',
      gradient: 'from-yellow-400 to-orange-400'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community',
      description: 'Learning is better together. We foster a supportive community of learners and educators.',
      gradient: 'from-blue-400 to-cyan-400'
    }
  ];

  const features = [
    {
      icon: <Globe className="w-6 h-6" />,
      title: 'Learn Anywhere',
      description: 'Access courses from any device, anywhere in the world, at your own pace.',
      gradient: 'from-blue-400 to-cyan-400'
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: 'Expert Instructors',
      description: 'Learn from industry leaders and experienced professionals.',
      gradient: 'from-purple-400 to-pink-400'
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Practical Projects',
      description: 'Build real-world projects that you can showcase in your portfolio.',
      gradient: 'from-yellow-400 to-orange-400'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Lifetime Access',
      description: 'Once enrolled, you have lifetime access to course materials and updates.',
      gradient: 'from-green-400 to-emerald-400'
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Career Growth',
      description: 'Our courses are designed to accelerate your career advancement.',
      gradient: 'from-indigo-400 to-blue-400'
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: '24/7 Support',
      description: 'Get help whenever you need it with our round-the-clock support team.',
      gradient: 'from-red-400 to-pink-400'
    }
  ];

  return (
    <section className={`py-20 relative overflow-hidden min-h-screen ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      {/* Navbar with Theme Toggle - More prominent */}
      <div className="fixed top-0 left-0 right-0 z-[100] shadow-2xl transition-all duration-300 border-b backdrop-blur-sm"
           style={{ 
             background: theme === 'light' 
               ? 'rgba(255, 255, 255, 0.95)' 
               : 'rgba(17, 24, 39, 0.95)',
             backdropFilter: 'blur(16px)',
             borderBottomColor: theme === 'light' ? 'rgba(65, 105, 225, 0.2)' : 'rgba(147, 51, 234, 0.3)',
             borderBottomWidth: '2px'
           }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo/Brand */}
            <div className="flex items-center">
              <span className={`font-bold text-xl ${theme === 'light' ? 'text-[#212529]' : 'text-white'}`}>
                Virtual Solutions
              </span>
            </div>
            
            {/* Navigation Links - Hidden on mobile, show theme toggle prominently */}
            <div className="hidden lg:flex items-center space-x-8">
              <a href="#" className={`font-medium transition-colors duration-300 ${
                theme === 'light' 
                  ? 'text-[#212529] hover:text-[#4169E1]' 
                  : 'text-gray-300 hover:text-purple-300'
              }`}>Home</a>
              <a href="#" className={`font-medium transition-colors duration-300 ${
                theme === 'light' 
                  ? 'text-[#4169E1] border-b-2 border-[#4169E1]' 
                  : 'text-purple-300 border-b-2 border-purple-300'
              }`}>About</a>
              <a href="#" className={`font-medium transition-colors duration-300 ${
                theme === 'light' 
                  ? 'text-[#212529] hover:text-[#4169E1]' 
                  : 'text-gray-300 hover:text-purple-300'
              }`}>Services</a>
              <a href="#" className={`font-medium transition-colors duration-300 ${
                theme === 'light' 
                  ? 'text-[#212529] hover:text-[#4169E1]' 
                  : 'text-gray-300 hover:text-purple-300'
              }`}>Blog</a>
              <a href="#" className={`font-medium transition-colors duration-300 ${
                theme === 'light' 
                  ? 'text-[#212529] hover:text-[#4169E1]' 
                  : 'text-gray-300 hover:text-purple-300'
              }`}>Contact</a>
            </div>
            
            {/* Right side - Sign In, Sign Up, and Theme Toggle */}
            <div className="flex items-center space-x-4">
              {/* Sign In Button */}
              <button className={`px-4 py-2 font-medium transition-all duration-300 rounded-lg ${
                theme === 'light' 
                  ? 'text-[#212529] hover:text-[#4169E1] hover:bg-[#F0F2F5]' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Sign In</span>
                </div>
              </button>
              
              {/* Sign Up Button */}
              <button className={`px-4 py-2 font-semibold rounded-lg transition-all duration-300 border-2 ${
                theme === 'light' 
                  ? 'bg-[#4169E1] hover:bg-[#2d5cc7] text-white border-[#4169E1]' 
                  : 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500'
              }`}>
                <div className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  <span>Sign Up</span>
                </div>
              </button>
              
              {/* Theme Toggle - Beside Sign In/Sign Up - VERY VISIBLE */}
              <button
                onClick={toggleTheme}
                className={`relative px-4 py-2.5 rounded-lg transition-all duration-300 flex items-center font-semibold text-sm border-2 transform hover:scale-105 shadow-lg ${
                  theme === 'light' 
                    ? 'bg-[#4169E1] hover:bg-[#2d5cc7] text-white border-[#4169E1] shadow-blue-500/50' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500 shadow-purple-500/50'
                }`}
                style={{
                  minWidth: '80px',
                  boxShadow: theme === 'light' 
                    ? '0 4px 15px rgba(65, 105, 225, 0.4), 0 0 0 2px rgba(65, 105, 225, 0.1)' 
                    : '0 4px 15px rgba(147, 51, 234, 0.4), 0 0 0 2px rgba(147, 51, 234, 0.1)'
                }}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                <div className="flex items-center space-x-2">
                  {theme === 'light' ? (
                    <>
                      <Moon className="w-5 h-5 drop-shadow-sm" />
                      <span className="font-bold">Dark</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-5 h-5 drop-shadow-sm" />
                      <span className="font-bold">Light</span>
                    </>
                  )}
                </div>
                
                {/* Very visible glow effect */}
                <div className={`absolute inset-0 rounded-lg blur-md opacity-40 ${
                  theme === 'light' ? 'bg-[#4169E1]' : 'bg-purple-600'
                }`}></div>
              </button>
            </div>
            
            {/* Mobile Navigation Menu - Only on small screens */}
            <div className="lg:hidden flex items-center space-x-3">
              {/* Mobile Theme Toggle - VERY VISIBLE */}
              <button
                onClick={toggleTheme}
                className={`p-3 rounded-xl transition-all duration-300 border-2 shadow-lg ${
                  theme === 'light' 
                    ? 'bg-[#4169E1] hover:bg-[#2d5cc7] text-white border-[#4169E1] shadow-blue-500/50' 
                    : 'bg-purple-600 hover:bg-purple-700 text-white border-purple-500 shadow-purple-500/50'
                }`}
                style={{
                  boxShadow: theme === 'light' 
                    ? '0 4px 15px rgba(65, 105, 225, 0.4)' 
                    : '0 4px 15px rgba(147, 51, 234, 0.4)'
                }}
                aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
              >
                {theme === 'light' ? (
                  <Moon className="w-6 h-6 drop-shadow-sm" />
                ) : (
                  <Sun className="w-6 h-6 drop-shadow-sm" />
                )}
              </button>
              
              {/* Mobile Menu Button */}
              <button className={`p-2 rounded-lg transition-colors duration-300 ${
                theme === 'light' 
                  ? 'text-[#212529] hover:bg-[#F0F2F5]' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add more spacing for fixed navbar */}
      <div className="h-20"></div>

      {/* Floating Theme Toggle - Always Visible as Backup */}
      <div className="fixed bottom-6 right-6 z-[200]">
        <button
          onClick={toggleTheme}
          className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 shadow-2xl border-4 ${
            theme === 'light' 
              ? 'bg-[#4169E1] hover:bg-[#2d5cc7] text-white border-white shadow-blue-500/50' 
              : 'bg-purple-600 hover:bg-purple-700 text-white border-gray-800 shadow-purple-500/50'
          }`}
          style={{
            boxShadow: theme === 'light' 
              ? '0 8px 25px rgba(65, 105, 225, 0.6), 0 0 0 3px rgba(255, 255, 255, 0.8)' 
              : '0 8px 25px rgba(147, 51, 234, 0.6), 0 0 0 3px rgba(31, 41, 55, 0.8)'
          }}
          aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        >
          {theme === 'light' ? (
            <Moon className="w-7 h-7 drop-shadow-lg" />
          ) : (
            <Sun className="w-7 h-7 drop-shadow-lg" />
          )}
          
          {/* Pulsing glow effect */}
          <div className={`absolute inset-0 rounded-full animate-pulse ${
            theme === 'light' ? 'bg-[#4169E1]' : 'bg-purple-600'
          }`} style={{ opacity: 0.3, filter: 'blur(8px)' }}></div>
        </button>
      </div>

      {/* Premium Background - Dynamic based on theme */}
      {theme === 'dark' ? (
        <>
          <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20"></div>
          
          {/* Floating Background Elements */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/8 to-pink-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }}></div>
          
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(153, 27, 179, 0.15) 1px, transparent 1px),
                linear-gradient(90deg, rgba(153, 27, 179, 0.15) 1px, transparent 1px),
                radial-gradient(circle at 25% 25%, rgba(204, 115, 248, 0.1) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(153, 27, 179, 0.1) 0%, transparent 50%)
              `,
              backgroundSize: '80px 80px, 80px 80px, 400px 400px, 600px 600px'
            }}></div>
          </div>
        </>
      ) : (
        <>
          <div className="absolute inset-0 bg-[#FAFAFA]"></div>
          
          {/* Light theme geometric patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `
                linear-gradient(rgba(65, 105, 225, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(65, 105, 225, 0.1) 1px, transparent 1px),
                radial-gradient(circle at 25% 25%, rgba(65, 105, 225, 0.05) 0%, transparent 50%),
                radial-gradient(circle at 75% 75%, rgba(255, 107, 0, 0.05) 0%, transparent 50%)
              `,
              backgroundSize: '80px 80px, 80px 80px, 400px 400px, 600px 600px'
            }}></div>
          </div>
          
          {/* Light floating elements */}
          <div className="absolute top-10 left-10 w-96 h-96 bg-[#4169E1]/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 bg-[#FF6B00]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        </>
      )}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-24 pt-20">
          {/* Decorative Elements */}
          {theme === 'dark' ? (
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
              <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
              <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
            </div>
          ) : (
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-[#4169E1]"></div>
              <Sparkles className="w-6 h-6 text-[#4169E1] animate-pulse" />
              <div className="w-16 h-0.5 bg-gradient-to-r from-[#4169E1] via-[#FF6B00] to-[#4169E1]"></div>
              <Sparkles className="w-6 h-6 text-[#FF6B00] animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="w-8 h-0.5 bg-gradient-to-r from-[#FF6B00] to-transparent"></div>
            </div>
          )}
          
          <h1 className={`text-6xl md:text-7xl font-bold mb-8 relative ${theme === 'light' ? 'text-[#212529]' : ''}`}>
            <span className={theme === 'light' ? 'text-[#212529]' : 'text-white'}>About </span>
            <span className={theme === 'light' 
              ? 'bg-gradient-to-r from-[#4169E1] via-[#FF6B00] to-[#4169E1] bg-clip-text text-transparent'
              : 'bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent'
            }>
              Virtual Solutions
            </span>
            <div className={`absolute -inset-4 blur-3xl opacity-50 rounded-full ${
              theme === 'light'
                ? 'bg-gradient-to-r from-[#4169E1]/20 to-[#FF6B00]/20'
                : 'bg-gradient-to-r from-purple-600/20 to-pink-600/20'
            }`}></div>
          </h1>
          
          <p className={`text-xl md:text-2xl max-w-5xl mx-auto leading-relaxed font-light ${
            theme === 'light' ? 'text-[#6C757D]' : 'text-gray-300'
          }`}>
            We're on a mission to 
            <span className={theme === 'light' ? 'text-[#4169E1] font-semibold' : 'text-purple-300 font-semibold'}>
              {' '}democratize education
            </span> and empower learners worldwide with the 
            <span className={theme === 'light' ? 'text-[#FF6B00] font-semibold' : 'text-pink-300 font-semibold'}>
              {' '}skills they need
            </span> to succeed in the digital age.
          </p>
        </div>

        {/* Mission Statement - Theme Responsive */}
        <div className="mb-24">
          <div className={`relative p-12 md:p-16 rounded-3xl transition-all duration-500 group overflow-hidden ${
            theme === 'light'
              ? 'bg-[#F0F2F5] border border-[#E0E0E0] hover:shadow-lg'
              : 'backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50'
          }`} style={theme === 'dark' ? { background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' } : {}}>
            
            {/* Background Effects - Theme Responsive */}
            {theme === 'dark' ? (
              <>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
              </>
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-[#4169E1]/5 via-transparent to-[#FF6B00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            )}
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {theme === 'dark' ? (
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
                </div>
              ) : (
                <div className="inline-flex items-center gap-3 mb-8">
                  <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-[#4169E1]"></div>
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#4169E1] to-[#FF6B00] animate-pulse"></div>
                  <div className="w-12 h-0.5 bg-gradient-to-r from-[#4169E1] to-[#FF6B00]"></div>
                  <div className="w-3 h-3 rounded-full bg-gradient-to-r from-[#FF6B00] to-[#4169E1] animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="w-6 h-0.5 bg-gradient-to-r from-[#FF6B00] to-transparent"></div>
                </div>
              )}
              
              <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
                theme === 'light' ? 'text-[#212529]' : ''
              }`}>
                {theme === 'light' ? (
                  <span className="bg-gradient-to-r from-[#4169E1] via-[#FF6B00] to-[#4169E1] bg-clip-text text-transparent">
                    Our Mission
                  </span>
                ) : (
                  <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    Our Mission
                  </span>
                )}
              </h2>
              
              <p className={`text-xl md:text-2xl leading-relaxed max-w-5xl mx-auto font-light ${
                theme === 'light' ? 'text-[#6C757D]' : 'text-gray-200'
              }`}>
                To provide 
                <span className={theme === 'light' ? 'text-[#4169E1] font-semibold' : 'text-purple-300 font-semibold'}>
                  {' '}world-class online education
                </span> that is accessible, affordable, and practical. 
                We believe that everyone deserves the opportunity to learn new skills, advance their career, and achieve their dreams, 
                regardless of their background or circumstances.
              </p>
            </div>
            
            {/* Decorative Elements */}
            {theme === 'dark' ? (
              <>
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
              </>
            ) : (
              <>
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gradient-to-br from-[#4169E1]/20 to-[#FF6B00]/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-6 left-6 w-6 h-6 rounded-full bg-gradient-to-br from-[#FF6B00]/20 to-[#4169E1]/20 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
              </>
            )}
          </div>
        </div>

        {/* Stats - Theme Responsive */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-24">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`group text-center p-8 rounded-3xl transition-all duration-500 hover:scale-105 ${
                theme === 'light'
                  ? 'bg-[#F0F2F5] border border-[#E0E0E0] hover:shadow-lg'
                  : 'backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/40'
              }`}
              style={theme === 'dark' ? { background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(31,41,55,0.4))' } : {}}
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {stat.icon}
              </div>
              <div className={`text-4xl font-bold mb-3 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent group-hover:scale-105 transition-transform duration-300`}>
                {stat.number}
              </div>
              <div className={`font-medium group-hover:text-gray-300 transition-colors duration-300 ${
                theme === 'light' ? 'text-[#6C757D]' : 'text-gray-400'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Premium Why Choose Us Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
            </div>
            
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Why Choose Virtual Solutions?
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 leading-relaxed font-light">
              We're committed to providing the <span className="text-purple-300 font-semibold">highest quality online education</span> 
              that empowers learners to achieve their goals and transform their careers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="group p-6 rounded-2xl backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/40 transition-all duration-500 hover:scale-105"
                     style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(31,41,55,0.3))' }}>
                  <div className="flex items-start space-x-4">
                    <div className={`rounded-xl p-3 bg-gradient-to-br ${feature.gradient} bg-opacity-20 group-hover:scale-110 transition-transform duration-300`}>
                      <div className={`text-transparent bg-gradient-to-r ${feature.gradient} bg-clip-text`}>
                        {feature.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                        {feature.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image Container */}
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-gray-600/30 group-hover:border-purple-500/50 transition-all duration-500">
              <img 
                src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" 
                alt="Students learning" 
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 px-4 py-2 rounded-full backdrop-blur-xl border border-white/20 bg-white/10">
                <span className="text-white font-semibold text-sm">🎓 50K+ Happy Students</span>
              </div>
            </div>
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-24">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
            </div>
            
            <h2 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Our Values
              </span>
            </h2>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              The principles that guide everything we do at <span className="text-purple-300 font-semibold">Virtual Solutions</span>.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="group relative p-8 rounded-3xl backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 overflow-hidden"
                   style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(31,41,55,0.4))' }}>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                
                {/* Content */}
                <div className="relative z-10 text-center">
                  {/* Enhanced Icon Container */}
                  <div className="relative mb-6">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${value.gradient} bg-opacity-20 group-hover:scale-110 transition-transform duration-300 relative overflow-hidden`}>
                      {/* Background glow effect */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-sm`}></div>
                      
                      {/* Icon */}
                      <div className={`text-transparent bg-gradient-to-r ${value.gradient} bg-clip-text group-hover:scale-110 transition-transform duration-300 relative z-10`}>
                        {value.icon}
                      </div>
                      
                      {/* Floating particles */}
                      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-white/30 to-purple-300/30 opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse"></div>
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 rounded-full bg-gradient-to-r from-pink-300/30 to-white/30 opacity-0 group-hover:opacity-100 transition-all duration-700 animate-pulse delay-200"></div>
                      
                      {/* Rotating border */}
                      <div className={`absolute inset-0 rounded-2xl border-2 border-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-spin-slow`}></div>
                    </div>
                    
                    {/* Outer glow ring */}
                    <div className={`absolute inset-0 w-20 h-20 mx-auto rounded-2xl bg-gradient-to-r ${value.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 scale-150`}></div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-purple-200 transition-colors duration-300">
                    {value.title}
                  </h3>
                  
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {value.description}
                  </p>
                </div>
                
                {/* Enhanced Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-45">
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
                  <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
                </div>
                
                {/* Additional floating elements */}
                <div className="absolute top-1/2 right-2 w-4 h-4 rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-all duration-600 delay-300 animate-bounce"></div>
                <div className="absolute top-8 left-8 w-3 h-3 rounded-full bg-gradient-to-r from-pink-400/15 to-purple-400/15 opacity-0 group-hover:opacity-100 transition-all duration-800 delay-200"></div>
                
                {/* Geometric shapes */}
                <div className="absolute bottom-8 right-8 w-5 h-5 border border-purple-400/20 rotate-45 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-400"></div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Team Section */}
        <div className="mb-24">
          <TeamSection />
        </div>

        {/* Premium CTA Section */}
        <div className="text-center relative">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-pink-900/20 to-purple-900/20 rounded-3xl blur-xl"></div>
          
          <div className="relative p-12 md:p-16 rounded-3xl backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500"
               style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
            
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-6 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
              <div className="w-12 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              <div className="w-3 h-3 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="w-6 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Join Our Mission
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Ready to be part of the future of education? Whether you're a learner or an educator, 
              we'd love to have you join our <span className="text-purple-300 font-semibold">growing community</span>.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              {/* Primary CTA Button */}
              <button className="group relative px-12 py-5 rounded-3xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden text-white"
                      style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}>
                {/* Button Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                
                {/* Shimmer Effect */}
                <div className="absolute inset-0 -top-4 -left-4 w-6 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:animate-shimmer"></div>
                
                <span className="relative z-10 flex items-center gap-3">
                  <span>Start Learning Today</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <Zap className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </span>
              </button>
              
              {/* Secondary CTA Button */}
              <button className="group relative px-12 py-5 rounded-3xl font-bold text-lg text-white transition-all duration-500 hover:scale-105 overflow-hidden border-2 border-white/50 hover:border-white backdrop-blur-sm bg-white/10 hover:bg-white/20">
                {/* Button Background */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 to-purple-200/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <span className="relative z-10 flex items-center gap-3">
                  <span>Become an Instructor</span>
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                    <Award className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                  </div>
                </span>
              </button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">30-Day Money Back Guarantee</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm font-medium">Lifetime Access Included</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                <span className="text-sm font-medium">Expert Support Team</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Styles + Theme Support */}
      <style>{`
        /* Shimmer Animation for CTA Buttons */
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
        
        /* Slow spinning animation for icon borders */
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
        
        /* Enhanced Card Animations */
        .value-card {
          transition: all 0.7s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateY(0) scale(1);
          position: relative;
        }

        .value-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 1.5rem;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .dark-theme .value-card::before {
          background: linear-gradient(135deg, rgba(153, 27, 179, 0.15), rgba(204, 115, 248, 0.15));
        }
        
        .light-theme .value-card::before {
          background: linear-gradient(135deg, rgba(65, 105, 225, 0.1), rgba(255, 107, 0, 0.1));
        }

        .value-card:hover {
          transform: translateY(-8px) scale(1.02);
        }
        
        .dark-theme .value-card:hover {
          box-shadow: 0 25px 50px -15px rgba(153, 27, 179, 0.5);
        }
        
        .light-theme .value-card:hover {
          box-shadow: 0 25px 50px -15px rgba(65, 105, 225, 0.25);
        }

        .value-card:hover::before {
          opacity: 1;
        }

        /* Feature Card Hover Effects */
        .feature-card {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .feature-card:hover {
          transform: translateY(-4px);
        }
        
        .dark-theme .feature-card:hover {
          box-shadow: 0 20px 40px -10px rgba(153, 27, 179, 0.3);
        }
        
        .light-theme .feature-card:hover {
          box-shadow: 0 20px 40px -10px rgba(65, 105, 225, 0.2);
        }

        /* Theme specific styles */
        .light-theme h1, .light-theme h2, .light-theme h3 {
          color: #212529;
        }
        
        .light-theme p {
          color: #6C757D;
        }
        
        .light-theme .card {
          background-color: #F0F2F5;
          border-color: #E0E0E0;
        }
        
        /* Performance optimization for mobile */
        @media (max-width: 768px) {
          .backdrop-blur-xl {
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
        }

        @media (max-width: 480px) {
          .backdrop-blur-xl {
            backdrop-filter: blur(12px);
            -webkit-backdrop-filter: blur(12px);
          }
        }
      `}</style>
    </section>
  );
}