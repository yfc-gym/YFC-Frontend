import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../../../store/authContext'
import axios from 'axios'

import toast, { Toaster } from 'react-hot-toast'
import './Login.css'

function Login() {
  const navigate = useNavigate()
  const { storeTokenInLocalStorage, setIsLoggedIn, decodeUser } = useUser()

  const [ loginForm, setLoginForm ] = useState({
    email: '',
    password: ''
  })
  const [ loading, setLoading ] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setLoginForm({
        ...loginForm,
        [ name ]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
            email: loginForm.email,
            password: loginForm.password
        })
    
        if (response.status === 200) {
            const authToken = response.data.token
            storeTokenInLocalStorage(authToken)

            decodeUser(authToken)
            setIsLoggedIn(true)

            navigate('/')

            setTimeout(() => {
                toast.success(response.data.message)
            }, 500)
        }   
    } catch (error) {
        toast.error(error.response.data.message)
    } finally {
        setLoading(false)
    }
  }

  return (
    <> 
        <div><Toaster /></div>
        <section className='login'>
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} value={loginForm.email} placeholder='name@example.com' required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} value={loginForm.password} required />

                <Link className='login__link' to='/register'>Not a member ?</Link>

                <button className='login__btn' disabled={loading}>
                    { loading ? 'Logging' : 'Submit' }
                </button>
            </form>
        </section>
    </>
  )
}

export default Login
