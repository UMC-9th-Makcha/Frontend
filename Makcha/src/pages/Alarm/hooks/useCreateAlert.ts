import { useMutation } from "@tanstack/react-query";
import { createAlert, type CreateAlertBody } from "../apis/alerts";

export function useCreateAlert() {
    return useMutation({
        mutationFn: (body: CreateAlertBody) => createAlert(body),
    });
}