export type MoodType = 'great' | 'good' | 'okay' | 'low' | 'not_good';

export interface UserProfile {
  name: string;
  avatarEmoji: string;
  mainGoal: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  dailyWaterGoalMl: number;
  dailyStepGoal: number;
  typicalCycleLengthDays: number;
  typicalPeriodDays: number;
  remindersEnabled: {
    morningCheckIn: boolean;
    meals: boolean;
    water: boolean;
    walking: boolean;
    workout: boolean;
    nightCheckIn: boolean;
  };
}

export type SymptomType = 
  | 'bloating' 
  | 'cramps' 
  | 'headache' 
  | 'pain' 
  | 'digestion' 
  | 'skin' 
  | 'acne' 
  | 'fatigue' 
  | 'backache' 
  | 'mood_swings';

export interface DailyCheckIn {
  date: string; // YYYY-MM-DD
  morningCompleted: boolean;
  nightCompleted: boolean;
  mood?: MoodType; // 'great' | 'good' | 'okay' | 'low' | 'not_good'
  energy?: number; // 1-5
  sleepHours?: number;
  symptoms: SymptomType[];
  morningNote?: string;
  
  // Night check-in items
  eveningMood?: MoodType;
  eveningEnergy?: number;
  waterMl: number;
  steps: number;
  exerciseDone: boolean;
  breakfastLogged: boolean;
  lunchLogged: boolean;
  snackLogged: boolean;
  dinnerLogged: boolean;
  eveningReflection?: string;
}

export interface CycleLog {
  id: string;
  date: string; // YYYY-MM-DD
  cycleDay: number;
  isPeriodStart?: boolean;
  isPeriodEnd?: boolean;
  flowLevel?: 'light' | 'medium' | 'heavy' | 'spotting';
  symptoms: SymptomType[];
  notes?: string;
}

export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface MealItem {
  id: string;
  date: string;
  mealType: MealType;
  name: string;
  portion?: string;
  photoUrl?: string;
  notes?: string;
  tags: {
    protein: boolean;
    fiber: boolean;
    vegetables: boolean;
    fruit: boolean;
    water: boolean;
    caffeine: boolean;
    processedSugary: boolean;
  };
}

export type ExerciseCategory = 
  | 'Legs' 
  | 'Glutes' 
  | 'Arms' 
  | 'Wrist / Forearms' 
  | 'Upper body' 
  | 'Core' 
  | 'Cardio' 
  | 'Mobility' 
  | 'Stretching' 
  | 'Full body';

export interface ExerciseDetail {
  name: string;
  category: ExerciseCategory;
  sets?: number;
  reps?: number;
  weightKg?: number;
  durationMin?: number;
  notes?: string;
}

export interface WorkoutLog {
  id: string;
  date: string;
  title: string;
  category: ExerciseCategory;
  durationMin: number;
  difficultyRating: number; // 1-5
  sorenessRating: number; // 1-5
  recoveryScore: number; // 1-5
  notes?: string;
  exercises: ExerciseDetail[];
}

export interface BodyMeasurement {
  id: string;
  date: string;
  weightKg: number;
  waistCm?: number;
  hipsCm?: number;
  strengthScore?: number;
  photoUrl?: string;
  notes?: string;
}

export interface Habit {
  id: string;
  title: string;
  category: string;
  targetDaysPerWeek: number;
  currentStreak: number;
  bestStreak: number;
  icon: string;
  color: string;
}

export interface HabitLog {
  id: string;
  habitId: string;
  date: string;
  completed: boolean;
}

export interface TaskItem {
  id: string;
  title: string;
  date: string;
  time?: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
  rescheduledDate?: string;
}

export interface FuturePlan {
  id: string;
  title: string;
  date: string;
  description?: string;
  category?: string;
  completed: boolean;
  repeat?: 'none' | 'daily' | 'weekly' | 'monthly';
}

export interface GoalItem {
  id: string;
  title: string;
  category: 'Fitness' | 'Nutrition' | 'Walking' | 'Sleep' | 'Wellness' | 'Personal';
  targetValue: number;
  currentValue: number;
  unit: string;
  startDate: string;
  endDate: string;
  status: 'in_progress' | 'completed' | 'paused';
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  mood: MoodType;
  text: string;
  tags: string[];
}

export interface PatternItem {
  id: string;
  title: string;
  category: 'sleep' | 'movement' | 'cycle' | 'mood' | 'nutrition';
  description: string;
  evidenceCount: number;
  timeFrame: string;
  supportingDetail: string;
}

export interface WeeklyReport {
  id: string;
  weekStartDate: string;
  weekEndDate: string;
  moodSummary: string;
  walkingTotal: number;
  workoutsTotal: number;
  sleepAvg: number;
  waterAvg: number;
  topImprovements: string[];
  positivePatterns: string[];
  focusPriorities: string[];
  aiMessage: string;
}

export interface MonthlyReport {
  id: string;
  monthName: string;
  year: number;
  topImprovements: string[];
  needsAttention: string[];
  patternsNoticed: string[];
  nextMonthFocus: string[];
  betterThanBefore: string[];
  weightTrend: string;
  exerciseCount: number;
  sleepAvg: string;
  warmMessage: string;
}

export interface StoryMilestone {
  id: string;
  date: string;
  month: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  badge?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
  contextSnippet?: string;
}
