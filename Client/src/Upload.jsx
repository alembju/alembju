import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DateRangePickerComp from './components/DateRangePickerComp.jsx'
import DatePicker from "react-datepicker"
import './App.css'
import axios from 'axios'
import Dowenload from './Dowenload.jsx'
import Header from './Header.jsx'
import { pdfjs } from "react-pdf";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useRef} from 'react';
import useAuth from './hooks/useAuth';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Upload() {
  const [coverage, setcoverage] = useState()
  const [email, setEmail] = useState()
  const [orgname, setorgname] = useState()
  const [title, settitle] = useState()
  const [principal, setprincipal] = useState()
  const [phone, setphone] = useState()
  const [dsharing , setDsharing] = useState();
  const [availability , setavailability] = useState();
  const [raw , setraw] = useState()
 const[date,setdate] =useState()
  const[gender,setgender] = useState()
  const[type, settype] =useState()
  const[cleaned, setcleaned] = useState()
  const[url, seturl] = useState()
  const[comments,setcomments] =useState()
  const [Title, setTitle] = useState("");
  const [file, setFile] = useState("");
  const[BGDate,setBGDate]=useState(new Date())
  const[LDate,setLDate] =useState(new Date()) 
  const [visited, setvisited] = useState("");
  const [Treatment, setTreatment] = useState("");
   
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
const [allImage, setAllImage] = useState(null);
const [titles, setTitles] = useState("");




useEffect(() => {
  getPdf();
}, []);
const getPdf = async () => {
  const result = await axios.get("http://localhost:3000/get-upload");
  console.log(result.data.data);
  setAllImage(result.data.data);
};

const submitImage = async (e) => {
  e.preventDefault();
 
  const formData = new FormData();
  formData.append("orgname", orgname);
  formData.append("title", title);
  formData.append("principal", principal);
  formData.append("phone", phone);
  formData.append("dsharing", dsharing);
  formData.append("availability", availability);
  formData.append("coverage", coverage);
  formData.append("BGDate", BGDate);
  formData.append("LDate", LDate);
  formData.append("gender", gender);
  formData.append("type", type);
  formData.append("raw", raw);
  formData.append("cleaned", cleaned);
  formData.append("url", url);
  formData.append("comments", comments);
  formData.append("email", email);
  formData.append("Title", Title);
  formData.append("file", file);
  console.log(titles, file);

  const result = await axios.post(
    "http://localhost:3000/upload",
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
setcoverage('')
setEmail('')
setorgname('')
settitle('')
setprincipal('')
setphone('')
setDsharing('')
setavailability('')
setraw('')
setdate('')
setgender('')
settype('')
setcleaned('')
seturl('')
setcomments('')
setTitle('')
setFile('')
setBGDate('')
setLDate('')
setvisited('')
setTreatment('')

}

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
   
    console.log(Title,Title)
    axios.post('http://localhost:3000/register',{orgname,title,principal,phone,dsharing,availability,raw,coverage,BGDate,LDate,gender,type,cleaned,url,comments,email,Title})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
  }
  


  return (
    <><div><Header /></div><div className='d-flex BgcolorAdmin justify-content-center align-items-center vh-100'>
      <div className='w-75 bg-white rounded p-3 border border-secondary-500'>

        <h2 className='border border-secondary bgcoll text-white text-center rounded '>Upload Data</h2>
       
        <form onSubmit={submitImage}>
          <table className=' table light padding border-secondary table-responsive'>
            <tr >
              <th> <div className='mb-2'>
                <h6><label htmlFor="email">Name of Organization</label>
                <input type="text" placeholder="Organization Name" autoComplete="off" name="email" value={orgname} className='form-control rounded-0'
                  onChange={(e) => setorgname(e.target.value)} /></h6>
              </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Project/Study/Report/Survey Title:</label>
                  <input type="text" placeholder="Project Name" autoComplete="off" name="email" value={title} className='form-control rounded-0'
                    onChange={(e) => settitle(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Name of Principal Investigator/Data Owner:</label>
                  <input type="text" placeholder="Principal Name" autoComplete="off" name="email" value={principal} className='form-control rounded-0'
                    onChange={(e) => setprincipal(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Phone Number of Principal Investigator</label>
                  <input type="number" placeholder="Enter Phone Number" autoComplete="off" name="email" value={phone} className='form-control rounded-0'
                    onChange={(e) => setphone(e.target.value)} /></h6>
                </div>
              </th>
           
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Data Sharing Access to Others:</label>
                  <select type="text" className='form-control rounded-0' value={dsharing} onChange={e => setDsharing(e.target.value)}>
                    <option value="" selected disabled >-- Select--</option>
                    <option value="Can Be Shared">Can Be Shared</option>
                    <option value="Can not Be Shared">Can not Be Shared</option>
                  </select></h6>
                </div>
              </th>
              </tr>
              <tr >
              <th>
                <div >
                <h6><label htmlFor="email">Document Availability(Proposal/Reports/Publications)</label><br></br>
                  <th><h6>Yes</h6><input type="radio" name='Treatment' value='Yes' onClick={ ()=>setvisited(true)} onChange={(e) =>setTreatment(e.target.value)} /> </th>
                  <th><h6>Not</h6><input type="radio" name='Treatment' value='No'onClick={ ()=>setvisited(false)} onChange={(e) => setTreatment(e.target.value)} /> </th>
                  </h6></div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Coverage Location:</label>
                  <select type="text" className='form-control rounded-0' value={coverage} onChange={e => setcoverage(e.target.value)}>
                    <option value="" selected disabled >-- Select--</option>
                    <option value="National">National</option>
                    <option value="Regional">Regional</option>
                    <option value="Zonal/Woreda">Zonal/Woreda</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
              </th>
              <th>
                <div className='mb-0 '>
                <h6><label htmlFor="email"> begining date</label><br></br>
                <DatePicker selected={BGDate} onChange={(date) => setBGDate(date)} 
                  dateFormat='dd/MM/yyyy'                    
                  maxDate={new Date()}
                  isClearable
                  showMonthDropdown
                  showYearDropdown
                  showIcon
                  className='form-control justify-center rounded-lg w-70 text-3x1'  
                 />
                 </h6>
                </div>
              </th>
              <th>
                <div className='mb-0 '>
                <h6><label htmlFor="email"> Last Date</label><br></br>
                <DatePicker selected={LDate} onChange={(date) => setLDate(date)} 
                 dateFormat='dd/MM/yyyy'                    
                 maxDate={new Date()}
                 isClearable
                    showMonthDropdown
                    showYearDropdown
                    showIcon
                    className='form-control justify-center rounded-lg w-70 text-3x1'  
                 />
                  </h6>
                </div>
              </th>
            
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Coverage Gender:</label>
                  <select type="text" className='form-control rounded-0' value={gender} onChange={e => setgender(e.target.value)}>
                    <option value="" selected disabled >-- Select--</option>
                    <option value="Male">Male</option>
                    <option value="Femal">Femal</option>
                    <option value="Both">Both</option>
                    <option value="Unspacified">Unspacified</option>
                  </select></h6>
                </div>
              </th>
              </tr>
            <tr>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Type of The Data:</label>
                  <select type="text" className='form-control rounded-0' value={type} onChange={e => settype(e.target.value)}>
                    <option value="" selected disabled >-- Select--</option>
                    <option value="Qualitative">Qualitative</option>
                    <option value="Quntitative">Quntitative</option>
                    <option value="Mixed">Mixed</option>
                  </select></h6>
                </div>
              </th>

              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Raw Data Format:</label>
                  <select type="text" className='form-control rounded-0' value={raw} onChange={e => setraw(e.target.value)}>
                    <option value="" selected disabled >-- Select--</option>
                    <option value="Cspro">Cspro</option>
                    <option value="ODK">ODK</option>
                    <option value="Excell">Excell</option>
                    <option value="SPSS">SPSS</option>
                    <option value="STATA">STATA</option>
                    <option value="EPI-info">EPI-info</option>
                    <option value="Epi-Data">Epi-Data</option>
                    <option value="RedCap">RedCap</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Cleaned Data Format:</label>
                  <select type="text" className='form-control rounded-0' value={cleaned} onChange={e => setcleaned(e.target.value)}>
                    <option value="" selected disabled >-- Select--</option>
                    <option value="Cspro">Cspro</option>
                    <option value="Excell">Excell</option>
                    <option value="SPSS">SPSS</option>
                    <option value="STATA">STATA</option>
                    <option value="EPI-info">EPI-info</option>
                    <option value="Epi-Data">Epi-Data</option>
                    <option value="RedCap">RedCap</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
              </th>
            

              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">URL or Link (if published):</label>
                  <input type="text" placeholder="Enter URL or Link" autoComplete="off" name="email" value={url} className='form-control rounded-0'
                    onChange={(e) => seturl(e.target.value)} /></h6>
                </div>
              </th>

              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Comments:</label>
                  <input type="text-box" placeholder="Enter any Comments ?" autoComplete="off" name="email" value={comments} className='form-control rounded-0'
                    onChange={(e) => setcomments(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
            <tr>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Email:</label>
                  <input type="text" placeholder="Principal Name" autoComplete="off" name="email" value={email} className='form-control rounded-0'
                    onChange={(e) => setEmail(e.target.value)} /></h6>
                </div>
              </th>

              <th>
              <div className='mb-2'>
              <h6><input
                  type="text"
                  className="form-control"
                  placeholder="Title" value={Title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                /></h6></div>
                </th>
                <th>
                <div >
                <h6> <label htmlFor="email"> Cleaned Data Format</label></h6>
                <input
                  type="file"
                  class="form-control"
                  accept="application/pdf"
                  name='ResearchP' 
                   multiple={true}
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                   />
                </div>
              </th>
                  
              
            </tr>
          </table>
          <button className='btn btn-info border w-15 bgcoll rounded-5 text-white' onClick={submitImage}>Submit</button>
        </form>
      </div>
    </div></>
  

  )
}

export default Upload
