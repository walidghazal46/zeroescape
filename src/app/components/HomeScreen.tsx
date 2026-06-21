import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Activity,
  BarChart3,
  Calendar,
  CheckCircle2,
  Clock,
  Crown,
  Flame,
  Gauge,
  LayoutDashboard,
  LockKeyhole,
  Play,
  Settings,
  Shield,
  ShieldCheck,
  SlidersHorizontal,
  UserCircle2,
  Users,
  Zap,
} from 'lucide-react';
import { useAuthStore, ADMIN_EMAIL } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useSessionStore } from '../../store/sessionStore';
import { useAnalyticsStore } from '../../store/analyticsStore';
import { useScheduleStore } from '../../store/scheduleStore';
import { ScreenContainer } from './ScreenContainer';

type DashboardTab = 'overview' | 'protection' | 'schedule' | 'account' | 'admin';

interface MetricCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  tone: 'emerald' | 'blue' | 'amber' | 'red';
}

const tones = {
  emerald: { color: '#0f766e', bg: 'rgba(20,184,166,0.12)', border: 'rgba(20,184,166,0.22)' },
  blue: { color: '#2563eb', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.18)' },
  amber: { color: '#b45309', bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.2)' },
  red: { color: '#dc2626', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.2)' },
};

function MetricCard({ icon, label, value, tone }: MetricCardProps) {
  const palette = tones[tone];
  return (
    <div
      className="rounded-2xl"
      style={{
        background: '#ffffff',
        border: `1px solid ${palette.border}`,
        padding: 'var(--sp-3)',
        minWidth: 0,
      }}
    >
      <div
        className="rounded-xl flex items-center justify-center mb-3"
        style={{ width: 38, height: 38, background: palette.bg, color: palette.color }}
      >
        {icon}
      </div>
      <p className="font-black leading-none" style={{ color: '#10201d', fontSize: '1.35rem' }}>
        {value}
      </p>
      <p className="mt-1 leading-tight" style={{ color: '#64748b', fontSize: 'var(--text-xs)' }}>
        {label}
      </p>
    </div>
  );
}

interface ActionTileProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onClick: () => void;
  tone?: keyof typeof tones;
}

function ActionTile({ icon, title, subtitle, onClick, tone = 'emerald' }: ActionTileProps) {
  const palette = tones[tone];
  return (
    <button
      onClick={onClick}
      className="w-full rounded-2xl flex items-center gap-3 text-right transition active:scale-[0.98]"
      style={{
        background: '#ffffff',
        border: '1px solid rgba(15,118,110,0.12)',
        padding: 'var(--sp-4)',
      }}
    >
      <span
        className="rounded-xl flex items-center justify-center flex-shrink-0"
        style={{ width: 44, height: 44, background: palette.bg, color: palette.color }}
      >
        {icon}
      </span>
      <span className="flex-1 min-w-0">
        <span className="block font-bold truncate" style={{ color: '#10201d', fontSize: 'var(--text-sm)' }}>
          {title}
        </span>
        <span className="block truncate" style={{ color: '#64748b', fontSize: 'var(--text-xs)' }}>
          {subtitle}
        </span>
      </span>
    </button>
  );
}

function StatusPill({ label, tone }: { label: string; tone: keyof typeof tones }) {
  const palette = tones[tone];
  return (
    <span
      className="rounded-full px-3 py-1 font-bold"
      style={{ background: palette.bg, color: palette.color, border: `1px solid ${palette.border}`, fontSize: 'var(--text-xs)' }}
    >
      {label}
    </span>
  );
}

export function HomeScreen() {
  const navigate = useNavigate();
  const { user, getAccountStatus, trialDaysLeft, subscriptionDaysLeft } = useAuthStore();
  const { language } = usePreferencesStore();
  const { blockedApps, getTotalHoursThisWeek, getStreakDays, completedSessions, activeSession } = useSessionStore();
  const { getWeeklyBreakCount, getMostAttemptedApp, getTopBlockedApps } = useAnalyticsStore();
  const { schedules, getNextSchedule } = useScheduleStore();
  const isArabic = language === 'ar';
  const isAdmin = Boolean(user?.isAdmin || user?.email === ADMIN_EMAIL);
  const isGuest = user?.type === 'guest';
  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');

  const blockedCount = Object.values(blockedApps).filter(Boolean).length;
  const totalHours = getTotalHoursThisWeek();
  const streak = getStreakDays();
  const weeklyBreaks = getWeeklyBreakCount();
  const topApp = getMostAttemptedApp();
  const topApps = getTopBlockedApps(4);
  const enabledSchedules = schedules.filter((schedule) => schedule.enabled);
  const nextSchedule = getNextSchedule();
  const accountStatus = getAccountStatus();
  const accessDaysLeft = accountStatus === 'active' ? subscriptionDaysLeft() : trialDaysLeft();
  const weekAgo = Date.now() - 7 * 86400000;
  const weekSessions = completedSessions.filter((session) => session.completedAt >= weekAgo);
  const cleanSessions = weekSessions.filter((session) => session.blockedAttempts === 0).length;
  const complianceRate = weekSessions.length > 0 ? Math.round((cleanSessions / weekSessions.length) * 100) : 0;

  const tabs: Array<{ key: DashboardTab; label: string; icon: React.ReactNode }> = [
    { key: 'overview', label: isArabic ? 'الرئيسية' : 'Overview', icon: <LayoutDashboard size={16} /> },
    { key: 'protection', label: isArabic ? 'الحماية' : 'Protect', icon: <Shield size={16} /> },
    { key: 'schedule', label: isArabic ? 'الجدول' : 'Schedule', icon: <Calendar size={16} /> },
    { key: 'account', label: isArabic ? 'الحساب' : 'Account', icon: <UserCircle2 size={16} /> },
  ];

  if (isAdmin) {
    tabs.push({ key: 'admin', label: isArabic ? 'الإدارة' : 'Admin', icon: <Crown size={16} /> });
  }

  const statusLabel =
    isAdmin ? (isArabic ? 'مدير النظام' : 'Admin') :
    isGuest ? (isArabic ? 'ضيف' : 'Guest') :
    accountStatus === 'active' ? (isArabic ? 'نشط' : 'Active') :
    accountStatus === 'registered_trial' ? (isArabic ? 'تجربة' : 'Trial') :
    accountStatus === 'suspended' ? (isArabic ? 'موقوف' : 'Suspended') :
    isArabic ? 'منتهي' : 'Expired';

  const statusTone: keyof typeof tones =
    accountStatus === 'active' ? 'emerald' :
    accountStatus === 'suspended' || accountStatus === 'expired' ? 'red' :
    isGuest ? 'amber' : 'blue';

  return (
    <ScreenContainer scrollable style={{ background: '#eef5f1', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 96px)' }}>
      <div className="relative space-y-5" dir="rtl">
        <div
          className="rounded-[28px] overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #083f3b 0%, #0f766e 58%, #14b8a6 100%)',
            padding: 'var(--sp-5)',
            color: '#ffffff',
          }}
        >
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="font-bold mb-1" style={{ opacity: 0.72, fontSize: 'var(--text-xs)' }}>
                ZeroEscape No.1
              </p>
              <h1 className="font-black leading-tight" style={{ fontSize: '1.65rem' }}>
                {isArabic ? 'لوحة التحكم الداخلية' : 'Internal Control Center'}
              </h1>
              <p className="mt-2 leading-relaxed" style={{ opacity: 0.78, fontSize: 'var(--text-sm)' }}>
                {isAdmin
                  ? (isArabic ? 'تحكم في المستخدمين والنظام من مكان واحد.' : 'Manage users and system access in one place.')
                  : isGuest
                    ? (isArabic ? 'تجربة محدودة مرتبطة بجهازك الحالي.' : 'A limited trial connected to this device.')
                    : (isArabic ? 'حسابك وحمايتك وجدولك في نظام tabs واحد.' : 'Your account, protection, and schedules in one tabbed system.')}
              </p>
            </div>
            <StatusPill label={statusLabel} tone={statusTone} />
          </div>

          <button
            onClick={() => activeSession ? navigate('/active-session') : navigate('/start-session')}
            className="mt-5 w-full rounded-2xl flex items-center justify-center gap-2 font-black transition active:scale-[0.98]"
            style={{
              height: 56,
              background: '#ffffff',
              color: activeSession ? '#dc2626' : '#0f766e',
              boxShadow: '0 18px 34px rgba(2,6,23,0.18)',
            }}
          >
            {activeSession ? <Zap size={20} /> : <Play size={20} />}
            {activeSession
              ? (isArabic ? 'العودة للجلسة النشطة' : 'Return to active session')
              : (isArabic ? 'ابدأ جلسة حماية' : 'Start protection session')}
          </button>
        </div>

        <div
          className="flex gap-2 overflow-x-auto hide-scrollbar pb-1"
          aria-label={isArabic ? 'تبويبات لوحة التحكم' : 'Dashboard tabs'}
        >
          {tabs.map((tab) => {
            const selected = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className="flex items-center gap-2 rounded-2xl px-4 py-3 font-bold whitespace-nowrap transition"
                style={{
                  background: selected ? '#10201d' : '#ffffff',
                  color: selected ? '#ffffff' : '#475569',
                  border: `1px solid ${selected ? '#10201d' : 'rgba(15,118,110,0.12)'}`,
                  fontSize: 'var(--text-xs)',
                }}
              >
                {tab.icon}
                {tab.label}
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="space-y-4"
        >
          {activeTab === 'overview' && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <MetricCard icon={<Flame size={19} />} value={streak} label={isArabic ? 'أيام متتالية' : 'Day streak'} tone="amber" />
                <MetricCard icon={<Clock size={19} />} value={`${totalHours.toFixed(1)}h`} label={isArabic ? 'هذا الأسبوع' : 'This week'} tone="blue" />
                <MetricCard icon={<ShieldCheck size={19} />} value={`${complianceRate}%`} label={isArabic ? 'نسبة الالتزام' : 'Compliance'} tone="emerald" />
                <MetricCard icon={<Activity size={19} />} value={weekSessions.length} label={isArabic ? 'جلسات مكتملة' : 'Sessions'} tone="emerald" />
              </div>

              <ActionTile
                icon={<BarChart3 size={21} />}
                title={isArabic ? 'الإحصائيات التفصيلية' : 'Detailed statistics'}
                subtitle={weeklyBreaks > 0
                  ? (isArabic ? `${weeklyBreaks} محاولة كسر هذا الأسبوع` : `${weeklyBreaks} break attempts this week`)
                  : (isArabic ? 'الأسبوع الحالي مستقر' : 'This week is stable')}
                tone={weeklyBreaks > 0 ? 'amber' : 'emerald'}
                onClick={() => navigate('/statistics')}
              />
            </>
          )}

          {activeTab === 'protection' && (
            <>
              <ActionTile
                icon={<LockKeyhole size={21} />}
                title={isArabic ? 'التطبيقات المحظورة' : 'Blocked apps'}
                subtitle={isArabic ? `${blockedCount} تطبيق مفعل عليه الحظر` : `${blockedCount} apps currently blocked`}
                tone="red"
                onClick={() => navigate('/blocked-apps')}
              />
              <ActionTile
                icon={<Gauge size={21} />}
                title={isArabic ? 'أكثر تطبيق يحاول كسر الجلسة' : 'Most attempted app'}
                subtitle={topApp ? topApp : (isArabic ? 'لا توجد محاولات بعد' : 'No attempts yet')}
                tone="amber"
                onClick={() => navigate('/statistics')}
              />
              {topApps.length > 0 && (
                <div className="rounded-2xl space-y-3" style={{ background: '#ffffff', border: '1px solid rgba(15,118,110,0.12)', padding: 'var(--sp-4)' }}>
                  <p className="font-bold" style={{ color: '#10201d', fontSize: 'var(--text-sm)' }}>
                    {isArabic ? 'نشاط الحظر' : 'Block activity'}
                  </p>
                  {topApps.map(({ app, count }) => (
                    <div key={app} className="flex items-center gap-3">
                      <span className="w-20 truncate text-left" style={{ color: '#475569', fontSize: 'var(--text-xs)', direction: 'ltr' }}>{app}</span>
                      <span className="flex-1 rounded-full overflow-hidden" style={{ height: 7, background: 'rgba(15,118,110,0.1)' }}>
                        <span className="block h-full rounded-full" style={{ width: `${Math.min(100, (count / (topApps[0]?.count || 1)) * 100)}%`, background: '#ef4444' }} />
                      </span>
                      <span className="font-bold" style={{ color: '#dc2626', fontSize: 'var(--text-xs)' }}>{count}</span>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {activeTab === 'schedule' && (
            <>
              <ActionTile
                icon={<Calendar size={21} />}
                title={isArabic ? 'الجدولة التلقائية' : 'Automatic scheduling'}
                subtitle={enabledSchedules.length > 0
                  ? (isArabic ? `${enabledSchedules.length} جدول نشط` : `${enabledSchedules.length} active schedules`)
                  : (isArabic ? 'ابدأ بإضافة جدول حماية' : 'Add your first protection schedule')}
                tone="blue"
                onClick={() => navigate('/schedule')}
              />
              <div className="rounded-2xl" style={{ background: '#ffffff', border: '1px solid rgba(15,118,110,0.12)', padding: 'var(--sp-4)' }}>
                <p className="font-bold mb-2" style={{ color: '#10201d', fontSize: 'var(--text-sm)' }}>
                  {isArabic ? 'الجلسة القادمة' : 'Next session'}
                </p>
                <p style={{ color: '#64748b', fontSize: 'var(--text-sm)' }}>
                  {nextSchedule
                    ? nextSchedule.firesAt.toLocaleString(isArabic ? 'ar-EG' : 'en-US', { weekday: 'long', hour: '2-digit', minute: '2-digit' })
                    : (isArabic ? 'لا توجد جلسات مجدولة حالياً.' : 'No scheduled sessions yet.')}
                </p>
              </div>
            </>
          )}

          {activeTab === 'account' && (
            <>
              <div className="rounded-2xl" style={{ background: '#ffffff', border: '1px solid rgba(15,118,110,0.12)', padding: 'var(--sp-4)' }}>
                <div className="flex items-center gap-3">
                  <div className="rounded-2xl flex items-center justify-center" style={{ width: 50, height: 50, background: tones.emerald.bg, color: tones.emerald.color }}>
                    <UserCircle2 size={25} />
                  </div>
                  <div className="flex-1 min-w-0 text-right">
                    <p className="font-black truncate" style={{ color: '#10201d', fontSize: 'var(--text-base)' }}>{user?.name || (isArabic ? 'مستخدم ZeroEscape' : 'ZeroEscape user')}</p>
                    <p className="truncate" style={{ color: '#64748b', fontSize: 'var(--text-xs)', direction: 'ltr' }}>{user?.email || (isArabic ? 'حساب ضيف' : 'Guest account')}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <StatusPill label={statusLabel} tone={statusTone} />
                  <StatusPill
                    label={accessDaysLeft > 0 ? (isArabic ? `${accessDaysLeft} يوم متبقي` : `${accessDaysLeft} days left`) : (isArabic ? 'يحتاج تفعيل' : 'Needs activation')}
                    tone={accessDaysLeft > 0 ? 'blue' : 'red'}
                  />
                </div>
              </div>
              <ActionTile
                icon={<Settings size={21} />}
                title={isArabic ? 'إعدادات الحساب' : 'Account settings'}
                subtitle={isArabic ? 'PIN، اللغة، الاشتراك، والخروج' : 'PIN, language, subscription, and logout'}
                onClick={() => navigate('/settings')}
              />
            </>
          )}

          {activeTab === 'admin' && isAdmin && (
            <>
              <div className="grid grid-cols-2 gap-3">
                <MetricCard icon={<Crown size={19} />} value="Admin" label={isArabic ? 'صلاحية الحساب' : 'Account role'} tone="amber" />
                <MetricCard icon={<Users size={19} />} value="Panel" label={isArabic ? 'لوحة المستخدمين' : 'User panel'} tone="blue" />
              </div>
              <ActionTile
                icon={<SlidersHorizontal size={21} />}
                title={isArabic ? 'فتح لوحة الإدارة' : 'Open admin console'}
                subtitle={isArabic ? 'إدارة الحسابات والطلبات والحالات' : 'Manage accounts, orders, and statuses'}
                tone="amber"
                onClick={() => navigate('/admin')}
              />
              <ActionTile
                icon={<CheckCircle2 size={21} />}
                title={isArabic ? 'مراجعة النظام الحالي' : 'Review current system'}
                subtitle={isArabic ? 'الحماية والجدولة والإعدادات متصلة بالمستخدم الحالي' : 'Protection, schedules, and settings are linked to this user'}
                tone="emerald"
                onClick={() => setActiveTab('overview')}
              />
            </>
          )}
        </motion.div>
      </div>
    </ScreenContainer>
  );
}
