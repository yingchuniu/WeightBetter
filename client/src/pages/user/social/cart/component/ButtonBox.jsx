import React from 'react'
import styled from 'styled-components'
import { useCart } from '@/context/useCart';
import { useNavigate } from 'react-router-dom'
const BtnBox=styled.div`
display:flex;
padding:20px;
`
const Button = styled.button`
padding:8px 20px;
width:300px;
height:60px;
background-Color:#FFA5AE ;
border-radius:12px;
color:#fff;
font-size:24px;
margin:20px;
display:flex;
align-item:center;
justify-content:center;
box-shadow: 10px 5px 20px #A9A9A9;
&:hover{
background-Color:#1BB6B2;
box-shadow: inset 10px 10px 10px #21a29e;

}
`
const Button2 = styled.button`
padding:8px 20px;
width:300px;
height:60px;
background-Color:#fff ;
border:3px solid #FFA5AE;
border-radius:12px;
color:#FFA5AE;
font-size:24px;
margin:20px;
display:flex;
place-content:center;
box-shadow: 10px 5px 20px #A9A9A9;


&:hover{
background-Color:#1BB6B2;
color:#fff;
border:none;
}
`
const Button3 = styled.button`
padding:0px 20px;
width:300px;
height:60px;

color:#FFA5AE;
font-size:26px;
margin:20px;
display:flex;

&:hover{
Color:#1BB6B2;
border:none;
}
`
// const Image =styled.img`
// width:300px;
// `
const ButtonBox = ({openSnackBar,setOpenSnackBar, snackBarMsg ,setSnackBarMsg }) => {
    const {
        cart,
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        isInCart,
        plusOne,
        minusOne,
    } = useCart()
    
    const navigate = useNavigate();
    const continueShop =()=>{
        navigate(`/shop`)
    }
    const checkOut =()=>{
        navigate(`/shop/mycheckout`)
        
    }
  return (<>
    <BtnBox>
        <Button2 onClick={()=>continueShop()}>Continue Shopping</Button2>
        <Button onClick={()=>checkOut()}>Check out</Button>
    </BtnBox>

    <BtnBox>
        <Button3 onClick={()=>{clearCart();
            setSnackBarMsg('已清除購物車!')
            setOpenSnackBar(true)
            }}>Reset</Button3>
    </BtnBox>
</>
  )
}

export default ButtonBox