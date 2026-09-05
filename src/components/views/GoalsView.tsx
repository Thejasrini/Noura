import React from 'react';
import type { GoalItem } from '../../types';
import { motion } from 'framer-motion';

interface GoalsViewProps {
  goals: GoalItem[];
}

export const GoalsView: React.FC<GoalsViewProps> = ({ goals }) => {
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
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-sky-100 via-pink-50 to-emerald-50 rounded-3xl p-6 border border-sky-200/60 shadow-soft">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-float">🎯</span>
          <div>
            <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Personal Wellness Goals</h2>
            <p className="text-sm font-semibold text-sky-800 mt-0.5">
              Clear targets for your physical, mental, and sleep progress.
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {goals.map(goal => {
          const percent = Math.min(100, Math.round((goal.currentValue / goal.targetValue) * 100));
          return (
            <motion.div 
              key={goal.id} 
              whileHover={{ y: -2, scale: 1.02 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-extrabold bg-sky-50 text-sky-700 px-2.5 py-0.5 rounded-full border border-sky-100">
                    {goal.category}
                  </span>
                  <h4 className="font-extrabold text-slate-800 text-lg mt-1">{goal.title}</h4>
                </div>
                <span className="text-sm font-extrabold text-sky-600 bg-sky-50 px-3 py-1 rounded-xl">
                  {percent}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${percent}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-sky-400 via-pink-400 to-emerald-400 rounded-full"
                />
              </div>

              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 pt-1">
                <span>Current: {goal.currentValue} {goal.unit}</span>
                <span>Target: {goal.targetValue} {goal.unit}</span>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};
