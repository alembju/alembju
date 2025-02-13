import React ,{ useRef } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
//import ImageSlider from "./ImageSlider";
//import  {NavLink } from 'react-router-dom'
import aacdmc from './Image/aacdmc.jpg'
import Alogo from './Image/Alogo.png'
import Facebbok from './Image/Facebbok.png'
import Gmail from './Image/Gmail.png'
import Instagram from './Image/Instagram.png'
import Telegram from './Image/Telegram.png'
import Twitter from './Image/Twitter.png'
import Youtube from './Image/Youtube.jpg'
import { NavLink } from 'react-router-dom'
import Header from './Header'
import ImageSlider from './ImageSlider'
import { useEffect, useState } from "react";
import { LuArrowBigRight } from "react-icons/lu";
import axios from 'axios'

const paragraphstyles = {
  WebkitLineClamp :3,
  WebkitBoxOrient: 'vertical',
  overflow: 'hidden',
  display: '-webkit-box',
}


export default function Aphrem() {
    const[isOpen, setisOpen] = useState(false)
    const [allImage, setAllImage] = useState(null);
    const AboutUs = useRef(null);

useEffect(() => {
  getImage();
}, []);

const getImage = async (imageid) => {
  const result = await axios.get("http://localhost:3000/get-imageID ")
  console.log(result)
  setAllImage(result.data.data)
};

const [open, setOpen] = useState(false)
const Menus=['AAPHREM Directorate',"CBHI Directorate","Plan & Budget Directorate","ICT Directorate","Desease Prevention & Health Promotion Directorate","Medical Service Directorate","MCH Directorate","Medical Supplies & Drug Directorate","Human Resourse Directorate","Partnership Directorate","Law Directorate","Reform Directorate","Communication Directorate","Ethics Directorate","Finance & Payment Directorate","Gender Directorate","Internal Audit Directorate","Purchasing Directorate"]
const menuref = useRef();
const imageref = useRef();

window.addEventListener("click" , (e) =>{
  if(e.target != menuref.current && e.target != imageref.current){
    setOpen(false)
  }
})
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };

  return (
    
    <div className='d-flex bg-white justify-content-center align-items-center vh-25 '>
      <div >
      <table class="table table-bordered table-responsive-sm">
        <tr>
          <th>
      <div className='border border-secondary border border-5  html'>
      <NavLink to='/Gallary' className='sidebar-list '><h5><strong>Gallary</strong></h5></NavLink> 
      <div className='col'> <NavLink to='/Gallary' className='sidebar-list'>
      <div id="carouselExampleControls" className="carousel2 slide justify-content-center align-items-center" data-bs-ride="carousel">
<div className="carousel-inner">
 { 
 allImage &&        
 allImage?.map( (retbanner, index)=> {
   return(
 <div className={index===0 ? "carousel-item active ":"carousel-item"}  key={retbanner._id}>
    <img src={ `./src/images/${retbanner.pdf}`} className="  img-responsive  carousel2 " alt={retbanner.Title}
     
    />
    
  </div>  
   );
 }) 
}
</div> 
</div>
        </NavLink></div>
      </div>
          </th>
       
          <th>
          <div >
               <img ref={imageref} onClick={() => setOpen(!open)} src={Alogo} alt='' class="img-circle" width="80" height="80"/>
              
               {
                open && (
                  <> <h5><LuArrowBigRight />AACHB Directorat :-</h5><div ref={menuref} className='bg-white p-4 w-25 shadow-lg absolute -left-14 top-24 Scrol-Table'>
                      <ul>
                        {Menus.map((menu) => (
                          <li onClick={() => setOpen(false)} className='list AADWrapper  p-2 rounded-1' key={menu}>{menu}</li>
                        ))}
                      </ul>
                    </div></>
                )}
               
          </div >
        <div class="float-lg-right  p-2 mb-2 ">
          <h1 className='font-bold  align-items-center text-bgcoll'>AAPHREM</h1>
          <p style={isOpen ? null : paragraphstyles}> AAPHREM - Addis Ababa Public Health Research & Emergency Management is one of the directorates among the city administration of Addis Ababa health bureau.
          Our Mission, Vision and Objectives <br />
          <h4><LuArrowBigRight /><strong>Our Mission :</strong></h4>
                  <p>“To promote the health and well-being of the society through providing and regulating a comprehensive package of health services of the highest possible quality in an equitable manner.”</p>
                  <h4><LuArrowBigRight /> <strong>Our Vision :</strong></h4>
                  <p>To see healthy, productive and prosperous Addis Ababa.</p>
                  <h4><LuArrowBigRight /><strong>Our Objectives</strong></h4>
          The overarching objective of is to improve the health status of the population by realizing these four objectives: <br />
              1.    Accelerate progress towards universal health coverage 
              2.    Protect people from health emergencies 
              3.    Woreda transformation <br />
              4.    Improve health system responsiveness 
        
          </p> 
        </div>
        <button onClick={() => setisOpen(!isOpen)} className='effect4 border'>{isOpen ? 'Read less...':'Read more..'}</button>
        </th>
        </tr>
      </table>
        </div>
      </div>

    
  )
}
