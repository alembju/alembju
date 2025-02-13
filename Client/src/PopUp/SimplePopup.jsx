import React from 'react'
import './ResponsivPopup.css'
import { useEffect } from 'react'
import {  useState } from 'react'

function SimplePopup(props) {
  ///////////////////////////////////////////////////////////////////////////
const [datacholera, setDatadatacholera] = useState([]);
const [dataMeasles, setDatadataMeasles] = useState([]);
const [PrenatalDeath, setDatadataPrenatalDeath] = useState([]);
const [ALERTS, setDatadataALERTS] = useState([]);
const [searchQuery,setSearchQuery]=useState("")

useEffect(() => {
  getAllcholera();
},[searchQuery]);

//fetching all cholera
const getAllcholera = () => {
  fetch(`http://localhost:3000/getAllUser?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholera(data.data);
    });
};
  return (
    <div>
        <div className='bg'>
                <div className='popup'>
                    <span className='close' onClick={()=>props.close(false)}>x</span>
                    <span className='title'>Popup<br></br> 
                <h3> 
                        {searchQuery.length>0?`Records Found ${datacholera.length}`:`you will get notification email after  ${(datacholera.length)/2} days`} 
                     </h3>
            </span>
                </div>
            </div>
    </div>
  )
}

export default SimplePopup