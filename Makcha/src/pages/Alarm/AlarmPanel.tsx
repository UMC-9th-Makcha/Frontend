import SearchField from "./components/SearchField";
import DestinationCarousel from "./components/DestinationCarousel";
import RecentDestinations from "./components/RecentDestinations";
import type { OriginSearchItem } from "./types/search";

type AlarmPanelProps = {
    onOpenOrigin: () => void;
    onOpenDestination: () => void;
    onSelectDestination: (item: OriginSearchItem) => void;
};

const AlarmPanel = ({ onOpenOrigin, onOpenDestination, onSelectDestination }: AlarmPanelProps) => {
    return (
        <>
            <div className="pt-8 md:pt-0">
                <h1 className="text-[32px] font-medium text-makcha-navy-900 dark:text-white max-md:text-[30px] max-md:font-bold">
                    오늘은 어디로 가시나요?
                </h1>

                <p
                    className="
                        mt-2 whitespace-pre-line text-[20px]
                        text-gray-500 dark:text-makcha-navy-200
                        max-md:mt-2.25
                        max-md:whitespace-normal
                        max-md:text-[#5F5F5F] max-md:dark:text-white/60
                    "
                >
                    오늘도 놓치지 않게{"\n"}카카오톡으로 알림을 보내드릴게요!
                </p>

                <div className="mt-6 max-md:mt-5 max-md:space-y-4 space-y-5">
                    <SearchField label="출발지" text="현위치 : 서울역 봉구비어" onClick={onOpenOrigin} />
                    <DestinationCarousel onSelectDestination={onSelectDestination} />
                    <RecentDestinations onSelectDestination={onSelectDestination} />
                    <SearchField label="직접 검색하기" text="도착지" onClick={onOpenDestination} />
                </div>
            </div>
        </>
    );
};

export default AlarmPanel;
