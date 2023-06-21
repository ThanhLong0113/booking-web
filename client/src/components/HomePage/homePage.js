import React, { useEffect } from "react";
import Header from '../Header'
import DestinationSlider from "../DestinationSlider/";
import axios from 'axios'

const HomePage = () => {
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
            console.log(res)
        })
    })

    return (
        <>
            <Header></Header>
            <h1>Hello</h1>
        </>
    )
}

export default HomePage