import axios from 'axios'
import { useState, useEffect } from 'react'

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

export const useHotelsByCity = (city_name) => {
    const [isLoading, setIsLoading] = useState(true)
    const [hotelsByCity, setHotelsByCity] = useState()

    useEffect(() => {
        loadHotelsByCity(city_name).then(res => {
            setHotelsByCity(res.data.hotelsByCity)
            setIsLoading(false)
        })
    }, [city_name])

    return {
        isLoading,
        hotelsByCity
    }
}