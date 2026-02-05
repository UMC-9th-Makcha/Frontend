import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Panel from "../../components/common/Panel";
import KakaoMapView from "./KakaoMapView";
import SearchSheet from "./sheets/SearchSheet";
import AlarmPanelSwitch from "./panels/AlarmPanelSwitch";
import { useAlarmFlow } from "./hooks/useAlarmFlow";
import { useAuth } from "../../hooks/useAuth";

// Setting → Alarm 복귀
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
    const { user } = useAuth();

    // Setting에서 전화번호 인증 완료 후 돌아오면 SUCCESS로 전환
    useEffect(() => {
        const st: unknown = location.state;

        if (isFromSettingToAlarmState(st) && st.smsVerified) {
            flow.confirmRoute();
            navigate("/alarm", { replace: true, state: null });
        }
    }, [location.state, flow, navigate]);

    // phone 없으면 Setting으로 보내기
    const goToSettingForSms = () => {
        if (!user?.phone) {
            navigate("/setting", {
                state: { from: "ALARM_SMS", returnTo: "/alarm" },
            });
            return;
        }

        flow.confirmRoute();
    };

    const pickCurrentLocation = async () => {
        const targetSnapshot = flow.searchTarget;

        try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error("Geolocation not supported"));
                    return;
                }
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: false,
                    timeout: 15000,
                    maximumAge: 60000,
                });
            });

            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            const restKey = import.meta.env.VITE_KAKAO_REST_KEY as string | undefined;
            let addressText = "현위치";

            if (restKey) {
                const res = await fetch(
                    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
                    { headers: { Authorization: `KakaoAK ${restKey}` } }
                );

                if (res.ok) {
                    const data: unknown = await res.json();
                    const d = data as {
                        documents?: Array<{
                            road_address?: { address_name?: string };
                            address?: { address_name?: string };
                        }>;
                    };
                    const doc = d.documents?.[0];

                    addressText =
                        doc?.road_address?.address_name ??
                        doc?.address?.address_name ??
                        "현위치";
                }
            }

            flow.handleSelect(targetSnapshot, {
                id: "current",
                title: "현위치",
                address: addressText,
                lat,
                lng,
            });
        } catch (err: unknown) {
            if (err && typeof err === "object" && "code" in err) {
                const e = err as GeolocationPositionError;
                alert(`위치 실패 (code=${e.code})\n${e.message}`);
                return;
            }

            alert("알 수 없는 위치 오류");
        }
    };

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
                        }}
                    />
                </Panel>

                {/* 지도 */}
                <section className="hidden md:block min-w-0 flex-1 h-dvh">
                    <KakaoMapView
                        routes={flow.routes}
                        selectedRouteId={flow.selectedRoute?.id ?? null}
                    />
                </section>

                {/* 검색 시트 */}
                <SearchSheet
                    open={flow.isSearchOpen}
                    onClose={() => flow.setIsSearchOpen(false)}
                    title={flow.searchTarget === "ORIGIN" ? "출발지" : "도착지"}
                    onSelect={(item) => flow.handleSelect(flow.searchTarget, item)}
                    onPickCurrent={pickCurrentLocation}
                />
            </div>
        </div>
    );
};

export default Alarm;