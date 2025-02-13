import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
//import ImageSlider from "./ImageSlider";
//import  {NavLink } from 'react-router-dom'
import aacdmc from './Image/aacdmc.jpg'
import Facebbok from './Image/Facebbok.png'
import Gmail from './Image/Gmail.png'
import Instagram from './Image/Instagram.png'
import Telegram from './Image/Telegram.png'
import Twitter from './Image/Twitter.png'
import Youtube from './Image/Youtube.jpg'
import { NavLink } from 'react-router-dom'
import Header from './Header'
import ImageSlider from './ImageSlider'



export default function AboutUs() {
    
  return (
    <><>
    <div className='d-flex   align-items-center vh-10' ref={AboutUs}>
      <table class="table table-bordered table-responsive-sm">
        <tr>
          <th>
      <div >
      <div className='col'><img src={aacdmc} alt='' class="col img-circle" width="300" height="300" float='right' display='flex'/></div>
      </div>
          </th>
        <th >
        <div class="float-lg-right  ">
          <h1 className='font-bold'>About AACDMC And NDMC</h1>
          <p><h5>Addis Ababa city health bureau have initiated its Owen Addis Ababa City data management center at December 31 2022 for the purpose of
          maintaining city health bureau data centrally and available for the public. </h5></p>
          <p> <h5> The Ethiopian Public Health Institute (EPHI) has been given the responsibility by the Council of Ministers decree no 301/2013 to establish 
           a national health data repository and to undertake research on national priority health challenges, public health emergency management  and building national laboratory capacity.
           
          </h5>
          “Data is a tool for enhancing intuition.” By:Hilary Mason</p> 
        </div>
       </th>
        </tr>
      </table>
      </div>
</></>
    
  )
}
