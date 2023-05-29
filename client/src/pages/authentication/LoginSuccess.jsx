import React, { useEffect } from 'react'
import { Box, CircularProgress } from '@mui/material'
import { useSearchParams, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import AuthService from '../../services/auth.service'
import { useAuth } from '@/hooks/AuthContext'

const LoginSuccess = () => {
  // useEffect(() => {
  //     setTimeout(() => {
  //         window.close();
  //     }, 1000);
  // });
  const { userLogin } = useAuth()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()
  const token = searchParams.get('token')
  const decodedToken = jwt_decode(token)
  const { id, username, profile_image } = decodedToken
  localStorage.setItem(
    'user',
    JSON.stringify({
      token: 'JWT ' + token,
      id: id,
      username: username,
      profile_image: profile_image,
    })
  )
  // window.alert("登入成功 重新導向首頁");
  userLogin(AuthService.getCurrentUser())

  navigate(`/${decodedToken.username}`)
  return (
    <div>
      成功登入！
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </div>
  )
}

export default LoginSuccess
