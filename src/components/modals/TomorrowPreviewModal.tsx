import React from 'react';
import { Modal } from '../common/Modal';

interface TomorrowPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  cycleDay: number;
}

export const TomorrowPreviewModal: React.FC<TomorrowPreviewModalProps> = ({
  isOpen,
  onClose,
  cycleDay
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Tomorrow Preview" emoji="🌙">
      <div className="space-y-5 text-center">
        <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-100 to-purple-100 flex items-center justify-center text-3xl mx-auto shadow-inner">
          ✨
        </div>

        <h3 className="text-xl font-extrabold text-slate-800 tracking-tight">Sunday, September 6</h3>
        <p className="text-xs text-slate-500 font-medium">Here is what your body can look forward to tomorrow:</p>

        <div className="space-y-3 text-left">
          {/* Cycle */}
          <div className="p-3.5 bg-pink-50/70 rounded-2xl border border-pink-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🌸</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-pink-500">Cycle Phase</p>
                <p className="text-sm font-extrabold text-slate-800">Cycle Day {cycleDay + 1}</p>
              </div>
            </div>
            <span className="text-xs text-pink-600 bg-white px-2.5 py-1 rounded-full border border-pink-200 font-semibold">
              Peak Energy Window
            </span>
          </div>

          {/* Workout */}
          <div className="p-3.5 bg-sky-50/70 rounded-2xl border border-sky-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">💪</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-sky-500">Suggested Workout</p>
                <p className="text-sm font-extrabold text-slate-800">Leg & Glute Strengthening</p>
              </div>
            </div>
            <span className="text-xs text-sky-600 font-bold">25 min</span>
          </div>

          {/* Planned Tasks */}
          <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">📌</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Scheduled Commitment</p>
                <p className="text-sm font-bold text-slate-800">Morning walk & healthy breakfast routine</p>
              </div>
            </div>
            <span className="text-xs text-slate-500 font-bold">2 items</span>
          </div>

          {/* Priority Focus */}
          <div className="p-3.5 bg-amber-50/70 rounded-2xl border border-amber-100 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xl">🎯</span>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-amber-600">Main Focus</p>
                <p className="text-sm font-extrabold text-slate-800">Consistent hydration & 7,000 steps</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-r from-pink-50 via-purple-50 to-indigo-50 rounded-2xl border border-pink-100 text-center">
          <p className="text-sm font-extrabold text-slate-700 italic">
            "Good night, Noura. See you tomorrow. 💗"
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full py-3 bg-slate-800 text-white font-bold rounded-2xl hover:bg-slate-900 transition"
        >
          Sweet Dreams 🌙
        </button>
      </div>
    </Modal>
  );
};
