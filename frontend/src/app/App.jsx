
import React from "react";
import { useNavigate } from "react-router-dom";

// COMMENTED OUT: Firebase Authentication Provider
// import AuthProvider from "./providers/AuthProvider";

// App routing
import AppRoutes from "./routes";

// Shared component imports
import { Header } from "../components";

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
    </div>
  );
}

export default App;
