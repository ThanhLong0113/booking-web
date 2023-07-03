import React, { useState } from "react";
import axios from "axios";
import bcrypt from 'bcryptjs';
import { useNavigate } from "react-router-dom";
import { validateFirstName, validateLastName, validateEmail, validatePassword } from "../../talons/validation";
import Header from "../Header";
import createAccount from './createAccount.module.css'
import CreateAccountImage from '../../assets/images/create_account_image.jpg'
import LoadingClip from "../LoadingClip/loadingClip";

const CreateAccount = () => {
    const [firstName, setFirstName] = useState()
    const [lastName, setLastName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)

    const [firstNameErr, setFirstNameErr] = useState()
    const [lastNameErr, setLastNameErr] = useState()
    const [emailErr, setEmailErr] = useState()
    const [passwordErr, setPasswordErr] = useState()

    const navigate = useNavigate()

    async function createUser() {
        setIsLoading(true)
        try {
            const createUser = await axios.post('http://localhost:5000/users', {
                first_name: firstName,
                last_name: lastName,
                email: email,
                password: bcrypt.hashSync(password, 10)
            });

            const cart_id = createUser.data.newUser.cart_id
            await axios.post('http://localhost:5000/carts', {
                cart_id: cart_id
            })

            localStorage.setItem('token', createUser.data.newUser._id);
            localStorage.setItem('cart_id', cart_id)
            setIsLoading(false)
            navigate('/')
        } catch (err) {
            setIsLoading(false)
            setError(err.response.data.error)
        }
    }

    const checkInput = () => {
        const validFN = validateFirstName(firstName)
        const validLN = validateLastName(lastName)
        const validEmail = validateEmail(email)
        const validPassword = validatePassword(password)

        if(validFN.length > 0) setFirstNameErr(validFN)
        else setFirstNameErr('')
        if(validLN.length > 0) setLastNameErr(validLN)
        else setLastNameErr('')
        if(validEmail.length > 0) setEmailErr(validEmail)
        else setEmailErr('')
        if(validPassword.length > 0) setPasswordErr(validPassword)
        else setPasswordErr('')

        if(validFN.length > 0 || validLN.length > 0 || validEmail.length > 0 || validPassword.length > 0) return false
        else return true
    }

    const handleSubmit = () => {
        const checkInputResult = checkInput()
        if(checkInputResult) createUser()
    }

    if(isLoading) return <LoadingClip/>

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
                        {firstNameErr?.length > 0 && <p className={createAccount.inputError}>{firstNameErr}</p>}
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Tên</p>
                        <input placeholder="Tên" onChange={(e) => setLastName(e.target.value)}></input>
                        {lastNameErr?.length > 0 && <p className={createAccount.inputError}>{lastNameErr}</p>}
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Email</p>
                        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)}></input>
                        {emailErr?.length > 0 && <p className={createAccount.inputError}>{emailErr}</p>}
                    </div>
                    <div>
                        <p className={createAccount.formInputLabel}>Password</p>
                        <input placeholder="Password" onChange={(e) => setPassword(e.target.value)} type="password"></input>
                        {passwordErr?.length > 0 && <p className={createAccount.inputError}>{passwordErr}</p>}
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