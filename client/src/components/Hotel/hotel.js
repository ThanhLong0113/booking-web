import React, { useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import LoadingClip from "../LoadingClip";
import { useLocation } from "react-router-dom";
import { useRoomsByHotel } from '../../talons/useRoomsByHotel'
import { LuBedSingle, LuBedDouble } from 'react-icons/lu'
import { BsCheckLg } from "react-icons/bs";
import { FaBaby } from "react-icons/fa";
import { BsPersonFill } from "react-icons/bs";
import { MdConstruction } from 'react-icons/md'
import CartModal from "../CartModal";
import AddCartMessage from "../AddCartMessage";
import hotel from './hotel.module.css'

const Hotel = () => {
    const location = useLocation();
    const hotelData = location.state;
    const [isOpen, setIsOpen] = useState(false)
    const [showModal, setShowModal] = useState(false)
    const [isOpenMsg, setIsOpenMsg] = useState(false)
    const [showModalMsg, setShowModalMsg] = useState(false)
    const [roomChoose, setRoomChoose] = useState()
    const [msgContent, setMsgContent] = useState()

    const getRoomsByHotel = useRoomsByHotel(hotelData._id)
    const {
        isLoading,
        roomsByHotel
    } = getRoomsByHotel

    const handleAddCart = (element) => {
        setRoomChoose(element)
        setShowModal(true)
        setIsOpen(true)
    }

    if (isLoading) return <LoadingClip />

    return (
        <div>
            <Header />
            <div className={hotel.wrapper}>
                <div className={hotel.imageWrapper}>
                    <img src={hotelData.image} alt='' className={hotel.image}></img>
                </div>
                <div className={hotel.details}>
                    <h1 className={hotel.name}>{hotelData.name}</h1>
                    <p className={hotel.address}>{hotelData.address}</p>
                    <p className={hotel.description}>{hotelData.description}</p>
                </div>
                <div className={hotel.roomWrapper}>
                    <h1 className={hotel.roomTitle}>{`Danh sách phòng tại khách sạn ${hotelData.name}`}</h1>
                    <div className={hotel.gridRoom}>
                        {roomsByHotel.map((element, index) => {
                            return (
                                <div key={index} className={hotel.gridItem}>
                                    <h3 className={hotel.roomName}>{element.name}</h3>
                                    <div className={hotel.roomDetails}>
                                        <div className={hotel.roomDescriptions}>
                                            <h5 className={hotel.roomBlockTitle}>Mô tả</h5>
                                            <img src={element.image} alt='' className={hotel.roomImage}></img>
                                            <p className={hotel.roomBedTitle}>Số lượng và loại giường</p>
                                            {element.beds.map((ele, idx) => {
                                                return (
                                                    <div className={hotel.roomBed} key={idx}>
                                                        {ele.bedType === 1 ? <LuBedSingle size={18} color='#767676' />
                                                            : <LuBedDouble size={18} color='#767676' />}
                                                        {ele.quantity > 1 ? <p className={hotel.bedTitle}>{`${ele.quantity} ${ele.bedName} beds`}</p>
                                                            : <p className={hotel.bedTitle}>{`${ele.quantity} ${ele.bedName} bed`}</p>}
                                                    </div>
                                                )
                                            })}
                                            <p className={hotel.roomFacilityTitle}>Cơ sở vật chất</p>
                                            {element.facilities.map((ele, idx) => {
                                                return (
                                                    <div className={hotel.roomFacility} key={idx}>
                                                        <MdConstruction size={18} color='#767676' />
                                                        <p className={hotel.facilityTitle}>{ele}</p>
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <div className={hotel.roomBenefits}>
                                            <h5 className={hotel.roomBlockTitle}>Lợi ích</h5>
                                            <div className={hotel.benefitsWrapper}>
                                                {element.benefits.map((ele, idx) => {
                                                    return (
                                                        <div className={hotel.roomBenefit} key={idx}>
                                                            <BsCheckLg size={18} color='green' />
                                                            <p className={hotel.benefitTitle}>{ele}</p>
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className={hotel.roomSleeps}>
                                            <h5 className={hotel.roomBlockTitle}>Số lượng người tối đa</h5>
                                            <div className={hotel.sleepsWrapper}>
                                                {Object.keys(element.sleeps).map((key) => {
                                                    return (
                                                        <div className={hotel.roomSleep} key={key}>
                                                            {key === 'adults' && <BsPersonFill size={18} color='#767676'/>}
                                                            {key === 'kids' && element[key] > 0 && <FaBaby size={18} color='#767676'/>}
                                                            {key === 'adults' && <p className={hotel.sleepTitle}>{`${element.sleeps[key]} người lớn`}</p>}
                                                            {key === 'kids' && element.sleeps[key] > 0 && <p className={hotel.sleepTitle}>{`${element.sleeps[key]} trẻ em`}</p>}
                                                        </div>
                                                    )
                                                })}
                                            </div>
                                        </div>
                                        <div className={hotel.roomPrices}>
                                            <h5 className={hotel.roomBlockTitle}>Giá phòng 1 đêm</h5>
                                            <div className={hotel.pricesWrapper}>
                                                <h3 className={hotel.totalPrice}>{`${element.price_per_night.toLocaleString()} VNĐ`}</h3>
                                                <button className={hotel.cartButton} onClick={() => handleAddCart(element)}>Add to Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
            <Footer/>
            {showModal && (<CartModal isOpen={isOpen} setIsOpen={setIsOpen} setShowModal={setShowModal} setMsgContent={setMsgContent}
                hotelData={hotelData} roomChoose={roomChoose} setIsOpenMsg={setIsOpenMsg} setShowModalMsg={setShowModalMsg}
            />)}
            {showModalMsg && (<AddCartMessage isOpenMsg={isOpenMsg} setIsOpenMsg={setIsOpenMsg} setShowModalMsg={setShowModalMsg}
                msgContent={msgContent}
            />)}
        </div>
    )
}

export default Hotel