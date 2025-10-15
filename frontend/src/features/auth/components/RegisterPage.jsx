import React, { useState } from "react";
import { layout, card, button as buttonStyle } from "../../../styles/sharedStyles";
import { API_BASE_URL } from "../../../lib";


function RegisterPage({ onBack, onRegister }) {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("client");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${API_BASE_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, name, password, user_type: userType }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.detail || "Registration failed");
      }
      setSuccess("Registration successful! You can now log in.");
      setUsername("");
      setName("");
      setPassword("");
      setUserType("client");
  if (onRegister) onRegister({ ...data, id: String(data.id) });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{ ...layout, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <form onSubmit={handleSubmit} style={{ ...card, maxWidth: 400, width: '100%' }}>
        <h2 style={{ marginBottom: 24 }}>Register</h2>
        <div style={{ marginBottom: 16 }}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Full Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name (optional)"
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}
          />
        </div>
        <div style={{ marginBottom: 16 }}>
          <label>User Type:</label>
          <select value={userType} onChange={e => setUserType(e.target.value)} required style={{ width: '100%', padding: 8, borderRadius: 6, border: '1px solid #ccc', marginTop: 4 }}>
            <option value="client">Client</option>
            <option value="collaborator">Collaborator</option>
          </select>
        </div>
        <button type="submit">Register</button>
      </form>
      {error && <div style={{ color: "red" }}>{error}</div>}
      {success && <div style={{ color: "green" }}>{success}</div>}
      <div style={{ marginTop: 16, textAlign: "center" }}>
        <button type="button" style={{ background: "none", color: "#0070f3", border: "none", cursor: "pointer", textDecoration: "underline" }} onClick={onBack}>
          Back to Login
        </button>
      </div>
    </div>
  );
}

export default RegisterPage;
