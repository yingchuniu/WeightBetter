import React from 'react'

function AskDeleteComment({
  showCheckDelete,
  modalAnimate,
  setModalAnimate,
  deletingComment,
  setShowCheckDelete,
  deleteComment,
  styles,
}) {
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
      </div>
    </>
  )
}

export default AskDeleteComment
