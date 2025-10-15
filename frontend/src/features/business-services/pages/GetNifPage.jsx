import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../../../lib/config";
import { PaymentFormWidget } from "../../payments";

// Helper to get JWT token from localStorage
function getAuthHeaders() {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
}
import { layout, card, button as buttonStyle, section } from "../../../styles/sharedStyles";
// import Header from "./Header";

const steps = [
  { title: "Payment", description: "Pay for your NIF application service." },
  { title: "Upload Documents", description: "Upload the required documents for your NIF application." },
  { title: "Review by Collaborator", description: "A collaborator will review your documents and process your case." },
  { title: "Sent to Local Offices", description: "Your case is being processed at the local offices." },
  { title: "NIF Issued", description: "Receive your Portuguese NIF." }
];

// Service pricing
const NIF_SERVICE_PRICE = 4999; // €49.99 in cents



function GetNifPage({ user, onBack, caseId: propCaseId, onLogout }) {
  const [currentStep, setCurrentStep] = useState(propCaseId ? 1 : 0); // Start at payment if new, or documents if existing case
  const [passportFile, setPassportFile] = useState(null);
  const [addressFile, setAddressFile] = useState(null);
  const [caseCreated, setCaseCreated] = useState(!!propCaseId);
  const [caseStatus, setCaseStatus] = useState('uploaded');
  const [caseData, setCaseData] = useState(null);
  const [error, setError] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [collaboratorUsername, setCollaboratorUsername] = useState(null);
  const [paymentCompleted, setPaymentCompleted] = useState(!!propCaseId); // True if existing case
  const [paymentIntent, setPaymentIntent] = useState(null);
  const navigate = useNavigate();

  // Authentication guard
  useEffect(() => {
    if (!user) {
      console.log('[GetNifPage] User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
  }, [user, navigate]);

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

  // Payment handlers
  const handlePaymentSuccess = (paymentIntentData) => {
    setPaymentIntent(paymentIntentData);
    setPaymentCompleted(true);
    setCurrentStep(1); // Move to document upload step
    setError(null);
  };

  const handlePaymentError = (error) => {
    setError(`Payment failed: ${error.message}`);
  };

  const handlePaymentCancel = () => {
    // User can go back to previous page or stay on payment step
    setError(null);
  };

  const handleNext = async () => {
    if (propCaseId) return; // Disable next for read-only view
    
    if (currentStep === 0) {
      // Payment step - should be handled by PaymentForm component
      return;
    } else if (currentStep === 1 && !caseCreated) {
      // Document upload step - create case after payment
      if (!paymentCompleted) {
        setError("Please complete payment first.");
        return;
      }
      if (!passportFile || !addressFile) {
        setError("Please upload both required documents.");
        return;
      }
      // Create case in backend and assign collaborator
      try {
        const res = await fetch(`${API_BASE_URL}/cases`, {
          method: "POST",
          headers: { "Content-Type": "application/json", ...getAuthHeaders() },
          body: JSON.stringify({ 
            user_id: String(user.id),
            payment_intent_id: paymentIntent?.id
          })
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
    } else if (currentStep === 2 && caseStatus !== 'reviewed') {
      // Block progress past review if not reviewed (step indices shifted by 1 due to payment step)
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
        // Set step based on status (adjusted for payment step at index 0)
        if (caseData.status === "uploaded") setCurrentStep(2); // Review step
        else if (caseData.status === "reviewed") setCurrentStep(3); // Local offices step
        else setCurrentStep(1); // Document upload step (payment already completed for existing cases)
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
          {/* Payment Step */}
          {currentStep === 0 && !paymentCompleted && (
            <div style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ color: '#333', marginBottom: 8 }}>NIF Application Service</h3>
                <p style={{ color: '#666', marginBottom: 16 }}>
                  Our professional team will handle your Portuguese NIF application process from start to finish.
                </p>
                <div style={{ 
                  backgroundColor: '#f8f9fa', 
                  padding: 16, 
                  borderRadius: 8, 
                  marginBottom: 24,
                  border: '1px solid #e9ecef'
                }}>
                  <h4 style={{ margin: '0 0 8px 0', color: '#0070f3' }}>Service Price: €{(NIF_SERVICE_PRICE / 100).toFixed(2)}</h4>
                  <p style={{ margin: 0, fontSize: 14, color: '#666' }}>
                    ✓ Document verification<br/>
                    ✓ Professional review<br/>
                    ✓ Direct submission to Portuguese authorities<br/>
                    ✓ Status updates throughout the process
                  </p>
                </div>
              </div>
              <PaymentFormWidget
                amount={NIF_SERVICE_PRICE}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
                onCancel={handlePaymentCancel}
              />
            </div>
          )}
          {/* Document Upload Step */}
          {currentStep === 1 && (
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
              {/* Show payment status for existing cases */}
              {propCaseId && caseData && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ 
                    padding: 12, 
                    backgroundColor: caseData.payment_verified ? '#e8f5e8' : '#fff3cd', 
                    border: `1px solid ${caseData.payment_verified ? '#4caf50' : '#ffc107'}`,
                    borderRadius: 6,
                    fontSize: 14
                  }}>
                    <strong>Payment Status:</strong>{' '}
                    {caseData.payment_verified ? (
                      <span style={{ color: '#2e7d32' }}>
                        ✓ Paid €{caseData.payment_amount ? (caseData.payment_amount / 100).toFixed(2) : 'N/A'}
                      </span>
                    ) : (
                      <span style={{ color: '#f57c00' }}>⚠ Payment verification pending</span>
                    )}
                  </div>
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
          {/* Review Step */}
          {currentStep === 2 && (
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
          {/* Local Offices Step */}
          {currentStep === 3 && (
            <div style={{ color: '#ff9800', margin: '12px 0' }}>
              Your case is being processed at the local offices.
            </div>
          )}
          {/* NIF Issued Step */}
          {currentStep === 4 && (
            <div style={{ color: 'green', margin: '12px 0' }}>
              Your NIF will be issued soon!
            </div>
          )}
        </div>
        {currentStep < steps.length - 1 && !propCaseId && (
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            {/* Only show Next button for document upload step - payment is handled by PaymentForm */}
            {currentStep === 1 && (
              <>
                <button
                  style={{ 
                    ...buttonStyle, 
                    padding: '10px 20px', 
                    borderRadius: 6, 
                    fontWeight: 600, 
                    cursor: (!passportFile || !addressFile) ? 'not-allowed' : 'pointer', 
                    opacity: (!passportFile || !addressFile) ? 0.5 : 1 
                  }}
                  onClick={handleNext}
                  disabled={!passportFile || !addressFile}
                >
                  Next
                </button>
                {(!passportFile || !addressFile) && (
                  <div style={{ color: '#d32f2f', marginTop: 8 }}>Please upload both required documents to continue.</div>
                )}
              </>
            )}
            {currentStep === 2 && caseStatus !== 'reviewed' && (
              <div style={{ color: '#d32f2f', marginTop: 8 }}>A collaborator must review your case before you can continue.</div>
            )}
          </div>
        )}
  </div>
    </div>
  );
}

export default GetNifPage;
