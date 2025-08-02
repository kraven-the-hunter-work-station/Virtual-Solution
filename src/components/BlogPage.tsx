import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Calendar, User, ArrowRight, Search, Filter } from 'lucide-react';

// Sample blog post data
const SAMPLE_BLOG_POSTS = [
  {
    id: 1,
    title: 'Getting Started with Virtual Solutions',
    excerpt: 'Learn how to make the most of our virtual solutions platform with this comprehensive guide.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
    author: 'John Doe',
    date: '2025-07-15',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Tutorials'
  },
  {
    id: 2,
    title: 'Advanced Virtual Reality Techniques',
    excerpt: 'Discover advanced VR techniques that can take your projects to the next level.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
    author: 'Jane Smith',
    date: '2025-07-10',
    imageUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Advanced'
  },
  {
    id: 3,
    title: 'The Future of Virtual Solutions',
    excerpt: 'Our predictions for where virtual solutions technology is heading in the next decade.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
    author: 'Robert Johnson',
    date: '2025-07-05',
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Industry News'
  },
  {
    id: 4,
    title: 'Case Study: Virtual Training for Global Teams',
    excerpt: 'How we helped a multinational company train their global teams using our virtual solutions platform.',
    content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl. Sed euismod, nunc sit amet aliquam lacinia, nisl nisl aliquam nisl, nec aliquam nisl nisl sit amet nisl.',
    author: 'Sarah Williams',
    date: '2025-06-28',
    imageUrl: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Case Studies'
  }
];

const BlogPage = () => {
  const [posts, setPosts] = useState<typeof SAMPLE_BLOG_POSTS>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  
  // Get unique categories
  const categories = ['All', ...new Set(SAMPLE_BLOG_POSTS.map(post => post.category))];
  
  useEffect(() => {
    // Simulate API call to fetch blog posts
    const fetchPosts = async () => {
      setLoading(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      setPosts(SAMPLE_BLOG_POSTS);
      setLoading(false);
    };
    
    fetchPosts();
  }, []);
  
  // Filter posts by category
  const filteredPosts = selectedCategory === 'All' 
    ? posts 
    : posts.filter(post => post.category === selectedCategory);
  
  return (
    <section className="py-20 relative overflow-hidden min-h-screen">
      {/* Premium Background */}
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Header */}
        <div className="text-center mb-24 pt-20">
          {/* Decorative Elements */}
          <div className="inline-flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
            <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
            <div className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold mb-8 relative">
            <span className="text-white">Our </span>
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Blog
            </span>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl opacity-50 rounded-full"></div>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light">
            Stay updated with the latest <span className="text-purple-300 font-semibold">insights, tutorials, and news</span> about 
            <span className="text-pink-300 font-semibold"> virtual solutions</span> technology.
          </p>
        </div>

        {/* Premium Category Filter */}
        <div className="mb-16">
          <div className="relative p-8 rounded-3xl backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-center gap-3 mb-6">
                <Filter className="w-5 h-5 text-purple-400" />
                <span className="text-lg font-semibold text-white">Filter by Category</span>
              </div>
              
              <div className="flex flex-wrap justify-center gap-3">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-6 py-3 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl shadow-purple-500/25'
                        : 'bg-gray-800/50 text-gray-300 hover:bg-purple-600/20 hover:text-white border border-gray-600/50 hover:border-purple-500/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts */}
        {loading ? (
          <div className="flex justify-center">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-purple-600/30 border-t-purple-600 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-pink-600 rounded-full animate-spin" style={{ animationDirection: 'reverse' }}></div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPosts.map((post, index) => (
              <div key={post.id} className="group relative rounded-3xl backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 overflow-hidden"
                   style={{ 
                     background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(31,41,55,0.4))',
                     animationDelay: `${index * 100}ms`
                   }}>
                
                {/* Background Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
                
                {/* Image */}
                <div className="relative overflow-hidden">
                  <img 
                    src={post.imageUrl} 
                    alt={post.title} 
                    className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full backdrop-blur-xl border border-white/20 bg-white/10">
                    <span className="text-white font-semibold text-xs uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 p-6">
                  <h2 className="text-xl font-bold text-white mb-3 group-hover:text-purple-200 transition-colors duration-300 line-clamp-2">
                    {post.title}
                  </h2>
                  
                  <p className="text-gray-400 mb-4 leading-relaxed group-hover:text-gray-300 transition-colors duration-300 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span className="group-hover:text-gray-400 transition-colors duration-300">
                        {post.author}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="group-hover:text-gray-400 transition-colors duration-300">
                        {new Date(post.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  {/* Read More Button */}
                  <Link 
                    to={`/blog/${post.id}`} 
                    className="group/btn relative inline-flex items-center gap-2 px-6 py-3 rounded-2xl font-semibold text-white transition-all duration-300 hover:scale-105 overflow-hidden"
                    style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}
                  >
                    {/* Button Glow */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover/btn:opacity-100 blur-xl transition-opacity duration-500"></div>
                    
                    <span className="relative z-10">Read More</span>
                    <ArrowRight className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100"></div>
              </div>
            ))}
          </div>
        )}

        {/* Premium Newsletter Signup */}
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
                Stay Updated
              </span>
            </h2>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Get the latest <span className="text-purple-300 font-semibold">blog posts and insights</span> delivered directly to your inbox.
            </p>
            
            <form className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-2xl bg-gray-800/50 border border-gray-600/50 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 backdrop-blur-sm"
                  required
                />
                <button
                  type="submit"
                  className="group relative px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}
                >
                  {/* Button Glow */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500"></div>
                  
                  <span className="relative z-10">Subscribe</span>
                </button>
              </div>
            </form>
            
            {/* Trust Indicators */}
            <div className="mt-8 flex flex-wrap justify-center items-center gap-6 text-white/60">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Weekly Updates</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span className="text-sm font-medium">No Spam</span>
              </div>
              <span className="hidden sm:block">•</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
                <span className="text-sm font-medium">Unsubscribe Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Premium Styles */}
      <style>{`
        /* Line clamp utilities */
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        /* Card entrance animations */
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
        
        .grid > div {
          animation: fadeInUp 0.6s ease-out forwards;
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
};

export default BlogPage;
