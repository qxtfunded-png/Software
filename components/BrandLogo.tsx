
import React from 'react';

const BrandLogo: React.FC<{ className?: string }> = ({ className = "w-12 h-12" }) => {
  return (
    <div className={`${className} flex items-center justify-center`}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {/* Hexagon Background */}
        <path 
          d="M50 5 L90 25 L90 75 L50 95 L10 75 L10 25 Z" 
          fill="none" 
          stroke="#991b1b" 
          strokeWidth="6"
        />
        {/* Inner Stylized Lines/M-shape */}
        <path 
          d="M25 40 L25 75 M38 30 L38 82 M50 15 L50 90 M62 30 L62 82 M75 40 L75 75" 
          stroke="#991b1b" 
          strokeWidth="8" 
          strokeLinecap="round"
        />
        {/* Top Arrowhead Point */}
        <path 
          d="M40 22 L50 10 L60 22" 
          fill="none" 
          stroke="#991b1b" 
          strokeWidth="6" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default BrandLogo;
