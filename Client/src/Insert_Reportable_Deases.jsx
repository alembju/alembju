import React from 'react'
import './App.css'
import axios from 'axios'
import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

function Insert_Reportable_Deases() {

   
  const [NUniversity, setNUniversity] = useState()
  const [Deases,setDeases] = useState([])
  const [TyReport, setTyReport] = useState()
  const [TyChart, setTyChart] = useState("--SubCities--")
  const [EPIWeek, setEPIWeek] = useState()
  
 
 
  
   
  //function handleFile(event){
    //if(!file){
        //console.log("no file selected");
       // return;
   // }
   // const fd = new FormData();
    //fd.append('file', file);
    //setFile(event.target.file[1])
    //sconsole.log(event.target.file[0])
//}
///function handleUpload(){
  //const formData = new FormData()
  //formData.append('file' , file)
  //fetch(
    //'url',
   // {
      //  method: "POST",
       // body: formData
   // }
  //).then((Response) => Response.json()).then((result) => {
   // console.log('success' , result)
 // })
  //.catch(error => {
  //  console.error("error", error)
 // })
//}  
//onSubmit={handleUpload}
//onChange={handleFile}
//


/////////////////////////////////////


  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/RT-Deases',{Deases,TyReport,TyChart,EPIWeek})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
  }
  

  return (
    <main className='main-container '> <div className='d-flex bg-primary justify-content-center align-items-center vh-100 '>
      <div className='w-55 bg-white rounded p-3 ' >
        <form onSubmit={handleSubmit} className='border border-danger rounded'>
          <table className=' table light padding '>
            <tr>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Reportable Deases</strong></label>
                  <input type="text" placeholder="Reportable Deases" autoComplete="off" name="Reportable Deases" className='form-control rounded-0'
                    onChange={(e) => setDeases(e.target.value)} />
                </div>
              </th>
                </tr>
                <tr>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Type Of Report</strong></label>
                  <input type="text" placeholder="Type Of Report" autoComplete="off" name="Type Of Report" className='form-control rounded-0'
                    onChange={(e) => setTyReport(e.target.value)} />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Type of Chart </strong></label>
                  <input type="text" placeholder="Type of Chart" autoComplete="off" name="Type of Graph" className='form-control rounded-0'
                    onChange={(e) => setTyChart(e.target.value)} />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>EPI Week </strong></label>
                  <input type="number" placeholder="EPI Week" autoComplete="off" name="EPI Week" className='form-control rounded-0'
                    onChange={(e) => setEPIWeek(e.target.value)} />
                </div>
              </th>
              
            </tr>
            
          </table>
          
          <button className='btn btn-default border w-15 bg-primary rounded-3 text-decoration-none' onClick={handleSubmit}><h5>SUBMIT</h5></button>
          <button className='btn btn-default border w-15 bg-primary rounded-3 text-decoration-none' ><h5>CANCEL</h5></button>
        </form>
       
      </div>
    </div>
  </main>

   
  )
}

export default Insert_Reportable_Deases