import { Outlet } from 'react-router-dom'
import './loy.css'
import Footer from '../Footer/Footer'
import Navbarheader from '../Navbar/Navbar'

export default function Layout() {
  return <>
  

<Navbarheader/> 
<Outlet/>
<Footer/>


  
  
  
  
  </>
}
