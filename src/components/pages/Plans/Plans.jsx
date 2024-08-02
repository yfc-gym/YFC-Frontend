import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import headerPlansImg from '../../../assets/images/plans.jpg'
import { TiTick } from "react-icons/ti";
import { IoArrowDownSharp } from "react-icons/io5";
import './Plans.css'

function Plans() {
  const [ plans, setPlans ] = useState([])

  useEffect(() => {
    const fetchPlans = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_DJANGO_URL}/API/plans`)

            if (response.status === 200) {
                setPlans(response.data.plans)
            }
        } catch (error) {
            console.log(error)
        }
    }

    fetchPlans()
  }, [])

  return (
    <>
        <section className='headerPlans'>
            <div>
                <img src={headerPlansImg} alt="" />
                <i className='arrow'><IoArrowDownSharp /></i>
            </div>

            <div className='headerPlans__grid-right'>
                <h2>
                    <span>Take.</span>
                    <span>Control.</span>
                    <span>Now.</span>
                </h2>
                <p>Help Us. Help You.</p>
            </div>
        </section>

        <section className='main'>
            {plans.map((plan) => (
                <div className='main__plans flex' key={plan.id}>
                    <img src={plan.image} />

                    <div className='main__plan'>
                        <h4>{plan.name}</h4>

                        <p><i><TiTick /></i>{plan.point1}</p>
                        <p><i><TiTick /></i>{plan.point2}</p>
                        <p><i><TiTick /></i>{plan.point3}</p>

                        <p className='amount'><span>₹</span>{plan.amount}</p>

                        <Link to={`/plans/${plan.name}`}>Details</Link>
                    </div>
                </div>
            ))}
        </section>
    </>
  )
}

export default Plans