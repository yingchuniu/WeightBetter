const express = require('express')
const db = require('./../modules/connect-mysql')
const upload = require('./../modules/upload-video')

const router = express.Router()


// --[routes]

// --[拿產品資料]
router.get('/getProduct', async (req, res) => {

    const sql = "SELECT * FROM `product_2` WHERE 1"
    const [rows] = await db.query(sql)
    // console.log(rows)

    return res.json(rows)
})

// --[拿特定 id 的產品資料]
router.get('/getProduct/:pid', async (req, res) => {
    const pid = req.params.pid

    const sql = "SELECT * FROM `product_2` WHERE `product_id`=?"
    const [rows] = await db.query(sql, [pid])

    return res.json(rows)
})

//--[拿特定類別的產品資料]
router.get('/getProductbycate/:pcategory', async (req, res) => {
    const pcategory = req.params.pcategory

    const sql = "SELECT * FROM `product_2` WHERE `category_id`=?"
    const [rows] = await db.query(sql, [pcategory])

    return res.json(rows)
})


router.get('/product-search', async (req, res) => {
    let where = ' WHERE 1'
    const search = req.query.search || ''
    if (search){
      // --[用  ,  或 ' ' 或，分開關鍵字]
      const searchSplit = search.split(/[,\s，]/) 

      console.log(searchSplit)
  
      // --[濾除 '']
      const searchFiltered = searchSplit.filter((el) => {
        return el !== ''
      })
  
      let addWhere = ''
      searchFiltered.forEach((keyword, idx) => {
        const keyword_sql = `%${keyword}%`
        const keyword_sql_esc = db.escape(keyword_sql) // 跳脫特殊字元避免導致 SQL 錯誤(避免 SQL injection)
  
        if (idx !== 0) {
          addWhere += ' OR '
        }
        addWhere += `name LIKE ${keyword_sql_esc} OR category LIKE ${keyword_sql_esc}` // 改成自己的資料表名稱
      });
  
      where = ' WHERE ' + addWhere
    }

    const sql = "SELECT * FROM `product_2` " + where
    const [rows] = await db.query(sql)
  
    return res.json({search, where, rows})
  })

// --[拿特定 userid 收藏的產品資料]
router.get('/product-fav/:uid', async (req, res) => {
  
  const uid = req.params.uid

  const sql  = "SELECT * FROM `product_favorite` AS a JOIN product_2 AS b ON a.product_id=b.product_id WHERE user_id=?;"
  const [result] = await db.query(sql, [uid])

  return res.json(result)
})

// --[新增或取消收藏]
router.get('/product-fav-add/:uid/:pid', async (req, res) => {
  let output = {
    result: ''
  }
  
  const {uid, pid} = req.params

  const sql1  = "SELECT * FROM `product_favorite` WHERE user_id=? AND product_id=?;"
  const [result1] = await db.query(sql1, [uid, pid])

  if (result1.length > 0){
    // 取消收藏
    const sql2 = "DELETE FROM `product_favorite` WHERE user_id=? AND product_id=?;"
    const [result2] = await db.query(sql2, [uid, pid])
    output.result = false
    
    
  } else {
    // 新增收藏
    const sql3 = "INSERT INTO `product_favorite`(`user_id`, `product_id`) VALUES (?, ?)"
    const [result3] = await db.query(sql3, [uid, pid])
    output.result = true
    

  }

  return res.json(output)
})

// --[拿特定 userid 的使用者資訊]

// router.get('/getUserInfo/:uid', async (req, res) => {
//   const uid = req.params.uid

//   const sql = "SELECT * FROM `users` WHERE `id`=?"
//   const [rows] = await db.query(sql, [uid])

//   return res.json(rows)
// })

router.get('/getUserInfo/:uid', async (req, res) => {
  
  const uid = req.params.uid

  const sql  = "SELECT * FROM `users` AS a JOIN address AS b ON a.id=b.user_id WHERE user_id=?;"
  const [rows] = await db.query(sql, [uid])

  return res.json(rows)
})

// --[拿到資料加入訂單]
router.post('/addOrders/:uid', upload.none() , async (req, res) => {

  const uid = req.params.uid
  const {fullname, tel, email, country, township, address_line, total_amount} = req.body

  console.log( fullname, tel, email, country, township, address_line, total_amount )

  const sql = "INSERT INTO `orders`(`order_date`, `user_id`, `fullname`, `email`, `total_amount`, `counrty`, `township`, `address`, `phone`) VALUES (NOW(), ?,?,?,?,?, ?, ?, ?)"

  const [rows] = await db.query(sql ,[uid, fullname, email, total_amount, country, township, address_line, tel])

  return res.json(rows)
})



module.exports = router