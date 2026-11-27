import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { apiFetch } from "../service/api";

function RotaProtegida() {
    const [autenticado, setAutenticado] = useState<boolean | null>(null);

    useEffect(() => {
        if (!localStorage.getItem("access_token")) {
            setAutenticado(false);
            return;
        }

        apiFetch("/auth/profile")
            .then((r) => setAutenticado(r.ok))
            .catch(() => setAutenticado(false));
    }, []);

    if (autenticado === null) return null;
    return autenticado ? <Outlet /> : <Navigate to="/login" replace />;
}

export default RotaProtegida;