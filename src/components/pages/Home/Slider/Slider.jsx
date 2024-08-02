import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import './Slider.css';

const Slider = () => {
  const [slides, setSlides] = useState([]);

  const items = useRef([]);
  const thumbnails = useRef([]);
  const prevBtn = useRef(null);
  const nextBtn = useRef(null);
  const itemActive = useRef(0);
  const intervalId = useRef(null);

  const hardcodedSlide = {
    image: 'https://images.pexels.com/photos/2803160/pexels-photo-2803160.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    name: "It doesn't get easier you get better"
  };

  useEffect(() => {
    // Fetch data from API
    const fetchSlides = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_DJANGO_URL}/API/offers`)

        if (response.status === 200) {
            setSlides([hardcodedSlide, ...response.data.offers]) // Combine hardcoded slide with API response
        }
      } catch (error) {
        console.error('Error fetching slides:', error)
      }
    };

    fetchSlides()
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      showSlider()

      intervalId.current = setInterval(() => {
        nextBtn.current.click()
      }, 5000)

      return () => {
        clearInterval(intervalId.current)
      };
    }
  }, [slides])

  const showSlider = () => {
    const itemActiveOld = items.current.find(item => item.classList.contains('active'))
    const thumbnailActiveOld = thumbnails.current.find(thumbnail => thumbnail.classList.contains('active'))

    if (itemActiveOld) itemActiveOld.classList.remove('active')
    if (thumbnailActiveOld) thumbnailActiveOld.classList.remove('active')

    void items.current[itemActive.current]?.offsetHeight
    void thumbnails.current[itemActive.current]?.offsetHeight

    if (items.current[itemActive.current]) {
      items.current[itemActive.current].classList.add('active')
      thumbnails.current[itemActive.current].classList.add('active')
    }
  };

  const handlePrev = () => {
    itemActive.current = itemActive.current - 1
    if (itemActive.current < 0) {
      itemActive.current = items.current.length - 1
    }

    showSlider()

    // Set a new timeout to reset the interval after 3 seconds
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
        nextBtn.current.click()
    }, 5000);
  };

  const handleNext = ( e ) => {
    itemActive.current = itemActive.current + 1

    if (itemActive.current >= slides.length) {
        itemActive.current = 0
    }

    showSlider()

    // Set a new timeout to reset the interval after 3 seconds
    clearInterval(intervalId.current);
    intervalId.current = setInterval(() => {
        nextBtn.current.click()
    }, 5000);
  };

  const handleThumbnailClick = (index) => {
    itemActive.current = index;
    showSlider()
  };

  return (
    <section className='slider'>
      <div className='list'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`item ${index === 0 ? 'active' : ''}`}
            ref={(el) => (items.current[index] = el)}
          >
            <img src={slide.image} alt="" />
            <div className='content'>
              {slide.description ? <p>Offer</p> : <p>Home</p>}
              <h2>{slide.name}</h2>
              <p>{slide.description}</p>
              {slide.description ? <a className='item__link' href={`https://api.whatsapp.com/send?phone=91${import.meta.env.VITE_NUMBER}&text=I would like to know about the ${slide.name}`} target='_blank'>Enquire Now</a> : <Link className='item__link' to="/plans">View Plans</Link>}
            </div>
          </div>
        ))}
      </div>

      <div className='arrows'>
        <button id='prev' ref={prevBtn} onClick={handlePrev}><i><FaAngleLeft /></i></button>
        <button id='next' ref={nextBtn} onClick={handleNext}><i><FaAngleRight /></i></button>
      </div>

      <div className='thumbnail'>
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`item ${index === 0 ? 'active' : ''}`}
            ref={(el) => (thumbnails.current[index] = el)}
            onClick={() => handleThumbnailClick(index)}
          >
            <img src={slide.image} alt="" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Slider;