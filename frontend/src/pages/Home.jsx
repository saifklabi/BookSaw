import React from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Header from '../components/Header'

import PopularBook from '../components/PopularBook'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Header/>
        <PopularBook/>
        <Footer/> 
        

    </div>
  )
}

export default Home