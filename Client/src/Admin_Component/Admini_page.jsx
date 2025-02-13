import React, { useState } from 'react'
import SideAdminbar from './SideAdminbar'
import { Routes,Route} from 'react-router-dom'
import DashbordSelection from './DashbordSelection'
import Navebar from './Navebar'
import Home from './Home'
import IRBUpload from './IRBUpload'
import './Navbar.css'
function Admini_page() {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false)
  

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }

  return (
    <div className='grid-container BgcolorAdmin'>
      <Navebar OpenSidebar={OpenSidebar}/>
      <SideAdminbar openSidebarToggle={openSidebarToggle} OpenSidebar={OpenSidebar} />
      <Home />
      
    </div>
  )
}


export default Admini_page