import { useNavigate } from 'react-router-dom';
import { RotateCw, CheckCircle2, Clock } from 'lucide-react';

export function RestartRecoveryScreen() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-violet-600 p-8 rounded-full inline-block">
            <RotateCw className="w-20 h-20 text-white" strokeWidth={2} />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            <h1 className="text-white text-3xl font-bold">تم استعادة الجلسة</h1>
          </div>
          <p className="text-slate-400 text-lg leading-relaxed">
            جلسة التركيز الخاصة بك نشطة ومحمية مرة أخرى
          </p>
        </div>

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-5 h-5 text-blue-400" />
            <span className="text-slate-400">الوقت المتبقي</span>
          </div>
          <div className="text-5xl font-bold text-white">
            02:15:43
          </div>
          <div className="pt-4 border-t border-slate-800">
            <p className="text-slate-400 text-sm">جلسة دراسة</p>
          </div>
        </div>

        <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-5">
          <p className="text-emerald-300 text-sm leading-relaxed">
            تم استعادة جميع إعدادات الحظر والحماية بنجاح بعد إعادة تشغيل الجهاز
          </p>
        </div>

        <button
          onClick={() => navigate('/active-session')}
          className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl hover:opacity-90 transition"
        >
          متابعة الجلسة
        </button>
      </div>
    </div>
  );
}
