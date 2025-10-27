import React from 'react';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleDocumentChecklistClick = () => {
    navigate('/', { state: { scrollToDocuments: true } });
  };

  return (
    <>
      <style>{`
        /* Footer responsive grid */
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 3rem;
          padding: 0 2rem;
        }
        @media (min-width: 768px) {
          .footer-grid {
            gap: 4rem;
          }
        }
        .footer-company {
          grid-column: span 1;
        }
        @media (min-width: 768px) {
          .footer-company {
            grid-column: span 1;
          }
        }
        @media (min-width: 1024px) {
          .footer-company {
            grid-column: span 1;
          }
        }
        .footer-newsletter {
          grid-column: span 1;
        }
        @media (min-width: 768px) {
          .footer-newsletter {
            grid-column: span 1;
          }
        }
        @media (min-width: 1024px) {
          .footer-newsletter {
            grid-column: span 1;
          }
        }
        .footer-bottom {
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e5e7eb;
        }
        @media (min-width: 768px) {
          .footer-bottom {
            margin-top: 4rem;
          }
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          .footer-company {
            grid-column: span 1;
          }
          .footer-newsletter {
            grid-column: span 1;
          }
        }
      `}</style>

      <footer style={{
        background: '#f9fafb',
        padding: 'clamp(2.5rem, 5vw, 4rem) 0 clamp(2rem, 4vw, 2.5rem) 0',
        fontFamily: 'Inter, sans-serif'
      }}>
        <div className="responsive-container" style={{ 
          maxWidth: '1280px', 
          margin: '0 auto'
        }}>
          <div className="footer-grid">
            {/* Company Info */}
            <div className="footer-company">
              {/* Logo */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '1.75rem'
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  background: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  ⚓
                </div>
                <span style={{
                  fontSize: '1.5rem',
                  fontWeight: '800',
                  color: '#1a202c',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  TechAnchor
                </span>
              </div>

              <p style={{
                fontSize: '1rem',
                lineHeight: '1.6',
                color: '#64748b',
                marginBottom: '2.25rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                Your trusted partner for relocating to Portugal. We provide expert guidance, handle complex paperwork, and ensure a smooth transition to your new life.
              </p>

              {/* Social Media Links */}
              <div style={{
                display: 'flex',
                gap: '0.75rem'
              }}>
                {[
                  { icon: '𝕏', label: 'Twitter' },
                  { icon: 'f', label: 'Facebook' },
                  { icon: '📷', label: 'Instagram' },
                  { icon: '💼', label: 'LinkedIn' }
                ].map((social, index) => (
                  <a
                    key={index}
                    href="#"
                    style={{
                      width: '36px',
                      height: '36px',
                      background: '#1f2937',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      textDecoration: 'none',
                      fontSize: '14px',
                      fontWeight: '600',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = '#0070f3';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = '#1f2937';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Services Column */}
            <div>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: '#9ca3af',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                Services
              </h3>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {[
                  { text: 'Visa Applications', path: '/application', action: 'navigate' },
                  { text: 'Document Checklist', path: null, action: 'scroll' },
                  { text: 'Settlement Services', path: '/services', action: 'navigate' },
                  { text: 'Contact Us', path: '/contact', action: 'navigate' }
                ].map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        if (item.action === 'navigate') {
                          navigate(item.path);
                        } else if (item.action === 'scroll') {
                          handleDocumentChecklistClick();
                        }
                      }}
                      style={{
                        fontSize: '1rem',
                        color: '#1f2937',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        fontFamily: 'Inter, sans-serif',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => e.target.style.color = '#0070f3'}
                      onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Column */}
            <div>
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: '#9ca3af',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                Support
              </h3>

              <ul style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem'
              }}>
                {[
                  { text: 'About Us', path: '/about', action: 'navigate' },
                  { text: 'Documentation', path: null, action: 'scroll' },
                  { text: 'Contact Support', path: '/contact', action: 'navigate' },
                  { text: 'Privacy Policy', path: '/privacy', action: 'navigate' }
                ].map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        if (item.action === 'navigate') {
                          navigate(item.path);
                        } else if (item.action === 'scroll') {
                          handleDocumentChecklistClick();
                        }
                      }}
                      style={{
                        fontSize: '1rem',
                        color: '#1f2937',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                        fontFamily: 'Inter, sans-serif',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: item.action !== 'none' ? 'pointer' : 'default',
                        textAlign: 'left'
                      }}
                      onMouseEnter={(e) => item.action !== 'none' && (e.target.style.color = '#0070f3')}
                      onMouseLeave={(e) => item.action !== 'none' && (e.target.style.color = '#1f2937')}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Subscription */}
            <div className="footer-newsletter">
              <h3 style={{
                fontSize: '0.875rem',
                fontWeight: '600',
                letterSpacing: '0.05em',
                color: '#9ca3af',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                Subscribe to Newsletter
              </h3>

              <form style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontFamily: 'Inter, sans-serif',
                    outline: 'none',
                    transition: 'border-color 0.2s ease'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#0070f3'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '0.5rem',
                    fontSize: '1rem',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    fontFamily: 'Inter, sans-serif'
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
                  Subscribe
                </button>
              </form>

              <p style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                marginTop: '1rem',
                lineHeight: '1.5',
                fontFamily: 'Inter, sans-serif'
              }}>
                Get updates on Portuguese immigration and exclusive relocation tips.
              </p>
            </div>
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              padding: '0 2rem'
            }}>
              <p style={{
                fontSize: '0.875rem',
                color: '#9ca3af',
                margin: 0,
                fontFamily: 'Inter, sans-serif'
              }}>
                © 2024 TechAnchor. All rights reserved.
              </p>
              
              <div style={{
                display: 'flex',
                gap: '2rem',
                flexWrap: 'wrap'
              }}>
                {[
                  { text: 'Terms of Service', path: '/terms' },
                  { text: 'Privacy Policy', path: '/privacy' },
                  { text: 'Cookie Policy', path: '/cookies' }
                ].map((item, index) => (
                  <button
                    key={index}
                    onClick={() => navigate(item.path)}
                    style={{
                      fontSize: '0.875rem',
                      color: '#9ca3af',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                      fontFamily: 'Inter, sans-serif',
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer'
                    }}
                    onMouseEnter={(e) => e.target.style.color = '#0070f3'}
                    onMouseLeave={(e) => e.target.style.color = '#9ca3af'}
                  >
                    {item.text}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;