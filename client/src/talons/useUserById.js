import axios from 'axios'
import { useState, useEffect } from 'react'

async function loadUserById(id) {
    try {
        const res = await axios.get(`http://localhost:5000/users/${id}`);
        return res
    } catch (err) {
        //setError(err.response.data.error)
    }
}

export const useUserById = (id) => {
    const [isLoading, setIsLoading] = useState(true)
    const [userById, setUserById] = useState()

    useEffect(() => {
        loadUserById(id).then(res => {
            setUserById(res.data.userById)
            setIsLoading(false)
        })
    }, [id, isLoading])

    return {
        isLoading,
        userById,
        setIsLoading
    }
}