import React, { useState, forwardRef } from 'react'
import axios from 'axios'

import contactImg from '../../../../assets/images/contact.png'
import toast, { Toaster } from 'react-hot-toast'
import './Contact.css'

const Contact = forwardRef((props, ref) => {
    const [contactForm, setContactForm] = useState({
      name: '',
      email: '',
      message: ''
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
  
      setContactForm({
        ...contactForm,
        [name]: value
      });
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/contact`, {
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message
        });
  
        if (response.status === 201) {
          toast.success(response.data.message);
  
          setContactForm({
            name: '',
            email: '',
            message: ''
          });
        }
      } catch (error) {
        toast.error('Please try again later');
      }
    };
  
    return (
      <>
        <Toaster />
        <section className='contact' ref={ref}>
          <div>
            <div>
              <h3>Get in Touch</h3>
              <p>Got Questions? Just Contact Me Below</p>
            </div>
  
            <form onSubmit={handleSubmit} className='flex'>
              <label htmlFor="name">Name</label>
              <input type="text" name="name" id="name" value={contactForm.name} onChange={handleChange} />
  
              <label htmlFor="email">Email</label>
              <input type="text" name='email' id='email' value={contactForm.email} onChange={handleChange} />
  
              <label htmlFor="message">Message</label>
              <textarea name="message" id="message" rows="8" value={contactForm.message} onChange={handleChange}></textarea>
  
              <button className='contact__btn'>Submit</button>
            </form>
          </div>
  
          <img src={contactImg} alt="" />
        </section>
      </>
    );
  });

export default Contact