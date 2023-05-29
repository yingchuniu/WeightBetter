import * as React from 'react'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MoreHorizSharpIcon from '@mui/icons-material/MoreHorizSharp'

export default function MenuButton({
  showModalUpload,
  setShowModalUpload,
  editMode,
  setEditMode,
}) {
  const [anchorEl, setAnchorEl] = React.useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MoreHorizSharpIcon></MoreHorizSharpIcon>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem
          onClick={() => {
            setShowModalUpload(true)
            handleClose()
          }}
        >
          上傳影片
        </MenuItem>
        <MenuItem
          onClick={() => {
            setEditMode(true)
            handleClose()
          }}
        >
          編輯
        </MenuItem>
      </Menu>
    </div>
  )
}
