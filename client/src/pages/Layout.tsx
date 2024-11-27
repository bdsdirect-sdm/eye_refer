import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
    <div className='h-screen flex flex-col'>
            <Header />
            <div className="flex ">
                <Navbar />
                <div className="flex-grow p-2 bg-gray-300"><Outlet/></div>
                
            </div>
            {/* <Footer/> */}
    </div>
   
        </>
  )
}

export default Layout