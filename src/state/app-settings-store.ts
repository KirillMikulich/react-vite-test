import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import type { AppThemeMode } from '@/models/theme';

export type AppSettingsStoreState = {
  themeMode: AppThemeMode;
  toggleTheme: () => void;
  setThemeMode: (themeMode: AppThemeMode) => void;
};

export const useAppSettingsStore = create<AppSettingsStoreState>()(
  persist(
    set => ({
      themeMode: 'light',
      toggleTheme: () =>
        set(state => ({
          themeMode: state.themeMode === 'light' ? 'dark' : 'light',
        })),
      setThemeMode: themeMode => set({ themeMode }),
    }),
    {
      name: 'app-settings-store',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        themeMode: state.themeMode,
      }),
    }
  )
);
