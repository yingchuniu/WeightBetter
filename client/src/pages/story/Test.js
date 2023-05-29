import React, { useEffect, useState } from 'react'
import './test.css'
import { Button, Box, Typography, Modal } from '@mui/material'
import UserInfo from './components/UserInfo'
// import ReactPlayer from 'react-player'
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom'
import Test2 from './Test2'
import Test3 from './Test3'
import { Outlet } from 'react-router-dom'
import CircleButton from '@/components/Buttons/CircleButton'

// Render a YouTube video player

function Test() {
  // const [showModal, setShowModal] = useState(false)
  // const [played, setPlayed] = useState(0)
  // const [count, setCount] = useState({ counted: false, total: 0 })

  // const handleClick = () => {
  //   console.log('click')
  //   setShowModal(!showModal)
  // }

  // useEffect(() => {
  //   if (!count.counted) {
  //     if (played > 0.5) {
  //       setCount({ counted: true, total: count.total + 1 })
  //     }
  //   }
  // }, [played])

  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   const fd = new FormData(document.form1)

  //   const url = 'http://localhost:8080/story/upload-video-try'
  //   fetch(url, {
  //     method: 'post',
  //     body: fd,
  //   })
  // }

  const handleSubmit2 = () => {
    const search = '健身,居家' // 要搜尋的關鍵字
    const usp = new URLSearchParams()
    usp.set('search', search)
    const url = `http://localhost:8080/story/test-search?${usp.toString()}` // 改成自己的路由
    fetch(url)
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
      })
  }

  return (
    <div>
      <button onClick={handleSubmit2}>click</button>
      {/* <form name="form1">
        <input type="file" name="story" />
        <input type="text" name="title" style={{ backgroundColor: '#aaa' }} />
        <input
          type="text"
          name="hashtags"
          style={{ backgroundColor: '#aaa' }}
        />
        <button onClick={handleSubmit}>submit</button>
      </form> */}
      {/* <p>Test1</p>
      <CircleButton>aaaaa</CircleButton>
      <Routes>
        <Route path="test2" element={<Test2></Test2>}></Route>
        <Route path="test3" element={<Test3></Test3>}></Route>
      </Routes>

      <Outlet></Outlet> */}

      {/* <button
        style={{ backgroundColor: 'salmon' }}
        onClick={() => {
          handleClick()
        }}
      >
        Click
      </button>
      <div
        className={`modal fade ${showModal ? 'show d-block' : 'show d-none'}`}
        id="exampleModalCenter"
        tabIndex="-1"
        role="dialog"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        onClick={handleClick}
      >
        <div className="modal modal-dialog-centered">
          <div
            className="modal-content"
            style={{
              height: 'calc(100vh - 75px)',
              position: 'absolute',
              bottom: '0px',
            }}
          >
            <div className="modal-body"></div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleClick}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div> */}
      {/* <Button onClick={handleClick}>Open modal</Button>
      <Modal
        className="modalBox"
        open={showModal}
        onClose={handleClick}
        sx={{ height: '100px' }}
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}

      {/* <UserInfo imgPath={'kris.jpg'} username={'kris1997'}></UserInfo> */}

      {/* <ReactPlayer
                url={`http://localhost:8080/story/video/1/get`}
                controls
                onProgress={(progress) => {
                    setPlayed(progress.played);
                }}
            />
            <div>played: {played}</div>
            <div>counted: {count.counted}</div>
            <div>total: {count.total}</div> */}
    </div>
  )
}

export default Test
