import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, Chrome, LogIn, Zap, Smartphone, CheckCircle2 } from 'lucide-react';
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

/* ── Reusable styled input ────────────────────────────────────────────────── */
interface ZeInputProps {
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  required?: boolean;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
}
function ZeInput({ type, value, onChange, placeholder, required, iconRight, iconLeft }: ZeInputProps) {
  return (
    <div className="relative">
      {iconRight && (
        <span
          className="absolute top-1/2 -translate-y-1/2"
          style={{ right: 16, color: '#6b8079', pointerEvents: 'none', display: 'flex' }}
        >
          {iconRight}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="ze-input w-full rounded-2xl text-right"
        style={{
          background: 'rgba(255,255,255,0.85)',
          border: '1.5px solid rgba(21,184,166,0.18)',
          color: '#1c2e2b',
          fontSize: 'var(--text-base)',
          padding: '0.85rem 3rem 0.85rem 3rem',
          outline: 'none',
          transition: 'border-color 0.2s, box-shadow 0.2s',
        }}
      />
      {iconLeft && (
        <span
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: 16, color: '#6b8079', display: 'flex' }}
        >
          {iconLeft}
        </span>
      )}
    </div>
  );
}

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

  // Mobile-only guard temporarily bypassed for browser preview
  // if (!isMobileApp()) { ... }

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
      dir="rtl"
      className="min-h-screen overflow-y-auto hide-scrollbar flex flex-col"
      style={{ background: '#f6f5ef' }}
    >
      {/* ── Top hero section ── */}
      <div
        className="relative flex flex-col items-center justify-end overflow-hidden flex-shrink-0"
        style={{
          paddingTop: `calc(env(safe-area-inset-top, 0px) + 28px)`,
          paddingBottom: 32,
          background: 'linear-gradient(180deg, #eaf6f1 0%, #f6f5ef 100%)',
          minHeight: '28vh',
        }}
      >
        {/* Ambient blob top-right */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: -20,
            right: -30,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(76,175,125,0.3) 0%, transparent 70%)',
            filter: 'blur(32px)',
          }}
        />
        {/* App icon */}
        <div className="relative mb-4">
          <div
            className="absolute rounded-[24px]"
            style={{
              inset: -2,
              background: 'linear-gradient(135deg, #15b8a660, #4caf7d60)',
              borderRadius: 26,
            }}
          />
          <img
            src="/icon.png"
            alt="ZeroEscape"
            className="relative rounded-[22px]"
            style={{
              width: 72,
              height: 72,
              boxShadow: '0 12px 40px rgba(0,0,0,0.55)',
            }}
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
        </div>
        <h1
          className="font-bold text-center"
          style={{ fontSize: 'var(--text-xl)', color: '#1c2e2b' }}
        >
          Zero<span style={{ color: '#15b8a6' }}>Escape</span>{' '}
          <span style={{ color: 'rgba(21,184,166,0.5)', fontSize: 'var(--text-sm)' }}>No.1</span>
        </h1>
        <p
          className="text-center mt-1"
          style={{ fontSize: 'var(--text-xs)', color: '#6b8079', letterSpacing: '0.02em' }}
        >
          حماية رقمية ذكية لحياة أفضل
        </p>

        {/* Language switcher */}
        <div
          className="absolute flex items-center gap-1.5"
          style={{ top: `calc(env(safe-area-inset-top, 0px) + 14px)`, left: 16 }}
        >
          {(['ar', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className="rounded-lg px-2.5 py-1 transition"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 600,
                background: lang === l ? 'rgba(21,184,166,0.18)' : 'transparent',
                color: lang === l ? '#15b8a6' : '#6b8079',
                border: `1px solid ${lang === l ? 'rgba(21,184,166,0.35)' : 'transparent'}`,
              }}
            >
              {l === 'ar' ? 'ع' : 'EN'}
            </button>
          ))}
        </div>
      </div>

      {/* ── Card section ── */}
      <div
        className="flex-1 flex flex-col px-5"
        style={{
          paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 28px)`,
          paddingTop: 24,
        }}
      >
        {/* ── Tab switcher ── */}
        <div
          className="flex rounded-2xl p-1 mb-6"
          style={{ background: 'rgba(255,255,255,0.7)', border: '1px solid rgba(21,184,166,0.14)' }}
        >
          {[
            { key: 'login', label: lang === 'ar' ? 'دخول' : 'Login' },
            { key: 'signup', label: lang === 'ar' ? 'حساب جديد' : 'Sign Up', isNav: true },
            { key: 'guest', label: lang === 'ar' ? 'ضيف' : 'Guest' },
          ].map(({ key, label, isNav }) => {
            const isActive = tab === key;
            return (
              <button
                key={key}
                onClick={() => {
                  if (isNav) {
                    navigate('/signup');
                  } else {
                    setTab(key as 'login' | 'guest');
                  }
                }}
                className="flex-1 rounded-xl py-2.5 transition relative"
                style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: isActive ? '#f6f5ef' : '#6b8079',
                  background: isActive
                    ? 'linear-gradient(135deg, #15b8a6, #0d9488)'
                    : 'transparent',
                  boxShadow: isActive ? '0 4px 16px rgba(21,184,166,0.25)' : 'none',
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* ── Google sign-in ── */}
        <button
          onClick={handleGoogleSignIn}
          disabled={isSubmitting || (isAndroidWebView && !hasNativeGoogleSignIn)}
          className="flex w-full items-center justify-center gap-3 rounded-2xl mb-4 transition ze-card-hover"
          style={{
            height: 'var(--btn-h)',
            background: 'rgba(255,255,255,0.85)',
            border: '1.5px solid rgba(21,184,166,0.18)',
            color: '#1c2e2b',
            fontSize: 'var(--text-sm)',
            fontWeight: 600,
            opacity: isSubmitting || (isAndroidWebView && !hasNativeGoogleSignIn) ? 0.45 : 1,
          }}
        >
          <Chrome style={{ width: 'var(--icon-md)', height: 'var(--icon-md)', flexShrink: 0 }} />
          {lang === 'ar' ? 'المتابعة بحساب جوجل' : 'Continue with Google'}
        </button>

        {isAndroidWebView && !hasNativeGoogleSignIn && (
          <div
            className="mb-4 rounded-xl px-4 py-3 text-right"
            style={{
              background: 'rgba(249,115,22,0.1)',
              border: '1px solid rgba(249,115,22,0.25)',
              fontSize: 'var(--text-xs)',
              color: '#fed7aa',
            }}
          >
            {lang === 'ar'
              ? 'تسجيل Google غير متاح في هذه النسخة. استخدم البريد وكلمة المرور.'
              : 'Google sign-in unavailable in this build. Use email and password.'}
          </div>
        )}

        {/* ── Divider ── */}
        <div className="relative mb-4">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full" style={{ height: 1, background: 'rgba(21,184,166,0.14)' }} />
          </div>
          <div className="relative flex justify-center">
            <span
              className="px-3"
              style={{ background: '#f6f5ef', fontSize: 'var(--text-xs)', color: '#6b8079' }}
            >
              {lang === 'ar' ? 'أو' : 'or'}
            </span>
          </div>
        </div>

        {/* ── Error message ── */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 rounded-xl px-4 py-3 text-right"
              style={{
                background: 'rgba(240,62,62,0.1)',
                border: '1px solid rgba(240,62,62,0.25)',
                fontSize: 'var(--text-sm)',
                color: '#fca5a5',
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Login tab ── */}
        <AnimatePresence mode="wait">
          {tab === 'login' && (
            <motion.form
              key="login-form"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div>
                <label
                  className="block mb-2 text-right"
                  style={{ fontSize: 'var(--text-sm)', color: '#a9a7c8', fontWeight: 500 }}
                >
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                </label>
                <ZeInput
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  iconRight={<Mail style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />}
                />
              </div>

              <div>
                <label
                  className="block mb-2 text-right"
                  style={{ fontSize: 'var(--text-sm)', color: '#a9a7c8', fontWeight: 500 }}
                >
                  {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                </label>
                <ZeInput
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  iconRight={<Lock style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />}
                  iconLeft={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{ color: '#6b8079', display: 'flex' }}
                    >
                      {showPassword
                        ? <EyeOff style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
                        : <Eye style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />}
                    </button>
                  }
                />
              </div>

              <button
                type="button"
                className="text-right w-full transition"
                style={{ fontSize: 'var(--text-sm)', color: '#15b8a6' }}
              >
                {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot password?'}
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary transition ze-card-hover"
                style={{
                  background: isSubmitting
                    ? 'rgba(21,184,166,0.4)'
                    : 'linear-gradient(135deg, #15b8a6, #0d9488)',
                  color: '#f6f5ef',
                  fontWeight: 700,
                  boxShadow: isSubmitting ? 'none' : '0 6px 24px rgba(21,184,166,0.3)',
                }}
              >
                <LogIn style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)', marginLeft: 8 }} />
                {isSubmitting
                  ? (lang === 'ar' ? 'جاري التنفيذ...' : 'Please wait...')
                  : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
              </button>
            </motion.form>
          )}

          {/* ── Guest tab ── */}
          {tab === 'guest' && (
            <motion.div
              key="guest-tab"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28 }}
              className="space-y-4"
            >
              {/* Trial highlight card */}
              <div
                className="rounded-2xl p-5 relative overflow-hidden"
                style={{
                  background: 'linear-gradient(135deg, rgba(76,175,125,0.2) 0%, rgba(16,217,140,0.1) 100%)',
                  border: '1.5px solid rgba(21,184,166,0.22)',
                }}
              >
                {/* Gold accent strip */}
                <div
                  className="absolute top-0 right-0 h-full w-1 rounded-r-2xl"
                  style={{ background: 'linear-gradient(180deg, #15b8a6, #0d9488)' }}
                />
                <div className="flex items-start gap-4 text-right">
                  <div
                    className="rounded-2xl flex items-center justify-center flex-shrink-0"
                    style={{
                      width: 48,
                      height: 48,
                      background: 'rgba(21,184,166,0.15)',
                      border: '1px solid rgba(21,184,166,0.25)',
                    }}
                  >
                    <Zap style={{ width: 22, height: 22, color: '#15b8a6' }} />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-bold mb-1"
                      style={{ fontSize: 'var(--text-base)', color: '#1c2e2b' }}
                    >
                      {lang === 'ar' ? 'جرّب التطبيق مجاناً' : 'Try for Free'}
                    </h3>
                    <p style={{ fontSize: 'var(--text-sm)', color: '#6b8079', lineHeight: 1.6 }}>
                      {lang === 'ar'
                        ? 'احصل على 48 ساعة كاملة لاستكشاف جميع الميزات دون الحاجة لحساب'
                        : 'Get 48 hours to explore all features without an account'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Feature checklist */}
              <div
                className="rounded-2xl p-4 space-y-3"
                style={{
                  background: 'rgba(255,255,255,0.7)',
                  border: '1.5px solid rgba(21,184,166,0.14)',
                }}
              >
                {[
                  { label: lang === 'ar' ? '48 ساعة استخدام' : '48 hours trial', value: '48h' },
                  { label: lang === 'ar' ? 'جميع الميزات متاحة' : 'All features unlocked', value: '✓' },
                  { label: lang === 'ar' ? 'بدون بطاقة ائتمانية' : 'No credit card', value: lang === 'ar' ? 'مجاني' : 'Free' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 style={{ width: 16, height: 16, color: '#10d98c', flexShrink: 0 }} />
                      <span style={{ fontSize: 'var(--text-sm)', color: '#a9a7c8' }}>{label}</span>
                    </div>
                    <span style={{ fontSize: 'var(--text-sm)', fontWeight: 700, color: '#1c2e2b' }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>

              <button
                onClick={handleGuestMode}
                disabled={isSubmitting}
                className="btn-primary transition ze-card-hover"
                style={{
                  background: isSubmitting
                    ? 'rgba(76,175,125,0.4)'
                    : 'linear-gradient(135deg, #4caf7d, #4caf7d)',
                  color: '#1c2e2b',
                  fontWeight: 700,
                  boxShadow: isSubmitting ? 'none' : '0 6px 24px rgba(76,175,125,0.3)',
                }}
              >
                <Zap style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)', marginLeft: 8 }} />
                {lang === 'ar' ? 'ابدأ كضيف — مجاناً' : 'Start as Guest — Free'}
              </button>

              <p
                className="text-center"
                style={{ fontSize: 'var(--text-xs)', color: '#6b8079' }}
              >
                {lang === 'ar'
                  ? 'بعد انتهاء 48 ساعة، يمكنك الاشتراك برسوم رمزية'
                  : 'After 48 hours, you can upgrade to premium'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
