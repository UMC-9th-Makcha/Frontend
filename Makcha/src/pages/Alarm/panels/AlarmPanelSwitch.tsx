import type { OriginSearchItem } from "../types/search";
import type { AlarmRoute } from "../types/alarm";
import type { RouteConfirmDetail } from "../types/routeConfirm";
import type { Step } from "../hooks/useAlarmFlow";
import AlarmPanel from "./AlarmPanel";
import RouteLoadingPanel from "./RouteLoadingPanel";
import RouteResultPanel from "./RouteResultPanel";
import RouteConfirmPanel from "./RouteConfirmPanel";
import AlarmSuccessPanel from "./AlarmSuccessPanel";

export type AlarmFlowUI = {
    step: Step;
    origin: OriginSearchItem | null;
    destination: OriginSearchItem | null;
    routes: AlarmRoute[];
    selectedRoute: AlarmRoute | null;

    getConfirmDetail: (routeId: string) => RouteConfirmDetail;

    openOriginSheet: () => void;
    openDestinationSheet: () => void;
    handleSelectDestinationFromPanel: (item: OriginSearchItem) => void;

    handleSelectRoute: (route: AlarmRoute) => void;

    backFromConfirm: () => void;
    confirmRoute: () => void | Promise<void>;
    goAlarmList: () => void;
    goToSettingForSms: () => void;

    isFromHistory?: boolean;
    deleteCurrentAlert?: () => void | Promise<void>;
    deletingAlert?: boolean;
};

type Props = { flow: AlarmFlowUI };

export default function AlarmPanelSwitch({ flow }: Props) {
    if (flow.step === "LOADING") return <RouteLoadingPanel open />;

    if (flow.step === "RESULT" && flow.origin && flow.destination) {
        return (
            <RouteResultPanel
                origin={flow.origin}
                destination={flow.destination}
                routes={flow.routes}
                onSelectRoute={flow.handleSelectRoute}
                onOpenOrigin={flow.openOriginSheet}         
                onOpenDestination={flow.openDestinationSheet}
            />
        );
    }

    if (flow.step === "CONFIRM" && flow.selectedRoute) {
        const isHistory = Boolean(flow.isFromHistory);

        return (
            <RouteConfirmPanel
                route={flow.selectedRoute}
                detail={flow.getConfirmDetail(flow.selectedRoute.id)}
                onBack={flow.backFromConfirm}

                // history면 "확인"은 그냥 history로 돌아가도록
                onConfirm={isHistory ? flow.goAlarmList : flow.confirmRoute}
                mode={isHistory ? "history" : "alarm"}

                // history 삭제 버튼
                onClickSms={flow.goToSettingForSms}
                onDeleteAlert={isHistory ? flow.deleteCurrentAlert : undefined}
                deleting={isHistory ? Boolean(flow.deletingAlert) : false}
            />
        );
    }

    if (flow.step === "SUCCESS" && flow.origin && flow.destination && flow.selectedRoute) {
        return (
            <AlarmSuccessPanel
                origin={flow.origin}
                destination={flow.destination}
                route={flow.selectedRoute}
                onGoAlarmList={flow.goAlarmList}
            />
        );
    }

    return (
        <AlarmPanel
            origin={flow.origin}
            destination={flow.destination}
            onOpenOrigin={flow.openOriginSheet}
            onOpenDestination={flow.openDestinationSheet}
            onSelectDestination={flow.handleSelectDestinationFromPanel}
        />
    );
}