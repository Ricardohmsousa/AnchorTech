import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Footer from '../layout/Footer';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [paymentData, setPaymentData] = useState(null);

  useEffect(() => {
    // Try to get payment data from location state first, then localStorage
    const stateData = location.state;
    const storedData = JSON.parse(localStorage.getItem('paymentSuccess') || 'null');
    
    if (stateData) {
      setPaymentData(stateData);
    } else if (storedData) {
      setPaymentData({
        service: storedData.service,
        amount: storedData.amount,
        type: 'service' // default fallback
      });
    } else {
      // No payment data found, redirect to services
      navigate('/services');
    }

    // Clear the stored payment data
    localStorage.removeItem('paymentSuccess');
  }, [location.state, navigate]);

  if (!paymentData) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  const nextSteps = [
    {
      icon: '📧',
      title: 'Confirmation Email',
      description: 'You will receive a confirmation email with your purchase details and next steps within 5 minutes.'
    },
    {
      icon: '👥',
      title: 'Team Assignment',
      description: 'Our expert team will be assigned to your case within 24 hours and will contact you directly.'
    },
    {
      icon: '📋',
      title: 'Document Collection',
      description: 'We\'ll guide you through collecting any required documents for your Portugal relocation process.'
    },
    {
      icon: '🎯',
      title: 'Service Delivery',
      description: 'Our team will begin working on your case immediately and keep you updated throughout the process.'
    }
  ];

  return (
    <>
      <div style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
        padding: '2rem 1rem'
      }}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          maxWidth: '800px',
          margin: '0 auto'
        }}
      >
        {/* Success Header */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '3rem 2rem',
          textAlign: 'center',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          marginBottom: '2rem'
        }}>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontSize: '5rem', marginBottom: '1rem' }}
          >
            🎉
          </motion.div>
          
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#059669',
            marginBottom: '1rem'
          }}>
            Payment Successful!
          </h1>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#6b7280',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Thank you for choosing TechAnchor for your Portugal relocation journey!
          </p>

          {/* Purchase Summary */}
          <div style={{
            background: '#f8fafc',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            marginBottom: '2rem'
          }}>
            <h3 style={{
              fontSize: '1.25rem',
              fontWeight: '600',
              color: '#1f2937',
              marginBottom: '1rem'
            }}>
              Purchase Summary
            </h3>
            
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '0.5rem'
            }}>
              <div>
                <div style={{
                  background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                  color: 'white',
                  padding: '0.25rem 0.75rem',
                  borderRadius: '4px',
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  marginBottom: '0.5rem'
                }}>
                  {paymentData.type === 'package' ? 'Service Package' : 'Individual Service'}
                </div>
                <div style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937'
                }}>
                  {paymentData.service}
                </div>
              </div>
              <div style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#059669'
              }}>
                €{(paymentData.amount / 100).toFixed(2)}
              </div>
            </div>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button
              onClick={() => navigate('/')}
              style={{
                background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                color: 'white',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 8px 20px rgba(0, 112, 243, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Return to Home
            </button>
            
            <button
              onClick={() => navigate('/contact')}
              style={{
                background: 'transparent',
                color: '#0070f3',
                border: '2px solid #0070f3',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#0070f3';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#0070f3';
              }}
            >
              Contact Support
            </button>
          </div>
        </div>

        {/* Next Steps */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '2rem',
          boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
        }}>
          <h2 style={{
            fontSize: '1.75rem',
            fontWeight: '700',
            color: '#1f2937',
            marginBottom: '1.5rem',
            textAlign: 'center'
          }}>
            What Happens Next?
          </h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem'
          }}>
            {nextSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '1rem',
                  padding: '1.5rem',
                  background: '#f8fafc',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}
              >
                <div style={{
                  fontSize: '2rem',
                  minWidth: '3rem',
                  textAlign: 'center'
                }}>
                  {step.icon}
                </div>
                <div>
                  <h3 style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: '#1f2937',
                    marginBottom: '0.5rem'
                  }}>
                    {step.title}
                  </h3>
                  <p style={{
                    color: '#6b7280',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{
            marginTop: '2rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
            borderRadius: '12px',
            textAlign: 'center'
          }}>
            <h3 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: '#0277bd',
              marginBottom: '0.5rem'
            }}>
              📞 Need immediate assistance?
            </h3>
            <p style={{
              color: '#0277bd',
              margin: 0
            }}>
              Our support team is available 24/7 to help with any questions about your purchase or next steps.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
    <Footer />
    </>
  );
};

export default PaymentSuccessPage;