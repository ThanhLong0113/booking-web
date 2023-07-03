import axios from 'axios'
import { useState, useEffect } from 'react'

async function loadCartById(cart_id) {
    try {
        const res = await axios.get(`http://localhost:5000/carts/${cart_id}`);
        return res
    } catch (err) {
        //setError(err.response.data.error)
    }
}

export const useCartById = (cart_id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [cartById, setCartById] = useState()

    useEffect(() => {
        loadCartById(cart_id).then(res => {
            setCartById(res.data.cartById)
            setIsLoading(false)
        })
    }, [cart_id, isLoading])

    return {
        isLoading,
        cartById,
        setIsLoading
    }
}