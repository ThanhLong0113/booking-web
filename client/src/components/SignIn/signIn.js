import React from "react";
import Header from "../Header";
import signIn from './signIn.module.css'
import SignInImage from '../../assets/images/sign_in_image.jpg'

const SignIn = () => {
    return (
        <>
            <Header/>
            <div className={signIn.wrapper}>
                <div className={signIn.imageWrapper}>
                    <img src={SignInImage} alt=''></img>
                </div>
                <div className={signIn.formWrapper}>
                    <div>
                        <h2 className={signIn.formTitle}>Đăng nhập</h2>
                        <p className={signIn.formSubTitle}>Vì lý do bảo mật, vui lòng đăng nhập để truy cập vào các thông tin của bạn</p>
                    </div>
                    <div>
                        <p className={signIn.formInputLabel}>Email</p>
                        <input placeholder="Email"></input>
                    </div>
                    <div>
                        <p className={signIn.formInputLabel}>Password</p>
                        <input placeholder="Password"></input>
                    </div>
                    <button>Sign in</button>
                    <p className={signIn.formNote}>Bằng việc đăng nhập, tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của Booking 27.</p>
                </div>
            </div>
        </>
    )
}

export default SignIn