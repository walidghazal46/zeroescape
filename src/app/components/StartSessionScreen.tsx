import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BookOpen, Briefcase, Moon, Settings as SettingsIcon, Zap } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { USER_GOALS } from '../../core/types';

const MIN_DURATION = 1;
const MAX_DURATION = 480;
const DURATION_PRESETS = [15, 30, 45, 60, 90, 120, 180, 240, 480];

const modes = [
  { id: 'study', icon: BookOpen, label: 'دراسة', duration: 90, color: 'from-blue-500 to-cyan-500' },
  { id: 'work', icon: Briefcase, label: 'عمل', duration: 90, color: 'from-violet-500 to-purple-500' },
  { id: 'sleep', icon: Moon, label: 'نوم', duration: 480, color: 'from-indigo-500 to-blue-500' },
  { id: 'deep_detox', icon: Zap, label: 'ديتوكس عميق', duration: 180, color: 'from-red-500 to-orange-500' },
  { id: 'custom', icon: SettingsIcon, label: 'مخصص', duration: 60, color: 'from-emerald-500 to-teal-500' },
];

export function StartSessionScreen() {
  const navigate = useNavigate();
  const { startSession, webProtectionEnabled } = useSessionStore();
  const { userGoal } = usePreferencesStore();

  const goalConfig = userGoal ? USER_GOALS[userGoal] : null;
  const defaultMode = goalConfig?.suggestedMode ?? 'study';
  const defaultModeData = modes.find((m) => m.id === defaultMode) ?? modes[0];

  const [selectedMode, setSelectedMode] = useState(defaultMode);
  const [duration, setDuration] = useState(defaultModeData.duration);
  const [blockSocial, setBlockSocial] = useState(true);
  const [webFilter, setWebFilter] = useState(webProtectionEnabled);

  const selectedModeData = modes.find((m) => m.id === selectedMode) ?? modes[0];

  const formatDuration = (value: number) => {
    if (value >= 60) {
      const hours = Math.floor(value / 60);
      const minutes = value % 60;
      return `${hours}س${minutes > 0 ? ` ${minutes}د` : ''}`;
    }

    return `${value}د`;
  };

  const updateDuration = (value: number) => {
    const nextDuration = Math.min(MAX_DURATION, Math.max(MIN_DURATION, value));
    setDuration(nextDuration);
  };

  const handleStart = () => {
    startSession(selectedMode, duration, blockSocial, webFilter);
    navigate('/active-session', { state: { mode: selectedMode, duration } });
  };

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col px-4"
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 20px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)`,
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate('/home')}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-white text-xl font-bold">بدء جلسة جديدة</h1>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto hide-scrollbar">
        {/* ── Mode selection ────────────────────────────────────────────────── */}
        <div>
          <p className="text-slate-500 text-xs mb-3">اختر نوع الجلسة</p>
          <div className="grid grid-cols-2 gap-2.5">
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
                  className={`p-4 rounded-xl border-2 transition active:scale-[0.97] ${
                    isSelected
                      ? `bg-gradient-to-br ${mode.color} border-transparent`
                      : 'bg-slate-900 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className={`w-6 h-6 mb-2 ${isSelected ? 'text-white' : 'text-slate-400'}`} />
                  <p className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                    {mode.label}
                  </p>
                  {mode.id === 'deep_detox' && (
                    <p className={`text-xs mt-0.5 ${isSelected ? 'text-white/70' : 'text-slate-600'}`}>
                      احتكاك مزدوج
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Deep Detox Warning ───────────────────────────────────────────── */}
        {selectedMode === 'deep_detox' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4">
            <p className="text-red-400 text-xs leading-relaxed">
              <span className="font-semibold">وضع الديتوكس العميق:</span> حظر كامل للتطبيقات والمواقع مع طبقة احتكاك مضاعفة. لا يمكن تجاوزه إلا بطوارئ حقيقية.
            </p>
          </div>
        )}

        {/* ── Duration slider ───────────────────────────────────────────────── */}
        <div>
          <p className="text-slate-500 text-xs mb-3">المدة (دقيقة)</p>
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
            <div className="rounded-2xl border border-slate-800 bg-slate-950/70 px-4 py-4">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <p className="text-slate-500 text-[11px] mb-1">المدة المحددة</p>
                  <div className={`text-3xl font-bold bg-gradient-to-r ${selectedModeData.color} bg-clip-text text-transparent tabular-nums`}>
                    {formatDuration(duration)}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2">
                  <input
                    type="number"
                    min={MIN_DURATION}
                    max={MAX_DURATION}
                    value={duration}
                    onChange={(e) => updateDuration(Number(e.target.value || MIN_DURATION))}
                    className="w-16 bg-transparent text-white text-center text-lg font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-slate-500 text-xs">دقيقة</span>
                </div>
              </div>
              <input
                type="range"
                min={MIN_DURATION}
                max={MAX_DURATION}
                step="1"
                value={duration}
                onChange={(e) => updateDuration(Number(e.target.value))}
                className="w-full accent-white"
              />
              <div className="flex items-center justify-between mt-3 text-[11px] text-slate-500">
                <span>1 دقيقة</span>
                <span>تجربة سريعة أو جلسة طويلة</span>
                <span>8 ساعات</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="text-slate-400 text-xs">اختصارات سريعة</p>
                <p className="text-slate-600 text-[11px]">من ربع ساعة حتى 8 ساعات</p>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {DURATION_PRESETS.map((preset) => {
                  const isSelected = duration === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => updateDuration(preset)}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition active:scale-[0.98] ${
                        isSelected
                          ? `bg-gradient-to-r ${selectedModeData.color} border-transparent text-white shadow-lg shadow-black/20`
                          : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-950'
                      }`}
                    >
                      {formatDuration(preset)}
                    </button>
                  );
                })}
              </div>
            </div>
            <p className="text-slate-500 text-[11px] leading-relaxed text-center">
              يمكنك اختيار مدة دقيقة للتجربة، أو استخدام الاختصارات للانتقال السريع بين 15 دقيقة، 30 دقيقة، ساعة، وحتى 8 ساعات.
            </p>
          </div>
        </div>

        {/* ── Toggles ───────────────────────────────────────────────────────── */}
        <div className="space-y-2.5">
          <button
            onClick={() => setBlockSocial(!blockSocial)}
            className={`w-full rounded-xl border p-4 flex items-center justify-between transition ${
              blockSocial ? 'bg-red-500/10 border-red-500/30' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className={`w-12 h-6 rounded-full relative transition flex-shrink-0 ${blockSocial ? 'bg-red-500' : 'bg-slate-700'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${blockSocial ? 'left-1' : 'right-1'}`} />
            </div>
            <div className="flex-1 text-right mr-3">
              <h3 className="text-white text-sm font-medium">حظر تطبيقات التواصل</h3>
              <p className="text-slate-500 text-xs mt-0.5">انستقرام، تيك توك، سناب...</p>
            </div>
          </button>

          <button
            onClick={() => setWebFilter(!webFilter)}
            className={`w-full rounded-xl border p-4 flex items-center justify-between transition ${
              webFilter ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-slate-900 border-slate-800'
            }`}
          >
            <div className={`w-12 h-6 rounded-full relative transition flex-shrink-0 ${webFilter ? 'bg-emerald-500' : 'bg-slate-700'}`}>
              <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${webFilter ? 'left-1' : 'right-1'}`} />
            </div>
            <div className="flex-1 text-right mr-3">
              <h3 className="text-white text-sm font-medium">تصفية الويب</h3>
              <p className="text-slate-500 text-xs mt-0.5">حظر المحتوى الضار</p>
            </div>
          </button>
        </div>
      </div>

      <button
        onClick={handleStart}
        className={`w-full h-12 rounded-xl mt-5 bg-gradient-to-r ${selectedModeData.color} text-white font-medium hover:opacity-90 transition`}
      >
        ابدأ الجلسة الآن
      </button>
    </div>
  );
}
