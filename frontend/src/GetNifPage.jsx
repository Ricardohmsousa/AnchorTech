import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "./config";

// Helper to get JWT token from localStorage
function getAuthHeaders() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
import { layout, card, button as buttonStyle, section } from "./sharedStyles";
// import Header from "./Header";

const steps = [
  { title: "Upload Documents", description: "Upload the required documents for your NIF application." },
  { title: "Review by Collaborator", description: "A collaborator will review your documents and process your case." },
  { title: "Sent to Local Offices", description: "Your case is being processed at the local offices." },
  { title: "NIF Issued", description: "Receive your Portuguese NIF." }
];



function GetNifPage({ user, onBack, caseId: propCaseId, onLogout }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [passportFile, setPassportFile] = useState(null);
  const [addressFile, setAddressFile] = useState(null);
  const [caseCreated, setCaseCreated] = useState(!!propCaseId);
  const [caseStatus, setCaseStatus] = useState('uploaded');
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collaboratorUsername, setCollaboratorUsername] = useState(null);

  const handlePassportChange = (e) => {
    setPassportFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };
  const handleAddressChange = (e) => {
    setAddressFile(e.target.files && e.target.files[0] ? e.target.files[0] : null);
  };

  // Function to fetch collaborator username by ID
  const fetchCollaboratorUsername = async (collaboratorId) => {
    try {
      const res = await fetch(`${API_BASE_URL}/users/${collaboratorId}`, {
        headers: { ...getAuthHeaders() }
      });
      if (res.ok) {
        const userData = await res.json();
        setCollaboratorUsername(userData.username);
      }
    } catch (err) {
      console.log("Could not fetch collaborator username:", err);
    }
  };

  const handleNext = async () => {
    if (propCaseId) return; // Disable next for read-only view
    if (currentStep === 0 && !caseCreated) {
      if (!passportFile || !addressFile) {
        setError("Please upload both required documents.");
        return;
      }
      // Create case in backend and assign collaborator
      try {
        const res = await fetch(`${API_BASE_URL}/cases`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ user_id: String(user.id) })
        });
        if (!res.ok) throw new Error("Failed to create case");
        const data = await res.json();
        if (!data.id) {
          setError("Case creation failed: missing case ID. Please try again.");
          return;
        }
        setCaseData(data);
        setCaseCreated(true);
        setCaseStatus(data.status);
        setError(null);
        // Fetch collaborator username if assigned
        if (data.collaborator_id) {
          fetchCollaboratorUsername(data.collaborator_id);
        }
        // Upload both files only if case ID is present
        const formData = new FormData();
        formData.append("files", passportFile);
        formData.append("files", addressFile);
        const uploadRes = await fetch(`${API_BASE_URL}/cases/${data.id}/upload`, {
          method: "POST",
          headers: { ...getAuthHeaders() },
          body: formData
        });
        if (!uploadRes.ok) {
          setError("File upload failed. The case will not be created. Please try again.");
          return;
        }
      } catch (err) {
        setError("Could not create case. Please try again.");
        return;
      }
    } else if (currentStep === 1 && caseStatus !== 'reviewed') {
      // Block progress past review if not reviewed
      return;
    }
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  };

  // If viewing an existing case, fetch its data and set step
  useEffect(() => {
    if (propCaseId) {
      setLoading(true);
      Promise.all([
  fetch(`${API_BASE_URL}/cases/${propCaseId}`, { headers: getAuthHeaders() }).then(r => r.json()),
  fetch(`${API_BASE_URL}/cases/${propCaseId}/files`, { headers: getAuthHeaders() }).then(r => r.json())
      ]).then(([caseData, filesData]) => {
        setCaseData(caseData);
        setCaseStatus(caseData.status);
        setFiles(filesData.files || []);
        setCaseCreated(true);
        // Fetch collaborator username if assigned
        if (caseData.collaborator_id) {
          fetchCollaboratorUsername(caseData.collaborator_id);
        }
        // Set step based on status
        if (caseData.status === "uploaded") setCurrentStep(1);
        else if (caseData.status === "reviewed") setCurrentStep(2);
        else setCurrentStep(0);
      }).catch(e => setError("Could not fetch case info")).finally(() => setLoading(false));
    }
  }, [propCaseId]);

  return (
    <div style={layout}>
      <div style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
        {/* Horizontal stepper */}
        {/* Horizontal stepper */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 40 }}>
          {steps.map((step, idx) => (
            <React.Fragment key={step.title}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: idx <= currentStep ? '#0070f3' : '#e0e0e0',
                    color: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: 20,
                    border: idx === currentStep ? '3px solid #0070f3' : '3px solid #e0e0e0',
                    transition: 'background 0.3s, border 0.3s',
                  }}
                >
                  {idx + 1}
                </div>
                <div style={{ marginTop: 8, fontSize: 14, color: idx <= currentStep ? '#0070f3' : '#888', fontWeight: idx === currentStep ? 700 : 500, textAlign: 'center', maxWidth: 100 }}>
                  {step.title}
                </div>
              </div>
              {idx < steps.length - 1 && (
                <div style={{ flex: 1, height: 4, background: idx < currentStep ? '#0070f3' : '#e0e0e0', margin: '0 8px', borderRadius: 2 }} />
              )}
            </React.Fragment>
          ))}
        </div>
        {/* Step content */}
  <div style={{ minHeight: 120, textAlign: 'center', ...card }}>
          <div style={{ fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{steps[currentStep].title}</div>
          <div style={{ color: '#555', marginBottom: 16 }}>{steps[currentStep].description}</div>
          {error && <div style={{ color: 'red', marginBottom: 12 }}>{error}</div>}
          {currentStep === 0 && (
            <div style={{ textAlign: 'left', maxWidth: 520, margin: '0 auto' }}>
              {!propCaseId && (
                <>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
                      Passport or valid ID <span style={{ color: '#d32f2f' }}>*</span>
                    </label>
                    <input type="file" name="passport" accept="image/*,.pdf" style={{ marginBottom: 16 }} onChange={handlePassportChange} />
                  </div>
                  <div style={{ marginBottom: 24 }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: 6 }}>
                      Proof of address outside Portugal <span style={{ color: '#d32f2f' }}>*</span>
                    </label>
                    <input type="file" name="address" accept="image/*,.pdf" style={{ marginBottom: 16 }} onChange={handleAddressChange} />
                  </div>
                </>
              )}
              {caseCreated && caseData && caseData.collaborator_id && (
                <div style={{ marginTop: 12, color: '#0070f3' }}>
                  {collaboratorUsername ? (
                    <span>Assigned Collaborator: <b>{collaboratorUsername}</b></span>
                  ) : (
                    <span>Assigned Collaborator ID: <b>{caseData.collaborator_id}</b></span>
                  )}
                </div>
              )}
              {propCaseId && files.length > 0 && (
                <div style={{ marginTop: 16 }}>
                  <b>Uploaded Documents:</b>
                  <ul style={{ paddingLeft: 16 }}>
                    {files.map(fname => (
                      <li key={fname}>
                        <a href={`${API_BASE_URL}/cases/${propCaseId}/files/${encodeURIComponent(fname)}`} target="_blank" rel="noopener noreferrer">{fname}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          {currentStep === 1 && (
            <div style={{ color: '#0070f3', margin: '12px 0' }}>
              {collaboratorUsername ? (
                <span><b>{collaboratorUsername}</b> is reviewing your docs</span>
              ) : (
                <span>Waiting for collaborator review...</span>
              )}
              {caseData && caseData.collaborator_id && (
                <div style={{ marginTop: 8 }}>
                  Assigned Collaborator ID: <b>{caseData.collaborator_id}</b>
                </div>
              )}
            </div>
          )}
          {currentStep === 2 && (
            <div style={{ color: '#ff9800', margin: '12px 0' }}>
              Your case is being processed at the local offices.
            </div>
          )}
          {currentStep === 3 && (
            <div style={{ color: 'green', margin: '12px 0' }}>
              Your NIF will be issued soon!
            </div>
          )}
        </div>
        {currentStep < steps.length - 1 && !propCaseId && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <button
              style={{ ...buttonStyle, padding: '10px 20px', borderRadius: 6, fontWeight: 600, cursor: (currentStep === 0 && (!passportFile || !addressFile)) || (caseStatus !== 'reviewed' && currentStep === 1) ? 'not-allowed' : 'pointer', opacity: (currentStep === 0 && (!passportFile || !addressFile)) || (caseStatus !== 'reviewed' && currentStep === 1) ? 0.5 : 1 }}
              onClick={handleNext}
              disabled={(currentStep === 0 && (!passportFile || !addressFile)) || (caseStatus !== 'reviewed' && currentStep === 1)}
            >
              Next
            </button>
            {currentStep === 0 && (!passportFile || !addressFile) && (
              <div style={{ color: '#d32f2f', marginTop: 8 }}>Please upload both required documents to continue.</div>
            )}
            {currentStep === 1 && caseStatus !== 'reviewed' && (
              <div style={{ color: '#d32f2f', marginTop: 8 }}>A collaborator must review your case before you can continue.</div>
            )}
          </div>
        )}
  </div>
    </div>
  );
}

export default GetNifPage;
