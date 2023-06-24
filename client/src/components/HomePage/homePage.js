import React from "react";
import Header from '../Header'
import Footer from "../Footer";
import DestinationSlider from "../DestinationSlider/";
import HotelTab from "../HotelTab/hotelTab";
import LoadingClip from "../LoadingClip"
import { useAllDestinations } from "../../talons/useAllDestinations";

const HomePage = () => {
    const getAllDestinations = useAllDestinations()
    const {
        isLoading: isLoadingAllDestinations,
        allDestinations
    } = getAllDestinations

    if(isLoadingAllDestinations) return <LoadingClip/>

    return (
        <div>
            <Header/>
            <DestinationSlider allDestinations={allDestinations}/>
            <HotelTab allDestinations={allDestinations}/>
            <Footer/>
        </div>
    )
}

export default HomePage