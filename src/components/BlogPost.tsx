import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, Share2, Facebook, Twitter, Linkedin, Sparkles } from 'lucide-react';

// Sample blog post data (same as in BlogPage)
const SAMPLE_BLOG_POSTS = [
  {
    id: 1,
    title: 'Getting Started with Virtual Solutions',
    excerpt: 'Learn how to make the most of our virtual solutions platform with this comprehensive guide.',
    content: `
      <p>Welcome to Virtual Solutions! This guide will help you get started with our platform and make the most of our features.</p>
      
      <h2>Setting Up Your Account</h2>
      <p>After signing up, the first thing you'll want to do is set up your profile. This helps personalize your experience and allows you to save your preferences across sessions.</p>
      
      <h2>Exploring Our Features</h2>
      <p>Our platform offers a wide range of features designed to help you create and manage virtual experiences:</p>
      <ul>
        <li>Virtual Reality Development Tools</li>
        <li>3D Model Library</li>
        <li>Collaboration Workspaces</li>
        <li>Real-time Testing Environments</li>
      </ul>
      
      <h2>Best Practices</h2>
      <p>To get the most out of our platform, we recommend following these best practices:</p>
      <ol>
        <li>Start with small projects to familiarize yourself with the tools</li>
        <li>Use our templates for quicker development</li>
        <li>Join our community forums to learn from other users</li>
        <li>Regularly save your work and create backups</li>
      </ol>
      
      <h2>Getting Help</h2>
      <p>If you ever need assistance, our support team is available 24/7. You can also check our documentation and tutorial videos for step-by-step guidance.</p>
      
      <p>We're excited to see what you'll create with Virtual Solutions!</p>
    `,
    author: 'John Doe',
    authorRole: 'Product Manager',
    authorAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    date: '2025-07-15',
    imageUrl: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Tutorials',
    tags: ['beginner', 'guide', 'setup']
  },
  {
    id: 2,
    title: 'Advanced Virtual Reality Techniques',
    excerpt: 'Discover advanced VR techniques that can take your projects to the next level.',
    content: `
      <p>Once you've mastered the basics of our platform, it's time to explore some advanced techniques that can take your virtual reality projects to the next level.</p>
      
      <h2>Optimizing Performance</h2>
      <p>Performance is critical in VR applications. Here are some techniques to ensure smooth experiences:</p>
      <ul>
        <li>Use level of detail (LOD) for complex models</li>
        <li>Implement occlusion culling</li>
        <li>Optimize texture sizes and compression</li>
        <li>Use instancing for repeated objects</li>
      </ul>
      
      <h2>Advanced Interaction Techniques</h2>
      <p>Creating intuitive interactions is key to immersive VR experiences:</p>
      <ol>
        <li>Implement physics-based grabbing</li>
        <li>Use haptic feedback effectively</li>
        <li>Create natural locomotion systems</li>
        <li>Design accessible interfaces</li>
      </ol>
      
      <h2>Creating Realistic Environments</h2>
      <p>The quality of your environment greatly affects immersion:</p>
      <ul>
        <li>Use global illumination for realistic lighting</li>
        <li>Implement ambient occlusion</li>
        <li>Add subtle environmental animations</li>
        <li>Use spatial audio for enhanced immersion</li>
      </ul>
      
      <p>By implementing these advanced techniques, you'll be able to create more immersive, performant, and engaging VR experiences.</p>
    `,
    author: 'Jane Smith',
    authorRole: 'VR Developer',
    authorAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    date: '2025-07-10',
    imageUrl: 'https://images.unsplash.com/photo-1617802690992-15d93263d3a9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80',
    category: 'Advanced',
    tags: ['advanced', 'optimization', 'techniques']
  }
];

interface BlogPostProps {
  postId?: string;
}

const BlogPost = ({ postId }: BlogPostProps = {}) => {
  const params = useParams();
  const id = postId || params.id || '1';
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);
  
  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const postId = parseInt(id);
      const foundPost = SAMPLE_BLOG_POSTS.find(p => p.id === postId);
      
      if (foundPost) {
        setPost(foundPost);
        
        // Get related posts (same category, different post)
        const related = SAMPLE_BLOG_POSTS
          .filter(p => p.category === foundPost.category && p.id !== foundPost.id)
          .slice(0, 2);
        setRelatedPosts(related);
      }
      
      setLoading(false);
    };
    
    fetchPost();
  }, [id]);
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 flex justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <section className="py-20 relative overflow-hidden min-h-screen">
        {/* Premium Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-purple-900/20 via-transparent to-pink-900/20"></div>
        
        {/* Floating Background Elements */}
        <div className="absolute top-10 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center pt-32">
            <h1 className="text-4xl font-bold text-white mb-6">Blog post not found</h1>
            <p className="text-xl text-gray-400 mb-8">The blog post you're looking for doesn't exist or has been removed.</p>
            <Link to="/blog" className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden"
                  style={{ background: 'linear-gradient(135deg, #cc73f8, #991bb3, #7c3aed, #8b5cf6)' }}>
              <ArrowLeft className="w-5 h-5" />
              Back to Blog
            </Link>
          </div>
        </div>
      </section>
    );
  }

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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Navigation Header */}
        <div className="pt-20 mb-12">
          <div className="relative p-6 rounded-3xl backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex justify-between items-center">
              <Link to="/blog" className="inline-flex items-center gap-3 text-purple-400 hover:text-white transition-colors duration-300 group/btn">
                <div className="p-2 rounded-xl bg-purple-600/20 group-hover/btn:bg-purple-600/30 transition-colors duration-300">
                  <ArrowLeft className="w-5 h-5" />
                </div>
                <span className="font-semibold">Back to Blog</span>
              </Link>
              
              <div className="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-sm border border-purple-500/30 bg-purple-600/20">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <span className="text-sm font-semibold text-purple-300 uppercase tracking-wider">
                  {post.category}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Post Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-bold mb-8 relative">
            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent leading-tight">
              {post.title}
            </span>
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-3xl opacity-50 rounded-full"></div>
          </h1>
        </div>
        
        {/* Author and Meta Info */}
        <div className="mb-12">
          <div className="relative p-8 rounded-3xl backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img 
                  src={post.authorAvatar} 
                  alt={post.author} 
                  className="w-16 h-16 rounded-full border-2 border-purple-500/30 group-hover:border-purple-500/60 transition-colors duration-300"
                />
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{post.author}</h3>
                  <p className="text-purple-300 font-medium">{post.authorRole}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-end gap-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">
                    {new Date(post.date).toLocaleDateString('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">5 min read</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Featured Image */}
        <div className="mb-12">
          <div className="relative group">
            {/* Glow Effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/30 to-pink-600/30 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Image Container */}
            <div className="relative rounded-3xl overflow-hidden backdrop-blur-xl border border-gray-600/30 group-hover:border-purple-500/50 transition-all duration-500">
              <img 
                src={post.imageUrl} 
                alt={post.title} 
                className="w-full h-96 object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>
          </div>
        </div>
        
        {/* Post Content */}
        <div className="mb-12">
          <div className="relative p-8 md:p-12 rounded-3xl backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div 
              className="relative z-10 prose prose-lg prose-invert max-w-none"
              dangerouslySetInnerHTML={{ __html: post.content }}
              style={{
                '--tw-prose-body': 'rgb(209 213 219)',
                '--tw-prose-headings': 'rgb(255 255 255)',
                '--tw-prose-links': 'rgb(168 85 247)',
                '--tw-prose-bold': 'rgb(255 255 255)',
                '--tw-prose-counters': 'rgb(168 85 247)',
                '--tw-prose-bullets': 'rgb(168 85 247)',
                '--tw-prose-quotes': 'rgb(209 213 219)',
                '--tw-prose-quote-borders': 'rgb(168 85 247)'
              } as React.CSSProperties}
            />
          </div>
        </div>
        
        {/* Tags */}
        <div className="mb-12">
          <div className="relative p-6 rounded-3xl backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white mb-4">Tags</h3>
              <div className="flex flex-wrap gap-3">
                {post.tags.map((tag: string) => (
                  <span 
                    key={tag} 
                    className="px-4 py-2 bg-gray-800/50 border border-gray-600/50 text-gray-300 text-sm rounded-full hover:bg-purple-600/20 hover:border-purple-500/50 hover:text-white transition-all duration-300"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Share Buttons */}
        <div className="mb-12">
          <div className="relative p-8 rounded-3xl backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
               style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <Share2 className="w-5 h-5 text-purple-400" />
                <h3 className="text-xl font-bold text-white">Share this post</h3>
              </div>
              
              <div className="flex gap-4">
                <button className="group/share p-3 rounded-xl bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-500/60 transition-all duration-300">
                  <Facebook className="w-5 h-5 text-blue-400 group-hover/share:text-blue-300 transition-colors duration-300" />
                </button>
                <button className="group/share p-3 rounded-xl bg-sky-600/20 border border-sky-500/30 hover:bg-sky-600/30 hover:border-sky-500/60 transition-all duration-300">
                  <Twitter className="w-5 h-5 text-sky-400 group-hover/share:text-sky-300 transition-colors duration-300" />
                </button>
                <button className="group/share p-3 rounded-xl bg-blue-700/20 border border-blue-600/30 hover:bg-blue-700/30 hover:border-blue-600/60 transition-all duration-300">
                  <Linkedin className="w-5 h-5 text-blue-400 group-hover/share:text-blue-300 transition-colors duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="mb-12">
            <div className="relative p-8 rounded-3xl backdrop-blur-xl border border-gray-600/30 hover:border-purple-500/50 transition-all duration-500 group overflow-hidden"
                 style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.6), rgba(31,41,55,0.6), rgba(0,0,0,0.6))' }}>
              
              {/* Background Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-8 text-center">
                  <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                    Related Posts
                  </span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {relatedPosts.map(relatedPost => (
                    <div key={relatedPost.id} className="group/related relative rounded-2xl backdrop-blur-sm border border-gray-700/30 hover:border-purple-500/40 transition-all duration-500 hover:scale-105 overflow-hidden"
                         style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.3), rgba(31,41,55,0.3))' }}>
                      
                      {/* Background Glow */}
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover/related:opacity-100 transition-opacity duration-500"></div>
                      
                      <img 
                        src={relatedPost.imageUrl} 
                        alt={relatedPost.title} 
                        className="w-full h-48 object-cover group-hover/related:scale-105 transition-transform duration-500"
                      />
                      <div className="relative z-10 p-6">
                        <div className="text-xs font-semibold text-purple-400 uppercase tracking-wider mb-2">
                          {relatedPost.category}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-3 group-hover/related:text-purple-200 transition-colors duration-300">
                          {relatedPost.title}
                        </h4>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed group-hover/related:text-gray-300 transition-colors duration-300">
                          {relatedPost.excerpt}
                        </p>
                        <Link 
                          to={`/blog/${relatedPost.id}`} 
                          className="inline-flex items-center gap-2 text-purple-400 hover:text-white font-semibold transition-colors duration-300"
                        >
                          Read More
                          <ArrowLeft className="w-4 h-4 rotate-180 transition-transform duration-300 group-hover/related:translate-x-1" />
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Premium Styles */}
      <style>{`
        /* Prose styles for blog content */
        .prose h2 {
          color: rgb(255 255 255);
          font-size: 1.875rem;
          font-weight: 700;
          margin-top: 2rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, rgb(255 255 255), rgb(196 181 253), rgb(255 255 255));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .prose h3 {
          color: rgb(255 255 255);
          font-size: 1.5rem;
          font-weight: 600;
          margin-top: 1.5rem;
          margin-bottom: 0.75rem;
        }
        
        .prose p {
          margin-bottom: 1.5rem;
          line-height: 1.75;
        }
        
        .prose ul, .prose ol {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .prose li {
          margin: 0.5rem 0;
        }
        
        .prose strong {
          color: rgb(255 255 255);
          font-weight: 600;
        }
        
        .prose a {
          color: rgb(168 85 247);
          text-decoration: none;
          font-weight: 500;
        }
        
        .prose a:hover {
          color: rgb(196 181 253);
          text-decoration: underline;
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

export default BlogPost;
