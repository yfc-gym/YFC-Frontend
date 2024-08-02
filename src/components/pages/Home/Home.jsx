import React, { useEffect, useRef } from 'react'
import { useScroll } from '../../../store/scrollContext'

import Slider from './Slider/Slider'
import PlansHome from './Plans-Home/Plans-Home'
import BMI from './BMI/BMI'
import BlogsHome from './Blogs-Home/Blogs-Home'
import Contact from './Contact/Contact'

const Home = () => {
  const contactRef = useRef(null)
  const { shouldScroll, resetScroll } = useScroll()

  useEffect(() => {
    if (shouldScroll) {
      setTimeout(() => {
        contactRef.current.scrollIntoView({ behavior: 'smooth' })
        resetScroll()
      }, 350) // Adding a slight delay to ensure the page has rendered
    }
  }, [shouldScroll, resetScroll])

  return (
    <>
        <Slider />
        <PlansHome />
        <BMI />
        <BlogsHome />
        <Contact ref={contactRef} />
    </>
  )
}

export default Home
