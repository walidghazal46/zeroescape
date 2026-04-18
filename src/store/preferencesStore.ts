import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type AppLanguage = 'ar' | 'en';

interface PreferencesStore {
  language: AppLanguage;
  setLanguage: (language: AppLanguage) => void;
}

export const usePreferencesStore = create<PreferencesStore>()(
  persist(
    (set) => ({
      language: 'ar',
      setLanguage: (language) => set({ language }),
    }),
    {
      name: 'zeroEscape_preferences',
    }
  )
);