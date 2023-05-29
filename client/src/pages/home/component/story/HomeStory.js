import React, { useEffect, useRef } from 'react'
import styles from './HomeStory.module.css'
import Top from './components/Top'
import Bottom from './components/Bottom'
import BottomFixed from './components/BottomFixed'
import BackgroundTitle from './components/BackgroundTitle'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

function HomeStory() {
  const firstUpdate = useRef(true)

  useEffect(() => {
    // if (firstUpdate.current) {
    //   firstUpdate.current = false
    //   return
    // }
    // ScrollTrigger.create({
    //   trigger: '.homeStoryWrapper',
    //   start: 'top top',
    //   end: 'bottom top',
    //   markers: true,
    //   onEnter: () => {
    //     console.log('enter')
    //     document.querySelector('video').play()
    //   },
    // })
  }, [])

  return (
    <div
      className={
        styles.homeStoryWrapper + ' homeStoryWrapper container-fluid p-0'
      }
      style={{
        height: 'calc(100vh)',
        position: 'relative',
        zIndex: '3000',
        backgroundColor: '#fff',
      }}
    >
      <BackgroundTitle></BackgroundTitle>
      <Top></Top>
      <Bottom></Bottom>
      {/* <BottomFixed></BottomFixed> */}
    </div>
  )
}

export default HomeStory
