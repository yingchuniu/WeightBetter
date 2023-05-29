const db = require("./../modules/connect-mysql");
const passport = require("passport");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { loginValidation } = require("../validation");
const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

// 會員登入
const localLogin = async (req, res) => {
    const { username, password } = req.body;
    // Joi 驗證
    let { error } = loginValidation(req.body);
    if (error?.details[0].type === "string.empty") return res.status(400).send("欄位不得為空！");

    const sql = "SELECT * FROM `users` WHERE `username`=?";
    const [data] = await db.query(sql, username);
    const user = data[0];

    // 找不到此會員
    if (!user) return res.json({ error: "請先建立帳號再登入！" });

    // 核對密碼
    bcrypt.compare(password, user.password).then((match) => {
        if (!match) return res.json({ error: "帳號或密碼錯誤！" });
        // JWT 令牌
        const userToken = jwt.sign({ username: user.username, id: user.id }, process.env.PASSPORT_SECRET);
        return res.json({
            token: "JWT " + userToken,
            username: user.username,
            id: user.id,
            state: user.state,
            profile_image: user.profile_image,
        });
    });
};

const passwordReset = async (req, res) => {
    const { email } = req.body;
    const oldUser = await db.execute("SELECT * FROM `users` WHERE email = ?", [email]);
    if (!oldUser) return res.send("此信箱從未註冊過！");
    const secret = proce;
};

const githubLogin = async (req, res) => {
    console.log(req.query.code);
    const params =
        "?client_id" + process.env.GITHUB_CLIENT_ID + "&client_secret" + process.env.GITHUB_CLIENT_SECRET + "&code=" + req.query.code;
    await fetch("https://github.com/login/oauth/access_token" + params, { method: "POST", headers: { Accept: "application/json" } })
        .then((res) => res.json())
        .then((data) => {
            res.json(data);
        });
};

const githubSuccess = async (req, res) => {
    const userToken = jwt.sign(
        { username: req.user.username, id: req.user.id, profile_image: req.user.profile_image },
        process.env.PASSPORT_SECRET
    );
    console.log("req", req.user);
    console.log("token", userToken);
    res.redirect("http://localhost:3000/login/success?token=" + userToken);
};

const googleSuccess = async (req, res) => {
    const userToken = jwt.sign(
        { username: req.user.username, id: req.user.id, profile_image: req.user.profile_image },
        process.env.PASSPORT_SECRET
    );
    console.log("req", req.user);
    console.log("token", userToken);
    res.redirect("http://localhost:3000/login/success?token=" + userToken);
};

module.exports = {
    localLogin,
    githubLogin,
    googleSuccess,
    passwordReset,
    githubSuccess,
};
