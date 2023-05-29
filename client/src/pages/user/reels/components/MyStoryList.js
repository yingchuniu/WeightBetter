import React, { useRef } from 'react'
import { useState, useEffect } from 'react'
import { flushSync } from 'react-dom'

import styles from '../styles/MyStoryList.module.css'

import VideoCard from '@/pages/story/components/VideoCard'
import ModalPlayer from '@/pages/story/ModalPlayer'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import ModalUpload from './ModalUpload'
import AskDeleteStory from './AskDeleteStory'
import { useParams } from 'react-router-dom'

function MyStoryList({
  uid,
  storyUser,
  showModalUpload,
  setShowModalUpload,
  editMode,
  setEditMode,
  setOpenSnackBar,
  setSnackBarMsg,
  tab,
}) {
  const [myStoryList, setMyStoryList] = useState([])
  const [videosCount, setVideosCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [playingStoryId, setPlayingStoryId] = useState('')
  const [playingStoryIdx, setPlayingStoryIdx] = useState(0)

  const [showCheckDelete, setShowCheckDelete] = useState(false)
  const [deletingStory, setDeletingStory] = useState({
    id: '',
    title: '',
  })

  const { playingStoryIdInUrl } = useParams()
  const didMount = useRef(false)

  // console.log('my', tab.scrollY)
  // setTimeout(function () {
  //   window.scrollTo({
  //     top: tab.scrollY,
  //     left: 0,
  //     // behavior: 'smooth',
  //   })
  // }, 200)

  useEffect(() => {
    renderMyStory()
  }, [])

  useEffect(() => {
    if (!didMount.current) {
      didMount.current = true
      return
    }

    if (+playingStoryIdInUrl) {
      handleShowModal(null, playingStoryIdInUrl)
    }
  }, [myStoryList])

  const renderMyStory = () => {
    // if (!storyUser.id) return

    const url = `http://localhost:8080/story/my-videos`
    const data = { userId: storyUser.id }

    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        setMyStoryList(rData)
        setVideosCount(rData.length)
      })
  }

  const handleShowModal = (e, sid) => {
    setShowModal(!showModal)
    const newPlayingStoryIdx = myStoryList.findIndex((el) => {
      return el.story_id === +sid
    })
    setPlayingStoryId(sid)
    setPlayingStoryIdx(newPlayingStoryIdx)
  }

  return (
    <>
      <div
        className="container pt-3 flex-1"
        style={{ boxSizing: 'border-box', position: 'relative' }}
      >
        <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-3">
          {/* {uid === storyUser.id ? (
            <button
              className={styles.btnUpload}
              onClick={() => {
                setShowModalUpload(true)
              }}
            >
              <AddRoundedIcon></AddRoundedIcon>
            </button>
          ) : (
            false
          )} */}
          {myStoryList.map((video) => (
            <VideoCard
              key={video.story_id}
              video={video}
              textSize={'text-h8 md:text-h7 lg:text-h6 xl:text-h6'}
              iconSize={'text-h7 md:text-h6 lg:text-h5 xl:text-h5'}
              handleShowModal={handleShowModal}
              editMode={editMode}
              setEditMode={setEditMode}
              showCheckDelete={showCheckDelete}
              setShowCheckDelete={setShowCheckDelete}
              setDeletingStory={setDeletingStory}
            ></VideoCard>
          ))}
        </div>
      </div>
      {showModal && (
        <ModalPlayer
          showModal={showModal}
          setShowModal={setShowModal}
          videos={myStoryList}
          playingStoryId={playingStoryId}
          setPlayingStoryId={setPlayingStoryId}
          playingStoryIdx={playingStoryIdx}
          setPlayingStoryIdx={setPlayingStoryIdx}
          videosCount={videosCount}
          uid={uid}
          storyUser={storyUser}
          renderVideos={renderMyStory}
          playingStoryIdInUrl={playingStoryIdInUrl}
        ></ModalPlayer>
      )}
      {showModalUpload && (
        <ModalUpload
          showModalUpload={showModalUpload}
          setShowModalUpload={setShowModalUpload}
          uid={uid}
          renderMyStory={renderMyStory}
          setOpenSnackBar={setOpenSnackBar}
          setSnackBarMsg={setSnackBarMsg}
        />
      )}
      {showCheckDelete && (
        <AskDeleteStory
          showCheckDelete={showCheckDelete}
          setShowCheckDelete={setShowCheckDelete}
          deletingStory={deletingStory}
          renderMyStory={renderMyStory}
          setOpenSnackBar={setOpenSnackBar}
          setSnackBarMsg={setSnackBarMsg}
        />
      )}
    </>
  )
}

export default MyStoryList
