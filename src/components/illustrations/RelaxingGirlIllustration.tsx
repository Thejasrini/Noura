import React from 'react';
import { motion } from 'framer-motion';

interface RelaxingGirlIllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RelaxingGirlIllustration: React.FC<RelaxingGirlIllustrationProps> = ({ 
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
          <linearGradient id="cushionGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fbcfe8" />
            <stop offset="100%" stopColor="#f472b6" />
          </linearGradient>
          <linearGradient id="relaxSweaterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ddd6fe" />
            <stop offset="100%" stopColor="#c084fc" />
          </linearGradient>
        </defs>

        {/* Soft Cloud Cushion */}
        <motion.path
          d="M 50 130 C 30 130 30 110 50 105 C 50 90 80 85 95 95 C 110 85 140 90 145 105 C 165 110 165 130 145 130 Z"
          fill="url(#cushionGrad)"
          opacity="0.8"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Floating Petals / Stars */}
        <motion.path
          d="M 35 45 Q 40 40 45 45 Q 40 50 35 45 Z"
          fill="#f472b6"
          animate={{ y: [-4, 6, -4], rotate: [0, 45, 0], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.circle
          cx="165" cy="50" r="3" fill="#c084fc"
          animate={{ scale: [0.8, 1.3, 0.8], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />

        {/* Steam from Tea Cup */}
        <motion.path
          d="M 100 80 Q 96 70 102 62"
          stroke="#f472b6"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.2, 0.8, 0.2], y: [-2, -6, -2] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* RELAXING CHARACTER (BREATHING ANIMATION) */}
        <motion.g
          animate={{ y: [-2, 2, -2] }}
          transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Cozy Sweater & Body */}
          <path d="M 78 80 Q 100 70 122 80 L 130 115 Q 100 122 70 115 Z" fill="url(#relaxSweaterGrad)" />

          {/* Head & Peaceful Face */}
          <path d="M 100 68 L 100 58" stroke="#fbcfe8" strokeWidth="8" fill="none" />
          <circle cx="100" cy="46" r="16" fill="#fbcfe8" />

          {/* Hair */}
          <path d="M 84 46 C 82 28 118 26 116 46 C 112 53 88 54 84 46 Z" fill="#581c87" />
          <path d="M 84 44 C 76 52 74 68 80 78" stroke="#581c87" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 116 44 C 124 52 126 68 120 78" stroke="#581c87" strokeWidth="7" strokeLinecap="round" fill="none" />

          {/* Peaceful Closed Eyes (Sleepy/Relaxed) */}
          <path d="M 92 46 Q 95 49 98 46" stroke="#3b0764" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M 102 46 Q 105 49 108 46" stroke="#3b0764" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          
          {/* Gentle Smile */}
          <path d="M 97 52 Q 100 55 103 52" stroke="#3b0764" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          
          {/* Blush */}
          <circle cx="91" cy="50" r="3" fill="#f472b6" opacity="0.6" />
          <circle cx="109" cy="50" r="3" fill="#f472b6" opacity="0.6" />

          {/* Arms Holding Warm Mug */}
          <path d="M 80 82 Q 95 100 100 95" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 120 82 Q 105 100 100 95" stroke="#fbcfe8" strokeWidth="7" strokeLinecap="round" fill="none" />

          {/* Warm Pink Mug */}
          <rect x="94" y="88" width="12" height="12" rx="3" fill="#f472b6" />
          <path d="M 106 90 C 110 90 110 98 106 98" stroke="#f472b6" strokeWidth="2" fill="none" />
        </motion.g>
      </svg>
    </div>
  );
};
