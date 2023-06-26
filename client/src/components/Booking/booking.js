import React from "react";
import { useBookingsByCustomer } from '../../talons/useBookingsByCustomer'
import { useNavigate } from "react-router-dom";
import LoadingClip from '../LoadingClip'
import Header from '../Header'
import Footer from '../Footer'
import NoOrder from '../../assets/images/no_order.png'
import booking from './booking.module.css'

const Booking = () => {
    const id = localStorage.getItem('token')
    const navigate = useNavigate()
    const getBookingsByCustomer = useBookingsByCustomer(id)
    const {
        isLoading,
        bookingsByCustomer
    } = getBookingsByCustomer

    if (isLoading) return <LoadingClip />
    console.log(bookingsByCustomer)

    return (
        <div>
            <Header />
            {!bookingsByCustomer ? (<div className={booking.noOrderWrapper}>
                <img src={NoOrder} alt='' className={booking.noOrderImage}></img>
                <h2 className={booking.noOrderTitle}>Có vẻ như bạn chưa đặt đơn hàng nào!</h2>
                <button className={booking.backButton} onClick={() => navigate('/')}>Trở lại màn hình chính</button>
            </div>) : (<div className={booking.orderWrapper}>
                <h1>{`Đơn hàng của bạn (${bookingsByCustomer.length})`}</h1>
                <div className={booking.orderColumn}>
                    {bookingsByCustomer.map((element, index) => {
                        return (
                            <div className={booking.orderItem} key={index}>
                                {element.items.map((ele, idx) => {
                                    return (
                                        <div className={booking.itemWrapper}>
                                            <div className={booking.itemWrapper}>
                                                <div className={booking.hotelDetails}>
                                                    <div className={booking.hotelImage}>
                                                        <img src={ele.hotel.image} alt=''></img>
                                                    </div>
                                                    <div className={booking.hotelInfo}>
                                                        <h3>{ele.hotel.name}</h3>
                                                        <p>{ele.hotel.address}</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={booking.checkoutInfo}>
                                                <div className={booking.roomInfo}>
                                                    <div className={booking.selectWrapper}>
                                                        <h3>{`${ele.quantity} x ${ele.roomName}`}</h3>
                                                    </div>
                                                    <div className={booking.dateInfo}>
                                                        <p>{`${ele.checkIn} - ${ele.checkOut}`}</p>
                                                    </div>
                                                </div>
                                                <div className={booking.priceInfo}>
                                                    <h3>{`${ele.totalPrice.toLocaleString()} VNĐ`}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                </div>
            </div>)}
            <Footer />
        </div>
    )
}

export default Booking