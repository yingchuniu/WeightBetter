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
                                    <img src='/ImageMenu/fatLoseMeal/乾麵.jpg' alt='全麥土司' className='card-img' />
                                </div>

                            </div>
                            <div className='card-content'>
                                <h2 className='title'>Day7</h2>
                                <div className='element'>
                                    <h1>早餐</h1>
                                    <hr/>
                                    <p className=''>焗烤起司一份</p>
                                    <p className=''>鮪魚三明治一份</p>
                                    <p className=''>無糖紅茶300毫升</p>
                                    <p className='clo1'>卡路里:315</p>
                                    <br />
                                    <h1>午餐</h1>
                                    <hr/>
                                    <p className=''>麻醬乾麵一碗</p>
                                    <p className=''>燙青菜一份</p>
                                    <p className=''>滷蛋一顆</p>
                                    <p className='clo2'>卡路里:380</p>
                                    <br />
                                    <h1>晚餐</h1>
                                    <hr/>
                                    <p className=''>白酒蛤蠣義大利麵一份</p>
                                    <p className=''>蛋花湯一碗</p>
                                    <p className=''>空心菜一碗</p>
                                    <p className='clo3'>卡路里:570</p>

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