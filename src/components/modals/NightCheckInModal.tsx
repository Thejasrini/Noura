import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { DailyCheckIn, MoodType, SymptomType } from '../../types';
import confetti from 'canvas-confetti';

interface NightCheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  checkIn: DailyCheckIn;
  onSave: (checkIn: DailyCheckIn) => void;
}

export const NightCheckInModal: React.FC<NightCheckInModalProps> = ({
  isOpen,
  onClose,
  checkIn,
  onSave,
}) => {
  const [eveningMood, setEveningMood] = useState<MoodType>(checkIn.eveningMood || 'good');
  const [eveningEnergy, setEveningEnergy] = useState<number>(checkIn.eveningEnergy || 3);
  const [steps, setSteps] = useState<number>(checkIn.steps || 5842);
  const [exerciseDone, setExerciseDone] = useState<boolean>(checkIn.exerciseDone || false);
  const [waterMl, setWaterMl] = useState<number>(checkIn.waterMl || 1500);
  const [selectedSymptoms, setSelectedSymptoms] = useState<SymptomType[]>(checkIn.symptoms || []);
  const [eveningReflection, setEveningReflection] = useState<string>(checkIn.eveningReflection || '');

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
    { type: 'pain', label: 'Pain', emoji: '💥' },
    { type: 'digestion', label: 'Digestion', emoji: '🥗' },
    { type: 'skin', label: 'Skin', emoji: '✨' },
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
      nightCompleted: true,
      eveningMood,
      eveningEnergy,
      steps,
      exerciseDone,
      waterMl,
      symptoms: selectedSymptoms,
      eveningReflection
    };
    onSave(updated);
    confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Before you finish today..." emoji="🌙">
      <div className="space-y-6">
        <p className="text-sm text-slate-500 font-medium">Takes ~1 minute • Celebrate your day, Noura 💗</p>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">😊 How was your evening mood?</label>
          <div className="grid grid-cols-5 gap-2">
            {moodOptions.map(option => (
              <button
                key={option.type}
                type="button"
                onClick={() => setEveningMood(option.type)}
                className={`flex flex-col items-center justify-center p-3 rounded-2xl border transition-all ${
                  eveningMood === option.type
                    ? 'bg-indigo-100 border-indigo-400 text-indigo-700 shadow-sm scale-105'
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
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">⚡ Evening Energy</label>
            <span className="text-sm font-extrabold text-indigo-600">{eveningEnergy} / 5</span>
          </div>
          <div className="flex justify-between gap-2">
            {[1, 2, 3, 4, 5].map((lvl) => (
              <button
                key={lvl}
                type="button"
                onClick={() => setEveningEnergy(lvl)}
                className={`flex-1 py-2.5 rounded-xl font-extrabold text-sm border transition ${
                  eveningEnergy === lvl
                    ? 'bg-indigo-500 text-white border-indigo-500 shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🚶 Today's Steps</label>
            <input
              type="number"
              value={steps}
              onChange={(e) => setSteps(parseInt(e.target.value) || 0)}
              className="w-full px-3 py-2.5 rounded-2xl border border-slate-200 font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-300"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">💪 Workout Done?</label>
            <button
              type="button"
              onClick={() => setExerciseDone(!exerciseDone)}
              className={`w-full py-2.5 rounded-2xl font-bold text-sm border transition ${
                exerciseDone
                  ? 'bg-emerald-100 border-emerald-300 text-emerald-700'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {exerciseDone ? '✓ Yes, Done!' : '○ Not today'}
            </button>
          </div>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">💧 Water Total</label>
            <span className="text-sm font-extrabold text-blue-600">{(waterMl / 1000).toFixed(1)}L / 2.0L</span>
          </div>
          <input
            type="range"
            min="0"
            max="3500"
            step="250"
            value={waterMl}
            onChange={(e) => setWaterMl(parseInt(e.target.value))}
            className="w-full h-2 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">🩸 Any Body Symptoms?</label>
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
                      ? 'bg-indigo-100 border-indigo-300 text-indigo-700'
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
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">💭 What was good about today?</label>
          <textarea
            rows={3}
            placeholder="Write a small warm reflection about your day..."
            value={eveningReflection}
            onChange={(e) => setEveningReflection(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white font-bold rounded-2xl shadow-soft hover:brightness-105 transition"
        >
          Complete Night Check-in 🌙
        </button>
      </div>
    </Modal>
  );
};
