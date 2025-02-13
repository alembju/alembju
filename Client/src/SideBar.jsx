//import React from 'react'
import { NavLink } from 'react-router-dom'
import { LuArrowBigRight } from "react-icons/lu";
import axios from 'axios'

import React, {useEffect, useState} from 'react'
//import { LuArrowBigRight } from "react-icons/lu";
import { useLocation } from 'react-router-dom';
import  { useNavigate } from 'react-router-dom';
function SideBar() {
    const location = useLocation()
    const [state, setLocationState] = useState({FormData})
    const[users, getUser] = useState([])
  
    //location state
    useEffect (()=>{
      let state = location.state
      setLocationState(state)
    }, [location.state])
  
    const navigate = useNavigate();
     const handleRowClick = () => {
      navigate('/form');
     }

     useEffect(() => {
        axios.get('http://localhost:3000/EVENTSGet')
        //.then(Response => Response.json())
        .then(users =>getUser(users.data)) 
        .catch(erer => console.log(erer))
        
      } , [])
  return (
    <div className='h-100 w-20 bg-white '><div  className='row w-20'>
         <button className='w-30 rounded-4 bgcoll text-white'><h5>QUICK LINKS</h5></button>
          <form className='rounded w-10'>

              <div className='mb-0 '>
              <LuArrowBigRight /><label htmlFor="email"><NavLink to='/Login' className='sidebar-list'><strong >Mail</strong></NavLink></label>
              </div>
              <div className='mb-0'>
                  <LuArrowBigRight /><a href="https://cityaddisababa.gov.et/en/office/health-bureau" target="_blank" rel="noreferrer" className='sidebar-list '>Addis Ababa Health Bureau </a>  <br></br>
                  </div>
              
              <div className='mb-2'>
              <LuArrowBigRight /><label htmlFor="email"><strong></strong></label>
              </div>
          </form>
      </div><div  className='row'>
              <button className='rounded-4 bgcoll text-white'><h5>System</h5></button>
              <form className='rounded-4'>
                  <div className='mb-0 '>
                  <nav class="bg-white " >
                  <LuArrowBigRight /><NavLink to='/Reserch' className='sidebar-list'>IRB </NavLink> <br></br>
                  <LuArrowBigRight /><NavLink to='/Login' className='sidebar-list'>REPORTABLE DEASES </NavLink><br></br>
                  <LuArrowBigRight /> <NavLink to='/Login' className='sidebar-list'>AA-RTD </NavLink> <br></br>
                  </nav>
                  </div>
              </form>
          </div><br />
          <div  className='row '>
          <button className='rounded-4 bgcoll text-white'><h5>UPCOMING EVENTS</h5></button><br />
        <form className='rounded-4'>
        <div className='mb-0'>
          <table  ><br />
            <thead>
              <tr>
              </tr>
            </thead>
            <tbody>
              {users.map((filer, index) => {
                return <tr key={index}>
                  <tr className='d-flex bg-secondary text-white justify-content-left align-items-left vh-5 rounded-2 border border-danger rounded '>{filer.EVENTS1Date.slice(0,10)}<p  className='blink bg-danger rounded text-white p-0 text-capitalize '>{filer.EVENTS1}</p></tr><br />
                  <tr className='d-flex bg-secondary text-white justify-content-left align-items-center vh-5 rounded-2 border border-danger rounded'>{filer.EVENTS2Date.slice(0,10)}<p  className='blink bg-danger rounded text-white p-0 text-capitalize'>{filer.EVENTS2}</p></tr><br />
                  <tr className='d-flex bg-secondary text-white justify-content-left align-items-center vh-5 rounded-2 border border-danger rounded'>{filer.EVENTS3Date.slice(0,10)}<p  className='blink bg-danger rounded text-white p-0 text-capitalize'>{filer.EVENTS3}</p></tr>

                </tr>
              })}
            </tbody>
          </table>
          </div>
          </form>
      </div><br />
      <div  className='row '>
      <button className='rounded-4 bgcoll text-white'><h5>PARTENERSHIPS</h5></button>
              <form className='rounded-4'>
              
                  <div className='mb-2'>
                  <LuArrowBigRight /><a href="https://ephi.gov.et/" target="_blank" rel="noreferrer" className='sidebar-list '> EPHI</a>  <br></br>
                  </div>
                  <div className='mb-0'>
                  <LuArrowBigRight /><a href="https://www.healthdata.org/" target="_blank" rel="noreferrer" className='sidebar-list '> IHME</a>  <br></br>
                  </div>
                  <div className='mb-2'>
                  <LuArrowBigRight /><a href="https://africacdc.org/" target="_blank" rel="noreferrer" className='sidebar-list '> AFCDC</a>  <br></br>
                  </div>
                  

              </form>

          </div>
          </div>
  

  )
}

export default SideBar