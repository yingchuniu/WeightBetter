import React from 'react'
import styled from 'styled-components'
import Total from './Total'
const Container =styled.div`
padding:20px;
margin:80px 25px;
border:dashed 3px #ccc;
background-color:#eee;
width:600px;
height:300px;
border-radius:12px;
display:flex;
flex-direction:column;
flex:1;
@media (max-width: 768px) {
    flex-direction: column;
  width:350px;
  padding:15px 25px;

  }
`

const Title =styled.h1`
font-size:24px;
text-align:center;
margin:0px 0px 15px 0px;
color: #2F2D3F;
`


const OrderSummary = () => {
  return (
    <div>
        <Container>
        <Title>OrderSummary</Title>
        <p>Subtotal:</p>
            <p>Shipping Discount</p>
            <Total/>
        </Container>
    </div>
  )
}

export default OrderSummary