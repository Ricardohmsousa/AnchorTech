import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}) => {
  const [active, setActive] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const isActive = (index) => {
    return index === active;
  };

  useEffect(() => {
    if (autoplay) {
      const interval = setInterval(handleNext, 5000);
      return () => clearInterval(interval);
    }
  }, [autoplay]);

  const randomRotateY = () => {
    return Math.floor(Math.random() * 21) - 10;
  };

  const containerStyles = {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: isMobile ? '3rem 1rem' : '5rem 2rem',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    // Reset any inherited styles
    boxSizing: 'border-box',
    position: 'relative',
    isolation: 'isolate'
  };

  const gridStyles = {
    position: 'relative',
    display: 'grid',
    gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
    gap: isMobile ? '3rem' : '5rem',
    alignItems: 'center'
  };

  const imageContainerStyles = {
    position: 'relative',
    height: isMobile ? '280px' : '320px',
    width: '100%'
  };

  const contentStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: '1rem 0',
    minHeight: isMobile ? 'auto' : '320px'
  };

  const nameStyles = {
    fontSize: isMobile ? '1.25rem' : '1.5rem',
    fontWeight: 'bold',
    color: '#000',
    marginBottom: '0.5rem'
  };

  const designationStyles = {
    fontSize: '0.875rem',
    color: '#6b7280',
    marginBottom: '2rem'
  };

  const quoteStyles = {
    fontSize: isMobile ? '1rem' : '1.125rem',
    color: '#4b5563',
    lineHeight: '1.6'
  };

  const controlsStyles = {
    display: 'flex',
    gap: '1rem',
    paddingTop: isMobile ? '2rem' : '3rem',
    justifyContent: isMobile ? 'center' : 'flex-start'
  };

  const buttonStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '32px',
    width: '32px',
    borderRadius: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    border: 'none',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    outline: 'none',
    boxShadow: 'none'
  };

  return (
    <div style={{
      // Complete style isolation wrapper
      all: 'unset',
      display: 'block',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={containerStyles}>
      <div style={gridStyles}>
        <div>
          <div style={imageContainerStyles}>
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src}
                  initial={{
                    opacity: 0,
                    scale: 0.9,
                    z: -100,
                    rotate: randomRotateY(),
                  }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.7,
                    scale: isActive(index) ? 1 : 0.95,
                    z: isActive(index) ? 0 : -100,
                    rotate: isActive(index) ? 0 : randomRotateY(),
                    zIndex: isActive(index)
                      ? 40
                      : testimonials.length + 2 - index,
                    y: isActive(index) ? [0, -80, 0] : 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.9,
                    z: 100,
                    rotate: randomRotateY(),
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    transformOrigin: 'bottom'
                  }}
                >
                  <img
                    src={testimonial.src}
                    alt={testimonial.name}
                    width={500}
                    height={500}
                    draggable={false}
                    style={{
                      height: '100%',
                      width: '100%',
                      borderRadius: '1.5rem',
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                  />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
        <div style={contentStyles}>
          <motion.div
            key={active}
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 style={nameStyles}>
              {testimonials[active].name}
            </h3>
            <p style={designationStyles}>
              {testimonials[active].designation}
            </p>
            <motion.p style={quoteStyles}>
              {testimonials[active].quote.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  style={{
                    display: 'inline-block'
                  }}
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>
          <div style={controlsStyles}>
            <button
              onClick={handlePrev}
              style={buttonStyles}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
              }}
            >
              <ChevronLeft style={{
                height: '20px',
                width: '20px',
                color: '#333',
                transition: 'transform 0.3s ease'
              }} />
            </button>
            <button
              onClick={handleNext}
              style={buttonStyles}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
              }}
            >
              <ChevronRight style={{
                height: '20px',
                width: '20px',
                color: '#333',
                transition: 'transform 0.3s ease'
              }} />
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};