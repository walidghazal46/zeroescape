import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BookOpen, Briefcase, Moon, Settings as SettingsIcon } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';

const modes = [
  { id: 'study', icon: BookOpen, label: 'دراسة', duration: 120, color: 'from-blue-500 to-cyan-500' },
  { id: 'work', icon: Briefcase, label: 'عمل', duration: 90, color: 'from-violet-500 to-purple-500' },
  { id: 'sleep', icon: Moon, label: 'نوم', duration: 480, color: 'from-indigo-500 to-blue-500' },
  { id: 'custom', icon: SettingsIcon, label: 'مخصص', duration: 60, color: 'from-emerald-500 to-teal-500' },
];

export function StartSessionScreen() {
  const navigate = useNavigate();
  const { startSession, webProtectionEnabled } = useSessionStore();
  const [selectedMode, setSelectedMode] = useState('study');
  const [duration, setDuration] = useState(120);
  const [blockSocial, setBlockSocial] = useState(true);
  const [webFilter, setWebFilter] = useState(webProtectionEnabled);

  const selectedModeData = modes.find(m => m.id === selectedMode);

  const handleStart = () => {
    startSession(selectedMode, duration, blockSocial, webFilter);
    navigate('/active-session', { state: { mode: selectedMode, duration } });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      <div className="flex items-center gap-4 mb-8">
        <button
          onClick={() => navigate('/home')}
          className="p-2 text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold">بدء جلسة جديدة</h1>
      </div>

      <div className="flex-1 space-y-6 mb-6">
        <div>
          <label className="text-slate-400 text-sm mb-3 block">اختر نوع الجلسة</label>
          <div className="grid grid-cols-2 gap-3">
            {modes.map((mode) => {
              const Icon = mode.icon;
              const isSelected = selectedMode === mode.id;

              return (
                <button
                  key={mode.id}
                  onClick={() => {
                    setSelectedMode(mode.id);
                    setDuration(mode.duration);
                  }}
                  className={`p-5 rounded-2xl border-2 transition ${
                    isSelected
                      ? `bg-gradient-to-br ${mode.color} border-transparent`
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-8 h-8 mb-3 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <p className={`font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>{mode.label}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <label className="text-slate-400 text-sm mb-3 block">المدة (دقيقة)</label>
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
            <input
              type="range"
              min="15"
              max="480"
              step="15"
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full"
            />
            <div className={`text-center mt-4 text-3xl font-bold bg-gradient-to-r ${selectedModeData?.color} bg-clip-text text-transparent`}>
              {duration} دقيقة
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <button
            onClick={() => setBlockSocial(!blockSocial)}
            className={`w-full p-5 rounded-2xl border-2 transition flex items-center justify-between ${
              blockSocial
                ? 'bg-red-500/10 border-red-500/30'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="text-right flex-1">
              <h3 className="text-white font-medium mb-1">حظر مواقع التواصل</h3>
              <p className="text-slate-400 text-sm">انستقرام، تيك توك، سناب شات...</p>
            </div>
            <div className={`w-12 h-7 rounded-full transition relative ${
              blockSocial ? 'bg-red-500' : 'bg-slate-700'
            }`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                blockSocial ? 'left-1' : 'right-1'
              }`} />
            </div>
          </button>

          <button
            onClick={() => setWebFilter(!webFilter)}
            className={`w-full p-5 rounded-2xl border-2 transition flex items-center justify-between ${
              webFilter
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className="text-right flex-1">
              <h3 className="text-white font-medium mb-1">تصفية آمنة للويب</h3>
              <p className="text-slate-400 text-sm">حظر المحتوى الضار</p>
            </div>
            <div className={`w-12 h-7 rounded-full transition relative ${
              webFilter ? 'bg-emerald-500' : 'bg-slate-700'
            }`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${
                webFilter ? 'left-1' : 'right-1'
              }`} />
            </div>
          </button>
        </div>
      </div>

      <button
        onClick={handleStart}
        className={`w-full py-4 rounded-2xl bg-gradient-to-r ${selectedModeData?.color} text-white hover:opacity-90 transition`}
      >
        ابدأ الجلسة الآن
      </button>
    </div>
  );
}
