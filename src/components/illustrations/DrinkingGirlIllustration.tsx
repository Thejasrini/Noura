import React from 'react';
import { motion } from 'framer-motion';

interface DrinkingGirlIllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const DrinkingGirlIllustration: React.FC<DrinkingGirlIllustrationProps> = ({ 
  className = '',
  size = 'md'
}) => {
  const dimensions = {
    sm: { width: 120, height: 100 },
    md: { width: 180, height: 140 },
    lg: { width: 240, height: 180 }
  }[size];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        width={dimensions.width}
        height={dimensions.height}
        viewBox="0 0 200 160"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        <defs>
          <linearGradient id="waterGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        {/* Floating Water Droplets */}
        <motion.path
          d="M 45 60 C 45 60 40 70 45 74 C 48 76 52 76 55 74 C 60 70 55 60 55 60 Z"
          fill="#38bdf8"
          opacity="0.7"
          animate={{ y: [-6, 6, -6], scale: [0.9, 1.1, 0.9] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="155" cy="55" r="4" fill="#7dd3fc"
          animate={{ y: [4, -8, 4], opacity: [0.3, 0.9, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        {/* GIRL CHARACTER & DRINKING STRAW */}
        <g transform="translate(10, 10)">
          {/* Torso */}
          <path d="M 75 75 Q 95 72 115 75 L 122 120 L 68 120 Z" fill="#7dd3fc" />

          {/* Head */}
          <circle cx="95" cy="45" r="15" fill="#fbcfe8" />

          {/* Hair */}
          <path d="M 80 46 C 78 30 112 28 110 46 C 106 52 84 53 80 46 Z" fill="#0284c7" />
          <path d="M 80 44 C 74 52 74 65 78 72" stroke="#0284c7" strokeWidth="6" strokeLinecap="round" fill="none" />

          {/* Eyes looking at tumbler glass */}
          <circle cx="90" cy="44" r="2" fill="#0f172a" />
          <circle cx="100" cy="44" r="2" fill="#0f172a" />

          {/* Cheeks */}
          <circle cx="86" cy="48" r="2.5" fill="#f472b6" opacity="0.6" />
          <circle cx="104" cy="48" r="2.5" fill="#f472b6" opacity="0.6" />

          {/* Arm holding tumbler glass */}
          <motion.g
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M 80 80 Q 95 95 105 85" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" fill="none" />

            {/* Tumbler Glass */}
            <rect x="102" y="70" width="20" height="32" rx="4" fill="url(#waterGlassGrad)" opacity="0.85" />
            <path d="M 102 76 L 122 76" stroke="#ffffff" strokeWidth="2" opacity="0.6" />

            {/* Pink Straw leading to lips */}
            <path d="M 108 80 L 105 48 M 105 48 L 97 48" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" fill="none" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
};
