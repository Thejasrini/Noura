import type { CycleLog, UserProfile } from '../types';

export interface CycleEstimationResult {
  hasData: boolean;
  latestPeriodDate: string | null;
  currentCycleDay: number;
  currentStage: 'period' | 'after_period' | 'ovulation' | 'before_period';
  stageName: string;
  stageEmoji: string;
  nextPeriodStartDate: string | null;
  daysUntilNextPeriod: number | null;
  isPeriodExpectedOnDate: (dateStr: string) => boolean;
  isLoggedPeriodOnDate: (dateStr: string) => boolean;
}

export const CycleEngine = {
  calculate(cycleLogs: CycleLog[], profile?: UserProfile, currentDateStr: string = "2026-09-05"): CycleEstimationResult {
    if (!cycleLogs || cycleLogs.length === 0) {
      return {
        hasData: false,
        latestPeriodDate: null,
        currentCycleDay: 0,
        currentStage: 'before_period',
        stageName: 'No Cycle Logged',
        stageEmoji: '🌸',
        nextPeriodStartDate: null,
        daysUntilNextPeriod: null,
        isPeriodExpectedOnDate: () => false,
        isLoggedPeriodOnDate: () => false,
      };
    }

    const typicalCycleLength = profile?.typicalCycleLengthDays || 28;
    const typicalPeriodDuration = profile?.typicalPeriodDays || 5;

    // Sort logs newest date first
    const sortedLogs = [...cycleLogs].sort((a, b) => b.date.localeCompare(a.date));
    const latestLog = sortedLogs[0];
    const latestPeriodDateStr = latestLog.date;

    const latestDate = new Date(latestPeriodDateStr + 'T00:00:00');
    const currentDate = new Date(currentDateStr + 'T00:00:00');

    // Calculate days elapsed between latest logged period start and current date
    const diffMs = currentDate.getTime() - latestDate.getTime();
    const daysElapsed = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    // Calculate current cycle day (1 to typicalCycleLength)
    const currentCycleDay = daysElapsed >= 0 ? (daysElapsed % typicalCycleLength) + 1 : 1;

    // Determine stage based on currentCycleDay
    let currentStage: 'period' | 'after_period' | 'ovulation' | 'before_period' = 'before_period';
    let stageName = 'Before Period Phase';
    let stageEmoji = '🌙';

    if (currentCycleDay <= typicalPeriodDuration) {
      currentStage = 'period';
      stageName = 'Period Phase';
      stageEmoji = '🌸';
    } else if (currentCycleDay <= 11) {
      currentStage = 'after_period';
      stageName = 'After Period Phase';
      stageEmoji = '🌿';
    } else if (currentCycleDay <= 16) {
      currentStage = 'ovulation';
      stageName = 'Around Ovulation Phase';
      stageEmoji = '✨';
    } else {
      currentStage = 'before_period';
      stageName = 'Before Period Phase';
      stageEmoji = '🌙';
    }

    const formatLocalDate = (d: Date): string => {
      const yyyy = d.getFullYear();
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const dd = String(d.getDate()).padStart(2, '0');
      return `${yyyy}-${mm}-${dd}`;
    };

    // Build predicted period date set
    const predictedPeriodDates = new Set<string>();
    let cycleStartDate = new Date(latestDate);

    // Cover past and future projected cycles
    for (let c = 0; c < 12; c++) {
      for (let d = 0; d < typicalPeriodDuration; d++) {
        const estDate = new Date(cycleStartDate.getTime() + d * 24 * 60 * 60 * 1000);
        const yyyymmdd = formatLocalDate(estDate);
        predictedPeriodDates.add(yyyymmdd);
      }
      cycleStartDate = new Date(cycleStartDate.getTime() + typicalCycleLength * 24 * 60 * 60 * 1000);
    }

    // Find next upcoming period start date after current date
    let nextPeriodStart = new Date(latestDate);
    while (nextPeriodStart.getTime() <= currentDate.getTime()) {
      nextPeriodStart = new Date(nextPeriodStart.getTime() + typicalCycleLength * 24 * 60 * 60 * 1000);
    }
    const nextPeriodStartDate = formatLocalDate(nextPeriodStart);
    const daysUntilNextPeriod = Math.ceil((nextPeriodStart.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));

    const loggedDatesSet = new Set(cycleLogs.map(l => l.date));

    return {
      hasData: true,
      latestPeriodDate: latestPeriodDateStr,
      currentCycleDay,
      currentStage,
      stageName,
      stageEmoji,
      nextPeriodStartDate,
      daysUntilNextPeriod,
      isPeriodExpectedOnDate: (dateStr: string) => predictedPeriodDates.has(dateStr) && !loggedDatesSet.has(dateStr),
      isLoggedPeriodOnDate: (dateStr: string) => loggedDatesSet.has(dateStr),
    };
  }
};
