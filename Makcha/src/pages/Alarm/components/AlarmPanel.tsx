import OriginField from "./OriginField";
import DestinationCarousel from "./DestinationCarousel";
import RecentDestinations from "./RecentDestinations";
import DirectSearchField from "./DirectSearchField";
import LogoCircle from "../../../assets/icons/Logo-circle.svg";


type AlarmPanelProps = {onOpenOrigin: () => void;};

const AlarmPanel = ({ onOpenOrigin }: AlarmPanelProps) => {
    return (
        <section
            className="
                relative
                h-full w-[402px] shrink-0
                border-r border-gray-200 dark:border-makcha-navy-800
                bg-white dark:bg-makcha-navy-900
            "
            >
            <div className="h-full px-[20px] pt-[62px]">
                <h1 className="text-[32px] font-medium text-makcha-navy-900 dark:text-white">
                    오늘은 어디로 가시나요?
                </h1>

                <p className="mt-2 whitespace-pre-line text-[20px] text-gray-500 dark:text-makcha-navy-200">
                    오늘도 놓치지 않게{"\n"}카카오톡으로 알림을 보내드릴게요!
                </p>

                <OriginField onClick={onOpenOrigin} />
                <DestinationCarousel />
                <RecentDestinations />
                <DirectSearchField />
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

export default AlarmPanel;
