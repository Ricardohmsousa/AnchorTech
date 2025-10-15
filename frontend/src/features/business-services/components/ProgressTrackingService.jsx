import React from "react";
import { layout, card } from "../../../styles/sharedStyles";

export default function ProgressTrackingService() {
  return (
    <div style={layout}>
      <main style={{ maxWidth: 900, margin: '3rem auto', ...card }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 18 }}>Online Progress Tracking</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 24 }}>
          Track your relocation progress and next steps online, anytime.
        </p>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>Why Use Our Tracker?</h2>
        <ul style={{ fontSize: 17, color: '#333', marginBottom: 24, lineHeight: 2 }}>
          <li>✔️ See your case status in real time</li>
          <li>✔️ Get reminders for upcoming tasks</li>
          <li>✔️ Access your documents securely</li>
        </ul>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>How It Works</h2>
        <ul style={{ fontSize: 16, color: '#444', marginBottom: 24, lineHeight: 2 }}>
          <li>• Log in to your dashboard</li>
          <li>• View your personalized relocation checklist</li>
          <li>• Upload/download documents anytime</li>
        </ul>
        <p style={{ color: '#0070f3', fontWeight: 600, fontSize: 18 }}>Stay in control of your move—track your progress with TechAnchor.</p>
      </main>
    </div>
  );
}

export const meta = {
  title: "Online Progress Tracking for Relocation | TechAnchor",
  description: "Track your relocation progress and next steps online, anytime. Access your case status, documents, and checklist with TechAnchor.",
  keywords: "relocation progress tracking, expat dashboard, Portugal move checklist, online relocation tool"
};
