import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Play,
  Shield,
  Settings,
  BarChart3,
  ShieldCheck,
  Flame,
  Clock,
  AlertTriangle,
  Calendar,
  ChevronLeft,
  Zap,
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useSessionStore } from '../../store/sessionStore';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { useScheduleStore } from '../../store/scheduleStore';
import { USER_GOALS } from '../../core/types';
import { ScreenContainer } from './ScreenContainer';

/* ── Compact stat card ───────────────────────────────────────────────────── */
interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  accent: string;
  accentBg: string;
}
function StatCard({ icon, value, label, accent, accentBg }: StatCardProps) {
  return (
    <div
      className="flex flex-col items-center text-center rounded-2xl ze-card-hover"
      style={{
        padding: 'var(--sp-3) var(--sp-2)',
        background: '#ffffff',
        border: '1.5px solid rgba(21,184,166,0.14)',
        flex: 1,
        minWidth: 0,
      }}
    >
      <div
        className="rounded-xl flex items-center justify-center mb-2"
        style={{
          width: 'var(--sp-8)',
          height: 'var(--sp-8)',
          background: accentBg,
          border: `1px solid ${accent}40`,
        }}
      >
        {icon}
      </div>
      <p
        className="font-bold tabular-nums leading-none"
        style={{ fontSize: 'var(--text-lg)', color: '#1c2e2b' }}
      >
        {value}
      </p>
      <p
        className="leading-tight mt-1"
        style={{ fontSize: 'var(--text-xs)', color: '#6b8079' }}
      >
        {label}
      </p>
    </div>
  );
}

/* ── Feature card (2-col grid) ───────────────────────────────────────────── */
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  iconBg: string;
  iconColor: string;
  onClick: () => void;
  fullWidth?: boolean;
  badge?: string;
  badgeColor?: string;
}
function FeatureCard({
  icon,
  title,
  subtitle,
  iconBg,
  iconColor,
  onClick,
  fullWidth,
  badge,
  badgeColor,
}: FeatureCardProps) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl text-right ze-card-hover transition ${fullWidth ? 'col-span-2' : ''}`}
      style={{
        padding: 'var(--sp-4)',
        background: '#ffffff',
        border: '1.5px solid rgba(21,184,166,0.14)',
        display: fullWidth ? 'flex' : 'block',
        alignItems: fullWidth ? 'center' : undefined,
        gap: fullWidth ? 'var(--sp-3)' : undefined,
      }}
    >
      {fullWidth ? (
        <>
          <div
            className="rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              width: 'var(--sp-10)',
              height: 'var(--sp-10)',
              background: iconBg,
              border: `1px solid ${iconColor}30`,
            }}
          >
            {icon}
          </div>
          <div className="flex-1 text-right">
            <p
              className="font-semibold"
              style={{ fontSize: 'var(--text-sm)', color: '#1c2e2b' }}
            >
              {title}
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: '#6b8079', marginTop: 2 }}>
              {subtitle}
            </p>
          </div>
          <ChevronLeft
            style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)', color: '#bcd9d1', flexShrink: 0 }}
          />
        </>
      ) : (
        <>
          <div
            className="rounded-xl flex items-center justify-center"
            style={{
              width: 'var(--sp-8)',
              height: 'var(--sp-8)',
              background: iconBg,
              border: `1px solid ${iconColor}30`,
              marginBottom: 'var(--sp-2)',
            }}
          >
            {icon}
          </div>
          <p
            className="font-semibold mb-0.5"
            style={{ fontSize: 'var(--text-sm)', color: '#1c2e2b' }}
          >
            {title}
          </p>
          <div className="flex items-center justify-between gap-1">
            <p style={{ fontSize: 'var(--text-xs)', color: '#6b8079', flex: 1 }}>
              {subtitle}
            </p>
            {badge && (
              <span
                className="rounded-full px-2 py-0.5 font-semibold"
                style={{
                  fontSize: 10,
                  background: badgeColor ? `${badgeColor}22` : 'rgba(16,217,140,0.15)',
                  color: badgeColor ?? '#10d98c',
                  border: `1px solid ${badgeColor ?? '#10d98c'}40`,
                  flexShrink: 0,
                }}
              >
                {badge}
              </span>
            )}
          </div>
        </>
      )}
    </button>
  );
}

/* ── Circular compliance ring ────────────────────────────────────────────── */
function ComplianceRing({ value }: { value: number }) {
  const r = 26;
  const circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  const color = value >= 80 ? '#10d98c' : value >= 50 ? '#15b8a6' : '#f03e3e';
  return (
    <svg width={64} height={64} viewBox="0 0 64 64" style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={32} cy={32} r={r} fill="none" stroke="rgba(21,184,166,0.12)" strokeWidth={5} />
      <circle
        cx={32}
        cy={32}
        r={r}
        fill="none"
        stroke={color}
        strokeWidth={5}
        strokeDasharray={`${dash} ${circ}`}
        strokeLinecap="round"
      />
    </svg>
  );
}

export function HomeScreen() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { language, userGoal } = usePreferencesStore();
  const { blockedApps, getTotalHoursThisWeek, getStreakDays, completedSessions, activeSession } =
    useSessionStore();
  const { getWeeklyBreakCount, getMostAttemptedApp, getTopBlockedApps } = useAnalyticsStore();
  const { schedules, getNextSchedule } = useScheduleStore();
  const isArabic = language === 'ar';

  const blockedCount = Object.values(blockedApps).filter(Boolean).length;
  const totalHours = getTotalHoursThisWeek();
  const streak = getStreakDays();
  const weeklyBreaks = getWeeklyBreakCount();
  const topApp = getMostAttemptedApp();
  const topApps = getTopBlockedApps(3);
  const nextSchedule = getNextSchedule();

  const weekAgo = Date.now() - 7 * 86400000;
  const weekSessions = completedSessions.filter((s) => s.completedAt >= weekAgo);
  const cleanSessions = weekSessions.filter((s) => s.blockedAttempts === 0).length;
  const complianceRate =
    weekSessions.length > 0 ? Math.round((cleanSessions / weekSessions.length) * 100) : 0;

  const goalConfig = userGoal ? USER_GOALS[userGoal] : null;
  const greeting = user?.name
    ? isArabic
      ? `مرحباً، ${user.name}`
      : `Welcome, ${user.name}`
    : isArabic
      ? 'مرحباً'
      : 'Welcome';

  const complianceColor =
    complianceRate >= 80 ? '#10d98c' : complianceRate >= 50 ? '#15b8a6' : '#f03e3e';

  return (
    <ScreenContainer scrollable>
      {/* ── Background Accent ── */}
      <div className="absolute top-0 inset-x-0 h-64 bg-gradient-to-b from-emerald-500/10 to-transparent pointer-events-none" />

      {/* ── Header ── */}
      <div
        className="relative flex items-center justify-between"
        style={{ marginBottom: 'var(--sp-6)' }}
      >
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase mb-1">ZeroEscape No.1</p>
          <h1
            className="font-black leading-tight truncate"
            style={{ fontSize: '1.75rem', color: '#1c2e2b' }}
          >
            {user?.name ? (
              <>
                {isArabic ? 'مرحباً، ' : 'Welcome, '}
                <span className="text-emerald-600">{user.name}</span>
              </>
            ) : (
              greeting
            )}
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/statistics')}
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-emerald-500/10 flex items-center justify-center transition active:scale-95"
          >
            <BarChart3 className="w-5 h-5 text-emerald-600" />
          </button>
          <button
            onClick={() => navigate('/settings')}
            className="w-11 h-11 rounded-2xl bg-white shadow-sm border border-emerald-500/10 flex items-center justify-center transition active:scale-95"
          >
            <Settings className="w-5 h-5 text-slate-400" />
          </button>
        </div>
      </div>

      {/* ── Main Power Button (BlockerHero Style) ── */}
      <div className="flex flex-col items-center justify-center py-4 mb-8">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => activeSession ? navigate('/active-session') : navigate('/start-session')}
          className="relative w-48 h-48 flex items-center justify-center"
        >
          {/* Pulsing ring */}
          <div className={`absolute inset-0 rounded-full animate-ping opacity-20 ${activeSession ? 'bg-red-500' : 'bg-emerald-500'}`} style={{ animationDuration: '3s' }} />

          {/* Main Circle */}
          <div className={`relative w-40 h-40 rounded-full shadow-2xl flex flex-col items-center justify-center border-8 ${
            activeSession
              ? 'bg-gradient-to-br from-red-500 to-rose-600 border-rose-400/30'
              : 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-400/30'
          }`}
          style={{ boxShadow: activeSession ? '0 20px 40px rgba(244,63,94,0.3)' : '0 20px 40px rgba(16,185,129,0.3)' }}
          >
            {activeSession ? (
              <Zap className="w-12 h-12 text-white fill-current mb-1" />
            ) : (
              <Play className="w-12 h-12 text-white fill-current ml-1 mb-1" />
            )}
            <span className="text-white font-black text-lg">
              {activeSession ? (isArabic ? 'نشط' : 'ACTIVE') : (isArabic ? 'ابدأ' : 'START')}
            </span>
          </div>
        </motion.button>

        <p className="mt-6 text-slate-500 text-sm font-medium">
          {activeSession
            ? (isArabic ? 'جلسة التركيز قيد التشغيل' : 'Focus session is running')
            : (isArabic ? 'اضغط للبدء بالحماية' : 'Tap to start protection')}
        </p>
      </div>

      {/* ── Stats row ── */}
      <div
        className="flex gap-[var(--sp-2)]"
        style={{ marginBottom: 'var(--sp-4)' }}
      >
        <StatCard
          icon={<Flame className="icon-sm" style={{ color: '#f97316' }} />}
          value={streak}
          label={isArabic ? 'يوم متتالي' : 'day streak'}
          accent="#f97316"
          accentBg="rgba(249,115,22,0.15)"
        />
        <StatCard
          icon={<Clock className="icon-sm" style={{ color: '#38bdf8' }} />}
          value={`${totalHours.toFixed(1)}h`}
          label={isArabic ? 'هذا الأسبوع' : 'this week'}
          accent="#38bdf8"
          accentBg="rgba(56,189,248,0.15)"
        />
        {/* Compliance with ring */}
        <div
          className="flex flex-col items-center text-center rounded-2xl ze-card-hover"
          style={{
            padding: 'var(--sp-3) var(--sp-2)',
            background: '#ffffff',
            border: `1.5px solid ${complianceColor}30`,
            flex: 1,
            minWidth: 0,
          }}
        >
          <div className="relative flex items-center justify-center mb-1" style={{ width: 48, height: 48 }}>
            <ComplianceRing value={complianceRate} />
            <span
              className="absolute font-bold"
              style={{ fontSize: 10, color: complianceColor }}
            >
              {complianceRate}%
            </span>
          </div>
          <p style={{ fontSize: 'var(--text-xs)', color: '#6b8079' }}>
            {isArabic ? 'التزام' : 'compliance'}
          </p>
        </div>
      </div>

      {/* ── Feature cards grid ── */}
      <div
        className="grid grid-cols-2 gap-[var(--sp-3)]"
        style={{ marginBottom: 'var(--sp-4)' }}
      >
        <FeatureCard
          icon={<ShieldCheck className="icon-sm" style={{ color: '#f03e3e' }} />}
          title={isArabic ? 'التطبيقات المحظورة' : 'Blocked Apps'}
          subtitle={isArabic ? `${blockedCount} محظور` : `${blockedCount} blocked`}
          iconBg="rgba(240,62,62,0.15)"
          iconColor="#f03e3e"
          badge={blockedCount > 0 ? String(blockedCount) : undefined}
          badgeColor="#f03e3e"
          onClick={() => navigate('/blocked-apps')}
          fullWidth
        />
        <FeatureCard
          icon={<Calendar className="icon-sm" style={{ color: '#4caf7d' }} />}
          title={isArabic ? 'الجدولة التلقائية' : 'Auto Schedule'}
          subtitle={
            schedules.filter((s) => s.enabled).length > 0
              ? nextSchedule
                ? (isArabic ? `القادمة: ${nextSchedule.firesAt.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}` : `Next: ${nextSchedule.firesAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`)
                : (isArabic ? `${schedules.filter((s) => s.enabled).length} جدولة` : `${schedules.filter((s) => s.enabled).length} active`)
              : (isArabic ? 'أضف جدولة' : 'Add schedule')
          }
          iconBg="rgba(76,175,125,0.15)"
          iconColor="#4caf7d"
          fullWidth
          onClick={() => navigate('/schedule')}
        />
      </div>

      {/* ── Break attempts warning ── */}
      {weeklyBreaks > 0 && (
        <div
          className="rounded-2xl flex items-start gap-3"
          style={{
            padding: 'var(--sp-4)',
            marginBottom: 'var(--sp-4)',
            background: 'rgba(249,115,22,0.1)',
            border: '1.5px solid rgba(249,115,22,0.2)',
          }}
        >
          <AlertTriangle
            className="icon-md flex-shrink-0"
            style={{ color: '#f97316', marginTop: 1 }}
          />
          <div className="flex-1 text-right">
            <p
              className="font-semibold"
              style={{ fontSize: 'var(--text-sm)', color: '#fed7aa' }}
            >
              {weeklyBreaks} {isArabic ? 'محاولة كسر هذا الأسبوع' : 'break attempts this week'}
            </p>
            {topApp && (
              <p style={{ fontSize: 'var(--text-xs)', color: '#6b8079', marginTop: 2 }}>
                {isArabic ? 'الأكثر:' : 'Top:'}{' '}
                <span style={{ color: '#1c2e2b', textTransform: 'capitalize' }}>{topApp}</span>
              </p>
            )}
          </div>
        </div>
      )}

      {/* ── Top attempted apps ── */}
      {topApps.length > 0 && (
        <div
          className="rounded-2xl"
          style={{
            padding: 'var(--sp-4)',
            marginBottom: 'var(--sp-4)',
            background: '#ffffff',
            border: '1.5px solid rgba(21,184,166,0.14)',
          }}
        >
          <p
            className="font-semibold"
            style={{ fontSize: 'var(--text-xs)', color: '#6b8079', marginBottom: 'var(--sp-3)' }}
          >
            {isArabic ? 'أكثر التطبيقات المحاولة' : 'Most attempted apps'}
          </p>
          <div className="space-y-2">
            {topApps.map(({ app, count }, i) => (
              <div key={app} className="flex items-center gap-3">
                <span
                  className="font-bold"
                  style={{ fontSize: 'var(--text-xs)', color: '#bcd9d1', width: 16, textAlign: 'center' }}
                >
                  {i + 1}
                </span>
                <div
                  className="flex-1 rounded-full overflow-hidden"
                  style={{ height: 6, background: 'rgba(21,184,166,0.12)' }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${Math.min(100, (count / (topApps[0]?.count || 1)) * 100)}%`,
                      background: 'linear-gradient(90deg, #f03e3e, #f97316)',
                    }}
                  />
                </div>
                <span
                  className="truncate capitalize"
                  style={{ fontSize: 'var(--text-xs)', color: '#1c2e2b', width: 72, direction: 'ltr' }}
                >
                  {app}
                </span>
                <span
                  className="font-bold"
                  style={{ fontSize: 'var(--text-xs)', color: '#f03e3e', width: 24, textAlign: 'right' }}
                >
                  {count}×
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Statistics link ── */}
      <button
        onClick={() => navigate('/statistics')}
        className="w-full rounded-2xl flex items-center gap-3 transition ze-card-hover"
        style={{
          padding: 'var(--sp-4)',
          background: '#ffffff',
          border: '1.5px solid rgba(21,184,166,0.14)',
        }}
      >
        <div
          className="rounded-xl flex items-center justify-center flex-shrink-0"
          style={{
            width: 'var(--sp-10)',
            height: 'var(--sp-10)',
            background: 'rgba(76,175,125,0.15)',
            border: '1px solid rgba(76,175,125,0.25)',
          }}
        >
          <BarChart3 className="icon-md" style={{ color: '#4caf7d' }} />
        </div>
        <div className="flex-1 text-right">
          <h3
            className="font-semibold"
            style={{ fontSize: 'var(--text-sm)', color: '#1c2e2b' }}
          >
            {isArabic ? 'الإحصائيات التفصيلية' : 'Detailed Statistics'}
          </h3>
          <p style={{ fontSize: 'var(--text-xs)', color: '#6b8079', marginTop: 1 }}>
            {weekSessions.length} {isArabic ? 'جلسة' : 'sessions'} — {totalHours.toFixed(1)}h{' '}
            {isArabic ? 'هذا الأسبوع' : 'this week'}
          </p>
        </div>
        <ChevronLeft
          style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)', color: '#bcd9d1', flexShrink: 0 }}
        />
      </button>
    </ScreenContainer>
  );
}
