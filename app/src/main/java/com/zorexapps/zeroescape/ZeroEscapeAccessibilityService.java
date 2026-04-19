package com.zorexapps.zeroescape;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
import android.content.Intent;
import android.os.SystemClock;
import android.view.accessibility.AccessibilityEvent;

/**
 * ZeroEscapeAccessibilityService
 *
 * This service must exist and be registered so that the app appears in the
 * Android Accessibility Settings → Installed Apps list.
 *
 * It also enables detecting foreground app changes so blocked apps can be
 * closed immediately during an active session.
 */
public class ZeroEscapeAccessibilityService extends AccessibilityService {
    /**
     * Minimum time between two successive relaunch attempts.
     * 3 s is long enough to prevent cascading events while still being fast.
     */
    private static final long RELAUNCH_THROTTLE_MS = 3000;

    /** Singleton reference so MainActivity can query it. */
    private static ZeroEscapeAccessibilityService instance;
    private long lastBringToFrontAt = 0L;

    public static ZeroEscapeAccessibilityService getInstance() {
        return instance;
    }

    public static boolean isRunning() {
        return instance != null;
    }

    @Override
    public void onServiceConnected() {
        instance = this;

        AccessibilityServiceInfo info = new AccessibilityServiceInfo();
        // TYPE_WINDOW_CONTENT_CHANGED fires too frequently (keyboard, WebView rendering,
        // etc.) and causes false positives.  Only react to actual window / activity changes.
        info.eventTypes = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED;
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;
        info.flags = AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS
                   | AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS;
        info.notificationTimeout = 300;
        setServiceInfo(info);
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        // Guard: only react to window-state changes
        if (event.getEventType() != AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED) return;

        CharSequence packageName = event.getPackageName();
        if (packageName == null || !MainActivity.isProtectedSessionActive(this)) {
            return;
        }

        String currentPackage = packageName.toString();
        String ownPackage = getPackageName();

        // Own app → nothing to do
        if (ownPackage.equals(currentPackage) || currentPackage.startsWith(ownPackage + ":")) {
            return;
        }

        // Pure framework events (package="android") carry no visible screen — skip them
        // to avoid re-entry loops during internal transitions.
        if ("android".equals(currentPackage)) {
            return;
        }

        long now = SystemClock.elapsedRealtime();
        if (now - lastBringToFrontAt < RELAUNCH_THROTTLE_MS) {
            return;
        }

        lastBringToFrontAt = now;

        // Bring our app back to the foreground.
        // NOTE: GLOBAL_ACTION_BACK was intentionally removed — firing it on an external
        // activity (launcher, system UI) triggered cascading accessibility events that
        // caused the app to loop between screens.  A direct relaunch is sufficient.
        Intent reopenIntent = getPackageManager().getLaunchIntentForPackage(ownPackage);
        if (reopenIntent == null) {
            return;
        }

        reopenIntent.addFlags(
            Intent.FLAG_ACTIVITY_NEW_TASK
                | Intent.FLAG_ACTIVITY_SINGLE_TOP
                | Intent.FLAG_ACTIVITY_CLEAR_TOP
        );
        startActivity(reopenIntent);
    }

    @Override
    public void onInterrupt() {
        // Required override — no action needed.
    }

    @Override
    public void onDestroy() {
        instance = null;
        super.onDestroy();
    }
}
