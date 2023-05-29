import React,{useState} from 'react'
import styled from "styled-components";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';

import { useCart } from '@/context/useCart';


// const ShoppingCart = styled.div`
// display:flex;
// padding:10px;

// `;

const ShoppingCartContainer= styled.div`
padding:50px 100px;
display:flex;
@media (max-width: 768px) {
    flex-direction: column;
  width:350px;
  padding:15px 25px;

  }
`

const ProductInfo = styled.div`
width:500px;
${'' /* padding:10px; */}
@media (max-width: 768px) {
    flex-direction: column;
  width:350px;
  padding:15px 25px;

  }
`
const Icon = styled.div`
display:flex;

`
const MyNumber = styled.div`
padding:0px 20px;
`


const Image =styled.img`
width:300px;
`


function ShoppingCartItem({url ,id, image, title, price, color, size, quantity}) {
    const [count,setCount] = useState(1);

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
    console.log({url ,id, image, title, price, quantity})


  return (<>  
    <ShoppingCartContainer >
        <div className='imgBox' style={{width:'150px', flexShrink: '0'}}>
            <img src={image} alt={title} style={{width: '100%', }} />
        </div>
            <div key={id}>
                <ProductInfo>
                    <p>product name:{title}</p>
                    <p>color:{color}</p>
                    <p>size: {size}</p>
                    <p>price:{price}</p>
                </ProductInfo>
            </div>
            <Icon>
            <RemoveIcon fontSize={'small'} onClick={()=>minusOne(id)}/>
                <MyNumber>{quantity}</MyNumber>
            <AddIcon  fontSize={'small'} onClick={()=> {plusOne(id)}}/>
            {/* <RemoveIcon fontSize={'small'} onClick={()=>setCount(count-1) }/>
                <MyNumber>{count}</MyNumber>
            <AddIcon  fontSize={'small'} onClick={()=>setCount(count+1) }/> */}
            </Icon>
            <DeleteIcon onClick={() =>{removeItem(id)}}/>

            </ShoppingCartContainer>
            <hr/>
            </>
  )
}

export default ShoppingCartItem