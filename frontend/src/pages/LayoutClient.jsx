import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const LayoutClient = () => {
  const [books, setBooks] = useState([])
  const [reviews, setReviews] = useState({})

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3001/book')
        setBooks(response.data)
      } catch (error) {
        console.error('Error fetching books:', error)
      }
    }

    fetchBooks()
  }, [])

  const handleReviewChange = (bookId, field, value) => {
    setReviews((prev) => ({
      ...prev,
      [bookId]: {
        ...(prev[bookId] || {}),
        [field]: value,
      },
    }))
  }

  const handleSaveReview = async (bookId) => {
    const draft = reviews[bookId] || {}
    const rating = Number(draft.rating ?? 0)
    const comment = draft.comment ?? ''

    if (!rating && !comment) {
      toast.warning('Please add a rating or a comment before saving.')
      return
    }

    try {
      const response = await axios.patch(`http://localhost:3001/book/${bookId}`, {
        rating,
        comment,
      })

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId ? { ...book, ...response.data } : book
        )
      )

      toast.success('Review saved successfully')
    } catch (error) {
      console.error('Error saving review:', error)
      toast.error('Error saving review')
    }
  }

  return (
    <div className="container py-5">
      <div className="mb-4">
        <h2>Books available</h2>
        <p className="text-muted">Choose a book, rate it, and leave a comment.</p>
      </div>

      <div className="row g-4">
        {books.map((book) => (
          <div key={book.id} className="col-md-6 col-lg-4">
            <div className="card h-100 shadow-sm border-0">
              <img
                src={book.image ? `http://localhost:3001/uploads/${book.image}` : '/images/book1.jpg'}
                className="card-img-top"
                alt={book.name}
                style={{ height: '250px', objectFit: 'cover' }}
              />

              <div className="card-body">
                <div className="d-flex justify-content-between align-items-start">
                  <h5 className="card-title mb-1">{book.name}</h5>
                  <span className="badge bg-light text-dark">{book.category?.name || 'General'}</span>
                </div>

                <p className="text-muted mb-2">{book.author}</p>
                <p className="card-text small">{book.description}</p>

                <div className="mb-3">
                  <strong>Rating:</strong> {Number(book.rating || 0)}/5
                </div>

                {book.comment && (
                  <div className="alert alert-light py-2 px-3 small mb-3">
                    “{book.comment}”
                  </div>
                )}

                <div className="mb-2">
                  <label className="form-label small">Rating</label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.5"
                    className="form-control"
                    value={reviews[book.id]?.rating ?? book.rating ?? 0}
                    onChange={(e) => handleReviewChange(book.id, 'rating', e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label small">Comment</label>
                  <textarea
                    className="form-control"
                    rows="3"
                    placeholder="Write a comment..."
                    value={reviews[book.id]?.comment ?? book.comment ?? ''}
                    onChange={(e) => handleReviewChange(book.id, 'comment', e.target.value)}
                  />
                </div>

                <button className="btn btn-primary w-100" onClick={() => handleSaveReview(book.id)}>
                  Save review
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LayoutClient