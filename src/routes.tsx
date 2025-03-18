import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./views/login";
import { ViewLayoutComponent } from "./components/viewLayout/viewLayout";
import { Home } from "./views/home";
import { ConfirmationPage } from "./components/confirmationPage/confirmationPage";
import { Profile } from "./views/profile";
import { Trips } from "./components/profile/trips";
import { Data } from "./components/profile/data";
import { Ratings } from "./components/profile/ratings";

export const AppRouter = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path='login'></Route>
                <Route element={<ViewLayoutComponent></ViewLayoutComponent>}>
                    <Route element={<Home />} path="Home"></Route>
                    <Route element={<Profile></Profile>} path="profile">
                        <Route element={<Data />} path="data"></Route>
                        <Route element={<Trips />} path="trips"></Route>
                        <Route element={<Ratings />} path="ratings"></Route>
                    </Route>
                    {/* <Route element = {<ConfirmationPage/>} path="confirmation-page"></Route>  */}
                    <Route></Route> {/*  */}
                </Route>

                <Route path="*" element={<Navigate to={'/login'} replace />}></Route> {/* para redireccionar a alguna ruta por default */}

            </Routes>
        </BrowserRouter>
    </>
};