import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header'
import { Link } from 'react-router-dom'
import { useRef } from "react";
import ReactPaginate from 'react-paginate';
import Navebar from './Admin_Component/Navebar'
import emailjs from '@emailjs/browser';
//import { motion } from "framer-motion";
//import createStyled from "@emotion/styled";
//import { Flex, Box,FormControl, FormLabel, Input, Stack,Button, Heading, Text, useColorModeValue, Textarea,} from "@chakra-ui/react";

//import DataTable from 'react-data-table-component'
//import DataTable from './react-native-datatable-component'
//import DataTable, { COL_TYPES } from 'react-native-datatable-component'


export default function 
() {
  // const[users, getUser] = useState([])
  // const [allImage, setAllImage] = useState(null);
  // const [pdfFile, setPdfFile] = useState(null);
///////////////////////////////////////send email///////////////////////
  const [email, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [Title, setTitle] = useState("");
  const [messages, setMessage] = useState("");
  const [file, setFile] = useState(null);
  ////////////////////handle submit/////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
  formData.append("Title" , Title)
  formData.append("email", email)
  formData.append("messages", messages)
  formData.append("file", file);
   /*try{
    const response = await fetch("http://localhost:3000/Esend", {
      method:"post",
      body:formData,
    });
    if(response.ok){
      console.log("email sent succesfully")
    }
    else{
      console.log("email failed to send")
    }
  }catch(error){
    console.log("error while sending the email",error)
  }*/
  axios.post('http://localhost:3000/Esend',formData)
  .then(res =>console.log(res))
  .catch(er=>console.log(er))
  alert('Send Emaile successfull !!')
  }
  ////////////////////////////handle submit////////////////

  const baseUrl = "http://localhost:3000";

  const sendEmail = async () => {
    let dataSend = {
      email: email,
      subject: subject,
      message: messages,
    };

    const res = await fetch(`${baseUrl}/email/sendEmail`, {
      method: "POST",
      body: JSON.stringify(dataSend),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
      // HANDLING ERRORS
      .then((res) => {
        console.log(res);
        if (res.status > 199 && res.status < 300) {
          alert("Send Successfully !");
        }
      });
  };

  /////////////////pagination//////
  const [data, setData] = useState([]);
  const [limit,setLimit]=useState(5);
  const [pageCount,setPageCount]=useState(1);
  const currentPage=useRef();
 /* const[currentpage,setcurrentpage] = useState(1)
  const recordsperpage=5;
  const lastIndex = currentpage*recordsperpage;
  const firstIndex = lastIndex-recordsperpage;
  const Records = get-Rechfiles.slice(firstIndex, lastIndex);
  const npage = Math.ceil(get-Rechfiles.length / recordsperpage)
  const mumbers = [...Array(npage + 1).keys()].slice(1)*/
///////////////////////////selection option from mpngo/////////////
const [values,setValues]=useState([])
const [options,setOptions]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/fetching-option")
  .then((data)=>data.json())
  .then((val)=>setValues(val))
},[])

console.log(values,"values")

  useEffect(() => {
    currentPage.current=1;
    //getPdf();
    getPaginatedUsers();
  }, []);
  //const getPdf = async () => {
    //const result = await axios.get("http://localhost:3000/get-Rechfiles");
   // console.log(result.data.data);
   // setAllImage(result.data.data);
 // };*/

////////////////////////send email ///////////////
const [recipient_email, setEmail] = useState("");
//const [Title, setTitle] = useState("");
const [message, setMessages] = useState("");
//const [File,setFile]= useState()
/*
function sendMail() {
  if (Title && recipient_email && message ) {
    
   // localStorage.setItem("subject", Title);
   // localStorage.setItem("email", recipient_email);
   // localStorage.setItem("message", message);

    axios 
      .get("http://localhost:3000/sendEmail", {Title,recipient_email,message})
      .then(() => alert("Message Send Succesfuly"))
      .catch(() => alert("Oppssy daisssy"));
    return;
  }
  return alert("Fill in all the fields to continue");
}
*/



 // const form = useRef()
  //const sendEmail = (e) => {
   // e.preventDefault();

   // emailjs.sendForm('service_h6ontr8', 'template_75q84jm', form.current, 'yqcI0vTWDA-NPbWfm')
    //  .then((result) => {
     //     console.log(result.text);
    //  }, (error) => {
    //      console.log(error.text);
    //  });
   //   e.target.reset()
 // };

 
  useEffect(() => {/*
    axios.get('http://localhost:3000/fetching-Rech')
    //.then(Response => Response.json())
    .then(users =>getUser(users.data)) 
    .catch(erer => console.log(erer))
    
*/} , [])

  //pagination
  function handlePageClick(e) {
    console.log(e);
   currentPage.current=e.selected+1;
    getPaginatedUsers();
   

  }
  function changeLimit(){
    currentPage.current=1;
    getPaginatedUsers();
  }

  function getPaginatedUsers(){
    fetch(`http://localhost:3000/fetching-Rech?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setPageCount(data.pageCount);
        setData(data.result)
      });

  }

  ///////////////////////////////////dowenload///////////
 /* const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef(null);
  const [name, setName] = useState("");

  const getItems = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/v1/items");
      setItems(res.data.items);
      setLoading(false);
      console.log(res.data.items);
    } catch (error) {
      console.log(error);
    }
  };

  const addItem = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("file", fileInputRef.current.files[0]);
      const res = await axios.post(
        "http://localhost:3000/api/v1/items",
        formData
      );
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };


  

  const downloadFile = async (id) => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/v1/items/download/${id}`,
        { responseType: "blob" }
      );
      const blob = new Blob([res.data], { type: res.data.type });
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "file.pdf";
      // link.download = res.headers["content-disposition"].split("filename=")[1];
      link.click();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getItems();
  }, []);
*/


  return (
    <><Navebar /><main className='main-container '><div></div>
    
    <div className='mb-2 p-3 d-flex bg-primary justify-content-center align-items-center vh-15' >
      <div className='w-15 bg-white rounded p-3' class='row mb-2' >
      
        <h3 className='border border-secondary bgcoll text-white text-center rounded '>AAPHREM - Public Health Research Unit</h3>
        <div className='  flex justify-center items-center col'>
        <div className='Scrol-Table'>
          <table className='table-responsive  table light padding text-sm-left'  >
            <thead className='text-sm-left'>
              <tr>
                <th><h6>Name of College | University</h6> </th>
                <th> <h6>Name of Principal Investigator (PI) or Co-Principal Investigator (Co-PI)</h6> </th>
                <th><h6>Study Title </h6> </th>
                <th><h6>Study Period Begins</h6>  </th>
                <th> <h6>Study Period ends </h6> </th>
                <th><h6>study design  </h6> </th>
                <th><h6>Study area location</h6> </th>
                <th><h6>sex/gender</h6>  </th>
                <th> <h6>tools for data collection </h6> </th>
                <th><h6>Attach File  </h6> </th>
              </tr>
            </thead>
            <tbody > 
              {data.map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.NCollege}</h6></th>
                  <th ><h6>{filer.PI}</h6></th>
                  <th><h6>{filer.Title}</h6></th>
                  <th><h6>{filer.SPeriodB.slice(0,10)}</h6></th>
                  <th><h6>{filer.SPeriodE.slice(0,10)}</h6></th>
                  <th ><h6>{filer.Design.slice(0,10)}</h6></th>
                  <th><h6>{filer.Slocation}</h6></th>
                  <th><h6>{filer.Gender}</h6></th>
                  <th><h6>{filer.Tools}</h6></th>
                  <th ><h6>{filer.pdf.slice(0,10)}</h6></th>
                  <th><Link to={`/edit/${filer._id}`} className="btn btn-sm btn-success me-2">View</Link></th>
                  
                </tr>
              })}
            </tbody >
          </table>
          </div>
          <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
            
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
        
      />
        
        </div>
        
        <div className='col bg-white rounded p-3 border border-danger mb-2  h-50'  >
          <form onSubmit={handleSubmit}>
          <table className='table-responsive'>
          <tr>
          <div>
            <label><h5>Select Propose Title</h5></label>
            <select 
             id="Title"
             placeholder="select the title"
             value={Title}
             required
            onChange={(e)=>setTitle(e.target.value)} className='form-control rounded-2 w-70'>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.Title}</option>})
                }
            </select>
            
        </div>
              </tr>
              <tr>
                <br></br>
              <div>
                <label><h5>Select Contact E-mail Adress</h5></label>
            <select id="recipient_email"
              value={email}
              required
                placeholder="username@email.com"
                    onChange={(e)=>setEmails(e.target.value)} className='form-control rounded-2 w-70'>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.email}</option>})
                }
            </select>
            
        </div>
              </tr>
              <br></br>
              <tr>
              <textarea
                id="message"
               value={messages}
               required
                onChange={(e) => setMessage(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Place a comment to The Proposal..."
              ></textarea>
             </tr>
             <br></br>
             <tr>
             <div >
                <h6> <label htmlFor="email"> Choose a file to be uploaded </label></h6>
                <input
                  type="file"
                  id='file'
                  class="form-control"
                  accept="application/pdf"
                  name='Esend' 
                   multiple
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                   />
                </div>
             </tr>
             <br></br>
              <button type='submit' className="rounded-3 py-3 px-5 m-10 text-sm font-medium text-center text-dark rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send Email</button>
          </table>
          </form>
        </div>
        <br />
        <input placeholder="Set Limit" onChange={e=>setLimit(e.target.value)}  />
        <button className='btn btn-default border w-25 bgcoll rounded-5 text-white' onClick={changeLimit}><h4>Set Limit</h4></button>
    </div>
    </div>
    </main>
    </>
  );
  

}

