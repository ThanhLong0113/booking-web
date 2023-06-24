import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import { useLocation } from "react-router-dom";
import hotel from './hotel.module.css'

const Hotel = () => {
    const location = useLocation();
    const hotelData = location.state;

    return (
        <div>
            <Header/>
            <div className={hotel.wrapper}>
                <div className={hotel.imageWrapper}>
                    <img src={hotelData.image} alt='' className={hotel.image}></img>
                </div>
                <div className={hotel.details}>
                    <h1>{hotelData.name}</h1>
                    <p className={hotel.address}>{hotelData.address}</p>
                    <p className={hotel.description}>{hotelData.description}</p>
                </div>
                <div className={hotel.roomWrapper}>
                    <h1>{`Danh sách phòng trống tại khách sạn ${hotelData.name}`}</h1>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Hotel