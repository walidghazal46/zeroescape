import { initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { HttpsError, onCall } from 'firebase-functions/v2/https';
import Stripe from 'stripe';

initializeApp();

const db = getFirestore();
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const appUrl = process.env.APP_URL || 'http://localhost:5173';

const planCatalog = {
  monthly: {
    amount: 700,
    interval: 'month',
    label: 'ZeroEscape Monthly',
  },
  yearly: {
    amount: 5000,
    interval: 'year',
    label: 'ZeroEscape Yearly',
  },
} as const;

export const createCheckoutSession = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'Authentication is required.');
  }

  if (!stripeSecretKey) {
    throw new HttpsError('failed-precondition', 'STRIPE_SECRET_KEY is not configured.');
  }

  const plan = request.data?.plan as keyof typeof planCatalog;

  if (!plan || !(plan in planCatalog)) {
    throw new HttpsError('invalid-argument', 'A valid subscription plan is required.');
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-03-31.basil',
  });

  const selectedPlan = planCatalog[plan];
  const userRef = db.collection('users').doc(request.auth.uid);
  const userSnapshot = await userRef.get();
  const userData = userSnapshot.data();

  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer_email: request.auth.token.email,
    success_url: `${appUrl}/subscription?status=success`,
    cancel_url: `${appUrl}/subscription?status=cancelled`,
    metadata: {
      plan,
      userId: request.auth.uid,
      deviceId: userData?.deviceId || '',
    },
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: 'usd',
          recurring: {
            interval: selectedPlan.interval,
          },
          product_data: {
            name: selectedPlan.label,
          },
          unit_amount: selectedPlan.amount,
        },
      },
    ],
  });

  await db.collection('subscriptions').doc(request.auth.uid).set({
    checkoutSessionId: session.id,
    plan,
    status: 'pending',
    updatedAt: new Date().toISOString(),
  }, { merge: true });

  return {
    sessionId: session.id,
    url: session.url,
  };
});