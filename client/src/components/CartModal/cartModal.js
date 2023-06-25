import Modal from 'react-modal';
import React, { useState } from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";
import { VscClose } from 'react-icons/vsc'
import { BsPlusCircle } from 'react-icons/bs';
import { FiMinusCircle } from 'react-icons/fi';
import cartModal from './cartModal.module.css'

const CartModal = ({ isOpen, setIsOpen }) => {
    Modal.setAppElement('#root')
    const [startDate, setStartDate] = useState(new Date())
    const [endDate, setEndDate] = useState(new Date())
    const [quantity, setQuantity] = useState(1)

    const handleAddRoom = () => {
        setQuantity(prev => prev+1)
    }

    const handleRemoveRoom = () => {
        if(quantity > 1) setQuantity(prev => prev-1)
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
                    <DatePicker
                        id="calendar"
                        dateFormat="dd/MM/yyyy"
                        popperPlacement="bottom-start"
                        selected={startDate}
                        onChange={date => setStartDate(date)}
                        minDate={new Date()}
                        showPopperArrow={false}
                        customInput={<button className={cartModal.checkInPicker}>{startDate ? startDate.toLocaleDateString('vi-VI') : ''}</button>}
                    />
                    <DatePicker
                        id="calendar"
                        dateFormat="dd/MM/yyyy"
                        selected={endDate}
                        onChange={date => setEndDate(date)}
                        minDate={new Date()}
                        showPopperArrow={false}
                        customInput={<button className={cartModal.checkOutPicker}>{endDate ? endDate.toLocaleDateString('vi-VI') : ''}</button>}
                    />
                    <div className={cartModal.quantityWrapper}>
                        <button className={cartModal.plusButton} onClick={handleAddRoom}>
                            <BsPlusCircle size={24} color='white'/>
                        </button>
                        <p className={cartModal.quantityText}>{quantity}</p>
                        <button className={cartModal.minusButton} onClick={handleRemoveRoom}>
                            <FiMinusCircle size={24} color='white'/>
                        </button>
                    </div>
                    <button className={cartModal.addCartButton}>Add to Cart</button>
                    <button className={cartModal.closeButton} onClick={() => setIsOpen(false)}>
                        <VscClose size={24} color='white'></VscClose>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default CartModal