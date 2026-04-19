/**
 * SubscriptionScreen — Paywall + Manual Payment
 *
 * Shows when a user's trial/subscription has expired.
 * Routes:  /subscription  |  /subscription-required
 *
 * Sections:
 *   1. Hero headline
 *   2. Plan cards (4 plans) — Google Play primary, manual secondary
 *   3. Manual payment flow (order creation → instructions → mailto)
 *   4. Pending order tracker
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, Check, Crown, Clock, ArrowRight, Copy, Mail } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';
import { useSubscriptionStore } from '../../store/subscriptionStore';
import {
  subscriptionService,
  SUBSCRIPTION_PLANS,
  type PaymentOrder,
  type PaymentMethod,
} from '../../services/subscriptionService';
import type { SubscriptionPlan } from '../../store/authStore';

const ADMIN_EMAIL_CONTACT = 'walidghazal46@gmail.com';

type Step = 'plans' | 'manual_form' | 'manual_confirm' | 'pending';

export function SubscriptionScreen() {
  const navigate = useNavigate();
  const { user, getAccountStatus, trialDaysLeft } = useAuthStore();
  const { language } = usePreferencesStore();
  const { upsertOrder, myOrders } = useSubscriptionStore();
  const ar = language === 'ar';

  const [step, setStep] = useState<Step>(() =>
    myOrders.some(o => o.status === 'pending') ? 'pending' : 'plans'
  );
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan>('annual');
  const [paymentMethod, setPaymentMethod] = useState<Exclude<PaymentMethod, 'google_play'>>('instapay');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [createdOrder, setCreatedOrder] = useState<PaymentOrder | null>(null);
  const [copied, setCopied] = useState(false);

  const status = getAccountStatus();
  const daysLeft = trialDaysLeft();
  const pendingOrder = myOrders.find(o => o.status === 'pending');

  const planFeatures = ar
    ? ['جلسات تركيز غير محدودة', 'حظر تطبيقات متقدم', 'حماية ويب ذكية', 'جدولة تلقائية للجلسات', 'إحصائيات تفصيلية', 'دعم فني 24/7']
    : ['Unlimited focus sessions', 'Advanced app blocking', 'Smart web protection', 'Auto-scheduled sessions', 'Detailed statistics', '24/7 support'];

  const handleGooglePlay = async () => {
    const result = await subscriptionService.launchGooglePlayBilling(selectedPlan);
    if (!result.launched) {
      setError(ar ? 'Google Play Billing قريباً — استخدم الدفع اليدوي مؤقتاً.' : 'Google Play Billing coming soon — use manual payment for now.');
    }
  };

  const handleCreateOrder = async () => {
    if (!user) return;
    setError('');
    setIsSubmitting(true);
    try {
      const order = await subscriptionService.createManualOrder(
        user.id,
        user.email ?? '',
        user.deviceId,
        selectedPlan,
        paymentMethod,
      );
      upsertOrder(order);
      setCreatedOrder(order);
      setStep('manual_confirm');
    } catch {
      setError(ar ? 'حدث خطأ أثناء إنشاء الطلب، حاول مرة أخرى.' : 'Failed to create order, please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyOrderId = (id: string) => {
    navigator.clipboard.writeText(id).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const openMailComposer = (order: PaymentOrder) => {
    const planDef = SUBSCRIPTION_PLANS.find(p => p.id === order.plan)!;
    const subject = encodeURIComponent(`[ZeroEscape] طلب اشتراك - ${order.orderId}`);
    const body = encodeURIComponent(
      `السلام عليكم،\n\nأريد الاشتراك في تطبيق ZeroEscape.\n\nرقم الطلب: ${order.orderId}\nالباقة: ${planDef.nameAr} (${planDef.price} USD)\nالبريد: ${order.email}\nمعرف الجهاز: ${order.deviceId}\nتاريخ الطلب: ${new Date(order.createdAt).toLocaleString('ar-EG')}\nطريقة الدفع: ${order.paymentMethod}\n\nسأرسل إثبات الدفع في أقرب وقت.\n\nشكراً`
    );
    window.location.href = `mailto:${ADMIN_EMAIL_CONTACT}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      dir={ar ? 'rtl' : 'ltr'}
      className="min-h-screen bg-slate-950 flex flex-col overflow-y-auto hide-scrollbar"
      style={{ paddingTop: 'env(safe-area-inset-top, 16px)', paddingBottom: 'calc(env(safe-area-inset-bottom, 0px) + 32px)' }}
    >
      {/* Back / header */}
      <div className="flex items-center gap-3 px-5 py-4">
        <button
          onClick={() => {
            if (step !== 'plans') { setStep('plans'); return; }
            navigate(-1);
          }}
          className="w-9 h-9 flex items-center justify-center text-slate-400 hover:text-white transition rounded-xl"
        >
          <ChevronRight className={`w-5 h-5 ${ar ? '' : 'rotate-180'}`} />
        </button>
        <h1 className="text-white text-lg font-bold flex-1 text-center">
          {ar ? 'الاشتراك' : 'Subscription'}
        </h1>
        <div className="w-9" />
      </div>

      {/* ── STEP: plans ─────────────────────────────────────────────────── */}
      {step === 'plans' && (
        <div className="px-5 space-y-6">
          {/* Hero */}
          <div className="text-center space-y-2 pt-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-[20px] bg-gradient-to-br from-blue-500 to-violet-600 shadow-lg shadow-blue-500/30 mb-2">
              <Crown className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-2xl font-bold">
              {ar ? 'احصل على الوصول الكامل' : 'Get Full Access'}
            </h2>
            <p className="text-slate-400 text-sm">
              {status === 'expired'
                ? (ar ? 'انتهت فترتك المجانية — اشترك الآن للاستمرار' : 'Your free trial ended — subscribe to continue')
                : (ar ? `تبقى لك ${daysLeft} ${daysLeft === 1 ? 'يوم' : 'أيام'} من التجربة` : `${daysLeft} trial day${daysLeft !== 1 ? 's' : ''} remaining`)}
            </p>
          </div>

          {/* Features quick list */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-2">
            {planFeatures.map(f => (
              <div key={f} className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span className="text-slate-300 text-sm">{f}</span>
              </div>
            ))}
          </div>

          {/* Plan cards */}
          <div className="space-y-3">
            <p className="text-slate-500 text-xs px-1">{ar ? 'اختر الباقة المناسبة' : 'Choose your plan'}</p>
            {SUBSCRIPTION_PLANS.map(plan => {
              const isSelected = selectedPlan === plan.id;
              const monthly = (plan.price / (plan.durationDays / 30)).toFixed(2);
              return (
                <button
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan.id)}
                  className={`w-full rounded-2xl border p-4 text-right transition ${
                    isSelected
                      ? 'border-blue-500 bg-blue-500/10'
                      : 'border-slate-800 bg-slate-900 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${isSelected ? 'border-blue-400 bg-blue-500' : 'border-slate-600'}`}>
                        {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                      </div>
                      {plan.badgeAr && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30">
                          {ar ? plan.badgeAr : plan.badgeEn}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-white font-semibold text-sm">{ar ? plan.nameAr : plan.nameEn}</p>
                      <p className="text-slate-500 text-xs mt-0.5">
                        {ar ? `≈ $${monthly} / شهر` : `≈ $${monthly} / month`}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="text-white font-bold text-lg">${plan.price}</span>
                      <span className="text-slate-500 text-xs block">USD</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Google Play primary CTA */}
          <div className="space-y-3">
            <button
              onClick={handleGooglePlay}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-blue-600 to-violet-600 text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition"
            >
              <div className="flex items-center justify-center gap-3">
                <svg viewBox="0 0 512 512" className="w-6 h-6" aria-hidden="true">
                  <path fill="#00d7ff" d="M98 72l228 184-68 55L98 72z" />
                  <path fill="#00f076" d="M98 72l160 239-1 1L98 440V72z" />
                  <path fill="#ff4f81" d="M98 440l228-184-68-55L98 440z" />
                  <path fill="#ffd84d" d="M326 256l46-37c18-15 18-39 0-54l-46-37-69 56 69 72z" />
                </svg>
                <span>{ar ? 'اشترك عبر Google Play' : 'Subscribe via Google Play'}</span>
                <span className="text-xs opacity-70 ml-1">{ar ? '(قريباً)' : '(Soon)'}</span>
              </div>
            </button>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-slate-600 text-xs">{ar ? 'أو' : 'or'}</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Manual payment secondary */}
            <button
              onClick={() => setStep('manual_form')}
              className="w-full h-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-medium text-sm hover:bg-emerald-500/15 transition"
            >
              {ar ? 'دفع يدوي (InstaPay / كاش)' : 'Manual Payment (InstaPay / Cash)'}
            </button>
          </div>

          {/* Pending order banner */}
          {pendingOrder && (
            <button
              onClick={() => setStep('pending')}
              className="w-full rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-right"
            >
              <p className="text-amber-400 text-sm font-semibold">
                {ar ? '⏳ طلبك قيد المراجعة' : '⏳ Your order is under review'}
              </p>
              <p className="text-slate-500 text-xs mt-1">#{pendingOrder.orderId}</p>
            </button>
          )}

          {error && (
            <p className="text-red-400 text-sm text-center bg-red-500/10 border border-red-500/20 rounded-xl p-3">{error}</p>
          )}
        </div>
      )}

      {/* ── STEP: manual_form ──────────────────────────────────────────── */}
      {step === 'manual_form' && (
        <div className="px-5 space-y-5">
          <div className="text-center space-y-1 pt-2">
            <h2 className="text-white text-xl font-bold">{ar ? 'الدفع اليدوي' : 'Manual Payment'}</h2>
            <p className="text-slate-400 text-sm">
              {ar ? 'أرسل الدفع ثم أرسل إشعارًا للأدمن' : 'Send payment then notify the admin'}
            </p>
          </div>

          {/* Selected plan summary */}
          {(() => {
            const plan = SUBSCRIPTION_PLANS.find(p => p.id === selectedPlan)!;
            return (
              <div className="bg-slate-900 border border-blue-500/30 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-slate-500 text-xs">{ar ? 'الباقة المختارة' : 'Selected Plan'}</p>
                  <p className="text-white font-bold">{ar ? plan.nameAr : plan.nameEn}</p>
                </div>
                <div className="text-right">
                  <p className="text-white font-bold text-xl">${plan.price}</p>
                  <p className="text-slate-500 text-xs">USD</p>
                </div>
              </div>
            );
          })()}

          {/* Payment method */}
          <div className="space-y-2">
            <p className="text-slate-500 text-xs px-1">{ar ? 'طريقة الدفع' : 'Payment Method'}</p>
            {(['instapay', 'cash'] as const).map(method => (
              <button
                key={method}
                onClick={() => setPaymentMethod(method)}
                className={`w-full rounded-xl border p-3.5 flex items-center gap-3 transition ${paymentMethod === method ? 'border-blue-500 bg-blue-500/10' : 'border-slate-800 bg-slate-900 hover:border-slate-700'}`}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${paymentMethod === method ? 'border-blue-400 bg-blue-500' : 'border-slate-600'}`}>
                  {paymentMethod === method && <div className="w-2 h-2 bg-white rounded-full" />}
                </div>
                <span className="text-white text-sm font-medium">
                  {method === 'instapay' ? 'InstaPay' : (ar ? 'كاش / حوالة' : 'Cash / Transfer')}
                </span>
              </button>
            ))}
          </div>

          {error && <p className="text-red-400 text-sm">{error}</p>}

          <button
            onClick={handleCreateOrder}
            disabled={isSubmitting}
            className="w-full h-12 rounded-2xl bg-emerald-600 text-white font-bold text-base hover:bg-emerald-500 transition disabled:opacity-50"
          >
            {isSubmitting
              ? (ar ? 'جارٍ الإنشاء...' : 'Creating...')
              : (ar ? 'إنشاء طلب الاشتراك' : 'Create Subscription Order')}
          </button>
        </div>
      )}

      {/* ── STEP: manual_confirm ──────────────────────────────────────── */}
      {step === 'manual_confirm' && createdOrder && (() => {
        const plan = SUBSCRIPTION_PLANS.find(p => p.id === createdOrder.plan)!;
        return (
          <div className="px-5 space-y-5">
            <div className="text-center space-y-1 pt-2">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-emerald-500/20 mb-2">
                <Check className="w-7 h-7 text-emerald-400" />
              </div>
              <h2 className="text-white text-xl font-bold">{ar ? 'تم إنشاء طلبك' : 'Order Created'}</h2>
              <p className="text-slate-400 text-sm">{ar ? 'اتبع التعليمات التالية لإتمام الدفع' : 'Follow the instructions below to complete payment'}</p>
            </div>

            {/* Order ID */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
              <p className="text-slate-500 text-xs mb-2">{ar ? 'رقم الطلب' : 'Order ID'}</p>
              <div className="flex items-center gap-2">
                <span className="text-white font-mono font-bold text-sm flex-1">{createdOrder.orderId}</span>
                <button
                  onClick={() => copyOrderId(createdOrder.orderId)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-800 hover:bg-slate-700 transition"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
                </button>
              </div>
            </div>

            {/* Instructions */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4 space-y-3">
              <p className="text-blue-300 font-semibold text-sm">
                {ar ? '📋 تعليمات الدفع' : '📋 Payment Instructions'}
              </p>
              <ol className="space-y-2 text-slate-300 text-sm list-decimal list-inside">
                <li>
                  {ar
                    ? `أرسل ${plan.price} USD عبر ${createdOrder.paymentMethod === 'instapay' ? 'InstaPay' : 'كاش / حوالة'}`
                    : `Send $${plan.price} USD via ${createdOrder.paymentMethod === 'instapay' ? 'InstaPay' : 'Cash / Transfer'}`}
                </li>
                <li>
                  {ar ? 'أرسل إثبات الدفع (صورة) مع رقم الطلب' : 'Send payment proof (screenshot) with the order ID'}
                </li>
                <li>
                  {ar ? 'راسل الأدمن على البريد أدناه' : 'Email the admin at the address below'}
                </li>
              </ol>
              <div className="flex items-center gap-2 bg-slate-900/60 rounded-xl px-3 py-2">
                <Mail className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span className="text-blue-300 text-sm font-mono flex-1">{ADMIN_EMAIL_CONTACT}</span>
              </div>
            </div>

            {/* Send email */}
            <button
              onClick={() => openMailComposer(createdOrder)}
              className="w-full h-12 rounded-2xl bg-blue-600 text-white font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition"
            >
              <Mail className="w-5 h-5" />
              {ar ? 'إرسال البيانات بالبريد' : 'Send Details by Email'}
            </button>

            <button
              onClick={() => setStep('pending')}
              className="w-full h-12 rounded-2xl border border-slate-700 text-slate-400 text-sm hover:border-slate-600 transition"
            >
              {ar ? 'متابعة حالة الطلب' : 'Track Order Status'}
            </button>
          </div>
        );
      })()}

      {/* ── STEP: pending ─────────────────────────────────────────────── */}
      {step === 'pending' && (
        <div className="px-5 space-y-5">
          <div className="text-center space-y-1 pt-2">
            <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-amber-500/20 mb-2">
              <Clock className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-white text-xl font-bold">{ar ? 'طلبك قيد المراجعة' : 'Order Under Review'}</h2>
            <p className="text-slate-400 text-sm">{ar ? 'سيتم تفعيل اشتراكك فور موافقة الأدمن' : 'Your subscription will activate once the admin approves'}</p>
          </div>

          {myOrders.filter(o => o.status === 'pending' || o.status === 'approved' || o.status === 'rejected').map(order => {
            const plan = SUBSCRIPTION_PLANS.find(p => p.id === order.plan);
            const statusColors: Record<string, string> = {
              pending: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
              approved: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
              rejected: 'text-red-400 bg-red-500/10 border-red-500/20',
              suspended: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
            };
            const statusLabel: Record<string, string> = {
              pending: ar ? 'قيد المراجعة' : 'Under Review',
              approved: ar ? 'مقبول ✓' : 'Approved ✓',
              rejected: ar ? 'مرفوض' : 'Rejected',
              suspended: ar ? 'معلق' : 'Suspended',
            };
            return (
              <div key={order.orderId} className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <span className={`text-xs font-semibold px-2 py-1 rounded-full border ${statusColors[order.status]}`}>
                    {statusLabel[order.status]}
                  </span>
                  <div className="text-right">
                    <p className="text-white font-bold">{plan ? (ar ? plan.nameAr : plan.nameEn) : order.plan}</p>
                    <p className="text-slate-500 text-xs">${order.planPrice} USD</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 text-xs font-mono">{order.orderId}</span>
                  <span className="text-slate-600 text-xs">{new Date(order.createdAt).toLocaleDateString(ar ? 'ar-EG' : 'en-US')}</span>
                </div>
                {order.adminNote && (
                  <p className="text-slate-400 text-xs bg-slate-800 rounded-lg p-2">{order.adminNote}</p>
                )}
              </div>
            );
          })}

          {myOrders.length === 0 && (
            <p className="text-slate-500 text-sm text-center py-8">
              {ar ? 'لا توجد طلبات سابقة' : 'No previous orders'}
            </p>
          )}

          <button
            onClick={() => setStep('plans')}
            className="w-full h-12 rounded-2xl border border-slate-700 text-slate-400 text-sm hover:border-slate-600 transition flex items-center justify-center gap-2"
          >
            <ArrowRight className="w-4 h-4" />
            {ar ? 'العودة للباقات' : 'Back to Plans'}
          </button>
        </div>
      )}
    </div>
  );
}

