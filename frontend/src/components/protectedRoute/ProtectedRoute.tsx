import type React from "react";
import { Navigate, Outlet, useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { useEffect } from "react";
import { logout } from "../../features/authentication/authentication";

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.authentication);
    const token = sessionStorage.getItem("token");

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!token) {
            dispatch(logout());
            navigate("/auth", { replace: true });
        }
    }, [token])

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }

    return <Outlet />;
}

export default ProtectedRoute