const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cors = require("cors");


// --[使用 .env(預設) 的環境變數]
require("dotenv").config();

const passport = require("passport");
require("./config/passport")(passport);
const session = require("express-session");
// require("./config/googlePassport");

// --[連線資料庫]
const db = require("./modules/connect-mysql");

const authRouter = require("./routes/auth");
// 導入 user 路由
const userRouter = require("./routes/user");
// --[建立 products 路由]
const products = require("./routes/products");
// const courseRouter = require("./routes/course");
// --[建立blogs路由]
const blogRouter = require("./routes/blogs");

app.get("/oauth2callback", (req, res) => {
    const code = req.query.code;

    oAuth2Client.getToken(code, (err, token) => {
        if (err) {
            console.error("Error while trying to retrieve access token", err);
            return res
                .status(400)
                .send("Error while trying to retrieve access token");
        }

        oAuth2Client.setCredentials(token);

        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
            if (err) {
                console.error(err);
                return res.status(500).send("Error saving token");
            }
            console.log("Token stored to", TOKEN_PATH);
            res.status(200).send("Token stored successfully");
        });
    });
});

// middlewares
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false },
    })
);

app.use(passport.initialize());
app.use(passport.session());
// resolution for CORS
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

// routes middleware
app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/story", require("./routes/story"));
app.use("/menu", require("./routes/menu"));
// app.use("/products", products);
app.use("/blogs", blogRouter);
// app.use("/products", products);
app.use("/product", require("./routes/product"));

app.use("/images", require('./routes/blogs'));

app.listen(8080, () => {
    console.log(`server run on port ${8080}`);
});
