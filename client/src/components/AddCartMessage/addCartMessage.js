import Modal from 'react-modal';
import React from 'react'
import addCartMessage from './addCartMessage.module.css'
import { BsFillCheckCircleFill } from 'react-icons/bs'
import { AiFillCloseCircle } from 'react-icons/ai'

const AddCartMessage = ({ isOpenMsg, setIsOpenMsg, setShowModalMsg, msgContent }) => {
    Modal.setAppElement('#root')

    setTimeout(() => {
        setIsOpenMsg(false)
    }, 2000)

    setTimeout(() => {
        setShowModalMsg(false)
    }, 2300)

    return (
        <Modal
            isOpen={isOpenMsg}
            bodyOpenClassName={addCartMessage.body}
            portalClassName={addCartMessage.portal}
            className={{
                base: addCartMessage.content,
                afterOpen: addCartMessage.contentAfterOpen,
                beforeClose: addCartMessage.contentBeforeClose
            }}
            overlayClassName={{
                base: addCartMessage.overlay,
                afterOpen: addCartMessage.overlayAfterOpen,
                beforeClose: addCartMessage.overlayBeforeClose
            }}
            closeTimeoutMS={300}>
            <div className={msgContent.item ? addCartMessage.wrapper : addCartMessage.errorWrapper}>
                {msgContent.item ? <BsFillCheckCircleFill size={24} color='green'/> : <AiFillCloseCircle size={24} color='red'/>}
                {msgContent.item ? <p className={addCartMessage.messageTitle}>{`${msgContent.item.quantity} phòng ${msgContent.item.roomName} của bạn tại ${msgContent.item.hotel.name} đã được thêm vào giỏ hàng`}</p> 
                    : <p>{msgContent.error}</p>}
            </div>
        </Modal>
    )
}

export default AddCartMessage