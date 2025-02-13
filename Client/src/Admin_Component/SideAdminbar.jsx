import React  from 'react'
import { NavLink} from 'react-router-dom'

import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'
import { FaBell, FaCog, FaHome, FaPoll, FaRegEnvelope, FaRegFileAlt, FaUserCircle, FaRegImages, FaDatabase,FaEdit } from 'react-icons/fa'
function SideAdminbar({isLoggedIn,userType}) {
   
   
    
  return (
        <aside id="sidebar" >
        <div className='sidebar-title'>
            <div className='sidebar-brand'>
                
                <BsPeopleFill  className='icon_header'/> Admin Dashboard
            </div>
            <span className='icon close_icon' >X</span>
        </div>
        <ul className='sidebar-list'>
            <li className='sidebar-list-item'>
            <NavLink to='/Login' className='px-2 '>
                    <BsGrid1X2Fill className='icon'></BsGrid1X2Fill>
                    Login
                    </NavLink>
            </li>
            <li className='sidebar-list-item'>
            <NavLink to='/Reportable_dease_report' className='px-2 '>
                <BsMenuButtonWideFill className='icon'/> Reports
                    </NavLink>
            </li>
            <li className='sidebar-list-item'>
            <NavLink to='/RequestList' className='px-2 '>
                <FaDatabase className='icon'/>  Data Request
                    </NavLink>
            </li>
            {/* need to be in the admin page */}
            {/* <li className='sidebar-list-item'>
            <NavLink to='/IRBUpload' className='px-2 '>
            <BsFillArchiveFill className='icon'/>
                    IRB Admin
                    </NavLink>
            </li> */}
            <li className='sidebar-list-item'>
            <NavLink to='/InsertImage' className='px-2 '>
                 <BsFillGrid3X3GapFill className='icon'/>  Banner Image
                    </NavLink>
            </li>
            <li className='sidebar-list-item'>
            <NavLink to='/NewsFeed' className='px-2 '>
                 <BsPeopleFill className='icon'/> Health News
                    </NavLink>
            </li>
            <li className='sidebar-list-item'>
            <NavLink to='/InsertImage' className='px-2 '>
                 <FaRegEnvelope className='icon'/> Upcoming Event
                    </NavLink>
            </li>
            <li className='sidebar-list-item'>
            <NavLink to='/Insert_Reportable_Deases' className='px-2 '>
                <FaCog className='icon'/> Repotable Deases
                    </NavLink>
            </li>
            <li className='sidebar-list-item'>
            <NavLink to='/FacilityInfo' className='px-2 '>
                <FaEdit className='icon'/> + New or Editing existinf facility 
                    </NavLink>
            </li>
            <li className='sidebar-list-item'>
            <NavLink to='/register' className='px-2 '>
                <BsMenuButtonWideFill className='icon'/> Authontication/<br/> Previlage
                    </NavLink>  
            </li>
            
        </ul>
    </aside>
  )
}

export default SideAdminbar
