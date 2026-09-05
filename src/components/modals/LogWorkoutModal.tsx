import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import type { WorkoutLog, ExerciseCategory, ExerciseDetail } from '../../types';
import confetti from 'canvas-confetti';

interface LogWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (workout: WorkoutLog) => void;
  initialCategory?: ExerciseCategory;
}

export const LogWorkoutModal: React.FC<LogWorkoutModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialCategory = 'Upper body'
}) => {
  const [title, setTitle] = useState('Upper Body & Wrist Stability');
  const [category, setCategory] = useState<ExerciseCategory>(initialCategory);
  const [durationMin, setDurationMin] = useState(25);
  const [difficultyRating, setDifficultyRating] = useState(3);
  const [sorenessRating] = useState(2);
  const [recoveryScore] = useState(4);
  const [notes, setNotes] = useState('Felt strong throughout shoulder presses and wrist stretches.');

  const [exercises, setExercises] = useState<ExerciseDetail[]>([
    { name: 'Dumbbell Shoulder Press', category: 'Upper body', sets: 3, reps: 10, weightKg: 6 },
    { name: 'Dumbbell Rows', category: 'Upper body', sets: 3, reps: 12, weightKg: 8 },
    { name: 'Wrist Rotations & Stretches', category: 'Wrist / Forearms', sets: 3, durationMin: 5 }
  ]);

  const categories: { name: ExerciseCategory; emoji: string }[] = [
    { name: 'Upper body', emoji: '🧍' },
    { name: 'Legs', emoji: '🦵' },
    { name: 'Glutes', emoji: '🍑' },
    { name: 'Arms', emoji: '💪' },
    { name: 'Wrist / Forearms', emoji: '🫶' },
    { name: 'Core', emoji: '🔥' },
    { name: 'Cardio', emoji: '🏃' },
    { name: 'Mobility', emoji: '🧘' },
    { name: 'Stretching', emoji: '🤸' },
    { name: 'Full body', emoji: '🏋️' }
  ];

  const handleAddExercise = () => {
    setExercises([
      ...exercises,
      { name: 'New Exercise', category, sets: 3, reps: 10, weightKg: 5 }
    ]);
  };

  const handleSave = () => {
    if (!title.trim()) return;
    const newWorkout: WorkoutLog = {
      id: `w-${Date.now()}`,
      date: "2026-09-05",
      title,
      category,
      durationMin,
      difficultyRating,
      sorenessRating,
      recoveryScore,
      notes,
      exercises
    };
    onSave(newWorkout);
    confetti({ particleCount: 60, spread: 80, origin: { y: 0.6 } });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Log Workout & Movement" emoji="💪">
      <div className="space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Workout Title</label>
          <input
            type="text"
            placeholder="e.g. Upper Body & Wrist Stability"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Primary Muscle Area</label>
          <div className="flex flex-wrap gap-1.5">
            {categories.map(cat => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setCategory(cat.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition flex items-center gap-1 ${
                  category === cat.name
                    ? 'bg-pink-100 border-pink-400 text-pink-700 shadow-xs'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span>{cat.emoji}</span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Duration (min)</label>
            <input
              type="number"
              value={durationMin}
              onChange={(e) => setDurationMin(parseInt(e.target.value) || 0)}
              className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300 font-bold"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Difficulty (1-5)</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map(rating => (
                <button
                  key={rating}
                  type="button"
                  onClick={() => setDifficultyRating(rating)}
                  className={`flex-1 py-2 rounded-xl text-xs font-bold border transition ${
                    difficultyRating === rating
                      ? 'bg-pink-500 text-white border-pink-500'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {rating}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Exercises Included</label>
            <button
              type="button"
              onClick={handleAddExercise}
              className="text-xs font-bold text-pink-600 hover:underline"
            >
              + Add Exercise
            </button>
          </div>
          <div className="space-y-2">
            {exercises.map((ex, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between gap-2">
                <div className="flex-1">
                  <input
                    type="text"
                    value={ex.name}
                    onChange={(e) => {
                      const updated = [...exercises];
                      updated[idx].name = e.target.value;
                      setExercises(updated);
                    }}
                    className="w-full bg-transparent text-sm font-bold text-slate-800 focus:outline-none"
                  />
                  <div className="text-xs text-slate-500 flex gap-3 mt-1">
                    <span>{ex.sets || 3} sets</span>
                    <span>•</span>
                    <span>{ex.reps ? `${ex.reps} reps` : `${ex.durationMin} min`}</span>
                    {ex.weightKg && (
                      <>
                        <span>•</span>
                        <span className="font-semibold text-pink-600">{ex.weightKg} kg</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">Workout Notes</label>
          <input
            type="text"
            placeholder="e.g. Wrist felt strong, focused on slow controlled movement"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
          />
        </div>

        <button
          onClick={handleSave}
          className="w-full py-3.5 bg-gradient-to-r from-pink-500 via-rose-400 to-sky-400 text-white font-bold rounded-2xl shadow-soft hover:brightness-105 transition"
        >
          Save Workout Log 💪
        </button>
      </div>
    </Modal>
  );
};
