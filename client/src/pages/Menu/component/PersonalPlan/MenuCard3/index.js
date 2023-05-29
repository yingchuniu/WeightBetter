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
                                    <img src='/ImageMenu/fatLoseMeal/雞肉飯.jpg' alt='全麥土司' className='card-img' />
                                </div>

                            </div>
                            <div className='card-content'>
                                <h2 className='title'>Day3</h2>
                                <div className='element'>
                                    <h1>早餐</h1>
                                    <hr/>
                                    <p className=''>燻雞御飯糰一個</p>
                                    <p className=''>豆漿燕麥 280cc</p>
                                    <p className='clo1'>卡路里:335</p>
                                    <br/>
                                    <h1>午餐</h1>
                                    <hr/>
                                    <p className=''>十榖飯1碗</p>
                                    <p className=''>黑胡椒豬排1片</p>
                                    <p className=''>高麗菜半碟</p>
                                    <p className=''>絲瓜蛤蠣半碟</p>
                                    <p className='clo2'>卡路里:590</p>
                                    <br/>
                                     <h1>晚餐</h1>
                                    <hr/>
                                     <p className=''>雞肉飯一碗</p>
                                    <p className=''>皮蛋豆腐</p>
                                    <p className=''>紫菜湯一碗</p>
                                    <p className='clo3'>卡路里:475</p>

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