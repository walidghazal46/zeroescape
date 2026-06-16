import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache, persistentMultipleTabManager } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';
import { getRemoteConfig, fetchAndActivate, getValue } from 'firebase/remote-config';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Use a more robust Firestore initialization for WebView
// Disabling persistent Multiple Tab Manager as it can conflict in some WebViews
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({}),
});

export const functions = getFunctions(app);

// ── Remote Config ─────────────────────────────────────────────────────────────
export const remoteConfig = getRemoteConfig(app);
// Minimum fetch interval: 1 hour in production, 0 in dev
remoteConfig.settings.minimumFetchIntervalMillis =
  import.meta.env.DEV ? 0 : 3600_000;
// Default values used until Remote Config is fetched.
// NOTE: This default intentionally does NOT contain the real PIN.
// The real PIN lives only in Firebase Remote Config (server-side).
remoteConfig.defaultConfig = {
  admin_pin: '000000',
};

/**
 * Fetch latest Remote Config values.
 * Returns the current admin_pin string (from Remote Config or default).
 * Call this once on app init or when AdminPinScreen mounts.
 */
export async function getAdminPin(): Promise<string> {
  try {
    await fetchAndActivate(remoteConfig);
  } catch {
    // Non-fatal — will use cached/default values
  }
  return getValue(remoteConfig, 'admin_pin').asString();
}
