import React, { useState }  from 'react'
import ReportableDeasesGroup from './Disease/ReportableDeasesGroup'
import IRBReport from './IRBReport'
import { NavLink } from 'react-router-dom'
//import { useNavigate } from 'react-router-dom'
//import ReactDOM from "react-dom/client"
//import {BrowserRouter, Routes, Route} from 'react-router-dom'
//import Chikungunya from './Disease/Chikungunya  '
//import AEFI from './Disease/AEFI'
//import Anthrax from './Disease/Anthrax'
//import Brucellosis from './Disease/Brucellosis'
import CollegRegistration from './CollegRegistration'
import IRBUpload from './Admin_Component/IRBUpload'
import Header from './Header'
import Proposal from './Proposal'
import Navebar from './Admin_Component/Navebar'
import { useNavigate } from "react-router-dom";

import DataCollectionP from './DataCollectionP'


const RepDeses =[
  "Colledge university Registration", "IRB Data Uploading Port"]
  const RenderRepDeases = ({index}) => {
    switch (index) {
        case 0: return <CollegRegistration />
        break;
        case 1: return <IRBUpload />
        break;
       
        default:
          break;
  }
}

function IRBAccount(){
  const [isSelected, setIsSelected] = useState(0)
    const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  const navigate = useNavigate();
    return (
      <><Navebar /><div >

        <IRBReport RepDeses={RepDeses} isSelected={isSelected} setIsSelected={setIsSelected} />

        <RenderRepDeases index={isSelected} />
      </div></>
                
    )
}

export default IRBAccount

