const express = require('express')
const db = require('./../modules/connect-mysql')

const router = express.Router()


router.post('/addUserData/:uid', async (req, res) => {
    let output = {
      success: false,
      data: req.body,
      error: ''
    }

    const uid = +req.params.uid
    const {weight, height, goalWeight, dietType, age , bmr_val} = req.body


    const sql = "UPDATE `users` SET `weight`=?,`age`=?, `diet_type`=?, `goal_weight`=?, `height`=?,`active_status`=? WHERE `id`=? "
    const [results] = await db.query(sql, [weight || 0, age || 0, dietType, goalWeight || 0, height || 0,bmr_val || 0, uid])

    return res.json(results)
})

router.get('/getBMI/:uid', async (req, res) => {
    const uid = req.params.uid

    const sql = "SELECT `weight`, `height` FROM `users` WHERE `id`=?"
    const [rows] = await db.query(sql, [uid])
    console.log(rows)

    const height = rows[0].height/100
    const weight = rows[0].weight
    const BMI = (weight / (height * height)).toFixed(0) 
    console.log(height, weight)
    let result
    if (BMI < 18.5) {
        result = '體重過輕'
        return res.json({BMI: BMI, height: height, weight: weight, result});
    }
    else if (BMI > 18.5 &&  BMI< 24) {
        result = '正常範圍'
        return res.json({BMI: BMI, height: height, weight: weight, result});
    }
    else if (BMI > 24 && BMI < 27) {
        result = '過重'
        return res.json({BMI: BMI, height: height, weight: weight, result})
    }
    else if (BMI > 27 && BMI < 30) {
        result = '輕度肥胖'
        return res.json({BMI: BMI, height: height, weight: weight, result})
    }
    else if (BMI > 30 && BMI < 35) {
        result = '中度肥胖'
        return res.json({BMI: BMI, height: height, weight: weight, result})
    }
    else {
        result = '重度肥胖'
        return res.json({BMI: BMI, height: height, weight: weight, result})
    }



  
})

router.get('/getBMR/:uid', async (req, res) => {
    const uid = req.params.uid
    
    const sql = "SELECT `weight`, `height`, `age`, `active_status` FROM `users` WHERE `id`=?"
    const [rows] = await db.query(sql, [uid])
    console.log(rows)

    const height = rows[0].height
    const weight = rows[0].weight
    const age = rows[0].age
    const status = rows[0].active_status
    const BMR = ((9.99 * weight + 6.25 * height - 4.92 * age - 161)*status).toFixed(2) 
    console.log(height, weight)
    console.log(height, weight, age)

    return res.json({BMR: BMR, height: height, weight:weight, age:age})



})



module.exports = router