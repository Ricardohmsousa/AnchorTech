import React from "react";
import { layout, card } from "../sharedStyles";

export default function DocumentHandlingService() {
  return (
    <div style={layout}>
      <main style={{ maxWidth: 900, margin: '3rem auto', ...card }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 18 }}>Document & Appointment Handling</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 24 }}>
          We manage your document preparation and schedule all necessary appointments.
        </p>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>What We Do</h2>
        <ul style={{ fontSize: 17, color: '#333', marginBottom: 24, lineHeight: 2 }}>
          <li>✔️ Gather and review all required documents</li>
          <li>✔️ Book appointments with authorities and service providers</li>
          <li>✔️ Ensure you never miss a deadline</li>
        </ul>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>Why It Matters</h2>
        <ul style={{ fontSize: 16, color: '#444', marginBottom: 24, lineHeight: 2 }}>
          <li>• Avoid paperwork mistakes</li>
          <li>• Save time and reduce stress</li>
          <li>• Stay organized throughout your move</li>
        </ul>
        <p style={{ color: '#0070f3', fontWeight: 600, fontSize: 18 }}>Let us handle the admin—focus on your new life in Portugal!</p>
      </main>
    </div>
  );
}

export const meta = {
  title: "Document & Appointment Handling for Portugal Relocation | TechAnchor",
  description: "We manage your document preparation and schedule all necessary appointments for your move to Portugal. Stay organized and stress-free.",
  keywords: "Portugal relocation documents, appointment booking Portugal, expat paperwork, move to Portugal admin"
};
