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
                                    <img src='/ImageMenu/fatLoseMeal/義大利麵.jpg' alt='全麥土司' className='card-img' />
                                </div>

                            </div>
                            <div className='card-content'>
                                <h2 className='title'>Day4</h2>
                                <div className='element'>
                                    <h1>早餐</h1>
                                    <hr/>
                                    <p className=''>雜糧饅頭一個</p>
                                    <p className=''>無糖豆漿 400cc</p>
                                    <p className='clo1'>卡路里:470</p>
                                    <br/>
                                    <h1>午餐</h1>
                                    <hr/>
                                    <p className=''>蒸地瓜一條</p>
                                    <p className=''>生菜沙拉＋優格一盤</p>
                                    <p className=''>水煮蛋一個</p>
                                    <p className=''>烤玉米一根</p>
                                    <p className='clo2'>卡路里:500</p>
                                    <br/>
                                     <h1>晚餐</h1>
                                    <hr/>
                                     <p className=''>義大利麵+荷包蛋一碗</p>
                                    <p className=''>花椰菜蘆筍一碗</p>
                                    <p className=''>無糖紅茶300毫升</p>
                                    <p className='clo3'>卡路里:620</p>

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