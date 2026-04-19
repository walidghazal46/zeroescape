package com.zorexapps.zeroescape;

import android.app.admin.DeviceAdminReceiver;
import android.content.Context;
import android.content.Intent;
import android.widget.Toast;

public class ZeroEscapeDeviceAdmin extends DeviceAdminReceiver {

    @Override
    public void onEnabled(Context context, Intent intent) {
        Toast.makeText(context, "ZeroEscape: صلاحيات مدير الجهاز مُفعَّلة", Toast.LENGTH_SHORT).show();
    }

    @Override
    public void onDisabled(Context context, Intent intent) {
        Toast.makeText(context, "ZeroEscape: تم إلغاء صلاحيات مدير الجهاز", Toast.LENGTH_SHORT).show();
    }

    @Override
    public CharSequence onDisableRequested(Context context, Intent intent) {
        return "تحذير: إلغاء هذه الصلاحية يُضعف حماية التطبيق";
    }
}
