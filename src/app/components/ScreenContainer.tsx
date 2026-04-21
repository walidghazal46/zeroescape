/**
 * ScreenContainer — the universal layout wrapper for every screen.
 *
 * Features:
 *  • Full-height flex column (100dvh)
 *  • Safe-area insets composed into padding (notch, navbar, rounded corners)
 *  • Horizontal padding via CSS --screen-px (scales with viewport width)
 *  • On tablets (≥600px) the inner content is centred with max-width 420px
 *  • Landscape-compact mode reduces vertical padding automatically
 *  • Optional `noPadX` / `noPadY` escapes for full-bleed screens
 *  • Optional `scrollable` for overflowing content
 */
import type { ReactNode, CSSProperties } from 'react';
import { useResponsive } from '../../hooks/useResponsive';

interface ScreenContainerProps {
  children: ReactNode;
  /** Remove horizontal padding (full-bleed, e.g. ActiveSession fullscreen) */
  noPadX?: boolean;
  /** Remove vertical padding (manually handled by child) */
  noPadY?: boolean;
  /** Make the container vertically scrollable */
  scrollable?: boolean;
  /** Extra CSS class names for the outer wrapper */
  className?: string;
  /** Inline style overrides */
  style?: CSSProperties;
}

export function ScreenContainer({
  children,
  noPadX = false,
  noPadY = false,
  scrollable = false,
  className = '',
  style,
}: ScreenContainerProps) {
  const { isCompact, isTablet, width } = useResponsive();

  const verticalBase = isCompact ? 'var(--sp-3)' : 'var(--sp-5)';
  const verticalEnd   = isCompact ? 'var(--sp-3)' : 'var(--sp-6)';

  const containerStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100dvh',
    width: '100%',
    paddingTop:    noPadY ? 0 : `calc(env(safe-area-inset-top, 0px) + ${verticalBase})`,
    paddingBottom: noPadY ? 0 : `calc(env(safe-area-inset-bottom, 0px) + ${verticalEnd})`,
    paddingLeft:   noPadX ? 0 : `calc(env(safe-area-inset-left, 0px) + var(--screen-px))`,
    paddingRight:  noPadX ? 0 : `calc(env(safe-area-inset-right, 0px) + var(--screen-px))`,
    overflowY: scrollable ? 'auto' : 'hidden',
    overflowX: 'hidden',
    boxSizing: 'border-box',
    ...style,
  };

  // Keep a mobile-like centred column only on medium tablet widths.
  // On wide desktop browsers, use full width to avoid split-looking layout.
  if (isTablet && width <= 1024 && !noPadX) {
    return (
      <div style={containerStyle} className={`bg-slate-950 ${className}`}>
        <div
          style={{
            width: '100%',
            maxWidth: 'var(--screen-max)',
            marginInline: 'auto',
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </div>
      </div>
    );
  }

  return (
    <div style={containerStyle} className={`bg-slate-950 ${className}`}>
      {children}
    </div>
  );
}
