import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState, User } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: null,
      user: null,
      isHydrated: false,

      setLogin: (token) => set({ isLoggedIn: true, accessToken: token }),

      setUser: (user: User) => set({ user }), 
      
      setLogout: () => set({ isLoggedIn: false, accessToken: null, user: null }),
      
      setHydrated: (state) => set({ isHydrated: state }),

      updateUserPhone: (newPhone: string) => 
        set((state) => ({
          user: state.user ? { ...state.user, phone: newPhone } : null
        })),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => state?.setHydrated(true),
    }
  )
);