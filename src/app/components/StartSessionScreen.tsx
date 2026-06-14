import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, BookOpen, Briefcase, Moon, Settings as SettingsIcon, Zap } from 'lucide-react';
import { useSessionStore } from '../../store/sessionStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { USER_GOALS } from '../../core/types';
import { ScreenContainer } from './ScreenContainer';

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
    <ScreenContainer scrollable>
      <div className="flex items-center gap-3" style={{ marginBottom: 'var(--sp-5)' }}>
        <button
          onClick={() => navigate('/home')}
          style={{ width: 'var(--sp-10)', height: 'var(--sp-10)' }}
          className="flex items-center justify-center text-muted-foreground hover:text-foreground transition flex-shrink-0"
        >
          <ChevronRight className="icon-lg" />
        </button>
        <h1 className="text-fluid-xl text-foreground font-bold">بدء جلسة جديدة</h1>
      </div>

      <div className="flex-1 hide-scrollbar" style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-5)' }}>
        <div>
          <p className="text-fluid-xs text-muted-foreground" style={{ marginBottom: 'var(--sp-3)' }}>اختر نوع الجلسة</p>
          <div className="grid grid-cols-2 gap-[var(--sp-2)]">
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
                  className={`rounded-xl border-2 transition active:scale-[0.97] ${
                    isSelected
                      ? `bg-gradient-to-br ${mode.color} border-transparent`
                      : 'bg-card border-border hover:border-border'
                  }`}
                  style={{ padding: 'var(--sp-4)' }}
                >
                  <Icon className={`icon-lg mb-2 ${isSelected ? 'text-white' : 'text-muted-foreground'}`} />
                  <p className={`text-fluid-sm font-medium ${isSelected ? 'text-white' : 'text-foreground'}`}>
                    {mode.label}
                  </p>
                  {mode.id === 'deep_detox' && (
                    <p className={`text-fluid-xs mt-0.5 ${isSelected ? 'text-white/70' : 'text-muted-foreground'}`}>
                      احتكاك مزدوج
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {selectedMode === 'deep_detox' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl" style={{ padding: 'var(--sp-4)' }}>
            <p className="text-fluid-xs text-red-400 leading-relaxed">
              <span className="font-semibold">وضع الديتوكس العميق:</span> حظر كامل للتطبيقات والمواقع مع طبقة احتكاك مضاعفة. لا يمكن تجاوزه إلا بطوارئ حقيقية.
            </p>
          </div>
        )}

        <div>
          <p className="text-fluid-xs text-muted-foreground" style={{ marginBottom: 'var(--sp-3)' }}>المدة (دقيقة)</p>
          <div
            className="bg-card border border-border rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.06)]"
            style={{ padding: 'var(--sp-4)', display: 'flex', flexDirection: 'column', gap: 'var(--sp-4)' }}
          >
            <div className="rounded-2xl border border-border bg-muted/70" style={{ padding: 'var(--sp-4)' }}>
              <div className="flex items-center justify-between gap-3" style={{ marginBottom: 'var(--sp-4)' }}>
                <div>
                  <p className="text-fluid-xs text-muted-foreground mb-1">المدة المحددة</p>
                  <div className={`text-fluid-3xl font-bold bg-gradient-to-r ${selectedModeData.color} bg-clip-text text-transparent tabular-nums`}>
                    {formatDuration(duration)}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-card border border-border rounded-xl" style={{ padding: 'var(--sp-2) var(--sp-3)' }}>
                  <input
                    type="number"
                    min={MIN_DURATION}
                    max={MAX_DURATION}
                    value={duration}
                    onChange={(e) => updateDuration(Number(e.target.value || MIN_DURATION))}
                    className="w-16 bg-transparent text-fluid-lg text-foreground text-center font-semibold outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                  <span className="text-fluid-xs text-muted-foreground">دقيقة</span>
                </div>
              </div>
              <input
                type="range"
                min={MIN_DURATION}
                max={MAX_DURATION}
                step="1"
                value={duration}
                onChange={(e) => updateDuration(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex items-center justify-between mt-3">
                <span className="text-fluid-xs text-muted-foreground">1 دقيقة</span>
                <span className="text-fluid-xs text-muted-foreground">تجربة سريعة أو طويلة</span>
                <span className="text-fluid-xs text-muted-foreground">8 ساعات</span>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--sp-2)' }}>
                <p className="text-fluid-xs text-muted-foreground">اختصارات سريعة</p>
              </div>
              <div className="grid grid-cols-3 gap-[var(--sp-2)]">
                {DURATION_PRESETS.map((preset) => {
                  const isSel = duration === preset;
                  return (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => updateDuration(preset)}
                      className={`rounded-xl border transition active:scale-[0.98] ${
                        isSel
                          ? `bg-gradient-to-r ${selectedModeData.color} border-transparent text-white shadow-lg shadow-black/20`
                          : 'bg-muted/70 border-border text-foreground hover:border-border hover:bg-muted'
                      }`}
                      style={{ padding: 'var(--sp-3) var(--sp-2)' }}
                    >
                      <span className="text-fluid-sm font-medium">{formatDuration(preset)}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
          {[
            {
              on: blockSocial,
              toggle: () => setBlockSocial(!blockSocial),
              color: 'bg-red-500',
              activeBg: 'bg-red-500/10 border-red-500/30',
              title: 'حظر تطبيقات التواصل',
              sub: 'انستقرام، تيك توك، سناب...',
            },
            {
              on: webFilter,
              toggle: () => setWebFilter(!webFilter),
              color: 'bg-emerald-500',
              activeBg: 'bg-emerald-500/10 border-emerald-500/30',
              title: 'تصفية الويب',
              sub: 'حظر المحتوى الضار',
            },
          ].map(({ on, toggle, color, activeBg, title, sub }) => (
            <button
              key={title}
              onClick={toggle}
              className={`w-full rounded-xl border flex items-center justify-between transition ${
                on ? activeBg : 'bg-card border-border'
              }`}
              style={{ padding: 'var(--sp-4)' }}
            >
              <div className={`w-12 h-6 rounded-full relative transition flex-shrink-0 ${on ? color : 'bg-muted-foreground/30'}`}>
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${on ? 'left-1' : 'right-1'}`} />
              </div>
              <div className="flex-1 text-right mr-3">
                <h3 className="text-fluid-sm text-foreground font-medium">{title}</h3>
                <p className="text-fluid-xs text-muted-foreground mt-0.5">{sub}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <button
        onClick={handleStart}
        style={{ height: 'var(--btn-h)', marginTop: 'var(--sp-5)' }}
        className={`btn-primary bg-gradient-to-r ${selectedModeData.color} text-white hover:opacity-90 transition`}
      >
        <span className="text-fluid-base font-bold">ابدأ الجلسة الآن</span>
      </button>
    </ScreenContainer>
  );
}
