import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, AlertTriangle, Lock } from 'lucide-react';

export function EmergencyExitScreen() {
  const navigate = useNavigate();
  const [pin, setPin] = useState('');
  const [reason, setReason] = useState('');

  const handleExit = () => {
    if (pin.length >= 4) {
      navigate('/home');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/active-session')}
          className="p-2 text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">خروج طارئ</h1>
      </div>

      <div className="flex-1 flex flex-col justify-center space-y-8">
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-6 flex items-start gap-4">
          <AlertTriangle className="w-6 h-6 text-yellow-400 flex-shrink-0 mt-1" />
          <div className="text-right">
            <h3 className="text-yellow-400 font-medium mb-2">تحذير هام</h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              الخروج من الجلسة مبكراً سيؤثر على إحصائياتك وتقدمك. استخدم هذه الميزة في الحالات الطارئة فقط.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-slate-400 text-sm mb-3 block">أدخل رمز PIN</label>
            <div className="relative">
              <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                placeholder="****"
                maxLength={4}
                className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 pr-12 text-white text-center text-2xl tracking-widest focus:border-blue-500 focus:outline-none transition"
              />
            </div>
          </div>

          <div>
            <label className="text-slate-400 text-sm mb-3 block">السبب (اختياري)</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="لماذا تحتاج للخروج؟"
              rows={4}
              className="w-full bg-slate-900 border border-slate-800 rounded-2xl px-4 py-4 text-white resize-none focus:border-blue-500 focus:outline-none transition"
            />
          </div>
        </div>
      </div>

      <button
        onClick={handleExit}
        disabled={pin.length < 4}
        className={`w-full py-4 rounded-2xl transition ${
          pin.length >= 4
            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white hover:opacity-90'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        تأكيد الخروج
      </button>
    </div>
  );
}
