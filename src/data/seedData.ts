import type { 
  UserProfile, DailyCheckIn, CycleLog, MealItem, WorkoutLog, 
  BodyMeasurement, Habit, TaskItem, FuturePlan, GoalItem, 
  JournalEntry, PatternItem, WeeklyReport, MonthlyReport, StoryMilestone 
} from '../types';

export const initialProfile: UserProfile = {
  name: "Noura",
  avatarEmoji: "🌸",
  mainGoal: "Understand my body patterns and build sustainable strength & energy",
  fitnessLevel: "intermediate",
  dailyWaterGoalMl: 2000,
  dailyStepGoal: 7000,
  typicalCycleLengthDays: 29,
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

export const initialTasks: TaskItem[] = [
  {
    id: "task-1",
    title: "Morning 15-min light walk",
    date: "2026-09-05",
    time: "08:30",
    priority: "medium",
    completed: true
  },
  {
    id: "task-2",
    title: "Upper Body & Wrist Workout",
    date: "2026-09-05",
    time: "11:00",
    priority: "high",
    completed: false
  },
  {
    id: "task-3",
    title: "Prepare high-protein lunch & greens",
    date: "2026-09-05",
    time: "13:00",
    priority: "medium",
    completed: true
  },
  {
    id: "task-4",
    title: "10-minute evening stretch & posture check",
    date: "2026-09-05",
    time: "20:00",
    priority: "low",
    completed: false
  }
];

export const initialFuturePlans: FuturePlan[] = [
  {
    id: "plan-1",
    title: "Start new upper body strength routine",
    date: "2026-09-05",
    description: "Focusing on gentle wrist stability and shoulder mobility.",
    category: "Fitness",
    completed: false,
    repeat: "weekly"
  },
  {
    id: "plan-2",
    title: "Start healthier colorful breakfast routine",
    date: "2026-09-10",
    description: "Include berries, eggs/chia pudding, and seeds every morning.",
    category: "Nutrition",
    completed: false,
    repeat: "none"
  },
  {
    id: "plan-3",
    title: "Monthly Body Story Check-in & Reflections",
    date: "2026-09-30",
    description: "Review progress, celebrate small wins, and record body measurements.",
    category: "Wellness",
    completed: false,
    repeat: "monthly"
  }
];

export const initialHabits: Habit[] = [
  {
    id: "h-1",
    title: "Walk every day",
    category: "Movement",
    targetDaysPerWeek: 7,
    currentStreak: 6,
    bestStreak: 14,
    icon: "🚶",
    color: "bg-sky-100 text-sky-700"
  },
  {
    id: "h-2",
    title: "Drink 2L Water",
    category: "Hydration",
    targetDaysPerWeek: 7,
    currentStreak: 4,
    bestStreak: 12,
    icon: "💧",
    color: "bg-blue-100 text-blue-700"
  },
  {
    id: "h-3",
    title: "Exercise 3-4x / week",
    category: "Fitness",
    targetDaysPerWeek: 4,
    currentStreak: 3,
    bestStreak: 8,
    icon: "💪",
    color: "bg-pink-100 text-pink-700"
  },
  {
    id: "h-4",
    title: "Evening Stretch & Unwind",
    category: "Recovery",
    targetDaysPerWeek: 5,
    currentStreak: 5,
    bestStreak: 9,
    icon: "🧘",
    color: "bg-purple-100 text-purple-700"
  },
  {
    id: "h-5",
    title: "Night Journaling",
    category: "Mindfulness",
    targetDaysPerWeek: 5,
    currentStreak: 2,
    bestStreak: 10,
    icon: "📔",
    color: "bg-amber-100 text-amber-700"
  }
];

export const initialGoals: GoalItem[] = [
  {
    id: "g-1",
    title: "Reach 7,000 steps daily average",
    category: "Walking",
    targetValue: 7000,
    currentValue: 6240,
    unit: "steps/day",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
    status: "in_progress"
  },
  {
    id: "g-2",
    title: "Complete 16 strength workouts this month",
    category: "Fitness",
    targetValue: 16,
    currentValue: 4,
    unit: "workouts",
    startDate: "2026-09-01",
    endDate: "2026-09-30",
    status: "in_progress"
  },
  {
    id: "g-3",
    title: "Drink 2.0L water consistently",
    category: "Nutrition",
    targetValue: 2.0,
    currentValue: 1.8,
    unit: "L/day",
    startDate: "2026-08-15",
    endDate: "2026-09-15",
    status: "in_progress"
  },
  {
    id: "g-4",
    title: "Maintain 7.5 hours average restful sleep",
    category: "Sleep",
    targetValue: 7.5,
    currentValue: 7.2,
    unit: "hours",
    startDate: "2026-08-01",
    endDate: "2026-09-30",
    status: "in_progress"
  }
];

export const initialPatterns: PatternItem[] = [
  {
    id: "pat-1",
    title: "Sleep & Energy Boost",
    category: "sleep",
    description: "Your mood and overall daytime energy are noticeably higher on days following at least 7.5 hours of sleep.",
    evidenceCount: 14,
    timeFrame: "Based on the last 6 weeks",
    supportingDetail: "Average energy is 4.3/5 when sleep is >7.5h vs 2.8/5 when sleep is under 6.5h."
  },
  {
    id: "pat-2",
    title: "Movement & Exercise Synergy",
    category: "movement",
    description: "You tend to walk approximately 1,600 more steps on days when you log a strength workout.",
    evidenceCount: 11,
    timeFrame: "Based on the last 30 days",
    supportingDetail: "Workout days average 7,850 steps compared to 6,200 steps on rest days."
  },
  {
    id: "pat-3",
    title: "Gentle Energy Shift Before Period",
    category: "cycle",
    description: "Your logs suggest a temporary decrease in energy 3 to 4 days before your period begins.",
    evidenceCount: 4,
    timeFrame: "Observed across 4 cycle cycles",
    supportingDetail: "Lighter workouts (mobility, stretching, walk) reported 85% higher satisfaction during this phase."
  },
  {
    id: "pat-4",
    title: "Hydration & Digestion Connection",
    category: "nutrition",
    description: "Logging >1.8L of water correlates with 0 reported bloating or discomfort symptoms.",
    evidenceCount: 18,
    timeFrame: "Based on last 40 days",
    supportingDetail: "Symptom logs show 90% fewer digestion complaints on high water intake days."
  }
];

export const initialBodyMeasurements: BodyMeasurement[] = [
  { id: "bm-1", date: "2026-06-01", weightKg: 63.5, waistCm: 72, hipsCm: 98, strengthScore: 65, notes: "Feeling steady, starting progressive walking routine." },
  { id: "bm-2", date: "2026-07-01", weightKg: 62.8, waistCm: 71, hipsCm: 97.5, strengthScore: 72, notes: "Improved arm and wrist stability. Higher stamina." },
  { id: "bm-3", date: "2026-08-01", weightKg: 62.2, waistCm: 70, hipsCm: 97, strengthScore: 78, notes: "Core feeling stronger, sleep consistency improving." },
  { id: "bm-4", date: "2026-09-01", weightKg: 61.9, waistCm: 69.5, hipsCm: 96.5, strengthScore: 84, notes: "Strongest month yet! Great energy levels." }
];

export const initialStoryMilestones: StoryMilestone[] = [
  {
    id: "sm-1",
    date: "2026-04-15",
    month: "April 2026",
    title: "Began My Body Wellness Journey",
    category: "Milestone",
    description: "Set up daily tracking for cycle, nutrition, water, and movement. Focused on listening to my body.",
    icon: "🌱",
    badge: "First Step"
  },
  {
    id: "sm-2",
    date: "2026-05-20",
    month: "May 2026",
    title: "First Month with 12 Workouts",
    category: "Fitness",
    description: "Built a solid routine with upper body, legs, and mobility stretches without feeling overwhelmed.",
    icon: "💪",
    badge: "Consistency"
  },
  {
    id: "sm-3",
    date: "2026-06-18",
    month: "June 2026",
    title: "Mastered Daily Hydration Goal",
    category: "Nutrition",
    description: "Achieved 20+ days of reaching the 2L water goal. Noticed clearer skin and better digestion.",
    icon: "💧",
    badge: "Hydration Queen"
  },
  {
    id: "sm-4",
    date: "2026-07-28",
    month: "July 2026",
    title: "Reached 200,000 Total Steps",
    category: "Walking",
    description: "Daily walks became my favorite morning mental clarity routine.",
    icon: "🚶",
    badge: "Walker"
  },
  {
    id: "sm-5",
    date: "2026-08-25",
    month: "August 2026",
    title: "Discovered Cycle & Sleep Synergy",
    category: "AI Insight",
    description: "Realized how prioritizing 7.5h sleep before period drastically reduces PMS fatigue.",
    icon: "🌸",
    badge: "Body Wisdom"
  }
];

export const initialJournalEntries: JournalEntry[] = [
  {
    id: "j-1",
    date: "2026-09-04",
    title: "Calm evening reflection & peaceful walk",
    mood: "great",
    text: "Had a wonderful sunset walk today. My wrist felt completely fine during yesterday's light strength training. Excited for the weekend routine!",
    tags: ["walking", "gratitude", "recovery"]
  },
  {
    id: "j-2",
    date: "2026-09-01",
    title: "Welcoming September with fresh goals",
    mood: "good",
    text: "Set my intentions for September. Main focus is maintaining strong protein intake and sticking to my 4x weekly workouts.",
    tags: ["goals", "fitness", "intentions"]
  },
  {
    id: "j-3",
    date: "2026-08-28",
    title: "Mid-cycle energy peak!",
    mood: "great",
    text: "Felt super energized during my leg and glutes workout. Ate a balanced lunch with plenty of colorful vegetables.",
    tags: ["workout", "energy", "cycle"]
  }
];

const todayStr = "2026-09-05";

export const initialDailyCheckIns: DailyCheckIn[] = [
  {
    date: todayStr,
    morningCompleted: true,
    nightCompleted: false,
    mood: "good",
    energy: 4,
    sleepHours: 7.3,
    symptoms: [],
    morningNote: "Feeling well rested and ready for a productive Saturday!",
    waterMl: 1500,
    steps: 5842,
    exerciseDone: false,
    breakfastLogged: true,
    lunchLogged: true,
    snackLogged: true,
    dinnerLogged: false
  },
  {
    date: "2026-09-04",
    morningCompleted: true,
    nightCompleted: true,
    mood: "great",
    energy: 5,
    sleepHours: 7.8,
    symptoms: [],
    morningNote: "Slept super deep.",
    eveningMood: "great",
    eveningEnergy: 4,
    waterMl: 2250,
    steps: 7410,
    exerciseDone: true,
    breakfastLogged: true,
    lunchLogged: true,
    snackLogged: true,
    dinnerLogged: true,
    eveningReflection: "Very satisfying day, got my evening stretch done!"
  },
  {
    date: "2026-09-03",
    morningCompleted: true,
    nightCompleted: true,
    mood: "good",
    energy: 4,
    sleepHours: 7.2,
    symptoms: ["bloating"],
    morningNote: "Slight bloating from late dinner, but overall good energy.",
    eveningMood: "good",
    eveningEnergy: 3,
    waterMl: 2000,
    steps: 6890,
    exerciseDone: true,
    breakfastLogged: true,
    lunchLogged: true,
    snackLogged: true,
    dinnerLogged: true,
    eveningReflection: "Drank peppermint tea, helped a lot with digestion."
  },
  {
    date: "2026-09-02",
    morningCompleted: true,
    nightCompleted: true,
    mood: "okay",
    energy: 3,
    sleepHours: 6.5,
    symptoms: ["fatigue"],
    morningNote: "Woke up a bit tired, went to sleep late.",
    eveningMood: "good",
    eveningEnergy: 3,
    waterMl: 1750,
    steps: 5200,
    exerciseDone: false,
    breakfastLogged: true,
    lunchLogged: true,
    snackLogged: false,
    dinnerLogged: true,
    eveningReflection: "Took a relaxing hot shower and turned off screens early."
  },
  {
    date: "2026-09-01",
    morningCompleted: true,
    nightCompleted: true,
    mood: "great",
    energy: 5,
    sleepHours: 8.0,
    symptoms: [],
    morningNote: "September 1st! Fantastic energy.",
    eveningMood: "great",
    eveningEnergy: 4,
    waterMl: 2500,
    steps: 8120,
    exerciseDone: true,
    breakfastLogged: true,
    lunchLogged: true,
    snackLogged: true,
    dinnerLogged: true,
    eveningReflection: "Awesome strength workout today."
  }
];

export const initialCycleLogs: CycleLog[] = [
  { id: "c-1", date: "2026-08-19", cycleDay: 1, isPeriodStart: true, flowLevel: "medium", symptoms: ["cramps", "fatigue"], notes: "Period started in the morning. Light cramps." },
  { id: "c-2", date: "2026-08-20", cycleDay: 2, flowLevel: "heavy", symptoms: ["cramps", "bloating"], notes: "Warm heat pad helped." },
  { id: "c-3", date: "2026-08-21", cycleDay: 3, flowLevel: "medium", symptoms: ["bloating"], notes: "Cramps gone today." },
  { id: "c-4", date: "2026-08-22", cycleDay: 4, flowLevel: "light", symptoms: [], notes: "Energy returning." },
  { id: "c-5", date: "2026-08-23", cycleDay: 5, isPeriodEnd: true, flowLevel: "spotting", symptoms: [], notes: "Period ending. Light mobility stretch." },
  { id: "c-6", date: "2026-07-21", cycleDay: 1, isPeriodStart: true, flowLevel: "medium", symptoms: ["cramps"], notes: "Previous period start." },
  { id: "c-7", date: "2026-07-25", cycleDay: 5, isPeriodEnd: true, flowLevel: "light", symptoms: [], notes: "Period ended." }
];

export const initialMeals: MealItem[] = [
  {
    id: "m-1",
    date: "2026-09-05",
    mealType: "breakfast",
    name: "Avocado & Egg Toast with Berries",
    portion: "1 plate",
    notes: "Sprinkled chia seeds and hemp hearts.",
    tags: { protein: true, fiber: true, vegetables: true, fruit: true, water: true, caffeine: true, processedSugary: false }
  },
  {
    id: "m-2",
    date: "2026-09-05",
    mealType: "lunch",
    name: "Grilled Chicken & Quinoa Salad with Cucumber & Tahini",
    portion: "Medium bowl",
    notes: "Felt very satisfying and light on digestion.",
    tags: { protein: true, fiber: true, vegetables: true, fruit: false, water: true, caffeine: false, processedSugary: false }
  },
  {
    id: "m-3",
    date: "2026-09-05",
    mealType: "snack",
    name: "Greek Yogurt with Fresh Strawberries & Almonds",
    portion: "1 cup",
    notes: "Mid-afternoon snack.",
    tags: { protein: true, fiber: true, vegetables: false, fruit: true, water: false, caffeine: false, processedSugary: false }
  }
];

export const initialWorkouts: WorkoutLog[] = [
  {
    id: "w-1",
    date: "2026-09-04",
    title: "Leg & Glute Strengthening",
    category: "Legs",
    durationMin: 30,
    difficultyRating: 3,
    sorenessRating: 2,
    recoveryScore: 4,
    notes: "Felt strong throughout squats and lunges. Recovery is good.",
    exercises: [
      { name: "Goblet Squats", category: "Legs", sets: 3, reps: 12, weightKg: 10 },
      { name: "Romanian Deadlifts", category: "Glutes", sets: 3, reps: 12, weightKg: 12 },
      { name: "Glute Bridges", category: "Glutes", sets: 3, reps: 15, weightKg: 10 },
      { name: "Calf Raises", category: "Legs", sets: 3, reps: 20 }
    ]
  },
  {
    id: "w-2",
    date: "2026-09-01",
    title: "Upper Body & Wrist Mobility",
    category: "Upper body",
    durationMin: 25,
    difficultyRating: 3,
    sorenessRating: 1,
    recoveryScore: 5,
    notes: "Gentle wrist stretches and shoulder presses.",
    exercises: [
      { name: "Dumbbell Shoulder Press", category: "Upper body", sets: 3, reps: 10, weightKg: 6 },
      { name: "Dumbbell Rows", category: "Upper body", sets: 3, reps: 12, weightKg: 8 },
      { name: "Wrist Rotations & Flexion", category: "Wrist / Forearms", sets: 3, durationMin: 5 }
    ]
  },
  {
    id: "w-3",
    date: "2026-08-29",
    title: "Core & Full Body Stretch",
    category: "Core",
    durationMin: 20,
    difficultyRating: 2,
    sorenessRating: 1,
    recoveryScore: 5,
    notes: "Relaxing flow after walking.",
    exercises: [
      { name: "Plank Hold", category: "Core", sets: 3, durationMin: 1 },
      { name: "Bird-Dog", category: "Core", sets: 3, reps: 12 },
      { name: "Cat-Cow & Child Pose", category: "Stretching", sets: 1, durationMin: 5 }
    ]
  }
];

export const initialWeeklyReports: WeeklyReport[] = [
  {
    id: "wr-35",
    weekStartDate: "2026-08-30",
    weekEndDate: "2026-09-05",
    moodSummary: "😊 Overall calm, steady energy",
    walkingTotal: 46200,
    workoutsTotal: 3,
    sleepAvg: 7.5,
    waterAvg: 2.1,
    topImprovements: [
      "Walked 12% more steps than last week",
      "Hit your daily hydration goal 6 out of 7 days",
      "Zero reported wrist pain during strength exercises"
    ],
    positivePatterns: [
      "Consistently better sleep on days with early evening stretches",
      "Balanced protein intake across breakfast and lunch"
    ],
    focusPriorities: [
      "Prioritize 10 mins of wind-down time before bed",
      "Keep hydration high as your expected period approaches in ~11 days"
    ],
    aiMessage: "You don't need to be perfect, Noura. You are showing up for yourself consistently and building real strength!"
  }
];

export const initialMonthlyReport: MonthlyReport = {
  id: "mr-aug-2026",
  monthName: "August",
  year: 2026,
  topImprovements: [
    "Completed 14 workouts throughout August",
    "Average step count reached 6,850 / day (+15% vs July)",
    "Consistent high protein & fresh vegetable meals logged"
  ],
  needsAttention: [
    "Sleep fell below 6.5 hours on 4 night owl occasions",
    "Slight fatigue noted 3 days before period"
  ],
  patternsNoticed: [
    "7.5+ hours of sleep directly eliminates pre-period headache complaints",
    "Morning walks increase afternoon focus and mood rating"
  ],
  nextMonthFocus: [
    "Build a peaceful 10pm wind-down habit",
    "Maintain upper body & wrist strength progression twice per week"
  ],
  betterThanBefore: [
    "Strength & stamina up 18% from June",
    "Hydration consistency improved from 60% to 85%"
  ],
  weightTrend: "Steady & strong (Body composition improving)",
  exerciseCount: 14,
  sleepAvg: "7.4 hours",
  warmMessage: "August was a month of beautiful growth, Noura! You listened to your body's signals and stayed true to your wellness goals."
};
