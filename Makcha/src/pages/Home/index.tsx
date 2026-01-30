import { useNavigate } from "react-router-dom";
import { HorizontalScroll } from "../../components/common/HorizontalScroll";
import { DASHBOARD_ACTIONS, type DashboardAction } from "./constant";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-y-10 md:gap-y-16 p-6 md:p-10 max-w-7xl mx-auto w-full min-h-full">
      
      {/* 헤더 */}
      <header className="space-y-1">
        <h1 className="text-2xl md:text-3xl font-bold dark:text-white leading-tight">
          반가워요, <span className="text-blue-500">막차</span>님!<br className="md:hidden" /> 어디로 가시나요?
        </h1>
        <p className="text-[15px] md:text-base text-gray-500 dark:text-makcha-navy-300">
          오늘도 놓치지 않게 알림 보내드릴게요
        </p>
      </header>

      {/* 대시보드 */}
      <section>
        <HorizontalScroll<DashboardAction>
          items={DASHBOARD_ACTIONS}
          className="md:w-full"
          contentClassName="md:flex-1 md:w-full"
          onItemClick={(item: DashboardAction, moved: boolean) => {
            if (!moved) navigate(item.path);
          }}
          renderItem={(item: DashboardAction) => (
            <div
              className={`
                w-[240px] md:w-full h-[140px] md:h-[116px] p-5 rounded-xl rounded-br-4xl flex flex-col justify-between 
                shadow-sm border transition-all active:scale-[0.98] cursor-pointer hover:shadow-md
                ${item.variant === "primary"
                  ? "bg-makcha-navy-800 border-makcha-navy-800 text-white shadow-blue-200/50"
                  : "bg-white border-gray-100 text-gray-900 dark:bg-white/5 dark:border-white/10 dark:text-white"
                }
              `}
            >
              <div className="space-y-1.5">
                <h2 className="text-lg md:text-xl font-bold leading-tight tracking-tight">
                  {item.title}
                </h2>
                <p className="text-[11px] md:text-[13px] opacity-80 leading-snug">
                  {item.description}
                </p>
              </div>
            </div>
          )}
        />
      </section>

      {/* 세이브 리포트 */}
      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold dark:text-white px-1">세이브 리포트</h2>
        <div 
          onClick={() => navigate("/history")}
          className="relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-7 md:p-12 rounded-3xl shadow-sm text-center 
                     cursor-pointer hover:shadow-md active:scale-[0.99] transition-all overflow-hidden"
        >
          <p className="text-sm text-gray-500 dark:text-makcha-navy-300 mb-2">지금까지 아낀 택시비 🚕</p>
          <p className="text-4xl md:text-6xl font-black text-amber-400 mb-2">125,000원</p>
          <p className="text-xs text-gray-400">총 5번의 막차를 사수했어요!</p>

          <div className="absolute bottom-2 right-2 opacity-20 md:opacity-100">
          </div>
        </div>
      </section>
      
    </div>
  );
}