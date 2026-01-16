import type { AlarmRoute } from "../types/alarm";
import type { OriginSearchItem } from "../types/search";
import { CheckCircle } from "lucide-react";
import { ROUTE_TYPE_LABEL } from "../constants";
import FrequentRoutesCard from "../components/FrequentRoutesCard";

type Props = {
    origin: OriginSearchItem;
    destination: OriginSearchItem;
    route: AlarmRoute;
    onGoAlarmList: () => void;
};

const AlarmSuccessPanel = ({ origin, destination, route, onGoAlarmList }: Props) => {
    const originLabel = origin.title;
    const destLabel = destination.title;
    const departure = route.departureTime;

    return (
        <div className="flex h-full flex-col">
            <div className="flex flex-col items-center pt-14 md:pt-20">
                <CheckCircle className="w-15 h-15 text-[#1E1E1E] dark:text-white" strokeWidth={1.5} />

                <h1 className="mt-[15px] text-[32px] font-bold text-makcha-navy-900 dark:text-white">
                    알림 신청 완료!
                </h1>

                <p className="mt-3 text-center text-[16px] text-gray-500 dark:text-white/60">
                    카카오톡으로 막차 알림 메시지를 보내드렸어요!
                    <br />
                    이제 브라우저를 닫으셔도 괜찮습니다.
                </p>

                <div className="mt-[51px] w-full rounded-[20px] border border-gray-200 bg-white p-5 shadow-sm dark:bg-makcha-navy-900">
                    <div className="text-center text-[20px] text-gray-900 dark:text-white">
                        {originLabel} → {destLabel}
                    </div>

                    <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs text-gray-500 dark:text-white/60">
                        {route.isOptimal && <span className="rounded-full border px-2 py-1">최적</span>}

                        {!route.isOptimal && (
                            <span className="rounded-full border px-2 py-1">
                                {ROUTE_TYPE_LABEL[route.routeType]}
                            </span>
                        )}

                        {route.lines?.map((l) => (
                            <span key={l} className="rounded-full border px-2 py-1">
                                {l}
                            </span>
                        ))}
                    </div>

                    <div className="mt-[17px] text-center text-[36px] font-bold text-black dark:text-white">
                        {departure}
                    </div>

                    <div className="mt-[5px] text-center text-[14px] text-black dark:text-white/80">
                        {`${departure}에는 출발해야합니다!`}
                    </div>

                    <div className="mt-[26px] text-center text-[14px] text-black dark:text-white/80">
                        지금부터 카카오톡으로 알려드릴게요
                    </div>
                </div>
            </div>

            <div className="mt-4">
                <FrequentRoutesCard
                    titleBold={`도착지를 [자주가는경로]에 저장할까요?`}
                    subtitle="다음에 이용할 땐 클릭 한 번으로 알림을 받을 수 있어요!"
                    onSave={() => { }}
                />
            </div>

            <div className="mt-auto pt-6 pb-[max(20px,env(safe-area-inset-bottom))]">
                <button
                    type="button"
                    onClick={onGoAlarmList}
                    className="h-[45px] w-full rounded-[20px] bg-[#4574C6] text-white"
                >
                    알림 내역 조회하기
                </button>
            </div>
        </div>
    );
};

export default AlarmSuccessPanel;
