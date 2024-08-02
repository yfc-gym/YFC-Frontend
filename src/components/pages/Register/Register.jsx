import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import toast, { Toaster } from 'react-hot-toast'
import './Register.css'

function Register() {
  const navigate = useNavigate()

  const [ registerForm, setRegisterForm ] = useState({
    name: '',
    email: '',
    password: ''
  })
  const [ loading, setLoading ] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setRegisterForm({
        ...registerForm,
        [ name ]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
            name: registerForm.name,
            email: registerForm.email,
            password: registerForm.password
        })

        if (response.status === 201) {
            const response = await axios.post(`${import.meta.env.VITE_DJANGO_URL}/API/register/`, {
                name: registerForm.name,
                email: registerForm.email
            })

            if (response.status === 201) {
                navigate('/login')
                
                setTimeout(() => {
                    toast.success(response.data.message)
                }, 500)
            }
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
        <section className='register'>
            <h2>Register</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" onChange={handleChange} value={registerForm.name} required />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" onChange={handleChange} value={registerForm.email} placeholder='name@example.com' required />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" onChange={handleChange} value={registerForm.password} required />

                <Link className='register__link' to='/login'>Already a member ?</Link>

                <button className='register__btn' disabled={loading}>
                    { loading ? 'Creating' : 'Submit' }
                </button>
            </form>
        </section>
    </>
  )
}

export default Register
