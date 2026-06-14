import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Routes where pressing the Android back button should prompt the user
 * to exit the app instead of navigating backwards.
 */
const EXIT_ROUTES = new Set(['/', '/home', '/login']);
const SESSION_LOCKED_ROUTES = new Set(['/active-session', '/emergency-exit']);

/**
 * Registers window.onAndroidBack so MainActivity can call it when the
 * Android hardware/gesture back button is pressed.
 *
 * - On non-root screens  → navigate one step back (React Router history)
 * - On root/home screens → call window.Android.showExitDialog() (native dialog)
 *                          or fall back to an in-app confirmation overlay.
 */
export function useAndroidBack(): {
  showExitDialog: boolean;
  dismissExitDialog: () => void;
  confirmExit: () => void;
} {
  const navigate = useNavigate();
  const location = useLocation();
  const [showExitDialog, setShowExitDialog] = useState(false);

  useEffect(() => {
    if (SESSION_LOCKED_ROUTES.has(location.pathname)) {
      return;
    }

    (window as any).onAndroidBack = () => {
      if (EXIT_ROUTES.has(location.pathname)) {
        setShowExitDialog(true);
      } else {
        navigate(-1);
      }
    };

    return () => {
      (window as any).onAndroidBack = undefined;
    };
  }, [location.pathname, navigate]);

  const dismissExitDialog = () => {
    setShowExitDialog(false);
    // Remove the red ambient glow or any specific state if needed
  };
  const confirmExit = () => {
    setShowExitDialog(false);
    // Try native exit, fallback to window.close()
    const bridge = (window as any).Android;
    if (typeof bridge?.exitApp === 'function') {
      bridge.exitApp();
    } else {
      window.close();
    }
  };

  return { showExitDialog, dismissExitDialog, confirmExit };
}
