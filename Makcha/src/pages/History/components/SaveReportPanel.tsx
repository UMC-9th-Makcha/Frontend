import type { HistoryItem } from "../types/history";
import SaveReportPanelShell from "./SaveReportPanelShell";
import SaveReportPanelContent from "./SaveReportPanelContent";

type ChartPoint = { month: string; value: number; highlight?: boolean };

type Props = {
    open: boolean;
    onClose: () => void;
    totalSavedAmount: number;
    items: HistoryItem[];
    loading?: boolean;
    yearLabel?: string;
    chartData?: ChartPoint[];
};

const COFFEE_PRICE = 5000;
const CHICKEN_PRICE = 25000;

const makeRewardMessage = (totalSavedAmount: number) => {
    if (totalSavedAmount <= 0) return "알림을 설정해보세요!";

    if (totalSavedAmount < COFFEE_PRICE) {
        return "커피 한 잔 값에 가까워요!";
    }

    if (totalSavedAmount < CHICKEN_PRICE) {
        const coffeeCount = Math.floor(totalSavedAmount / COFFEE_PRICE);
        return `커피 ${coffeeCount}잔 값이에요!`;
    }

    const chickenCount = Math.floor(totalSavedAmount / CHICKEN_PRICE);
    return `치킨 ${chickenCount}마리 값이에요!`;
};

const SaveReportPanel = ({
    open,
    onClose,
    totalSavedAmount,
    items,
    loading,
    yearLabel,
    chartData = [],
}: Props) => {
    if (!open) return null;

    const totalCount = items.length;
    const isEmpty = totalSavedAmount === 0;

    const rewardMessage = makeRewardMessage(totalSavedAmount);
    const graphYearLabel = yearLabel ?? `${new Date().getFullYear()}년`;

    return (
        <SaveReportPanelShell onClose={onClose}>
            <SaveReportPanelContent
                loading={loading}
                onClose={onClose}
                totalSavedAmount={totalSavedAmount}
                rewardMessage={rewardMessage}
                isEmpty={isEmpty}
                totalCount={totalCount}
                yearLabel={graphYearLabel}
                chartData={chartData}
                items={items}
            />
        </SaveReportPanelShell>
    );
};

export default SaveReportPanel;