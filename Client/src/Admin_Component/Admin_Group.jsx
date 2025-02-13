import React from 'react'
import { NavLink} from 'react-router-dom'
import 
{BsCart3, BsGrid1X2Fill, BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, 
  BsListCheck, BsMenuButtonWideFill, BsFillGearFill}
 from 'react-icons/bs'

function Admin_Group({ AdminReport, isSelected, setIsSelected ,openSidebarToggle, OpenSidebar}) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive sidebar-list" : ""}>
            <div className='sidebar-brand '>

                <BsPeopleFill className='icon_header' /> Admin Dashboard
                </div>
                <div className='sidebar   Scrol-Sidebars   BgcolorAdmin sidebar-brand '>
                    {AdminReport.map((text, index) => {
                        return <><NavLink
                            className={isSelected == index ? "selected-button btn btn-secondary w-100" : 'w-100 text-white bg-secondary rounded-3 mb-0 p-2   '}
                            onClick={() => setIsSelected(index)}
                        >{text}</NavLink><br /><br /></>
                    })}
                </div>
            </aside>
    )
}

export default Admin_Group