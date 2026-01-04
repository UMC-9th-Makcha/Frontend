import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import KakaoLoginButton from "../../components/kakao/KakaoButton";

export default function Main() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Navigate to="/home" replace />;
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-8 bg-makcha-navy-900 text-white leading-relaxed">

      <div className="flex-1 flex flex-col items-center justify-center w-full max-w-xs">
        <span className="text-6xl mb-6 select-none" role="img" aria-label="bus">
          🚌
        </span>
        <h1 className="text-5xl font-black text-makcha-yellow-500 mb-4 tracking-tight">
          막차
        </h1>
        <p className="text-makcha-navy-200 text-lg font-medium mb-12 opacity-90">
          끊기지 않는 당신의 귀갓길
        </p>
      </div>

      <div className="w-full max-w-sm pb-10">
        <KakaoLoginButton />
      </div>
    </div>
  );
}