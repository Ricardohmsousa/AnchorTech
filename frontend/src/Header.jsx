import React, { useState } from "react";
import { navBar, navLink, button as buttonStyle } from "./sharedStyles";

export default function Header({ user, onLogin, onLogout }) {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  return (
    <nav style={navBar}>
      <div
        style={{ fontFamily: 'Inter, sans-serif', fontWeight: 900, fontSize: 28, color: '#0070f3', letterSpacing: 1, cursor: 'pointer' }}
        onClick={() => window.location.pathname = '/'}
        tabIndex={0}
        role="button"
        aria-label="Go to home"
      >
        TechAnchor
      </div>
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <button
            style={{
              ...buttonStyle,
              fontFamily: 'Inter, sans-serif',
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
  <a href="/contact" style={{ ...navLink, fontFamily: 'Inter, sans-serif' }}>Contact</a>
        {user ? (
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <button
              style={{ ...buttonStyle, marginLeft: 16 }}
              onClick={() => setAccountOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={accountOpen}
            >
              {`Hi, ${user.username}`}
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
                  onClick={() => {
                    setAccountOpen(false);
                    if (onLogout) onLogout();
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
        )}
      </div>
    </nav>
  );
}
