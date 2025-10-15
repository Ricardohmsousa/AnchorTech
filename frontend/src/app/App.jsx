
import React, { useState, useEffect } from "react";

// App routing
import AppRoutes from "./routes";

// Shared component imports
import { Header } from "../components";

import { useNavigate } from "react-router-dom";




function App() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header
        user={user}
        onLogin={() => {
          if (user) navigate("/profile");
          else navigate("/login");
        }}
        onLogout={() => {
          setUser(null);
          navigate("/");
        }}
      />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <AppRoutes 
          user={user} 
          setUser={setUser} 
          navigate={navigate} 
        />
      </div>
    </div>
  );
}

export default App;
