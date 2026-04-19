import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';

export function SplashScreen() {
  const navigate = useNavigate();
  const { user, isLoading, isGuestExpired } = useAuthStore();
  const { onboardingCompleted } = usePreferencesStore();

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

      navigate(onboardingCompleted ? '/home' : '/onboarding');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, user, isLoading, isGuestExpired, onboardingCompleted]);

  return (
    <div className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center gap-8">
      {/* Ambient glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-violet-600/10 rounded-full blur-3xl" />
      </div>

      {/* Icon */}
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-[32px]" />
        <img
          src="/icon.png"
          alt="ZeroEscape"
          className="relative w-28 h-28 rounded-[28px] shadow-2xl shadow-black/60"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>

      {/* Text */}
      <div className="text-center">
        <h1 className="text-white text-2xl font-bold tracking-tight">ZeroEscape No.1</h1>
        <p className="text-slate-500 text-sm mt-1">التركيز والحماية الرقمية</p>
      </div>

      {/* Loading dots */}
      <div className="flex gap-1.5">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 bg-slate-600 rounded-full animate-pulse"
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
