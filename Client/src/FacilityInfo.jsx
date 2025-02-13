import React from 'react'
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useEffect, useState } from "react";
import back from './Image/back.png'
import delet from './Image/delet.png'
import { useRef } from "react";
import { Link } from 'react-router-dom'

function FacilityInfo() {
  const[HRegion,setHRegion] = useState()
  const[HSubCity,setHSubCity] = useState()
  const[HWoreda,setHWoreda] = useState()
  const[HFName,setHFName] = useState()
  const[records,setrecords] =useState([])
  const[Data,setdata]= useState([])
  const [HFTName,setHFTName]=useState("")
  const [RHFTName,setRHFTName]=useState("")
  
 
  useEffect(() => {
    axios.get("http://localhost:3000/Facility-info")
    .then(res => {
     setdata(res.data)
     setrecords(res.data);
    })
    .catch(err => console.log(err));
   }, [])

   const Fname = (event) => {
    setrecords(Data.filter(f => f.HFName .toLowerCase().startsWith(event.target.value)))
  }

  
  const navigate = useNavigate()

  ////////////////////////////////////////////////////////
  const handleSubmite = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/Add-Facility',{HRegion,HSubCity,HWoreda,HFName})
    .then(result =>{console.log(result) 
    window.location.reload()})
    .catch(err => console.log(err))
    alert('Health Facility added sucesfully')
    setHRegion('')
    setHSubCity('')
    setHWoreda('')
    setHFName('')
  }
///////////////////////////AEFI selection option from mongo/////////////RepDesease
const currentPage=useRef();
const [values,setValues]=useState([])


 useEffect(()=>{
  fetch("http://localhost:3000/AEFIDesease")
  .then((data)=>data.json())
  .then((val)=>setValues(val))
},[])

console.log(values,"AEFI file is sent")

  useEffect(() => {
    currentPage.current=1;
    //getPdf();
    
  }, []);
  ///////////////////////////meseles selection option from mongo/////////////RepDesease
const meselesPage=useRef();
const [meseles,setmeseles]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/RepDesease")
  .then((data)=>data.json())
  .then((val)=>setmeseles(val))
},[])
console.log(meseles,"setmeseles file is sent")
  useEffect(() => {
    meselesPage.current=1;
    //getPdf();
    
  }, []);

  ///////////////////////////Cholera selection option from mongo/////////////RepDesease
const CholeraPage=useRef();
const [Cholera,setCholera]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/CholeraDesease")
  .then((data)=>data.json())
  .then((val)=>setCholera(val))
},[])
console.log(Cholera,"Cholera file is sent")
  useEffect(() => {
    CholeraPage.current=1;
    //getPdf();
    
  }, []);  
  ///////////////////////////Meningits selection option from mongo/////////////RepDesease
const MeningitsPage=useRef();
const [Meningits,setMeningits]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/Meningits")
  .then((data)=>data.json())
  .then((val)=>setMeningits(val))
},[])
console.log(Meningits,"Meningits file is sent")
  useEffect(() => {
    MeningitsPage.current=1;
    //getPdf();
    
  }, []);   
  ///////////////////////////Maternal selection option from mongo/////////////RepDesease
const MaternalPage=useRef();
const [Maternal,setMaternal]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/GeteMaternal")
  .then((data)=>data.json())
  .then((val)=>setMaternal(val))
},[])
console.log(Maternal,"Maternal file is sent")
  useEffect(() => {
    MaternalPage.current=1;
    //getPdf();
    
  }, []);   

  ///////////////////////////Rabies selection option from mongo/////////////RepDesease
const RabiesPage=useRef();
const [Rabies,setRabies]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/GeteRabies")
  .then((data)=>data.json())
  .then((val)=>setRabies(val))
},[])
console.log(Rabies,"Rabies file is sent")
  useEffect(() => {
    RabiesPage.current=1;
    //getPdf();
    
  }, []);   
  
   ///////////////////////////Malaria selection option from mongo/////////////RepDesease
const MalariaPage=useRef();
const [Malaria,setMalaria]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/GeteMalaria")
  .then((data)=>data.json())
  .then((val)=>setMalaria(val))
},[])
console.log(Malaria,"Malaria file is sent")
  useEffect(() => {
    MalariaPage.current=1;
    //getPdf();
    
  }, []);   

  
   ///////////////////////////Prenatal selection option from mongo/////////////RepDesease
const PrenatalPage=useRef();
const [Prenatal,setPrenatal]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/GetePrenatalDeath")
  .then((data)=>data.json())
  .then((val)=>setPrenatal(val))
},[])
console.log(Prenatal,"Prenatal file is sent")
  useEffect(() => {
    PrenatalPage.current=1;
    //getPdf();
    
  }, []);   
///////////////////////////Fistula selection option from mongo/////////////RepDesease
const FistulaPage=useRef();
const [Fistula,setFistula]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/GeteFistula")
  .then((data)=>data.json())
  .then((val)=>setFistula(val))
},[])
console.log(Fistula,"Fistula file is sent")
  useEffect(() => {
    FistulaPage.current=1;
    //getPdf();
    
  }, []);   
  ///////////////////////////Polio selection option from mongo/////////////RepDesease
const PolioPage=useRef();
const [Polio,setPolio]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/GetePolio")
  .then((data)=>data.json())
  .then((val)=>setPolio(val))
},[])
console.log(Polio,"Polio file is sent")
  useEffect(() => {
    PolioPage.current=1;
    //getPdf();
    
  }, []);  

  ///////////////////////////RelapsingFever selection option from mongo/////////////RepDesease
const RelapsingFeverPage=useRef();
const [RelapsingFever,setRelapsingFever]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/GetRelapsingFever")
  .then((data)=>data.json())
  .then((val)=>setRelapsingFever(val))
},[])
console.log(RelapsingFever,"RelapsingFever file is sent")
  useEffect(() => {
    RelapsingFeverPage.current=1;
    //getPdf();
    
  }, []);  

 ///////////////////////////YellowFever selection option from mongo/////////////RepDesease
 const YellowFeverPage=useRef();
 const [YellowFever,setYellowFever]=useState()
 
  useEffect(()=>{
   fetch("http://localhost:3000/GetYellowFever")
   .then((data)=>data.json())
   .then((val)=>setYellowFever(val))
 },[])
 console.log(YellowFever,"YellowFever file is sent")
   useEffect(() => {
     YellowFeverPage.current=1;
     //getPdf();
     
   }, []);  
 ///////////////////////////////////////////////delatHealth Facility//////////////
 const Delet = (id,EVENTS1) => {
  if (window.confirm(`Are you sure you want to delete ${EVENTS1}`)) {
  axios.delete('http://localhost:3000/deletHF/'+id)
  .then(res => {console.log(res)
  window.location.reload()})
  .then(errr => console.log(errr))
}
}
////////////////////////////////////////end/////////////
//const navigate = useNavigate();

    const goBack = () => navigate(-1);


  return (
    <><div className='row  border border-secondary'><div className='col w-50 bg-white rounded p-5 mb-5 '>
      <button onClick={goBack} ><img src={back} alt='' class=" border border-secondary-100 rounded-3" width="40" height="30" float='right' /></button>
      <h4 className='border border-secondary bgcoll text-white text-center rounded '>+ New health Facility </h4>
      <form onSubmit={handleSubmite} className='border border-secondary-100 rounded'>
        <table className=' table light padding '>
          <tr>
            <tr>

              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Region | ጤና ተቋሙ የሚገኝበት ክልል</strong></label>
                  <input type="text" placeholder="Region..." autoComplete="off" name="Region.." readOnly value={HRegion} className='form-control rounded-0'
                    onChange={(e) => setHRegion(e.target.value)} />
                </div>
              </th>

            </tr>
            <tr>

              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Name of Sub City | ጤና ተቋሙ የሚገኝበት ክ/ከተማ</strong></label>
                  <input type="text" placeholder="Sub City.." autoComplete="off" name="Sub City" readOnly value={HSubCity} className='form-control rounded-0'
                    onChange={(e) => setHSubCity(e.target.value)} />
                </div>
              </th>

            </tr>
            <tr>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong> Name of Woreda | ጤና ተቋሙ የሚገኝበት ወረዳ </strong></label>
                  <input type="text" placeholder="Woreda..." autoComplete="off" name="Woreda" readOnly value={HWoreda} className='form-control rounded-0'
                    onChange={(e) => setHWoreda(e.target.value)} />
                </div>
              </th>
            </tr>
            <tr>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong> Health Facility Name | የጤና ተቋሙ ስም </strong></label>
                  <input type="text" placeholder="Facility Name.." autoComplete="off" name="Facility Name" value={HFName} className='form-control rounded-0'
                    onChange={(e) => setHFName(e.target.value)} />
                </div>
              </th>
            </tr>
          </tr>


        </table>
        <button className='btn btn-info border w-10 bgcoll text-white rounded-3 border border-danger mb-3' onClick={handleSubmite}>Post</button>

      </form>
    </div>


      <div className='col w-50 bg-white rounded p-5 mb-5 border border-secondary-100'>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>List of health Facility </h4>
        <div><ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button bgcoll text-white mb-3 w-50"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Export Data to Excel Sheet" />

          <input
            className="form-controll border border-danger w-50 "
            type='text'
            placeholder="Filter by Health facility name ..."
            onChange={Fname} /></div>

        <div className='Scrol-Table'>
          <table className=' table light padding ' id="table-to-xls">
            <thead className='text-sm-left '>
              <tr>
                <th>
                  <h6>Health Facility List</h6>
                </th>
              </tr>
            </thead>
            <tbody>
              {records && records.map((filer, index) => {
                return <tr key={index}>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><button type="Dlet" className='login-btn border  text-white' onClick={() => Delet(filer._id)}><img src={delet} alt='' class=" border border-secondary-100 rounded-3" width="20" height="20" float='right' /></button></th>
                  <th><Link to={`/Update/${filer._id}`} className="btn btn-sm btn-success me-2">Edit</Link></th>
                </tr>;
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div><div className=' w-100 bg-white rounded p-5 mb-5 border border-secondary-100'>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>New health Facility From Facility</h4>

        <table className=' table light padding '>
          <tr>
            <th>
              <label><h6>AEFI New health Facility</h6></label>
              <select
                id="HName"
                placeholder="select Facility name"
                value={HFTName}
                required
                onChange={(e) => setHFName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {values == null
                  ? ""
                  : values.map((opts, i) => { return <option key={i}>{opts.HFTName}</option>; })}
              </select>
            </th>

            <th>
              <label><h6>Meseles New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={HFTName}
                required
                onChange={(e) => setHFName(e.target.value)} className='form-control rounded-2 w-70'>
                    <option value="" selected disabled>-- Select--</option>
                {meseles == null
                  ? ""
                  : meseles.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>

            <th>
              <label><h6>Cholera New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={HFTName}
                required
                onChange={(e) => setHFName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {Cholera == null
                  ? ""
                  : Cholera.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>
         
            <th>
              <label><h6>Meningits New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={HFTName}
                required
                onChange={(e) => setHFName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {Meningits == null
                  ? ""
                  : Meningits.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>

            <th>
              <label><h6>Maternal New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={HFTName}
                required
                onChange={(e) => setHFName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {Maternal == null
                  ? ""
                  : Maternal.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>

            <th>
              <label><h6>Rabies New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={RHFTName}
                required
                onChange={(e) => setRHFTName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {Rabies == null
                  ? ""
                  : Rabies.map((pt, j) => { return <option key={j}>{pt.RHFTName}</option>; })}
              </select>
            </th>
          </tr>
          <tr>
            <th>
              <label><h6>Malaria New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={RHFTName}
                required
                onChange={(e) => setHFTName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {Malaria == null
                  ? ""
                  : Malaria.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>
            <th>
              <label><h6>Prenatal New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={RHFTName}
                required
                onChange={(e) => setHFTName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {Prenatal == null
                  ? ""
                  : Prenatal.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>
            <th>
              <label><h6>Fistula New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={RHFTName}
                required
                onChange={(e) => setHFTName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {Fistula == null
                  ? ""
                  : Fistula.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>

         
            <th>
              <label><h6>Polio New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={RHFTName}
                required
                onChange={(e) => setHFTName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {Polio == null
                  ? ""
                  : Polio.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>

            <th>
              <label><h6>RelapsingFever New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={RHFTName}
                required
                onChange={(e) => setHFTName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {RelapsingFever == null
                  ? ""
                  : RelapsingFever.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>
            <th>
              <label><h6>YellowFever New health Facility</h6></label>
              <select

                placeholder="select Facility name"
                value={RHFTName}
                required
                onChange={(e) => setHFTName(e.target.value)} className='form-control rounded-2 w-70'>
                <option value="" selected disabled>-- Select--</option>
                {YellowFever == null
                  ? ""
                  : YellowFever.map((pt, j) => { return <option key={j}>{pt.HFTName}</option>; })}
              </select>
            </th>

          </tr>
        </table>
      </div></>
 
  )
}

export default FacilityInfo