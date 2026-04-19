package com.zorexapps.zeroescape;

import android.app.AlertDialog;
import android.app.AppOpsManager;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.net.VpnService;
import android.os.Bundle;
import android.provider.Settings;
import android.view.accessibility.AccessibilityManager;
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
import com.google.android.gms.auth.api.signin.GoogleSignIn;
import com.google.android.gms.auth.api.signin.GoogleSignInAccount;
import com.google.android.gms.auth.api.signin.GoogleSignInClient;
import com.google.android.gms.auth.api.signin.GoogleSignInOptions;
import com.google.android.gms.common.api.ApiException;
import org.json.JSONObject;

public class MainActivity extends AppCompatActivity {
    // Firebase Web Client ID used to request ID token from Google Sign-In SDK.
    private static final String WEB_CLIENT_ID = "369702806773-ecc5j2fs14ha5pl3rctiv67li7a02e1v.apps.googleusercontent.com";

    private WebView webView;
    private DevicePolicyManager devicePolicyManager;
    private ComponentName adminComponent;
    private GoogleSignInClient googleSignInClient;
    private ActivityResultLauncher<Intent> googleSignInLauncher;
    private ActivityResultLauncher<Intent> vpnPermissionLauncher;
    private ActivityResultLauncher<Intent> deviceAdminLauncher;
    private boolean vpnServiceRunning = false;

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
        public void openVpnSettings() {
            runOnUiThread(() -> {
                try {
                    // Request VPN permission for this app via proper ActivityResult
                    Intent vpnIntent = VpnService.prepare(MainActivity.this);
                    if (vpnIntent != null) {
                        vpnPermissionLauncher.launch(vpnIntent);
                    } else {
                        // Already granted — open system VPN settings page
                        startActivity(new Intent(Settings.ACTION_VPN_SETTINGS)
                            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
                    }
                } catch (Exception e) {
                    // Fallback: open VPN settings directly
                    try {
                        startActivity(new Intent(Settings.ACTION_VPN_SETTINGS)
                            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
                    } catch (Exception e2) {
                        startActivity(new Intent(Settings.ACTION_WIRELESS_SETTINGS)
                            .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
                    }
                }
            });
        }

        @JavascriptInterface
        public void openBootSettings() {
            runOnUiThread(() -> {
                // Try device-specific autostart settings in order
                String pkg = getPackageName();
                android.net.Uri pkgUri = android.net.Uri.parse("package:" + pkg);

                Intent[] candidates = {
                    // Xiaomi / MIUI
                    makeIntent("com.miui.securitycenter",
                        "com.miui.permcenter.autostart.AutoStartManagementActivity"),
                    // Huawei / EMUI
                    makeIntent("com.huawei.systemmanager",
                        "com.huawei.systemmanager.startupmgr.ui.StartupNormalAppListActivity"),
                    makeIntent("com.huawei.systemmanager",
                        "com.huawei.systemmanager.optimize.process.ProtectActivity"),
                    // OPPO / ColorOS
                    makeIntent("com.coloros.safecenter",
                        "com.coloros.privacypermissionsentry.PermissionTopActivity"),
                    makeIntent("com.oppo.safe",
                        "com.oppo.safe.permission.startup.StartupAppListActivity"),
                    // Vivo / FuntouchOS
                    makeIntent("com.vivo.permissionmanager",
                        "com.vivo.permissionmanager.activity.BgStartUpManagerActivity"),
                    // Samsung / OneUI
                    makeIntent("com.samsung.android.lool",
                        "com.samsung.android.sm.battery.ui.BatteryActivity"),
                    // Realme
                    makeIntent("com.realme.permissionmanager",
                        "com.realme.permissionmanager.ui.AutostartAppListActivity"),
                };

                for (Intent intent : candidates) {
                    if (intent == null) continue;
                    try {
                        startActivity(intent);
                        return;
                    } catch (Exception ignored) {}
                }

                // Universal fallback: App Details (user can find Battery/Autostart there)
                startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                    .setData(pkgUri)
                    .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
            });
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
            AccessibilityManager am = (AccessibilityManager) getSystemService(Context.ACCESSIBILITY_SERVICE);
            return am != null && am.isEnabled();
        }

        @JavascriptInterface
        public boolean isDeviceAdminGranted() {
            return devicePolicyManager.isAdminActive(adminComponent);
        }

        /** Returns true if the user has already granted VPN permission to this app. */
        @JavascriptInterface
        public boolean isVpnPermissionGranted() {
            return VpnService.prepare(MainActivity.this) == null;
        }

        /** Returns true if ZeroEscapeVpnService is currently running. */
        @JavascriptInterface
        public boolean isVpnActive() {
            return vpnServiceRunning;
        }

        /** Starts the DNS-blocking VPN (call at session start). */
        @JavascriptInterface
        public void startVpnBlocking() {
            runOnUiThread(() -> {
                Intent vpnPermIntent = VpnService.prepare(MainActivity.this);
                if (vpnPermIntent != null) {
                    // Permission not yet granted — request it first
                    vpnPermissionLauncher.launch(vpnPermIntent);
                    return;
                }
                Intent service = new Intent(MainActivity.this, ZeroEscapeVpnService.class);
                service.setAction(ZeroEscapeVpnService.ACTION_START);
                if (android.os.Build.VERSION.SDK_INT >= android.os.Build.VERSION_CODES.O) {
                    startForegroundService(service);
                } else {
                    startService(service);
                }
                vpnServiceRunning = true;
            });
        }

        /** Stops the DNS-blocking VPN (call at session end). */
        @JavascriptInterface
        public void stopVpnBlocking() {
            runOnUiThread(() -> {
                Intent service = new Intent(MainActivity.this, ZeroEscapeVpnService.class);
                service.setAction(ZeroEscapeVpnService.ACTION_STOP);
                startService(service);
                vpnServiceRunning = false;
            });
        }

        @JavascriptInterface
        public void startGoogleSignIn() {
            runOnUiThread(() -> {
                if (googleSignInClient == null) {
                    emitGoogleSignInResult("error", "native_not_initialized");
                    return;
                }

                try {
                    // Sign out first so the account picker always shows, then launch on complete
                    googleSignInClient.signOut().addOnCompleteListener(MainActivity.this, task -> {
                        try {
                            Intent signInIntent = googleSignInClient.getSignInIntent();
                            googleSignInLauncher.launch(signInIntent);
                        } catch (Exception e) {
                            emitGoogleSignInResult("error", "native_launch_failed");
                        }
                    });
                } catch (Exception e) {
                    emitGoogleSignInResult("error", "native_launch_failed");
                }
            });
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        initGoogleSignIn();

        devicePolicyManager = (DevicePolicyManager) getSystemService(Context.DEVICE_POLICY_SERVICE);
        adminComponent = new ComponentName(this, ZeroEscapeDeviceAdmin.class);

        checkGooglePlayServices();

        webView = new WebView(this);
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

        webView.setWebViewClient(new WebViewClient() {
            @Override
            @Nullable
            public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
                return assetLoader.shouldInterceptRequest(request.getUrl());
            }
        });

        // Use the virtual domain to load assets and bypass CORS
        webView.loadUrl("https://appassets.androidplatform.net/index.html");

        setContentView(webView);
    }

    private void initGoogleSignIn() {
        GoogleSignInOptions gso = new GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
            .requestIdToken(WEB_CLIENT_ID)
            .requestEmail()
            .build();

        googleSignInClient = GoogleSignIn.getClient(this, gso);

        googleSignInLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                if (result.getData() == null) {
                    emitGoogleSignInResult("error", "native_cancelled");
                    return;
                }

                try {
                    GoogleSignInAccount account = GoogleSignIn
                        .getSignedInAccountFromIntent(result.getData())
                        .getResult(ApiException.class);

                    String idToken = account != null ? account.getIdToken() : null;
                    if (idToken == null || idToken.isEmpty()) {
                        emitGoogleSignInResult("error", "native_missing_id_token");
                        return;
                    }

                    emitGoogleSignInResult("success", idToken);
                } catch (ApiException e) {
                    emitGoogleSignInResult("error", "native_api_error_" + e.getStatusCode());
                } catch (Exception e) {
                    emitGoogleSignInResult("error", "native_unknown_error");
                }
            }
        );

        // Launcher for VPN permission dialog
        vpnPermissionLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                // VPN permission granted or denied — result handled by JS re-check
            }
        );

        // Launcher for Device Admin activation dialog
        deviceAdminLauncher = registerForActivityResult(
            new ActivityResultContracts.StartActivityForResult(),
            result -> {
                // Device admin enabled or declined — result handled by JS re-check
            }
        );
    }

    private void emitGoogleSignInResult(String status, String payload) {
        if (webView == null) return;

        String safeStatus = JSONObject.quote(status == null ? "error" : status);
        String safePayload = JSONObject.quote(payload == null ? "" : payload);

        String script = "(function(){" +
            "if(typeof window.onAndroidGoogleSignIn==='function'){" +
            "window.onAndroidGoogleSignIn(" + safeStatus + "," + safePayload + ");" +
            "}" +
            "})();";

        webView.post(() -> webView.evaluateJavascript(script, null));
    }

    /** Delegate the back press to the React app via window.onAndroidBack() */
    @Override
    public void onBackPressed() {
        webView.evaluateJavascript(
            "(function(){ if(typeof window.onAndroidBack==='function') window.onAndroidBack(); })();",
            null
        );
    }

    /** Warn the user if Google Play Services is missing */
    private void checkGooglePlayServices() {
        try {
            getPackageManager().getPackageInfo("com.google.android.gms", 0);
        } catch (PackageManager.NameNotFoundException e) {
            Toast.makeText(
                this,
                "تحذير: خدمات Google Play غير متوفرة. بعض الميزات قد لا تعمل.",
                Toast.LENGTH_LONG
            ).show();
        }
    }
}

