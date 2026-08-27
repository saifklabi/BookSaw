import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const PopularBook = () => {
  const [books, setBooks] = useState([])
  const [category, setCategory] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:3001/category')
        setCategory(response.data)
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }

    fetchBooks()
    fetchCategories()
  }, [])

  const handleBorrowBook = (book) => {
    toast.info(`${book.name} is ready to read`)
  }

  const handleReviewChange = (bookId, field, value) => {
    setReviews((prev) => ({
      ...prev,
      [bookId]: {
        ...(prev[bookId] || {}),
        [field]: value,
      },
    }))
  }

  const handleReviewSubmit = async (bookId) => {
    const draft = reviews[bookId] || {}
    const nextRating = Number(draft.rating ?? 0)
    const nextComment = draft.comment ?? ''

    try {
      await axios.patch(`http://localhost:3001/book/${bookId}`, {
        rating: nextRating,
        comment: nextComment,
      })

      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book.id === bookId
            ? {
                ...book,
                rating: nextRating || book.rating || 0,
                comment: nextComment || book.comment || '',
              }
            : book
        )
      )

      toast.success('Review saved successfully')
    } catch (error) {
      console.error('Error saving review:', error)
      toast.error('Error saving review')
    }
  }

  const tabs = [{ id: 'all', name: 'all genre' }, ...category]

  const displayedBooks =
    selectedCategory === 'all'
      ? books
      : books.filter(
          (book) => Number(book.category?.id ?? book.category) === Number(selectedCategory)
        )

  const renderBookCard = (book) => (
    <div className="col-md-3" key={book.id || book.name}>
      <div className="product-item">
        <figure className="product-style">
          <img
            src={book.image ? `http://localhost:3001/uploads/${book.image}` : '/images/book1.jpg'}
            alt={book.name}
            className="product-item"
          />
          <button
            type="button"
            className="add-to-cart"
            data-product-tile="add-to-cart"
            onClick={() => handleBorrowBook(book)}
          >
            Borrow this book
          </button>
        </figure>
        <figcaption>
          <h3>{book.name}</h3>
          <span>{book.author}</span>
          <div className="item-price">{book.category?.name || 'Autre'}</div>
          <div className="mt-2">
            <small>Rating: {Number(book.rating || 0)}/5</small>
          </div>
          {book.comment && <p className="mt-2 mb-0"><small>{book.comment}</small></p>}
        </figcaption>

        <div className="mt-3 px-2 pb-2">
          <div className="d-flex gap-1 mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="btn btn-link p-0"
                style={{ fontSize: '18px', color: Number(reviews[book.id]?.rating ?? book.rating ?? 0) >= star ? '#f4b400' : '#d1d5db' }}
                onClick={() => handleReviewChange(book.id, 'rating', star)}
              >
                ★
              </button>
            ))}
          </div>

          <textarea
            className="form-control mb-2"
            rows="2"
            placeholder="Write your review..."
            value={reviews[book.id]?.comment ?? book.comment ?? ''}
            onChange={(e) => handleReviewChange(book.id, 'comment', e.target.value)}
          />

          <button type="button" className="btn btn-sm btn-primary w-100" onClick={() => handleReviewSubmit(book.id)}>
            Save review
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div>
      <section id="popular-books" className="bookshelf py-5 my-5">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="section-header align-center">
                <div className="title">
                  <span>Some quality items</span>
                </div>
                <h2 className="section-title">Popular Books</h2>
              </div>

              <ul className="tabs">
                {tabs.map((item) => (
                  <li
                    key={item.id}
                    className={`tab ${selectedCategory === item.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(item.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {item.name}
                  </li>
                ))}
              </ul>

              <div className="tab-content">
                <div id="all-genre" data-tab-content className="active">
                  <div className="row">{displayedBooks.map(renderBookCard)}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default PopularBook