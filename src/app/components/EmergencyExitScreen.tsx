import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertTriangle, Lock, Clock, ShieldOff, Loader2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useSessionStore } from '../../store/sessionStore';

const MAX_DAILY_USES = 2;
const EXIT_DURATION_SECONDS = 5 * 60; // 5 minutes

export function EmergencyExitScreen() {
  const navigate = useNavigate();
  const { validateEmergencyExit, recordEmergencyExit, getTodayExitCount, user } = useAuthStore();
  const { abandonSession } = useSessionStore();

  const [pin, setPin] = useState('');
  const [reason, setReason] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Countdown state — active only after successful PIN verification
  const [countdownActive, setCountdownActive] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(EXIT_DURATION_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const todayCount = getTodayExitCount();
  const remainingUses = MAX_DAILY_USES - todayCount;
  const isExhausted = remainingUses <= 0;

  // If PIN not set at all, show a warning instead of the PIN form
  const hasPinSetup = Boolean(user?.emergencyPin);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const startCountdown = () => {
    setCountdownActive(true);
    setSecondsLeft(EXIT_DURATION_SECONDS);
    timerRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          // Time expired — return to session
          navigate('/active-session', { replace: true });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleVerifyPin = () => {
    setError('');
    if (pin.length !== 4) {
      setError('الرمز يجب أن يكون 4 أرقام بالضبط');
      return;
    }

    setIsSubmitting(true);
    const { ok, reason: failReason } = validateEmergencyExit(pin);
    setIsSubmitting(false);

    if (!ok) {
      setError(failReason ?? 'فشل التحقق');
      setPin('');
      return;
    }

    // PIN correct & within daily limit → record and start countdown
    recordEmergencyExit();
    abandonSession();
    startCountdown();
  };

  const handleConfirmExit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    navigate('/home', { replace: true });
  };

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const progress = ((EXIT_DURATION_SECONDS - secondsLeft) / EXIT_DURATION_SECONDS) * 100;

  // ─── Countdown / grace-period screen ────────────────────────────────────────
  if (countdownActive) {
    return (
      <div
        className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-6 gap-8"
        style={{
          paddingTop: `calc(env(safe-area-inset-top, 0px) + 16px)`,
          paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 16px)`,
        }}
      >
        <div className="text-center space-y-2">
          <ShieldOff className="w-12 h-12 text-red-400 mx-auto" />
          <h1 className="text-white text-2xl font-bold">فترة الخروج الطارئ</h1>
          <p className="text-slate-400 text-sm">لديك 5 دقائق فقط خارج الجلسة</p>
        </div>

        {/* Circular countdown */}
        <div className="relative flex items-center justify-center">
          <svg className="w-48 h-48 -rotate-90" viewBox="0 0 160 160">
            <circle cx="80" cy="80" r="68" stroke="#1e293b" strokeWidth="8" fill="none" />
            <circle
              cx="80" cy="80" r="68"
              stroke="#ef4444"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 68}`}
              strokeDashoffset={`${2 * Math.PI * 68 * (progress / 100)}`}
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute flex flex-col items-center">
            <span className="text-4xl font-bold text-white tabular-nums">
              {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
            <span className="text-red-400 text-xs mt-1">متبقي</span>
          </div>
        </div>

        <div className="w-full space-y-3">
          <button
            onClick={handleConfirmExit}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-red-500 to-pink-600 text-white font-medium hover:opacity-90 transition"
          >
            الخروج الآن
          </button>
          <button
            onClick={() => {
              if (timerRef.current) clearInterval(timerRef.current);
              navigate('/active-session', { replace: true });
            }}
            className="w-full py-4 rounded-2xl bg-slate-900 text-slate-300 hover:bg-slate-800 transition"
          >
            العودة للجلسة
          </button>
        </div>

        <p className="text-slate-600 text-xs text-center">
          استخدامات الطوارئ اليوم: {todayCount} / {MAX_DAILY_USES}
        </p>
      </div>
    );
  }

  // ─── PIN entry screen ────────────────────────────────────────────────────────
  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col px-4 overflow-y-auto hide-scrollbar"
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 20px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)`,
      }}
    >
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold">خروج طارئ</h1>
        <p className="text-slate-400 text-sm mt-1">
          متاح {remainingUses} من {MAX_DAILY_USES} مرات اليوم
        </p>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-6">

        {/* Warning block */}
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-5 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-0.5" />
          <div className="text-right">
            <h3 className="text-yellow-400 font-medium mb-1">تحذير هام</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              سيُمنح لك <strong className="text-white">5 دقائق فقط</strong> خارج التطبيق.
              بعدها ستعود تلقائياً للجلسة. الاستخدام محدود بـ <strong className="text-white">مرتين يومياً</strong>.
            </p>
          </div>
        </div>

        {/* Exhausted state */}
        {isExhausted && (
          <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-5 text-center space-y-2">
            <ShieldOff className="w-8 h-8 text-red-400 mx-auto" />
            <p className="text-red-400 font-medium">استنفدت الحد اليومي</p>
            <p className="text-slate-400 text-sm">استخدمت الخروج الطارئ مرتين اليوم. جرّب غداً.</p>
          </div>
        )}

        {/* PIN not configured */}
        {!hasPinSetup && !isExhausted && (
          <div className="bg-orange-500/10 border border-orange-500/30 rounded-2xl p-5 text-center space-y-2">
            <Lock className="w-8 h-8 text-orange-400 mx-auto" />
            <p className="text-orange-400 font-medium">لم يُعيَّن رمز الطوارئ</p>
            <p className="text-slate-400 text-sm">يجب تعيين رمز الطوارئ من حسابك أثناء التسجيل.</p>
          </div>
        )}

        {/* PIN input */}
        {!isExhausted && hasPinSetup && (
          <div className="space-y-4">
            <div>
              <label className="text-slate-400 text-sm mb-3 block flex items-center gap-2">
                <Lock className="w-4 h-4" />
                أدخل رمز الطوارئ (PIN)
              </label>
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={pin}
                onChange={(e) => {
                  setPin(e.target.value.replace(/\D/g, '').slice(0, 4));
                  setError('');
                }}
                placeholder="••••"
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-white text-center text-3xl tracking-[0.5em] focus:border-red-500 focus:outline-none transition"
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">سبب الخروج (اختياري)</label>
              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="لماذا تحتاج للخروج؟"
                rows={3}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-3 text-white resize-none focus:border-red-500 focus:outline-none transition text-sm"
              />
            </div>

            {error && (
              <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl py-3 px-4">
                {error}
              </p>
            )}

            <div className="flex items-center gap-2 text-slate-500 text-xs justify-center">
              <Clock className="w-3.5 h-3.5" />
              ستحصل على 5 دقائق فقط خارج الجلسة
            </div>
          </div>
        )}
      </div>

      {/* Action buttons */}
      <div className="space-y-3 mt-6">
        {!isExhausted && hasPinSetup && (
          <button
            onClick={handleVerifyPin}
            disabled={pin.length !== 4 || isSubmitting}
            className={`w-full py-4 rounded-2xl transition flex items-center justify-center gap-2 ${
              pin.length === 4 && !isSubmitting
                ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
            تأكيد الخروج الطارئ
          </button>
        )}
        <button
          onClick={() => navigate('/active-session', { replace: true })}
          className="w-full py-4 rounded-2xl bg-slate-900 text-slate-300 hover:bg-slate-800 transition"
        >
          العودة للجلسة
        </button>
      </div>
    </div>
  );
}
