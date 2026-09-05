import React from 'react';
import { motion } from 'framer-motion';

interface StretchingGirlIllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const StretchingGirlIllustration: React.FC<StretchingGirlIllustrationProps> = ({ 
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
        {/* Yoga Mat */}
        <rect x="30" y="130" width="140" height="8" rx="4" fill="#ddd6fe" />

        {/* CHARACTER STRETCHING (SIDE-TO-SIDE SWAY) */}
        <motion.g
          style={{ transformOrigin: "100px 130px" }}
          animate={{ rotate: [-6, 6, -6] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Leg Base */}
          <path d="M 85 130 L 100 100 L 115 130" stroke="#ec4899" strokeWidth="12" strokeLinecap="round" fill="none" />

          {/* Torso */}
          <path d="M 100 100 L 100 65" stroke="#a855f7" strokeWidth="14" strokeLinecap="round" />

          {/* Head */}
          <circle cx="100" cy="50" r="14" fill="#fbcfe8" />
          <path d="M 88 50 C 86 32 114 30 112 50 C 108 55 92 56 88 50 Z" fill="#6b21a8" />

          {/* Arms stretched upwards in graceful pose */}
          <path d="M 100 70 L 75 35" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" />
          <path d="M 100 70 L 125 35" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" />
        </motion.g>
      </svg>
    </div>
  );
};
