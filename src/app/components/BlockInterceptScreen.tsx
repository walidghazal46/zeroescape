import { useNavigate } from 'react-router-dom';
import { ShieldX, Clock, ChevronRight } from 'lucide-react';

export function BlockInterceptScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-red-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-red-500 to-pink-600 p-8 rounded-full inline-block">
            <ShieldX className="w-20 h-20 text-white" strokeWidth={2} />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-white text-3xl font-bold">محظور مؤقتاً</h1>
          <p className="text-slate-400 text-lg leading-relaxed">
            هذا التطبيق محظور خلال جلسة التركيز الحالية
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400">الوقت المتبقي</span>
          </div>
          <div className="text-4xl font-bold text-white">
            01:45:32
          </div>
        </div>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-5">
          <p className="text-blue-300 text-sm leading-relaxed">
            ركّز على هدفك! يمكنك استخدام هذا التطبيق بعد انتهاء الجلسة
          </p>
        </div>

        <button
          onClick={() => navigate('/active-session')}
          className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition"
        >
          العودة للجلسة
          <ChevronRight className="w-5 h-5" />
        </button>

        <button
          onClick={() => navigate('/emergency-exit')}
          className="text-slate-500 hover:text-slate-400 transition text-sm"
        >
          خروج طارئ
        </button>
      </div>
    </div>
  );
}
