package com.zorexapps.zeroescape;

import android.accessibilityservice.AccessibilityService;
import android.accessibilityservice.AccessibilityServiceInfo;
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

    /** Singleton reference so MainActivity can query it. */
    private static ZeroEscapeAccessibilityService instance;

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
        // Reserved for future: detect and close blocked apps during active session.
        // The service itself being enabled is sufficient for the permission check.
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
