import React from 'react'
import styled from 'styled-components'

const Container =styled.div`
padding:20px;
margin:10px 25px;
border:dashed 3px #ccc;
background-color:#eee;
width:600px;
height:100px;
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
const Delivery = () => {
  return (
    <Container>
        <Title>Delivery</Title>
        <p>送貨方式</p>
        <br/>
        <select style={{width:'200px',height:'30px',backgroundColor:'#fff',borderRadius:'8px'}}>
          <option>請選擇</option>
          <option>711取貨便</option>
          <option>全家取貨便</option>
          <option>宅配</option>
        </select>
    
    </Container>
  )
}

export default Delivery