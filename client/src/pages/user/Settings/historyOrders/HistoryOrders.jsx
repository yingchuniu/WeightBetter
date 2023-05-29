import React from 'react'
import { useAuth } from '@/hooks/AuthContext'
import UserService from '@/services/user.service'
import { Box, Typography } from '@mui/material'
import { DataGrid, GridToolbar, zhTW } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import FlexBox from '@/components/FlexBox/FlexBox'
import { useParams } from 'react-router-dom'
import Header from '../../components/header'

function HistoryOrders() {
  const { currentUser } = useAuth()
  const [orders, setOrders] = useState([])
  const params = useParams()
  const userParams = params.username

  // fetch order data
  useEffect(() => {
    UserService.userOrders(currentUser.username).then((res) => {
      setOrders(res.data)
    })
  }, [currentUser])

  const columns = [
    { field: 'id', headerName: '訂單編號' },
    {
      field: 'order_date',
      headerName: '訂購日期',
      flex: 1,
      cellClassName: 'name-column--cell',
    },
    {
      field: 'address',
      headerName: '收件地址',
      flex: 1,
    },
    {
      field: 'total_amount',
      headerName: '總金額',
      flex: 1,
    },
    // {
    //     field: "cost",
    //     headerName: "Cost",
    //     flex: 1,
    //     renderCell: (params) => <Typography color="teal">${params.row.cost}</Typography>,
    // },
  ]

  return (
    <Box>
      <Header title="歷史訂單" />
      <Box
        m="10px 0 0 0"
        height="75vh"
        sx={{
          '& .MuiDataGrid-main': {
            borderRadius: '8px',
          },
          '& .MuiDataGrid-root': {
            border: 'none',
          },
          '& .MuiDataGrid-cell': {
            borderBottom: '1px solid black.light',
          },
          '& .name-column--cell': {
            color: '',
          },
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: 'primary.light',
            color: 'black.main',
            borderBottom: 'none',
          },
          '& .MuiDataGrid-virtualScroller': {
            backgroundColor: 'neutral.light',
          },
          '& .MuiDataGrid-footerContainer': {
            borderTop: 'none',
            backgroundColor: 'primary.light',
          },
          '& .MuiCheckbox-root': {
            color: `primary.main !important`,
          },
        }}
      >
        <DataGrid
          rows={orders}
          columns={columns}
          localeText={zhTW.components.MuiDataGrid.defaultProps.localeText}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  )
}

export default HistoryOrders
