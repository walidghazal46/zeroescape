import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { useAuthStore } from '../store/authStore';
import { usePreferencesStore } from '../store/preferencesStore';
import { useSessionStore } from '../store/sessionStore';
import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { authService } from '../services/authService';
import { useAndroidBack } from '../hooks/useAndroidBack';

// ── Lazy-loaded screens (code-split per route) ────────────────────────────────
const SplashScreen            = lazy(() => import('./components/SplashScreen').then(m => ({ default: m.SplashScreen })));
const LoginScreen             = lazy(() => import('./components/LoginScreen').then(m => ({ default: m.LoginScreen })));
const SignUpScreen            = lazy(() => import('./components/SignUpScreen').then(m => ({ default: m.SignUpScreen })));
const OnboardingScreen        = lazy(() => import('./components/OnboardingScreen').then(m => ({ default: m.OnboardingScreen })));
const PermissionsScreen       = lazy(() => import('./components/PermissionsScreen').then(m => ({ default: m.PermissionsScreen })));
const HomeScreen              = lazy(() => import('./components/HomeScreen').then(m => ({ default: m.HomeScreen })));
const StartSessionScreen      = lazy(() => import('./components/StartSessionScreen').then(m => ({ default: m.StartSessionScreen })));
const BlockedAppsScreen       = lazy(() => import('./components/BlockedAppsScreen').then(m => ({ default: m.BlockedAppsScreen })));
const WebProtectionScreen     = lazy(() => import('./components/WebProtectionScreen').then(m => ({ default: m.WebProtectionScreen })));
const ActiveSessionScreen     = lazy(() => import('./components/ActiveSessionScreen').then(m => ({ default: m.ActiveSessionScreen })));
const BlockInterceptScreen    = lazy(() => import('./components/BlockInterceptScreen').then(m => ({ default: m.BlockInterceptScreen })));
const RestartRecoveryScreen   = lazy(() => import('./components/RestartRecoveryScreen').then(m => ({ default: m.RestartRecoveryScreen })));
const EmergencyExitScreen     = lazy(() => import('./components/EmergencyExitScreen').then(m => ({ default: m.EmergencyExitScreen })));
const SessionCompleteScreen   = lazy(() => import('./components/SessionCompleteScreen').then(m => ({ default: m.SessionCompleteScreen })));
const StatisticsScreen        = lazy(() => import('./components/StatisticsScreen').then(m => ({ default: m.StatisticsScreen })));
const SettingsScreen          = lazy(() => import('./components/SettingsScreen').then(m => ({ default: m.SettingsScreen })));
const GuestExpirationScreen   = lazy(() => import('./components/GuestExpirationScreen').then(m => ({ default: m.GuestExpirationScreen })));
const SubscriptionScreen      = lazy(() => import('./components/SubscriptionScreen').then(m => ({ default: m.SubscriptionScreen })));
const ScheduleScreen          = lazy(() => import('./components/ScheduleScreen').then(m => ({ default: m.ScheduleScreen })));
const AdminPinScreen          = lazy(() => import('./components/AdminPinScreen').then(m => ({ default: m.AdminPinScreen })));
const AdminScreen             = lazy(() => import('./components/AdminScreen').then(m => ({ default: m.AdminScreen })));


/** Detects genuine Android WebView (Capacitor / custom bridge) */
function isAndroidApp(): boolean {
  const ua = navigator.userAgent || '';
  return (
    /Android.*wv/.test(ua) ||
    typeof (window as Window & { Android?: unknown }).Android !== 'undefined' ||
    typeof (window as Window & { Capacitor?: unknown }).Capacitor !== 'undefined'
  );
}

function MobileOnlyGuard({ children }: { children: ReactNode }) {
  if (isAndroidApp()) return <>{children}</>;

  return (
    <div
      dir="rtl"
      className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-start gap-6 px-6 py-10 text-center overflow-y-auto"
    >
      {/* Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
      </div>

      {/* Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-[32px]" />
        <img
          src="/icon.png"
          alt="ZeroEscape"
          className="relative w-24 h-24 rounded-[24px] shadow-2xl shadow-black/60"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>

      {/* Headline */}
      <div className="space-y-2">
        <h1 className="text-white text-3xl font-bold tracking-tight">ZeroEscape No.1</h1>
        <p className="text-sky-400 text-sm font-medium tracking-wide uppercase">#1 في منع الإباحية وإدمان الموبايل</p>
      </div>

      {/* Features */}
      <div className="w-full max-w-sm space-y-3 text-right">
        {[
          { icon: '�️', title: 'حجب المواقع الإباحية', desc: 'يحجب المحتوى الإباحي تلقائياً أثناء الجلسة ويمنع الوصول إليه بشكل فعّال.' },
          { icon: '📵', title: 'تحرر من إدمان الموبايل', desc: 'يقطع الوصول للتطبيقات المشتتة ويمنعك من فتحها — انضباط حقيقي لا مجرد رغبة.' },
          { icon: '🔒', title: 'جلسات محمية لا يمكن الخروج منها', desc: 'وضع حماية متكامل يُغلق الموبايل على التطبيق حتى تنتهي الجلسة.' },
          { icon: '🎯', title: 'خطة شخصية لكل هدف', desc: 'حدد هدفك: دراسة · عمل · نوم · إدمان — وسيُخصص التطبيق الخطة تلقائياً.' },
        ].map(({ icon, title, desc }) => (
          <div key={title} className="flex items-start gap-3 bg-slate-900/60 border border-slate-800 rounded-2xl px-4 py-3">
            <span className="text-xl mt-0.5 flex-shrink-0">{icon}</span>
            <div>
              <p className="text-white text-sm font-semibold">{title}</p>
              <p className="text-slate-400 text-xs leading-relaxed mt-0.5">{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Why different */}
      <div className="w-full max-w-sm bg-blue-500/10 border border-blue-500/20 rounded-2xl px-5 py-4 text-right space-y-1">
        <p className="text-blue-400 text-sm font-semibold">💡 لماذا هو الأول؟</p>
        <p className="text-slate-400 text-xs leading-relaxed">
          لأنه لا يكتفي بالتحذير — بل يُغلق الباب أمام الإباحية وإدمان الموبايل بشكل فعلي، دون الاعتماد على الإرادة فقط.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-col items-center gap-3 w-full max-w-sm">
        <div className="flex items-center gap-3 w-full justify-center rounded-2xl border border-slate-700 bg-slate-900 px-6 py-4">
          <div className="w-11 h-11 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0">
            <svg viewBox="0 0 512 512" className="w-6 h-6" aria-hidden="true">
              <path fill="#00d7ff" d="M98 72l228 184-68 55L98 72z" />
              <path fill="#00f076" d="M98 72l160 239-1 1L98 440V72z" />
              <path fill="#ff4f81" d="M98 440l228-184-68-55L98 440z" />
              <path fill="#ffd84d" d="M326 256l46-37c18-15 18-39 0-54l-46-37-69 56 69 72z" />
            </svg>
          </div>
          <div className="text-right">
            <p className="text-white text-sm font-medium">متوفر على Google Play</p>
            <p className="text-slate-500 text-xs">حمّل التطبيق وابدأ أول جلسة تركيز حقيقية</p>
          </div>
        </div>
        <p className="text-slate-600 text-xs">
          لا يمكن استخدام التطبيق من المتصفح
        </p>
      </div>
    </div>
  );
}

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, isGuestExpired, hasAccess } = useAuthStore();
  const { onboardingCompleted } = usePreferencesStore();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Admin always has full access — never blocked
  if (user.isAdmin) {
    return <>{children}</>;
  }

  // Check subscription / trial access
  if (!hasAccess()) {
    return <Navigate to="/subscription-required" replace />;
  }

  // Legacy guest expiry fallback
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
        // Don't overwrite a user that was just set by a direct signUp/signIn call
        // (their uid will already match — safe to update; only skip if uid differs
        // which shouldn't happen, but guard anyway)
        if (!persistedUser || persistedUser.id === firebaseUser.id) {
          setUser(firebaseUser);
        } else {
          // Different uid somehow — trust the direct call, just clear loading
          setLoading(false);
        }
        return;
      }

      // Firebase says no user — but we may have a valid local/anonymous guest
      const isLocalGuest =
        persistedUser?.type === 'guest' &&
        (persistedUser.id.startsWith('guest_') || !persistedUser.id.includes(':'));

      if (isLocalGuest) {
        setLoading(false);
        return;
      }

      setUser(null);
    });

    return unsubscribe;
  }, [setLoading, setUser]);

  return (
    <MobileOnlyGuard>
      <div className="dark w-full max-w-full overflow-x-hidden">
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </div>
    </MobileOnlyGuard>
  );
}

/** Inner component — must live inside BrowserRouter to use Router hooks */
function AppRoutes() {
  const { showExitDialog, dismissExitDialog, confirmExit } = useAndroidBack();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const location = useLocation();

  // Global session recovery: when the native layer calls onAndroidResume (app returns
  // from background) and a session is active but we're not on the session screen,
  // navigate back with the correct remaining time so the countdown continues.
  useEffect(() => {
    // Register global scheduled-session handler
    // When a ScheduleAlarmReceiver alarm fires, MainActivity calls this with the session JSON
    (window as Window & { onScheduledSessionFire?: (s: unknown) => void }).onScheduledSessionFire = (session) => {
      try {
        const s = typeof session === 'string' ? JSON.parse(session) : session as Record<string, unknown>;
        const mode = (s.mode as string) || 'custom';
        const durationMinutes = (s.durationMinutes as number) || 60;
        // Start the session in the store so it's tracked
        useSessionStore.getState().startSession(mode, durationMinutes, true, true);
        navigate('/active-session', {
          replace: true,
          state: { mode, duration: durationMinutes },
        });
      } catch { /* ignore parse error */ }
    };

    const handleResume = () => {
      const session = useSessionStore.getState().activeSession;
      if (session && location.pathname !== '/active-session') {
        const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
        const remainingSeconds = Math.max(1, session.durationMinutes * 60 - elapsed);
        navigate('/active-session', {
          replace: true,
          state: { mode: session.mode, duration: session.durationMinutes, remainingSeconds },
        });
      }
    };

    // Register — ActiveSessionScreen will override this when it mounts (its own handler
    // handles immersive-mode re-entry while already on the session screen).
    (window as Window & { onAndroidResume?: () => void }).onAndroidResume = handleResume;

    return () => {
      // Only clear if this component's handler is still the active one
      const w = window as Window & { onAndroidResume?: () => void };
      if (w.onAndroidResume === handleResume) delete w.onAndroidResume;
    };
  }, [navigate, location.pathname]);

  return (
    <>
    <Suspense fallback={
      <div className="fixed inset-0 bg-slate-950 flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
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
      <Route path="/schedule" element={<ProtectedRoute><ScheduleScreen /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><SettingsScreen /></ProtectedRoute>} />
      <Route path="/guest-expiration" element={<ProtectedRoute><GuestExpirationScreen /></ProtectedRoute>} />
      <Route path="/subscription" element={<SubscriptionScreen />} />
      <Route path="/subscription-required" element={<SubscriptionScreen />} />
      <Route path="/admin-pin" element={<AdminPinScreen />} />
      <Route path="/admin" element={<AdminScreen />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </Suspense>
    {/* ── In-app exit confirmation dialog ─────────────────────────────── */}
    {showExitDialog && (
      <div
        className="fixed inset-0 z-[9999] flex items-end justify-center"
        style={{ paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)` }}
        onClick={dismissExitDialog}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

        {/* Card */}
        <div
          className="relative w-full max-w-sm mx-4 text-right overflow-hidden"
          style={{ borderRadius: 28 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Red ambient glow behind card */}
          <div className="absolute -inset-1 rounded-[32px] bg-red-600/20 blur-2xl pointer-events-none" />

          {/* Inner card */}
          <div
            className="relative bg-[#1a0a0a] border border-red-900/60 p-6"
            style={{ borderRadius: 28 }}
          >
            {/* Top glow strip */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-red-600/60 to-transparent" />

            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div className="w-14 h-14 rounded-2xl bg-red-900/30 border border-red-800/40 flex items-center justify-center">
                <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                </svg>
              </div>
            </div>

            {/* Text */}
            <h2 className="text-white text-lg font-bold mb-1.5 text-center">هل تريد الخروج؟</h2>
            <p className="text-red-200/50 text-sm mb-6 text-center leading-relaxed">سيتم إغلاق ZeroEscape No.1</p>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={confirmExit}
                className="flex-1 h-12 rounded-2xl bg-red-600/80 border border-red-500/50 text-white font-semibold text-sm transition active:scale-95 hover:bg-red-600"
                style={{ boxShadow: '0 0 18px rgba(220,38,38,0.35)' }}
              >
                نعم، خروج
              </button>
              <button
                onClick={dismissExitDialog}
                className="flex-1 h-12 rounded-2xl bg-white/5 border border-white/10 text-slate-300 font-medium text-sm transition active:scale-95 hover:bg-white/10"
              >
                لا، ابقَ
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
    </>
  );
}