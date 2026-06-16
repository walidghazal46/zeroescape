import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { UserGoalType } from '../core/types';

export type AppLanguage = 'ar' | 'en';

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
}

interface PreferencesStore {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
  userGoal: UserGoalType | null;
  setUserGoal: (goal: UserGoalType) => void;
  onboardingCompleted: boolean;
  setOnboardingCompleted: (v: boolean) => void;
  emergencyContacts: EmergencyContact[];
  setEmergencyContacts: (contacts: EmergencyContact[]) => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      language: 'ar',
      setLanguage: (language) => set({ language }),
      userGoal: null,
      setUserGoal: (userGoal) => set({ userGoal }),
      onboardingCompleted: false,
      setOnboardingCompleted: (v) => set({ onboardingCompleted: v }),
      emergencyContacts: [],
      setEmergencyContacts: (emergencyContacts) => set({ emergencyContacts }),
    }),
    {
      name: 'zeroEscape_preferences',
    }
  )
);