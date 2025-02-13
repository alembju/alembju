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
import Login from './Login_component'

const RepDeses =[
  "Student Proposal Submission", "Student Reserch Comment Section", "Colledge university Registration", "IRB Data Uploading Port","Data collection progress"]
  const RenderRepDeases = ({index}) => {
    switch (index) {
        case 0: return <Login />
        break;
        case 1: return <Login />
        break;
        case 2: return <Login />
        break;
        case 3: return <Login />
        break;
        case 4: return <Login />
        break;
        default:
          break;
  }
}

function Reserch(){
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

export default Reserch

