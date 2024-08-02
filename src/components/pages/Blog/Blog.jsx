import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useUser } from '../../../store/authContext'
import axios from 'axios'

import toast, { Toaster } from 'react-hot-toast'
import Navbar from '../../layouts/Navbar/Navbar'
import './Blog.css'

function Blog() {
  const { isLoggedIn, user } = useUser()
  const { name } = useParams()

  const [ blog, setBlog ] = useState({})
  const [ loading, setLoading ] = useState(false)
  const [ commentForm, setCommentForm ] = useState({
    'comment': ''
  })

  const formatDate = ( dateString ) => {
    const date = new Date(dateString)
    const options = { month: 'long', day: 'numeric' }

    return date.toLocaleDateString('en-US', options)
  }

  const formatCommentDate = ( dateString ) => {
    const date = new Date(dateString)
    const options = { year: 'numeric', month: 'long', day: 'numeric' }
  
    return date.toLocaleDateString('en-US', options)
  }

  const handleChange = (e) => {
    const { name, value } = e.target

    setCommentForm({
        [ name ]: value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
        const response = await axios.post(`${import.meta.env.VITE_DJANGO_URL}/API/addComment/${blog.id}`, {
            name: user.name,
            comment: commentForm.comment
        })

        if (response.status === 201) {
            toast.success(response.data.message)
            setCommentForm({
                'comment': ''
            })
        }
    } catch (error) {
        if (!isLoggedIn) {
            toast.error('Login Required')
        } else {
            toast.error('Something went wrong')
        }
    } finally {
        setLoading(false)
    }
  }

  useEffect(() => {
    const fetchBlog = async () => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_DJANGO_URL}/API/blogs/${name}`)

            if (response.status === 200) {
                setBlog(response.data.blog)
            }
        } catch (error) {
        }
    }

    fetchBlog()
  }, [blog])

  return (
    <>
        <Toaster />
        <section className='blog'>
            <img src={blog?.image} alt="" />

            <div>
                <article>
                    <h2>{blog?.title}</h2>
                    <p className='blog__date'>{formatDate(blog?.date)} | {blog?.category} | {blog?.comments?.length} Comments</p>
                    <p className='blog__description'>{blog?.description}</p>
                </article>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="comment">Submit A Comment</label>
                    <input type="text" name="comment" id="comment" placeholder={
                        !isLoggedIn ? 'Login Required' : 'Add Comment'
                    } onChange={handleChange} value={commentForm.comment} required />

                    <button disabled={loading}>
                        {
                            !isLoggedIn ? <Link to='/login'>Login</Link> : 'Submit'
                        }
                    </button>
                </form>
            </div>
        </section>
        <section className='comments'>
            <div>
                <p className='comments__count'>{blog?.comments?.length} Comments</p>

                {blog?.comments?.slice().reverse().map((comment) => (
                    <div key={comment.id}>
                        <p className='comments__date'><span>{comment.name}</span> on {formatCommentDate(comment.date)}</p>
                        <p>{comment.comment}</p>
                    </div>
                ))}
            </div>
        </section>
    </>
  )
}

export default Blog
