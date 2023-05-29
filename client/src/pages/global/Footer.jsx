import React from 'react'
import styled from 'styled-components'

const Container=styled.div`
    height:300px;
    background-color:1BB6B2;
    position:absolute;
    bottom:0;
`
const Wrapper=styled.div`
    height:200px;

`
const Title=styled.h1`

`
const Text=styled.h1`
`


const Footer = () => {
  return (
    <Container>
        <Wrapper>
            <Title>About us</Title>
            <Text>關於Weight Better</Text>
            <Text>Q&A</Text>
            <Text>Q&A</Text>
        </Wrapper>
        <hr/>
    </Container>
  )
}

export default Footer