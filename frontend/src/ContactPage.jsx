import React, { useState } from "react";
import { layout, button as buttonStyle, card, footer as footerStyle } from "./sharedStyles";
// import Header from "./Header";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    // Here you would send the form dat to your backend or email service
  };

  return (
    <div style={layout}>
      <main style={{ maxWidth: 600, margin: '3rem auto', ...card, padding: 40 }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: 900, color: '#0070f3', marginBottom: 12 }}>Contact Us</h1>
        <p style={{ color: '#555', marginBottom: 32, fontSize: 18 }}>
          Have a question, need support, or want to partner with us? Fill out the form below and our team will get back to you within 24 hours.
        </p>
        {submitted ? (
          <div style={{ color: '#0070f3', fontWeight: 700, fontSize: 18, marginTop: 24, textAlign: 'center' }}>
            Thank you for reaching out! We'll be in touch soon.
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={form.name}
              onChange={handleChange}
              required
              style={{ padding: '14px 18px', borderRadius: 8, border: '1px solid #bbb', fontSize: 18 }}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={form.email}
              onChange={handleChange}
              required
              style={{ padding: '14px 18px', borderRadius: 8, border: '1px solid #bbb', fontSize: 18 }}
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={form.message}
              onChange={handleChange}
              required
              rows={5}
              style={{ padding: '14px 18px', borderRadius: 8, border: '1px solid #bbb', fontSize: 18, resize: 'vertical' }}
            />
            <button type="submit" style={{ ...buttonStyle, padding: '14px 38px', fontSize: 18, marginTop: 8 }}>
              Send Message
            </button>
          </form>
        )}
      </main>
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
