import { useNavigate } from 'react-router-dom';
import { Play, Shield, Clock, Settings, BarChart3, ShieldCheck } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useSessionStore } from '../../store/sessionStore';

export function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { language } = usePreferencesStore();
  const { blockedApps, getTotalHoursThisWeek, getStreakDays } = useSessionStore();
  const isArabic = language === 'ar';

  const blockedCount = Object.values(blockedApps).filter(Boolean).length;
  const totalHours = getTotalHoursThisWeek();
  const streak = getStreakDays();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-white text-2xl font-bold">ZeroEscape No.1</h1>
          <p className="text-slate-400">
            {isArabic ? `مرحباً ${user?.name || ''}`.trim() : `Welcome ${user?.name || ''}`.trim()}
          </p>
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="p-3 bg-slate-900 rounded-xl hover:bg-slate-800 transition"
        >
          <Settings className="w-6 h-6 text-slate-400" />
        </button>
      </div>

      <div className="bg-gradient-to-br from-blue-500/10 to-violet-600/10 border border-blue-500/20 rounded-3xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-3 bg-blue-500/20 rounded-xl">
            <Clock className="w-6 h-6 text-blue-400" />
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-white font-bold">{isArabic ? 'لا توجد جلسة نشطة' : 'No active session'}</h2>
            <p className="text-slate-400 text-sm">{isArabic ? 'ابدأ جلسة تركيز جديدة' : 'Start a new focus session'}</p>
          </div>
        </div>

        <button
          onClick={() => navigate('/start-session')}
          className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          <Play className="w-5 h-5" />
          {isArabic ? 'ابدأ جلسة تركيز' : 'Start focus session'}
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 mb-6">
        <button
          onClick={() => navigate('/blocked-apps')}
          className="bg-slate-900 rounded-2xl p-5 text-right hover:bg-slate-800 transition border border-slate-800"
        >
          <div className="p-3 bg-red-500/20 rounded-xl w-fit mb-3">
            <ShieldCheck className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-white font-medium mb-1">{isArabic ? 'التطبيقات المحظورة' : 'Blocked apps'}</h3>
          <p className="text-slate-400 text-sm">{isArabic ? `${blockedCount} تطبيق` : `${blockedCount} apps`}</p>
        </button>

        <button
          onClick={() => navigate('/web-protection')}
          className="bg-slate-900 rounded-2xl p-5 text-right hover:bg-slate-800 transition border border-slate-800"
        >
          <div className="p-3 bg-emerald-500/20 rounded-xl w-fit mb-3">
            <Shield className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-white font-medium mb-1">{isArabic ? 'حماية الويب' : 'Web protection'}</h3>
          <p className="text-slate-400 text-sm">{isArabic ? 'مفعّل' : 'Enabled'}</p>
        </button>
      </div>

      <button
        onClick={() => navigate('/statistics')}
        className="bg-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800 transition border border-slate-800"
      >
        <div className="p-3 bg-violet-500/20 rounded-xl">
          <BarChart3 className="w-6 h-6 text-violet-400" />
        </div>
        <div className="flex-1 text-right">
          <h3 className="text-white font-medium mb-1">{isArabic ? 'الإحصائيات' : 'Statistics'}</h3>
          <p className="text-slate-400 text-sm">
            {isArabic
              ? `${totalHours.toFixed(1)} ساعة — ${streak} يوم متتالي`
              : `${totalHours.toFixed(1)} hrs — ${streak} day streak`}
          </p>
        </div>
      </button>
    </div>
  );
}
