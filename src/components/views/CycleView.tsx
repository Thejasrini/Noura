import React, { useState } from 'react';
import type { CycleLog } from '../../types';
import { StorageService } from '../../services/storage';
import { CycleEngine } from '../../services/cycleEngine';
import { Plus, Calendar, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RelaxingGirlIllustration } from '../illustrations/RelaxingGirlIllustration';

interface CycleViewProps {
  cycleLogs: CycleLog[];
  onOpenLogPeriod: () => void;
  cycleDay: number;
}

export const CycleView: React.FC<CycleViewProps> = ({
  cycleLogs,
  onOpenLogPeriod,
  cycleDay: _cycleDay,
}) => {
  const [selectedStage, setSelectedStage] = useState<'period' | 'after_period' | 'ovulation' | 'before_period'>('before_period');

  const daysInSeptember = Array.from({ length: 30 }, (_, i) => i + 1);
  const profile = StorageService.getProfile();
  const cycleEst = CycleEngine.calculate(cycleLogs, profile, "2026-09-05");

  // 4 Cycle Stages Definition
  const stages = [
    {
      id: 'period',
      name: 'Period',
      tagline: 'Your period phase.',
      color: 'bg-pink-100/80 border-pink-300 text-pink-700',
      activeColor: 'bg-gradient-to-r from-pink-500 to-rose-400 text-white shadow-pink-glow',
      dayRange: 'Days 1–5',
      icon: '🌸',
      whatHappening: 'Your body sheds its uterine lining. Hormones are at baseline.',
      mightNotice: ['Mild cramps', 'Lower energy', 'Desire for warmth & quiet', 'Bloating'],
      suggestions: ['Prioritize 8+ hours sleep', 'Sip warm peppermint/ginger tea', 'Light mobility stretching']
    },
    {
      id: 'after_period',
      name: 'After Period',
      tagline: 'Your period has ended. Energy rises.',
      color: 'bg-teal-100/80 border-teal-300 text-teal-700',
      activeColor: 'bg-gradient-to-r from-teal-500 to-emerald-400 text-white shadow-soft',
      dayRange: 'Days 6–11',
      icon: '🌿',
      whatHappening: 'Estrogen rises, rebuilding stamina, skin radiance, and physical energy.',
      mightNotice: ['Higher mental clarity', 'Fresh motivation', 'Quicker recovery', 'Clear skin'],
      suggestions: ['Try progressive strength workouts', 'Engage in longer walks', 'Enjoy fresh vibrant meals']
    },
    {
      id: 'ovulation',
      name: 'Ovulation',
      tagline: 'High energy & confidence.',
      color: 'bg-sky-100/80 border-sky-300 text-sky-700',
      activeColor: 'bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-sky-glow',
      dayRange: 'Days 12–16',
      icon: '✨',
      whatHappening: 'Peak LH and estrogen levels. Peak energy, sociability, and strength.',
      mightNotice: ['High stamina', 'Upbeat mood', 'Vibrant skin', 'High motivation'],
      suggestions: ['Challenging strength training', 'Social events & goal setting', 'High-protein meals']
    },
    {
      id: 'before_period',
      name: 'Before Period',
      tagline: 'Luteal phase. Slow down & care.',
      color: 'bg-purple-100/80 border-purple-300 text-purple-700',
      activeColor: 'bg-gradient-to-r from-purple-500 to-pink-400 text-white shadow-pink-glow',
      dayRange: 'Days 17–28',
      icon: '🌙',
      whatHappening: 'Progesterone rises, then drops. Body prepares for rest.',
      mightNotice: ['Mild sugar cravings', 'Desire for quiet', 'Slight fatigue', 'Emotional sensitivity'],
      suggestions: ['Cozy warm baths', 'Magnesium-rich foods', 'Gentle evening walks']
    }
  ];

  const currentStageInfo = stages.find(s => s.id === selectedStage) || stages[3];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 md:pb-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-pink-100 via-rose-50 to-pink-50 rounded-4xl p-6 sm:p-8 border border-pink-200/60 shadow-soft flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-200/50 px-2.5 py-0.5 rounded-full">Cycle Companion</span>
          </div>
          {cycleEst.hasData ? (
            <>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
                Cycle Day {cycleEst.currentCycleDay}
              </h2>
              <p className="text-sm font-semibold text-pink-700 mt-1">
                Current Stage: {cycleEst.stageEmoji} {cycleEst.stageName}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Next period expected around <span className="font-bold text-pink-600">{cycleEst.nextPeriodStartDate}</span> ({cycleEst.daysUntilNextPeriod} days away).
              </p>
            </>
          ) : (
            <>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-1">
                Cycle & Period Tracker
              </h2>
              <p className="text-sm font-semibold text-pink-700 mt-1">
                No cycle data logged yet
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                Log your last period start date to calculate your cycle day & next estimated period.
              </p>
            </>
          )}

          <button
            onClick={onOpenLogPeriod}
            className="mt-4 px-5 py-3.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-extrabold text-xs rounded-2xl shadow-soft hover:brightness-105 transition flex items-center gap-2 shrink-0"
          >
            <Plus className="w-4 h-4" />
            <span>Log Period Dates</span>
          </button>
        </div>

        {/* Animated Girl Relaxing Illustration */}
        <div className="shrink-0 flex items-center justify-center relative z-10 transform hover:scale-105 transition duration-300">
          <RelaxingGirlIllustration size="md" />
        </div>
      </div>

      {/* INTERACTIVE CYCLE STAGE JOURNEY */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-5">
        <div>
          <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-pink-500" />
            <span>Interactive Cycle Journey</span>
          </h3>
          <p className="text-xs text-slate-500 font-medium">Tap any cycle stage below to discover what your body is doing.</p>
        </div>

        {/* 4 Pipeline Stage Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {stages.map((stg) => {
            const isActive = selectedStage === stg.id;
            return (
              <button
                key={stg.id}
                onClick={() => setSelectedStage(stg.id as any)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative ${
                  isActive
                    ? stg.activeColor + ' ring-2 ring-pink-300 scale-102'
                    : 'bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xl">{stg.icon}</span>
                  <span className="text-[10px] font-bold opacity-80">{stg.dayRange}</span>
                </div>
                <p className="font-extrabold text-xs mt-2">{stg.name}</p>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="p-5 bg-gradient-to-br from-pink-50/70 via-purple-50/70 to-sky-50/70 rounded-2xl border border-pink-100 space-y-4"
          >
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 bg-white px-2.5 py-0.5 rounded-full border border-pink-100">
                {currentStageInfo.dayRange}
              </span>
              <h4 className="text-lg font-extrabold text-slate-800 mt-1">{currentStageInfo.tagline}</h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 space-y-1">
                <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">What is happening</p>
                <p className="font-semibold text-slate-700 leading-relaxed">{currentStageInfo.whatHappening}</p>
              </div>

              <div className="p-3.5 bg-white rounded-2xl border border-slate-200/80 space-y-1">
                <p className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">What you may notice</p>
                <ul className="font-semibold text-slate-700 space-y-1">
                  {currentStageInfo.mightNotice.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PREVIOUS MONTHS / CYCLE HISTORY */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
              <Calendar className="w-4 h-4 text-pink-500" />
              <span>Cycle History & Previous Months</span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">All historical cycles remain saved and accessible.</p>
          </div>
        </div>

        {cycleEst.hasData ? (
          <div className="space-y-3">
            {cycleLogs.map(log => (
              <div key={log.id} className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-extrabold text-pink-600">Period Start Date: {log.date}</p>
                  <p className="text-xs text-slate-500 font-medium">Flow: {log.flowLevel || 'Normal'} • Symptoms: {log.symptoms.join(', ') || 'None'}</p>
                </div>
                <span className="text-xs font-bold text-slate-600 bg-white px-3 py-1 rounded-xl border border-slate-200">
                  Logged
                </span>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
            <p className="text-sm font-extrabold text-slate-700">No cycle history logged yet</p>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              Tap "+ Log Cycle & Symptoms" to record your period dates. Your past cycles will automatically show up here!
            </p>
          </div>
        )}
      </div>

      {/* PERIOD CALENDAR */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-extrabold text-slate-800 text-lg">September 2026 Calendar</h3>
          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="flex items-center gap-1.5 text-pink-600">
              <span className="w-3 h-3 rounded-full bg-pink-300 inline-block" /> Past Period
            </span>
            <span className="flex items-center gap-1.5 text-pink-400">
              <span className="w-3 h-3 rounded-full bg-pink-100 border border-pink-300 inline-block" /> Estimated Next
            </span>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-slate-400 uppercase tracking-wider">
          <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          <div /><div />
          {daysInSeptember.map(day => {
            const isToday = day === 5;
            const dayStr = `2026-09-${day < 10 ? '0' + day : day}`;
            const isLoggedPeriod = cycleEst.isLoggedPeriodOnDate(dayStr);
            const isPredicted = cycleEst.isPeriodExpectedOnDate(dayStr);

            return (
              <div
                key={day}
                onClick={onOpenLogPeriod}
                className={`h-14 rounded-2xl p-1.5 border flex flex-col justify-between cursor-pointer transition ${
                  isToday
                    ? 'bg-pink-500 text-white border-pink-500 shadow-md font-bold'
                    : isLoggedPeriod
                    ? 'bg-pink-300 border-pink-400 text-pink-900 font-bold'
                    : isPredicted
                    ? 'bg-pink-50 border-pink-200 text-pink-700 hover:bg-pink-100'
                    : 'bg-slate-50/70 border-slate-100 text-slate-700 hover:bg-slate-100'
                }`}
              >
                <div className="flex justify-between items-center text-xs font-extrabold">
                  <span className={isToday ? 'text-white' : 'text-slate-800'}>{day}</span>
                </div>
                {isLoggedPeriod && (
                  <span className="text-[10px] text-pink-900 font-bold leading-none">🌸 Period</span>
                )}
                {isPredicted && !isLoggedPeriod && (
                  <span className="text-[10px] text-pink-600 font-bold leading-none">Est</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* CYCLE EDUCATION */}
      <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-sky-50 rounded-3xl p-6 border border-purple-100 shadow-soft space-y-3">
        <div className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-pink-500" />
          <h3 className="font-extrabold text-slate-800 text-base">Learn About Your Body</h3>
        </div>
        <p className="text-sm font-semibold text-slate-700 leading-relaxed">
          "Your hormones naturally change throughout your cycle. These shifts influence energy, mood, appetite, and rest preferences. Tracking your history helps you anticipate these changes with self-compassion."
        </p>
      </div>
    </motion.div>
  );
};
