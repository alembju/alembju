import React  from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
//import  {NavLink } from 'react-router-dom'
import Alogo from './Image/Alogo.png'
import Facebbok from './Image/Facebbok.png'
import Gmail from './Image/Gmail.png'
import Instagram from './Image/Instagram.png'
import Telegram from './Image/Telegram.png'
import Twitter from './Image/Twitter.png'
import Youtube from './Image/Youtube.jpg'
import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
import {BsPeopleFill} from 'react-icons/bs';
import { FaPhoneAlt, } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";


export default function Footer() {
  const [email, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [Title, setTitle] = useState("");
  const [messages, setMessage] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
  formData.append("Title" , Title)
  formData.append("email", email)
  formData.append("messages", messages)
  formData.append("documents" , file)
  axios.post('http://localhost:3000/ContactUs',formData)
  .then(res =>console.log(res))
  .catch(er=>console.log(er))
  alert('Thanks for Your email !!')
  setTitle('')
  setMessage('')
  }
  return (
    <><div className='d-flex bg-info  align-items-center  vh-10'>
      
        <table class="table table-bordered">
          <th class=" bg-info ">
        <div class=" bg-info ">
          <div class="w-40 bg-info "><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Alogo} alt='' class="img-circle" width="33" height="30" /></a></div>
          <div class="w-40 bg-info "><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Facebbok} alt='' class="img-circle" width="33" height="30" /></a></div>
          <div class="w-40 bg-info "> <a href="https://addisrdmc@gmail.com" target="_blank" rel="noreferrer"><img src={Gmail} alt='' class="img-circle" width="33" height="30" /></a></div>
          <div class="w-40 bg-info "><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Instagram} alt='' class="img-circle" width="33" height="30" /></a></div>
          <div class="w-40 bg-info "><a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Telegram} alt='' class="img-circle" width="33" height="30" /></a></div>
          <div class="w-40 bg-info "> <a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Twitter} alt='' class="img-circle" width="33" height="30" /></a></div>
          <div class="w-40 bg-info "> <a href="https://codingbeautydev.com" target="_blank" rel="noreferrer"><img src={Youtube} alt='' class="img-circle" width="33" height="30" /></a></div>
        </div>
        </th>
        <th class="  bg-info ">
        <div class="mx-auto bg-info ">
        
            <nav class=" bg-info ">
            
            <tr className='sidebar-list-item'><NavLink to='/HomePage'><h5 className=' text-white '>Home</h5></NavLink></tr><br></br>
            <tr className='sidebar-list-item'><NavLink to='/ContactUs'><h5 className=' text-white '>ContactUS</h5></NavLink></tr><br></br>
            <tr className='sidebar-list-item'><NavLink to='/Upload'><h5 className=' text-white '>Upload</h5></NavLink></tr><br></br>
            <tr className='sidebar-list-item'><NavLink to='/Dowenload'><h5 className=' text-white '>Download</h5></NavLink></tr><br></br>
            
            <tr className='sidebar-list-item'><NavLink to='/AEFI'><h5 className=' text-white '>Help</h5></NavLink></tr><br></br>
            
            </nav>
            
        </div >
        </th>
        <th class="   bg-info ">
          <div class="float-lg-right bg-info ">
          <p class="bg-info" > <h6> አድራሻ<br></br>
          <p><h6>አድራሻ ሰሚት ኮንዶሚኒየም ሁለተኛ በር ወረድ ብሎ አንበሳ ባስ ገራዥ አጠገብ</h6></p>
          <BsTelegram /> @aardmc_bot<br></br>
          <MdMarkEmailRead />info@aacdmc.aahb.gov.et <br></br>
            <FaPhoneAlt />+251-115513911<br></br>
            <BsPeopleFill /> Developed by Alembju Assefa (አለምበጁ አሰፋ)<br></br>
            {/* <iframe  src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d2771.0968470232942!2d38.85446096561935!3d8.993287068375126!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2set!4v1738259618402!5m2!1sen!2set" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"><a href="https://www.maps.ie/population/">Find AARDMC on Map</a></iframe> */}
            <iframe src="https://www.google.com/maps/embed?pb=!1m20!1m8!1m3!1d692.7751710731861!2d38.85544291370137!3d8.992785740149495!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d8.9925775!2d38.855753299999996!4m3!3m2!1d8.9925081!2d38.8558587!5e1!3m2!1sen!2set!4v1738260003754!5m2!1sen!2set" width="600" height="250"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"><a href="https://www.maps.ie/population/">Find AARDMC on Map</a></iframe>
            </h6></p>
        </div>
        </th>
        <th>
          <form onSubmit={handleSubmit}>
          <div class="bg-info">
          <div className='mb-2'>
                  <label htmlFor="email"><strong>Subject </strong></label>
                  <input type="text" placeholder="Subjuct" autoComplete="off" name="Reportable Deases" className='form-control rounded-0'
                    onChange={e=>setTitle(e.target.value)}
                    value={Title} />
                </div>
            <label class=" bg-info "><h5>Email-Us</h5></label><br></br>
            <textarea class="vh-50 w-100 " onChange={(e) => setMessage(e.target.value)} value={messages}></textarea><br></br>
            <button className='btn btn-default border w-40 bgcoll rounded-4 text-white'><h6>Send</h6></button>
          </div>
          </form>
        </th>
        </table>
      
  
    </div></>
  )
}
