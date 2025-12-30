import { KAKAO_AUTH_URL, generateRandomState } from "../../utils/auth";

interface Props {
  className?: string;
}

const KakaoLoginButton = ({ className = "" }: Props) => {
  const handleLogin = () => {
    const state = generateRandomState();
    sessionStorage.setItem('kakao_auth_state', state);
    window.location.href = KAKAO_AUTH_URL(state);
  };

  return (
    <button
      onClick={handleLogin}
      className={`
        w-full py-4 bg-makcha-yellow-500 text-black font-bold rounded-2xl 
        flex items-center justify-center gap-3 
        active:scale-[0.98] transition-transform
        ${className}
      `}
    >
      카카오로 1초만에 시작하기
    </button>
  );
};

export default KakaoLoginButton;