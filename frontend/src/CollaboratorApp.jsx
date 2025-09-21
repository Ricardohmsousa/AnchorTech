import React, { useState } from "react";

import Header from "./Header";
import CollaboratorProfilePage from "./CollaboratorProfilePage";
import CasePage from "./CasePage";


function CollaboratorApp({ user, onHome, onLogout }) {
  const [page, setPage] = useState("profile");
  const [selectedCaseId, setSelectedCaseId] = useState(null);

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
