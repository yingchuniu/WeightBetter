import React, { useEffect } from 'react'
import styles from '../HomeStory.module.css'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function Top() {
  gsap.registerPlugin(ScrollTrigger)
  useEffect(() => {
    gsap.to('.imgset1 .imgBox', {
      x: -500,
      duration: 5,
      scrollTrigger: {
        trigger: '.top',
        start: 'top 100%',
        end: 'bottom -200%',
        scrub: 4,
        // markers: true,
        toggleActions: 'restart none none none',
      },
    })
    gsap.to('.imgset2 .imgBox', {
      x: -2000,
      duration: 5,
      scrollTrigger: {
        trigger: '.top',
        start: 'top 100%',
        end: 'bottom -200%',
        scrub: 4,
        // markers: true,
        toggleActions: 'restart none none none',
      },
    })
    gsap.to('.imgset3 .imgBox', {
      x: -500,
      duration: 5,
      scrollTrigger: {
        trigger: '.top',
        start: 'top 100%',
        end: 'bottom -200%',
        scrub: 4,
        // markers: true,
        toggleActions: 'restart none none none',
      },
    })
  }, [])
  return (
    <>
      <div className={styles.top + ' top'}>
        <div className={styles.title + ' title'}>
          <h2 className="text-h1 text-mainblack font-bold mb-1">短影音</h2>
          <p className="text-center font-bold">
            分享您的體態管理日常與技巧，
            <br />
            讓居家學習與交流更簡單！
          </p>
        </div>
        <div className={styles.imgset + ' imgset imgset1'}>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg01.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg02.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg03.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg04.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg01.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg02.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg03.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg04.jpg"
              alt="bg"
            />
          </div>
        </div>
        <div
          className={styles.imgset + ' ' + styles.imgset2 + ' imgset imgset2'}
        >
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg05.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg06.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg07.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg08.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg13.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg14.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg15.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg16.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg17.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg18.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg19.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg05.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg06.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg07.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg08.jpg"
              alt="bg"
            />
          </div>
        </div>
        <div className={styles.imgset + ' imgset imgset3'}>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg09.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg10.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg11.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg16.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg09.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg10.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg11.jpg"
              alt="bg"
            />
          </div>
          <div className={styles.imgBox + ' imgBox'}>
            <img
              className={styles.img + ' img'}
              src="/HomeImgs/compressed/bg16.jpg"
              alt="bg"
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default Top
