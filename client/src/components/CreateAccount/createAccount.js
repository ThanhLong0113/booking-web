import React from "react";
import Header from "../Header";
import createAccount from './createAccount.module.css'
import CreateAccountImage from '../../assets/images/create_account_image.jpg'

const CreateAccount = () => {
    return (
        <>
            <Header/>
            <div className={createAccount.wrapper}>
                <div className={createAccount.imageWrapper}>
                    <img src={CreateAccountImage} alt=''></img>
                </div>
                <div className={createAccount.formWrapper}>
                    <div>
                        <h2 className={createAccount.formTitle}>Đăng ký</h2>
                        <p className={createAccount.formSubTitle}>Tạo tài khoản của bạn để truy cập mọi tiện ích mà chúng tôi cung cấp</p>
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Họ</p>
                        <input placeholder="Họ"></input>
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Tên</p>
                        <input placeholder="Tên"></input>
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Email</p>
                        <input placeholder="Email"></input>
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Password</p>
                        <input placeholder="Password"></input>
                    </div>
                    <button>Sign Up</button>
                    <p className={createAccount.formNote}>Bằng việc đăng ký, tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của Booking 27.</p>
                </div>
            </div>
        </>
    )
}

export default CreateAccount