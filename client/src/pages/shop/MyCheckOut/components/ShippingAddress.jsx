import React from 'react'
import styled from 'styled-components'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useState } from 'react';
import { useEffect } from 'react';
import { useCart } from '@/context/useCart';
import Snackbar from '@mui/material/Snackbar'
import Fade from '@mui/material/Fade'

const Container =styled.div`
    ${'' /* margin:50px 100px; */}
    @media (max-width: 768px) {
    flex-direction: column;
  width:350px;
  padding:15px 25px;

  }
`
const Title =styled.h1`
    margin:20px 0px;
    font-size:36px;
    font-weight:bold;
    color:#2F2D3F;
`
const InfoSession =styled.div`
padding:50px;
border:dashed #ccc 3px;
background-color:#eee;
border-radius:12px;
width:800px;
height:800px;
@media (max-width: 768px) {
    flex-direction: column;
  width:350px;
  padding:15px 25px;

  }
`
const Info = styled.input`
padding:10px;
margin:15px;
border:solid 1px #ccc;
border-radius:5px;
width:300px;
height:50px;
`

const SaveButton =styled.button`
    width:300px;
    height:50px;
    border-radius:12px;
    color:#fff;
    background-color:teal;
    margin:40px 0px;
    box-shadow: 10px 5px 20px #A9A9A9;

    &:hover{
        color:teal;
        background-color:#fff;
        border:solid 3px teal;
    }
`


const ShippingAddress = ({getUserInfo , userInfo ,setUserInfo}) => {


    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [snackBarMsg, setSnackBarMsg] = useState('')

    const {    
        cart,
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        isInCart,
        plusOne,
        minusOne} = useCart()
    
    const getTotal = () => {
        let totalQuantity = 0
        let totalPrice = 0
        items.forEach(item => {
            totalQuantity += item.quantity
            totalPrice += item.price * item.quantity
        })
        return {totalPrice, totalQuantity}
        }

    console.log(userInfo)

    // const userInfo= getUserInfo
    const [getOrder,setGetOrder] = useState({
        fullname: userInfo[0].fullname,
        tel: '',
        email: userInfo[0].email,
        country: userInfo[0].country,
        township: userInfo[0].township,
        address_line: userInfo[0].address_line
    })
    console.log(getOrder)

    useEffect (()=>{
        
    },[])

    const handleChange = (e, field) => {
        let newGetorder = {...getOrder}
        newGetorder[field] = e.currentTarget.value
        setGetOrder(newGetorder)
    }

    const handleSubmit=(e)=>{

        const myForm = document.myForm
        const fd = new FormData(myForm)
        fd.append('total_amount', getTotal().totalPrice)
        for (let i of fd.entries()){
            console.log(i)
        }

        const url=` http://localhost:8080/product/addOrders/${userInfo[0].user_id}`
        // console.log(getOrder)
        fetch(url, {
            method: 'post',
            body: fd
        })
          .then((r) => r.json())
          .then((rData) => {
            console.log(url, rData)
          })
        //   alert("訂單建立成功!")
          setSnackBarMsg('訂單建立成功!')
          setOpenSnackBar(true)
    }

  return (
    <Container>
        <Title>Shipping Address <AutoAwesomeIcon style={{color:'orange',fontSize:'35px'}}/>
        </Title>
        {/* <hr style={{margin:'20px 0px',fontSize:'4px',color:'#2F2D3F'}}/> */}
        <form name='myForm' >
            {userInfo.map((user)=>(
        <InfoSession key={user.id}>
            <h1 style={{fontSize:'24px',color:'#2F2D3F',fontWeight:'bold'}}>訂購者資訊</h1>
            <br/>
            <hr/>
            <br/>
            <h1>姓名</h1>
            <Info name='fullname' placeholder=' Name' value={getOrder.fullname} onChange={(e)=>{handleChange(e, 'fullname')}} />  
            <h1>電話</h1>
            {/* <Info placeholder=' Phone' defaultValue={user.fullname}/> */}
            <Info name='tel' placeholder=' Phone' value={getOrder.tel} onChange={(e)=>{handleChange(e, 'tel')}}/>
            <h1>Email</h1>
            <Info name='email' placeholder=' Email Address' value={getOrder.email} onChange={(e)=>{handleChange(e, 'email')}} />
            <h1>寄件地址</h1>
            <p>城市</p>
            <Info name='country' placeholder=' Address' value={getOrder.country} onChange={(e)=>{handleChange(e, 'country')}}/>
            <p>地區</p>
            <Info name='township' placeholder=' Address' value={getOrder.township} onChange={(e)=>{handleChange(e, 'township')}}/>
            <p>詳細地址</p>
            <Info name='address_line' placeholder=' Address' value={getOrder.address_line} onChange={(e)=>{handleChange(e, 'address_line')}}/>
            {/* <Info placeholder=' Address' style={{width:'500px'}}/> */}
        </InfoSession>
        
))}
</form>
        <SaveButton onClick={handleSubmit}>Submit</SaveButton>

        {openSnackBar && (
          <Snackbar
            className={''}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackBar}
            onClose={() => {
              setOpenSnackBar(false)
            }}
            message={snackBarMsg}
            key={'bottomright'}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            sx={{
              '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation6.MuiSnackbarContent-root.css-74qdv3-MuiPaper-root-MuiSnackbarContent-root':
                {
                  backgroundColor: 'rgba(255,165,174,.8)',
                  // backgroundColor: '#bbb',
                  // backgroundColor: '#fff',
                  border:'dotted 3px rgba(255,255,255,.9)',
                  color: '#fff',
                  // color: 'rgba(255,165,174,.9)',
                  fontWeight:'bold',
                },
            }}
          />
        )}
    </Container>
    
  )
}

export default ShippingAddress