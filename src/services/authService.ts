import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  type User as FirebaseAuthUser,
} from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { User, ADMIN_EMAIL } from '../store/authStore';

const googleProvider = new GoogleAuthProvider();

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
      type: 'google',
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
      const result = await signInWithPopup(auth, googleProvider);
      return authService.normalizeFirebaseUser(result.user);
    } catch (error) {
      console.error('Google sign-in error:', error);
      throw error;
    }
  },

  signUpWithEmail: async (name: string, email: string, password: string): Promise<User> => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const userDoc: User = {
      id: result.user.uid,
      email: result.user.email,
      name,
      type: 'google',
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
    const result = await signInAnonymously(auth);
    const guestUser: User = {
      id: result.user.uid,
      email: null,
      name: 'ضيف',
      type: 'guest',
      guestExpiresAt: Date.now() + 24 * 60 * 60 * 1000,
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
