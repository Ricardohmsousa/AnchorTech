
import React, { useState } from "react";
import { layout, card, button as buttonStyle, section } from "./sharedStyles";

import ClientCasesTab from "./ClientCasesTab";
import ChatTab from "./ChatTab";


export default function ProfilePage({ user, onHome, onGetNif, onLogout }) {
  const [tab, setTab] = useState("main");
  const [servicesOpen, setServicesOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [selectedCaseId, setSelectedCaseId] = useState(null);


  // Show case details if a case is selected
  if (selectedCaseId) {
    if (user && user.user_type === "client") {
      const GetNifPage = require("./GetNifPage").default;
  return <GetNifPage user={user} onBack={() => setSelectedCaseId(null)} caseId={String(selectedCaseId)} />;
    } else {
      const CasePage = require("./CasePage").default;
  return <CasePage caseId={String(selectedCaseId)} onBack={() => setSelectedCaseId(null)} user={user} />;
    }
  }

  return (
    <div style={layout}>
      <style>{`
        .services-dropdown { transition: opacity 0.2s; }
        .services-dropdown.open { display: block !important; opacity: 1; }
        .services-dropdown.closed { display: none !important; opacity: 0; }
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
     
      {/* Vertical Sidebar Layout */}
      <div className="profile-layout">
        <aside className="profile-sidebar">
          <button
            className={`profile-nav-btn${tab === 'main' ? ' active' : ''}`}
            onClick={() => setTab('main')}
          >
            Home
          </button>
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
        </aside>
        <main className="profile-main-content">
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 8, color: '#0070f3', textAlign: 'center' }}>Welcome, {user?.username}!</h1>
          <p style={{ color: '#666', marginTop: 0, textAlign: 'center', marginBottom: 32 }}>User type: {user?.user_type}</p>
          {tab === 'main' && (
            <section style={{ ...section, justifyContent: 'center', gap: 32 }}>
              <div style={{ ...card, width: 320, textAlign: 'center', boxShadow: '0 2px 8px #e0e0e0' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0070f3' }}>Get NIF</h2>
                <p style={{ color: '#555', minHeight: 60 }}>Start your process to obtain a Portuguese NIF (tax number).</p>
                <button style={{ ...buttonStyle, padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: 16 }} onClick={onGetNif}>Get NIF</button>
              </div>
              <div style={{ ...card, width: 320, textAlign: 'center', boxShadow: '0 2px 8px #e0e0e0' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0070f3' }}>Get Bank Account</h2>
                <p style={{ color: '#555', minHeight: 60 }}>Open a bank account in Portugal easily and securely.</p>
                <button style={{ ...buttonStyle, padding: '12px 24px', borderRadius: 8, fontWeight: 700, fontSize: 16 }}>Get Bank Account</button>
              </div>
            </section>
          )}
          {tab === 'cases' && (
            <div style={{ marginTop: 24 }}>
              <ClientCasesTab user={user} onSelectCase={setSelectedCaseId} />
            </div>
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


