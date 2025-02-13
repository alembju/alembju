import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'

import DatePicker from "react-datepicker"
import './App.css'
import axios from 'axios'
import Dowenload from './Dowenload.jsx'
import Header from './Header.jsx'
import { Alert } from 'bootstrap'
import { pdfjs } from "react-pdf";
import PhoneInput from 'react-phone-number-input'
import PdfComp from "./PdfComp.jsx";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function DataCollectionP() {
  const [Name, setName] = useState("")
  const[PhonePI,setPhonePI] = useState("")
  const [email, setEmail] = useState("")
  const [title, setTitle] = useState("");
  const [NUniversity, setNUniversity] = useState("")
  const [DataC, setDataC] = useState("")
  const [StudyA1, setStudyA1] = useState("")
  const [NameContactP1, setNameContactP1] = useState("");
  const [CPhone1, setCPhone1] = useState("")
  const [AdditionalDC, setAdditionalDC] = useState("")
  const [StudyA2, setStudyA2] = useState("")
  const [NameContactP2, setNameContactP2] = useState("");
  const [CPhone2, setCPhone2] = useState("")
  const [DStart, setDStart] = useState(new Date())
  const [DTermination, setDTermination] = useState(new Date())

  const [allImage, setAllImage] = useState(null);

  const [Visiblee, setVisiblee] = useState("")
  const [Visible, setVisible] = useState("")
  
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:3000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitDataCollectionP = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    //formData.append("title", title);
    formData.append("Name", Name);
    formData.append("PhonePI", PhonePI);
    formData.append("email", email);
    formData.append("title", title);
    formData.append("NUniversity", NUniversity);
    formData.append("DataC", DataC);
    formData.append("StudyA1", StudyA1);
    formData.append("NameContactP1", NameContactP1);
    formData.append("CPhone1", CPhone1);
    formData.append("AdditionalDC", AdditionalDC);
    formData.append("StudyA2", StudyA2);
    formData.append("NameContactP2", NameContactP2);
    formData.append("CPhone2", CPhone2);
    formData.append("DStart", DStart);
    formData.append("DTermination", DTermination);
 

    const result = await axios.post(
      "http://localhost:3000/DataCollectionP",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    console.log(result);
    if (result.data.status == "ok") {
      alert("Uploaded Successfully!!!");
      getPdf();
    }
  setName('')
setPhonePI('')
setEmail('')
setTitle('')
setNUniversity('')
setDataC('')
setStudyA1('')
setNameContactP1('')
setCPhone1('')
setAdditionalDC('')
setStudyA2('')
setNameContactP2('')
setCPhone2('')
setDStart('')
setDTermination('')
setAllImage('')
setVisiblee('')
setVisible('')
  };
 
  
   
  


/////////////////////////////////////
const Upload= (event) => {
  event.preventDefault(); 
  const formData = new FormData()
  formData.append('IRB' , file)
  axios.post('http://localhost:3000/IRupload',formData)
  .then(res =>console.log(res))
  .catch(er=>console.log(er))
  alert('Upload File successful')
}   

  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/IRBUpload',{NUniversity,Name,email,phone})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
  }
  

  return (
    <><div className='main-container'><div className='d-flex BgcolorDashBord justify-content-center align-items-center vh-100 mb-2'>
      <div className='w-75 bg-white rounded p-2 ' >

        <h2 className='border border-secondary bgcoll text-white rounded text-center'>Data collection progress notification form</h2>
        <form  onSubmit={submitDataCollectionP} className='formStyle border border-danger rounded bg-white'>
          <table className=' table light padding '>
            <tr>
            <th>
                <div className='mb-2'>
                  <label htmlFor="email">Name of PI</label>
                  <input type="text" placeholder="Name" autoComplete="off" name="email" value={Name} className='form-control rounded-0'
                    onChange={(e) => setName(e.target.value)} />
                </div>
              </th>
              <th>
              <h6><label htmlFor="email">Phone number of PI</label>
              <PhoneInput
                  placeholder="Enter phone number"
                  value={PhonePI}
                  onChange={setPhonePI}/></h6>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email">Email Address of PI</label>
                  <input type="Email" placeholderEmail="Email" autoComplete="off" name="Email" value={email} className='form-control rounded-0'
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
              </th>
             
              <th>
                <div className='mb-2'>
                  <label htmlFor="email">Title of the research | project</label>
                  <input type="text" placeholder="Title" autoComplete="off" name="email" value={title} className='form-control rounded-0'
                    onChange={(e) => setTitle(e.target.value)} />
                </div>
              </th>
              </tr>
              <tr>
            <th>
                <div className='mb-0'>
                  <label htmlFor="email">Name of College | University</label>
                  <select type="text" className='form-control rounded-0 w-50' value={NUniversity} onChange={(e) => setNUniversity(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
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
                <h6><label htmlFor="email"> data collection site?</label></h6><br></br>
                  <th className='p-1'><h6>Yes</h6><input type="radio" name='sample' value='Yes'onClick={ ()=>setVisiblee(true)} onChange={(e) => setDataC(e.target.value)} /> </th>
                  <th className='p-1'><h6>No</h6><input type="radio" name='sample' value='No'onClick={ ()=>setVisiblee(false)} onChange={(e) => setDataC(e.target.value)} /> </th>
                </div>
                <tr className='row  w-50'>
                { Visiblee &&
                <><th className='col'>
                    <div className='mb-2'>
                      <label htmlFor="email">Study Area (1) </label>
                      <input type="text" placeholder="Study" autoComplete="off" name="email" value={StudyA1} className='form-control rounded-0'
                        onChange={(e) => setStudyA1(e.target.value)} />
                    </div>
                  </th>
                
                  
                  <th>
                    <div className='mb-2'>
                      <label htmlFor="email">Name of contact person in the study area during data collection (1) </label>
                      <input type="text" placeholder="person" autoComplete="off" name="email" value={NameContactP1} className='form-control rounded-0'
                        onChange={(e) => setNameContactP1(e.target.value)} />
                    </div>
                  </th>
                  <th>
                   <h6><label htmlFor="email">Phone number of contact person (1)</label>
                      <PhoneInput
                      placeholder="Enter phone number"
                      value={CPhone1}
                      onChange={setCPhone1}/></h6>
                    </th>
                 </>
                    }
                    </tr >                 
                    </th>
                    
                    <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Do you have Additional data collection site?</label></h6><br></br>
                  <th className='p-1'><h6>Yes</h6><input type="radio" name='Additional' value='Yes'onClick={ ()=>setVisible(true)} onChange={(e) => setAdditionalDC(e.target.value)} /> </th>
                  <th className='p-1'><h6>No</h6><input type="radio" name='Additional' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setAdditionalDC(e.target.value)} /> </th>
                </div>
                <tr className='row   w-50'>
                { Visible &&
                <><th className='col'>
                <div className='mb-2'>
                  <label htmlFor="email">Study Area (2) </label>
                  <input type="text" placeholder="Study" autoComplete="off" name="email" value={StudyA2} className='form-control rounded-0'
                    onChange={(e) => setStudyA2(e.target.value)} />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email">Name of contact person in the study area during data collection (1) </label>
                  <input type="text" placeholder="person" autoComplete="off" name="email" value={NameContactP2} className='form-control rounded-0'
                    onChange={(e) => setNameContactP2(e.target.value)} />
                </div>
              </th>
             
              <th>
          <h6><label htmlFor="email">Phone number of contact person (2)</label>
          <PhoneInput
              placeholder="Enter phone number"
              value={CPhone2}
              onChange={setCPhone2}/></h6>
            </th>
             </>
                }
                </tr>
             </th>
                <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Data collection start date</label><br></br>
                  <DatePicker selected={DStart} onChange={(date) => setDStart(date)} 
                  dateFormat='dd/MM/yyyy'                    
                  maxDate={new Date()}
                  isClearable
                  showMonthDropdown
                  showYearDropdown
                  showIcon
                  className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                </div>
              </th>
              </tr>
                    <tr>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Data collection completion or termination date</label><br></br>
                  <DatePicker selected={DTermination} onChange={(date) => setDTermination(date)} 
                  dateFormat='dd/mm/yyyy'
                 maxDateDate={new Date()}
                 isClearable
                  showMonthDropdown
                  showYearDropdown
                  showIcon
                  className='form-control justify-center rounded-lg w-70 text-3x1'  
                  /></h6>
                   
                </div>
              </th> 
              <th>
              
              </th> 
            </tr>
          </table>
          <button className='btn btn-info border w-15 bgcoll text-white rounded-3 bgcoll ' onClick={submitDataCollectionP}><h5>UPLOAD</h5></button> 
          </form>
      </div>
    </div></div></>
  

  )
}

export default DataCollectionP
