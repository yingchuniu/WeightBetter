import React from 'react'
import styled from "styled-components";
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ClickButton from '../ClickButton';

const Container =styled.div`

`
const Wrapper =styled.div`
flex-grow: 1;
${'' /* animation: fadeIn 5s ; */}


${'' /* 
@keyframes fadeIn {
    0% {
    opacity: 0
    }
    50% {
    opacity: 1
    }
    100% {
    opacity: 0
    }

} */}
`
const Round =styled.div`
    width: 260px;
    height:25% ;
    border-radius: 50%;
    background-color: #1bb6b1b4;
    position: absolute;
    z-index: -1;
    right: 200px;
    top: 700px;
    animation: fadeInOut 6.5s infinite;

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
const Round2 =styled.div`
 width: 400px;
    height: 400px;
    border-radius: 50%;
    /* border: solid 1px #1BB6B2; */
    background-color: #1bb6b14e;
    position: absolute;
    z-index: -1;
    right: 0;
    top: 500px;
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
const Round3 =styled.div`
 width: 300px;
    height: 300px;
    border-radius: 50%;
    /* border: solid 1px #1BB6B2; */
    background-color: #f58879b0;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 380px;
    animation: fadeInOut 7s infinite;
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
const Round4 =styled.div`
    width: 400px;
    height: 400px;
    border-radius: 50%;
    /* border: solid 1px #1BB6B2; */
    background-color: #f5887946;
    position: absolute;
    z-index: -1;
    left: 80px;
    top: 500px;
    animation: fadeInOut 3s infinite;
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
const Img1 =styled.img`
    width: 300px;
    position: absolute;
    z-index: 18;
    top: 430px;
    top: 65%;
    left: 200px;
    left: 10%;
    background-attachment:fixed;

`
const TitleSession=styled.div`
    animation: fadeInOut 8s infinite;


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
const Title =styled.h1`
    position: absolute;
    z-index: 18;
    left: 750px;
    top: 500px;
    left: 45%;
    top: 50%;
    margin:auto;
    font-family: 'Inter', sans-serif;
    font-weight: 500;
    font-size:1em;
    animation: fadeInOut 10s infinite;


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
const Icon =styled.div`
    position: absolute;
    left: 35%;
    top: 40%;
`
const Icon2 =styled.div`
    position: absolute;
    left: 65%;
    top: 40%;
`
const Img2 =styled.img`
max-width: 25%;
${'' /* max-width: 466px; */}
    ${'' /* max-height: 547px; */}
    text-align: left;
    position: absolute;
    left: 0;
    z-index: -2;
    background-attachment: fixed;

`
const Img3 =styled.img`
    text-align: right;
    max-width: 48%;
    ${'' /* max-width: 890px; */}
    ${'' /* max-height: 890px; */}
    float: right;
    position: absolute;
    right: 0;
    z-index: -2;
    background-attachment: fixed;

`
const ClickBox=styled.div`
    position:absolute;
    left:48%;
    top:80%;
    animation:heart 1.5s ease-in-out infinite alternate;
  @keyframes heart{
    from{transform:translate(0,0);}
    to{transform:translate(0,30px);}
  }
`




function firstPage() {
  return (
    <div style={{height: 'calc(100vh - 64px)'}}>
        <Container style={{height: 'calc(100vh - 64px)'}}>
        <Wrapper style={{height: 'calc(100vh - 64px)'}}>
            <Round/>
            <Round2/>
            <Round3/>
            <Round4/>
            <Img1 src="HomeImgs\跑步 圖.png"/>
            <TitleSession>
                <Icon>
                    <AutoAwesomeIcon  style={{color:"orange",fontSize:'50px'}}/>
                </Icon> 
                <Title>從今天開始，遇見更好的自己 </Title>
                <Icon2>
                    <AutoAwesomeIcon style={{color:"orange",fontSize:'50px'}}/>
                </Icon2>
                {/* <ClickBox>
                <ClickButton/>
                </ClickBox> */}
            </TitleSession>
            <Img2 src="HomeImgs\messageImage2_.jpg"/>
            <Img3 src="HomeImgs\messageImage_1676258778039.jpg"/>
            
        </Wrapper>
    </Container></div>
  )
}

export default firstPage