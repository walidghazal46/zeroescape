import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Shield, Bell, Globe, AlertCircle, Lock, CheckCircle2, Crown, ShieldCheck, CreditCard } from 'lucide-react';
import { authService } from '../../services/authService';
import { useAuthStore, ADMIN_EMAIL } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useSessionStore } from '../../store/sessionStore';
import { SUBSCRIPTION_PLANS } from '../../services/subscriptionService';

function Toggle({ active, onChange }: { active: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`w-12 h-6 rounded-full relative transition flex-shrink-0 ${active ? 'bg-blue-500' : 'bg-slate-700'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'left-1' : 'right-1'}`} />
    </button>
  );
}

export function SettingsScreen() {
  const navigate = useNavigate();
  const { logout, user, setEmergencyPin, getAccountStatus, trialDaysLeft, subscriptionDaysLeft } = useAuthStore();
  const { language, setLanguage } = usePreferencesStore();
  const { activeSession } = useSessionStore();
  const [notifications, setNotifications] = useState(true);
  const [autoStart, setAutoStart] = useState(true);
  const [strictMode, setStrictMode] = useState(false);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [showSessionBlockDialog, setShowSessionBlockDialog] = useState(false);

  // PIN setup state
  const [showPinSetup, setShowPinSetup] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [pinError, setPinError] = useState('');
  const [pinSaved, setPinSaved] = useState(false);

  const isArabic = language === 'ar';
  const hasPIN = Boolean(user?.emergencyPin);
  const isAdmin = user?.email === ADMIN_EMAIL;

  const accountStatus = getAccountStatus();
  const isOnTrial = accountStatus === 'registered_trial' || accountStatus === 'guest_trial';
  const isActive = accountStatus === 'active';
  const daysLeft = isActive ? subscriptionDaysLeft() : trialDaysLeft();
  const currentPlan = user?.currentPlan ? SUBSCRIPTION_PLANS.find(p => p.id === user.currentPlan) : null;

  const performLogout = async () => {
    if (user?.type === 'google') {
      await authService.logout();
    }
    logout();
    navigate('/login');
  };

  const handleLogout = () => {
    if (activeSession) {
      setShowSessionBlockDialog(true);
      return;
    }

    setShowLogoutDialog(true);
  };

  const handleSavePin = () => {
    setPinError('');
    if (newPin.length !== 4) { setPinError('الرمز يجب أن يكون 4 أرقام'); return; }
    if (!/^\d{4}$/.test(newPin)) { setPinError('أرقام فقط'); return; }
    if (newPin !== confirmPin) { setPinError('الرمزان لا يتطابقان'); return; }
    setEmergencyPin(newPin);
    setPinSaved(true);
    setNewPin('');
    setConfirmPin('');
    setTimeout(() => { setShowPinSetup(false); setPinSaved(false); }, 1500);
  };

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col px-4 overflow-y-auto hide-scrollbar"
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
        <h1 className="text-white text-xl font-bold">{isArabic ? 'الإعدادات' : 'Settings'}</h1>
      </div>

      <div className="space-y-5">
        {/* ── Subscription Card ──────────────────────────────────────────────── */}
        {isAdmin ? (
          <div>
            <p className="text-slate-500 text-xs mb-3 px-1">{isArabic ? 'الاشتراك' : 'Subscription'}</p>
            <div className="rounded-2xl border border-violet-500/30 bg-gradient-to-br from-violet-500/10 to-blue-500/5 p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1 text-right">
                  <p className="text-white font-bold text-sm">{isArabic ? 'أدمن · وصول كامل دائم' : 'Admin · Full Access'}</p>
                  <p className="text-violet-400 text-xs mt-0.5">{isArabic ? 'جميع الميزات مفتوحة بلا قيود' : 'All features unlocked, no limits'}</p>
                </div>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-400">
                  {isArabic ? 'نشط ∞' : 'Active ∞'}
                </span>
              </div>
            </div>
          </div>
        ) : (
        <div>
          <p className="text-slate-500 text-xs mb-3 px-1">{isArabic ? 'الاشتراك' : 'Subscription'}</p>
          <div
            className={`rounded-2xl border p-4 ${
              isActive
                ? 'border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-blue-500/5'
                : isOnTrial
                ? 'border-blue-500/30 bg-blue-500/5'
                : 'border-red-500/20 bg-red-500/5'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${isActive ? 'bg-emerald-500/20' : isOnTrial ? 'bg-blue-500/20' : 'bg-red-500/20'}`}>
                <Crown className={`w-5 h-5 ${isActive ? 'text-emerald-400' : isOnTrial ? 'text-blue-400' : 'text-red-400'}`} />
              </div>
              <div className="flex-1 text-right">
                <div className="flex items-center justify-between">
                  <button
                    onClick={() => navigate('/subscription')}
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${isActive ? 'bg-emerald-500/20 text-emerald-400' : isOnTrial ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}
                  >
                    {isActive
                      ? (isArabic ? 'مشترك ✓' : 'Active ✓')
                      : isOnTrial
                      ? (isArabic ? 'تجربة مجانية' : 'Free Trial')
                      : (isArabic ? 'منتهي' : 'Expired')}
                  </button>
                  <p className="text-white text-sm font-semibold">
                    {currentPlan ? (isArabic ? currentPlan.nameAr : currentPlan.nameEn) : (isArabic ? 'الباقة المجانية' : 'Free Plan')}
                  </p>
                </div>
                <div className="mt-2 grid grid-cols-2 gap-2 text-xs">
                  <div className="text-right">
                    <p className="text-slate-500">{isActive ? (isArabic ? 'تاريخ البداية' : 'Start Date') : (isArabic ? 'بداية التجربة' : 'Trial Start')}</p>
                    <p className="text-white font-medium">
                      {isActive
                        ? (user?.subscriptionStartAt ? new Date(user.subscriptionStartAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US') : '—')
                        : (user?.trialStartAt ? new Date(user.trialStartAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US') : '—')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500">{isActive ? (isArabic ? 'تاريخ الانتهاء' : 'End Date') : (isArabic ? 'نهاية التجربة' : 'Trial End')}</p>
                    <p className="text-white font-medium">
                      {isActive
                        ? (user?.subscriptionEndAt ? new Date(user.subscriptionEndAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US') : '—')
                        : (user?.trialEndAt ? new Date(user.trialEndAt).toLocaleDateString(isArabic ? 'ar-EG' : 'en-US') : '—')}
                    </p>
                  </div>
                </div>
                {(isActive || isOnTrial) && daysLeft > 0 && (
                  <div className="mt-2">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-bold ${isActive ? 'text-emerald-400' : 'text-blue-400'}`}>
                        {daysLeft} {isArabic ? 'يوم متبقي' : 'days left'}
                      </span>
                      <span className="text-slate-600 text-xs">
                        {isActive ? (isArabic ? 'اشتراك نشط' : 'Active subscription') : (isArabic ? 'تجربة مجانية' : 'Free trial')}
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${isActive ? 'bg-emerald-500' : 'bg-blue-500'}`}
                        style={{ width: `${Math.min(100, (daysLeft / (isActive ? (currentPlan?.durationDays ?? 30) : 7)) * 100)}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={() => navigate('/subscription')}
              className={`mt-3 w-full h-9 rounded-xl text-xs font-bold transition ${
                isActive
                  ? 'border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/10'
                  : 'bg-blue-600 text-white hover:bg-blue-500'
              }`}
            >
              {isActive
                ? (isArabic ? 'تجديد الاشتراك' : 'Renew Subscription')
                : (isArabic ? 'اشترك الآن ← الوصول الكامل' : 'Subscribe Now ← Full Access')}
            </button>
          </div>
        </div>
        )}

        {/* ── Admin Entry (only for admin email) ──────────────────────────────── */}
        {isAdmin && (
          <div>
            <p className="text-slate-500 text-xs mb-3 px-1">{isArabic ? 'الإدارة' : 'Administration'}</p>
            <button
              onClick={() => navigate('/admin-pin')}
              className="w-full bg-gradient-to-r from-violet-600/20 to-blue-600/20 border border-violet-500/30 rounded-2xl px-4 py-3.5 flex items-center gap-3 hover:from-violet-600/30 hover:to-blue-600/30 transition"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-blue-600 flex items-center justify-center flex-shrink-0 shadow-lg shadow-violet-500/30">
                <ShieldCheck className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1 text-right">
                <p className="text-white font-bold text-sm">{isArabic ? 'لوحة الأدمن' : 'Admin Dashboard'}</p>
                <p className="text-violet-400 text-xs mt-0.5">{isArabic ? 'إدارة المستخدمين والطلبات والاشتراكات' : 'Manage users, orders & subscriptions'}</p>
              </div>
              <ChevronRight className={`w-5 h-5 text-violet-400 ${isArabic ? 'rotate-180' : ''}`} />
            </button>
          </div>
        )}

        {/* ── Protection ───────────────────────────────────────────────────── */}
        <div>
          <p className="text-slate-500 text-xs mb-3 px-1">{isArabic ? 'الحماية' : 'Protection'}</p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden divide-y divide-slate-800">
            <div className="px-4 py-3.5 flex items-center gap-3">
              <div className="w-8 h-8 bg-red-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-red-400" />
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white text-sm font-medium">{isArabic ? 'الوضع الصارم' : 'Strict mode'}</h4>
                <p className="text-slate-500 text-xs mt-0.5">منع الخروج الطارئ خلال الجلسات</p>
              </div>
              <Toggle active={strictMode} onChange={() => setStrictMode(!strictMode)} />
            </div>

            <div className="px-4 py-3.5 flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Shield className="w-4 h-4 text-blue-400" />
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white text-sm font-medium">{isArabic ? 'التشغيل التلقائي' : 'Auto start'}</h4>
                <p className="text-slate-500 text-xs mt-0.5">استعادة الجلسة بعد إعادة التشغيل</p>
              </div>
              <Toggle active={autoStart} onChange={() => setAutoStart(!autoStart)} />
            </div>
          </div>
        </div>

        {/* ── Emergency PIN ─────────────────────────────────────────────────── */}
        <div>
          <p className="text-slate-500 text-xs mb-3 px-1">رمز الطوارئ</p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <button
              onClick={() => { setShowPinSetup(!showPinSetup); setPinError(''); setPinSaved(false); }}
              className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-slate-800 transition"
            >
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${hasPIN ? 'bg-emerald-500/20' : 'bg-amber-500/20'}`}>
                {hasPIN ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Lock className="w-4 h-4 text-amber-400" />}
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white text-sm font-medium">
                  {hasPIN ? 'تغيير رمز الطوارئ' : 'تعيين رمز الطوارئ'}
                </h4>
                <p className={`text-xs mt-0.5 ${hasPIN ? 'text-emerald-500' : 'text-amber-500'}`}>
                  {hasPIN ? 'الرمز مُعيَّن ✓' : 'مطلوب للخروج الطارئ من الجلسات'}
                </p>
              </div>
            </button>

            {showPinSetup && (
              <div className="px-4 pb-4 border-t border-slate-800 pt-4 space-y-3">
                {pinSaved ? (
                  <div className="flex items-center justify-center gap-2 py-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    <p className="text-emerald-400 text-sm font-medium">تم حفظ الرمز بنجاح</p>
                  </div>
                ) : (
                  <>
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={newPin}
                      onChange={(e) => setNewPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="الرمز الجديد (4 أرقام)"
                      className="w-full h-11 bg-slate-800 border border-slate-700 rounded-xl px-4 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition text-center tracking-widest"
                      dir="ltr"
                    />
                    <input
                      type="password"
                      inputMode="numeric"
                      maxLength={4}
                      value={confirmPin}
                      onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
                      placeholder="تأكيد الرمز"
                      className="w-full h-11 bg-slate-800 border border-slate-700 rounded-xl px-4 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-blue-500 transition text-center tracking-widest"
                      dir="ltr"
                    />
                    {pinError && <p className="text-red-400 text-xs">{pinError}</p>}
                    <button
                      onClick={handleSavePin}
                      className="w-full h-10 rounded-xl bg-blue-500/20 border border-blue-500/30 text-blue-400 text-sm font-medium hover:bg-blue-500/30 transition"
                    >
                      حفظ الرمز
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ── Notifications ────────────────────────────────────────────────── */}
        <div>
          <p className="text-slate-500 text-xs mb-3 px-1">{isArabic ? 'الإشعارات' : 'Notifications'}</p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl">
            <div className="px-4 py-3.5 flex items-center gap-3">
              <div className="w-8 h-8 bg-violet-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Bell className="w-4 h-4 text-violet-400" />
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white text-sm font-medium">{isArabic ? 'إشعارات الجلسة' : 'Session notifications'}</h4>
                <p className="text-slate-500 text-xs mt-0.5">تنبيهات البداية والنهاية</p>
              </div>
              <Toggle active={notifications} onChange={() => setNotifications(!notifications)} />
            </div>
          </div>
        </div>

        {/* ── General ──────────────────────────────────────────────────────── */}
        <div>
          <p className="text-slate-500 text-xs mb-3 px-1">{isArabic ? 'عام' : 'General'}</p>
          <div className="bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setLanguage(isArabic ? 'en' : 'ar')}
              className="w-full px-4 py-3.5 flex items-center gap-3 hover:bg-slate-800 transition"
            >
              <div className="w-8 h-8 bg-emerald-500/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <Globe className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="flex-1 text-right">
                <h4 className="text-white text-sm font-medium">{isArabic ? 'اللغة' : 'Language'}</h4>
                <p className="text-slate-500 text-xs mt-0.5">{isArabic ? 'العربية' : 'English'}</p>
              </div>
            </button>
          </div>
        </div>

        {/* ── Privacy note ─────────────────────────────────────────────────── */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 flex items-start gap-3">
          <AlertCircle className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
          <p className="text-blue-300 text-xs leading-relaxed text-right">
            {isArabic
              ? 'ZeroEscape يعمل ضمن حدود النظام ويحترم خصوصيتك. البيانات مخزنة محلياً على جهازك.'
              : 'ZeroEscape runs within system limits and respects your privacy. Data is stored locally on your device.'}
          </p>
        </div>

        {/* ── Logout ───────────────────────────────────────────────────────── */}
        <button
          onClick={handleLogout}
          className="w-full h-12 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 hover:bg-red-500/15 transition"
        >
          {isArabic ? 'تسجيل الخروج' : 'Log out'}
        </button>
      </div>

      {showLogoutDialog && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center px-4" onClick={() => setShowLogoutDialog(false)}>
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm mb-6 rounded-3xl border border-slate-800 bg-slate-900 p-5 text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-lg font-semibold mb-2">
              {isArabic ? 'هل تريد تسجيل الخروج؟' : 'Do you want to log out?'}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {isArabic
                ? 'سيتم إنهاء جلستك الحالية والعودة إلى شاشة تسجيل الدخول.'
                : 'Your account session will end and you will return to the sign-in screen.'}
            </p>
            <div className="flex gap-3">
              <button
                onClick={async () => {
                  setShowLogoutDialog(false);
                  await performLogout();
                }}
                className="flex-1 h-11 rounded-2xl bg-red-600 text-white font-medium hover:bg-red-500 transition"
              >
                {isArabic ? 'تأكيد الخروج' : 'Confirm logout'}
              </button>
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 h-11 rounded-2xl border border-slate-700 bg-slate-800 text-slate-300 font-medium hover:bg-slate-700 transition"
              >
                {isArabic ? 'إلغاء' : 'Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}

      {showSessionBlockDialog && (
        <div className="fixed inset-0 z-[10000] flex items-end justify-center px-4" onClick={() => setShowSessionBlockDialog(false)}>
          <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-sm mb-6 rounded-3xl border border-amber-500/20 bg-slate-900 p-5 text-right shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-white text-lg font-semibold mb-2">
              {isArabic ? 'لا يمكن تسجيل الخروج الآن' : 'Logout is not available now'}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-5">
              {isArabic
                ? 'هناك جلسة تركيز نشطة. أنهِ الجلسة أولاً أو استخدم الخروج الطارئ إذا لزم الأمر.'
                : 'A focus session is currently active. Finish the session first or use emergency exit if necessary.'}
            </p>
            <button
              onClick={() => setShowSessionBlockDialog(false)}
              className="w-full h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-medium hover:bg-amber-500/20 transition"
            >
              {isArabic ? 'فهمت' : 'Understood'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
