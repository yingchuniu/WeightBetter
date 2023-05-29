import React from 'react'
import { useState } from 'react'
import styles from '../styleModules/VideoCard.module.css'
import { useNavigate } from 'react-router-dom'

function VideoCard({
  video,
  handleShowModal,
  textSize,
  iconSize,
  editMode,
  setEditMode,
  setShowCheckDelete,
  setDeletingStory,
}) {
  const navigate = useNavigate()

  return (
    <>
      <div
        className="col p-3 m-0"
        style={{ boxSizing: 'border-box' }}
        key={video.story_id}
      >
        <div
          className={
            styles.videoCard + ' card border-0 overflow-hidden shadow-lg'
          }
          style={{
            backgroundColor: '#eee',
            borderRadius: '10px',
            aspectRatio: '16/10',
            position: 'relative',
            boxSizing: 'border-box',
            width: '100%',
          }}
          onClick={(e) => {
            handleShowModal(e, video.story_id)
          }}
        >
          <button
            className={`${styles.deleteBtn} ${!editMode && styles.hide}`}
            style={{
              position: 'absolute',
              top: '5px',
              right: '8px',
              zIndex: '1000',
            }}
            onClick={(e) => {
              e.stopPropagation()
              setShowCheckDelete(true)
              setDeletingStory({ id: video.story_id, title: video.story_title })
            }}
          >
            <i className="fa-solid fa-trash text-h6 md:text-h5 lg:text-h4 xl:text-h4"></i>
          </button>
          <div
            className={
              styles.imgBox + ` h-100 ${editMode ? styles.opacityLow : ''}`
            }
          >
            <img
              src={`http://localhost:8080/story/video/${video.story_path}/poster`}
              style={{
                width: '100%',
                height: '100%',
                display: 'block',
                objectFit: 'cover',
              }}
              alt={video.story_name}
            />
          </div>
          {/* <div
            className={`${styles.storyInfo} card-body d-flex flex-wrap justify-evenly p-1`}
          >
            <div className={`likes ${textSize}`}>
              <i className={`fa-solid fa-heart ${iconSize} text-pink`}></i>
              &nbsp;&nbsp;{video.likes_count}
            </div>
            <div className={`times ${textSize}`}>
              <i className={`fa-solid fa-play ${iconSize} text-teal`}></i>
              &nbsp;&nbsp;{video.times}
            </div>
          </div> */}
        </div>
        <div>
          <div
            className={`storyTitle w-100 text-mainblack text-center font-bold ${textSize} d-flex align-items-start mt-2`}
          >
            <div
              className="imgBox flex-shrink-0 col-2"
              style={{
                overflow: 'hidden',
                borderRadius: '500px',
                aspectRatio: '1/1',
                // height: '40px',
                cursor: 'pointer',
              }}
              onClick={() => {
                navigate(`/${video.username}`)
              }}
            >
              <img
                src={`${video.profile_image || '/ImagesStory/users/user.png'}`}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </div>
            <div
              className="left flex-1 text-left"
              style={{ overflow: 'hidden', marginLeft: '15px' }}
            >
              <div
                style={{
                  overflow: 'hidden',
                  whiteSpace: 'nowrap',
                  textOverflow: 'ellipsis',
                }}
                title={video.story_title}
              >
                {video.story_title}
              </div>
              <div className={`text-h7 font-medium`}>{video.username}</div>
              <div
                className={`${styles.storyInfo} card-body d-flex flex-wrap justify-start mt-1`}
              >
                <div className={`likes text-h7`}>
                  <i className={`fa-solid fa-heart text-h7 text-pink`}></i>
                  &nbsp;&nbsp;{video.likes_count}
                </div>
                <div className={`times text-h7 ml-3`}>
                  <i className={`fa-solid fa-play text-h7 text-teal`}></i>
                  &nbsp;&nbsp;{video.times}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default VideoCard
