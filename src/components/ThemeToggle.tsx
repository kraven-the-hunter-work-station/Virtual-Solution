import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

interface ThemeToggleProps {
  isFloating?: boolean;
}

export default function ThemeToggle({ isFloating = false }: ThemeToggleProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  
  // Initialize theme on mount
  useEffect(() => {
    // Check localStorage for saved theme
    const savedTheme = localStorage.getItem('vs-theme');
    if (savedTheme === 'light' || savedTheme === 'dark') {
      setTheme(savedTheme);
    }
    
    // Apply theme to document body
    applyTheme(savedTheme as 'light' | 'dark' || 'dark');
  }, []);
  
  // Apply theme function
  const applyTheme = (newTheme: 'light' | 'dark') => {
    if (newTheme === 'light') {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    } else {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    }
  };
  
  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    applyTheme(newTheme);
    localStorage.setItem('vs-theme', newTheme);
  };
  
  // If this is a floating button (for mobile or pages without navbar)
  if (isFloating) {
    return (
      <button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 z-[100] p-2.5 rounded-xl border-2 transition-all duration-300 flex items-center justify-center shadow-lg ${
          theme === 'light'
            ? 'bg-white/90 border-[#4169E1] text-[#4169E1] hover:bg-[#4169E1]/10'
            : 'bg-gray-900/90 border-purple-500 text-yellow-300 hover:bg-purple-900/50'
        }`}
        style={{
          backdropFilter: 'blur(8px)',
          boxShadow: theme === 'light'
            ? '0 4px 12px rgba(65, 105, 225, 0.3)'
            : '0 4px 12px rgba(139, 92, 246, 0.3)'
        }}
        title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
      >
        {theme === 'light' ? (
          <Moon className="w-5 h-5 stroke-[2.5] text-[#4169E1]" />
        ) : (
          <Sun className="w-5 h-5 stroke-[2.5] text-yellow-300" />
        )}
      </button>
    );
  }
  
  // For navbar integration
  return (
    <button
      onClick={toggleTheme}
      className={`relative p-2.5 rounded-xl border-2 transition-all duration-300 group flex items-center ${
        theme === 'light'
          ? 'bg-white/90 border-[#4169E1] text-[#4169E1] hover:bg-[#4169E1]/20'
          : 'bg-gray-900/90 border-purple-500 text-yellow-300 hover:bg-purple-900/70'
      }`}
      style={{
        backdropFilter: 'blur(12px)',
        boxShadow: theme === 'light'
          ? '0 2px 10px rgba(65, 105, 225, 0.25)'
          : '0 2px 10px rgba(139, 92, 246, 0.25)'
      }}
      title={theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
    >
      {theme === 'light' ? (
        <Moon className="w-5 h-5 stroke-[2.5] text-[#4169E1]" />
      ) : (
        <Sun className="w-5 h-5 stroke-[2.5] text-yellow-300" />
      )}
      <span className="hidden md:inline ml-2 font-medium keep-color">
        {theme === 'light' ? 'Dark' : 'Light'}
      </span>
    </button>
  );
}
