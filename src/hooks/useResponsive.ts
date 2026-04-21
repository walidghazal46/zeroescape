/**
 * useResponsive — screen-size awareness hook
 *
 * Device tiers (logical pixels / CSS px):
 *   small  — width < 360   (old/small phones)
 *   phone  — 360 ≤ w < 480 (standard phones, default)
 *   large  — 480 ≤ w < 600 (large phones / phablets)
 *   tablet — w ≥ 600       (tablets, foldables in unfolded state)
 *
 * Orientation: 'portrait' | 'landscape'
 *
 * Returns stable values — only re-renders when tier or orientation changes.
 */
import { useState, useEffect, useCallback } from 'react';

export type DeviceTier = 'small' | 'phone' | 'large' | 'tablet';
export type Orientation = 'portrait' | 'landscape';

export interface ResponsiveInfo {
  width: number;
  height: number;
  tier: DeviceTier;
  orientation: Orientation;
  isSmall: boolean;
  isPhone: boolean;
  isLarge: boolean;
  isTablet: boolean;
  isPortrait: boolean;
  isLandscape: boolean;
  /** True when height is very short (landscape phone or keyboard open) */
  isCompact: boolean;
}

function getTier(w: number): DeviceTier {
  if (w < 360) return 'small';
  if (w < 480) return 'phone';
  if (w < 600) return 'large';
  return 'tablet';
}

function getOrientation(w: number, h: number): Orientation {
  return w >= h ? 'landscape' : 'portrait';
}

function snapshot(): ResponsiveInfo {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const tier = getTier(w);
  const orientation = getOrientation(w, h);
  return {
    width: w,
    height: h,
    tier,
    orientation,
    isSmall: tier === 'small',
    isPhone: tier === 'phone',
    isLarge: tier === 'large',
    isTablet: tier === 'tablet',
    isPortrait: orientation === 'portrait',
    isLandscape: orientation === 'landscape',
    isCompact: h < 480,
  };
}

export function useResponsive(): ResponsiveInfo {
  const [info, setInfo] = useState<ResponsiveInfo>(snapshot);

  const handleResize = useCallback(() => {
    const next = snapshot();
    setInfo((prev) => {
      // Only trigger re-render when tier or orientation actually changes
      if (
        prev.tier === next.tier &&
        prev.orientation === next.orientation &&
        prev.isCompact === next.isCompact
      ) {
        return prev;
      }
      return next;
    });
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize, { passive: true });
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  return info;
}
