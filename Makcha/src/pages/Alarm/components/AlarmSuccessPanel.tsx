import type { OriginSearchItem } from "../mocks/originSearchMock";
import type { AlarmRoute } from "../mocks/alarmMock";
import CheckIcon from "../../../assets/icons/check.svg";
import LogoCircle from "../../../assets/icons/Logo-circle.svg";

type Props = {
    origin: OriginSearchItem | null;
    destination: OriginSearchItem | null;
    route: AlarmRoute | null;
    onGoAlarmList: () => void;
};

const ROUTE_TYPE_LABEL: Record<AlarmRoute["routeType"], string> = {
    SUBWAY: "지하철",
    BUS: "버스",
    NIGHT_BUS: "심야버스",
};


const AlarmSuccessPanel = ({ origin, destination, route, onGoAlarmList }: Props) => {
    return (
        <section className="relative h-full w-100.5 shrink-0 border-r border-gray-200 bg-white dark:border-makcha-navy-800 dark:bg-makcha-navy-900">
            <div className="flex h-full flex-col px-5 pt-40">
                <div className="flex flex-col items-center">
                    <img src={CheckIcon} alt="완료" className="h-15 w-15 opacity-60" />

                    <h1 className="mt-[15px] text-[32px] font-bold text-makcha-navy-900 dark:text-white">
                        알림 신청 완료!
                    </h1>

                    <p className="mt-[12px] text-center text-[16px] text-gray-500 dark:text-white/60">
                        카카오톡으로 막차 알림 메시지를 보내드렸어요!
                        <br />
                        이제 브라우저를 닫으셔도 괜찮습니다.
                    </p>

                    <div className="mt-[51px] w-full rounded-[20px] border border-gray-200 bg-white p-5 shadow-sm">
                        <div className="text-center text-[20px] text-gray-900">
                            {origin ? origin.title : "출발지"} → {destination ? destination.title : "도착지"}
                        </div>

                        <div className="mt-2 flex flex-wrap justify-center gap-2 text-xs text-gray-500">
                            {route?.isOptimal && (
                                <span className="rounded-full border px-2 py-1">최적</span>
                            )}

                            {route && !route.isOptimal && (
                                <span className="rounded-full border px-2 py-1">
                                    {ROUTE_TYPE_LABEL[route.routeType]}
                                </span>
                            )}

                            {route?.lines?.map((l) => (
                                <span key={l} className="rounded-full border px-2 py-1">
                                    {l}
                                </span>
                            ))}
                        </div>

                        <div className="mt-[17px] text-center text-[36px] text-black">
                            {route ? route.departureTime : "--:--"}
                        </div>

                        <div className="mt-[5px] text-center text-[14px] text-black">
                            {route ? `${route.departureTime}에는 출발해야합니다!` : ""}
                        </div>

                        <div className="mt-[26px] text-center text-[14px] text-black">
                            지금부터 카카오톡으로 알려드릴게요
                        </div>
                    </div>
                </div>

                <div className="mt-[118px] pb-8">
                    <button
                        type="button"
                        onClick={onGoAlarmList}
                        className="h-[45px] w-full rounded-[20px] bg-[#4574C6] text-white"
                    >
                        알림 내역 조회하기
                    </button>
                </div>
            </div>

            {/* 로고 */}
            <img
                src={LogoCircle}
                alt="service logo"
                className="absolute bottom-[34px] right-[20px]
                    h-[58px] w-[58px] rounded-full"
            />
        </section>


    );
};

export default AlarmSuccessPanel;
