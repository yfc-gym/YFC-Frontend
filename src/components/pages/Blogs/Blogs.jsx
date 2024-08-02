import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import './Blogs.css'

function Blogs() {
  const [ blogs, setBlogs ] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await axios.get(`${import.meta.env.VITE_DJANGO_URL}/API/blogs`)

      if (response.status === 200) {
        setBlogs(response.data.blogs.reverse())
      }
    }

    fetchBlogs()
  }, [])

  return (
    <>
        <section className='body'>
          <div className='body__blogs flex'>
            {blogs.map((blog) => (
              <article className='body__blog' key={blog.id}>
                <img src={blog.image} />

                <div>
                  <Link to={`/blogs/${blog.title}`}>{blog.title}</Link>
                  <p>{blog.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
    </>
  )
}

export default Blogs