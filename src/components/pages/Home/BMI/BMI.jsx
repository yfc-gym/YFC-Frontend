import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast'

import BMIImg from '../../../../assets/images/bmi.jpg'
import './BMI.css'

const BMI = () => {
    const [ BMIForm, setBMIForm ] = useState({
        weight: '',
        height: '',
        age: ''
      })
    
      const handleChange = (e) => {
        const { name, value } = e.target
        
        setBMIForm({
            ...BMIForm,
            [ name ]: value
        })
      }
    
      const handleSubmit = (e) => {
        e.preventDefault()
    
        if (parseInt(BMIForm.height) > 0 && parseInt(BMIForm.weight) > 0) {
            const heightInMeters = parseInt(BMIForm.height) / 100
            const calculatedBmi = parseInt(BMIForm.weight) / (heightInMeters * heightInMeters)
    
            toast.success(`Your BMI Is ${calculatedBmi.toFixed(2)}`)
            setBMIForm({
                'weight': '',
                'height': '',
                'age': ''
            })
          } else {
            toast.error('Please Enter Correct Information')
            setBMIForm({
                'weight': '',
                'height': '',
                'age': ''
            })
          }
      }
    
      return (
        <>
            <Toaster />
            <section className='BMI'>
                <div className='BMI__grid-left'>
                    <img src={BMIImg} alt="" />
                </div>
    
                <div className='BMI__grid-right'>
                    <h3>Discover your health status</h3>
                    <p>Calculate Your BMI</p>
    
                    <form onSubmit={handleSubmit}> 
    
                        <div>
                            <label htmlFor="weight">Weight</label>
                            <input type="text" name="weight" id="weight" placeholder='Weight (kgs)' onChange={handleChange} value={BMIForm.weight} required />
                        </div>
    
                        <div>
                            <label htmlFor="height">Height</label>
                            <input type="text" name="height" id="height" placeholder='Height (cms)' onChange={handleChange} value={BMIForm.height} required />
                        </div>
    
                        <div>
                            <label htmlFor="age">Age</label>
                            <input type="text" name="age" id="age" placeholder='Age' onChange={handleChange} value={BMIForm.age} required />
                        </div>
    
                        <button className='BMI__btn'>Calculate</button>
                    </form>
                </div>
            </section>
        </>
      )
}

export default BMI
