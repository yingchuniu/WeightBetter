import React from 'react'
import './styles.css';



function Card() {


    return (
        <div className='slide-body'>
            <div className='slide-container'>
                <div className='slide-content'>
                    <div className='card-wrapper'>
                        <div className='card'>
                            <div className='image-content'>
                                <span className='overlay'></span>
                                <div className='card-image'>
                                    <img src='/ImageMenu/fatLoseMeal/紫米飯.jpg' alt='全麥土司' className='card-img' />
                                </div>

                            </div>
                            <div className='card-content'>
                                <h2 className='title'>Day1</h2>
                                <div className='element'>
                                    <h1>早餐</h1>
                                    <hr/>
                                    <p className=''>烤地瓜一份</p>
                                    <p className=''>無糖烏龍鮮奶茶</p>
                                    <p className='clo1'>卡路里:295</p>
                                    <br/>
                                    <h1>午餐</h1>
                                    <hr/>
                                    <p className=''>白飯1碗</p>
                                    <p className=''>滷雞腿</p>
                                    <p className=''>炒龍鬚菜半碟</p>
                                    <p className=''>番茄炒蛋半碟</p>
                                    <p className='clo2'>卡路里:575</p>
                                    <br/>
                                     <h1>晚餐</h1>
                                    <hr/>
                                     <p className=''>五穀飯</p>
                                    <p className=''>豬排(勿裹粉)</p>
                                    <p className=''>海帶湯一碗</p>
                                    <p className=''>葡萄16顆</p>
                                    <p className='clo3'>卡路里:540</p>

                                </div>


                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Card