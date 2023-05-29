import React, { useEffect, useState } from 'react'
import styles from '../styleModules/Comment.module.css'
import 'animate.css'

import AskDeleteComment from './AskDeleteComment'

function Comment({
  className,
  sid,
  uid,
  openAlert,
  setOpenAlert,
  setSnackBarMsg,
  setOpenSnackBar,
}) {
  const [comments, setComments] = useState([])
  const [inputComment, setInputComment] = useState('')
  const [showCheckDelete, setShowCheckDelete] = useState(false)
  const [deletingComment, setDeletingComment] = useState({
    cid: '',
    cbody: '',
  })
  const [modalAnimate, setModalAnimate] = useState(false)

  useEffect(() => {
    renderComments()

    document
      .querySelector('#modal-content')
      .addEventListener('animationend', () => {
        setModalAnimate(false)
      })
  }, [sid])

  const renderComments = () => {
    const url = `http://localhost:8080/story/comment/${sid}`
    fetch(url)
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        setComments(rData)
      })
  }

  const addComment = (e, type) => {
    if (type === 'enter') {
      if (e.key !== 'Enter') {
        return
      }
    }

    if (!uid) {
      // setOpenAlert({ open: true, text: '先登入才能留言' })
      // setTimeout(() => {
      //   setOpenAlert({ open: false, text: '先登入才能留言' })
      // }, 2000)
      setSnackBarMsg('先登入才能留言')
      setOpenSnackBar(true)

      return
    }

    const url = `http://localhost:8080/story/comment/${sid}`
    const data = {
      userId: uid,
      commentContent: inputComment,
    }

    fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        if (rData.success) {
          renderComments()
          setInputComment('')
        }
      })
  }

  const deleteComment = (cid) => {
    const url = `http://localhost:8080/story/comment/${cid}/delete`
    fetch(url)
      .then((r) => r.json())
      .then((rData) => {
        console.log(url, rData)
        renderComments()
      })
  }

  return (
    <>
      <div
        className={`${className} commentSection d-flex flex-column`}
        style={{ overflowY: 'hidden' }}
      >
        <div className="comments flex-1" style={{ overflowY: 'scroll' }}>
          {comments.map((el) => {
            return (
              <div
                className="AComment container d-flex flex-column px-0 py-2"
                key={el.comment_id}
              >
                <div className="upper d-flex align-items-center">
                  <div
                    className="imgBox col-1"
                    style={{
                      overflow: 'hidden',
                      borderRadius: '500px',
                      aspectRatio: '1/1',
                    }}
                  >
                    <img
                      src={`${
                        el.profile_image || '/ImagesStory/users/user.png'
                      }`}
                      alt=""
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  <div className="username font-medium lg:text-h5 md:text-h6 text-h7 px-3">
                    {el.username}
                  </div>
                  <div className="content lg:text-h5 md:text-h6 text-h7 px-3">
                    {el.content}
                  </div>
                </div>
                <div
                  className="lower d-flex lg:text-h6 md:text-h7 text-h8"
                  style={{ color: 'rgba(0, 0, 0, .5)' }}
                >
                  <div className="spacer col-1"></div>
                  <div className="time px-3">{el.time}</div>
                  {uid === el.user_id ? (
                    <button
                      className="deleteBtn text-left"
                      onClick={() => {
                        setDeletingComment({
                          cid: el.comment_id,
                          cbody: el.content,
                        })
                        setShowCheckDelete(true)
                      }}
                    >
                      刪除留言
                    </button>
                  ) : (
                    false
                  )}
                </div>
              </div>
            )
          })}
        </div>
        <div
          className="commentBox d-flex w-100"
          style={{ height: '50px', backgroundColor: '#eee' }}
        >
          <input
            className={styles.inputComment + ' h-100 flex-1'}
            type="text text-h6"
            placeholder="留言......"
            style={{
              backgroundColor: '#eee',
              padding: '10px 20px',
              overflow: 'scroll',
            }}
            value={inputComment}
            onChange={(e) => {
              setInputComment(e.currentTarget.value)
            }}
            onKeyUp={(e) => {
              addComment(e, 'enter')
            }}
          />
          <div
            className="btnSubmit w-10 d-flex justify-center align-items-center"
            style={{ cursor: 'pointer' }}
            onClick={(e) => {
              addComment(e, 'submit')
            }}
          >
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>
      </div>
      <AskDeleteComment
        showCheckDelete={showCheckDelete}
        modalAnimate={modalAnimate}
        setModalAnimate={setModalAnimate}
        deletingComment={deletingComment}
        setShowCheckDelete={setShowCheckDelete}
        deleteComment={deleteComment}
        styles={styles}
      />
      {/* <div
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
              <h1 className="modal-title ">刪除留言</h1>
            </div>
            <div className="modal-body text-h5 px-3 py-3 font-bold">
              <p>確定要刪除 " {deletingComment.cbody} " 此則留言 ?</p>
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
                  deleteComment(deletingComment.cid)
                }}
              >
                確認
              </button>
            </div>
          </div>
        </div>
      </div> */}
    </>
  )
}

export default Comment
