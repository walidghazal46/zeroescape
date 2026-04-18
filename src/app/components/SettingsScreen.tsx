import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Bell, Globe, AlertCircle, Info } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';

export function SettingsScreen() {
  const navigate = useNavigate();
  const { logout, user } = useAuthStore();
  const { language, setLanguage } = usePreferencesStore();
  const [notifications, setNotifications] = useState(true);
  const [autoStart, setAutoStart] = useState(true);
  const [strictMode, setStrictMode] = useState(false);
  const isArabic = language === 'ar';

  const handleLogout = async () => {
    if (user?.type === 'google') {
      await authService.logout();
    }
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/home')}
          className="p-2 text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">{isArabic ? 'الإعدادات' : 'Settings'}</h1>
      </div>

      <div className="flex-1 space-y-6">
        <div>
          <h3 className="text-slate-400 text-sm mb-3">{isArabic ? 'الحماية' : 'Protection'}</h3>
          <div className="space-y-3">
            <button
              onClick={() => setStrictMode(!strictMode)}
              className="w-full bg-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800 transition border border-slate-800"
            >
              <div className="p-3 bg-red-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-red-400" />
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white font-medium mb-1">{isArabic ? 'الوضع الصارم' : 'Strict mode'}</h4>
                <p className="text-slate-400 text-sm">{isArabic ? 'منع الخروج الطارئ خلال الجلسات' : 'Disable emergency exit during sessions'}</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition relative ${
                strictMode ? 'bg-red-500' : 'bg-slate-700'
              }`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                  strictMode ? 'left-1' : 'right-1'
                }`} />
              </div>
            </button>

            <button
              onClick={() => setAutoStart(!autoStart)}
              className="w-full bg-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800 transition border border-slate-800"
            >
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Shield className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white font-medium mb-1">{isArabic ? 'التشغيل التلقائي' : 'Auto start'}</h4>
                <p className="text-slate-400 text-sm">{isArabic ? 'استعادة الجلسة بعد إعادة التشغيل' : 'Restore session after restart'}</p>
              </div>
              <div className={`w-12 h-7 rounded-full transition relative ${
                autoStart ? 'bg-blue-500' : 'bg-slate-700'
              }`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                  autoStart ? 'left-1' : 'right-1'
                }`} />
              </div>
            </button>
          </div>
        </div>

        <div>
          <h3 className="text-slate-400 text-sm mb-3">{isArabic ? 'الإشعارات' : 'Notifications'}</h3>
          <button
            onClick={() => setNotifications(!notifications)}
            className="w-full bg-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800 transition border border-slate-800"
          >
            <div className="p-3 bg-violet-500/20 rounded-xl">
              <Bell className="w-6 h-6 text-violet-400" />
            </div>
            <div className="flex-1 text-right">
              <h4 className="text-white font-medium mb-1">{isArabic ? 'إشعارات الجلسة' : 'Session notifications'}</h4>
              <p className="text-slate-400 text-sm">{isArabic ? 'تنبيهات البداية والنهاية' : 'Start and end alerts'}</p>
            </div>
            <div className={`w-12 h-7 rounded-full transition relative ${
              notifications ? 'bg-violet-500' : 'bg-slate-700'
            }`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                notifications ? 'left-1' : 'right-1'
              }`} />
            </div>
          </button>
        </div>

        <div>
          <h3 className="text-slate-400 text-sm mb-3">{isArabic ? 'عام' : 'General'}</h3>
          <div className="space-y-3">
            <button
              onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
              className="w-full bg-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800 transition border border-slate-800"
            >
              <div className="p-3 bg-emerald-500/20 rounded-xl">
                <Globe className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white font-medium mb-1">{isArabic ? 'اللغة' : 'Language'}</h4>
                <p className="text-slate-400 text-sm">{isArabic ? 'العربية' : 'English'}</p>
              </div>
            </button>

            <button className="w-full bg-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800 transition border border-slate-800">
              <div className="p-3 bg-blue-500/20 rounded-xl">
                <Info className="w-6 h-6 text-blue-400" />
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white font-medium mb-1">{isArabic ? 'حول التطبيق' : 'About app'}</h4>
                <p className="text-slate-400 text-sm">{isArabic ? 'الإصدار 1.0.0' : 'Version 1.0.0'}</p>
              </div>
            </button>
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5 flex items-start gap-4">
          <AlertCircle className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
          <p className="text-blue-300 text-sm leading-relaxed text-right">
            {isArabic
              ? 'ZeroEscape No.1 يعمل ضمن حدود النظام ويحترم خصوصيتك. لا يتم جمع أو مشاركة بياناتك الشخصية.'
              : 'ZeroEscape No.1 runs within system limits and respects your privacy. No personal data is shared.'}
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="w-full rounded-2xl border border-red-500/30 bg-red-500/10 py-4 text-red-300 transition hover:bg-red-500/15"
        >
          {isArabic ? 'تسجيل الخروج' : 'Log out'}
        </button>
      </div>
    </div>
  );
}
