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
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isGuestExpired } = useAuthStore();

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

  return <>{children}</>;
}

export default function App() {
  const { user, setLoading, setUser } = useAuthStore();

  useEffect(() => {
    setLoading(true);

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
    <div className="dark">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}