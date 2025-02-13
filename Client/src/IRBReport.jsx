import React from 'react'


function IRBReport({ RepDeses, isSelected, setIsSelected ,openSidebarToggle, OpenSidebar}) {
    return (
        <aside id="sidebar" className={openSidebarToggle ? "sidebar-responsive": ""}>
        <div className='sidebar rounded  Scrol-Sidebars   BgcolorAdmin'>
            {
                RepDeses.map((text, index) => {
                    return <button
                        className={isSelected == index ? "selected-button btn btn-info w-24" : ' btn btn-info border w-24 bgcoll text-white rounded-3 border border-danger mb-4'}
                        onClick={() => setIsSelected(index)}
                    >{text}</button>
                })
            }
        </div>
        </aside>
    )
}

export default IRBReport