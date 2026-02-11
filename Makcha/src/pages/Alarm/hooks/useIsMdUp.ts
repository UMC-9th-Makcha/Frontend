import { useMediaQuery } from "../../../hooks/useMediaQuery";

export const useIsMdUp = () => {
    return useMediaQuery("(min-width: 768px)");
};
