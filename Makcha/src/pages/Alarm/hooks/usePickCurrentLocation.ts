import { useCallback } from "react";
import type { OriginSearchItem } from "../types/search";
import { useCurrentLocation } from "../../../hooks/useCurrentLocation";

type SearchTarget = "ORIGIN" | "DESTINATION";
type LatLng = { lat: number; lng: number };
type Coord2AddressResponse = {
    documents?: Array<{
        road_address?: { address_name?: string | null } | null;
        address?: { address_name?: string | null } | null;
    }>;
};

async function coordToAddressText(lat: number, lng: number) {
    const restKey = import.meta.env.VITE_KAKAO_REST_API_KEY as string | undefined;
    if (!restKey) return "현위치";

    const res = await fetch(
        `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${lng}&y=${lat}`,
        { headers: { Authorization: `KakaoAK ${restKey}` } }
    );

    if (!res.ok) return "현위치";

    const data = (await res.json()) as Coord2AddressResponse;
    const doc = data.documents?.[0];

    return (
        doc?.road_address?.address_name ??
        doc?.address?.address_name ??
        "현위치"
    );
}

export function usePickCurrentLocation(params: {
    searchTarget: SearchTarget;
    setMapCenter?: (pos: LatLng) => void;
    handleSelect: (target: SearchTarget, item: OriginSearchItem) => void;
}) {
    const { searchTarget, setMapCenter, handleSelect } = params;

    const { location, refetch, loading } = useCurrentLocation();

    const pickCurrentLocation = useCallback(async () => {
        const targetSnapshot = searchTarget;

        try {
            // 최신 위치 요청
            refetch();

            const pos = await new Promise<{ lat: number; lng: number }>((resolve, reject) => {
                if (location) {
                    resolve(location);
                    return;
                }
                if (!navigator.geolocation) {
                    reject(new Error("Geolocation not supported"));
                    return;
                }
                navigator.geolocation.getCurrentPosition(
                    (p) => resolve({ lat: p.coords.latitude, lng: p.coords.longitude }),
                    reject,
                    { enableHighAccuracy: false, timeout: 15000, maximumAge: 60000 }
                );
            });

            const { lat, lng } = pos;

            // 지도 센터 이동
            setMapCenter?.({ lat, lng });

            // 주소 변환
            const addressText = await coordToAddressText(lat, lng);

            // 선택 처리
            const item: OriginSearchItem = {
                id: "current",
                title: "현위치",
                address: addressText,
                lat,
                lng,
            };

            handleSelect(targetSnapshot, item);
        } catch {
            alert("현재 위치를 가져올 수 없습니다. 위치 권한을 확인해 주세요.");
        }
    }, [searchTarget, setMapCenter, handleSelect, refetch, location]);

    return { pickCurrentLocation, picking: loading };
}
