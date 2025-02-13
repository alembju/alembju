import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import ChatBot from 'react-simple-chatbot';

//import  {NavLink } from 'react-router-dom'
import Alogo from './Image/Alogo.png'
import botUser from './Image/botUser.png'
import botAdmin from './Image/botAdmin.png'
import Facebbok from './Image/Facebbok.png'
import Gmail from './Image/Gmail.png'
import Instagram from './Image/Instagram.png'
import Telegram from './Image/Telegram.png'
import Twitter from './Image/Twitter.png'
import Youtube from './Image/Youtube.jpg'
import { NavLink } from 'react-router-dom'
import profile from "././Image/a.png";
import { ThemeProvider } from 'styled-components';
import Header from './Header'
import { useState } from 'react'
import axios from 'axios'
import { FaPhoneAlt } from "react-icons/fa";
import { BsTelegram } from "react-icons/bs";
import { MdMarkEmailRead } from "react-icons/md";
import ReportableDeases_Dashbored from './ReportableDeases_Dashbored';

export default function ContactUs() {
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
  alert('Thanks for Your email !!!')
  setTitle('')
  setMessage('')
  }
//custom step for the chatbot
const BotRedirect = ({ url, message }) => {
  return (
    <div>
      <a href={url} target="_blank">
        {message}
      </a>
    </div>
  );
};

// all available props
const theme = {
background: '#f5f8fb',
fontFamily: 'Helvetica Neue',
headerBgColor: '#0e1c6c',
headerFontColor: '#fff',
headerFontSize: '15px',
botBubbleColor: '#0e1c6c',
botFontColor: '#fff',
userBubbleColor: '#fff',
userFontColor: '#4a4a4a',
};

const steps = [
  {
    id: '1',
    message: 'What is your name?',
    trigger: 'name',
  },
  {
    id: 'name',
    user: true,
    trigger: '2',
  },
  {
    id: '2',
    message: 'Hi {previousValue}! Well come to  AAPHREM Directorate',
    trigger: '3',
  },
  {
    id: '3',
    options: [
      { value: 'aaphem', label: 'AAPHEM', trigger: '4' },
      { value: 'laboratory', label: 'Laboratory', trigger: '5' },
      { value: 'reserch', label: 'Reserch', trigger: '6' },
      { value: 'aacdmc', label: 'AACDMC', trigger: '7' },
      { value: 'sc&hos', label: 'SC&Hos', trigger: '8' },
      { value: 'manuals', label: 'Manuals', trigger: '9' },
    ],
  },
  {
    id: '4',
    message: 'Well come to AAPHREM AAPHEM ',
    trigger: '27',
  },
  {
    id: '27',
    options: [
      { value: 'servilance', label: 'Servilance and Response', trigger: '10' },
      { value: 'prepardnes', label: 'Prepardenes and Capacity building', trigger: '11' },
      { value: 'early', label: 'Early warning and Data communication', trigger: '12' }, 
    ],
  },
  {
    id: '10',
    component: (
      <BotRedirect
        message="Servilance and Response"
        url="https://docs.google.com/spreadsheets/d/1MUUFjtpdpB21VW9M9eJUwFTl-UANnLH-btSQf9u04_M/edit?usp=drivesdk"
      />
      ),
    
  }, 
  {
    id: '11',
    component: (
      <BotRedirect
        message="Prepardenes and Capacity building"
        url="https://docs.google.com/spreadsheets/d/1sZC_OnmcnpR0wIFOfFQilsTHVD012XumLHaMSqk73RE/edit?usp=drivesdk"
      />
      ),
  }, 
  {
    id: '12',
    component: (
      <BotRedirect
        message="Early warning and Data communication"
        url="https://docs.google.com/spreadsheets/d/1P4BP9MKNuyt1YTiILsWCL9kMkZ5qKb3quwqvi_N5eXY/edit?usp=drivesdk"
      />
      ),
    
  }, 
  {
    id: '5',
    message: 'Well come to AAPHREM Laboratory ',
    trigger: 'Laboratory',
  },
  {
    id: 'Laboratory',
    options: [
      { value: 'labratory', label: 'Laboratory Testing line list', trigger: '13' },
      { value: 'covax', label: 'COVAX-DHIS2 Login URL', trigger: '14' },
      {  value: 'dhis2', label: 'COVAX-DHIS2 teams', trigger: '15' }, 
    ],
  },
  {
    id: '13',
    component: (
      <BotRedirect
        message="Laboratory Testing line list"
        url="https://docs.google.com/spreadsheets/d/1ivRUGleHNZ8pQFOF3-XdD-BZu0KGw7Di66A6OE8DDOM/edit?usp=drivesdk"
      />
      ),
    
  }, 
  {
    id: '14',
    component: (
      <BotRedirect
        message="COVAX-DHIS2 Login URL"
        url="https://covax.moh.gov.et/dhis-web-commons/security/login.action"
      />
      ),
    
  }, 
  {
    id: '15',
    component: (
      <BotRedirect
        message="COVAX-DHIS2 teams"
        url="https://t.me/COVAX_DHIS"
      />
      ),
    
  }, 
  
  {
    id: '6',
    message: 'Well come to AAPHREM Reserch ',
    trigger: 'Reserch',
  },
  {
    id: 'Reserch',
    options: [
      { value: 'student', label: 'Studenet Proposal registration', trigger: '16' },
      { value: 'data', label: 'Data collection progress notification', trigger: '17' },
      {  value: 'reserch', label: 'Reserch completion report by student', trigger: '18' }, 
      {  value: 'appointment', label: 'Appointment & Plagiarism', trigger: '19' }, 
    ],
  },
  {
    id: '16',
    component: (
      <BotRedirect
        message="Studenet Proposal registration"
        url="https://docs.google.com/forms/d/e/1FAIpQLSe-PLsFK8v9Dyqy-Qyi1ujiyR7C087yfvu6vAuv8mbBzTgGMg/viewform"
      />
      ),
    
  }, 
  {
    id: '17',
    component: (
      <BotRedirect
        message="Data collection progress notification"
        url="https://docs.google.com/forms/d/e/1FAIpQLSedIA_uE8o1UJo-FWOomdDzqQFiqu2Lr_LH8GilOA8Nj4UtRQ/viewform"
      />
      ),
    
  }, 
  {
    id: '18',
    component: (
      <BotRedirect
        message="reserch completion report by student"
        url="https://docs.google.com/forms/d/e/1FAIpQLSeRGdjWudtlT3gSl2YsY58W6P1lxOmAPlrPmgxUm8qOOrR1Ig/viewform"
      />
      ),
    
  }, 
  {
    id: '19',
    component: (
      <BotRedirect
        message="Appointment & Plagiarism"
        url="https://docs.google.com/spreadsheets/d/1KI239gnwEXPzO3Zlaa3qcStCL0fSrRij0tZQETkq1UA/edit?usp=drivesdk"
      />
      ),
    
  }, 
  {
    id: '7',
    message: 'Well come to AAPHREM AACDMC',
    trigger: 'AACDMC',
  },
  {
    id: 'AACDMC',
    options: [
      { value: 'telegram', label: 'Telegeram Bot', trigger: '20' },
      { value: 'repository', label: 'REpository & Governance', trigger: '21' },
      {  value: 'analysisis', label: 'Analysis & Visualization', trigger: '22' }, 
      {  value: 'burden', label: 'Burden of Disease-BOD', trigger: '23' }, 
      {  value: 'evidence', label: ' Evidence Synthesis', trigger: '24' }, 
    ],
  },
  {
    id: '20',
    component: (
      <BotRedirect
        message="Telegeram Bot"
        url="https://t.me/AARDMC_bot"
      />
      ),
    
  }, 
  {
    id: '21',
    component: (
      <BotRedirect
        message="REpository & Governance"
        url="https://five.epicollect.net/project/health-and-health-related-data-at-ndmc-and-rdmc/data"
      />
      ),
    
  }, 
  {
    id: '22',
    component: <ReportableDeases_Dashbored />,
    asMessage: true,
  },
  {
    id: '23',
    component: (
      <BotRedirect
        message="Burden of Disease-BOD"
        url="https://ndmc.ephi.gov.et/download/addis-ababa-health-atlas-2021/"
      />
      ),
  }, 
  {
    id: '24',
    component: (
      <BotRedirect
        message="Evidence Synthesis"
        url="https://rtds.ephi.gov.et/public/"
      />
      ),
  }, 
  {
    id: '8',
    message: 'Well come to AAPHREM SC&Hos',
    trigger: 'SC&Hos',
  },
  {
    id: 'SC&Hos',
    options: [
      { value: 'existng', label: 'Existing Health Facility', trigger: '25' },
      { value: 'register', label: 'Register New facility', trigger: '26' },
     
    ],
  },
  {
    id: '25',
    component: (
      <BotRedirect
        message="Existing Health Facility"
        url="https://docs.google.com/spreadsheets/d/10yrp6wvZ6LrDE8X3B0hbXOE1ngTgNU0qhFQRkGRTWQs/edit?usp=drivesdk"
      />
      ),
    
  }, 
  {
    id: '26',
    component: (
      <BotRedirect
        message="Register New facility"
        url="https://surveyheart.com/form/653e6d74ce3b4e07e0e33110"
      />
      ),
  }, 
  {
    id: '9',
    message: 'Different Manuals and Guidline',
    trigger: 'end-message',
  },
  {
    id: 'end-message',
    message: 'Thanks For Visiting Us !!!!!',
    end: true,
  },
];


  return (
    <><div><Header /></div>
    <><div className='d-flex   align-items-center vh-10'>
      <table class="table table-bordered table-responsive-sm">
        <tr>
       <th></th>
       <th></th>
        <th >
        <div class="float-lg-right  ">
          <h3>Get In Tuche</h3>
          <p> <h5> አድራሻ<br></br>
            <p><h6>አድራሻ ሰሚት ኮንዶሚኒየም ሁለተኛ በር ወረድ ብሎ አንበሳ ባስ ገራዥ አጠገብ</h6></p>
            <BsTelegram /> @aardmc_bot<br></br>
            <MdMarkEmailRead /> addisrdmc@gmail.com<br></br>
            <FaPhoneAlt />+251-115513911<br></br> <br />
            
            <iframe src="https://www.google.com/maps/embed?pb=!1m20!1m8!1m3!1d692.7751710731861!2d38.85544291370137!3d8.992785740149495!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m3!3m2!1d8.9925775!2d38.855753299999996!4m3!3m2!1d8.9925081!2d38.8558587!5e1!3m2!1sen!2set!4v1738260003754!5m2!1sen!2set" width="80%" height="400"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"><a href="https://www.maps.ie/population/">Find AARDMC on Map</a></iframe>
          </h5></p> 
        </div>
        
     
          <div className='w-25 p-3 '>
            <form onSubmit={handleSubmit}>
          <div class="bg-info">
          <div className='mb-2 p-3'>
             <label htmlFor="email"><strong>Subject </strong></label>
             <input type="text" placeholder="Subject" autoComplete="off" name="Reportable Deases" className='form-control rounded-0'
             onChange={e=>setTitle(e.target.value)}
              value={Title} />
             </div>
             <div className='mb-2 p-3'>
            <label class=" bg-info "><h5>Email-Us</h5></label><br></br>
            <textarea class="vh-50 w-100 " onChange={(e) => setMessage(e.target.value)} value={messages}></textarea><br></br>
            <button className='btn btn-default border w-40 bgcoll rounded-4 text-white'><h6>Send</h6></button>
            </div>
          </div>
          </form>
          </div>
          <div>
          <div class="bg-info float-right">
          <ThemeProvider theme={theme}>
          <ChatBot 
          steps={steps} 
          floating={true}
          botDelay={1000}
          headerTitle="AAPHREM"
          botAvatar={botAdmin}
          userAvatar={botUser}
          />
           </ThemeProvider>
          </div>
          </div>

          

        </th>
        </tr>
      </table>

    </div></></>
  )
}
