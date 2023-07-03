import React, { useState } from "react";
import axios from 'axios'
import { SyncLoader } from 'react-spinners'
import { useUserById } from "../../../talons/useUserById";
import { validatePassword } from "../../../talons/validation";
import DeleteAccount from "../../DeleteAccount";
import accountSecurity from './accountSecurity.module.css'

const AccountSecurity = () => {
    const id = localStorage.getItem('token')
    const getUserById = useUserById(id)
    const {
        isLoading,
        userById,
        setIsLoading
    } = getUserById

    const [passwordEdit, setPasswordEdit] = useState(false)
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [passwordErr, setPasswordErr] = useState()
    const [confirmPasswordErr, setConfirmPasswordErr] = useState()

    const [isOpen, setIsOpen] = useState(false)
    const [showDelete, setShowDelete] = useState(false)

    async function updateUser(field, value) {
        setIsLoading(true)
        try {
            await axios.put(`http://localhost:5000/users/${id}`, {
                field: field,
                value: value
            });
            setIsLoading(false)
        } catch (err) {
            setIsLoading(false)
        }
    }

    const checkPassword = () => {
        const checkPassword = validatePassword(password)
        if (checkPassword.length > 0) setPasswordErr(checkPassword)
        else {
            setPasswordErr('')
            if (confirmPassword !== password) setConfirmPasswordErr('Mật khẩu xác thực không trùng khớp với mật khẩu mới.')
            else setConfirmPasswordErr('')
        }

        if (!(checkPassword.length > 0) && confirmPassword === password) return true
        else return false
    }

    const handleUpdateUser = (field, value) => {
        const checkInput = checkPassword()
        if (checkInput) updateUser(field, value)
    }

    if (isLoading) return (
        <div className={accountSecurity.wrapper}>
            <div className={accountSecurity.title}>
                <h1>Bảo mật</h1>
                <p>Điều chỉnh lại các cài đặt bảo mật của bạn để tăng cường độ an toàn cho tài khoản.</p>
            </div>
            <div className={accountSecurity.infoLoading}>
                <SyncLoader size={12} color='#006ce4' speedMultiplier={1.5} />
            </div>
        </div>
    )

    return (
        <div className={accountSecurity.wrapper}>
            <div className={accountSecurity.title}>
                <h1>Bảo mật</h1>
                <p>Điều chỉnh lại các cài đặt bảo mật của bạn để tăng cường độ an toàn cho tài khoản.</p>
            </div>
            <div className={accountSecurity.infoWrapper}>
                <div className={accountSecurity.infoItem}>
                    <div className={accountSecurity.itemName}>
                        <h4>Mật khẩu</h4>
                    </div>
                    <div className={accountSecurity.itemContent}>
                        {!passwordEdit ? (<p>Thay đổi mật khẩu của bạn</p>)
                            : (<div className={accountSecurity.inputWrapper}>
                                <div>
                                    <input type='password' placeholder="Mật khẩu mới" onChange={(e) => {
                                        setPassword(e.target.value)
                                    }}></input>
                                    {passwordErr?.length > 0 && <p className={accountSecurity.inputError}>{passwordErr}</p>}
                                </div>
                                <div>
                                    <input type='password' placeholder="Xác nhận mật khẩu mới" onChange={(e) => {
                                        setConfirmPassword(e.target.value)
                                    }}></input>
                                    {confirmPasswordErr?.length > 0 && <p className={accountSecurity.inputError}>{confirmPasswordErr}</p>}
                                </div>
                            </div>)}
                    </div>
                    <div className={accountSecurity.itemButton}>
                        {!passwordEdit ? (<button className={accountSecurity.editButton} onClick={() => setPasswordEdit(true)}>Cài đặt lại</button>)
                            : (<div className={accountSecurity.buttonWrapper}>
                                <button className={accountSecurity.cancelButton} onClick={() => setPasswordEdit(false)}>Hủy</button>
                                <button className={accountSecurity.saveButton} onClick={() => {
                                    const passwordCheck = validatePassword(password)
                                    if (!(passwordCheck.length > 0) && password === confirmPassword) {
                                        setPassword()
                                        setPasswordErr('')
                                        setConfirmPassword()
                                        setConfirmPasswordErr('')
                                        const field = ['password']
                                        const value = [password]
                                        handleUpdateUser(field, value)
                                        setPasswordEdit(false)
                                    }
                                    else {
                                        if (passwordCheck.length > 0) setPasswordErr(checkPassword)
                                        else {
                                            if (passwordCheck.length > 0) setPasswordErr(checkPassword)
                                            else {
                                                setPasswordErr('')
                                                if (confirmPassword !== password) setConfirmPasswordErr('Mật khẩu xác thực không trùng khớp với mật khẩu mới.')
                                                else setConfirmPasswordErr('')
                                            }
                                        }
                                    }
                                }}>Lưu</button>
                            </div>)}
                    </div>
                </div>

                <div className={accountSecurity.infoItem}>
                    <div className={accountSecurity.itemName}>
                        <h4>Xóa tài khoản</h4>
                    </div>
                    <div className={accountSecurity.itemContent}>
                        <p>Xóa vĩnh viễn tài khoản của bạn tại Booking27</p>
                    </div>
                    <div className={accountSecurity.itemButton}>
                        <button className={accountSecurity.editButton} onClick={() => {
                            setShowDelete(true)
                            setIsOpen(true)
                        }}>Xóa tài khoản</button>
                    </div>
                </div>
            </div>

            {showDelete && (<DeleteAccount isOpen={isOpen} setIsOpen={setIsOpen} setShowDelete={setShowDelete} id={id} />)}
        </div>
    )
}

export default AccountSecurity