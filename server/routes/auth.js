const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/authController");

router.post("/login", authController.localLogin);

router.post("/forgot-password", authController.passwordReset);

// TODO: 有空再做 Github Oauth
router.get("/github", passport.authenticate("github", { scope: ["user:email"] }));
router.get("/github/callback", passport.authenticate("github", { failureRedirect: "/login" }), authController.githubSuccess);

// Google Oauth
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);

router.get(
    "/google/callback",
    passport.authenticate("google", {
        failureRedirect: "/login/failed",
    }),
    authController.googleSuccess
);

// facebook Oauth TODO:有空再做
router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/");
});
// router.get("/login/success", authController.googleSuccess);

module.exports = router;
