import React from 'react';
import ScrollToHash from '@/components/ScrollHash';

const TermsAndConditions = () => {
  return (
    <> 
      <ScrollToHash />
      <div className="min-h-screen bg-black-200 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Terms and Conditions</h1>
        
        <div className="bg-gray-900/80 backdrop-blur-sm shadow-lg rounded-lg p-6 border border-gray-800 prose prose-lg prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Introduction</h2>
            <p className="text-gray-300">
              Welcome to Amaraiverse! This personal website showcases my work, shares technical blogs, and provides a way to connect with me. By using this site, you agree to these Terms and Conditions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. Personal Use Only</h2>
            <p className="text-gray-300">
              This site and its content are provided for personal, non-commercial use. You may not reproduce, distribute, or reuse content without explicit permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Contact & Submissions</h2>
            <p className="text-gray-300">
              If you submit a message through the contact form or subscribe to the newsletter, your name and email address may be stored using Appwrite. These are used solely for responding to inquiries or sending blog updates.
            </p>
            <p className="text-gray-300 mt-2">
              Your information is never shared with third parties. reCAPTCHA is used to protect from bots, and Upstash Redis is used to limit abuse.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Blog Content</h2>
            <p className="text-gray-300">
              The blog content reflects my personal views and experiences. While I strive for accuracy, I cannot guarantee that all information is always up-to-date or correct.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Rate Limiting and Security</h2>
            <p className="text-gray-300">
              To ensure fair use and security, this site implements request rate limiting via Upstash Redis and bot protection via Google reCAPTCHA.
            </p>
            <p className="text-gray-300 mt-2">
              Suspicious or abusive activity may be blocked automatically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Intellectual Property</h2>
            <p className="text-gray-300">
              All code samples, designs, and articles are the intellectual property of Amar. You may reference or share them with attribution, but not use them commercially without permission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Changes to Terms</h2>
            <p className="text-gray-300">
              These terms may be updated occasionally. Continued use of the website implies acceptance of any changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">8. Contact</h2>
            <p className="text-gray-300">
              For any questions regarding these terms, feel free to reach out via the contact form.
            </p>
          </section>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default TermsAndConditions;
