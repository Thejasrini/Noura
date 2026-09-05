import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { MealItem, MealType } from '../../types';
import confetti from 'canvas-confetti';

interface LogMealModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (meal: MealItem) => void;
  defaultMealType?: MealType;
}

export const LogMealModal: React.FC<LogMealModalProps> = ({
  isOpen,
  onClose,
  onSave,
  defaultMealType = 'lunch'
}) => {
  const [mealType, setMealType] = useState<MealType>(defaultMealType);
  const [name, setName] = useState('');
  const [portion, setPortion] = useState('1 plate');
  const [notes, setNotes] = useState('');
  const [tags, setTags] = useState({
    protein: true,
    fiber: true,
    vegetables: true,
    fruit: false,
    water: true,
    caffeine: false,
    processedSugary: false
  });

  const handleSave = () => {
    if (!name.trim()) return;
    const newMeal: MealItem = {
      id: `m-${Date.now()}`,
      date: "2026-09-05",
      mealType,
      name,
      portion,
      notes,
      tags
    };
    onSave(newMeal);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.7 } });
    setName('');
    setNotes('');
    onClose();
  };

  const nutrientOptions: { key: keyof typeof tags; label: string; emoji: string }[] = [
    { key: 'protein', label: 'Protein', emoji: '🥩' },
    { key: 'fiber', label: 'Fiber', emoji: '🌾' },
    { key: 'vegetables', label: 'Vegetables', emoji: '🥦' },
    { key: 'fruit', label: 'Fruit', emoji: '🍎' },
    { key: 'water', label: 'Water', emoji: '💧' },
    { key: 'caffeine', label: 'Caffeine', emoji: '☕' },
    { key: 'processedSugary', label: 'Sugary/Processed', emoji: '🍬' },
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Food & Nutrition" emoji="🥗">
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Meal Category</label>
          <div className="grid grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-2xl">
            {(['breakfast', 'lunch', 'snack', 'dinner'] as MealType[]).map(type => (
              <button
                key={type}
                type="button"
                onClick={() => setMealType(type)}
                className={`py-2 rounded-xl text-xs font-bold capitalize transition ${
                  mealType === type
                    ? 'bg-white text-pink-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {type === 'breakfast' && '🌅 '}
                {type === 'lunch' && '☀️ '}
                {type === 'snack' && '🍎 '}
                {type === 'dinner' && '🌙 '}
                {type}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Food / Dish Name</label>
          <input
            type="text"
            placeholder="e.g. Grilled Chicken & Quinoa Salad with Cucumber"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Portion / Amount</label>
          <input
            type="text"
            placeholder="e.g. 1 medium bowl, 2 slices"
            value={portion}
            onChange={(e) => setPortion(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Nutrient Balance Toggles</label>
          <div className="flex flex-wrap gap-2">
            {nutrientOptions.map(opt => {
              const active = tags[opt.key];
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setTags({ ...tags, [opt.key]: !active })}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1.5 ${
                    active
                      ? 'bg-pink-100 border-pink-300 text-pink-700 shadow-xs'
                      : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
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
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Notes (Optional)</label>
          <input
            type="text"
            placeholder="e.g. Felt very satisfying, easy on digestion"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="w-full py-3.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold rounded-2xl shadow-soft hover:brightness-105 transition disabled:opacity-50"
        >
          Save Meal Log 🥗
        </button>
      </div>
    </Modal>
  );
};
