import { BrowserRouter, Navigate, Route, Routes, Outlet } from "react-router-dom";
import { Login } from "./views/login";
import { ViewLayoutComponent } from "./components/viewLayout/viewLayout";
import { Home } from "./views/home";
import { Profile } from "./views/profile/profile";
import { Trips } from "./views/profile/trips";
import { Data } from "./views/profile/data";
import { Ratings } from "./views/profile/ratings";
import { NotFound } from "./views/notFound";
import { ConfirmationPage } from "./views/confirmationPage";

const useAuth = (): boolean => {
    const token = localStorage.getItem("token");
    return !!token;
};

const PrivateRoute = () => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? <Navigate to="/home" /> : <Outlet />;
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Route>

                {/* Rutas privadas */}
                <Route element={<PrivateRoute />}>
                    <Route element={<ViewLayoutComponent />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="/confirmation-page" element={<ConfirmationPage />} />
                        <Route path="/profile" element={<Profile />}>
                            <Route path="data" element={<Data />} />
                            <Route path="trips" element={<Trips />} />
                            <Route path="ratings" element={<Ratings />} />
                        </Route>
                    </Route>
                </Route>

                {/* Ruta para 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};