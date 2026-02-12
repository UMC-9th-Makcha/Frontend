import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { HorizontalScroll } from "../../components/common/HorizontalScroll";
import { DASHBOARD_ACTIONS } from "./constant";
import type { DashboardAction } from "./types/home";
import { useAuthStore } from "../../store/useAuthStore";
import { useSaveReports } from "../History/hooks/useSaveReports"; 

export default function Home() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { data: saveReport, isLoading } = useSaveReports(true);
  const { totalAmount, totalCount } = useMemo(() => {
    if (!saveReport?.chart) return { totalAmount: 0, totalCount: 0 };
    return saveReport.chart.reduce(
      (acc, cur) => ({
        totalAmount: acc.totalAmount + cur.savedAmount,
        totalCount: acc.totalCount + cur.totalCount,
      }),
      { totalAmount: 0, totalCount: 0 }
    );
  }, [saveReport]);

  return (
    <div className="flex flex-col gap-y-10 md:gap-y-16 p-6 md:p-10 max-w-7xl mx-auto w-full min-h-full">

      <header className="space-y-2">
        <h1 className="text-h2 md:text-title font-bold leading-tight">
          반가워요, <span className="text-makcha-navy-600">{user?.name}</span>님!<br className="md:hidden" /> 어디로 가시나요?
        </h1>
        <p className="text-base text-gray-500 dark:text-makcha-navy-300 font-medium">
          오늘도 놓치지 않게 알림 보내드릴게요
        </p>
      </header>

      <section>
        <HorizontalScroll<DashboardAction>
          items={DASHBOARD_ACTIONS}
          className="md:w-full py-4 px-1"
          contentClassName="md:flex-1 md:w-full"
          onItemClick={(item: DashboardAction, moved: boolean) => {
            if (!moved) navigate(item.path);
          }}
          renderItem={(item: DashboardAction) => (
            <div
              className={`
                w-[240px] md:w-full h-36 md:h-[120px] p-6 
                rounded-xl rounded-br-4xl 
                flex flex-col justify-between 

                cursor-pointer border shadow-sm transition-all duration-200
 
                hover:shadow-md active:bg-gray-50 dark:active:bg-white/10

                ${item.variant === "primary"
                  ? "bg-makcha-navy-800 border-makcha-navy-900 hover:bg-makcha-navy-600"
                  : "bg-white border-gray-200 dark:bg-white/5 dark:border-white/20 hover:border-blue-400 dark:hover:border-white/50"
                }
              `}
            >
              <div className="space-y-2">
              <h2 className={`text-lg md:text-xl font-semibold leading-tight tracking-tight ${
                item.variant === "primary" ? "text-white" : "text-gray-900 dark:text-white"
              }`}>
                  {item.title}
                </h2>
                <p className={`text-xs md:text-sm leading-snug font-medium ${
                  item.variant === "primary" ? "text-white/90" : "text-gray-600 dark:text-gray-300"
                }`}>
                  {item.description}
                </p>
              </div>
            </div>
          )}
        />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg md:text-xl font-bold dark:text-white px-1">세이브 리포트</h2>
        <div 
          onClick={() => navigate("/history")}
          className="relative bg-white dark:bg-white/5 border border-gray-300 dark:border-white/20 
                     p-8 md:p-12 rounded-3xl shadow-sm text-center 
                     cursor-pointer overflow-hidden transition-all duration-200
                     hover:shadow-md hover:border-makcha-navy-400
                     active:bg-gray-50 dark:active:bg-white/10"
        >
          <p className="text-sm text-gray-600 font-bold dark:text-makcha-navy-300 mb-2">
            최근 3개월간 아낀 택시비 🚕
          </p>

          <p className="text-4xl md:text-6xl font-black text-makcha-yellow-500 mb-2 tracking-tight">
            {isLoading ? "..." : `${totalAmount.toLocaleString()}원`}
          </p>

          <p className="text-xs text-gray-500 font-medium dark:text-gray-400">
            {isLoading 
               ? "데이터를 불러오고 있어요"
               : totalCount > 0 
                 ? `총 ${totalCount}번의 막차를 사수했어요!`
                 : "최근 3개월간 막차 기록이 없어요!"
            }
          </p>
        </div>
      </section>
      
    </div>
  );
}