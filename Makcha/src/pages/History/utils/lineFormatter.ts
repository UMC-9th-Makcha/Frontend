const LINE_SHORT_NAME: Record<string, string> = {
    "GTX-A": "GTX",
    "공항철도": "공항",
    "자기부상철도": "자기부상",
    "경의중앙선": "경의",
    "에버라인": "에버",
    "경춘선": "경춘",
    "신분당선": "신분당",
    "의정부경전철": "의정부",
    "경강선": "경강",
    "우이신설선": "우이",
    "서해선": "서해",
    "김포골드라인": "김포",
    "수인분당선": "수인",
    "신림선": "신림",
};

export const getDisplayLineName = (line: string) => {
    if (!line) return line;

    const metroMatch = line.match(/\d+호선/);
    if (metroMatch) {
        return metroMatch[0];
    }

    return LINE_SHORT_NAME[line] ?? line;
};
