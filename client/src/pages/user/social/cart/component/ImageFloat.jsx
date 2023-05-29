import React from 'react'
import styled from 'styled-components'

const Container=styled.div`

`
const Img1 = styled.img`
  animation:heart 1.5s ease-in-out infinite alternate;
  @keyframes heart{
    from{transform:translate(0,0);}
    to{transform:translate(0,30px);}
  }
`

const ImageFloat = () => {
  return (
    <Container>
        <Img1 src="\ImagesShop\5307.png"></Img1>
    </Container>
  )
}

export default ImageFloat