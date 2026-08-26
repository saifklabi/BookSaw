import React from 'react'
import Navbar from '../../../components/Navbar'
import Footer from '../../../components/Footer'
import SidebarLibrarian from '../../../components/SidebarLibrarian'
import { Outlet } from 'react-router-dom'
import '../dashboard.css'

const LayoutLibrarian = () => {
  return (
    <div className="dashboard-layout">
      <Navbar />

      <div className="d-flex">        
        <SidebarLibrarian />

        <main className="dashboard-content flex-grow-1 p-4">
          <div className="container-fluid">
            <Outlet />
          </div>
        </main>
      </div>

    
    </div>
  )
}

export default LayoutLibrarian