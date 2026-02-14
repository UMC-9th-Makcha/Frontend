export const toKoreanDate = (iso: string) => {
    const d = new Date(iso);
    const yy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const dd = String(d.getDate()).padStart(2, "0");
    return `${yy}. ${mm}. ${dd}`;
};

export const toHHMM = (iso: string) => {
    const d = new Date(iso);
    const hh = String(d.getHours()).padStart(2, "0");
    const mi = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mi}`;
};

export const toUntilText = (min: number) => {
    if (min <= 0) return "곧 출발";

    const hours = Math.floor(min / 60);
    const minutes = min % 60;

    if (hours === 0) return `출발까지 ${minutes}분`;
    if (minutes === 0) return `출발까지 ${hours}시간`;
    return `출발까지 ${hours}시간 ${minutes}분`;
};

export const toMonthLabel = (yyyyMm: string) => `${Number(yyyyMm.split("-")[1])}월`;