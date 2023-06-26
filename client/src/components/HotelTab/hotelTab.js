import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'
import hotelTab from './hotelTab.module.css'
import axios from "axios";
import { SyncLoader } from "react-spinners";

const HotelTab = ({ allDestinations }) => {
    const [tabFocus, setTabFocus] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const [hotelsByCity, setHotelsByCity] = useState([])
    const navigate = useNavigate()

    async function loadHotelsByCity(city_name) {
        try {
            const res = await axios.get('http://localhost:5000/hotels', {
                params: {
                    city_name: city_name
                }
            });
            return res
        } catch (err) {
            //setError(err.response.data.error)
        }
    }

    useEffect(() => {
        loadHotelsByCity(allDestinations[0].name).then(response => {
            setHotelsByCity(response.data.hotelsByCity)
            setIsLoading(false)
        }).catch(error => console.log(error))
    }, [allDestinations])

    const handleTabSelect = (index, city_name) => {
        setTabFocus(index)
        setIsLoading(true)

        loadHotelsByCity(city_name).then(response => {
            setHotelsByCity(response.data.hotelsByCity)
            setIsLoading(false)
        }).catch(error => console.log(error))
    }

    return (
        <div className={hotelTab.wrapper}>
            <h1 className={hotelTab.title}>Những khách sạn nổi bật đề xuất cho bạn</h1>
            <div className={hotelTab.tabBar}>
                {allDestinations.slice(0, 5).map((element, index) => {
                    return (
                        <button className={tabFocus === index ? hotelTab.tabButtonFocus : hotelTab.tabButton}
                            onClick={() => handleTabSelect(index, element.name)} key={index}>{element.name}</button>
                    )
                })}
            </div>
            <div className={isLoading ? hotelTab.loadingHotels : hotelTab.gridHotels}>
                {isLoading ? (<SyncLoader size={12} color='#006ce4' speedMultiplier={1.5} />) :
                    (hotelsByCity.map((element, index) => {
                        return (
                            <div className={hotelTab.gridItem} key={index}>
                                <button className={hotelTab.imageButton} onClick={() => navigate(`hotel/${element._id}`, {
                                    state: element
                                })}>
                                    <img src={element.image} alt='' className={hotelTab.gridImage}></img>
                                </button>
                                <button className={hotelTab.nameButton} onClick={() => navigate(`hotel/${element._id}`, {
                                    state: element
                                })}>
                                    <h1 className={hotelTab.gridName}>{element.name}</h1>
                                </button>
                                <p className={hotelTab.gridAddress}>{element.address}</p>
                            </div>
                        )
                    }))}
            </div>
        </div>
    )
}

export default HotelTab