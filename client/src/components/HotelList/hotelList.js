import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LoadingClip from '../LoadingClip'
import { useNavigate } from 'react-router-dom'
import { useAllHotels } from '../../talons/useAllHotels'
import hotelList from './hotelList.module.css'

const HotelList = () => {
    const navigate = useNavigate()
    const getAllHotels = useAllHotels()
    const {
        isLoading,
        allHotels
    } = getAllHotels

    if(isLoading) return <LoadingClip/>

    return (
        <div>
            <Header/>
            <div className={hotelList.wrapper}>
                <h1>{`Danh sách khách sạn liên kết với chúng tôi (${allHotels.length})`}</h1>
                <div className={hotelList.listHotels}>
                    {allHotels.map((element, index) => {
                        return (
                            <div className={hotelList.listItem} key={index}>
                                <div className={hotelList.hotelImage}>
                                    <button className={hotelList.imageLink} onClick={() => navigate(`/hotel/${element._id}`, {
                                        state: element
                                    })}>
                                        <img src={element.image} alt=''></img>
                                    </button>
                                </div>
                                <div className={hotelList.details}>
                                    <h3>Tên khách sạn: <span>{element.name}</span></h3>
                                    <h3>Thành phố: <span>{element.city_name}</span></h3>
                                    <h3>Địa chỉ: <span>{element.address}</span></h3>
                                    <h3>Mô tả: <span>{element.description}</span></h3>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default HotelList