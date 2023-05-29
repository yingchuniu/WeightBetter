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
                                    <img src='/ImageMenu/fatLoseMeal/墨西哥卷.jpg' alt='全麥土司' className='card-img' />
                                </div>

                            </div>
                            <div className='card-content'>
                                <h2 className='title'>Day5</h2>
                                <div className='element'>
                                    <h1>早餐</h1>
                                    <hr/>
                                    <p className=''>蔬菜蛋餅一份</p>
                                    <p className=''>無糖黑芝麻 350cc</p>
                                    <p className='clo1'>卡路里:370</p>
                                    <br/>
                                    <h1>午餐</h1>
                                    <hr/>
                                    <p className=''>墨西哥捲餅一條+生菜沙拉</p>
                                    <p className=''>無糖綠茶300毫升</p>
                                    <p className='clo2'>卡路里:450</p>
                                    <br/>
                                     <h1>晚餐</h1>
                                    <hr/>
                                     <p className=''>越式春捲2捲</p>
                                    <p className=''>洋蔥湯一碗</p>
                                    <p className=''>油醋沙拉一碗</p>
                                    <p className='clo3'>卡路里:420</p>

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