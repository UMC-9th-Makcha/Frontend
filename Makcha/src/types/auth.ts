export interface User {
  id: string;
  nickname: string;
  profileImage?: string;
  email?: string;
}

export interface LoginResult {
  accessToken: string; 
  expiresIn: number;
  user: User;
}

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  isHydrated: boolean;
  setLogin: (token: string, user: User) => void;
  setLogout: () => void;
  setHydrated: (state: boolean) => void;
}