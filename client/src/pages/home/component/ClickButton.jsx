import React from 'react'
import styled from 'styled-components'
import PanToolAltIcon from '@mui/icons-material/PanToolAlt';

const Box = styled.div`
display:flex;
position:absolute;
animation: fadeInOut 20s ;



&:hover{
transform:scale(1.1);
    cursor:pointer;
    ${'' /* transform:scale(1.1) */}
}
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
const Circle1 = styled.div`
width:120px;
height:120px;
background-color:#1BB6B2;
border-radius:50%;
opacity:20%;
display:flex;
align-items:center;
justify-content:center;

`
const Circle2 = styled.div`
width:50px;
height:50px;
border-radius:50%;
display:flex;
align-items:center;
transform: translate(-85px, 35px); 
justify-content:center;
background-color:#1BB6B2;
${'' /* opacity:0%; */}
text-align:center;
font-weight:Bold;
`
const Pointer =styled.div`
transform: translate(-130px, 75px); 

`



const ClickButton = () => {
  return (
    <Box>
    <Circle1/>
    <Circle2>Cilck</Circle2>
    <Pointer><PanToolAltIcon fontSize='large'/></Pointer>
    </Box>
  )
}

export default ClickButton