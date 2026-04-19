import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, CheckCircle2 } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';

const categories = [
  { id: 'adult', label: 'المحتوى الإباحي' },
  { id: 'gambling', label: 'المقامرة' },
  { id: 'violence', label: 'العنف الشديد' },
  { id: 'malware', label: 'البرمجيات الضارة' },
  { id: 'phishing', label: 'الاحتيال والتصيد' },
  { id: 'hate', label: 'خطاب الكراهية' },
];

export function WebProtectionScreen() {
  const navigate = useNavigate();
  const { webProtectionEnabled, setWebProtection } = useSessionStore();
  const enabled = webProtectionEnabled;

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
          onClick={() => navigate('/home')}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">حماية الويب</h1>
      </div>

      <div className="bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border border-emerald-500/20 rounded-3xl p-6 mb-6">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-4 bg-emerald-500/20 rounded-2xl">
            <Shield className="w-8 h-8 text-emerald-400" />
          </div>
          <div className="flex-1 text-right">
            <h2 className="text-white font-bold mb-1">الحماية الآمنة</h2>
            <p className="text-slate-400 text-sm">فلترة DNS نشطة</p>
          </div>
          <button
            onClick={() => setWebProtection(!enabled)}
            className={`w-14 h-8 rounded-full transition relative ${
              enabled ? 'bg-emerald-500' : 'bg-slate-700'
            }`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
              enabled ? 'left-1' : 'right-1'
            }`} />
          </button>
        </div>

        <div className="bg-slate-900/50 rounded-xl p-4">
          <p className="text-slate-300 text-sm leading-relaxed">
            يتم تصفية جميع طلبات الإنترنت عبر DNS آمن لحظر المواقع الضارة والمحتوى غير المناسب تلقائياً
          </p>
        </div>
      </div>

      <div className="flex-1">
        <h3 className="text-white font-medium mb-4">الفئات المحمية</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-slate-900 rounded-2xl p-5 flex items-center gap-4 border border-slate-800"
            >
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
              <div className="flex-1 text-right">
                <h4 className="text-white font-medium">{category.label}</h4>
              </div>
              <div className="px-3 py-1 bg-emerald-500/20 rounded-lg">
                <span className="text-emerald-400 text-sm">محظور</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
