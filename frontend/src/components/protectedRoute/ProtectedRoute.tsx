import type React from "react";
import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../app/hook";

const ProtectedRoute: React.FC = () => {
    const { isAuthenticated } = useAppSelector((state) => state.authentication);

    if (!isAuthenticated) {
        return <Navigate to="/auth" replace />
    }

    return <Outlet />;
}

export default ProtectedRoute