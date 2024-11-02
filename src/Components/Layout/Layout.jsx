import React from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import './loy.css'

export default function Layout() {
  return <>
  

<Navbar/> 
<Outlet/>
<Footer/>


  
  
  
  
  </>
}
