import React, { useState } from 'react';
import type { DailyCheckIn, WorkoutLog, MealItem, JournalEntry } from '../../types';
import { StorageService } from '../../services/storage';
import { CycleEngine } from '../../services/cycleEngine';
import { ChevronLeft, ChevronRight, X, Activity, Utensils, Dumbbell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CalendarViewProps {
  checkIns: DailyCheckIn[];
  workouts: WorkoutLog[];
  meals: MealItem[];
  journals: JournalEntry[];
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  checkIns,
  workouts,
  meals,
  journals
}) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date(2026, 8, 5)); // Sept 5, 2026
  const [selectedDateStr, setSelectedDateStr] = useState<string>('2026-09-05');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');

  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth(); // 0-indexed

  const monthName = currentDate.toLocaleString('en-US', { month: 'long' });
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfWeek = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sun .. 6 = Sat

  const cycleLogs = StorageService.getCycleLogs();
  const profile = StorageService.getProfile();
  const cycleEst = CycleEngine.calculate(cycleLogs, profile, "2026-09-05");

  const formatLocalDate = (year: number, month: number, day: number): string => {
    const mm = String(month + 1).padStart(2, '0');
    const dd = String(day).padStart(2, '0');
    return `${year}-${mm}-${dd}`;
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentYear, currentMonth + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date(2026, 8, 5));
    setSelectedDateStr('2026-09-05');
  };

  const getDayData = (dateStr: string) => {
    const checkIn = checkIns.find(c => c.date === dateStr);
    const dayWorkouts = workouts.filter(w => w.date === dateStr);
    const dayMeals = meals.filter(m => m.date === dateStr);
    const dayJournals = journals.filter(j => j.date === dateStr);
    const isPeriodDay = cycleEst.isLoggedPeriodOnDate(dateStr);
    const isPredictedPeriodDay = cycleEst.isPeriodExpectedOnDate(dateStr);

    return { checkIn, dayWorkouts, dayMeals, dayJournals, isPeriodDay, isPredictedPeriodDay, dateStr };
  };

  const selectedData = selectedDateStr ? getDayData(selectedDateStr) : null;

  // Build week days for Week View
  const getWeekDays = () => {
    const selDate = new Date(selectedDateStr + 'T00:00:00');
    const dayOfWeek = selDate.getDay();
    const startOfWeek = new Date(selDate);
    startOfWeek.setDate(selDate.getDate() - dayOfWeek);

    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      const dateStr = formatLocalDate(d.getFullYear(), d.getMonth(), d.getDate());
      weekDays.push({ date: d, dateStr, dayNum: d.getDate() });
    }
    return weekDays;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 md:pb-8"
    >
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-pink-100/90 via-sky-50/80 to-pink-50/90 rounded-4xl p-6 sm:p-8 border border-pink-200/80 shadow-pink-glow flex flex-col sm:flex-row sm:items-center justify-between gap-6 overflow-hidden relative">
        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-pink-600 bg-pink-200/70 px-3 py-1 rounded-full border border-pink-300/60 shadow-xs">
              Interactive History
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight mt-2">
            Wellness Calendar 📅
          </h2>
          <p className="text-sm font-semibold text-pink-700 mt-1">
            Track your cycle predictions, workouts, meals, and daily mood history over time.
          </p>
        </div>

        {/* View Mode Selector (Month / Week / Day) */}
        <div className="flex items-center gap-1.5 p-1.5 bg-white/90 backdrop-blur-md rounded-2xl border border-pink-200 shadow-xs relative z-10">
          {(['month', 'week', 'day'] as const).map(mode => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold capitalize transition-all duration-200 ${
                viewMode === mode
                  ? 'bg-gradient-to-r from-pink-500 to-sky-400 text-white shadow-pink-glow'
                  : 'text-slate-600 hover:text-pink-600 hover:bg-pink-50'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Calendar Card */}
      <div className="glass-card rounded-3xl p-6 space-y-6">
        {/* Month & Year Navigation Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-pink-100 pb-4">
          <div className="flex items-center gap-3">
            <h3 className="font-extrabold text-slate-800 text-xl tracking-tight">
              {monthName} {currentYear}
            </h3>
            <button
              onClick={handleToday}
              className="px-3 py-1 bg-pink-100/80 hover:bg-pink-200/80 text-pink-700 text-xs font-bold rounded-full border border-pink-200 shadow-xs transition"
            >
              Today
            </button>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500 mr-2">{checkIns.length} Record(s) Logged</span>
            
            <div className="flex items-center gap-1">
              <button
                onClick={handlePrevMonth}
                className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 transition"
                title="Previous Month"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={handleNextMonth}
                className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 border border-pink-200 transition"
                title="Next Month"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* 1. MONTH VIEW */}
        {viewMode === 'month' && (
          <div className="space-y-3">
            {/* Weekday Headers */}
            <div className="grid grid-cols-7 gap-2 text-center text-xs font-extrabold text-slate-400 uppercase tracking-wider">
              <span>Sun</span><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span>
            </div>

            {/* Calendar Days Grid */}
            <div className="grid grid-cols-7 gap-2">
              {/* Empty padding cells for starting weekday */}
              {Array.from({ length: firstDayOfWeek }).map((_, i) => (
                <div key={`empty-${i}`} className="min-h-[72px] rounded-2xl bg-slate-50/40 border border-transparent" />
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const dateStr = formatLocalDate(currentYear, currentMonth, day);
                const data = getDayData(dateStr);
                const isSelected = selectedDateStr === dateStr;
                const isToday = dateStr === '2026-09-05';

                return (
                  <motion.div
                    key={day}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedDateStr(dateStr)}
                    className={`min-h-[72px] rounded-2xl p-2 border flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'bg-gradient-to-br from-pink-100 to-sky-100 border-pink-400 ring-2 ring-pink-400/60 shadow-pink-glow'
                        : isToday
                        ? 'bg-gradient-to-br from-pink-500 to-rose-400 text-white border-pink-400 shadow-pink-glow'
                        : data.isPeriodDay
                        ? 'bg-rose-100/90 border-rose-300 text-rose-800'
                        : data.isPredictedPeriodDay
                        ? 'bg-pink-100/60 border-pink-200 text-pink-700'
                        : 'bg-white/80 border-slate-100 hover:border-pink-200 hover:bg-pink-50/40'
                    }`}
                  >
                    <div className="flex justify-between items-center text-xs font-extrabold">
                      <span className={isToday ? 'text-white' : 'text-slate-800'}>{day}</span>
                      {isToday && <span className="text-[9px] bg-white/30 text-white px-1.5 py-0.5 rounded-full">Today</span>}
                    </div>

                    <div className="flex flex-wrap gap-1 text-xs mt-1">
                      {data.isPeriodDay && <span>🌸</span>}
                      {data.isPredictedPeriodDay && !data.isPeriodDay && (
                        <span className="text-[10px] bg-pink-200/80 text-pink-700 px-1 py-0.5 rounded-md font-bold">Est</span>
                      )}
                      {data.dayWorkouts.length > 0 && <span>💪</span>}
                      {data.dayMeals.length > 0 && <span>🥗</span>}
                      {data.checkIn?.steps ? <span>🚶</span> : null}
                      {data.dayJournals.length > 0 && <span>📔</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. WEEK VIEW */}
        {viewMode === 'week' && (
          <div className="space-y-4">
            <p className="text-xs font-semibold text-slate-500">7-Day Week Overview focused on <span className="font-bold text-pink-600">{selectedDateStr}</span></p>
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-3">
              {getWeekDays().map(w => {
                const data = getDayData(w.dateStr);
                const isSelected = selectedDateStr === w.dateStr;
                const dayName = w.date.toLocaleString('en-US', { weekday: 'short' });

                return (
                  <motion.div
                    key={w.dateStr}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedDateStr(w.dateStr)}
                    className={`p-4 rounded-2xl border flex flex-col justify-between cursor-pointer transition ${
                      isSelected
                        ? 'bg-gradient-to-br from-pink-100 to-sky-100 border-pink-400 ring-2 ring-pink-300'
                        : 'bg-white border-slate-100 hover:border-pink-200'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold text-slate-400 uppercase">{dayName}</p>
                      <p className="text-xl font-extrabold text-slate-800 mt-1">{w.dayNum}</p>
                    </div>

                    <div className="mt-3 space-y-1.5 text-xs">
                      {data.isPeriodDay && <span className="block px-2 py-0.5 bg-rose-100 text-rose-700 font-bold rounded-lg">Period 🌸</span>}
                      {data.isPredictedPeriodDay && !data.isPeriodDay && <span className="block px-2 py-0.5 bg-pink-100 text-pink-700 font-bold rounded-lg">Est Period</span>}
                      {data.dayWorkouts.length > 0 && <span className="block text-slate-600 font-semibold">💪 {data.dayWorkouts[0].category}</span>}
                      {data.checkIn?.mood && <span className="block text-slate-600 font-semibold">Mood: {data.checkIn.mood}</span>}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. DAY VIEW */}
        {viewMode === 'day' && (
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-pink-50 to-sky-50 rounded-2xl border border-pink-200 flex items-center justify-between">
              <div>
                <h4 className="font-extrabold text-slate-800 text-lg">Single Day Inspection — {selectedDateStr}</h4>
                <p className="text-xs text-slate-500 font-medium">Detailed logged history & wellness metrics</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Selected Day Detailed Inspector Card */}
      <AnimatePresence>
        {selectedData && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            className="glass-card rounded-3xl p-6 space-y-4 border-pink-200/80 shadow-pink-glow"
          >
            <div className="flex items-center justify-between border-b border-pink-100 pb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-pink-400 to-sky-400 text-white flex items-center justify-center font-extrabold text-sm shadow-xs">
                  {selectedData.dateStr.slice(8)}
                </div>
                <div>
                  <h4 className="font-extrabold text-slate-800 text-lg">Daily Logged Record — {selectedData.dateStr}</h4>
                  <p className="text-xs text-pink-600 font-bold">
                    {selectedData.isPeriodDay ? '🌸 Period Logged' : selectedData.isPredictedPeriodDay ? '✨ Estimated Period Day' : 'Regular Cycle Day'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedDateStr('')}
                className="p-2 rounded-xl bg-pink-50 hover:bg-pink-100 text-pink-600 transition"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {/* Mood & Energy */}
              <div className="p-4 bg-gradient-to-br from-pink-50 to-pink-100/50 rounded-2xl border border-pink-200/80">
                <p className="text-xs font-extrabold text-pink-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Activity className="w-3.5 h-3.5" /> Check-in & Mood
                </p>
                <p className="text-base font-extrabold text-slate-800 mt-2">
                  {selectedData.checkIn?.mood ? selectedData.checkIn.mood.toUpperCase() : 'Not logged'}
                </p>
                <p className="text-xs text-slate-600 mt-1 font-semibold">
                  Energy: {selectedData.checkIn?.energy ? `${selectedData.checkIn.energy} / 5` : 'Not logged'}
                </p>
              </div>

              {/* Water & Walking */}
              <div className="p-4 bg-gradient-to-br from-sky-50 to-blue-100/50 rounded-2xl border border-sky-200/80">
                <p className="text-xs font-extrabold text-sky-700 uppercase tracking-wider">
                  🚶 Walking & Water
                </p>
                <p className="text-base font-extrabold text-slate-800 mt-2">
                  {(selectedData.checkIn?.steps || 0).toLocaleString()} steps
                </p>
                <p className="text-xs text-slate-600 mt-1 font-semibold">
                  Water: {((selectedData.checkIn?.waterMl || 0)/1000).toFixed(1)}L
                </p>
              </div>

              {/* Workouts */}
              <div className="p-4 bg-gradient-to-br from-purple-50 to-pink-100/50 rounded-2xl border border-purple-200/80">
                <p className="text-xs font-extrabold text-purple-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Dumbbell className="w-3.5 h-3.5" /> Workouts
                </p>
                <p className="text-base font-extrabold text-slate-800 mt-2">
                  {selectedData.dayWorkouts.length > 0 ? selectedData.dayWorkouts[0].title : 'No workouts'}
                </p>
                <p className="text-xs text-slate-600 mt-1 font-semibold">
                  {selectedData.dayWorkouts.length > 0 ? `${selectedData.dayWorkouts[0].durationMin} mins logged` : '0 mins'}
                </p>
              </div>

              {/* Nourishment & Meals */}
              <div className="p-4 bg-gradient-to-br from-teal-50 to-sky-100/50 rounded-2xl border border-teal-200/80">
                <p className="text-xs font-extrabold text-teal-700 uppercase tracking-wider flex items-center gap-1.5">
                  <Utensils className="w-3.5 h-3.5" /> Food & Journal
                </p>
                <p className="text-base font-extrabold text-slate-800 mt-2">
                  {selectedData.dayMeals.length > 0 ? `${selectedData.dayMeals.length} meal(s) logged` : 'No meals logged'}
                </p>
                <p className="text-xs text-slate-600 mt-1 font-semibold">
                  {selectedData.dayJournals.length > 0 ? '📔 Journal entry recorded' : 'No journal entry'}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
