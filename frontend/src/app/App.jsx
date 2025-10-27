
import React from "react";
import { useNavigate } from "react-router-dom";

// Analytics
import { usePageTracking } from "../hooks/useAnalytics";

// COMMENTED OUT: Firebase Authentication Provider
// import AuthProvider from "./providers/AuthProvider";

// App routing
import AppRoutes from "./routes";

// Shared component imports
import { Header, CookieConsent } from "../components";

function App() {
  return (
    // COMMENTED OUT: AuthProvider wrapper
    // <AuthProvider>
      <AppContent />
    // </AuthProvider>
  );
}

function AppContent() {
  const navigate = useNavigate();
  
  // Track page views automatically
  usePageTracking();

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        /* COMMENTED OUT: Auth functionality */
        /* onLogin={() => navigate("/login")}
        onLogout={() => navigate("/")} */
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AppRoutes navigate={navigate} />
      </div>
      <CookieConsent />
    </div>
  );
}

export default App;
