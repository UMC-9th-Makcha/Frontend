import { useEffect, useState } from "react";
import Panel from "../../components/common/Panel";
import KakaoMapView from "./KakaoMapView";
import SearchSheet from "./sheets/SearchSheet";
import AlarmPanelSwitch from "./panels/AlarmPanelSwitch";
import { useAlarmFlow } from "./hooks/useAlarmFlow";

type LatLng = { lat: number; lng: number };

const Alarm = () => {
    useEffect(() => {
        console.log("KAKAO KEY:", import.meta.env.VITE_KAKAO_JS_KEY);
    }, []);

    const flow = useAlarmFlow();

    const [mapCenter, setMapCenter] = useState<LatLng>({
        lat: 37.5665,
        lng: 126.978,
    });

    const pickCurrentLocation = async () => {
        const targetSnapshot = flow.searchTarget;

        try {
            const pos = await new Promise<GeolocationPosition>((resolve, reject) => {
                if (!navigator.geolocation) {
                    reject(new Error("Geolocation not supported"));
                    return;
                }
                navigator.geolocation.getCurrentPosition(resolve, reject, {
                    enableHighAccuracy: true,
                    timeout: 8000,
                    maximumAge: 0,
                });
            });

            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            setMapCenter({ lat, lng });

            const restKey = import.meta.env.VITE_KAKAO_REST_KEY as string | undefined;
            let addressText = "현위치";

            if (restKey) {
                const res = await fetch(
                    `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
                    { headers: { Authorization: `KakaoAK ${restKey}` } }
                );

                if (res.ok) {
                    const data = await res.json();
                    const doc = data?.documents?.[0];
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
            });
        } catch {
            alert("현재 위치를 가져올 수 없습니다. 위치 권한을 확인해 주세요.");
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
                        }}
                    />
                </Panel>

                <section className="hidden md:block min-w-0 flex-1 h-dvh">
                    <KakaoMapView
                        center={mapCenter}
                        routes={flow.routes}
                        selectedRouteId={flow.selectedRoute?.id ?? null}
                        onSelectRoute={flow.handlePreviewRouteById}
                    />
                </section>

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
