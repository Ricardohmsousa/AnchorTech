import React from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../Logo';

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
          grid-template-columns: 2fr 1fr 1fr 1fr;
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
              <div style={{ marginBottom: '1.75rem' }}>
                <Logo width={40} height={40} showText={true} />
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

              {/* Social Media Links - Commented out */}
              {/* <div style={{
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
                      e.target.style.background = '#E2725B';
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
              </div> */}
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
                  { text: 'Settlement Services', path: '/services', action: 'navigate' },
                  { text: 'Document Checklist', path: null, action: 'scroll' }
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
                      onMouseEnter={(e) => e.target.style.color = '#E2725B'}
                      onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company Column */}
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
                Company
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
                  { text: 'Contact', path: '/contact', action: 'navigate' }
                ].map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        if (item.action === 'navigate') {
                          navigate(item.path);
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
                      onMouseEnter={(e) => e.target.style.color = '#E2725B'}
                      onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Column */}
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
                Legal
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
                  { text: 'Privacy Policy', path: '/privacy', action: 'navigate' },
                  { text: 'Terms of Service', path: '/terms', action: 'navigate' },
                  { text: 'Cookie Policy', path: '/cookies', action: 'navigate' }
                ].map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => {
                        if (item.action === 'navigate') {
                          navigate(item.path);
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
                      onMouseEnter={(e) => e.target.style.color = '#E2725B'}
                      onMouseLeave={(e) => e.target.style.color = '#1f2937'}
                    >
                      {item.text}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter Subscription - Commented out */}
            {/* <div className="footer-newsletter">
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
                  onFocus={(e) => e.target.style.borderColor = '#E2725B'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                />
                
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '1rem',
                    background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
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
                    e.target.style.boxShadow = '0 8px 20px rgba(226, 114, 91, 0.3)';
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
            </div> */}
          </div>

          {/* Footer Bottom */}
          <div className="footer-bottom">
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
              padding: '0 2rem',
              textAlign: 'center',
              maxWidth: '900px',
              margin: '0 auto'
            }}>
              {/* Professional Disclaimer */}
              <p style={{
                fontSize: '0.813rem',
                color: '#64748b',
                lineHeight: '1.7',
                margin: 0,
                fontFamily: 'Inter, sans-serif'
              }}>
                Atlantical is not a law firm and does not provide legal advice. We are a relocation consultancy service that connects clients with licensed legal professionals, immigration specialists, and service providers in Portugal.
              </p>

              {/* Copyright */}
              <p style={{
                fontSize: '0.813rem',
                color: '#9ca3af',
                margin: 0,
                fontFamily: 'Inter, sans-serif'
              }}>
                © 2024 Atlantical. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;