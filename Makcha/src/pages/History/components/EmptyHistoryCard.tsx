import LogoIcon from "../../../assets/icons/logo.svg";

const EmptyHistoryCard = () => {
    return (
        <div
            className="
                w-full rounded-[20px]
                border border-gray-200 bg-white shadow-sm
                dark:border-makcha-navy-700 dark:bg-makcha-navy-900
            "
        >
            <div className="flex flex-col items-center pt-[25px] pb-[19px]">
                <img
                    src={LogoIcon}
                    alt="logo"
                    className="h-22 w-22 opacity-90 dark:opacity-100"
                />
                <p className="mt-4 text-[16px] text-gray-500 dark:text-white">
                    이용 내역이 없습니다.
                </p>
            </div>
        </div>
    );
};

export default EmptyHistoryCard;