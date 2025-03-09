import { Outlet } from "react-router-dom"
import { HeaderComponent } from "../header/header"
import { CssBaseline } from "@mui/material"

export const ViewLayoutComponent = () => {
    return <>
    <CssBaseline></CssBaseline>
        <HeaderComponent></HeaderComponent>
        <div className="content">
            <Outlet></Outlet>
        </div>
    </>
}
