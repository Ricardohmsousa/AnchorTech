import React from 'react';

const Logo = ({ width = 40, height = 40, showText = true, textColor = '#1a202c' }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      {/* Logo Icon */}
      <svg 
        width={width} 
        height={height} 
        viewBox="0 0 100 100" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Gradient Definition */}
        <defs>
          <linearGradient id="atlantical-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#E2725B', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#A94438', stopOpacity: 1 }} />
          </linearGradient>
        </defs>
        
        {/* Stylized "A" with wave/anchor concept */}
        <g>
          {/* Circle background */}
          <circle 
            cx="50" 
            cy="50" 
            r="45" 
            fill="url(#atlantical-gradient)"
          />
          
          {/* Letter "A" in white */}
          <path 
            d="M 50 25 L 70 70 L 62 70 L 58 60 L 42 60 L 38 70 L 30 70 Z M 44.5 53 L 55.5 53 L 50 38 Z" 
            fill="white"
            strokeWidth="0"
          />
          
          {/* Wave accent underneath */}
          <path 
            d="M 35 75 Q 42.5 72, 50 75 T 65 75" 
            stroke="white" 
            strokeWidth="2.5" 
            fill="none"
            strokeLinecap="round"
          />
        </g>
      </svg>
      
      {/* Brand Text */}
      {showText && (
        <span style={{
          fontSize: '1.5rem',
          fontWeight: '800',
          background: 'linear-gradient(135deg, #E2725B 0%, #A94438 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: "'Poppins', 'Montserrat', 'Inter', sans-serif",
          letterSpacing: '-0.03em'
        }}>
          Atlantical
        </span>
      )}
    </div>
  );
};

export default Logo;
