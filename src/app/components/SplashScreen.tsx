import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';

export function SplashScreen() {
  const navigate = useNavigate();
  const { user, isLoading, isGuestExpired } = useAuthStore();
  const { language } = usePreferencesStore();
  const isArabic = language === 'ar';

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isLoading) {
        return;
      }

      if (!user) {
        navigate('/login');
        return;
      }

      if (user.type === 'guest' && isGuestExpired()) {
        navigate('/subscription-required');
        return;
      }

      navigate('/home');
    }, 1600);

    return () => clearTimeout(timer);
  }, [navigate, user, isLoading, isGuestExpired]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center gap-6 animate-fade-in">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-violet-600 p-6 rounded-3xl">
            <Shield className="w-16 h-16 text-white" strokeWidth={2} />
          </div>
        </div>
        <div className="text-center">
          <h1 className="text-white text-3xl font-bold mb-2">ZeroEscape No.1</h1>
          <p className="text-slate-400">
            {isArabic ? 'التركيز والحماية الرقمية' : 'Focus and digital protection'}
          </p>
        </div>
      </div>
    </div>
  );
}
