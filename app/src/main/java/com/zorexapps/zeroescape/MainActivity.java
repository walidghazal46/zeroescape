package com.zorexapps.zeroescape;

import android.app.AlertDialog;
import android.app.AppOpsManager;
import android.content.SharedPreferences;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Color;
import android.os.Build;
import android.os.Bundle;
import android.provider.Settings;
import android.view.View;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;
import android.view.accessibility.AccessibilityManager; // kept for potential future use
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;
import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.webkit.WebViewAssetLoader;
import org.json.JSONArray;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {
    private static final String PREFS_NAME = "zeroescape_runtime";
    private static final String KEY_PROTECTED_SESSION_ACTIVE = "protected_session_active";

    private WebView webView;
    private DevicePolicyManager devicePolicyManager;
    private ComponentName adminComponent;
    private ActivityResultLauncher<Intent> deviceAdminLauncher;
    private ActivityResultLauncher<Intent> contactPickerLauncher;

    private boolean sessionActive = false;

    public static boolean isProtectedSessionActive(Context context) {
        SharedPreferences prefs = context.getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        return prefs.getBoolean(KEY_PROTECTED_SESSION_ACTIVE, false);
    }

    private void persistProtectedSessionState(boolean active) {
        SharedPreferences prefs = getSharedPreferences(PREFS_NAME, MODE_PRIVATE);
        prefs.edit().putBoolean(KEY_PROTECTED_SESSION_ACTIVE, active).apply();
    }

    private void startProtectedLockTask() {
        runOnUiThread(() -> {
            try {
                startLockTask();
            } catch (IllegalArgumentException | IllegalStateException ignored) {
                // Lock task is best-effort unless the app is pinned or whitelisted.
            }
        });
    }

    private void stopProtectedLockTask() {
        runOnUiThread(() -> {
            try {
                stopLockTask();
            } catch (IllegalArgumentException | IllegalStateException ignored) {
                // Ignore when lock task was never entered.
            }
        });
    }

    /** Re-applies immersive sticky mode on the UI thread. */
    private void applyImmersiveMode() {
        runOnUiThread(() -> {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                WindowInsetsController ctrl = getWindow().getInsetsController();
                if (ctrl != null) {
                    ctrl.hide(WindowInsets.Type.systemBars());
                    ctrl.setSystemBarsBehavior(
                        WindowInsetsController.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
                    );
                }
            } else {
                View decor = getWindow().getDecorView();
                //noinspection deprecation
                int flags = View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY
                    | View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
                    | View.SYSTEM_UI_FLAG_HIDE_NAVIGATION
                    | View.SYSTEM_UI_FLAG_FULLSCREEN;
                //noinspection deprecation
                decor.setSystemUiVisibility(flags);
                // Re-apply whenever bars become visible (e.g. swipe-down)
                //noinspection deprecation
                decor.setOnSystemUiVisibilityChangeListener(visibility -> {
                    if (sessionActive && (visibility & View.SYSTEM_UI_FLAG_FULLSCREEN) == 0) {
                        //noinspection deprecation
                        decor.setSystemUiVisibility(flags);
                    }
                });
            }
        });
    }

    /** Bridge exposed to JavaScript as window.Android */
    private class AndroidBridge {

        // ── Exit dialog ──────────────────────────────────────────────────────────

        @JavascriptInterface
        public void showExitDialog() {
            runOnUiThread(() ->
                new AlertDialog.Builder(MainActivity.this)
                    .setTitle("الخروج من التطبيق")
                    .setMessage("هل تريد الخروج من التطبيق؟")
                    .setPositiveButton("نعم", (dialog, which) -> finishAffinity())
                    .setNegativeButton("لا", null)
                    .show()
            );
        }

        // ── Schedule bridge ──────────────────────────────────────────────────────

        /**
         * Called from JS to register / update a single schedule alarm.
         * payload: JSON string matching ScheduleEntry shape from scheduleStore.ts
         */
        @JavascriptInterface
        public void scheduleSession(String entryJson) {
            try {
                JSONObject obj = new JSONObject(entryJson);
                String id    = obj.getString("id");
                String mode  = obj.getString("mode");
                int    dur   = obj.getInt("durationMinutes");
                String label = obj.optString("label", "");
                int    hour  = obj.getInt("startHour");
                int    min   = obj.getInt("startMinute");

                // Find the next occurrence (within 7 days) that matches the days array
                JSONArray days = obj.getJSONArray("days");
                long triggerAt = nextOccurrenceMillis(hour, min, days);
                if (triggerAt < 0) return; // no matching day

                ScheduleAlarmReceiver.schedule(MainActivity.this, id, mode, dur, label, triggerAt);
            } catch (Exception e) {
                // Silently ignore malformed JSON
            }
        }

        /** Cancel alarm for a single schedule entry by id. */
        @JavascriptInterface
        public void cancelSchedule(String scheduleId) {
            ScheduleAlarmReceiver.cancel(MainActivity.this, scheduleId);
        }

        /**
         * Re-synchronise ALL alarms from the full schedule list.
         * Called after any change (add / edit / toggle / delete).
         */
        @JavascriptInterface
        public void syncSchedules(String allEntriesJson) {
            try {
                // Cancel all existing alarms first (brute-force by iterating the new list)
                JSONArray arr = new JSONArray(allEntriesJson);
                for (int i = 0; i < arr.length(); i++) {
                    JSONObject obj = arr.getJSONObject(i);
                    ScheduleAlarmReceiver.cancel(MainActivity.this, obj.getString("id"));
                }
                // Now re-register enabled ones
                for (int i = 0; i < arr.length(); i++) {
                    JSONObject obj = arr.getJSONObject(i);
                    if (!obj.optBoolean("enabled", true)) continue;

                    String id    = obj.getString("id");
                    String mode  = obj.getString("mode");
                    int    dur   = obj.getInt("durationMinutes");
                    String label = obj.optString("label", "");
                    int    hour  = obj.getInt("startHour");
                    int    minv  = obj.getInt("startMinute");
                    JSONArray days = obj.getJSONArray("days");

                    long triggerAt = nextOccurrenceMillis(hour, minv, days);
                    if (triggerAt < 0) continue;

                    ScheduleAlarmReceiver.schedule(MainActivity.this, id, mode, dur, label, triggerAt);
                }
            } catch (Exception e) {
                // Silently ignore
            }
        }

        /** Returns true if the app can schedule exact alarms (Android 12+). */
        @JavascriptInterface
        public boolean canScheduleExactAlarms() {
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                android.app.AlarmManager am =
                    (android.app.AlarmManager) getSystemService(ALARM_SERVICE);
                return am != null && am.canScheduleExactAlarms();
            }
            return true;
        }

        /** Open the exact-alarm permission settings screen (Android 12+). */
        @JavascriptInterface
        public void openExactAlarmSettings() {
            if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.S) {
                runOnUiThread(() -> {
                    Intent intent = new Intent(
                        android.provider.Settings.ACTION_REQUEST_SCHEDULE_EXACT_ALARM,
                        android.net.Uri.parse("package:" + getPackageName())
                    );
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(intent);
                });
            }
        }

        // ── Permission launchers ─────────────────────────────────────────────────

        @JavascriptInterface
        public void openUsageSettings() {
            runOnUiThread(() -> startActivity(
                new Intent(Settings.ACTION_USAGE_ACCESS_SETTINGS)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            ));
        }

        @JavascriptInterface
        public void openAccessibilitySettings() {
            runOnUiThread(() -> startActivity(
                new Intent(Settings.ACTION_ACCESSIBILITY_SETTINGS)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK)
            ));
        }

        @JavascriptInterface
        public void openDeviceAdminSettings() {
            runOnUiThread(() -> {
                try {
                    Intent intent = new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);
                    intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, adminComponent);
                    intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION,
                        "ZeroEscape يحتاج صلاحيات مدير الجهاز للحماية من الحذف غير المصرح به");
                    deviceAdminLauncher.launch(intent);
                } catch (Exception e) {
                    Toast.makeText(MainActivity.this,
                        "تعذّر فتح إعدادات مدير الجهاز", Toast.LENGTH_SHORT).show();
                }
            });
        }

        @JavascriptInterface
        public void openBootSettings() {
            runOnUiThread(() -> {
                String pkg = getPackageName();
                android.net.Uri pkgUri = android.net.Uri.parse("package:" + pkg);

                // ── Step 1: Try direct battery optimisation exemption dialog ──────────
                try {
                    android.os.PowerManager pm =
                        (android.os.PowerManager) getSystemService(POWER_SERVICE);
                    if (pm != null && !pm.isIgnoringBatteryOptimizations(pkg)) {
                        Intent batteryIntent = new Intent(
                            Settings.ACTION_REQUEST_IGNORE_BATTERY_OPTIMIZATIONS);
                        batteryIntent.setData(pkgUri);
                        startActivity(batteryIntent);
                        return;
                    }
                    startActivity(new Intent(Settings.ACTION_IGNORE_BATTERY_OPTIMIZATION_SETTINGS)
                        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
                    return;
                } catch (Exception ignored) {}

                // ── Step 2: Manufacturer-specific Autostart pages ─────────────────────
                Intent[] candidates = {
                    makeIntent("com.miui.securitycenter", "com.miui.permcenter.autostart.AutoStartManagementActivity"),
                    makeIntent("com.huawei.systemmanager", "com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity"),
                    makeIntent("com.huawei.systemmanager", "com.huawei.systemmanager.optimize.process.ProtectActivity"),
                    makeIntent("com.coloros.safecenter", "com.coloros.privacypermissionsentry.PermissionTopActivity"),
                    makeIntent("com.oppo.safe", "com.oppo.safe.permission.startup.StartupAppListActivity"),
                    makeIntent("com.vivo.permissionmanager", "com.vivo.permissionmanager.activity.BgStartUpManagerActivity"),
                    makeIntent("com.samsung.android.lool", "com.samsung.android.sm.battery.ui.BatteryActivity"),
                    makeIntent("com.realme.permissionmanager", "com.realme.permissionmanager.ui.AutostartAppListActivity"),
                };

                for (Intent intent : candidates) {
                    if (intent == null) continue;
                    try {
                        startActivity(intent);
                        return;
                    } catch (Exception ignored) {}
                }

                startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                    .setData(pkgUri)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
            });
        }

        /** Returns true if this app is excluded from battery optimisation (=can run in background). */
        @JavascriptInterface
        public boolean isBatteryOptimizationIgnored() {
            try {
                android.os.PowerManager pm =
                    (android.os.PowerManager) getSystemService(POWER_SERVICE);
                return pm != null && pm.isIgnoringBatteryOptimizations(getPackageName());
            } catch (Exception e) {
                return false;
            }
        }

        private Intent makeIntent(String packageName, String className) {
            try {
                getPackageManager().getPackageInfo(packageName, 0);
                return new Intent()
                    .setComponent(new ComponentName(packageName, className))
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
            } catch (PackageManager.NameNotFoundException e) {
                return null;
            }
        }

        // ── Permission status checks ─────────────────────────────────────────────

        @JavascriptInterface
        public boolean isUsageAccessGranted() {
            try {
                AppOpsManager appOps = (AppOpsManager) getSystemService(Context.APP_OPS_SERVICE);
                int mode = appOps.checkOpNoThrow(
                    AppOpsManager.OPSTR_GET_USAGE_STATS,
                    android.os.Process.myUid(),
                    getPackageName()
                );
                return mode == AppOpsManager.MODE_ALLOWED;
            } catch (Exception e) {
                return false;
            }
        }

        @JavascriptInterface
        public boolean isAccessibilityGranted() {
            // Check if OUR specific service is enabled (not just any accessibility service)
            return ZeroEscapeAccessibilityService.isRunning();
        }

        @JavascriptInterface
        public boolean isDeviceAdminGranted() {
            return devicePolicyManager.isAdminActive(adminComponent);
        }

        /**
         * Enters true immersive sticky mode and marks session as active.
         * Hides status bar + nav bar; prevents notification shade pull-down.
         */
        @JavascriptInterface
        public void startImmersiveMode() {
            sessionActive = true;
            persistProtectedSessionState(true);
            runOnUiThread(() -> getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON));
            startProtectedLockTask();
            applyImmersiveMode();
        }

        /** Marks session as inactive and restores normal system UI. */
        @JavascriptInterface
        public void stopImmersiveMode() {
            sessionActive = false;
            persistProtectedSessionState(false);
            stopProtectedLockTask();
            runOnUiThread(() -> {
                getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                    WindowInsetsController ctrl = getWindow().getInsetsController();
                    if (ctrl != null) {
                        ctrl.show(WindowInsets.Type.systemBars());
                    }
                } else {
                    //noinspection deprecation
                    getWindow().getDecorView().setOnSystemUiVisibilityChangeListener(null);
                    //noinspection deprecation
                    getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_VISIBLE);
                }
            });
        }

        /**
         * Called by JS to sync session state with native layer.
         * When active=true, re-applies immersive mode immediately.
         */
        @JavascriptInterface
        public void setSessionActive(boolean active) {
            sessionActive = active;
            persistProtectedSessionState(active);
            if (active) {
                runOnUiThread(() -> getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON));
                startProtectedLockTask();
                applyImmersiveMode();
            } else {
                runOnUiThread(() -> getWindow().clearFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON));
                stopProtectedLockTask();
            }
        }

        @JavascriptInterface
        public void makeEmergencyCall(String phoneNumber) {
            runOnUiThread(() -> {
                try {
                    // Flag the accessibility service to allow the dialer UI
                    ZeroEscapeAccessibilityService.setPermittedCallActive(true);
                    
                    // Use ACTION_DIAL so we don't need the sensitive CALL_PHONE permission
                    // and the user still has to press "call" (safer for play store)
                    Intent intent = new Intent(Intent.ACTION_DIAL);
                    intent.setData(android.net.Uri.parse("tel:" + phoneNumber));
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(intent);
                } catch (Exception e) {
                    Toast.makeText(MainActivity.this, "تعذر بدء الاتصال", Toast.LENGTH_SHORT).show();
                    ZeroEscapeAccessibilityService.setPermittedCallActive(false);
                }
            });
        }

        @JavascriptInterface
        public void pickContact() {
            runOnUiThread(() -> {
                if (checkSelfPermission(android.Manifest.permission.READ_CONTACTS) != PackageManager.PERMISSION_GRANTED) {
                    requestPermissions(new String[]{android.Manifest.permission.READ_CONTACTS}, 1002);
                    return;
                }
                Intent intent = new Intent(Intent.ACTION_PICK, android.provider.ContactsContract.CommonDataKinds.Phone.CONTENT_URI);
                contactPickerLauncher.launch(intent);
            });
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        initActivityLaunchers();

        devicePolicyManager = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
        adminComponent = new ComponentName(this, ZeroEscapeDeviceAdmin.class);

        webView = new WebView(this);
        webView.setBackgroundColor(Color.parseColor("#020617"));
        WebSettings webSettings = webView.getSettings();
        webSettings.setJavaScriptEnabled(true);
        webSettings.setDomStorageEnabled(true);
        webSettings.setAllowFileAccess(true);
        webSettings.setAllowContentAccess(true);

        // Register native bridge accessible from JS as window.Android
        webView.addJavascriptInterface(new AndroidBridge(), "Android");

        final WebViewAssetLoader assetLoader = new WebViewAssetLoader.Builder()
                .addPathHandler("/", new WebViewAssetLoader.AssetsPathHandler(this))
                .build();

        // Capture pending session before WebView loads (consumed once on launch)
        final String pendingSessionJson = ScheduleAlarmReceiver.consumePendingSession(this);

        webView.setWebViewClient(new WebViewClient() {
            @Override
            @Nullable
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }

            @Override
            public void onPageFinished(WebView view, String url) {
                super.onPageFinished(view, url);
                // Fire pending scheduled session once the page is fully loaded
                if (pendingSessionJson != null) {
                    String script = "(function(){" +
                        "if(typeof window.onScheduledSessionFire==='function'){" +
                        "window.onScheduledSessionFire(" + pendingSessionJson + ");" +
                        "}" +
                        "})();";
                    view.evaluateJavascript(script, null);
                }
            }
        });

        // Use the virtual domain to load assets and bypass CORS
        webView.loadUrl("https://appassets.androidplatform.net/index.html");

        setContentView(webView);
    }

    /**
     * Compute the next epoch-millis occurrence of a specific (hour, minute) on
     * one of the allowed days-of-week (0=Sun … 6=Sat).
     * Returns -1 if the days array is empty or an error occurred.
     */
    static long nextOccurrenceMillis(int hour, int minute, org.json.JSONArray days) {
        try {
            java.util.Calendar now = java.util.Calendar.getInstance();
            for (int offset = 0; offset < 7; offset++) {
                java.util.Calendar candidate = (java.util.Calendar) now.clone();
                candidate.add(java.util.Calendar.DAY_OF_YEAR, offset);
                candidate.set(java.util.Calendar.HOUR_OF_DAY, hour);
                candidate.set(java.util.Calendar.MINUTE, minute);
                candidate.set(java.util.Calendar.SECOND, 0);
                candidate.set(java.util.Calendar.MILLISECOND, 0);

                if (candidate.getTimeInMillis() <= now.getTimeInMillis()) continue;

                // getDayOfWeek returns 1=Sun…7=Sat; convert to 0-based
                int dow = candidate.get(java.util.Calendar.DAY_OF_WEEK) - 1;

                for (int i = 0; i < days.length(); i++) {
                    if (days.getInt(i) == dow) {
                        return candidate.getTimeInMillis();
                    }
                }
            }
        } catch (Exception ignored) {}
        return -1L;
    }

    private void initActivityLaunchers() {
        // Launcher for Device Admin activation dialog
        deviceAdminLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                // Device admin enabled or declined — result handled by JS re-check
            }
        );

        contactPickerLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getResultCode() == android.app.Activity.RESULT_OK && result.getData() != null) {
                    android.net.Uri contactUri = result.getData().getData();
                    String[] projection = {
                        android.provider.ContactsContract.CommonDataKinds.Phone.NUMBER,
                        android.provider.ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME
                    };
                    try (android.database.Cursor cursor = getContentResolver().query(contactUri, projection, null, null, null)) {
                        if (cursor != null && cursor.moveToFirst()) {
                            int numberIndex = cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.NUMBER);
                            int nameIndex = cursor.getColumnIndex(android.provider.ContactsContract.CommonDataKinds.Phone.DISPLAY_NAME);
                            String number = cursor.getString(numberIndex);
                            String name = cursor.getString(nameIndex);
                            emitContactPicked(name, number);
                        }
                    } catch (Exception e) {
                        Toast.makeText(this, "تعذر استرجاع بيانات جهة الاتصال", Toast.LENGTH_SHORT).show();
                    }
                }
            }
        );
    }

    private void emitContactPicked(String name, String number) {
        if (webView == null) return;
        String safeName = JSONObject.quote(name != null ? name : "");
        String safeNumber = JSONObject.quote(number != null ? number : "");
        String script = "(function(){" +
                "if(typeof window.onAndroidContactPicked==='function'){" +
                "window.onAndroidContactPicked(" + safeName + "," + safeNumber + ");" +
                "}" +
                "})();";
        webView.post(() -> webView.evaluateJavascript(script, null));
    }

    /**
     * Re-enters immersive mode whenever the window regains focus during an active session.
     * This fires after: status-bar swipe, recent-apps return, notification panel collapse.
     */
    @Override
    public void onWindowFocusChanged(boolean hasFocus) {
        super.onWindowFocusChanged(hasFocus);
        if (hasFocus && sessionActive) {
            applyImmersiveMode();
        }
    }

    /** Delegate the back press to the React app via window.onAndroidBack() */
    @Override
    public void onBackPressed() {
        webView.evaluateJavascript(
            "(function(){ if(typeof window.onAndroidBack==='function') window.onAndroidBack(); })();",
            null
        );
    }

    /**
     * When the app returns from background (user pressed Home then came back),
     * ask the JS layer whether a session is active, and if so re-enter immersive mode.
     */
    @Override
    protected void onResume() {
        super.onResume();
        // Reset emergency call flag when user returns to ZeroEscape
        ZeroEscapeAccessibilityService.setPermittedCallActive(false);

        if (sessionActive) applyImmersiveMode();
        if (webView != null) {
            webView.post(() -> webView.evaluateJavascript(
                "(function(){" +
                    "if(typeof window.onAndroidResume==='function') window.onAndroidResume();" +
                "})();",
                null
            ));
        }
    }
}
