import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../app/providers/AuthProvider";
import { layout, card, button as buttonStyle } from "../../../styles/sharedStyles";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [validationError, setValidationError] = useState("");
  
  const { register, loginWithGoogle, error, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    if (password !== confirmPassword) {
      setValidationError("Passwords don't match");
      return false;
    }
    if (password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return false;
    }
    setValidationError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    clearError();
    setValidationError("");
    
    if (!validateForm()) {
      setIsLoading(false);
      return;
    }
    
    try {
      await register(email, password, displayName);
      navigate('/'); // Redirect to home page after successful registration
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    clearError();
    setValidationError("");
    
    try {
      await loginWithGoogle();
      navigate('/'); // Redirect to home page after successful registration
    } catch (err) {
      // Error is handled by AuthContext
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={layout}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} style={{ ...card, minWidth: 340, maxWidth: 400, width: '100%' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 24, color: '#E2725B', textAlign: 'center' }}>Create your account</h1>
          
          <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Full Name</label>
          <input
            type="text"
            placeholder="Enter your full name"
            value={displayName}
            onChange={e => setDisplayName(e.target.value)}
            style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
            autoFocus
          />
          
          <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
            required
          />
          
          <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password (min 6 characters)"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
            required
          />
          
          <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Confirm Password</label>
          <input
            type="password"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
            required
          />
          
          {(error || validationError) && (
            <div style={{ color: "#d32f2f", marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>
              {validationError || error}
            </div>
          )}
          
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
            {isLoading ? 'Creating account...' : 'Create Account'}
          </button>

          {/* Google Sign Up Button */}
          <button 
            type="button"
            onClick={handleGoogleSignUp}
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
          
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span style={{ color: '#444', fontSize: 15 }}>Already have an account? </span>
            <Link 
              to="/login"
              style={{ color: "#E2725B", textDecoration: "underline", fontWeight: 700, fontSize: 15 }}
            >
              Sign In
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
