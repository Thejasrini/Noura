import React from 'react';
import { motion } from 'framer-motion';

interface EatingGirlIllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const EatingGirlIllustration: React.FC<EatingGirlIllustrationProps> = ({ 
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
          <linearGradient id="bowlGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
          <linearGradient id="topGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f472b6" />
            <stop offset="100%" stopColor="#fb7185" />
          </linearGradient>
          <radialGradient id="tableShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft shadow under bowl */}
        <ellipse cx="100" cy="144" rx="60" ry="8" fill="url(#tableShadow)" />

        {/* Floating food icons (Avocado, Berry, Leaf) */}
        <motion.g
          animate={{ y: [-4, 4, -4], rotate: [-4, 4, -4] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          {/* Avocado Slice */}
          <g transform="translate(30, 45) scale(0.8)">
            <ellipse cx="15" cy="15" rx="12" ry="16" fill="#a3e635" transform="rotate(-15 15 15)" />
            <ellipse cx="15" cy="15" rx="8" ry="11" fill="#bef264" transform="rotate(-15 15 15)" />
            <circle cx="15" cy="18" r="4.5" fill="#65a30d" />
          </g>
        </motion.g>

        <motion.g
          animate={{ y: [4, -4, 4], rotate: [4, -4, 4] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        >
          {/* Strawberry */}
          <g transform="translate(150, 40) scale(0.85)">
            <path d="M 12 6 C 6 6 2 12 6 20 C 10 26 12 28 12 28 C 12 28 14 26 18 20 C 22 12 18 6 12 6 Z" fill="#f43f5e" />
            <path d="M 9 4 C 12 7 12 7 15 4 C 14 3 10 3 9 4 Z" fill="#22c55e" />
            <circle cx="9" cy="12" r="0.8" fill="#fef08a" />
            <circle cx="14" cy="15" r="0.8" fill="#fef08a" />
          </g>
        </motion.g>

        {/* Steam / Nourishment Waves */}
        <motion.path
          d="M 90 90 Q 86 80 92 72 Q 98 64 92 56"
          stroke="#34d399"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.2, 0.8, 0.2], y: [-2, -8, -2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 108 92 Q 112 82 106 74 Q 100 66 106 58"
          stroke="#f472b6"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          animate={{ opacity: [0.2, 0.8, 0.2], y: [-2, -8, -2] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />

        {/* GIRL CHARACTER & SALAD BOWL */}
        <g id="girlCharacter">
          {/* Body Torso */}
          <path d="M 80 80 Q 100 76 120 80 L 128 125 L 72 125 Z" fill="url(#topGrad)" />

          {/* Head & Neck */}
          <path d="M 96 68 L 96 58" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
          <circle cx="96" cy="46" r="16" fill="#fbcfe8" />

          {/* Hair */}
          <path d="M 80 48 C 78 30 114 28 112 48 C 108 55 84 56 80 48 Z" fill="#78350f" />
          <path d="M 80 44 C 74 52 74 65 78 72" stroke="#78350f" strokeWidth="7" strokeLinecap="round" fill="none" />
          <path d="M 112 44 C 118 52 118 65 114 72" stroke="#78350f" strokeWidth="7" strokeLinecap="round" fill="none" />

          {/* Cheerful Expression with Eyes Closing in Delight */}
          <motion.g
            animate={{ scaleY: [1, 0.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Left Eye ^ */}
            <path d="M 90 44 Q 93 41 96 44" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
            {/* Right Eye ^ */}
            <path d="M 100 44 Q 103 41 106 44" stroke="#451a03" strokeWidth="2" strokeLinecap="round" fill="none" />
          </motion.g>

          {/* Rosy Cheeks */}
          <circle cx="88" cy="49" r="3" fill="#fb7185" opacity="0.6" />
          <circle cx="104" cy="49" r="3" fill="#fb7185" opacity="0.6" />

          {/* Happy Smile */}
          <path d="M 93 52 Q 98 57 101 52" stroke="#451a03" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* LEFT HAND HOLDING BOWL */}
          <path d="M 76 85 L 85 105 L 90 102" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" fill="none" />

          {/* NOURISHING SALAD BOWL */}
          <g transform="translate(75, 100)">
            {/* Outer Ceramic Bowl */}
            <path d="M 5 10 Q 25 35 45 10 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="2" />
            {/* Salad Greens Base */}
            <path d="M 8 10 Q 25 2 42 10 Z" fill="url(#bowlGrad)" />
            {/* Cherry Tomatoes & Corn toppings */}
            <circle cx="16" cy="7" r="3" fill="#ef4444" />
            <circle cx="25" cy="5" r="2.5" fill="#facc15" />
            <circle cx="34" cy="7" r="3" fill="#ef4444" />
          </g>

          {/* RIGHT ARM & FORK MOVING UP TO MOUTH (EATING ANIMATION) */}
          <motion.g
            style={{ transformOrigin: "115px 85px" }}
            animate={{
              rotate: [0, -22, 0],
              y: [0, -12, 0]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Arm */}
            <path d="M 116 85 Q 124 100 104 102" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" fill="none" />
            {/* Fork / Spoon */}
            <path d="M 104 102 L 96 90" stroke="#94a3b8" strokeWidth="2" strokeLinecap="round" />
            <path d="M 96 90 L 93 86" stroke="#94a3b8" strokeWidth="3" strokeLinecap="round" />
            {/* Delicious Food Bite on Fork */}
            <circle cx="93" cy="85" r="3.5" fill="#a3e635" />
            <circle cx="94" cy="84" r="1.5" fill="#ef4444" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
};
