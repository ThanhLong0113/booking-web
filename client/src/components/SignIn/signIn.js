import React, { useState } from "react";
import Header from "../Header";
import signIn from './signIn.module.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import SignInImage from '../../assets/images/sign_in_image.jpg'

const SignIn = () => {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const navigate = useNavigate()

    async function logIn() {
        try {
            const res = await axios.get('http://localhost:5000/users', {
                params: {
                    email: email,
                    password: password
                }
            });

            localStorage.setItem('token', res.data.existedUser._id);
            localStorage.setItem('cart_id', res.data.existedUser.cart_id);
            navigate('/')
        } catch (err) {
            setError(err.response.data.error)
        }
    }

    const handleSubmit = () => {
        logIn()
    }

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
                        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <p className={signIn.formInputLabel}>Password</p>
                        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    {error?.length > 0 && (<p className={signIn.formError}>{error}</p>)}
                    <button onClick={handleSubmit}>Sign in</button>
                    <p className={signIn.formNote}>Bằng việc đăng nhập, tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của Booking 27.</p>
                </div>
            </div>
        </>
    )
}

export default SignIn