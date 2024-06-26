import React from 'react'
import Header from './Components/Header'
import Footer from './Components/Footer'
import { Outlet } from 'react-router-dom'

function RootLayout() {
  return (
    <div>
        <Header/>
          <div style={{minHeight:"100vh"}}> 
            <Outlet/>
          </div>
       <Footer /> 
    </div>
  )
}

export default RootLayout