import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SplashScreen } from './components/SplashScreen';
import { LoginScreen } from './components/LoginScreen';
import { SignUpScreen } from './components/SignUpScreen';
import { OnboardingScreen } from './components/OnboardingScreen';
import { PermissionsScreen } from './components/PermissionsScreen';
import { HomeScreen } from './components/HomeScreen';
import { StartSessionScreen } from './components/StartSessionScreen';
import { BlockedAppsScreen } from './components/BlockedAppsScreen';
import { WebProtectionScreen } from './components/WebProtectionScreen';
import { ActiveSessionScreen } from './components/ActiveSessionScreen';
import { BlockInterceptScreen } from './components/BlockInterceptScreen';
import { RestartRecoveryScreen } from './components/RestartRecoveryScreen';
import { EmergencyExitScreen } from './components/EmergencyExitScreen';
import { SessionCompleteScreen } from './components/SessionCompleteScreen';
import { StatisticsScreen } from './components/StatisticsScreen';
import { SettingsScreen } from './components/SettingsScreen';
import { GuestExpirationScreen } from './components/GuestExpirationScreen';
import { SubscriptionScreen } from './components/SubscriptionScreen';
import { useAuthStore } from '../store/authStore';
import { usePreferencesStore } from '../store/preferencesStore';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import { useAndroidBack } from '../hooks/useAndroidBack';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isGuestExpired } = useAuthStore();
  const { onboardingCompleted } = usePreferencesStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin always has full access — never blocked
  if (user.isAdmin) {
    return <>{children}</>;
  }

  if (user.type === 'guest' && isGuestExpired()) {
    return <Navigate to="/subscription-required" replace />;
  }

  if (!onboardingCompleted) {
    return <Navigate to="/onboarding" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const { user, setLoading, setUser } = useAuthStore();

  useEffect(() => {
    setLoading(true);

    // Handle Google redirect sign-in result (used on Android WebView)
    authService.handleGoogleRedirectResult().then((redirectUser) => {
      if (redirectUser) {
        setUser(redirectUser);
      }
    });

    const unsubscribe = authService.subscribeToAuthChanges((firebaseUser) => {
      const persistedUser = useAuthStore.getState().user;

      if (firebaseUser) {
        setUser(firebaseUser);
        return;
      }

      if (persistedUser?.type === 'guest') {
        setLoading(false);
        return;
      }

      setUser(null);
    });

    return unsubscribe;
  }, [setLoading, setUser]);

  return (
    <div className="dark w-full max-w-full overflow-x-hidden">
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </div>
  );
}

/** Inner component — must live inside BrowserRouter to use Router hooks */
function AppRoutes() {
  const { showExitDialog, dismissExitDialog, confirmExit } = useAndroidBack();
  const { user } = useAuthStore();

  return (
    <>
    <Routes>
      <Route path="/" element={<SplashScreen />} />
      <Route path="/login" element={<LoginScreen />} />
      <Route path="/signup" element={<SignUpScreen />} />
      <Route path="/onboarding" element={<OnboardingScreen />} />
      <Route path="/permissions" element={<PermissionsScreen />} />
      <Route path="/home" element={<ProtectedRoute><HomeScreen /></ProtectedRoute>} />
      <Route path="/start-session" element={<ProtectedRoute><StartSessionScreen /></ProtectedRoute>} />
      <Route path="/blocked-apps" element={<ProtectedRoute><BlockedAppsScreen /></ProtectedRoute>} />
      <Route path="/web-protection" element={<ProtectedRoute><WebProtectionScreen /></ProtectedRoute>} />
      <Route path="/active-session" element={<ProtectedRoute><ActiveSessionScreen /></ProtectedRoute>} />
      <Route path="/block-intercept" element={<ProtectedRoute><BlockInterceptScreen /></ProtectedRoute>} />
      <Route path="/restart-recovery" element={<ProtectedRoute><RestartRecoveryScreen /></ProtectedRoute>} />
      <Route path="/emergency-exit" element={<ProtectedRoute><EmergencyExitScreen /></ProtectedRoute>} />
      <Route path="/session-complete" element={<ProtectedRoute><SessionCompleteScreen /></ProtectedRoute>} />
      <Route path="/statistics" element={<ProtectedRoute><StatisticsScreen /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
      <Route path="/guest-expiration" element={<ProtectedRoute><GuestExpirationScreen /></ProtectedRoute>} />
      <Route path="/subscription" element={<SubscriptionScreen />} />
      <Route path="/subscription-required" element={<SubscriptionScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    {/* ── In-app exit confirmation dialog ─────────────────────────────── */}
    {showExitDialog && (
      <div
        className="fixed inset-0 bg-black/70 flex items-end justify-center z-[9999] pb-safe"
        style={{ paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)` }}
        onClick={dismissExitDialog}
      >
        <div
          className="w-full max-w-sm bg-slate-900 border border-slate-700 rounded-t-2xl p-6 text-right"
          onClick={(e) => e.stopPropagation()}
        >
          <h2 className="text-white text-lg font-bold mb-2">هل تريد الخروج من التطبيق؟</h2>
          <p className="text-slate-400 text-sm mb-6 leading-relaxed">سيتم إغلاق ZeroEscape No.1</p>
          <div className="flex gap-3">
            <button
              onClick={confirmExit}
              className="flex-1 h-12 rounded-xl bg-red-500/20 border border-red-500/30 text-red-300 font-medium hover:bg-red-500/30 transition"
            >
              نعم، خروج
            </button>
            <button
              onClick={dismissExitDialog}
              className="flex-1 h-12 rounded-xl bg-slate-800 border border-slate-700 text-white font-medium hover:bg-slate-700 transition"
            >
              لا، ابقَ
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  );
}