import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { BreakAttempt, BreakOutcome } from '../core/types';

interface AnalyticsStore {
  breakAttempts: BreakAttempt[];

  logBreakAttempt: (params: {
    sessionId: string;
    appOrUrl: string;
    reason: string;
    outcome: BreakOutcome;
  }) => void;

  getBreakAttemptsThisWeek: () => BreakAttempt[];
  getMostAttemptedApp: () => string | null;
  getWeakestHour: () => number | null;
  getHourlyBreakCounts: () => { hour: number; count: number }[];
  getTopBlockedApps: (limit?: number) => { app: string; count: number }[];
  getWeeklyBreakCount: () => number;
}

export const useAnalyticsStore = create<AnalyticsStore>()(
  persist(
    (set, get) => ({
      breakAttempts: [],

      logBreakAttempt: ({ sessionId, appOrUrl, reason, outcome }) => {
        const now = Date.now();
        const attempt: BreakAttempt = {
          id: uuidv4(),
          sessionId,
          appOrUrl,
          reason: reason.trim() || '—',
          attemptedAt: now,
          outcome,
          hour: new Date(now).getHours(),
        };
        set((state) => ({
          breakAttempts: [attempt, ...state.breakAttempts].slice(0, 2000),
        }));
      },

      getBreakAttemptsThisWeek: () => {
        const weekAgo = Date.now() - 7 * 86400000;
        return get().breakAttempts.filter((a) => a.attemptedAt >= weekAgo);
      },

      getMostAttemptedApp: () => {
        const thisWeek = get().getBreakAttemptsThisWeek();
        if (thisWeek.length === 0) return null;
        const counts: Record<string, number> = {};
        for (const a of thisWeek) {
          counts[a.appOrUrl] = (counts[a.appOrUrl] ?? 0) + 1;
        }
        return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] ?? null;
      },

      getWeakestHour: () => {
        const thisWeek = get().getBreakAttemptsThisWeek();
        if (thisWeek.length === 0) return null;
        const hourCounts: Record<number, number> = {};
        for (const a of thisWeek) {
          hourCounts[a.hour] = (hourCounts[a.hour] ?? 0) + 1;
        }
        const sorted = Object.entries(hourCounts).sort((a, b) => Number(b[1]) - Number(a[1]));
        return sorted.length > 0 ? Number(sorted[0][0]) : null;
      },

      getHourlyBreakCounts: () => {
        const thisWeek = get().getBreakAttemptsThisWeek();
        const hourCounts = new Array(24).fill(0) as number[];
        for (const a of thisWeek) {
          hourCounts[a.hour]++;
        }
        return hourCounts.map((count, hour) => ({ hour, count }));
      },

      getTopBlockedApps: (limit = 3) => {
        const thisWeek = get().getBreakAttemptsThisWeek();
        const counts: Record<string, number> = {};
        for (const a of thisWeek) {
          counts[a.appOrUrl] = (counts[a.appOrUrl] ?? 0) + 1;
        }
        return Object.entries(counts)
          .map(([app, count]) => ({ app, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, limit);
      },

      getWeeklyBreakCount: () => get().getBreakAttemptsThisWeek().length,
    }),
    {
      name: 'ze_analytics',
      partialize: (state) => ({ breakAttempts: state.breakAttempts }),
    }
  )
);
