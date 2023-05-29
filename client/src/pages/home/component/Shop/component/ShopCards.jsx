import React from 'react'
import styled from 'styled-components'
import ShopCard from './ShopCard'

const Wrapper =styled.div`

`
const Container = styled.div`
  position:absolute;
  left:70px;
  padding: 20px;
  margin:auto;
  display: flex;
  place-content:center;
  flex-wrap: wrap;
  align-items:center;
  animation: fadeInOut 10s ;
  backface-visibility: hidden;
  
`
const Container2 = styled.div`
  position:absolute;
  left:70px;

  padding: 20px;
  margin:auto;
  display: flex;
  place-content:center;
  flex-wrap: wrap;
  align-items:center;
  animation: fadeInOut 10s ;
  transform: rotateY(-150deg);
  backface-visibility: hidden;

  &:hover{
    ${'' /* transform: rotateY(0); */}
  }
`

const ShopCards = () => {
  return (<>
    <Container>
            <ShopCard/>
            {/* <ShopCardBack/> */}
    </Container>
    {/* <Container2>
    <ShopCard/>
    </Container2> */}
    </>
  )
}

export default ShopCards