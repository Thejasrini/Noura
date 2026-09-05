import React from 'react';
import type { Habit } from '../../types';
import { Check, Flame } from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

interface HabitsViewProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
}

export const HabitsView: React.FC<HabitsViewProps> = ({
  habits,
  onToggleHabit
}) => {
  const handleCheck = (id: string) => {
    onToggleHabit(id);
    confetti({ particleCount: 25, spread: 40, origin: { y: 0.7 } });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.08 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 14 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-24 md:pb-8"
    >
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-amber-100 via-pink-50 to-purple-50 rounded-3xl p-6 border border-amber-200/60 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-float">🔁</span>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Habit Tracker</h2>
            <p className="text-sm font-semibold text-amber-900 mt-0.5">
              "Consistency over perfection — zero guilt philosophy."
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="p-4 bg-gradient-to-r from-pink-50 to-sky-50 rounded-2xl border border-pink-100 text-center">
        <p className="text-xs font-bold text-slate-700">
          🌱 "If today didn't go as planned, that's completely okay. You are still making progress every single day!"
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {habits.map(habit => (
          <motion.div 
            key={habit.id} 
            whileHover={{ y: -2, scale: 1.02 }}
            className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft flex items-center justify-between gap-4 transition"
          >
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-2xl ${habit.color} flex items-center justify-center text-2xl font-bold shadow-xs`}>
                {habit.icon}
              </div>
              <div>
                <h4 className="font-extrabold text-slate-800 text-base">{habit.title}</h4>
                <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500 font-medium">
                  <span className="flex items-center gap-1 font-bold text-amber-600">
                    <Flame className="w-3.5 h-3.5 fill-amber-500" /> {habit.currentStreak} day streak
                  </span>
                  <span>•</span>
                  <span>Best: {habit.bestStreak}d</span>
                </div>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.85 }}
              onClick={() => handleCheck(habit.id)}
              className="w-11 h-11 rounded-2xl bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-200 flex items-center justify-center transition shadow-xs"
            >
              <Check className="w-5 h-5" />
            </motion.button>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};
