import React, { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import styles from '../HomeStory.module.css'

import 'swiper/css'
import 'swiper/css/pagination'
import { Pagination } from 'swiper'

function BottomFixed() {
  console.log('render')

  const videos = [281, 294, 224, 276, 265, 126, 231]
  // const [videos, setVideos] = useState([])
  const [swiperInstance, setSwiperInstance] = useState({})
  const [currentSlideIndex, setCurrentSlideIndex] = useState(3)

  const handleSlideChange = () => {
    console.log(swiperInstance.activeIndex)
    if (swiperInstance.activeIndex >= 0) {
      setCurrentSlideIndex(swiperInstance.activeIndex)
    }
  }

  useEffect(() => {}, [])

  return (
    <>
      {/* <div>{currentSlideIndex}</div> */}
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
            console.log('slideChange')
            handleSlideChange()
          }}
          onSwiper={(swiper) => {
            setSwiperInstance(swiper)
            console.log(swiper)
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
                key={video}
                style={{
                  backgroundColor: 'rgb(0, 0, 0, .2)',
                  display: 'flex',
                  alignItems: 'start',
                  justifyContent: 'center',
                  borderRadius: '10px',
                  // boxShadow: '0px 0px 5px #aaa',
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
                    src={`/ImagesStory/videos/${video}.mp4`}
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
                      src={`http://localhost:8080/story/video/${video}/poster`}
                      alt={video}
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
                      'linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, .3))',
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
                      src="/ImagesStory/users/joe.jpg"
                      alt={'user'}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <div className="text-h5 text-white ml-2 text-center">
                    {'video.story_title'}
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

export default BottomFixed
