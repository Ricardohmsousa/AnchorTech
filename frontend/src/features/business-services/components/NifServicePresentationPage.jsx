
import React from "react";
import { layout, card, section } from "../../../styles/sharedStyles";


export default function NifServicePresentationPage() {
  return (
    <div style={layout}>

      <main style={{ maxWidth: 700, margin: '3rem auto', ...card, padding: 40 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0070f3', marginBottom: 18 }}>
          Get Your Portuguese NIF (Tax Number)
        </h1>
        <p style={{ color: '#444', fontSize: 18, marginBottom: 24 }}>
          Secure your Portuguese NIF quickly and remotely with TechAnchor. Our expert team guides you through every step, making the process simple and stress-free for expats, digital nomads, and new residents.
        </p>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Why Do You Need a NIF?</h2>
        <ul style={{ color: '#333', fontSize: 16, marginBottom: 24, lineHeight: 2 }}>
          <li>✔️ Required for opening a bank account in Portugal</li>
          <li>✔️ Essential for renting property, signing contracts, and employment</li>
          <li>✔️ Needed for utilities, phone plans, and daily life</li>
        </ul>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>How It Works</h2>
        <ol style={{ color: '#333', fontSize: 16, marginBottom: 24, paddingLeft: 20 }}>
          <li>Submit your documents securely online</li>
          <li>We assign a dedicated specialist to your case</li>
          <li>Your application is processed with the Portuguese tax office</li>
          <li>Receive your NIF digitally, ready to use</li>
        </ol>
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12 }}>Why Choose TechAnchor?</h2>
        <ul style={{ color: '#333', fontSize: 16, marginBottom: 24, lineHeight: 2 }}>
          <li>• Fast, remote, and secure process</li>
          <li>• English-speaking support</li>
          <li>• Transparent pricing, no hidden fees</li>
          <li>• Trusted by expats and newcomers to Portugal</li>
        </ul>
        <p style={{ color: '#0070f3', fontWeight: 700, fontSize: 18, marginTop: 32 }}>
          Start your NIF application today and unlock your new life in Portugal!
        </p>
      </main>
    </div>
  );
}

export const meta = {
  title: "Get Portuguese NIF Online | Fast & Secure | TechAnchor",
  description: "Obtain your Portuguese NIF (tax number) online with TechAnchor. Fast, secure, and remote service for expats and newcomers. Start your application today!",
  keywords: "Portugal NIF, get NIF online, Portuguese tax number, expat Portugal, move to Portugal, NIF application"
};
