import React from 'react'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MenuCard from './MenuCard'
import MenuCard2 from './MenuCard2'
import MenuCard3 from './MenuCard3'
import MenuCard4 from './MenuCard4'
import MenuCard5 from './MenuCard5'
import MenuCard6 from './MenuCard6'
import MenuCard7 from './MenuCard7'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';




function PersonalPlan() {

  return (
    <div style={{ height: '100vh' }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <SwiperSlide>
          <MenuCard />
        </SwiperSlide>

        <SwiperSlide>
          <MenuCard2 />
        </SwiperSlide>

        <SwiperSlide>
          <MenuCard3 />
        </SwiperSlide>

        <SwiperSlide>
          <MenuCard4 />
        </SwiperSlide>

        <SwiperSlide>
          <MenuCard5 />
        </SwiperSlide>

        <SwiperSlide>
          <MenuCard6 />
        </SwiperSlide>

        <SwiperSlide>
          <MenuCard7 />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default PersonalPlan
