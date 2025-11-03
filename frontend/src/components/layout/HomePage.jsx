
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProgressIndicator from "../ProgressIndicator";
import { AnimatedTestimonials } from "../AnimatedTestimonials";
import ShuffleHero from "../ShuffleHero";
import { TextParallaxContent, ContentSection } from "../TextParallax";
import Footer from "./Footer";

import { layout, heroHeader, heroImage, heroOverlay, heroContent, section, card, footer as footerStyle, button as buttonStyle } from "../../styles/sharedStyles";

const testimonials = [
  {
    name: "Maria S.",
    location: "Lisbon, Portugal",
    quote: "Atlantical made my move to Portugal seamless. My case manager was always available and the process was so much easier than I expected!",
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
    quote: "From document preparation to finding housing, Atlantical handled everything. Now my family and I are living our dream in Portugal.",
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
  { number: "90 days", label: "Average Processing Time" },
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
      
      // Store email submission in localStorage to grant access to checklist page
      localStorage.setItem('checklistEmailSubmitted', 'true');
      localStorage.setItem('checklistEmail', email);
      
      // Redirect to documents page after 2 seconds
      setTimeout(() => {
        navigate("/documents");
      }, 2000);
    }, 1500);
  };

  const handleGetStarted = () => {
    navigate("/services");
  };

  const handleDocumentChecklistClick = () => {
    // Scroll to the email capture section
    const checklistSection = document.getElementById('checklist-section');
    if (checklistSection) {
      checklistSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Listen for scroll to checklist event from header
  useEffect(() => {
    const handleScrollToChecklist = () => {
      handleDocumentChecklistClick();
    };

    window.addEventListener('scrollToChecklist', handleScrollToChecklist);
    
    return () => {
      window.removeEventListener('scrollToChecklist', handleScrollToChecklist);
    };
  }, []);

  const handleBookConsultation = () => {
    // TODO: Integrate with booking system
    navigate("/contact");
  };

  return (
    <div style={{ 
      background: '#ffffff', 
      minHeight: '100vh',
      width: '100%',
      overflowX: 'hidden'
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
        
        /* Global responsive reset */
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
          box-sizing: border-box;
        }
        
        html, body {
          overflow-x: hidden;
          width: 100%;
          margin: 0;
          padding: 0;
        }
        
        /* Responsive container */
        .responsive-container {
          width: 100%;
          max-width: 100vw;
          margin: 0 auto;
          padding: 0 1rem;
          box-sizing: border-box;
        }
        
        @media (min-width: 640px) {
          .responsive-container {
            padding: 0 1.5rem;
          }
        }
        
        @media (min-width: 1024px) {
          .responsive-container {
            padding: 0 2rem;
          }
        }
        
        @media (min-width: 1280px) {
          .responsive-container {
            max-width: 1280px;
            padding: 0 2rem;
          }
        }
        
        /* Prevent horizontal overflow */
        img, video, canvas, svg {
          max-width: 100%;
          height: auto;
        }
        
        /* Grid responsiveness */
        .responsive-grid {
          display: grid;
          gap: 1.5rem;
          grid-template-columns: 1fr;
        }
        
        @media (min-width: 640px) {
          .responsive-grid-2 {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (min-width: 768px) {
          .responsive-grid {
            gap: 2rem;
          }
          
          .responsive-grid-3 {
            grid-template-columns: repeat(3, 1fr);
          }
        }
        
        @media (min-width: 1024px) {
          .responsive-grid {
            gap: 2.5rem;
          }
          
          .responsive-grid-4 {
            grid-template-columns: repeat(4, 1fr);
          }
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
          color: #E2725B;
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
          background: linear-gradient(135deg, #E2725B 0%, #A94438 100%);
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
          box-shadow: 0 12px 35px rgba(226, 114, 91, 0.4);
        }
        
        .secondary-button {
          background: rgba(255, 255, 255, 0.95);
          color: #E2725B;
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
          background: linear-gradient(135deg, rgba(226, 114, 91, 0.02) 0%, rgba(226, 114, 91, 0.05) 100%);
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
          background: linear-gradient(135deg, #E2725B 0%, #A94438 100%);
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
        
        /* Enhanced parallax animations */
        @keyframes fadeInOut {
          0%, 100% { opacity: 0; }
          50% { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* Enhanced scroll behavior */
        html {
          scroll-behavior: smooth;
        }
        
        @media (prefers-reduced-motion: reduce) {
          html {
            scroll-behavior: auto;
          }
        }
        
        /* Performance optimizations */
        .parallax-container {
          will-change: transform;
          backface-visibility: hidden;
          transform: translateZ(0);
        }
        
        .glass-morphism {
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
        }
        
        /* Footer responsive grid */
        .footer-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(3rem, 6vw, 4rem) clamp(1.5rem, 3vw, 3rem);
        }
        
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: repeat(6, 1fr);
          }
        }
        
        .footer-company {
          grid-column: span 2;
        }
        
        @media (min-width: 768px) {
          .footer-company {
            grid-column: span 3;
          }
        }
        
        @media (min-width: 1024px) {
          .footer-company {
            grid-column: span 2;
            padding-right: 2rem;
          }
        }
        
        .footer-newsletter {
          grid-column: span 2;
        }
        
        @media (min-width: 768px) {
          .footer-newsletter {
            grid-column: span 1;
          }
        }
        
        @media (min-width: 1024px) {
          .footer-newsletter {
            grid-column: span 2;
            padding-left: 2rem;
          }
        }
        
        .footer-bottom {
          display: flex;
          flex-direction: column;
          gap: 1rem;
          text-align: center;
        }
        
        @media (min-width: 768px) {
          .footer-bottom {
            flex-direction: row;
            justify-content: space-between;
            align-items: center;
          }
        }
      `}</style>

      {/* Hero Section - Shuffle Grid Animation */}
      <ShuffleHero />

      {/* Parallax Storytelling Sections */}
      <div style={{ 
        background: '#fff',
        marginTop: '-2rem' 
      }}>
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
            onClick={() => navigate("/services")}
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
            buttonText="Get Document Checklist"
            onClick={handleDocumentChecklistClick}
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
            onClick={() => navigate("/services")}
          />
        </TextParallaxContent>
      </div>

      {/* Social Proof Stats - Enhanced with better spacing and modern design */}
      <section style={{
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        padding: 'clamp(4rem, 8vw, 8rem) 1rem',
        position: 'relative',
        overflow: 'hidden',
        width: '100%'
      }}>
        {/* Background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(226, 114, 91, 0.05) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(169, 68, 56, 0.05) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }} />
        
        <div className="responsive-container" style={{ 
          maxWidth: '1400px', 
          margin: '0 auto', 
          textAlign: 'center',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Badge */}
          <div style={{ marginBottom: '2rem' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, rgba(226, 114, 91, 0.1) 0%, rgba(169, 68, 56, 0.1) 100%)', 
              color: '#E2725B', 
              padding: '12px 28px', 
              borderRadius: '30px', 
              fontSize: '14px',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              border: '1px solid rgba(226, 114, 91, 0.2)',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
              backdropFilter: 'blur(10px)'
            }}>
              ✨ Proven Track Record
            </span>
          </div>
          
          {/* Main Heading */}
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: '800',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#1a202c',
            letterSpacing: '-0.03em',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.1'
          }}>
            The Numbers Tell Our Story
          </h2>
          
          {/* Subtitle */}
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.25rem)',
            color: '#64748b',
            maxWidth: 'min(700px, 90vw)',
            margin: '0 auto clamp(5rem, 10vw, 8rem) auto',
            fontWeight: '400',
            lineHeight: '1.7',
            fontFamily: 'Inter, sans-serif'
          }}>
            Join thousands of successful relocators who chose the proven path to Portugal
          </p>
          
          {/* Stats Grid */}
          <div className="responsive-grid" style={{ 
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(250px, 100%), 1fr))', 
            gap: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            display: 'grid'
          }}>
            {stats.map((stat, i) => (
              <div 
                key={i} 
                style={{ 
                  background: 'rgba(255, 255, 255, 0.9)',
                  borderRadius: '24px',
                  padding: 'clamp(2rem, 5vw, 3.5rem) clamp(1.5rem, 4vw, 2.5rem)',
                  boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.8)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.12), 0 0 0 1px rgba(255, 255, 255, 0.9)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 10px 40px rgba(0, 0, 0, 0.06), 0 0 0 1px rgba(255, 255, 255, 0.8)';
                }}
              >
                {/* Gradient accent line */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? '#E2725B' : '#A94438'} 0%, ${i % 2 === 0 ? '#A94438' : '#E2725B'} 100%)`
                }} />
                
                {/* Icon */}
                <div style={{
                  width: '60px',
                  height: '60px',
                  background: `linear-gradient(135deg, ${i % 2 === 0 ? 'rgba(226, 114, 91, 0.1)' : 'rgba(169, 68, 56, 0.1)'} 0%, ${i % 2 === 0 ? 'rgba(169, 68, 56, 0.1)' : 'rgba(226, 114, 91, 0.1)'} 100%)`,
                  borderRadius: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 1.5rem auto',
                  fontSize: '24px'
                }}>
                  {i === 0 ? '🎯' : i === 1 ? '📊' : i === 2 ? '⚡' : '🛡️'}
                </div>
                
                {/* Number */}
                <div style={{ 
                  fontSize: 'clamp(2rem, 6vw, 3.5rem)', 
                  fontWeight: '800',
                  marginBottom: '0.75rem',
                  color: '#1a202c',
                  fontFamily: 'Inter, sans-serif',
                  letterSpacing: '-0.02em',
                  lineHeight: '1'
                }}>
                  {stat.number}
                </div>
                
                {/* Label */}
                <div style={{ 
                  fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                  fontWeight: '600',
                  color: '#334155',
                  fontFamily: 'Inter, sans-serif',
                  lineHeight: '1.5',
                  paddingTop: '0.5rem'
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          
          {/* Trust Indicators */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '24px',
            padding: '3.5rem 2.5rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)'
          }}>
            <p style={{
              fontSize: '1.125rem',
              color: '#64748b',
              marginBottom: '2.5rem',
              fontWeight: '600',
              fontFamily: 'Inter, sans-serif'
            }}>
              Trusted by Portugal's leading relocation communities
            </p>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '2rem',
              flexWrap: 'wrap'
            }}>
              {[
                { name: 'Portugal Tech Hub', icon: '💻' },
                { name: 'Lisbon Expat Network', icon: '🌍' },
                { name: 'Porto Business Council', icon: '🏢' },
                { name: 'Golden Visa Group', icon: '🏆' }
              ].map((partner, i) => (
                <div 
                  key={i} 
                  style={{ 
                    padding: '1rem 1.5rem', 
                    background: 'rgba(248, 250, 252, 0.8)', 
                    borderRadius: '16px', 
                    fontSize: '14px', 
                    fontWeight: '600', 
                    color: '#64748b',
                    fontFamily: 'Inter, sans-serif',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    border: '1px solid rgba(226, 232, 240, 0.5)'
                  }}
                >
                  <span>{partner.icon}</span>
                  {partner.name}
                </div>
              ))}
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
            Why Choose Atlantical?
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

      {/* Process Section - Enhanced Modern Design */}
      <section style={{ 
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(226, 114, 91, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(169, 68, 56, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.02) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }} />

        <div className="responsive-container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          position: 'relative',
          zIndex: 1
        }}>
          {/* Enhanced Header */}
          <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ 
                background: 'linear-gradient(135deg, rgba(226, 114, 91, 0.1) 0%, rgba(169, 68, 56, 0.1) 100%)',
                color: '#E2725B', 
                padding: '12px 28px',
                borderRadius: '30px',
                fontSize: '14px',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                border: '1px solid rgba(226, 114, 91, 0.2)',
                fontFamily: 'Inter, sans-serif',
                display: 'inline-block',
                backdropFilter: 'blur(10px)'
              }}>
                🚀 Your Path to Portugal
              </span>
            </div>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
              fontWeight: '800', 
              marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
              color: '#1a202c',
              lineHeight: '1.1',
              fontFamily: 'Inter, sans-serif',
              letterSpacing: '-0.03em'
            }}>
              Three Simple Steps to Success
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
              color: '#64748b',
              lineHeight: '1.7',
              maxWidth: 'min(600px, 90vw)',
              margin: '0 auto',
              marginBottom: 'clamp(3rem, 6vw, 5rem)',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400'
            }}>
              From first consultation to Portugal celebration – we guide you through every milestone
            </p>
          </div>

          {/* Enhanced Steps Grid */}
          <div className="responsive-grid" style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
            gap: 'clamp(2rem, 4vw, 3rem)',
            marginBottom: 'clamp(3rem, 6vw, 5rem)',
            display: 'grid'
          }}>
            {[
              {
                step: '01',
                color: '#E2725B',
                title: 'Strategy & Assessment',
                description: 'Complete our smart assessment and get a personalized relocation roadmap tailored to your unique situation and goals.',
                icon: '🎯',
                bgGradient: 'linear-gradient(135deg, rgba(226, 114, 91, 0.1) 0%, rgba(169, 68, 56, 0.05) 100%)',
                features: ['Free consultation', 'Personalized plan', 'Document checklist']
              },
              {
                step: '02', 
                color: '#10b981',
                title: 'Expert Execution',
                description: 'Our certified team handles all paperwork, appointments, and bureaucracy while you track progress in real-time.',
                icon: '⚡',
                bgGradient: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.05) 100%)',
                features: ['24/7 tracking', 'Expert handling', 'Regular updates']
              },
              {
                step: '03',
                color: '#f59e0b', 
                title: 'Portugal Welcome',
                description: 'Celebrate your successful move with ongoing support as you settle into your new life and join our community.',
                icon: '🎉',
                bgGradient: 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.05) 100%)',
                features: ['Settlement support', 'Community access', 'Ongoing help']
              }
            ].map((item, i) => (
              <div 
                key={i}
                style={{
                  background: `linear-gradient(135deg, ${item.bgGradient}, rgba(255, 255, 255, 0.1))`,
                  borderRadius: '24px',
                  padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2.5rem)',
                  boxShadow: `0 8px 32px ${item.color}15, 0 0 0 1px ${item.color}20`,
                  border: `1px solid ${item.color}30`,
                  backdropFilter: 'blur(20px)',
                  position: 'relative',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 16px 48px ${item.color}25, 0 0 0 1px ${item.color}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 8px 32px ${item.color}15, 0 0 0 1px ${item.color}20`;
                }}
              >
                {/* Subtle overlay for depth */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: `linear-gradient(135deg, transparent 0%, ${item.color}08 100%)`,
                  pointerEvents: 'none'
                }} />

                {/* Step Number */}
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontSize: '4rem',
                  fontWeight: '800',
                  color: item.color,
                  opacity: 0.15,
                  lineHeight: '1',
                  fontFamily: 'Inter, sans-serif'
                }}>
                  {item.step}
                </div>

                {/* Icon */}
                <div style={{
                  width: 'clamp(60px, 12vw, 80px)',
                  height: 'clamp(60px, 12vw, 80px)',
                  background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}25 100%)`,
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  fontSize: 'clamp(1.5rem, 4vw, 2rem)',
                  border: `2px solid ${item.color}20`,
                  position: 'relative',
                  zIndex: 1
                }}>
                  {item.icon}
                </div>

                {/* Content */}
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    marginBottom: '1rem'
                  }}>
                    <span style={{
                      background: item.color,
                      color: 'white',
                      padding: '6px 12px',
                      borderRadius: '20px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontFamily: 'Inter, sans-serif'
                    }}>
                      Step {i + 1}
                    </span>
                  </div>

                  <h3 style={{
                    fontSize: 'clamp(1.25rem, 3vw, 1.5rem)',
                    fontWeight: '700',
                    marginBottom: '1rem',
                    color: '#1e293b',
                    fontFamily: 'Inter, sans-serif',
                    lineHeight: '1.3'
                  }}>
                    {item.title}
                  </h3>

                  <p style={{
                    color: '#475569',
                    lineHeight: '1.6',
                    fontSize: 'clamp(0.9rem, 2.5vw, 1rem)',
                    marginBottom: '2rem',
                    fontFamily: 'Inter, sans-serif'
                  }}>
                    {item.description}
                  </p>

                  {/* Features List */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem'
                  }}>
                    {item.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          fontSize: '0.875rem',
                          color: '#334155',
                          fontWeight: '500',
                          fontFamily: 'Inter, sans-serif'
                        }}
                      >
                        <div style={{
                          width: '6px',
                          height: '6px',
                          background: item.color,
                          borderRadius: '50%',
                          flexShrink: 0
                        }} />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Success Timeline */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.8)',
            borderRadius: '24px',
            padding: '3rem 2.5rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.06)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(20px)',
            marginBottom: '4rem'
          }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h4 style={{
                fontSize: '1.5rem',
                fontWeight: '700',
                color: '#1a202c',
                marginBottom: '0.5rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                Your Complete Journey
              </h4>
              <p style={{
                color: '#64748b',
                fontSize: '1rem',
                fontFamily: 'Inter, sans-serif'
              }}>
                Track every milestone from consultation to celebration
              </p>
            </div>
            
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
          </div>

          {/* Enhanced CTA */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <p style={{
                fontSize: '1.125rem',
                color: '#64748b',
                fontFamily: 'Inter, sans-serif',
                fontWeight: '500'
              }}>
                Ready to start your Portugal journey?
              </p>
            </div>
            <button 
              style={{ 
                background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
                border: 'none',
                color: 'white',
                padding: '18px 36px',
                borderRadius: '16px',
                fontSize: '1.125rem',
                fontWeight: '700',
                fontFamily: 'Inter, sans-serif',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(226, 114, 91, 0.3)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem'
              }} 
              onClick={handleGetStarted}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.02)';
                e.target.style.boxShadow = '0 12px 32px rgba(226, 114, 91, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 8px 24px rgba(226, 114, 91, 0.3)';
              }}
            >
              Start Your Journey Today
              <span style={{ fontSize: '1.25rem' }}>→</span>
            </button>
          </div>
        </div>
      </section>

      {/* Immigration Checklist CTA */}
      <section 
        id="checklist-section"
        style={{ 
        maxWidth: '900px', 
        margin: '6rem auto', 
        background: 'linear-gradient(135deg, #eaf4ff 0%, #dbeafe 100%)', 
        borderRadius: '24px', 
        padding: '4rem 3rem', 
        textAlign: 'center', 
        boxShadow: '0 8px 30px rgba(226, 114, 91, 0.1)',
        border: '1px solid rgba(226, 114, 91, 0.1)'
      }}>
        <div style={{ marginBottom: '2rem' }}>
          <span style={{ 
            background: 'rgba(226, 114, 91, 0.1)', 
            color: '#E2725B', 
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
                  : 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
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
        padding: 'clamp(4rem, 8vw, 8rem) clamp(1rem, 4vw, 2rem)',
        background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: `radial-gradient(circle at 20% 80%, rgba(226, 114, 91, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, rgba(169, 68, 56, 0.03) 0%, transparent 50%),
                           radial-gradient(circle at 40% 40%, rgba(245, 158, 11, 0.02) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }} />
        
        <div className="responsive-container" style={{ 
          maxWidth: '1200px', 
          margin: '0 auto', 
          textAlign: 'center', 
          marginBottom: 'clamp(3rem, 6vw, 4rem)',
          position: 'relative',
          zIndex: 1
        }}>
          {/* Enhanced Badge */}
          <div style={{ marginBottom: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <span style={{ 
              background: 'linear-gradient(135deg, rgba(226, 114, 91, 0.1) 0%, rgba(169, 68, 56, 0.1) 100%)',
              color: '#E2725B', 
              padding: 'clamp(10px, 2vw, 12px) clamp(20px, 4vw, 28px)',
              borderRadius: '30px',
              fontSize: 'clamp(12px, 2.5vw, 14px)',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '1.5px',
              border: '1px solid rgba(226, 114, 91, 0.2)',
              fontFamily: 'Inter, sans-serif',
              display: 'inline-block',
              backdropFilter: 'blur(10px)'
            }}>
              ⭐ Client Success Stories
            </span>
          </div>
          
          <h2 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: '800',
            marginBottom: 'clamp(1rem, 3vw, 1.5rem)',
            color: '#1a202c',
            letterSpacing: '-0.03em',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.1',
            background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Success Stories
          </h2>
          <p style={{ 
            fontSize: 'clamp(1rem, 3vw, 1.25rem)', 
            color: '#64748b',
            fontFamily: 'Inter, sans-serif',
            lineHeight: '1.7',
            maxWidth: 'min(700px, 90vw)',
            margin: '0 auto',
            fontWeight: '400'
          }}>
            Real people, real results. See what our clients say about their relocation journey to Portugal.
          </p>
        </div>
        
        <div style={{ position: 'relative', zIndex: 1 }}>
          <AnimatedTestimonials 
            testimonials={testimonials} 
            autoplay={true}
          />
        </div>
      </section>

      {/* FAQ Section with Schema Markup */}
      <section style={{ 
        padding: 'clamp(4rem, 8vw, 6rem) clamp(1rem, 4vw, 2rem)',
        background: '#f8f9fb'
      }}>
        <div className="responsive-container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 'clamp(3rem, 6vw, 4rem)' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 5vw, 3rem)', 
              fontWeight: '900', 
              marginBottom: 'clamp(1rem, 3vw, 1rem)',
              color: '#222'
            }} className="section-title">
              Frequently Asked Questions
            </h2>
            <p style={{ 
              fontSize: 'clamp(1rem, 3vw, 1.2rem)', 
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
        background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
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
            Join thousands of successful relocators who chose Atlantical. 
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
                color: '#E2725B',
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

      <Footer />
    </div>
  );
} 
