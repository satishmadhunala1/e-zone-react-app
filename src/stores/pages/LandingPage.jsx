

import React from 'react'
import Navbar from '../components/Navbar'
import Products from '../components/Products'
import Carosel from '../components/Caro'


const LandingPage = () => {
  return (
    <div>

        <Navbar />
        <Carosel/>
        <Products />
    </div>
  )
}

export default LandingPage