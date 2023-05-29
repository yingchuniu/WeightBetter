import { useMemo, createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./useLocalStorage";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // 自訂類useState hook 檢測 localStorage user token
    const [currentUser, setCurrentUser] = useLocalStorage("user", null);
    // const [currentUser, setCurrentUser] = useState();
    const navigate = useNavigate();

    // TODO: 登入驗證
    const userLogin = async (user) => {
        setCurrentUser(user);
        navigate("/");
    };

    // TODO: 結合services authentication
    const userLogout = () => {
        setCurrentUser(null);
        navigate("/", { replace: true });
    };

    // 同一個使用者時 頁面更動時不重新讀取function
    const value = useMemo(
        () => ({
            currentUser,
            userLogin,
            userLogout,
        }),
        [currentUser]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// consumer custom hook
export const useAuth = () => {
    return useContext(AuthContext);
};
