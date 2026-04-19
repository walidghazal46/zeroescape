/**
 * AdminPinScreen
 * ────────────────────────────────────────────────────────────────────
 * A 6-digit PIN gate that protects the Admin Dashboard.
 * Only visible/reachable if the current user's email is ADMIN_EMAIL.
 * The PIN is hardcoded for now (793131); replace with a server-side
 * check or hashed comparison before production hardening.
 */
import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuthStore, ADMIN_EMAIL } from '../../store/authStore';

// Admin PIN — move to env / server-side check before publishing to prod
const ADMIN_PIN = '793131';
const PIN_LENGTH = 6;

export function AdminPinScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Security: redirect if not admin
  useEffect(() => {
    if (!user || user.email !== ADMIN_EMAIL) {
      navigate('/home', { replace: true });
    }
  }, [user, navigate]);

  useEffect(() => {
    // Focus the hidden input on mount
    inputRef.current?.focus();
  }, []);

  const handleDigit = (digit: string) => {
    if (pin.length >= PIN_LENGTH) return;
    const next = pin + digit;
    setPin(next);
    setError('');
    if (next.length === PIN_LENGTH) {
      verifyPin(next);
    }
  };

  const handleDelete = () => {
    setPin(prev => prev.slice(0, -1));
    setError('');
  };

  const verifyPin = (entered: string) => {
    if (entered === ADMIN_PIN) {
      navigate('/admin', { replace: true });
    } else {
      const next = attempts + 1;
      setAttempts(next);
      setError(next >= 3 ? 'تم تجاوز المحاولات المسموح بها' : 'PIN غير صحيح');
      setTimeout(() => setPin(''), 400);
    }
  };

  const dots = Array.from({ length: PIN_LENGTH }, (_, i) => i < pin.length);

  const KEYS = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['', '0', 'del'],
  ];

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-slate-950 flex flex-col items-center"
      style={{ paddingTop: 'env(safe-area-inset-top, 24px)' }}
    >
      {/* Header */}
      <div className="w-full flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => navigate('/settings')}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
        <h1 className="text-white text-lg font-bold flex-1 text-center">لوحة الأدمن</h1>
        <div className="w-9" />
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-8 gap-8 w-full max-w-sm">
        {/* Icon */}
        <div className="w-20 h-20 rounded-[24px] bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center shadow-xl shadow-violet-500/30">
          <ShieldCheck className="w-10 h-10 text-white" />
        </div>

        <div className="text-center space-y-1">
          <h2 className="text-white text-xl font-bold">أدخل رمز الأدمن</h2>
          <p className="text-slate-500 text-sm">6 أرقام للدخول إلى لوحة التحكم</p>
        </div>

        {/* PIN dots */}
        <div className="flex items-center justify-center gap-3">
          {dots.map((filled, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full transition-all duration-200 ${
                filled ? 'bg-violet-500 scale-110' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2">
            <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            <span className="text-red-400 text-sm">{error}</span>
          </div>
        )}

        {/* Keypad */}
        <div className="w-full grid grid-cols-3 gap-3">
          {KEYS.flat().map((key, i) => {
            if (key === '') return <div key={i} />;
            if (key === 'del') {
              return (
                <button
                  key={i}
                  onPointerDown={() => handleDelete()}
                  className="h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-white hover:bg-slate-700 active:scale-95 transition"
                >
                  ⌫
                </button>
              );
            }
            return (
              <button
                key={i}
                onPointerDown={() => handleDigit(key)}
                disabled={attempts >= 3}
                className="h-16 rounded-2xl bg-slate-900 border border-slate-800 text-white text-xl font-semibold hover:bg-slate-800 active:scale-95 transition disabled:opacity-40"
              >
                {key}
              </button>
            );
          })}
        </div>
      </div>

      {/* Hidden input for keyboard support */}
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        className="sr-only"
        value={pin}
        onChange={e => {
          const val = e.target.value.replace(/\D/g, '').slice(0, PIN_LENGTH);
          setPin(val);
          if (val.length === PIN_LENGTH) verifyPin(val);
        }}
      />
    </div>
  );
}
