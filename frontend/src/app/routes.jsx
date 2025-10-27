import React from "react";
import { Routes, Route } from "react-router-dom";

// Feature imports
// COMMENTED OUT: Auth and NIF services
// import { LoginPage, RegisterPage, AuthGuard } from "../features/auth";
// import { CasePage } from "../features/cases";
// import { ProfilePage, CollaboratorApp } from "../features/profile";
// import { GetNifPage, NifServicePage, NifServicePresentationPage, BankAccountService, VisaGuidanceService } from "../features/business-services";

// Shared component imports
import { HomePage, ContactPage } from "../components";

// New page imports
import DocumentChecklistPage from "../components/pages/DocumentChecklistPage";
import SettlementServicesPage from "../components/pages/SettlementServicesPage";
import AboutPage from "../components/pages/AboutPage";
import PaymentPage from "../components/pages/PaymentPage";
import PaymentSuccessPage from "../components/pages/PaymentSuccessPage";
import PrivacyPolicyPage from "../components/pages/PrivacyPolicyPage";
import TermsOfServicePage from "../components/pages/TermsOfServicePage";
import CookiePolicyPage from "../components/pages/CookiePolicyPage";

const AppRoutes = ({ navigate }) => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      
      {/* New page routes */}
      <Route path="/documents" element={<DocumentChecklistPage />} />
      <Route path="/services" element={<SettlementServicesPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/payment" element={<PaymentPage />} />
      <Route path="/payment-success" element={<PaymentSuccessPage />} />
      <Route path="/privacy" element={<PrivacyPolicyPage />} />
      <Route path="/terms" element={<TermsOfServicePage />} />
      <Route path="/cookies" element={<CookiePolicyPage />} />
      
      <Route path="/contact" element={<ContactPage />} />
      
      {/* COMMENTED OUT: Auth routes */}
      {/* <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} /> */}
      
      {/* COMMENTED OUT: Protected Routes */}
      {/* <Route path="/getnif" element={
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
      } /> */}
      
      {/* COMMENTED OUT: Public Service Routes */}
      {/* <Route path="/services/nif" element={<NifServicePage />} />
      <Route path="/services/getnif" element={<NifServicePresentationPage />} />
      <Route path="/services/bank-account" element={<BankAccountService />} />
      <Route path="/services/visa-guidance" element={<VisaGuidanceService />} /> */}
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;