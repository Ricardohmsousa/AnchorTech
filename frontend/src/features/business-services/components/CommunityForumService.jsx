import React from "react";
import { layout, card } from "../../../styles/sharedStyles";

export default function CommunityForumService() {
  return (
    <div style={layout}>
      <main style={{ maxWidth: 900, margin: '3rem auto', ...card }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: 18 }}>Community Forum</h1>
        <p style={{ fontSize: 18, color: '#444', marginBottom: 24 }}>
          Connect with other expats and get real-world advice.
        </p>
        <h2 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: 12 }}>Why Join Our Forum?</h2>
        <ul style={{ fontSize: 17, color: '#333', marginBottom: 24, lineHeight: 2 }}>
          <li>✔️ Ask questions and get answers from real movers</li>
          <li>✔️ Share your experiences and tips</li>
          <li>✔️ Build your support network in Portugal</li>
        </ul>
        <h2 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 10 }}>How to Participate</h2>
        <ul style={{ fontSize: 16, color: '#444', marginBottom: 24, lineHeight: 2 }}>
          <li>• Register for free</li>
          <li>• Post questions or join discussions</li>
          <li>• Connect with fellow expats and locals</li>
        </ul>
        <p style={{ color: '#0070f3', fontWeight: 600, fontSize: 18 }}>Join the TechAnchor community and make your move easier—together!</p>
      </main>
    </div>
  );
}

export const meta = {
  title: "Community Forum for Expats in Portugal | TechAnchor",
  description: "Connect with other expats and get real-world advice in our community forum. Share experiences, ask questions, and build your support network.",
  keywords: "Portugal expat forum, relocation community, expat support Portugal, move to Portugal advice"
};
