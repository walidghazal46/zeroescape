import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, Chrome, LogIn, Zap, Smartphone } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService, getAuthErrorCode } from '../../services/authService';
import { usePreferencesStore } from '../../store/preferencesStore';

const isMobileApp = (): boolean => {
  const ua = navigator.userAgent || '';
  return (
    /Android.*wv/.test(ua) ||
    typeof (window as Window & { Android?: unknown }).Android !== 'undefined' ||
    typeof (window as Window & { Capacitor?: unknown }).Capacitor !== 'undefined'
  );
};

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
    'auth/google-webview-not-supported': {
      ar: 'دخول Google غير مدعوم داخل WebView للأندرويد. استخدم البريد وكلمة المرور أو أنشئ حساباً.',
      en: 'Google sign-in is not supported inside Android WebView. Use email/password or create an account.',
    },
    'auth/operation-not-supported-in-this-environment': {
      ar: 'بيئة التطبيق الحالية لا تدعم دخول Google. استخدم تسجيل الدخول بالبريد.',
      en: 'This environment does not support Google sign-in. Use email sign-in instead.',
    },
    'auth/unauthorized-domain': {
      ar: 'نطاق التطبيق غير مضاف في Firebase Authorized Domains.',
      en: 'App domain is not added to Firebase Authorized Domains.',
    },
    'auth/redirect-initiated': {
      ar: 'جارٍ فتح صفحة Google للمصادقة... انتظر قليلاً.',
      en: 'Opening Google authentication page... please wait.',
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
    'auth/google-signin-timeout': {
      ar: 'انتهت مهلة تسجيل الدخول بـ Google. حاول مرة أخرى.',
      en: 'Google sign-in timed out. Please try again.',
    },
    'auth/google-native-failed': {
      ar: 'فشل تسجيل الدخول الأصلي بـ Google. حاول مرة أخرى.',
      en: 'Native Google sign-in failed. Please try again.',
    },
    'native_api_error_10': {
      ar: 'خطأ في إعداد Google Sign-In (DEVELOPER_ERROR). تحقق من SHA fingerprint في Firebase.',
      en: 'Google Sign-In configuration error (DEVELOPER_ERROR). Check SHA fingerprint in Firebase.',
    },
    'native_api_error_12500': {
      ar: 'خدمات Google Play غير متاحة أو تحتاج تحديث.',
      en: 'Google Play Services unavailable or needs update.',
    },
    'native_api_error_12501': {
      ar: 'تم إلغاء تسجيل الدخول بـ Google.',
      en: 'Google sign-in was cancelled.',
    },
    'native_cancelled': {
      ar: 'تم إلغاء تسجيل الدخول بـ Google.',
      en: 'Google sign-in was cancelled.',
    },
    'native_missing_id_token': {
      ar: 'لم يتم استلام رمز التحقق من Google. حاول مرة أخرى.',
      en: 'No ID token received from Google. Please try again.',
    },
    'native_not_initialized': {
      ar: 'لم يتم تهيئة Google Sign-In. أعد تشغيل التطبيق.',
      en: 'Google Sign-In not initialized. Restart the app.',
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
  const { onboardingCompleted } = usePreferencesStore();
  const androidBridge = (window as Window & { Android?: { startGoogleSignIn?: () => void } }).Android;
  const isAndroidWebView = typeof androidBridge !== 'undefined';
  const hasNativeGoogleSignIn = typeof androidBridge?.startGoogleSignIn === 'function';
  const [tab, setTab] = useState<'login' | 'guest'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { language: lang, setLanguage } = usePreferencesStore();

  // Block non-mobile access at component level (second safety layer after MobileOnlyGuard)
  if (!isMobileApp()) {
    return (
      <div dir="rtl" className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <Smartphone className="w-14 h-14 text-sky-400" />
        <div>
          <h2 className="text-white text-xl font-bold mb-2">تسجيل الدخول متاح على الموبايل فقط</h2>
          <p className="text-slate-400 text-sm">حمّل التطبيق على هاتفك الأندرويد</p>
        </div>
      </div>
    );
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const user = await authService.signInWithEmail(email, password);
      setUser(user);
      navigate(onboardingCompleted ? '/home' : '/onboarding');
    } catch (error) {
      setError(getAuthErrorMessage(getAuthErrorCode(error), lang, 'login'));
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
      navigate(onboardingCompleted ? '/home' : '/onboarding');
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
      navigate(onboardingCompleted ? '/home' : '/onboarding');
    } catch (error) {
      setError(getAuthErrorMessage(getAuthErrorCode(error), lang, 'google'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col overflow-y-auto hide-scrollbar px-4"
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 20px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)`,
      }}
    >
      <div className="mb-2 flex items-center justify-between md:mb-6">
        <div className="flex flex-1 items-center justify-center px-3 md:px-0">
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-sky-400/10 blur-2xl"></div>
            <img
              src="/icon.png"
              alt="ZeroEscape"
              className="relative rounded-xl object-cover h-[160px] w-[160px] md:h-[270px] md:w-[270px]"
            />
          </div>
        </div>
        <div className="hidden md:fixed md:bottom-6 md:right-6 md:z-50 md:flex md:items-center md:gap-2">
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

      <div className="mx-auto mb-4 flex w-full max-w-sm gap-2 rounded-2xl bg-slate-900 p-1 md:mb-8 md:max-w-none">
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
          onClick={() => navigate('/signup')}
          className="flex-1 rounded-xl py-2.5 text-sm font-medium transition md:py-3 md:text-base text-slate-400 hover:text-slate-300"
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

      <div className="mx-auto w-full max-w-sm md:max-w-none">
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting || (isAndroidWebView && !hasNativeGoogleSignIn)}
          className="mb-5 flex w-full items-center justify-center gap-3 rounded-2xl border border-slate-800 bg-slate-900 py-3.5 text-white transition hover:bg-slate-800 md:mb-6 md:py-4"
        >
          <Chrome className="h-5 w-5" />
          {lang === 'ar' ? 'دخول بـ جوجل' : 'Sign in with Google'}
        </button>

        {isAndroidWebView && !hasNativeGoogleSignIn && (
          <div className="mb-4 rounded-2xl border border-yellow-500/30 bg-yellow-500/10 px-4 py-3 text-right text-sm text-yellow-200">
            {lang === 'ar'
              ? 'تسجيل Google غير متاح داخل نسخة Android الحالية (WebView). استخدم البريد وكلمة المرور.'
              : 'Google sign-in is unavailable in the current Android WebView build. Use email and password.'}
          </div>
        )}

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
          <form onSubmit={handleLogin} className="space-y-3 md:space-y-5">
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
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 pr-12 text-white placeholder:text-slate-600 transition focus:border-sky-500 focus:outline-none md:py-4"
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
                  className="w-full rounded-2xl border border-slate-800 bg-slate-900 px-4 py-3 pl-12 pr-12 text-white placeholder:text-slate-600 transition focus:border-sky-500 focus:outline-none md:py-4"
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
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-700 py-3 text-white transition hover:opacity-90 md:py-4"
            >
              <LogIn className="h-5 w-5" />
              {isSubmitting ? (lang === 'ar' ? 'جاري التنفيذ...' : 'Please wait...') : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
            </button>

            <div className="mt-2 flex items-center justify-end gap-2 md:hidden">
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
