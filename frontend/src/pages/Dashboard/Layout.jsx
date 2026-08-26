import React from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { Outlet } from 'react-router-dom'
import './dashboard.css'

const Layout = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="d-flex">
        <Sidebar />

        <main className="dashboard-content flex-grow-1 p-4">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>

     
    </div>
  )
}

export default Layout