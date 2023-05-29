// import { Tune } from '@mui/icons-material';
import { Container, StepButton, Stepper, Step, Stack, Box } from '@mui/material'
import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import BmiCard from '../BmiCard'
import BmrCard from '../BmrCard'
import GoalCard from '../GoalCard'
import TestResult from '../TestResult'
import jwt_decode from 'jwt-decode'
import AuthService from '../../../../services/auth.service'
import './styles.css'

function CardStep() {
  const [activeStep, setActiveStep] = useState(0)
  const [steps, setSteps] = useState([
    { label: 'BMI', completed: false },
    { label: 'BMR', completed: false },
    { label: 'Goal', completed: false },
    { label: 'Result', completed: false },
  ])
  const [userData, setUserData] = useState({
    weight: '',
    height: '',
    age: '',
    goalWeight: '',
    dietType: '',
    active: '',
    goal: '',
    bmr_val: '',
    goal_val: '',
  })

  const handleNext = () => {
    console.log(userData)
    if (activeStep < steps.length - 1) {
      setActiveStep((activeStep) => activeStep + 1)
    } else {
      const stepIndex = findUnfinshed()
      setActiveStep(stepIndex)
    }
  }

  const checkDisabled = () => {
    if (activeStep < steps.length - 1) return false
    const index = findUnfinshed
    if (index !== -1) return false
    return true
  }

  const findUnfinshed = () => {
    return steps.findIndex((step) => !step.completed)
  }

  const submitUserData = () => {
    console.log(userData)
    const decodedToken = jwt_decode(AuthService.getCurrentUser().token)
    const uid = decodedToken.id
    const url = `http://localhost:8080/menu/addUserData/${uid}`

    fetch(url, {
      method: 'post',
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
      })
  }

  return (
    <Container sx={{ mt: 7,height:'100vh', transform:'scale(1)'}}>
      <Box>
        <Stepper
          alternativeLabel
          nonLinear
          activeStep={activeStep}
          sx={{ mb: 4 }}
        >
          {steps.map((step, index) => (
            <Step key={step.label} completed={step.completed}>
              <StepButton onClick={() => setActiveStep(index)}>
                {step.label}
              </StepButton>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ height: '55vh' }}>
          {
            {
              0: <BmiCard userData={userData} setUserData={setUserData} />,
              1: <BmrCard userData={userData} setUserData={setUserData} />,
              2: <GoalCard userData={userData} setUserData={setUserData} />,
              3: <TestResult userData={userData} setUserData={setUserData} />,
            }[activeStep]
          }
        </Box>
        {/* Back&And button */}
        <Stack
          direction="row"
          sx={{ pt: 9, pb: 1, justifyContent: 'space-around' }}
        >
          <Button
            color="inherit"
            disabled={!activeStep}
            onClick={() => setActiveStep((activeStep) => activeStep - 1)}
            style={{color:'black'}}
          >
            Back
          </Button>
          <Button
            disabled={checkDisabled()}
            onClick={() => {
              handleNext()
              submitUserData()
            }}
            style={{color:'black'}}
          >
            Finish
          </Button>
          {/* {activeStep===2?         
        <Button
          disabled={checkDisabled()}
          onClick={submitUserData}
        >Finish</Button> : false} */}
        </Stack>
      </Box>
    </Container>
  )
}

export default CardStep
