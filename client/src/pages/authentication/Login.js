import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/AuthContext";
// components
import AuthWrapper from "./AuthWrapper";
import LoginForm from "./forms/LoginForm";
import { Typography, Divider } from "@mui/material";

const Login = () => {
    const { currentUser } = useAuth();

    if (currentUser) {
        return <Navigate to="/" />;
    }
    return (
        <>
            <AuthWrapper>
                <Typography variant="h2" color="initial" fontWeight="500" marginY={2}>
                    登入
                </Typography>
                <LoginForm />
                <div className="flex flex-col mt-3">
                    <Link to="/register" className="text-gray font-semibold">
                        <Typography variant="h5" sx={{ color: "neutral.main", fontWeight: "500" }}>
                            建立帳號？
                        </Typography>
                    </Link>
                    <Divider orientation="vertical" />
                    {/* <Link to="/forgot" className="text-gray font-semibold text-xs">
                        找回密碼？
                    </Link> */}
                </div>
            </AuthWrapper>
        </>
    );
};

export default Login;
