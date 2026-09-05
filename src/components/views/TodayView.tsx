import React, { useState } from 'react';
import type { 
  DailyCheckIn, MealItem, WorkoutLog, TaskItem, FuturePlan, UserProfile 
} from '../../types';
import { StorageService } from '../../services/storage';
import { AIEngine } from '../../services/aiEngine';
import { CycleEngine } from '../../services/cycleEngine';
import { 
  Sun, Moon, Dumbbell, Utensils, Footprints, Droplets, 
  Sparkles, CheckCircle2, Circle, Plus, Activity, Calendar
} from 'lucide-react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { RunningGirlIllustration } from '../illustrations/RunningGirlIllustration';
import { EatingGirlIllustration } from '../illustrations/EatingGirlIllustration';
import { DrinkingGirlIllustration } from '../illustrations/DrinkingGirlIllustration';
import { RelaxingGirlIllustration } from '../illustrations/RelaxingGirlIllustration';

interface TodayViewProps {
  profile: UserProfile;
  checkIn: DailyCheckIn;
  onUpdateCheckIn: (checkIn: DailyCheckIn) => void;
  meals: MealItem[];
  onOpenLogMeal: (type?: 'breakfast' | 'lunch' | 'snack' | 'dinner') => void;
  workouts: WorkoutLog[];
  onOpenLogWorkout: () => void;
  tasks: TaskItem[];
  onToggleTask: (id: string) => void;
  plans: FuturePlan[];
  onOpenMorningCheckIn: () => void;
  onOpenNightCheckIn: () => void;
  onOpenTomorrowPreview: () => void;
  onNavigateTab: (tab: string) => void;
}

export const TodayView: React.FC<TodayViewProps> = ({
  profile,
  checkIn,
  onUpdateCheckIn,
  meals,
  onOpenLogMeal,
  onOpenLogWorkout,
  workouts: _workouts,
  tasks,
  onToggleTask,
  plans,
  onOpenMorningCheckIn,
  onOpenNightCheckIn,
  onOpenTomorrowPreview,
  onNavigateTab
}) => {
  const [workoutDuration, setWorkoutDuration] = useState<number>(25);
  const workoutRec = AIEngine.getSmartWorkoutRecommendation(workoutDuration);
  const todayFocus = AIEngine.getTodayFocus();

  const cycleLogs = StorageService.getCycleLogs();

  const currentSteps = checkIn?.steps || 0;
  const currentWater = checkIn?.waterMl || 0;

  const handleAddWater = (amountMl: number) => {
    const newTotal = currentWater + amountMl;
    onUpdateCheckIn({
      ...checkIn,
      waterMl: newTotal
    });
    confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
  };

  const cycleEst = CycleEngine.calculate(cycleLogs, profile, "2026-09-05");

  const stepProgressPercent = Math.min(100, Math.round((currentSteps / profile.dailyStepGoal) * 100));
  const waterProgressPercent = Math.min(100, Math.round((currentWater / profile.dailyWaterGoalMl) * 100));

  const todayPlans = plans.filter(p => p.date === "2026-09-05");

  const hasProtein = meals.some(m => m.tags?.protein);
  const hasFiber = meals.some(m => m.tags?.fiber);
  const hasVeggies = meals.some(m => m.tags?.vegetables);
  const hasFruit = meals.some(m => m.tags?.fruit);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-6 pb-24 md:pb-8"
    >
      {/* Morning Companion Banner */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-pink-100/90 via-sky-50/80 to-pink-50/90 rounded-4xl p-6 sm:p-8 border border-pink-200/80 shadow-pink-glow relative overflow-hidden group"
      >
        <div className="absolute -top-20 -right-20 w-60 h-60 bg-sky-200/40 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition duration-700" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-pink-200/40 rounded-full blur-3xl pointer-events-none group-hover:scale-110 transition duration-700" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-200/70 px-3 py-1 rounded-full border border-pink-300/60 shadow-xs">
                Morning Companion
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-2">
              Good morning, {profile.name} 💕
            </h2>
            <p className="text-sm font-semibold text-slate-600 mt-1">
              Saturday, September 5 {cycleEst.hasData ? `• Cycle Day ${cycleEst.currentCycleDay}` : ''}
            </p>
            <p className="text-xs text-pink-600 font-bold mt-1">
              {cycleEst.hasData 
                ? `Next period expected around ${cycleEst.nextPeriodStartDate} (${cycleEst.daysUntilNextPeriod} days away).` 
                : 'Log your period start date in the Cycle tab to enable cycle predictions.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <RelaxingGirlIllustration size="sm" className="hidden lg:block" />
            {!checkIn?.morningCompleted ? (
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenMorningCheckIn}
                className="px-6 py-3.5 bg-gradient-to-r from-pink-500 via-rose-400 to-sky-400 text-white font-extrabold text-xs rounded-2xl shadow-pink-glow hover:brightness-105 transition flex items-center gap-2 shrink-0 animate-glow"
              >
                <Sun className="w-4 h-4 text-yellow-200" />
                <span>How do you feel today? (30s)</span>
              </motion.button>
            ) : (
              <span className="px-4 py-2.5 bg-emerald-50 text-emerald-700 text-xs font-extrabold rounded-2xl border border-emerald-200 flex items-center gap-1.5 shadow-xs">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Morning Check-in Complete ✓</span>
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Daily Check-In Overview Grid */}
      <motion.div variants={itemVariants} className="glass-card rounded-3xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
            <Activity className="w-4 h-4 text-pink-500" />
            <span>How Am I Today?</span>
          </h3>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            onClick={onOpenMorningCheckIn}
            className="text-xs font-bold text-pink-600 hover:underline"
          >
            Quick Edit
          </motion.button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-4 bg-gradient-to-br from-pink-100/70 to-pink-50/70 rounded-2xl border border-pink-200/80 flex items-center gap-3 transition shadow-xs">
            <span className="text-2xl">{checkIn?.mood === 'great' ? '😍' : checkIn?.mood === 'good' ? '😊' : '😐'}</span>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-pink-600">Mood</p>
              <p className="text-xs font-extrabold text-slate-800 mt-0.5">{checkIn?.mood ? checkIn.mood.toUpperCase() : 'Not logged'}</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-4 bg-gradient-to-br from-sky-100/70 to-sky-50/70 rounded-2xl border border-sky-200/80 flex items-center gap-3 transition shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-sky-200/80 text-sky-700 flex items-center justify-center font-extrabold text-xs">
              ⚡
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-sky-600">Energy</p>
              <p className="text-xs font-extrabold text-slate-800 mt-0.5">{checkIn?.energy ? `${checkIn.energy} / 5` : 'Not logged'}</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-4 bg-gradient-to-br from-purple-100/70 to-pink-50/70 rounded-2xl border border-purple-200/80 flex items-center gap-3 transition shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-purple-200/80 text-purple-700 flex items-center justify-center font-extrabold text-xs">
              🌙
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-purple-600">Sleep</p>
              <p className="text-xs font-extrabold text-slate-800 mt-0.5">{checkIn?.sleepHours ? `${checkIn.sleepHours} hours` : 'Not logged'}</p>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -3, scale: 1.02 }} className="p-4 bg-gradient-to-br from-teal-100/70 to-sky-50/70 rounded-2xl border border-teal-200/80 flex items-center gap-3 transition shadow-xs">
            <div className="w-8 h-8 rounded-xl bg-teal-200/80 text-teal-700 flex items-center justify-center font-extrabold text-xs">
              ✨
            </div>
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-teal-600">Body</p>
              <p className="text-xs font-extrabold text-slate-800 mt-0.5 truncate max-w-[90px]">
                {checkIn?.symptoms && checkIn.symptoms.length > 0 ? checkIn.symptoms[0] : 'No symptoms'}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Today's Focus Banner */}
      <motion.div variants={itemVariants} className="bg-gradient-to-r from-sky-100/90 via-pink-50/80 to-sky-50/90 rounded-3xl p-5 border border-sky-200/80 shadow-sky-glow flex items-start gap-3">
        <div className="w-9 h-9 rounded-2xl bg-sky-200/80 text-sky-700 flex items-center justify-center shrink-0">
          <Sparkles className="w-4 h-4 animate-spin-slow text-sky-600" />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-sky-700 bg-sky-200/70 px-2.5 py-0.5 rounded-full border border-sky-300/60">
            Today's Focus
          </span>
          <p className="text-sm font-semibold text-emerald-950 mt-1.5 leading-relaxed">
            {todayFocus.text}
          </p>
        </div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's Movement */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                  <Dumbbell className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">Today's Movement</h3>
                  <p className="text-xs text-slate-500">Suggested by AI</p>
                </div>
              </div>
              <span className="text-xs font-bold text-pink-600 bg-pink-50 px-2.5 py-1 rounded-full border border-pink-100">
                {workoutRec.category}
              </span>
            </div>

            <div className="p-4 bg-gradient-to-br from-pink-50/60 to-purple-50/60 rounded-2xl border border-pink-100 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-base">{workoutRec.title}</h4>
                  <p className="text-xs font-medium text-slate-600 mt-0.5">
                    "{workoutRec.reasoning}"
                  </p>
                </div>
                <span className="text-xs font-extrabold text-pink-600 bg-white px-2.5 py-1 rounded-xl shadow-xs">
                  {workoutRec.durationMin} min
                </span>
              </div>

              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-1.5">Adjust Duration:</p>
                <div className="flex flex-wrap gap-1.5">
                  {[10, 15, 25, 30, 45, 60].map(mins => (
                    <button
                      key={mins}
                      onClick={() => setWorkoutDuration(mins)}
                      className={`px-2.5 py-1 rounded-xl text-xs font-bold transition ${
                        workoutDuration === mins
                          ? 'bg-pink-500 text-white shadow-xs scale-105'
                          : 'bg-white text-slate-600 hover:bg-pink-100'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-1">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={onOpenLogWorkout}
                  className="flex-1 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-extrabold text-xs rounded-xl shadow-soft hover:brightness-105 transition"
                >
                  Start Workout
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onNavigateTab('move')}
                  className="px-3 py-2.5 bg-white text-slate-700 font-bold text-xs rounded-xl border border-slate-200 hover:bg-slate-50 transition"
                >
                  View Movement
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Food */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4 flex flex-col justify-between overflow-hidden relative">
          <div>
            <div className="flex items-center justify-between mb-4 relative z-10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
                  <Utensils className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base">Today's Food</h3>
                  <p className="text-xs text-slate-500">Nourishment Balance</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <EatingGirlIllustration size="sm" className="hidden sm:block" />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={() => onOpenLogMeal()}
                  className="text-xs font-bold text-emerald-600 hover:underline flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Log Meal
                </motion.button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
              {[
                { type: 'breakfast', label: 'Sunrise Breakfast' },
                { type: 'lunch', label: 'Midday Lunch' },
                { type: 'snack', label: 'Snack & Teatime' },
                { type: 'dinner', label: 'Evening Dinner' },
              ].map(m => {
                const isLogged = meals.some(meal => meal.mealType === m.type);
                return (
                  <motion.button
                    key={m.type}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => onOpenLogMeal(m.type as any)}
                    className={`p-3 rounded-2xl border text-left flex items-center justify-between transition ${
                      isLogged
                        ? 'bg-emerald-50/70 border-emerald-200 text-emerald-900'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <span className="text-xs font-bold">{m.label}</span>
                    <span className="text-xs font-bold text-emerald-600">
                      {isLogged ? '✓' : '○'}
                    </span>
                  </motion.button>
                );
              })}
            </div>

            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Food Balance Indicators:</p>
              {meals.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${hasProtein ? 'bg-rose-100 text-rose-700' : 'bg-slate-100 text-slate-400'}`}>
                    Protein {hasProtein ? '✓' : '○'}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${hasFiber ? 'bg-amber-100 text-amber-700' : 'bg-slate-100 text-slate-400'}`}>
                    Fiber {hasFiber ? '✓' : '○'}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${hasVeggies ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-400'}`}>
                    Vegetables {hasVeggies ? '✓' : '○'}
                  </span>
                  <span className={`px-2.5 py-1 text-xs font-bold rounded-lg ${hasFruit ? 'bg-sky-100 text-sky-700' : 'bg-slate-100 text-slate-400'}`}>
                    Fruit {hasFruit ? '✓' : '○'}
                  </span>
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium">No meals logged for today yet.</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Water Hydration & Daily Walking Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Water Hydration */}
        <div className="bg-gradient-to-br from-sky-50 via-white to-blue-50 rounded-3xl p-6 border border-sky-100 shadow-soft space-y-4 overflow-hidden relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                <Droplets className="w-4 h-4 animate-bounce-subtle" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Water Hydration</h3>
                <p className="text-xs text-slate-500">{(currentWater / 1000).toFixed(1)}L / {(profile.dailyWaterGoalMl / 1000).toFixed(1)}L Goal</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <DrinkingGirlIllustration size="sm" className="hidden sm:block" />
              <span className="text-xs font-extrabold text-blue-600 bg-white px-2.5 py-1 rounded-full border border-blue-200 shadow-xs">
                {waterProgressPercent}%
              </span>
            </div>
          </div>

          <div className="w-full h-3.5 bg-sky-100 rounded-full overflow-hidden p-0.5 border border-sky-200">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${waterProgressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full bg-gradient-to-r from-sky-400 to-blue-500 rounded-full shadow-inner"
            />
          </div>

          <div className="flex items-center gap-2">
            {[
              { amount: 250, label: '+250 ml' },
              { amount: 500, label: '+500 ml' },
              { amount: 750, label: '+750 ml' }
            ].map(b => (
              <motion.button
                key={b.amount}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => handleAddWater(b.amount)}
                className="flex-1 py-2.5 bg-white hover:bg-sky-100 text-sky-700 font-bold text-xs rounded-2xl border border-sky-200 shadow-xs transition"
              >
                {b.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Daily Walking */}
        <div className="bg-gradient-to-br from-pink-50 via-white to-rose-50 rounded-3xl p-6 border border-pink-100 shadow-soft space-y-4 overflow-hidden relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-pink-100 text-pink-600 flex items-center justify-center">
                <Footprints className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-extrabold text-slate-800 text-base">Daily Walking</h3>
                <p className="text-xs text-slate-500">{currentSteps.toLocaleString()} / {profile.dailyStepGoal.toLocaleString()} steps</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <RunningGirlIllustration size="sm" className="hidden sm:block" />
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => onNavigateTab('move')}
                className="text-xs font-bold text-pink-600 hover:underline"
              >
                Charts
              </motion.button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-pink-100"
                  strokeWidth="3.5"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <motion.path
                  initial={{ strokeDasharray: "0, 100" }}
                  animate={{ strokeDasharray: `${stepProgressPercent}, 100` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="text-pink-500"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center text-xs font-extrabold text-pink-700">
                {stepProgressPercent}%
              </div>
            </div>

            <div className="flex-1 space-y-1">
              {currentSteps === 0 ? (
                <>
                  <p className="text-xs font-semibold text-slate-600">
                    No steps logged yet today. Target: {profile.dailyStepGoal.toLocaleString()} steps.
                  </p>
                  <p className="text-[11px] text-pink-600 font-medium">
                    Log your morning check-in or daily walk to track progress!
                  </p>
                </>
              ) : (
                <>
                  <p className="text-xs font-semibold text-slate-600">
                    {Math.max(0, profile.dailyStepGoal - currentSteps).toLocaleString()} steps to your daily goal!
                  </p>
                  <p className="text-[11px] text-pink-600 font-medium">
                    Keep up the great walking momentum!
                  </p>
                </>
              )}
            </div>
          </div>
        </div>

      </motion.div>

      {/* Tasks & Surfaced Plans Grid */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Tasks */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
              <span>Today's Tasks</span>
              <span className="text-xs font-bold text-slate-400">({tasks.filter(t => t.completed).length}/{tasks.length})</span>
            </h3>
            <button
              onClick={() => onNavigateTab('habits')}
              className="text-xs font-bold text-pink-600 hover:underline"
            >
              All Tasks
            </button>
          </div>

          {tasks.length > 0 ? (
            <div className="space-y-2">
              {tasks.map(t => (
                <motion.div
                  key={t.id}
                  whileHover={{ x: 3 }}
                  onClick={() => onToggleTask(t.id)}
                  className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                    t.completed
                      ? 'bg-slate-50 border-slate-200 text-slate-400 line-through'
                      : 'bg-white border-slate-200 hover:border-pink-300 text-slate-800 shadow-xs'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {t.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Circle className="w-4 h-4 text-slate-300" />
                    )}
                    <span className="text-sm font-semibold">{t.title}</span>
                  </div>
                  {t.time && <span className="text-xs font-medium text-slate-400">{t.time}</span>}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-slate-50/60 rounded-2xl border border-dashed border-slate-200 text-center">
              <p className="text-xs text-slate-400 font-medium">No tasks scheduled for today yet.</p>
            </div>
          )}
        </div>

        {/* Plans */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-slate-800 text-base flex items-center gap-2">
              <Calendar className="w-4 h-4 text-purple-500" />
              <span>Today's Surfaced Plans</span>
            </h3>
          </div>

          {todayPlans.length > 0 ? (
            todayPlans.map(plan => (
              <div key={plan.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl border border-purple-100 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-sm">{plan.title}</h4>
                    <p className="text-xs text-slate-600 mt-0.5">{plan.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-1">
                  <button className="px-3 py-1.5 bg-purple-600 text-white font-bold text-xs rounded-xl hover:bg-purple-700 transition">
                    Start
                  </button>
                  <button className="px-3 py-1.5 bg-white text-slate-600 font-bold text-xs rounded-xl border border-slate-200 hover:bg-slate-50 transition">
                    Reschedule
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
              <p className="text-xs text-slate-500 font-medium">No scheduled plans due today. You are all set!</p>
            </div>
          )}
        </div>

      </motion.div>

      {/* Evening Unwind Banner */}
      <motion.div 
        variants={itemVariants}
        className="bg-gradient-to-r from-indigo-900 via-purple-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
            <Moon className="w-5 h-5 text-indigo-200 animate-float" />
          </div>
          <div>
            <h3 className="font-extrabold text-base">Evening Unwind</h3>
            <p className="text-xs text-indigo-200">Take 1 minute for your night check-in & reflection</p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenNightCheckIn}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-gradient-to-r from-pink-400 to-rose-400 text-white font-bold text-xs rounded-2xl shadow-soft hover:brightness-110 transition"
          >
            Night Review
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onOpenTomorrowPreview}
            className="flex-1 sm:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-2xl border border-white/20 transition"
          >
            Tomorrow Preview
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};
