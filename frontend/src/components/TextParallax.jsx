import React, { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";

// Check for reduced motion preference
const useReducedMotion = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = () => setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);
  
  return prefersReducedMotion;
};

export const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  const IMG_PADDING = 24;
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { 
    once: false, 
    margin: "-20% 0px -20% 0px" 
  });
  
  return (
    <motion.div
      ref={containerRef}
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
        position: 'relative'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0.7 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div style={{ position: 'relative', height: '100vh' }}>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </motion.div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const IMG_PADDING = 24;
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  // Use spring animations for smoother motion
  const scale = useSpring(
    useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [1, 1] : [1, 0.85]),
    { stiffness: 400, damping: 40 }
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.4]),
    { stiffness: 300, damping: 30 }
  );
  const blur = useSpring(
    useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 2]),
    { stiffness: 300, damping: 30 }
  );
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.7]);

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
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.1)',
        willChange: 'transform, filter, opacity'
      }}
      ref={targetRef}
    >
      {/* Enhanced gradient overlay with dynamic opacity */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.6) 100%)',
          opacity,
          backdropFilter: `blur(${blur}px) brightness(${brightness})`,
          willChange: 'opacity, backdrop-filter'
        }}
      />
      
      {/* Animated pattern overlay */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)`,
          pointerEvents: 'none',
          opacity: useTransform(scrollYProgress, [0, 1], [0.8, 0.3])
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%']
        }}
        transition={{
          duration: 20,
          ease: "linear",
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Loading state indicator */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'rgba(255, 255, 255, 0.6)',
          fontSize: '14px',
          fontFamily: 'Inter, sans-serif',
          pointerEvents: 'none',
          opacity: 0,
          animation: 'fadeInOut 2s ease-in-out'
        }}
      >
        Loading experience...
      </div>
    </motion.div>
  );
};

const OverlayCopy = ({ subheading, heading }) => {
  const targetRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const isInView = useInView(targetRef, { once: false, margin: "-30%" });
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"],
  });

  // Enhanced animations with spring physics
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [150, -150]),
    { stiffness: 300, damping: 30 }
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0, 1, 1, 0]),
    { stiffness: 400, damping: 40 }
  );
  const scale = useSpring(
    useTransform(scrollYProgress, [0.1, 0.3, 0.7, 0.9], [0.85, 1, 1, 0.85]),
    { stiffness: 300, damping: 30 }
  );

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
        zIndex: 10,
        willChange: 'transform, opacity'
      }}
      ref={targetRef}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.8
      }}
      transition={{ 
        duration: 0.8, 
        ease: [0.25, 0.1, 0.25, 1],
        delay: isInView ? 0.2 : 0
      }}
    >
      {/* Enhanced glass morphism container */}
      <motion.div 
        style={{
          background: 'rgba(255, 255, 255, 0.12)',
          backdropFilter: 'blur(24px) saturate(180%)',
          borderRadius: '32px',
          padding: 'clamp(2rem, 5vw, 3rem) clamp(1.5rem, 4vw, 2rem)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          boxShadow: '0 32px 64px -12px rgba(0, 0, 0, 0.35), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          maxWidth: 'min(700px, 90vw)',
          margin: '0 1rem',
          position: 'relative',
          overflow: 'hidden'
        }}
        whileHover={{
          scale: prefersReducedMotion ? 1 : 1.02,
          boxShadow: '0 40px 80px -12px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)'
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Animated background shimmer */}
        <motion.div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            pointerEvents: 'none'
          }}
          animate={{
            left: ['100%', '-100%']
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatDelay: 5
          }}
        />
        
        {/* Enhanced Badge */}
        <motion.div 
          style={{ marginBottom: '1.5rem' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <span style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.15) 100%)',
            color: 'rgba(255, 255, 255, 0.95)',
            padding: '10px 24px',
            borderRadius: '24px',
            fontSize: 'clamp(12px, 2vw, 14px)',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '1.5px',
            border: '1px solid rgba(255, 255, 255, 0.35)',
            fontFamily: 'Inter, sans-serif',
            display: 'inline-block',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
          }}>
            {subheading}
          </span>
        </motion.div>
        
        {/* Enhanced main heading with text animation */}
        <motion.h1 
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            fontWeight: '800',
            fontFamily: 'Inter, sans-serif',
            letterSpacing: '-0.03em',
            lineHeight: '1.1',
            margin: 0,
            background: 'linear-gradient(135deg, #ffffff 0%, rgba(255, 255, 255, 0.85) 50%, #ffffff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
            backgroundSize: '200% 200%'
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ 
            opacity: isInView ? 1 : 0, 
            y: isInView ? 0 : 30,
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ 
            opacity: { delay: 0.6, duration: 0.8 },
            y: { delay: 0.6, duration: 0.8 },
            backgroundPosition: { duration: 4, ease: "easeInOut", repeat: Infinity }
          }}
        >
          {heading}
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

const ContentSection = ({ title, content, buttonText = "Learn More" }) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-20%" });
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div 
      ref={sectionRef}
      style={{
        background: 'transparent',
        position: 'relative',
        overflow: 'hidden'
      }}
      initial={{ opacity: 0, y: prefersReducedMotion ? 0 : 40 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        y: isInView ? 0 : (prefersReducedMotion ? 0 : 40)
      }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
    
    <div style={{
      margin: '0 auto',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '2rem',
      padding: '3rem 2rem 4rem 2rem',
      maxWidth: '1200px',
      position: 'relative',
      zIndex: 1,
      '@media (min-width: 768px)': {
        gridTemplateColumns: '1fr 1.5fr',
        gap: '3rem',
        padding: '4rem 2rem 5rem 2rem'
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
          marginBottom: '1rem',
          background: 'linear-gradient(135deg, #1a202c 0%, #2d3748 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {title}
        </h2>
        
        {/* Decorative line */}
        <div style={{
          width: '60px',
          height: '3px',
          background: 'linear-gradient(135deg, #0070f3 0%, #00d4ff 100%)',
          borderRadius: '2px',
          marginBottom: '1.5rem'
        }} />
      </div>
      
      {/* Content Section */}
      <div>
        <div style={{ marginBottom: '2rem' }}>
          {content.map((paragraph, index) => (
            <p key={index} style={{
              marginBottom: '1.25rem',
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
          padding: '16px 32px',
          borderRadius: '12px',
          border: 'none',
          fontSize: '1rem',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: 'scale(1)',
          boxShadow: '0 6px 20px rgba(0, 112, 243, 0.3)',
          fontFamily: 'Inter, sans-serif',
          letterSpacing: '0.025em',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          minWidth: '200px',
          justifyContent: 'center'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px) scale(1.02)';
          e.target.style.boxShadow = '0 8px 24px rgba(0, 112, 243, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0) scale(1)';
          e.target.style.boxShadow = '0 6px 20px rgba(0, 112, 243, 0.3)';
        }}>
          {buttonText}
          <span style={{ fontSize: '1.125rem' }}>→</span>
        </button>
      </div>
    </div>
  </motion.div>
  );
};

export { ContentSection };