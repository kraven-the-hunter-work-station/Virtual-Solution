import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Star, Users, Clock, ArrowRight } from 'lucide-react';
import CourseModal from './CourseModal';

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

interface CourseSliderProps {
  courses: Course[];
}

export default function CourseSlider({ courses }: CourseSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragDistance, setDragDistance] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const cardWidth = 384; // w-96 = 384px
  const gap = 32; // gap-8 = 32px
  const totalCardWidth = cardWidth + gap;

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % courses.length);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true);
    }, 600);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + courses.length) % courses.length);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true);
    }, 600);
  };

  const goToSlide = (index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setIsAutoPlaying(false);
    setCurrentIndex(index);
    setTimeout(() => {
      setIsTransitioning(false);
      setIsAutoPlaying(true);
    }, 600);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !sliderRef.current) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    setDragDistance(walk);
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    if (!isDragging || !sliderRef.current) return;
    setIsDragging(false);
    setDragDistance(0);
    
    // Snap to nearest card
    const scrollPosition = sliderRef.current.scrollLeft;
    const newIndex = Math.round(scrollPosition / totalCardWidth);
    goToSlide(Math.max(0, Math.min(newIndex, courses.length - 1)));
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!sliderRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !sliderRef.current) return;
    const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    setDragDistance(walk);
    sliderRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    if (!isDragging || !sliderRef.current) return;
    setIsDragging(false);
    setDragDistance(0);
    
    // Snap to nearest card
    const scrollPosition = sliderRef.current.scrollLeft;
    const newIndex = Math.round(scrollPosition / totalCardWidth);
    goToSlide(Math.max(0, Math.min(newIndex, courses.length - 1)));
  };

  // Auto-scroll effect
  useEffect(() => {
    if (!sliderRef.current) return;
    
    const targetScroll = currentIndex * totalCardWidth;
    const currentScroll = sliderRef.current.scrollLeft;
    const distance = Math.abs(targetScroll - currentScroll);
    
    // Use different animation durations based on distance
    const duration = Math.min(600, Math.max(300, distance * 0.5));
    
    sliderRef.current.style.scrollBehavior = 'smooth';
    sliderRef.current.scrollTo({
      left: targetScroll,
      behavior: 'smooth'
    });
    
    // Reset scroll behavior after animation
    setTimeout(() => {
      if (sliderRef.current) {
        sliderRef.current.style.scrollBehavior = 'auto';
      }
    }, duration);
  }, [currentIndex, totalCardWidth]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      if (!isDragging && !isTransitioning) {
        nextSlide();
      }
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, isDragging, isTransitioning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(undefined);
  };

  return (
    <>
      <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {/* Navigation Arrows - Desktop */}
        <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className={`absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.15)] text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-[8px] border border-[rgba(255,255,255,0.1)] hidden md:flex items-center justify-center ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'}`}
          style={{ marginTop: '-24px', background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className={`absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-[rgba(255,255,255,0.05)] hover:bg-[rgba(255,255,255,0.15)] text-white p-3 rounded-full transition-all duration-300 hover:scale-110 backdrop-blur-[8px] border border-[rgba(255,255,255,0.1)] hidden md:flex items-center justify-center ${isTransitioning ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.37)]'}`}
          style={{ marginTop: '-24px', background: 'linear-gradient(145deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))' }}
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className={`flex gap-8 overflow-x-auto scrollbar-hide pb-4 transition-all duration-300 ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          style={{
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            WebkitOverflowScrolling: 'touch'
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {courses.map((course, index) => (
            <div
              key={course.id}
              className={`flex-shrink-0 w-96 bg-black/80 rounded-2xl shadow-xl overflow-hidden transition-all duration-500 group border border-gray-700/50 backdrop-blur-lg relative transform ${
                index === currentIndex 
                  ? 'scale-105 shadow-2xl shadow-purple-500/20' 
                  : 'hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/10'
              } ${isDragging ? 'pointer-events-none' : 'cursor-pointer'}`}
              style={{ 
                scrollSnapAlign: 'start',
                animationDelay: `${index * 0.1}s`,
                transform: `translateX(${isDragging ? dragDistance * 0.1 : 0}px) ${index === currentIndex ? 'scale(1.05)' : 'scale(1)'}`
              }}
            >
              {/* Card blur background */}
              <div className="absolute inset-0 rounded-2xl opacity-30 blur-xl" style={{ background: 'radial-gradient(circle at center, #7c3aed 0%, #991bb3 40%, transparent 70%)' }}></div>
              <div className="relative z-10">
                <div className="relative overflow-hidden">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    draggable={false}
                  />
                  <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {course.level}
                  </div>
                  <div className="absolute top-4 right-4 text-white px-3 py-1 rounded-full text-sm font-semibold" style={{ background: 'linear-gradient(to right, #991bb3, #b91c7c)' }}>
                    {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-purple-400">
                    {course.title}
                  </h3>
                  <p className="text-gray-400 mb-4 transition-colors duration-300 group-hover:text-gray-300">By {course.instructor}</p>
                  
                  <div className="flex items-center space-x-4 mb-4 text-sm text-gray-400 transition-colors duration-300 group-hover:text-gray-300">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="w-4 h-4" />
                      <span>{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{course.duration}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold" style={{ color: '#991bb3' }}>${course.price}</span>
                      <span className="text-lg text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourseClick(course);
                      }}
                      className="text-white px-6 py-2 rounded-full transition-all duration-300 font-semibold flex items-center space-x-2 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 active:scale-95" 
                      style={{ backgroundColor: '#cc73f8' }}
                    >
                      <span>View Details</span>
                      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center mt-8 space-x-2">
          {courses.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`rounded-full transition-all duration-500 ease-out ${
                index === currentIndex 
                  ? 'w-8 h-3 scale-125 shadow-lg shadow-purple-500/30' 
                  : 'w-3 h-3 hover:scale-110 hover:shadow-md hover:shadow-purple-500/20'
              }`}
              style={{ 
                backgroundColor: index === currentIndex ? '#cc73f8' : 'rgba(204, 115, 248, 0.3)',
                borderRadius: index === currentIndex ? '12px' : '50%'
              }}
            />
          ))}
        </div>

        {/* Mobile swipe hint */}
        <div className="md:hidden text-center mt-4">
          <p className="text-gray-400 text-sm animate-pulse">← Swipe to explore more courses →</p>
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && isModalOpen && (
        <CourseModal 
          course={selectedCourse}
          isOpen={true}
          onClose={handleCloseModal}
        />
      )}
    </>
  );
}