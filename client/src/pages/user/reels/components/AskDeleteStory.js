import React from 'react'
import { useState, useEffect } from 'react'
import styles from '../styles/AskDeleteStory.module.css'

function AskDeleteStory({
  showCheckDelete,
  setShowCheckDelete,
  deletingStory,
  renderMyStory,
  setSnackBarMsg,
  setOpenSnackBar,
}) {
  const [modalAnimate, setModalAnimate] = useState(false)

  useEffect(() => {
    document
      .querySelector('#modal-content')
      .addEventListener('animationend', () => {
        setModalAnimate(false)
      })
  }, [])

  const deleteStory = (sid) => {
    console.log('delete story', sid)

    const url = 'http://localhost:8080/story/delete-video'
    const data = {
      storyId: sid,
    }

    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, `${sid}\n`, rData.note)
        renderMyStory()
        setSnackBarMsg('刪除成功 !')
        setOpenSnackBar(true)
      })
  }

  return (
    <>
      <div
        className={`modal fade ${showCheckDelete ? 'show' : 'd-none'}`}
        tabIndex="-1"
        style={{ display: 'block', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
        aria-modal="true"
        role="dialog"
        onClick={() => {
          setModalAnimate(true)
        }}
      >
        <div
          className="modal-dialog modal-dialog-centered"
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
              <h1 className="modal-title ">刪除影片</h1>
            </div>
            <div className="modal-body text-h5 px-3 py-3 font-bold">
              <p>確定要刪除 " {deletingStory.title} " 此影片 ?</p>
            </div>
            <div className="modal-footer text-h5 px-3 py-2 font-bold d-flex justify-center border-none">
              <button
                type="button"
                className={`${styles.modalBtn} ${styles.btnCancel}`}
                data-bs-dismiss="modal"
                onClick={() => {
                  setShowCheckDelete(false)
                }}
              >
                取消
              </button>
              <button
                type="button"
                className={`${styles.modalBtn} ${styles.btnCheck}`}
                onClick={() => {
                  setShowCheckDelete(false)
                  deleteStory(deletingStory.id)
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

export default AskDeleteStory
