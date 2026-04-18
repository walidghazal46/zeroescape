import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Zap, ChevronRight } from 'lucide-react';
import { usePreferencesStore } from '../../store/preferencesStore';
import { subscriptionService } from '../../services/subscriptionService';

export function SubscriptionScreen() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const { language: lang, setLanguage } = usePreferencesStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const plans = [
    {
      id: 'monthly',
      name: lang === 'ar' ? 'شهري' : 'Monthly',
      price: 7,
      period: lang === 'ar' ? 'شهرياً' : '/month',
      description: lang === 'ar' ? 'خطة مرنة بسعر منخفض' : 'Flexible plan at low price',
      features: [
        lang === 'ar' ? 'جلسات تركيز غير محدودة' : 'Unlimited focus sessions',
        lang === 'ar' ? 'حظر تطبيقات متقدم' : 'Advanced app blocking',
        lang === 'ar' ? 'حماية ويب ذكية' : 'Smart web protection',
        lang === 'ar' ? 'إحصائيات مفصلة' : 'Detailed statistics',
        lang === 'ar' ? 'دعم فني 24/7' : '24/7 support',
      ],
    },
    {
      id: 'yearly',
      name: lang === 'ar' ? 'سنوي' : 'Yearly',
      price: 50,
      period: lang === 'ar' ? 'سنوياً' : '/year',
      description: lang === 'ar' ? 'وفّر 40% مع الخطة السنوية' : 'Save 40% with yearly plan',
      features: [
        lang === 'ar' ? 'جلسات تركيز غير محدودة' : 'Unlimited focus sessions',
        lang === 'ar' ? 'حظر تطبيقات متقدم' : 'Advanced app blocking',
        lang === 'ar' ? 'حماية ويب ذكية' : 'Smart web protection',
        lang === 'ar' ? 'إحصائيات مفصلة' : 'Detailed statistics',
        lang === 'ar' ? 'دعم فني 24/7' : '24/7 support',
        lang === 'ar' ? 'أولوية في المميزات الجديدة' : 'Priority for new features',
      ],
      badge: lang === 'ar' ? 'الأفضل' : 'Best Value',
    },
  ];

  const handlePayment = async (plan: string) => {
    setError('');
    setIsSubmitting(true);

    try {
      const result = await subscriptionService.createCheckoutSession(plan as 'monthly' | 'yearly');
      if (result.url) {
        window.location.href = result.url;
        return;
      }

      setError(lang === 'ar' ? 'تعذر بدء صفحة الدفع.' : 'Unable to start checkout.');
    } catch {
      setError(lang === 'ar' ? 'الدفع غير مفعّل بعد على الخادم.' : 'Payment backend is not enabled yet.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => navigate('/home')}
          className="text-slate-400 hover:text-white transition"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        <h1 className="text-white text-2xl font-bold flex-1 text-center">
          {lang === 'ar' ? 'الاشتراكات' : 'Subscriptions'}
        </h1>
        <div className="w-6"></div>
      </div>

      {/* Description */}
      <div className="text-center mb-8">
        <p className="text-slate-400">
          {lang === 'ar'
            ? 'اختر الخطة المناسبة لتحقيق أهدافك'
            : 'Choose the perfect plan for your goals'}
        </p>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-right text-sm text-red-300">
          {error}
        </div>
      )}

      {/* Plans */}
      <div className="flex-1 space-y-4 mb-8">
        {plans.map((plan) => (
          <button
            key={plan.id}
            onClick={() => setSelectedPlan(plan.id as 'monthly' | 'yearly')}
            className={`relative w-full rounded-2xl border-2 transition overflow-hidden ${
              selectedPlan === plan.id
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-800 bg-slate-900'
            }`}
          >
            {plan.badge && (
              <div className="absolute top-0 right-0 bg-gradient-to-r from-blue-500 to-violet-600 text-white px-4 py-1 text-xs font-bold rounded-bl-xl">
                {plan.badge}
              </div>
            )}

            <div className="p-6 text-right">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white text-xl font-bold">{plan.name}</h3>
                  <p className="text-slate-400 text-sm">{plan.description}</p>
                </div>
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                  selectedPlan === plan.id
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-slate-700'
                }`}>
                  {selectedPlan === plan.id && (
                    <Check className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>

              <div className="mb-4">
                <span className="text-4xl font-bold text-white">${plan.price}</span>
                <span className="text-slate-400 text-sm ml-2">{plan.period}</span>
              </div>

              <div className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-3 justify-end">
                    <span className="text-slate-300 text-sm">{feature}</span>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Payment Button */}
      <button
        onClick={() => handlePayment(selectedPlan)}
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-500 to-violet-600 text-white py-4 rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition font-medium mb-4 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting
          ? (lang === 'ar' ? 'جاري فتح الدفع...' : 'Opening checkout...')
          : (lang === 'ar' ? 'المتابعة للدفع' : 'Proceed to Payment')}
        <Zap className="w-5 h-5" />
      </button>

      {/* Safe Payment Info */}
      <div className="text-center text-slate-500 text-xs mb-6">
        {lang === 'ar'
          ? 'الدفع سيُفعّل بعد إضافة باك-إند آمن لإنشاء جلسات Stripe Checkout.'
          : 'Payment will be enabled after adding a secure backend for Stripe Checkout sessions.'}
      </div>

      {/* Language Toggle */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setLanguage('ar')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            lang === 'ar' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
          }`}
        >
          العربية
        </button>
        <button
          onClick={() => setLanguage('en')}
          className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
            lang === 'en' ? 'bg-blue-500 text-white' : 'bg-slate-900 text-slate-400'
          }`}
        >
          English
        </button>
      </div>
    </div>
  );
}
