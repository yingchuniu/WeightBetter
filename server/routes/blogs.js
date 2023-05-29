const express = require("express");
const router = express.Router();
const db = require("../modules/connect-mysql");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
const moment = require("moment");
const { storage } = require("../cloudinary");
const upload = multer({ storage });

//抓本機圖
router.get("/:filename", (req, res) => {
    const { filename } = req.params;
    const imagePath = path.join(__dirname, "..", "assets", "BlogImages", filename);
    res.sendFile(imagePath);
});


// 抓取所有blogs中的資料
router.get("/", async (req, res) => {
    const search = req.query.search || "";
    const author_id = req.query.author_id;
    const searchQuery = search
        ? ` WHERE title LIKE ? OR description LIKE ?`
        : "";
    const authorQuery = author_id
        ? `${search ? " AND" : " WHERE"} author_id = ?`
        : "";
    const searchParams = search ? [`%${search}%`, `%${search}%`] : [];
    const authorParams = author_id ? [author_id] : [];

    try {
        let [blogs] = await db.query(
            `SELECT * FROM blogs${searchQuery}${authorQuery}`,
            [...searchParams, ...authorParams]
        );
        console.log("Search term:", search);
        console.log("Search results:", blogs);
        res.json(blogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

router.post("/",upload.single("image"), async (req, res) => {
    const {
        title,
        description,
        content,
        // image,
        imageLabel,
        category,
        author_id,
    } = req.body;


    const image = req.file ? req.file.path : null;

    try {
        const [result] = await db.query(
            "INSERT INTO `blogs` (`title`, `description`, `content`, `image`, `imageLabel`,`category`, `author_id`, `date`) VALUES (?, ?, ?, ?,?, ?, ?, NOW())",
            [
                title,
                description,
                JSON.stringify(content),
                image,
                imageLabel,
                category,
                author_id,
            ]
        );
        res.json({ id: result.insertId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

//抓取最新的20筆資料
router.get("/post/latest", async (req, res) => {
    try {
        const latestPosts = await db.query(`
        SELECT blogs.*, users.fullname AS author_fullname
        FROM blogs
        INNER JOIN users
        ON blogs.author_id = users.id
        ORDER BY blogs.date DESC
        LIMIT 20
      `);
        res.json(latestPosts[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// 根據ID抓取特定的文章
router.get("/post/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [[blog]] = await db.query(
            `
          SELECT blogs.*, users.fullname AS author_fullname, users.profile_image, users.email, users.username
          FROM blogs
          INNER JOIN users
          ON blogs.author_id = users.id
          WHERE blogs.id = ?
        `,
            [id]
        );

        if (blog) {
            res.json(blog);
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// 更新文章
router.put("/post/:id", async (req, res) => {
    const { id } = req.params;
    const { title, description, content, image, imageLabel } = req.body;

    try {
        const [result] = await db.query(
            "UPDATE `blogs` SET `title` = ?, `description` = ?, `content` = ?, `image` = ?, `imageLabel` = ? WHERE `id` = ?",
            [title, description, JSON.stringify(content), image, imageLabel, id]
        );

        if (result.affectedRows > 0) {
            res.json({ message: "Update successful" });
        } else {
            res.status(404).json({ message: "Blog not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

//移除文章
router.delete("/post/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query("DELETE FROM `blogs` WHERE `id` = ?", [
            id,
        ]);

        if (result.affectedRows === 0) {
            res.status(404).json({ message: "Blog not found" });
        } else {
            res.json({ message: "Blog deleted successfully" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// 抓取特定類別的文章的路由
router.get("/post/category/:category", async (req, res) => {
    const { category } = req.params;

    try {
        const blogs = await db.query(
            `
          SELECT blogs.*, users.fullname AS author_fullname
          FROM blogs
          INNER JOIN users
          ON blogs.author_id = users.id
          WHERE blogs.category = ?
        `,
            [category]
        );

        res.json(blogs[0]);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// 抓取隨機category的文章的路由
router.get("/post/category/:category/random", async (req, res) => {
    const { category } = req.params;

    try {
        let [[randomPost]] = await db.query(
            "SELECT * FROM `blogs` WHERE `category` = ? ORDER BY RAND() LIMIT 1",
            [category]
        );
        if (randomPost) {
            res.json(randomPost);
        } else {
            res.status(404).json({ message: "Post not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

// Get comments for a specific blog post
router.get("/post/:id/comments", async (req, res) => {
    const { id } = req.params;

    try {
        const [comments] = await db.query(
            `
            SELECT 
                blogs_comments.*, users.fullname, users.profile_image
            FROM 
                blogs_comments
            INNER JOIN 
                users
            ON 
                blogs_comments.author_id = users.id
            WHERE 
                blogs_comments.post_id = ?
        `,
            [id]
        );

        res.json(comments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});

//發表評論
// 新增此路由以保存評論
router.post("/post/:id/comments", async (req, res) => {
    const { id: post_id } = req.params;
    const { content, author_id } = req.body;

    try {
        const date = moment().format("YYYY-MM-DD HH:mm:ss");
        const [result] = await db.query(
            "INSERT INTO `blogs_comments` (`post_id`, `author_id`,  `content`, `created_at`) VALUES (?, ?, ?, NOW())",
            [post_id, author_id, content]
        );

        const newComment = {
            post_id,
            author_id,
            content,
            // created_at,
        };

        res.json(newComment);
    } catch (error) {
        console.error("Error details:", error.message);
        console.error(error);
        res.status(500).json({ message: "An error occurred" });
    }
});



//訂閱寄信
router.post("/subscribe", async (req, res) => {
    const { email } = req.body;
    console.log("Request body:", req.body);

    // 在此處添加您的電子郵件帳戶憑據
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: 'henryhuanghanyi@gmail.com',
            pass: 'afcinamumxtljshn',
        },
    });
    console.log("Transporter created:", transporter);

    const mailOptions = {
        from: "henryhuanghanyi@gmail.com",
        to: email,
        subject: "歡迎訂閱我們的部落格",
        text: "您已成功訂閱我們的部落格！",
    };
    console.log("Mail options:", mailOptions);

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("訂閱成功");
    } catch (error) {
        console.error("訂閱失敗：", error);
        res.status(500).send("訂閱失敗");
    }
});

module.exports = router;
