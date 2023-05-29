import React from 'react'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { dataList } from '../data'
import './styles.css';




function Slick() {
    const settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
      };
    
    return (
        <div className='allContain'>
            <Slider {...settings}>

                {dataList.map((item) => (
                    <div>
                        <div className='card'>
                            <div className='card-top'>
                                <img src={item.coverSrc} alt={item.title}/>
                            </div>
                            <div className='card-buttom'></div>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default Slick