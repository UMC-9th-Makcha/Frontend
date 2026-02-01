import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: (isDark: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      isDarkMode: false, 

      toggleDarkMode: () => set((state) => {
        const nextMode = !state.isDarkMode;
        document.documentElement.classList.toggle('dark', nextMode);
        return { isDarkMode: nextMode };
      }),

      setDarkMode: (isDark) => set(() => {
        document.documentElement.classList.toggle('dark', isDark);
        return { isDarkMode: isDark };
      }),
    }),
    {
      name: 'ui-storage',
      onRehydrateStorage: () => (state) => {
        if (state) {
          document.documentElement.classList.toggle('dark', state.isDarkMode);
        }
      },
    }
  )
);