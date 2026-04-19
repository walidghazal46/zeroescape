import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export const ADMIN_EMAIL = 'walidghazal46@gmail.com';

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  type: 'google' | 'email' | 'guest';
  guestExpiresAt?: number;
  subscriptionStatus?: 'free' | 'premium' | 'expired';
  subscriptionExpiresAt?: number;
  deviceId: string;
  createdAt: number;
  isAdmin?: boolean;
  /** 4-digit emergency exit PIN set at registration */
  emergencyPin?: string;
  /** Timestamps of emergency exits used today */
  emergencyExitLog?: number[];
}

export interface AuthStore {
  user: User | null;
  isLoading: boolean;
  deviceId: string;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
  createGuestAccount: () => void;
  expireGuest: () => void;
  isGuestExpired: () => boolean;
  getGuestTimeLeft: () => number;
  setEmergencyPin: (pin: string) => void;
  /** Returns true if PIN matches and usage is within daily limits */
  validateEmergencyExit: (pin: string) => { ok: boolean; reason?: string };
  /** Record a completed emergency exit timestamp */
  recordEmergencyExit: () => void;
  /** How many times emergency exit used today (max 2) */
  getTodayExitCount: () => number;
}

// Get or create device ID
const getDeviceId = (): string => {
  let deviceId = localStorage.getItem('zeroEscape_deviceId');
  if (!deviceId) {
    deviceId = uuidv4();
    localStorage.setItem('zeroEscape_deviceId', deviceId);
  }
  return deviceId;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: true,
      deviceId: getDeviceId(),

      setUser: (user) => {
        const previousUser = get().user;

        if (!user) {
          set({ user: null, isLoading: false });
          return;
        }

        const isSameUser =
          previousUser != null &&
          (previousUser.id === user.id ||
            (previousUser.email != null && previousUser.email === user.email));

        const mergedUser: User = {
          ...user,
          emergencyPin: user.emergencyPin ?? (isSameUser ? previousUser?.emergencyPin : undefined),
          emergencyExitLog: user.emergencyExitLog ?? (isSameUser ? previousUser?.emergencyExitLog : undefined),
        };

        set({ user: mergedUser, isLoading: false });
      },

      setLoading: (isLoading) => set({ isLoading }),

      logout: () => {
        set({ user: null });
      },

      createGuestAccount: () => {
        const guestUser: User = {
          id: uuidv4(),
          email: null,
          name: 'ضيف',
          type: 'guest',
          guestExpiresAt: Date.now() + 48 * 60 * 60 * 1000, // 48 ساعة
          subscriptionStatus: 'free',
          deviceId: getDeviceId(),
          createdAt: Date.now(),
        };
        set({ user: guestUser, isLoading: false });
      },

      expireGuest: () => {
        const state = get();
        if (!state.user || state.user.type !== 'guest') return;
        set({
          user: {
            ...state.user,
            subscriptionStatus: 'expired',
            guestExpiresAt: Date.now(),
          },
        });
      },

      isGuestExpired: () => {
        const state = get();
        if (!state.user || state.user.type !== 'guest') return false;
        return Date.now() >= (state.user.guestExpiresAt || 0);
      },

      getGuestTimeLeft: () => {
        const state = get();
        if (!state.user || state.user.type !== 'guest') return 0;
        const timeLeft = (state.user.guestExpiresAt || 0) - Date.now();
        return Math.max(0, timeLeft);
      },

      setEmergencyPin: (pin) => {
        const { user } = get();
        if (!user) return;
        set({ user: { ...user, emergencyPin: pin } });
      },

      validateEmergencyExit: (pin) => {
        const { user } = get();
        if (!user) return { ok: false, reason: 'لا يوجد مستخدم مسجل' };
        if (!user.emergencyPin) return { ok: false, reason: 'لم يتم تعيين رمز الطوارئ' };
        if (user.emergencyPin !== pin) return { ok: false, reason: 'رمز PIN غير صحيح' };

        // Check daily limit: max 2 uses per day
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        const todayTs = todayStart.getTime();
        const todayUsages = (user.emergencyExitLog ?? []).filter((ts) => ts >= todayTs);
        if (todayUsages.length >= 2) {
          return { ok: false, reason: 'تم استنفاد الحد اليومي (مرتان فقط في اليوم)' };
        }

        return { ok: true };
      },

      recordEmergencyExit: () => {
        const { user } = get();
        if (!user) return;
        const log = [...(user.emergencyExitLog ?? []), Date.now()];
        set({ user: { ...user, emergencyExitLog: log } });
      },

      getTodayExitCount: () => {
        const { user } = get();
        if (!user) return 0;
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);
        return (user.emergencyExitLog ?? []).filter((ts) => ts >= todayStart.getTime()).length;
      },
    }),
    {
      name: 'zeroEscape_auth',
    }
  )
);
