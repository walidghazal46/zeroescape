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

      setUser: (user) => set({ user, isLoading: false }),

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
    }),
    {
      name: 'zeroEscape_auth',
    }
  )
);
