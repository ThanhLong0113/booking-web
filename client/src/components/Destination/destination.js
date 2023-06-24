import React from "react";
import Header from "../Header"
import Footer from "../Footer";
import destination from './destination.module.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { useHotelsByCity } from '../../talons/useHotelsByCity'
import LoadingClip from "../LoadingClip";

const Destination = () => {
    const location = useLocation();
    const destinationData = location.state;
    const navigate = useNavigate()

    const getHotelsByCity = useHotelsByCity(destinationData.name)
    const {
        isLoading,
        hotelsByCity
    } = getHotelsByCity

    if (isLoading) return <LoadingClip />

    return (
        <div>
            <Header />
            <div className={destination.destinationWrapper}>
                <img src={destinationData.image} alt='' className={destination.image}></img>
                <div className={destination.info}>
                    <h1 className={destination.name}>{destinationData.name}</h1>
                    <h2 className={destination.hotelsQuantity}>{`${hotelsByCity.length} khách sạn hiện có thể đặt phòng`}</h2>
                    <p className={destination.description}>{destinationData.description}</p>
                </div>
            </div>
            <div className={destination.hotelsWrapper}>
                <h1>{`Khách sạn tại ${destinationData.name}`}</h1>
                <div className={destination.gridHotels}>
                    {hotelsByCity.map((element, index) => {
                        return (
                            <div className={destination.gridItem} key={index}>
                                <div>
                                    <button onClick={() => navigate(`/hotel/${element._id}`, {
                                        state: element
                                    })} className={destination.imageButton}>
                                        <img src={element.image} alt='' className={destination.gridImage}></img>
                                    </button>
                                </div>
                                <div className={destination.gridDetails}>
                                    <div className={destination.detailsWrapper}>
                                        <button onClick={() => navigate(`/hotel/${element._id}`, {
                                            state: element
                                        })} className={destination.gridName}>
                                            {element.name}
                                        </button>
                                        <p className={destination.gridAddress}>{element.address}</p>
                                        <p className={destination.gridDescription}>{element.description}</p>
                                    </div>
                                    <button onClick={() => navigate(`/hotel/${element._id}`, {
                                        state: element
                                    })} className={destination.gridButton}>
                                        Kiểm tra phòng trống
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Destination