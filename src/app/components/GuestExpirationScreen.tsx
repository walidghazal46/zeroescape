import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { Zap, Lock, ArrowRight } from 'lucide-react';
import { usePreferencesStore } from '../../store/preferencesStore';

export function GuestExpirationScreen() {
  const navigate = useNavigate();
  const { user, getGuestTimeLeft } = useAuthStore();
  const [timeLeft, setTimeLeft] = useState(0);
  const { language: lang, setLanguage } = usePreferencesStore();

  useEffect(() => {
    if (!user || user.type !== 'guest') {
      navigate('/login');
      return;
    }

    const updateTimer = () => {
      const ms = getGuestTimeLeft();
      setTimeLeft(ms);

      if (ms <= 0) {
        navigate('/subscription-required');
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [user, navigate, getGuestTimeLeft]);

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Time Left */}
        <div className="text-center">
          <div className="inline-block mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-500/20 blur-3xl rounded-full"></div>
              <div className="relative bg-gradient-to-br from-yellow-500 to-orange-600 p-8 rounded-full">
                <Zap className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
            </div>
          </div>

          <h1 className="text-white text-3xl font-bold mb-2">
            {lang === 'ar' ? 'الوقت المتبقي' : 'Time Left'}
          </h1>
          <p className="text-slate-400">
            {lang === 'ar' ? 'انتهاء فترة الاستخدام المجاني' : 'Free trial ending'}
          </p>
        </div>

        {/* Timer Display */}
        <div className="bg-slate-900 rounded-3xl p-8 border border-slate-800">
          <div className="text-center">
            <div className="text-6xl font-bold text-transparent bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text mb-2">
              {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </div>
            <p className="text-slate-400">
              {lang === 'ar' ? 'ساعة : دقيقة : ثانية' : 'hours : minutes : seconds'}
            </p>
          </div>
        </div>

        {/* Features Info */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-6 space-y-4">
          <div className="flex items-start gap-3">
            <Lock className="w-5 h-5 text-blue-400 flex-shrink-0 mt-1" />
            <div className="text-right">
              <h3 className="text-white font-medium mb-1">
                {lang === 'ar' ? 'استمتع بجميع الميزات' : 'Enjoy All Features'}
              </h3>
              <p className="text-slate-400 text-sm">
                {lang === 'ar'
                  ? 'لديك وصول كامل لجميع أدوات التطبيق خلال هذه الفترة'
                  : 'Full access to all features during your trial'}
              </p>
            </div>
          </div>
        </div>

        {/* Upgrade Button */}
        <button
          onClick={() => navigate('/subscription')}
          className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition font-medium"
        >
          {lang === 'ar' ? 'ترقية الآن' : 'Upgrade Now'}
          <ArrowRight className="w-5 h-5" />
        </button>

        {/* Language Toggle */}
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setLanguage('ar')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              lang === 'ar' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              lang === 'en' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            English
          </button>
        </div>
      </div>
    </div>
  );
}
