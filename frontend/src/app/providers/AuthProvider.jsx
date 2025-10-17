// Firebase Authentication Context Provider
import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../../services/firebase';

// Create Authentication Context
const AuthContext = createContext();

// Custom hook to use authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Authentication Provider Component
export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [backendUser, setBackendUser] = useState(null);
  const [jwtToken, setJwtToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Authentication functions
  const register = async (email, password, displayName) => {
    setError(null);
    const result = await authService.registerWithEmailAndPassword(email, password, displayName);
    
    if (!result.success) {
      const errorMessage = authService.getErrorMessage(result.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
    
    // Store JWT token and backend user data
    if (result.jwt && result.backendUser) {
      setJwtToken(result.jwt);
      setBackendUser(result.backendUser);
      localStorage.setItem('jwt_token', result.jwt);
      localStorage.setItem('backend_user', JSON.stringify(result.backendUser));
    }
    
    return result;
  };

  const login = async (email, password) => {
    setError(null);
    const result = await authService.signInWithEmailAndPassword(email, password);
    
    if (!result.success) {
      const errorMessage = authService.getErrorMessage(result.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
    
    // Store JWT token and backend user data
    if (result.jwt && result.backendUser) {
      setJwtToken(result.jwt);
      setBackendUser(result.backendUser);
      localStorage.setItem('jwt_token', result.jwt);
      localStorage.setItem('backend_user', JSON.stringify(result.backendUser));
    }
    
    return result;
  };

  const loginWithGoogle = async () => {
    setError(null);
    const result = await authService.signInWithGoogle();
    
    if (!result.success) {
      const errorMessage = authService.getErrorMessage(result.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
    
    // Store JWT token and backend user data
    if (result.jwt && result.backendUser) {
      setJwtToken(result.jwt);
      setBackendUser(result.backendUser);
      localStorage.setItem('jwt_token', result.jwt);
      localStorage.setItem('backend_user', JSON.stringify(result.backendUser));
    }
    
    return result;
  };

  const logout = async () => {
    setError(null);
    const result = await authService.signOut();
    
    if (!result.success) {
      setError(result.error);
      throw new Error(result.error);
    }
    
    // Clear stored tokens and user data
    setJwtToken(null);
    setBackendUser(null);
    localStorage.removeItem('jwt_token');
    localStorage.removeItem('backend_user');
    
    return result;
  };

  const resetPassword = async (email) => {
    setError(null);
    const result = await authService.resetPassword(email);
    
    if (!result.success) {
      const errorMessage = authService.getErrorMessage(result.code);
      setError(errorMessage);
      throw new Error(errorMessage);
    }
    
    return result;
  };

  // Clear error function
  const clearError = () => {
    setError(null);
  };

  // Listen to authentication state changes
  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(async (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL
        });
        
        // Try to restore JWT token and backend user from localStorage
        const storedToken = localStorage.getItem('jwt_token');
        const storedBackendUser = localStorage.getItem('backend_user');
        
        if (storedToken && storedBackendUser) {
          setJwtToken(storedToken);
          setBackendUser(JSON.parse(storedBackendUser));
        } else {
          // If no stored token, get a fresh one
          try {
            const firebaseToken = await user.getIdToken();
            const backendAuth = await authService.exchangeFirebaseTokenForJWT(firebaseToken);
            setJwtToken(backendAuth.jwt);
            setBackendUser(backendAuth.user);
            localStorage.setItem('jwt_token', backendAuth.jwt);
            localStorage.setItem('backend_user', JSON.stringify(backendAuth.user));
          } catch (error) {
            console.error('Failed to get backend JWT:', error);
          }
        }
      } else {
        setCurrentUser(null);
        setJwtToken(null);
        setBackendUser(null);
        localStorage.removeItem('jwt_token');
        localStorage.removeItem('backend_user');
      }
      setLoading(false);
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  // Context value
  const value = {
    currentUser,
    backendUser,
    jwtToken,
    loading,
    error,
    register,
    login,
    loginWithGoogle,
    logout,
    resetPassword,
    clearError,
    isAuthenticated: !!currentUser
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;