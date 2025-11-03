import React, { useEffect, useState } from "react";
import { layout, navBar, navLink, card, button as buttonStyle } from "../../../styles/sharedStyles";
import { useNavigate, useParams } from "react-router-dom";
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://shimmering-communication-production.up.railway.app';

function CasePage({ user, caseId: propCaseId }) {
  const navigate = useNavigate();
  const params = useParams();
  const caseId = propCaseId || params.caseId;
  const [caseData, setCaseData] = useState(null);
  const [userData, setUserData] = useState(null);
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Authentication guard
  useEffect(() => {
    if (!user) {
      console.log('[CasePage] User not authenticated, redirecting to login');
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  useEffect(() => {
    async function fetchCase() {
      setLoading(true);
      setError("");
      try {
  const user = JSON.parse(localStorage.getItem("user") || "null");
  const headers = user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
  const res = await fetch(`${API_BASE_URL}/cases/${caseId}`, { headers });
        if (!res.ok) throw new Error("Case not found");
        const data = await res.json();
        setCaseData(data);
        // Fetch user info
  const userRes = await fetch(`${API_BASE_URL}/users/${String(data.user_id)}`, { headers });
        if (!userRes.ok) throw new Error("User not found");
        setUserData(await userRes.json());
        // Fetch files for this case
  const filesRes = await fetch(`${API_BASE_URL}/cases/${caseId}/files`, { headers });
        if (filesRes.ok) {
          const filesData = await filesRes.json();
          setFiles(filesData.files || []);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchCase();
  }, [caseId]);

  const handleReview = async () => {
    // Mark case as reviewed
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const headers = user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
    await fetch(`${API_BASE_URL}/cases/${caseId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ status: "reviewed" })
    });
    setCaseData({ ...caseData, status: "reviewed" });
  };

  const handleLocalReview = async () => {
    // Mark case as reviewed by local offices
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const headers = user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
    await fetch(`${API_BASE_URL}/cases/${caseId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ status: "local_reviewed" })
    });
    setCaseData({ ...caseData, status: "local_reviewed" });
  };

  const handleProcess = async () => {
    // Mark case as processed (NIF issued)
    const user = JSON.parse(localStorage.getItem("user") || "null");
    const headers = user && user.token ? { Authorization: `Bearer ${user.token}` } : {};
    await fetch(`${API_BASE_URL}/cases/${caseId}/status`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ status: "processed" })
    });
    setCaseData({ ...caseData, status: "processed" });
  };

  if (loading) return <div style={layout}><div style={{ ...card, maxWidth: 500, margin: '4rem auto', textAlign: 'center' }}>Loading...</div></div>;
  if (error) return <div style={layout}><div style={{ ...card, maxWidth: 500, margin: '4rem auto', color: 'red', textAlign: 'center' }}>{error}</div></div>;

  return (
    <div style={layout}>
        
     
      <main style={{ maxWidth: 600, margin: '2rem auto', ...card, padding: 32 }}>
        <button onClick={() => navigate(-1)} style={{ ...buttonStyle, marginBottom: 16, padding: '8px 16px', borderRadius: 6, fontWeight: 600 }}>Back</button>
        <h2 style={{ color: '#E2725B', fontWeight: 800, marginBottom: 8 }}>Case #{caseData.id}</h2>
        <div style={{ marginBottom: 16 }}>Status: <b>{caseData.status}</b></div>
        <div style={{ margin: '16px 0' }}>
          <h3 style={{ color: '#E2725B', fontWeight: 700 }}>Client Info</h3>
          {userData ? (
            <div>
              <div><b>Username:</b> {userData.username}</div>
              <div><b>User ID:</b> {userData.id}</div>
            </div>
          ) : (
            <div>Loading user info...</div>
          )}
        </div>
        <div style={{ margin: '16px 0' }}>
          <h3 style={{ color: '#E2725B', fontWeight: 700 }}>Documents</h3>
          {files.length === 0 ? (
            <div>No documents uploaded.</div>
          ) : (
            <ul style={{ paddingLeft: 16 }}>
              {files.map((fname) => (
                <li key={fname}>
                  <a href={`${API_BASE_URL}/cases/${caseId}/files/${encodeURIComponent(fname)}`} target="_blank" rel="noopener noreferrer">{fname}</a>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div style={{ margin: '16px 0' }}>
          <h3 style={{ color: '#E2725B', fontWeight: 700 }}>Actions</h3>
          {user && user.user_type === "collaborator" && caseData.status === "uploaded" && (
            <button onClick={handleReview} style={{ ...buttonStyle, background: '#E2725B', color: '#fff', padding: '10px 20px', borderRadius: 6, fontWeight: 600 }}>Mark as Reviewed</button>
          )}
          {user && user.user_type === "collaborator" && caseData.status === "reviewed" && (
            <button onClick={handleLocalReview} style={{ ...buttonStyle, background: '#ff9800', color: '#fff', padding: '10px 20px', borderRadius: 6, fontWeight: 600, marginLeft: 8 }}>Mark as Reviewed by Local Offices</button>
          )}
          {user && user.user_type === "collaborator" && caseData.status === "local_reviewed" && (
            <button onClick={handleProcess} style={{ ...buttonStyle, background: 'green', color: '#fff', padding: '10px 20px', borderRadius: 6, fontWeight: 600, marginLeft: 8 }}>Mark as NIF Issued</button>
          )}
          {caseData.status === "reviewed" && <div>Case has been reviewed. Awaiting local office review.</div>}
          {caseData.status === "local_reviewed" && <div>Case has been reviewed by local offices. Awaiting NIF issuance.</div>}
          {caseData.status === "processed" && <div style={{ color: 'green', fontWeight: 700 }}>NIF has been issued!</div>}
        </div>
      </main>
    </div>
  );
}

export default CasePage;
