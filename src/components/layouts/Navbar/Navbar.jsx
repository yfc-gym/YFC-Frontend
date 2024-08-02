import React, { useRef } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useUser } from '../../../store/authContext'
import { useScroll } from '../../../store/scrollContext'

import './Navbar.css'

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()

  const { isLoggedIn, logOut } = useUser()
  const { triggerScroll } = useScroll()

  const navBtn = useRef(false)
  const navBar = useRef(false)

  const handleClick = () => {
    const visible = navBar.current.getAttribute('data-visible')

    if (visible === 'false') {
        navBtn.current.setAttribute('aria-expanded', 'true')
        navBar.current.setAttribute('data-visible', 'true')
    } else {
        navBtn.current.setAttribute('aria-expanded', 'false')
        navBar.current.setAttribute('data-visible', 'false')
    }
  }

  const handleContactClick = () => {
    if (location.pathname !== '/') {
      navigate('/')
      triggerScroll()
    } else {
      triggerScroll()
    }
  };

  return (
    <>
        <header className='primary-header flex'>
            <Link className='logo' to="/">YFC</Link>

            <button className='navBtn' aria-controls='primary-navigation' aria-expanded={navBtn.current} onClick={handleClick} ref={navBtn}>
                <span className='sr-only'>
                    Menu
                </span>
            </button>

            <nav>
                <ul className='primary-navigation flex' id='primary-navigation' data-visible={navBar.current} ref={navBar}>
                    <li>
                        <Link to="/plans">Plans</Link>
                    </li>
                    <li>
                        <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                        <button onClick={handleContactClick}>Contact</button>
                    </li>
                    <li>
                        {
                            isLoggedIn ? 
                            <>
                                <button onClick={logOut}>Logout</button>
                            </> : <Link to="/login">Login</Link>
                        }
                    </li>
                </ul>
            </nav>
        </header>
    </>
  )
}

export default Navbar