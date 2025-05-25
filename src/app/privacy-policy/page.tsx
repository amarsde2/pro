import React from 'react';
import ScrollToHash from '@/components/ScrollHash';

const PrivacyPolicy = () => {
  return (
    <>
     <ScrollToHash />
     <div className="min-h-screen bg-black py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">Privacy Policy</h1>
        
        <div className="bg-gray-900/80 backdrop-blur-sm shadow-lg rounded-lg p-6 border border-gray-800 prose prose-lg prose-invert">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">1. Information We Collect</h2>
            <p className="text-gray-300">
              We collect information that you provide directly to us, including but not limited to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-300">
              <li>Name and contact information</li>
              <li>Communication preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-300">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-300">
              <li>Provide and maintain our services</li>
              <li>Send you technical notices and support messages</li>
              <li>Communicate with you about products, services, and events</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">3. Information Sharing</h2>
            <p className="text-gray-300">
              We do not sell or rent your personal information to third parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-300">
              <li>Service providers who assist in our operations</li>
              <li>Legal authorities when required by law</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">4. Data Security</h2>
            <p className="text-gray-300">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">5. Your Rights</h2>
            <p className="text-gray-300">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-gray-300">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">6. Contact Us</h2>
            <p className="text-gray-300">
              If you have any questions about this Privacy Policy, please contact us at:
              <br />
              Email: eramarinfo@gmail.com
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-white mb-4">7. Updates to This Policy</h2>
            <p className="text-gray-300">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &lquote; Last Updated &rquote; date.
            </p>
          </section>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default PrivacyPolicy; 