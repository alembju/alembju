import React, { useState } from 'react'
import './CholeraCasepopup.css'
import CholeraCasepopup from './CholeraCasepopup'

function CholeraCasepopupRespons() {
    const[Display,setDisplay] = useState(false)
    
  return (
    <div className='mainContainerCC'>
        <h1>Simple Popup</h1>
        <button onClick={()=>setDisplay(true)}>Show</button>
        {
            Display?
            <CholeraCasepopup close={setDisplay}/>:''
        }
    </div>
  )
}

export default CholeraCasepopupRespons