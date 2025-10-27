import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// COMMENTED OUT: Firebase Auth
// import { useAuth } from "../../app/providers/AuthProvider";
import { navBar, navLink, button as buttonStyle } from "../../styles/sharedStyles";

export default function Header({ onLogin, onLogout }) {
  // COMMENTED OUT: Firebase Auth
  // const { currentUser, logout, isAuthenticated } = useAuth();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  
  const handleHomeNavigation = () => {
    navigate('/');
    setMobileMenuOpen(false);
  };
  
  return (
    <>
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile { display: flex !important; }
          .mobile-menu { 
            display: ${mobileMenuOpen ? 'block' : 'none'} !important;
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            background: white;
            border-top: 1px solid #e2e8f0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 1000;
            padding: 1rem;
          }
        }
        @media (min-width: 769px) {
          .nav-desktop { display: flex !important; }
          .nav-mobile { display: none !important; }
          .mobile-menu { display: none !important; }
        }
      `}</style>
      
      <nav style={{
        ...navBar,
        flexWrap: 'wrap',
        position: 'relative'
      }}>
        {/* Main navbar content */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          width: '100%'
        }}>
          {/* Logo */}
          <div
            style={{ 
              fontFamily: 'Lato, sans-serif', 
              fontWeight: 900, 
              fontSize: 28, 
              color: '#0070f3', 
              letterSpacing: 1, 
              cursor: 'pointer' 
            }}
            onClick={handleHomeNavigation}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleHomeNavigation();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Go to home page"
          >
            TechAnchor
          </div>

          {/* Desktop Navigation */}
          <div className="nav-desktop" style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
            <div style={{ position: 'relative' }}>
              <button
                style={{
                  ...buttonStyle,
                  fontFamily: 'Lato, sans-serif',
                  background: '#fff',
                  color: '#222',
                  border: 'none',
                  fontWeight: 700,
                  fontSize: 16,
                  padding: '10px 24px',
                  cursor: 'pointer',
                  boxShadow: 'none'
                }}
                onClick={() => setServicesOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
              >
                Services ▼
              </button>
              {servicesOpen && (
                <div
                  className="services-dropdown open"
                  style={{
                    position: 'absolute',
                    top: '110%',
                    left: 0,
                    background: '#fff',
                    boxShadow: '0 2px 8px #e0e0e0',
                    borderRadius: 8,
                    minWidth: 180,
                    zIndex: 100,
                  }}
                  tabIndex={-1}
                  onBlur={e => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setServicesOpen(false);
                  }}
                >
                  <button 
                    onClick={() => { navigate('/application'); setServicesOpen(false); }}
                    style={{ ...navLink, display: 'block', padding: '12px 20px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                  >
                    Start Application
                  </button>
                  <button 
                    onClick={() => { navigate('/services'); setServicesOpen(false); }}
                    style={{ ...navLink, display: 'block', padding: '12px 20px', background: 'none', border: 'none', width: '100%', textAlign: 'left', cursor: 'pointer' }}
                  >
                    Settlement Services
                  </button>
                </div>
              )}
            </div>
            <button 
              onClick={() => navigate('/about')}
              style={{ 
                ...navLink, 
                fontFamily: 'Lato, sans-serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#333',
                textDecoration: 'none'
              }}
            >
              About
            </button>
            <button 
              onClick={() => navigate('/contact')}
              style={{ 
                ...navLink, 
                fontFamily: 'Lato, sans-serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#333',
                textDecoration: 'none'
              }}
            >
              Contact
            </button>
          </div>

          {/* Mobile hamburger menu */}
          <button 
            className="nav-mobile"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'none',
              border: 'none',
              fontSize: '24px',
              cursor: 'pointer',
              padding: '8px'
            }}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className="mobile-menu" style={{ display: 'none' }}>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            <button
              onClick={() => {
                navigate('/application');
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                textAlign: 'left',
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                cursor: 'pointer'
              }}
            >
              Start Application
            </button>
            <button
              onClick={() => {
                navigate('/services');
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                textAlign: 'left',
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                cursor: 'pointer'
              }}
            >
              Services
            </button>
            <button
              onClick={() => {
                navigate('/about');
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                textAlign: 'left',
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                cursor: 'pointer'
              }}
            >
              About
            </button>
            <button
              onClick={() => {
                navigate('/contact');
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                textAlign: 'left',
                fontSize: '16px',
                fontWeight: '600',
                color: '#333',
                cursor: 'pointer'
              }}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
