import { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import DateRangePickerComp from '../components/DateRangePickerComp.jsx'
import DatePicker from "react-datepicker"
import '../App.css'
import axios from 'axios'
import Dowenload from '../Dowenload.jsx'
import Header from '../Header.jsx'
import { Alert } from 'bootstrap'
import { pdfjs } from "react-pdf";
import PdfComp from "../PdfComp.jsx";
import { useNavigate, useParams } from "react-router-dom";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function IRBUpload() {
  const [title, setTitle] = useState("");
  const [NUniversity, setNUniversity] = useState("")
  const[file,setfile] = useState("")
  const [Name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setphone] = useState("")
  const [allImage, setAllImage] = useState(null);
    const navigate = useNavigate()
  
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:3000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    //formData.append("title", title);
    formData.append("NUniversity", NUniversity);
    formData.append("Name", Name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:3000/IRBUpload",
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
    <><div className='main-container'><div></div><div className='d-flex bg-primary justify-content-center align-items-center vh-100 '>
      <div className='w-55 bg-white rounded p-3 ' >

        <h2 className='border border-secondary bgcoll text-white rounded text-center'>Health Science Higher Institutions IRB Information </h2>
        <button onClick={() => {navigate("/SignUp")}} className='btn btn-info border w-15 bgcoll text-white rounded-3 border border-danger mb-3'>+ Add Student</button><br></br> 
        <form  onSubmit={submitImage} className='formStyle border border-danger rounded bg-light'>
          <table className=' table light padding '>
            <tr>
            
            <th>
              
                <div className='mb-0'>
                  <label htmlFor="email"><strong>Name of College | University:</strong></label>
                  <select type="text" className='form-control rounded-0 w-50' onChange={(e) => setNUniversity(e.target.value)}>
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
                  <label htmlFor="email"><strong>Full name of Uploader</strong></label>
                  <input type="text" placeholder="Name" autoComplete="off" name="email" className='form-control rounded-0'
                    onChange={(e) => setName(e.target.value)} />
                </div>
              </th>
                </tr>
                <tr>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Email Address of Uploader:</strong></label>
                  <input type="email" placeholder="email" autoComplete="off" name="email" className='form-control rounded-0'
                    onChange={(e) => setEmail(e.target.value)} />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>Phone Number of Uploader: </strong></label>
                  <input type="number" placeholder="Enter Phone Number" autoComplete="off" name="email" className='form-control rounded-0'
                    onChange={(e) => setphone(e.target.value)} />
                </div>
              </th>
             </tr>
              <tr>
              <th>
              <div >
                  <label htmlFor="email"><strong>Choose a file to be uploaded </strong></label><br></br>
                  <input type='file' name='IRB' className='w-50 ' onChange={(e) => setfile(e.target.files[0])} multiple/>
                  <button className='btn btn-info border w-15 bgcoll text-white rounded-3 bgcoll ' onClick={submitImage}><h5>UPLOAD</h5></button>
                  </div></th></tr>
       
          </table>
          </form>
      </div>
    </div></div></>
  

  )
}

export default IRBUpload
