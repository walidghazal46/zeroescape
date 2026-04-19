import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, Flame, TrendingUp, AlertTriangle, Target, ShieldCheck } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useSessionStore } from '../../store/sessionStore';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { USER_GOALS } from '../../core/types';

function formatHour(hour: number): string {
  if (hour === 0) return '12م';
  if (hour < 12) return `${hour}ص`;
  if (hour === 12) return '12ظ';
  return `${hour - 12}م`;
}

export function StatisticsScreen() {
  const navigate = useNavigate();
  const { getTotalHoursThisWeek, getTotalBlockedThisWeek, getWeekData, getStreakDays, completedSessions } = useSessionStore();
  const { getWeeklyBreakCount, getMostAttemptedApp, getTopBlockedApps, getWeakestHour, getHourlyBreakCounts } = useAnalyticsStore();
  const { userGoal } = usePreferencesStore();

  const totalHours = getTotalHoursThisWeek();
  const totalBlocked = getTotalBlockedThisWeek();
  const weekData = getWeekData();
  const streak = getStreakDays();
  const weeklyBreaks = getWeeklyBreakCount();
  const mostAttemptedApp = getMostAttemptedApp();
  const topApps = getTopBlockedApps(5);
  const weakestHour = getWeakestHour();
  const hourlyData = getHourlyBreakCounts();
  const goalConfig = userGoal ? USER_GOALS[userGoal] : null;

  const weekAgo = Date.now() - 7 * 86400000;
  const weekSessions = completedSessions.filter((s) => s.completedAt >= weekAgo);
  const cleanSessions = weekSessions.filter((s) => s.blockedAttempts === 0).length;
  const complianceRate = weekSessions.length > 0 ? Math.round((cleanSessions / weekSessions.length) * 100) : 0;

  const prevWeekSessions = completedSessions.filter((s) => {
    const age = Date.now() - s.completedAt;
    return age >= 7 * 86400000 && age < 14 * 86400000;
  });
  const prevWeekHours = prevWeekSessions.reduce((sum, s) => sum + s.durationMinutes / 60, 0);
  const trend = prevWeekHours > 0 ? Math.round(((totalHours - prevWeekHours) / prevWeekHours) * 100) : null;
  const peakHourData = [...hourlyData].sort((a, b) => b.count - a.count)[0];

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col px-4 overflow-y-auto hide-scrollbar"
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 20px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)`,
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/home')}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl font-bold">الإحصائيات</h1>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-xl p-4">
          <Clock className="w-5 h-5 text-blue-400 mb-2" />
          <div className="text-2xl font-bold text-white tabular-nums">{totalHours.toFixed(1)}</div>
          <div className="text-slate-400 text-xs mt-0.5">ساعة هذا الأسبوع</div>
        </div>

        <div
          className={`border rounded-xl p-4 ${
            complianceRate >= 80
              ? 'bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border-emerald-500/20'
              : 'bg-gradient-to-br from-amber-500/10 to-orange-500/10 border-amber-500/20'
          }`}
        >
          <Target className={`w-5 h-5 mb-2 ${complianceRate >= 80 ? 'text-emerald-400' : 'text-amber-400'}`} />
          <div className="text-2xl font-bold text-white tabular-nums">{complianceRate}%</div>
          <div className="text-slate-400 text-xs mt-0.5">نسبة الالتزام</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-xl p-4">
          <Flame className="w-5 h-5 text-orange-400 mb-2" />
          <div className="text-2xl font-bold text-white tabular-nums">{streak}</div>
          <div className="text-slate-400 text-xs mt-0.5">يوم متتالي</div>
        </div>

        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-xl p-4">
          <TrendingUp className="w-5 h-5 text-violet-400 mb-2" />
          <div className="text-2xl font-bold text-white tabular-nums">{trend !== null ? `${trend > 0 ? '+' : ''}${trend}%` : '—'}</div>
          <div className="text-slate-400 text-xs mt-0.5">عن الأسبوع الماضي</div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-5">
        <h3 className="text-white text-sm font-medium mb-4">ساعات التركيز الأسبوعية</h3>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={weekData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
            <XAxis dataKey="day" stroke="#475569" style={{ fontSize: '11px' }} />
            <YAxis stroke="#475569" style={{ fontSize: '11px' }} />
            <Bar dataKey="hours" radius={[6, 6, 0, 0]}>
              {weekData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === weekData.length - 1 ? '#3b82f6' : '#334155'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-5">
        <h3 className="text-white text-sm font-medium mb-3">سلوك كسر الجلسات</h3>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-slate-800/70 rounded-lg p-3">
            <div className="text-slate-400 text-xs mb-1">إجمالي محاولات الكسر</div>
            <div className="text-white text-xl font-bold tabular-nums">{weeklyBreaks}</div>
          </div>
          <div className="bg-slate-800/70 rounded-lg p-3">
            <div className="text-slate-400 text-xs mb-1">إجمالي المحظورات</div>
            <div className="text-white text-xl font-bold tabular-nums">{totalBlocked}</div>
          </div>
          <div className="bg-slate-800/70 rounded-lg p-3 col-span-2">
            <div className="text-slate-400 text-xs mb-1">أكثر تطبيق حاولت فتحه</div>
            <div className="text-white text-sm font-medium truncate">{mostAttemptedApp || 'لا توجد بيانات بعد'}</div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 mb-5">
        <h3 className="text-white text-sm font-medium mb-3">نقاط الضعف</h3>
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between bg-slate-800/70 rounded-lg p-3">
            <div className="flex items-center gap-2 text-slate-300">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>الساعة الأضعف</span>
            </div>
            <div className="text-white font-medium">{weakestHour !== null ? formatHour(weakestHour) : 'لا توجد بيانات'}</div>
          </div>
          <div className="flex items-center justify-between bg-slate-800/70 rounded-lg p-3">
            <div className="flex items-center gap-2 text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>الهدف الحالي</span>
            </div>
            <div className="text-white font-medium">{goalConfig?.label || 'غير محدد'}</div>
          </div>
          {peakHourData && peakHourData.count > 0 && (
            <div className="flex items-center justify-between bg-slate-800/70 rounded-lg p-3">
              <div className="text-slate-300">ذروة المحاولات</div>
              <div className="text-white font-medium">{formatHour(peakHourData.hour)} ({peakHourData.count})</div>
            </div>
          )}
        </div>
      </div>

      {topApps.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <h3 className="text-white text-sm font-medium mb-3">أكثر التطبيقات المحظورة</h3>
          <div className="space-y-2">
            {topApps.map((app) => (
              <div key={app.appId} className="flex items-center justify-between bg-slate-800/70 rounded-lg p-3">
                <div className="text-slate-200 truncate max-w-[70%]">{app.appName}</div>
                <div className="text-white font-medium tabular-nums">{app.count}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
