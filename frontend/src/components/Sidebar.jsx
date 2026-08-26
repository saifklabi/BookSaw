import React from 'react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner d-flex flex-column p-3 text-white">
        <div className="brand mb-4 d-flex align-items-center">
          <img src="/images/main-logo.png" alt="logo" className="me-2" style={{ width: 36 }} />
         
        </div>

        <nav className="nav flex-column mb-3">
          <a href="#" className="nav-link d-flex align-items-center">
            <i className="icon icon-dashboard me-2" />
            <span>Dashboard</span>
          </a>
          <Link to="/dashboard/category" className="nav-link d-flex align-items-center">
            <i className="icon icon-folder-open me-2" />
            <span>Category</span>
          </Link>
          <a href="#" className="nav-link d-flex align-items-center">
            <i className="icon icon-users me-2" />
            <span>Users</span>
          </a>
        </nav>

        <div className="mt-auto user-box">
          <div className="d-flex align-items-center">
            <img src="https://github.com/twbs.png" width="40" height="40" className="rounded-circle me-2" />
            <div>
              <div className="fw-bold">John Doe</div>
              <small className="text-white-50">Admin</small>
            </div>
          </div>
          <div className="mt-3">
            <a href="#" className="btn btn-sm btn-outline-light w-100">Sign out</a>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
