import React from 'react'
import footer from './footer.module.css'
import Logo from '../../assets/images/brand_logo.png'
import { FaGithub } from 'react-icons/fa'

const Footer = () => {
    return (
        <div className={footer.wrapper}>
            <h2 className={footer.content}>Nhóm 27 - Công nghệ Web và dịch vụ trực tuyến</h2>
            <h2 className={footer.content}>Booking Web 27 là dự án mã nguồn mở cho website đặt phòng khách sạn trực tuyến</h2>
            <div className={footer.brandWrapper}>
                <img src={Logo} alt='' className={footer.logo}></img>
                <a className={footer.githubButton} href='https://github.com/ThanhLong0113/booking-web'>
                    <FaGithub size={28} color='black'/>
                    <h5 className={footer.githubText}>Github</h5>
                </a>
            </div>
            <p></p>
        </div>
    )
}

export default Footer