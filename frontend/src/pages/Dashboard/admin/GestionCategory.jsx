import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const GestionCategory = () => {
    const [categories, setCategories] = useState([])
    const [openAddModal, setOpenAddModal] = useState(false)
    const [nameCategory, setNameCategory] = useState("")
    const [description, setdescription] = useState("")
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [categoryIdToDelete, setCategoryIdToDelete] = useState(null)
  const [openEditModal, setOpenEditModal] = useState(false)
  const [categoryIdToEdit, setCategoryIdToEdit] = useState(null)
  const handelEditemodal= (categoryId) => {
    setOpenEditModal(true);
    setCategoryIdToEdit(categoryId); // Store the categoryId to be edited
    // You can store the categoryId in state if you need to use it for editing
  } 
  
  const handleEditCategory = async (e) => {
    try{
e.preventDefault() // prevent the default form submission behavior
        const response = await axios.patch(`http://localhost:3002/category/${categoryIdToEdit}`, {name:nameCategory,description:description})
        toast.success("Category updated successfully!")
        setOpenEditModal(false)
        setCategories(categories.map((category) => category.id === categoryIdToEdit ? response.data : category)); // Update the categories state after editing
    }
    catch (error) {
        console.error("Error editing category:", error)
        toast.error("Error editing category!")
    }
}


    useEffect(()=>{
      const fetchCategories = async () => {
        try {
            const response=await axios.get ("http://localhost:3002/category")
            setCategories(response.data)
           
            console.log("categories",response.data)
        } catch (error) { console.error("Error fetching categories:", error)
            
        }
    }
    fetchCategories()
}
    ,[])

    const handelAddCategory= async (e) => {
        try {
              e.preventDefault() // prevent the default form submission behavior
        console.log("nameCategory you put ",nameCategory)
        console.log("description you put ",description)
        //send to backend
const response=await axios.post("http://localhost:3002/category/addcategory", {name:nameCategory,description:description})
             toast.success("Category added successfully!")
             setOpenAddModal(false)
             setCategories([...categories, response.data]) // Update the categories state with the new category
        } catch (error) {
            console.error("Error adding category:", error)
            toast.error("Error adding category!")
        }

    }
const handleopenDeleteModal = (categoryId) => {
  setOpenDeleteModal(true);
  setCategoryIdToDelete(categoryId); // Store the categoryId to be deleted
  // You can store the categoryId in state if you need to use it for deletion
  
}
const handleDeleteCategory = async () => {
    try {
        const  response = await axios.delete(`http://localhost:3002/category/${categoryIdToDelete}`)
        toast.success("category delete succcefuly")
        setOpenDeleteModal(false)
        setCategories(categories.filter((category) => category.id !== categoryIdToDelete)); // Update the categories state after deletion
    } catch (error) { toast.error ("error")
        
    }
}

  return (
    <div className="category-page">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h4 className="mb-0">Categories</h4>
          <small className="text-muted">Manage all categories</small>
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => setOpenAddModal(true)}>
          Add Category
        </button>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="search-wrapper">
              <input type="search" className="form-control form-control-sm search-input" placeholder="Search categories..." />
            </div>
            <div className="text-muted">Showing 1-2 of 2</div>
          </div>

          <div className="table-responsive">
            <table className="table table-hover table-striped align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th scope="col">Category Name</th>
                  <th scope="col">Category description</th>
                  <th scope="col" className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((i)=>( <tr>
                  <td>{i.name}</td>
                  <td>{i.description}</td>
                  <td className="text-end">
                    <button className="btn btn-sm btn-outline-secondary me-2 action-btn" onClick={() => handelEditemodal(i.id)}>
                      <i className="icon icon-edit me-1" /> Edit
                    </button>
                    <button className="btn btn-sm btn-outline-danger action-btn" onClick={() => handleopenDeleteModal(i.id)}>
                      <i className="icon icon-trash me-1" /> Delete
                    </button>
                  </td>
                </tr>))}
               
                
              </tbody>
            </table>
          </div>
        </div>
      </div>
       {/*  modal for add new category  */}
       <div className="modal show" id="addCategoryModal" tabIndex={-1} aria-labelledby="addCategoryModalLabel" aria-hidden="true"
        style={{ display: openAddModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title" id="addCategoryModalLabel">Add New Category</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                onClick={()=>setOpenAddModal(false)}></button>
            </div>
            <div className="modal-body">
                <form>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Category Name</label>
                        <input value={nameCategory} onChange={(e) => setNameCategory(e.target.value)} type="text" className="form-control" id="categoryName" placeholder="Enter category name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Category Description</label>
                        <textarea value={description} onChange={(e) => setdescription(e.target.value)} className="form-control" id="categoryDescription" rows={3} placeholder="Enter category description"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handelAddCategory}>Add Category</button>
                </form>
            </div>
          </div>
        </div>
      </div>
      {/* modal for delete category */}
      <div className="modal show" id="deleteCategoryModal" tabIndex={-1} aria-labelledby="deleteCategoryModalLabel" aria-hidden="true"
        style={{ display: openDeleteModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="deleteCategoryModalLabel">Delete Category</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                onClick={() => setOpenDeleteModal(false)}></button>
            </div>
            <div className="modal-body">
              <p>Are you sure you want to delete this category?</p>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={() => setOpenDeleteModal(false)}>Cancel</button>
              <button type="button" className="btn btn-danger"   onClick={handleDeleteCategory}>Delete</button>
            </div>
          </div>
        </div>
      </div>
     {/*  modal for edit category */}
   <div className="modal show" id="editCategoryModal" tabIndex={-1} aria-labelledby="editCategoryModalLabel" aria-hidden="true"
        style={{ display: openEditModal ? 'block' : 'none', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="editCategoryModalLabel">Edit Category</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
                        onClick={() => setOpenEditModal(false)}></button>
                </div>
                <div className="modal-body">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="editCategoryName" className="form-label">Category Name</label>
                            
                            <input value={nameCategory} onChange={(e) => setNameCategory(e.target.value)} type="text" className="form-control" id="editCategoryName" placeholder="Enter category name" />
                        </div>
                        <div className="mb-3">

                            <label htmlFor="editCategoryDescription" className="form-label">Category Description</label>
                            <textarea value={description} onChange={(e) => setdescription(e.target.value)} className="form-control" id="editCategoryDescription" rows={3} placeholder="Enter category description"></textarea>
                        </div>
                        <button type="submit" className="btn btn-primary"onClick={handleEditCategory}>Save Changes</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}



 

export default GestionCategory