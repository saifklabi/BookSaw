import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'

const ListBooks = () => {
  const [loans, setLoans] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchLoans = async () => {
    setLoading(true)
    try {
      const res = await axios.get('http://localhost:3002/loan')
      setLoans(res.data)
    } catch (err) {
      console.error('Error fetching loans', err)
      toast.error('Error fetching loans')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchLoans()
  }, [])

  const updateStatus = async (loanId, status) => {
    try {
      await axios.patch(`http://localhost:3002/loan/${loanId}/status`, { status })
      toast.success(`Loan ${status}`)
      // refresh list
      fetchLoans()
    } catch (err) {
      console.error('Error updating status', err)
      toast.error(err.response?.data?.message || 'Error updating status')
    }
  }

  return (
    <div className="p-4">
      <h2>Loans (all users)</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
           
              <th>User</th>
              <th>Book</th>
              <th>Duration (days)</th>
              <th>Requested At</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
             
                <td>{loan.user?.email || loan.user?.name || loan.user?.id}</td>
                <td>{loan.book?.name || loan.book?.id}</td>
                <td>{loan.durationDays}</td>
                <td>{new Date(loan.createdAt).toLocaleString()}</td>
                <td>{loan.status}</td>
                <td>
                  {loan.status === 'pending' && (
                    <>
                      <button className="btn btn-sm btn-success me-2" onClick={() => updateStatus(loan.id, 'accepted')}>Accept</button>
                      <button className="btn btn-sm btn-danger" onClick={() => updateStatus(loan.id, 'rejected')}>Reject</button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default ListBooks