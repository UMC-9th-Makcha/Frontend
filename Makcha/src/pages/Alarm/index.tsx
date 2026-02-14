import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import Panel from "../../components/common/Panel";
import KakaoMapView from "./KakaoMapView";
import SearchSheet from "./panels/SearchSheet";
import AlarmPanelSwitch from "./panels/AlarmPanelSwitch";
import { useAlarmFlow } from "./hooks/useAlarmFlow";
import { useAuth } from "../../hooks/useAuth";
import { usePickCurrentLocation } from "./hooks/usePickCurrentLocation";

type FromSettingToAlarmState = {
    smsVerified?: boolean;
    phone?: string;
};

function isFromSettingToAlarmState(state: unknown): state is FromSettingToAlarmState {
    if (!state || typeof state !== "object") return false;
    return "smsVerified" in state;
}

const Alarm = () => {
    const flow = useAlarmFlow();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const { user } = useAuth();

    useEffect(() => {
        const openConfirmRaw = searchParams.get("openConfirm");
        const from = searchParams.get("from");
        const notificationIdRaw = searchParams.get("notificationId");
        const routeIdRaw = searchParams.get("routeId");

        const openConfirm = openConfirmRaw === "1" || openConfirmRaw === "true";
        const notificationId = notificationIdRaw ? Number(notificationIdRaw) : undefined;
        const routeId = routeIdRaw ? String(routeIdRaw) : undefined;

        const hasDeepLink =
            openConfirm &&
            from === "history" &&
            Number.isFinite(notificationId) &&
            typeof routeId === "string" &&
            routeId.length > 0;

        if (!hasDeepLink) return;

        navigate("/alarm", {
            replace: true,
            state: {
                from: "history",
                openConfirm: true,
                notificationId,
                routeId,
            },
        });
    }, [navigate, searchParams]);

    useEffect(() => {
        const st: unknown = location.state;

        if (isFromSettingToAlarmState(st) && st.smsVerified) {
            flow.confirmRoute();
            navigate("/alarm", { replace: true, state: null });
        }
    }, [location.state, flow, navigate]);

    const goToSettingForSms = () => {
        if (!user?.phone) {
            navigate("/setting", {
                state: { from: "ALARM_SMS", returnTo: "/alarm" },
            });
            return;
        }

        flow.confirmRoute();
    };

    const { pickCurrentLocation } = usePickCurrentLocation({
        searchTarget: flow.searchTarget,
        handleSelect: flow.handleSelect,
    });

    return (
        <div className="h-dvh w-full overflow-x-hidden bg-white dark:bg-makcha-navy-900">
            <div className="relative h-dvh w-full md:flex md:overflow-hidden">
                <Panel
                    width="md:w-100"
                    isMobileFull
                    className="md:border-r md:border-gray-200 dark:md:border-makcha-navy-800"
                    disablePadding={flow.step === "CONFIRM"}
                >
                    <AlarmPanelSwitch
                        flow={{
                            step: flow.step,
                            origin: flow.origin,
                            destination: flow.destination,
                            routes: flow.routes,
                            selectedRoute: flow.selectedRoute,
                            getConfirmDetail: flow.getConfirmDetail,
                            openOriginSheet: flow.openOriginSheet,
                            openDestinationSheet: flow.openDestinationSheet,
                            handleSelectDestinationFromPanel: flow.handleSelectDestinationFromPanel,
                            handleSelectRoute: flow.handleSelectRoute,
                            backFromConfirm: flow.backFromConfirm,
                            confirmRoute: flow.confirmRoute,
                            goAlarmList: flow.goAlarmList,

                            goToSettingForSms,

                            isFromHistory: flow.isFromHistory,
                            deleteCurrentAlert: flow.deleteCurrentAlert,
                            deletingAlert: flow.deletingAlert,
                        }}
                    />
                </Panel>

                <section className="hidden md:block min-w-0 flex-1 h-dvh">
                    <KakaoMapView routes={flow.routes} selectedRouteId={flow.selectedRoute?.id ?? null} />
                </section>

                {flow.isSearchOpen && (
                    <SearchSheet
                        key={`${flow.searchTarget}-open`}
                        open={flow.isSearchOpen}
                        onClose={() => flow.setIsSearchOpen(false)}
                        title={flow.searchTarget === "ORIGIN" ? "출발지" : "도착지"}
                        onSelect={(item) => flow.handleSelect(flow.searchTarget, item)}
                        onPickCurrent={pickCurrentLocation}
                    />
                )}
            </div>
        </div>
    );
};

export default Alarm;
