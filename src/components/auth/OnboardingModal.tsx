import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Check, ArrowRight, SkipForward } from 'lucide-react';
import confetti from 'canvas-confetti';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [step, setStep] = useState(1);
  const [selectedGoals, setSelectedGoals] = useState<string[]>(['Understand my cycle', 'Walking', 'Sleep']);
  const [fitnessLevel, setFitnessLevel] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [stepGoal, setStepGoal] = useState(7000);
  const [waterGoal, setWaterGoal] = useState(2000);
  const [cycleDays, setCycleDays] = useState(29);
  const [periodDays, setPeriodDays] = useState(5);

  const goalOptions = [
    'Understand my cycle',
    'Fitness',
    'Walking',
    'Nutrition',
    'Sleep',
    'Energy',
    'Mood',
    'Healthy habits',
    'Weight/body progress',
    'Understand my patterns',
    'Everything'
  ];

  const toggleGoal = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
      onComplete();
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Welcome to Noura (${step}/4)`} maxWidth="max-w-lg">
      <div className="space-y-6">
        {/* Step 1: Goals */}
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">What would you like to improve?</h3>
              <p className="text-xs text-slate-500 font-medium">Select anything that feels relevant for you.</p>
            </div>

            <div className="flex flex-wrap gap-2">
              {goalOptions.map(g => {
                const active = selectedGoals.includes(g);
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => toggleGoal(g)}
                    className={`px-3.5 py-2 rounded-2xl text-xs font-bold border transition flex items-center gap-1.5 ${
                      active
                        ? 'bg-pink-100 border-pink-300 text-pink-700 shadow-xs'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {active && <Check className="w-3.5 h-3.5 text-pink-600" />}
                    <span>{g}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Fitness Level */}
        {step === 2 && (
          <div className="space-y-4">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">Your Current Fitness Level</h3>
              <p className="text-xs text-slate-500 font-medium">This helps customize your daily workout recommendations.</p>
            </div>

            <div className="space-y-2">
              {(['Beginner', 'Intermediate', 'Advanced'] as const).map(lvl => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setFitnessLevel(lvl)}
                  className={`w-full p-4 rounded-2xl border text-left flex items-center justify-between transition ${
                    fitnessLevel === lvl
                      ? 'bg-pink-50 border-pink-300 text-pink-700 shadow-xs font-extrabold'
                      : 'bg-slate-50 border-slate-200 text-slate-700 font-bold hover:bg-slate-100'
                  }`}
                >
                  <span>{lvl}</span>
                  {fitnessLevel === lvl && <Check className="w-4 h-4 text-pink-600" />}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Walking & Water Targets */}
        {step === 3 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">Daily Movement & Water Goals</h3>
              <p className="text-xs text-slate-500 font-medium">You can customize or change these anytime.</p>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Steps Target</label>
                <span className="text-sm font-extrabold text-pink-600">{stepGoal.toLocaleString()} steps</span>
              </div>
              <input
                type="range"
                min="3000"
                max="15000"
                step="500"
                value={stepGoal}
                onChange={(e) => setStepGoal(parseInt(e.target.value))}
                className="w-full h-2 bg-pink-100 rounded-lg appearance-none cursor-pointer accent-pink-500"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Daily Water Target</label>
                <span className="text-sm font-extrabold text-sky-600">{(waterGoal / 1000).toFixed(1)} Liters</span>
              </div>
              <input
                type="range"
                min="1000"
                max="4000"
                step="250"
                value={waterGoal}
                onChange={(e) => setWaterGoal(parseInt(e.target.value))}
                className="w-full h-2 bg-sky-100 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>
        )}

        {/* Step 4: Cycle Information */}
        {step === 4 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-base font-extrabold text-slate-800">Cycle Baseline</h3>
              <p className="text-xs text-slate-500 font-medium">Used for gentle estimates based on your logged history.</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Typical Cycle (Days)</label>
                <input
                  type="number"
                  value={cycleDays}
                  onChange={(e) => setCycleDays(parseInt(e.target.value) || 28)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">Period Duration (Days)</label>
                <input
                  type="number"
                  value={periodDays}
                  onChange={(e) => setPeriodDays(parseInt(e.target.value) || 5)}
                  className="w-full px-4 py-2.5 rounded-2xl border border-slate-200 font-bold text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-pink-300"
                />
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-2">
          <button
            type="button"
            onClick={onComplete}
            className="text-xs font-bold text-slate-400 hover:text-slate-600 transition flex items-center gap-1"
          >
            <SkipForward className="w-3.5 h-3.5" /> Skip Onboarding
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="px-6 py-3 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-extrabold text-xs rounded-2xl shadow-soft hover:brightness-105 transition flex items-center gap-1.5"
          >
            <span>{step === 4 ? 'Finish Setup ✨' : 'Next Step'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Modal>
  );
};
