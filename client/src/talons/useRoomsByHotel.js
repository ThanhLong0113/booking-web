import axios from 'axios'
import { useState, useEffect } from 'react'

async function loadRoomsByHotel(id) {
    try {
        const res = await axios.get(`http://localhost:5000/rooms/${id}`);
        return res
    } catch (err) {
        //setError(err.response.data.error)
    }
}

export const useRoomsByHotel = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [roomsByHotel, setRoomsByHotel] = useState()

    useEffect(() => {
        loadRoomsByHotel(id).then(res => {
            setRoomsByHotel(res.data.roomsByHotel)
            setIsLoading(false)
        })
    }, [id])

    return {
        isLoading,
        roomsByHotel
    }
}