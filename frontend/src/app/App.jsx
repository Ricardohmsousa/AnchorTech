
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
import Chatbot from "../components/Chatbot";

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
    <>
      {/* Global CSS Reset */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          margin: 0;
          padding: 0;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
            'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
            sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        html {
          margin: 0;
          padding: 0;
        }

        #root {
          margin: 0;
          padding: 0;
        }
      `}</style>

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
        <Chatbot />
      </div>
    </>
  );
}

export default App;
