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

// Hook para verificar si el usuario está autenticado
const useAuth = (): boolean => {
    const token = localStorage.getItem("token"); 
    return !!token; 
};

// Componente para rutas privadas
const PrivateRoute = () => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Si está autenticado, renderiza el componente; si no, redirige al login
};

// Componente para rutas públicas
const PublicRoute = () => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? <Navigate to="/home" /> : <Outlet />; // Si ya está autenticado, redirige al home; si no, renderiza el componente
};

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rutas públicas */}
                <Route element={<PublicRoute />}>
                    <Route element={<Login />} path="login" />
                    <Route path="/" element={<Navigate to="/login" />} />
                </Route>

                {/* Rutas privadas */}
                <Route element={<PrivateRoute />}>
                    <Route element={<ViewLayoutComponent />}>
                        <Route element={<Home />} path="home" />
                        <Route element={<ConfirmationPage />} path="confirmation-page" />
                        <Route element={<Profile />}>
                            <Route element={<Data />} path="data" />
                            <Route element={<Trips />} path="trips" />
                            <Route element={<Ratings />} path="ratings" />
                        </Route>
                    </Route>
                </Route>

                {/* Ruta para 404 */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </BrowserRouter>
    );
};