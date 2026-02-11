import Panel from "../../../components/common/Panel";
import RouteConfirmPanel from "../../Alarm/panels/RouteConfirmPanel";
import KakaoMapView from "../../Alarm/KakaoMapView";
import type { AlarmRoute } from "../../Alarm/types/alarm";
import type { RouteConfirmDetail } from "../../Alarm/types/routeConfirm";

type Props = {
    open: boolean;
    route: AlarmRoute | null;
    detail: RouteConfirmDetail | null;
    onClose: () => void;
};

const HistoryPastConfirmOverlay = ({ open, route, detail, onClose }: Props) => {
    if (!open || !route || !detail) return null;

    return (
        <div className="absolute inset-0 z-50 flex">
            <div
                className="absolute inset-0 bg-black/10 dark:bg-black/30 transition-opacity"
                onClick={onClose}
            />

            <Panel width="md:w-100" disablePadding className="shadow-2xl relative z-10">
                <RouteConfirmPanel
                    route={route}
                    detail={detail}
                    onBack={onClose}
                    onConfirm={onClose}
                    mode="historyPast"
                />
            </Panel>

            <section className="hidden md:block min-w-0 flex-1 h-dvh relative z-10">
                <KakaoMapView routes={[route]} selectedRouteId={route.id} />
            </section>
        </div>
    );
};

export default HistoryPastConfirmOverlay;
