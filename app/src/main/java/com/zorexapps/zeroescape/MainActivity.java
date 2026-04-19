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
                Intent intent = new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);
                intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, adminComponent);
                intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION,
                    "ZeroEscape يحتاج صلاحيات مدير الجهاز للحماية من الحذف غير المصرح به");
                intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                startActivity(intent);
            });
        }

        @JavascriptInterface
        public void openVpnSettings() {
            runOnUiThread(() -> {
                Intent vpnIntent = VpnService.prepare(MainActivity.this);
                if (vpnIntent != null) {
                    vpnIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(vpnIntent);
                } else {
                    Toast.makeText(MainActivity.this, "VPN مفعّل بالفعل", Toast.LENGTH_SHORT).show();
                }
            });
        }

        @JavascriptInterface
        public void openBootSettings() {
            runOnUiThread(() -> {
                try {
                    Intent intent = new Intent();
                    intent.setComponent(new ComponentName(
                        "com.miui.securitycenter",
                        "com.miui.permcenter.autostart.AutoStartManagementActivity"
                    ));
                    intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
                    startActivity(intent);
                } catch (Exception e) {
                    // Fallback for non-MIUI devices
                    startActivity(new Intent(Settings.ACTION_APPLICATION_DETAILS_SETTINGS)
                        .setData(android.net.Uri.parse("package:" + getPackageName()))
                        .addFlags(Intent.FLAG_ACTIVITY_NEW_TASK));
                }
            });
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

