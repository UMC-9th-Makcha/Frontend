import LoadingLogo from "./../../assets/icons/logo.svg";

type Props = { open: boolean };

const RouteLoadingPanel = ({ open }: Props) => {
    if (!open) return null;

    return (
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center">
                <img
                    src={LoadingLogo}
                    alt="로딩"
                    className="h-[120px] w-[120px] max-md:h-[140px] max-md:w-[140px]"
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
