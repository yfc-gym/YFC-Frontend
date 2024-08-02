import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

import { TiTick } from "react-icons/ti";
import toast, { Toaster } from 'react-hot-toast'
import './Plan.css'

function Plan() {
  const { name } = useParams()

  const [ plan, setPlan ] = useState({})

  const MESSAGE = `I would like to know about the plan ${plan.name}`

  useEffect(() => {
    const fetchPlan = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_DJANGO_URL}/API/plans/${name}`)

            if (response.status === 200) {
                setPlan(response.data.plan)
            }
        } catch (error) {
            
        }
    }

    fetchPlan()
  }, [])

  return (
    <>
        <Toaster />
        <section className='plan'>
            <img src={plan.image} alt="" />

            <div>
                <article>
                    <h2>{plan?.name}</h2>
                    <p className='plan__description'>{plan?.description}</p>

                    <div>
                        <p className='flex'><i><TiTick /></i>{plan.point1}</p>
                        <p className='flex'><i><TiTick /></i>{plan.point2}</p>
                        <p className='flex'><i><TiTick /></i>{plan.point3}</p>
                    </div>

                    <p className='plan__amount'><span>₹</span>{plan.amount}</p>

                    <a href={`https://api.whatsapp.com/send?phone=91${import.meta.env.VITE_NUMBER}&text=${MESSAGE}`} target='_blank'>Enquire Now</a>
                </article>
            </div>
        </section>
    </>
  )
}

export default Plan
