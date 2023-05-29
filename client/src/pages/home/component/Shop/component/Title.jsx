import React from 'react'
import styled from 'styled-components'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import FlareIcon from '@mui/icons-material/Flare';

const Container = styled.div`
    display:flex;
    width:30%;
    height:150px;
    margin:auto;
    margin-top:30px;
    text-align:center;

`
const ShopTittle = styled.h1`
    font-size:36px;
    display:flex;
    margin:auto;
    ${'' /* place-content:center; */}
    ${'' /* text-align:center; */}
`
const Icon = styled.div`
    display:flex;
    animation: fadeInOut 5s infinite;


@keyframes fadeInOut {
    0% {
    opacity: 0
    }
    50% {
    opacity: 1
    }
    100% {
    opacity: 0
    }

}
`


const Title = () => {
  return (
    <Container>
    <Icon>
        <AutoAwesomeIcon style={{color:"orange",fontSize:"50px"}}/>
    </Icon>
    <ShopTittle>商城</ShopTittle>
    <Icon>
        <AutoAwesomeIcon style={{color:"orange",fontSize:"50px"}} />
    </Icon>
    
    </Container>
  )
}

export default Title