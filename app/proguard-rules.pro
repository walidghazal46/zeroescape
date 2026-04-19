# Add project specific ProGuard rules here.
# You can control the set of applied configuration files using the
# proguardFiles setting in build.gradle.

# ── Stack traces ─────────────────────────────────────────────────────────────
-keepattributes SourceFile,LineNumberTable
-renamesourcefileattribute SourceFile

# ── WebView JavaScript Bridge ────────────────────────────────────────────────
# Keep all @JavascriptInterface methods in our bridge so WebView JS calls work.
-keepclassmembers class com.zorexapps.zeroescape.MainActivity$AndroidBridge {
    @android.webkit.JavascriptInterface <methods>;
}
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# ── Our app classes ───────────────────────────────────────────────────────────
-keep class com.zorexapps.zeroescape.** { *; }

# ── Firebase ─────────────────────────────────────────────────────────────────
-keep class com.google.firebase.** { *; }
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.firebase.**
-dontwarn com.google.android.gms.**

# ── WebView / WebKit ─────────────────────────────────────────────────────────
-keep class androidx.webkit.** { *; }
-dontwarn androidx.webkit.**

# ── Serialization (JSON / Parcelable) ────────────────────────────────────────
-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}
-keepclassmembers class * {
    public <init>(org.json.JSONObject);
}

# ── Accessibility service ─────────────────────────────────────────────────────
-keep class * extends android.accessibilityservice.AccessibilityService { *; }

# ── VPN service ───────────────────────────────────────────────────────────────
-keep class * extends android.net.VpnService { *; }

# ── Device admin ─────────────────────────────────────────────────────────────
-keep class * extends android.app.admin.DeviceAdminReceiver { *; }

# ── Broadcast receivers ───────────────────────────────────────────────────────
-keep class * extends android.content.BroadcastReceiver { *; }
