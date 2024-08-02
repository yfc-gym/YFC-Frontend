import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Blogs-Home.css'

const BlogsHome = () => {
    const [ blogs, setBlogs ] = useState([])

    useEffect(() => {
      const fetchBlogs = async () => {
        const response = await axios.get(`${import.meta.env.VITE_DJANGO_URL}/API/blogs`)
  
        if (response.status === 200) {
          const latestThreeBlogs = response.data.blogs.slice(-3)
  
          setBlogs(latestThreeBlogs)
        }
      }
  
      fetchBlogs()
    }, [])
  
    return (
      <>
          <section className='blogs-home'>
            <h3>Not all stories start with once upon a lifetime</h3>
  
            <div className='blogs-home__blogs'>
              {blogs.map((blog) => (
                <article className='blogs-home__blog' key={blog.id}>
                  <img src={blog.image} alt="" />
  
                  <div>
                    <Link className='blogs-home__title' to={`/blogs/${blog.title}`}>{blog.title}</Link>
                    <p>{blog.description}</p>
                  </div>
                </article>
              ))}
            </div>
  
            <Link className='blogs-home__btn' to='/blogs'>Read All</Link>
          </section>
      </>
    )
}

export default BlogsHome
