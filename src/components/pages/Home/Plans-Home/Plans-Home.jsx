import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import './Plans-Home.css'

const PlansHome = () => {
  const [plans, setPlans] = useState([])

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_DJANGO_URL}/API/plans`)

        if (response.status === 200) {
          const latestThreePlans = response.data.plans.slice(-3)

          setPlans(latestThreePlans)
        }
      } catch (error) {
        console.error(error)
      }
    };

    fetchPlans()
  }, []);

  return (
    <>
      <section className="plans-home">
        <h3>
          Your health is just a few steps away
        </h3>

        <div className="plans-home__plans flex">
          {plans.map((plan) => (
            <div className="plans-home__plan" key={plan.id}>
              <img src={plan.image} />
              <div className="content">
                <h4>{plan.name}</h4>
                <p>{plan.description}</p>
                <Link to={`/plans/${plan.name}`}>Details</Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default PlansHome;
