import React, { useState } from "react";
import { layout, navBar, navLink, card, button as buttonStyle } from "../../../styles/sharedStyles";
import { API_BASE_URL } from "../../../lib";

export default function LoginPage({ onLogin, onRegister }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch(`${API_BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        onLogin(data);
      } else {
        setError("Invalid credentials");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div style={layout}>
      {/* Navigation Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
        <form onSubmit={handleSubmit} style={{ ...card, minWidth: 340, maxWidth: 400, width: '100%' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: 24, color: '#0070f3', textAlign: 'center' }}>Sign in to your account</h1>
          <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
            required
            autoFocus
          />
          <label style={{ fontWeight: 600, color: '#222', marginBottom: 6, display: 'block' }}>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ width: "100%", padding: 14, marginBottom: 18, borderRadius: 8, border: "1px solid #bbb", fontSize: 16, background: '#f8f9fb' }}
            required
          />
          {error && <div style={{ color: "#d32f2f", marginBottom: 16, textAlign: 'center', fontWeight: 600 }}>{error}</div>}
          <button type="submit" style={{ ...buttonStyle, width: "100%", padding: 14, fontSize: 18, fontWeight: 700, marginBottom: 12 }}>Login</button>
          <div style={{ textAlign: "center", marginTop: 8 }}>
            <span style={{ color: '#444', fontSize: 15 }}>Don't have an account? </span>
            <button type="button" style={{ background: "none", color: "#0070f3", border: "none", cursor: "pointer", textDecoration: "underline", fontWeight: 700, fontSize: 15 }} onClick={onRegister}>
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
