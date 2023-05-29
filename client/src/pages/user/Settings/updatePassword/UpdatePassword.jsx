import React, { useReducer } from 'react'
import {
  Box,
  Container,
  TextField,
  Stack,
  Typography,
  Alert,
} from '@mui/material'
import Header from '../../components/header'
import PasswordInput from '../../components/passwordInput/PasswordInput'
import { PrimaryButton } from '../../components/PrimaryButton'
import FlexColBox from '@/components/FlexBox/FlexColBox'
import UserService from '@/services/user.service'
import CircleSpinner from '../../components/spinner/CircleSpinner'
import { initialStates, passwordReducer } from './updatePasswordReducer'

// useReducer prac
function UpdatePassword() {
  const [state, dispatch] = useReducer(passwordReducer, initialStates)

  const handleInputChange = (e) => {
    dispatch({
      type: 'inputChange',
      passwordValue: { [e.target.name]: e.target.value },
      error: { [e.target.name]: '' },
    })
  }

  const { currentPassword, changePassword, confirmChangePassword } =
    state.passwordValue

  const updatePassword = async () => {
    dispatch({ type: 'submitChange', saving: true })
    // 前端驗證
    if (
      currentPassword === '' ||
      changePassword === '' ||
      confirmChangePassword === ''
    ) {
      dispatch({ type: 'inputBlank', saving: false })
      return
    }
    //
    if (changePassword !== confirmChangePassword) {
      dispatch({ type: 'confirmError', saving: false })
      return
    }
    const response = await UserService.userChangePassword(state.passwordValue)

    if (response.data.error) {
      dispatch({
        type: 'responseError',
        error: response.data.error,
        saving: false,
      })
      return
    } else {
      setTimeout(() => {
        dispatch({
          type: 'responseSuccess',
          success: response.data.success,
          saving: false,
        })
      }, 1500)
    }
  }
  const isButtonDisabled = !(
    currentPassword !== '' &&
    changePassword !== '' &&
    confirmChangePassword !== ''
  )

  return (
    <Box>
      <FlexColBox>
        <Header title="更改密碼" />
        <Box padding="20px" alignSelf="flex-start" mb={5}>
          <Stack direction={'column'}>
            <PasswordInput
              error={state.error.currentPassword}
              label="當前密碼"
              name="currentPassword"
              value={state.passwordValue.currentPassword}
              setValue={handleInputChange}
            >
              {' '}
            </PasswordInput>
            <PasswordInput
              error={state.error.changePassword}
              label="欲更改密碼"
              name="changePassword"
              value={state.passwordValue.changePassword}
              setValue={handleInputChange}
            >
              {' '}
            </PasswordInput>
            <PasswordInput
              error={state.error.confirmChangePassword}
              label="確認更改密碼"
              name="confirmChangePassword"
              value={state.passwordValue.confirmChangePassword}
              setValue={handleInputChange}
            >
              {' '}
            </PasswordInput>
            {state.success && (
              <Alert severity="success" variant="outlined">
                {state.success}
              </Alert>
            )}
          </Stack>
        </Box>
        <PrimaryButton
          variant="outlined"
          onClick={updatePassword}
          disabled={isButtonDisabled}
        >
          {state.saving ? <CircleSpinner /> : '更改密碼'}
        </PrimaryButton>
      </FlexColBox>
    </Box>
  )
}

export default UpdatePassword
