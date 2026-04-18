import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Chrome, LogIn, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService } from '../../services/authService';
import { usePreferencesStore } from '../../store/preferencesStore';

export function LoginScreen() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [tab, setTab] = useState<'login' | 'signup' | 'guest'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language: lang, setLanguage } = usePreferencesStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await authService.signInWithEmail(email, password);
      setUser(user);
      navigate('/home');
    } catch {
      setError(lang === 'ar' ? 'تعذر تسجيل الدخول. تحقق من البيانات.' : 'Unable to sign in. Check your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await authService.signUpWithEmail(name, email, password);
      setUser(user);
      navigate('/onboarding');
    } catch {
      setError(lang === 'ar' ? 'تعذر إنشاء الحساب.' : 'Unable to create account.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGuestMode = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      const guestUser = await authService.createGuestUser();
      setUser(guestUser);
      navigate('/home');
    } catch {
      setError(lang === 'ar' ? 'تعذر بدء وضع الضيف.' : 'Unable to start guest mode.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    setIsSubmitting(true);

    try {
      const user = await authService.signInWithGoogle();
      setUser(user);
      navigate('/home');
    } catch {
      setError(lang === 'ar' ? 'فشل تسجيل الدخول عبر Google.' : 'Google sign-in failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center justify-center flex-1">
          <div className="relative">
            <div className="absolute inset-0 bg-blue-500/20 blur-2xl rounded-full"></div>
            <img src="/icon.png" alt="ZeroEscape" className="relative w-20 h-20 rounded-xl object-cover" />
          </div>
        </div>
        <div className="absolute right-6 flex items-center gap-2">
          <button
            onClick={() => setLanguage('ar')}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              lang === 'ar' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              lang === 'en' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 bg-slate-900 rounded-2xl p-1">
        <button
          onClick={() => setTab('login')}
          className={`flex-1 py-3 rounded-xl font-medium transition ${
            tab === 'login'
              ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {lang === 'ar' ? 'دخول' : 'Login'}
        </button>
        <button
          onClick={() => setTab('signup')}
          className={`flex-1 py-3 rounded-xl font-medium transition ${
            tab === 'signup'
              ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {lang === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
        </button>
        <button
          onClick={() => setTab('guest')}
          className={`flex-1 py-3 rounded-xl font-medium transition ${
            tab === 'guest'
              ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {lang === 'ar' ? 'ضيف' : 'Guest'}
        </button>
      </div>

      <div className="flex-1">
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="w-full bg-slate-900 border border-slate-800 text-white py-4 rounded-2xl flex items-center justify-center gap-3 hover:bg-slate-800 transition mb-6"
        >
          <Chrome className="w-5 h-5" />
          {lang === 'ar' ? 'دخول بـ جوجل' : 'Sign in with Google'}
        </button>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300 text-right">
            {error}
          </div>
        )}

        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full h-px bg-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-slate-950 text-slate-500">{lang === 'ar' ? 'أو' : 'Or'}</span>
          </div>
        </div>

        {/* Login Tab */}
        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={lang === 'ar' ? 'example@email.com' : 'example@email.com'}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 pr-12 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 pr-12 pl-12 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="button"
              className="text-blue-400 text-sm hover:text-blue-300 transition"
            >
              {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition"
            >
              <LogIn className="w-5 h-5" />
              {isSubmitting ? (lang === 'ar' ? 'جاري التنفيذ...' : 'Please wait...') : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </button>
          </form>
        )}

        {/* Sign Up Tab */}
        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-5">
            <div>
              <label className="text-slate-400 text-sm mb-2 block">
                {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'ar' ? 'أحمد محمد' : 'John Doe'}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
                required
              />
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 pr-12 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-slate-400 text-sm mb-2 block">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 pr-12 pl-12 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-slate-500 text-xs mt-2">
                {lang === 'ar' ? 'يجب أن تحتوي على 8 أحرف على الأقل' : 'Must be at least 8 characters'}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl hover:opacity-90 transition"
            >
              {isSubmitting ? (lang === 'ar' ? 'جاري التنفيذ...' : 'Please wait...') : (lang === 'ar' ? 'إنشاء الحساب' : 'Create Account')}
            </button>
          </form>
        )}

        {/* Guest Tab */}
        {tab === 'guest' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20 rounded-2xl p-6">
              <div className="flex items-start gap-4">
                <Zap className="w-6 h-6 text-emerald-400 flex-shrink-0 mt-1" />
                <div className="text-right flex-1">
                  <h3 className="text-white font-medium mb-2">
                    {lang === 'ar' ? 'جرّب التطبيق مجاناً' : 'Try for Free'}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {lang === 'ar'
                      ? 'احصل على 24 ساعة كاملة لاستكشاف جميع الميزات دون الحاجة لحساب'
                      : 'Get 24 hours to explore all features without an account'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">{lang === 'ar' ? 'مدة الاستخدام' : 'Duration'}</span>
                <span className="text-white font-bold text-lg">24 {lang === 'ar' ? 'ساعة' : 'hours'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">{lang === 'ar' ? 'التكلفة' : 'Cost'}</span>
                <span className="text-emerald-400 font-bold text-lg">
                  {lang === 'ar' ? 'مجاني' : 'Free'}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">{lang === 'ar' ? 'جميع الميزات' : 'Features'}</span>
                <span className="text-blue-400 font-bold text-lg">✓</span>
              </div>
            </div>

            <button
              onClick={handleGuestMode}
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition font-medium"
            >
              <Zap className="w-5 h-5" />
              {lang === 'ar' ? 'ابدأ كضيف' : 'Start as Guest'}
            </button>

            <p className="text-center text-slate-500 text-xs">
              {lang === 'ar'
                ? 'بعد انتهاء 24 ساعة، يمكنك الاشتراك برسوم رمزية'
                : 'After 24 hours, you can upgrade to premium'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
