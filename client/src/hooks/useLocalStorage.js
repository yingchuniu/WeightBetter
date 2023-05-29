import { useState } from "react";

export const useLocalStorage = (token, defaultValue) => {
    const [storedToken, setStoredToken] = useState(() => {
        // 檢查 localStorage 是否已有 JWT token
        try {
            const token = localStorage.getItem("user");
            if (token) {
                return JSON.parse(token);
            } else {
                // 沒有則建立一個自己定義token
                localStorage.setItem(token, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    // update setter for JWT token
    const setToken = (newToken) => {
        try {
            localStorage.setItem(token, JSON.stringify(newToken));
        } catch (err) {}
        setStoredToken(newToken);
    };

    return [storedToken, setToken];
};
