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
    confirmRoute: () => void;
    goAlarmList: () => void;
    goToSettingForSms: () => void;
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
            />
        );
    }

    if (flow.step === "CONFIRM" && flow.selectedRoute) {
        return (
            <RouteConfirmPanel
                route={flow.selectedRoute}
                detail={flow.getConfirmDetail(flow.selectedRoute.id)}
                onBack={flow.backFromConfirm}
                onConfirm={flow.confirmRoute}
                onClickSms={flow.goToSettingForSms}
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
