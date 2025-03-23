import { Alert, AlertTitle } from "@mui/material";

export type ToastOptions = 'success' | 'error' | 'info' | 'warning'

type ToastProperties = {
    message: string;
    option: ToastOptions;
    close: () => void,
}

export function Toast({ message, option, close }: ToastProperties) {

    return (
        <Alert variant="filled" severity={option} sx={{ position: "absolute", width: "auto", height: 'auto', right: "0", top: "0rem", zIndex: "10" }} data-testid="alert" onClose={close}>
            <AlertTitle>{message}</AlertTitle>
        </Alert>
    )

}

