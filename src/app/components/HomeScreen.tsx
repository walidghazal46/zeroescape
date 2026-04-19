import { useNavigate } from 'react-router-dom';
import { Play, Shield, Settings, BarChart3, ShieldCheck, Flame, Clock, AlertTriangle, Calendar } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useSessionStore } from '../../store/sessionStore';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { useScheduleStore } from '../../store/scheduleStore';
import { USER_GOALS } from '../../core/types';

export function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { language, userGoal } = usePreferencesStore();
  const { blockedApps, getTotalHoursThisWeek, getStreakDays, completedSessions, activeSession } = useSessionStore();
  const { getWeeklyBreakCount, getMostAttemptedApp, getTopBlockedApps } = useAnalyticsStore();
  const { schedules, getNextSchedule } = useScheduleStore();
  const isArabic = language === 'ar';

  const blockedCount = Object.values(blockedApps).filter(Boolean).length;
  const totalHours = getTotalHoursThisWeek();
  const streak = getStreakDays();
  const weeklyBreaks = getWeeklyBreakCount();
  const topApp = getMostAttemptedApp();
  const topApps = getTopBlockedApps(3);
  const nextSchedule = getNextSchedule();

  // Compliance rate: sessions with 0 breaks / total sessions this week
  const weekAgo = Date.now() - 7 * 86400000;
  const weekSessions = completedSessions.filter((s) => s.completedAt >= weekAgo);
  const cleanSessions = weekSessions.filter((s) => s.blockedAttempts === 0).length;
  const complianceRate = weekSessions.length > 0 ? Math.round((cleanSessions / weekSessions.length) * 100) : 0;

  const goalConfig = userGoal ? USER_GOALS[userGoal] : null;

  const greeting = user?.name ? (isArabic ? `مرحباً ${user.name}` : `Welcome ${user.name}`) : (isArabic ? 'مرحباً' : 'Welcome');

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col px-4 overflow-y-auto hide-scrollbar"
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 20px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)`,
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-white text-xl font-bold">{greeting}</h1>
          {goalConfig && (
            <p className="text-slate-500 text-xs mt-0.5">
              {goalConfig.emoji} {goalConfig.labelAr}
            </p>
          )}
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="w-10 h-10 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center hover:bg-slate-800 transition"
        >
          <Settings className="w-5 h-5 text-slate-400" />
        </button>
      </div>

      {/* ── Streak + Compliance Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-3 gap-3 mb-5">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
          <Flame className="w-5 h-5 text-orange-400 mx-auto mb-1" />
          <p className="text-white text-lg font-bold tabular-nums">{streak}</p>
          <p className="text-slate-500 text-xs">يوم متتالي</p>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
          <Clock className="w-5 h-5 text-blue-400 mx-auto mb-1" />
          <p className="text-white text-lg font-bold tabular-nums">{totalHours.toFixed(1)}</p>
          <p className="text-slate-500 text-xs">ساعة هذا الأسبوع</p>
        </div>
        <div
          className={`bg-slate-900 border rounded-xl p-3 text-center ${
            complianceRate >= 80
              ? 'border-emerald-500/30'
              : complianceRate >= 50
              ? 'border-amber-500/30'
              : 'border-red-500/30'
          }`}
        >
          <ShieldCheck
            className={`w-5 h-5 mx-auto mb-1 ${
              complianceRate >= 80 ? 'text-emerald-400' : complianceRate >= 50 ? 'text-amber-400' : 'text-red-400'
            }`}
          />
          <p className="text-white text-lg font-bold tabular-nums">{complianceRate}%</p>
          <p className="text-slate-500 text-xs">التزام</p>
        </div>
      </div>

      {/* ── Active session indicator OR start CTA ──────────────────────────── */}
      {activeSession ? (
        <button
          onClick={() => navigate('/active-session')}
          className="w-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 rounded-xl p-4 flex items-center gap-3 mb-5 hover:border-emerald-500/60 transition"
        >
          <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse flex-shrink-0" />
          <div className="flex-1 text-right">
            <p className="text-emerald-400 font-medium text-sm">جلسة نشطة</p>
            <p className="text-slate-400 text-xs capitalize">{activeSession.mode.replace('_', ' ')}</p>
          </div>
          <span className="text-emerald-400 text-xs">↩ العودة</span>
        </button>
      ) : (
        <div className="bg-gradient-to-br from-blue-500/10 to-violet-600/10 border border-blue-500/20 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-blue-400" />
            </div>
            <div className="flex-1 text-right">
              <h2 className="text-white font-semibold text-sm">لا توجد جلسة نشطة</h2>
              <p className="text-slate-500 text-xs">ابدأ جلسة تركيز الآن</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/start-session')}
            className="w-full h-11 bg-gradient-to-r from-blue-500 to-violet-600 text-white rounded-xl flex items-center justify-center gap-2 hover:opacity-90 transition font-medium text-sm"
          >
            <Play className="w-4 h-4" />
            ابدأ جلسة تركيز
          </button>
        </div>
      )}

      {/* ── Quick Actions ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <button
          onClick={() => navigate('/blocked-apps')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-right hover:bg-slate-800 transition active:scale-[0.98]"
        >
          <div className="w-8 h-8 bg-red-500/20 rounded-xl flex items-center justify-center mb-3">
            <ShieldCheck className="w-4 h-4 text-red-400" />
          </div>
          <h3 className="text-white font-medium text-sm mb-0.5">التطبيقات المحظورة</h3>
          <p className="text-slate-500 text-xs">{blockedCount} تطبيق محظور</p>
        </button>

        <button
          onClick={() => navigate('/web-protection')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-right hover:bg-slate-800 transition active:scale-[0.98]"
        >
          <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center mb-3">
            <Shield className="w-4 h-4 text-emerald-400" />
          </div>
          <h3 className="text-white font-medium text-sm mb-0.5">حماية الويب</h3>
          <p className="text-slate-500 text-xs">DNS نشط</p>
        </button>

        <button
          onClick={() => navigate('/schedule')}
          className="bg-slate-900 border border-slate-800 rounded-xl p-4 text-right hover:bg-slate-800 transition active:scale-[0.98] col-span-2"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Calendar className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 text-right">
              <h3 className="text-white font-medium text-sm">الجدولة التلقائية</h3>
              <p className="text-slate-500 text-xs">
                {schedules.filter((s) => s.enabled).length > 0
                  ? nextSchedule
                    ? `القادمة: ${nextSchedule.firesAt.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}`
                    : `${schedules.filter((s) => s.enabled).length} جدولة نشطة`
                  : 'أضف جدولة تلقائية'}
              </p>
            </div>
            <span className="text-slate-600 text-xs">←</span>
          </div>
        </button>
      </div>

      {/* ── Break Attempts Warning ──────────────────────────────────────────── */}
      {weeklyBreaks > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 mb-5">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0" />
            <div className="flex-1 text-right">
              <p className="text-amber-400 text-sm font-medium">
                {weeklyBreaks} محاولة كسر هذا الأسبوع
              </p>
              {topApp && (
                <p className="text-slate-400 text-xs mt-0.5">
                  الأكثر: <span className="text-slate-300 capitalize">{topApp}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Top Attempted Apps ──────────────────────────────────────────────── */}
      {topApps.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-5">
          <p className="text-slate-500 text-xs mb-3">أكثر التطبيقات المحاولة هذا الأسبوع</p>
          <div className="space-y-2">
            {topApps.map(({ app, count }, i) => (
              <div key={app} className="flex items-center gap-3">
                <span className="text-slate-600 text-xs w-4">{i + 1}</span>
                <div className="flex-1 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full"
                    style={{ width: `${Math.min(100, (count / (topApps[0]?.count || 1)) * 100)}%` }}
                  />
                </div>
                <span className="text-slate-300 text-xs capitalize w-20 text-left">{app}</span>
                <span className="text-red-400 text-xs font-medium w-8 text-right">{count}×</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Statistics Link ─────────────────────────────────────────────────── */}
      <button
        onClick={() => navigate('/statistics')}
        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3 hover:bg-slate-800 transition"
      >
        <div className="w-8 h-8 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
          <BarChart3 className="w-4 h-4 text-violet-400" />
        </div>
        <div className="flex-1 text-right">
          <h3 className="text-white font-medium text-sm">الإحصائيات التفصيلية</h3>
          <p className="text-slate-500 text-xs">
            {weekSessions.length} جلسة — {totalHours.toFixed(1)} ساعة هذا الأسبوع
          </p>
        </div>
        <span className="text-slate-600 text-xs">←</span>
      </button>
    </div>
  );
}

