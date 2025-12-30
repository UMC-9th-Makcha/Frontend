const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

interface KakaoLoginButtonProps {
  className?: string;
}

const KakaoLoginButton = ({ className = "" }: KakaoLoginButtonProps) => {
  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <button
      onClick={handleLogin}
      className={`w-full py-4 bg-[#FEE500] text-[#191919] font-bold rounded-2xl flex items-center justify-center gap-3 shadow-lg active:scale-[0.98] transition-transform ${className}`}
    >
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path 
          fillRule="evenodd" 
          clipRule="evenodd" 
          d="M12 4C7.58172 4 4 6.81061 4 10.2773C4 12.5152 5.42065 14.4754 7.55163 15.6184L6.65082 18.9142C6.59218 19.129 6.8413 19.3038 7.02031 19.185L10.932 16.5912C11.2821 16.6327 11.6375 16.6545 12 16.6545C16.4183 16.6545 20 13.8439 20 10.3773C20 6.91061 16.4183 4 12 4Z" 
          fill="black"
        />
      </svg>
      카카오로 1초만에 시작하기
    </button>
  );
};

export default KakaoLoginButton;