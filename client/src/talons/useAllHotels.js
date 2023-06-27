import axios from 'axios'
import { useState, useEffect } from 'react'

async function loadAllHotels() {
    try {
        const res = await axios.get('http://localhost:5000/hotels/list');
        return res
    } catch (err) {
        //setError(err.response.data.error)
    }
}

export const useAllHotels = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [allHotels, setAllHotels] = useState()

    useEffect(() => {
        loadAllHotels().then(res => {
            setAllHotels(res.data.listHotels)
            setIsLoading(false)
        })
    }, [])

    return {
        isLoading,
        allHotels
    }
}