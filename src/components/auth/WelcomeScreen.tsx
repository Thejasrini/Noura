import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ArrowRight, Database, UserPlus, Play } from 'lucide-react';

interface WelcomeScreenProps {
  onOpenLogin: () => void;
  onOpenSignUp: () => void;
  onContinueFresh: () => void;
  onContinueDemo: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onOpenLogin,
  onOpenSignUp,
  onContinueFresh,
  onContinueDemo
}) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-slate-50 to-sky-50 flex items-center justify-center p-4 sm:p-6 select-none">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-4xl p-8 sm:p-10 shadow-soft border border-pink-100/80 text-center space-y-8 relative overflow-hidden"
      >
        {/* Background Aura */}
        <div className="absolute -top-24 -left-24 w-60 h-60 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-60 h-60 rounded-full bg-sky-200/40 blur-3xl pointer-events-none" />

        {/* Soft Badge */}
        <div className="relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-pink-200 via-rose-100 to-sky-200 flex items-center justify-center mx-auto shadow-inner border border-white">
            <svg className="w-12 h-12 text-pink-500 animate-pulse-slow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3" />
              <circle cx="12" cy="12" r="3" fill="#f472b6" opacity="0.3" />
            </svg>
          </div>
          <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-xs border border-pink-100 text-pink-500">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>

        {/* Title & Copy */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-800 tracking-tight">
            Noura
          </h1>
          <p className="text-sm font-bold text-pink-500 tracking-wide uppercase">
            Understand your body. Understand yourself.
          </p>
          <p className="text-xs sm:text-sm text-slate-500 font-medium max-w-sm mx-auto leading-relaxed pt-2">
            A gentle personal companion that helps you understand your patterns, habits, movement, cycle, and wellbeing.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            onClick={onOpenSignUp}
            className="w-full py-4 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 hover:brightness-105 text-white font-extrabold text-sm rounded-2xl shadow-soft transition-all duration-300 transform active:scale-98 flex items-center justify-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            <span>Create New Clean Account</span>
            <ArrowRight className="w-4 h-4 ml-auto" />
          </button>

          <button
            onClick={onContinueFresh}
            className="w-full py-3 bg-white hover:bg-pink-50/50 text-slate-700 font-extrabold text-xs rounded-2xl border border-pink-200 transition flex items-center justify-center gap-2"
          >
            <Play className="w-4 h-4 text-pink-400 fill-pink-400" />
            <span>Quick Start Fresh (Guest Mode)</span>
          </button>

          <button
            onClick={onContinueDemo}
            className="w-full py-3 bg-gradient-to-r from-sky-50 to-purple-50 hover:bg-sky-100 text-slate-700 font-extrabold text-xs rounded-2xl border border-sky-200/80 transition flex items-center justify-center gap-2"
          >
            <Database className="w-4 h-4 text-purple-500" />
            <span>Explore App with Sample Demo Data</span>
          </button>

          <button
            onClick={onOpenLogin}
            className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200/80 transition"
          >
            Log In Existing Account
          </button>
        </div>

        {/* Footnote */}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-400 font-medium">
          <Heart className="w-3.5 h-3.5 text-pink-400" />
          <span>100% Private & encrypted to your device</span>
        </div>
      </motion.div>
    </div>
  );
};
