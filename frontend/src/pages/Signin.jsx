import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  const [email,setemail]=useState("")
  const [password,setpassword]=useState("")
  const navigate=useNavigate()


const handelsignin = async (e) => { 
  e.preventDefault() 
  try { 
    const response = await axios.post( "http://localhost:3001/auth/login", { email, password } ) 
  // Récupérer l'utilisateur retourné par le backend 
  const user = response.data.user 
  // Sauvegarder l'utilisateur dans localStorage 
  localStorage.setItem("user", JSON.stringify(user)) 
  // Navigation selon le role 
  if (user.role === "admin") { navigate("/dashboard/category") } 
  else if (user.role === "librarian") { navigate("/layoutlibrarian/gestionbook") } 
  else if (user.role === "client") { navigate("/") } 
} catch (error) { 
  console.log(error) 
  alert( error.response?.data?.message || "Email ou mot de passe incorrect" ) } }

  return (
    
    <div>
        
        <Navbar/>
        <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-sm-10 col-md-8 col-lg-6">
            <div className="card auth-card shadow-lg border-0 rounded-4 overflow-hidden">
              <div className="card-body p-4 p-md-5">
                <h3 className="card-title text-center mb-3">Sign in to your account</h3>
                <p className="text-center text-muted mb-4">
                  Start reading and managing your favorites in one place.
                </p>
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-semibold">
                      Email address
                    </label>
                    <input
                    value={email}
                    onChange={(e)=>setemail(e.target.value)}

                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter email"
                    />
                  </div>

                  <div className="mb-4">
                    <label htmlFor="password" className="form-label fw-semibold">
                      Password
                    </label>
                    <input
                    value={password}
                    onChange={(e)=>setpassword(e.target.value)}

                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter password"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary btn-lg w-100" onClick={handelsignin}>
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer/>
    </div>
  )
}

export default Signin