import axios from 'axios'
import { useState, useEffect } from 'react'

async function loadAllDestinations() {
    try {
        const res = await axios.get('http://localhost:5000/destinations');
        return res
    } catch (err) {
        //setError(err.response.data.error)
    }
}

export const useAllDestinations = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [allDestinations, setAllDestinations] = useState()

    useEffect(() => {
        loadAllDestinations().then(res => {
            setAllDestinations(res.data.allDestinations)
            setIsLoading(false)
        })
    }, [])

    return {
        isLoading,
        allDestinations
    }
}