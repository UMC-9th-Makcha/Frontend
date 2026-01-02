import AlarmMobile from "./mobile/AlarmMobile";
import AlarmPC from "./PC/AlarmPC";

const Alarm = () => {
    return (
        <>
            {/* PC / Tablet */}
            <div className="hidden md:block min-h-dvh">
                <AlarmPC />
            </div>

            {/* Mobile */}
            <div className="block md:hidden min-h-dvh">
                <AlarmMobile />
            </div>
        </>
    );
};

export default Alarm;
