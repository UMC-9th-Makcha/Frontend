import LoadingLogo from "../../../assets/icons/logo.svg";

type Props = { open: boolean };

const RouteLoadingPanel = ({ open }: Props) => {
    if (!open) return null;

    return (
        <section
            className="
                min-h-dvh w-full
                flex items-center justify-center
                bg-white dark:bg-makcha-navy-900
            "
        >
            <div className="flex flex-col items-center -translate-y-10">
                <img src={LoadingLogo} alt="로딩" className="h-35 w-35" />
                <p className="mt-[21px] text-center text-[25px] font-bold text-black dark:text-white">
                    추천 막차 경로를 탐색중입니다...
                </p>
            </div>
        </section>
    );
};

export default RouteLoadingPanel;
