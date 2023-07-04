import axios from 'axios'
import { useState, useEffect } from 'react'

async function loadBookingsByCustomer(id) {
    try {
        const res = await axios.get(`http://localhost:5000/bookings/${id}`);
        return res
    } catch (err) {
        //setError(err.response.data.error)
    }
}

export const useBookingsByCustomer = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [bookingsByCustomer, setBookingsByCustomer] = useState()

    useEffect(() => {
        loadBookingsByCustomer(id).then(res => {
            setBookingsByCustomer(res.data.bookingsByCustomer)
            setIsLoading(false)
        })
    }, [id, isLoading])

    return {
        isLoading,
        bookingsByCustomer,
        setIsLoading
    }
}