import React from 'react'


function Reportable_dease_reportGroup({ RepDeses, isSelected, setIsSelected ,openSidebarToggle, OpenSidebar}) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar rounded  Scrol-Sidebars   BgcolorAdmin'>
            {
                RepDeses.map((text, index) => {
                    return <button
                        className={isSelected == index ? "selected-button btn btn-secondary w-100" : ' btn btn-light border w-100 bgcoll text-white rounded-3 mb-1'}
                        onClick={() => setIsSelected(index)}
                    >{text}</button>
                })
            }
        </div>
        </aside>
    )
}

export default Reportable_dease_reportGroup