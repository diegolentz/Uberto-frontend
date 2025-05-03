import { createContext, ReactNode, useMemo, useState } from "react"
import { Toast, ToastOptions } from "../../components/toast/toastAdrian"
import { AxiosError, AxiosResponse } from "axios"



type ToastContextType = {
    open: (message: string, type: ToastOptions) => void,
    openAxiosToast: (res:AxiosResponse) => void,
    // openAxiosError: (res:unknown) => void,
    close: (id: number) => void,
}

export const ToastContext = createContext<(ToastContextType | undefined)>(undefined)

type ToastType = {
    message: string,
    id: number,
    type: ToastOptions
}
export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [toasts, setToasts] = useState<ToastType[]>([]);

    const newToast = (message: string, type: ToastOptions): ToastType => {
        return {
            id: Date.now(),
            type: type,
            message: message

        }
    }

    function openToast(message: string, type: ToastOptions): void {
        const toast = newToast(message, type)
        setToasts((prevToasts) => [...prevToasts, toast])
        setTimeout(() => {
            closeToast(toast.id);
        }, 3000);
    }

    function openAxiosToast(res:AxiosResponse): void {
        // const message = res.status >= 200 && res.status < 300 ? res.data : res.data.message
        
        // {status:500, data:{message:'Error de conexión'}} as AxiosResponse
        const res2 = res.data ? res.data : ({status:500, data:{message:'Error de conexión'}} as AxiosResponse)
        const status:ToastOptions = (res2.status >= 200 && res2.status <=299) ? 'success' : 'error'
        const toast = newToast(res2.data.message, status)
        setToasts((prevToasts) => [...prevToasts, toast])
        setTimeout(() => {
            closeToast(toast.id);
        }, 3000);
    }

    // function openAxiosError(error:unknown): void {
    //     const parsedError:AxiosError<unknown> = (error as AxiosError<unknown>)
    //     const axiosResponse:AxiosResponse = parsedError.response!
    //     const message:string = axiosResponse.data.message
    //     const toast = newToast(message, 'error')
    //     setToasts((prevToasts) => [...prevToasts, toast])
    //     setTimeout(() => {
    //         closeToast(toast.id);
    //     }, 3000);
    // }

    function closeToast(id: number): void {
        setToasts((prevToasts) =>
            prevToasts.filter((toast) => toast.id !== id)
        )
    }

    const contextValue = useMemo(() => ({
        open: openToast,
        openAxiosToast: openAxiosToast,
        // openAxiosError: openAxiosError,
        close: closeToast
    }), [])
    return (
        <>
            <ToastContext.Provider value={contextValue}>
                {children}
                {toasts && toasts.map(
                    (toast) => {
                        return (
                            <Toast key={toast.id} message={toast.message} option={toast.type} close={()=>closeToast(toast.id)} />
                        )
                    }
                )}
            </ToastContext.Provider>
        </>
    );

};