import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ShuffleHero = () => {
  const navigate = useNavigate();
  return (
    <section style={{
      width: '100%',
      padding: '2rem 1rem',
      display: 'grid',
      gridTemplateColumns: '1fr',
      alignItems: 'center',
      gap: '2rem',
      maxWidth: '100vw',
      margin: '0',
      minHeight: '80vh'
    }}>
      
      <style>{`
        @media (min-width: 768px) {
          .shuffle-hero-section {
            grid-template-columns: 1fr 1fr !important;
            padding: 2rem 2rem !important;
            max-width: 100% !important;
          }
          .shuffle-hero-content {
            order: 1 !important;
            padding-left: 2rem !important;
          }
          .shuffle-hero-grid {
            order: 2 !important;
            padding-right: 2rem !important;
          }
          .shuffle-hero-title {
            font-size: 3.5rem !important;
          }
          .shuffle-hero-text {
            font-size: 1.125rem !important;
          }
        }
        @media (min-width: 1200px) {
          .shuffle-hero-content {
            padding-left: 4rem !important;
          }
          .shuffle-hero-grid {
            padding-right: 4rem !important;
          }
        }
        .shuffle-hero-section {
          width: 100%;
          padding: 2rem 1rem;
          display: grid;
          grid-template-columns: 1fr;
          align-items: center;
          gap: 2rem;
          max-width: 100%;
          margin: 0;
          min-height: 80vh;
        }
        .shuffle-hero-content {
          order: 2;
        }
        .shuffle-hero-grid {
          order: 1;
        }
        .shuffle-hero-title {
          font-size: 2.5rem;
          font-weight: 700;
          line-height: 1.1;
          color: #000000;
          margin-bottom: 1.5rem;
        }
        .shuffle-hero-text {
          font-size: 1rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
        }
      `}</style>
      
      <div className="shuffle-hero-section">
        <div className="shuffle-hero-content">
          <span style={{
            display: 'block',
            marginBottom: '1rem',
            fontSize: '0.875rem',
            color: '#0070f3',
            fontWeight: '600',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}>
            🏆 Portugal's #1 Relocation Platform
          </span>
          <h1 className="shuffle-hero-title">
            Your Gateway to
            <span style={{ 
              background: 'linear-gradient(135deg, #0070f3 0%, #0051cc 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              display: 'block'
            }}>
              Portugal
            </span>
            Awaits
          </h1>
          <p className="shuffle-hero-text">
            Join <strong>5,000+ successful relocators</strong> who chose the smart way to move. Our proven system eliminates the guesswork with a <strong>99% success rate</strong> and <strong>average 90-day timeline</strong>.
          </p>
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
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
              minWidth: '220px'
            }}
            onClick={() => navigate('/application')}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 6px 20px 0 rgba(0, 112, 243, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = '0 4px 14px 0 rgba(0, 112, 243, 0.3)';
            }}>
              🚀 Start Your Journey
            </button>
            <button style={{
              background: 'rgba(0, 112, 243, 0.1)',
              color: '#0070f3',
              fontWeight: '600',
              padding: '18px 36px',
              borderRadius: '16px',
              border: '2px solid #0070f3',
              fontSize: '18px',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              minWidth: '220px'
            }}
            onClick={() => navigate('/contact')}
            onMouseEnter={(e) => {
              e.target.style.background = '#0070f3';
              e.target.style.color = 'white';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(0, 112, 243, 0.1)';
              e.target.style.color = '#0070f3';
            }}>
              📞 Book Free Call
            </button>
          </div>
          
          {/* Trust Indicators */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
            color: '#666', 
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
        <div className="shuffle-hero-grid">
          <ShuffleGrid />
        </div>
      </div>
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1583422409516-2895a77efded?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1570393952005-681c3f178294?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1504019347908-b45f9b0b8dd5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1580837119756-563d608dd119?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1526392060635-9d6019884377?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 9,
    src: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 10,
    src: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 11,
    src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 12,
    src: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 13,
    src: "https://images.unsplash.com/photo-1577717903315-1691ae25ab3f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 14,
    src: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 15,
    src: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 16,
    src: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
  },
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      style={{
        width: '100%',
        height: '100%',
        backgroundImage: `url(${sq.src})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        borderRadius: '8px',
        overflow: 'hidden'
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridTemplateRows: 'repeat(4, 1fr)',
      height: '450px',
      gap: '4px',
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
    }}>
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;