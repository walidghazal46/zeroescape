import { useNavigate } from 'react-router-dom';
import { ChevronRight, Instagram, MessageCircle, Twitter, Youtube, Music, Gamepad2 } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';

const apps = [
  { id: 'instagram', icon: Instagram, name: 'Instagram', color: 'text-pink-400' },
  { id: 'whatsapp', icon: MessageCircle, name: 'WhatsApp', color: 'text-green-400' },
  { id: 'twitter', icon: Twitter, name: 'Twitter', color: 'text-blue-400' },
  { id: 'youtube', icon: Youtube, name: 'YouTube', color: 'text-red-400' },
  { id: 'spotify', icon: Music, name: 'Spotify', color: 'text-emerald-400' },
  { id: 'tiktok', icon: Music, name: 'TikTok', color: 'text-cyan-400' },
  { id: 'snapchat', icon: MessageCircle, name: 'Snapchat', color: 'text-yellow-400' },
  { id: 'games', icon: Gamepad2, name: 'الألعاب', color: 'text-purple-400' },
];

export function BlockedAppsScreen() {
  const navigate = useNavigate();
  const { blockedApps, setBlockedApp, blockAllApps } = useSessionStore();

  const toggleApp = (id: string) => {
    setBlockedApp(id, !blockedApps[id]);
  };

  const blockedCount = Object.values(blockedApps).filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/home')}
          className="p-2 text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <div className="flex-1">
          <h1 className="text-white text-2xl font-bold">التطبيقات المحظورة</h1>
          <p className="text-slate-400 text-sm">{blockedCount} تطبيق محظور</p>
        </div>
      </div>

      <button
        onClick={blockAllApps}
        className="mb-6 bg-gradient-to-r from-red-500 to-pink-600 text-white py-4 rounded-2xl hover:opacity-90 transition"
      >
        حظر جميع تطبيقات التواصل
      </button>

      <div className="flex-1 space-y-3">
        {apps.map((app) => {
          const Icon = app.icon;
          const isBlocked = blockedApps[app.id];

          return (
            <button
              key={app.id}
              onClick={() => toggleApp(app.id)}
              className="w-full bg-slate-900 rounded-2xl p-5 flex items-center gap-4 hover:bg-slate-800 transition border border-slate-800"
            >
              <div className={`p-3 rounded-xl ${isBlocked ? 'bg-red-500/20' : 'bg-slate-800'}`}>
                <Icon className={`w-6 h-6 ${isBlocked ? 'text-red-400' : app.color}`} />
              </div>

              <div className="flex-1 text-right">
                <h3 className="text-white font-medium">{app.name}</h3>
                <p className="text-slate-400 text-sm">{isBlocked ? 'محظور' : 'غير محظور'}</p>
              </div>

              <div className={`w-12 h-7 rounded-full transition relative ${
                isBlocked ? 'bg-red-500' : 'bg-slate-700'
              }`}>
                <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                  isBlocked ? 'left-1' : 'right-1'
                }`} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
