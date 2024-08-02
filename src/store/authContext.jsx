import React, { useState, useEffect, useContext, createContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserContext = createContext()

export const UserProvider = ({ children }) => {
    const navigate = useNavigate()

    const [ token, setToken ] = useState(localStorage.getItem('authToken'))
    const [ user, setUser ] = useState({})
    const [ isLoggedIn, setIsLoggedIn ] = useState(false)

    const storeTokenInLocalStorage = ( authToken ) => {
        return localStorage.setItem('authToken', authToken)
    }

    const decodeUser = async ( authToken ) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/verify`, {
                headers: {
                    'Auth-Token': `Bearer ${authToken}`
                }
            })

            if (response.status === 200) {
                setUser(response.data.user)
            }
        } catch (error) {
            navigate('/')   
        }
    }

    const logOut = () => {
        setToken('')
        setIsLoggedIn(false)
        setUser({})

        localStorage.removeItem('authToken')
    }

    useEffect(() => {        
        if (!!token) {
            decodeUser(token)
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <UserContext.Provider value={{ token, user, storeTokenInLocalStorage, isLoggedIn, setIsLoggedIn, decodeUser, logOut }}>
            { children }
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext)