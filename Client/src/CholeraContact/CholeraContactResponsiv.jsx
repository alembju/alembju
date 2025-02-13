import React, { useState } from 'react'
import './CholeraContact.css'
import CholeraContactPopup from './CholeraContactPopup'

function CholeraContactResponsiv() {
    const[Display,setDisplay] = useState(false)
    
  return (
    <div className='mainContainerCC'>
        <h1>Simple Popup</h1>
        <button onClick={()=>setDisplay(true)}>Show</button>
        {
            Display?
            <CholeraContactPopup close={setDisplay}/>:''
        }
    </div>
  )
}

export default CholeraContactResponsiv