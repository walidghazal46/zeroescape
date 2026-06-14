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
      {/* ── Header ── */}
      <div
        className="flex items-center justify-between"
        style={{ marginBottom: 'var(--sp-5)' }}
      >
        <div className="flex-1 min-w-0">
          <h1
            className="font-bold leading-tight truncate"
            style={{ fontSize: 'var(--text-xl)', color: '#1c2e2b' }}
          >
            {user?.name ? (
              <>
                {isArabic ? 'مرحباً، ' : 'Welcome, '}
                <span style={{ color: '#15b8a6' }}>{user.name}</span>
              </>
            ) : (
              greeting
            )}
          </h1>
          {goalConfig && (
            <p
              className="mt-0.5 truncate"
              style={{ fontSize: 'var(--text-xs)', color: '#6b8079' }}
            >
              {goalConfig.emoji} {goalConfig.labelAr}
            </p>
          )}
        </div>
        <button
          onClick={() => navigate('/settings')}
          className="flex-shrink-0 rounded-xl flex items-center justify-center transition ze-card-hover"
          style={{
            width: 'var(--btn-h)',
            height: 'var(--btn-h)',
            background: '#ffffff',
            border: '1.5px solid rgba(21,184,166,0.14)',
            marginRight: 'var(--sp-3)',
          }}
        >
          <Settings
            className="icon-md"
            style={{ color: '#6b8079' }}
          />
        </button>
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

      {/* ── Session card ── */}
      {activeSession ? (
        <motion.button
          whileTap={{ scale: 0.975 }}
          onClick={() => navigate('/active-session')}
          className="w-full rounded-2xl flex items-center gap-3 transition"
          style={{
            padding: 'var(--sp-4)',
            marginBottom: 'var(--sp-4)',
            background: 'linear-gradient(135deg, rgba(16,217,140,0.14) 0%, rgba(16,185,129,0.08) 100%)',
            border: '1.5px solid rgba(16,217,140,0.3)',
          }}
        >
          <div
            className="rounded-full animate-pulse flex-shrink-0"
            style={{ width: 10, height: 10, background: '#10d98c' }}
          />
          <div className="flex-1 text-right">
            <p
              className="font-semibold"
              style={{ fontSize: 'var(--text-sm)', color: '#10d98c' }}
            >
              {isArabic ? 'جلسة نشطة الآن' : 'Session Active'}
            </p>
            <p style={{ fontSize: 'var(--text-xs)', color: '#6b8079', textTransform: 'capitalize' }}>
              {activeSession.mode.replace('_', ' ')}
            </p>
          </div>
          <span style={{ fontSize: 'var(--text-xs)', color: '#10d98c' }}>
            {isArabic ? 'انتقل ↩' : 'Resume ↩'}
          </span>
        </motion.button>
      ) : (
        <div
          className="rounded-2xl relative overflow-hidden"
          style={{
            padding: 'var(--sp-4)',
            marginBottom: 'var(--sp-4)',
            background: 'linear-gradient(135deg, rgba(76,175,125,0.2) 0%, rgba(76,175,125,0.12) 100%)',
            border: '1.5px solid rgba(76,175,125,0.25)',
          }}
        >
          {/* Gold accent line */}
          <div
            className="absolute top-0 right-0 w-1 h-full rounded-r-2xl"
            style={{ background: 'linear-gradient(180deg, #15b8a6, #0d9488)' }}
          />
          <div className="flex items-center gap-3" style={{ marginBottom: 'var(--sp-3)' }}>
            <div
              className="rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                width: 'var(--sp-10)',
                height: 'var(--sp-10)',
                background: 'rgba(76,175,125,0.2)',
                border: '1px solid rgba(76,175,125,0.3)',
              }}
            >
              <Zap className="icon-md" style={{ color: '#4caf7d' }} />
            </div>
            <div className="flex-1 text-right">
              <h2
                className="font-bold"
                style={{ fontSize: 'var(--text-sm)', color: '#1c2e2b' }}
              >
                {isArabic ? 'جاهز للتركيز؟' : 'Ready to Focus?'}
              </h2>
              <p style={{ fontSize: 'var(--text-xs)', color: '#6b8079' }}>
                {isArabic ? 'ابدأ جلسة تركيز الآن' : 'Start a focus session now'}
              </p>
            </div>
          </div>
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate('/start-session')}
            className="btn-primary"
            style={{
              background: 'linear-gradient(135deg, #15b8a6, #0d9488)',
              color: '#ffffff',
              fontWeight: 700,
              boxShadow: '0 6px 24px rgba(21,184,166,0.28)',
            }}
          >
            <Play
              style={{ width: 'var(--icon-sm)', height: 'var(--icon-sm)', marginLeft: 8, fill: '#ffffff' }}
            />
            <span style={{ fontSize: 'var(--text-sm)' }}>
              {isArabic ? 'ابدأ جلسة تركيز' : 'Start Focus Session'}
            </span>
          </motion.button>
        </div>
      )}

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
        />
        <FeatureCard
          icon={<Shield className="icon-sm" style={{ color: '#10d98c' }} />}
          title={isArabic ? 'حماية الويب' : 'Web Protection'}
          subtitle={isArabic ? 'DNS نشط' : 'DNS Active'}
          iconBg="rgba(16,217,140,0.15)"
          iconColor="#10d98c"
          badge={isArabic ? 'نشط' : 'ON'}
          badgeColor="#10d98c"
          onClick={() => navigate('/web-protection')}
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
