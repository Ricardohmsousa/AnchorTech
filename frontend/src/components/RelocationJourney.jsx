import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const RelocationJourney = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { threshold: 0.3 });
  
  const journeySteps = [
    {
      id: 1,
      title: "Initial Consultation",
      subtitle: "Discover Your Path",
      description: "We analyze your unique situation, goals, and timeline to create a personalized relocation strategy tailored to your needs.",
      icon: "🎯",
      color: "#0070f3",
      gradient: "from-blue-500 to-blue-600",
      features: ["Personal assessment", "Timeline planning", "Visa recommendation", "Cost estimation"]
    },
    {
      id: 2,
      title: "Documentation & Preparation",
      subtitle: "Get Everything Ready", 
      description: "Our experts guide you through document collection, translations, and preparations for a smooth application process.",
      icon: "📋",
      color: "#10b981",
      gradient: "from-emerald-500 to-emerald-600",
      features: ["Document checklist", "Professional translations", "Application forms", "Legal requirements"]
    },
    {
      id: 3,
      title: "Application & Processing",
      subtitle: "Submit & Track",
      description: "We handle your visa application submission and provide real-time tracking throughout the entire process.",
      icon: "⚡",
      color: "#f59e0b",
      gradient: "from-amber-500 to-amber-600", 
      features: ["Application submission", "Real-time tracking", "Status updates", "Communication support"]
    },
    {
      id: 4,
      title: "Welcome to Portugal",
      subtitle: "Your New Beginning",
      description: "Celebrate your success! We continue supporting you with settling-in services and community connections.",
      icon: "🎉",
      color: "#8b5cf6",
      gradient: "from-purple-500 to-purple-600",
      features: ["Arrival support", "Community access", "Ongoing assistance", "Success celebration"]
    }
  ];

  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % journeySteps.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isInView, journeySteps.length]);

  const containerStyles = {
    padding: '6rem 2rem',
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
    position: 'relative',
    overflow: 'hidden'
  };

  const progressWidth = ((activeStep + 1) / journeySteps.length) * 100;

  return (
    <section style={containerStyles} ref={containerRef}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 206, 84, 0.1) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />
      
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <div style={{
            display: 'inline-block',
            background: 'rgba(0, 112, 243, 0.1)',
            color: '#0070f3',
            padding: '8px 20px',
            borderRadius: '25px',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            marginBottom: '1.5rem'
          }}>
            Your Journey
          </div>
          
          <h2 style={{
            fontSize: '3rem',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: '1rem',
            lineHeight: '1.1'
          }}>
            Your Relocation Journey
          </h2>
          
          <p style={{
            fontSize: '1.2rem',
            color: '#64748b',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            From first consultation to celebrating your new life in Portugal—we're with you every step of the way
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(0, 0, 0, 0.1)',
            borderRadius: '2px',
            marginBottom: '4rem',
            overflow: 'hidden'
          }}
        >
          <motion.div
            style={{
              height: '100%',
              background: 'linear-gradient(90deg, #0070f3, #10b981, #f59e0b, #8b5cf6)',
              borderRadius: '2px'
            }}
            initial={{ width: '0%' }}
            animate={{ width: `${progressWidth}%` }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </motion.div>

        {/* Journey Steps */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '2rem',
          marginBottom: '4rem'
        }}>
          {journeySteps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ delay: 0.1 * index, duration: 0.6 }}
              style={{
                background: activeStep === index 
                  ? 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)'
                  : '#ffffff',
                borderRadius: '20px',
                padding: '2rem',
                border: activeStep === index 
                  ? `2px solid ${step.color}`
                  : '2px solid #e2e8f0',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                transform: activeStep === index ? 'translateY(-8px)' : 'translateY(0px)',
                boxShadow: activeStep === index 
                  ? `0 20px 40px rgba(0, 0, 0, 0.1), 0 0 0 1px ${step.color}20`
                  : '0 4px 20px rgba(0, 0, 0, 0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
              onClick={() => setActiveStep(index)}
              whileHover={{ y: -4 }}
            >
              {/* Active indicator */}
              {activeStep === index && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    width: '12px',
                    height: '12px',
                    background: step.color,
                    borderRadius: '50%',
                    boxShadow: `0 0 0 4px ${step.color}20`
                  }}
                />
              )}

              {/* Step number */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                background: activeStep === index 
                  ? step.color
                  : 'rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
                fontSize: '1.5rem',
                marginBottom: '1.5rem',
                transition: 'all 0.3s ease'
              }}>
                {activeStep === index ? step.icon : step.id}
              </div>

              <h3 style={{
                fontSize: '1.25rem',
                fontWeight: '700',
                color: '#1e293b',
                marginBottom: '0.5rem'
              }}>
                {step.title}
              </h3>

              <p style={{
                fontSize: '0.875rem',
                color: step.color,
                fontWeight: '600',
                marginBottom: '1rem',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {step.subtitle}
              </p>

              <p style={{
                color: '#64748b',
                lineHeight: '1.6',
                marginBottom: '1.5rem',
                fontSize: '0.95rem'
              }}>
                {step.description}
              </p>

              {/* Features list */}
              {activeStep === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                    {step.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * idx, duration: 0.3 }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          marginBottom: '0.5rem',
                          fontSize: '0.875rem',
                          color: '#475569'
                        }}
                      >
                        <span style={{
                          display: 'inline-block',
                          width: '6px',
                          height: '6px',
                          background: step.color,
                          borderRadius: '50%',
                          marginRight: '0.75rem'
                        }} />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          style={{ textAlign: 'center' }}
        >
          <button
            style={{
              background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
              color: 'white',
              border: 'none',
              padding: '18px 40px',
              fontSize: '18px',
              fontWeight: '700',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 25px rgba(0, 112, 243, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 12px 35px rgba(0, 112, 243, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0px)';
              e.target.style.boxShadow = '0 8px 25px rgba(0, 112, 243, 0.3)';
            }}
          >
            Start Your Journey Today →
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default RelocationJourney;