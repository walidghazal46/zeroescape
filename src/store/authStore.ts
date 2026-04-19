import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

export const ADMIN_EMAIL = 'walidghazal46@gmail.com';

/** Free trial durations in days */
export const GUEST_TRIAL_DAYS = 3;
export const REGISTERED_TRIAL_DAYS = 7;

export type AccountStatus =
  | 'guest_trial'        // Guest user within 3-day trial
  | 'registered_trial'   // Email/Google user within 7-day trial
  | 'active'             // Has active subscription
  | 'expired'            // Trial or subscription has expired
  | 'suspended';         // Admin-suspended account

export type SubscriptionPlan = 'monthly' | 'quarterly' | 'biannual' | 'annual';

export interface User {
  id: string;
  email: string | null;
  name: string | null;
  type: 'google' | 'email' | 'guest';
  deviceId: string;
  createdAt: number;
  isAdmin?: boolean;
  /** 4-digit emergency exit PIN set at registration */
  emergencyPin?: string;
  /** Timestamps of emergency exits used today */
  emergencyExitLog?: number[];

  // ── Subscription & trial ──────────────────────────────────────────────────
  accountStatus: AccountStatus;
  /** When trial clock started (first app open / registration) */
  trialStartAt?: number;
  /** When trial ends (computed: trialStartAt + N days) */
  trialEndAt?: number;
  /** Active subscription start */
  subscriptionStartAt?: number;
  /** Active subscription end */
  subscriptionEndAt?: number;
  /** Current paid plan */
  currentPlan?: SubscriptionPlan | null;

  /** Legacy — kept for backward compat; use accountStatus instead */
  guestExpiresAt?: number;
  subscriptionStatus?: 'free' | 'premium' | 'expired';
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

  // ── Subscription helpers ──────────────────────────────────────────────────
  /** Returns true if user has access (admin, active trial, or active subscription) */
  hasAccess: () => boolean;
  /** Remaining trial days (0 if not on trial) */
  trialDaysLeft: () => number;
  /** Remaining subscription days (0 if not subscribed) */
  subscriptionDaysLeft: () => number;
  /** Computed account status that never goes stale */
  getAccountStatus: () => AccountStatus;
  /** Apply a subscription granted by backend (admin or payment approval) */
  applySubscription: (plan: SubscriptionPlan, startAt: number, endAt: number) => void;
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
        const now = Date.now();
        const trialEndAt = now + GUEST_TRIAL_DAYS * 24 * 60 * 60 * 1000;
        const guestUser: User = {
          id: uuidv4(),
          email: null,
          name: 'ضيف',
          type: 'guest',
          guestExpiresAt: trialEndAt,
          accountStatus: 'guest_trial',
          trialStartAt: now,
          trialEndAt,
          subscriptionStatus: 'free',
          deviceId: getDeviceId(),
          createdAt: now,
        };
        set({ user: guestUser, isLoading: false });
      },

      expireGuest: () => {
        const state = get();
        if (!state.user || state.user.type !== 'guest') return;
        set({
          user: {
            ...state.user,
            accountStatus: 'expired',
            subscriptionStatus: 'expired',
            guestExpiresAt: Date.now(),
          },
        });
      },

      isGuestExpired: () => {
        const state = get();
        if (!state.user) return false;
        if (state.user.isAdmin) return false;
        return get().getAccountStatus() === 'expired' || get().getAccountStatus() === 'suspended';
      },

      getGuestTimeLeft: () => {
        const state = get();
        if (!state.user || state.user.type !== 'guest') return 0;
        const endAt = state.user.trialEndAt ?? state.user.guestExpiresAt ?? 0;
        return Math.max(0, endAt - Date.now());
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

      // ── Subscription helpers ────────────────────────────────────────────
      getAccountStatus: (): AccountStatus => {
        const { user } = get();
        if (!user) return 'expired';
        if (user.isAdmin) return 'active'; // admin always active
        if (user.accountStatus === 'suspended') return 'suspended';

        // Active paid subscription?
        if (user.subscriptionEndAt && Date.now() < user.subscriptionEndAt) {
          return 'active';
        }

        // On trial?
        const trialEnd = user.trialEndAt ?? user.guestExpiresAt;
        if (trialEnd && Date.now() < trialEnd) {
          return user.type === 'guest' ? 'guest_trial' : 'registered_trial';
        }

        return 'expired';
      },

      hasAccess: (): boolean => {
        const { user } = get();
        if (!user) return false;
        const status = get().getAccountStatus();
        return status === 'active' || status === 'guest_trial' || status === 'registered_trial';
      },

      trialDaysLeft: (): number => {
        const { user } = get();
        if (!user) return 0;
        const trialEnd = user.trialEndAt ?? user.guestExpiresAt;
        if (!trialEnd) return 0;
        const msLeft = trialEnd - Date.now();
        return Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
      },

      subscriptionDaysLeft: (): number => {
        const { user } = get();
        if (!user || !user.subscriptionEndAt) return 0;
        const msLeft = user.subscriptionEndAt - Date.now();
        return Math.max(0, Math.ceil(msLeft / (24 * 60 * 60 * 1000)));
      },

      applySubscription: (plan, startAt, endAt) => {
        const { user } = get();
        if (!user) return;
        set({
          user: {
            ...user,
            accountStatus: 'active',
            subscriptionStatus: 'premium',
            currentPlan: plan,
            subscriptionStartAt: startAt,
            subscriptionEndAt: endAt,
          },
        });
      },
    }),
    {
      name: 'zeroEscape_auth',
    }
  )
);
