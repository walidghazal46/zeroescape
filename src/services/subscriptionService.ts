/**
 * subscriptionService.ts
 * ──────────────────────────────────────────────────────────────────────────
 * All subscription, trial, device-binding, payment-order, and admin CRUD
 * operations backed by Firebase Firestore.
 *
 * Firestore collections:
 *   users/{uid}           – user profile + subscription state
 *   devices/{deviceId}    – device-to-user binding
 *   payment_orders/{oid}  – manual and Google Play payment requests
 *   audit_logs/{lid}      – admin action log
 *
 * Security: NEVER rely solely on client-side state for access control.
 * Firestore Security Rules (deploy separately) enforce:
 *   - Only the owning user or admin can read their subscription doc
 *   - No client can write subscriptionEndAt or accountStatus directly
 *   - Admin writes are protected via custom claims or server-side validation
 * ──────────────────────────────────────────────────────────────────────────
 */

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  limit,
  where,
  serverTimestamp,
  Timestamp,
  deleteDoc,
  writeBatch,
} from 'firebase/firestore';
import { db } from '../config/firebase';
import type { AccountStatus, SubscriptionPlan } from '../store/authStore';

// ─── Plan definitions ──────────────────────────────────────────────────────
export interface PlanDef {
  id: SubscriptionPlan;
  nameAr: string;
  nameEn: string;
  price: number;       // USD
  durationDays: number;
  badgeAr?: string;
  badgeEn?: string;
}

export const SUBSCRIPTION_PLANS: PlanDef[] = [
  { id: 'monthly',   nameAr: 'شهري',       nameEn: 'Monthly',   price: 6,  durationDays: 30  },
  { id: 'quarterly', nameAr: '3 شهور',     nameEn: '3 Months',  price: 15, durationDays: 90,  badgeAr: 'وفّر 17%', badgeEn: 'Save 17%' },
  { id: 'biannual',  nameAr: '6 شهور',     nameEn: '6 Months',  price: 28, durationDays: 180, badgeAr: 'وفّر 22%', badgeEn: 'Save 22%' },
  { id: 'annual',    nameAr: 'سنة كاملة',  nameEn: 'Annual',    price: 50, durationDays: 365, badgeAr: 'الأفضل', badgeEn: 'Best Value' },
];

// ─── Firestore document shapes ─────────────────────────────────────────────
export interface UserDoc {
  id: string;
  email: string | null;
  name: string | null;
  type: 'google' | 'email' | 'guest';
  deviceId: string;
  accountStatus: AccountStatus;
  trialStartAt: number | null;
  trialEndAt: number | null;
  subscriptionStartAt: number | null;
  subscriptionEndAt: number | null;
  currentPlan: SubscriptionPlan | null;
  createdAt: number;
  lastSeen: number;
  isAdmin: boolean;
  notes: string;
}

export type OrderStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type PaymentMethod = 'google_play' | 'instapay' | 'cash';

export interface PaymentOrder {
  orderId: string;
  userId: string;
  email: string;
  deviceId: string;
  plan: SubscriptionPlan;
  planPrice: number;
  paymentMethod: PaymentMethod;
  status: OrderStatus;
  createdAt: number;
  processedAt: number | null;
  adminNote: string;
  proofUrl: string;
  notes: string;
}

export interface AuditLog {
  action: string;
  targetUserId: string;
  adminId: string;
  timestamp: number;
  details: string;
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  subscribers: number;
  expired: number;
  pendingOrders: number;
  trialAccounts: number;
  guestAccounts: number;
  suspendedAccounts: number;
}

// ─── Helpers ───────────────────────────────────────────────────────────────
const toMs = (v: unknown): number | null => {
  if (v == null) return null;
  if (typeof v === 'number') return v;
  if (v instanceof Timestamp) return v.toMillis();
  return null;
};

const generateOrderId = (): string => {
  const ts = Date.now().toString(36).toUpperCase();
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `ZE-${ts}-${rand}`;
};

// ─── Public API ────────────────────────────────────────────────────────────
export const subscriptionService = {

  // ── Google Play checkout stub (Coming Soon) ──────────────────────────────
  /** Launches Google Play billing flow. Currently stubbed — returns null. */
  launchGooglePlayBilling: async (_plan: SubscriptionPlan): Promise<{ launched: boolean }> => {
    // TODO: Integrate with Android billing bridge:
    //   window.Android?.launchBilling(plan)
    // Google Play Subscriptions must be the primary billing method per Play policy.
    return { launched: false };
  },

  // ── Sync user subscription from Firestore ────────────────────────────────
  /** Fetch the latest subscription state for a user from Firestore.
   *  Returns null if the document doesn't exist yet. */
  fetchUserDoc: async (userId: string): Promise<UserDoc | null> => {
    try {
      const snap = await getDoc(doc(db, 'users', userId));
      if (!snap.exists()) return null;
      const d = snap.data();
      return {
        id: snap.id,
        email: d.email ?? null,
        name: d.name ?? null,
        type: d.type ?? 'email',
        deviceId: d.deviceId ?? '',
        accountStatus: d.accountStatus ?? 'expired',
        trialStartAt: toMs(d.trialStartAt),
        trialEndAt: toMs(d.trialEndAt),
        subscriptionStartAt: toMs(d.subscriptionStartAt),
        subscriptionEndAt: toMs(d.subscriptionEndAt),
        currentPlan: d.currentPlan ?? null,
        createdAt: toMs(d.createdAt) ?? Date.now(),
        lastSeen: toMs(d.lastSeen) ?? Date.now(),
        isAdmin: d.isAdmin ?? false,
        notes: d.notes ?? '',
      };
    } catch {
      return null;
    }
  },

  // ── Device binding ────────────────────────────────────────────────────────
  /**
   * Check if the given deviceId is already bound to a DIFFERENT user.
   * Returns the conflicting userId, or null if it's free / bound to same user.
   */
  checkDeviceBinding: async (deviceId: string, currentUserId: string): Promise<string | null> => {
    try {
      const snap = await getDoc(doc(db, 'devices', deviceId));
      if (!snap.exists()) return null;
      const bound = snap.data().userId as string | undefined;
      if (!bound || bound === currentUserId) return null;
      return bound; // conflict
    } catch {
      return null; // treat network error as no conflict (fail-open)
    }
  },

  /** Bind a device to a user. Called after successful login. */
  bindDevice: async (
    deviceId: string,
    userId: string,
    email: string | null,
    trialInfo?: { type: 'guest' | 'registered'; trialEndAt: number },
  ): Promise<void> => {
    const snap = await getDoc(doc(db, 'devices', deviceId));
    const existing = snap.exists() ? snap.data() : null;
    const trialField = trialInfo?.type === 'guest' ? 'guestTrialEndAt' : 'registeredTrialEndAt';
    await setDoc(doc(db, 'devices', deviceId), {
      userId,
      email: email ?? '',
      boundAt: serverTimestamp(),
      lastSeen: serverTimestamp(),
      platform: 'android',
      // Only write trial end if not already recorded for this type
      ...(trialInfo && !existing?.[trialField] ? { [trialField]: trialInfo.trialEndAt } : {}),
    }, { merge: true });
  },

  /** Get the trial end timestamp stored for this device, or null if never had a trial. */
  getDeviceTrialEndAt: async (deviceId: string, type: 'guest' | 'registered'): Promise<number | null> => {
    try {
      const snap = await getDoc(doc(db, 'devices', deviceId));
      if (!snap.exists()) return null;
      const field = type === 'guest' ? 'guestTrialEndAt' : 'registeredTrialEndAt';
      const val = snap.data()[field];
      return typeof val === 'number' ? val : null;
    } catch {
      return null;
    }
  },

  /** Unbind a device (admin action). */
  unbindDevice: async (deviceId: string): Promise<void> => {
    await deleteDoc(doc(db, 'devices', deviceId));
  },

  // ── Manual payment orders ─────────────────────────────────────────────────
  /** Create a manual payment order (instapay / cash). Returns the new order. */
  createManualOrder: async (
    userId: string,
    email: string,
    deviceId: string,
    plan: SubscriptionPlan,
    method: Exclude<PaymentMethod, 'google_play'>,
  ): Promise<PaymentOrder> => {
    const planDef = SUBSCRIPTION_PLANS.find(p => p.id === plan)!;
    const order: Omit<PaymentOrder, 'orderId'> = {
      userId,
      email,
      deviceId,
      plan,
      planPrice: planDef.price,
      paymentMethod: method,
      status: 'pending',
      createdAt: Date.now(),
      processedAt: null,
      adminNote: '',
      proofUrl: '',
      notes: '',
    };
    const orderId = generateOrderId();
    await setDoc(doc(db, 'payment_orders', orderId), {
      ...order,
      orderId,
      createdAt: serverTimestamp(),
    });
    // Mirror order ref on user doc for quick lookup
    await updateDoc(doc(db, 'users', userId), {
      lastOrderId: orderId,
      lastOrderStatus: 'pending',
    }).catch(() => {/* user doc may not exist yet – non-fatal */});
    return { ...order, orderId };
  },

  // ── Admin: get all users ──────────────────────────────────────────────────
  getUsers: async (statusFilter?: AccountStatus | 'all', limitN = 200): Promise<UserDoc[]> => {
    let q = query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(limitN));
    if (statusFilter && statusFilter !== 'all') {
      q = query(
        collection(db, 'users'),
        where('accountStatus', '==', statusFilter),
        orderBy('createdAt', 'desc'),
        limit(limitN),
      );
    }
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        id: d.id,
        email: data.email ?? null,
        name: data.name ?? null,
        type: data.type ?? 'email',
        deviceId: data.deviceId ?? '',
        accountStatus: data.accountStatus ?? 'expired',
        trialStartAt: toMs(data.trialStartAt),
        trialEndAt: toMs(data.trialEndAt),
        subscriptionStartAt: toMs(data.subscriptionStartAt),
        subscriptionEndAt: toMs(data.subscriptionEndAt),
        currentPlan: data.currentPlan ?? null,
        createdAt: toMs(data.createdAt) ?? 0,
        lastSeen: toMs(data.lastSeen) ?? 0,
        isAdmin: data.isAdmin ?? false,
        notes: data.notes ?? '',
      };
    });
  },

  // ── Admin: get all orders ────────────────────────────────────────────────
  getOrders: async (statusFilter?: OrderStatus | 'all', limitN = 200): Promise<PaymentOrder[]> => {
    let q = query(collection(db, 'payment_orders'), orderBy('createdAt', 'desc'), limit(limitN));
    if (statusFilter && statusFilter !== 'all') {
      q = query(
        collection(db, 'payment_orders'),
        where('status', '==', statusFilter),
        orderBy('createdAt', 'desc'),
        limit(limitN),
      );
    }
    const snap = await getDocs(q);
    return snap.docs.map((d) => {
      const data = d.data();
      return {
        orderId: d.id,
        userId: data.userId ?? '',
        email: data.email ?? '',
        deviceId: data.deviceId ?? '',
        plan: data.plan ?? 'monthly',
        planPrice: data.planPrice ?? 0,
        paymentMethod: data.paymentMethod ?? 'cash',
        status: data.status ?? 'pending',
        createdAt: toMs(data.createdAt) ?? 0,
        processedAt: toMs(data.processedAt),
        adminNote: data.adminNote ?? '',
        proofUrl: data.proofUrl ?? '',
        notes: data.notes ?? '',
      };
    });
  },

  // ── Admin: approve order → activate subscription ──────────────────────────
  approveOrder: async (orderId: string, adminId: string): Promise<void> => {
    const orderSnap = await getDoc(doc(db, 'payment_orders', orderId));
    if (!orderSnap.exists()) throw new Error('Order not found');
    const order = orderSnap.data() as PaymentOrder & { createdAt: unknown };
    const planDef = SUBSCRIPTION_PLANS.find(p => p.id === order.plan);
    if (!planDef) throw new Error('Unknown plan');

    const now = Date.now();
    const endAt = now + planDef.durationDays * 24 * 60 * 60 * 1000;

    const batch = writeBatch(db);

    // Update order
    batch.update(doc(db, 'payment_orders', orderId), {
      status: 'approved',
      processedAt: serverTimestamp(),
    });

    // Update user subscription
    batch.update(doc(db, 'users', order.userId), {
      accountStatus: 'active',
      subscriptionStatus: 'premium',
      currentPlan: order.plan,
      subscriptionStartAt: now,
      subscriptionEndAt: endAt,
      lastOrderStatus: 'approved',
    });

    await batch.commit();

    // Audit log
    await addDoc(collection(db, 'audit_logs'), {
      action: 'approve_order',
      targetUserId: order.userId,
      orderId,
      adminId,
      timestamp: serverTimestamp(),
      details: `Plan: ${order.plan}, endAt: ${new Date(endAt).toISOString()}`,
    });
  },

  // ── Admin: reject order ───────────────────────────────────────────────────
  rejectOrder: async (orderId: string, adminId: string, reason: string): Promise<void> => {
    await updateDoc(doc(db, 'payment_orders', orderId), {
      status: 'rejected',
      adminNote: reason,
      processedAt: serverTimestamp(),
    });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'reject_order',
      orderId,
      adminId,
      timestamp: serverTimestamp(),
      details: reason,
    });
  },

  // ── Admin: suspend order ─────────────────────────────────────────────────
  suspendOrder: async (orderId: string, adminId: string): Promise<void> => {
    await updateDoc(doc(db, 'payment_orders', orderId), {
      status: 'suspended',
      processedAt: serverTimestamp(),
    });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'suspend_order',
      orderId,
      adminId,
      timestamp: serverTimestamp(),
      details: '',
    });
  },

  // ── Admin: delete order ───────────────────────────────────────────────────
  deleteOrder: async (orderId: string, adminId: string): Promise<void> => {
    // Soft delete — set status to 'rejected' with note instead of removing
    await updateDoc(doc(db, 'payment_orders', orderId), {
      status: 'rejected',
      adminNote: 'Deleted by admin',
      processedAt: serverTimestamp(),
    });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'delete_order',
      orderId,
      adminId,
      timestamp: serverTimestamp(),
      details: '',
    });
  },

  // ── Admin: update user status ─────────────────────────────────────────────
  setUserStatus: async (userId: string, status: AccountStatus, adminId: string): Promise<void> => {
    await updateDoc(doc(db, 'users', userId), { accountStatus: status });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'set_user_status',
      targetUserId: userId,
      adminId,
      timestamp: serverTimestamp(),
      details: status,
    });
  },

  // ── Admin: extend trial ───────────────────────────────────────────────────
  extendTrial: async (userId: string, extraDays: number, adminId: string): Promise<void> => {
    const snap = await getDoc(doc(db, 'users', userId));
    if (!snap.exists()) throw new Error('User not found');
    const data = snap.data();
    const currentEnd = toMs(data.trialEndAt) ?? Date.now();
    const newEnd = Math.max(currentEnd, Date.now()) + extraDays * 24 * 60 * 60 * 1000;
    await updateDoc(doc(db, 'users', userId), {
      trialEndAt: newEnd,
      accountStatus: 'registered_trial',
    });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'extend_trial',
      targetUserId: userId,
      adminId,
      timestamp: serverTimestamp(),
      details: `+${extraDays} days, newEnd: ${new Date(newEnd).toISOString()}`,
    });
  },

  // ── Admin: grant subscription manually ───────────────────────────────────
  grantSubscription: async (
    userId: string,
    plan: SubscriptionPlan,
    adminId: string,
  ): Promise<void> => {
    const planDef = SUBSCRIPTION_PLANS.find(p => p.id === plan)!;
    const now = Date.now();
    const endAt = now + planDef.durationDays * 24 * 60 * 60 * 1000;
    await updateDoc(doc(db, 'users', userId), {
      accountStatus: 'active',
      subscriptionStatus: 'premium',
      currentPlan: plan,
      subscriptionStartAt: now,
      subscriptionEndAt: endAt,
    });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'grant_subscription',
      targetUserId: userId,
      adminId,
      timestamp: serverTimestamp(),
      details: `Plan: ${plan}, endAt: ${new Date(endAt).toISOString()}`,
    });
  },

  // ── Admin: cancel subscription ────────────────────────────────────────────
  cancelSubscription: async (userId: string, adminId: string): Promise<void> => {
    await updateDoc(doc(db, 'users', userId), {
      accountStatus: 'expired',
      subscriptionStatus: 'expired',
      currentPlan: null,
      subscriptionEndAt: Date.now(),
    });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'cancel_subscription',
      targetUserId: userId,
      adminId,
      timestamp: serverTimestamp(),
      details: '',
    });
  },

  // ── Admin: reset device binding ───────────────────────────────────────────
  resetDeviceBinding: async (userId: string, adminId: string): Promise<void> => {
    // Find all devices bound to this user and remove them
    const q = query(collection(db, 'devices'), where('userId', '==', userId));
    const snap = await getDocs(q);
    const batch = writeBatch(db);
    snap.docs.forEach(d => batch.delete(d.ref));
    await batch.commit();
    await addDoc(collection(db, 'audit_logs'), {
      action: 'reset_device_binding',
      targetUserId: userId,
      adminId,
      timestamp: serverTimestamp(),
      details: `Removed ${snap.size} device(s)`,
    });
  },

  // ── Admin: add note to user ───────────────────────────────────────────────
  addUserNote: async (userId: string, note: string, adminId: string): Promise<void> => {
    const existing = await getDoc(doc(db, 'users', userId));
    const prev = existing.exists() ? (existing.data().notes ?? '') : '';
    const timestamp = new Date().toLocaleDateString('ar-EG');
    const newNote = `[${timestamp}] ${note}\n${prev}`.trim();
    await updateDoc(doc(db, 'users', userId), { notes: newNote });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'add_note',
      targetUserId: userId,
      adminId,
      timestamp: serverTimestamp(),
      details: note,
    });
  },

  // ── Admin: suspend user ───────────────────────────────────────────────────
  suspendUser: async (userId: string, adminId: string): Promise<void> => {
    await subscriptionService.setUserStatus(userId, 'suspended', adminId);
  },

  // ── Admin: delete user ────────────────────────────────────────────────────
  deleteUser: async (userId: string, adminId: string): Promise<void> => {
    // Soft delete: set status to suspended and mark deleted
    await updateDoc(doc(db, 'users', userId), {
      accountStatus: 'suspended',
      deletedAt: serverTimestamp(),
      deletedBy: adminId,
    });
    await addDoc(collection(db, 'audit_logs'), {
      action: 'delete_user',
      targetUserId: userId,
      adminId,
      timestamp: serverTimestamp(),
      details: '',
    });
  },

  // ── Admin: dashboard stats ────────────────────────────────────────────────
  getDashboardStats: async (): Promise<DashboardStats> => {
    const allUsers = await subscriptionService.getUsers('all', 1000);
    const allOrders = await subscriptionService.getOrders('all', 1000);

    return {
      totalUsers: allUsers.length,
      activeUsers: allUsers.filter(u => u.accountStatus === 'active' || u.accountStatus === 'registered_trial' || u.accountStatus === 'guest_trial').length,
      subscribers: allUsers.filter(u => u.accountStatus === 'active').length,
      expired: allUsers.filter(u => u.accountStatus === 'expired').length,
      pendingOrders: allOrders.filter(o => o.status === 'pending').length,
      trialAccounts: allUsers.filter(u => u.accountStatus === 'registered_trial').length,
      guestAccounts: allUsers.filter(u => u.accountStatus === 'guest_trial').length,
      suspendedAccounts: allUsers.filter(u => u.accountStatus === 'suspended').length,
    };
  },

  // ── Legacy stub (kept for backward compat) ────────────────────────────────
  createCheckoutSession: async (_plan: 'monthly' | 'yearly') => {
    return { sessionId: '', url: '' };
  },
};
