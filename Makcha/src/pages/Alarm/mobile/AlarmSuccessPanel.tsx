import type { OriginSearchItem } from "../mocks/originSearchMock";
import type { AlarmRoute } from "../mocks/alarmMock";
import CheckIcon from "../../../assets/icons/check.svg";
import LogoCircle from "../../../assets/icons/Logo-circle.svg";
import StarIcon from "../../../assets/icons/Star.svg";

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

const AlarmSuccessPanelMobile = ({
    origin,
    destination,
    route,
    onGoAlarmList,
}: Props) => {

    
    const originLabel = origin?.title ?? "출발지";
    const destLabel = destination?.title ?? "도착지";
    const departure = route?.departureTime ?? "--:--";

    return (
        <section className="h-dvh w-full overflow-hidden bg-white dark:bg-makcha-navy-900">
            <div className="mx-auto flex h-dvh w-full max-w-[520px] flex-col px-5 pt-4 pb-20 overflow-hidden">
                {/* 헤더 */}
                <div className="flex flex-col items-center">
                    <img
                        src={CheckIcon}
                        alt="완료"
                        className="h-[64px] w-[64px]"
                    />

                    <h1 className="mt-3 text-[32px] font-bold text-black dark:text-white">
                        알림 신청 완료!
                    </h1>

                    <p className="mt-[25px] text-center text-[20px] leading-6 text-black/70 dark:text-white/60">
                        카카오톡으로 막차 알림 메시지를 보내드렸어요!
                        <br />
                        이제 브라우저를 닫으셔도 괜찮습니다.
                    </p>
                </div>

                {/* 카드 */}
                <div
                    className="
                        relative overflow-hidden mt-[20px]
                        bg-white
                        px-4 py-5

                        shadow-[0_6px_14px_rgba(0,0,0,0.12)]
                        [box-shadow:0_6px_14px_rgba(0,0,0,0.12),inset_0_0_0_2px_#7B7B7B]

                        before:absolute before:left-0 before:top-1/2
                        before:-translate-x-1/2 before:-translate-y-1/2
                        before:h-[44px] before:w-[44px] before:rounded-full
                        before:bg-white before:ring-2 before:ring-[#7B7B7B]

                        after:absolute after:right-0 after:top-1/2
                        after:translate-x-1/2 after:-translate-y-1/2
                        after:h-[44px] after:w-[44px] after:rounded-full
                        after:bg-white after:ring-2 after:ring-[#7B7B7B]
                    "
                >
                    <div className="text-center text-[30px] font-bold text-black ">
                        {originLabel} → {destLabel}
                    </div>

                    <div className="mt-2 flex flex-wrap justify-center gap-2 text-[15px] text-black ">
                        {route?.isOptimal ? (
                            <span className="rounded-[10px] border border-black px-3 py-1 ">
                                최적
                            </span>
                        ) : route ? (
                            <span className="rounded-[10px] border border-black px-3 py-1">
                                {ROUTE_TYPE_LABEL[route.routeType]}
                            </span>
                        ) : null}

                        {route?.lines?.map((l) => (
                            <span
                                key={l}
                                className="rounded-[10px] border border-black px-3 py-1 "
                            >
                                {l}
                            </span>
                        ))}
                    </div>

                    <div className="mt-4 text-center text-[60px] font-bold leading-none text-black">
                        {departure}
                    </div>

                    <div className="mt-[15px] text-center text-[16px] font-semibold text-black ">
                        {route ? `에는 출발해야합니다!` : ""}
                    </div>

                    <div className="mt-[25px] text-center text-[20px] font-bold text-black ">
                        지금부터 카카오톡으로 알려드릴게요
                    </div>
                </div>

                {/* 로고 */}
                <img
                    src={LogoCircle}
                    alt="service logo"
                    className="mt-6 ml-auto h-[87px] w-[87px] rounded-full"
                />

                {/* 즐겨찾기 저장 */}
                <div className="my-2 w-full rounded-[14px] border border-black/70 bg-[#F2F2F2] px-4 py-4">
                    <div className="flex items-center gap-3">
                        <img src={StarIcon} alt="별" className="h-[40px] w-[40px] opacity-60" />



                        <div className="min-w-0">
                            <div className="text-[16px] font-semibold text-black">
                                도착지를{" "}
                                <span className="font-extrabold">[자주가는경로]</span>에 저장할까요?
                            </div>
                            <div className="mt-1 text-[12px] leading-[1.2] text-black">
                                다음에 이용할땐 클릭 한번으로 알림을 받을 수 있어요!
                            </div>
                        </div>
                    </div>
                </div>

                {/* 하단 버튼 */}
                <button
                type="button"
                disabled
                onClick={onGoAlarmList}
                className="
                    fixed bottom-0 left-0 right-0 h-[56px]
                    bg-[#ABABAB] text-white text-[24px] font-bold
                    disabled:cursor-not-allowed disabled:opacity-100
                    pb-[env(safe-area-inset-bottom)]
                "
                >
                알림 내역 조회하기
                </button>
            </div>
        </section>
    );
};

export default AlarmSuccessPanelMobile;