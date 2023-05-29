import { useState } from 'react'
import AuthService from '@/services/auth.service'
import { useAuth } from '@/hooks/AuthContext'
import { useNavigate, useSearchParams } from 'react-router-dom'
// components
import {
  Box,
  Chip,
  Divider,
  TextField,
  Stack,
  IconButton,
  InputAdornment,
} from '@mui/material'
import ArrowButton from '../ArrowButton/ArrowButton'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { facebook } from '@/assets'

function LoginForm() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const { currentUser, userLogin } = useAuth()
  const [message, setMessage] = useState()
  const [showPassword, setShowPassword] = useState(false)

  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  })

  const inputChange = (e) => {
    setLoginData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  // FIXME 登入驗證api
  const loginAuth = async () => {
    // 登入POST
    try {
      let response = await AuthService.localLogin(loginData)
      if (response.data.error) {
        setMessage(response.data.error)
        return
      }
      localStorage.setItem('user', JSON.stringify(response.data))
      // window.alert("登入成功 重新導向首頁");
      userLogin(AuthService.getCurrentUser())

      navigate(`/${response.data.username}`)
      // setCurrentUser(AuthService.getCurrentUser());
    } catch (e) {
      setMessage(e.response.data)
    }
  }
  const googleLogin = async () => {
    AuthService.googleLogin().then((res) => {
      let token = params.get('token')
      console.log(token)
      // console.log(res.data);
    })
  }

  const githubLogin = async () => {
    AuthService.githubLogin().then((res) => {
      let token = params.get('token')
      console.log(token)
    })
  }

  const facebookLogin = async () => {
    AuthService.facebookLogin().then((res) => {
      let token = params.get('token')
      console.log(token)
    })
  }

  return (
    <>
      <TextField
        margin="normal"
        variant="outlined"
        label="帳號"
        name="username"
        value={loginData.username}
        sx={{ '&.MuiTextField-root': { width: '75%' } }}
        onChange={inputChange}
      />
      <TextField
        margin="normal"
        type={`${showPassword ? 'text' : 'password'}`}
        variant="outlined"
        label="密碼"
        name="password"
        value={loginData.password}
        onChange={inputChange}
        sx={{ '&.MuiTextField-root': { width: '75%' } }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="password-visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <br />
      <Box width="80%" mb={2}>
        <Divider>
          <Chip
            label="透過其他平台登入"
            sx={{ backgroundColor: 'neutral.light' }}
          ></Chip>
        </Divider>
      </Box>
      <Stack direction="row" spacing={2}>
        <IconButton aria-label="" onClick={githubLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="43px"
            height="43px"
            viewBox="0 0 24 24"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </IconButton>
        <Divider variant="middle" orientation="vertical"></Divider>
        <IconButton aria-label="" onClick={googleLogin}>
          <img
            src="/googleSignIn.png"
            alt="google-Icon"
            width={'45px'}
            height="45px"
            style={{ overflow: 'hidden' }}
          />
        </IconButton>
        {/* <IconButton aria-label="" onClick={facebookLogin}>
                    <img src={facebook} alt="facebook-Icon" width={"45px"} height="45px" style={{ overflow: "hidden" }} />
                </IconButton> */}
      </Stack>

      <ArrowButton onClick={loginAuth} />
    </>
  )
}

export default LoginForm
