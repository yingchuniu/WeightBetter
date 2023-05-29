import React from 'react'
import styled from 'styled-components'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom'
import { useCart } from '@/context/useCart';

import { useState } from 'react';

    
const Container = styled.div `
    ${'' /* flex:1; */}
    display:flex;
    flex-direction:column;
    margin:15px 10px;
    align-item:center;
    justify-align:center;
    ${'' /* min-width: 280px; */}
    ${'' /* width: 33.33%; */}
    ${'' /* max-width:310px; */}
    ${'' /* max-height:414px; */}
    height:414px;
    ${'' /* min-height:330px; */}
    border-radius: 15px;
    box-shadow: 5px 5px 10px grey;
    overflow:hidden;
    
    

    &:hover {
        ${'' /* transform:scale(1.1); */}
    transform: translate3d(5px,0px,2px);
    transition:all .3s ease-in-out ;
    }
    
`
const Circle = styled.div `
    
    ${'' /* width:200px;
    height:200px;
    border-radius:50%;
    background-color:white; */}
`
// const ImageSession = styled.div `
//     ${'' /* height:100%; */}
//     display:flex;
//     justify-align:center;
//     align-items:center;
//     ${'' /* cursor:pointer; */}
// `
const Image = styled.img `
    height:65%;
    object-fit:contain;
    display:flex;
    justify-align:center;
    align-items:center;
    cursor:pointer;
`
const Info = styled.div `
    padding:5px 0px;
    width:100%;
    height:100%;
    display:flex;
    
    

`
const Icon = styled.div `
    width:40px;    
    height:40px;
    margin-right:5px;
    margin:5px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    cursor:pointer;

    &:hover {
        transform:scale(1.1);
        background-color: #1BB6B2;
        
    }
    
`
const Icon2 = styled.div `
    width:40px;    
    height:40px;
    margin-right:5px;
    margin:5px;
    display:flex;
    align-items:center;
    justify-content:center;
    border-radius:50%;
    cursor:pointer;

    &:hover {
        transform:scale(1.1);
        background-color: #FFA5AE;
        
    }
    
`
const ProductInfo = styled.h2`
    margin:10px;
    font-weight:bold;
    cursor:pointer;
    
`





const Product = ({uid, item, favProductList, setFavProductList, getFavProducts}) => {


    const navigate = useNavigate();
    const gotoDetail = (pid) => {
        console.log('click')
        navigate(`/shop/productdetails/${pid}`)
    }
    // const gotoCategory =() => {
    //     navigate(`/shop/${category}`)
    // }

    const {
        cart,
        items,
        addItem,
        removeItem,
        updateItem,
        clearCart,
        isInCart,
        plusOne,
        minusOne,
    } = useCart()

    const addOrCancelFav = () => {

        if (uid){
            const url = `http://localhost:8080/product/product-fav-add/${uid}/${item.product_id}`
            fetch(url)
            .then(r=>r.json())
            .then(rData => {
                console.log(url, rData)
                getFavProducts()
            })
        } else {
            alert('先登入才能收藏')
        }
    }

    return (
        <Container >
            <Circle />
            {/* <ImageSession> */}
            <Image src={item.img_src} onClick={() => {gotoDetail(item.product_id)}}/>
            {/* </ImageSession> */}
            <ProductInfo onClick={() => {gotoDetail(item.product_id)}}>{item.name}</ProductInfo>
            <ProductInfo>${item.unit_price}</ProductInfo>
            <Info>
                <Icon>
                    <ShoppingCartIcon style={{color:"#2F2D3F"} } onClick={()=>addItem({
                        id: item.product_id, 
                        quantity: 1, 
                        name: item.name, 
                        price: item.unit_price
                        ,...item
                    })} />
                </Icon>
                <Icon2 onClick={addOrCancelFav}>
                    {favProductList.includes(item.product_id)? <FavoriteIcon style={{color:"#2F2D3F"} }/> : <FavoriteBorderIcon style={{color:"#2F2D3F"} }/>}
                </Icon2>
                <Icon>
                    <SearchIcon style={{color:"#2F2D3F"} } onClick={() => {gotoDetail(item.product_id)}}/>
                </Icon>
            </Info>
        </Container>
    )
}

export default Product