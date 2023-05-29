import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../HomeStory.module.css'

import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'
import { useAuth } from '@/hooks/AuthContext'

function Bottom() {
  const [videos, setVideos] = useState([])
  const [swiperInstance, setSwiperInstance] = useState({})
  const [currentSlideIndex, setCurrentSlideIndex] = useState(3)
  const navigate = useNavigate()
  const { currentUser } = useAuth()

  const handleSlideChange = () => {
    if (swiperInstance.activeIndex >= 0) {
      setCurrentSlideIndex(swiperInstance.activeIndex)
    }
  }

  const getRandomVideos = () => {
    // const url = 'http://localhost:8080/story/videos-random'
    // fetch(url)
    //   .then((r) => r.json())
    //   .then((rData) => {
    //     console.log(url, rData)
    //     setVideos(rData)
    //   })
    setVideos([
      {
        story_id: 15,
        story_path: '231',
        story_title: '跟著老師一起跳，60秒輕鬆瘦!',
        profile_image:
          'https://res.cloudinary.com/dz07yfguq/image/upload/v1677056817/weightBetter/bgf0gpn4m18ot1ejmhwv.jpg',
      },
      {
        story_id: 19,
        story_path: '281',
        story_title: '早晨做這個，瘦身好精神!',
        profile_image:
          'https://res.cloudinary.com/dz07yfguq/image/upload/v1677502057/weightBetter/ubopilv4xoxtdcexpk5h.jpg',
      },
      {
        story_id: 256,
        story_path: '276',
        story_title: '這招學起來!保證讓你擁有遙迢身材!',
        profile_image:
          'https://res.cloudinary.com/dz07yfguq/image/upload/v1677501946/weightBetter/xguerzcgcf0zamz4mtly.jpg',
      },
      {
        story_id: 44,
        story_path: '126',
        story_title: '日本美體教練的「瘦背運動」',
        profile_image: 'http://localhost:3000/ImagesStory/users/ross.jpg',
      },
      {
        story_id: 47,
        story_path: '224',
        story_title: '不能錯過的翹臀訓練！5種單腳硬舉變化',
        profile_image:
          'https://res.cloudinary.com/dz07yfguq/image/upload/v1677501915/weightBetter/kqu07ugbohtcalxwvprq.jpg',
      },
      {
        story_id: 54,
        story_path: '265',
        story_title: '每天30秒，瘦腿用這招!',
        profile_image:
          'https://res.cloudinary.com/dz07yfguq/image/upload/v1677502087/weightBetter/i7agz09zk4iyhezdnzeh.jpg',
      },
      {
        story_id: 37,
        story_path: '294',
        story_title: '使用啞鈴配合全身鍛鍊',
        profile_image:
          'https://res.cloudinary.com/dz07yfguq/image/upload/v1677058921/weightBetter/pkkgq1afxxjb05wq96cd.jpg',
      },
    ])
  }

  const seeMore = () => {
    if (currentUser === null) {
      navigate('/login')
    } else {
      navigate('/reels/home')
    }
  }

  useEffect(() => {
    getRandomVideos()
  }, [])

  return (
    <>
      <div className={styles.bottom + ' bottom'}>
        <Swiper
          slidesPerView={5}
          spaceBetween={30}
          centeredSlides={true}
          initialSlide={currentSlideIndex}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination]}
          className={styles.mySwiper}
          onSlideChange={() => {
            handleSlideChange()
          }}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper)
          }}
          style={{
            width: '90%',
            height: '100%',
            '--swiper-pagination-bottom': '40px',
            paddingTop: '50px',
            paddingRight: '10px',
            paddingLeft: '10px',
          }}
        >
          {videos.map((video, idx) => {
            return (
              <SwiperSlide
                key={video.story_id}
                style={{
                  backgroundColor: '#fff',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  boxShadow: '0px 0px 5px #aaa',
                  height: '75%',
                  overflow: 'hidden',
                }}
              >
                {idx === currentSlideIndex ? (
                  <video
                    id={'video' + idx}
                    controls={false}
                    autoPlay={true}
                    muted
                    // src={`http://localhost:8080/story/video/${video.story_id}/get`}
                    src={`/ImagesStory/videos/${video.story_path}.mp4`}
                    type="video/mp4"
                    // style={{ width: '100%', marginTop: '20%' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  ></video>
                ) : (
                  <div style={{ width: '100%', height: '100%' }}>
                    <img
                      // src={`http://localhost:8080/story/video/${video.story_path}/poster`}
                      src={`/ImagesStory/video_poster/poster${video.story_path}.png`}
                      alt={video.story_path}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                )}
                <div
                  className="info px-2"
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '25%',
                    boxSizing: 'border-box',
                    alignItems: 'center',
                    position: 'absolute',
                    bottom: '0px',
                    backgroundImage:
                      'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .7))',
                    // backgroundColor: 'rgba(0, 0, 0, .2)',
                  }}
                >
                  <div
                    className="imgBox col-2"
                    style={{
                      height: '40px',
                      borderRadius: '1000px',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`${video.profile_image}`}
                      alt={'user'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="text-h5 text-white ml-3 text-center font-bold">
                    {video.story_title}
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
          {!videos.length ? (
            false
          ) : (
            <SwiperSlide
              style={{
                // backgroundColor: '#fff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                boxShadow: '0px 0px 5px #aaa',
                height: '75%',
                overflow: 'hidden',
              }}
            >
              <button
                style={{
                  backgroundColor: '#1BB6B2',
                  width: '30%',
                  aspectRatio: '1/1',
                  borderRadius: '1000px',
                  fontWeight: 'bold',
                }}
                onClick={seeMore}
              >
                More
              </button>
            </SwiperSlide>
          )}
        </Swiper>
      </div>
    </>
  )
}

export default Bottom
