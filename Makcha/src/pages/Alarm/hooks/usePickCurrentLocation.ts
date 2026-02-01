import type { OriginSearchItem } from "../types/search";

type SearchTarget = "ORIGIN" | "DESTINATION";
type LatLng = { lat: number; lng: number };

export function usePickCurrentLocation(params: {
    searchTarget: SearchTarget;
    setMapCenter: (pos: LatLng) => void;
    handleSelect: (target: SearchTarget, item: OriginSearchItem) => void;
}) {
    const { searchTarget, setMapCenter, handleSelect } = params;

    const pickCurrentLocation = async () => {
        const targetSnapshot = searchTarget;

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

            const item: OriginSearchItem = {
                id: "current",
                title: "현위치",
                address: addressText,
            };

            handleSelect(targetSnapshot, item);
        } catch {
            alert("현재 위치를 가져올 수 없습니다. 위치 권한을 확인해 주세요.");
        }
    };

    return { pickCurrentLocation };
}
