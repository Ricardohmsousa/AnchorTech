
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../ProgressIndicator";
import { AnimatedTestimonials } from "../AnimatedTestimonials";
import ShuffleHero from "../ShuffleHero";
import { TextParallaxContent, ContentSection } from "../TextParallax";

import { layout, heroHeader, heroImage, heroOverlay, heroContent, section, card, footer as footerStyle, button as buttonStyle } from "../../styles/sharedStyles";

const testimonials = [
  {
    name: "Maria S.",
    location: "Lisbon, Portugal",
    quote: "TechAnchor made my move to Portugal seamless. My case manager was always available and the process was so much easier than I expected!",
    rating: 5,
    visa: "D7 Visa",
    src: "https://images.unsplash.com/photo-1494790108755-2616b612b3bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "James T.",
    location: "Porto, Portugal", 
    quote: "I got my visa in just 3 months. The online tracker and support team were fantastic.",
    rating: 5,
    visa: "Digital Nomad Visa",
    src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Elena R.",
    location: "Cascais, Portugal",
    quote: "The AnchorMove tool helped me plan every step. Highly recommended for anyone relocating!",
    rating: 4.8,
    visa: "Golden Visa",
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Carlos M.",
    location: "Braga, Portugal",
    quote: "From document preparation to finding housing, TechAnchor handled everything. Now my family and I are living our dream in Portugal.",
    rating: 5,
    visa: "Family Reunification",
    src: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
  },
  {
    name: "Sophie L.",
    location: "Faro, Portugal", 
    quote: "The investment guidance for my Golden Visa was exceptional. Professional, transparent, and efficient throughout the entire process.",
    rating: 5,
    visa: "Golden Visa",
    src: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
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
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    
    // Real-time validation after field has been touched
    if (emailTouched) {
      if (!value) {
        setEmailError("Email address is required");
      } else if (!validateEmail(value)) {
        setEmailError("Please enter a valid email address");
      } else {
        setEmailError("");
      }
    }
  };

  const handleEmailBlur = () => {
    setEmailTouched(true);
    if (!email) {
      setEmailError("Email address is required");
    } else if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
    }
  };

  const handleChecklistSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setIsLoading(true);
    
    if (!email) {
      setEmailError("Email address is required");
      setIsLoading(false);
      return;
    }
    
    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }
    
    // Simulate API call
    setTimeout(() => {
      setSubmitted(true);
      setIsLoading(false);
      // TODO: Integrate with email service
    }, 1500);
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
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }
        
        .section-title {
          font-family: 'Inter', sans-serif;
          font-weight: 800;
          letter-spacing: -0.025em;
          line-height: 1.1;
        }
        
        .section-subtitle {
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          line-height: 1.6;
          color: #64748b;
        }
        
        .body-text {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.6;
          color: #475569;
        }
        
        .accent-text {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          color: #0070f3;
        }
        
        .cta-button {
          font-family: 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: 0.025em;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Inter', sans-serif;
          font-weight: 700;
          letter-spacing: -0.025em;
        }
        
        p {
          font-family: 'Inter', sans-serif;
          font-weight: 400;
          line-height: 1.6;
        }
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
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
            text-align: center;
          }
          
          .hero-title {
            font-size: 2.5rem !important;
            line-height: 1.2 !important;
          }
          
          .hero-subtitle {
            font-size: 1.1rem !important;
          }
          
          .timeline-step {
            flex-direction: column !important;
            text-align: center !important;
          }
          
          .timeline-content {
            width: 100% !important;
            padding: 0 !important;
            text-align: center !important;
            margin-bottom: 2rem;
          }
          
          .timeline-image {
            width: 100% !important;
            padding: 0 !important;
          }
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1rem !important;
          }
          
          .benefits-grid {
            grid-template-columns: 1fr !important;
          }
          
          .cta-buttons {
            flex-direction: column !important;
            align-items: center !important;
          }
          
          .cta-button, .secondary-button {
            min-width: 280px !important;
          }
        }
        
        @media (max-width: 480px) {
          .hero-title {
            font-size: 2rem !important;
          }
          
          .stats-grid {
            grid-template-columns: 1fr !important;
          }
          
          .section-title {
            font-size: 2rem !important;
          }
        }
        
        /* Loading animation */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Hero Section - Shuffle Grid Animation */}
      <ShuffleHero />

      {/* Parallax Storytelling Sections */}
      <div style={{ background: '#fff' }}>
        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          subheading="Your Journey"
          heading="Start with Confidence"
        >
          <ContentSection
            title="Expert Guidance Every Step of the Way"
            content={[
              "Our proven system has helped over 5,000 families successfully relocate to Portugal. From the initial consultation to receiving your residency card, we provide personalized support tailored to your unique situation.",
              "With a 99% success rate and average 90-day processing time, you can trust our expertise to make your Portuguese dream a reality."
            ]}
            buttonText="Start Your Application"
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          subheading="Documentation"
          heading="Simplified Process"
        >
          <ContentSection
            title="No More Paperwork Confusion"
            content={[
              "Navigate the complex Portuguese bureaucracy with ease. Our document preparation service ensures all your paperwork is correctly formatted, translated, and apostilled according to Portuguese requirements.",
              "We handle the technical details so you can focus on planning your new life in Portugal."
            ]}
            buttonText="View Document Checklist"
          />
        </TextParallaxContent>

        <TextParallaxContent
          imgUrl="https://images.unsplash.com/photo-1570393952005-681c3f178294?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
          subheading="Settlement"
          heading="Your New Home Awaits"
        >
          <ContentSection
            title="Beyond Visas - Complete Relocation Support"
            content={[
              "Once your visa is approved, our support continues. From finding the perfect neighborhood to setting up utilities and opening bank accounts, we ensure a smooth transition to Portuguese life.",
              "Join our thriving community of relocated families who now call Portugal home."
            ]}
            buttonText="Explore Settlement Services"
          />
        </TextParallaxContent>
      </div>

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
            fontWeight: '800',
            marginBottom: '1rem',
            color: '#1a202c',
            letterSpacing: '-0.02em',
            fontFamily: 'Inter, sans-serif'
          }} className="section-title">
            The Numbers Speak for Themselves
          </h2>
          
          <p style={{
            fontSize: '1.25rem',
            color: '#64748b',
            marginBottom: '4rem',
            maxWidth: '600px',
            margin: '0 auto 4rem auto',
            fontWeight: '400',
            lineHeight: '1.6',
            fontFamily: 'Inter, sans-serif'
          }} className="section-subtitle">
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
                  fontWeight: '800',
                  marginBottom: '1rem',
                  color: '#0070f3',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em'
                }}>
                  {stat.number}
                </div>
                <div style={{ 
                  fontSize: '1.125rem',
                  fontWeight: '500',
                  color: '#475569',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.5'
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

      {/* Process Section - Vertical Timeline */}
      <section style={{ 
        padding: '6rem 2rem',
        background: 'linear-gradient(135deg, #f8f9fb 0%, #e9ecef 100%)',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
          {/* Header Area */}
          <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ 
                color: '#0070f3', 
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '2px'
              }}>
                HOW TO GET STARTED
              </span>
            </div>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '800', 
              marginBottom: '1rem',
              color: '#1a202c',
              lineHeight: '1.2',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.025em'
            }} className="section-title">
              Get Started in Three Simple Steps
            </h2>
            <p style={{ 
              fontSize: '1.25rem', 
              color: '#64748b',
              lineHeight: '1.6',
              maxWidth: '500px',
              margin: '0 auto',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400'
            }} className="section-subtitle">
              From consultation to celebration, we guide you every step of the way
            </p>
          </div>

          {/* Vertical Timeline Container */}
          <div style={{ position: 'relative' }}>
            {/* Central Vertical Line */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '0',
              bottom: '0',
              width: '2px',
              background: 'linear-gradient(180deg, #0070f3 0%, #10b981 50%, #f59e0b 100%)',
              transform: 'translateX(-50%)',
              zIndex: 1
            }} />

            {/* Step 1 - Left Side */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '6rem',
              position: 'relative'
            }}>
              {/* Content Block - Left */}
              <div style={{ 
                width: '45%', 
                paddingRight: '3rem',
                textAlign: 'right'
              }}>
                <div style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ 
                      color: '#0070f3', 
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Step 1
                    </span>
                  </div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: '1rem',
                    color: '#222'
                  }}>
                    Create Your Free Account
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    Sign up in minutes and complete our assessment. We'll analyze your situation and create a personalized relocation strategy.
                  </p>
                </div>
              </div>

              {/* Central Node */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                background: '#0070f3',
                borderRadius: '50%',
                border: '4px solid #ffffff',
                boxShadow: '0 0 0 4px rgba(0, 112, 243, 0.2)',
                zIndex: 2
              }} />

              {/* Illustration - Right */}
              <div style={{ 
                width: '45%', 
                paddingLeft: '3rem'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  padding: '2rem',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px',
                  color: '#666',
                  fontStyle: 'italic'
                }}
                role="img"
                aria-label="Dashboard screenshot showing account creation interface"
                >
                  [Dashboard Screenshot - Account Creation]
                </div>
              </div>
            </div>

            {/* Step 2 - Right Side */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '6rem',
              position: 'relative'
            }}>
              {/* Illustration - Left */}
              <div style={{ 
                width: '45%', 
                paddingRight: '3rem'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  padding: '2rem',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px',
                  color: '#666',
                  fontStyle: 'italic'
                }}
                role="img"
                aria-label="Progress tracking interface showing relocation status"
                >
                  [Progress Tracking Interface]
                </div>
              </div>

              {/* Central Node */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                background: '#10b981',
                borderRadius: '50%',
                border: '4px solid #ffffff',
                boxShadow: '0 0 0 4px rgba(16, 185, 129, 0.2)',
                zIndex: 2
              }} />

              {/* Content Block - Right */}
              <div style={{ 
                width: '45%', 
                paddingLeft: '3rem',
                textAlign: 'left'
              }}>
                <div style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ 
                      color: '#10b981', 
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Step 2
                    </span>
                  </div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: '1rem',
                    color: '#222'
                  }}>
                    Expert Execution
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    Our team handles all paperwork and appointments. Track your progress in real-time through our dashboard.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 - Left Side */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '4rem',
              position: 'relative'
            }}>
              {/* Content Block - Left */}
              <div style={{ 
                width: '45%', 
                paddingRight: '3rem',
                textAlign: 'right'
              }}>
                <div style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  padding: '2.5rem',
                  boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
                  border: '1px solid #e2e8f0'
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <span style={{ 
                      color: '#f59e0b', 
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px'
                    }}>
                      Step 3
                    </span>
                  </div>
                  <h3 style={{ 
                    fontSize: '1.5rem', 
                    fontWeight: '700', 
                    marginBottom: '1rem',
                    color: '#222'
                  }}>
                    Welcome to Portugal
                  </h3>
                  <p style={{ 
                    color: '#666', 
                    lineHeight: '1.6',
                    fontSize: '1rem'
                  }}>
                    Celebrate your successful move! Receive ongoing support as you settle into your new life in Portugal.
                  </p>
                </div>
              </div>

              {/* Central Node */}
              <div style={{
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '20px',
                height: '20px',
                background: '#f59e0b',
                borderRadius: '50%',
                border: '4px solid #ffffff',
                boxShadow: '0 0 0 4px rgba(245, 158, 11, 0.2)',
                zIndex: 2
              }} />

              {/* Illustration - Right */}
              <div style={{ 
                width: '45%', 
                paddingLeft: '3rem'
              }}>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  borderRadius: '12px',
                  padding: '2rem',
                  height: '200px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid #e2e8f0',
                  fontSize: '14px',
                  color: '#666',
                  fontStyle: 'italic'
                }}>
                  [Success Celebration & Support Hub]
                </div>
              </div>
            </div>
          </div>

          {/* Process Visualization */}
          <div style={{
            background: '#ffffff',
            borderRadius: '20px',
            padding: '3rem 2rem',
            boxShadow: '0 8px 30px rgba(0, 0, 0, 0.08)',
            border: '1px solid #e2e8f0',
            marginTop: '2rem'
          }}>
            <h4 style={{ 
              textAlign: 'center',
              marginBottom: '2rem',
              color: '#222',
              fontSize: '1.3rem',
              fontWeight: '700'
            }}>
              Your Relocation Journey
            </h4>
            <ProgressIndicator 
              currentStep={2}
              steps={[
                "Consultation",
                "Documentation", 
                "Application",
                "Processing",
                "Welcome!"
              ]}
              size="small"
            />
            <p style={{
              textAlign: 'center',
              color: '#666',
              fontSize: '14px',
              marginTop: '1rem'
            }}>
              Track your progress every step of the way
            </p>
          </div>

          {/* CTA Button */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
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
        
        {/* Footer Tag */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          fontSize: '12px',
          color: '#999',
          fontWeight: '500'
        }}>
          Design Item—005
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
          }} noValidate>
            <div style={{ flex: '1', minWidth: '280px' }}>
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={email}
                onChange={handleEmailChange}
                onBlur={handleEmailBlur}
                style={{ 
                  padding: '16px 20px', 
                  borderRadius: '12px', 
                  border: `2px solid ${
                    emailError 
                      ? '#ef4444' 
                      : email && !emailError && emailTouched 
                        ? '#10b981' 
                        : '#e5e7eb'
                  }`, 
                  fontSize: '16px', 
                  width: '100%',
                  fontFamily: 'inherit',
                  outline: 'none',
                  transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
                  boxShadow: emailError 
                    ? '0 0 0 3px rgba(239, 68, 68, 0.1)'
                    : email && !emailError && emailTouched
                      ? '0 0 0 3px rgba(16, 185, 129, 0.1)'
                      : 'none'
                }}
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'email-error' : undefined}
              />
              {emailError && (
                <div 
                  id="email-error" 
                  style={{ 
                    color: '#ef4444', 
                    fontSize: '14px', 
                    marginTop: '8px',
                    textAlign: 'left'
                  }}
                  role="alert"
                >
                  {emailError}
                </div>
              )}
            </div>
            <button 
              type="submit" 
              className="cta-button"
              disabled={isLoading}
              style={{ 
                ...buttonStyle, 
                padding: '16px 32px', 
                fontSize: '16px',
                fontWeight: '700',
                borderRadius: '12px',
                background: isLoading 
                  ? '#94a3b8' 
                  : 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
                border: 'none',
                whiteSpace: 'nowrap',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.7 : 1
              }}
              aria-label="Get your free Portugal relocation checklist"
            >
              {isLoading ? (
                <>
                  <span style={{ 
                    display: 'inline-block', 
                    width: '16px', 
                    height: '16px', 
                    border: '2px solid #ffffff', 
                    borderTopColor: 'transparent', 
                    borderRadius: '50%', 
                    animation: 'spin 1s linear infinite',
                    marginRight: '8px'
                  }}></span>
                  Processing...
                </>
              ) : (
                'Get Free Checklist 📋'
              )}
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
        padding: '4rem 0',
        background: '#fff'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem', textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ 
            fontSize: '3rem', 
            fontWeight: '900', 
            marginBottom: '1rem',
            color: '#222',
            fontFamily: 'Inter, sans-serif'
          }}>
            Success Stories
          </h2>
          <p style={{ 
            fontSize: '1.2rem', 
            color: '#666',
            fontFamily: 'Inter, sans-serif'
          }}>
            Real people, real results. See what our clients say about their relocation journey.
          </p>
        </div>
        
        <AnimatedTestimonials 
          testimonials={testimonials} 
          autoplay={true}
        />
      </section>

      {/* FAQ Section with Schema Markup */}
      <section style={{ 
        padding: '6rem 2rem',
        background: '#f8f9fb'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: '3rem', 
              fontWeight: '900', 
              marginBottom: '1rem',
              color: '#222'
            }} className="section-title">
              Frequently Asked Questions
            </h2>
            <p style={{ 
              fontSize: '1.2rem', 
              color: '#666',
              lineHeight: '1.6'
            }}>
              Get answers to the most common questions about relocating to Portugal
            </p>
          </div>
          
          <div style={{ 
            display: 'grid', 
            gap: '1.5rem'
          }}>
            {[
              {
                question: "How long does the Portugal relocation process take?",
                answer: "Our average timeline is 90 days from start to finish. This includes visa processing, document preparation, and all necessary appointments. The exact timeline depends on your specific visa type and circumstances."
              },
              {
                question: "What visa types do you help with?",
                answer: "We assist with all major Portugal visa types including D7 Passive Income Visa, Digital Nomad Visa, Golden Visa, Student Visas, and Work Visas. Our experts will help determine the best option for your situation."
              },
              {
                question: "Do I need to speak Portuguese to relocate?",
                answer: "No, Portuguese is not required initially. However, we recommend starting to learn as it will help with integration. We can connect you with language learning resources as part of our service."
              },
              {
                question: "What is a NIF and why do I need it?",
                answer: "A NIF (Número de Identificação Fiscal) is Portugal's tax identification number. It's required for opening bank accounts, signing contracts, renting property, and most official transactions in Portugal."
              },
              {
                question: "How much does your service cost?",
                answer: "Our pricing varies based on the services you need. We offer transparent, fixed-price packages with no hidden fees. Contact us for a free consultation to get a personalized quote for your situation."
              }
            ].map((faq, i) => (
              <div 
                key={i}
                style={{ 
                  background: '#ffffff',
                  borderRadius: '16px',
                  border: '1px solid #e2e8f0',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
              >
                <h3 style={{ 
                  padding: '1.5rem',
                  margin: 0,
                  fontSize: '1.2rem',
                  fontWeight: '700',
                  color: '#222',
                  borderBottom: '1px solid #f1f5f9'
                }}>
                  {faq.question}
                </h3>
                <div style={{ 
                  padding: '1.5rem',
                  color: '#666',
                  lineHeight: '1.6'
                }}>
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* FAQ Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "How long does the Portugal relocation process take?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our average timeline is 90 days from start to finish. This includes visa processing, document preparation, and all necessary appointments. The exact timeline depends on your specific visa type and circumstances."
                }
              },
              {
                "@type": "Question", 
                "name": "What visa types do you help with?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We assist with all major Portugal visa types including D7 Passive Income Visa, Digital Nomad Visa, Golden Visa, Student Visas, and Work Visas. Our experts will help determine the best option for your situation."
                }
              },
              {
                "@type": "Question",
                "name": "Do I need to speak Portuguese to relocate?", 
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "No, Portuguese is not required initially. However, we recommend starting to learn as it will help with integration. We can connect you with language learning resources as part of our service."
                }
              },
              {
                "@type": "Question",
                "name": "What is a NIF and why do I need it?",
                "acceptedAnswer": {
                  "@type": "Answer", 
                  "text": "A NIF (Número de Identificação Fiscal) is Portugal's tax identification number. It's required for opening bank accounts, signing contracts, renting property, and most official transactions in Portugal."
                }
              },
              {
                "@type": "Question",
                "name": "How much does your service cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Our pricing varies based on the services you need. We offer transparent, fixed-price packages with no hidden fees. Contact us for a free consultation to get a personalized quote for your situation."
                }
              }
            ]
          })}
        </script>
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
