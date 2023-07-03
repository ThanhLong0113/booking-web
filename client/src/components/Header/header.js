import React, { useState, useEffect, useCallback } from 'react'
import header from './header.module.css'
import Logo from '../../assets/images/brand_logo.png'
import { useNavigate } from 'react-router-dom'
import { FaUser } from 'react-icons/fa'
import { BsCartFill, BsCircleFill } from 'react-icons/bs'
import axios from 'axios'

const Header = () => {
    const navigate = useNavigate()
    const isSignedIn = localStorage.getItem('token')
    const cart_id = localStorage.getItem('cart_id')
    const [userName, setUserName] = useState()
    const [isDropdown, setIsDropdown] = useState(false)

    const getUserData = useCallback(async function getUserData() {
        try {
            const res = await axios.get(`http://localhost:5000/users/${isSignedIn}`);
            setUserName(res.data.userById.last_name)
        } catch (err) {
            console.log(err)
        }
    }, [isSignedIn])

    useEffect(() => {
        if (isSignedIn) {
            getUserData()
        }
    }, [isSignedIn, getUserData])

    const handleDropdownToggle = () => {
        setIsDropdown(!isDropdown);
    };

    const handleLogOut = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div className={header.wrapper}>
            <div className={header.leftWrapper}>
                <div className={header.logo}>
                    <button onClick={() => navigate('/')}>
                        <img src={Logo} alt=''></img>
                    </button>
                </div>
                <div className={header.navWrapper}>
                    <button onClick={() => navigate('/hotels')}>Khách sạn</button>
                    <button onClick={() => navigate('/destinations')}>Địa điểm</button>
                </div>
            </div>

            <div className={header.rightWrapper}>
                {isSignedIn ?
                    (<div className={header.userWrapper}>
                        <button className={header.userButton} onMouseEnter={handleDropdownToggle} onMouseLeave={handleDropdownToggle}>
                            <FaUser size={18} />
                            {userName && (<p>{`Hi, ${userName}`}</p>)}
                            {isDropdown && (
                                <div className={header.dropdownWrapper}>
                                    <button className={header.dropdownButton} onClick={() => navigate(`/my-account`)}>
                                        <BsCircleFill size={14}/>
                                        <p>Tài khoản của tôi</p>
                                    </button>
                                    <button className={header.dropdownButton} onClick={() => navigate(`/booking/${isSignedIn}`)}>
                                        <BsCircleFill size={14}/>
                                        <p>Đơn hàng của tôi</p>
                                    </button>
                                    <button className={header.dropdownButton} onClick={handleLogOut}>
                                        <BsCircleFill size={14}/>
                                        <p>Đăng xuất</p>
                                    </button>
                                </div>
                            )}
                        </button>

                        <button className={header.userButton} onClick={() => navigate(`/cart/${cart_id}`)}>
                            <BsCartFill size={18} />
                            <p>Cart</p>
                        </button>
                    </div>) : (<div className={header.accountWrapper}>
                        <button onClick={() => navigate('/sign-in')}>Đăng nhập</button>
                        <button onClick={() => navigate('/create-account')}>Đăng ký</button>
                    </div>)}
            </div>
        </div>
    )
}

export default Header