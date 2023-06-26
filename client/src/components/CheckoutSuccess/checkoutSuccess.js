import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { BsCheck2Circle } from 'react-icons/bs'
import checkoutSuccess from './checkoutSuccess.module.css'
import Header from '../Header'
import Footer from '../Footer'

const CheckoutSuccess = () => {
    const location = useLocation()
    const bookingData = location.state;
    const navigate = useNavigate()
    return (
        <div>
            <Header/>
            <div className={checkoutSuccess.wrapper}>
                <BsCheck2Circle size={60} color='#006ce4'/>
                <h1 className={checkoutSuccess.title}>Cảm ơn bạn đã đặt phòng!</h1>
                <h3 className={checkoutSuccess.subTitle}>{`Mã đơn hàng - ${bookingData}`}</h3>
                <button className={checkoutSuccess.backButton} onClick={() => navigate('/')}>Tiếp tục đặt phòng</button>
            </div>
            <Footer/>
        </div>

    )
}

export default CheckoutSuccess