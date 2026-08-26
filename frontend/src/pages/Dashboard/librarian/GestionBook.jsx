import axios, { Axios } from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'


const GestionBook = () => {
const [openAddModal, setOpenAddModal] = useState(false  )
const [books, setBooks] = React.useState([])
const [name,setname]=useState("")
const [author,setauthor]=useState("")
const [description,setdescription]=useState("")
const [category,setcategory]=useState([])
const [selectedCategory, setSelectedCategory] = useState("")
const [image,setimage]=useState("")
const [deltebookModal,setdeleteModal] =useState(false)
const[bookIdToDelete,setBookIdToDelete]=useState(null)

const handleopenDeleteModal = (categoryId) => {
  setdeleteModal(true);
  setBookIdToDelete(categoryId); // Store the categoryId to be deleted
  // You can store the categoryId in state if you need to use it for deletion
}
const handleDeletebook=async()=>{
    try {
        const response= await axios.delete(`http://localhost:3001/book/${bookIdToDelete}`) 
        toast.success("has been delete")
        setdeleteModal(false)
         setBooks(books.filter((book) => book.id !== bookIdToDelete)); 
    } catch (error) {
        
    }
}
 useEffect(()=>{
      const fetchBooks = async () => {
        try {
            const response=await axios.get ("http://localhost:3001/book")
            setBooks(response.data)
           
            console.log("books",response.data)
        } catch (error) { console.error("Error fetching books:", error)
            
        }
    }
    fetchBooks()
    const fetchCategories=async()=>{
         try {
            const response=await axios.get("http://localhost:3001/category")
            setcategory(response.data)
           console.log("retour de l'apiiiii",response.data)
            console.log("books",response.data)
        } catch (error) { console.error("Error fetching books:", error)
            
        } 
    }
    fetchCategories()
}
    ,[])
const handelAddbook= async (e) => {
        try {
              e.preventDefault() // prevent the default form submission behavior
        //send to backend
        const formdata=new FormData()
        formdata.append("name",name)
        formdata.append("author",author)
        formdata.append("description",description)
        formdata.append("image",image)
        formdata.append("category",selectedCategory)
const response=await axios.post("http://localhost:3001/book", formdata)
             toast.success("Category added successfully!")
             setOpenAddModal(false)
             setBooks([...books, response.data]) // Update the categories state with the new category
        } catch (error) {
            console.error("Error adding category:", error)
            toast.error("Error adding category!")
        }

    }
    


  return (
    <div>
       <div className="container">
        <h1>Gestion des livres</h1>
        <div className="d-flex justify-content-between align-items-center mb-4">
        <p>Bienvenue dans la section de gestion des livres. Ici, vous pouvez ajouter, modifier et supprimer des livres de la bibliothèque.</p>
        <button className="btn btn-primary mb-3"  onClick={() => setOpenAddModal(true)} >Ajouter un livre</button>
        </div>
     </div>
     <table className="table table-striped align-middle">
        <thead>
          <tr>
            <th scope="col" style={{ width: '26%' }}>Livre</th>
            <th scope="col" style={{ width: '18%' }}>Auteur</th>
            <th scope="col" style={{ width: '28%' }}>Description</th>
            <th scope="col" style={{ width: '18%' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
         {books.map((book) => (
             <tr key={book.id || book.name}>
                <td>
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={`http://localhost:3001/uploads/${book.image}` || '/images/book1.jpg'}
                      alt={book.name}
                      style={{
                        width: 52,
                        height: 70,
                        objectFit: 'cover',
                        borderRadius: 8,
                        border: '2px solid #dfe3e8',
                        padding: 2,
                        background: '#fff'
                      }}
                    />
                    <span className="fw-semibold">{book.name}</span>
                  </div>
                </td>
                <td>{book.author}</td>
                <td>
                  <div style={{ maxWidth: '220px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {book.description}
                  </div>
                </td>
                <td>
                    <button className="btn btn-primary btn-sm me-2">Modifier</button>
                    <button className="btn btn-danger btn-sm"onClick={()=>handleopenDeleteModal(book.id)}>Supprimer</button>
                </td>
            </tr>
         ))}
        </tbody>
      </table>
     {/*  modal for add new book */}
       <div className="modal show" id="addCategoryModal" tabIndex={-1} aria-labelledby="addbookModalLabel" aria-hidden="true"
        style={{ display: openAddModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addCategoryModalLabel">Add New Book</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                onClick={()=>setOpenAddModal(false)}></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Name</label>
                        <input value={name} onChange={(e) => setname(e.target.value)} type="text" className="form-control" id="categoryName" placeholder="Enter category name" />
                    </div>
                      <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">author Name</label>
                        <input value={author} onChange={(e) => setauthor(e.target.value)} type="text" className="form-control" id="categoryName" placeholder="Enter category name" />
                    </div>
                      <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">image </label>
                        <input type="file" onChange={(e) => setimage(e.target.files[0])} className="form-control" id="categoryName" placeholder="Enter category name" />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="categorySelect" className="form-label">Category</label>
                      <select
                        id="categorySelect"
                        className="form-select"
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                      >
                        <option value="">-- Sélectionnez une catégorie --</option>
                        {category.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Book Description</label>
                        <textarea value={description} onChange={(e) => setdescription(e.target.value)} className="form-control" id="categoryDescription" rows={3} placeholder="Enter category description"></textarea>
                    </div>
                    
                    <button type="submit" className="btn btn-primary" onClick={handelAddbook} >Add Book</button>
                </form>
            </div>
          </div>
        </div>
      </div>
         {/* modal for delete category */}
      <div className="modal show" id="deletebookModal" tabIndex={-1} aria-labelledby="deletebookModalLabel" aria-hidden="true"
        style={{ display: deltebookModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteCategoryModalLabel">Delete Book</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                onClick={() => setdeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this book?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setdeleteModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger"   onClick={handleDeletebook}>Delete</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}


 

export default GestionBook