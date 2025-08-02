import React from 'react';

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-black text-white py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Privacy Policy
          </h1>
          <p className="text-gray-400">Effective Date: 7/28/2025</p>
        </div>
        
        {/* Introduction */}
        <div className="prose prose-invert max-w-none">
          <p className="text-lg">
            Welcome to Virtual Solutions Path ("we", "our", or "us"). Your privacy is important to us. 
            This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
            when you visit our website and use our services.
          </p>
          
          {/* Section 1 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">1. Information We Collect</h2>
          <p>We may collect personal and non-personal information, including:</p>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-pink-300">a. Personal Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Name</li>
            <li>Email address</li>
            <li>Phone number</li>
            <li>Payment details (processed through secure third-party gateways)</li>
            <li>Account login details (username and password)</li>
          </ul>
          
          <h3 className="text-xl font-medium mt-6 mb-3 text-pink-300">b. Non-Personal Information</h3>
          <ul className="list-disc pl-6 space-y-1">
            <li>Browser type</li>
            <li>IP address</li>
            <li>Pages visited</li>
            <li>Time spent on the site</li>
            <li>Referral source</li>
          </ul>
          
          {/* Section 2 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">2. How We Use Your Information</h2>
          <p>We use the collected data to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Provide and manage access to our courses</li>
            <li>Process transactions</li>
            <li>Send important updates and newsletters</li>
            <li>Improve user experience and website performance</li>
            <li>Ensure security and prevent fraud</li>
            <li>Respond to user inquiries and support requests</li>
          </ul>
          
          {/* Section 3 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">3. Sharing Your Information</h2>
          <p>
            We do not sell or rent your personal data. We may share data with:
          </p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Service providers (such as payment processors, email marketing tools)</li>
            <li>Legal authorities if required by law</li>
            <li>Analytics tools for website performance</li>
          </ul>
          
          {/* Section 4 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">4. Data Security</h2>
          <p>
            We implement industry-standard security measures to protect your personal data. 
            However, no method of transmission over the internet is 100% secure.
          </p>
          
          {/* Section 5 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">5. Cookies and Tracking Technologies</h2>
          <p>
            We use cookies and similar technologies to enhance user experience, analyze usage, 
            and serve targeted ads. You can disable cookies through your browser settings.
          </p>
          
          {/* Section 6 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">6. Your Rights</h2>
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-1">
            <li>Access or update your personal data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of marketing communications</li>
            <li>Withdraw consent at any time (where applicable)</li>
          </ul>
          
          {/* Section 7 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">7. Third-Party Links</h2>
          <p>
            Our website may contain links to external websites. We are not responsible for the 
            privacy practices of other sites.
          </p>
          
          {/* Section 8 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">8. Children's Privacy</h2>
          <p>
            Our services are not intended for children under 13. We do not knowingly collect 
            personal information from minors.
          </p>
          
          {/* Section 9 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">9. Changes to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted 
            on this page with a revised effective date.
          </p>
          
          {/* Section 10 */}
          <h2 className="text-2xl font-semibold mt-10 mb-4 text-purple-300">10. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy, please contact us at:</p>
          <p className="mt-2">
            <span className="inline-block mr-2">📧</span> contact@virtualsolutionspath.com
          </p>
          <p>
            <span className="inline-block mr-2">🌐</span> www.virtualsolutionspath.com
          </p>
        </div>
        
        {/* Bottom decoration */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} Virtual Solutions Path. All rights reserved.
        </div>
      </div>
      
      {/* Background effect */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-black via-gray-900 to-black"></div>
      <div className="fixed inset-0 -z-10 bg-gradient-to-tr from-purple-900/10 via-transparent to-pink-900/10"></div>
    </section>
  );
}
