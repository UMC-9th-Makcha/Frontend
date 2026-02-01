import { useMemo } from "react";
import type { AlarmRoute } from "./types/alarm";
import { ROUTE_PATHS_MOCK } from "./mocks/routePathsMock";
import BaseMap from "./../../components/common/Map";
import type { MapMarker, MapPathSegment, PathType } from "./../../types/map";

type Props = {
    routes: AlarmRoute[];
    selectedRouteId: string | null;
};

function toPathType(routeType: AlarmRoute["routeType"]): PathType {
    switch (routeType) {
        case "SUBWAY":
            // 실제 노선(1~9) 분기
            return "SUBWAY_2";
        case "BUS":
            return "BUS_BLUE";
        case "NIGHT_BUS":
            return "BUS_RED";
        default:
            return "WALK";
    }
}

export default function KakaoMapView({ routes,selectedRouteId }: Props) {
    const selectedPath = selectedRouteId ? ROUTE_PATHS_MOCK[selectedRouteId] : null;
    const start = selectedPath?.[0];
    const end = selectedPath?.[selectedPath.length - 1];

    const markers: MapMarker[] = useMemo(() => {
        const out: MapMarker[] = [];
        if (start) {
            out.push({
                id: "start",
                name: "출발",
                variant: "start",
                position: start,
            });
        }
        if (end) {
            out.push({
                id: "end",
                name: "도착",
                variant: "end",
                position: end,
            });
        }
        return out;
    }, [start, end]);

    const paths: MapPathSegment[] = useMemo(() => {
        return routes.map((r) => {
                const pts = ROUTE_PATHS_MOCK[r.id];
                if (!pts || pts.length < 2) return null;

                return {
                    id: r.id,
                    type: toPathType(r.routeType),
                    points: pts,
                } as MapPathSegment;
            }).filter(Boolean) as MapPathSegment[];
    }, [routes]);

    return (
        <BaseMap
            markers={markers}
            paths={paths}
            selectedPathId={selectedRouteId}
        />
    );
}
