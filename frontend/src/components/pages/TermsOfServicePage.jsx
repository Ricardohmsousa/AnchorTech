import React from 'react';
import { motion } from 'framer-motion';
import Footer from '../layout/Footer';

const TermsOfServicePage = () => {
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .terms-container { padding: 0 1rem !important; }
          .terms-header { padding: 3rem 0 !important; }
          .terms-title { font-size: 2.5rem !important; }
          .terms-section { padding: 1.5rem !important; }
        }
        @media (max-width: 480px) {
          .terms-header { padding: 2rem 0 !important; }
          .terms-title { font-size: 2rem !important; }
          .terms-section { padding: 1rem !important; }
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Header */}
        <header className="terms-header" style={{
          background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
          color: 'white',
          padding: '4rem 0',
          marginBottom: '3rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="terms-title"
              style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}
            >
              Terms of Service
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
              Terms and conditions for using Atlantical services
            </motion.p>
          </div>
        </header>

        <div className="terms-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="terms-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Acceptance of Terms
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                By accessing and using Atlantical's services, you accept and agree to be bound by the terms and provision of this agreement. 
                If you do not agree to abide by the above, please do not use this service.
              </p>
            </div>

            <div className="terms-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Service Description
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                Atlantical provides relocation assistance services for individuals and families moving to Portugal, including:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li>Visa application assistance and consultation</li>
                <li>Document preparation and translation services</li>
                <li>Housing and accommodation assistance</li>
                <li>Banking and financial setup guidance</li>
                <li>Legal and administrative support</li>
              </ul>
            </div>

            <div className="terms-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                User Responsibilities
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                As a user of our services, you agree to:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li>Provide accurate and complete information</li>
                <li>Comply with all applicable Portuguese and international laws</li>
                <li>Pay all fees and charges on time</li>
                <li>Cooperate fully with our team throughout the process</li>
                <li>Inform us promptly of any changes to your circumstances</li>
              </ul>
            </div>

            <div className="terms-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Payment Terms
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                Payment terms for our services:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li>All fees are due upon acceptance of our service agreement</li>
                <li>Refunds are subject to our refund policy</li>
                <li>Additional charges may apply for rush processing or additional services</li>
                <li>Payment can be made via credit card, bank transfer, or other approved methods</li>
              </ul>
            </div>

            <div className="terms-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Limitation of Liability
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                Atlantical provides consultation and assistance services but cannot guarantee specific outcomes regarding visa approvals, 
                housing availability, or other third-party decisions. Our liability is limited to the fees paid for our services.
              </p>
            </div>

            <div className="terms-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Intellectual Property
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                All content, materials, and intellectual property on our website and in our services remain the property of Atlantical. 
                Users may not reproduce, distribute, or create derivative works without explicit written permission.
              </p>
            </div>

            <div className="terms-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Termination
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                Either party may terminate the service agreement with 30 days written notice. Atlantical reserves the right to terminate 
                services immediately in case of breach of these terms or non-payment of fees.
              </p>
            </div>

            <div className="terms-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Contact Information
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                For questions about these Terms of Service, please contact us:
              </p>
              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ fontSize: '1rem', color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                  <strong>Email:</strong> legal@atlantical.pt<br />
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

export default TermsOfServicePage;
