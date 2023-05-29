import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

// --[style module]
import styles from './styleModules/Player.module.css'

// --[component]
import Comment from './components/Comment'

function Player() {
  const { sid } = useParams()

  const [videoData, setVideoData] = useState({})
  const [videoTags, setVideoTags] = useState([])
  const [collected, setCollected] = useState(true)
  const [userImage, setUserImage] = useState('user.png')

  useEffect(() => {
    componentDidMount()
  }, [])

  const componentDidMount = async () => {
    try {
      const url = `http://localhost:8080/story/video/${sid}/data`
      const res = await fetch(url)
      const data = await res.json()
      console.log(url, data)
      setVideoData(data.rowsStory[0])
      setVideoTags(data.rowsTags)
      setUserImage(data.rowsStory[0].image_path)
    } catch (error) {
      console.log(error)
    }
  }

  const collectStory = () => {
    setCollected(!collected)
  }

  return (
    <div className="container-fluid h-100 w-100">
      <div className="row" style={{ height: 'calc(100vh - 75px)' }}>
        <div className="storyView col-6 p-0 d-flex">
          <video controls muted autoPlay style={{ backgroundColor: '#000' }}>
            <source
              src={`http://localhost:8080/story/video/${sid}`}
              type="video/mp4"
            ></source>
          </video>
        </div>
        <div className="storyInfo col-6 d-flex flex-column px-4">
          <div className="infoDetail flex-1 d-flex flex-column">
            <div className="userInfo container-fluid d-flex px-0 py-4">
              <div className={styles.imgBox + ' col-2 mr-4'}>
                <img
                  src={`/ImagesStory/users/${userImage || 'user.png'}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    display: 'block',
                    objectFit: 'cover',
                  }}
                  alt="userImage"
                />
              </div>
              <div className="userName flex-1 font-bold lg:text-h2 md:text-h3 text-h4 d-flex align-items-center">
                {videoData.name}
              </div>
            </div>

            <div className="storyTitle font-bold lg:text-h1 md:text-h2 text-h3 pt-4 pb-2">
              {videoData.story_title}
            </div>
            <div className="storyTags d-flex flex-wrap">
              {videoTags.map((el) => {
                return (
                  <div
                    key={el.tag_id}
                    className="storyTag font-bold lg:text-h5 md:text-h6 text-h7 mr-2"
                  >
                    #{el.tag_name}
                  </div>
                )
              })}
            </div>
            <div className="flex-1 d-flex align-items-end py-2">
              <div className="likesTimes d-flex">
                <div className="likes font-bold lg:text-h4 md:text-h5 text-h6 mr-3">
                  <i className="fa-solid fa-heart text-pink"></i>&nbsp;&nbsp;
                  {videoData.likes}
                </div>
                <div className="times font-bold lg:text-h4 md:text-h5 text-h6 mr-3">
                  <i className="fa-solid fa-play text-teal"></i>&nbsp;&nbsp;
                  {videoData.times}
                </div>
                <div
                  className="times font-bold lg:text-h4 md:text-h5 text-h6 mr-3"
                  onClick={collectStory}
                >
                  <i
                    className={`fa-solid fa-bookmark ${
                      !collected && styles.hide
                    } text-primary`}
                  ></i>
                  <i
                    className={`fa-regular fa-bookmark ${
                      collected && styles.hide
                    } text-primary`}
                  ></i>
                </div>
              </div>
            </div>
          </div>
          <Comment className={'flex-1'}></Comment>
        </div>
      </div>
    </div>
  )
}

export default Player
