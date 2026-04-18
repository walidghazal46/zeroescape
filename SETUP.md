# ZeroEscape No.1 - التطبيق الكامل

تطبيق ويب لإدارة جلسات التركيز مع نظام الاشتراكات وحماية متقدمة.

## المتطلبات

### Firebase Setup
1. انتقل إلى [Firebase Console](https://console.firebase.google.com)
2. اختر مشروع `zeroescape-5b5a1`
3. في **Project Settings** > **Your apps**، انسخ إعدادات Web App

### Google OAuth Setup
1. انتقل إلى [Google Cloud Console](https://console.cloud.google.com)
2. اختر مشروع `zeroescape-5b5a1`
3. اذهب إلى **APIs & Services** > **Credentials**
4. إنشاء **OAuth 2.0 Client ID** (نوع: Web application)
5. أضف `http://localhost:5173` إلى Authorized JavaScript origins
6. أضف `http://localhost:5173/` إلى Authorized redirect URIs

### Stripe Setup
1. انتقل إلى [Stripe Dashboard](https://dashboard.stripe.com)
2. اذهب إلى **Developers** > **API keys**
3. انسخ **Publishable key**

## Installation

```bash
npm install
```

## Environment Setup

قم بإنشاء ملف `.env.local` في جذر المشروع بالقيم التالية:

```env
VITE_FIREBASE_API_KEY=YOUR_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN=YOUR_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID=YOUR_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET=YOUR_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID=YOUR_FIREBASE_APP_ID
VITE_GOOGLE_OAUTH_CLIENT_ID=YOUR_GOOGLE_OAUTH_CLIENT_ID
VITE_STRIPE_PUBLISHABLE_KEY=YOUR_STRIPE_PUBLISHABLE_KEY
```

## Development Server

```bash
npm run dev
```

التطبيق سيفتح على `http://localhost:5173`

## Features

✅ **Authentication**
- تسجيل دخول عبر Google
- إنشاء حساب جديد
- وضع الضيف (24 ساعة مجانية)

✅ **Guest Mode**
- 24 ساعة استخدام مجاني كامل
- تخزين Device ID
- تذكير قبل انتهاء الفترة

✅ **Subscriptions**
- خطة شهرية: $7/month
- خطة سنوية: $50/year (توفير 40%)
- دفع آمن عبر Stripe

✅ **Focus Sessions**
- جلسات تركيز مختلفة (دراسة، عمل، نوم)
- مؤقت دقيق
- حظر تطبيقات ذكي

✅ **Web Protection**
- فلترة مواقع ضارة
- حماية DNS ذكية
- إحصائيات مفصلة

## Project Structure

```
src/
├── app/
│   ├── components/         # جميع شاشات التطبيق
│   └── App.tsx            # Router الرئيسي
├── config/
│   └── firebase.ts        # Firebase configuration
├── services/
│   └── authService.ts     # خدمات المصادقة
├── store/
│   └── authStore.ts       # Zustand store للـ auth
└── styles/                # CSS والـ Tailwind
```

## Key Stores & Services

### authStore.ts
- إدارة حالة المستخدم
- Device ID tracking
- Guest expiration timer
- Subscription management

### authService.ts
- Google Sign-In
- Firebase Firestore integration
- Guest user management

## Firebase Firestore Structure

```
users/
├── {userId}
│   ├── email
│   ├── name
│   ├── type: "google" | "guest"
│   ├── subscriptionStatus
│   ├── subscriptionExpiresAt
│   ├── deviceId
│   └── createdAt

guests/
├── {guestId}
│   ├── email: null
│   ├── name: "ضيف"
│   ├── type: "guest"
│   ├── guestExpiresAt
│   ├── deviceId
│   └── createdAt
```

## Next Steps

1. [ ] إكمال Firebase configuration
2. [ ] إكمال Google OAuth setup
3. [ ] إكمال Stripe integration
4. [ ] تفعيل حظر التطبيقات
5. [ ] تفعيل حماية الويب
6. [ ] تفعيل الإحصائيات

## Support

البريد الإلكتروني: walidghazal46@gmail.com
