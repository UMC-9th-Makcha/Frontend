import { Link } from "react-router-dom";

export default function Main() {

  const testRoutes = [
    { path: "/home", label: "🏠 홈 (대시보드)", color: "bg-makcha-navy-800" },
    { path: "/alarm", label: "⏰ 막차 알림 설정", color: "bg-makcha-navy-800" },
    { path: "/spot/first", label: "📍 첫차 대기 장소", color: "bg-makcha-navy-600" },
    { path: "/spot/last", label: "📍 막차 대기 장소", color: "bg-makcha-navy-600" },
    { path: "/history", label: "📜 알림 내역 리스트", color: "bg-makcha-navy-800" },
    { path: "/setting", label: "⚙️ 서비스 환경 설정", color: "bg-makcha-navy-800" },
    { path: "/download", label: "📲 앱 다운로드 (PWA)", color: "bg-makcha-navy-800" },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <div className="mb-10">
        <h1 className="text-4xl font-black text-makcha-yellow-500 mb-2">막차</h1>
        <p className="text-makcha-navy-200 font-medium">끊기지 않는 당신의 귀갓길</p>
      </div>

      <button className="w-full max-w-xs py-4 bg-[#FEE500] text-black font-bold rounded-2xl flex items-center justify-center gap-2 mb-12 shadow-lg active:scale-95 transition-transform">
        <span className="w-6 h-6 bg-black rounded-full text-[10px] text-white flex items-center justify-center font-black">K</span>
        카카오로 1초만에 시작하기
      </button>

      <div className="w-full max-w-md border-t border-makcha-navy-800 pt-8">
        <h3 className="text-makcha-navy-400 text-xs font-bold mb-4 uppercase tracking-[0.2em]">Development Test Menu</h3>
        <div className="grid grid-cols-2 gap-3">
          {testRoutes.map((route) => (
            <Link
              key={route.path}
              to={route.path}
              className={`${route.color} p-3 text-white text-sm rounded-xl border border-makcha-navy-600 hover:border-makcha-yellow-500 transition-colors flex items-center justify-center`}
            >
              {route.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}