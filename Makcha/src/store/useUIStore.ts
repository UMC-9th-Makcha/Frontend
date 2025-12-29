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
        return { isDarkMode: nextMode };
      }),

      setDarkMode: (isDark) => set({ isDarkMode: isDark }),
    }),
    {
      name: 'ui-storage',
    }
  )
);