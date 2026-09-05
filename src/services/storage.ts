import type { 
  UserProfile, DailyCheckIn, CycleLog, MealItem, WorkoutLog, 
  BodyMeasurement, Habit, HabitLog, TaskItem, FuturePlan, GoalItem, 
  JournalEntry, PatternItem, WeeklyReport, MonthlyReport, StoryMilestone, ChatMessage 
} from '../types';

import { 
  initialProfile, initialDailyCheckIns, initialCycleLogs, initialMeals, 
  initialWorkouts, initialBodyMeasurements, initialHabits, initialTasks, 
  initialFuturePlans, initialGoals, initialJournalEntries, initialPatterns, 
  initialWeeklyReports, initialMonthlyReport, initialStoryMilestones 
} from '../data/seedData';

const KEYS = {
  PROFILE: 'mybody_profile_v1',
  CHECKINS: 'mybody_checkins_v1',
  CYCLES: 'mybody_cycles_v1',
  MEALS: 'mybody_meals_v1',
  WORKOUTS: 'mybody_workouts_v1',
  BODY: 'mybody_body_v1',
  HABITS: 'mybody_habits_v1',
  HABIT_LOGS: 'mybody_habit_logs_v1',
  TASKS: 'mybody_tasks_v1',
  PLANS: 'mybody_plans_v1',
  GOALS: 'mybody_goals_v1',
  JOURNAL: 'mybody_journal_v1',
  PATTERNS: 'mybody_patterns_v1',
  WEEKLY_REPORTS: 'mybody_weekly_reports_v1',
  MONTHLY_REPORTS: 'mybody_monthly_reports_v1',
  STORY: 'mybody_story_v1',
  CHAT: 'mybody_chat_v1',
  IS_DEMO: 'mybody_is_demo_v1'
};

function getItem<T>(key: string, defaultValue: T): T {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (e) {
    console.error(`Error reading ${key} from storage:`, e);
    return defaultValue;
  }
}

function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(`Error writing ${key} to storage:`, e);
  }
}

export const StorageService = {
  // Initialize storage with fresh empty state for new user
  initStorage() {
    if (!localStorage.getItem(KEYS.PROFILE)) {
      this.initFreshUser("Noura");
    }
  },

  initFreshUser(userName: string = "Noura") {
    const freshProfile: UserProfile = {
      name: userName,
      avatarEmoji: "🌸",
      mainGoal: "Understand my body patterns and build sustainable habits",
      fitnessLevel: "intermediate",
      dailyWaterGoalMl: 2000,
      dailyStepGoal: 7000,
      typicalCycleLengthDays: 28,
      typicalPeriodDays: 5,
      remindersEnabled: {
        morningCheckIn: true,
        meals: true,
        water: true,
        walking: true,
        workout: true,
        nightCheckIn: true
      }
    };

    const freshHabits: Habit[] = [
      { id: "h-1", title: "Walk every day", category: "Movement", targetDaysPerWeek: 7, currentStreak: 0, bestStreak: 0, icon: "🚶", color: "bg-sky-100 text-sky-700" },
      { id: "h-2", title: "Drink 2L Water", category: "Hydration", targetDaysPerWeek: 7, currentStreak: 0, bestStreak: 0, icon: "💧", color: "bg-blue-100 text-blue-700" },
      { id: "h-3", title: "Exercise 3-4x / week", category: "Fitness", targetDaysPerWeek: 4, currentStreak: 0, bestStreak: 0, icon: "💪", color: "bg-pink-100 text-pink-700" },
      { id: "h-4", title: "Evening Stretch & Unwind", category: "Recovery", targetDaysPerWeek: 5, currentStreak: 0, bestStreak: 0, icon: "🧘", color: "bg-purple-100 text-purple-700" }
    ];

    const freshGoals: GoalItem[] = [
      { id: "g-1", title: "Reach 7,000 steps daily average", category: "Walking", targetValue: 7000, currentValue: 0, unit: "steps/day", startDate: "2026-09-01", endDate: "2026-09-30", status: "in_progress" },
      { id: "g-2", title: "Drink 2.0L water consistently", category: "Nutrition", targetValue: 2.0, currentValue: 0, unit: "L/day", startDate: "2026-09-01", endDate: "2026-09-30", status: "in_progress" }
    ];

    setItem(KEYS.PROFILE, freshProfile);
    setItem(KEYS.CHECKINS, []);
    setItem(KEYS.CYCLES, []);
    setItem(KEYS.MEALS, []);
    setItem(KEYS.WORKOUTS, []);
    setItem(KEYS.BODY, []);
    setItem(KEYS.HABITS, freshHabits);
    setItem(KEYS.HABIT_LOGS, []);
    setItem(KEYS.TASKS, []);
    setItem(KEYS.PLANS, []);
    setItem(KEYS.GOALS, freshGoals);
    setItem(KEYS.JOURNAL, []);
    setItem(KEYS.PATTERNS, []);
    setItem(KEYS.WEEKLY_REPORTS, []);
    setItem(KEYS.MONTHLY_REPORTS, []);
    setItem(KEYS.STORY, []);
    setItem(KEYS.CHAT, [
      {
        id: "msg-welcome-fresh",
        sender: "ai",
        text: `Welcome ${userName}! 🌸 I am your personal wellness AI assistant. As you log your morning check-ins, meals, movement, and cycle, I will begin learning your unique patterns!`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setItem(KEYS.IS_DEMO, false);
  },

  loadSampleDemoData() {
    setItem(KEYS.PROFILE, initialProfile);
    setItem(KEYS.CHECKINS, initialDailyCheckIns);
    setItem(KEYS.CYCLES, initialCycleLogs);
    setItem(KEYS.MEALS, initialMeals);
    setItem(KEYS.WORKOUTS, initialWorkouts);
    setItem(KEYS.BODY, initialBodyMeasurements);
    setItem(KEYS.HABITS, initialHabits);
    setItem(KEYS.HABIT_LOGS, []);
    setItem(KEYS.TASKS, initialTasks);
    setItem(KEYS.PLANS, initialFuturePlans);
    setItem(KEYS.GOALS, initialGoals);
    setItem(KEYS.JOURNAL, initialJournalEntries);
    setItem(KEYS.PATTERNS, initialPatterns);
    setItem(KEYS.WEEKLY_REPORTS, initialWeeklyReports);
    setItem(KEYS.MONTHLY_REPORTS, [initialMonthlyReport]);
    setItem(KEYS.STORY, initialStoryMilestones);
    setItem(KEYS.CHAT, [
      {
        id: "msg-welcome-demo",
        sender: "ai",
        text: "Hello Noura! 🌸 I am your personal wellness AI assistant. Sample demo data has been loaded. Ask me anything about your steps, sleep, cycle patterns, food history, or workouts!",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
    setItem(KEYS.IS_DEMO, true);
  },

  isDemoMode(): boolean {
    return getItem(KEYS.IS_DEMO, false);
  },

  getProfile(): UserProfile {
    return getItem(KEYS.PROFILE, initialProfile);
  },
  saveProfile(profile: UserProfile): void {
    setItem(KEYS.PROFILE, profile);
  },

  getCheckIns(): DailyCheckIn[] {
    return getItem(KEYS.CHECKINS, []);
  },
  getCheckInByDate(dateStr: string): DailyCheckIn {
    const list = this.getCheckIns();
    const found = list.find(c => c.date === dateStr);
    if (found) return found;
    return {
      date: dateStr,
      morningCompleted: false,
      nightCompleted: false,
      symptoms: [],
      waterMl: 0,
      steps: 0,
      exerciseDone: false,
      breakfastLogged: false,
      lunchLogged: false,
      snackLogged: false,
      dinnerLogged: false
    };
  },
  saveCheckIn(checkIn: DailyCheckIn): void {
    const list = this.getCheckIns();
    const index = list.findIndex(c => c.date === checkIn.date);
    if (index >= 0) {
      list[index] = checkIn;
    } else {
      list.unshift(checkIn);
    }
    setItem(KEYS.CHECKINS, list);
  },

  getCycleLogs(): CycleLog[] {
    return getItem(KEYS.CYCLES, []);
  },
  saveCycleLog(log: CycleLog): void {
    const list = this.getCycleLogs();
    const index = list.findIndex(c => c.id === log.id || c.date === log.date);
    if (index >= 0) {
      list[index] = log;
    } else {
      list.unshift(log);
    }
    setItem(KEYS.CYCLES, list);
  },

  getMeals(): MealItem[] {
    return getItem(KEYS.MEALS, []);
  },
  saveMeal(meal: MealItem): void {
    const list = this.getMeals();
    const index = list.findIndex(m => m.id === meal.id);
    if (index >= 0) {
      list[index] = meal;
    } else {
      list.unshift(meal);
    }
    setItem(KEYS.MEALS, list);
  },
  deleteMeal(id: string): void {
    const list = this.getMeals().filter(m => m.id !== id);
    setItem(KEYS.MEALS, list);
  },

  getWorkouts(): WorkoutLog[] {
    return getItem(KEYS.WORKOUTS, []);
  },
  saveWorkout(workout: WorkoutLog): void {
    const list = this.getWorkouts();
    const index = list.findIndex(w => w.id === workout.id);
    if (index >= 0) {
      list[index] = workout;
    } else {
      list.unshift(workout);
    }
    setItem(KEYS.WORKOUTS, list);
  },

  getBodyMeasurements(): BodyMeasurement[] {
    return getItem(KEYS.BODY, []);
  },
  saveBodyMeasurement(meas: BodyMeasurement): void {
    const list = this.getBodyMeasurements();
    const index = list.findIndex(b => b.id === meas.id || b.date === meas.date);
    if (index >= 0) {
      list[index] = meas;
    } else {
      list.unshift(meas);
    }
    setItem(KEYS.BODY, list);
  },

  getHabits(): Habit[] {
    return getItem(KEYS.HABITS, []);
  },
  saveHabit(habit: Habit): void {
    const list = this.getHabits();
    const index = list.findIndex(h => h.id === habit.id);
    if (index >= 0) {
      list[index] = habit;
    } else {
      list.push(habit);
    }
    setItem(KEYS.HABITS, list);
  },

  getHabitLogs(): HabitLog[] {
    return getItem(KEYS.HABIT_LOGS, []);
  },
  toggleHabitLog(habitId: string, dateStr: string): boolean {
    const logs = this.getHabitLogs();
    const index = logs.findIndex(l => l.habitId === habitId && l.date === dateStr);
    let isCompleted = false;
    if (index >= 0) {
      logs[index].completed = !logs[index].completed;
      isCompleted = logs[index].completed;
    } else {
      logs.push({
        id: `hl-${Date.now()}`,
        habitId,
        date: dateStr,
        completed: true
      });
      isCompleted = true;
    }
    setItem(KEYS.HABIT_LOGS, logs);
    return isCompleted;
  },

  getTasks(): TaskItem[] {
    return getItem(KEYS.TASKS, []);
  },
  saveTask(task: TaskItem): void {
    const list = this.getTasks();
    const index = list.findIndex(t => t.id === task.id);
    if (index >= 0) {
      list[index] = task;
    } else {
      list.push(task);
    }
    setItem(KEYS.TASKS, list);
  },
  deleteTask(id: string): void {
    const list = this.getTasks().filter(t => t.id !== id);
    setItem(KEYS.TASKS, list);
  },

  getPlans(): FuturePlan[] {
    return getItem(KEYS.PLANS, []);
  },
  savePlan(plan: FuturePlan): void {
    const list = this.getPlans();
    const index = list.findIndex(p => p.id === plan.id);
    if (index >= 0) {
      list[index] = plan;
    } else {
      list.push(plan);
    }
    setItem(KEYS.PLANS, list);
  },
  deletePlan(id: string): void {
    const list = this.getPlans().filter(p => p.id !== id);
    setItem(KEYS.PLANS, list);
  },

  getGoals(): GoalItem[] {
    return getItem(KEYS.GOALS, []);
  },
  saveGoal(goal: GoalItem): void {
    const list = this.getGoals();
    const index = list.findIndex(g => g.id === goal.id);
    if (index >= 0) {
      list[index] = goal;
    } else {
      list.push(goal);
    }
    setItem(KEYS.GOALS, list);
  },

  getJournalEntries(): JournalEntry[] {
    return getItem(KEYS.JOURNAL, []);
  },
  saveJournalEntry(entry: JournalEntry): void {
    const list = this.getJournalEntries();
    const index = list.findIndex(j => j.id === entry.id);
    if (index >= 0) {
      list[index] = entry;
    } else {
      list.unshift(entry);
    }
    setItem(KEYS.JOURNAL, list);
  },
  deleteJournalEntry(id: string): void {
    const list = this.getJournalEntries().filter(j => j.id !== id);
    setItem(KEYS.JOURNAL, list);
  },

  getPatterns(): PatternItem[] {
    return getItem(KEYS.PATTERNS, []);
  },

  getWeeklyReports(): WeeklyReport[] {
    return getItem(KEYS.WEEKLY_REPORTS, []);
  },
  getMonthlyReports(): MonthlyReport[] {
    return getItem(KEYS.MONTHLY_REPORTS, []);
  },

  getStoryMilestones(): StoryMilestone[] {
    return getItem(KEYS.STORY, []);
  },
  saveStoryMilestone(ms: StoryMilestone): void {
    const list = this.getStoryMilestones();
    list.unshift(ms);
    setItem(KEYS.STORY, list);
  },

  getChatMessages(): ChatMessage[] {
    return getItem(KEYS.CHAT, []);
  },
  saveChatMessage(msg: ChatMessage): void {
    const list = this.getChatMessages();
    list.push(msg);
    setItem(KEYS.CHAT, list);
  },

  exportAllData(): string {
    const exportData = {
      profile: this.getProfile(),
      checkIns: this.getCheckIns(),
      cycleLogs: this.getCycleLogs(),
      meals: this.getMeals(),
      workouts: this.getWorkouts(),
      bodyMeasurements: this.getBodyMeasurements(),
      habits: this.getHabits(),
      habitLogs: this.getHabitLogs(),
      tasks: this.getTasks(),
      plans: this.getPlans(),
      goals: this.getGoals(),
      journal: this.getJournalEntries(),
      story: this.getStoryMilestones(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(exportData, null, 2);
  },

  clearAllData(): void {
    localStorage.clear();
    this.initFreshUser("Noura");
  }
};
