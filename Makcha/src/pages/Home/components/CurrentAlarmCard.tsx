import type { CurrentAlarm } from "../mocks/historyMock";
import ArrowIcon from "../../../assets/icons/arrow.svg";


type Props = {
    alarm: CurrentAlarm | null;
    onCreate?: () => void;
    onCancel?: () => void;
    onDetail?: () => void;
};

const CurrentAlarmCard = ({ alarm, onCreate, onCancel, onDetail }: Props) => {
    // 1) 알림 없음
    if (!alarm) {
        return (
            <div className="w-full rounded-[20px] border border-gray-200 bg-white shadow-sm">
                <h2 className="text-[26px] font-medium text-black">안녕하세요, 막차 님!</h2>

                <p className="mt-3.25 text-[14px] text-[#909090]">
                    아래 버튼을 클릭하여 막차 시간 알림을 생성하고
                    <br />
                    카카오톡으로 알림을 확인하세요!
                </p>

                <div className="mt-7.5 flex justify-end">
                    <button
                        type="button"
                        onClick={onCreate}
                        className="h-12.5 w-66.75 rounded-[30px] bg-makcha-navy-400 text-[20px] font-medium text-white"
                    >
                        막차 알림 생성하기
                    </button>
                </div>
            </div>
        );
    }

    // 2) 알림 있음
    return (
        <div className="w-full">
            {/* 카드 */}
            <div className="w-full rounded-[26px] border border-gray-200 bg-white p-5 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        {alarm.isOptimal && (
                            <span className="rounded-full border border-[#EBEBEB] px-4 py-1 text-[18px] text-black">
                                최적
                            </span>
                        )}
                        {alarm.lines.map((line) => (
                            <span
                                key={line}
                                className="rounded-full border border-[#EBEBEB] px-3 py-1 text-[18px] text-black"
                            >
                                {line}
                            </span>
                        ))}
                    </div>

                    <button
                        type="button"
                        onClick={onDetail}
                        className="flex items-center gap-2 text-[18px] text-[#454545] hover:text-black"
                    >
                        상세보기
                        <img
                            src={ArrowIcon}
                            alt=""
                            className="h-5 w-5"
                        />
                    </button>

                </div>

                <div className="mt-4 text-center">
                    <div className="text-[40px] font-medium text-black">{alarm.departureTime} 출발</div>
                    <div className="mt-1 text-[21px] text-black">{alarm.timeUntilDepartureText}</div>
                </div>

                <div className="mt-5.25 border-t border-[#E2E2E2] pt-4 text-center text-[18px] text-[#454545]">
                    총 {alarm.totalDurationMin}분 소요 &nbsp;·&nbsp; 환승 {alarm.transferCount}회
                    &nbsp;·&nbsp; 도보 {alarm.walkingTimeMin}분
                </div>
            </div>

            {/* 알람 취소하기 */}
            <div className="mt-[19px] flex justify-center">
                <button
                    type="button"
                    onClick={onCancel}
                    className="h-12.5 w-full max-w-121.5 rounded-[30px] bg-makcha-navy-400 text-[20px] font-medium text-white"
                >
                    알림 취소하기
                </button>
            </div>
        </div>
    );
};

export default CurrentAlarmCard;
