import React, { useState } from 'react'
import './CholeraPoup.css'
import CholeraMiniPoup from './CholeraMiniPoup'

function choleraresponsive() {
    const[show,setShow] = useState(false)
    
  return (
    <div className='mainContainer'>
        <h1>Simple Popup</h1>
        <button onClick={()=>setShow(true)}>Show</button>
        {
            show?
            <CholeraMiniPoup close={setShow}/>:''
        }
    </div>
  )
}

export default choleraresponsive