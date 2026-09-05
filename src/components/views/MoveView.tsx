import React, { useState } from 'react';
import type { WorkoutLog, ExerciseCategory, BodyMeasurement } from '../../types';
import { StorageService } from '../../services/storage';
import { AIEngine } from '../../services/aiEngine';
import { Plus, Dumbbell, Scale } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { RunningGirlIllustration } from '../illustrations/RunningGirlIllustration';

interface MoveViewProps {
  workouts: WorkoutLog[];
  onOpenLogWorkout: () => void;
}

export const MoveView: React.FC<MoveViewProps> = ({
  workouts,
  onOpenLogWorkout
}) => {
  const [selectedDuration, setSelectedDuration] = useState<number>(25);
  const [weightInput, setWeightInput] = useState<string>('');
  const [waistInput, setWaistInput] = useState<string>('');
  const [hipsInput, setHipsInput] = useState<string>('');
  const [weightLogSuccess, setWeightLogSuccess] = useState(false);

  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurement[]>(() => StorageService.getBodyMeasurements());

  const workoutRec = AIEngine.getSmartWorkoutRecommendation(selectedDuration);

  const categories: { name: ExerciseCategory; emoji?: string }[] = [
    { name: 'Upper body' },
    { name: 'Legs' },
    { name: 'Glutes' },
    { name: 'Arms' },
    { name: 'Wrist / Forearms' },
    { name: 'Core' },
    { name: 'Cardio' },
    { name: 'Mobility' },
    { name: 'Stretching' },
    { name: 'Full body' }
  ];

  const handleSaveWeight = (e: React.FormEvent) => {
    e.preventDefault();
    if (!weightInput.trim()) return;
    
    const newEntry: BodyMeasurement = {
      id: `bm-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      weightKg: parseFloat(weightInput),
      waistCm: waistInput ? parseFloat(waistInput) : undefined,
      hipsCm: hipsInput ? parseFloat(hipsInput) : undefined,
      strengthScore: 75
    };

    StorageService.saveBodyMeasurement(newEntry);
    setBodyMeasurements(StorageService.getBodyMeasurements());
    setWeightLogSuccess(true);
    setWeightInput('');
    setWaistInput('');
    setHipsInput('');
    setTimeout(() => setWeightLogSuccess(false), 3000);
  };

  const chartData = bodyMeasurements.map(m => ({
    date: m.date.slice(5),
    weightKg: m.weightKg,
    strengthScore: m.strengthScore || 70,
    waistCm: m.waistCm
  }));

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 md:pb-8"
    >
      <div className="bg-gradient-to-r from-pink-100/90 via-sky-50/80 to-pink-50/90 rounded-4xl p-6 sm:p-8 border border-pink-200/80 shadow-pink-glow flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-200/70 px-3 py-1 rounded-full border border-pink-300/60 shadow-xs">
              Movement & Progress
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-2">
            Movement & Body Wellbeing 🏃‍♀️
          </h2>
          <p className="text-sm font-semibold text-pink-700 mt-1">
            Build sustainable strength, stamina, and body confidence.
          </p>
          <p className="text-xs text-slate-500 mt-0.5">
            Smart workout recommendations adapt to your recovery, time, and cycle stage.
          </p>

          <button
            onClick={onOpenLogWorkout}
            className="mt-4 px-6 py-3.5 bg-gradient-to-r from-pink-500 via-rose-400 to-sky-400 text-white font-extrabold text-xs rounded-2xl shadow-pink-glow hover:brightness-105 transition flex items-center gap-2 shrink-0 animate-glow"
          >
            <Plus className="w-4 h-4" />
            <span>Log Workout</span>
          </button>
        </div>

        {/* Animated Girl Running Illustration */}
        <div className="shrink-0 flex items-center justify-center relative z-10 transform hover:scale-105 transition duration-300">
          <RunningGirlIllustration size="md" />
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-pink-100 text-pink-600 flex items-center justify-center">
              <Scale className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Today's Weight & Body Measurements</h3>
              <p className="text-xs text-slate-500 font-medium">Non-judgmental progress tracking</p>
            </div>
          </div>
          {weightLogSuccess && (
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100">
              Logged ✓
            </span>
          )}
        </div>

        <form onSubmit={handleSaveWeight} className="grid grid-cols-1 sm:grid-cols-4 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200/80">
          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Weight (kg)</label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 62.0"
              value={weightInput}
              onChange={(e) => setWeightInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Waist (cm)</label>
            <input
              type="number"
              step="0.5"
              placeholder="e.g. 70.0"
              value={waistInput}
              onChange={(e) => setWaistInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div>
            <label className="block text-[10px] font-extrabold uppercase text-slate-400 mb-1">Hips (cm)</label>
            <input
              type="number"
              step="0.5"
              placeholder="e.g. 95.0"
              value={hipsInput}
              onChange={(e) => setHipsInput(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-pink-300"
            />
          </div>

          <div className="flex items-end">
            <button
              type="submit"
              className="w-full py-2.5 bg-pink-500 hover:bg-pink-600 text-white font-extrabold text-xs rounded-xl shadow-xs transition"
            >
              Save Measurements
            </button>
          </div>
        </form>

        <div className="space-y-2 pt-2">
          <div className="flex items-center justify-between">
            <p className="text-xs font-extrabold text-slate-700">Weight & Strength Progress Trend</p>
            {bodyMeasurements.length > 0 && (
              <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                {bodyMeasurements.length} log(s) recorded
              </span>
            )}
          </div>

          {bodyMeasurements.length > 0 ? (
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} />
                  <YAxis stroke="#94a3b8" fontSize={11} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #f1f5f9' }}
                  />
                  <Line type="monotone" dataKey="strengthScore" name="Strength Score" stroke="#c084fc" strokeWidth={3} dot={{ r: 4 }} />
                  <Line type="monotone" dataKey="weightKg" name="Weight (kg)" stroke="#f472b6" strokeWidth={3} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="p-6 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 text-center space-y-1">
              <p className="text-sm font-extrabold text-slate-700">No measurement logs recorded yet</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Log today's weight & measurements above to build your progress trend chart over time!
              </p>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-pink-400 to-purple-400 text-white flex items-center justify-center">
              <Dumbbell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Smart Today's Workout</h3>
              <p className="text-xs text-slate-500">Personalized based on rest & history</p>
            </div>
          </div>

          <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-200">
            {workoutRec.intensity} Intensity
          </span>
        </div>

        <div className="p-5 bg-gradient-to-r from-pink-50/80 via-purple-50/80 to-sky-50/80 rounded-2xl border border-pink-100 space-y-3">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-xl font-extrabold text-slate-800">{workoutRec.title}</h4>
              <p className="text-xs font-semibold text-slate-600 mt-1">"{workoutRec.reasoning}"</p>
            </div>
            <span className="text-sm font-extrabold text-pink-600 bg-white px-3 py-1.5 rounded-2xl shadow-xs">
              {workoutRec.durationMin} min
            </span>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Select Available Time:</p>
            <div className="flex flex-wrap gap-2">
              {[10, 15, 25, 30, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => setSelectedDuration(mins)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                    selectedDuration === mins
                      ? 'bg-pink-500 text-white shadow-xs'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-pink-50'
                  }`}
                >
                  [{mins} min]
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2">
            <p className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-2">Workout Plan Preview:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {workoutRec.exercises.map((ex, idx) => (
                <div key={idx} className="p-2.5 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
                  <span className="font-bold text-slate-800">{ex.name}</span>
                  <span className="text-slate-500 font-semibold">{ex.sets ? `${ex.sets} sets x ${ex.reps} reps` : `${ex.durationMin} min`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-2 flex gap-3">
            <button
              onClick={onOpenLogWorkout}
              className="flex-1 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-extrabold text-sm rounded-2xl shadow-soft hover:brightness-105 transition"
            >
              Start Workout
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Target Muscle Areas</h3>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={onOpenLogWorkout}
              className="p-3 bg-slate-50 hover:bg-pink-50 border border-slate-200 hover:border-pink-200 rounded-2xl text-left transition group"
            >
              <p className="text-xs font-extrabold text-slate-800 group-hover:text-pink-600">{cat.name}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <h3 className="font-extrabold text-slate-800 text-lg">Workout History</h3>
        {workouts.length > 0 ? (
          <div className="space-y-3">
            {workouts.map(w => (
              <div key={w.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-extrabold text-slate-800 text-base">{w.title}</h4>
                    <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full">{w.category}</span>
                  </div>
                  <p className="text-xs text-slate-500 font-medium mt-1">{w.date} • {w.durationMin} minutes • {w.notes}</p>
                </div>

                <div className="flex items-center gap-3 text-xs font-bold text-slate-600">
                  <span>Recovery: {w.recoveryScore}/5 ⭐</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-4 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 text-center">
            <p className="text-xs text-slate-400 font-medium">No workouts logged yet. Tap "+ Log Workout" to record your first session!</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
