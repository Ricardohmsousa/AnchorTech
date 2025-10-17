import React from "react";
import { Routes, Route } from "react-router-dom";

// Feature imports
import { LoginPage, RegisterPage, AuthGuard } from "../features/auth";
import { CasePage } from "../features/cases";
import { ProfilePage, CollaboratorApp } from "../features/profile";
import { GetNifPage, NifServicePage, NifServicePresentationPage, BankAccountService, VisaGuidanceService } from "../features/business-services";

// Shared component imports
import { HomePage, ContactPage } from "../components";

const AppRoutes = ({ navigate }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      
      {/* Protected Routes */}
      <Route path="/getnif" element={
        <AuthGuard>
          <GetNifPage onBack={() => navigate("/profile")} />
        </AuthGuard>
      } />
      <Route path="/profile" element={
        <AuthGuard>
          <ProfilePage onHome={() => navigate("/")} onGetNif={() => navigate("/getnif")} />
        </AuthGuard>
      } />
      <Route path="/case/:caseId" element={
        <AuthGuard>
          <CasePage />
        </AuthGuard>
      } />
      
      {/* Public Service Routes */}
      <Route path="/services/nif" element={<NifServicePage />} />
      <Route path="/services/getnif" element={<NifServicePresentationPage />} />
      <Route path="/services/bank-account" element={<BankAccountService />} />
      <Route path="/services/visa-guidance" element={<VisaGuidanceService />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;