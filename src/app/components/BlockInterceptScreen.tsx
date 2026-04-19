import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShieldX, Wind, Clock, ArrowLeft } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { USER_GOALS } from '../../core/types';

const BREATH_DURATION_MS = 4000; // 4s per inhale / exhale phase
const REQUIRED_CYCLES = 2;       // 2 full breath cycles before reason form

type Phase = 'breathing' | 'reason' | 'choice';

export function BlockInterceptScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const appName: string = location.state?.appName ?? 'هذا التطبيق';

  const { activeSession } = useSessionStore();
  const { logBreakAttempt } = useAnalyticsStore();
  const { userGoal } = usePreferencesStore();

  const [phase, setPhase] = useState<Phase>('breathing');
  const [breathState, setBreathState] = useState<'inhale' | 'exhale'>('inhale');
  const [cyclesDone, setCyclesDone] = useState(0);
  const [reason, setReason] = useState('');
  const [reasonError, setReasonError] = useState('');
  const [timeLeft, setTimeLeft] = useState(() =>
    activeSession
      ? Math.max(0, activeSession.durationMinutes * 60 - Math.floor((Date.now() - activeSession.startedAt) / 1000))
      : 0
  );
  const attemptLoggedRef = useRef(false);

  const goalConfig = userGoal ? USER_GOALS[userGoal] : null;

  // ── Live countdown ──────────────────────────────────────────────────────────
  useEffect(() => {
    if (!activeSession) return;
    const interval = setInterval(() => {
      const remaining = Math.max(
        0,
        activeSession.durationMinutes * 60 - Math.floor((Date.now() - activeSession.startedAt) / 1000)
      );
      setTimeLeft(remaining);
    }, 1000);
    return () => clearInterval(interval);
  }, [activeSession]);

  // ── Breathing cycle ─────────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'breathing') return;
    const timer = setTimeout(() => {
      if (breathState === 'inhale') {
        setBreathState('exhale');
      } else {
        const next = cyclesDone + 1;
        setCyclesDone(next);
        if (next >= REQUIRED_CYCLES) {
          setPhase('reason');
        } else {
          setBreathState('inhale');
        }
      }
    }, BREATH_DURATION_MS);
    return () => clearTimeout(timer);
  }, [phase, breathState, cyclesDone]);

  const minutes = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;

  const handleSubmitReason = () => {
    if (reason.trim().length < 5) {
      setReasonError('اكتب سبباً حقيقياً (٥ أحرف على الأقل)');
      return;
    }
    setReasonError('');
    setPhase('choice');
  };

  const handleReturn = () => {
    if (activeSession && !attemptLoggedRef.current) {
      attemptLoggedRef.current = true;
      logBreakAttempt({
        sessionId: activeSession.sessionId,
        appOrUrl: appName,
        reason,
        outcome: 'returned',
      });
    }
    navigate('/active-session', { replace: true });
  };

  const handleEmergency = () => {
    if (activeSession && !attemptLoggedRef.current) {
      attemptLoggedRef.current = true;
      logBreakAttempt({
        sessionId: activeSession.sessionId,
        appOrUrl: appName,
        reason: reason || 'طوارئ',
        outcome: 'emergency_used',
      });
    }
    navigate('/emergency-exit');
  };

  // ── Shared sub-components ───────────────────────────────────────────────────
  const AppBadge = () => (
    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-500/20 border border-red-500/30 rounded-full">
      <ShieldX className="w-4 h-4 text-red-400" />
      <span className="text-red-400 text-sm font-medium">{appName} محظور</span>
    </div>
  );

  const GoalBanner = () =>
    goalConfig ? (
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl px-4 py-3">
        <p className="text-blue-300 text-sm text-center leading-relaxed">
          <span className="ml-1">{goalConfig.emoji}</span>
          {goalConfig.motivationalAr}
        </p>
      </div>
    ) : null;

  const TimeCard = () =>
    activeSession ? (
      <div className="bg-slate-900 border border-slate-800 rounded-xl px-5 py-3 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
          <Clock className="w-4 h-4 text-slate-500" />
          <p className="text-slate-500 text-xs">الجلسة لا تزال تعمل</p>
        </div>
        <p className="text-white font-bold text-xl tabular-nums">
          {String(minutes).padStart(2, '0')}:{String(secs).padStart(2, '0')} متبقي
        </p>
      </div>
    ) : null;

  // ── Phase: Breathing ────────────────────────────────────────────────────────
  if (phase === 'breathing') {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-5 gap-6 z-50 overflow-hidden select-none">
        <div className="text-center space-y-2">
          <AppBadge />
          <h1 className="text-white text-xl font-bold mt-3">خذ نفساً عميقاً</h1>
          <p className="text-slate-400 text-sm">ثماني ثوانٍ من التنفس الواعي</p>
        </div>

        {/* Breathing circle */}
        <div className="relative flex items-center justify-center" style={{ width: 240, height: 240 }}>
          {/* Outer glow */}
          <div
            className="absolute rounded-full bg-blue-500/10 border border-blue-500/20 transition-all ease-in-out"
            style={{
              width: breathState === 'inhale' ? 240 : 160,
              height: breathState === 'inhale' ? 240 : 160,
              transitionDuration: `${BREATH_DURATION_MS}ms`,
            }}
          />
          {/* Inner circle */}
          <div
            className="absolute rounded-full bg-gradient-to-br from-blue-500/30 to-violet-600/30 flex items-center justify-center transition-all ease-in-out"
            style={{
              width: breathState === 'inhale' ? 170 : 110,
              height: breathState === 'inhale' ? 170 : 110,
              transitionDuration: `${BREATH_DURATION_MS}ms`,
            }}
          >
            <Wind className="w-8 h-8 text-blue-300" />
          </div>
        </div>

        <div className="text-center">
          <p className="text-2xl font-bold text-white">
            {breathState === 'inhale' ? 'استنشق...' : 'أخرج...'}
          </p>
          <p className="text-slate-600 text-sm mt-1">
            دورة {cyclesDone + 1} من {REQUIRED_CYCLES}
          </p>
        </div>

        <TimeCard />
      </div>
    );
  }

  // ── Phase: Reason input ─────────────────────────────────────────────────────
  if (phase === 'reason') {
    return (
      <div className="fixed inset-0 bg-slate-950 flex flex-col p-5 z-50 overflow-y-auto">
        <div className="flex-1 flex flex-col justify-center gap-5 py-6">
          <div className="text-center space-y-2">
            <AppBadge />
            <h2 className="text-white text-xl font-bold mt-3">لماذا تريد فتحه الآن؟</h2>
            <p className="text-slate-400 text-sm">سيُسجَّل سببك في تقريرك الأسبوعي</p>
          </div>

          <GoalBanner />

          <div>
            <textarea
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                if (reasonError) setReasonError('');
              }}
              placeholder="اكتب سبباً حقيقياً... (مثال: أحتاج التواصل مع شخص ما لأمر مهم)"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder-slate-600 text-sm resize-none focus:outline-none focus:border-blue-500 transition-colors"
              rows={4}
              maxLength={200}
              dir="rtl"
              autoFocus
            />
            {reasonError && (
              <p className="text-red-400 text-xs mt-1.5">{reasonError}</p>
            )}
            <p className="text-slate-600 text-xs mt-1 text-left">{reason.length}/200</p>
          </div>

          <TimeCard />
        </div>

        <button
          onClick={handleSubmitReason}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium hover:opacity-90 transition"
        >
          متابعة
        </button>
      </div>
    );
  }

  // ── Phase: Choice ───────────────────────────────────────────────────────────
  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center p-5 gap-5 z-50">
      <ShieldX className="w-14 h-14 text-red-400" />

      <div className="text-center space-y-2">
        <h1 className="text-white text-2xl font-bold">أنت في منتصف جلسة</h1>
        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 mx-auto max-w-xs">
          <p className="text-slate-400 text-sm italic">"{reason}"</p>
        </div>
      </div>

      <GoalBanner />
      <TimeCard />

      <div className="w-full space-y-3 mt-2">
        <button
          onClick={handleReturn}
          className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium hover:opacity-90 transition flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة للجلسة
        </button>
        <button
          onClick={handleEmergency}
          className="w-full h-11 rounded-xl bg-transparent border border-slate-700 text-slate-500 text-sm hover:bg-slate-900 transition"
        >
          طوارئ حقيقية فقط
        </button>
      </div>
    </div>
  );
}

