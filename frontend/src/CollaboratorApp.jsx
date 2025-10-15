import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Header from "./Header";
import CollaboratorProfilePage from "./CollaboratorProfilePage";
import CasePage from "./CasePage";

function CollaboratorApp({ user, onHome, onLogout }) {
  const [page, setPage] = useState("profile");
  const [selectedCaseId, setSelectedCaseId] = useState(null);
  const navigate = useNavigate();

  // Authentication guard
  useEffect(() => {
    if (!user) {
      console.log('[CollaboratorApp] User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
    if (user.user_type !== 'collaborator') {
      console.log('[CollaboratorApp] User is not a collaborator, redirecting to login');
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  if (page === "case" && selectedCaseId) {
    return (
  <CasePage caseId={String(selectedCaseId)} onBack={() => setPage("profile")} user={user} />
    );
  }
  return (
    <CollaboratorProfilePage
      user={user}
      onHome={onHome}
      onLogout={onLogout}
      onSelectCase={id => { setSelectedCaseId(id); setPage("case"); }}
    />
  );
}

export default CollaboratorApp;
