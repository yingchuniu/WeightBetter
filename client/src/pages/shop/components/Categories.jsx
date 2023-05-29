
import styled from "styled-components"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useEffect } from "react"
import { useState } from "react"
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { hover } from "@testing-library/user-event/dist/hover"

const Container = styled.div`
    display:flex;
    margin:50px 100px 0px 100px;
    align-items:center;
    justify-align:center;
    @media (max-width: 768px) {
    flex-direction: column;
    margin:auto;
    font-size:13px;
  }
`
const Category =styled.p`
    margin:0px 25px 0px 0px;
    display:flex;
    align-items:center;
    justify-align:center;
    color:#2F2D3F;
    font-size:20px;

&:hover{
  transform:scale(1.1);
}
`
const StarIcon =styled.div`
display:none;
width:30px;
height:30px;


&:hover{
  display:block;
}
`


const Categories = () => {

  // const [cate,setCate]= useState([])
  // const {pcategory} = useParams()
  // const {cateId} = useParams()

  // useEffect (()=>{
  //   getProduct()
  // },[])

  // const getProduct = ()=>{
  //   const url = `http://localhost:8080/product/getProduct/:pcategory`
  //   fetch(url,{
  //     method:'get'
  //   })
  //   .then(r =>r.json())
  //   .then(rData=>{
  //     console.log(url,rData)
  //     setCate(rData)
  //   })

  // }


  // const navigate = useNavigate();


  return (<>
    {/* {cate.map((item)=>(
        <Category><Link>/乳清蛋白營養品</Link></Category>
        <Category onClick={()=>{gotoCategory(item.category)}}>/乳清蛋白營養品</Category>
        <Category onClick={gotoCategory}>/瑜珈器材</Category>
        <Category onClick={gotoCategory}>/重訓器材</Category>
    ))} */}
    <Container>
        {/* <Link to={`/shop/${item.category}`}>
        <Category >{item.category}</Category>
        </Link> */}
        {/* <Category >{item.category}</Category> */}
        {/* <Category >
          <Link to={`/shop/1`}>
          /乳清蛋白營養品
            <StarIcon>
              <AutoAwesomeIcon style={{color:"orange",fontSize:"30px",}} />
            </StarIcon>
          </Link>
        </Category> */}
        <Category >
        <Link to={`/shop`}>
          / 全部商品
            <AutoAwesomeIcon style={{color:"orange",fontSize:"30px"} }  />
          </Link>
        </Category>
        <Category >
          <Link to={`/shop/1`}>
          / 乳清蛋白營養品 
            <AutoAwesomeIcon style={{color:"orange",fontSize:"30px"} }  />
          </Link>
        </Category>
        <Category >
          <Link to={`/shop/2`}>/ 瑜珈器材<AutoAwesomeIcon style={{color:"orange",fontSize:"30px"}}/></Link>
        </Category>
        <Category >
          <Link to={`/shop/3`}>/ 重訓器材<AutoAwesomeIcon style={{color:"orange",fontSize:"30px"}}/></Link>
        </Category>
    </Container>
   
    </>
  )
}

export default Categories