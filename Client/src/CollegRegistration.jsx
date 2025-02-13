import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DateRangePickerComp from './components/DateRangePickerComp.jsx'
import DatePicker from "react-datepicker"
import './App.css'
import axios from 'axios'
import Dowenload from './Dowenload.jsx'
import Header from './Header.jsx'


function CollegRegistration() {
  const [NCollege, setNCollege] = useState()
  const [informationF, setinformationF] = useState()
  const [Name, setName] = useState()
  const [Educational , setEducational] = useState();
  const [Specialization, setSpecialization] = useState()
  const [email, setEmail] = useState()
  const [phone, setphone] = useState()
  const [Advisory , setAdvisory] = useState();
 
 
  
   
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
const Upload= () => {
  const formData = new FormData()
  formData.append("Title", title)
  formData.append('file' , file)
  console.log(Title,Title)
  axios.post('http://localhost:3000/upload',formData)
  .then(res =>console.log(res))
  .catch(er=>console.log(er))

  
}

  const handleSubmit = (e) =>{
    e.preventDefault();
   
   
    axios.post('http://localhost:3000/CoRegistration',{NCollege,informationF,Name,Educational,Specialization,email,phone,Advisory})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
  }
  


  return (
    <><div></div><div className='d-flex bg-primary justify-content-center align-items-center vh-100'>
      <div className='w-55 bg-white rounded p-3'>

        <h2 className='border border-secondary bgcoll text-white rounded text-center'>Health Science Higher Institutions IRB Information </h2>
        <p className="forgot-password text-right">
            <a href="/Sighnup">+ Student</a>
          </p>
        <form onSubmit={handleSubmit}>
          <table className=' table light padding border border-secondary'>
            <tr>
            <th>
                <div className='mb-0'>
                  <label htmlFor="email"><strong>Name of College | University:</strong></label>
                  <select type="text" className='form-control rounded-0 w-50' onChange={(e) => setNCollege(e.target.value)}>
                    <option value=" አዲስ አበባ ሜዲካልና ቢዝነስ ኮሌጅ"> አዲስ አበባ ሜዲካልና ቢዝነስ ኮሌጅ</option>
                    <option value="አፍሪካ ሜዲካል ኮሌጅ">አፍሪካ ሜዲካል ኮሌጅ</option>
                    <option value="ኪያ  ሜድ ሜዲካል ኮሌጅ">ኪያ ሜድ ሜዲካል ኮሌጅ</option>
                    <option value="አየር ጤና ጤና ሳይንስ ኮሌጅ ">አየር ጤና ጤና ሳይንስ ኮሌጅ </option>
                    <option value="አትላስ ኮሌጅ">አትላስ ኮሌጅ</option>
                    <option value="አዲስ ኮንቲኔንታል ጤና ሳይንስ ኮሌጅ">አዲስ ኮንቲኔንታል ጤና ሳይንስ ኮሌጅ</option>
                    <option value="ሪፍትቫሊ ዩኒቨርስቲ Epi-Data">ሪፍትቫሊ ዩኒቨርስቲ </option>
                    <option value="ቤቴል ሜዲካል ኮሌጅ  ">ቤቴል ሜዲካል ኮሌጅ </option>
                    <option value="ሳንቴ ሜዲካል ኮሌጅ ">ሳንቴ ሜዲካል ኮሌጅ </option>
                    <option value="ቅድስት ልደታ የጤና ሳይንስ ኮሌጅ">ቅድስት ልደታ የጤና ሳይንስ ኮሌጅ</option>
                    <option value="ትሮፒካል ኮሌጅ ኦፍ ሜዲስን">ትሮፒካል ኮሌጅ ኦፍ ሜዲስን</option>
                    <option value="ዩኒቨርሳል ሜዲካል ኮሌጅ">ዩኒቨርሳል ሜዲካል ኮሌጅ</option>
                    <option value=" ሰቨን ስታር ጤና ሳይንስ ኮሌጅ "> ሰቨን ስታር ጤና ሳይንስ ኮሌጅ </option>
                    <option value="አልካን ሜዲካል ኮሌጅ ">አልካን ሜዲካል ኮሌጅ </option>
                    <option value="ጋምቢ የህክምናና ቢዝነስ ኮሌጅ">ጋምቢ የህክምናና ቢዝነስ ኮሌጅ </option>
                    <option value="ሃያት ሚዲካል ኮሌጅ ">ሃያት ሚዲካል ኮሌጅ </option>
                    <option value="ሎርካን ሚዲካል ኮሌጅ ">ሎርካን ሚዲካል ኮሌጅ </option>
                    <option value="ያኔት ኮሌጅ ">ያኔት ኮሌጅ </option>
                    <option value="ሚዩንግ ሳንግ ሜዲካል ኮሌጅ">ሚዩንግ ሳንግ ሜዲካል ኮሌጅ</option>
                    <option value="ኖርዴክ ሜዲካል ሴንተር ሃየር ለርኒንግ ኢንስቲትዩት">ኖርዴክ ሜዲካል ሴንተር ሃየር ለርኒንግ ኢንስቲትዩት</option>
                    <option value="ኢኮስታ ከፍተኛ ትምህርት ኢንስቲትዩት">ኢኮስታ ከፍተኛ ትምህርት ኢንስቲትዩት</option>
                    </select>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Which information would you prefer to fill ?</strong></label><br></br>
                 <th>Institutional Review Board <input type="radio" name='information' value='Institutional Review Board' onChange={e => setinformationF(e.target.value)} /> </th>
                  <th>Advisor or Co - Advisor<input type="radio" name='information' value='Advisor or Co - Advisor' onChange={e => setinformationF(e.target.value)} /> </th>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Full name of advisor</strong></label>
                  <input type="text" placeholder="Name" autoComplete="off" name="email" className='form-control rounded-0'
                    onChange={(e) => setName(e.target.value)} />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Educational status</strong></label>
                  <select type="text" className='form-control rounded-0' onChange={e => setEducational(e.target.value)}>
                    <option value="Degree">Degree</option>
                    <option value="Masters">Masters</option>
                    <option value="Degree">PHD</option>
                    <option value="Masters">Ass. Professor</option>
                    <option value="Degree">Professor</option>
                  </select>
                </div>
                </th>
                </tr>
                <tr>
                <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Field of specialization </strong></label>
                  <input type="text" placeholder="specialization" autoComplete="off" name="email" className='form-control rounded-0 w-50'
                    onChange={(e) => setSpecialization(e.target.value)} />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Email:</strong></label>
                  <input type="email" placeholder="email" autoComplete="off" name="email" className='form-control rounded-0 w-50'
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Phone Number </strong></label>
                  <input type="number" placeholder="Enter Phone Number" autoComplete="off" name="email" className='form-control rounded-0'
                    onChange={(e) => setphone(e.target.value)} />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Advisory status</strong></label><br></br>
                  <th>Main advisor<input type="radio" name='Educational' value='Main advisor' onChange={e => setAdvisory(e.target.value)} /> </th>
                  <th>Co-advisor<input type="radio" name='Educational' value='Co-advisor' onChange={e => setAdvisory(e.target.value)} /> </th>

                </div>
              </th>
              
            </tr>
            
          </table>
          <button className='btn btn-info border w-90 bgcoll text-white rounded-5 bgcoll' onClick={handleSubmit}><h5>Submit</h5></button>
          <button className='btn btn-info border w-90 bgcoll text-white rounded-5 bgcoll'><h5>Cancel</h5></button>
        </form>

      </div>
    </div></>
  

  )
}

export default CollegRegistration
