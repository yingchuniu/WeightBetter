let JwtStrategy = require("passport-jwt").Strategy;
let ExtractJwt = require("passport-jwt").ExtractJwt;
const db = require("../modules/connect-mysql");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GitHubStrategy = require("passport-github2").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;

module.exports = (passport) => {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
        secretOrKey: process.env.PASSPORT_SECRET,
    };

    passport.use(
        new JwtStrategy(opts, async function (jwt_payload, done) {
            // console.log("L13", jwt_payload.id);
            try {
                let [authUser] = await db.query(`SELECT * FROM users WHERE id = ${jwt_payload.id}`);
                // console.log(jwt_payload);
                if (authUser) {
                    console.log("authUser", authUser[0]);
                    return done(null, authUser[0]);
                } else {
                    return done(null, false);
                }
            } catch (e) {
                return done(e, false);
            }
        })
    );

    passport.use(
        // 需傳入兩個參數
        //1. obj：包含client id, client secret,callback callbackURL
        //2. function (取得authorization後執行) 可以在function內部判斷是否為用戶第一次登入
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "/auth/google/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log("進入google strategy的區域");
                // console.log("accessToken:", accessToken);
                // console.log(profile);
                console.log("=====================");

                let [foundUser] = await db.execute("SELECT * FROM `users` WHERE `googleId` = ?", [profile.id]);
                if (foundUser.length > 0) {
                    // let [user] = await db.execute("SELECT * FROM `users` WHERE `email` = ?", [profile.emails[0].value]);
                    console.log("使用者已經存在，無需存入DB", foundUser);
                    done(null, foundUser[0]);
                } else {
                    console.log("新用戶：需要存入DB");
                    const { displayName: fullname, id } = profile;
                    const email = profile.emails[0].value;
                    const profile_image = profile.photos[0].value;
                    const username = profile.emails[0].value.split("@")[0];
                    await db.execute(
                        "INSERT INTO `users` SET googleId = ?, fullname = ?, email = ?,profile_image = ?, username = ?, password = ?,birth_date = ?",
                        [id, fullname, email, profile_image, username, id, "1990-08-08"]
                    );
                    let [user] = await db.execute("SELECT * FROM `users` WHERE `email` = ?", [email]);
                    // const userData = { id: profile.id, username: email, profile_image: profile_image };
                    return done(null, user[0]);
                }
            }
        )
    );
    passport.serializeUser((user, done) => {
        console.log("使用者序列化", user);
        done(null, user.id); // 將DB id 存入session
    });

    passport.deserializeUser(async (id, done) => {
        console.log("deserialize使用者 去DB找資料 ");

        let [user] = await db.execute("SELECT * FROM `users` WHERE id = ?", [id]);
        console.log("deserialize後", user[0]);
        done(null, user[0]);
    });

    passport.use(
        new GitHubStrategy(
            {
                clientID: process.env.GITHUB_CLIENT_ID,
                clientSecret: process.env.GITHUB_CLIENT_SECRET,
                callbackURL: "/auth/github/callback",
            },
            async (accessToken, refreshToken, profile, done) => {
                console.log(profile);
                let [foundUser] = await db.execute("SELECT * FROM `users` WHERE `githubId` = ?", [profile.id]);
                if (foundUser.length > 0) {
                    let [user] = await db.execute("SELECT * FROM `users` WHERE `githubId` = ?", [profile.id]);
                    console.log("使用者已經存在，無需存入DB", foundUser);
                    done(null, foundUser[0]);
                } else {
                    console.log("新用戶：需要存入DB");
                    const { displayName: fullname, id, username, profileUrl: email } = profile;
                    const profile_image = profile.photos[0].value;

                    await db.execute(
                        "INSERT INTO `users` SET githubId = ?, fullname = ?, email = ?,profile_image = ?, username = ?, password = ?,birth_date = ?",
                        [id, fullname, email, profile_image, username, id, "1990-08-08"]
                    );
                    let [user] = await db.execute("SELECT * FROM `users` WHERE `githubId` = ?", [id]);

                    return done(null, user[0]);
                }
            }
        )
    );

    passport.use(
        new FacebookStrategy(
            {
                clientID: process.env.FB_CLIENT_ID,
                clientSecret: process.env.FB_CLIENT_SECRET,
                callbackURL: "/auth/facebook/callback",
            },
            async (accessToken, refreshToken, profile, cb) => {
                console.log(profile);
                let [foundUser] = await db.execute("SELECT * FROM `users` WHERE `facebookId` = ?", [profile.id]);
                if (foundUser.length > 0) {
                    console.log("使用者已經存在，無需存入DB", foundUser);
                    done(null, foundUser[0]);
                } else {
                    console.log("新用戶：需要存入DB");
                    const { displayName: fullname, id, username, profileUrl: email } = profile;
                    const profile_image = profile.photos[0].value;

                    await db.execute(
                        "INSERT INTO `users` SET facebookbId = ?, fullname = ?, email = ?,profile_image = ?, username = ?, password = ?,birth_date = ?",
                        [id, fullname, email, profile_image, username, id, "1990-08-08"]
                    );
                    let [user] = await db.execute("SELECT * FROM `users` WHERE `githubId` = ?", [id]);

                    return done(null, user[0]);
                }
            }
        )
    );
};
