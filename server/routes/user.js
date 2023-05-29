const express = require("express");

const router = express.Router();

const userController = require("../controllers/userController");

const multer = require("multer");

const passport = require("passport");
require("../config/passport")(passport);
// require("../config/googlePassport");

const { storage } = require("../cloudinary");
const upload = multer({ storage });

// 會員註冊 TODO: 進階驗證留到最後
router.post("/register/checkusername", userController.usernameCheck);
router.post("/register", userController.userRegister);

// 更新會員資料 test OK
router.post("/update/profile/:id", userController.userUpdate);

// 取得會員資料 test OK
router.get("/find/:username", userController.userProfile);

// 取得會員訂單 test OK
router.get("/find/:username/orders", userController.userOrder);

// TODO: Delete : 刪除會員
// router.delete("/delete", userController.userDelete);

// 追蹤了哪些人 test OK
router.get("/find/:username/following", userController.userFollowing);

// 被哪些人追蹤 test OK
router.get("/find/:username/followers", userController.userFollowers);

// 追蹤別人 / 退追別人 test OK
router.post("/follow", passport.authenticate("jwt", { session: false }), userController.userFollow);

// 移除粉絲 test OK
router.post("/deletefan", userController.userDelFan);

// 上傳大頭貼至cloudinary test OK
router.post("/upload/avatar/:username", upload.single("image"), userController.userSetAvatar);

router.post("/update/password", passport.authenticate("jwt", { session: false }), userController.userChangePassword);

// 取得會員地址陣列
router.get("/get/address", passport.authenticate("jwt", { session: false }), userController.userAddress);

// 新增收件地址
router.post("/add/address", passport.authenticate("jwt", { session: false }), userController.userAddAddress);

// 修改收件地址
router.put("/update/address", passport.authenticate("jwt", { session: false }), userController.userUpdateAddress);

// 刪除收件地址
router.delete("/delete/address", userController.userDeleteAddress);

// 模糊搜尋使用者
router.get("/search/:username", userController.userSearch);

module.exports = router;
