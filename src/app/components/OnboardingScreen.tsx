import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle2 } from 'lucide-react';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useSessionStore } from '../../store/sessionStore';
import { USER_GOALS } from '../../core/types';
import type { UserGoalType } from '../../core/types';

const GOAL_ORDER: UserGoalType[] = ['social', 'study', 'work', 'sleep', 'custom'];

type Step = 'goal' | 'plan' | 'ready';

export function OnboardingScreen() {
  const navigate = useNavigate();
  const { setUserGoal, setOnboardingCompleted } = usePreferencesStore();
  const { setBulkBlockedApps } = useSessionStore();

  const [step, setStep] = useState<Step>('goal');
  const [selectedGoal, setSelectedGoal] = useState<UserGoalType | null>(null);

  const handleGoalSelect = (goal: UserGoalType) => {
    setSelectedGoal(goal);
    setStep('plan');
  };

  const handleAcceptPlan = () => {
    if (!selectedGoal) return;
    const config = USER_GOALS[selectedGoal];
    setUserGoal(selectedGoal);
    setBulkBlockedApps(config.suggestedBlockedApps);
    setStep('ready');
  };

  const handleFinish = () => {
    setOnboardingCompleted(true);
    navigate('/permissions');
  };

  // ── Step 1: Goal Selection ──────────────────────────────────────────────────
  if (step === 'goal') {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col px-5 pt-safe pb-safe"
        style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + 32px)`, paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)` }}>
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/15 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-blue-400 text-xs font-medium">الخطوة ١ من ٣</span>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1.5">ما هو هدفك الرئيسي؟</h1>
          <p className="text-slate-400 text-sm leading-relaxed">
            سنُخصص خطة Detox مناسبة لك تلقائياً
          </p>
        </div>

        <div className="flex-1 space-y-3 overflow-y-auto hide-scrollbar">
          {GOAL_ORDER.map((goalId) => {
            const config = USER_GOALS[goalId];
            return (
              <button
                key={goalId}
                onClick={() => handleGoalSelect(goalId)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-4 text-right hover:bg-slate-800 hover:border-slate-700 active:scale-[0.98] transition"
              >
                <span className="text-3xl flex-shrink-0">{config.emoji}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="text-white font-medium text-sm">{config.labelAr}</h3>
                  <p className="text-slate-500 text-xs mt-0.5 leading-relaxed line-clamp-2">{config.motivationalAr}</p>
                </div>
                <ChevronLeft className="w-5 h-5 text-slate-600 flex-shrink-0" />
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // ── Step 2: Plan Preview ────────────────────────────────────────────────────
  if (step === 'plan' && selectedGoal) {
    const config = USER_GOALS[selectedGoal];
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col px-5"
        style={{ paddingTop: `calc(env(safe-area-inset-top, 0px) + 32px)`, paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)` }}>
        <div className="mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/15 rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500" />
            <span className="text-blue-400 text-xs font-medium">الخطوة ٢ من ٣</span>
          </div>
          <h1 className="text-white text-2xl font-bold mb-1">خطتك المقترحة</h1>
          <p className="text-slate-400 text-sm">
            {config.emoji} {config.labelAr}
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto hide-scrollbar">
          {/* Motivational quote */}
          <div className="bg-gradient-to-br from-blue-500/10 to-violet-600/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-blue-300 text-sm leading-relaxed text-center italic">
              "{config.motivationalAr}"
            </p>
          </div>

          {/* Suggested mode + duration */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-500 text-xs mb-3">وضع الجلسة الافتراضي</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-xl">🎯</span>
              </div>
              <div>
                <p className="text-white font-medium capitalize">
                  {config.suggestedMode.replace('_', ' ')}
                </p>
                <p className="text-slate-400 text-xs mt-0.5">
                  {config.suggestedDurationMinutes} دقيقة — مع الاحتكاك عند الكسر
                </p>
              </div>
            </div>
          </div>

          {/* Suggested blocked apps */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <p className="text-slate-500 text-xs mb-3">
              سيتم حظرها تلقائياً ({config.suggestedBlockedApps.length} تطبيق)
            </p>
            <div className="flex flex-wrap gap-2">
              {config.suggestedBlockedApps.map((app) => (
                <span
                  key={app}
                  className="px-2.5 py-1 bg-red-500/15 border border-red-500/25 rounded-lg text-red-400 text-xs capitalize"
                >
                  {app}
                </span>
              ))}
            </div>
          </div>

          {/* Friction system explanation */}
          <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-4">
            <h3 className="text-amber-400 text-sm font-semibold mb-2">🔒 نظام الاحتكاك</h3>
            <p className="text-slate-400 text-xs leading-relaxed">
              عند محاولة فتح أي تطبيق محظور: تمرين تنفس (٨ ثوانٍ) + سؤال "لماذا تريده الآن؟" + تسجيل المحاولة في تقريرك.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleAcceptPlan}
            className="w-full h-12 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium hover:opacity-90 transition"
          >
            قبول الخطة والمتابعة
          </button>
          <button
            onClick={() => setStep('goal')}
            className="w-full h-11 rounded-xl bg-transparent border border-slate-800 text-slate-400 hover:bg-slate-900 transition text-sm"
          >
            تغيير الهدف
          </button>
        </div>
      </div>
    );
  }

  // ── Step 3: Ready ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center px-5 text-center gap-6"
      style={{ paddingTop: `env(safe-area-inset-top, 0px)`, paddingBottom: `env(safe-area-inset-bottom, 0px)` }}>
      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-500/15 rounded-full">
        <span className="w-2 h-2 rounded-full bg-blue-500" />
        <span className="text-blue-400 text-xs font-medium">الخطوة ٣ من ٣</span>
      </div>

      <div className="space-y-3">
        <div className="w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10 text-emerald-400" />
        </div>
        <h1 className="text-white text-2xl font-bold">خطتك جاهزة!</h1>
        <p className="text-slate-400 text-sm leading-relaxed max-w-xs">
          الخطوة الأخيرة هي منح الصلاحيات اللازمة حتى يعمل التطبيق بكامل قوته
        </p>
      </div>

      <button
        onClick={handleFinish}
        className="w-full max-w-xs h-12 rounded-xl bg-gradient-to-r from-blue-500 to-violet-600 text-white font-medium hover:opacity-90 transition"
      >
        منح الصلاحيات والبدء
      </button>
    </div>
  );
}

