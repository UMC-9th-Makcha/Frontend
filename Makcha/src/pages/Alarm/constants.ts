import type { AlarmRoute } from "./types/alarm";

export const ROUTE_TYPE_LABEL: Record<AlarmRoute["routeType"], string> = {
    SUBWAY: "지하철",
    BUS: "버스",
    NIGHT_BUS: "심야버스",
};