import React from 'react'
import styles from '../MenuPage/styles.css'
import Typewriter from 'typewriter-effect'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'

function MenuPage() {
  return (
    <div style={{ height: 'calc(100vh)' }}>
      <div className="Container">
        <div className="ContainerTitle">
          <AutoAwesomeIcon fontSize="large" color="yellow" />
          HEALTH & DIET
          <AutoAwesomeIcon fontSize="large" color="yellow" />
        </div>
        <div className="ContainerTitle1">菜單</div>
        <div className="ContainerText">
          <div className="typewriter">
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(
                    '預算不夠無法請營養師？體脂肪太高降不下來？沒關係！您只需要動動手指,我們將根據您的身體條件建議相關菜單，引導您保持健康飲食不必節食，擁有自律生活。'
                  )
                  .callFunction(() => {
                    console.log('String typed out!')
                  })
                  .pauseFor(2500)
                  // .deleteAll()
                  .callFunction(() => {
                    console.log('All strings were deleted')
                  })
                  .start()
              }}
            />
          </div>
        </div>

        <div className="Wrapper">
          <div className="Card">
            <div className="CardSteper1">
              <img
                style={{ height: 330 }}
                src="/HomeImgs\HomeImage1.png"
                alt="img"
              />
              <div className="SteperTitle1">
                <h2>動動手指填資料</h2>
              </div>
            </div>
            <div className="CardSteper2">
              <img
                style={{ height: 330}}
                src="/HomeImgs\HomeImage2.png"
                alt="img"
              />
              <div className="SteperTitle2">
                <h2>計算您的BMI BMR數據</h2>
              </div>
            </div>
            <div className="CardSteper3">
              <img
                style={{ height: 330 }}
                src="/HomeImgs\HomeImage3.png"
                alt="img"
              />
              <div>
                <h2 className="SteperTitle3">跟著建議菜單，堅持到底</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MenuPage
