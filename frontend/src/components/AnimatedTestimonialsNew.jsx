"use client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

// Utility function to replace cn from @/lib/utils
const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const AnimatedTestimonials = ({
  testimonials,
  autoplay = false,
  className,
}) => {
  const [active, setActive] = useState(0);

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

  return (
    <div style={{
      maxWidth: '64rem',
      margin: '0 auto',
      padding: '5rem 1rem',
      fontFamily: 'Inter, system-ui, -apple-system, sans-serif',
      WebkitFontSmoothing: 'antialiased'
    }} className={cn("testimonials-container", className)}>
      <style>{`
        @media (min-width: 768px) {
          .testimonials-container {
            padding: 5rem 2rem !important;
          }
        }
        @media (min-width: 1024px) {
          .testimonials-container {
            padding: 5rem 3rem !important;
          }
        }
        .testimonials-grid {
          position: relative;
          display: grid;
          grid-template-columns: 1fr;
          gap: 5rem;
        }
        @media (min-width: 768px) {
          .testimonials-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
      
      <div className="testimonials-grid">
        <div>
          <div style={{
            position: 'relative',
            height: '20rem',
            width: '100%'
          }}>
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
                    inset: 0,
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
        
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '1rem 0'
        }}>
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
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#1a1a1a',
              marginBottom: '0.5rem',
              fontFamily: 'Inter, sans-serif'
            }}>
              {testimonials[active].name}
            </h3>
            <p style={{
              fontSize: '0.875rem',
              color: '#6b7280',
              marginBottom: '2rem',
              fontFamily: 'Inter, sans-serif'
            }}>
              {testimonials[active].visa || testimonials[active].designation}
            </p>
            <motion.p style={{
              fontSize: '1.125rem',
              color: '#475569',
              lineHeight: '1.6',
              fontFamily: 'Inter, sans-serif'
            }}>
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
          
          <div style={{
            display: 'flex',
            gap: '1rem',
            paddingTop: '3rem'
          }}>
            <style>{`
              .nav-button {
                transition: all 0.3s ease;
              }
              .nav-button:hover {
                background-color: #e5e7eb !important;
                transform: scale(1.05);
              }
              .nav-button:hover .chevron {
                transform: rotate(12deg);
              }
              .nav-button:hover .chevron-right {
                transform: rotate(-12deg);
              }
            `}</style>
            <button
              onClick={handlePrev}
              className="nav-button"
              style={{
                display: 'flex',
                height: '1.75rem',
                width: '1.75rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ChevronLeft className="chevron" style={{
                height: '1.25rem',
                width: '1.25rem',
                color: '#1a1a1a',
                transition: 'transform 0.3s ease'
              }} />
            </button>
            <button
              onClick={handleNext}
              className="nav-button"
              style={{
                display: 'flex',
                height: '1.75rem',
                width: '1.75rem',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                backgroundColor: '#f3f4f6',
                border: 'none',
                cursor: 'pointer'
              }}
            >
              <ChevronRight className="chevron chevron-right" style={{
                height: '1.25rem',
                width: '1.25rem',
                color: '#1a1a1a',
                transition: 'transform 0.3s ease'
              }} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};