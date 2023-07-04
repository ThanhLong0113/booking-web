import Modal from 'react-modal';
import React from 'react'
import removeBookingMessage from './removeBookingMessage.module.css'
import { AiFillCloseCircle } from 'react-icons/ai'

const RemoveBookingMessage = ({ isOpen, setIsOpen, setShowModal, error }) => {
    Modal.setAppElement('#root')

    setTimeout(() => {
        setIsOpen(false)
    }, 2000)

    setTimeout(() => {
        setShowModal(false)
    }, 2300)

    return (
        <Modal
            isOpen={isOpen}
            bodyOpenClassName={removeBookingMessage.body}
            portalClassName={removeBookingMessage.portal}
            className={{
                base: removeBookingMessage.content,
                afterOpen: removeBookingMessage.contentAfterOpen,
                beforeClose: removeBookingMessage.contentBeforeClose
            }}
            overlayClassName={{
                base: removeBookingMessage.overlay,
                afterOpen: removeBookingMessage.overlayAfterOpen,
                beforeClose: removeBookingMessage.overlayBeforeClose
            }}
            closeTimeoutMS={300}>
            <div className={removeBookingMessage.errorWrapper}>
                <AiFillCloseCircle size={24} color='red'/>
                <p>{error}</p>
            </div>
        </Modal>
    )
}

export default RemoveBookingMessage