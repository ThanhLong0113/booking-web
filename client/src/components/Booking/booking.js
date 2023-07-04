import React, { useState } from "react";
import { useBookingsByCustomer } from '../../talons/useBookingsByCustomer'
import { useNavigate } from "react-router-dom";
import { parse } from 'date-fns';
import axios from 'axios';
import LoadingClip from '../LoadingClip'
import Header from '../Header'
import Footer from '../Footer'
import NoOrder from '../../assets/images/no_order.png'
import booking from './booking.module.css'
import RemoveBookingMessage from "../RemoveBookingMessage/removeBookingMessage";

const Booking = () => {
    const id = localStorage.getItem('token')
    const [error, setError] = useState()
    const [isOpen, setIsOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const navigate = useNavigate()
    const getBookingsByCustomer = useBookingsByCustomer(id)
    const {
        isLoading,
        setIsLoading,
        bookingsByCustomer
    } = getBookingsByCustomer

    async function updateBooking(id, remainingBooking) {
        setIsLoading(true)
        try {
            await axios.put(`http://localhost:5000/bookings/${id}`, remainingBooking)
            setIsLoading(false)
        }
        catch (err) {
            setIsOpen(true)
            setShowModal(true)
            setError(err.response.date.error)
        }
    }

    async function deleteBooking(id) {
        setIsLoading(true)
        try {
            await axios.delete(`http://localhost:5000/bookings/${id}`)
            setIsLoading(false)
        }
        catch (err) {
            setIsOpen(true)
            setShowModal(true)
            setError(err.response.date.error)
        }
    }

    const handleUpdateBooking = (element, ele) => {
        const date = new Date().toLocaleDateString('vi-VN')
        const checkIn = parse(ele.checkIn, 'dd/MM/yyyy', new Date())
        const currentDate = parse(date, 'dd/MM/yyyy', new Date())
        const subDate = checkIn.getTime() - currentDate.getTime();
        const diffInDays = Math.ceil(subDate / (1000 * 60 * 60 * 24));
        const remainingBooking = element.items.filter(item => item._id !== ele._id)
        if (diffInDays < 2) {
            setIsOpen(true)
            setShowModal(true)
            setError('Đã quá thời gian hủy đặt phòng.')
        }
        else {
            if(remainingBooking.length > 0) updateBooking(element._id, remainingBooking)
            else deleteBooking(element._id)
        }
    }

    if (isLoading) return <LoadingClip />

    return (
        <>
            <div>
                <Header />
                {bookingsByCustomer && bookingsByCustomer.length === 0 ? (<div className={booking.noOrderWrapper}>
                    <img src={NoOrder} alt='' className={booking.noOrderImage}></img>
                    <h2 className={booking.noOrderTitle}>Có vẻ như bạn chưa đặt đơn hàng nào!</h2>
                    <button className={booking.backButton} onClick={() => navigate('/')}>Trở lại màn hình chính</button>
                </div>) : (<div className={booking.orderWrapper}>
                    <h1>{`Đơn hàng của bạn (${bookingsByCustomer.length})`}</h1>
                    <div className={booking.orderColumn}>
                        {bookingsByCustomer.map((element, index) => {
                            return (
                                element.items.length > 0 ? (<div className={booking.orderItem} key={index}>
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
                                                        <button className={booking.removeBooked} onClick={() => {
                                                            handleUpdateBooking(element, ele)
                                                        }}>Hủy đặt phòng</button>
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
                                </div>) : <></>
                            )
                        })}
                    </div>
                </div>)}
                <Footer />
            </div>
            {showModal && (<RemoveBookingMessage isOpen={isOpen} setIsOpen={setIsOpen} setShowModal={setShowModal} error={error}/>)}
        </>
    )
}

export default Booking