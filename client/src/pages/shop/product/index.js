import React, { useEffect, useState } from "react";
import * as Mui from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import Products from "../components/Products";
import styled from "styled-components";
import Categories from "../components/Categories";
import SearchIcon from '@mui/icons-material/Search';
import Snackbar from '@mui/material/Snackbar'
import Fade from '@mui/material/Fade'
import { useCart } from "@/context/useCart";
import Footer from "@/pages/global/Footer";

// import ShopSelect from "../components/Input/ShopSelect";

const Container =styled.div`
${'' /* padding:50px 0px; */}
width:100%;
height:100%;
margin:auto;
position:relative;
display:flex;
flex-direction:column;
${'' /* justify-content:center; */}
${'' /* align-items:center; */}
@media (max-width: 768px) {
  flex-direction: column;
  width:350px;
  padding:15px 25px;

  }
`
const Filter = styled.div`
margin:0px 0px 0px 0px;
position:absolute;
top:0px;
right:100px;
@media (max-width: 768px) {
  ${'' /* flex-direction: column; */}
  width:350px;
  ${'' /* padding:15px 25px; */}
  margin:15px 10px;

  }

`
const SearchContainer =styled.div`
${'' /* width:100%; */}
position:relative;
margin:20px 0px 0px 100px;
display:flex;
align-items:center;
@media (max-width: 768px) {
  margin:15px 10px;
  }
`
const Search =styled.input`
background-color:#eee;
border:solid 1px #aaa;
border-radius:5px;
width:200px;
height:30px;
@media (max-width: 768px) {
  margin:15px 10px;
  }

`
const Wrapper =styled.div`
margin: 0px 0px 0px 0px;
display:flex;
justify-content:center;
align-items:center;
`



const Shop = () => {

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

    

    const [filters,setFilters] = useState({order: '', range: ''});
    const [productList, setProductList] = useState([])
    const [favProductList, setFavProductList] = useState([])

    const [search, setSearch] = useState('')

    const [openSnackBar, setOpenSnackBar] = useState(false)
    const [snackBarMsg, setSnackBarMsg] = useState('')
    
    const {cateId} = useParams()

    const uid = localStorage.getItem('user')!=='null'? JSON.parse(localStorage.getItem('user')).id : 0
    console.log('uid', uid)

    // console.log('cateId1', cateId)

    useEffect(() => {
      console.log('effect')
      getProducts()
      getFavProducts()
    }, [cateId])

    const getProducts = () => {
        const url = cateId? `http://localhost:8080/product/getProductbycate/${cateId}` : `http://localhost:8080/product/getProduct`
        fetch(url, {
          method: 'get'
        })
        .then(r => r.json())
        .then(rData => {
          console.log(url, rData)
          setProductList(rData)
        })
      }

      const getFavProducts = () => {
        const url = `http://localhost:8080/product/product-fav/${uid}`
        fetch(url)
        .then(r => r.json())
        .then(rData => {
            console.log(url, rData)
            rData = rData.map(el => el.product_id)
            setFavProductList(rData)
        })
    }

    const handleSearch = () => {
        console.log(search)

        const usp = new URLSearchParams()
        usp.set('search', search)
        const url = `http://localhost:8080/product/product-search?${usp.toString()}`  // 改成自己的路由
        fetch(url)
          .then((r) => r.json())
          .then((rData) => {
            console.log(url, rData)
            if(search.length>0){
            setProductList(rData.rows)}else{
              // alert('請輸入搜尋關鍵字')
              setSnackBarMsg('請輸入搜尋關鍵字')
              setOpenSnackBar(true)
            }
          })
      }

      const handleFilter = (e, type) => {
        if (type==='order'){
            setFilters({...filters, order: e.currentTarget.value})
        } else {
            setFilters({...filters, range: e.currentTarget.value})
        }
        console.log(filters)

      }

   
      
    return (
        <div key={window.location.pathname}>
        
        <Container>
            <Categories/>
            <SearchContainer>
            
                <Search placeholder=" Search" type="search" 
            name="search" value={search} onChange={(e) => {setSearch(e.currentTarget.value)}}/>
            <button><SearchIcon onClick={handleSearch}/></button>
            
                <Filter>
                <select style={{backgroundColor:"#eee", borderRadius:"5px",width:"200px",height:"30px",marginRight:"10px"}} value={filters.order} onChange={(e) => {handleFilter(e, 'order')}}>
                    <option value="">請選擇</option>
                    <option value="asc">價錢由高至低</option>
                    <option value="desc">價錢由低至高</option>
                </select>
                <select style={{backgroundColor:"#eee", borderRadius:"5px",width:"200px",height:"30px"}} value={filters.range} onChange={(e) => {handleFilter(e, 'range')}} >
                    <option value="">請選擇</option>
                    <option value={'500'}>500元以下</option>
                    <option value={'500,1000'}>500~1000元</option>
                    <option value={'1000,1500'}>1000~1500元</option>
                </select>
                </Filter>
            </SearchContainer>

            <Wrapper>
                <Products uid={uid} cateId={cateId} filters={filters} productList={productList} setProductList={setProductList} favProductList={favProductList} setFavProductList={setFavProductList} getFavProducts={getFavProducts} openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} />
            </Wrapper>
        </Container>
        {openSnackBar && (
          <Snackbar
            className={''}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={openSnackBar}
            onClose={() => {
              setOpenSnackBar(false)
            }}
            message={snackBarMsg}
            key={'bottomright'}
            autoHideDuration={3000}
            TransitionComponent={Fade}
            sx={{
              '& .MuiPaper-root.MuiPaper-elevation.MuiPaper-elevation6.MuiSnackbarContent-root.css-74qdv3-MuiPaper-root-MuiSnackbarContent-root':
                {
                  backgroundColor: 'rgba(255,165,174,.8)',
                  // backgroundColor: '#bbb',
                  // backgroundColor: '#fff',
                  border:'dotted 3px rgba(255,255,255,.9)',
                  color: '#fff',
                  // color: 'rgba(255,165,174,.9)',
                  fontWeight:'bold',
                  textAlign:'center',
                },
            }}
          />
        )}
        
        </div>
        
    )
}

export default Shop