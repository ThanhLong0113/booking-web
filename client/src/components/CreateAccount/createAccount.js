import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Header";
import createAccount from './createAccount.module.css'
import CreateAccountImage from '../../assets/images/create_account_image.jpg'
import axios from "axios";

const CreateAccount = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()

    const navigate = useNavigate()

    async function createUser() {
        try {
            const res = await axios.post('http://localhost:5000/users', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: password
            });

            localStorage.setItem('token', res.data.newUser._id);
            navigate('/')
        } catch (err) {
            setError(err.response.data.error)
        }
    }

    const handleSubmit = () => {
        createUser()
    }

    return (
        <>
            <Header />
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
                        <input placeholder="Họ" onChange={(e) => setFirstName(e.target.value)}></input>
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Tên</p>
                        <input placeholder="Tên" onChange={(e) => setLastName(e.target.value)}></input>
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Email</p>
                        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Password</p>
                        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)}></input>
                    </div>
                    {error?.length > 0 && <p className={createAccount.formError}>{error}</p>}
                    <button onClick={handleSubmit}>Sign Up</button>
                    <p className={createAccount.formNote}>Bằng việc đăng ký, tôi đồng ý với điều khoản sử dụng và chính sách bảo mật của Booking 27.</p>
                </div>
            </div>
        </>
    )
}

export default CreateAccount