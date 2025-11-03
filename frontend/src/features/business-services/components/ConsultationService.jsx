import React from "react";
import { layout, card, section } from "../../../styles/sharedStyles";

export default function ConsultationService() {
  return (
    <div style={layout}>
      <main style={{ maxWidth: 900, margin: '3rem auto', ...card }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 18 }}>Personal Consultation</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 24 }}>
          One-on-one sessions with our relocation experts to plan your move to Portugal.
        </p>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>Why Book a Consultation?</h2>
        <ul style={{ fontSize: 17, color: '#333', marginBottom: 24, lineHeight: 2 }}>
          <li>✔️ Get tailored advice for your unique situation</li>
          <li>✔️ Understand the process, requirements, and next steps</li>
          <li>✔️ Avoid common relocation mistakes</li>
        </ul>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>What’s Included</h2>
        <ul style={{ fontSize: 16, color: '#444', marginBottom: 24, lineHeight: 2 }}>
          <li>• 30 or 60-minute video call with an expert</li>
          <li>• Answers to all your relocation questions</li>
          <li>• Follow-up summary and checklist</li>
        </ul>
        <p style={{ color: '#E2725B', fontWeight: 600, fontSize: 18 }}>Book your consultation today and start your journey to Portugal with confidence!</p>
      </main>
    </div>
  );
}

export const meta = {
  title: "Personal Consultation for Portugal Relocation | Atlantical",
  description: "Book a one-on-one consultation with our relocation experts. Get tailored advice, answers to your questions, and a step-by-step plan for moving to Portugal.",
  keywords: "Portugal relocation consultation, expat advice, move to Portugal, relocation expert, Portugal immigration help"
};
