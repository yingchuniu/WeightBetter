import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// --[css]
import styles from './styleModules/Home.module.css'

// --[components]
import ModalPlayer from './ModalPlayer'
import VideoCard from './components/VideoCard'

// --[material icon]
import SearchIcon from '@mui/icons-material/Search'

function HomeStory() {
  const [videos, setVideos] = useState([])
  const [videosCount, setVideosCount] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [playingStoryId, setPlayingStoryId] = useState('')
  const [playingStoryIdx, setPlayingStoryIdx] = useState(0)

  const [search, setSearch] = useState('')
  const [searchInfo, setSearchInfo] = useState('')
  // const [searchHashTagId, setSearchHashTagId] = useState('')
  const navigate = useNavigate()
  const { searchInUrl, searchHashTagId } = useParams()

  useEffect(() => {
    renderVideos() // 取得影片清單
  }, [searchInUrl, searchHashTagId])

  const uid = JSON.parse(localStorage.getItem('user'))
    ? JSON.parse(localStorage.getItem('user')).id
    : 0

  const renderVideos = async () => {
    // let searchParams = search.replace(/%/g, ' ')
    // searchParams = encodeURIComponent(searchParams)

    if (searchHashTagId) {
      const hashtag = new URLSearchParams(searchInUrl)
      setSearchInfo('#' + hashtag.get('search'))
      setSearch('')
    } else {
      setSearchInfo('')
      if (!searchInUrl) {
        setSearch('')
      }
    }

    try {
      const url = searchHashTagId
        ? `http://localhost:8080/story/video/${searchHashTagId}/hashtag`
        : `http://localhost:8080/story/videos?${searchInUrl || ''}`
      const response = await fetch(url)
      const data = await response.json()
      console.log(url, data)
      setVideos(data)
      setVideosCount(data.length)
      if (data.length === 0) {
        setSearchInfo(`Sorry ! 找不到 ${search} 的相關影片`)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSearch = () => {
    document.activeElement.blur()

    const usp = new URLSearchParams()
    usp.set('search', search)
    navigate(`/reels/home/${usp.toString()}`)
  }

  const handleShowModal = (e, sid) => {
    setShowModal(!showModal)
    const newPlayingStoryIdx = videos.findIndex((el) => {
      return el.story_id === sid
    })
    setPlayingStoryId(sid)
    setPlayingStoryIdx(newPlayingStoryIdx)
  }

  return (
    <div
      className="wrapper d-flex flex-column align-items-center"
      style={{ overflowY: 'scroll' }}
      key={window.location.pathname}
    >
      <div
        className={`${styles.searchSection} container py-3 mt-2`}
        style={{ boxSizing: 'border-box', maxWidth: '1200px' }}
      >
        <div className="row d-flex justify-center">
          <div className={`${styles.searchBox} col-3`}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search..."
              value={search}
              onChange={(e) => {
                setSearch(e.currentTarget.value)
              }}
              onKeyUp={(e) => {
                if (e.key === 'Enter') {
                  handleSearch()
                }
              }}
            />
            <SearchIcon
              sx={{ flexGrow: 1, cursor: 'pointer' }}
              onClick={handleSearch}
            ></SearchIcon>
          </div>
        </div>
        <div className="row">
          <div className="searchInfo font-bold pl-7">{searchInfo}</div>
        </div>
      </div>
      <div
        className={`container py-0`}
        style={{ boxSizing: 'border-box', maxWidth: '1200px' }}
      >
        <div
          className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-xl-4 m-0"
          style={{ boxSizing: 'border-box', width: '100%' }}
        >
          {videos.map((video) => (
            <VideoCard
              key={video.story_id}
              video={video}
              handleShowModal={handleShowModal}
              textSize={'text-h7 md:text-h6 lg:text-h5'}
              iconSize={'text-h6 md:text-h5 lg:text-h4'}
            ></VideoCard>
          ))}
        </div>
      </div>
      {showModal && (
        <ModalPlayer
          showModal={showModal}
          setShowModal={setShowModal}
          videos={videos}
          playingStoryId={playingStoryId}
          setPlayingStoryId={setPlayingStoryId}
          playingStoryIdx={playingStoryIdx}
          setPlayingStoryIdx={setPlayingStoryIdx}
          videosCount={videosCount}
          uid={uid}
          renderVideos={renderVideos}
          setSearchInfo={setSearchInfo}
        ></ModalPlayer>
      )}
    </div>
  )
}

export default HomeStory
