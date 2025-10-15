
import React, { useState, useEffect } from "react";
// import Header from "./Header";
import { layout, section, card, button as buttonStyle } from "../../../styles/sharedStyles";
import { ChatTab } from "../../cases";
import { API_BASE_URL } from "../../../lib/config";

function CollaboratorProfilePage({ user, onHome, onLogout, onSelectCase }) {
  const [tab, setTab] = useState("cases");
  const [cases, setCases] = useState([]);

  useEffect(() => {
    // Fetch cases assigned to this collaborator
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    const headers = storedUser && storedUser.token ? { Authorization: `Bearer ${storedUser.token}` } : {};
    
    fetch(`${API_BASE_URL}/collaborators/${String(user.id)}/cases`, { headers })
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        // Ensure data is always an array
        setCases(Array.isArray(data) ? data : []);
      })
      .catch(error => {
        console.error('Error fetching collaborator cases:', error);
        setCases([]); // Set empty array on error
      });
  }, [String(user.id)]);

  return (
    <div style={layout}>
      <style>{`
        .profile-layout {
          display: flex;
          align-items: stretch;
          justify-content: flex-start;
          min-height: 100vh;
          width: 100%;
          gap: 0;
        }
        .profile-sidebar {
          background: #fff;
          border-radius: 18px 0 0 18px;
          box-shadow: 0 2px 8px #e0e0e0;
          padding: 40px 0 40px 0;
          width: 30vw;
          min-width: 220px;
          max-width: 420px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          margin-right: 0;
          min-height: 100%;
        }
        .profile-nav-btn {
          background: #fff;
          color: #0070f3;
          border: none;
          border-left: 4px solid transparent;
          border-radius: 0;
          padding: 18px 24px;
          font-weight: 700;
          font-size: 17px;
          text-align: left;
          cursor: pointer;
          transition: background 0.15s, color 0.15s, border-color 0.15s;
        }
        .profile-nav-btn.active {
          background: #eaf4ff;
          color: #0070f3;
          border-left: 4px solid #0070f3;
        }
        .profile-main-content {
          flex: 1 1 0;
          min-width: 0;
          background: #fff;
          border-radius: 0 18px 18px 0;
          box-shadow: 0 2px 8px #e0e0e0;
          padding: 40px;
          width: 70vw;
          max-width: 900px;
        }
      `}</style>
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <button
            className={`profile-nav-btn${tab === 'cases' ? ' active' : ''}`}
            onClick={() => setTab('cases')}
          >
            Cases
          </button>
          <button
            className={`profile-nav-btn${tab === 'messages' ? ' active' : ''}`}
            onClick={() => setTab('messages')}
          >
            Messages
          </button>
          <button
            className="profile-nav-btn"
            onClick={onHome}
          >
            Home
          </button>
        </aside>
        <main className="profile-main-content">
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, color: '#0070f3', textAlign: 'center' }}>Welcome, {user?.username}!</h1>
          <p style={{ color: '#666', marginTop: 0, textAlign: 'center', marginBottom: 32 }}>User type: {user?.user_type}</p>
          {tab === 'cases' && (
            <section style={{ ...section, justifyContent: 'center', gap: 32 }}>
              <div style={{ ...card, width: 600, textAlign: 'center', boxShadow: '0 2px 8px #e0e0e0', margin: '0 auto' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0070f3' }}>Assigned Cases</h2>
                {!cases || cases.length === 0 ? (
                  <div>No cases assigned.</div>
                ) : (
                  <ul style={{ listStyle: 'none', padding: 0 }}>
                    {(Array.isArray(cases) ? cases : []).map(c => (
                      <li key={c.id} style={{ background: '#fff', marginBottom: 16, borderRadius: 8, boxShadow: '0 2px 8px #e0e0e0', padding: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <div style={{ fontWeight: 600 }}>Case #{c.id}</div>
                          <div>Status: {c.status}</div>
                        </div>
                        <button style={{ background: '#0070f3', color: '#fff', border: 'none', borderRadius: 6, padding: '8px 16px', fontWeight: 600, cursor: 'pointer' }} onClick={() => onSelectCase(c.id)}>View</button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          )}
          {tab === 'messages' && (
            <div style={{ marginTop: 24 }}>
              <ChatTab user={user} />
            </div>
          )}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <button style={{ ...buttonStyle, background: '#fff', color: '#0070f3', border: '1px solid #0070f3', borderRadius: 8, fontWeight: 700, fontSize: 16 }} onClick={onHome}>Back to Home</button>
          </div>
        </main>
      </div>
    </div>
  );
}

export default CollaboratorProfilePage;
