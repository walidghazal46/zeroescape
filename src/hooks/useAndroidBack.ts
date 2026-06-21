import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

/**
 * Routes where pressing the Android back button should prompt the user
 * to exit the app instead of navigating backwards.
 */
const ROOT_ROUTES = new Set(['/', '/home', '/login', '/schedule', '/blocked-apps', '/settings']);
const SESSION_LOCKED_ROUTES = new Set(['/active-session', '/emergency-exit']);

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
      // If we are on one of the main tabs (except home), go back to home first
      if (['/schedule', '/blocked-apps', '/settings'].includes(location.pathname)) {
        navigate('/home');
        return;
      }

      // If we are on Home, Login or Splash, show exit confirmation
      if (['/', '/home', '/login'].includes(location.pathname)) {
        setShowExitDialog(true);
      } else {
        // For sub-pages (like adding a schedule), just go back one step
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
