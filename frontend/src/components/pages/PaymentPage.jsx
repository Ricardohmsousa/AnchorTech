import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { PaymentFormWidget } from '../../features/payments';
import Footer from '../layout/Footer';

const PaymentPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [paymentCompleted, setPaymentCompleted] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  // Get payment details from URL parameters
  const serviceName = searchParams.get('service') || 'Unknown Service';
  const price = parseInt(searchParams.get('price')) || 0;
  const type = searchParams.get('type') || 'service'; // 'service' or 'package'

  // Service details mapping for better descriptions
  const serviceDescriptions = {
    'Banking & Finance': {
      description: 'Complete banking setup and financial consultation services in Portugal',
      features: [
        'Bank account opening assistance',
        'Home loan consultation', 
        'Investment opportunities',
        'Tax optimization strategies'
      ]
    },
    'Housing Solutions': {
      description: 'Find your perfect home in Portugal with comprehensive housing services',
      features: [
        'Property search and viewing',
        'Rental assistance',
        'Purchase consultation',
        'Legal document review'
      ]
    },
    'Legal Support': {
      description: 'Professional legal assistance for your Portugal relocation',
      features: [
        'Visa application support',
        'Residency permit assistance',
        'Document authentication',
        'Legal consultation'
      ]
    },
    'Healthcare Setup': {
      description: 'Complete healthcare system registration and insurance setup',
      features: [
        'SNS registration',
        'Health insurance guidance',
        'Doctor recommendations',
        'Medical record transfer'
      ]
    },
    'Essential Package': {
      description: 'Perfect starter package for individuals moving to Portugal',
      features: [
        'Banking & Finance setup',
        'Legal Support services',
        'Healthcare Setup assistance',
        'Dedicated support coordinator'
      ]
    },
    'Family Package': {
      description: 'Comprehensive support designed for families relocating to Portugal',
      features: [
        'All Essential Package services',
        'Housing Solutions assistance',
        'Education Services support',
        'Family-specific consultation',
        'Priority customer support'
      ]
    },
    'Business Package': {
      description: 'Complete business relocation and setup services in Portugal',
      features: [
        'Business registration assistance',
        'Banking & Finance for business',
        'Legal Support for companies',
        'Office space consultation',
        'Tax planning services'
      ]
    },
    'Premium Package': {
      description: 'All-inclusive relocation experience with white-glove service',
      features: [
        'All services included',
        'Dedicated personal manager',
        'Priority support 24/7',
        'Concierge services',
        'VIP treatment throughout'
      ]
    }
  };

  const currentService = serviceDescriptions[serviceName] || {
    description: 'Professional relocation service for Portugal',
    features: ['Professional consultation', 'Document assistance', 'Ongoing support']
  };

  // Payment handlers
  const handlePaymentSuccess = (paymentIntentData) => {
    setPaymentCompleted(true);
    setError(null);
    
    // Store payment success in localStorage for confirmation
    localStorage.setItem('paymentSuccess', JSON.stringify({
      service: serviceName,
      amount: price,
      paymentIntent: paymentIntentData.id,
      timestamp: new Date().toISOString()
    }));

    // Redirect to success page after a short delay
    setTimeout(() => {
      navigate('/payment-success', { 
        state: { 
          service: serviceName, 
          amount: price, 
          type: type 
        } 
      });
    }, 2000);
  };

  const handlePaymentError = (error) => {
    setError(`Payment failed: ${error.message}`);
    setLoading(false);
  };

  const handlePaymentCancel = () => {
    // Go back to services page
    navigate('/services');
  };

  // Validate required parameters
  useEffect(() => {
    if (!serviceName || !price || price <= 0) {
      setError('Invalid payment parameters. Please try again from the services page.');
    }
  }, [serviceName, price]);

  if (error && (!serviceName || !price)) {
    return (
      <div style={{ 
        minHeight: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)'
      }}>
        <div style={{
          background: 'white',
          padding: '2rem',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          textAlign: 'center',
          maxWidth: '500px'
        }}>
          <h2 style={{ color: '#dc2626', marginBottom: '1rem' }}>Invalid Payment Request</h2>
          <p style={{ color: '#6b7280', marginBottom: '2rem' }}>
            The payment parameters are missing or invalid. Please return to the services page and try again.
          </p>
          <button
            onClick={() => navigate('/services')}
            style={{
              background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '600'
            }}
          >
            Return to Services
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .payment-container { padding: 1rem 0.5rem !important; }
          .payment-header { padding: 2rem 1rem !important; }
          .payment-title { font-size: 2rem !important; }
          .payment-content { 
            flex-direction: column !important;
            gap: 2rem !important;
          }
          .service-details { margin-bottom: 2rem !important; }
          .payment-widget { margin-top: 0 !important; }
        }
        @media (max-width: 480px) {
          .payment-container { padding: 0.5rem !important; }
          .payment-header { padding: 1.5rem 0.5rem !important; }
          .payment-title { font-size: 1.75rem !important; }
          .price-display { font-size: 2rem !important; }
          .feature-list { padding-left: 1rem !important; }
        }
      `}</style>
      
      <div className="payment-container" style={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '2rem 1rem'
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            maxWidth: '800px',
            margin: '0 auto'
          }}
        >
          {/* Header */}
        <div style={{
          background: 'white',
          borderRadius: '12px',
          padding: '2rem',
          marginBottom: '2rem',
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <button
              onClick={() => navigate('/services')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                marginRight: '1rem',
                color: '#6b7280'
              }}
            >
              ←
            </button>
            <h1 style={{
              fontSize: '2rem',
              fontWeight: '700',
              color: '#1f2937',
              margin: 0
            }}>
              Complete Your Purchase
            </h1>
          </div>
          
          <div className="payment-content" style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '2rem',
            alignItems: 'start'
          }}>
            {/* Service Details */}
            <div className="service-details">
              <div style={{
                background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '6px',
                display: 'inline-block',
                fontSize: '0.875rem',
                fontWeight: '600',
                marginBottom: '1rem'
              }}>
                {type === 'package' ? 'Service Package' : 'Individual Service'}
              </div>
              
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '0.5rem'
              }}>
                {serviceName}
              </h2>
              
              <p style={{
                color: '#6b7280',
                marginBottom: '1.5rem',
                lineHeight: '1.6'
              }}>
                {currentService.description}
              </p>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{
                  fontSize: '1.125rem',
                  fontWeight: '600',
                  color: '#1f2937',
                  marginBottom: '0.75rem'
                }}>
                  What's Included:
                </h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {currentService.features.map((feature, index) => (
                    <li key={index} style={{
                      color: '#4b5563',
                      marginBottom: '0.5rem',
                      lineHeight: '1.5'
                    }}>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Price Summary */}
            <div style={{
              background: '#f8fafc',
              padding: '1.5rem',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <h3 style={{
                fontSize: '1.125rem',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '1rem'
              }}>
                Order Summary
              </h3>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '0.5rem'
              }}>
                <span style={{ color: '#6b7280' }}>{serviceName}</span>
                <span style={{ fontWeight: '600', color: '#1f2937' }}>
                  €{(price / 100).toFixed(2)}
                </span>
              </div>
              
              <div style={{
                borderTop: '1px solid #e2e8f0',
                paddingTop: '0.5rem',
                marginTop: '1rem'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: '1.125rem',
                  fontWeight: '700'
                }}>
                  <span style={{ color: '#1f2937' }}>Total</span>
                  <span style={{ color: '#0070f3' }}>
                    €{(price / 100).toFixed(2)}
                  </span>
                </div>
              </div>

              <div style={{
                background: '#e0f2fe',
                padding: '1rem',
                borderRadius: '6px',
                marginTop: '1rem',
                fontSize: '0.875rem'
              }}>
                <p style={{ margin: 0, color: '#0277bd' }}>
                  🔒 <strong>Secure Payment</strong><br/>
                  Your payment is processed securely through Stripe. We never store your payment information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        {!paymentCompleted ? (
          <div style={{
            background: 'white',
            borderRadius: '12px',
            padding: '2rem',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1f2937',
              marginBottom: '1.5rem',
              textAlign: 'center'
            }}>
              Payment Information
            </h2>

            {error && (
              <div style={{
                background: '#fef2f2',
                border: '1px solid #fecaca',
                color: '#dc2626',
                padding: '1rem',
                borderRadius: '8px',
                marginBottom: '1.5rem'
              }}>
                {error}
              </div>
            )}

            <PaymentFormWidget
              amount={price}
              onSuccess={handlePaymentSuccess}
              onError={handlePaymentError}
              onCancel={handlePaymentCancel}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{
              background: 'white',
              borderRadius: '12px',
              padding: '3rem',
              textAlign: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
            }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>✅</div>
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              color: '#059669',
              marginBottom: '1rem'
            }}>
              Payment Successful!
            </h2>
            <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>
              Redirecting to confirmation page...
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
    <Footer />
    </>
  );
};

export default PaymentPage;