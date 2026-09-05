import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { CycleLog, SymptomType } from '../../types';
import confetti from 'canvas-confetti';

interface LogPeriodModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (log: CycleLog) => void;
  currentCycleDay: number;
}

export const LogPeriodModal: React.FC<LogPeriodModalProps> = ({
  isOpen,
  onClose,
  onSave,
  currentCycleDay
}) => {
  const [date, setDate] = useState('2026-09-05');
  const [isPeriodStart, setIsPeriodStart] = useState(false);
  const [isPeriodEnd, setIsPeriodEnd] = useState(false);
  const [flowLevel, setFlowLevel] = useState<'light' | 'medium' | 'heavy' | 'spotting'>('medium');
  const [symptoms, setSymptoms] = useState<SymptomType[]>(['cramps']);
  const [notes, setNotes] = useState('');

  const symptomList: { type: SymptomType; label: string; emoji: string }[] = [
    { type: 'cramps', label: 'Cramps', emoji: '⚡' },
    { type: 'bloating', label: 'Bloating', emoji: '🎈' },
    { type: 'headache', label: 'Headache', emoji: '🤕' },
    { type: 'acne', label: 'Acne / Skin', emoji: '✨' },
    { type: 'fatigue', label: 'Fatigue', emoji: '😴' },
    { type: 'backache', label: 'Backache', emoji: '🦴' },
    { type: 'mood_swings', label: 'Mood Shifts', emoji: '🌊' }
  ];

  const toggleSymptom = (type: SymptomType) => {
    if (symptoms.includes(type)) {
      setSymptoms(symptoms.filter(s => s !== type));
    } else {
      setSymptoms([...symptoms, type]);
    }
  };

  const handleSave = () => {
    const newLog: CycleLog = {
      id: `c-${Date.now()}`,
      date,
      cycleDay: currentCycleDay,
      isPeriodStart,
      isPeriodEnd,
      flowLevel,
      symptoms,
      notes
    };
    onSave(newLog);
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Cycle & Period" emoji="🌸">
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Log Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPeriodStart}
              onChange={(e) => setIsPeriodStart(e.target.checked)}
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-400"
            />
            <span className="text-sm font-bold text-slate-700">🌸 Period Started Today</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={isPeriodEnd}
              onChange={(e) => setIsPeriodEnd(e.target.checked)}
              className="w-4 h-4 text-pink-500 rounded focus:ring-pink-400"
            />
            <span className="text-sm font-bold text-slate-700">✨ Period Ended Today</span>
          </label>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Flow Level</label>
          <div className="grid grid-cols-4 gap-2">
            {(['spotting', 'light', 'medium', 'heavy'] as const).map(flow => (
              <button
                key={flow}
                type="button"
                onClick={() => setFlowLevel(flow)}
                className={`py-2.5 rounded-xl text-xs font-bold capitalize border transition ${
                  flowLevel === flow
                    ? 'bg-pink-100 border-pink-400 text-pink-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {flow}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Cycle Symptoms</label>
          <div className="flex flex-wrap gap-2">
            {symptomList.map(item => {
              const active = symptoms.includes(item.type);
              return (
                <button
                  key={item.type}
                  type="button"
                  onClick={() => toggleSymptom(item.type)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border flex items-center gap-1.5 transition ${
                    active
                      ? 'bg-pink-100 border-pink-300 text-pink-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{item.emoji}</span>
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Notes & Observations</label>
          <input
            type="text"
            placeholder="e.g. Mild lower back fatigue, peppermint tea helped"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-bold rounded-2xl shadow-soft hover:brightness-105 transition"
        >
          Save Cycle Log 🌸
        </button>
      </div>
    </Modal>
  );
};
