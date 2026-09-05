import React from 'react';
import { motion } from 'framer-motion';

interface JournalingGirlIllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const JournalingGirlIllustration: React.FC<JournalingGirlIllustrationProps> = ({ 
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
        {/* Floating Sparkles & Star Thoughts */}
        <motion.path
          d="M 35 40 L 38 48 L 46 51 L 38 54 L 35 62 L 32 54 L 24 51 L 32 48 Z"
          fill="#f472b6"
          animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* CHARACTER & JOURNAL */}
        <g transform="translate(15, 10)">
          {/* Torso */}
          <path d="M 75 75 Q 95 72 115 75 L 122 120 L 68 120 Z" fill="#f472b6" />

          {/* Head */}
          <circle cx="95" cy="45" r="15" fill="#fbcfe8" />

          {/* Hair */}
          <path d="M 80 46 C 78 30 112 28 110 46 C 106 52 84 53 80 46 Z" fill="#475569" />

          {/* Cheerful writing smile */}
          <path d="M 90 48 Q 95 53 100 48" stroke="#0f172a" strokeWidth="1.5" strokeLinecap="round" fill="none" />

          {/* OPEN JOURNAL ON DESK */}
          <rect x="70" y="90" width="50" height="30" rx="3" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <line x1="95" y1="90" x2="95" y2="120" stroke="#cbd5e1" strokeWidth="1.5" />

          {/* HAND WRITING ANIMATION */}
          <motion.g
            animate={{ x: [-3, 3, -3], y: [-1, 1, -1] }}
            transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Hand holding pen */}
            <path d="M 110 75 L 90 98" stroke="#fbcfe8" strokeWidth="6" strokeLinecap="round" />
            <path d="M 90 98 L 84 104" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
};
