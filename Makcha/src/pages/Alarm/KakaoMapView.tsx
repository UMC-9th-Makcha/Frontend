import { Map, Polyline, MapMarker, useKakaoLoader } from "react-kakao-maps-sdk";
import { useEffect, useMemo, useState } from "react";
import type { AlarmRoute } from "./types/alarm";
import { ROUTE_PATHS_MOCK, type LatLng } from "./mocks/routePathsMock";

type Props = {
    center: LatLng;
    routes: AlarmRoute[];
    selectedRouteId: string | null;
    onSelectRoute: (routeId: string) => void;
};

export default function KakaoMapView({
    center,
    routes,
    selectedRouteId,
    onSelectRoute,
}: Props) {
    const [loading, error] = useKakaoLoader({
        appkey: import.meta.env.VITE_KAKAO_JS_KEY,
    });

    const [map, setMap] = useState<kakao.maps.Map | null>(null);

    const selectedPath = selectedRouteId ? ROUTE_PATHS_MOCK[selectedRouteId] : null;
    const start = selectedPath?.[0];
    const end = selectedPath?.[selectedPath.length - 1];

    // 선택된 경로의 bounds 계산
    const selectedBounds = useMemo(() => {
        if (!selectedPath || selectedPath.length < 2) return null;
        const bounds = new kakao.maps.LatLngBounds();
        selectedPath.forEach((p) => bounds.extend(new kakao.maps.LatLng(p.lat, p.lng)));
        return bounds;
    }, [selectedPath]);

    // 경로가 생기거나 선택이 바뀌면 경로가 보이게 이동
    useEffect(() => {
        if (!map || !selectedBounds) return;
        map.setBounds(selectedBounds);
    }, [map, selectedBounds]);

    if (loading) return <div className="h-full w-full" />;
    if (error) return <div className="h-full w-full">지도 로드 실패</div>;

    return (
        <Map
            center={center}
            level={5}
            style={{ width: "100%", height: "100%" }}
            isPanto
            onCreate={setMap}
        >
            {routes.map((r) => {
                const path = ROUTE_PATHS_MOCK[r.id];
                if (!path || path.length < 2) return null;

                const isSelected = r.id === selectedRouteId;

                // 야간버스: 주황, 버스: 파랑, 지하철: 초록
                const activeColor =
                    r.routeType === "NIGHT_BUS"
                        ? "#FF7A00"
                        : r.routeType === "BUS"
                            ? "#2F6BFF"
                            : "#13A34A";

                return (
                    <Polyline
                        key={r.id}
                        path={path}
                        strokeWeight={8}
                        strokeColor={isSelected ? activeColor : "#9CA3AF"}
                        strokeOpacity={isSelected ? 0.95 : 0.85}
                        strokeStyle="solid"
                        onClick={() => onSelectRoute(r.id)}
                    />
                );
            })}

            {start && <MapMarker position={start} />}
            {end && <MapMarker position={end} />}
        </Map>
    );
}