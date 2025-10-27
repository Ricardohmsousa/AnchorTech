import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// COMMENTED OUT: Firebase Auth
// import { useAuth } from "../../app/providers/AuthProvider";
import { navBar, navLink, button as buttonStyle } from "../../styles/sharedStyles";

export default function Header({ onLogin, onLogout }) {
  // COMMENTED OUT: Firebase Auth
  // const { currentUser, logout, isAuthenticated } = useAuth();
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
            <button 
              onClick={() => navigate('/services')}
              style={{ 
                ...buttonStyle,
                fontFamily: 'Lato, sans-serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#333',
                textDecoration: 'none',
                fontWeight: 400,
                fontSize: 16,
                padding: '10px 0'
              }}
            >
              Services
            </button>
            <button 
              onClick={() => navigate('/about')}
              style={{ 
                ...navLink, 
                fontFamily: 'Lato, sans-serif',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#333',
                textDecoration: 'none',
                fontWeight: 400,
                fontSize: 16,
                padding: '10px 0'
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
                textDecoration: 'none',
                fontWeight: 400,
                fontSize: 16,
                padding: '10px 0'
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
                navigate('/services');
                setMobileMenuOpen(false);
              }}
              style={{
                background: 'none',
                border: 'none',
                padding: '12px 0',
                textAlign: 'left',
                fontSize: '16px',
                fontWeight: '400',
                color: '#333',
                cursor: 'pointer',
                fontFamily: 'Lato, sans-serif'
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
                fontWeight: '400',
                color: '#333',
                cursor: 'pointer',
                fontFamily: 'Lato, sans-serif'
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
                fontWeight: '400',
                color: '#333',
                cursor: 'pointer',
                fontFamily: 'Lato, sans-serif'
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
