import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./views/login";
import { ViewLayoutComponent } from "./components/viewLayout/viewLayout";
import { Home } from "./views/home";
import { ConfirmationPage } from "./components/confirmationPage/confirmationPage";

export const AppRouter = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path='login'></Route>
                <Route element={<ViewLayoutComponent></ViewLayoutComponent>}>
                    <Route element={<Home/>} path="Home"></Route> 
                    {/* <Route element = {<ConfirmationPage/>} path="confirmation-page"></Route>  */}
                    <Route></Route> {/*  */}
                    <Route></Route> {/*  */}
                </Route>

                <Route path="*" element={<Navigate to={'/login'} replace />}></Route> {/* para redireccionar a alguna ruta por default */}

            </Routes>
        </BrowserRouter>
    </>
};