import { useState } from 'react';
import { Star, Users, Clock, ArrowRight, Award } from 'lucide-react';
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

interface FeaturedCoursesProps {
  courses: Course[];
  addToCart: (courseId: number) => void;
}

export default function FeaturedCourses({ courses, addToCart }: FeaturedCoursesProps) {
  const [selectedCourse, setSelectedCourse] = useState<Course | undefined>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCourseClick = (course: Course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(undefined);
  };

  return (
    <div className="relative">
      {/* Premium Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-transparent to-pink-900/10 rounded-3xl"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-600/5 to-pink-600/5 rounded-full blur-3xl"></div>
      
      {/* Mobile Horizontal Swipe */}
      <div className="md:hidden relative z-10 px-4">
        <div className="overflow-x-auto pb-6 scrollbar-hide flex snap-x snap-mandatory space-x-5">
          {courses.map((course) => (
            <div 
              key={course.id}
              className="snap-center flex-shrink-0 w-[280px] bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 rounded-2xl shadow-2xl overflow-hidden transition-all duration-500 group border border-gray-600/30 backdrop-blur-2xl relative hover:scale-[1.02] hover:shadow-purple-500/30 hover:border-purple-500/50"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(17,24,39,0.95) 50%, rgba(0,0,0,0.95) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(107, 114, 128, 0.1)'
              }}
            >
              {/* Premium Card Content */}
              <div className="relative z-10">
                {/* Premium Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative overflow-hidden rounded-t-2xl">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-700"
                    draggable={false}
                  />
                  
                  {/* Enhanced Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Premium Level Badge */}
                  <div className="absolute top-3 left-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg backdrop-blur-sm">
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {course.level}
                    </span>
                  </div>
                  
                  {/* Enhanced Discount Badge */}
                  <div 
                    className="absolute top-3 right-3 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
                    style={{ background: 'linear-gradient(135deg, #991bb3, #b91c7c, #7c3aed)' }}
                  >
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  {/* Course Category Tag */}
                  <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm text-purple-300 px-2.5 py-1 rounded-full text-xs font-medium border border-purple-500/30">
                    {course.category}
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-5 relative">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-base font-bold text-white mb-2 transition-colors group-hover:text-purple-200 leading-tight line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-2 border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                        <Users className="w-3 h-3 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-gray-300 transition-colors duration-300 group-hover:text-purple-200 font-medium text-xs">
                          Instructor
                        </p>
                        <p className="text-white font-semibold text-xs">
                          {course.instructor}
                        </p>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center justify-between mb-4 text-xs gap-1">
                      <div className="flex items-center gap-1 bg-yellow-500/10 px-2 py-1 rounded-full border border-yellow-500/20">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="font-semibold text-yellow-300">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-blue-500/10 px-2 py-1 rounded-full border border-blue-500/20">
                        <Users className="w-3 h-3 text-blue-400" />
                        <span className="text-blue-300 font-medium">{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-full border border-green-500/20">
                        <Clock className="w-3 h-3 text-green-400" />
                        <span className="text-green-300 font-medium">{course.duration}</span>
                      </div>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold text-transparent bg-clip-text" 
                              style={{ backgroundImage: 'linear-gradient(135deg, #cc73f8, #991bb3)', WebkitBackgroundClip: 'text' }}>
                          ${course.price}
                        </span>
                        <span className="text-xs text-gray-500 line-through">
                          ${course.originalPrice}
                        </span>
                      </div>
                      
                      {/* Button */}
                      <button 
                        onClick={() => handleCourseClick(course)}
                        className="text-white px-2 py-1 text-xs rounded-full transition-all duration-300 font-semibold flex items-center gap-1 hover:scale-105 relative overflow-hidden group/btn shadow-lg hover:shadow-purple-500/25" 
                        style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed)' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10">View</span>
                        <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover/btn:translate-x-1 relative z-10" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-4 gap-1.5">
          {courses.map((_, index) => (
            <div key={index} className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 opacity-50"></div>
          ))}
        </div>
      </div>
      
      {/* Desktop Premium Course Grid - Centered */}
      <div className="hidden md:flex relative z-10 justify-center px-4 sm:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl w-full">
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-full max-w-[380px] mx-auto bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden transition-all duration-500 group border border-gray-600/30 backdrop-blur-2xl relative hover:scale-[1.02] hover:shadow-purple-500/30 hover:border-purple-500/50"
              style={{
                background: 'linear-gradient(135deg, rgba(0,0,0,0.95) 0%, rgba(17,24,39,0.95) 50%, rgba(0,0,0,0.95) 100%)',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(107, 114, 128, 0.1)'
              }}
            >
              {/* Premium Card Content */}
              <div className="relative z-10">
                {/* Premium Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-2xl sm:rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                
                <div className="relative overflow-hidden rounded-t-2xl sm:rounded-t-3xl">
                  <img 
                    src={course.image} 
                    alt={course.title}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                    draggable={false}
                  />
                  
                  {/* Enhanced Premium Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Premium Level Badge */}
                  <div className="absolute top-3 left-3 sm:top-4 sm:left-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-semibold shadow-lg backdrop-blur-sm">
                    <span className="flex items-center gap-1">
                      <Award className="w-3 h-3" />
                      {course.level}
                    </span>
                  </div>
                  
                  {/* Enhanced Discount Badge */}
                  <div 
                    className="absolute top-3 right-3 sm:top-4 sm:right-4 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-lg backdrop-blur-sm"
                    style={{ background: 'linear-gradient(135deg, #991bb3, #b91c7c, #7c3aed)' }}
                  >
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-current" />
                      {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                    </span>
                  </div>

                  {/* Course Category Tag */}
                  <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 bg-black/60 backdrop-blur-sm text-purple-300 px-2.5 py-1 sm:px-3 sm:py-1 rounded-full text-xs font-medium border border-purple-500/30">
                    {course.category}
                  </div>
                </div>

                {/* Enhanced Card Body */}
                <div className="p-6 sm:p-8 relative">
                  {/* Premium Background Pattern */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 transition-colors group-hover:text-purple-200 leading-tight line-clamp-2">
                      {course.title}
                    </h3>
                    
                    <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-5">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-purple-600/40 to-pink-600/40 border-2 border-purple-500/30 flex items-center justify-center backdrop-blur-sm">
                        <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-300" />
                      </div>
                      <div>
                        <p className="text-gray-300 transition-colors duration-300 group-hover:text-purple-200 font-medium text-xs sm:text-sm">
                          Instructor
                        </p>
                        <p className="text-white font-semibold text-sm">
                          {course.instructor}
                        </p>
                      </div>
                    </div>

                    {/* Enhanced Premium Stats */}
                    <div className="flex items-center justify-between mb-5 sm:mb-6 text-xs sm:text-sm gap-2">
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-yellow-500/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-yellow-500/20">
                        <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                        <span className="font-semibold text-yellow-300">{course.rating}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-blue-500/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-blue-500/20">
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 text-blue-400" />
                        <span className="text-blue-300 font-medium">{course.students.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 bg-green-500/10 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-green-500/20">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                        <span className="text-green-300 font-medium">{course.duration}</span>
                      </div>
                    </div>

                    {/* Enhanced Premium Pricing */}
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <span className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text" 
                              style={{ backgroundImage: 'linear-gradient(135deg, #cc73f8, #991bb3)', WebkitBackgroundClip: 'text' }}>
                          ${course.price}
                        </span>
                        <span className="text-sm sm:text-base text-gray-500 line-through">
                          ${course.originalPrice}
                        </span>
                      </div>
                      
                      {/* Premium Button */}
                      <button 
                        onClick={() => handleCourseClick(course)}
                        className="text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm rounded-full transition-all duration-300 font-semibold flex items-center gap-1.5 sm:gap-2 hover:scale-105 relative overflow-hidden group/btn shadow-lg hover:shadow-purple-500/25" 
                        style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed)' }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                        <span className="relative z-10">View Details</span>
                        <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-200 group-hover/btn:translate-x-1 relative z-10" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Course Modal */}
      {selectedCourse && isModalOpen && (
        <CourseModal 
          course={selectedCourse}
          isOpen={true}
          onClose={handleCloseModal}
          addToCart={addToCart}
        />
      )}
    </div>
  );
}
