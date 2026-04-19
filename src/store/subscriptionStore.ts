/**
 * subscriptionStore.ts
 * Local Zustand store that mirrors the subscription state for fast UI reads.
 * Always sync from Firestore on login / resume, never trust this alone for
 * access control — backend rules are the source of truth.
 */
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { SubscriptionPlan, AccountStatus } from './authStore';
import type { PaymentOrder } from '../services/subscriptionService';

export interface SubscriptionState {
  /** Cached accountStatus from last Firestore sync */
  accountStatus: AccountStatus | null;
  currentPlan: SubscriptionPlan | null;
  subscriptionStartAt: number | null;
  subscriptionEndAt: number | null;
  trialStartAt: number | null;
  trialEndAt: number | null;
  /** Last time this was synced from Firestore (ms) */
  lastSyncAt: number | null;
  /** Latest pending/approved orders for current user */
  myOrders: PaymentOrder[];
}

export interface SubscriptionStore extends SubscriptionState {
  /** Overwrite state from a Firestore UserDoc */
  syncFromDoc: (doc: Partial<SubscriptionState>) => void;
  /** Add / update a local order record */
  upsertOrder: (order: PaymentOrder) => void;
  /** Clear all state (on logout) */
  reset: () => void;
}

const INITIAL: SubscriptionState = {
  accountStatus: null,
  currentPlan: null,
  subscriptionStartAt: null,
  subscriptionEndAt: null,
  trialStartAt: null,
  trialEndAt: null,
  lastSyncAt: null,
  myOrders: [],
};

export const useSubscriptionStore = create<SubscriptionStore>()(
  persist(
    (set, get) => ({
      ...INITIAL,

      syncFromDoc: (doc) => {
        set({ ...doc, lastSyncAt: Date.now() });
      },

      upsertOrder: (order) => {
        const existing = get().myOrders;
        const idx = existing.findIndex(o => o.orderId === order.orderId);
        const updated =
          idx >= 0
            ? existing.map((o, i) => (i === idx ? order : o))
            : [order, ...existing].slice(0, 20); // keep last 20
        set({ myOrders: updated });
      },

      reset: () => set(INITIAL),
    }),
    { name: 'zeroescape-subscription' }
  )
);
