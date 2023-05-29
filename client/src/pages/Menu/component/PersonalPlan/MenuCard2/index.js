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
                                    <img src='/ImageMenu/fatLoseMeal/鮪魚三明治.jpg' alt='全麥土司' className='card-img' />
                                </div>

                            </div>
                            <div className='card-content'>
                                <h2 className='title'>Day2</h2>
                                <div className='element'>
                                    <h1>早餐</h1>
                                    <hr/>
                                    <p className=''>雙餡鮪魚蛋三明治一個</p>
                                    <p className=''>鮮奶 290cc</p>
                                    <p className='clo1'>卡路里:370</p>
                                    <br/>
                                    <h1>午餐</h1>
                                    <hr/>
                                    <p className=''>白飯1碗</p>
                                    <p className=''>蒜泥白肉5片</p>
                                    <p className=''>鹹蛋炒苦瓜半碟</p>
                                    <p className=''>絲瓜蛤蠣半碟</p>
                                    <p className=''>味噌湯一碗</p>
                                    <p className='clo2'>卡路里:620</p>
                                    <br/>
                                     <h1>晚餐</h1>
                                    <hr/>
                                     <p className=''>紫米飯一碗</p>
                                    <p className=''>雞腿一隻</p>
                                    {/* <p className=''>龍鬚菜一碗</p> */}
                                    <p className=''>海帶湯一碗</p>
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