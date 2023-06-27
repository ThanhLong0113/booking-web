import React from 'react'
import Header from '../Header'
import Footer from '../Footer'
import LoadingClip from '../LoadingClip'
import { useNavigate } from 'react-router-dom'
import { useAllDestinations } from '../../talons/useAllDestinations'
import destinationList from './destinationList.module.css'

const DestinationList = () => {
    const navigate = useNavigate()
    const getAllDestinations = useAllDestinations()
    const {
        isLoading,
        allDestinations
    } = getAllDestinations

    if(isLoading) return <LoadingClip/>

    return (
        <div>
            <Header/>
            <div className={destinationList.wrapper}>
                <h1>{`Các địa điểm du lịch nổi bật tại Việt Nam (${allDestinations.length})`}</h1>
                <div className={destinationList.listDestinations}>
                    {allDestinations.map((element, index) => {
                        return (
                            <div className={destinationList.listItem} key={index}>
                                <div className={destinationList.destinationImage}>
                                    <button className={destinationList.imageLink} onClick={() => navigate(`/destination/${element._id}`, {
                                        state: element
                                    })}>
                                        <img src={element.image} alt=''></img>
                                    </button>
                                </div>
                                <div className={destinationList.details}>
                                    <h3>Tên thành phố: <span>{element.name}</span></h3>
                                    {/*<h3>Thành phố: <span>{element.city_name}</span></h3>*/}
                                    {/*<h3>Địa chỉ: <span>{element.address}</span></h3>*/}
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

export default DestinationList