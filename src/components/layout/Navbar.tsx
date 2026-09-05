import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home, Calendar, Utensils, Dumbbell, Sparkles, 
  RotateCcw, Target, BookOpen, Sun, Moon, LogOut 
} from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenPrivacy: () => void;
  onOpenMorningCheckIn: () => void;
  onOpenNightCheckIn: () => void;
  cycleDay: number;
  periodExpectedDays: number;
  userName: string;
  onLogOut: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenPrivacy: _onOpenPrivacy,
  onOpenMorningCheckIn,
  onOpenNightCheckIn,
  cycleDay,
  periodExpectedDays,
  userName,
  onLogOut
}) => {
  const mainNavItems = [
    { id: 'today', label: 'Today', icon: Home },
    { id: 'cycle', label: 'Cycle', icon: Calendar },
    { id: 'food', label: 'Food', icon: Utensils },
    { id: 'move', label: 'Move', icon: Dumbbell },
    { id: 'insights', label: 'Insights', icon: Sparkles },
  ];

  const secondaryNavItems = [
    { id: 'habits', label: 'Habits', icon: RotateCcw },
    { id: 'goals', label: 'Goals', icon: Target },
    { id: 'journal', label: 'Journal', icon: BookOpen },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
  ];

  return (
    <>
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-xl border-b border-pink-100/80 px-4 py-3 sm:px-6 shadow-xs">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <motion.div 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab('today')}
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-pink-400 via-rose-300 to-sky-400 flex items-center justify-center shadow-pink-glow text-white transition group-hover:scale-105">
              <Sparkles className="w-5 h-5 animate-pulse-slow" />
            </div>
            <div>
              <h1 className="font-extrabold text-lg text-slate-800 tracking-tight leading-none flex items-center gap-2">
                <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-sky-600 bg-clip-text text-transparent">
                  Noura
                </span>
                <span className="text-[10px] font-bold text-pink-600 bg-pink-100/80 px-2.5 py-0.5 rounded-full border border-pink-200 shadow-xs">
                  Companion
                </span>
              </h1>
              <p className="text-[11px] text-pink-500/80 font-semibold pt-0.5">Understand your body</p>
            </div>
          </motion.div>

          <div className="flex items-center gap-2 sm:gap-3">
            <motion.button 
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab('cycle')}
              className="hidden sm:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-50 via-rose-50 to-sky-50 hover:from-pink-100 hover:to-sky-100 text-pink-700 rounded-full text-xs font-extrabold border border-pink-200/80 transition shadow-xs"
            >
              <span className="text-pink-600">Cycle Day {cycleDay}</span>
              <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
              <span className="text-sky-600 font-semibold">Period in ~{periodExpectedDays}d</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenMorningCheckIn}
              className="px-3.5 py-2 bg-gradient-to-r from-pink-100 to-rose-100 hover:from-pink-200 hover:to-rose-200 text-pink-700 rounded-2xl text-xs font-extrabold border border-pink-200 flex items-center gap-1.5 transition shadow-xs"
            >
              <Sun className="w-4 h-4 text-pink-500" />
              <span className="hidden sm:inline">Morning</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05, y: -1 }}
              whileTap={{ scale: 0.95 }}
              onClick={onOpenNightCheckIn}
              className="px-3.5 py-2 bg-gradient-to-r from-sky-100 to-blue-100 hover:from-sky-200 hover:to-blue-200 text-sky-700 rounded-2xl text-xs font-extrabold border border-sky-200 flex items-center gap-1.5 transition shadow-xs"
            >
              <Moon className="w-4 h-4 text-sky-500" />
              <span className="hidden sm:inline">Night</span>
            </motion.button>
          </div>
        </div>
      </header>

      <aside className="hidden md:flex flex-col fixed left-0 top-[61px] bottom-0 w-64 bg-white/90 backdrop-blur-md border-r border-slate-100 p-4 z-20 overflow-y-auto select-none">
        <div className="space-y-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">Main Companion</p>
            <nav className="space-y-1">
              {mainNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-50 to-sky-50 text-pink-600 border border-pink-200/60 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-pink-500' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActivePill"
                        className="absolute right-2 w-1.5 h-4 bg-pink-400 rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>

          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 px-3 mb-2">Personal Tools</p>
            <nav className="space-y-1">
              {secondaryNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <motion.button
                    key={item.id}
                    whileHover={{ x: 3 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-bold text-sm transition-all duration-200 relative ${
                      isActive
                        ? 'bg-gradient-to-r from-pink-50 to-sky-50 text-pink-600 border border-pink-200/60 shadow-xs'
                        : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-pink-500' : 'text-slate-400'}`} />
                    <span>{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId="sidebarActivePill"
                        className="absolute right-2 w-1.5 h-4 bg-pink-400 rounded-full"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </nav>
          </div>
        </div>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="bg-gradient-to-br from-pink-50/80 to-sky-50/80 rounded-2xl p-3 border border-pink-100/60 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-extrabold text-xs text-pink-600 border border-pink-200 shadow-xs">
                {userName.charAt(0)}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-800 truncate">{userName}</p>
                <p className="text-[10px] text-slate-500 truncate">Cycle Day {cycleDay}</p>
              </div>
            </div>
            <motion.button 
              whileHover={{ scale: 1.1, rotate: -10 }}
              whileTap={{ scale: 0.9 }}
              onClick={onLogOut}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg transition"
              title="Switch / Log Out"
            >
              <LogOut className="w-3.5 h-3.5" />
            </motion.button>
          </div>
        </div>
      </aside>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-pink-100/70 px-2 py-2 shadow-lg">
        <div className="flex items-center justify-around">
          {mainNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <motion.button
                key={item.id}
                whileTap={{ scale: 0.9 }}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all relative ${
                  isActive
                    ? 'text-pink-600 font-extrabold bg-pink-50 scale-105'
                    : 'text-slate-500 font-medium hover:text-slate-800'
                }`}
              >
                <Icon className="w-5 h-5 mb-0.5" />
                <span className="text-[10px] tracking-tight">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="mobileNavActivePill"
                    className="absolute -top-1 w-6 h-1 bg-pink-500 rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </motion.button>
            );
          })}
        </div>
      </nav>
    </>
  );
};
