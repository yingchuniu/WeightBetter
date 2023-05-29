import { ClassNames } from '@emotion/react';
import { TextField, Button, FormControl, InputLabel, Select, MenuItem, Box, FormGroup, Typography } from '@mui/material';
// import { width } from '@mui/system';
// import { styled } from '@mui/system';
import { useEffect, useState } from 'react';



// const StyledTextField = styled(TextField)(({theme}) => {

// })




function BmiCard({ userData, setUserData }) {

  const [type, setType] = useState(0)
  // const [age,setAge] = useState('')
  // const [weight1,setWeight1] = useState('')
  // const [weight2,setWeight2] = useState('')
  // const [height,setHeight] = useState('')

  // useEffect(()=>{

  //   fetch(`/api`,{
  //     method: 'GET',
  //   })
  //   .then((response)=> response.json())
  //   .then((data)=>{
  //   console.log('data',data)
  //   })
  //   .catch((error)=>console.error(error))


  // },[])




  const handleSubmit = (event) => {

    console.log('123')
    event.preventDefault()
    console.log(type)

    const fd = new FormData(event.target)
    console.log(fd)
    // console.log(fd.get(type))

    // fetch(`/api`,{
    //   method:'POST',
    //   body:fd,

    // })
    // .then((response)=>response.json())
    // .then((data)=>{
    //   if(data.success) {
    //     alert('表單成功送出')

    //   }else {
    //     alert('表單未成功送出')
    //   }
    // })
    // .catch((error)=>console.error(error))


  }


  return (

    <Box>

      <FormGroup onSubmit={handleSubmit}>
        <FormControl >
          {/* <InputLabel id="type-label">type</InputLabel> */}
          <Typography gutterBottom variant='h5' color="teal.main">
            飲食類型：
          </Typography>
          <InputLabel id="type-label"></InputLabel>
          <Select
            labelId="type-label"
            value={userData.dietType}
            onChange={(event) => { setUserData({ ...userData, dietType: event.target.value }) }}
            placeholder="在此輸入提示文字"
          >
            <MenuItem value="normal">一般</MenuItem>
            <MenuItem value="vegetarian">素食者</MenuItem>
          </Select>
        </FormControl>
        <br />
        <TextField height='2' mt="5" label="年齡" name='age' value={userData.age} onChange={(event) => {
          setUserData({ ...userData, age: event.currentTarget.value })
        }} />
        <br />
        <TextField mt="2" label="身高" name='height' value={userData.height} onChange={(event) => {
          setUserData({ ...userData, height: event.currentTarget.value })
        }} />
        <br />
        <TextField mt="2" label="實際體重" name='weight' value={userData.weight} onChange={(event) => {
          setUserData({ ...userData, weight: event.currentTarget.value })
        }} />
        {/* <TextField mt="2" label="目標體重" name='goalWeight' value={userData.goalWeight} onChange={(event)=>{
            setUserData({...userData, goalWeight:event.currentTarget.value})
          }}/> */}


        {/* <Button variant="contained" type="submit">Submit</Button> */}


      </FormGroup>


    </Box>
  )
}

export default BmiCard


