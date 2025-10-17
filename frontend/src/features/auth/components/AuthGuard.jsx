import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../app/providers/AuthProvider';

const AuthGuard = ({ children, redirectTo = '/login' }) => {
  const navigate = useNavigate();
  const { currentUser, loading, isAuthenticated } = useAuth();

  useEffect(() => {
    // Don't redirect if still loading authentication state
    if (loading) {
      return;
    }

    // Check if user is not logged in
    if (!isAuthenticated || !currentUser) {
      console.log('[AuthGuard] User not authenticated, redirecting to login');
      navigate(redirectTo);
      return;
    }

    console.log('[AuthGuard] User authenticated:', currentUser.email);
  }, [currentUser, loading, isAuthenticated, navigate, redirectTo]);

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ 
            width: '40px', 
            height: '40px', 
            border: '4px solid #f3f3f3', 
            borderTop: '4px solid #0070f3', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          Loading...
        </div>
      </div>
    );
  }

  // Don't render children if user is not authenticated
  if (!isAuthenticated || !currentUser) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Redirecting to login...
      </div>
    );
  }

  return children;
};

export default AuthGuard;