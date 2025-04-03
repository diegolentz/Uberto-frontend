import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./views/login";
import { ViewLayoutComponent } from "./components/viewLayout/viewLayout";
import { Home } from "./views/home";
import { Profile } from "./views/profile/profile";
import { Trips } from "./views/profile/trips";
import { Data } from "./views/profile/data";
import { Ratings } from "./views/profile/ratings";
import { NotFound } from "./views/notFound";
import { ConfirmationPage } from "./views/confirmationPage";

export const AppRouter = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path='login'></Route>
                <Route element={<ViewLayoutComponent></ViewLayoutComponent>}>
                    <Route element={<Home />} path="Home"></Route>
                    <Route element={<ConfirmationPage />} path="confirmation-page"></Route>

                    <Route element={<Profile></Profile>} path="profile">
                        <Route element={<Data />} path="data"></Route>
                        <Route element={<Trips />} path="trips"></Route>
                        <Route element={<Ratings />} path="ratings"></Route>
                    </Route>
                </Route>

                <Route path="/" element={<Navigate to="/login"/>}></Route> 
                <Route path="*" element={<NotFound/>}></Route> 
            </Routes>
        </BrowserRouter>
    </>
};