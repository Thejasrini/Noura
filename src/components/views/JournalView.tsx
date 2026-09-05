import React, { useState } from 'react';
import type { JournalEntry } from '../../types';
import { Plus, Search, Lock } from 'lucide-react';
import { motion } from 'framer-motion';
import { JournalingGirlIllustration } from '../illustrations/JournalingGirlIllustration';

interface JournalViewProps {
  entries: JournalEntry[];
  onOpenLogJournal: () => void;
}

export const JournalView: React.FC<JournalViewProps> = ({
  entries,
  onOpenLogJournal
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = entries.filter(e => 
    e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.text.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-pink-100/90 via-sky-50/80 to-pink-50/90 rounded-3xl p-6 sm:p-8 border border-pink-200/80 shadow-pink-glow flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-200/70 px-3 py-1 rounded-full border border-pink-300/60 shadow-xs">
              Personal Reflection
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-2">Personal Journal 📔</h2>
          <p className="text-sm font-semibold text-pink-700 mt-1">
            A safe, private space to write your thoughts, gratitude, and reflect on your days.
          </p>
          <div className="flex items-center gap-1.5 mt-1.5 text-xs text-slate-500 font-medium">
            <Lock className="w-3.5 h-3.5 text-pink-500" />
            <span>100% Private & stored locally on your device</span>
          </div>

          <button
            onClick={onOpenLogJournal}
            className="mt-4 px-6 py-3.5 bg-gradient-to-r from-pink-500 via-rose-400 to-sky-400 text-white font-extrabold text-xs rounded-2xl shadow-pink-glow hover:brightness-105 transition flex items-center gap-2 shrink-0 animate-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Write Entry</span>
          </button>
        </div>

        {/* Animated Girl Journaling Illustration */}
        <div className="shrink-0 flex items-center justify-center relative z-10 transform hover:scale-105 transition duration-300">
          <JournalingGirlIllustration size="md" />
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
        <input
          type="text"
          placeholder="Search journal reflections or tags (e.g. gratitude, walking)..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300 bg-white shadow-xs"
        />
      </motion.div>

      <motion.div variants={itemVariants} className="space-y-4">
        {filtered.length > 0 ? (
          filtered.map(entry => (
            <motion.div 
              key={entry.id} 
              whileHover={{ y: -2, scale: 1.01 }}
              className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3 transition"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-100">
                    {entry.date}
                  </span>
                  <h4 className="font-extrabold text-slate-800 text-lg mt-1">{entry.title}</h4>
                </div>
                <span className="text-2xl">
                  {entry.mood === 'great' ? '😍' : entry.mood === 'good' ? '😊' : '😐'}
                </span>
              </div>

              <p className="text-sm font-medium text-slate-700 leading-relaxed whitespace-pre-line">
                {entry.text}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-2">
                {entry.tags.map((tag, idx) => (
                  <span key={idx} className="text-[10px] font-bold bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full">
                    #{tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="p-8 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
            <p className="text-sm font-extrabold text-slate-700">No journal entries logged yet 📔</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tap "New Journal Entry" above to write your first reflection!
            </p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};
