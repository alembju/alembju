import React, { useRef } from 'react'
import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Alogo from './Image/Alogo.png'
import Facebbok from './Image/Facebbok.png'
import Gmail from './Image/Gmail.png'
import Instagram from './Image/Instagram.png'
import Telegram from './Image/Telegram.png'
import Twitter from './Image/Twitter.png'
import Youtube from './Image/Youtube.jpg'
import { NavLink } from 'react-router-dom'
import { FaSearch } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import './App.css'

import { SearchBar } from "./components/SearchBar";
import { SearchResultsList } from "./components/SearchResultsList.jsx";
import { BsTelegram } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";

export default function Header() {
  const [results, setResults] = useState([]);
  const AboutUs = useRef(null);
  const [open, setOpen] = useState(false)
 

  
  return (
   
      <div >
        <table  class="table table-borderless ">
            <tr class=" bg-info">
          <th><div class=" bg-info">
               <img  src={Alogo} alt='' class="img-circle" width="80" height="80"/>
               <p><h6>Addis Ababa health Berue</h6>
               <h6>አዲስ አበባ ጤና ቢሮ</h6></p>
               
               
          </div ></th>
          <th class=" bg-info">
            <div class=" bg-info">
               <h5 class="bg-info">Addis Ababa City PHEOC Data Management Center(AACDMC) </h5>
               <h5 class="bg-info">የአዲስ አበባ የህብረተሰብ ጤና ማስተባበሪያ ፣ የጤና መረጃና ማደራጃና ጥንቅር ማዕከል</h5>
          </div></th>
          <ht >
          
          <td class=" bg-info"><div className='col'><img src={Alogo} alt='' class="col img-circle" width="33" height="30" float='right' display='flex'/></div></td>
            <th class=" bg-info"><div ><a href="https://www.facebook.com/www.aahb.gov.et/" target="_blank" rel="noreferrer"><img src={Facebbok} alt='' class="col img-circle" width="33" height="30" float='right'/> </a></div></th>
            <th class=" bg-info"><div ><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"> <img src={Gmail} alt='' class="col img-circle" width="33" height="30" float='right'/></a></div></th>
            <th class=" bg-info"><div ><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Instagram} alt='' class="col img-circle" width="33" height="30" float='left'/></a></div></th>
            <th class=" bg-info"><div ><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Telegram} alt='' class="col img-circle" width="33" height="30" float='right'/></a></div></th>
            <th class=" bg-info"><div ><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Twitter} alt='' class="img-circle" width="33" height="30" float='right'/></a></div></th>
            <th class=" bg-info"><div ><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Youtube} alt='' class="col img-circle" width="33" height="30" float='right'/></a></div></th>
           </ht>
           <tr class=" bg-info">
            <td class="p- bg-info"><h6><FaPhoneAlt /> +251-115513911 <br></br> <BsTelegram /> @aardmc_bot<br></br><MdMarkEmailRead /> addisrdmc@gmail.com</h6></td>

           </tr>
           <tr >
            <nav class="bg-info " >
            <td class="bg-info" ></td>
            <td class="p-1 sidebar-list-item">
              <NavLink to='/HomePage'  >
                  <h5 className=' text-white  '>Home</h5></NavLink></td>
            <td class="p-1 sidebar-list-item"><NavLink to='/ContactUs'><h5 className='text-white'>ContactUS</h5></NavLink></td>
            
            <td class="p-1 sidebar-list-item "><NavLink to='/Upload'><h5 className=' text-white '>Upload</h5></NavLink></td>
            <td class="p-1 sidebar-list-item "><NavLink to='/Dowenload'><h5 className=' text-white '>Download</h5></NavLink></td>
            <td class="p-1 sidebar-list-item "><NavLink to='/HomePage'><h5 className=' text-white '>Help</h5></NavLink></td>
            <td className="p-1 sidebar-list-item  "><NavLink className="Link" to="/Login">Login</NavLink></td>
            
            </nav>
           </tr>
           
           
          <th class=" bg-info">
          <div className="search-bar-container bg-info">
        <SearchBar setResults={setResults} />
        {results && results.length > 0 && <SearchResultsList results={results} />}
      
   
   
          </div>
          
          </th> 
          </tr>
          </table>
        </div>
 
  )
}
