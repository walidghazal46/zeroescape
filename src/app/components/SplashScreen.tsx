import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuthStore } from '../../store/authStore';
import { usePreferencesStore } from '../../store/preferencesStore';

export function SplashScreen() {
  const navigate = useNavigate();
  const { user, isLoading, isGuestExpired } = useAuthStore();
  const { onboardingCompleted } = usePreferencesStore();

  useEffect(() => {
    if (isLoading) return;

    const timer = setTimeout(() => {
      if (!user) {
        navigate('/login');
        return;
      }
      if (user.type === 'guest' && isGuestExpired()) {
        navigate('/login');
        return;
      }
      navigate(onboardingCompleted ? '/home' : '/onboarding');
    }, 1400);

    return () => clearTimeout(timer);
  }, [navigate, user, isLoading, isGuestExpired, onboardingCompleted]);

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: '#f6f5ef' }}
    >
      {/* ── Organic ambient blobs ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="ze-blob absolute rounded-full"
          style={{
            top: '12%',
            right: '-5%',
            width: '65vw',
            height: '65vw',
            maxWidth: 260,
            maxHeight: 260,
            background: 'radial-gradient(circle, rgba(76,175,125,0.35) 0%, transparent 70%)',
            filter: 'blur(38px)',
          }}
        />
        <div
          className="ze-blob-delayed absolute rounded-full"
          style={{
            bottom: '18%',
            left: '-8%',
            width: '70vw',
            height: '70vw',
            maxWidth: 280,
            maxHeight: 280,
            background: 'radial-gradient(circle, rgba(21,184,166,0.2) 0%, transparent 70%)',
            filter: 'blur(45px)',
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: '55%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '80vw',
            height: '80vw',
            maxWidth: 320,
            maxHeight: 320,
            background: 'radial-gradient(circle, rgba(16,217,140,0.08) 0%, transparent 65%)',
            filter: 'blur(55px)',
          }}
        />
      </div>

      {/* ── Decorative grid lines (subtle) ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(21,184,166,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(21,184,166,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      {/* ── App icon with gold ring ── */}
      <motion.div
        initial={{ scale: 0.55, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative mb-10"
      >
        {/* Outer diffuse glow */}
        <div
          className="absolute rounded-[36px]"
          style={{
            inset: -20,
            background: 'radial-gradient(circle, rgba(21,184,166,0.18) 0%, transparent 70%)',
            filter: 'blur(16px)',
          }}
        />
        {/* Animated gold-violet gradient border ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          className="absolute rounded-[34px]"
          style={{
            inset: -3,
            background: 'conic-gradient(from 0deg, #15b8a6, #4caf7d, #10d98c, #15b8a6)',
            padding: 2,
          }}
        >
          <div className="w-full h-full rounded-[32px]" style={{ background: '#f6f5ef' }} />
        </motion.div>
        {/* Static inner border (fallback while ring rotates) */}
        <div
          className="absolute rounded-[32px]"
          style={{ inset: -1, background: 'rgba(21,184,166,0.12)' }}
        />
        <img
          src="/icon.png"
          alt="ZeroEscape"
          className="relative rounded-[28px]"
          style={{
            width: 'clamp(100px, 28vw, 120px)',
            height: 'clamp(100px, 28vw, 120px)',
            boxShadow: '0 24px 64px rgba(0,0,0,0.15), 0 0 0 1px rgba(21,184,166,0.08)',
          }}
          onError={(e) => {
            const el = e.target as HTMLImageElement;
            el.style.display = 'none';
          }}
        />
      </motion.div>

      {/* ── Brand title ── */}
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center px-6 mb-3"
      >
        <h1
          className="font-bold tracking-tight leading-tight"
          style={{ fontSize: 'var(--text-3xl)', color: '#1c2e2b' }}
        >
          Zero<span style={{ color: '#15b8a6' }}>Escape</span>
          <span
            className="block"
            style={{ fontSize: 'var(--text-sm)', color: 'rgba(21,184,166,0.55)', letterSpacing: '0.22em', fontWeight: 600, marginTop: 4 }}
          >
            No.1
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ y: 12, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-center px-10"
        style={{ fontSize: 'var(--text-sm)', color: '#6b8079', lineHeight: 1.6 }}
      >
        التطبيق الأول في تعزيز التركيز وإدمان الموبايل
      </motion.p>

      {/* ── Gold progress shimmer bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="absolute bottom-14 overflow-hidden rounded-full"
        style={{
          width: 'clamp(96px, 28vw, 120px)',
          height: 2,
          background: 'rgba(21,184,166,0.15)',
        }}
      >
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '300%' }}
          transition={{
            repeat: Infinity,
            duration: 1.4,
            ease: 'easeInOut',
            repeatDelay: 0.3,
          }}
          className="h-full rounded-full"
          style={{
            width: '40%',
            background: 'linear-gradient(90deg, transparent, #15b8a6, #4caf7d, transparent)',
          }}
        />
      </motion.div>

      {/* ── Version tag ── */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-6"
        style={{ fontSize: 'var(--text-xs)', color: 'rgba(107,128,121,0.45)', letterSpacing: '0.06em' }}
      >
        v1.0
      </motion.span>
    </div>
  );
}
