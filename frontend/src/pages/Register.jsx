import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { Navigate, useNavigate } from 'react-router-dom'
const Register = () => {
  const [username,setUserName]=useState("")
  const [email,setEmail]=useState("")
   const [password,setPassword]=useState("")
   //function
   const navigate=useNavigate()
   const handelregister= async(e) => {
    e.preventDefault() // prevent the default form submission behavior
    console.log("email you put ",email)
 console.log("password you put ",password)
 console.log("username you put ",username)
 //send to backend

 const response= await axios.post("http://localhost:3001/auth/register", {username,email,password})
    navigate("/login")
}
  return (
    <div className="register-page position-relative py-5">
      <Navbar />

      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="card auth-card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4 p-md-5">
                <h3 className="card-title text-center mb-3">Create your account</h3>
                <p className="text-center text-muted mb-4">
                  Start reading and managing your favorites in one place.
                </p>

                <form>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-semibold">
                      Username
                    </label>
                    <input
                    value={username}
                    onChange={(e)=>setUserName(e.target.value)}
                    
                      type="text"
                      className="form-control"
                      id="username"
                      placeholder="Enter username"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email address
                    </label>
                    <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                    />
                    <div className="form-text">We'll never share your email with anyone else.</div>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Password
                    </label>
                    <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                    />
                  </div>

                  <button onClick={handelregister} type="submit" className="btn btn-primary btn-lg w-100">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Register
