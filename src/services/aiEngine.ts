import { StorageService } from './storage';
import type { ExerciseCategory } from '../types';

export const AIEngine = {
  // 1. "Ask My Data" Conversational Query Engine
  askMyData(query: string): { responseText: string; contextSnippet?: string } {
    const q = query.toLowerCase();
    const checkIns = StorageService.getCheckIns();
    const workouts = StorageService.getWorkouts();
    const meals = StorageService.getMeals();
    const cycleLogs = StorageService.getCycleLogs();

    if (checkIns.length === 0 && workouts.length === 0 && meals.length === 0 && cycleLogs.length === 0) {
      return {
        responseText: `Welcome to Noura! 🌸\n\nI don't have any logged data recorded yet. As you start logging your daily check-ins, workouts, meals, and cycle, I will analyze your patterns and help you understand your body!`,
        contextSnippet: `0 records currently logged`
      };
    }

    // Query 1: Energy & Sleep patterns
    if (q.includes('energy') || q.includes('tired') || q.includes('fatigue')) {
      const logsWithSleep = checkIns.filter(c => c.sleepHours !== undefined && c.sleepHours > 0);
      if (logsWithSleep.length === 0) {
        return {
          responseText: `You haven't logged any sleep hours yet! 😴\n\nLog your morning check-in with your sleep duration and energy rating so I can track how rest impacts your energy over time.`,
          contextSnippet: `0 sleep records logged`
        };
      }
      const totalSleep = logsWithSleep.reduce((acc, c) => acc + (c.sleepHours || 0), 0);
      const avgSleep = (totalSleep / logsWithSleep.length).toFixed(1);
      const recentLog = logsWithSleep[0];
      return {
        responseText: `I analyzed your logged history! 🌸\n\nYour average logged sleep is ${avgSleep} hours across ${logsWithSleep.length} days.\n\nToday, you logged ${recentLog?.sleepHours || '0'} hours of sleep with energy level ${recentLog?.energy || 'unrated'}/5. Keeping your bedtime wind-down consistent will keep your afternoon energy steady!`,
        contextSnippet: `Based on ${logsWithSleep.length} sleep logs (Avg sleep: ${avgSleep}h)`
      };
    }

    // Query 2: Workouts & Consistency
    if (q.includes('workout') || q.includes('exercise') || q.includes('consistent') || q.includes('strength')) {
      if (workouts.length === 0) {
        return {
          responseText: `No workouts logged yet, Noura! 💪\n\nTap "+ Log Workout" in the Move & Progress tab to record your first strength, cardio, or mobility session.`,
          contextSnippet: `0 workouts logged`
        };
      }
      return {
        responseText: `Great effort! 💪\n\nYou have completed ${workouts.length} exercise session(s) in your history. Keep building consistency at your own comfortable pace!`,
        contextSnippet: `Logged ${workouts.length} total workout session(s)`
      };
    }

    // Query 3: Walking & Steps
    if (q.includes('walk') || q.includes('step') || q.includes('movement')) {
      const logsWithSteps = checkIns.filter(c => (c.steps || 0) > 0);
      if (logsWithSteps.length === 0) {
        return {
          responseText: `No walking steps logged yet! 🚶\n\nRecord your steps in your daily check-in to track your movement trends over time.`,
          contextSnippet: `0 step records logged`
        };
      }
      const totalSteps = logsWithSteps.reduce((acc, c) => acc + (c.steps || 0), 0);
      const avgSteps = Math.round(totalSteps / logsWithSteps.length);
      return {
        responseText: `Here is what I noticed about your logged movement! 🚶\n\nYour average recorded daily walk is ${avgSteps.toLocaleString()} steps across ${logsWithSteps.length} day(s).`,
        contextSnippet: `Average daily steps: ${avgSteps.toLocaleString()} steps/day`
      };
    }

    // Query 4: Cycle & Period
    if (q.includes('cycle') || q.includes('period') || q.includes('pms') || q.includes('cramps')) {
      if (cycleLogs.length === 0) {
        return {
          responseText: `No period or cycle logs recorded yet 🌸.\n\nTap "+ Log Period" in the Cycle tab to record your period dates so I can calculate your cycle length and predictions!`,
          contextSnippet: `0 cycle entries logged`
        };
      }
      return {
        responseText: `Looking at your logged cycle records 🌸:\n\nYou have ${cycleLogs.length} cycle log(s) saved. Keep logging your period start dates to refine predictions over time.`,
        contextSnippet: `Cycle History: ${cycleLogs.length} logged entry(ies)`
      };
    }

    // Query 5: Food & Nutrition
    if (q.includes('food') || q.includes('nutrition') || q.includes('eat') || q.includes('protein')) {
      if (meals.length === 0) {
        return {
          responseText: `No meals logged yet! 🥗\n\nLog your breakfast, lunch, or dinner in the Food tab to monitor your nourishing meals and tag protein, fiber, and veggies.`,
          contextSnippet: `0 meals logged`
        };
      }
      return {
        responseText: `Here is your food balance overview 🥗:\n\nYou have logged ${meals.length} meal(s) so far. Focus on protein, fiber, and greens to feel energized!`,
        contextSnippet: `Logged ${meals.length} meals`
      };
    }

    // Fallback response using actual data metrics
    const totalSteps = checkIns.reduce((acc, c) => acc + (c.steps || 0), 0);
    const avgSteps = checkIns.length ? Math.round(totalSteps / checkIns.length) : 0;
    return {
      responseText: `Based on your logged data, Noura 🌸:\n\n• Logged Check-ins: ${checkIns.length} days\n• Average Steps: ${avgSteps ? avgSteps.toLocaleString() : 'Not logged yet'}\n• Workouts logged: ${workouts.length} sessions\n• Meals logged: ${meals.length} meals\n\nKeep logging daily, and I'll continue discovering more patterns for you!`,
      contextSnippet: `Summary generated from ${checkIns.length} check-ins`
    };
  },

  // 2. "Why am I feeling this?" Root Cause Diagnostic Engine
  analyzeCurrentFeeling(symptomOrFeeling: string): { title: string; reasoning: string; suggestions: string[] } {
    const todayCheckIn = StorageService.getCheckInByDate("2026-09-05");
    const cycleLogs = StorageService.getCycleLogs();
    
    const sleepText = todayCheckIn?.sleepHours ? `${todayCheckIn.sleepHours} hours` : 'unlogged sleep';
    const waterText = todayCheckIn?.waterMl ? `${todayCheckIn.waterMl}ml` : 'unlogged water';
    const cycleText = cycleLogs.length > 0 ? `your logged cycle history` : 'your general wellness';

    if (symptomOrFeeling.toLowerCase().includes('low') || symptomOrFeeling.toLowerCase().includes('tired')) {
      return {
        title: "Possible factors behind lower energy today",
        reasoning: `You logged ${sleepText} and ${waterText}. Energy levels reflect sleep duration, hydration, and natural bodily rhythms.`,
        suggestions: [
          "Choose a gentle 15-minute walk or light mobility stretch.",
          "Sip a fresh glass of water to ensure baseline hydration.",
          "Eat a nourishing snack with complex carbs and protein."
        ]
      };
    }

    if (symptomOrFeeling.toLowerCase().includes('bloat')) {
      return {
        title: "Possible factors behind bloating",
        reasoning: `Your recorded water intake today is ${waterText}. Lower fluid intake combined with sodium or digestion pacing can cause temporary bloating.`,
        suggestions: [
          "Sip warm herbal tea (like peppermint or chamomile).",
          "Log water to reach your daily hydration target.",
          "Perform a light 10-minute torso twist or cat-cow stretch."
        ]
      };
    }

    return {
      title: "Understanding your current feeling",
      reasoning: `Based on ${cycleText}, your body responds remarkably well to consistent hydration, rest, and low-stress physical activity.`,
      suggestions: [
        "Take a few deep breaths and do a quick body scan.",
        "Ensure you drink plenty of water throughout the day.",
        "Enjoy a balanced meal with protein and green vegetables."
      ]
    };
  },

  // 3. Smart Workout Recommendation Generator
  getSmartWorkoutRecommendation(timeAvailableMin: number = 25): {
    title: string;
    category: ExerciseCategory;
    durationMin: number;
    intensity: string;
    reasoning: string;
    exercises: { name: string; sets?: number; reps?: number; durationMin?: number }[];
  } {
    const workouts = StorageService.getWorkouts();
    const lastWorkout = workouts[0];

    let category: ExerciseCategory = "Upper body";
    let title = "Upper Body & Wrist Stability";
    let reasoning = "A balanced upper body and mobility routine to build functional strength.";

    if (lastWorkout) {
      if (lastWorkout.category === "Upper body" || lastWorkout.category === "Arms") {
        category = "Legs";
        title = "Leg & Glute Strengthening";
        reasoning = `Your last logged workout was ${lastWorkout.title}. Today is ideal for lower body & core work.`;
      } else {
        reasoning = `Your last logged workout was ${lastWorkout.title}. This upper body routine complements your training nicely.`;
      }
    } else {
      reasoning = "Welcome to Noura! This balanced upper body session is perfect for starting your movement routine.";
    }

    const exerciseList = [
      { name: "Dumbbell Shoulder Press", sets: 3, reps: 10 },
      { name: "Bent-Over Dumbbell Rows", sets: 3, reps: 12 },
      { name: "Incline Push-Ups / Bench Press", sets: 3, reps: 10 },
      { name: "Wrist Flexion & Extension Stretch", sets: 2, durationMin: 4 }
    ];

    return {
      title,
      category,
      durationMin: timeAvailableMin,
      intensity: "Medium",
      reasoning,
      exercises: exerciseList
    };
  },

  // 4. Today AI Focus Generator
  getTodayFocus(): { title: string; text: string; icon: string } {
    const checkIns = StorageService.getCheckIns();
    const todayLog = checkIns[0];

    if (!todayLog) {
      return {
        title: "Today's Focus",
        text: "Welcome to Noura! Start by logging your morning check-in to get your personalized daily focus.",
        icon: "🌱"
      };
    }

    return {
      title: "Today's Focus",
      text: `Focus on staying hydrated and completing your daily movement target!`,
      icon: "🌱"
    };
  }
};
