
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Product from './Product'
import { useNavigate, useParams } from 'react-router-dom'


const Container = styled.div`
  padding: 20px;
  margin:auto;
  display: flex;
  ${'' /* flex-wrap: wrap; */}
  justify-content:center;
  align-items:center;
  ${'' /* justify-content: left; */}
  animation: fadeIn 2s ;
  @media (max-width: 768px) {
    flex-direction: column;
  ${'' /* width:350px; */}
  ${'' /* padding:15px 25px; */}

  }
`
const Wrapper = styled.div`
  ${'' /* padding: 20px; */}
  margin:auto;
  width:1300px;
  display: flex;
  flex-wrap: wrap;
  ${'' /* justify-content:center; */}
  align-items:center;
  ${'' /* justify-content: left; */}
  justify-content: space-between;
  animation: fadeIn 2s ;
  &:after {
    content: "";
    flex: 0 0 calc(20% - 20px);
  }
  @media (max-width: 768px) {
    flex-direction: column;
  width:350px;
  ${'' /* padding:15px 25px; */}

  }
`
const Products = ({uid, cateId, sort, filters, productList, setProductList, favProductList, setFavProductList, getFavProducts, openSnackBar,setOpenSnackBar, snackBarMsg, setSnackBarMsg}) => {
  // const [categoryId, setCategoryId] = useState('')
  // const [categoryId, setCategoryId] = useState('')

  let newProductList
  if (filters.order==='asc'){
    newProductList = productList.sort((a, b) => {
      return b.unit_price - a.unit_price
    })
    
  } 
  else if (filters.order==='desc'){
    newProductList = productList.sort((a, b) => {
      return a.unit_price - b.unit_price
    })
    
  } else{
    newProductList=productList
  }

  let newProductList2
  if (filters.range==='500'){
    newProductList2 = newProductList.filter((p) => {
      return p.unit_price <= 500
    })
    
  } 
  else if (filters.range==='500,1000'){
    newProductList2 = newProductList.filter((p) => {
      return p.unit_price > 500 && p.unit_price < 1000
    })
    
  } else if (filters.range==='1000,1500'){
    newProductList2 = newProductList.filter((p) => {
      return p.unit_price > 1000
    })
    
  } 
  else{
    newProductList2 = newProductList
  }

  console.log('cateId2', cateId)

  return (
  <div>
  
    <Container>
      <Wrapper>
        {/* {[1, 2, 3].map((ele) => {return ele +2 })} */}
          {newProductList2
          .map((item)=>(
              <Product uid={uid} item={item} key={item.product_id} favProductList={favProductList} setFavProductList={setFavProductList} getFavProducts={getFavProducts} openSnackBar={openSnackBar} setOpenSnackBar={setOpenSnackBar} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} />))}
      </Wrapper>
    </Container>
  </div>
  )
}

export default Products