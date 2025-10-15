import React from "react";
import { layout, card } from "../../../styles/sharedStyles";

export default function BankAccountService() {
  return (
    <div style={layout}>
      <main style={{ maxWidth: 900, margin: '3rem auto', ...card }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 18 }}>Get a Portuguese Bank Account</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 24 }}>
          Open a bank account in Portugal easily and securely with TechAnchor's expert guidance.
        </p>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>How We Help</h2>
        <ul style={{ fontSize: 17, color: '#333', marginBottom: 24, lineHeight: 2 }}>
          <li>✔️ Guidance on required documents and eligibility</li>
          <li>✔️ Step-by-step support through the application process</li>
          <li>✔️ Connect you with trusted banking partners</li>
        </ul>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>Why Open with Us?</h2>
        <ul style={{ fontSize: 16, color: '#444', marginBottom: 24, lineHeight: 2 }}>
          <li>• Save time and avoid paperwork mistakes</li>
          <li>• Get answers to all your questions</li>
          <li>• Start your financial life in Portugal with confidence</li>
        </ul>
        <p style={{ color: '#0070f3', fontWeight: 600, fontSize: 18 }}>Start your bank account application today!</p>
      </main>
    </div>
  );
}

export const meta = {
  title: "Open a Portuguese Bank Account | TechAnchor",
  description: "Open a bank account in Portugal easily and securely. Get expert support and connect with trusted banking partners.",
  keywords: "Portugal bank account, open bank account Portugal, expat banking, move to Portugal bank"
};
