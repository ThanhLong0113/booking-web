import Modal from 'react-modal';
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { VscClose } from 'react-icons/vsc'
import { BsPlusCircle } from 'react-icons/bs';
import { FiMinusCircle } from 'react-icons/fi';
import cartModal from './cartModal.module.css'
import { SyncLoader } from 'react-spinners';

const CartModal = ({ isOpen, setIsOpen, setShowModal, hotelData, roomChoose, setShowModalMsg, setIsOpenMsg, setMsgContent }) => {
    Modal.setAppElement('#root')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [quantity, setQuantity] = useState(1)
    const [isLoading, setIsLoading] = useState(false)
    const [errorMsg, setErrorMsg] = useState()
    const cart_id = localStorage.getItem('cart_id')
    const navigate = useNavigate()

    async function addToCart() {
        if(!localStorage.getItem('token')) {
            setIsOpen(false)
            setTimeout(() => {
                setShowModal(false)
                navigate('/sign-in')
            }, 300)
        }
        setIsLoading(true)
        setErrorMsg()
        
        try {
            const subDate = endDate.getTime() - startDate.getTime();
            const diffInDays = Math.ceil(subDate / (1000 * 60 * 60 * 24));

            if(diffInDays === 0) {
                setIsLoading(false)
                setErrorMsg('Thời gian check-out phải cách thời gian check-in ít nhất 1 ngày.')
                throw new Error('Thời gian check-out phải cách thời gian check-in ít nhất 1 ngày.')
            }

            const item = {
                hotel: {
                    hotel_id: hotelData._id,
                    image: hotelData.image,
                    name: hotelData.name,
                    address: hotelData.address
                },
                checkIn: startDate.toLocaleDateString('vi-VI'),
                checkOut: endDate.toLocaleDateString('vi-VI'),
                roomId: roomChoose._id,
                roomName: roomChoose.name,
                price_per_night: roomChoose.price_per_night,
                quantity: quantity,
                totalPrice: roomChoose.price_per_night * quantity * diffInDays
            }

            await axios.put(`http://localhost:5000/carts/add/${cart_id}`, item);

            setIsLoading(false)
            setIsOpen(false)
            setTimeout(() => {
                setShowModal(false)
                setMsgContent({ item: item })
                setShowModalMsg(true)
                setIsOpenMsg(true)
            }, 300)
        } catch (err) {
            setIsLoading(false)
            setErrorMsg(err.response.data.error)
        }
    }

    const handleAddRoom = () => {
        setQuantity(prev => prev + 1)
    }

    const handleRemoveRoom = () => {
        if (quantity > 1) setQuantity(prev => prev - 1)
    }

    const handleAddCart = () => {
        addToCart()
    }

    return (
        <Modal
            isOpen={isOpen}
            bodyOpenClassName={cartModal.body}
            portalClassName={cartModal.portal}
            className={{
                base: cartModal.content,
                afterOpen: cartModal.contentAfterOpen,
                beforeClose: cartModal.contentBeforeClose
            }}
            overlayClassName={{
                base: cartModal.overlay,
                afterOpen: cartModal.overlayAfterOpen,
                beforeClose: cartModal.overlayBeforeClose
            }}
            closeTimeoutMS={300}>
            <div className={cartModal.wrapper}>
                <div className={cartModal.inputWrapper}>
                    <div>
                        <p className={cartModal.inputTitle}>Chọn ngày checkin</p>
                        <DatePicker
                            id="calendar"
                            dateFormat="dd/MM/yyyy"
                            selected={startDate}
                            onChange={date => setStartDate(date)}
                            minDate={new Date()}
                            showPopperArrow={false}
                            customInput={<button className={cartModal.checkInPicker}>{startDate ? startDate.toLocaleDateString('vi-VI') : ''}</button>}
                        />
                    </div>
                    <div>
                        <p className={cartModal.inputTitle}>Chọn ngày checkout</p>
                        <DatePicker
                            id="calendar"
                            dateFormat="dd/MM/yyyy"
                            selected={endDate}
                            onChange={date => setEndDate(date)}
                            minDate={new Date()}
                            showPopperArrow={false}
                            customInput={<button className={cartModal.checkOutPicker}>{endDate ? endDate.toLocaleDateString('vi-VI') : ''}</button>}
                        />
                    </div>
                    <div>
                        <p className={cartModal.inputTitle}>Chọn số phòng</p>
                        <div className={cartModal.quantityWrapper}>
                            <button className={cartModal.plusButton} onClick={handleAddRoom}>
                                <BsPlusCircle size={24} color='white' />
                            </button>
                            <p className={cartModal.quantityText}>{quantity}</p>
                            <button className={cartModal.minusButton} onClick={handleRemoveRoom}>
                                <FiMinusCircle size={24} color='white' />
                            </button>
                        </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'end' }}>
                        <button className={cartModal.addCartButton} onClick={handleAddCart}>Add to Cart</button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <button className={cartModal.closeButton} onClick={() => {
                            setIsOpen(false)
                            setTimeout(() => {
                                setShowModal(false)
                            }, 300)
                        }}>
                            <VscClose size={24} color='white'></VscClose>
                        </button>
                    </div>
                </div>
                {errorMsg && errorMsg.length > 0 && !isLoading && (<h4 className={cartModal.errorMsg}>{errorMsg}</h4>)}
                {isLoading && (<div className={cartModal.addCartLoading}>
                    <SyncLoader size={12} color='white' speedMultiplier={1.5} />
                </div>)}
            </div>
        </Modal>
    )
}

export default CartModal