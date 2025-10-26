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
  const navigate = useNavigate();
  
  const handleHomeNavigation = () => {
    navigate('/');
  };
  
  return (
    <nav style={navBar}>
      <div
        style={{ fontFamily: 'Lato, sans-serif', fontWeight: 900, fontSize: 28, color: '#0070f3', letterSpacing: 1, cursor: 'pointer' }}
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
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
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
              <a href="/services/getnif" style={{ ...navLink, display: 'block', padding: '12px 20px' }} onClick={() => setServicesOpen(false)}>Get NIF</a>
              <a href="/services/bank-account" style={{ ...navLink, display: 'block', padding: '12px 20px' }} onClick={() => setServicesOpen(false)}>Get Bank Account</a>
            </div>
          )}
        </div>
  <a href="/contact" style={{ ...navLink, fontFamily: 'Lato, sans-serif' }}>Contact</a>
        {/* COMMENTED OUT: Firebase Auth Login/Logout Logic */}
        {/* {isAuthenticated && currentUser ? (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              style={{ ...buttonStyle, marginLeft: 16 }}
              onClick={() => setAccountOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={accountOpen}
            >
              {`Hi, ${currentUser.displayName || currentUser.email?.split('@')[0] || 'User'}`}
            </button>
            {accountOpen && (
              <div
                className="services-dropdown open"
                style={{
                  position: 'absolute',
                  top: '110%',
                  right: 0,
                  background: '#fff',
                  boxShadow: '0 2px 8px #e0e0e0',
                  borderRadius: 8,
                  minWidth: 140,
                  zIndex: 100,
                }}
                tabIndex={-1}
                onBlur={e => {
                  if (!e.currentTarget.contains(e.relatedTarget)) setAccountOpen(false);
                }}
              >
                <button
                  style={{ ...buttonStyle, width: '100%', background: 'none', color: '#0070f3', border: 'none', borderRadius: 0, boxShadow: 'none', textAlign: 'left', padding: '12px 20px', fontWeight: 600, cursor: 'pointer' }}
                  onClick={() => {
                    setAccountOpen(false);
                    window.location.pathname = '/profile';
                  }}
                >
                  Profile
                </button>
                <button
                  style={{ ...buttonStyle, width: '100%', background: 'none', color: '#d32f2f', border: 'none', borderRadius: 0, boxShadow: 'none', textAlign: 'left', padding: '12px 20px', fontWeight: 600, cursor: 'pointer' }}
                  onClick={async () => {
                    setAccountOpen(false);
                    try {
                      await logout();
                      if (onLogout) onLogout();
                    } catch (error) {
                      console.error('Logout failed:', error);
                    }
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <button style={{ ...buttonStyle, marginLeft: 16 }} onClick={onLogin}>
            Login
          </button>
        )} */}
      </div>
    </nav>
  );
}
