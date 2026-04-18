import { useNavigate, useLocation } from 'react-router-dom';
import { CheckCircle2, Clock, ShieldCheck, Trophy } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useEffect } from 'react';
import { useSessionStore } from '../../store/sessionStore';
import type { CompletedSession } from '../../store/sessionStore';

export function SessionCompleteScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const session = location.state?.session as CompletedSession | undefined;
  const { currentStreak } = useSessionStore();

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, []);

  const durationMinutes = session?.durationMinutes ?? 0;
  const blockedAttempts = session?.blockedAttempts ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-emerald-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-emerald-500 to-teal-600 p-8 rounded-full inline-block">
            <CheckCircle2 className="w-20 h-20 text-white" strokeWidth={2} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-white text-3xl font-bold">أحسنت!</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            لقد أكملت جلسة التركيز بنجاح
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <Clock className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{durationMinutes}</div>
              <div className="text-slate-400 text-xs">دقيقة</div>
            </div>

            <div className="text-center">
              <ShieldCheck className="w-6 h-6 text-emerald-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{blockedAttempts}</div>
              <div className="text-slate-400 text-xs">محاولة حظر</div>
            </div>

            <div className="text-center">
              <Trophy className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white mb-1">{currentStreak}</div>
              <div className="text-slate-400 text-xs">أيام متتالية</div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-blue-500/10 to-violet-600/10 border border-blue-500/20 rounded-2xl p-5">
          <p className="text-blue-300 text-sm leading-relaxed">
            استمر في التركيز! كل جلسة تقربك من أهدافك
          </p>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => navigate('/start-session')}
            className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl hover:opacity-90 transition"
          >
            ابدأ جلسة جديدة
          </button>

          <button
            onClick={() => navigate('/home')}
            className="w-full bg-slate-900 border border-slate-800 text-white py-4 rounded-2xl hover:bg-slate-800 transition"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    </div>
  );
}
