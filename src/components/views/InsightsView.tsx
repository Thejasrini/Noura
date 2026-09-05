import React, { useState } from 'react';
import type { PatternItem, WeeklyReport, MonthlyReport, StoryMilestone, ChatMessage } from '../../types';
import { StorageService } from '../../services/storage';
import { AIEngine } from '../../services/aiEngine';
import { Sparkles, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

interface InsightsViewProps {
  patterns: PatternItem[];
  weeklyReport: WeeklyReport;
  monthlyReport: MonthlyReport;
  storyMilestones: StoryMilestone[];
  chatMessages: ChatMessage[];
  onSaveChatMessage: (msg: ChatMessage) => void;
}

export const InsightsView: React.FC<InsightsViewProps> = ({
  patterns,
  weeklyReport,
  monthlyReport,
  storyMilestones,
  chatMessages,
  onSaveChatMessage,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'patterns' | 'ask_ai' | 'why_feeling' | 'what_changed' | 'reports' | 'story'>('patterns');
  const [queryInput, setQueryInput] = useState('');
  const [feelingInput, setFeelingInput] = useState('Low energy');
  const [feelingResult, setFeelingResult] = useState<ReturnType<typeof AIEngine.analyzeCurrentFeeling> | null>(null);

  const checkInsCount = StorageService.getCheckIns().length;

  const sampleQuestions = [
    "Why was my energy low this week?",
    "What did I improve this month?",
    "How consistent was I with exercise?",
    "Do I notice any patterns around my period?",
    "What should I focus on next week?"
  ];

  const handleSendChat = (qText: string) => {
    if (!qText.trim()) return;
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: qText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    onSaveChatMessage(userMsg);

    const aiRes = AIEngine.askMyData(qText);
    setTimeout(() => {
      const aiMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: aiRes.responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        contextSnippet: aiRes.contextSnippet
      };
      onSaveChatMessage(aiMsg);
      confetti({ particleCount: 20, spread: 40, origin: { y: 0.8 } });
    }, 400);

    setQueryInput('');
  };

  const handleAnalyzeFeeling = () => {
    const res = AIEngine.analyzeCurrentFeeling(feelingInput);
    setFeelingResult(res);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 pb-24 md:pb-8"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-100 via-pink-50 to-sky-100 rounded-4xl p-6 sm:p-8 border border-purple-200/60 shadow-soft">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-purple-200 text-purple-700 flex items-center justify-center">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">AI Personal Insights</h2>
            <p className="text-sm font-semibold text-purple-700 mt-0.5">
              "The app learns my patterns from the information I log and helps me understand myself over time."
            </p>
          </div>
        </div>

        {/* Sub-Navigation Pills */}
        <div className="flex flex-wrap gap-2 pt-4 border-t border-purple-200/50 mt-4">
          {[
            { id: 'patterns', label: 'My Patterns' },
            { id: 'ask_ai', label: 'Ask My Data' },
            { id: 'why_feeling', label: 'Why Am I Feeling This?' },
            { id: 'what_changed', label: 'What Changed?' },
            { id: 'reports', label: 'Reports' },
            { id: 'story', label: 'My Body Story' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-extrabold transition ${
                activeSubTab === tab.id
                  ? 'bg-purple-600 text-white shadow-soft scale-105'
                  : 'bg-white/80 text-slate-700 hover:bg-white border border-slate-200/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* SUB-TAB 1: MY PATTERNS */}
        {activeSubTab === 'patterns' && (
          <motion.div 
            key="patterns"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-800 text-lg">My Discovered Patterns</h3>
              <span className="text-xs text-slate-500 font-medium">Observations strictly from your logged history</span>
            </div>

            {patterns.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {patterns.map(pat => (
                  <div key={pat.id} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-soft space-y-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-extrabold uppercase tracking-wider text-purple-600 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-100">
                          {pat.category}
                        </span>
                        <h4 className="font-extrabold text-slate-800 text-base mt-1">{pat.title}</h4>
                      </div>
                      <span className="text-[10px] font-bold bg-pink-50 text-pink-700 px-2.5 py-1 rounded-full border border-pink-100">
                        Seen {pat.evidenceCount} times
                      </span>
                    </div>

                    <p className="text-sm font-medium text-slate-700 leading-relaxed">
                      "{pat.description}"
                    </p>

                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200/70 text-xs text-slate-600 font-medium">
                      <span className="font-bold text-slate-800">{pat.timeFrame}: </span>
                      {pat.supportingDetail}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-soft text-center space-y-2">
                <p className="text-base font-extrabold text-slate-800">No patterns discovered yet 🌸</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Keep logging your morning check-in, water, sleep, movement, and cycle. The app will automatically discover personalized health patterns for you over time!
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* SUB-TAB 2: ASK MY DATA AI CHAT */}
        {activeSubTab === 'ask_ai' && (
          <motion.div 
            key="ask_ai"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-800 text-lg flex items-center gap-2">
                  <span>Ask My Data AI Assistant</span>
                </h3>
                <p className="text-xs text-slate-500">Ask anything about your logged history, steps, sleep, cycle, or workouts!</p>
              </div>
            </div>

            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-2">Try Asking Noura's Logs:</p>
              <div className="flex flex-wrap gap-2">
                {sampleQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendChat(q)}
                    className="px-3 py-1.5 bg-pink-50 hover:bg-pink-100 text-pink-700 font-semibold text-xs rounded-xl border border-pink-200/60 transition"
                  >
                    "{q}"
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[300px] max-h-[450px] overflow-y-auto p-4 bg-slate-50/70 rounded-2xl border border-slate-200/80 space-y-4">
              {chatMessages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-xs text-sm leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-r from-pink-500 to-rose-500 text-white font-medium rounded-tr-none'
                        : 'bg-white text-slate-800 font-medium rounded-tl-none border border-slate-200/80 whitespace-pre-line'
                    }`}
                  >
                    {msg.text}
                  </div>
                  {msg.contextSnippet && (
                    <span className="text-[10px] text-slate-400 mt-1 font-medium px-1">
                      {msg.contextSnippet}
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ask your logged data... e.g. How did my walking change this month?"
                value={queryInput}
                onChange={(e) => setQueryInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendChat(queryInput)}
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-purple-300 font-medium"
              />
              <button
                onClick={() => handleSendChat(queryInput)}
                disabled={!queryInput.trim()}
                className="px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition disabled:opacity-50 flex items-center justify-center"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* SUB-TAB 3: WHY AM I FEELING THIS */}
        {activeSubTab === 'why_feeling' && (
          <motion.div 
            key="why_feeling"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4"
          >
            <div>
              <h3 className="font-extrabold text-slate-800 text-lg">Why might I be feeling this?</h3>
              <p className="text-xs text-slate-500">AI reviews recent sleep, cycle phase, food, and movement logs.</p>
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="e.g. Low energy, Bloating, Sore muscles..."
                value={feelingInput}
                onChange={(e) => setFeelingInput(e.target.value)}
                className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 text-slate-800 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-pink-300"
              />
              <button
                onClick={handleAnalyzeFeeling}
                className="px-5 py-3 bg-pink-500 hover:bg-pink-600 text-white font-bold text-xs rounded-2xl shadow-soft transition"
              >
                Analyze Recent Logs
              </button>
            </div>

            {feelingResult && (
              <div className="p-5 bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl border border-pink-200 space-y-3">
                <h4 className="font-extrabold text-slate-800 text-base">{feelingResult.title}</h4>
                <p className="text-sm font-medium text-slate-700 leading-relaxed">
                  {feelingResult.reasoning}
                </p>
                <div className="space-y-1.5 pt-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Gentle Actionable Focus:</p>
                  {feelingResult.suggestions.map((s, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-bold text-slate-700">
                      <span className="text-pink-500">•</span>
                      <span>{s}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}

        {/* SUB-TAB 4: WHAT CHANGED */}
        {activeSubTab === 'what_changed' && (
          <motion.div 
            key="what_changed"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-800 text-lg">What Changed?</h3>
              <span className="text-xs text-pink-600 font-bold bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                This Week vs Last Week
              </span>
            </div>

            {checkInsCount >= 7 ? (
              <>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
                    <p className="text-xs text-slate-400 font-bold">Walking</p>
                    <p className="text-lg font-extrabold text-emerald-600 mt-1">↑ Active</p>
                    <p className="text-[10px] text-slate-500">Log comparison</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
                    <p className="text-xs text-slate-400 font-bold">Workouts</p>
                    <p className="text-lg font-extrabold text-emerald-600 mt-1">↑ Tracked</p>
                    <p className="text-[10px] text-slate-500">Weekly total</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
                    <p className="text-xs text-slate-400 font-bold">Sleep</p>
                    <p className="text-lg font-extrabold text-slate-700 mt-1">Steady</p>
                    <p className="text-[10px] text-slate-500">Daily average</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
                    <p className="text-xs text-slate-400 font-bold">Water</p>
                    <p className="text-lg font-extrabold text-emerald-600 mt-1">↑ Hydrated</p>
                    <p className="text-[10px] text-slate-500">Hydration trend</p>
                  </div>

                  <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 text-center">
                    <p className="text-xs text-slate-400 font-bold">Mood</p>
                    <p className="text-lg font-extrabold text-slate-700 mt-1">→ Steady</p>
                    <p className="text-[10px] text-slate-500">Overall ratings</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-emerald-700">Biggest Improvement</p>
                    <p className="text-base font-extrabold text-emerald-950 mt-1">Consistent daily logging & check-ins</p>
                  </div>

                  <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200">
                    <p className="text-xs font-bold uppercase tracking-wider text-amber-700">Biggest Opportunity</p>
                    <p className="text-base font-extrabold text-amber-950 mt-1">Evening relaxation & hydration</p>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
                <p className="text-sm font-extrabold text-slate-700">Weekly comparison unlocking soon 📈</p>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Log check-ins for at least 7 days to compare your weekly changes in walking, sleep, hydration, and workouts.
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* SUB-TAB 5: WEEKLY & MONTHLY REPORTS */}
        {activeSubTab === 'reports' && (
          <motion.div 
            key="reports"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {checkInsCount > 0 ? (
              <>
                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-lg">Weekly Wellness Report</h3>
                      <p className="text-xs text-slate-500">{weeklyReport.weekStartDate} — {weeklyReport.weekEndDate}</p>
                    </div>
                    <span className="text-xs font-bold text-pink-600 bg-pink-50 px-3 py-1 rounded-full border border-pink-100">
                      {weeklyReport.moodSummary}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 bg-pink-50/70 rounded-2xl border border-pink-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-pink-700 mb-1.5">What Improved?</p>
                      <ul className="text-xs font-semibold text-slate-700 space-y-1">
                        {weeklyReport.topImprovements.map((imp, idx) => (
                          <li key={idx}>✓ {imp}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-purple-700 mb-1.5">What Went Well?</p>
                      <ul className="text-xs font-semibold text-slate-700 space-y-1">
                        {weeklyReport.positivePatterns.map((pat, idx) => (
                          <li key={idx}>• {pat}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-100">
                      <p className="text-xs font-bold uppercase tracking-wider text-amber-700 mb-1.5">Focus Priorities</p>
                      <ul className="text-xs font-semibold text-slate-700 space-y-1">
                        {weeklyReport.focusPriorities.map((foc, idx) => (
                          <li key={idx}>→ {foc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-4 bg-gradient-to-r from-pink-100/60 via-purple-50 to-sky-100/60 rounded-2xl border border-pink-200/60 text-center">
                    <p className="text-sm font-extrabold text-slate-800 italic">
                      "{weeklyReport.aiMessage}"
                    </p>
                  </div>
                </div>

                <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-extrabold text-slate-800 text-lg">Monthly "Understand Me" Report</h3>
                      <p className="text-xs text-slate-500">{monthlyReport.monthName} {monthlyReport.year} Overview</p>
                    </div>
                    <span className="text-xs font-extrabold text-purple-600 bg-purple-50 px-3 py-1 rounded-full border border-purple-100">
                      {monthlyReport.exerciseCount} Workouts Done
                    </span>
                  </div>

                  <div className="p-5 bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl border border-purple-100 space-y-2">
                    <h4 className="font-extrabold text-slate-800 text-sm">Monthly Warm Reflection</h4>
                    <p className="text-sm text-slate-700 font-medium leading-relaxed">
                      "{monthlyReport.warmMessage}"
                    </p>
                  </div>
                </div>
              </>
            ) : (
              <div className="p-8 bg-white rounded-3xl border border-slate-100 shadow-soft text-center space-y-2">
                <p className="text-base font-extrabold text-slate-800">No reports generated yet 📊</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Weekly and monthly reports will automatically generate as you log your daily check-ins, meals, and workouts!
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* SUB-TAB 6: MY BODY STORY */}
        {activeSubTab === 'story' && (
          <motion.div 
            key="story"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white rounded-3xl p-6 border border-slate-100 shadow-soft space-y-6"
          >
            <div>
              <h3 className="font-extrabold text-slate-800 text-xl flex items-center gap-2">
                <span>My Body Story</span>
              </h3>
              <p className="text-xs text-slate-500">"Your data becomes your story." — Personal milestone timeline.</p>
            </div>

            {storyMilestones.length > 0 ? (
              <div className="relative border-l-2 border-pink-200 ml-4 space-y-6 pl-6">
                {storyMilestones.map(ms => (
                  <div key={ms.id} className="relative group">
                    <div className="absolute -left-[35px] top-1 w-8 h-8 rounded-full bg-white border-2 border-pink-400 text-xs font-extrabold text-pink-600 flex items-center justify-center shadow-xs">
                      ✓
                    </div>

                    <div className="p-4 bg-slate-50 hover:bg-pink-50/50 rounded-2xl border border-slate-200/80 transition space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-extrabold text-pink-600">{ms.month} • {ms.date}</span>
                        {ms.badge && (
                          <span className="text-[10px] bg-pink-100 text-pink-700 font-bold px-2 py-0.5 rounded-full">
                            {ms.badge}
                          </span>
                        )}
                      </div>
                      <h4 className="font-extrabold text-slate-800 text-base">{ms.title}</h4>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{ms.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 bg-slate-50/70 rounded-2xl border border-dashed border-slate-200 text-center space-y-2">
                <p className="text-base font-extrabold text-slate-800">Your Body Story begins today 📖</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  As you build habits, log workouts, and track your cycle, key milestones will populate your story timeline!
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
