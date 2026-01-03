import OriginField from "./components/OriginField";
import DestinationCarousel from "./components/DestinationCarousel";
import RecentDestinations from "./components/RecentDestinations";
import DirectSearchField from "./components/DirectSearchField";

type Props = {
    onOpenOrigin: () => void;
};

const AlarmPanel = ({ onOpenOrigin }: Props) => {
    return (
        <section className="min-h-dvh w-full dark:bg-makcha-navy-900">
            <div className="px-5 pt-7 pb-6">
                <h1 className="text-[30px] font-bold  text-makcha-navy-900 dark:text-white">
                    오늘은 어디로 가시나요?
                </h1>

                <p className="mt-[9px] text-[20px] text-[#5F5F5F] dark:text-white/60">
                    놓치지 않게 카카오톡으로 출발 알림을 보내드릴게요!
                </p>

                <div className="mt-5 space-y-4">
                    <OriginField onClick={onOpenOrigin} />
                    <DestinationCarousel />
                    <RecentDestinations />
                    <DirectSearchField />
                </div>
            </div>
        </section>
    );
};

export default AlarmPanel;
