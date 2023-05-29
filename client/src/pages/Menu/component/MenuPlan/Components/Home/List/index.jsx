// import { ListItem } from '@mui/material'
import ListItem from './ListItem'
import React from 'react'
import './styles.css'

function List({list}) {
  return (
    <div className='list-wrap'>
    {list.map(item => <ListItem key={item.id} item={item}/>)}
    
    </div>
  )
}

export default List