import React from "react";
import { layout, card } from "../sharedStyles";

export default function VisaGuidanceService() {
  return (
    <div style={layout}>
      <main style={{ maxWidth: 900, margin: '3rem auto', ...card }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 18 }}>Visa & Residency Guidance</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 24 }}>
          Step-by-step support for all Portugal visa and residency types.
        </p>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>How We Help</h2>
        <ul style={{ fontSize: 17, color: '#333', marginBottom: 24, lineHeight: 2 }}>
          <li>✔️ Identify the right visa or permit for your situation</li>
          <li>✔️ Guidance on eligibility, paperwork, and timelines</li>
          <li>✔️ Application review and submission support</li>
        </ul>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>Popular Visas</h2>
        <ul style={{ fontSize: 16, color: '#444', marginBottom: 24, lineHeight: 2 }}>
          <li>• Digital Nomad Visa</li>
          <li>• D7 Passive Income Visa</li>
          <li>• Golden Visa</li>
          <li>• Student & Work Visas</li>
        </ul>
        <p style={{ color: '#0070f3', fontWeight: 600, fontSize: 18 }}>Let us simplify your Portugal visa journey—get started today!</p>
      </main>
    </div>
  );
}

export const meta = {
  title: "Portugal Visa & Residency Guidance | TechAnchor",
  description: "Get expert support for all Portugal visa and residency types. We guide you through paperwork, eligibility, and the application process.",
  keywords: "Portugal visa help, residency permit Portugal, digital nomad visa, D7 visa, golden visa, Portugal immigration"
};
