import { useAuthStore } from '../store/useAuthStore';

export const useAuth = () => {
  const auth = useAuthStore();
  
  // Zustand persist가 로컬 스토리지에서 데이터를 읽어왔는지 확인
  const hasHydrated = useAuthStore.persist.hasHydrated();
  if (!hasHydrated) {
    return { 
      ...auth,
      isLoggedIn: false, 
      user: null, 
      accessToken: null 
    };
  }

  return auth;
};