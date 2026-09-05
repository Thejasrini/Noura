import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { DailyCheckIn, MoodType, SymptomType } from '../../types';
import confetti from 'canvas-confetti';

interface MorningCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkIn: DailyCheckIn;
  onSave: (checkIn: DailyCheckIn) => void;
}

export const MorningCheckInModal: React.FC<MorningCheckInModalProps> = ({
  isOpen,
  onClose,
  checkIn,
  onSave,
}) => {
  const [mood, setMood] = useState<MoodType>(checkIn.mood || 'good');
  const [energy, setEnergy] = useState<number>(checkIn.energy || 4);
  const [sleepHours, setSleepHours] = useState<number>(checkIn.sleepHours || 7.5);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>(checkIn.symptoms || []);
  const [note, setNote] = useState<string>(checkIn.morningNote || '');

  const moodOptions: { type: MoodType; emoji: string; label: string }[] = [
    { type: 'great', emoji: '😍', label: 'Great' },
    { type: 'good', emoji: '😊', label: 'Good' },
    { type: 'okay', emoji: '😐', label: 'Okay' },
    { type: 'low', emoji: '😔', label: 'Low' },
    { type: 'not_good', emoji: '😣', label: 'Not good' },
  ];

  const symptomOptions: { type: SymptomType; label: string; emoji: string }[] = [
    { type: 'bloating', label: 'Bloating', emoji: '🎈' },
    { type: 'cramps', label: 'Cramps', emoji: '⚡' },
    { type: 'headache', label: 'Headache', emoji: '🤕' },
    { type: 'fatigue', label: 'Fatigue', emoji: '😴' },
    { type: 'skin', label: 'Skin', emoji: '✨' },
    { type: 'digestion', label: 'Digestion', emoji: '🥗' },
  ];

  const toggleSymptom = (type: SymptomType) => {
    if (selectedSymptoms.includes(type)) {
      setSelectedSymptoms(selectedSymptoms.filter(s => s !== type));
    } else {
      setSelectedSymptoms([...selectedSymptoms, type]);
    }
  };

  const handleSave = () => {
    const updated: DailyCheckIn = {
      ...checkIn,
      morningCompleted: true,
      mood,
      energy,
      sleepHours,
      symptoms: selectedSymptoms,
      morningNote: note
    };
    onSave(updated);
    confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 } });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Morning Check-in" emoji="☀️">
      <div className="space-y-6">
        <p className="text-sm text-slate-500 font-medium">Takes 30 seconds • How do you feel this morning, Noura?</p>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">😊 Mood</label>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map(option => (
              <button
                key={option.type}
                type="button"
                onClick={() => setMood(option.type)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  mood === option.type
                    ? 'bg-pink-100 border-pink-400 text-pink-700 shadow-sm scale-105'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="text-xs font-bold mt-1">{option.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">⚡ Energy Level</label>
            <span className="text-sm font-extrabold text-pink-600">{energy} / 5</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setEnergy(lvl)}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm border transition ${
                  energy === lvl
                    ? 'bg-gradient-to-r from-pink-400 to-rose-400 text-white border-pink-400 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">😴 Sleep Last Night</label>
            <span className="text-sm font-extrabold text-sky-600">{sleepHours} hours</span>
          </div>
          <input
            type="range"
            min="4"
            max="12"
            step="0.5"
            value={sleepHours}
            onChange={(e) => setSleepHours(parseFloat(e.target.value))}
            className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🩸 Symptoms (If any)</label>
          <div className="flex flex-wrap gap-2">
            {symptomOptions.map(opt => {
              const isSelected = selectedSymptoms.includes(opt.type);
              return (
                <button
                  key={opt.type}
                  type="button"
                  onClick={() => toggleSymptom(opt.type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 transition ${
                    isSelected
                      ? 'bg-pink-100 border-pink-300 text-pink-700'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <span>{opt.emoji}</span>
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">💭 Morning Note (Optional)</label>
          <input
            type="text"
            placeholder="e.g. Slept peacefully, excited for walk..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 text-white font-bold rounded-2xl shadow-soft hover:brightness-105 transition"
        >
          Save Morning Check-in ✨
        </button>
      </div>
    </Modal>
  );
};
