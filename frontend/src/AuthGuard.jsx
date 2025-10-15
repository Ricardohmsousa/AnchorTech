import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthGuard = ({ children, user, redirectTo = '/login' }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is not logged in
    if (!user) {
      console.log('[AuthGuard] User not authenticated, redirecting to login');
      navigate(redirectTo);
      return;
    }

    // Check if user data is invalid (missing required fields)
    if (!user.id || !user.username || !user.user_type) {
      console.log('[AuthGuard] Invalid user data, redirecting to login');
      localStorage.removeItem('user'); // Clear invalid user data
      navigate(redirectTo);
      return;
    }

    console.log('[AuthGuard] User authenticated:', user.username, user.user_type);
  }, [user, navigate, redirectTo]);

  // Don't render children if user is not authenticated
  if (!user || !user.id || !user.username || !user.user_type) {
    return <div>Redirecting to login...</div>;
  }

  return children;
};

export default AuthGuard;