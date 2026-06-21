import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService, getAuthErrorCode } from '../../services/authService';
import { usePreferencesStore } from '../../store/preferencesStore';

const getAuthErrorMessage = (
  code: string,
  lang: 'ar' | 'en',
  action: 'login' | 'signup'
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
      ar: 'تسجيل الدخول بالبريد غير مفعل في Firebase.',
      en: 'Email sign-in is not enabled in Firebase.',
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

  const fallbackByAction: Record<'login' | 'signup', { ar: string; en: string }> = {
    login: {
      ar: 'تعذر تسجيل الدخول. تحقق من البريد وكلمة المرور.',
      en: 'Unable to sign in. Check your email and password.',
    },
    signup: {
      ar: 'تعذر إنشاء الحساب.',
      en: 'Unable to create account.',
    },
  };

  const selected = messages[code] || fallbackByAction[action];
  return lang === 'ar' ? selected.ar : selected.en;
};

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
        <span className="absolute top-1/2 -translate-y-1/2 right-4 text-slate-500 pointer-events-none flex">
          {iconRight}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-2xl text-right outline-none transition"
        style={{
          background: 'rgba(255,255,255,0.92)',
          border: '1px solid rgba(15,118,110,0.16)',
          color: '#10201d',
          fontSize: 'var(--text-base)',
          padding: '0.9rem 3rem 0.9rem 3rem',
          boxShadow: '0 8px 24px rgba(15,23,42,0.05)',
        }}
      />
      {iconLeft && (
        <span className="absolute top-1/2 -translate-y-1/2 left-4 text-slate-500 flex">
          {iconLeft}
        </span>
      )}
    </div>
  );
}

export function LoginScreen() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const { onboardingCompleted, language: lang, setLanguage } = usePreferencesStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  return (
    <div
      dir="rtl"
      className="min-h-screen overflow-y-auto hide-scrollbar flex flex-col"
      style={{ background: '#f3f7f4' }}
    >
      <div
        className="relative flex flex-col items-center justify-end overflow-hidden flex-shrink-0"
        style={{
          paddingTop: 'calc(env(safe-area-inset-top, 0px) + 28px)',
          paddingBottom: 34,
          background: 'linear-gradient(180deg, #dff6ed 0%, #f3f7f4 100%)',
          minHeight: '30vh',
        }}
      >
        <div
          className="absolute inset-x-8 top-10 h-28 rounded-[999px] pointer-events-none"
          style={{ background: 'rgba(20,184,166,0.16)', filter: 'blur(38px)' }}
        />

        <div className="absolute flex items-center gap-1.5" style={{ top: 'calc(env(safe-area-inset-top, 0px) + 14px)', left: 16 }}>
          {(['ar', 'en'] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLanguage(l)}
              className="rounded-lg px-2.5 py-1 transition"
              style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 700,
                background: lang === l ? 'rgba(13,148,136,0.14)' : 'transparent',
                color: lang === l ? '#0f766e' : '#64748b',
                border: `1px solid ${lang === l ? 'rgba(13,148,136,0.28)' : 'transparent'}`,
              }}
            >
              {l === 'ar' ? 'ع' : 'EN'}
            </button>
          ))}
        </div>

        <img
          src="/icon.png"
          alt="ZeroEscape"
          className="relative rounded-[22px] mb-4"
          style={{ width: 74, height: 74, boxShadow: '0 18px 42px rgba(15,118,110,0.22)' }}
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
        <h1 className="font-black text-center" style={{ fontSize: 'var(--text-xl)', color: '#10201d' }}>
          Zero<span style={{ color: '#0d9488' }}>Escape</span>{' '}
          <span style={{ color: 'rgba(13,148,136,0.55)', fontSize: 'var(--text-sm)' }}>No.1</span>
        </h1>
        <p className="text-center mt-1" style={{ fontSize: 'var(--text-xs)', color: '#64748b' }}>
          {lang === 'ar' ? 'تسجيل آمن بالبريد الإلكتروني فقط' : 'Secure email-only sign in'}
        </p>
      </div>

      <div
        className="flex-1 flex flex-col px-5"
        style={{
          paddingTop: 24,
          paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 28px)',
        }}
      >
        <div
          className="grid grid-cols-2 gap-2 rounded-2xl p-1 mb-5"
          style={{ background: '#ffffff', border: '1px solid rgba(13,148,136,0.14)' }}
        >
          <button
            type="button"
            className="rounded-xl py-3 font-bold"
            style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)', color: '#ffffff' }}
          >
            {lang === 'ar' ? 'دخول' : 'Login'}
          </button>
          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="rounded-xl py-3 font-bold transition"
            style={{ color: '#64748b' }}
          >
            {lang === 'ar' ? 'حساب جديد' : 'Sign Up'}
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mb-4 rounded-xl px-4 py-3 text-right"
              style={{
                background: 'rgba(239,68,68,0.1)',
                border: '1px solid rgba(239,68,68,0.22)',
                fontSize: 'var(--text-sm)',
                color: '#b91c1c',
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.form
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.28 }}
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <div>
            <label className="block mb-2 text-right font-semibold" style={{ fontSize: 'var(--text-sm)', color: '#334155' }}>
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
            <label className="block mb-2 text-right font-semibold" style={{ fontSize: 'var(--text-sm)', color: '#334155' }}>
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
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="flex">
                  {showPassword
                    ? <EyeOff style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
                    : <Eye style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />}
                </button>
              }
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex items-center justify-center gap-2 rounded-2xl transition active:scale-[0.98]"
            style={{
              height: 'var(--btn-h)',
              background: isSubmitting ? 'rgba(13,148,136,0.45)' : 'linear-gradient(135deg, #0d9488, #14b8a6)',
              color: '#ffffff',
              fontWeight: 800,
              boxShadow: isSubmitting ? 'none' : '0 14px 30px rgba(13,148,136,0.24)',
            }}
          >
            <LogIn style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
            {isSubmitting
              ? (lang === 'ar' ? 'جاري التنفيذ...' : 'Please wait...')
              : (lang === 'ar' ? 'تسجيل الدخول' : 'Sign In')}
          </button>

          <button
            type="button"
            onClick={() => navigate('/signup')}
            className="w-full flex items-center justify-center gap-2 rounded-2xl transition"
            style={{
              height: 48,
              background: '#ffffff',
              border: '1px solid rgba(13,148,136,0.14)',
              color: '#0f766e',
              fontWeight: 700,
            }}
          >
            <UserPlus style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)' }} />
            {lang === 'ar' ? 'إنشاء حساب بالبريد الإلكتروني' : 'Create email account'}
          </button>
        </motion.form>
      </div>
    </div>
  );
}
