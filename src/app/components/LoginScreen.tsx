import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Chrome, LogIn, Zap } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService, getAuthErrorCode } from '../../services/authService';
import { usePreferencesStore } from '../../store/preferencesStore';

const getAuthErrorMessage = (
  code: string,
  lang: 'ar' | 'en',
  action: 'login' | 'signup' | 'google' | 'guest'
) => {
  const messages: Record<string, { ar: string; en: string }> = {
    'auth/invalid-email': {
      ar: 'صيغة البريد الإلكتروني غير صحيحة.',
      en: 'Invalid email address format.',
    },
    'auth/user-not-found': {
      ar: 'لا يوجد حساب بهذا البريد.',
      en: 'No account found for this email.',
    },
    'auth/wrong-password': {
      ar: 'كلمة المرور غير صحيحة.',
      en: 'Incorrect password.',
    },
    'auth/invalid-credential': {
      ar: 'بيانات تسجيل الدخول غير صحيحة.',
      en: 'Invalid login credentials.',
    },
    'auth/email-already-in-use': {
      ar: 'هذا البريد مستخدم بالفعل.',
      en: 'This email is already in use.',
    },
    'auth/weak-password': {
      ar: 'كلمة المرور ضعيفة. استخدم 8 أحرف على الأقل.',
      en: 'Weak password. Use at least 8 characters.',
    },
    'auth/operation-not-allowed': {
      ar: 'طريقة تسجيل الدخول غير مفعلة في Firebase.',
      en: 'This sign-in method is not enabled in Firebase.',
    },
    'auth/popup-closed-by-user': {
      ar: 'تم إغلاق نافذة Google قبل اكتمال تسجيل الدخول.',
      en: 'Google sign-in popup was closed before completing sign in.',
    },
    'auth/popup-blocked': {
      ar: 'تم حظر نافذة Google. اسمح بالنوافذ المنبثقة ثم أعد المحاولة.',
      en: 'Google popup was blocked. Allow popups and try again.',
    },
    'auth/too-many-requests': {
      ar: 'محاولات كثيرة جدًا. حاول مرة أخرى لاحقًا.',
      en: 'Too many attempts. Please try again later.',
    },
    'auth/network-request-failed': {
      ar: 'مشكلة في الاتصال بالإنترنت. تحقق من الشبكة.',
      en: 'Network error. Please check your connection.',
    },
    'auth/api-key-not-valid.-please-pass-a-valid-api-key.': {
      ar: 'مفتاح Firebase API غير صحيح. راجع إعدادات البيئة.',
      en: 'Invalid Firebase API key. Check environment configuration.',
    },
  };

  const fallbackByAction: Record<'login' | 'signup' | 'google' | 'guest', { ar: string; en: string }> = {
    login: {
      ar: 'تعذر تسجيل الدخول. تحقق من البيانات.',
      en: 'Unable to sign in. Check your credentials.',
    },
    signup: {
      ar: 'تعذر إنشاء الحساب.',
      en: 'Unable to create account.',
    },
    google: {
      ar: 'فشل تسجيل الدخول عبر Google.',
      en: 'Google sign-in failed.',
    },
    guest: {
      ar: 'تعذر بدء وضع الضيف.',
      en: 'Unable to start guest mode.',
    },
  };

  const selected = messages[code] || fallbackByAction[action];
  return lang === 'ar' ? selected.ar : selected.en;
};

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
    } catch (error) {
      setError(getAuthErrorMessage(getAuthErrorCode(error), lang, 'login'));
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
    } catch (error) {
      setError(getAuthErrorMessage(getAuthErrorCode(error), lang, 'signup'));
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
    } catch (error) {
      setError(getAuthErrorMessage(getAuthErrorCode(error), lang, 'guest'));
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
    } catch (error) {
      setError(getAuthErrorMessage(getAuthErrorCode(error), lang, 'google'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between md:mb-6">
        <div className="flex flex-1 items-center justify-center px-3 md:px-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sky-400/10 blur-2xl"></div>
            <img
              src="/icon.png"
              alt="ZeroEscape"
              className="relative h-[190px] w-[190px] rounded-xl object-cover md:h-[270px] md:w-[270px]"
            />
          </div>
        </div>
        <div className="fixed bottom-4 right-4 z-50 flex items-center gap-2 md:bottom-6 md:right-6">
          <button
            onClick={() => setLanguage('ar')}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              lang === 'ar' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            العربية
          </button>
          <button
            onClick={() => setLanguage('en')}
            className={`px-2 py-1 rounded text-xs font-medium transition ${
              lang === 'en' ? 'bg-sky-600 text-white' : 'bg-slate-900 text-slate-400'
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <div className="mx-auto mb-6 flex w-full max-w-sm gap-2 rounded-2xl bg-slate-900 p-1 md:mb-8 md:max-w-none">
        <button
          onClick={() => setTab('login')}
          className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition md:py-3 md:text-base ${
            tab === 'login'
              ? 'bg-gradient-to-r from-sky-600 to-cyan-700 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {lang === 'ar' ? 'دخول' : 'Login'}
        </button>
        <button
          onClick={() => setTab('signup')}
          className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition md:py-3 md:text-base ${
            tab === 'signup'
              ? 'bg-gradient-to-r from-sky-600 to-cyan-700 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {lang === 'ar' ? 'إنشاء حساب' : 'Sign Up'}
        </button>
        <button
          onClick={() => setTab('guest')}
          className={`flex-1 rounded-xl py-2.5 text-sm font-medium transition md:py-3 md:text-base ${
            tab === 'guest'
              ? 'bg-gradient-to-r from-sky-600 to-cyan-700 text-white'
              : 'text-slate-400 hover:text-slate-300'
          }`}
        >
          {lang === 'ar' ? 'ضيف' : 'Guest'}
        </button>
      </div>

      <div className="mx-auto flex-1 w-full max-w-sm md:max-w-none">
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting}
          className="mb-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 py-3.5 text-white transition hover:bg-slate-800 md:mb-6 md:py-4"
        >
          <Chrome className="h-5 w-5" />
          {lang === 'ar' ? 'دخول بـ جوجل' : 'Sign in with Google'}
        </button>

        {error && (
          <div className="mb-4 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-right text-sm text-red-300">
            {error}
          </div>
        )}

        <div className="relative mb-5 md:mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="h-px w-full bg-slate-800"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="bg-slate-950 px-2 text-slate-500">{lang === 'ar' ? 'أو' : 'Or'}</span>
          </div>
        </div>

        {tab === 'login' && (
          <form onSubmit={handleLogin} className="space-y-4 md:space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3.5 pr-12 text-white placeholder:text-slate-600 transition focus:border-sky-500 focus:outline-none md:py-4"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 transition focus:border-sky-500 focus:outline-none md:py-4"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button type="button" className="text-sm text-sky-400 transition hover:text-sky-300">
              {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-700 py-3.5 text-white transition hover:opacity-90 md:py-4"
            >
              <LogIn className="h-5 w-5" />
              {isSubmitting ? (lang === 'ar' ? 'جاري التنفيذ...' : 'Please wait...') : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </button>
          </form>
        )}

        {tab === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-4 md:space-y-5">
            <div>
              <label className="mb-2 block text-sm text-slate-400">
                {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'}
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={lang === 'ar' ? 'أحمد محمد' : 'John Doe'}
                className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3.5 text-white placeholder:text-slate-600 transition focus:border-sky-500 focus:outline-none md:py-4"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
              </label>
              <div className="relative">
                <Mail className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3.5 pr-12 text-white placeholder:text-slate-600 transition focus:border-sky-500 focus:outline-none md:py-4"
                  required
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm text-slate-400">
                {lang === 'ar' ? 'كلمة المرور' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="absolute right-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3.5 pl-12 pr-12 text-white placeholder:text-slate-600 transition focus:border-sky-500 focus:outline-none md:py-4"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {lang === 'ar' ? 'يجب أن تحتوي على 8 أحرف على الأقل' : 'Must be at least 8 characters'}
              </p>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-700 py-3.5 text-white transition hover:opacity-90 md:py-4"
            >
              {isSubmitting ? (lang === 'ar' ? 'جاري التنفيذ...' : 'Please wait...') : (lang === 'ar' ? 'إنشاء الحساب' : 'Create Account')}
            </button>
          </form>
        )}

        {tab === 'guest' && (
          <div className="space-y-4 md:space-y-6">
            <div className="rounded-2xl border border-sky-500/20 bg-gradient-to-br from-sky-500/10 to-teal-500/10 p-5 md:p-6">
              <div className="flex items-start gap-3 md:gap-4">
                <Zap className="mt-1 h-6 w-6 flex-shrink-0 text-teal-300" />
                <div className="flex-1 text-right">
                  <h3 className="mb-2 font-medium text-white">
                    {lang === 'ar' ? 'جرّب التطبيق مجاناً' : 'Try for Free'}
                  </h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {lang === 'ar'
                      ? 'احصل على 48 ساعة كاملة لاستكشاف جميع الميزات دون الحاجة لحساب'
                      : 'Get 48 hours to explore all features without an account'}
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900 p-5 md:p-6">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{lang === 'ar' ? 'مدة الاستخدام' : 'Duration'}</span>
                <span className="text-lg font-bold text-white">48 {lang === 'ar' ? 'ساعة' : 'hours'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{lang === 'ar' ? 'التكلفة' : 'Cost'}</span>
                <span className="text-lg font-bold text-teal-300">{lang === 'ar' ? 'مجاني' : 'Free'}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-400">{lang === 'ar' ? 'جميع الميزات' : 'Features'}</span>
                <span className="text-lg font-bold text-sky-300">✓</span>
              </div>
            </div>

            <button
              onClick={handleGuestMode}
              disabled={isSubmitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-teal-600 to-cyan-700 py-3.5 font-medium text-white transition hover:opacity-90 md:py-4"
            >
              <Zap className="h-5 w-5" />
              {lang === 'ar' ? 'ابدأ كضيف' : 'Start as Guest'}
            </button>

            <p className="text-center text-xs text-slate-500">
              {lang === 'ar'
                ? 'بعد انتهاء 48 ساعة، يمكنك الاشتراك برسوم رمزية'
                : 'After 48 hours, you can upgrade to premium'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
