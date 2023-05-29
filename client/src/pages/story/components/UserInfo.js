import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

function UserInfo({ imgPath, username }) {
  const [user, setUser] = useState({
    username: '',
    imgPath: '',
  })

  useEffect(() => {
    setUser({ username: username, imgPath: imgPath })
  }, [])

  return (
    <div className="container d-flex align-items-center">
      <div
        className="imgBox col-1"
        style={{
          overflow: 'hidden',
          borderRadius: '500px',
          aspectRatio: '1/1',
        }}
      >
        <img
          src={`/ImagesStory/users/${user.imgPath || 'user.png'}`}
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      <div className="username font-medium lg:text-h5 md:text-h6 text-h7 px-3">
        {user.username}
      </div>
    </div>
  )
}

export default UserInfo
