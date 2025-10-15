import React from "react";
import { Routes, Route } from "react-router-dom";

// Feature imports
import { LoginPage, RegisterPage, AuthGuard } from "../features/auth";
import { CasePage } from "../features/cases";
import { ProfilePage, CollaboratorApp } from "../features/profile";
import { GetNifPage, NifServicePage, NifServicePresentationPage, BankAccountService } from "../features/business-services";

// Shared component imports
import { HomePage, ContactPage } from "../components";

const AppRoutes = ({ user, setUser, navigate }) => {
  return (
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
  );
};

export default AppRoutes;