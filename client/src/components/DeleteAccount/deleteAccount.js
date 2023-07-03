import React from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Modal from 'react-modal';
import deleteAccount from './deleteAccount.module.css'
import { VscClose } from "react-icons/vsc";

const DeleteAccount = ({ isOpen, setIsOpen, setShowDelete, id }) => {
    Modal.setAppElement('#root')
    const navigate = useNavigate()

    async function deleteUser(id) {
        try {
            await axios.delete(`http://localhost:5000/users/${id}`);
            setIsOpen(false)
            setTimeout(() => {
                setShowDelete(false)
            }, 300)
            setTimeout(() => {
                localStorage.removeItem('token')
                navigate('/')
            }, 500)

        } catch (err) {
        }
    }

    const handleDeleteUser = (id) => {
        deleteUser(id)
    }

    return (
        <Modal
            isOpen={isOpen}
            bodyOpenClassName={deleteAccount.body}
            portalClassName={deleteAccount.portal}
            className={{
                base: deleteAccount.content,
                afterOpen: deleteAccount.contentAfterOpen,
                beforeClose: deleteAccount.contentBeforeClose
            }}
            overlayClassName={{
                base: deleteAccount.overlay,
                afterOpen: deleteAccount.overlayAfterOpen,
                beforeClose: deleteAccount.overlayBeforeClose
            }}
            closeTimeoutMS={300}>
            <div className={deleteAccount.wrapper}>
                <button className={deleteAccount.closeButton} onClick={() => {
                    setIsOpen(false)
                    setTimeout(() => {
                        setShowDelete(false)
                    }, 300)
                }}>
                    <VscClose size={24} />
                </button>
                <div className={deleteAccount.title}>
                    <h3>Bạn có chắc chắn muốn xóa vĩnh viễn tài khoản của mình?</h3>
                </div>
                <div className={deleteAccount.buttonWrapper}>
                    <button className={deleteAccount.submitButton} onClick={() => {
                        handleDeleteUser(id)
                    }}>OK</button>
                    <button className={deleteAccount.cancelButton} onClick={() => {
                        setIsOpen(false)
                        setTimeout(() => {
                            setShowDelete(false)
                        }, 300)
                    }}>HỦY</button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteAccount