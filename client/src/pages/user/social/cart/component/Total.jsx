import React from 'react'
import styled from 'styled-components'
import { useCart } from '@/context/useCart'
const MyNumber = styled.div`
padding:0px 20px;
`


const Total = () => {

  const {    cart,
    items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    isInCart,
    plusOne,
    minusOne} = useCart()

  const getTotal = () => {
    let totalQuantity = 0
    let totalPrice = 0
    items.forEach(item => {
      totalQuantity += item.quantity
      totalPrice += item.price * item.quantity
    })
    return {totalPrice, totalQuantity}
  }
  return (
    <div>
        <MyNumber> 
        {/* <p className="total__p"> */}
          total ({getTotal().totalQuantity} items) 
          : <strong>${getTotal().totalPrice}</strong>
        {/* </p> */}
        </MyNumber>
    </div>
  )
}

export default Total