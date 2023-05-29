const mysql = require("mysql2");

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    waitForConnections: true, // 忙碌時是否允許等待
    connectionLimit: 5, // 最大連線數
    queueLimit: 0, // 允許排隊人數，0: 不限
});

module.exports = pool.promise();
