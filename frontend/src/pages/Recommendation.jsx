import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const Recommendation = () => {
  const [books, setBooks] = useState([])
  const [selectedIds, setSelectedIds] = useState([])
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3002/book')
        setBooks(response.data)
      } catch (error) {
        console.error('Error fetching books:', error)
        toast.error('Impossible de charger le catalogue de livres.')
      }
    }
    fetchBooks()
  }, [])

  const toggleBook = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id],
    )
  }

  const handleRecommend = async () => {
    if (selectedIds.length === 0) {
      toast.warning('Coche au moins un livre que tu as déjà lu.')
      return
    }

    setLoading(true)
    setResult(null)
    try {
      const response = await axios.post('http://localhost:3002/recommendation', {
        bookIds: selectedIds,
      })
      setResult(response.data.recommendation)
    } catch (error) {
      console.error('Error fetching recommendation:', error)
      const message =
        error?.response?.data?.message || "Impossible d'obtenir une recommandation pour le moment."
      toast.error(Array.isArray(message) ? message.join(' ') : message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Navbar />
      <div className="container py-5">
        <div className="section-header align-center mb-4">
          <h2 className="section-title">📚 Recommandation de livres par IA</h2>
          <p className="text-muted">
            Coche les livres que tu as déjà lus, on devine tes goûts et on te propose la suite.
          </p>
        </div>

        <div className="row">
          {books.map((book) => (
            <div className="col-md-4 mb-3" key={book.id}>
              <div className="form-check border rounded p-3 h-100">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`book-${book.id}`}
                  checked={selectedIds.includes(book.id)}
                  onChange={() => toggleBook(book.id)}
                />
                <label className="form-check-label" htmlFor={`book-${book.id}`}>
                  <strong>{book.name}</strong>
                  <br />
                  <span className="text-muted">{book.author}</span>
                  {book.category && (
                    <>
                      <br />
                      <span className="badge bg-secondary mt-1">{book.category.name}</span>
                    </>
                  )}
                </label>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center my-4">
          <button
            type="button"
            className="btn btn-primary btn-lg"
            onClick={handleRecommend}
            disabled={loading}
          >
            {loading ? 'Le modèle réfléchit...' : '🔍 Recommander des livres'}
          </button>
        </div>

        {result && (
          <div className="card shadow-sm border-0 rounded-4 mt-4">
            <div className="card-body p-4">
              <h4 className="card-title mb-3">📖 Recommandations</h4>
              <div style={{ whiteSpace: 'pre-wrap' }}>{result}</div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  )
}

export default Recommendation
