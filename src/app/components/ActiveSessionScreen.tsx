import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { BookOpen, Briefcase, Moon, Settings, AlertCircle, EyeOff, Zap } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';

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
  const [timeLeft, setTimeLeft] = useState(duration * 60);
  const [showWarning, setShowWarning] = useState(false);
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

  // ── On mount: activate fullscreen + wake lock + start VPN blocking ──
  useEffect(() => {
    requestFullscreen();
    requestWakeLock();
    // Start DNS-based VPN to block harmful sites during session
    window.Android?.startVpnBlocking?.();

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
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      releaseWakeLock();
      if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
      // Stop VPN blocking when session screen unmounts
      window.Android?.stopVpnBlocking?.();
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
    // Fixed + inset-0 = covers EVERYTHING including status bar area on mobile
    <div
      ref={containerRef}
      className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center overflow-hidden select-none"
      style={{ zIndex: 9999, touchAction: 'none' }}
    >
      {/* Warning flash when user tries to leave */}
      {showWarning && (
        <div className="absolute top-0 inset-x-0 bg-red-600 text-white text-center py-4 px-6 font-bold text-sm z-50 animate-pulse">
          <EyeOff className="inline w-4 h-4 mr-2" />
          محاولة مخالفة — الجلسة مستمرة! ({blockedAttempts} محاولة)
        </div>
      )}

      <div className="w-full max-w-md px-6 space-y-8">
        {/* Mode badge */}
        <div className="text-center">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r ${gradient} mb-2`}>
            <Icon className="w-5 h-5 text-white" />
            <span className="text-white font-medium">{label}</span>
          </div>
          {blockedAttempts > 0 && (
            <p className="text-red-400 text-xs mt-1">
              {blockedAttempts} محاولة خروج محظورة
            </p>
          )}
        </div>

        {/* Circular timer */}
        <div className="relative flex items-center justify-center">
          <svg className="absolute w-64 h-64 -rotate-90" viewBox="0 0 200 200">
            <circle cx="100" cy="100" r="90" stroke="#1e293b" strokeWidth="10" fill="none" />
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
          <div className="relative bg-slate-900 rounded-full p-12 border-4 border-slate-800 w-56 h-56 flex flex-col items-center justify-center">
            <div className="text-4xl font-bold text-white tabular-nums">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <p className="text-slate-400 text-sm mt-1">الوقت المتبقي</p>
          </div>
        </div>

        {/* Status indicators */}
        <div className="flex gap-3">
          <div className="flex-1 bg-slate-900 rounded-2xl p-4 flex items-center gap-3 border border-red-500/20">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <ShieldCheck className="w-5 h-5 text-red-400" />
            </div>
            <div className="text-right flex-1">
              <p className="text-slate-400 text-xs">التطبيقات</p>
              <p className="text-white font-medium">محظورة</p>
            </div>
          </div>

          <div className="flex-1 bg-slate-900 rounded-2xl p-4 flex items-center gap-3 border border-emerald-500/20">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Globe className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-right flex-1">
              <p className="text-slate-400 text-xs">الويب</p>
              <p className="text-white font-medium">محمي</p>
            </div>
          </div>
        </div>

        {/* Emergency exit */}
        <button
          onClick={() => {
            releaseWakeLock();
            if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
            navigate('/emergency-exit');
          }}
          className="w-full bg-slate-900 border-2 border-red-500/30 text-red-400 py-4 rounded-2xl flex items-center justify-center gap-2 active:bg-red-500/10 transition"
        >
          <AlertCircle className="w-5 h-5" />
          خروج طارئ
        </button>

        <p className="text-center text-slate-600 text-xs">
          ZeroEscape No.1 — الجلسة محمية بالكامل
        </p>
      </div>
    </div>
  );
}
