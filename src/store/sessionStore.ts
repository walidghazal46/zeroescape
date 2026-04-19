import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';
import type { SessionEndReason } from '../core/types';

export interface CompletedSession {
  id: string;
  mode: string;
  durationMinutes: number;
  blockedAttempts: number;
  completedAt: number; // timestamp
  day: string; // 'YYYY-MM-DD'
  endReason: SessionEndReason;
}

export interface SessionStore {
  // Active session state (not persisted)
  activeSession: {
    sessionId: string;
    mode: string;
    durationMinutes: number;
    startedAt: number;
    blockedAttempts: number;
    blockSocial: boolean;
    webFilter: boolean;
  } | null;

  // Persisted settings
  blockedApps: Record<string, boolean>;
  webProtectionEnabled: boolean;
  completedSessions: CompletedSession[];
  currentStreak: number;
  lastSessionDay: string | null;

  // Actions
  startSession: (mode: string, durationMinutes: number, blockSocial: boolean, webFilter: boolean) => void;
  incrementBlockedAttempt: () => void;
  finishSession: () => CompletedSession | null;
  abandonSession: () => void;
  setBlockedApp: (id: string, blocked: boolean) => void;
  blockAllApps: () => void;
  setBulkBlockedApps: (appIds: string[]) => void;
  setWebProtection: (enabled: boolean) => void;

  // Computed helpers
  getTotalHoursThisWeek: () => number;
  getTotalBlockedThisWeek: () => number;
  getWeekData: () => { day: string; hours: number }[];
  getStreakDays: () => number;
}

const DEFAULT_BLOCKED_APPS: Record<string, boolean> = {
  instagram: true,
  whatsapp: false,
  twitter: true,
  youtube: true,
  spotify: false,
  tiktok: true,
  snapchat: true,
  games: true,
};

const DAY_NAMES_AR = ['الأحد', 'الإثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

function toDateStr(ts: number) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export const useSessionStore = create<SessionStore>()(
  persist(
    (set, get) => ({
      activeSession: null,
      blockedApps: DEFAULT_BLOCKED_APPS,
      webProtectionEnabled: true,
      completedSessions: [],
      currentStreak: 0,
      lastSessionDay: null,

      startSession: (mode, durationMinutes, blockSocial, webFilter) => {
        set({
          activeSession: {
            sessionId: uuidv4(),
            mode,
            durationMinutes,
            startedAt: Date.now(),
            blockedAttempts: 0,
            blockSocial,
            webFilter,
          },
        });
      },

      incrementBlockedAttempt: () => {
        const { activeSession } = get();
        if (!activeSession) return;
        set({
          activeSession: {
            ...activeSession,
            blockedAttempts: activeSession.blockedAttempts + 1,
          },
        });
      },

      finishSession: () => {
        const { activeSession, completedSessions, currentStreak, lastSessionDay } = get();
        if (!activeSession) return null;

        const today = toDateStr(Date.now());
        const yesterday = toDateStr(Date.now() - 86400000);

        let newStreak = currentStreak;
        if (lastSessionDay === yesterday) {
          newStreak = currentStreak + 1;
        } else if (lastSessionDay !== today) {
          newStreak = 1;
        }

        const session: CompletedSession = {
          id: uuidv4(),
          mode: activeSession.mode,
          durationMinutes: activeSession.durationMinutes,
          blockedAttempts: activeSession.blockedAttempts,
          completedAt: Date.now(),
          day: today,
          endReason: 'completed',
        };

        set({
          activeSession: null,
          completedSessions: [session, ...completedSessions].slice(0, 200),
          currentStreak: newStreak,
          lastSessionDay: today,
        });

        return session;
      },

      abandonSession: () => {
        set({ activeSession: null });
      },

      setBlockedApp: (id, blocked) => {
        const { blockedApps } = get();
        set({ blockedApps: { ...blockedApps, [id]: blocked } });
      },

      setBulkBlockedApps: (appIds) => {
        const { blockedApps } = get();
        const updates = appIds.reduce<Record<string, boolean>>(
          (acc, id) => ({ ...acc, [id]: true }),
          {}
        );
        set({ blockedApps: { ...blockedApps, ...updates } });
      },

      blockAllApps: () => {
        const { blockedApps } = get();
        const allBlocked = Object.keys(blockedApps).reduce<Record<string, boolean>>(
          (acc, key) => ({ ...acc, [key]: true }),
          {}
        );
        set({ blockedApps: allBlocked });
      },

      setWebProtection: (enabled) => {
        set({ webProtectionEnabled: enabled });
      },

      getTotalHoursThisWeek: () => {
        const { completedSessions } = get();
        const weekAgo = Date.now() - 7 * 86400000;
        return completedSessions
          .filter(s => s.completedAt >= weekAgo)
          .reduce((sum, s) => sum + s.durationMinutes / 60, 0);
      },

      getTotalBlockedThisWeek: () => {
        const { completedSessions } = get();
        const weekAgo = Date.now() - 7 * 86400000;
        return completedSessions
          .filter(s => s.completedAt >= weekAgo)
          .reduce((sum, s) => sum + s.blockedAttempts, 0);
      },

      getWeekData: () => {
        const { completedSessions } = get();
        const days: { day: string; hours: number; ts: number }[] = [];
        for (let i = 6; i >= 0; i--) {
          const ts = Date.now() - i * 86400000;
          const dayStr = toDateStr(ts);
          const dayName = DAY_NAMES_AR[new Date(ts).getDay()];
          const hours = completedSessions
            .filter(s => s.day === dayStr)
            .reduce((sum, s) => sum + s.durationMinutes / 60, 0);
          days.push({ day: dayName, hours: Math.round(hours * 10) / 10, ts });
        }
        return days;
      },

      getStreakDays: () => {
        return get().currentStreak;
      },
    }),
    {
      name: 'zeroEscape_sessions',
      // Don't persist active session — if app closes mid-session it's abandoned
      partialize: (state) => ({
        blockedApps: state.blockedApps,
        webProtectionEnabled: state.webProtectionEnabled,
        completedSessions: state.completedSessions,
        currentStreak: state.currentStreak,
        lastSessionDay: state.lastSessionDay,
      }),
    }
  )
);
