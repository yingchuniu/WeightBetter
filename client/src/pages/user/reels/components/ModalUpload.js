import React from 'react'
import { useState, useEffect } from 'react'
import Input from '@mui/material/Input'

import styles from '../styles/ModalUpload.module.css'

import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload'

function ModalUpload({
  showModalUpload,
  setShowModalUpload,
  uid,
  renderMyStory,
  setOpenSnackBar,
  setSnackBarMsg,
}) {
  const [modalAnimate, setModalAnimate] = useState(false)
  const [inputStory, setInputStory] = useState('')
  const [inputStoryTitle, setInputStoryTitle] = useState('')
  const [inputStoryHashtags, setInputStoryHashtags] = useState('')

  useEffect(() => {
    document
      .querySelector('#modal-content')
      .addEventListener('animationend', () => {
        setModalAnimate(false)
      })
  }, [])

  const uploadVideo = async () => {
    const form = document.formUpload
    const fd = new FormData(form)
    // console.log(fd.entries())
    // for (let [k, v] of fd.entries()) {
    //   console.log(k, v)
    // }

    fd.append('uid', uid)

    const url = 'http://localhost:8080/story/upload-video-try'
    const r1 = await fetch(url, { method: 'post', body: fd })
    const rData1 = await r1.json()
    console.log(url, rData1)
    renderMyStory()
    setSnackBarMsg('上傳成功 !')
    setOpenSnackBar(true)
  }

  const changeStoryFile = (e) => {
    const choosedFile = e.currentTarget.value.split('\\').at(-1)
    setInputStory(choosedFile)
  }

  const changeStoryTitle = (e) => {
    setInputStoryTitle(e.currentTarget.value)
  }
  const changeStoryHashtags = (e) => {
    setInputStoryHashtags(e.currentTarget.value)
  }

  return (
    <>
      <div
        className={`modal fade d-flex justify-center align-items-center ${
          showModalUpload ? 'show' : 'd-none'
        }`}
        tabIndex="-1"
        style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        aria-modal="true"
        role="dialog"
        onClick={() => {
          setModalAnimate(true)
        }}
      >
        <div
          className="modal-dialog"
          style={{ maxWidth: '100%', width: '50%' }}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <div
            id="modal-content"
            className={`modal-content ${
              modalAnimate ? 'animate__animated animate__headShake' : ''
            }`}
            style={{ boxShadow: '2px 2px 5px #888' }}
          >
            <div className="modal-header text-h4 px-3 py-2 bg-yellow font-bold">
              <h1 className="modal-title ">上傳影片</h1>
            </div>
            <div className="modal-body text-h6 lg:text-h5 px-3 py-3 font-bold">
              <form name="formUpload" className="d-flex flex-column">
                <div
                  className="uploadStory d-flex flex-col my-3 "
                  style={{
                    borderBottom: '1px solid #aaa',
                  }}
                >
                  <div>影片</div>
                  <div
                    className="d-flex py-2"
                    style={{ boxSizing: 'border-box', height: '56px' }}
                  >
                    <input
                      className={
                        styles.storyFile + ' d-flex flex-col justify-center'
                      }
                      value={inputStory}
                      placeholder="請選擇影片檔案"
                      onChange={() => {}}
                      onClick={() => {
                        document.querySelector('#inputStory').click()
                      }}
                      readOnly
                      style={{
                        cursor: 'default',
                        minWidth: '0',
                        flexShrink: '1',
                        flexGrow: '1',
                      }}
                    />

                    <label
                      htmlFor="inputStory"
                      className={styles.inputfile}
                      style={{ cursor: 'pointer', flexShrink: '0' }}
                      title="選擇影片檔案"
                    >
                      <input
                        id="inputStory"
                        name="story"
                        type="file"
                        accept="video/*"
                        style={{
                          display: 'none',
                          width: '100%',
                          aspectRatio: '1/1',
                        }}
                        onChange={changeStoryFile}
                      />
                      <DriveFolderUploadIcon></DriveFolderUploadIcon>
                    </label>
                  </div>
                </div>
                <div
                  className="uploadStoryTitle d-flex flex-col my-3"
                  style={{
                    borderBottom: '1px solid #aaa',
                  }}
                >
                  <label htmlFor="inputTitle">影片標題</label>
                  <input
                    // className="flex-1"
                    id={styles.inputTitle}
                    name="storyTitle"
                    type="text"
                    value={inputStoryTitle}
                    placeholder="新增影片標題"
                    onChange={changeStoryTitle}
                  />
                </div>
                <div
                  className="uploadStoryHashtags d-flex flex-col my-3"
                  style={{
                    borderBottom: '1px solid #aaa',
                  }}
                >
                  <label htmlFor="inputHashtags">影片標籤</label>
                  <input
                    // className="flex-1"
                    id={styles.inputHashtags}
                    name="storyHashtags"
                    type="text"
                    value={inputStoryHashtags}
                    placeholder="新增影片標籤，例: #健身#瘦大腿"
                    onChange={changeStoryHashtags}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer text-h5 px-3 py-2 font-bold d-flex justify-center border-none">
              <button
                type="button"
                className={`${styles.modalBtn} ${styles.btnCancel}`}
                data-bs-dismiss="modal"
                onClick={() => {
                  setShowModalUpload(false)
                }}
              >
                取消
              </button>
              <button
                type="button"
                className={`${styles.modalBtn} ${styles.btnCheck}`}
                onClick={() => {
                  setShowModalUpload(false)
                  uploadVideo()
                }}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ModalUpload
