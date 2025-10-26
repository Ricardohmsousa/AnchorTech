import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export const TextParallaxContent = ({ imgUrl, subheading, heading, children }) => {
  const IMG_PADDING = 12;
  
  return (
    <div
      style={{
        paddingLeft: IMG_PADDING,
        paddingRight: IMG_PADDING,
      }}
    >
      <div style={{ position: 'relative', height: '150vh' }}>
        <StickyImage imgUrl={imgUrl} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  );
};

const StickyImage = ({ imgUrl }) => {
  const IMG_PADDING = 12;
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["end end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

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
        borderRadius: '24px'
      }}
      ref={targetRef}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.7)',
          opacity,
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

  const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

  return (
    <motion.div
      style={{
        y,
        opacity,
        position: 'absolute',
        left: 0,
        top: 0,
        display: 'flex',
        height: '100vh',
        width: '100%',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white'
      }}
      ref={targetRef}
    >
      <p style={{
        marginBottom: '0.5rem',
        textAlign: 'center',
        fontSize: '1.25rem',
        fontFamily: 'Inter, sans-serif',
        fontWeight: '500',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        '@media (min-width: 768px)': {
          marginBottom: '1rem',
          fontSize: '1.875rem'
        }
      }}>
        {subheading}
      </p>
      <p style={{
        textAlign: 'center',
        fontSize: '2.25rem',
        fontWeight: '800',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '-0.02em',
        lineHeight: '1.1',
        '@media (min-width: 768px)': {
          fontSize: '4.5rem'
        }
      }}>
        {heading}
      </p>
    </motion.div>
  );
};

const ContentSection = ({ title, content, buttonText = "Learn More" }) => (
  <div style={{
    margin: '0 auto',
    display: 'grid',
    gridTemplateColumns: '1fr',
    gap: '2rem',
    padding: '3rem 1rem 6rem 1rem',
    maxWidth: '1200px',
    '@media (min-width: 768px)': {
      gridTemplateColumns: '1fr 2fr',
      padding: '3rem 2rem 6rem 2rem'
    }
  }}>
    <h2 style={{
      fontSize: '1.875rem',
      fontWeight: '700',
      color: '#1a1a1a',
      lineHeight: '1.2',
      fontFamily: 'Inter, sans-serif',
      letterSpacing: '-0.025em'
    }}>
      {title}
    </h2>
    <div>
      <div style={{ marginBottom: '2rem' }}>
        {content.map((paragraph, index) => (
          <p key={index} style={{
            marginBottom: '1rem',
            fontSize: '1.125rem',
            color: '#475569',
            lineHeight: '1.6',
            fontFamily: 'Inter, sans-serif',
            fontWeight: '400'
          }}>
            {paragraph}
          </p>
        ))}
      </div>
      <button style={{
        background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
        color: 'white',
        fontWeight: '700',
        padding: '18px 36px',
        borderRadius: '16px',
        border: 'none',
        fontSize: '18px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        transform: 'scale(1)',
        boxShadow: '0 4px 14px 0 rgba(0, 112, 243, 0.3)',
        minWidth: '220px',
        width: '100%',
        fontFamily: 'Inter, sans-serif',
        letterSpacing: '0.025em',
        '@media (min-width: 768px)': {
          width: 'auto'
        }
      }}
      onMouseEnter={(e) => {
        e.target.style.transform = 'scale(1.05)';
        e.target.style.boxShadow = '0 6px 20px 0 rgba(0, 112, 243, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.target.style.transform = 'scale(1)';
        e.target.style.boxShadow = '0 4px 14px 0 rgba(0, 112, 243, 0.3)';
      }}>
        {buttonText}
      </button>
    </div>
  </div>
);

export { ContentSection };