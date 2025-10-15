
import React, { useState } from "react";

import { layout, heroHeader, heroImage, heroOverlay, heroContent, section, card, footer as footerStyle, button as buttonStyle } from "../../styles/sharedStyles";
// import Header from "./Header";

const testimonials = [
  {
    name: "Maria S.",
    quote: "TechAnchor made my move to Portugal seamless. My case manager was always available and the process was so much easier than I expected!",
    rating: 5
  },
  {
    name: "James T.",
    quote: "I got my visa in just 3 months. The online tracker and support team were fantastic.",
    rating: 5
  },
  {
    name: "Elena R.",
    quote: "The AnchorMove tool helped me plan every step. Highly recommended for anyone relocating!",
    rating: 4.8
  }
];

export default function HomePage({ user, onLogin, onLogout }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleChecklistSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };


  return (
    <div style={layout}>
      <style>{`
        body { margin: 0 !important; padding: 0 !important; }
        .services-dropdown { transition: opacity 0.2s; }
        .services-dropdown.open { display: block !important; opacity: 1; }
        .services-dropdown.closed { display: none !important; opacity: 0; }
      `}</style>
      {/* Hero Section */}
      <header style={heroHeader}>
        <img src="/hero_section.jpg" alt="Relocation to Portugal" style={heroImage} />
        {/* Overlay */}
        <div style={heroOverlay} />
        {/* Hero Content */}
        <div style={heroContent}>
          <h1 style={{ fontSize: '2.8rem', fontWeight: 900, margin: 0, letterSpacing: 1, pointerEvents: 'auto' }}>Your life in Europe, made easy</h1>
          <p style={{ color: '#fff', fontSize: '1.3rem', margin: '1.5rem 0 2.5rem 0', maxWidth: 600, pointerEvents: 'auto' }}>
            TechAnchor is your digital relocation companion for Portugal. We simplify your move with expert support, transparent pricing, and a seamless online experience.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 24, pointerEvents: 'auto' }}>
            <button style={{ ...buttonStyle, padding: '18px 40px', fontSize: 20, boxShadow: '0 2px 8px #2228' }} onClick={onLogin}>
              Start to relocate
            </button>
          </div>
        </div>
        <div style={{ marginTop: 40, color: '#fff', fontSize: 18, fontWeight: 500, position: 'absolute', bottom: 16, left: 0, width: '100%', textAlign: 'center', textShadow: '0 2px 8px #2228', zIndex: 2 }}>
          <span>5,000+ relocations completed · 99% success rate · Avg. visa time: 3 months</span>
        </div>
      </header>

      {/* Value Proposition & Features */}
      <section id="services" style={section}>
        <div style={card}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>Why TechAnchor?</h2>
          <ul style={{ color: '#444', fontSize: 18, margin: 0, padding: 0, listStyle: 'none', lineHeight: 2 }}>
            <li>✔️ Dedicated case managers</li>
            <li>✔️ Multilingual support</li>
            <li>✔️ Free online relocation tool (AnchorMove)</li>
            <li>✔️ Transparent, affordable pricing</li>
            <li>✔️ Country-specific checklists</li>
            <li>✔️ Human support, not just software</li>
          </ul>
        </div>
  <div style={card}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>Who is it for?</h2>
          <ul style={{ color: '#444', fontSize: 18, margin: 0, padding: 0, listStyle: 'none', lineHeight: 2 }}>
            <li>• Digital nomads & remote workers</li>
            <li>• Entrepreneurs & freelancers</li>
            <li>• Professionals & students</li>
            <li>• Retirees & families</li>
            <li>• Passive income individuals</li>
          </ul>
        </div>
  <div style={card}>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, marginBottom: 16 }}>What do we offer?</h2>
          <ul style={{ color: '#444', fontSize: 18, margin: 0, padding: 0, listStyle: 'none', lineHeight: 2 }}>
            <li>• Personal consultation</li>
            <li>• Visa & residency guidance</li>
            <li>• Document & appointment handling</li>
            <li>• Legal/admin support</li>
            <li>• Online progress tracking</li>
            <li>• Community forum</li>
          </ul>
        </div>
      </section>

      {/* Immigration Checklist CTA */}
  <section id="checklist" style={{ maxWidth: 900, margin: '4rem auto', background: '#eaf4ff', borderRadius: 18, padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 2px 8px #e0e0e0' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 18 }}>Get your free Portugal immigration checklist</h2>
        <p style={{ color: '#444', fontSize: 18, marginBottom: 24 }}>Enter your email and we'll send you our step-by-step checklist to make your move to Portugal smooth and stress-free.</p>
        {submitted ? (
          <div style={{ color: '#0070f3', fontWeight: 700, fontSize: 18, marginTop: 24 }}>Thank you! Your checklist is on its way.</div>
        ) : (
          <form onSubmit={handleChecklistSubmit} style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 24, flexWrap: 'wrap' }}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ padding: '14px 18px', borderRadius: 8, border: '1px solid #bbb', fontSize: 18, minWidth: 260 }}
            />
            <button type="submit" style={{ ...buttonStyle, padding: '14px 38px', fontSize: 18 }}>
              Get Checklist
            </button>
          </form>
        )}
      </section>

      {/* Testimonials */}
  <section id="community" style={{ maxWidth: 900, margin: '4rem auto', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 900, marginBottom: 18 }}>What our clients say</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'center' }}>
          {testimonials.map((t, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 8px #e0e0e0', padding: 32, maxWidth: 320, minWidth: 260, flex: '1 1 260px', textAlign: 'left' }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>{t.name}</div>
              <div style={{ color: '#555', fontSize: 16, marginBottom: 12, fontStyle: 'italic' }}>&ldquo;{t.quote}&rdquo;</div>
              <div style={{ color: '#f5b301', fontWeight: 700, fontSize: 16 }}>{'★'.repeat(Math.round(t.rating))}{t.rating % 1 ? '½' : ''}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
  <footer style={footerStyle}>
        <div style={{ marginBottom: 10 }}>
          TechAnchor is not a law firm, tax advisor, or investment firm. We connect you with certified professionals as needed.
        </div>
        <div>
          &copy; {new Date().getFullYear()} TechAnchor. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 
