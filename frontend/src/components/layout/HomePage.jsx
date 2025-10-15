
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { layout, heroHeader, heroImage, heroOverlay, heroContent, section, card, footer as footerStyle, button as buttonStyle } from "../../styles/sharedStyles";

const testimonials = [
  {
    name: "Maria S.",
    location: "Lisbon, Portugal",
    quote: "TechAnchor made my move to Portugal seamless. My case manager was always available and the process was so much easier than I expected!",
    rating: 5,
    visa: "D7 Visa"
  },
  {
    name: "James T.",
    location: "Porto, Portugal", 
    quote: "I got my visa in just 3 months. The online tracker and support team were fantastic.",
    rating: 5,
    visa: "Digital Nomad Visa"
  },
  {
    name: "Elena R.",
    location: "Cascais, Portugal",
    quote: "The AnchorMove tool helped me plan every step. Highly recommended for anyone relocating!",
    rating: 4.8,
    visa: "Golden Visa"
  }
];

const stats = [
  { number: "5,000+", label: "Successful Relocations" },
  { number: "99%", label: "Visa Success Rate" },
  { number: "3 months", label: "Average Processing Time" },
  { number: "24/7", label: "Support Available" }
];

const benefits = [
  {
    icon: "🎯",
    title: "Personalized Strategy",
    description: "Tailored relocation plan based on your specific situation and goals"
  },
  {
    icon: "⚡",
    title: "Fast-Track Process",
    description: "Skip the learning curve with our proven step-by-step system"
  },
  {
    icon: "🛡️",
    title: "Risk-Free Guarantee",
    description: "Money-back guarantee if we can't deliver on our promises"
  },
  {
    icon: "👥",
    title: "Expert Team",
    description: "Certified immigration lawyers and relocation specialists"
  }
];

export default function HomePage({ user }) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChecklistSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    // TODO: Integrate with email service
  };

  const handleGetStarted = () => {
    if (user) {
      navigate("/profile");
    } else {
      navigate("/register");
    }
  };

  const handleBookConsultation = () => {
    // TODO: Integrate with booking system
    navigate("/contact");
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <style>{`
        body { margin: 0 !important; padding: 0 !important; }
        
        .floating-element {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .fade-in-up {
          animation: fadeInUp 0.8s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .cta-button {
          background: linear-gradient(135deg, #0070f3 0%, #0051cc 100%);
          transition: all 0.3s ease;
          transform: translateY(0);
          position: relative;
          overflow: hidden;
        }
        .cta-button:before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          transition: left 0.5s;
        }
        .cta-button:hover:before {
          left: 100%;
        }
        .cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 35px rgba(0, 112, 243, 0.4);
        }
        
        .secondary-button {
          background: rgba(255, 255, 255, 0.95);
          color: #0070f3;
          border: 2px solid rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        .secondary-button:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 255, 255, 0.3);
        }
        
        .stat-card {
          transition: all 0.4s ease;
          backdrop-filter: blur(15px);
        }
        .stat-card:hover {
          transform: translateY(-8px) scale(1.05);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.2);
        }
        
        .benefit-card {
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }
        .benefit-card:before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(0, 112, 243, 0.02) 0%, rgba(0, 112, 243, 0.05) 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .benefit-card:hover:before {
          opacity: 1;
        }
        .benefit-card:hover {
          transform: translateY(-12px);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.12);
        }
        
        .testimonial-card {
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }
        .testimonial-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.08);
        }
        
        .process-step {
          transition: all 0.3s ease;
        }
        .process-step:hover {
          transform: translateY(-5px);
        }
        
        .gradient-text {
          background: linear-gradient(135deg, #0070f3 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
      `}</style>

      {/* Hero Section - Enhanced with more breathing space and modern layout */}
      <section style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '200px',
          height: '200px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '50%',
          filter: 'blur(40px)'
        }} className="floating-element" />
        <div style={{
          position: 'absolute',
          bottom: '20%',
          left: '10%',
          width: '150px',
          height: '150px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '50%',
          filter: 'blur(30px)'
        }} className="floating-element" />
        
        <div style={{
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          alignItems: 'center',
          minHeight: '80vh'
        }}>
          {/* Left Column - Content */}
          <div className="fade-in-up">
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ 
                background: 'rgba(255, 255, 255, 0.15)', 
                color: '#ffffff', 
                padding: '12px 24px', 
                borderRadius: '50px', 
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(10px)'
              }}>
                ✨ Portugal's #1 Relocation Platform
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: '4.5rem', 
              fontWeight: '900', 
              margin: '0 0 2rem 0', 
              letterSpacing: '-2px', 
              color: '#ffffff',
              lineHeight: '1.1'
            }}>
              Your Gateway to
              <br />
              <span className="gradient-text" style={{ 
                background: 'linear-gradient(135deg, #00d4ff 0%, #ffffff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}>
                Portugal
              </span>
              <br />
              Awaits
            </h1>
            
            <p style={{ 
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '1.3rem', 
              margin: '0 0 3rem 0', 
              maxWidth: '550px',
              lineHeight: '1.6',
              fontWeight: '400'
            }}>
              Join <strong>5,000+ successful relocators</strong> who chose the smart way to move. Our proven system eliminates the guesswork with a <strong>99% success rate</strong> and <strong>average 90-day timeline</strong>.
            </p>
            
            <div style={{ 
              display: 'flex', 
              gap: '1.5rem', 
              marginBottom: '3rem',
              flexWrap: 'wrap'
            }}>
              <button 
                className="cta-button"
                style={{ 
                  padding: '18px 36px', 
                  fontSize: '18px',
                  fontWeight: '700',
                  borderRadius: '16px',
                  border: 'none',
                  color: '#ffffff',
                  cursor: 'pointer',
                  minWidth: '220px'
                }} 
                onClick={handleGetStarted}
              >
                🚀 Start Your Journey
              </button>
              
              <button 
                className="secondary-button"
                style={{ 
                  padding: '18px 36px', 
                  fontSize: '18px',
                  fontWeight: '600',
                  borderRadius: '16px',
                  cursor: 'pointer',
                  minWidth: '220px'
                }} 
                onClick={handleBookConsultation}
              >
                📞 Book Free Call
              </button>
            </div>

            {/* Trust Indicators */}
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '2rem',
              color: 'rgba(255, 255, 255, 0.9)', 
              fontSize: '15px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>⭐⭐⭐⭐⭐</span>
                <span><strong>4.9/5</strong> (1,200+ reviews)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🔒</span>
                <span>Money-back guarantee</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>⚡</span>
                <span>90-day average timeline</span>
              </div>
            </div>
          </div>
          
          {/* Right Column - Visual Mockup */}
          <div style={{
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '24px',
              padding: '2rem',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
              maxWidth: '400px',
              width: '100%'
            }} className="floating-element">
              <div style={{
                background: 'rgba(255, 255, 255, 0.95)',
                borderRadius: '16px',
                padding: '1.5rem',
                marginBottom: '1rem',
                color: '#333'
              }}>
                <h4 style={{ margin: '0 0 1rem 0', fontWeight: '700', color: '#0070f3' }}>Your Relocation Dashboard</h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '14px', color: '#666' }}>Progress</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#10b981' }}>78% Complete</span>
                </div>
                <div style={{
                  background: '#f0f0f0',
                  height: '8px',
                  borderRadius: '4px',
                  marginBottom: '1.5rem'
                }}>
                  <div style={{
                    background: 'linear-gradient(90deg, #10b981, #0070f3)',
                    height: '100%',
                    width: '78%',
                    borderRadius: '4px'
                  }} />
                </div>
                <div style={{ fontSize: '13px', color: '#666' }}>
                  ✅ Documentation submitted<br/>
                  ✅ Appointment scheduled<br/>
                  🔄 Processing application<br/>
                  ⏳ Awaiting approval
                </div>
              </div>
              
              <div style={{
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '12px',
                padding: '1rem',
                fontSize: '13px',
                color: '#333'
              }}>
                <strong style={{ color: '#0070f3' }}>Next Step:</strong> Schedule your appointment at the Portuguese consulate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof Stats - Enhanced with better spacing and modern design */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: '8rem 2rem',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '1rem' }}>
            <span style={{ 
              background: 'rgba(0, 112, 243, 0.1)', 
              color: '#0070f3', 
              padding: '8px 20px', 
              borderRadius: '25px', 
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1px'
            }}>
              Trusted by Thousands
            </span>
          </div>
          
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '900',
            marginBottom: '1rem',
            color: '#1a202c',
            letterSpacing: '-1px'
          }}>
            The Numbers Speak for Themselves
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem auto'
          }}>
            Join thousands of successful relocators who chose the smart path to Portugal
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
            gap: '2rem',
            marginBottom: '4rem'
          }}>
            {stats.map((stat, i) => (
              <div 
                key={i} 
                className="stat-card"
                style={{ 
                  background: '#ffffff',
                  borderRadius: '20px',
                  padding: '3rem 2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #0070f3, #00d4ff)'
                }} />
                <div style={{ 
                  fontSize: '3.5rem', 
                  fontWeight: '900',
                  marginBottom: '1rem',
                  color: '#0070f3'
                }}>
                  {stat.number}
                </div>
                <div style={{ 
                  fontSize: '1.1rem',
                  color: '#64748b',
                  fontWeight: '600'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Client Logos Section */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '3rem 2rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            border: '1px solid #e2e8f0'
          }}>
            <p style={{
              fontSize: '1rem',
              color: '#64748b',
              marginBottom: '2rem',
              fontWeight: '600'
            }}>
              Empowering relocations to Portugal's fastest growing communities
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '3rem',
              flexWrap: 'wrap',
              opacity: 0.7
            }}>
              {/* Placeholder for client logos */}
              <div style={{ padding: '1rem 2rem', background: '#f8fafc', borderRadius: '12px', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Portugal Tech Hub</div>
              <div style={{ padding: '1rem 2rem', background: '#f8fafc', borderRadius: '12px', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Lisbon Expat Network</div>
              <div style={{ padding: '1rem 2rem', background: '#f8fafc', borderRadius: '12px', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Porto Business Council</div>
              <div style={{ padding: '1rem 2rem', background: '#f8fafc', borderRadius: '12px', fontSize: '14px', fontWeight: '600', color: '#64748b' }}>Digital Nomad Community</div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{ 
        padding: '6rem 2rem',
        background: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            color: '#222'
          }}>
            Why Choose TechAnchor?
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem auto'
          }}>
            We've perfected the relocation process so you don't have to figure it out yourself
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
            gap: '2rem'
          }}>
            {benefits.map((benefit, i) => (
              <div 
                key={i}
                className="benefit-card"
                style={{ 
                  background: '#fff',
                  borderRadius: '20px',
                  padding: '3rem 2rem',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                  border: '1px solid #f0f0f0',
                  textAlign: 'center'
                }}
              >
                <div style={{ 
                  fontSize: '3rem', 
                  marginBottom: '1rem'
                }}>
                  {benefit.icon}
                </div>
                <h3 style={{ 
                  fontSize: '1.4rem', 
                  fontWeight: '700',
                  marginBottom: '1rem',
                  color: '#222'
                }}>
                  {benefit.title}
                </h3>
                <p style={{ 
                  color: '#666',
                  lineHeight: '1.6',
                  fontSize: '1rem'
                }}>
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ 
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #f8f9fb 0%, #e9ecef 100%)'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '800', 
            marginBottom: '1rem',
            color: '#222'
          }}>
            Your Journey in 3 Simple Steps
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            marginBottom: '4rem'
          }}>
            From consultation to celebration, we guide you every step of the way
          </p>

          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
            gap: '3rem'
          }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: '800',
                margin: '0 auto 2rem auto'
              }}>
                1
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                Free Consultation
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                We analyze your situation and create a personalized relocation strategy tailored to your needs and timeline.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: '800',
                margin: '0 auto 2rem auto'
              }}>
                2
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                Expert Execution
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Our team handles all paperwork, appointments, and bureaucracy while you track progress in real-time.
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ 
                background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                color: 'white',
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '2rem',
                fontWeight: '800',
                margin: '0 auto 2rem auto'
              }}>
                3
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1rem' }}>
                Welcome to Portugal
              </h3>
              <p style={{ color: '#666', lineHeight: '1.6' }}>
                Celebrate your successful move with ongoing support as you settle into your new life in Portugal.
              </p>
            </div>
          </div>

          <div style={{ marginTop: '4rem' }}>
            <button 
              className="cta-button"
              style={{ 
                ...buttonStyle, 
                padding: '18px 40px', 
                fontSize: 18,
                fontWeight: 700,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                border: 'none'
              }} 
              onClick={handleGetStarted}
            >
              Start Your Journey Today →
            </button>
          </div>
        </div>
      </section>

      {/* Immigration Checklist CTA */}
      <section style={{ 
        maxWidth: '900px', 
        margin: '6rem auto', 
        background: 'linear-gradient(135deg, #eaf4ff 0%, #dbeafe 100%)', 
        borderRadius: '24px', 
        padding: '4rem 3rem', 
        textAlign: 'center', 
        boxShadow: '0 8px 30px rgba(0, 112, 243, 0.1)',
        border: '1px solid rgba(0, 112, 243, 0.1)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ 
            background: 'rgba(0, 112, 243, 0.1)', 
            color: '#0070f3', 
            padding: '8px 16px', 
            borderRadius: '20px', 
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            🎁 FREE RESOURCE
          </span>
        </div>
        
        <h2 style={{ 
          fontSize: '2.5rem', 
          fontWeight: '900', 
          marginBottom: '1rem',
          color: '#222',
          lineHeight: '1.2'
        }}>
          Get Your Portugal Immigration Checklist
        </h2>
        
        <p style={{ 
          color: '#555', 
          fontSize: '1.2rem', 
          marginBottom: '3rem',
          lineHeight: '1.6',
          maxWidth: '600px',
          margin: '0 auto 3rem auto'
        }}>
          Download our comprehensive <strong>step-by-step checklist</strong> that has helped thousands successfully relocate to Portugal. Everything you need to know in one place.
        </p>
        
        {submitted ? (
          <div style={{ 
            background: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
            color: 'white',
            fontWeight: '700', 
            fontSize: '1.2rem', 
            padding: '2rem',
            borderRadius: '15px',
            marginTop: '2rem'
          }}>
            🎉 Success! Check your email for your free checklist and exclusive relocation tips!
          </div>
        ) : (
          <form onSubmit={handleChecklistSubmit} style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 16, 
            marginTop: '2rem', 
            flexWrap: 'wrap',
            maxWidth: '500px',
            margin: '2rem auto 0 auto'
          }}>
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              style={{ 
                padding: '16px 20px', 
                borderRadius: '12px', 
                border: '2px solid #e5e7eb', 
                fontSize: '16px', 
                minWidth: '280px',
                flex: '1',
                fontFamily: 'inherit'
              }}
            />
            <button 
              type="submit" 
              className="cta-button"
              style={{ 
                ...buttonStyle, 
                padding: '16px 32px', 
                fontSize: '16px',
                fontWeight: '700',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                border: 'none',
                whiteSpace: 'nowrap'
              }}
            >
              Get Free Checklist 📋
            </button>
          </form>
        )}
        
        <p style={{ 
          fontSize: '14px', 
          color: '#666', 
          marginTop: '1.5rem'
        }}>
          📧 No spam, ever. Unsubscribe anytime. Used by 10,000+ relocators.
        </p>
      </section>

      {/* Testimonials */}
      <section style={{ 
        padding: '6rem 2rem',
        background: '#fff',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '900', 
            marginBottom: '1rem',
            color: '#222'
          }}>
            Success Stories
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            marginBottom: '4rem'
          }}>
            Real people, real results. See what our clients say about their relocation journey.
          </p>
          
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
            gap: '2rem'
          }}>
            {testimonials.map((t, i) => (
              <div 
                key={i} 
                style={{ 
                  background: '#fff', 
                  borderRadius: '20px', 
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)', 
                  padding: '3rem 2rem', 
                  textAlign: 'left',
                  border: '1px solid #f0f0f0',
                  position: 'relative'
                }}
              >
                <div style={{ 
                  color: '#f59e0b', 
                  fontSize: '24px', 
                  marginBottom: '1rem'
                }}>
                  {'★'.repeat(Math.round(t.rating))}
                </div>
                
                <p style={{ 
                  color: '#333', 
                  fontSize: '1.1rem', 
                  marginBottom: '2rem', 
                  fontStyle: 'italic',
                  lineHeight: '1.6'
                }}>
                  "{t.quote}"
                </p>
                
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f0f0f0'
                }}>
                  <div>
                    <div style={{ 
                      fontWeight: '700', 
                      fontSize: '1.1rem',
                      color: '#222',
                      marginBottom: '0.25rem'
                    }}>
                      {t.name}
                    </div>
                    <div style={{ 
                      color: '#666', 
                      fontSize: '0.9rem'
                    }}>
                      📍 {t.location}
                    </div>
                  </div>
                  <div style={{ 
                    background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    fontSize: '0.8rem',
                    fontWeight: '600'
                  }}>
                    {t.visa}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '4rem' }}>
            <button 
              className="cta-button"
              style={{ 
                ...buttonStyle, 
                padding: '18px 40px', 
                fontSize: 18,
                fontWeight: 700,
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                border: 'none'
              }} 
              onClick={handleBookConsultation}
            >
              Book Your Free Consultation →
            </button>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section style={{ 
        background: 'linear-gradient(135deg, #1e3a8a 0%, #3730a3 100%)',
        padding: '6rem 2rem',
        color: 'white',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '900', 
            marginBottom: '1rem',
            lineHeight: '1.2'
          }}>
            Ready to Start Your Portugal Journey?
          </h2>
          
          <p style={{ 
            fontSize: '1.3rem', 
            marginBottom: '3rem',
            opacity: 0.9,
            lineHeight: '1.6'
          }}>
            Join thousands of successful relocators who chose TechAnchor. 
            <br />Your new life in Portugal is just 90 days away.
          </p>

          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: 20, 
            flexWrap: 'wrap',
            marginBottom: '3rem'
          }}>
            <button 
              className="cta-button"
              style={{ 
                background: 'white',
                color: '#1e3a8a',
                border: 'none',
                padding: '20px 40px', 
                fontSize: 18,
                fontWeight: 700,
                borderRadius: '12px',
                minWidth: '200px',
                cursor: 'pointer'
              }} 
              onClick={handleGetStarted}
            >
              🚀 Get Started Now
            </button>
            
            <button 
              style={{ 
                background: 'transparent',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                padding: '20px 40px', 
                fontSize: 18,
                fontWeight: 600,
                borderRadius: '12px',
                minWidth: '200px',
                cursor: 'pointer'
              }} 
              onClick={handleBookConsultation}
            >
              📞 Schedule Call
            </button>
          </div>

          <div style={{ 
            fontSize: '14px',
            opacity: 0.8
          }}>
            ✅ 30-day money-back guarantee  •  ✅ No hidden fees  •  ✅ Expert support included
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        ...footerStyle,
        background: '#f8f9fb',
        padding: '3rem 2rem',
        textAlign: 'center',
        borderTop: '1px solid #e5e7eb'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ 
            marginBottom: '1.5rem',
            fontSize: '14px',
            color: '#666',
            lineHeight: '1.6'
          }}>
            <strong>Legal Disclaimer:</strong> TechAnchor is not a law firm, tax advisor, or investment firm. 
            We connect you with certified professionals as needed and provide relocation coordination services.
          </div>
          <div style={{ 
            fontSize: '14px',
            color: '#888'
          }}>
            &copy; {new Date().getFullYear()} TechAnchor. All rights reserved. 
            <span style={{ margin: '0 1rem' }}>•</span>
            Made with ❤️ for future Portuguese residents
          </div>
        </div>
      </footer>
    </div>
  );
} 
