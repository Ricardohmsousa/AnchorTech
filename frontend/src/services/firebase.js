// Firebase v9 configuration and authentication service
import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth';
import { FIREBASE_CONFIG } from '../config';

// Initialize Firebase
const app = initializeApp(FIREBASE_CONFIG);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Authentication service functions
export const authService = {
  // Register new user with email and password
  async registerWithEmailAndPassword(email, password, displayName = '') {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update user profile with display name if provided
      if (displayName) {
        await updateProfile(user, { displayName });
      }
      
      // Get Firebase ID token and exchange for your backend JWT
      const firebaseToken = await user.getIdToken();
      const backendAuth = await this.exchangeFirebaseTokenForJWT(firebaseToken);
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || displayName,
          emailVerified: user.emailVerified
        },
        jwt: backendAuth.jwt, // Your backend JWT token
        backendUser: backendAuth.user // Your backend user data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  // Sign in with email and password
  async signInWithEmailAndPassword(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Get Firebase ID token and exchange for your backend JWT
      const firebaseToken = await user.getIdToken();
      const backendAuth = await this.exchangeFirebaseTokenForJWT(firebaseToken);
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified
        },
        jwt: backendAuth.jwt, // Your backend JWT token
        backendUser: backendAuth.user // Your backend user data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  // Sign in with Google
  async signInWithGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Get Firebase ID token and exchange for your backend JWT
      const firebaseToken = await user.getIdToken();
      const backendAuth = await this.exchangeFirebaseTokenForJWT(firebaseToken);
      
      return {
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          emailVerified: user.emailVerified,
          photoURL: user.photoURL
        },
        jwt: backendAuth.jwt, // Your backend JWT token
        backendUser: backendAuth.user // Your backend user data
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  // Sign out
  async signOut() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error.message,
        code: error.code
      };
    }
  },

  // Get current user
  getCurrentUser() {
    return auth.currentUser;
  },

  // Listen to authentication state changes
  onAuthStateChanged(callback) {
    return onAuthStateChanged(auth, callback);
  },

  // Exchange Firebase ID token for your backend JWT
  async exchangeFirebaseTokenForJWT(firebaseToken) {
    try {
      const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shimmering-communication-production.up.railway.app';
      
      const response = await fetch(`${API_BASE_URL}/firebase-auth`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${firebaseToken}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to authenticate with backend');
      }

      const data = await response.json();
      return {
        jwt: data.access_token,
        user: data.user
      };
    } catch (error) {
      console.error('Backend auth failed:', error);
      throw error;
    }
  },

  // Helper function to get user-friendly error messages
  getErrorMessage(errorCode) {
    const errorMessages = {
      'auth/user-not-found': 'No account found with this email address.',
      'auth/wrong-password': 'Incorrect password. Please try again.',
      'auth/email-already-in-use': 'An account with this email already exists.',
      'auth/weak-password': 'Password should be at least 6 characters.',
      'auth/invalid-email': 'Please enter a valid email address.',
      'auth/too-many-requests': 'Too many failed attempts. Please try again later.',
      'auth/network-request-failed': 'Network error. Please check your connection.',
      'auth/popup-closed-by-user': 'Sign-in popup was closed. Please try again.',
      'auth/cancelled-popup-request': 'Sign-in was cancelled. Please try again.',
    };

    return errorMessages[errorCode] || 'An unexpected error occurred. Please try again.';
  }
};

export default authService;