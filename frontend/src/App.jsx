
import React, { useState, useEffect } from "react";

import HomePage from "./HomePage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import ProfilePage from "./ProfilePage";
import GetNifPage from "./GetNifPage";
import NifServicePage from "./NifServicePage";
import NifServicePresentationPage from "./services/NifServicePresentationPage";
import CollaboratorApp from "./CollaboratorApp";
import BankAccountService from "./services/BankAccountService";
import CasePage from "./CasePage";
import ContactPage from "./ContactPage";
import AuthGuard from "./AuthGuard";

import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";




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
        <Routes>
          <Route path="/" element={<HomePage user={user} />} />
          <Route path="/login" element={<LoginPage onLogin={data => { setUser(data); navigate("/profile"); }} onRegister={() => navigate("/register")} />} />
          <Route path="/register" element={<RegisterPage onBack={() => navigate("/login")} onRegister={data => { setUser(data); navigate("/profile"); }} />} />
          
          {/* Protected Routes */}
          <Route path="/getnif" element={
            <AuthGuard user={user}>
              <GetNifPage user={user} onBack={() => navigate("/profile")} />
            </AuthGuard>
          } />
          <Route path="/profile" element={
            <AuthGuard user={user}>
              {user && user.user_type === "collaborator"
                ? <CollaboratorApp user={user} onHome={() => navigate("/")} />
                : <ProfilePage user={user} onHome={() => navigate("/")} onGetNif={() => navigate("/getnif")} />
              }
            </AuthGuard>
          } />
          <Route path="/case/:caseId" element={
            <AuthGuard user={user}>
              <CasePage user={user} />
            </AuthGuard>
          } />
          
          {/* Public Routes */}
          <Route path="/services/nif" element={<NifServicePage />} />
          <Route path="/services/getnif" element={<NifServicePresentationPage />} />
          <Route path="/services/bank-account" element={<BankAccountService />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
