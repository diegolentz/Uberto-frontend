import { Outlet } from "react-router-dom"
import { HeaderComponent } from "../header/header"

export const ViewLayoutComponent = () => {
    return <>
        <HeaderComponent></HeaderComponent>
        <div className="content">
            <Outlet></Outlet>
        </div>
    </>
}
