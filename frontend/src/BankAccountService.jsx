import React, { useState } from "react";
import { layout, card, button as buttonStyle, section } from "./sharedStyles";

const faqs = [
  {
    q: "What documents are required to open a Portuguese bank account?",
    a: "Typically, you need a valid passport, proof of address, proof of income or employment, and your Portuguese NIF (tax number)."
  },
  {
    q: "Can I open a bank account remotely?",
    a: "Yes, we help you open a Portuguese bank account remotely, guiding you through the process and handling communication with the bank."
  },
  {
    q: "How long does it take?",
    a: "The process usually takes 3-7 business days, depending on the bank and document verification."
  },
  {
    q: "Do I need to be physically present in Portugal?",
    a: "No, our service allows you to open a bank account from abroad."
  }
];

function BankAccountService() {
  const [faqOpen, setFaqOpen] = useState(null);
  return (
    <div style={layout}>
      <header style={{ padding: '2rem 0', textAlign: 'center', background: '#fff', boxShadow: '0 2px 8px #f0f1f2', position: 'relative' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: 700, margin: 0 }}>Open a Portuguese Bank Account</h1>
        <p style={{ color: '#555', fontSize: 18, marginTop: 12, maxWidth: 600, marginLeft: 'auto', marginRight: 'auto' }}>
          Seamlessly open a Portuguese bank account from anywhere in the world. We handle the paperwork, liaise with banks, and ensure a smooth onboarding process for expats and newcomers.
        </p>
      </header>
      <main style={{ maxWidth: 700, margin: '2rem auto', padding: '0 1rem' }}>
        <section style={{ ...card, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>How It Works</h2>
          <ol style={{ paddingLeft: 20, color: '#333', fontSize: 16 }}>
            <li>Submit your documents securely through our platform.</li>
            <li>We review and prepare your application for the bank.</li>
            <li>We coordinate with the bank and keep you updated.</li>
            <li>Receive your account details and start banking in Portugal!</li>
          </ol>
        </section>
        <section style={{ ...card, marginBottom: 32 }}>
          <h2 style={{ fontSize: 22, fontWeight: 600, marginBottom: 12 }}>Why Choose Us?</h2>
          <ul style={{ color: '#333', fontSize: 16, paddingLeft: 20 }}>
            <li>Remote, hassle-free process</li>
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
          <p style={{ color: '#555', fontSize: 16, marginBottom: 20 }}>Click below to begin your Portuguese bank account application. Our team will guide you every step of the way.</p>
          <button style={{ ...buttonStyle, fontSize: 18, padding: '12px 32px', borderRadius: 8, fontWeight: 700, background: '#0070f3', color: '#fff' }}>
            Start Application
          </button>
        </section>
      </main>
    </div>
  );
}

export default BankAccountService;
