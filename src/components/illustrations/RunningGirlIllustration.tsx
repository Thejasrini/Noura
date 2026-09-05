import React from 'react';
import { motion } from 'framer-motion';

interface RunningGirlIllustrationProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const RunningGirlIllustration: React.FC<RunningGirlIllustrationProps> = ({ 
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
          <linearGradient id="runPantsGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ec4899" />
            <stop offset="100%" stopColor="#d946ef" />
          </linearGradient>
          <linearGradient id="runTopGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <linearGradient id="hairGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#78350f" />
            <stop offset="100%" stopColor="#451a03" />
          </linearGradient>
          <radialGradient id="glowShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f472b6" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Soft aura shadow on ground */}
        <ellipse cx="100" cy="142" rx="65" ry="10" fill="url(#glowShadow)" />

        {/* Speed trail lines */}
        <motion.g
          animate={{ x: [-20, 10, -20], opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M 20 120 L 50 120" stroke="#f472b6" strokeWidth="3" strokeLinecap="round" opacity="0.6" />
          <path d="M 10 130 L 45 130" stroke="#38bdf8" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
          <path d="M 30 110 L 55 110" stroke="#c084fc" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
        </motion.g>

        {/* Sparkle hearts in runner's wake */}
        <motion.path
          d="M 25 70 C 25 67 22 65 19 68 C 16 65 13 67 13 70 C 13 75 19 79 19 79 C 19 79 25 75 25 70 Z"
          fill="#f472b6"
          animate={{ y: [-4, 4, -4], opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.1, 0.8] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.path
          d="M 40 45 C 40 43 38 41 36 43 C 34 41 32 43 32 45 C 32 49 36 52 36 52 C 36 52 40 49 40 45 Z"
          fill="#38bdf8"
          animate={{ y: [4, -4, 4], opacity: [0.3, 0.8, 0.3], scale: [0.9, 1.2, 0.9] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />

        {/* Main Body Character Group with Vertical Bounce */}
        <motion.g
          animate={{ y: [-3, 3, -3] }}
          transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
        >
          {/* BACK LEG */}
          <motion.g
            style={{ transformOrigin: "105px 85px" }}
            animate={{ rotate: [30, -35, 30] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Thigh */}
            <path d="M 105 85 L 125 110" stroke="url(#runPantsGrad)" strokeWidth="14" strokeLinecap="round" />
            {/* Shin & Foot */}
            <path d="M 125 110 L 140 135" stroke="#fbcfe8" strokeWidth="10" strokeLinecap="round" />
            {/* Sneaker */}
            <path d="M 135 135 L 152 137 C 154 137 155 141 151 142 L 132 142 Z" fill="#ffffff" stroke="#e2e8f0" strokeWidth="1.5" />
            <path d="M 138 135 L 148 135" stroke="#ec4899" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* BACK ARM */}
          <motion.g
            style={{ transformOrigin: "100px 58px" }}
            animate={{ rotate: [35, -35, 35] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M 100 58 L 75 75" stroke="#fbcfe8" strokeWidth="9" strokeLinecap="round" />
            <circle cx="73" cy="77" r="5" fill="#fbcfe8" />
          </motion.g>

          {/* TORSO & ATHLETIC TOP */}
          <motion.g
            style={{ transformOrigin: "100px 70px" }}
            animate={{ rotate: [-2, 2, -2] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Leaning Torso Base */}
            <path d="M 92 52 Q 98 72 104 88" stroke="url(#runPantsGrad)" strokeWidth="22" strokeLinecap="round" />
            {/* Sports Top */}
            <path d="M 89 50 C 95 48 108 52 108 62 L 95 68 Z" fill="url(#runTopGrad)" />
            <path d="M 94 48 L 102 66" stroke="#ffffff" strokeWidth="2" strokeDasharray="3 2" />
          </motion.g>

          {/* FRONT LEG */}
          <motion.g
            style={{ transformOrigin: "100px 85px" }}
            animate={{ rotate: [-35, 35, -35] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Thigh */}
            <path d="M 100 85 L 75 110" stroke="url(#runPantsGrad)" strokeWidth="16" strokeLinecap="round" />
            {/* Shin */}
            <path d="M 75 110 L 60 135" stroke="#fbcfe8" strokeWidth="11" strokeLinecap="round" />
            {/* Sneaker */}
            <path d="M 55 135 L 75 137 C 77 137 77 142 72 142 L 50 142 Z" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1.5" />
            <path d="M 58 135 L 68 135" stroke="#38bdf8" strokeWidth="3" strokeLinecap="round" />
          </motion.g>

          {/* FRONT ARM */}
          <motion.g
            style={{ transformOrigin: "96px 56px" }}
            animate={{ rotate: [-35, 35, -35] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M 96 56 L 122 72" stroke="#fbcfe8" strokeWidth="10" strokeLinecap="round" />
            {/* Hand fist */}
            <circle cx="124" cy="74" r="5.5" fill="#fbcfe8" />
            {/* Cute Fitness Smart Watch */}
            <rect x="110" y="62" width="5" height="7" rx="1.5" fill="#38bdf8" transform="rotate(25 110 62)" />
          </motion.g>

          {/* HEAD & SWAYING PONYTAIL */}
          <motion.g
            style={{ transformOrigin: "94px 38px" }}
            animate={{ rotate: [-4, 4, -4] }}
            transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Head Neck */}
            <path d="M 94 48 L 94 38" stroke="#fbcfe8" strokeWidth="8" strokeLinecap="round" />
            {/* Head Face */}
            <circle cx="98" cy="34" r="14" fill="#fbcfe8" />
            
            {/* Cheerful face expression */}
            <path d="M 102 34 Q 104 32 106 34" stroke="#78350f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            <circle cx="106" cy="38" r="2.5" fill="#f472b6" opacity="0.6" /> {/* Blush */}
            <path d="M 104 40 Q 107 43 109 40" stroke="#78350f" strokeWidth="1.5" strokeLinecap="round" fill="none" /> {/* Smile */}

            {/* Hair Base */}
            <path d="M 88 34 C 88 22 108 20 108 30 C 104 36 94 38 88 34 Z" fill="url(#hairGrad)" />

            {/* Cute Visor / Headband */}
            <path d="M 88 28 C 96 24 108 26 110 31" stroke="#ec4899" strokeWidth="4" strokeLinecap="round" />

            {/* SWAYING PONYTAIL */}
            <motion.g
              style={{ transformOrigin: "86px 28px" }}
              animate={{ rotate: [-15, 18, -15], y: [-2, 3, -2] }}
              transition={{ duration: 0.4, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
            >
              <path
                d="M 88 28 C 72 20 54 28 44 42 C 58 40 74 38 86 33 Z"
                fill="url(#hairGrad)"
              />
              <circle cx="87" cy="29" r="4" fill="#38bdf8" /> {/* Hairband scrunchie */}
            </motion.g>
          </motion.g>
        </motion.g>
      </svg>
    </div>
  );
};
