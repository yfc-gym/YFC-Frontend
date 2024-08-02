import React from "react"
import { Routes, Route } from "react-router-dom"

import Navbar from "./components/layouts/Navbar/Navbar"
import Home from "./components/pages/Home/Home"
import Plans from "./components/pages/Plans/Plans"
import Plan from "./components/pages/Plan/Plan"
import Register from "./components/pages/Register/Register"
import Login from "./components/pages/Login/Login"
import Blogs from "./components/pages/Blogs/Blogs"
import Blog from "./components/pages/Blog/Blog"

function App() {
  return (
    <>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/plans" element={<Plans />} />
          <Route path="/plans/:name" element={<Plan />} />

          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:name" element={<Blog />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
    </>
  )
}

export default App
