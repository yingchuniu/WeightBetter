import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CardMedia from '@mui/material/CardMedia'
import jwt_decode from 'jwt-decode'
import AuthService from '../../../../services/auth.service'

function TestResult() {
  const [BMI, setBMI] = useState(0)
  const [BMIresult, setBMIresult] = useState('')
  const [BMR, setBMR] = useState(0)

  useEffect(() => {
    getBMIdata()
  }, [BMI])

  useEffect(() => {
    getBMRdata()
  }, [BMR])

  const getBMIdata = () => {
    const decodedToken = jwt_decode(AuthService.getCurrentUser().token)
    const uid = decodedToken.id

    const url = `http://localhost:8080/menu/getBMI/${uid}`
    fetch(url, {
      method: 'GET',
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        setBMI(rData.BMI)
        setBMIresult(rData.result)
      })
  }

  const getBMRdata = () => {
    const decodedToken = jwt_decode(AuthService.getCurrentUser().token)
    const uid = decodedToken.id

    const url = `http://localhost:8080/menu/getBMR/${uid}`
    fetch(url, {
      method: 'GET',
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        setBMR(rData.BMR)
      })
  }


  return (
    <Box>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ maxWidth: 600, m: 2 }}>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              BMI結果
            </Typography>
            
            <Typography variant="h4" component="div">
              {BMI}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              身體質量指數為{BMIresult}
            </Typography>
    
      
          </CardContent>

          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image="/ImageMenu/Bmr02.jpg"
            alt="Live from space album cover"
          />
        </Card>

        <Card sx={{ maxWidth: 600, m: 2 }}>
          <CardContent>
            <Typography variant="h3" gutterBottom>
              TDEE結果
            </Typography>
            <Typography variant="h4" component="div">
              {BMR}大卡
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              每日基礎消耗熱量
            </Typography>
            </Typography>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ width: 300 }}
            image="/ImageMenu/Bmr02.jpg"
            alt="Live from space album cover"
          />
        </Card>
      </div>
    </Box>
  )
}

export default TestResult
