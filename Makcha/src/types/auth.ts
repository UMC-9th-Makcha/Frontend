export interface User {
  id: number;          // 사용자 고유 ID
  nickname: string;    // 카카오 닉네임
  profileImage?: string; // 프로필 이미지 URL
  email: string;       // 카카오 계정 이메일
}

export interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  user: User | null;
  setLogin: (token: string, user: User) => void;
  setLogout: () => void;
}