import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Sidebar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'

const Layout = () => {
  return (
    <>
    <div className='h-screen'>
            <Header />
            <div className=" flex flex-row ">
                <div>
                  <Navbar />
                </div>
                <div  className="w-full overflow-x-auto">
                  <Outlet />
                </div>
                
            </div>
            {/* <Footer/> */}
    </div>
   
        </>
  )
}

export default Layout