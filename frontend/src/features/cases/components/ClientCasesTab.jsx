import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../../lib";

function ClientCasesTab({ user, onSelectCase }) {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchCases() {
      setLoading(true);
      setError("");
      try {
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  const headers = storedUser && storedUser.token ? { Authorization: `Bearer ${storedUser.token}` } : {};
  const res = await fetch(`${API_BASE_URL}/users/${String(user.id)}/cases`, { headers });
        if (!res.ok) throw new Error("Could not fetch cases");
        const data = await res.json();
        setCases(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    }
    fetchCases();
  }, [String(user.id)]);

  if (loading) return <div>Loading cases...</div>;
  if (error) return <div style={{ color: 'red' }}>{error}</div>;

  return (
    <div>
      <h2>Your Cases</h2>
      {cases.length === 0 ? (
        <div>No cases found.</div>
      ) : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {cases.map(c => (
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
  );
}

export default ClientCasesTab;
