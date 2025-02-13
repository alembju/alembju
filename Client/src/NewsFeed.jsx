import React, { useState } from 'react'
import axios from 'axios'
import { useEffect } from 'react'
import { useNavigate, useParams } from "react-router-dom";

const  NewsFeed = () => {
   const navigate = useNavigate()

  const [News1,setNews1] = useState()
  const [News2,setNews2] = useState()
  const [News3,setNews3] = useState()
  const[users, getUser] = useState([])
  const [items, setItems] = useState([]);

  const handleSubmit = (e) =>{
    e.preventDefault();
    //alert("todate"+Date+ "form date"+Date)
    //formData.append('file' , file)
    axios.post('http://localhost:3000/NewsFeed',{News1,News2,News3})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
    alert("Uploaded Successfully!!!");
  }

  useEffect(() => {
    axios.get('http://localhost:3000/NewsHeadline')
    //.then(Response => Response.json())
    .then(users =>getUser(users.data)) 
    .catch(erer => console.log(erer))
    
  } , [])

  const HandleDelet = (id, News1) => {
    if (window.confirm(`Are you sure you want to delete ${News1}`)) {
    axios.delete('http://localhost:3000/deletNewes/'+id)
    .then(res => {console.log(res)
     
    window.location.reload()})
    .then(errr => console.log(errr))
  }
  else {
  }
  };

  return (
    <><main className='main-container '>
      <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT KEY MESSAGES</h4>
    <div className='d-flex BgcolorAdmin justify-content-center align-items-center vh-100 '>
          <div className='w-50 bg-white rounded p-3'>
              <div>
              <label><h5><strong className='text-uppercase '>List of posted news</strong></h5></label><br></br>
              <div>
          <table className=' table light padding border border-secondary-700' >
            <thead>
              
            </thead>
            <tbody>
              {users.map((filer, index) => {
                return <tr key={index}>
                 <tr> <th>{filer.News1}</th></tr>
                 <tr><th>{filer.News2}</th></tr>
                 <tr><th>{filer.News3}</th></tr>
                  <th className='border border-secondary-7000 '><button className='  bg-danger rounded-5 shadow-lg' onClick={(e) => HandleDelet(filer._id)}><h5><strong className='text-uppercase '>Dellet</strong></h5></button> </th>
                </tr>
              })}
            </tbody>
          </table>
        </div>
                
                </div>
                <br />
                <div className='border border-secondary-700'>
                <form onSubmit={handleSubmit}>
                <label><h5><strong className='text-uppercase '>Write the newes in short and precise size</strong></h5></label>
                <br />
                <input type="text" value={News1}  placeholder="Enter the newes" autoComplete="off" name="email" className='form-control rounded-0 w-75 font-italic' onChange={(e) => setNews1(e.target.value)}/> <br />
                <input type="text" value={News2}  placeholder="Enter the newes" autoComplete="off" name="email" className='form-control rounded-0 w-75' onChange={(e) => setNews2(e.target.value)}/><br />
                <input type="text" value={News3}  placeholder="Enter the newes" autoComplete="off" name="email" className='form-control rounded-0 w-75' onChange={(e) => setNews3(e.target.value)}/>
                <br/> 
                <button className='btn btn-info border w-5 bgcoll rounded-5 text-white text-uppercase' type='submit' onClick={handleSubmit}><h4>Post</h4></button>
              
                </form><br />
                </div><button onClick={() => { navigate("/Adminipage"); } } className='btn btn-info border w-15 bgcoll text-white rounded-3 border border-danger mb-3'>Back</button>
          </div></div></main></>
  )
}

export default NewsFeed
