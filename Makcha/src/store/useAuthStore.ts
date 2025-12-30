import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState, User } from '../types/auth';

const initialState = {
  isLoggedIn: false,
  accessToken: null,
  user: null,
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      ...initialState,

      setLogin: (token: string, user: User) =>
        set({
          isLoggedIn: true,
          accessToken: token,
          user,
        }),

      setLogout: () => set(initialState),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);