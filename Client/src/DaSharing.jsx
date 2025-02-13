import React from 'react'
import Header from './Header'
import  { useState } from 'react'
import { useNavigate } from "react-router-dom";

function DaSharing() {

  const navigate = useNavigate();

  return (
    <><div class='row text-white'><div class="col bgcoll p-2 mb-3">
        <p><h3>AACDMC Vision</h3><br></br>To Be A Center For Ecellence In Health Data Hub, In Open Data System, In Advanced Analytics And Disease Intelegent, 
        In Synthesizing And Translating Health Evidences In addis Ababa.</p><br /><br />
      <form  className='submit'>
      <h4>File uploading hear</h4> 
        <button onClick={() => {navigate("/upload")}} className='btn btn-default border w-90 text-white rounded-5 text-decoration-none bgcoll1'><h5>Uploading</h5></button>
      </form>
      “No data is clean, but most is useful.” By:Dean Abbott</div>
    <div class="col bg-secondary p-2 mb-3">
      <p><h3>AACDMC Objective</h3><br></br>To Establish Innovative Digital Data Systems  To Ensure Health Data Are Properly Archived And Used At All Levels To Ensure Advanced Analytics And Visualization Are Used For Generating High Quality Evidence, To Inform High Level Decision,
       And To Improve Health And Wellbeing.</p>
      <form className='download'>
      <h4>File Downloding Hear </h4>
        <button onClick={() => {navigate("/Dowenload")}} className=' btn btn-default border w-90 text-white rounded-5 text-decoration-none bgcoll'><h5>Downloding</h5></button>
      </form>
      “It is a capital mistake to theorize before one has data.” By:Sherlock Holmes</div>
    </div></>
  )
}

export default DaSharing
