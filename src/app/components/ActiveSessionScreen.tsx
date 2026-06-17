import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Briefcase, Moon, Settings, AlertCircle, EyeOff, Zap, ShieldCheck, Globe, Phone, X } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';
import { usePreferencesStore } from '../../store/preferencesStore';

const modeIcons = {
  study: BookOpen,
  work: Briefcase,
  sleep: Moon,
  deep_detox: Zap,
  custom: Settings,
};

const modeColors = {
  study: 'from-blue-500 to-cyan-500',
  work: 'from-violet-500 to-purple-500',
  sleep: 'from-indigo-500 to-blue-500',
  deep_detox: 'from-red-500 to-orange-500',
  custom: 'from-emerald-500 to-teal-500',
};

const modeLabels = {
  study: 'دراسة',
  work: 'عمل',
  sleep: 'نوم',
  deep_detox: 'ديتوكس عميق',
  custom: 'مخصص',
};

export function ActiveSessionScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode = 'study', duration = 120 } = location.state || {};

  const { activeSession, incrementBlockedAttempt, finishSession } = useSessionStore();
  // When returning from background, remainingSeconds is passed so the countdown
  // resumes from where it left off instead of restarting from the full duration.
  const { remainingSeconds } = location.state || {};
  const [timeLeft, setTimeLeft] = useState<number>(() => {
    if (remainingSeconds != null && remainingSeconds > 0) return remainingSeconds;
    // Fallback: derive from store (handles cold-start recovery)
    const session = activeSession;
    if (session) {
      const elapsed = Math.floor((Date.now() - session.startedAt) / 1000);
      const left = session.durationMinutes * 60 - elapsed;
      if (left > 0) return left;
    }
    return duration * 60;
  });
  const [showWarning, setShowWarning] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const { emergencyContacts } = usePreferencesStore();
  const wakeLockRef = useRef<WakeLockSentinel | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ── Fullscreen: lock the entire page to prevent notification shade ──
  const requestFullscreen = useCallback(async () => {
    try {
      const el = document.documentElement;
      if (el.requestFullscreen) await el.requestFullscreen({ navigationUI: 'hide' } as FullscreenOptions);
    } catch {
      // Some browsers don't allow without user gesture — we handle via the start button
    }
  }, []);

  // ── Screen Wake Lock: keep screen on during session ──
  const requestWakeLock = useCallback(async () => {
    try {
      if ('wakeLock' in navigator) {
        wakeLockRef.current = await (navigator as Navigator & { wakeLock: { request: (type: string) => Promise<WakeLockSentinel> } }).wakeLock.request('screen');
      }
    } catch {
      // Not supported or permission denied — silent fail
    }
  }, []);

  const releaseWakeLock = useCallback(() => {
    if (wakeLockRef.current) {
      wakeLockRef.current.release();
      wakeLockRef.current = null;
    }
  }, []);

  // ── On mount: activate fullscreen + wake lock ──
  useEffect(() => {
    requestFullscreen();
    requestWakeLock();
    // Enter true immersive mode (hides status bar + notification shade pull)
    window.Android?.startImmersiveMode?.();
    // Sync session state with native layer for onWindowFocusChanged
    window.Android?.setSessionActive?.(true);

    // Periodically re-enforce immersive mode every 10s as a safety net
    const immersiveInterval = setInterval(() => {
      window.Android?.setSessionActive?.(true);
    }, 10_000);

    // Block Android hardware back button
    (window as Window & { onAndroidBack?: () => void }).onAndroidBack = () => {
      incrementBlockedAttempt();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };

    // Re-enter immersive mode when app returns from background (Home button)
    (window as Window & { onAndroidResume?: () => void }).onAndroidResume = () => {
      window.Android?.startImmersiveMode?.();
      incrementBlockedAttempt();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };

    // Re-acquire wake lock if it gets released (e.g. tab hidden then shown)
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        requestWakeLock();
        // User came back — count as blocked attempt and flash warning
        incrementBlockedAttempt();
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 3000);
        // Try to re-enter fullscreen
        requestFullscreen();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Block browser back button
    window.history.pushState(null, '', window.location.href);
    const handlePopState = () => {
      window.history.pushState(null, '', window.location.href);
      incrementBlockedAttempt();
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
    };
    window.addEventListener('popstate', handlePopState);

    // Warn before unload (closing tab)
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'الجلسة لا تزال نشطة — هل أنت متأكد من الخروج؟';
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      clearInterval(immersiveInterval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      releaseWakeLock();
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      // Restore normal UI
      window.Android?.stopImmersiveMode?.();
      // Tell native layer session is over
      window.Android?.setSessionActive?.(false);
      // Restore Android back button behaviour
      delete (window as Window & { onAndroidBack?: () => void }).onAndroidBack;
      delete (window as Window & { onAndroidResume?: () => void }).onAndroidResume;
    };
  }, [requestFullscreen, requestWakeLock, releaseWakeLock, incrementBlockedAttempt]);

  // ── Countdown timer ──
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          const session = finishSession();
          releaseWakeLock();
          if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
          navigate('/session-complete', { state: { session } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate, finishSession, releaseWakeLock]);

  const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;
  const totalSeconds = duration * 60;
  const progress = ((totalSeconds - timeLeft) / totalSeconds) * 100;

  const Icon = modeIcons[mode as keyof typeof modeIcons] || BookOpen;
  const gradient = modeColors[mode as keyof typeof modeColors];
  const label = modeLabels[mode as keyof typeof modeLabels];
  const blockedAttempts = activeSession?.blockedAttempts ?? 0;

  return (
    // Fixed + inset-0 covers everything including status bar area on mobile
    <div
      ref={containerRef}
      className="fixed inset-0 bg-background flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ zIndex: 9999, touchAction: 'none' }}
    >
      {/* Warning flash when user tries to leave */}
      {showWarning && (
        <div
          className="absolute top-0 inset-x-0 bg-red-600 text-white text-center font-bold z-50 animate-pulse flex items-center justify-center gap-2"
          style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + var(--sp-3))`, paddingBottom: 'var(--sp-3)' }}
        >
          <EyeOff className="icon-sm flex-shrink-0" />
          <span className="text-fluid-xs">محاولة مخالفة — الجلسة مستمرة! ({blockedAttempts} محاولة)</span>
        </div>
      )}

      {/* ── Main content: centred, max-width capped on tablets ── */}
      <div
        className="w-full flex flex-col items-center"
        style={{
          maxWidth: '420px',
          padding: `0 var(--screen-px)`,
          gap: 'var(--sp-6)',
        }}
      >
        {/* Mode badge */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 rounded-full bg-gradient-to-r ${gradient}`}
            style={{ padding: 'var(--sp-2) var(--sp-4)' }}
          >
            <Icon className="icon-md text-white" />
            <span className="text-fluid-sm text-white font-medium">{label}</span>
          </div>
          {blockedAttempts > 0 && (
            <p className="text-fluid-xs text-red-400 mt-1">
              {blockedAttempts} محاولة خروج محظورة
            </p>
          )}
        </div>

        {/* Circular timer — uses vmin so it scales on both portrait and landscape */}
        <div className="relative flex items-center justify-center" style={{ width: '60vmin', height: '60vmin', maxWidth: '256px', maxHeight: '256px' }}>
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" stroke="#d7ece4" strokeWidth="10" fill="none" />
            <circle
              cx="100" cy="100" r="90"
              stroke="url(#grad)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 90}`}
              strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
              className="transition-all duration-1000"
            />
            <defs>
              <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
          <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-10 blur-3xl rounded-full`} />
          <div className="relative bg-card rounded-full border-4 border-border w-[75%] h-[75%] flex flex-col items-center justify-center">
            <div className="text-fluid-3xl font-bold text-foreground tabular-nums leading-none">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <p className="text-fluid-xs text-muted-foreground mt-1">الوقت المتبقي</p>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex gap-[var(--sp-3)] w-full">
          <div className="flex-1 bg-card rounded-2xl flex items-center gap-3 border border-red-500/20" style={{ padding: 'var(--sp-3) var(--sp-4)' }}>
            <div className="bg-red-500/20 rounded-lg flex-shrink-0" style={{ padding: 'var(--sp-2)' }}>
              <ShieldCheck className="icon-md text-red-400" />
            </div>
            <div className="text-right flex-1 min-w-0">
              <p className="text-fluid-xs text-muted-foreground">التطبيقات</p>
              <p className="text-fluid-sm text-foreground font-medium">محظورة</p>
            </div>
          </div>
        </div>

        {/* Emergency Call */}
        <button
          onClick={() => setShowEmergencyModal(true)}
          className="w-full bg-emerald-500/10 border-2 border-emerald-500/30 text-emerald-400 rounded-2xl flex items-center justify-center gap-2 active:bg-emerald-500/20 transition"
          style={{ height: 'var(--btn-h)' }}
        >
          <Phone className="icon-md" />
          <span className="text-fluid-sm font-medium">اتصال طوارئ مسموح</span>
        </button>

        {/* Emergency exit */}
        <button
          onClick={() => {
            releaseWakeLock();
            if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
            navigate('/emergency-exit');
          }}
          className="w-full bg-card border-2 border-red-500/30 text-red-400 rounded-2xl flex items-center justify-center gap-2 active:bg-red-500/10 transition"
          style={{ height: 'var(--btn-h)' }}
        >
          <AlertCircle className="icon-md" />
          <span className="text-fluid-sm font-medium">خروج طارئ</span>
        </button>

        <p className="text-fluid-xs text-center text-muted-foreground">
          ZeroEscape No.1 — الجلسة محمية بالكامل
        </p>
      </div>

      {/* ── Emergency Call Modal ─────────────────────────────────────────── */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowEmergencyModal(false)} />

          <div className="relative w-full max-w-sm bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-800 flex items-center justify-between">
              <button onClick={() => setShowEmergencyModal(false)} className="p-2 hover:bg-slate-800 rounded-full transition">
                <X className="icon-sm text-slate-400" />
              </button>
              <h3 className="text-white font-bold">اتصال طوارئ</h3>
            </div>

            <div className="p-4 space-y-3">
              {emergencyContacts.length === 0 ? (
                <div className="py-8 text-center space-y-2">
                  <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mx-auto text-slate-500">
                    <Phone className="icon-md" />
                  </div>
                  <p className="text-slate-400 text-sm">لم يتم تعيين جهات اتصال طوارئ</p>
                  <p className="text-slate-500 text-xs">يمكنك تعيينهم من الإعدادات قبل بدء الجلسة</p>
                </div>
              ) : (
                emergencyContacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => {
                      (window as any).Android?.makeEmergencyCall?.(contact.phone);
                    }}
                    className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 rounded-2xl transition group active:scale-[0.98]"
                  >
                    <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center group-hover:bg-emerald-500/30 transition">
                      <Phone className="icon-sm text-emerald-400" />
                    </div>
                    <div className="text-right flex-1 px-4">
                      <p className="text-white font-semibold">{contact.name}</p>
                      <p className="text-slate-500 text-xs tabular-nums">{contact.phone}</p>
                    </div>
                  </button>
                ))
              )}
            </div>

            <div className="p-4 bg-slate-950/50 text-center">
              <p className="text-[10px] text-slate-500">
                سيتم فتح لوحة الاتصال بالنظام — يرجى العودة للتطبيق بعد انتهاء المكالمة
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
