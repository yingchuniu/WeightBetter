const db = require("./../modules/connect-mysql");
const { registerValidation } = require("../validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// 會員註冊
const usernameCheck = async (req, res) => {
    const username = req.body.username;
    const usernameExist = await db.execute("SELECT COUNT(*) FROM `users` WHERE `username` = ?", [username]);
    if (usernameExist > 0) return res.status(400).send("使用者名稱已有人使用！");

    res.json({ success: "使用者名稱可以使用" });
};

const userRegister = async (req, res) => {
    //  /user/register
    let { password, username, birth_date, fullname, email } = req.body;
    console.log(req.body);
    // Joi 驗證
    let { error } = registerValidation({ password, username, email });
    if (error) return res.status(400).send(error.details[0].message);

    // email驗證
    const emailExist = await db.execute("SELECT COUNT(*) FROM `users` WHERE `email` = ?", [email]);
    if (emailExist > 0) return res.status(400).send("此信箱已經註冊過囉！");
    const usernameExist = await db.execute("SELECT COUNT(*) FROM `users` WHERE `username` = ?", [username]);
    if (usernameExist > 0) return res.status(400).send("使用者名稱已有人使用！");
    // 存入ＤＢ
    const sql = "INSERT INTO `users` SET username = ?, password = ?, birth_date = ?, fullname = ?, email = ?";

    bcrypt.hash(password, 10).then((hash) => {
        const user = db.execute(sql, [username, hash, birth_date, fullname, email]);
        res.send({ msg: "帳號建立成功", user });
    });
};

// 撈取已登入會員的資料
const userProfile = async (req, res) => {
    //  /user/:username
    // console.log("id", req.user);
    const username = req.params.username;

    const sql = "SELECT * FROM `users` WHERE `username`= ?";
    const [user] = await db.execute(sql, [username]);
    if (!user) return res.json({ error: "no user found!" });

    res.json(user[0]);
};

// 更新已登入會員資料
const userUpdate = async (req, res) => {
    //  /user/:id
    const id = req.params.id;
    const { email, fullname, interest, introduction, username } = req.body;
    const sql = "UPDATE `users` SET email = ?, fullname = ?, interest = ?, introduction = ? WHERE `id`= ?";
    const user = await db.execute(sql, [email, fullname, interest, introduction, id]);

    res.json(user);
};

// TODO: 刪除帳號
const userDelete = async (req, res) => {
    let id = req.params.id;
    await User.destroy({ where: { id: id } });

    res.status(200).send("User is deleted");
};

// FIXME 可以透過localStorage 直接存取user id 不用下兩次query
const userOrder = async (req, res) => {
    let username = req.params.username;
    const [user] = await db.execute("SELECT * FROM `users` WHERE `username` = ?", [username]);

    const [orders] = await db.execute("SELECT * FROM `orders` WHERE `user_id` = ?", [+user[0].id]);

    res.json(orders);
    // const sql = "SELECT * FROM `orders` WHERE ``"
};

const userFollow = async (req, res) => {
    // const follow = req.params.username;
    // const { follower_id, following_username } = req.body;
    const { following_username } = req.body;
    const follower_id = req.user.id;

    const sql = "SELECT * FROM `users` WHERE `username`= ?";
    const [followUser] = await db.execute(sql, [following_username]);

    const sqlCheck = "SELECT `follower_id`, `following_id` FROM `followers` WHERE follower_id = ? AND following_id = ?";
    const [check] = await db.execute(sqlCheck, [follower_id, followUser[0].id]);
    if (check.length) {
        const sql2 = "DELETE FROM `followers` WHERE follower_id = ? AND following_id = ?";
        await db.query(sql2, [follower_id, followUser[0].id]);
        res.send("刪除");
    } else {
        const sql2 = "INSERT INTO `followers`(`follower_id`, `following_id`) VALUES (?,?)";
        await db.execute(sql2, [follower_id, followUser[0].id]);
        res.send("新增");
    }
};

const userDelFan = async (req, res) => {
    const { following_id, follower_username } = req.body;

    const sql = "SELECT * FROM `users` WHERE `username` = ?";
    const [fanId] = await db.execute(sql, [follower_username]);
    const sql2 = "DELETE FROM `followers` WHERE follower_id = ? AND following_id = ?";
    await db.query(sql2, [fanId[0].id, following_id]);
};

// REVIEW
const userFollowing = async (req, res) => {
    const username = req.params.username;

    const sql = "SELECT * FROM `users` WHERE `username`= ?";
    const [user] = await db.execute(sql, [username]);
    console.log(user);

    // 找到使用者追蹤的人
    const sql2 =
        "SELECT follower_id,following_id,users.username,users.profile_image FROM `followers` JOIN `users` ON followers.following_id = users.id WHERE follower_id = ?";
    const [following] = await db.execute(sql2, [user[0].id]);
    res.send(following);
};

// REVIEW
const userFollowers = async (req, res) => {
    const username = req.params.username;

    const sql = "SELECT * FROM `users` WHERE `username`= ?";
    const [user] = await db.execute(sql, [username]);

    // 找到使用者追蹤的人
    const sql3 =
        "SELECT follower_id,following_id,users.username,users.profile_image FROM `followers` JOIN `users` ON followers.follower_id = users.id WHERE following_id = ?";
    const [followedBy] = await db.execute(sql3, [user[0].id]);

    res.send(followedBy);
};

const userSetAvatar = async (req, res) => {
    const username = req.params.username;
    const profile_image = req.file.path;
    const sql = "UPDATE `users` SET profile_image = ? WHERE username = ?";
    await db.execute(sql, [profile_image, username]);
    res.send(req.file.path);
};

const userChangePassword = async (req, res) => {
    const user_id = req.user.id;
    const { currentPassword, changePassword } = req.body;
    try {
        const sql = "SELECT * FROM `users` WHERE id = ?";
        const [user] = await db.execute(sql, [user_id]);
        console.log("current User:", user[0]);

        const match = await bcrypt.compare(currentPassword, user[0].password);
        console.log(match);
        if (!match) {
            return res.json({ error: "當前密碼有誤" });
        }

        if (currentPassword === changePassword) {
            return res.json({ error: "新密碼不可與舊密碼相同！" });
        }

        const hash = await bcrypt.hash(changePassword, 10);
        const sql2 = "UPDATE `users` SET password = ? WHERE id = ?";
        await db.execute(sql2, [hash, user_id]);
    } catch (err) {
        res.json({ error: err });
    }

    res.json({ success: "密碼更改成功！" });
};

const userAddress = async (req, res) => {
    const user_id = req.user.id;
    const sql = "SELECT * FROM `address` WHERE user_id = ?";
    const [addressList] = await db.execute(sql, [user_id]);

    res.json({ addressList: addressList });
};

const userAddAddress = async (req, res) => {
    const user_id = req.user.id;
    const { recipient, country, township, address_line } = req.body;
    // console.log(user_id, recipient, country, township, address_line);
    try {
        const sql = "INSERT INTO `address` SET user_id = ?,recipient = ?, country = ?, township = ?, address_line = ?";
        await db.execute(sql, [user_id, recipient, country, township, address_line]);
    } catch (err) {
        return res.json({ error: err });
    }

    res.json({ success: "新增成功！" });
};
const userUpdateAddress = async (req, res) => {
    const user_id = req.user.id;
    const { id, recipient, country, township, address_line } = req.body;
    console.log(id);
    try {
        const sql = "UPDATE `address` SET recipient = ?, country = ?, township = ?, address_line = ? WHERE id = ?";
        await db.execute(sql, [recipient, country, township, address_line, id]);
    } catch (err) {
        return res.json({ error: err });
    }

    res.json({ success: "修改成功！" });
};

const userDeleteAddress = async (req, res) => {
    const { id } = req.body;
    console.log(req.body);
    console.log(id);
    try {
        const sql = "DELETE FROM `address` WHERE id = ?";
        await db.execute(sql, [id]);
    } catch (err) {
        res.json({ error: err });
    }

    // res.json({ success: "刪除成功！" });
};

const userSearch = async (req, res) => {
    const username = req.params.username;
    console.log(username);
    try {
        const sql = `SELECT * FROM users WHERE username LIKE '${username}%'`;
        const [users] = await db.execute(sql);
        console.log(users);
        res.json(users);
    } catch (err) {
        res.json({ error: err });
    }
};

module.exports = {
    userRegister,
    userUpdate,
    userDelete,
    userProfile,
    userOrder,
    userFollow,
    userDelFan,
    userSetAvatar,
    userFollowing,
    userFollowers,
    userChangePassword,
    userAddAddress,
    userUpdateAddress,
    userAddress,
    userDeleteAddress,
    userSearch,
    usernameCheck,
};
