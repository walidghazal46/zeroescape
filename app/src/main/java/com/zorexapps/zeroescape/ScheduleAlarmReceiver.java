package com.zorexapps.zeroescape;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;

import androidx.core.app.NotificationCompat;

/**
 * Fires at the exact time a scheduled session should start.
 *
 * The native layer (MainActivity) sets AlarmManager alarms whose PendingIntent
 * targets this receiver.  When the alarm fires, the receiver:
 *  1. Writes the session params to SharedPreferences (so the WebView can read them).
 *  2. Shows a heads-up notification so the user knows a session is about to start.
 *  3. Launches MainActivity which reads the pending session and navigates to /active-session.
 */
public class ScheduleAlarmReceiver extends BroadcastReceiver {

    static final String ACTION_FIRE = "com.zorexapps.zeroescape.SCHEDULE_FIRE";

    static final String EXTRA_SCHEDULE_ID       = "schedule_id";
    static final String EXTRA_MODE              = "mode";
    static final String EXTRA_DURATION_MINUTES  = "duration_minutes";
    static final String EXTRA_LABEL             = "label";

    private static final String PREFS_NAME          = "zeroescape_runtime";
    private static final String KEY_PENDING_SESSION  = "pending_scheduled_session";
    private static final String CHANNEL_ID           = "zeroescape_schedule";
    private static final int    NOTIF_ID             = 2001;

    @Override
    public void onReceive(Context context, Intent intent) {
        if (!ACTION_FIRE.equals(intent.getAction())) return;

        String scheduleId      = intent.getStringExtra(EXTRA_SCHEDULE_ID);
        String mode            = intent.getStringExtra(EXTRA_MODE);
        int    durationMinutes = intent.getIntExtra(EXTRA_DURATION_MINUTES, 60);
        String label           = intent.getStringExtra(EXTRA_LABEL);

        if (scheduleId == null || mode == null) return;

        // ── 1. Persist pending session so MainActivity can read it on launch ──
        String json = "{\"scheduleId\":\"" + scheduleId + "\","
                    + "\"mode\":\"" + mode + "\","
                    + "\"durationMinutes\":" + durationMinutes + ","
                    + "\"label\":\"" + (label != null ? label : "") + "\"}";

        context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE)
               .edit()
               .putString(KEY_PENDING_SESSION, json)
               .apply();

        // ── 2. Show heads-up notification ────────────────────────────────────
        createNotificationChannel(context);

        Intent launchIntent = new Intent(context, MainActivity.class);
        launchIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_SINGLE_TOP);
        launchIntent.setAction(ACTION_FIRE);

        PendingIntent pi = PendingIntent.getActivity(
            context, 0, launchIntent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        String title = (label != null && !label.isEmpty()) ? label : "جلسة مجدولة";
        String body  = "ستبدأ جلسة " + modeAr(mode) + " لمدة " + durationMinutes + " دقيقة الآن";

        NotificationCompat.Builder builder = new NotificationCompat.Builder(context, CHANNEL_ID)
            .setSmallIcon(android.R.drawable.ic_lock_idle_alarm)
            .setContentTitle(title)
            .setContentText(body)
            .setPriority(NotificationCompat.PRIORITY_HIGH)
            .setCategory(NotificationCompat.CATEGORY_ALARM)
            .setAutoCancel(true)
            .setContentIntent(pi)
            .setFullScreenIntent(pi, true); // wake screen

        NotificationManager nm =
            (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
        if (nm != null) nm.notify(NOTIF_ID, builder.build());

        // ── 3. Launch app ─────────────────────────────────────────────────────
        context.startActivity(launchIntent);
    }

    // ── Helpers ──────────────────────────────────────────────────────────────

    private void createNotificationChannel(Context context) {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationChannel channel = new NotificationChannel(
                CHANNEL_ID,
                "الجدولة التلقائية",
                NotificationManager.IMPORTANCE_HIGH
            );
            channel.setDescription("تنبيهات بدء الجلسات المجدولة");
            channel.enableVibration(true);
            NotificationManager nm =
                (NotificationManager) context.getSystemService(Context.NOTIFICATION_SERVICE);
            if (nm != null) nm.createNotificationChannel(channel);
        }
    }

    private String modeAr(String mode) {
        switch (mode) {
            case "study":     return "دراسة";
            case "work":      return "عمل";
            case "sleep":     return "نوم";
            case "deep_detox": return "ديتوكس";
            default:          return "مخصصة";
        }
    }

    // ── Static helpers called from MainActivity ───────────────────────────────

    /**
     * Schedule (or re-schedule) a single alarm.
     * triggerAtMillis: absolute UTC epoch millis.
     */
    public static void schedule(
        Context context,
        String scheduleId,
        String mode,
        int durationMinutes,
        String label,
        long triggerAtMillis
    ) {
        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;

        Intent intent = new Intent(context, ScheduleAlarmReceiver.class);
        intent.setAction(ACTION_FIRE);
        intent.putExtra(EXTRA_SCHEDULE_ID, scheduleId);
        intent.putExtra(EXTRA_MODE, mode);
        intent.putExtra(EXTRA_DURATION_MINUTES, durationMinutes);
        intent.putExtra(EXTRA_LABEL, label);

        // Use scheduleId hashCode as unique request code so multiple alarms coexist
        int requestCode = scheduleId.hashCode();

        PendingIntent pi = PendingIntent.getBroadcast(
            context, requestCode, intent,
            PendingIntent.FLAG_UPDATE_CURRENT | PendingIntent.FLAG_IMMUTABLE
        );

        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.S) {
            if (am.canScheduleExactAlarms()) {
                am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAtMillis, pi);
            } else {
                am.set(AlarmManager.RTC_WAKEUP, triggerAtMillis, pi);
            }
        } else if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            am.setExactAndAllowWhileIdle(AlarmManager.RTC_WAKEUP, triggerAtMillis, pi);
        } else {
            am.setExact(AlarmManager.RTC_WAKEUP, triggerAtMillis, pi);
        }
    }

    /** Cancel all future alarms for a given schedule entry. */
    public static void cancel(Context context, String scheduleId) {
        AlarmManager am = (AlarmManager) context.getSystemService(Context.ALARM_SERVICE);
        if (am == null) return;

        Intent intent = new Intent(context, ScheduleAlarmReceiver.class);
        intent.setAction(ACTION_FIRE);

        int requestCode = scheduleId.hashCode();

        PendingIntent pi = PendingIntent.getBroadcast(
            context, requestCode, intent,
            PendingIntent.FLAG_NO_CREATE | PendingIntent.FLAG_IMMUTABLE
        );
        if (pi != null) am.cancel(pi);
    }

    /** Retrieve and clear the pending session JSON (called once by MainActivity on launch). */
    public static String consumePendingSession(Context context) {
        android.content.SharedPreferences prefs =
            context.getSharedPreferences(PREFS_NAME, Context.MODE_PRIVATE);
        String json = prefs.getString(KEY_PENDING_SESSION, null);
        if (json != null) {
            prefs.edit().remove(KEY_PENDING_SESSION).apply();
        }
        return json;
    }
}
