import React from 'react'
import styled from 'styled-components'
import ShopCards from './component/ShopCards'
import Title from './component/Title'
import ClickButton from '../ClickButton'
import { Link } from 'react-router-dom'
// import Button1 from './component/Button1'

const Container = styled.div`
  height: calc(100vh - 64px);
  ${
    '' /* display:flex;
  flex-direction:column; */
  }
  position:relative;
  ${'' /* display:flex; */}
  ${'' /* background-color:lavender; */}
`
const ImgSession = styled.div`
  width: 15%;
`
const Img1 = styled.img`
  width: 10%;
  position: absolute;
  left: 20px;
  bottom: 20px;
  animation: fadeInOut 8s infinite;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`
const Img2 = styled.img`
  width: 5%;
  position: absolute;
  left: 200px;
  bottom: 20px;
  animation: fadeInOut 10s infinite;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`
const Img3 = styled.img`
  width: 5%;
  position: absolute;
  right: 20px;
  top: 30px;
  ${'' /* transform: rotate(45deg); */}
`
const Img4 = styled.img`
  width: 5%;
  position: absolute;
  right: 150px;
  top: 30px;
  animation: fadeInOut 10s infinite;

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`
const ButtonBox = styled.div`
  ${
    '' /* display:flex;
  place-content:center; */
  }
  position:absolute;
  right: 53%;
  top: 85%;
  animation:heart 1.5s ease-in-out infinite alternate;
  @keyframes heart{
    from{transform:translate(0,0);}
    to{transform:translate(0,30px);}
  }
`

const HomeShop = () => {
  return (
    <Container>
      <Title />
      <ShopCards />
      {/* <Button1/> */}
      <ImgSession>
        <Img1 src="HomeImgs\121.png" />
        <Img2 src="HomeImgs\未命名-3.png" />
        <Img3 src="HomeImgs\未命名-1.png" />
        <Img4 src="HomeImgs\未命名-2.png" />
        <ButtonBox>
          <Link to={`/shop`}><ClickButton /></Link>
        </ButtonBox>
      </ImgSession>
    </Container>
  )
}

export default HomeShop
