import { useNavigate } from "react-router-dom";
import { HorizontalScroll } from "../../components/common/HorizontalScroll";
import { DASHBOARD_ACTIONS, type DashboardAction } from "./constant";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col justify-between p-6 md:p-10 max-w-7xl mx-auto">
      
      {/* 헤더 */}
      <header className="space-y-1">
        <h1 className="text-xl md:text-3xl font-bold dark:text-white">
          반가워요, <span className="text-blue-500">막차</span>님! 어디로 가시나요?
        </h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-makcha-navy-300">
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
                w-[240px] md:w-full h-[160px] md:h-[116px] p-4 rounded-lg rounded-br-4xl flex flex-col justify-between 
                shadow-sm border transition-all active:scale-[0.98] cursor-pointer hover:shadow-md
                ${item.variant === "primary"
                  ? "bg-makcha-navy-800 border-makcha-navy-800 text-white shadow-blue-200/50"
                  : "bg-white border-gray-100 text-gray-900 dark:bg-white/5 dark:border-white/10 dark:text-white"
                }
              `}
            >
              <div>
                <h2 className="text-xl md:text-2xl font-bold leading-tight tracking-tight whitespace-pre-wrap md:whitespace-normal">
                  {item.title}
                </h2>
                <p className="text-[12px] md:text-[14px] mt-5 md:mt-3 whitespace-pre-wrap opacity-80 leading-relaxed tracking-tight">
                  {item.description}
                </p>
              </div>
            </div>
          )}
        />
      </section>

      {/* 세이브 리포트 */}
      <section className="space-y-3">
        <div className="flex justify-between items-end px-1">
          <h2 className="text-lg md:text-xl font-bold dark:text-white">세이브 리포트</h2>
        </div>
        <div 
          onClick={() => navigate("/history")}
          className="relative bg-white dark:bg-white/5 border border-gray-100 dark:border-white/10 p-8 md:p-12 rounded-3xl shadow-sm text-center 
                     cursor-pointer hover:shadow-md active:scale-[0.99] transition-all"
        >
          <p className="text-sm md:text-base text-gray-500 dark:text-makcha-navy-300 mb-3">지금까지 아낀 택시비 🚕</p>
          <p className="text-4xl md:text-6xl font-black text-amber-400 mb-2">125,000원</p>
          <p className="text-xs md:text-sm text-gray-400">총 5번의 막차를 사수했어요!</p>
        </div>
      </section>
      
    </div>
  );
}