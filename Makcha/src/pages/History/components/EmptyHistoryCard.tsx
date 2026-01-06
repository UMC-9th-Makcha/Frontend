import LogoIcon from "../../../assets/icons/logo.svg";

const EmptyHistoryCard = () => {
    return (
        <div className="w-full rounded-[20px] border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col items-center pt-6.25 pb-4.75">
                <img src={LogoIcon} alt="logo" className="h-22 w-22" />
                <p className="mt-4 text-[16px] text-[#5F5F5F]">
                    이용 내역이 없습니다.
                </p>
            </div>
        </div>
    );
};

export default EmptyHistoryCard;
