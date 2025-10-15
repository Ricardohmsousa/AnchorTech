import React, { useState } from "react";
import { layout, card, button as buttonStyle } from "../../../styles/sharedStyles";

const faqs = [
  {
    q: "What is a NIF and why do I need it?",
    a: "A NIF (Número de Identificação Fiscal) is a Portuguese tax identification number required for most legal, financial, and daily activities in Portugal, such as opening a bank account, signing a lease, or getting a job."
  },
  {
    q: "How long does it take to get a NIF?",
    a: "With our service, you can typically receive your NIF within 2-5 business days after submitting all required documents."
  },
  {
    q: "Can I get a NIF remotely?",
    a: "Yes! We handle the process for you, so you can get your NIF from abroad without visiting Portugal."
  },
  {
    q: "What documents are required?",
    a: "Usually, a valid passport and proof of address are required. We will guide you through the exact requirements."
  }
];

function NifServicePage() {
  const [faqOpen, setFaqOpen] = useState(null);
  return (
    <div style={layout}>
      <header style={{ padding: '2rem 0', textAlign: 'center', background: '#fff', boxShadow: '0 2px 8px #f0f1f2', position: 'relative' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 800, margin: 0, color: '#0070f3' }}>Get Your Portuguese NIF</h1>
        <p style={{ color: '#555', fontSize: 18, marginTop: 12, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Fast, secure, and remote NIF acquisition for expats, digital nomads, and anyone relocating to Portugal. We handle the bureaucracy so you can focus on your move.
        </p>
      </header>
      <main style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
        <section style={{ ...card, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>How It Works</h2>
          <ol style={{ paddingLeft: 20, color: '#333', fontSize: 16 }}>
            <li>Upload your documents securely through our platform.</li>
            <li>We assign a dedicated collaborator to review your case.</li>
            <li>Your application is processed at the local tax office.</li>
            <li>Receive your NIF digitally, ready to use in Portugal!</li>
          </ol>
        </section>
        <section style={{ ...card, marginTop: 40, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Why Choose Us?</h2>
          <ul style={{ color: '#333', fontSize: 16, paddingLeft: 20 }}>
            <li>Remote, hassle-free NIF acquisition</li>
            <li>Expert support in English and Portuguese</li>
            <li>Fast turnaround and transparent pricing</li>
            <li>Trusted by expats and digital nomads</li>
          </ul>
        </section>
        <section style={{ ...card, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Frequently Asked Questions</h2>
          <div>
            {faqs.map((faq, idx) => (
              <div key={faq.q} style={{ marginBottom: 16 }}>
                <button
                  style={{ ...buttonStyle, width: '100%', textAlign: 'left', fontWeight: 600, fontSize: 16, background: '#f7f7f7', color: '#222', border: 'none', borderBottom: '1px solid #e0e0e0', borderRadius: 0, boxShadow: 'none', padding: '12px 16px', cursor: 'pointer' }}
                  onClick={() => setFaqOpen(faqOpen === idx ? null : idx)}
                  aria-expanded={faqOpen === idx}
                >
                  {faq.q}
                </button>
                {faqOpen === idx && (
                  <div style={{ background: '#fff', padding: '12px 16px', border: '1px solid #e0e0e0', borderTop: 'none', fontSize: 15, color: '#444' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
        <section style={{ ...card, textAlign: 'center' }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Ready to Get Started?</h2>
          <p style={{ color: '#555', fontSize: 16, marginBottom: 20 }}>Click below to begin your NIF application. Our team will guide you every step of the way.</p>
          <button style={{ ...buttonStyle, fontSize: 18, padding: '12px 32px', borderRadius: 8, fontWeight: 700, background: '#0070f3', color: '#fff' }}>
            Start Application
          </button>
        </section>
      </main>
    </div>
  );
}

export default NifServicePage;
