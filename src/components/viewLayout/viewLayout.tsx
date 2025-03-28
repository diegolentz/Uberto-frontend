import { AxiosResponse } from "axios"
import { createContext, useState } from "react"
import { Outlet } from "react-router-dom"
import { HeaderComponent } from "../header/header"
import Toast from "../toast/toast"
import { NavBar } from "../navBar/navBar"
import "./viewLayout.css"
export const msjContext = createContext({} as {showToast: (data: AxiosResponse)=>void})


export const ViewLayoutComponent = () => {
    const [toast, setToast] = useState<AxiosResponse>({status:0, data:''} as AxiosResponse)

    const showToast = (res: AxiosResponse) =>{
        setToast(res ? res : {status:500, data:{message:'Error de conexión'}} as AxiosResponse)
        setTimeout(()=>{
            setToast({status:0, data:''} as AxiosResponse)
        },3000)
    }

    return <>
        <HeaderComponent></HeaderComponent>
            <Toast res={toast}/>
            <msjContext.Provider value={{showToast}}>
                <Outlet />
            </msjContext.Provider>
        <NavBar></NavBar>
    </>
}
