import React, { useState } from "react";
import { CheckCircle, AlertCircle, Send, Star, Sparkles, Shield, Clock } from "lucide-react";
import { submitContactForm } from "../services/api";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      const response = await submitContactForm(formData);
      
      if (response.success) {
        setIsSubmitted(true);
        // Reset form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          message: ''
        });
      } else {
        setSubmitError(response.message || 'An error occurred while sending your message. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setSubmitError('An error occurred while sending your message. Please try again or contact us directly at contact@virtualsolutionspath.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 py-12 px-4">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      
      <div className="relative max-w-4xl mx-auto">
        {/* Premium Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 px-6 py-2 rounded-full mb-6 backdrop-blur-sm border border-purple-500/30">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-purple-300 font-medium">Premium Contact Experience</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-6">
            Let's Connect
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Transform your vision into reality with our premium digital solutions. Start your journey with us today.
          </p>
        </div>

        {/* Main Form Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-purple-500/20 to-transparent rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-blue-500/20 to-transparent rounded-full blur-2xl"></div>
          {/* Premium Success Message */}
          {isSubmitted && (
            <div className="relative mb-8 p-6 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-2xl border border-green-500/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-2xl"></div>
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <CheckCircle className="text-white" size={24} />
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-bold text-white text-lg">Message Sent Successfully!</h4>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-300 leading-relaxed">
                    Thank you for reaching out! Your message has been processed. Please check if your email client opened with a pre-filled message to contact@virtualsolutionspath.com. If not, you can copy the message from the browser console and send it manually.
                  </p>
                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>Secure & Encrypted</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-blue-400" />
                      <span>2-Hour Response</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Premium Error Message */}
          {submitError && (
            <div className="relative mb-8 p-6 bg-gradient-to-r from-red-500/10 to-rose-500/10 rounded-2xl border border-red-500/20 backdrop-blur-sm">
              <div className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-rose-500/5 rounded-2xl"></div>
              <div className="relative flex items-start">
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-red-500 to-rose-500 rounded-xl flex items-center justify-center shadow-lg">
                  <AlertCircle className="text-white" size={24} />
                </div>
                <div className="ml-4 flex-1">
                  <h4 className="font-bold text-white text-lg mb-2">Oops! Something went wrong</h4>
                  <p className="text-gray-300 leading-relaxed">{submitError}</p>
                  <p className="text-sm text-gray-400 mt-2">
                    Don't worry - our premium support team is here to help. Please try again or contact us directly.
                  </p>
                </div>
              </div>
            </div>
          )}
          {/* Premium Contact Form */}
          {!isSubmitted && (
            <div className="relative">
              <div className="mb-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">Start Your Premium Experience</h3>
                <p className="text-gray-400">Fill out the form below and our experts will craft a personalized solution for you.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-white mb-3 font-medium text-sm uppercase tracking-wider">First Name *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm" 
                        placeholder="Enter your first name"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                  <div className="group">
                    <label className="block text-white mb-3 font-medium text-sm uppercase tracking-wider">Last Name *</label>
                    <div className="relative">
                      <input 
                        type="text" 
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm" 
                        placeholder="Enter your last name"
                        required
                      />
                      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-white mb-3 font-medium text-sm uppercase tracking-wider">Email Address *</label>
                  <div className="relative">
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm" 
                      placeholder="Enter your premium email address"
                      required
                    />
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-white mb-3 font-medium text-sm uppercase tracking-wider">Your Message *</label>
                  <div className="relative">
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-400 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm min-h-[160px] resize-none" 
                      placeholder="Describe your vision, goals, and how we can help you achieve premium results..."
                      required
                    ></textarea>
                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                  </div>
                </div>
                
                {/* Premium Submit Button */}
                <div className="pt-4">
                  <button 
                    type="submit" 
                    className="group relative w-full overflow-hidden bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 hover:from-purple-500 hover:via-purple-400 hover:to-blue-500 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none"
                    disabled={isSubmitting}
                  >
                    {/* Button Background Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Button Content */}
                    <div className="relative flex items-center justify-center gap-3">
                      {isSubmitting ? (
                        <>
                          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span className="text-lg">Sending Your Message...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                          <span className="text-lg">Send Premium Message</span>
                          <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        </>
                      )}
                    </div>
                  </button>
                </div>

                {/* Premium Trust Indicators */}
                <div className="flex items-center justify-center gap-8 pt-6 text-sm text-gray-400 border-t border-white/10">
                  <div className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-green-400" />
                    <span>SSL Secured</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-blue-400" />
                    <span>2-Hour Response</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-purple-400" />
                    <span>Premium Support</span>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
