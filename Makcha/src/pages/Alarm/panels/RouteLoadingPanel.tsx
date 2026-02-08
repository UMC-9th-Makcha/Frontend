import LoadingLogo from "../../../assets/icons/logo.svg";

type Props = { open: boolean };

const RouteLoadingPanel = ({ open }: Props) => {
    if (!open) return null;

    return (
        <div
            className="
                w-full bg-white dark:bg-makcha-navy-900
                min-h-dvh
                flex justify-center
                pt-[22vh] max-md:pt-[26vh]
                pb-24
            "
        >
            <div className="flex flex-col items-center">
                <img
                    src={LoadingLogo}
                    alt="로딩"
                    className="h-30 w-30 max-md:h-[140px] max-md:w-[140px]"
                />
                <p
                    className="
                        mt-6 text-center text-[20px] font-medium
                        text-makcha-navy-900 dark:text-white
                        max-md:text-[25px] max-md:font-bold
                    "
                >
                    추천 막차 경로를 탐색중입니다...
                </p>
            </div>
        </div>
    );
};

export default RouteLoadingPanel;
