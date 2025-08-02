import { useState, useEffect } from 'react';
import { Star, TrendingUp, Users, Award, Filter, ThumbsUp, Calendar } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  avatar: string;
  rating: number;
  content: string;
  course: string;
  date: string;
  helpful: number;
}

interface RatingBreakdown {
  rating: number;
  count: number;
  percentage: number;
}

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState('All');
  const [animateRatings, setAnimateRatings] = useState(false);
  
  const reviews: Review[] = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Full Stack Developer",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "This platform transformed my career completely. The instructors are world-class and the content is incredibly practical. I was able to land my dream job just 3 months after completing the course!",
      course: "Complete Web Development",
      date: "2 weeks ago",
      helpful: 24
    },
    {
      id: 2,
      name: "Maria Garcia",
      role: "Digital Marketing Manager",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "Amazing experience! The practical skills I learned were immediately applicable to my work. The ROI on this investment was incredible - I got a promotion within 2 months!",
      course: "Digital Marketing Mastery",
      date: "1 month ago",
      helpful: 18
    },
    {
      id: 3,
      name: "David Kim",
      role: "Data Scientist",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "Exceptional quality content and fantastic support. The community aspect really made the learning journey enjoyable and collaborative.",
      course: "Data Science with Python",
      date: "3 weeks ago",
      helpful: 32
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "UX Designer",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "The course structure and progression were perfect. I loved how each module built upon the previous one, creating a comprehensive learning experience.",
      course: "UI/UX Design Fundamentals",
      date: "1 week ago",
      helpful: 15
    },
    {
      id: 5,
      name: "Michael Chen",
      role: "Software Engineer",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 4,
      content: "Great content overall, very comprehensive. The projects were challenging and really helped solidify the concepts. Would definitely recommend!",
      course: "Advanced React & Node.js",
      date: "2 months ago",
      helpful: 21
    },
    {
      id: 6,
      name: "Emily Rodriguez",
      role: "Business Analyst",
      avatar: "https://images.pexels.com/photos/1844012/pexels-photo-1844012.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "Outstanding learning platform! The instructors are experts in their field and the content is always up-to-date with industry standards.",
      course: "Business Strategy & Leadership",
      date: "1 month ago",
      helpful: 28
    }
  ];

  // Calculate rating breakdown
  const ratingBreakdown: RatingBreakdown[] = [5, 4, 3, 2, 1].map(rating => {
    const count = reviews.filter(review => review.rating === rating).length;
    const percentage = (count / reviews.length) * 100;
    return { rating, count, percentage };
  });

  const ratings = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

  const filteredReviews = reviews.filter(review => {
    if (selectedRating === 'All') return true;
    const ratingNumber = parseInt(selectedRating.split(' ')[0]);
    return review.rating === ratingNumber;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateRatings(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Premium Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20"></div>
        <div className="absolute top-0 left-0 w-full h-full opacity-15">
          <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-purple-600/8 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/8 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
      </div>

      <div className="relative z-10 py-12 sm:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
              <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
              <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
              <div className="w-12 sm:w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
              <div className="w-3 sm:w-4 h-3 sm:h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Student Reviews
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed px-4">
              Discover what our <span className="text-purple-300 font-semibold">50,000+ students</span> have to say about their learning journey with us.
            </p>
          </div>

          {/* Premium Rating Overview */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Overall Rating Card */}
            <div className="lg:col-span-1">
              <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
                   style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6))' }}>
                
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10"></div>
                <div className="absolute top-4 right-4 w-16 sm:w-20 h-16 sm:h-20 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-xl animate-pulse"></div>
                
                <div className="relative z-10 text-center">
                  <div className="mb-4 sm:mb-6">
                    <div className="text-5xl sm:text-6xl md:text-7xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-300 bg-clip-text text-transparent">
                      {averageRating.toFixed(1)}
                    </div>
                    
                    <div className="flex justify-center gap-1 sm:gap-2 mb-3 sm:mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-6 h-6 sm:w-8 sm:h-8 transition-all duration-300 ${
                          i < Math.floor(averageRating) 
                            ? 'text-yellow-400 fill-current scale-110' 
                            : 'text-gray-600'
                        }`} />
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-center gap-2 text-gray-300">
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                      <span className="text-base sm:text-lg font-semibold">Based on {totalReviews.toLocaleString()} reviews</span>
                    </div>
                  </div>
                  
                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3 sm:gap-4 pt-4 sm:pt-6 border-t border-gray-700/50">
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-purple-400 mb-1">98%</div>
                      <div className="text-xs sm:text-sm text-gray-400">Recommend</div>
                    </div>
                    <div className="text-center">
                      <div className="text-xl sm:text-2xl font-bold text-pink-400 mb-1">4.9</div>
                      <div className="text-xs sm:text-sm text-gray-400">Avg Rating</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Rating Breakdown */}
            <div className="lg:col-span-2">
              <div className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-500 overflow-hidden"
                   style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6))' }}>
                
                {/* Background Effects */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center gap-2 sm:gap-3 mb-6 sm:mb-8">
                    <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    <h3 className="text-lg sm:text-2xl font-bold text-white">Rating Distribution</h3>
                  </div>
                  
                  <div className="space-y-3 sm:space-y-4">
                    {ratingBreakdown.map((item, index) => (
                      <div key={item.rating} className="group">
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="flex items-center gap-1 sm:gap-2 min-w-[60px] sm:min-w-[80px]">
                            <span className="text-sm sm:text-base text-gray-300 font-semibold">{item.rating}</span>
                            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400 fill-current" />
                          </div>
                          
                          <div className="flex-1 relative">
                            <div className="h-3 sm:h-4 bg-gray-800 rounded-full overflow-hidden border border-gray-700/50">
                              <div 
                                className={`h-full rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${
                                  item.rating === 5 ? 'from-green-400 to-emerald-500' :
                                  item.rating === 4 ? 'from-blue-400 to-cyan-500' :
                                  item.rating === 3 ? 'from-yellow-400 to-orange-500' :
                                  item.rating === 2 ? 'from-orange-400 to-red-500' :
                                  'from-red-400 to-red-600'
                                } group-hover:shadow-lg group-hover:shadow-purple-500/20`}
                                style={{ 
                                  width: animateRatings ? `${item.percentage}%` : '0%',
                                  transitionDelay: `${index * 200}ms`
                                }}
                              >
                                <div className="h-full bg-gradient-to-r from-white/20 to-transparent"></div>
                              </div>
                            </div>
                            
                            {/* Percentage Label */}
                            <div className={`absolute right-0 top-1/2 transform -translate-y-1/2 transition-all duration-1000 ${
                              animateRatings ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                            }`} style={{ transitionDelay: `${index * 200 + 500}ms` }}>
                              <div className="bg-gray-900/90 px-2 sm:px-3 py-1 rounded-full border border-gray-600/50">
                                <span className="text-xs sm:text-sm font-semibold text-white">{item.percentage.toFixed(1)}%</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="min-w-[45px] sm:min-w-[60px] text-right">
                            <span className="text-gray-400 text-xs sm:text-sm font-medium">({item.count})</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Filter Section */}
          <div className="mb-8 sm:mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <h3 className="text-lg sm:text-xl font-semibold text-white">Filter by Rating</h3>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`relative px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all duration-300 group overflow-hidden ${
                    selectedRating === rating
                      ? 'text-white bg-gradient-to-r from-purple-600/50 to-pink-600/50 border-2 border-purple-500/70'
                      : 'text-gray-300 bg-gray-800/50 border border-gray-600/50 hover:border-purple-500/50 hover:bg-purple-600/20'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    selectedRating === rating ? 'opacity-100' : ''
                  }`}></div>
                  <span className="relative z-10">{rating}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Reviews Grid */}
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0">
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {selectedRating === 'All' ? 'All Reviews' : `${selectedRating} Reviews`} 
                <span className="text-purple-400 ml-2">({filteredReviews.length})</span>
              </h3>
              
              <div className="flex items-center gap-2 text-gray-400">
                <Award className="w-4 h-4 sm:w-5 sm:h-5 text-purple-400" />
                <span className="text-xs sm:text-sm">Verified Reviews Only</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {filteredReviews.map((review, index) => (
                <div 
                  key={review.id} 
                  className="group relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-700 hover:transform hover:scale-[1.02] overflow-hidden"
                  style={{ 
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(31,41,55,0.4))',
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* Background Effects */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute top-4 right-4 w-12 sm:w-16 h-12 sm:h-16 bg-gradient-to-br from-purple-400/10 to-pink-400/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    {/* Header */}
                    <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="relative">
                        <img 
                          src={review.avatar} 
                          alt={review.name}
                          className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl object-cover border-2 border-purple-500/30 group-hover:border-purple-400/50 transition-colors duration-300"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 sm:w-6 sm:h-6 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center border-2 border-gray-900">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white rounded-full"></div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-lg sm:text-xl font-bold text-white group-hover:text-purple-200 transition-colors duration-300">
                          {review.name}
                        </h4>
                        <p className="text-purple-400 font-medium mb-2 text-sm sm:text-base">{review.role}</p>
                        
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="flex gap-0.5 sm:gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300 ${
                                i < review.rating 
                                  ? 'text-yellow-400 fill-current group-hover:scale-110' 
                                  : 'text-gray-600'
                              }`} />
                            ))}
                          </div>
                          <span className="text-xs sm:text-sm text-gray-400 font-medium">
                            {review.rating}.0
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <blockquote className="text-gray-300 leading-relaxed mb-4 sm:mb-6 group-hover:text-gray-200 transition-colors duration-300 text-base sm:text-lg">
                      "{review.content}"
                    </blockquote>
                    
                    {/* Footer */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-0 pt-4 sm:pt-6 border-t border-gray-700/50">
                      <div className="text-xs sm:text-sm text-gray-400">
                        <p className="font-semibold text-purple-300 mb-1 text-sm sm:text-base">Course: {review.course}</p>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
                          <div className="flex items-center gap-1">
                            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                            <span>{review.date}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <ThumbsUp className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" />
                            <span>{review.helpful} helpful</span>
                          </div>
                        </div>
                      </div>
                      
                      <button className="px-3 sm:px-4 py-2 rounded-xl bg-gray-800/50 border border-gray-600/50 text-gray-300 hover:border-purple-500/50 hover:text-purple-300 transition-all duration-300 group-hover:scale-105 text-xs sm:text-sm">
                        Helpful
                      </button>
                    </div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-45"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Premium Styles */}
      <style>{`
        /* Enhanced Animations */
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

        .review-card {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        /* Rating Bar Animations */
        .rating-bar {
          transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .rating-bar:hover {
          transform: scaleY(1.1);
        }

        /* Smooth Transitions */
        .review-item {
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .review-item:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 50px -15px rgba(153, 27, 179, 0.4);
        }

        /* Performance optimization */
        @media (max-width: 768px) {
          .backdrop-blur-xl {
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
          }
        }
      `}</style>
    </div>
  );
}
