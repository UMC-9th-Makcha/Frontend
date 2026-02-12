import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { CurrentAlarm } from "../types/history";
import { getDisplayLineName } from "../utils/lineFormatter";
import { useForceCompleteAlert } from "../hooks/useForceCompleteAlert";
import { useAuth } from "../../../hooks/useAuth";

type Props = {
    alarm: CurrentAlarm | null;
    onCreate?: () => void;
    onCancel?: () => void;
};

const CurrentAlarmCard = ({ alarm, onCreate }: Props) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const { mutateAsync: forceComplete, isPending: forcing } = useForceCompleteAlert();

    if (!alarm) {
        return (
            <div
                className="
                w-full rounded-[20px]
                border border-gray-200 bg-white shadow-sm
                dark:border-makcha-navy-700 dark:bg-makcha-navy-900
                "
            >
                <h2 className="px-6 py-4 text-[26px] font-medium text-makcha-navy-900 dark:text-white">
                    안녕하세요,{" "}
                    <span className="text-makcha-navy-600">
                        {user?.name ?? "막차"}
                    </span>
                    님!
                </h2>

                <p className="mt-1 px-6 text-[16px] text-gray-500 dark:text-white/60">
                    아래 버튼을 클릭하여 막차 시간 알림을 생성하고
                    <br />
                    문자메시지로 알림을 확인하세요!
                </p>

                <div className="mt-8 flex justify-end pr-8 pb-5">
                    <button
                        type="button"
                        onClick={onCreate}
                        className="
                        h-[50px] w-[267px] rounded-[30px]
                        bg-makcha-navy-400 text-[20px] font-medium text-white
                    "
                    >
                        막차 알림 생성하기
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div
                className="
                w-full rounded-[26px]
                border border-gray-200 bg-white p-5 shadow-sm
                dark:border-makcha-navy-700 dark:bg-makcha-navy-900
            "
            >
                <div className="flex items-center gap-3">
                    <div className="-my-1 flex-1 overflow-x-auto">
                        <div className="flex items-center gap-2 whitespace-nowrap py-1">
                            {alarm.isOptimal && (
                                <span
                                    className="
                                        rounded-full border px-4 py-1 text-[18px]
                                        border-[#EBEBEB] text-makcha-navy-900
                                        dark:border-makcha-navy-700 dark:text-white/90
                                    "
                                >
                                    최적
                                </span>
                            )}

                            {(alarm.lines ?? []).map((line) => (
                                <span
                                    key={line}
                                    className="
                                        rounded-full border px-3 py-1 text-[18px]
                                        border-[#EBEBEB] text-makcha-navy-900
                                        dark:border-makcha-navy-700 dark:text-white/90
                                    "
                                >
                                    {getDisplayLineName(line)}
                                </span>
                            ))}
                        </div>
                    </div>

                    {import.meta.env.MODE === "development" && (
                        <button
                            type="button"
                            disabled={forcing}
                            onClick={async () => {
                                try {
                                    await forceComplete(alarm.notificationId);
                                } catch (e) {
                                    console.error("[alerts:force-complete] failed", e);
                                    alert("강제 완료 실패");
                                }
                            }}
                            className="
                                shrink-0 whitespace-nowrap
                                ml-2 rounded-full border px-3 py-1 text-[16px]
                                border-[#EBEBEB] text-gray-600 hover:text-makcha-navy-900
                                disabled:cursor-not-allowed disabled:opacity-50
                                dark:border-makcha-navy-700 dark:text-white/60 dark:hover:text-white
                            "
                        >
                            과거 알림 생성(테스트)
                        </button>
                    )}

                    <button
                        type="button"
                        onClick={() => {
                            const qs = new URLSearchParams({
                                from: "history",
                                openConfirm: "1",
                                notificationId: String(alarm.notificationId),
                                routeId: String(alarm.routeId ?? ""),
                            });

                            navigate(`/alarm?${qs.toString()}`);
                        }}
                        className="
                            shrink-0 whitespace-nowrap
                            flex items-center gap-2 text-[18px]
                            text-gray-600 hover:text-makcha-navy-900
                            dark:text-white/60 dark:hover:text-white
                            -mr-1 pr-1
                        "
                    >
                        상세보기
                        <ChevronRight className="h-5 w-5" strokeWidth={2} />
                    </button>
                </div>

                <div className="mt-4 text-center">
                    <div className="text-[40px] font-medium text-makcha-navy-900 dark:text-white">
                        {alarm.departureTime} 출발
                    </div>
                    <div className="mt-1 text-[21px] text-makcha-navy-900 dark:text-white/80">
                        {alarm.timeUntilDepartureText}
                    </div>
                </div>

                <div
                    className="
                        mt-5 border-t border-[#E2E2E2] pt-4
                        text-center text-[18px]
                        text-gray-600
                        dark:border-white/60 dark:text-white/60
                    "
                >
                    총 {alarm.totalDurationMin}분 소요 &nbsp;·&nbsp; 환승 {alarm.transferCount}회 &nbsp;·&nbsp;
                    도보 {alarm.walkingTimeMin}분
                </div>
            </div>
        </div>
    );
};

export default CurrentAlarmCard;
