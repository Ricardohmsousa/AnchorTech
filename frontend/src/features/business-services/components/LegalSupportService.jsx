import React from "react";
import { layout, card } from "../../../styles/sharedStyles";

export default function LegalSupportService() {
  return (
    <div style={layout}>
      <main style={{ maxWidth: 900, margin: '3rem auto', ...card }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 18 }}>Legal & Administrative Support</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 24 }}>
          Expert help with legal and administrative hurdles in Portugal.
        </p>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>How We Support You</h2>
        <ul style={{ fontSize: 17, color: '#333', marginBottom: 24, lineHeight: 2 }}>
          <li>✔️ Connect you with trusted legal partners</li>
          <li>✔️ Help you understand contracts and official documents</li>
          <li>✔️ Guide you through government processes</li>
        </ul>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>When to Use This Service</h2>
        <ul style={{ fontSize: 16, color: '#444', marginBottom: 24, lineHeight: 2 }}>
          <li>• Signing a lease or buying property</li>
          <li>• Registering a business</li>
          <li>• Navigating tax or residency rules</li>
        </ul>
        <p style={{ color: '#0070f3', fontWeight: 600, fontSize: 18 }}>Move forward with confidence—get legal and admin support from TechAnchor.</p>
      </main>
    </div>
  );
}

export const meta = {
  title: "Legal & Administrative Support in Portugal | TechAnchor",
  description: "Get expert help with legal and administrative hurdles in Portugal. We connect you with trusted partners and guide you through official processes.",
  keywords: "Portugal legal support, expat legal help, Portugal contracts, administrative support Portugal, move to Portugal legal"
};
