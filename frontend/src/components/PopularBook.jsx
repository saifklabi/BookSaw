import axios from 'axios'
import React, { useEffect, useState } from 'react'

const PopularBook = () => {
  const [books, setBooks] =useState([])
const [category,setcategory]=useState([])

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
  return (
    <div>
        <div>	<section id="popular-books" className="bookshelf py-5 my-5">
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
             <li data-tab-target="#all-genre" className="active tab">all genre</li>
            {category.map(j=>(
              <>
             
              <li data-tab-target="#all-genre" className="active tab">{j.name}</li>
              </>
            ))}
            
        
          </ul>
          <div className="tab-content">
            <div id="all-genre" data-tab-content className="active">
              <div className="row">
                {books.map(b=>(
 <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src={`http://localhost:3001/uploads/${b.image}` || '/images/book1.jpg'} alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
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
            <div id="business" data-tab-content>
              <div className="row">
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item2.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Peaceful Enlightment</h3>
                      <span>Marmik Lama</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item4.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Great travel at desert</h3>
                      <span>Sanchit Howdy</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item6.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Life among the pirates</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item8.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Simple way of piece life</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
              </div>
            </div>
            <div id="technology" data-tab-content>
              <div className="row">
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item1.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Peaceful Enlightment</h3>
                      <span>Marmik Lama</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item3.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Great travel at desert</h3>
                      <span>Sanchit Howdy</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item5.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Life among the pirates</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item7.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Simple way of piece life</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
              </div>
            </div>
            <div id="romantic" data-tab-content>
              <div className="row">
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item1.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Peaceful Enlightment</h3>
                      <span>Marmik Lama</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item3.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Great travel at desert</h3>
                      <span>Sanchit Howdy</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item5.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Life among the pirates</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item7.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Simple way of piece life</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
              </div>
            </div>
            <div id="adventure" data-tab-content>
              <div className="row">
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item5.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Life among the pirates</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item7.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Simple way of piece life</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
              </div>
            </div>
            <div id="fictional" data-tab-content>
              <div className="row">
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item5.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Life among the pirates</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="product-item">
                    <figure className="product-style">
                      <img src="images/tab-item7.jpg" alt="Books" className="product-item" />
                      <button type="button" className="add-to-cart" data-product-tile="add-to-cart">Add to
                        Cart</button>
                    </figure>
                    <figcaption>
                      <h3>Simple way of piece life</h3>
                      <span>Armor Ramsey</span>
                      <div className="item-price">$ 40.00</div>
                    </figcaption>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{/*inner-tabs*/}
      </div>
    </div>
  </section>
</div>
    </div>
  )
}

export default PopularBook