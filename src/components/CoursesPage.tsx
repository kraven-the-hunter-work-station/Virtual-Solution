import { useState } from 'react';
import { Star, Users, Clock, ArrowRight, Search } from 'lucide-react';
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

interface CoursesPageProps {
  courses: Course[];
  addToCart: (courseId: number) => void;
}

export default function CoursesPage({ courses, addToCart }: CoursesPageProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const categories = ['All', 'Web Development', 'Data Science', 'Digital Marketing', 'Design', 'Business'];

  const filteredCourses = courses.filter(course => {
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  console.log('Courses received:', courses.length);
  console.log('Filtered courses:', filteredCourses.length);

  return (
    <section className="py-20 bg-black relative overflow-hidden min-h-screen">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(204, 115, 248, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204, 115, 248, 0.15) 1px, transparent 1px),
            linear-gradient(rgba(204, 115, 248, 0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(204, 115, 248, 0.08) 1px, transparent 1px),
            radial-gradient(circle at 25% 25%, rgba(153, 27, 179, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 75% 75%, rgba(204, 115, 248, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: '120px 120px, 120px 120px, 24px 24px, 24px 24px, 800px 800px, 600px 600px'
        }}></div>
      </div>
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-20 blur-3xl" style={{ background: 'radial-gradient(circle, #7c3aed 0%, #991bb3 50%, transparent 70%)' }}></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full opacity-15 blur-3xl" style={{ background: 'radial-gradient(circle, #cc73f8 0%, #991bb3 50%, transparent 70%)' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 pt-20">
          <div className="w-16 h-0.5 mx-auto mb-6" style={{ backgroundColor: '#cc73f8' }}></div>
          <h1 className="text-5xl font-bold text-white mb-6">
            All <span className="text-transparent bg-clip-text" style={{ backgroundImage: 'linear-gradient(to right, #991bb3, #b91c7c)', WebkitBackgroundClip: 'text' }}>Courses</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our comprehensive library of courses designed to help you master new skills and advance your career.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-full text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full transition-all duration-300 font-medium ${
                  selectedCategory === category
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white border border-gray-600 hover:border-purple-500'
                }`}
                style={selectedCategory === category ? { backgroundColor: '#cc73f8' } : {}}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCourses.length === 0 && (
            <div className="col-span-full text-center py-16">
              <p className="text-xl text-gray-400">
                {courses.length === 0 ? 'No courses available.' : 'No courses found matching your criteria.'}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Total courses: {courses.length}, Filtered: {filteredCourses.length}
              </p>
            </div>
          )}
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className="premium-course-card bg-gradient-to-br from-gray-900/90 via-black/90 to-gray-900/90 rounded-3xl shadow-2xl overflow-hidden hover:shadow-purple-500/20 transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 group border border-gray-700/30 backdrop-blur-xl relative"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Premium Glow Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-purple-600/20 via-pink-600/10 to-purple-600/20 blur-xl"></div>
              
              {/* Shimmer Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
              
              <div className="relative z-10">
                <div className="relative overflow-hidden rounded-t-3xl">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-52 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Image Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Level Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20">
                      {course.level}
                    </div>
                  </div>
                  
                  {/* Discount Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg backdrop-blur-sm border border-white/20 animate-pulse">
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                    </div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30 hover:scale-110 transition-transform duration-300">
                      <div className="w-0 h-0 border-l-[20px] border-l-white border-t-[12px] border-t-transparent border-b-[12px] border-b-transparent ml-1"></div>
                    </div>
                  </div>
                </div>
                
                <div className="p-8">
                  {/* Course Title */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 line-clamp-2">
                    {course.title}
                  </h3>
                  
                  {/* Instructor */}
                  <p className="text-gray-400 mb-6 font-medium">By {course.instructor}</p>
                  
                  {/* Course Stats */}
                  <div className="flex items-center justify-between mb-6 text-sm">
                    <div className="flex items-center space-x-1 bg-yellow-500/10 px-3 py-2 rounded-xl border border-yellow-500/20">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-yellow-400 font-semibold">{course.rating}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-blue-500/10 px-3 py-2 rounded-xl border border-blue-500/20">
                      <Users className="w-4 h-4 text-blue-400" />
                      <span className="text-blue-400 font-semibold">{course.students.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center space-x-1 bg-green-500/10 px-3 py-2 rounded-xl border border-green-500/20">
                      <Clock className="w-4 h-4 text-green-400" />
                      <span className="text-green-400 font-semibold">{course.duration}</span>
                    </div>
                  </div>
                  
                  {/* Pricing and CTA */}
                  <div className="flex items-center justify-between gap-6">
                    <div className="flex items-center space-x-2">
                      <span className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        ${course.price}
                      </span>
                      <span className="text-xs text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                    
                    <button 
                      onClick={() => {
                        console.log('View Details clicked', course);
                        setSelectedCourse(course);
                        setIsModalOpen(true);
                      }}
                      className="premium-cta-button bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-xl transition-all duration-300 font-semibold text-sm flex items-center space-x-1 hover:shadow-lg hover:shadow-purple-500/30 hover:scale-105 border border-white/20 relative overflow-hidden group"
                    >
                      {/* Button shimmer effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <span className="relative z-10">View</span>
                      <ArrowRight className="w-3 h-3 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && selectedCourse && (
          <CourseModal
            isOpen={isModalOpen}
            course={selectedCourse}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedCourse(null);
            }}
            addToCart={addToCart}
          />
        )}
      </div>

      <style>{`
        /* Premium Course Card Animations */
        .premium-course-card {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Shimmer Animation for Cards */
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        /* Premium CTA Button Effects */
        .premium-cta-button {
          position: relative;
          overflow: hidden;
        }

        .premium-cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.6s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .premium-cta-button:hover::before {
          left: 100%;
        }

        /* Text Clamp Utility */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Course Card Hover Glow */
        .premium-course-card::before {
          content: '';
          position: absolute;
          inset: -2px;
          background: linear-gradient(45deg, #991bb3, #b91c7c, #7c3aed, #8b5cf6);
          border-radius: 1.5rem;
          opacity: 0;
          z-index: -1;
          transition: opacity 0.5s ease;
        }

        .premium-course-card:hover::before {
          opacity: 0.3;
          animation: rotate 2s linear infinite;
        }

        @keyframes rotate {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        /* Enhanced Badge Animations */
        .premium-course-card .animate-pulse {
          animation: pulse-premium 2s ease-in-out infinite;
        }

        @keyframes pulse-premium {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.8;
            transform: scale(1.05);
          }
        }

        /* Staggered Animation Delays */
        .premium-course-card:nth-child(1) { animation-delay: 0s; }
        .premium-course-card:nth-child(2) { animation-delay: 0.1s; }
        .premium-course-card:nth-child(3) { animation-delay: 0.2s; }
        .premium-course-card:nth-child(4) { animation-delay: 0.3s; }
        .premium-course-card:nth-child(5) { animation-delay: 0.4s; }
        .premium-course-card:nth-child(6) { animation-delay: 0.5s; }

        /* Responsive Adjustments */
        @media (max-width: 768px) {
          .premium-course-card {
            margin: 0 1rem;
          }
        }

        /* Accessibility */
        @media (prefers-reduced-motion: reduce) {
          .premium-course-card,
          .animate-shimmer,
          .premium-cta-button,
          .animate-pulse {
            animation: none;
          }
          
          .premium-course-card:hover::before {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}