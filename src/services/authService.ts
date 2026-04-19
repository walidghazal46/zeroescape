import {
  createUserWithEmailAndPassword,
  type AuthError,
  onAuthStateChanged,
  signInAnonymously,
  signInWithCredential,
  signInWithEmailAndPassword,
  signInWithPopup,
  signInWithRedirect,
  getRedirectResult,
  GoogleAuthProvider,
  signOut,
  type User as FirebaseAuthUser,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { User, ADMIN_EMAIL, REGISTERED_TRIAL_DAYS, GUEST_TRIAL_DAYS, type AccountStatus } from '../store/authStore';
import { subscriptionService } from './subscriptionService';

const googleProvider = new GoogleAuthProvider();
googleProvider.addScope('profile');
googleProvider.addScope('email');

/** Returns true when running inside an Android WebView (no real browser engine) */
const isAndroidWebView = (): boolean => {
  const ua = navigator.userAgent || '';
  // Android WebView sets "wv" flag in the user agent
  return /Android.*wv/.test(ua) || typeof (window as any).Android !== 'undefined';
};

type AndroidBridge = {
  startGoogleSignIn?: () => void;
};

type AndroidWindow = Window & {
  Android?: AndroidBridge;
  onAndroidGoogleSignIn?: (status: string, payload: string) => void;
};

const getUserTypeFromProvider = (firebaseUser: FirebaseAuthUser): User['type'] => {
  const providerIds = firebaseUser.providerData.map((p) => p.providerId);

  if (providerIds.includes('google.com')) {
    return 'google';
  }

  if (providerIds.includes('password')) {
    return 'email';
  }

  return 'email';
};

export const getAuthErrorCode = (error: unknown): string => {
  const authError = error as AuthError;
  return authError?.code || 'auth/unknown';
};

const buildLocalGuestUser = (): User => {
  const now = Date.now();
  return {
    id: `guest_${now}`,
    email: null,
    name: 'ضيف',
    type: 'guest',
    accountStatus: 'guest_trial',
    trialStartAt: now,
    trialEndAt: now + GUEST_TRIAL_DAYS * 24 * 60 * 60 * 1000,
    guestExpiresAt: now + GUEST_TRIAL_DAYS * 24 * 60 * 60 * 1000,
    subscriptionStatus: 'free',
    deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
    createdAt: now,
  };
};

export const authService = {
  normalizeFirebaseUser: async (firebaseUser: FirebaseAuthUser): Promise<User> => {
    if (firebaseUser.isAnonymous) {
      const guestSnapshot = await getDoc(doc(db, 'guests', firebaseUser.uid));

      if (guestSnapshot.exists()) {
        const guestDoc = guestSnapshot.data() as User;

        await setDoc(doc(db, 'guests', firebaseUser.uid), {
          deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
          updatedAt: serverTimestamp(),
        }, { merge: true });

        return {
          ...guestDoc,
          deviceId: localStorage.getItem('zeroEscape_deviceId') || guestDoc.deviceId,
        };
      }

      return authService.createGuestUser();
    }

    const existingUser = await getDoc(doc(db, 'users', firebaseUser.uid));
    const isAdmin = firebaseUser.email === ADMIN_EMAIL;
    const deviceId = localStorage.getItem('zeroEscape_deviceId') || '';

    // ── Device binding check (skip for admin) ────────────────────────────
    if (!isAdmin && deviceId) {
      const conflictUserId = await subscriptionService.checkDeviceBinding(deviceId, firebaseUser.uid);
      if (conflictUserId) {
        // Throw a structured error that LoginScreen can catch and display
        throw Object.assign(
          new Error('This device is already linked to another account.'),
          { code: 'auth/device-conflict', conflictUserId }
        );
      }
    }

    // Bind device in background
    if (deviceId) {
      subscriptionService.bindDevice(deviceId, firebaseUser.uid, firebaseUser.email).catch(
        e => console.warn('bindDevice non-fatal:', e)
      );
    }

    if (existingUser.exists()) {
      const userDoc = existingUser.data() as User;
      // Compute live account status from Firestore dates
      const now = Date.now();
      let accountStatus: AccountStatus = userDoc.accountStatus ?? 'registered_trial';
      if (isAdmin) {
        accountStatus = 'active';
      } else if (accountStatus !== 'suspended') {
        // Re-derive from dates so status doesn't get stale
        if (userDoc.subscriptionEndAt && now < userDoc.subscriptionEndAt) {
          accountStatus = 'active';
        } else if (userDoc.trialEndAt && now < userDoc.trialEndAt) {
          accountStatus = 'registered_trial';
        } else if (userDoc.accountStatus === 'active' || userDoc.accountStatus === 'registered_trial') {
          // Was active/trial but dates say it's over
          accountStatus = 'expired';
        }
      }

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        deviceId,
        lastLogin: serverTimestamp(),
        isAdmin,
        accountStatus,
        subscriptionStatus: isAdmin ? 'premium' : userDoc.subscriptionStatus,
      }, { merge: true });

      return {
        ...userDoc,
        isAdmin,
        accountStatus,
        subscriptionStatus: isAdmin ? 'premium' : userDoc.subscriptionStatus,
        deviceId,
      };
    }

    // ── New user — initialize with trial ─────────────────────────────────
    const now = Date.now();
    const trialEndAt = now + REGISTERED_TRIAL_DAYS * 24 * 60 * 60 * 1000;

    const fallbackUser: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      type: getUserTypeFromProvider(firebaseUser),
      accountStatus: isAdmin ? 'active' : 'registered_trial',
      trialStartAt: now,
      trialEndAt,
      subscriptionStatus: isAdmin ? 'premium' : 'free',
      deviceId,
      createdAt: now,
      isAdmin,
    };

    await setDoc(doc(db, 'users', firebaseUser.uid), {
      ...fallbackUser,
      lastLogin: serverTimestamp(),
    }, { merge: true });

    return fallbackUser;
  },

  signInWithGoogle: async (): Promise<User> => {
    try {
      if (isAndroidWebView()) {
        const androidWindow = window as AndroidWindow;
        const bridge = androidWindow.Android;

        if (bridge && bridge.startGoogleSignIn) {
          return await new Promise<User>((resolve, reject) => {
            let settled = false;

            const cleanup = () => {
              androidWindow.onAndroidGoogleSignIn = undefined;
            };

            // Timeout after 60 seconds to prevent infinite hang
            const timeoutId = setTimeout(() => {
              if (settled) return;
              settled = true;
              cleanup();
              reject(Object.assign(new Error('Google sign-in timed out.'), { code: 'auth/google-signin-timeout' }));
            }, 60_000);

            androidWindow.onAndroidGoogleSignIn = async (status: string, payload: string) => {
              if (settled) return;
              settled = true;
              clearTimeout(timeoutId);
              cleanup();

              if (status !== 'success' || !payload) {
                reject(Object.assign(new Error('Native Google sign-in failed.'), { code: payload || 'auth/google-native-failed' }));
                return;
              }

              try {
                const credential = GoogleAuthProvider.credential(payload);
                const result = await signInWithCredential(auth, credential);
                resolve(await authService.normalizeFirebaseUser(result.user));
              } catch (error) {
                reject(error);
              }
            };

            bridge.startGoogleSignIn();
          });
        }

        // Fallback when native bridge is not available in this Android build.
        throw Object.assign(new Error('Native Google sign-in bridge is unavailable.'), { code: 'auth/google-webview-not-supported' });
      }

      const result = await signInWithPopup(auth, googleProvider);
      return authService.normalizeFirebaseUser(result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  },

  /** Call this once on app startup to capture the result of a Google redirect sign-in */
  handleGoogleRedirectResult: async (): Promise<User | null> => {
    try {
      const result = await getRedirectResult(auth);
      if (result?.user) {
        return authService.normalizeFirebaseUser(result.user);
      }
      return null;
    } catch (error) {
      console.error('Google redirect result error:', error);
      return null;
    }
  },

  signUpWithEmail: async (name: string, email: string, password: string): Promise<User> => {
    // Wrap Firebase Auth call with a timeout — on Android WebView it can hang
    const result = await Promise.race([
      createUserWithEmailAndPassword(auth, email, password),
      new Promise<never>((_, reject) =>
        setTimeout(
          () => reject(Object.assign(new Error('sign-up timed out'), { code: 'auth/timeout' })),
          15000
        )
      ),
    ]);

    const now = Date.now();
    const deviceId = localStorage.getItem('zeroEscape_deviceId') || '';
    const trialEndAt = now + REGISTERED_TRIAL_DAYS * 24 * 60 * 60 * 1000;

    const userDoc: User = {
      id: result.user.uid,
      email: result.user.email,
      name,
      type: 'email',
      accountStatus: 'registered_trial',
      trialStartAt: now,
      trialEndAt,
      subscriptionStatus: 'free',
      deviceId,
      createdAt: now,
    };

    // Write to Firestore in background — do NOT await so signup never hangs.
    setDoc(doc(db, 'users', result.user.uid), {
      ...userDoc,
      lastLogin: serverTimestamp(),
    }, { merge: true }).catch((e) =>
      console.warn('signUpWithEmail: Firestore write failed (non-fatal):', e)
    );

    // Bind device in background
    if (deviceId) {
      subscriptionService.bindDevice(deviceId, result.user.uid, result.user.email).catch(
        e => console.warn('bindDevice non-fatal:', e)
      );
    }

    return userDoc;
  },

  createGuestUser: async (): Promise<User> => {
    try {
      const result = await signInAnonymously(auth);
      const now = Date.now();
      const guestUser: User = {
        id: result.user.uid,
        email: null,
        name: 'ضيف',
        type: 'guest',
        accountStatus: 'guest_trial',
        trialStartAt: now,
        trialEndAt: now + GUEST_TRIAL_DAYS * 24 * 60 * 60 * 1000,
        guestExpiresAt: now + GUEST_TRIAL_DAYS * 24 * 60 * 60 * 1000,
        subscriptionStatus: 'free',
        deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
        createdAt: now,
      };

      await setDoc(doc(db, 'guests', guestUser.id), {
        ...guestUser,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });

      return guestUser;
    } catch (error) {
      // Keep app testable on mobile even if anonymous auth is disabled/misconfigured.
      console.warn('Anonymous auth failed. Falling back to local guest mode.', error);
      return buildLocalGuestUser();
    }
  },

  signInWithEmail: async (email: string, password: string): Promise<User> => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // normalizeFirebaseUser reads/writes Firestore — run with timeout fallback
    try {
      const userWithTimeout = await Promise.race([
        authService.normalizeFirebaseUser(result.user),
        new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error('firestore-timeout')), 8000)
        ),
      ]);
      return userWithTimeout;
    } catch (e: unknown) {
      // Firestore slow/offline — return minimal user from Firebase Auth
      const isTimeout = e instanceof Error && e.message === 'firestore-timeout';
      if (isTimeout) console.warn('signInWithEmail: Firestore timeout, using Auth data');
      else throw e;
      return {
        id: result.user.uid,
        email: result.user.email,
        name: result.user.displayName,
        type: 'email',
        accountStatus: 'registered_trial',
        subscriptionStatus: 'free',
        deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
        createdAt: Date.now(),
      };
    }
  },

  logout: async (): Promise<void> => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  getUserData: async (userId: string): Promise<User | null> => {
    try {
      const userDoc = await getDoc(doc(db, 'users', userId));
      if (userDoc.exists()) {
        return userDoc.data() as User;
      }
      return null;
    } catch (error) {
      console.error('Get user data error:', error);
      return null;
    }
  },

  saveGuestUser: async (guestUser: User): Promise<void> => {
    try {
      await setDoc(doc(db, 'guests', guestUser.id), {
        ...guestUser,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      }, { merge: true });
    } catch (error) {
      console.error('Save guest user error:', error);
      throw error;
    }
  },

  checkGuestExpiration: (guestUser: User): boolean => {
    return Date.now() >= (guestUser.guestExpiresAt || 0);
  },

  subscribeToAuthChanges: (onResolved: (user: User | null) => void) => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        onResolved(null);
        return;
      }

      try {
        // Race Firestore normalization against a 6-second timeout
        const user = await Promise.race([
          authService.normalizeFirebaseUser(firebaseUser),
          new Promise<never>((_, reject) =>
            setTimeout(() => reject(new Error('firestore-timeout')), 6000)
          ),
        ]);
        onResolved(user);
      } catch (error) {
        // Never call onResolved(null) here — that would log out a freshly
        // signed-up user whose Firestore doc hasn't been written yet.
        // Instead, build a minimal user from Firebase Auth data.
        console.warn('Auth sync: Firestore unavailable, using Auth fallback', error);
        const fallback: User = {
          id: firebaseUser.uid,
          email: firebaseUser.email,
          name: firebaseUser.displayName,
          type: 'email',
          accountStatus: 'registered_trial',
          subscriptionStatus: 'free',
          deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
          createdAt: Date.now(),
        };
        onResolved(fallback);
      }
    });
  },
};
