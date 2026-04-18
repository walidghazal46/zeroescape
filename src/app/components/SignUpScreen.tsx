import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, ChevronRight } from 'lucide-react';

export function SignUpScreen() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password && confirmPassword && acceptTerms) {
      if (password === confirmPassword) {
        navigate('/onboarding');
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/login')}
          className="p-2 text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div>
          <h1 className="text-white text-2xl font-bold">إنشاء حساب جديد</h1>
          <p className="text-slate-400 text-sm">انضم إلى ZeroEscape No.1</p>
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
        disabled={!acceptTerms || !name || !email || !password || !confirmPassword}
        className={`w-full py-4 rounded-2xl transition ${
          acceptTerms && name && email && password && confirmPassword
            ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:opacity-90'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        إنشاء الحساب
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
