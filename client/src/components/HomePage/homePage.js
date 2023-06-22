import React, { useState, useEffect } from "react";
import Header from '../Header'
import DestinationSlider from "../DestinationSlider/";
import axios from 'axios'

const HomePage = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [allDestinations, setAllDestinations] = useState()
    async function loadAllDestinations() {
        try {
            const res = await axios.get('http://localhost:5000/destinations');
            return res
        } catch (err) {
            //setError(err.response.data.error)
        }
    }

    useEffect(() => {
        loadAllDestinations().then(res => {
            setAllDestinations(res.data.allDestinations)
            setIsLoading(false)
        })
    }, [])

    if(isLoading) return <></>

    return (
        <>
            <Header></Header>
            <DestinationSlider allDestinations={allDestinations}/>
        </>
    )
}

export default HomePage