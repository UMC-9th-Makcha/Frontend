import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      // 초기 상태
      isLoggedIn: false,
      accessToken: null,
      user: null,
      isHydrated: false,

      // 액션
      setLogin: (token, user) => 
        set({ 
          isLoggedIn: true, 
          accessToken: token, 
          user 
        }),

      setLogout: () => 
        set({ 
          isLoggedIn: false, 
          accessToken: null, 
          user: null 
        }),

      setHydrated: (state) => set({ isHydrated: state }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),

      // isHydrated는 새로고침할 때마다 false에서 시작하므로 저장 대상에서 제외
      partialize: (state) => ({
        isLoggedIn: state.isLoggedIn,
        accessToken: state.accessToken,
        user: state.user,
      }),

      // 하이드레이션 완료 시점 제어
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);