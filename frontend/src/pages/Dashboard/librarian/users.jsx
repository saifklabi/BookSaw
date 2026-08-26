import axios from 'axios'
import React, { useEffect, useState } from 'react'

const Users = () => {
  const [users, setUsers] = useState([])
  const [openAddModal, setOpenAddModal] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const fetchUsers = async () => {
    try {
      const res = await axios.get('http://localhost:3001/user/findall')
      setUsers(res.data)
      console.log("userrrrr",res.data)
    } catch (err) {
      console.error('Failed to load users', err)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

  const handleAddUser = async (e) => {
    e.preventDefault()
    try {
      const payload = { username, email, password }
      await axios.post('http://localhost:3001/user', payload)
      setOpenAddModal(false)
      setUsername('')
      setEmail('')
      setPassword('')
      fetchUsers()
    } catch (err) {
      console.error('Error creating user', err)
      alert('Failed to create user')
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this user?')) return
    try {
      await axios.delete(`http://localhost:3001/user/${id}`)
      fetchUsers()
    } catch (err) {
      console.error('Error deleting user', err)
      alert('Failed to delete')
    }
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-0">Users</h3>
          <small className="text-muted">Manage application users</small>
        </div>
        <button className="btn btn-primary" onClick={() => setOpenAddModal(true)}>
          Add User
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-2">
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-light">
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.id}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td className="text-end">
                   
                      <button className="btn btn-sm btn-danger" onClick={() => handleDelete(u.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add user modal */}
      <div className="modal show" style={{ display: openAddModal ? 'block' : 'none', backgroundColor: 'rgba(0,0,0,0.4)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add User</h5>
              <button type="button" className="btn-close" onClick={() => setOpenAddModal(false)} />
            </div>
            <form onSubmit={handleAddUser}>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input value={username} onChange={(e) => setUsername(e.target.value)} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control" required />
                </div>
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" required />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setOpenAddModal(false)}>Cancel</button>
                <button type="submit" className="btn btn-primary">Create</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Users
