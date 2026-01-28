export type LatLng = { lat: number; lng: number };

const ORIGIN: LatLng = { lat: 37.541, lng: 127.095 };
const DEST: LatLng = { lat: 37.592, lng: 126.995 };

export const ROUTE_PATHS_MOCK: Record<string, LatLng[]> = {
    r1: [
        ORIGIN,
        { lat: 37.545, lng: 127.085 },
        { lat: 37.553, lng: 127.070 },
        { lat: 37.560, lng: 127.050 },
        { lat: 37.566, lng: 127.025 },
        { lat: 37.570, lng: 127.010 },
        { lat: 37.583, lng: 127.000 },
        DEST,
    ],

    r2: [
        ORIGIN,
        { lat: 37.548, lng: 127.075 },
        { lat: 37.555, lng: 127.055 },
        { lat: 37.560, lng: 127.035 },
        { lat: 37.565, lng: 127.020 },
        { lat: 37.575, lng: 127.010 },
        { lat: 37.585, lng: 127.005 },
        DEST,
    ],

    r3: [
        ORIGIN,
        { lat: 37.555, lng: 127.090 },
        { lat: 37.565, lng: 127.080 },
        { lat: 37.575, lng: 127.065 },
        { lat: 37.583, lng: 127.045 },
        { lat: 37.590, lng: 127.020 },
        { lat: 37.595, lng: 127.000 },
        DEST, 
    ],
};
