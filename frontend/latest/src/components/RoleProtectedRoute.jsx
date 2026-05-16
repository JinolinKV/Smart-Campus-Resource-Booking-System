import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const RoleProtectedRoute = ({ role }) => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (!user) {
        return <Navigate to="/" />;
    }

    if (user.role !== role) {
        return <Navigate to="/dashboard" />;
    }

    return <Outlet />;
};

export default RoleProtectedRoute;