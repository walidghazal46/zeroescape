import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { RotateCw, CheckCircle2, Clock, AlertCircle } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';

export function RestartRecoveryScreen() {
  const navigate = useNavigate();
  const { activeSession } = useSessionStore();

  // If no active session to recover, redirect to home after a short delay
  useEffect(() => {
    if (!activeSession) {
      const t = setTimeout(() => navigate('/home', { replace: true }), 2000);
      return () => clearTimeout(t);
    }
  }, [activeSession, navigate]);

  const modeLabels: Record<string, string> = {
    study: 'جلسة دراسة',
    work: 'جلسة عمل',
    sleep: 'جلسة نوم',
    deep_detox: 'ديتوكس عميق',
    custom: 'جلسة مخصصة',
  };

  // Compute remaining time from persisted startedAt
  const remainingSeconds = activeSession
    ? Math.max(0, activeSession.durationMinutes * 60 - Math.floor((Date.now() - activeSession.startedAt) / 1000))
    : 0;
  const rHours = Math.floor(remainingSeconds / 3600);
  const rMins = Math.floor((remainingSeconds % 3600) / 60);
  const rSecs = remainingSeconds % 60;
  const timeStr = `${String(rHours).padStart(2, '0')}:${String(rMins).padStart(2, '0')}:${String(rSecs).padStart(2, '0')}`;
  const modeLabel = activeSession ? (modeLabels[activeSession.mode] ?? 'جلسة') : '';

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        {activeSession ? (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="relative bg-gradient-to-br from-blue-500 to-violet-600 p-8 rounded-full inline-block">
                <RotateCw className="w-20 h-20 text-white" strokeWidth={2} />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-center gap-2">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                <h1 className="text-white text-3xl font-bold">تم استعادة الجلسة</h1>
              </div>
              <p className="text-slate-400 text-base leading-relaxed">
                جلسة التركيز الخاصة بك نشطة ومحمية مرة أخرى
              </p>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-5 h-5 text-blue-400" />
                <span className="text-slate-400">الوقت المتبقي</span>
              </div>
              <div className="text-5xl font-bold text-white tabular-nums">{timeStr}</div>
              <div className="pt-4 border-t border-slate-800">
                <p className="text-slate-400 text-sm">{modeLabel}</p>
              </div>
            </div>

            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
              <p className="text-emerald-300 text-sm leading-relaxed">
                تم استعادة جميع إعدادات الحظر والحماية بنجاح بعد إعادة تشغيل الجهاز
              </p>
            </div>

            <button
              onClick={() => navigate('/active-session', { state: { mode: activeSession.mode, duration: activeSession.durationMinutes } })}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl hover:opacity-90 transition"
            >
              متابعة الجلسة
            </button>
          </>
        ) : (
          <>
            <div className="relative">
              <div className="absolute inset-0 bg-slate-700/20 blur-3xl rounded-full" />
              <div className="relative bg-slate-800 p-8 rounded-full inline-block">
                <AlertCircle className="w-20 h-20 text-slate-400" strokeWidth={2} />
              </div>
            </div>
            <div>
              <h1 className="text-white text-2xl font-bold mb-2">لا توجد جلسة نشطة</h1>
              <p className="text-slate-400 text-sm">جارٍ توجيهك للشاشة الرئيسية...</p>
            </div>
          </>
        )}
          </div>
    </div>
  );
}
