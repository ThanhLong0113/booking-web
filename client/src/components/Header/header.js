import React from 'react'
import header from './header.module.css'
import Logo from '../../assets/images/brand_logo.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const navigate = useNavigate()
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
                <div className={header.accountWrapper}>
                    <button onClick={() => navigate('/sign-in')}>Đăng nhập</button>
                    <button onClick={() => navigate('/create-account')}>Đăng ký</button>
                </div>
            </div>
        </div>
    )
}

export default Header