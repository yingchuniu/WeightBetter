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
                                    <img src='/ImageMenu/fatLoseMeal/大腸臭臭鍋.jpg' alt='全麥土司' className='card-img' />
                                </div>

                            </div>
                            <div className='card-content'>
                                <h2 className='title'>Day6</h2>
                                <div className='element'>
                                    <h1>早餐</h1>
                                    <hr/>
                                    <p className=''>香雞蛋土司一份</p>
                                    <p className=''>無糖豆漿 350cc</p>
                                    <p className='clo1'>卡路里:410</p>
                                    <br/>
                                    <h1>午餐</h1>
                                    <hr/>
                                    <p className=''>大腸臭臭鍋一鍋</p>
                                    <p className='clo2'>卡路里:520</p>
                                    <br/>
                                     <h1>晚餐</h1>
                                    <hr/>
                                     <p className=''>白酒蛤蠣義大利麵一份</p>
                                    <p className=''>羅宋湯一碗</p>
                                    <p className=''>凱薩沙拉一碗</p>
                                    <p className='clo3'>卡路里:500</p>

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