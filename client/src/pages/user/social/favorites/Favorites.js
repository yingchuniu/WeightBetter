import {
    Divider,
    Tabs,
    Tab,
    Box,
    Grid,
    Card,
    CardMedia,
    CardContent,
    Typography,
    Container,
    Button,
    CardActions,
    IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Product from "./Product";
import styled from "styled-components";

// const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Container2 = styled.div`
  width:730px;
  padding: 20px;
  ${'' /* margin:0px 0px 0px 20px; */}
  ${'' /* display: flex; */}
  ${'' /* flex-wrap: wrap; */}
  justify-content:center;
  align-items:center;
  ${'' /* justify-content: left; */}
`
const Container1 = styled.div`
  width:700px;
  padding: 20px;
  margin:0px 0px 0px 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content:center;
  align-items:center;
  justify-content: left;
`


const Favorites = () => {

    const [products, setProducts] = useState([])
    const [favProductList, setFavProductList] = useState([])
    const uid = localStorage.getItem('user')!=='null'? JSON.parse(localStorage.getItem('user')).id : 0
    console.log('uid', uid)

    const getFavProducts = () => {
        const url = `http://localhost:8080/product/product-fav/${uid}`
        fetch(url)
        .then(r => r.json())
        .then(rData => {
            console.log(url, rData)
            setProducts(rData)
            setFavProductList(rData.map(el => el.product_id))
        })
    }

    useEffect(() => {
        getFavProducts()
    }, [])
    return (
        <Container2>
            {/* <Typography align="center" variant="h3" fontWeight={600} color="teal.main">
                最愛商品列表
            </Typography> */}
            {/* <br /> */}
            {/* <Divider variant="middle" /> */}
            {/* <Container sx={{ py: 4 }} maxWidth="md"> */}
                {/* End hero unit */}
                {/* <Grid container spacing={4}> */}
                <Container1 className="Wrapper">
                    {products.map((item) => (
                        
                        <Grid item key={item.product_id} sx={{width: '33.33%'}}>
                            <Product uid={uid} item={item} key={item.product_id} favProductList={favProductList}  getFavProducts={getFavProducts} />
                        </Grid>
                    ))}
                </Container1>
                {/* </Grid> */}
            {/* </Container> */}
        </Container2>
    );
};

// {/* <Grid item key={item.product_id} xs={12} sm={6} md={4}> */}

export default Favorites;
