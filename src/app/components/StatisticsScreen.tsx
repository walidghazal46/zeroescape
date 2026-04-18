import { useNavigate } from 'react-router-dom';
import { ChevronRight, Clock, ShieldCheck, Flame, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Cell } from 'recharts';
import { useSessionStore } from '../../store/sessionStore';

export function StatisticsScreen() {
  const navigate = useNavigate();
  const { getTotalHoursThisWeek, getTotalBlockedThisWeek, getWeekData, getStreakDays, completedSessions } = useSessionStore();

  const totalHours = getTotalHoursThisWeek();
  const totalBlocked = getTotalBlockedThisWeek();
  const weekData = getWeekData();
  const streak = getStreakDays();

  // Compare with previous week
  const prevWeekSessions = completedSessions.filter(s => {
    const age = Date.now() - s.completedAt;
    return age >= 7 * 86400000 && age < 14 * 86400000;
  });
  const prevWeekHours = prevWeekSessions.reduce((sum, s) => sum + s.durationMinutes / 60, 0);
  const trend = prevWeekHours > 0 ? Math.round(((totalHours - prevWeekHours) / prevWeekHours) * 100) : null;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/home')}
          className="p-2 text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">الإحصائيات</h1>
      </div>

        <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-5">
          <Clock className="w-8 h-8 text-blue-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{totalHours.toFixed(1)}</div>
          <div className="text-slate-400 text-sm">ساعة هذا الأسبوع</div>
        </div>

        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-5">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{totalBlocked}</div>
          <div className="text-slate-400 text-sm">محاولة محظورة</div>
        </div>

        <div className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-2xl p-5">
          <Flame className="w-8 h-8 text-orange-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">{streak}</div>
          <div className="text-slate-400 text-sm">يوم متتالي</div>
        </div>

        <div className="bg-gradient-to-br from-violet-500/10 to-purple-500/10 border border-violet-500/20 rounded-2xl p-5">
          <TrendingUp className="w-8 h-8 text-violet-400 mb-3" />
          <div className="text-3xl font-bold text-white mb-1">
            {trend !== null ? `${trend > 0 ? '+' : ''}${trend}%` : '--'}
          </div>
          <div className="text-slate-400 text-sm">عن الأسبوع الماضي</div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-6">
        <h3 className="text-white font-medium mb-6">ساعات التركيز الأسبوعية</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weekData}>
            <XAxis
              dataKey="day"
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <YAxis
              stroke="#64748b"
              style={{ fontSize: '12px' }}
            />
            <Bar dataKey="hours" radius={[8, 8, 0, 0]}>
              {weekData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === weekData.length - 1 ? '#3b82f6' : '#334155'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <Flame className="w-8 h-8 text-yellow-400" />
          <div className="flex-1 text-right">
            <h3 className="text-white font-medium mb-1">استمر في التقدم!</h3>
            <p className="text-slate-400 text-sm">أنت على بعد 6 أيام من تحقيق هدف الشهر</p>
          </div>
        </div>
      </div>
    </div>
  );
}
