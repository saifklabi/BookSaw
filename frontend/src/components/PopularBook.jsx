import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const PopularBook = () => {
  const [books, setBooks] =useState([])
  const [category,setcategory]=useState([])
  const navigate = useNavigate()
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [currentBookId, setCurrentBookId] = useState(null)
  const [durationDays, setDurationDays] = useState(7)

   useEffect(()=>{
      const fetchBooks = async () => {
        try {
            const response=await axios.get ("http://localhost:3002/book")
            setBooks(response.data)
           
            console.log("books",response.data)
        } catch (error) { console.error("Error fetching books:", error)
            
        }
    }
    fetchBooks()
    const fetchCategories=async()=>{
         try {
            const response=await axios.get("http://localhost:3002/category")
            setcategory(response.data)
           console.log("retour de l'apiiiii",response.data)
            console.log("books",response.data)
        } catch (error) { console.error("Error fetching books:", error)
            
        } 
    }
    fetchCategories()
}
    ,[])

  const handleBorrow = (bookId) => {
    const user = localStorage.getItem('user')
    if (!user) {
      toast.error('Please login first')
      navigate('/login')
      return
    }
    setCurrentBookId(bookId)
    setDurationDays(7)
    setShowModal(true)
  }

  const [showDetailsModal, setShowDetailsModal] = useState(false)
  const [currentReviews, setCurrentReviews] = useState([])
  const [currentBookComment, setCurrentBookComment] = useState('')
  const [currentBookRating, setCurrentBookRating] = useState(null)

  const openBookDetails = async (bookId) => {
    try {
      const res = await axios.get(`http://localhost:3002/review/book/${bookId}`)
      const reviews = res.data || []
      if (reviews.length > 0) {
        setCurrentReviews(reviews)
        setCurrentBookComment('')
        setCurrentBookRating(null)
        setShowDetailsModal(true)
        return
      }
      // Fallback: if no reviews, try to read comment on the book entity
      try {
        const bookRes = await axios.get(`http://localhost:3002/book/${bookId}`)
        const book = bookRes.data
        setCurrentReviews([])
        setCurrentBookComment(book?.comment || '')
        setCurrentBookRating(book?.rating ?? null)
        setShowDetailsModal(true)
        return
      } catch (errBook) {
        console.error('Error fetching book for comments fallback', errBook)
      }
      setCurrentReviews([])
      setCurrentBookComment('')
      setCurrentBookRating(null)
      setShowDetailsModal(true)
    } catch (err) {
      console.error('Error fetching reviews', err)
      toast.error('Error loading reviews')
    }
  }

  const confirmBorrow = async () => {
    try {
      const user = JSON.parse(localStorage.getItem('user'))
      if (!user) {
        toast.error('Please login first')
        navigate('/login')
        return
      }
      await axios.post('http://localhost:3002/loan', {
        userId: user.id,
        bookId: currentBookId,
        durationDays: Number(durationDays),
      })
      toast.success('Book borrowed successfully!')
      setShowModal(false)
      navigate('/layout-client')
    } catch (error) {
      console.error('Error borrowing book:', error)
      // Fallback: older endpoint may be /user/:userId/borrow/:bookId
      if (error.response?.status === 404) {
        try {
          const user = JSON.parse(localStorage.getItem('user'))
          await axios.post(`http://localhost:3002/user/${user.id}/borrow/${currentBookId}`)
          toast.success('Book borrowed successfully (fallback)!')
          setShowModal(false)
          navigate('/layout-client')
          return
        } catch (err2) {
          console.error('Fallback borrow failed:', err2)
          const msg = err2.response?.data?.message || err2.message || 'Fallback borrow failed'
          toast.error(msg)
          setShowModal(false)
          return
        }
      }
      toast.error(error.response?.data?.message || 'Error borrowing book')
    }
  }

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
                <li
                  className={`tab ${selectedCategory === null ? 'active' : ''}`}
                  onClick={() => setSelectedCategory(null)}
                  style={{ cursor: 'pointer' }}
                >
                  All genres
                </li>
                {category.map((j) => (
                  <li
                    key={j.id}
                    className={`tab ${selectedCategory === j.id ? 'active' : ''}`}
                    onClick={() => setSelectedCategory(j.id)}
                    style={{ cursor: 'pointer' }}
                  >
                    {j.name}
                  </li>
                ))}
              </ul>
              <div className="tab-content">
                <div id="all-genre" data-tab-content className="active">
                  <div className="row">
                    {(
                      (selectedCategory ? books.filter((bb) => bb.category?.id === selectedCategory) : books)
                    ).map((b) => (
                      <div key={b.id} className="col-md-3">
                        <div className="product-item">
                          <figure className="product-style">
                            <img src={`http://localhost:3002/uploads/${b.image}` || '/images/book1.jpg'} alt="Books" className="product-item" />
                            <div style={{display:'flex',gap:8}}>
                              <button type="button" className="add-to-cart" onClick={() => handleBorrow(b.id)}>Borrow a book</button>
                              <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => openBookDetails(b.id)}>Comments</button>
                            </div>
                          </figure>
                          <figcaption>
                            <h3>{b.name}</h3>
                            <span>{b.author}</span>
                            <div className="item-price">rating</div>
                          </figcaption>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* other static tab content omitted for brevity because it's present above */}
              </div>
            </div>{/*inner-tabs*/}
          </div>
        </div>
      </section>

      {showModal && (
        <div className="modal-backdrop" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1050}}>
          <div className="modal-content p-4" style={{background:'#fff',borderRadius:8,width:320}}>
            <h5 className="mb-3">Borrow duration (days)</h5>
            <input type="number" min={1} value={durationDays} onChange={(e)=>setDurationDays(Number(e.target.value))} className="form-control mb-3" />
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary me-2" onClick={()=>setShowModal(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={confirmBorrow}>Confirm</button>
            </div>
          </div>
        </div>
      )}
      {showDetailsModal && (
        <div className="modal-backdrop" style={{position:'fixed',top:0,left:0,right:0,bottom:0,background:'rgba(0,0,0,0.5)',display:'flex',alignItems:'center',justifyContent:'center',zIndex:1050}}>
          <div className="modal-content p-4" style={{background:'#fff',borderRadius:8,width:520,maxHeight:'80vh',overflowY:'auto'}}>
            <h5 className="mb-3">Comments</h5>
            {currentReviews.length === 0 && !currentBookComment ? (
              <p className="text-muted">No comments yet.</p>
            ) : (
              <div>
                {currentBookComment && (
                  <div className="mb-3 border-bottom pb-2">
                    <div className="small text-muted">Book ·</div>
                    <div>Rating: {currentBookRating ?? '—'}</div>
                    <div className="mt-1">“{currentBookComment}”</div>
                  </div>
                )}
                {currentReviews.map((r) => (
                  <div key={r.id} className="mb-3 border-bottom pb-2">
                    <div className="small text-muted">{r.user?.email || r.user?.id} · {new Date(r.createdAt).toLocaleString()}</div>
                    <div>Rating: {r.rating ?? '—'}</div>
                    {r.comment && <div className="mt-1">“{r.comment}”</div>}
                  </div>
                ))}
              </div>
            )}
            <div className="d-flex justify-content-end">
              <button className="btn btn-secondary" onClick={()=>setShowDetailsModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PopularBook
