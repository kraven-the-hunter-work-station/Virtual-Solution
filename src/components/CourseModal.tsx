import { useEffect } from 'react';
import { X, Star, Users, Clock, BookOpen, Trophy, Check } from 'lucide-react';

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

interface CourseModalProps {
  isOpen: boolean;
  course: Course;
  onClose: () => void;
  addToCart: (courseId: number) => void;
}

const CourseModal = ({ course, isOpen, onClose, addToCart }: CourseModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center animate-fadeIn">
      {/* Premium Backdrop */}
      <div className="fixed inset-0 bg-black/80 backdrop-blur-xl transition-all duration-300" onClick={onClose}></div>
      
      {/* Premium Modal */}
      <div className="relative w-full max-w-5xl bg-gradient-to-br from-black/95 via-gray-900/95 to-black/95 rounded-3xl shadow-2xl mx-4 max-h-[90vh] overflow-hidden border border-gray-700/30 backdrop-blur-2xl animate-scale-in">
        {/* Premium Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-20 p-3 hover:bg-white/10 rounded-full transition-all duration-300 group border border-gray-600/30 backdrop-blur-sm"
        >
          <X className="w-6 h-6 text-gray-400 group-hover:text-white transition-colors" />
        </button>
        
        {/* Premium Modal Content */}
        <div className="relative overflow-y-auto max-h-[90vh] premium-scrollbar">
          {/* Enhanced Hero Section */}
          <div className="relative">
            <img
              src={course.image}
              alt={course.title}
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
            
            {/* Floating Content */}
            <div className="absolute bottom-8 left-8 right-8">
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                  {course.level}
                </span>
                <span className="text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg" style={{ background: 'linear-gradient(135deg, #991bb3, #b91c7c, #7c3aed)' }}>
                  {Math.round(((course.originalPrice - course.price) / course.originalPrice) * 100)}% OFF
                </span>
                <span className="bg-black/60 backdrop-blur-sm text-purple-300 px-4 py-2 rounded-full text-sm font-medium border border-purple-500/30">
                  {course.category}
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{course.title}</h1>
              <p className="text-xl text-gray-200 leading-relaxed max-w-3xl">
                Master the essential concepts and practical applications in this comprehensive, industry-focused course designed by experts.
              </p>
            </div>
          </div>

          {/* Enhanced Content Section */}
          <div className="p-8">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Main Content */}
              <div className="lg:w-2/3">
                {/* Course Stats */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 text-center">
                    <Star className="w-6 h-6 text-yellow-400 mx-auto mb-2 fill-current" />
                    <div className="text-lg font-bold text-white">{course.rating}</div>
                    <div className="text-sm text-purple-200">Rating</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 text-center">
                    <Users className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{course.students.toLocaleString()}</div>
                    <div className="text-sm text-purple-200">Students</div>
                  </div>
                  <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-500/30 rounded-2xl p-4 text-center">
                    <Clock className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                    <div className="text-lg font-bold text-white">{course.duration}</div>
                    <div className="text-sm text-purple-200">Duration</div>
                  </div>
                </div>

                {/* Instructor Info */}
                <div className="bg-gradient-to-br from-purple-600/10 to-pink-600/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6 mb-8">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500/30 flex items-center justify-center">
                      <Users className="w-8 h-8 text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white">Instructor: {course.instructor}</h3>
                      <p className="text-purple-200">Industry Expert & Certified Professional</p>
                    </div>
                  </div>
                </div>

                {/* Learning Outcomes */}
                <div className="space-y-8">
                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <Trophy className="w-6 h-6 text-yellow-400" />
                      What you'll learn
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        'Master fundamental concepts and advanced techniques',
                        'Build real-world projects with practical applications',
                        'Understand industry best practices and standards',
                        'Develop professional-grade skills and expertise',
                        'Learn from hands-on exercises and case studies',
                        'Get certified with completion certificate'
                      ].map((item, index) => (
                        <div key={index} className="flex items-start gap-3 group">
                          <Check className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0 group-hover:text-purple-300 transition-colors" />
                          <span className="text-gray-300 group-hover:text-gray-200 transition-colors">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-purple-400" />
                      About this course
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      <p className="text-gray-300 leading-relaxed text-lg mb-4">
                        This comprehensive course is meticulously designed to provide you with hands-on experience
                        and practical knowledge in <span className="text-purple-400 font-semibold">{course.category}</span>. 
                        Whether you're a beginner starting your journey or a professional looking to advance your skills, 
                        this course offers invaluable insights and real-world applications.
                      </p>
                      <p className="text-gray-300 leading-relaxed text-lg">
                        Our expert instructors guide you through carefully crafted lessons, interactive exercises, 
                        and practical projects that mirror industry challenges. By the end of this course, you'll have 
                        the confidence and skills needed to excel in your field.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Premium Sidebar */}
              <div className="lg:w-1/3">
                <div className="sticky top-6 bg-gradient-to-br from-black/80 via-gray-900/80 to-black/80 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-8 shadow-2xl">
                  {/* Pricing */}
                  <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-4 mb-2">
                      <span className="text-4xl font-bold text-transparent bg-clip-text" 
                            style={{ backgroundImage: 'linear-gradient(135deg, #991bb3, #b91c7c)', WebkitBackgroundClip: 'text' }}>
                        ${course.price}
                      </span>
                      <span className="text-2xl text-gray-500 line-through">${course.originalPrice}</span>
                    </div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30 mb-4">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-sm font-semibold text-green-300">Limited Time Offer • 2 days left!</span>
                    </div>

                    <button 
                      onClick={() => addToCart(course.id)}
                      className="w-full text-white py-4 px-6 rounded-full font-bold text-lg transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25 hover:scale-105 mb-6 relative overflow-hidden group" 
                      style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed)' }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <span className="relative z-10">Add to Cart</span>
                    </button>

                    <p className="text-sm text-gray-400 mb-8 flex items-center justify-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      30-Day Money-Back Guarantee
                    </p>
                  </div>

                  {/* Course Features */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white mb-4">This course includes:</h3>
                    {[
                      { icon: BookOpen, text: 'Full lifetime access' },
                      { icon: Trophy, text: 'Certificate of completion' },
                      { icon: Users, text: 'Access to community' },
                      { icon: Clock, text: 'Learn at your own pace' }
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <feature.icon className="w-5 h-5 text-purple-400" />
                        </div>
                        <span className="text-gray-300 group-hover:text-gray-200 transition-colors">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseModal;