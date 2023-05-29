import React from "react";
import { Typography } from "@mui/material";
// components
import AuthWrapper from "./AuthWrapper";
import RegisterForm from "./forms/RegisterForm";
// hooks
import { useAuth } from "@/hooks/AuthContext";
import { Navigate } from "react-router-dom";

const Register = () => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return <Navigate to={`/${currentUser.username}`} />;
    }
    return (
        <AuthWrapper>
            {/* <Typography variant="h3" fontWeight={500} color="initial" marginY={3}>
                註冊
            </Typography> */}
            <RegisterForm />
        </AuthWrapper>
    );
};

export default Register;
