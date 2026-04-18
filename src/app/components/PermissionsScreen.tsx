import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Accessibility, Shield, Power, Lock, CheckCircle2, XCircle } from 'lucide-react';

const permissions = [
  { id: 'usage', icon: Eye, title: 'الوصول للاستخدام', description: 'لمراقبة وحظر التطبيقات' },
  { id: 'accessibility', icon: Accessibility, title: 'إمكانية الوصول', description: 'للكشف عن التطبيقات المفتوحة' },
  { id: 'vpn', icon: Shield, title: 'حماية DNS', description: 'لتصفية المواقع الضارة' },
  { id: 'boot', icon: Power, title: 'التشغيل التلقائي', description: 'لمواصلة الجلسة بعد إعادة التشغيل' },
  { id: 'admin', icon: Lock, title: 'صلاحيات الجهاز', description: 'للحماية القصوى' },
];

export function PermissionsScreen() {
  const navigate = useNavigate();
  const [granted, setGranted] = useState<Record<string, boolean>>({});

  const togglePermission = (id: string) => {
    setGranted(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const allGranted = permissions.every(p => granted[p.id]);

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="mb-8">
        <h1 className="text-white text-2xl font-bold mb-2">الأذونات المطلوبة</h1>
        <p className="text-slate-400">نحتاج هذه الأذونات لحماية جلسات التركيز</p>
      </div>

      <div className="flex-1 space-y-3 mb-6">
        {permissions.map((permission) => {
          const Icon = permission.icon;
          const isGranted = granted[permission.id];

          return (
            <button
              key={permission.id}
              onClick={() => togglePermission(permission.id)}
              className="w-full bg-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800 transition border border-slate-800"
            >
              <div className={`p-3 rounded-xl ${isGranted ? 'bg-green-500/20' : 'bg-slate-800'}`}>
                <Icon className={`w-6 h-6 ${isGranted ? 'text-green-400' : 'text-slate-400'}`} />
              </div>

              <div className="flex-1 text-right">
                <h3 className="text-white font-medium mb-1">{permission.title}</h3>
                <p className="text-slate-400 text-sm">{permission.description}</p>
              </div>

              {isGranted ? (
                <CheckCircle2 className="w-6 h-6 text-green-400" />
              ) : (
                <XCircle className="w-6 h-6 text-slate-600" />
              )}
            </button>
          );
        })}
      </div>

      <button
        onClick={() => navigate('/home')}
        disabled={!allGranted}
        className={`w-full py-4 rounded-2xl transition ${
          allGranted
            ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:opacity-90'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        {allGranted ? 'متابعة' : 'منح جميع الأذونات أولاً'}
      </button>
    </div>
  );
}
