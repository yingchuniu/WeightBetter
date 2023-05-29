import OrderSummary from './components/OrderSummary'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import styled from 'styled-components'
import ShippingAddress from './components/ShippingAddress'
import Delivery from './components/Delivery'
import Payment from './components/Payment'

const Container= styled.div`
    margin:50px 100px;
    display:flex;
    ${'' /* flex-wrap:wrap; */}
    place-content:center;
    @media (max-width: 768px) {
    flex-direction: column;
  width:350px;
  ${'' /* padding:15px 25px; */}
  margin:10px 10px;

  }
`
const Wrapper =styled.div`
margin:80px 5px;
width:600px;
height:600px;
display:flex;
flex-direction:column;
${'' /* flex:1; */}
@media (max-width: 768px) {
    flex-direction: column;
  ${'' /* width:350px; */}
  ${'' /* padding:15px 25px; */}

  }
`

const MyCheckOut = () => {

  const uid = localStorage.getItem('user')!=='null'? JSON.parse(localStorage.getItem('user')).id : 0
  console.log('uid', uid)
  
  const [userInfo,setUserInfo] = useState([])
    useEffect(() => {
      console.log('effect')

      getUserInfo()

    }, [])

    const getUserInfo = () => {
      const url = `http://localhost:8080/product/getUserInfo/${uid}`
      fetch(url, {
        method: 'get'
      })
      .then(r => r.json())
      .then(rData => {
        console.log(url, rData)
        setUserInfo(rData)
      })
    }
    
    // const getUserInfo = () => {
    //   const url = `http://localhost:8080/product/getUserInfo/${uid}`
    //fetch(url, {
    //     method: 'get'
    //   })
    //   .then(r => r.json())
    //   .then(rData => {
    //     console.log(url, rData)
    //     setProductList(rData)
    //   })
    // }
  return (
    <>
      {userInfo.length===0? false :     
      <Container>
        <ShippingAddress getUserInfo={getUserInfo} setUserInfo={setUserInfo} userInfo={userInfo} />
        <Wrapper>
        <OrderSummary style={{margin:'100px 100px'}}/>
        <Delivery/>
        {/* <Payment/>
         */}
        </Wrapper>
      </Container>}
      {/* {JSON.stringify(userInfo)} */}
    </>
  )
}

export default MyCheckOut