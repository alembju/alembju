import React from 'react'
import { FaBars, FaBell, FaDotCircle, FaSearch, FaUserCircle } from 'react-icons/fa'
import { LuGaugeCircle } from 'react-icons/lu'
import 
 {BsFillBellFill, BsFillEnvelopeFill, BsPersonCircle, BsSearch, BsJustify}
 from 'react-icons/bs'

import { NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Navbar.css'
import { useEffect, useState } from "react";
import axios from "axios";
function  Navebar  ({OpenSidebar}) {
  //const navigate = useNavigate()
  const [UserName, setUserName] = useState();

  useEffect(() => {
    getImage();
  }, []);

  const getImage = async (imageid) => {
    const result = await axios.get("http://localhost:3000/get-UserName ")
    console.log(result)
    setUserName(result.data.data)
  };
//////////
  return (
    <header className='navbar BgcolorAdmin'>
        <div className='menu-icon'>
            <BsJustify className='icon' onClick={OpenSidebar}/>
        </div>
        <div className='header-left'>
            <BsSearch  className='icon'/>
        </div>
        <div className='header-right'>
            <BsFillBellFill className='icon'/>
            <BsFillEnvelopeFill className='icon'/>
            <BsPersonCircle className='icon'/>
            { 
        UserName && 
        
        UserName?.map( (retbanner, index)=> {
          return(
           <div className={index===0 ? "carousel-item active ":"carousel-item"} key={retbanner._id} >
              <span>{retbanner && retbanner.fname}</span> </div> 
            );
          }) 
         }
        </div>
    </header>
  )
}
export default Navebar