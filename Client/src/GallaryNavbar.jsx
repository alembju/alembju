import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import Gallary from "./Gallary";
import { ImCross } from "react-icons/im";
import Alogo from './Image/Alogo.png'
import { GiHamburgerMenu } from "react-icons/gi";


function GallaryNavbar({clicked, isClicked}) {
    const handleClicked = () => {
        isClicked(!clicked);
        console.log("clicked")
      };
    
  return (
    <div className="Nav">
    <ul className="NavbarWrapper">
    <li className="NavLogo">
        <Link style={{textDecoration:'none', color:'white'}} to="/">
        <div className='col'><img src={Alogo} alt='' class=" img-circle" width="45" height="45" float='right' display='flex'/></div>
        </Link>
      </li>
      <li className="NavLogo">
        <Link style={{textDecoration:'none', color:'white'}} to="/Gallary">
        Gallary
        </Link>
      </li>
      <li className="NavLogo">
        <NavLink className="Link" to="/EventsGallary">
        Events  
        </NavLink>
      </li>
      <li className="NavLogo">
        <NavLink className="Link" to="/VidioGallary">
          Vidio
        </NavLink>
      </li>
    </ul>
    {!clicked ? (
      <GiHamburgerMenu onClick={handleClicked} className="Icon" />
    ) : (
      <ImCross onClick={handleClicked} className="Icon" />
    )}
  </div>
  )
}

export default GallaryNavbar
