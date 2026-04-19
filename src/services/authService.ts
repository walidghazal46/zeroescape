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
import { User, ADMIN_EMAIL } from '../store/authStore';

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

const buildLocalGuestUser = (): User => ({
  id: `guest_${Date.now()}`,
  email: null,
  name: 'ضيف',
  type: 'guest',
  guestExpiresAt: Date.now() + 48 * 60 * 60 * 1000,
  subscriptionStatus: 'free',
  deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
  createdAt: Date.now(),
});

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

    if (existingUser.exists()) {
      const userDoc = existingUser.data() as User;
      const isAdmin = firebaseUser.email === ADMIN_EMAIL;

      await setDoc(doc(db, 'users', firebaseUser.uid), {
        deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
        lastLogin: serverTimestamp(),
        isAdmin,
        // Always keep admin premium even if DB has something else
        subscriptionStatus: isAdmin ? 'premium' : userDoc.subscriptionStatus,
      }, { merge: true });

      return {
        ...userDoc,
        isAdmin,
        subscriptionStatus: isAdmin ? 'premium' : userDoc.subscriptionStatus,
        deviceId: localStorage.getItem('zeroEscape_deviceId') || userDoc.deviceId,
      };
    }

    const isAdmin = firebaseUser.email === ADMIN_EMAIL;

    const fallbackUser: User = {
      id: firebaseUser.uid,
      email: firebaseUser.email,
      name: firebaseUser.displayName,
      type: getUserTypeFromProvider(firebaseUser),
      subscriptionStatus: isAdmin ? 'premium' : 'free',
      deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
      createdAt: Date.now(),
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

        if (bridge?.startGoogleSignIn) {
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
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userDoc: User = {
      id: result.user.uid,
      email: result.user.email,
      name,
      type: 'email',
      subscriptionStatus: 'free',
      deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
      createdAt: Date.now(),
    };

    await setDoc(doc(db, 'users', result.user.uid), {
      ...userDoc,
      lastLogin: serverTimestamp(),
    }, { merge: true });

    return userDoc;
  },

  createGuestUser: async (): Promise<User> => {
    try {
      const result = await signInAnonymously(auth);
      const guestUser: User = {
        id: result.user.uid,
        email: null,
        name: 'ضيف',
        type: 'guest',
        guestExpiresAt: Date.now() + 48 * 60 * 60 * 1000,
        subscriptionStatus: 'free',
        deviceId: localStorage.getItem('zeroEscape_deviceId') || '',
        createdAt: Date.now(),
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
    return authService.normalizeFirebaseUser(result.user);
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
        const user = await authService.normalizeFirebaseUser(firebaseUser);
        onResolved(user);
      } catch (error) {
        console.error('Auth sync error:', error);
        onResolved(null);
      }
    });
  },
};
