import { Tabs, Tab, Box } from '@mui/material'

import React, { useEffect, useState } from 'react'

import MyStoryList from './components/MyStoryList'
import CollectStoryList from './components/CollectStoryList'
import UserService from '@/services/user.service'
import { useParams } from 'react-router-dom'
import MenuButton from './components/MenuButton'
import Snackbar from '@mui/material/Snackbar'
import Fade from '@mui/material/Fade'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

import styles from './styles/index.module.css'

const Reels = () => {
  const [tab, setTab] = useState({ settab: 'myStory', scrollY: 0 })
  const [firstRender, setFirstRender] = useState(true)
  const { username } = useParams()
  const [storyUser, setStoryUser] = useState({})
  const [showModalUpload, setShowModalUpload] = useState(false)
  const [editMode, setEditMode] = useState(false)
  const [openSnackBar, setOpenSnackBar] = useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState('')

  const uid = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).id
    : 0

  const handleChange = (e, newTab) => {
    setTab({ settab: newTab, scrollY: window.pageYOffset })
  }

  useEffect(() => {
    UserService.userProfile(username).then((r) => {
      console.log('get storyUser data', r.data)
      setFirstRender(false)
      setStoryUser(r.data)
    })
  }, [])

  return (
    <div key={window.location.pathname}>
      <Box
        className={'storyTab d-flex flex-column'}
        style={{ height: 'calc(100% - 48px)' }}
      >
        <Box
          className={
            'storyOrCollect container justify-center align-items-center'
          }
          display={'flex'}
          sx={{
            width: '100%',
            backgroundColor: 'none',
            position: 'relative',
          }}
        >
          <Tabs
            className={
              styles.storyOrCollectTab + ' d-md-flex d-none align-items-center'
            }
            value={tab.settab}
            onChange={handleChange}
            textColor="primary"
            indicatorColor="primary"
            aria-label="secondary tabs example"
          >
            <Tab value="myStory" label="我的影片" />
            {uid === storyUser.id ? (
              <Tab value="myCollect" label="我的收藏" />
            ) : (
              false
            )}
          </Tabs>

          <Select
            className={styles.storyOrCollectSelect + ' d-md-none d-block'}
            value={tab.settab}
            onChange={(e) => {
              handleChange(e, e.target.value)
            }}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
            sx={{
              fontSize: '1rem',
              height: { xs: '48px' },
              '& .MuiSelect-select': {
                // padding: '5px',
                height: '48px',
                fontSize: '1rem',
                display: 'flex',
                alignItems: 'center',
                boxSizing: 'border-box',
              },
              '& fieldset': {
                border: 'none',
                fontSize: '1rem',
              },
            }}
          >
            <MenuItem value="myStory" sx={{ fontSize: '1rem' }}>
              我的影片
            </MenuItem>
            {uid === storyUser.id ? (
              <MenuItem value="myCollect" sx={{ fontSize: '1rem' }}>
                我的收藏
              </MenuItem>
            ) : (
              false
            )}
          </Select>

          {uid === storyUser.id && tab.settab === 'myStory' ? (
            <div
              style={{
                position: 'absolute',
                right: '0px',
                top: '50%',
                transform: 'translate(0, -50%)',
                display: 'flex',
              }}
            >
              {editMode && (
                <Button
                  id="basic-button"
                  onClick={() => {
                    setEditMode(false)
                  }}
                >
                  結束編輯
                </Button>
              )}
              <MenuButton
                showModalUpload={showModalUpload}
                setShowModalUpload={setShowModalUpload}
                tab={tab}
                editMode={editMode}
                setEditMode={setEditMode}
              ></MenuButton>
            </div>
          ) : (
            false
          )}
        </Box>
        {/* {tab==='myStory' && storyUser.id ? <MyStoryList uid={uid} storyUser={storyUser} /> : <CollectStoryList uid={uid} /> } */}
        {firstRender ? (
          false
        ) : tab.settab === 'myStory' ? (
          <MyStoryList
            uid={uid}
            storyUser={storyUser}
            showModalUpload={showModalUpload}
            setShowModalUpload={setShowModalUpload}
            editMode={editMode}
            setEditMode={setEditMode}
            setOpenSnackBar={setOpenSnackBar}
            setSnackBarMsg={setSnackBarMsg}
            tab={tab}
          />
        ) : (
          <CollectStoryList uid={uid} tab={tab} />
        )}
      </Box>
      {openSnackBar && (
        <Snackbar
          className={styles.snackBar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
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
                backgroundColor: '#6677C8',
              },
          }}
        />
      )}
    </div>
  )
}

export default Reels
