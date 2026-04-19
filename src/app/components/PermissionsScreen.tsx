import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, Accessibility, Shield, Power, Lock, CheckCircle2, XCircle, RefreshCw, ChevronRight } from 'lucide-react';

declare global {
  interface Window {
    Android?: {
      openUsageSettings: () => void;
      openAccessibilitySettings: () => void;
      openVpnSettings: () => void;
      openBootSettings: () => void;
      openDeviceAdminSettings: () => void;
      isUsageAccessGranted: () => boolean;
      isAccessibilityGranted: () => boolean;
      isDeviceAdminGranted: () => boolean;
      isVpnPermissionGranted: () => boolean;
      startVpnBlocking: () => void;
      stopVpnBlocking: () => void;
    };
  }
}

const isAndroid = () => typeof window.Android !== 'undefined';

interface Permission {
  id: string;
  icon: React.ElementType;
  title: string;
  description: string;
  open: () => void;
  check: () => boolean;
  required: boolean;
}

const buildPermissions = (): Permission[] => [
  {
    id: 'usage',
    icon: Eye,
    title: 'الوصول للاستخدام',
    description: 'لمراقبة وحظر التطبيقات المفتوحة',
    open: () => window.Android?.openUsageSettings(),
    check: () => window.Android?.isUsageAccessGranted() ?? false,
    required: true,
  },
  {
    id: 'accessibility',
    icon: Accessibility,
    title: 'إمكانية الوصول',
    description: 'للكشف عن التطبيقات وإغلاقها فورًا',
    open: () => window.Android?.openAccessibilitySettings(),
    check: () => window.Android?.isAccessibilityGranted() ?? false,
    required: true,
  },
  {
    id: 'admin',
    icon: Lock,
    title: 'مدير الجهاز',
    description: 'للحماية من الحذف غير المصرح به',
    open: () => window.Android?.openDeviceAdminSettings(),
    check: () => window.Android?.isDeviceAdminGranted() ?? false,
    required: true,
  },
  {
    id: 'vpn',
    icon: Shield,
    title: 'حماية DNS / VPN',
    description: 'لتصفية المواقع الضارة',
    open: () => window.Android?.openVpnSettings(),
    check: () => window.Android?.isVpnPermissionGranted() ?? false,
    required: false,
  },
  {
    id: 'boot',
    icon: Power,
    title: 'التشغيل التلقائي',
    description: 'لمواصلة الجلسة بعد إعادة التشغيل',
    open: () => window.Android?.openBootSettings(),
    check: () => false,
    required: false,
  },
];

export function PermissionsScreen() {
  const navigate = useNavigate();
  const permissions = buildPermissions();

  const checkAll = useCallback((): Record<string, boolean> => {
    const result: Record<string, boolean> = {};
    permissions.forEach((p) => {
      result[p.id] = p.check();
    });
    return result;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [granted, setGranted] = useState<Record<string, boolean>>(checkAll);

  // Re-check every time the user comes back to this tab (e.g. after granting in settings)
  useEffect(() => {
    const handleFocus = () => setGranted(checkAll());
    window.addEventListener('focus', handleFocus);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') setGranted(checkAll());
    });
    return () => window.removeEventListener('focus', handleFocus);
  }, [checkAll]);

  const requiredPermissions = permissions.filter((p) => p.required);
  const allRequiredGranted = isAndroid()
    ? requiredPermissions.every((p) => granted[p.id])
    : true; // On web/browser, skip enforcement

  const handleOpen = (p: Permission) => {
    if (isAndroid()) {
      p.open();
    }
    // After returning, visibility event will re-check
  };

  return (
    <div
      className="min-h-screen bg-slate-950 flex flex-col px-4 overflow-y-auto hide-scrollbar"
      style={{
        paddingTop: `calc(env(safe-area-inset-top, 0px) + 20px)`,
        paddingBottom: `calc(env(safe-area-inset-bottom, 0px) + 24px)`,
      }}
    >
      <div className="flex items-center gap-3 mb-2">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition flex-shrink-0"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
        <div className="mb-5">
        <h1 className="text-white text-2xl font-bold mb-1">الأذونات المطلوبة</h1>
        <p className="text-slate-400 text-sm">يجب منح هذه الصلاحيات حتى يعمل التطبيق بشكل كامل</p>
      </div>

      {/* Refresh button */}
      <button
        onClick={() => setGranted(checkAll())}
        className="mb-4 flex items-center gap-2 text-blue-400 text-sm self-start"
      >
        <RefreshCw className="w-4 h-4" />
        تحديث الحالة
      </button>

      <div className="flex-1 space-y-3 mb-6">
        {permissions.map((permission) => {
          const Icon = permission.icon;
          const isGranted = granted[permission.id];

          return (
            <button
              key={permission.id}
              onClick={() => handleOpen(permission)}
              className="w-full bg-slate-900 rounded-2xl p-5 flex items-center gap-4 active:bg-slate-800 transition border border-slate-800"
            >
              <div className={`p-3 rounded-xl ${isGranted ? 'bg-green-500/20' : 'bg-red-500/10'}`}>
                <Icon className={`w-6 h-6 ${isGranted ? 'text-green-400' : permission.required ? 'text-red-400' : 'text-slate-400'}`} />
              </div>

              <div className="flex-1 text-right">
                <div className="flex items-center justify-end gap-2 mb-1">
                  <h3 className="text-white font-medium">{permission.title}</h3>
                  {permission.required && (
                    <span className="text-xs text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">مطلوب</span>
                  )}
                </div>
                <p className="text-slate-400 text-sm">{permission.description}</p>
                {!isAndroid() && (
                  <p className="text-yellow-500 text-xs mt-1">اضغط لمنح الصلاحية من الجهاز</p>
                )}
              </div>

              {isGranted ? (
                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0" />
              ) : (
                <XCircle className={`w-6 h-6 flex-shrink-0 ${permission.required ? 'text-red-400' : 'text-slate-600'}`} />
              )}
            </button>
          );
        })}
      </div>

      {!allRequiredGranted && isAndroid() && (
        <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-2xl p-4 text-center">
          <p className="text-red-400 text-sm">يجب منح جميع الأذونات المطلوبة للمتابعة</p>
        </div>
      )}

      <button
        onClick={() => navigate('/home')}
        disabled={isAndroid() && !allRequiredGranted}
        className={`w-full py-4 rounded-2xl transition ${
          !isAndroid() || allRequiredGranted
            ? 'bg-gradient-to-r from-blue-500 to-violet-600 text-white hover:opacity-90'
            : 'bg-slate-800 text-slate-500 cursor-not-allowed'
        }`}
      >
        {allRequiredGranted || !isAndroid() ? 'متابعة إلى التطبيق' : 'منح الأذونات المطلوبة أولاً'}
      </button>
    </div>
  );
}
