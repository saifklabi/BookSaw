import React from 'react'
import { Link } from 'react-router-dom'

const SidebarLibrarian = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-inner d-flex flex-column p-3 text-white">

        <nav className="nav flex-column mb-3">
       
          <Link to="/dashboard/librarian/books" className="nav-link d-flex align-items-center">
            <i className="icon icon-book me-2" />
            <span>Manage Books</span>
          </Link>
        
       
       
    
          <a href="#/dashboard/reports" className="nav-link d-flex align-items-center">
            <i className="icon icon-chart me-2" />
            <span>Reports</span>
          </a>
       
        </nav>

        <div className="mt-auto user-box">
          <div className="d-flex align-items-center">
            <img src="https://github.com/twbs.png" width="40" height="40" className="rounded-circle me-2" />
            <div>
              <div className="fw-bold">Librarian</div>
              <small className="text-white-50">bookify@library.local</small>
            </div>
          </div>
          <div className="mt-3">
            <a href="#/logout" className="btn btn-sm btn-outline-light w-100">Sign out</a>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default SidebarLibrarian
