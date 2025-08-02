import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Play, 
  ArrowRight, 
  Star
} from 'lucide-react';
import FeaturedCourses from './FeaturedCourses';

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  originalPrice: number;
  rating: number;
  students: number;
  duration: string;
  image: string;
  level: string;
  category: string;
}

interface Testimonial {
  name: string;
  role: string;
  content: string;
  avatar: string;
  rating: number;
}

interface HomePageProps {
  courses: Course[];
  testimonials: Testimonial[];
  addToCart: (courseId: number) => void;
}

interface CounterProps {
  end: number;
  suffix?: string;
  duration?: number;
}

function AnimatedCounter({ end, suffix = '', duration = 2000 }: CounterProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasStarted) {
          setHasStarted(true);
          
          const startTime = Date.now();
          const startValue = 0;
          
          const animate = () => {
            const now = Date.now();
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const currentValue = Math.floor(startValue + (end - startValue) * easeOutQuart);
            
            setCount(currentValue);
            
            if (progress < 1) {
              requestAnimationFrame(animate);
            }
          };
          
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(`counter-${end}`);
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, [end, duration, hasStarted]);

  return (
    <span id={`counter-${end}`} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function HomePage({ courses, testimonials, addToCart }: HomePageProps) {
  const navigate = useNavigate();
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const words = ['Skills', 'Knowledge', 'Career', 'Future', 'Expertise', 'Potential'];

  const handleNavigation = (page: string) => {
    if (page === 'home') {
      navigate('/');
    } else {
      navigate(`/${page}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
        setIsAnimating(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-6 pb-6 sm:pt-20 sm:pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="relative z-10">
            {/* Premium Badge */}
            
            
            {/* Main Heading */}
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight px-2 mt-8 sm:mt-10">
              <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                Unlock Your
              </span>
              <br />
              <span className="relative inline-block">
                <span className={`bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent transition-all duration-500 ${isAnimating ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}>
                  {words[currentWordIndex]}
                </span>
              </span>
            </h1>
            
            <p className="text-lg sm:text-2xl lg:text-3xl text-gray-300 leading-relaxed max-w-3xl mx-auto px-4">
              Learn from industry experts with our comprehensive online courses. 
              Build real-world projects, earn certificates, and advance your career 
              from anywhere in the world.
            </p>
            
            <div className="flex flex-col gap-4 sm:flex-row sm:gap-6 justify-center mt-6 sm:mt-16 px-4">
              <button 
                onClick={() => handleNavigation('courses')}
                className="group relative text-white px-7 py-4 sm:px-9 sm:py-5 rounded-full transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 flex items-center justify-center space-x-2 sm:space-x-3 font-semibold text-lg sm:text-xl w-full sm:w-auto overflow-hidden" 
                style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed)' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <Play className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">Start Learning Now</span>
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              
              <button 
                onClick={() => handleNavigation('courses')}
                className="group relative border-2 px-7 py-4 sm:px-9 sm:py-5 rounded-full transition-all duration-500 font-semibold text-lg sm:text-xl w-full sm:w-auto backdrop-blur-xl hover:backdrop-blur-2xl" 
                style={{ 
                  borderColor: '#991bb3', 
                  color: '#991bb3',
                  background: 'rgba(153, 27, 179, 0.1)'
                }} 
                onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { 
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'linear-gradient(135deg, #991bb3, #b91c7c)';
                  target.style.color = 'white';
                  target.style.transform = 'translateY(-2px)';
                  target.style.boxShadow = '0 15px 30px -10px rgba(153, 27, 179, 0.4)';
                }} 
                onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                  const target = e.target as HTMLButtonElement;
                  target.style.background = 'rgba(153, 27, 179, 0.1)';
                  target.style.color = '#991bb3';
                  target.style.transform = 'translateY(0)';
                  target.style.boxShadow = 'none';
                }}
              >
                View Course Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative py-6 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-12 hidden sm:grid">
            <div className="hidden sm:block text-center group">
              <div className="relative mb-3 sm:mb-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <AnimatedCounter end={50} suffix="K+" duration={2500} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Active Students</h3>
              <p className="text-gray-400 text-sm sm:text-base">Learning and growing every day</p>
            </div>
            
            <div className="hidden sm:block text-center group">
              <div className="relative mb-3 sm:mb-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <AnimatedCounter end={200} suffix="+" duration={2000} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Expert Courses</h3>
              <p className="text-gray-400 text-sm sm:text-base">Comprehensive curriculum</p>
            </div>
            
            <div className="hidden sm:block text-center group">
              <div className="relative mb-3 sm:mb-4">
                <div className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  <AnimatedCounter end={98} suffix="%" duration={2200} />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-1 sm:mb-2">Success Rate</h3>
              <p className="text-gray-400 text-sm sm:text-base">Students achieve their goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="relative py-6 sm:py-20 px-4 sm:px-6 lg:px-8 mt-0 sm:mt-0">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
              <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                Featured Courses
              </span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto px-4 mb-2 sm:mb-4">
              Discover our most popular courses designed by industry experts to help you master new skills and advance your career.
            </p>
          </div>
          
          <FeaturedCourses courses={courses.slice(0, 3)} addToCart={addToCart} />
          
          <div className="text-center mt-12">
            <button 
              onClick={() => handleNavigation('courses')}
              className="group relative px-8 py-4 rounded-full font-semibold text-lg transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20" 
              style={{ 
                background: 'linear-gradient(135deg, rgba(153, 27, 179, 0.2), rgba(185, 28, 124, 0.2))',
                border: '2px solid #991bb3',
                color: '#991bb3'
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { 
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(135deg, #991bb3, #b91c7c)';
                target.style.color = 'white';
              }} 
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(135deg, rgba(153, 27, 179, 0.2), rgba(185, 28, 124, 0.2))';
                target.style.color = '#991bb3';
              }}
            >
              <span className="flex items-center gap-3">
                View All Courses
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Hidden on mobile */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 hidden md:block">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
                What Our Students Say
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of successful graduates who have transformed their careers through our courses.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="relative group">
                <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-700/30 hover:border-purple-500/30 transition-all duration-500 hover:transform hover:scale-105">
                  <div className="flex items-center gap-2 mb-4">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  
                  <p className="text-gray-300 mb-6 leading-relaxed">&ldquo;{testimonial.content}&rdquo;</p>
                  
                  <div className="flex items-center gap-4">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
                    />
                    <div>
                      <h4 className="font-semibold text-white">{testimonial.name}</h4>
                      <p className="text-sm text-gray-400">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">
              Ready to Transform Your Career?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful professionals who have advanced their careers through our premium courses.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
           
            
            <button 
              onClick={() => handleNavigation('contact')}
              className="group relative border-2 px-8 py-4 rounded-full transition-all duration-500 font-semibold text-lg w-full sm:w-auto backdrop-blur-xl hover:backdrop-blur-2xl" 
              style={{ 
                borderColor: '#991bb3', 
                color: '#991bb3',
                background: 'rgba(153, 27, 179, 0.1)'
              }} 
              onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => { 
                const target = e.target as HTMLButtonElement;
                target.style.background = 'linear-gradient(135deg, #991bb3, #b91c7c)';
                target.style.color = 'white';
                target.style.transform = 'translateY(-2px)';
                target.style.boxShadow = '0 15px 30px -10px rgba(153, 27, 179, 0.4)';
              }} 
              onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => {
                const target = e.target as HTMLButtonElement;
                target.style.background = 'rgba(153, 27, 179, 0.1)';
                target.style.color = '#991bb3';
                target.style.transform = 'translateY(0)';
                target.style.boxShadow = 'none';
              }}
            >
              Contact Us
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
