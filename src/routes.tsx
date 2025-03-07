import { BrowserRouter, Navigate, Route,  Routes } from "react-router-dom";
import { Login } from "./views/login";

export const AppRouter = () => {
    return <>
        <BrowserRouter>
            <Routes>
                <Route element={<Login />} path='login'></Route>
                <Route> {/* para layout */}
                    <Route></Route> {/*  */}
                    <Route></Route> {/*  */}
                    <Route></Route> {/*  */}
                    <Route></Route> {/*  */}
                </Route>

                <Route path="*" element={<Navigate to = {'/login'} replace/>}></Route> {/* para redireccionar a alguna ruta por default */}

            </Routes>
        </BrowserRouter>
    </>
};