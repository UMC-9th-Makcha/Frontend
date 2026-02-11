import { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import BaseMap from "../../components/common/Map";
import type { AlarmRoute } from "./types/alarm";
import type { MapMarker, MapPathSegment, PathType, MapPoint } from "../../types/map";
import { fetchRoutePolylines } from "./apis/routes";
import type { CandidateStep } from "./hooks/useAlarmFlow";

type Props = {
    routes: AlarmRoute[];
    selectedRouteId: string | null;
    historySteps?: CandidateStep[];
};

type LatLng = MapPoint;

type Segment = {
    id: string;
    routeId: string;
    type: PathType;
    points: LatLng[];
};

type PolylinePathLocal = {
    class: number;
    type: number;
    map_type?: string;
    order?: number;
    points: LatLng[];
};

const sqDist = (a: LatLng, b: LatLng) => {
    const dx = a.lat - b.lat;
    const dy = a.lng - b.lng;
    return dx * dx + dy * dy;
};

const startPt = (p: PolylinePathLocal) => p.points[0];
const endPt = (p: PolylinePathLocal) => p.points[p.points.length - 1];

function reorderPathsForMap(paths: PolylinePathLocal[]): PolylinePathLocal[] {
    const walk = paths
        .filter(
            (p) =>
                p.map_type === "WALK" &&
                (p.points?.length ?? 0) >= 2 &&
                Number.isFinite(p.order)
        )
        .slice()
        .sort((a, b) => a.order! - b.order!);

    const transit = paths.filter(
        (p) => p.map_type !== "WALK" && (p.points?.length ?? 0) >= 2
    );

    if (walk.length === 0) return transit;
    if (transit.length === 0) return walk;

    const out: PolylinePathLocal[] = [];

    const startWalk = walk[0];
    const endWalk = walk.length >= 2 ? walk[walk.length - 1] : undefined;
    const midWalks = walk.slice(1, endWalk ? -1 : 1);

    out.push(startWalk);

    const inserts: Array<{ idx: number; w: PolylinePathLocal }> = [];

    for (const w of midWalks) {
        if (transit.length === 1) {
            inserts.push({ idx: 1, w });
            continue;
        }

        let bestIdx = 1;
        let bestCost = Number.POSITIVE_INFINITY;

        for (let i = 0; i < transit.length - 1; i++) {
            const prev = transit[i];
            const next = transit[i + 1];

            const cost =
                sqDist(endPt(prev), startPt(w)) + sqDist(endPt(w), startPt(next));

            if (cost < bestCost) {
                bestCost = cost;
                bestIdx = i + 1;
            }
        }

        inserts.push({ idx: bestIdx, w });
    }
    inserts.sort((a, b) => a.idx - b.idx || a.w.order! - b.w.order!);

    const merged = transit.slice();
    let shift = 0;
    for (const ins of inserts) {
        merged.splice(ins.idx + shift, 0, ins.w);
        shift += 1;
    }

    out.push(...merged);

    if (endWalk) out.push(endWalk);

    return out;
}

const SUPPORTED_SUBWAY_TYPES = new Set<number>([
    1, 2, 3, 4, 5, 6, 7, 8, 9,
    91,
    101, 102, 104, 107, 108, 109, 110, 112, 113, 114, 115, 116, 117,
]);

function normalizeMapType(raw?: string): PathType {
    if (!raw) return "WALK";

    if (raw === "WALK") return "WALK";

    if (
        raw === "BUS_RED" ||
        raw === "BUS_BLUE" ||
        raw === "BUS_GREEN" ||
        raw === "BUS_VILLAGE" ||
        raw === "BUS_GYEONGGI" ||
        raw === "BUS_SKY" ||
        raw === "BUS_ORANGE" ||
        raw === "BUS"
    ) {
        return raw as PathType;
    }
    if (raw === "SUBWAY_SUIN") return "SUBWAY_SUIN";

    if (raw.startsWith("SUBWAY_")) {
        const n = Number(raw.slice("SUBWAY_".length));
        if (Number.isFinite(n) && SUPPORTED_SUBWAY_TYPES.has(n)) {
            return raw as PathType;
        }
        return "WALK";
    }

    return "WALK";
}

export default function KakaoMapView({ routes, selectedRouteId, historySteps }: Props) {
    const cacheRef = useRef(new Map<string, Segment[]>()); // key = routeToken
    const [routeSegMap, setRouteSegMap] = useState<Record<string, Segment[]>>({});
    const genRef = useRef(0);

    useEffect(() => {
        genRef.current += 1;
        const gen = genRef.current;

        if (!routes || routes.length === 0) {
            queueMicrotask(() => setRouteSegMap({}));
            return;
        }

        let alive = true;

        const run = async () => {
            const settled = await Promise.allSettled(
                routes.map(async (r) => {
                    const cached = cacheRef.current.get(r.routeToken);
                    if (cached) return { routeId: r.id, segments: cached };

                    const res = await fetchRoutePolylines(r.routeToken);
                    const rawPaths = (res.paths ?? []) as unknown as PolylinePathLocal[];
                    const ordered = reorderPathsForMap(rawPaths);
                    const segments: Segment[] = ordered
                        .filter((p) => (p.points?.length ?? 0) >= 2)
                        .map((p, idx) => ({
                            id: `${r.id}-seg-${idx}`,
                            routeId: r.id,
                            type: normalizeMapType(p.map_type),
                            points: p.points as LatLng[],
                        }));

                    cacheRef.current.set(r.routeToken, segments);
                    return { routeId: r.id, segments };
                })
            );

            if (!alive || gen !== genRef.current) return;

            const next: Record<string, Segment[]> = {};

            for (const s of settled) {
                if (s.status === "fulfilled") {
                    next[s.value.routeId] = s.value.segments;
                } else {
                    if (axios.isAxiosError(s.reason)) {
                        console.warn(
                            "[polylines] skip",
                            s.reason.response?.status,
                            s.reason.response?.data
                        );
                    } else {
                        console.warn("[polylines] skip (unknown)", s.reason);
                    }
                }
            }

            setRouteSegMap(next);
        };

        run().catch((e) => {
            if (!alive || gen !== genRef.current) return;
            console.error("[polylines] unexpected", e);
            setRouteSegMap({});
        });

        return () => {
            alive = false;
        };
    }, [routes]);

    const paths: MapPathSegment[] = useMemo(() => {
        if (historySteps && historySteps.length > 0) {
            const out: MapPathSegment[] = [];

            historySteps.forEach((s, idx) => {
                const pts = (s.points ?? []) as LatLng[];
                if (pts.length < 2) return;

                out.push({
                    id: `history-seg-${idx}`,
                    type: normalizeMapType(s.type),
                    points: pts,
                });
            });

            return out;
        }

        const out: MapPathSegment[] = [];

        for (const r of routes) {
            const segs = routeSegMap[r.id] ?? [];
            for (const seg of segs) {
                out.push({
                    id: seg.routeId,
                    type: seg.type,
                    points: seg.points,
                });
            }
        }

        return out;
    }, [routes, routeSegMap, historySteps]);

    const markers: MapMarker[] = useMemo(() => {
        const out: MapMarker[] = [];

        if (historySteps && historySteps.length > 0) {
            const pts = historySteps.flatMap((s) => s.points ?? []) as LatLng[];
            const first = pts[0];
            const last = pts[pts.length - 1];

            if (!first || !last) return out;

            out.push({ id: "start", name: "출발", variant: "start", position: first });
            out.push({ id: "end", name: "도착", variant: "end", position: last });

            return out;
        }

        const baseRoute =
            (selectedRouteId && routes.find((r) => r.id === selectedRouteId)) ||
            routes.find((r) => r.isOptimal) ||
            routes[0];

        if (!baseRoute) return out;

        const segs = routeSegMap[baseRoute.id] ?? [];
        const first = segs[0]?.points?.[0];
        const last = segs[segs.length - 1]?.points?.[
            segs[segs.length - 1]?.points.length - 1
        ];

        if (!first || !last) return out;

        out.push({ id: "start", name: "출발", variant: "start", position: first });
        out.push({ id: "end", name: "도착", variant: "end", position: last });

        return out;
    }, [routes, routeSegMap, selectedRouteId, historySteps]);

    return <BaseMap markers={markers} paths={paths} selectedPathId={selectedRouteId} />;
}