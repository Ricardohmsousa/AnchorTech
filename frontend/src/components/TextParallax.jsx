import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  const IMG_PADDING = 24;
  
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
        position: 'relative'
      }}
    >
      <div style={{ position: 'relative', height: '120vh' }}>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const IMG_PADDING = 24;
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 4]);

  return (
    <motion.div
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
        position: 'sticky',
        zIndex: 0,
        overflow: 'hidden',
        borderRadius: '32px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)'
      }}
      ref={targetRef}
    >
      {/* Enhanced gradient overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.7) 100%)',
          opacity,
          backdropFilter: `blur(${blur}px)`
        }}
      />
      
      {/* Subtle pattern overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
          pointerEvents: 'none'
        }}
      />
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [200, -200]);
  const opacity = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.2, 0.5, 0.8], [0.8, 1, 0.8]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        scale,
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center',
        zIndex: 10
      }}
      ref={targetRef}
    >
      {/* Glass morphism container */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(20px)',
        borderRadius: '32px',
        padding: '3rem 2rem',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        maxWidth: '600px',
        margin: '0 1rem'
      }}>
        {/* Badge */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
            color: 'rgba(255, 255, 255, 0.9)',
            padding: '8px 20px',
            borderRadius: '20px',
            fontSize: '14px',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            fontFamily: 'Inter, sans-serif',
            display: 'inline-block'
          }}>
            {subheading}
          </span>
        </div>
        
        {/* Main heading */}
        <h1 style={{
          fontSize: 'clamp(2.5rem, 5vw, 4rem)',
          fontWeight: '800',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.03em',
          lineHeight: '1.1',
          margin: 0,
          background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.8) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}>
          {heading}
        </h1>
      </div>
    </motion.div>
  );
};

const ContentSection = ({ title, content, buttonText = "Learn More" }) => (
  <div style={{
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
      backgroundImage: `radial-gradient(circle at 20% 80%, rgba(0, 112, 243, 0.03) 0%, transparent 50%),
                       radial-gradient(circle at 80% 20%, rgba(0, 212, 255, 0.03) 0%, transparent 50%)`,
      pointerEvents: 'none'
    }} />
    
    <div style={{
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '3rem',
      padding: '6rem 2rem 8rem 2rem',
      maxWidth: '1200px',
      position: 'relative',
      zIndex: 1,
      '@media (min-width: 768px)': {
        gridTemplateColumns: '1fr 1.5fr',
        gap: '4rem',
        padding: '8rem 2rem 10rem 2rem'
      }
    }}>
      {/* Title Section */}
      <div>
        <h2 style={{
          fontSize: 'clamp(1.875rem, 3vw, 2.5rem)',
          fontWeight: '800',
          color: '#1a202c',
          lineHeight: '1.2',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '-0.025em',
          marginBottom: '1.5rem',
          background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {title}
        </h2>
        
        {/* Decorative line */}
        <div style={{
          width: '80px',
          height: '4px',
          background: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
          borderRadius: '2px',
          marginBottom: '2rem'
        }} />
      </div>
      
      {/* Content Section */}
      <div>
        <div style={{ marginBottom: '3rem' }}>
          {content.map((paragraph, index) => (
            <p key={index} style={{
              marginBottom: '1.5rem',
              fontSize: '1.125rem',
              color: '#475569',
              lineHeight: '1.7',
              fontFamily: 'Inter, sans-serif',
              fontWeight: '400'
            }}>
              {paragraph}
            </p>
          ))}
        </div>
        
        {/* Enhanced Button */}
        <button style={{
          background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
          color: 'white',
          fontWeight: '700',
          padding: '20px 40px',
          borderRadius: '16px',
          border: 'none',
          fontSize: '1.125rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: 'scale(1)',
          boxShadow: '0 8px 24px rgba(0, 112, 243, 0.3)',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.025em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.75rem',
          minWidth: '240px',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px) scale(1.02)';
          e.target.style.boxShadow = '0 12px 32px rgba(0, 112, 243, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 8px 24px rgba(0, 112, 243, 0.3)';
        }}>
          {buttonText}
          <span style={{ fontSize: '1.25rem' }}>→</span>
        </button>
      </div>
    </div>
  </div>
);

export { ContentSection };