import axios from "axios";

// 關於使用者資料的api
class UserService {
    userProfile(username) {
        // console.log(JSON.parse(localStorage.getItem("user")).token);
        let config = { headers: { Authorization: JSON.parse(localStorage.getItem("user"))?.token } };

        return axios.get(`${process.env.REACT_APP_API_KEY}/user/find/${username}`, config);
    }

    userFollowing(username) {
        return axios.get(`${process.env.REACT_APP_API_KEY}/user/find/${username}/following`);
    }

    userFollowers(username) {
        return axios.get(`${process.env.REACT_APP_API_KEY}/user/find/${username}/followers`);
    }

    updateUser(id, data) {
        return axios.post(`${process.env.REACT_APP_API_KEY}/user/update/profile/${id}`, data);
    }

    userOrders(username) {
        return axios.get(`${process.env.REACT_APP_API_KEY}/user/find/${username}/orders`);
    }

    userFollow(following_username, follower_id) {
        let config = { headers: { Authorization: JSON.parse(localStorage.getItem("user"))?.token } };

        return axios.post(
            `${process.env.REACT_APP_API_KEY}/user/follow`,
            {
                follower_id: follower_id,
                following_username: following_username,
            },
            config
        );
    }

    userDelFan(follower_username, following_id) {
        return axios.post(`${process.env.REACT_APP_API_KEY}/user/deletefan`, {
            follower_username: follower_username,
            following_id: following_id,
        });
    }

    userAvatar(username, fileData) {
        return axios.post(`${process.env.REACT_APP_API_KEY}/user/upload/avatar/${username}`, fileData);
    }

    userChangePassword(passwordObj) {
        let config = { headers: { Authorization: JSON.parse(localStorage.getItem("user"))?.token } };
        return axios.post(`${process.env.REACT_APP_API_KEY}/user/update/password`, passwordObj, config);
    }

    userAddress() {
        let config = { headers: { Authorization: JSON.parse(localStorage.getItem("user"))?.token } };
        return axios.get(`${process.env.REACT_APP_API_KEY}/user/get/address`, config);
    }

    userUpdateAddress(formData) {
        let config = { headers: { Authorization: JSON.parse(localStorage.getItem("user"))?.token } };
        return axios.put(`${process.env.REACT_APP_API_KEY}/user/update/address`, formData, config);
    }

    userAddAddress(formData) {
        let config = { headers: { Authorization: JSON.parse(localStorage.getItem("user"))?.token } };
        return axios.post(`${process.env.REACT_APP_API_KEY}/user/add/address`, formData, config);
    }
    userDeleteAddress(id) {
        return axios.delete(`${process.env.REACT_APP_API_KEY}/user/delete/address`, { data: { id: id } });
    }
}

export default new UserService();
