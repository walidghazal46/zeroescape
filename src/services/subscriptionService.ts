import { httpsCallable } from 'firebase/functions';
import { functions } from '../config/firebase';

type CheckoutPlan = 'monthly' | 'yearly';

interface CheckoutResponse {
  sessionId: string;
  url: string;
}

export const subscriptionService = {
  createCheckoutSession: async (plan: CheckoutPlan) => {
    const callable = httpsCallable<{ plan: CheckoutPlan }, CheckoutResponse>(functions, 'createCheckoutSession');
    const result = await callable({ plan });
    return result.data;
  },
};
