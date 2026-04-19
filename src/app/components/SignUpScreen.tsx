import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ChevronRight, ShieldAlert, Loader2, Smartphone } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { authService, getAuthErrorCode } from '../../services/authService';

const isMobileApp = (): boolean => {
  const ua = navigator.userAgent || '';
  return (
    /Android.*wv/.test(ua) ||
    typeof (window as Window & { Android?: unknown }).Android !== 'undefined' ||
    typeof (window as Window & { Capacitor?: unknown }).Capacitor !== 'undefined'
  );
};

const authErrorMessages: Record<string, string> = {
  'auth/email-already-in-use': 'هذا البريد الإلكتروني مستخدم بالفعل.',
  'auth/invalid-email': 'صيغة البريد الإلكتروني غير صحيحة.',
  'auth/weak-password': 'كلمة المرور ضعيفة. استخدم 8 أحرف على الأقل.',
  'auth/operation-not-allowed': 'تسجيل البريد الإلكتروني غير مفعّل في Firebase.',
  'auth/network-request-failed': 'مشكلة في الاتصال. تحقق من الإنترنت.',
  'auth/timeout': 'انتهت مهلة الاتصال. تحقق من الإنترنت وأعد المحاولة.',
};

export function SignUpScreen() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emergencyPin, setEmergencyPinInput] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Block non-mobile access at component level (second safety layer after MobileOnlyGuard)
  if (!isMobileApp()) {
    return (
      <div dir="rtl" className="fixed inset-0 bg-slate-950 flex flex-col items-center justify-center gap-6 px-6 text-center">
        <Smartphone className="w-14 h-14 text-sky-400" />
        <div>
          <h2 className="text-white text-xl font-bold mb-2">التسجيل متاح على الموبايل فقط</h2>
          <p className="text-slate-400 text-sm">حمّل التطبيق على هاتفك الأندرويد للتسجيل</p>
        </div>
      </div>
    );
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!name || !email || !password || !confirmPassword || !emergencyPin || !confirmPin) return;
    if (!acceptTerms) return;

    if (password !== confirmPassword) {
      setError('كلمتا المرور غير متطابقتين');
      return;
    }
    if (password.length < 8) {
      setError('كلمة المرور يجب أن تكون 8 أحرف على الأقل');
      return;
    }
    if (emergencyPin.length !== 4 || !/^\d{4}$/.test(emergencyPin)) {
      setError('رمز الطوارئ يجب أن يكون 4 أرقام');
      return;
    }
    if (emergencyPin !== confirmPin) {
      setError('رمزا الطوارئ غير متطابقين');
      return;
    }

    setIsSubmitting(true);
    try {
      const user = await authService.signUpWithEmail(name, email, password);
      setUser({
        ...user,
        emergencyPin,
        emergencyExitLog: [],
      });
      navigate('/onboarding');
    } catch (err) {
      const code = getAuthErrorCode(err);
      setError(authErrorMessages[code] ?? 'تعذر إنشاء الحساب. حاول مجدداً.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col px-4 overflow-y-auto hide-scrollbar"
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 20px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)`,
      }}
    >
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/login')}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-white text-xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-slate-500 text-xs">انضم إلى ZeroEscape No.1</p>
        </div>
      </div>

      <form onSubmit={handleSignUp} className="flex-1 space-y-5 mb-6">
        <div>
          <label className="text-slate-400 text-sm mb-2 block">الاسم الكامل</label>
          <div className="relative">
            <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="أحمد محمد"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 pr-12 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
              required
            />
          </div>
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-2 block">البريد الإلكتروني</label>
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
          <label className="text-slate-400 text-sm mb-2 block">كلمة المرور</label>
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
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          <p className="text-slate-500 text-xs mt-2 mr-1">يجب أن تحتوي على 8 أحرف على الأقل</p>
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-2 block">تأكيد كلمة المرور</label>
          <div className="relative">
            <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 pr-12 pl-12 text-white placeholder:text-slate-600 focus:border-blue-500 focus:outline-none transition"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-400"
            >
              {showConfirmPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Emergency PIN */}
        <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-2xl p-4 space-y-4">
          <div className="flex items-center gap-2 mb-1">
            <ShieldAlert className="w-5 h-5 text-yellow-400" />
            <p className="text-yellow-300 font-medium text-sm">رمز الخروج الطارئ (4 أرقام)</p>
          </div>
          <p className="text-slate-400 text-xs leading-relaxed">
            هذا الرمز يُستخدم فقط لإيقاف الجلسة في حالات الطوارئ — مرتان كحد أقصى يومياً لمدة 5 دقائق.
          </p>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">رمز الطوارئ</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={emergencyPin}
                onChange={(e) => setEmergencyPinInput(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                className="w-full bg-slate-900 border border-yellow-500/40 rounded-2xl px-4 py-4 pr-12 text-white text-center tracking-widest text-xl focus:border-yellow-500 focus:outline-none transition"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-slate-400 text-sm mb-2 block">تأكيد رمز الطوارئ</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-yellow-500" />
              <input
                type="password"
                inputMode="numeric"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                placeholder="••••"
                className="w-full bg-slate-900 border border-yellow-500/40 rounded-2xl px-4 py-4 pr-12 text-white text-center tracking-widest text-xl focus:border-yellow-500 focus:outline-none transition"
                required
              />
            </div>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl py-3 px-4">
            {error}
          </p>
        )}

        <button
          type="button"
          onClick={() => setAcceptTerms(!acceptTerms)}
          className="flex items-center gap-3 text-right"
        >
          <div className={`w-6 h-6 rounded-lg border-2 transition flex items-center justify-center ${
            acceptTerms
              ? 'bg-blue-500 border-blue-500'
              : 'border-slate-700'
          }`}>
            {acceptTerms && (
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
          <p className="text-slate-400 text-sm">
            أوافق على <span className="text-blue-400">الشروط والأحكام</span> و <span className="text-blue-400">سياسة الخصوصية</span>
          </p>
        </button>
      </form>

      <button
        type="submit"
        onClick={handleSignUp}
        disabled={isSubmitting || !acceptTerms || !name || !email || !password || !confirmPassword || emergencyPin.length !== 4 || confirmPin.length !== 4}
        className={`w-full py-4 rounded-2xl transition flex items-center justify-center gap-2 ${
          !isSubmitting && acceptTerms && name && email && password && confirmPassword && emergencyPin.length === 4 && confirmPin.length === 4
            ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:opacity-90'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            جارٍ الإنشاء...
          </>
        ) : (
          'إنشاء الحساب'
        )}
      </button>

      <div className="text-center mt-4">
        <button
          onClick={() => navigate('/login')}
          className="text-slate-400 text-sm"
        >
          لديك حساب بالفعل؟ <span className="text-blue-400 hover:text-blue-300">تسجيل الدخول</span>
        </button>
      </div>
    </div>
  );
}
