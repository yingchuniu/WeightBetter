import React from "react";
import styled from "styled-components";
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
// import DeleteIcon from '@mui/icons-material/Delete';
import {useNavigate, } from "react-router-dom"
import ShoppingCart from "./component/ShoppingCart";
import { useState } from "react";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { useCart } from '@/context/useCart';
import OrderSummary from "./component/OrderSummary";
import ButtonBox from "./component/ButtonBox";
import Snackbar from '@mui/material/Snackbar'
import Fade from '@mui/material/Fade'
import ImageFloat from "./component/ImageFloat";

const Container = styled.div`
    padding:50px 100px;
    display:flex;
    @media (max-width: 768px) {
    flex-direction: column;
    width:350px;
    padding:15px 25px;

  }
`
const Wrapper = styled.div`
padding:0px 100px;
display:flex;
flex-direction:column;
flex:2;
${'' /* flex:2; */}
@media (max-width: 768px) {
    flex-direction: column;
    width:350px;
    padding:15px 25px;

  }
`

const Title = styled.h1`
text-align:center;
font-weight:bold;
font-size:36px;
margin-bottom:20px;
color:#2F2D3F;
`
const Wrapper2= styled.div`
${'' /* padding:0px 100px; */}
${'' /* margin-right:50px; */}
display:flex;
flex-direction:column;
${'' /* flex:2; */}
`
const ImgBox= styled.div`
    display:flex;
    align-item:center;

`
const Image =styled.img`
width:600px;
${'' /* align-item:center; */}

`




const Cart = ( ) => {

const navigate = useNavigate();
const [quantity,setQuantity] = useState(1)

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

console.log('items', items)

const continueShop =()=>{
    navigate(`/shop`)
}
const checkOut =()=>{
    navigate(`/shop/mycheckout`)
}


const handleQuantity = (type)=>{
    if(type === "dec"){
        quantity >1 && setQuantity(q=>q-1)
    }else{
        setQuantity(q=>q+1)

    }
}
const [openSnackBar, setOpenSnackBar] = useState(false)
const [snackBarMsg, setSnackBarMsg] = useState('')

    // const [cartItem,setcartItem]= useState([])
  
    // const {pid} = useParams()
  
    // useEffect (()=>{
    //   getProduct()
    // },[])
  
    // const getProduct = ()=>{
    //   const url = `http://localhost:8080/product/getProduct/${pid}`
    //   fetch(url,{
    //     method:'get'
    //   })
    //   .then(r =>r.json())
    //   .then(rData=>{
    //     console.log(url,rData)
    //     setcartItem(rData)
    //   })
  
    // }

    return (

    <Container >
        <Wrapper>
                <Title>My Cart  <AutoAwesomeIcon style={{color:"orange",fontSize:"30px"}}/></Title>
                <hr style={{}}/>
                {items?.map((item, idx) => (
            <ShoppingCart
              key={item.id}
              id={item.id}
              image={item.img_src}
              title={item.name}
              price={item.price} 
              color={item.color}
              size={item.size}
              quantity={item.quantity}
            />
          ))}
          
          <ButtonBox openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} />
            
        </Wrapper>
        <Wrapper2>
        <OrderSummary/>
        <ImgBox>
            {/* <Image src="\ImagesShop\5307.png"/> */}
            <ImageFloat/>
        </ImgBox>
        </Wrapper2>

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
                textAlign:'center',
              },
          }}
        />
      )}
    </Container>
    )
}

export default Cart;
            
