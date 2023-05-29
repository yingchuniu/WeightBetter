import axios from "axios";

// 關於驗證的api
class AuthService {
    localLogin(loginData) {
        return axios.post(process.env.REACT_APP_API_KEY + "/auth/login", loginData);
    }
    googleLogin() {
        window.location.assign(process.env.REACT_APP_API_KEY + "/auth/google");
        // return axios.post(process.env.REACT_APP_API_KEY + "/auth/google/login", loginData);
    }

    githubLogin() {
        window.location.assign(process.env.REACT_APP_API_KEY + "/auth/github");
    }

    facebookLogin() {
        window.location.assign(process.env.REACT_APP_API_KEY + "/auth/facebook");
    }

    logout() {
        localStorage.removeItem("user");
        localStorage.removeItem("cart");
    }
    register(formData) {
        return axios.post(process.env.REACT_APP_API_KEY + "/user/register", formData);
    }

    checkUsername(username) {
        return axios.post(process.env.REACT_APP_API_KEY + "/user/register/checkusername", { username: username });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();
