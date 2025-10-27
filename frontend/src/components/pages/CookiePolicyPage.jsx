import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Footer from '../layout/Footer';
import cookieManager from '../../utils/cookieManager';
import { useCookieConsent } from '../../hooks/useCookieConsent';

const CookiePolicyPage = () => {
  const { preferences, updatePreferences, resetConsent } = useCookieConsent();
  const [localPreferences, setLocalPreferences] = useState(preferences);
  const [showManagement, setShowManagement] = useState(false);

  const handleCategoryToggle = (category) => {
    setLocalPreferences(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        enabled: !prev[category].enabled
      }
    }));
  };

  const handleSavePreferences = () => {
    updatePreferences(localPreferences);
    setShowManagement(false);
    // Show success message
    alert('Cookie preferences saved successfully!');
  };

  const handleResetConsent = () => {
    if (confirm('This will reset all your cookie preferences. Are you sure?')) {
      resetConsent();
      setLocalPreferences(cookieManager.cookieCategories);
      alert('Cookie preferences have been reset.');
    }
  };
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .cookie-container { padding: 0 1rem !important; }
          .cookie-header { padding: 3rem 0 !important; }
          .cookie-title { font-size: 2.5rem !important; }
          .cookie-section { padding: 1.5rem !important; }
        }
        @media (max-width: 480px) {
          .cookie-header { padding: 2rem 0 !important; }
          .cookie-title { font-size: 2rem !important; }
          .cookie-section { padding: 1rem !important; }
        }
      `}</style>
      
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        {/* Header */}
        <header className="cookie-header" style={{
          background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
          color: 'white',
          padding: '4rem 0',
          marginBottom: '3rem'
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center' }}>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="cookie-title"
              style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}
            >
              Cookie Policy
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
              How we use cookies to improve your experience
            </motion.p>
          </div>
        </header>

        <div className="cookie-container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 2rem', marginBottom: '4rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="cookie-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                What Are Cookies?
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                Cookies are small text files that are placed on your computer or mobile device when you visit our website. 
                They help us provide you with a better experience by remembering your preferences and improving site functionality.
              </p>
            </div>

            <div className="cookie-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Types of Cookies We Use
              </h2>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                  Essential Cookies
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                  These cookies are necessary for the website to function properly. They enable basic features like security, 
                  network management, and accessibility.
                </p>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                  Performance Cookies
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                  These cookies help us understand how visitors interact with our website by collecting and reporting 
                  information anonymously.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: '600', marginBottom: '0.5rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                  Functional Cookies
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                  These cookies enable enhanced functionality and personalization, such as remembering your login details 
                  and language preferences.
                </p>
              </div>
            </div>

            <div className="cookie-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Third-Party Cookies
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                We also use cookies from trusted third-party services:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li><strong>Google Analytics:</strong> To analyze website traffic and user behavior</li>
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>Social Media:</strong> For social sharing functionality</li>
              </ul>
            </div>

            <div className="cookie-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Managing Your Cookie Preferences
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                You can control and manage cookies in several ways:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                <li>Use our cookie consent banner to manage your preferences</li>
                <li>Configure your browser settings to block or delete cookies</li>
                <li>Use browser plugins to manage cookie preferences</li>
                <li>Opt out of third-party cookies through their websites</li>
              </ul>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                Please note that disabling certain cookies may affect the functionality of our website.
              </p>
            </div>

            <div className="cookie-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Cookie Retention
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', fontFamily: 'Inter, sans-serif' }}>
                Different cookies have different retention periods:
              </p>
              <ul style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginLeft: '1.5rem', fontFamily: 'Inter, sans-serif' }}>
                <li><strong>Session cookies:</strong> Deleted when you close your browser</li>
                <li><strong>Persistent cookies:</strong> Remain until their expiry date or you delete them</li>
                <li><strong>Analytics cookies:</strong> Typically expire after 2 years</li>
              </ul>
            </div>

            <div className="cookie-section" style={{
              background: 'white',
              padding: '2rem',
              borderRadius: '12px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                Contact Us About Cookies
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '1rem', fontFamily: 'Inter, sans-serif' }}>
                If you have any questions about our use of cookies, please contact us:
              </p>
              <div style={{ padding: '1rem', background: '#f9fafb', borderRadius: '8px' }}>
                <p style={{ fontSize: '1rem', color: '#1f2937', margin: 0, fontFamily: 'Inter, sans-serif' }}>
                  <strong>Email:</strong> privacy@techanchor.pt<br />
                  <strong>Phone:</strong> +351 123 456 789<br />
                  <strong>Address:</strong> Lisbon, Portugal
                </p>
              </div>
            </div>
          </motion.div>

          {/* Cookie Management Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            style={{ marginTop: '3rem' }}
          >
            <div className="cookie-section" style={{
              background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
              padding: '2.5rem',
              borderRadius: '12px',
              border: '2px solid #0070f3',
              marginBottom: '2rem'
            }}>
              <h2 style={{ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1rem', color: '#1f2937', fontFamily: 'Inter, sans-serif' }}>
                🍪 Manage Your Cookie Preferences
              </h2>
              <p style={{ fontSize: '1rem', lineHeight: '1.6', color: '#4b5563', marginBottom: '2rem', fontFamily: 'Inter, sans-serif' }}>
                You can customize your cookie preferences below. Changes will be applied immediately.
              </p>

              {!showManagement ? (
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    onClick={() => setShowManagement(true)}
                    style={{
                      background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                      color: 'white',
                      padding: '1rem 2rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      border: 'none',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 6px 20px rgba(0, 112, 243, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    Manage Cookie Settings
                  </button>
                  
                  <button
                    onClick={handleResetConsent}
                    style={{
                      background: 'transparent',
                      color: '#6b7280',
                      padding: '1rem 2rem',
                      fontSize: '1rem',
                      fontWeight: '600',
                      border: '2px solid #d1d5db',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'Inter, sans-serif'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#9ca3af';
                      e.target.style.background = '#f9fafb';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#d1d5db';
                      e.target.style.background = 'transparent';
                    }}
                  >
                    Reset All Preferences
                  </button>
                </div>
              ) : (
                <div>
                  {/* Cookie Categories Management */}
                  <div style={{ marginBottom: '2rem' }}>
                    {Object.entries(localPreferences).map(([category, config]) => (
                      <div key={category} style={{
                        background: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        padding: '1.5rem',
                        marginBottom: '1rem'
                      }}>
                        <div style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          marginBottom: '0.5rem'
                        }}>
                          <h4 style={{
                            fontSize: '1.125rem',
                            fontWeight: '600',
                            color: '#1a202c',
                            margin: 0,
                            fontFamily: 'Inter, sans-serif'
                          }}>
                            {config.name}
                          </h4>
                          <label style={{
                            position: 'relative',
                            display: 'inline-block',
                            width: '48px',
                            height: '24px'
                          }}>
                            <input
                              type="checkbox"
                              checked={config.enabled}
                              disabled={config.required}
                              onChange={() => handleCategoryToggle(category)}
                              style={{ opacity: 0, width: 0, height: 0 }}
                            />
                            <span style={{
                              position: 'absolute',
                              cursor: config.required ? 'not-allowed' : 'pointer',
                              top: 0,
                              left: 0,
                              right: 0,
                              bottom: 0,
                              backgroundColor: config.enabled ? '#0070f3' : '#d1d5db',
                              transition: '0.3s',
                              borderRadius: '24px'
                            }}>
                              <span style={{
                                position: 'absolute',
                                content: '""',
                                height: '18px',
                                width: '18px',
                                left: config.enabled ? '27px' : '3px',
                                bottom: '3px',
                                backgroundColor: 'white',
                                transition: '0.3s',
                                borderRadius: '50%'
                              }}></span>
                            </span>
                          </label>
                        </div>
                        <p style={{
                          fontSize: '0.875rem',
                          color: '#6b7280',
                          margin: 0,
                          lineHeight: '1.5',
                          fontFamily: 'Inter, sans-serif'
                        }}>
                          {config.description}
                          {config.required && ' (Required for basic functionality)'}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <button
                      onClick={handleSavePreferences}
                      style={{
                        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                        color: 'white',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(16, 185, 129, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Save Preferences
                    </button>
                    
                    <button
                      onClick={() => setShowManagement(false)}
                      style={{
                        background: 'transparent',
                        color: '#6b7280',
                        padding: '1rem 2rem',
                        fontSize: '1rem',
                        fontWeight: '600',
                        border: '2px solid #d1d5db',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                        fontFamily: 'Inter, sans-serif'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.borderColor = '#9ca3af';
                        e.target.style.background = '#f9fafb';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.borderColor = '#d1d5db';
                        e.target.style.background = 'transparent';
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CookiePolicyPage;