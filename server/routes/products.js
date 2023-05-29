const express = require("express");
const db = require("./../modules/connect-mysql");

const router = express.Router();

// --[取得所有 Level1 產品資料]
router.get("/prodl1", async (req, res) => {
    console.log("/");

    const sql = "SELECT * FROM `products_level1` WHERE 1";
    const [rows] = await db.query(sql);

    return res.json(rows);
});
// --[取得所有 Level1 產品資料]
router.get("/prodl1/:pid", async (req, res) => {
    const pid = req.params.pid;

    const sql = "SELECT * FROM `products_level1` WHERE `products_level1_id`=?";
    const [rows] = await db.query(sql, [pid]);

    return res.json(rows);
});
// --[取得單一 Level1 產品資料]
router.get("/prodl2/:pid_l1", async (req, res) => {
    console.log("level1");

    const pid_l1 = req.params.pid_l1;

    const sql = "SELECT * FROM `products_level2` WHERE `product_level1_id` = ?";
    const [rows] = await db.query(sql, [pid_l1]);

    return res.json(rows);
});

// --[取得單一 Level2 產品資料]
router.get("/prodl2/:pid_l1/:pid_l2", async (req, res) => {
    console.log("level2");

    const pid_l1 = req.params.pid_l1;
    const pid_l2 = req.params.pid_l2;

    const sql =
        "SELECT * FROM `products_level2` WHERE `product_level1_id` = ? AND `product_level2_id` = ?";
    const [rows] = await db.query(sql, [pid_l1, pid_l2]);

    return res.json(rows);
});

// --[取得單一 類別 產品資料]
router.get("/cate/:cateid", async (req, res) => {
    console.log("cate");

    const cateid = req.params.cateid;

    const sql = "SELECT * FROM `products_level2` WHERE `category_id` = ?";
    const [rows] = await db.query(sql, [cateid]);

    return res.json(rows);
});

module.exports = router;
