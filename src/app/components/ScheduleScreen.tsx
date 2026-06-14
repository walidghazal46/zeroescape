import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Plus, Trash2, Clock, ChevronLeft, ToggleLeft, ToggleRight,
  BookOpen, Briefcase, Moon, Zap, Settings, Calendar,
} from 'lucide-react';
import { useScheduleStore } from '../../store/scheduleStore';
import type { ScheduleEntry, DayOfWeek } from '../../store/scheduleStore';

// ── Constants ────────────────────────────────────────────────────────────────

const DAY_LABELS: { day: DayOfWeek; short: string; full: string }[] = [
  { day: 0, short: 'أح', full: 'الأحد' },
  { day: 1, short: 'إث', full: 'الاثنين' },
  { day: 2, short: 'ثل', full: 'الثلاثاء' },
  { day: 3, short: 'أر', full: 'الأربعاء' },
  { day: 4, short: 'خم', full: 'الخميس' },
  { day: 5, short: 'جم', full: 'الجمعة' },
  { day: 6, short: 'سب', full: 'السبت' },
];

const MODES = [
  { id: 'study', label: 'دراسة', Icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-500/20' },
  { id: 'work', label: 'عمل', Icon: Briefcase, color: 'text-violet-400', bg: 'bg-violet-500/20' },
  { id: 'sleep', label: 'نوم', Icon: Moon, color: 'text-indigo-400', bg: 'bg-indigo-500/20' },
  { id: 'deep_detox', label: 'ديتوكس', Icon: Zap, color: 'text-red-400', bg: 'bg-red-500/20' },
  { id: 'custom', label: 'مخصص', Icon: Settings, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
];

const DURATION_PRESETS = [15, 30, 60, 90, 120, 180, 240];

function formatDuration(mins: number) {
  if (mins < 60) return `${mins}د`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h}س` : `${h}س ${m}د`;
}

function formatTime(h: number, m: number) {
  const ampm = h < 12 ? 'ص' : 'م';
  const hh = h % 12 === 0 ? 12 : h % 12;
  return `${hh}:${String(m).padStart(2, '0')} ${ampm}`;
}

// ── Blank form state ──────────────────────────────────────────────────────────

type FormState = Omit<ScheduleEntry, 'id'>;

const blankForm = (): FormState => ({
  label: '',
  startHour: 8,
  startMinute: 0,
  durationMinutes: 60,
  mode: 'study',
  days: [1, 2, 3, 4, 0] as DayOfWeek[], // Mon–Thu + Sun by default
  enabled: true,
  blockSocial: true,
  webFilter: true,
  fullBlock: false,
});

// ── Main Component ────────────────────────────────────────────────────────────

export function ScheduleScreen() {
  const navigate = useNavigate();
  const { schedules, addSchedule, deleteSchedule, toggleSchedule, getNextSchedule } = useScheduleStore();

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(blankForm());
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const next = getNextSchedule();

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const openNew = () => {
    setEditingId(null);
    setForm(blankForm());
    setShowForm(true);
  };

  const openEdit = (e: ScheduleEntry) => {
    setEditingId(e.id);
    setForm({
      label: e.label,
      startHour: e.startHour,
      startMinute: e.startMinute,
      durationMinutes: e.durationMinutes,
      mode: e.mode,
      days: [...e.days],
      enabled: e.enabled,
      blockSocial: e.blockSocial,
      webFilter: e.webFilter,
      fullBlock: e.fullBlock,
    });
    setShowForm(true);
  };

  const handleSave = () => {
    if (form.days.length === 0) return; // validation
    if (editingId) {
      useScheduleStore.getState().updateSchedule(editingId, form);
      // Re-register alarms on native side
      syncSchedulesToNative();
    } else {
      const entry = addSchedule(form);
      scheduleOnNative(entry);
    }
    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    deleteSchedule(id);
    cancelOnNative(id);
    setDeleteConfirmId(null);
  };

  const handleToggle = (id: string) => {
    toggleSchedule(id);
    syncSchedulesToNative();
  };

  const toggleDay = (day: DayOfWeek) => {
    setForm((f) => ({
      ...f,
      days: f.days.includes(day) ? f.days.filter((d) => d !== day) : [...f.days, day],
    }));
  };

  // ── Native bridge helpers ─────────────────────────────────────────────────────
  // window.Android.scheduleSession / cancelSchedule / syncSchedules
  // These are no-ops in the browser; actual logic is in ScheduleAlarmReceiver.java

  const scheduleOnNative = (entry: ScheduleEntry) => {
    try {
      (window as any).Android?.scheduleSession?.(JSON.stringify(entry));
    } catch { /* silent */ }
  };

  const cancelOnNative = (id: string) => {
    try {
      (window as any).Android?.cancelSchedule?.(id);
    } catch { /* silent */ }
  };

  const syncSchedulesToNative = () => {
    try {
      const all = useScheduleStore.getState().schedules;
      (window as any).Android?.syncSchedules?.(JSON.stringify(all));
    } catch { /* silent */ }
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div
      className="min-h-screen bg-background flex flex-col"
      dir="rtl"
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 16px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)`,
      }}
    >
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3 px-4 mb-5">
        <button
          onClick={() => navigate('/home')}
          className="w-9 h-9 bg-card border border-border rounded-xl flex items-center justify-center"
        >
          <ChevronLeft className="w-5 h-5 text-muted-foreground rotate-180" />
        </button>
        <div className="flex-1">
          <h1 className="text-foreground font-bold text-lg">الجدولة التلقائية</h1>
          <p className="text-muted-foreground text-xs">جلسات تبدأ وحدها في الأوقات المحددة</p>
        </div>
        <button
          onClick={openNew}
          className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30"
        >
          <Plus className="w-5 h-5 text-white" />
        </button>
      </div>

      <div className="flex-1 px-4 space-y-3 overflow-y-auto hide-scrollbar">

        {/* ── Next alarm banner ───────────────────────────────────────────── */}
        {next && (
          <div className="bg-blue-500/10 border border-blue-500/25 rounded-2xl px-4 py-3 flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-4 h-4 text-blue-400" />
            </div>
            <div className="flex-1 text-right">
              <p className="text-blue-300 text-xs font-medium">الجلسة القادمة</p>
              <p className="text-foreground text-sm font-bold">{next.entry.label || next.entry.mode}</p>
              <p className="text-muted-foreground text-xs">
                {next.firesAt.toLocaleDateString('ar-EG', { weekday: 'long' })} —{' '}
                {formatTime(next.entry.startHour, next.entry.startMinute)} •{' '}
                {formatDuration(next.entry.durationMinutes)}
              </p>
            </div>
          </div>
        )}

        {/* ── Empty state ─────────────────────────────────────────────────── */}
        {schedules.length === 0 && !showForm && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <div className="w-16 h-16 bg-card border border-border rounded-2xl flex items-center justify-center">
              <Calendar className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="text-center">
              <p className="text-foreground font-medium">لا توجد جداول بعد</p>
              <p className="text-muted-foreground text-sm mt-1">اضغط + لإنشاء أول جدولة تلقائية</p>
            </div>
            <button
              onClick={openNew}
              className="h-11 px-6 bg-blue-600 text-white rounded-2xl font-medium text-sm flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              <Plus className="w-4 h-4" />
              إنشاء جدولة
            </button>
          </div>
        )}

        {/* ── Schedule list ───────────────────────────────────────────────── */}
        {schedules.map((entry) => {
          const modeConfig = MODES.find((m) => m.id === entry.mode) ?? MODES[0];
          const { Icon } = modeConfig;
          return (
            <div
              key={entry.id}
              className={`bg-card border rounded-2xl overflow-hidden transition ${
                entry.enabled ? 'border-border' : 'border-border/50 opacity-60'
              }`}
            >
              {/* Main row */}
              <button
                className="w-full px-4 py-3 flex items-center gap-3 text-right"
                onClick={() => openEdit(entry)}
              >
                <div className={`w-9 h-9 ${modeConfig.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <Icon className={`w-4 h-4 ${modeConfig.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-foreground font-medium text-sm truncate">
                    {entry.label || modeConfig.label}
                  </p>
                  <p className="text-muted-foreground text-xs mt-0.5">
                    {formatTime(entry.startHour, entry.startMinute)} •{' '}
                    {formatDuration(entry.durationMinutes)} •{' '}
                    {entry.days
                      .sort()
                      .map((d) => DAY_LABELS.find((dl) => dl.day === d)?.short ?? '')
                      .join(' ')}
                  </p>
                </div>
                {/* Toggle */}
                <button
                  className="p-1 flex-shrink-0"
                  onClick={(ev) => { ev.stopPropagation(); handleToggle(entry.id); }}
                >
                  {entry.enabled ? (
                    <ToggleRight className="w-7 h-7 text-blue-400" />
                  ) : (
                    <ToggleLeft className="w-7 h-7 text-muted-foreground" />
                  )}
                </button>
              </button>

              {/* Delete confirm */}
              {deleteConfirmId === entry.id ? (
                <div className="px-4 pb-3 flex gap-2">
                  <button
                    onClick={() => handleDelete(entry.id)}
                    className="flex-1 h-9 rounded-xl bg-red-600/80 text-white text-xs font-semibold"
                  >
                    حذف
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    className="flex-1 h-9 rounded-xl bg-muted text-foreground text-xs"
                  >
                    إلغاء
                  </button>
                </div>
              ) : (
                <button
                  className="w-full px-4 pb-2 flex items-center justify-end gap-1"
                  onClick={(ev) => { ev.stopPropagation(); setDeleteConfirmId(entry.id); }}
                >
                  <Trash2 className="w-3 h-3 text-muted-foreground" />
                  <span className="text-muted-foreground text-xs">حذف</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Add / Edit Bottom Sheet ──────────────────────────────────────────── */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end" onClick={() => setShowForm(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
          <div
            className="relative w-full bg-card border-t border-border rounded-t-3xl px-4 pt-4 pb-8 max-h-[92vh] overflow-y-auto"
            style={{ paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)` }}
            onClick={(e) => e.stopPropagation()}
            dir="rtl"
          >
            {/* Drag handle */}
            <div className="w-10 h-1 bg-muted rounded-full mx-auto mb-4" />

            <h2 className="text-foreground font-bold text-base mb-4 text-center">
              {editingId ? 'تعديل الجدولة' : 'جدولة جديدة'}
            </h2>

            {/* Label */}
            <div className="mb-4">
              <label className="text-muted-foreground text-xs mb-1.5 block">اسم الجدولة (اختياري)</label>
              <input
                type="text"
                placeholder="مثال: وقت الدراسة الصباحي"
                value={form.label}
                onChange={(e) => setForm((f) => ({ ...f, label: e.target.value }))}
                className="w-full h-11 bg-muted border border-border rounded-xl px-3 text-foreground text-sm placeholder-muted-foreground focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Time pickers */}
            <div className="mb-4">
              <label className="text-muted-foreground text-xs mb-1.5 block">وقت البدء</label>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-muted-foreground text-xs block mb-1">الساعة</label>
                  <select
                    value={form.startHour}
                    onChange={(e) => setForm((f) => ({ ...f, startHour: +e.target.value }))}
                    className="w-full h-11 bg-muted border border-border rounded-xl px-3 text-foreground text-sm focus:outline-none focus:border-blue-500"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={i}>
                        {i < 12 ? `${i === 0 ? 12 : i} ص` : `${i === 12 ? 12 : i - 12} م`}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-muted-foreground text-xs block mb-1">الدقيقة</label>
                  <select
                    value={form.startMinute}
                    onChange={(e) => setForm((f) => ({ ...f, startMinute: +e.target.value }))}
                    className="w-full h-11 bg-muted border border-border rounded-xl px-3 text-foreground text-sm focus:outline-none focus:border-blue-500"
                  >
                    {[0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55].map((m) => (
                      <option key={m} value={m}>{String(m).padStart(2, '0')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Duration */}
            <div className="mb-4">
              <label className="text-muted-foreground text-xs mb-1.5 block">مدة الجلسة</label>
              <div className="flex flex-wrap gap-2">
                {DURATION_PRESETS.map((d) => (
                  <button
                    key={d}
                    onClick={() => setForm((f) => ({ ...f, durationMinutes: d }))}
                    className={`h-9 px-3 rounded-xl text-sm font-medium transition ${
                      form.durationMinutes === d
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted text-muted-foreground border border-border'
                    }`}
                  >
                    {formatDuration(d)}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode */}
            <div className="mb-4">
              <label className="text-muted-foreground text-xs mb-1.5 block">النمط</label>
              <div className="grid grid-cols-5 gap-2">
                {MODES.map(({ id, label, Icon: ModeIcon, color, bg }) => (
                  <button
                    key={id}
                    onClick={() => setForm((f) => ({ ...f, mode: id }))}
                    className={`flex flex-col items-center gap-1 py-2 rounded-xl border transition ${
                      form.mode === id
                        ? 'bg-accent border-blue-500'
                        : 'bg-muted border-border'
                    }`}
                  >
                    <div className={`w-7 h-7 ${bg} rounded-lg flex items-center justify-center`}>
                      <ModeIcon className={`w-3.5 h-3.5 ${color}`} />
                    </div>
                    <span className="text-foreground text-xs leading-tight">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Days */}
            <div className="mb-6">
              <label className="text-muted-foreground text-xs mb-1.5 block">
                الأيام{' '}
                {form.days.length === 0 && (
                  <span className="text-red-400">— اختر يوماً واحداً على الأقل</span>
                )}
              </label>
              <div className="flex gap-2 flex-wrap">
                {DAY_LABELS.map(({ day, short }) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    className={`w-10 h-10 rounded-xl text-sm font-medium transition ${
                      form.days.includes(day)
                        ? 'bg-blue-600 text-white'
                        : 'bg-muted text-muted-foreground border border-border'
                    }`}
                  >
                    {short}
                  </button>
                ))}
              </div>
            </div>

            {/* Blocking method */}
            <div className="mb-6">
              <label className="text-muted-foreground text-xs mb-1.5 block">طريقة الحظر</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--sp-2)' }}>
                {[
                  {
                    key: 'blockSocial' as const,
                    on: form.blockSocial,
                    color: 'bg-red-500',
                    activeBg: 'bg-red-500/10 border-red-500/30',
                    title: 'حظر تطبيقات التواصل',
                    sub: 'انستقرام، تيك توك، سناب...',
                  },
                  {
                    key: 'webFilter' as const,
                    on: form.webFilter,
                    color: 'bg-emerald-500',
                    activeBg: 'bg-emerald-500/10 border-emerald-500/30',
                    title: 'تصفية الويب',
                    sub: 'حظر المحتوى الضار',
                  },
                  {
                    key: 'fullBlock' as const,
                    on: form.fullBlock,
                    color: 'bg-amber-500',
                    activeBg: 'bg-amber-500/10 border-amber-500/30',
                    title: 'حظر كامل — وضع الديتوكس',
                    sub: 'يفعّل كل وسائل الحظر معاً',
                  },
                ].map(({ key, on, color, activeBg, title, sub }) => {
                  const disabled = key !== 'fullBlock' && form.fullBlock;
                  return (
                    <button
                      key={key}
                      disabled={disabled}
                      onClick={() =>
                        setForm((f) =>
                          key === 'fullBlock'
                            ? {
                                ...f,
                                fullBlock: !f.fullBlock,
                                ...(!f.fullBlock ? { blockSocial: true, webFilter: true } : {}),
                              }
                            : { ...f, [key]: !f[key] }
                        )
                      }
                      className={`w-full rounded-xl border flex items-center justify-between transition ${
                        on ? activeBg : 'bg-muted border-border'
                      } ${disabled ? 'opacity-50' : ''}`}
                      style={{ padding: 'var(--sp-4)' }}
                    >
                      <div className={`w-12 h-6 rounded-full relative transition flex-shrink-0 ${on ? color : 'bg-muted-foreground/30'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${on ? 'left-1' : 'right-1'}`} />
                      </div>
                      <div className="flex-1 text-right mr-3">
                        <h3 className="text-sm text-foreground font-medium">{title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={form.days.length === 0}
                className="flex-1 h-12 rounded-2xl bg-blue-600 text-white font-semibold text-sm disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-blue-600/30"
              >
                {editingId ? 'حفظ التعديلات' : 'إنشاء الجدولة'}
              </button>
              <button
                onClick={() => setShowForm(false)}
                className="flex-1 h-12 rounded-2xl bg-muted border border-border text-foreground font-medium text-sm"
              >
                إلغاء
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
