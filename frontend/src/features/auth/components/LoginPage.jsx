import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { layout, card, button as buttonStyle } from "../../../styles/sharedStyles";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showResetForm, setShowResetForm] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");
  
  const { login, loginWithGoogle, resetPassword, error, clearError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    
    try {
      await login(email, password);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    clearError();
    
    try {
      await loginWithGoogle();
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    setResetMessage("");
    
    try {
      await resetPassword(resetEmail);
      setResetMessage("Password reset email sent! Check your inbox.");
      setShowResetForm(false);
      setResetEmail("");
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  if (showResetForm) {
    return (
      <div style={layout}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
          <form onSubmit={handlePasswordReset} style={{ ...card, minWidth: 340, maxWidth: 400, width: '100%' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 24, color: '#0070f3', textAlign: 'center' }}>Reset Password</h1>
            
            <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={e => setResetEmail(e.target.value)}
              style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
              required
              autoFocus
            />
            
            {error && <div style={{ color: "#d32f2f", marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{error}</div>}
            {resetMessage && <div style={{ color: "#10b981", marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{resetMessage}</div>}
            
            <button 
              type="submit" 
              disabled={isLoading}
              style={{ 
                ...buttonStyle, 
                width: "100%", 
                padding: 14, 
                fontSize: 18, 
                fontWeight: 700, 
                marginBottom: 12,
                opacity: isLoading ? 0.7 : 1,
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? 'Sending...' : 'Send Reset Email'}
            </button>
            
            <div style={{ textAlign: "center", marginTop: 8 }}>
              <button 
                type="button" 
                style={{ background: "none", color: "#0070f3", border: "none", cursor: "pointer", textDecoration: "underline", fontWeight: 700, fontSize: 15 }} 
                onClick={() => {
                  setShowResetForm(false);
                  clearError();
                  setResetMessage("");
                }}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div style={layout}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} style={{ ...card, minWidth: 340, maxWidth: 400, width: '100%' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 24, color: '#0070f3', textAlign: 'center' }}>Sign in to your account</h1>
          
          <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
            required
            autoFocus
          />
          
          <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
            required
          />
          
          {error && <div style={{ color: "#d32f2f", marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{error}</div>}
          {resetMessage && <div style={{ color: "#10b981", marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{resetMessage}</div>}
          
          <button 
            type="submit" 
            disabled={isLoading}
            style={{ 
              ...buttonStyle, 
              width: "100%", 
              padding: 14, 
              fontSize: 18, 
              fontWeight: 700, 
              marginBottom: 12,
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          {/* Google Sign In Button */}
          <button 
            type="button"
            onClick={handleGoogleLogin}
            disabled={isLoading}
            style={{ 
              width: "100%", 
              padding: 14, 
              fontSize: 16, 
              fontWeight: 600, 
              marginBottom: 16,
              backgroundColor: '#fff',
              border: '2px solid #e5e7eb',
              borderRadius: 8,
              cursor: isLoading ? 'not-allowed' : 'pointer',
              opacity: isLoading ? 0.7 : 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <span style={{ fontSize: '18px' }}>🔍</span>
            Continue with Google
          </button>
          
          <div style={{ textAlign: "center", marginBottom: 16 }}>
            <button 
              type="button" 
              style={{ background: "none", color: "#0070f3", border: "none", cursor: "pointer", textDecoration: "underline", fontWeight: 600, fontSize: 14 }} 
              onClick={() => {
                setShowResetForm(true);
                clearError();
              }}
            >
              Forgot your password?
            </button>
          </div>
          
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span style={{ color: '#444', fontSize: 15 }}>Don't have an account? </span>
            <Link 
              to="/register"
              style={{ color: "#0070f3", textDecoration: "underline", fontWeight: 700, fontSize: 15 }}
            >
              Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
