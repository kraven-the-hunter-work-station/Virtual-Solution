import React from 'react';
import { Linkedin, Twitter, Github, Sparkles } from 'lucide-react';

// Team member data - Updated to match your company
const TEAM_MEMBERS = [
  {
    id: 1,
    name: 'Muhammad Abdullah',
    role: 'CEO & Founder',
    bio: 'Visionary leader with extensive experience in digital marketing and business strategy.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  },
  {
    id: 2,
    name: 'Mirza Ali',
    role: 'Marketing Director',
    bio: 'Expert in digital marketing strategies and campaign optimization.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  },
  {
    id: 3,
    name: 'Tauheed',
    role: 'Technical Lead',
    bio: 'Specialized in advanced technology and platform development.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  },
  {
    id: 4,
    name: 'Ahmad',
    role: 'Senior Developer',
    bio: 'Full-stack developer with expertise in modern web technologies.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  },
  {
    id: 5,
    name: 'Zeeshan',
    role: 'Product Manager',
    bio: 'Drives product strategy and coordinates development initiatives.',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com',
      github: 'https://github.com'
    }
  }
];

const TeamSection = () => {
  return (
    <div className="relative p-12 md:p-16">
      {/* Section Header */}
      <div className="text-center mb-16">
        {/* Decorative Elements */}
        <div className="inline-flex items-center gap-3 mb-8">
          <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-purple-400"></div>
          <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400"></div>
          <Sparkles className="w-6 h-6 text-pink-400 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="w-8 h-0.5 bg-gradient-to-r from-pink-400 to-transparent"></div>
        </div>
        
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
            Our Expert Team
          </span>
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
          Meet the talented professionals who make <span className="text-purple-300 font-semibold">Virtual Solutions</span> a 
          <span className="text-pink-300 font-semibold"> leader in innovation</span>.
        </p>
      </div>
      
      {/* Team Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        {TEAM_MEMBERS.map((member, index) => (
          <div 
            key={member.id} 
            className="group relative p-8 rounded-3xl backdrop-blur-xl border border-gray-700/30 hover:border-purple-500/50 transition-all duration-700 hover:scale-105 overflow-hidden"
            style={{ 
              background: 'linear-gradient(135deg, rgba(0,0,0,0.4), rgba(31,41,55,0.4))',
              animationDelay: `${index * 100}ms`
            }}
          >
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 via-transparent to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"></div>
            
            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Circular Name Placeholder */}
              <div className="relative mb-6">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-purple-600/30 to-pink-600/30 border-2 border-purple-500/40 group-hover:border-purple-400/60 transition-all duration-300 relative overflow-hidden">
                  {/* Background glow effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                  
                  {/* Name Text */}
                  <div className="relative z-10 text-center px-2">
                    <div className="text-white font-bold text-lg leading-tight">
                      {member.name.split(' ').map((word, i) => (
                        <div key={i} className="group-hover:text-purple-200 transition-colors duration-300">
                          {word}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Rotating border */}
                  <div className="absolute inset-0 rounded-full border-2 border-gradient-to-r from-purple-400 to-pink-400 opacity-0 group-hover:opacity-50 transition-opacity duration-500 animate-spin-slow"></div>
                </div>
                
                {/* Outer glow ring */}
                <div className="absolute inset-0 w-32 h-32 mx-auto rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500 scale-150"></div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-200 transition-colors duration-300">
                {member.name}
              </h3>
              
              <p className="text-purple-300 font-semibold text-lg mb-4 group-hover:text-purple-200 transition-colors duration-300">
                {member.role}
              </p>
              
              <p className="text-gray-400 leading-relaxed mb-6 group-hover:text-gray-300 transition-colors duration-300">
                {member.bio}
              </p>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-4">
                {member.socialLinks.linkedin && (
                  <a 
                    href={member.socialLinks.linkedin} 
                    className="group/social p-3 rounded-xl bg-blue-600/20 border border-blue-500/30 hover:bg-blue-600/30 hover:border-blue-500/60 transition-all duration-300"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5 text-blue-400 group-hover/social:text-blue-300 transition-colors duration-300" />
                  </a>
                )}
                
                {member.socialLinks.twitter && (
                  <a 
                    href={member.socialLinks.twitter} 
                    className="group/social p-3 rounded-xl bg-sky-600/20 border border-sky-500/30 hover:bg-sky-600/30 hover:border-sky-500/60 transition-all duration-300"
                    aria-label="Twitter"
                  >
                    <Twitter className="w-5 h-5 text-sky-400 group-hover/social:text-sky-300 transition-colors duration-300" />
                  </a>
                )}
                
                {member.socialLinks.github && (
                  <a 
                    href={member.socialLinks.github} 
                    className="group/social p-3 rounded-xl bg-gray-600/20 border border-gray-500/30 hover:bg-gray-600/30 hover:border-gray-500/60 transition-all duration-300"
                    aria-label="GitHub"
                  >
                    <Github className="w-5 h-5 text-gray-400 group-hover/social:text-gray-300 transition-colors duration-300" />
                  </a>
                )}
              </div>
            </div>
            
            {/* Enhanced Decorative Elements */}
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 opacity-0 group-hover:opacity-100 transition-all duration-500 rotate-45">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
            </div>
            <div className="absolute bottom-4 left-4 w-6 h-6 rounded-full bg-gradient-to-br from-pink-400/20 to-purple-400/20 opacity-0 group-hover:opacity-100 transition-all duration-700 delay-100">
              <div className="absolute inset-1 rounded-full bg-gradient-to-br from-white/30 to-transparent"></div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Premium Styles */}
      <style>{`
        /* Slow spinning animation for borders */
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
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
    </div>
  );
};

export default TeamSection;
