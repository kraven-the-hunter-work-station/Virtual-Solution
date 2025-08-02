import { useState } from 'react';
import { Star, ThumbsUp, Filter } from 'lucide-react';

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

export default function ReviewsPage() {
  const [selectedRating, setSelectedRating] = useState('All');
  
  const reviews: Review[] = [
    {
      id: 1,
      name: "Alex Thompson",
      role: "Full Stack Developer",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "This platform transformed my career completely. The courses are incredibly detailed and the instructors are world-class.",
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
      content: "I gained practical skills that I could immediately apply to my work. The return on investment was incredible.",
      course: "Digital Marketing Mastery",
      date: "1 month ago",
      helpful: 18
    },
    {
      id: 3,
      name: "David Kim",
      role: "Startup Founder",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "The quality of education here rivals traditional universities, but at a fraction of the cost and time.",
      course: "Advanced React & Node.js",
      date: "3 weeks ago",
      helpful: 31
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "UX Designer",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 4,
      content: "Great course content and excellent support from the community. Only wish there were more advanced courses available.",
      course: "UI/UX Design Fundamentals",
      date: "1 week ago",
      helpful: 12
    }
  ];

  const ratings = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

  const filteredReviews = reviews.filter(review => {
    if (selectedRating === 'All') return true;
    const ratingNumber = parseInt(selectedRating.split(' ')[0]);
    return review.rating === ratingNumber;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Student Reviews</h1>
        <p className="text-center text-gray-300 mb-12">See what our students are saying</p>
        
        {/* Rating display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold mb-4">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-6 h-6 ${
                i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
              }`} />
            ))}
          </div>
          <p>Based on {totalReviews} reviews</p>
        </div>

        {/* Filter */}
        <div className="flex justify-center gap-4 mb-8">
          {ratings.map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`px-4 py-2 rounded ${
                selectedRating === rating 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>

        {/* Reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <p className="text-purple-400">{review.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                  }`} />
                ))}
              </div>
              
              <blockquote className="text-gray-300 mb-4">"{review.content}"</blockquote>
              
              <div className="text-sm text-gray-400">
                <p>Course: {review.course}</p>
                <p>{review.date} • {review.helpful} helpful</p>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">No Reviews Found</h3>
            <button 
              onClick={() => setSelectedRating('All')}
              className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Show All Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
{ return (
      role: "Full Stack Developer",
      avatar: "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "This platform transformed my career completely. The courses are incredibly detailed and the instructors are world-class. I went from knowing nothing about web development to landing my dream job in just 6 months. The hands-on projects and real-world applications made all the difference.",
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
      content: "I gained practical skills that I could immediately apply to my work. The return on investment was incredible. My salary increased by 40% after completing the digital marketing course. The instructors are industry experts who share real-world insights.",
      course: "Digital Marketing Mastery",
      date: "1 month ago",
      helpful: 18
    },
    {
      id: 3,
      name: "David Kim",
      role: "Startup Founder",
      avatar: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "The quality of education here rivals traditional universities, but at a fraction of the cost and time. I was able to learn everything I needed to build my startup while working full-time. The flexibility and quality are unmatched.",
      course: "Advanced React & Node.js",
      date: "3 weeks ago",
      helpful: 31
    },
    {
      id: 4,
      name: "Sarah Johnson",
      role: "UX Designer",
      avatar: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 4,
      content: "Great course content and excellent support from the community. The projects were challenging but rewarding. The design thinking approach and practical exercises really helped me develop my skills. Only wish there were more advanced design courses available.",
      course: "UI/UX Design Fundamentals",
      date: "1 week ago",
      helpful: 12
    },
    {
      id: 5,
      name: "Michael Chen",
      role: "Data Scientist",
      avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "The data science track is phenomenal. Real-world projects, industry-standard tools, and mentorship that actually helps. I transitioned from finance to tech thanks to these courses. The career support and networking opportunities are exceptional.",
      course: "Data Science",
      date: "2 months ago",
      helpful: 45
    },
    {
      id: 6,
      name: "Emily Rodriguez",
      role: "Product Manager",
      avatar: "https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "Exceptional learning experience. The instructors are not just teachers but industry experts who share real insights. The networking opportunities alone are worth the investment. This platform has truly elevated my career to the next level.",
      course: "Product Management Essentials",
      date: "5 days ago",
      helpful: 8
    },
    {
      id: 7,
      name: "Robert Wilson",
      role: "Software Engineer",
      avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "The technical depth and practical applications exceeded my expectations. Every concept is explained clearly with real-world examples. The community support and mentorship program are outstanding. I've recommended this to all my colleagues.",
      course: "Advanced JavaScript & APIs",
      date: "1 week ago",
      helpful: 19
    },
    {
      id: 8,
      name: "Lisa Park",
      role: "Creative Director",
      avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop",
      rating: 5,
      content: "The creative courses here are top-notch. As someone with 10+ years in the industry, I was impressed by the quality and relevance of the content. The portfolio projects helped me land my dream job at a leading agency.",
      course: "Creative Design Masterclass",
      date: "3 days ago",
      helpful: 14
    }
  ];

  const ratings = ['All', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];

  const filteredReviews = reviews.filter(review => {
    if (selectedRating === 'All') return true;
    const ratingNumber = parseInt(selectedRating.split(' ')[0]);
    return review.rating === ratingNumber;
  });

  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  const totalReviews = reviews.length;

  // Simple fallback for debugging
  if (typeof window !== 'undefined' && window.location.search.includes('simple')) {
    return (
      <div style={{ padding: '20px', backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>
        <h1>Reviews Page - Simple Mode</h1>
        <p>Total Reviews: {totalReviews}</p>
        <p>Average Rating: {averageRating.toFixed(1)}</p>
        {reviews.map(review => (
          <div key={review.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px' }}>
            <h3>{review.name}</h3>
            <p>Rating: {review.rating}/5</p>
            <p>{review.content}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8">Student Reviews</h1>
        <p className="text-center text-gray-300 mb-12">See what our students are saying</p>
        
        {/* Simple rating display */}
        <div className="text-center mb-8">
          <div className="text-6xl font-bold mb-4">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className={`w-6 h-6 ${
                i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-600'
              }`} />
            ))}
          </div>
          <p>Based on {totalReviews} reviews</p>
        </div>

        {/* Simple filter */}
        <div className="flex justify-center gap-4 mb-8">
          {ratings.map((rating) => (
            <button
              key={rating}
              onClick={() => setSelectedRating(rating)}
              className={`px-4 py-2 rounded ${
                selectedRating === rating 
                  ? 'bg-purple-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {rating}
            </button>
          ))}
        </div>

        {/* Simple reviews grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredReviews.map((review) => (
            <div key={review.id} className="bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <img 
                  src={review.avatar} 
                  alt={review.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-bold">{review.name}</h3>
                  <p className="text-purple-400">{review.role}</p>
                </div>
              </div>
              
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${
                    i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                  }`} />
                ))}
              </div>
              
              <blockquote className="text-gray-300 mb-4">"{review.content}"</blockquote>
              
              <div className="text-sm text-gray-400">
                <p>Course: {review.course}</p>
                <p>{review.date} • {review.helpful} helpful</p>
              </div>
            </div>
          ))}
        </div>

        {filteredReviews.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-2xl font-bold mb-4">No Reviews Found</h3>
            <button 
              onClick={() => setSelectedRating('All')}
              className="px-6 py-3 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Show All Reviews
            </button>
          </div>
        )}
      </div>
    </div>
  );
      {/* Premium Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20"></div>
        
        {/* Floating Background Elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/8 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-pink-600/8 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        <div className="absolute top-3/4 left-1/3 w-72 h-72 bg-gradient-to-r from-purple-600/6 to-pink-600/6 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '8s' }}></div>
        
        {/* Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Ccircle cx='30' cy='30' r='1.5'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }}></div>
      </div>

      <div className="relative z-10 pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Premium Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-purple-400 to-pink-400 animate-pulse"></div>
              <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
              <div className="w-4 h-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-400 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
            </div>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8">
              <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Student Reviews
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
              Discover why <span className="text-purple-300 font-semibold">50,000+ students</span> trust Virtual Solutions 
              to transform their careers and achieve their dreams.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-12">
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-sm border border-gray-700/30" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(31,41,55,0.3))' }}>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-semibold">95% Success Rate</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-sm border border-gray-700/30" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(31,41,55,0.3))' }}>
                <Award className="w-5 h-5 text-yellow-400" />
                <span className="text-yellow-400 font-semibold">Award Winning</span>
              </div>
              <div className="flex items-center gap-3 px-6 py-3 rounded-2xl backdrop-blur-sm border border-gray-700/30" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(31,41,55,0.3))' }}>
                <Shield className="w-5 h-5 text-blue-400" />
                <span className="text-blue-400 font-semibold">Verified Reviews</span>
              </div>
            </div>
          </div>

          {/* Premium Rating Summary */}
          <div className="mb-16 relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-12 rounded-3xl backdrop-blur-xl border border-gray-600/30 group-hover:border-purple-500/50 transition-all duration-500"
                 style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
              
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
                
                {/* Overall Rating */}
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center gap-3 mb-4">
                    <Sparkles className="w-6 h-6 text-purple-400" />
                    <span className="text-purple-300 font-semibold text-lg">Overall Rating</span>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="text-7xl font-bold text-white mb-2">
                      {averageRating.toFixed(1)}
                    </div>
                    
                    <div className="flex justify-center gap-2 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-8 h-8 transition-colors duration-300 ${
                          i < Math.floor(averageRating) 
                            ? 'text-yellow-400 fill-current' 
                            : 'text-gray-600'
                        }`} />
                      ))}
                    </div>
                    
                    <div className="text-gray-300 text-lg font-medium">
                      Based on <span className="text-purple-300">{totalReviews} verified reviews</span>
                    </div>
                  </div>
                </div>
                
                {/* Rating Breakdown */}
                <div className="space-y-4">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2">Rating Breakdown</h3>
                    <p className="text-gray-400">See how our students rate us</p>
                  </div>
                  
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const count = reviews.filter(r => r.rating === rating).length;
                    const percentage = (count / totalReviews) * 100;
                    
                    return (
                      <div key={rating} className="flex items-center gap-4">
                        <div className="flex items-center gap-1 w-16">
                          <span className="text-white font-medium">{rating}</span>
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        </div>
                        
                        <div className="flex-1 bg-gray-700/50 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                          <div 
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                        
                        <div className="text-gray-300 font-medium w-12 text-right">
                          {count}
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { icon: TrendingUp, label: 'Career Growth', value: '85%', gradient: 'from-green-400 to-emerald-400' },
                    { icon: Users, label: 'Active Students', value: '50K+', gradient: 'from-blue-400 to-cyan-400' },
                    { icon: CheckCircle, label: 'Completion Rate', value: '92%', gradient: 'from-purple-400 to-pink-400' },
                    { icon: Award, label: 'Success Stories', value: '1K+', gradient: 'from-yellow-400 to-orange-400' }
                  ].map((stat, index) => (
                    <div key={index} className="text-center p-6 rounded-2xl backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/40 transition-all duration-300 hover:scale-105"
                         style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(31,41,55,0.3))' }}>
                      <stat.icon className={`w-8 h-8 mx-auto mb-3 bg-gradient-to-r ${stat.gradient} text-transparent bg-clip-text`} />
                      <div className={`text-2xl font-bold mb-1 bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                        {stat.value}
                      </div>
                      <div className="text-gray-400 text-sm font-medium">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* CTA Button */}
              <div className="text-center mt-12">
                <button className="group relative px-12 py-5 rounded-3xl font-bold text-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl overflow-hidden text-white"
                        style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}>
                  {/* Button Glow */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 -top-4 -left-4 w-6 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 opacity-0 group-hover:animate-shimmer"></div>
                  
                  <span className="relative z-10 flex items-center gap-3">
                    <span>Write Your Review</span>
                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors duration-300">
                      ✍️
                    </div>
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Premium Filter */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <Filter className="w-6 h-6 text-purple-400" />
                <span className="text-xl font-bold text-white">Filter Reviews</span>
              </div>
              <p className="text-gray-400">Find reviews that matter to you</p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              {ratings.map((rating) => (
                <button
                  key={rating}
                  onClick={() => setSelectedRating(rating)}
                  className={`group relative px-8 py-4 rounded-2xl font-semibold transition-all duration-300 hover:scale-105 overflow-hidden ${
                    selectedRating === rating
                      ? 'text-white shadow-lg shadow-purple-500/25' 
                      : 'text-gray-400 hover:text-white border border-gray-600/50 hover:border-purple-500/50 backdrop-blur-sm'
                  }`}
                  style={selectedRating === rating ? { 
                    background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed)' 
                  } : { 
                    background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(31,41,55,0.3))' 
                  }}
                >
                  {selectedRating === rating && (
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-30 blur-xl"></div>
                  )}
                  <span className="relative z-10">{rating}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Premium Reviews Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredReviews.map((review) => (
              <div 
                key={review.id}
                className="group relative p-8 rounded-3xl backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 overflow-hidden"
                style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}
              >
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center opacity-50 group-hover:opacity-100 transition-opacity duration-300">
                  <Quote className="w-6 h-6 text-purple-400" />
                </div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center mb-6">
                    <div className="relative">
                      <img 
                        src={review.avatar} 
                        alt={review.name}
                        className="w-16 h-16 rounded-2xl object-cover border-2 border-gray-700/50 group-hover:border-purple-500/50 transition-colors duration-300"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-400 rounded-full border-2 border-black flex items-center justify-center">
                        <CheckCircle className="w-3 h-3 text-black" />
                      </div>
                    </div>
                    
                    <div className="ml-4 flex-1">
                      <div className="font-bold text-xl text-white group-hover:text-purple-200 transition-colors duration-300">
                        {review.name}
                      </div>
                      <div className="text-purple-300 font-medium">{review.role}</div>
                      <div className="text-gray-500 text-sm">{review.date}</div>
                    </div>
                  </div>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-6 h-6 transition-colors duration-300 ${
                          i < review.rating 
                            ? 'text-yellow-400 fill-current group-hover:scale-110' 
                            : 'text-gray-600'
                        }`} />
                      ))}
                    </div>
                    <div className="px-3 py-1 rounded-full bg-yellow-400/20 border border-yellow-400/30">
                      <span className="text-yellow-400 font-bold text-sm">{review.rating}/5</span>
                    </div>
                  </div>
                  
                  {/* Review Content */}
                  <blockquote className="text-gray-300 text-lg leading-relaxed mb-6 group-hover:text-gray-200 transition-colors duration-300">
                    "{review.content}"
                  </blockquote>
                  
                  {/* Footer */}
                  <div className="flex items-center justify-between pt-6 border-t border-gray-700/50 group-hover:border-purple-500/30 transition-colors duration-300">
                    <div className="flex-1">
                      <div className="text-gray-400 text-sm mb-1">Course:</div>
                      <div className="text-purple-300 font-semibold">{review.course}</div>
                    </div>
                    
                    <div className="flex items-center gap-3 px-4 py-2 rounded-xl backdrop-blur-sm border border-gray-700/50" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(31,41,55,0.3))' }}>
                      <ThumbsUp className="w-4 h-4 text-gray-400 group-hover:text-purple-400 transition-colors duration-300" />
                      <span className="text-gray-400 font-medium group-hover:text-purple-400 transition-colors duration-300">
                        {review.helpful} helpful
                      </span>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-4 right-4 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
              </div>
            ))}
          </div>

          {/* No Results State */}
          {filteredReviews.length === 0 && (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                <Filter className="w-12 h-12 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">No Reviews Found</h3>
              <p className="text-xl text-gray-400 mb-8">No reviews match your selected rating filter.</p>
              <button 
                onClick={() => setSelectedRating('All')}
                className="px-8 py-4 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105"
                style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed)' }}
              >
                Show All Reviews
              </button>
            </div>
          )}
        </div>
      </div>
      
  );
}