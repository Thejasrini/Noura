import { useState, useEffect } from 'react';
import { StorageService } from './services/storage';
import { CycleEngine } from './services/cycleEngine';
import type { 
  UserProfile, DailyCheckIn, CycleLog, MealItem, WorkoutLog, 
  BodyMeasurement, Habit, TaskItem, FuturePlan, GoalItem, 
  JournalEntry, PatternItem, WeeklyReport, MonthlyReport, StoryMilestone, ChatMessage, MealType 
} from './types';

import { Navbar } from './components/layout/Navbar';
import { TodayView } from './components/views/TodayView';
import { CycleView } from './components/views/CycleView';
import { FoodView } from './components/views/FoodView';
import { MoveView } from './components/views/MoveView';
import { InsightsView } from './components/views/InsightsView';
import { HabitsView } from './components/views/HabitsView';
import { GoalsView } from './components/views/GoalsView';
import { BodyView } from './components/views/BodyView';
import { JournalView } from './components/views/JournalView';
import { CalendarView } from './components/views/CalendarView';

// Auth Components
import { WelcomeScreen } from './components/auth/WelcomeScreen';
import { LoginModal } from './components/auth/LoginModal';
import { SignUpModal } from './components/auth/SignUpModal';
import { OnboardingModal } from './components/auth/OnboardingModal';

// Modals
import { MorningCheckInModal } from './components/modals/MorningCheckInModal';
import { NightCheckInModal } from './components/modals/NightCheckInModal';
import { LogMealModal } from './components/modals/LogMealModal';
import { LogWorkoutModal } from './components/modals/LogWorkoutModal';
import { LogPeriodModal } from './components/modals/LogPeriodModal';
import { LogJournalModal } from './components/modals/LogJournalModal';
import { TomorrowPreviewModal } from './components/modals/TomorrowPreviewModal';
import { PrivacyCenterModal } from './components/modals/PrivacyCenterModal';

export function App() {
  const [authStatus, setAuthStatus] = useState<'welcome' | 'authenticated'>('authenticated');
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  const [activeTab, setActiveTab] = useState<string>('today');

  const [profile, setProfile] = useState<UserProfile>(StorageService.getProfile());
  const [, setCheckIns] = useState<DailyCheckIn[]>([]);
  const [cycleLogs, setCycleLogs] = useState<CycleLog[]>([]);
  const [meals, setMeals] = useState<MealItem[]>([]);
  const [workouts, setWorkouts] = useState<WorkoutLog[]>([]);
  const [bodyMeasurements, setBodyMeasurements] = useState<BodyMeasurement[]>([]);
  const [habits, setHabits] = useState<Habit[]>([]);
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [plans] = useState<FuturePlan[]>([]);
  const [goals] = useState<GoalItem[]>([]);
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [patterns] = useState<PatternItem[]>([]);
  const [weeklyReports] = useState<WeeklyReport[]>([]);
  const [monthlyReports] = useState<MonthlyReport[]>([]);
  const [storyMilestones] = useState<StoryMilestone[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  const [isMorningOpen, setIsMorningOpen] = useState(false);
  const [isNightOpen, setIsNightOpen] = useState(false);
  const [isLogMealOpen, setIsLogMealOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<MealType>('lunch');
  const [isLogWorkoutOpen, setIsLogWorkoutOpen] = useState(false);
  const [isLogPeriodOpen, setIsLogPeriodOpen] = useState(false);
  const [isLogJournalOpen, setIsLogJournalOpen] = useState(false);
  const [isTomorrowOpen, setIsTomorrowOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);

  useEffect(() => {
    StorageService.initStorage();
    loadAllData();
  }, []);

  const loadAllData = () => {
    setProfile(StorageService.getProfile());
    setCheckIns(StorageService.getCheckIns());
    setCycleLogs(StorageService.getCycleLogs());
    setMeals(StorageService.getMeals());
    setWorkouts(StorageService.getWorkouts());
    setBodyMeasurements(StorageService.getBodyMeasurements());
    setHabits(StorageService.getHabits());
    setTasks(StorageService.getTasks());
    setJournalEntries(StorageService.getJournalEntries());
    setChatMessages(StorageService.getChatMessages());
  };

  const todayDateStr = "2026-09-05";
  const todayCheckIn = StorageService.getCheckInByDate(todayDateStr);
  const cycleEst = CycleEngine.calculate(cycleLogs, profile, todayDateStr);
  const cycleDay = cycleEst.currentCycleDay;
  const periodExpectedDays = cycleEst.daysUntilNextPeriod || 0;

  const handleUpdateCheckIn = (updated: DailyCheckIn) => {
    StorageService.saveCheckIn(updated);
    setCheckIns(StorageService.getCheckIns());
  };

  const handleSaveMeal = (meal: MealItem) => {
    StorageService.saveMeal(meal);
    setMeals(StorageService.getMeals());
  };

  const handleSaveWorkout = (workout: WorkoutLog) => {
    StorageService.saveWorkout(workout);
    setWorkouts(StorageService.getWorkouts());
  };

  const handleSaveCycleLog = (log: CycleLog) => {
    StorageService.saveCycleLog(log);
    setCycleLogs(StorageService.getCycleLogs());
  };

  const handleSaveJournalEntry = (entry: JournalEntry) => {
    StorageService.saveJournalEntry(entry);
    setJournalEntries(StorageService.getJournalEntries());
  };

  const handleToggleTask = (taskId: string) => {
    const list = [...tasks];
    const item = list.find(t => t.id === taskId);
    if (item) {
      item.completed = !item.completed;
      StorageService.saveTask(item);
      setTasks([...list]);
    }
  };

  const handleToggleHabit = (habitId: string) => {
    StorageService.toggleHabitLog(habitId, todayDateStr);
    const updatedHabits = habits.map(h => {
      if (h.id === habitId) {
        return { ...h, currentStreak: h.currentStreak + 1 };
      }
      return h;
    });
    setHabits(updatedHabits);
  };

  const handleSaveChatMessage = (msg: ChatMessage) => {
    StorageService.saveChatMessage(msg);
    setChatMessages(StorageService.getChatMessages());
  };

  const openMealModal = (type?: MealType) => {
    if (type) setSelectedMealType(type);
    setIsLogMealOpen(true);
  };

  const handleLoginSuccess = (name: string) => {
    const updatedProf = { ...profile, name };
    StorageService.saveProfile(updatedProf);
    setProfile(updatedProf);
    setAuthStatus('authenticated');
    setIsLoginModalOpen(false);
    loadAllData();
  };

  const handleSignUpSuccess = (name: string) => {
    StorageService.initFreshUser(name);
    loadAllData();
    setIsSignUpModalOpen(false);
    setIsOnboardingModalOpen(true);
  };

  const handleContinueDemo = () => {
    StorageService.loadSampleDemoData();
    loadAllData();
    setAuthStatus('authenticated');
  };

  const handleOnboardingComplete = () => {
    setAuthStatus('authenticated');
    setIsOnboardingModalOpen(false);
    loadAllData();
  };

  if (authStatus === 'welcome') {
    return (
      <>
        <WelcomeScreen
          onOpenLogin={() => setIsLoginModalOpen(true)}
          onOpenSignUp={() => setIsSignUpModalOpen(true)}
          onContinueFresh={() => {
            StorageService.initFreshUser("Noura");
            loadAllData();
            setAuthStatus('authenticated');
          }}
          onContinueDemo={handleContinueDemo}
        />

        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onSwitchToSignUp={() => {
            setIsLoginModalOpen(false);
            setIsSignUpModalOpen(true);
          }}
        />

        <SignUpModal
          isOpen={isSignUpModalOpen}
          onClose={() => setIsSignUpModalOpen(false)}
          onSignUpSuccess={handleSignUpSuccess}
          onSwitchToLogin={() => {
            setIsSignUpModalOpen(false);
            setIsLoginModalOpen(true);
          }}
        />

        <OnboardingModal
          isOpen={isOnboardingModalOpen}
          onClose={() => setIsOnboardingModalOpen(false)}
          onComplete={handleOnboardingComplete}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-pink-100">
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenMorningCheckIn={() => setIsMorningOpen(true)}
        onOpenNightCheckIn={() => setIsNightOpen(true)}
        cycleDay={cycleDay}
        periodExpectedDays={periodExpectedDays}
        userName={profile.name}
        onLogOut={() => setAuthStatus('welcome')}
      />

      <main className="max-w-6xl mx-auto px-4 py-6 sm:px-6 md:pl-72">
        {activeTab === 'today' && (
          <TodayView
            profile={profile}
            checkIn={todayCheckIn}
            onUpdateCheckIn={handleUpdateCheckIn}
            meals={meals}
            onOpenLogMeal={openMealModal}
            workouts={workouts}
            onOpenLogWorkout={() => setIsLogWorkoutOpen(true)}
            tasks={tasks}
            onToggleTask={handleToggleTask}
            plans={plans}
            onOpenMorningCheckIn={() => setIsMorningOpen(true)}
            onOpenNightCheckIn={() => setIsNightOpen(true)}
            onOpenTomorrowPreview={() => setIsTomorrowOpen(true)}
            onNavigateTab={setActiveTab}
          />
        )}

        {activeTab === 'cycle' && (
          <CycleView
            cycleLogs={cycleLogs}
            onOpenLogPeriod={() => setIsLogPeriodOpen(true)}
            cycleDay={cycleDay}
          />
        )}

        {activeTab === 'food' && (
          <FoodView
            meals={meals}
            onOpenLogMeal={openMealModal}
          />
        )}

        {activeTab === 'move' && (
          <MoveView
            workouts={workouts}
            onOpenLogWorkout={() => setIsLogWorkoutOpen(true)}
          />
        )}

        {activeTab === 'insights' && (
          <InsightsView
            patterns={patterns}
            weeklyReport={weeklyReports[0]}
            monthlyReport={monthlyReports[0]}
            storyMilestones={storyMilestones}
            chatMessages={chatMessages}
            onSaveChatMessage={handleSaveChatMessage}
          />
        )}

        {activeTab === 'habits' && (
          <HabitsView
            habits={habits}
            onToggleHabit={handleToggleHabit}
          />
        )}

        {activeTab === 'goals' && (
          <GoalsView
            goals={goals}
          />
        )}

        {activeTab === 'body' && (
          <BodyView
            measurements={bodyMeasurements}
          />
        )}

        {activeTab === 'journal' && (
          <JournalView
            entries={journalEntries}
            onOpenLogJournal={() => setIsLogJournalOpen(true)}
          />
        )}

        {activeTab === 'calendar' && (
          <CalendarView
            checkIns={StorageService.getCheckIns()}
            workouts={workouts}
            meals={meals}
            journals={journalEntries}
          />
        )}
      </main>

      <MorningCheckInModal
        isOpen={isMorningOpen}
        onClose={() => setIsMorningOpen(false)}
        checkIn={todayCheckIn}
        onSave={handleUpdateCheckIn}
      />

      <NightCheckInModal
        isOpen={isNightOpen}
        onClose={() => setIsNightOpen(false)}
        checkIn={todayCheckIn}
        onSave={handleUpdateCheckIn}
      />

      <LogMealModal
        isOpen={isLogMealOpen}
        onClose={() => setIsLogMealOpen(false)}
        onSave={handleSaveMeal}
        defaultMealType={selectedMealType}
      />

      <LogWorkoutModal
        isOpen={isLogWorkoutOpen}
        onClose={() => setIsLogWorkoutOpen(false)}
        onSave={handleSaveWorkout}
      />

      <LogPeriodModal
        isOpen={isLogPeriodOpen}
        onClose={() => setIsLogPeriodOpen(false)}
        onSave={handleSaveCycleLog}
        currentCycleDay={cycleDay}
      />

      <LogJournalModal
        isOpen={isLogJournalOpen}
        onClose={() => setIsLogJournalOpen(false)}
        onSave={handleSaveJournalEntry}
      />

      <TomorrowPreviewModal
        isOpen={isTomorrowOpen}
        onClose={() => setIsTomorrowOpen(false)}
        cycleDay={cycleDay}
      />

      <PrivacyCenterModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSwitchToSignUp={() => {
          setIsLoginModalOpen(false);
          setIsSignUpModalOpen(true);
        }}
      />

      <SignUpModal
        isOpen={isSignUpModalOpen}
        onClose={() => setIsSignUpModalOpen(false)}
        onSignUpSuccess={handleSignUpSuccess}
        onSwitchToLogin={() => {
          setIsSignUpModalOpen(false);
          setIsLoginModalOpen(true);
        }}
      />

      <OnboardingModal
        isOpen={isOnboardingModalOpen}
        onClose={() => setIsOnboardingModalOpen(false)}
        onComplete={handleOnboardingComplete}
      />
    </div>
  );
}

export default App;
