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
    const token = localStorage.getItem("token"); // Verifica si hay un token en localStorage
    return !!token; // Devuelve true si hay un token, false si no
};

// Componentes para manejar rutas privadas y públicas
const PrivateRoute = () => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" />; // Si no está autenticado, redirige al login
};

const PublicRoute = () => {
    const isAuthenticated = useAuth();
    return isAuthenticated ? <Navigate to="/home" /> : <Outlet />; // Si está autenticado, redirige al home
};

// Configuración del enrutador
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