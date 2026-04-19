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
    private static final long RELAUNCH_THROTTLE_MS = 1200;

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
        info.eventTypes = AccessibilityEvent.TYPE_WINDOW_STATE_CHANGED
                        | AccessibilityEvent.TYPE_WINDOW_CONTENT_CHANGED;
        info.feedbackType = AccessibilityServiceInfo.FEEDBACK_GENERIC;
        info.flags = AccessibilityServiceInfo.FLAG_REPORT_VIEW_IDS
                   | AccessibilityServiceInfo.FLAG_RETRIEVE_INTERACTIVE_WINDOWS;
        info.notificationTimeout = 100;
        setServiceInfo(info);
    }

    @Override
    public void onAccessibilityEvent(AccessibilityEvent event) {
        CharSequence packageName = event.getPackageName();
        if (packageName == null || !MainActivity.isProtectedSessionActive(this)) {
            return;
        }

        String currentPackage = packageName.toString();
        String ownPackage = getPackageName();

        if (ownPackage.equals(currentPackage) || currentPackage.startsWith(ownPackage + ":")) {
            return;
        }

        long now = SystemClock.elapsedRealtime();
        if (now - lastBringToFrontAt < RELAUNCH_THROTTLE_MS) {
            return;
        }

        lastBringToFrontAt = now;

        // Collapse transient system surfaces when possible, then immediately relaunch app.
        performGlobalAction(GLOBAL_ACTION_BACK);

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
