import React from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SearchIcon from '@mui/icons-material/Search'
import { useNavigate } from 'react-router-dom'
import Card_data from './Card_data'

const Container = styled.div`
  ${'' /* flex:1; */}
  display:flex;
  flex-direction: column;
  margin: 15px 15px;
  align-item: center;
  justify-align: center;
  width: 16%;
  height:414px;
  border-radius: 15px;
  box-shadow: 5px 5px 10px grey;
  overflow: hidden;
 
  &:hover {
    transform:scale(1.1);
  
`

const Image = styled.img`
  height: 65%;
  object-fit: contain;
  display: flex;
  justify-align: center;
  align-items: center;
  cursor: pointer;
`
const Info = styled.div`
  padding: 5px 0px;
  width: 100%;
  height: 100%;
  display: flex;
`
const Icon = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background-color: #1bb6b2;
  }
`
const Icon2 = styled.div`
  width: 40px;
  height: 40px;
  margin-right: 5px;
  margin: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
    background-color: #ffa5ae;
  }
`
const ProductInfo = styled.h2`
  margin: 10px;
  font-weight: bold;
  cursor: pointer;
`

const ShopCard = () => {
  const CardData = Card_data

  return (
    <>
      {CardData.map((item) => (
        <Container key={item.id}>
          <Image src={item.img} />
          <ProductInfo>{item.product_name}</ProductInfo>
          <ProductInfo>${item.price}</ProductInfo>
          <Info>
            <Icon>
              <ShoppingCartIcon />
            </Icon>
            <Icon2>
              <FavoriteIcon />
            </Icon2>
            <Icon>
              <SearchIcon />
            </Icon>
          </Info>
        </Container>
      ))}
      {/* {CardData2.map((item) => (
        <Container2 key={item.id}>

          <Image src={item.img} />
          <ProductInfo>{item.product_name}</ProductInfo>
          <ProductInfo>${item.price}</ProductInfo>
          <Info>
            <Icon>
              <ShoppingCartIcon />
            </Icon>
            <Icon2>
              <FavoriteIcon />
            </Icon2>
            <Icon>
              <SearchIcon />
            </Icon>
          </Info>
        </Container2>
      ))} */}
    </>
  )
}

export default ShopCard
