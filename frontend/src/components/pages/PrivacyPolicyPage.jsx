import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../layout/Footer';

const PrivacyPolicyPage = () => {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .privacy-container { padding: 0 1rem !important; }
          .privacy-header { padding: 3rem 0 !important; }
          .privacy-title { font-size: 2.5rem !important; }
          .policy-section { padding: 1.5rem !important; }
        }
        @media (max-width: 480px) {
          .privacy-header { padding: 2rem 0 !important; }
          .privacy-title { font-size: 2rem !important; }
          .policy-section { padding: 1rem !important; }
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Header */}
        <header className="privacy-header" style={{
          background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
          color: 'white',
          padding: '4rem 0',
          marginBottom: '3rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="privacy-title"
              style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}
            >
              Privacy Policy
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              style={{ 
                fontSize: '1.125rem', 
                opacity: 0.9, 
                maxWidth: '600px', 
                margin: '0 auto',
                fontFamily: 'Inter, sans-serif'
              }}
            >
              How we collect, use, and protect your personal information
            </motion.p>
          </div>
        </header>

        <div className="privacy-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="policy-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Information We Collect
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                We collect information you provide directly to us, such as when you create an account, submit an application, or contact us for support.
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li>Personal identification information (name, email, phone number)</li>
                <li>Immigration and visa status information</li>
                <li>Financial information for payment processing</li>
                <li>Communication preferences</li>
              </ul>
            </div>

            <div className="policy-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                How We Use Your Information
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                We use the information we collect to provide, maintain, and improve our services:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li>Process your relocation applications and requests</li>
                <li>Communicate with you about our services</li>
                <li>Provide customer support</li>
                <li>Send important updates about your application status</li>
                <li>Improve our services and develop new features</li>
              </ul>
            </div>

            <div className="policy-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Information Sharing
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except in the following circumstances:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li>With Portuguese government agencies as required for visa processing</li>
                <li>With trusted service providers who assist us in operating our business</li>
                <li>When required by law or to protect our rights</li>
                <li>With your explicit consent</li>
              </ul>
            </div>

            <div className="policy-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Data Security
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                We implement appropriate security measures to protect your personal information against unauthorized access, 
                alteration, disclosure, or destruction. This includes encryption of sensitive data and regular security audits.
              </p>
            </div>

            <div className="policy-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Your Rights
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                Under GDPR and Portuguese data protection laws, you have the right to:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Delete your data (right to be forgotten)</li>
                <li>Object to processing of your data</li>
                <li>Data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </div>

            <div className="policy-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Contact Us
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                If you have any questions about this Privacy Policy or our data practices, please contact us at:
              </p>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ fontSize: '1rem', color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                  <strong>Email:</strong> privacy@techanchor.pt<br />
                  <strong>Phone:</strong> +351 123 456 789<br />
                  <strong>Address:</strong> Lisbon, Portugal
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPolicyPage;