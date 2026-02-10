export const formatHHMM = (iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
};

export const formatMinutesLeftText = (minutesLeft: number) => {
    if (!Number.isFinite(minutesLeft)) return "";
    if (minutesLeft <= 0) return "지금 출발";

    const h = Math.floor(minutesLeft / 60);
    const m = minutesLeft % 60;

    if (h <= 0) return `출발까지 ${m}분`;
    if (m === 0) return `출발까지 ${h}시간`;
    return `출발까지 ${h}시간 ${m}분`;
};

export const formatEtaText = (iso?: string) => {
    const hhmm = formatHHMM(iso);
    return hhmm ? `${hhmm} 도착` : "";
};
