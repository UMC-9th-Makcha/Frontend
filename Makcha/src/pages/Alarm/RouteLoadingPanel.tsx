import LoadingLogo from "./../../assets/icons/logo.svg";

type Props = { open: boolean };

const RouteLoadingPanel = ({ open }: Props) => {
    if (!open) return null;

    return (
        <section
            className="
                h-full w-[402px] shrink-0
                border-r border-gray-200 dark:border-makcha-navy-800
                bg-white dark:bg-makcha-navy-900

                max-md:min-h-dvh max-md:w-full
                max-md:border-r-0
                max-md:flex max-md:items-center max-md:justify-center
            "
        >
            <div
                className="
                    flex h-full w-full flex-col items-center justify-center
                    max-md:-translate-y-10
                    "
            >
                <img
                    src={LoadingLogo}
                    alt="로딩"
                    className="
                        h-[120px] w-[120px]
                        max-md:h-[140px] max-md:w-[140px]
                    "
                />

                <p
                    className="
                        mt-6 text-center text-[20px] font-medium
                        text-makcha-navy-900 dark:text-white
                        max-md:mt-[21px]
                        max-md:text-[25px] max-md:font-bold
                        max-md:text-black max-md:dark:text-white
                    "
                >
                    추천 막차 경로를 탐색중입니다...
                </p>
            </div>
        </section>
    );
};

export default RouteLoadingPanel;
