import { Alert, AlertTitle } from "@mui/material";

export type ToastOptions = 'success' | 'error' | 'info' | 'warning'

type ToastProperties = {
    message: string;
    option: ToastOptions;
    close: () => void,
}

export function Toast({ message, option, close }: ToastProperties) {

    return (
        <Alert 
            variant="filled" 
            severity={option} 
            sx={{ 
                position: "fixed", 
                top: "0rem", 
                left: "50%", 
                // transform: "translateX(-50%)", 
                width: "auto", 
                height: 'auto', 
                zIndex: "10" 
            }} 
            data-testid="alert" 
            onClose={close}
        >
            <AlertTitle>{message}</AlertTitle>
        </Alert>
    )

}
