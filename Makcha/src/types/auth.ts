export interface User {
  id: string;
  name: string;
  profileImage?: string;
  email?: string;
  phone?: string;
}

export interface LoginResult {
  accessToken: string; 
}

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  isHydrated: boolean;
  setLogin: (token: string) => void;
  setLogout: () => void;
  setHydrated: (state: boolean) => void;
  updateUserPhone: (newPhone: string) => void;
}