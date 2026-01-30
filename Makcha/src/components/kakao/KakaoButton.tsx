import { generateRandomState } from "../../utils/auth";

interface Props {
  className?: string;
}

const KakaoLoginButton = ({ className = "" }: Props) => {
  const handleLogin = () => {
    // 보안을 위한 state 생성 및 저장
    const state = generateRandomState();
    sessionStorage.setItem('kakao_auth_state', state);

    const CLIENT_ID = import.meta.env.VITE_KAKAO_REST_API_KEY;

    // 현재 접속 환경(localhost 또는 ngrok) 주소를 자동으로 획득
    const REDIRECT_URI = `${window.location.origin}/kakao/callback`;


    // 예외 처리
    if (!CLIENT_ID || CLIENT_ID === "undefined") {
      alert(".env 파일의 VITE_KAKAO_REST_API_KEY를 확인하고 서버를 재시작하세요!");
      return;
    }

    // 카카오 인증 URL 생성
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&state=${state}`;

    // 카카오 로그인 페이지로 이동
    window.location.href = KAKAO_AUTH_URL;
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