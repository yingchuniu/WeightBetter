import React from "react";
import { useAuth } from "../../hooks/AuthContext";
import { Navigate } from "react-router-dom";

//**! For 未登入不能看的頁面 */
const AuthRequired = ({ children }) => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        return <Navigate to="/login" />;
    }
    return children;
};

export default AuthRequired;
