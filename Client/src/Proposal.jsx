import { useEffect, useState,useRef } from 'react'
//import '../Client/bootstrap/dist/css/bootstrap.min.css'
//import DateRangePickerComp from '../components/DateRangePickerComp.jsx'
//import './App.css'
import DatePicker from "react-datepicker"
import axios from 'axios'
//import Dowenload from './Dowenload.jsx'
import Header from './Header'
import Select from 'react-select'
import { pdfjs } from "react-pdf";
import './PopUp/ResponsivPopup.css'
import SimplePopup from './PopUp/SimplePopup'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function Proposal() {
  const [NCollege, setNCollege] = useState()
  const[Department,setDepartment] = useState()
  const[StudyF,setStudyF] = useState()
  const [Nadvisor, setNadvisor] = useState()
  const [email, setemail] = useState()
  const [phone, setphone] = useState()
  const [PI, setPI] = useState()
  const [PIPhone, setPIPhone] = useState()
  const [PIemail, setPIemail] = useState()
  const [Title, setTitle] = useState()
  const [FocusA, setFocusA] = useState()
  const [SPeriodB, setSPeriodB] = useState(new Date())
  const [SPeriodE, setSPeriodE] = useState(new Date())
  const [ConductS, setConductS] = useState()
  const [Rmethods, setRmethods] = useState()
  const [Study, setStudy] = useState()
  const [Design, setDesign] = useState()
  const [geographicA, setgeographicA] = useState()
  const [Slocation, setSlocation] = useState()
  const [Gender, setGender] = useState()
  const [populations , setpopulations] = useState();
  const [MicroD , setMicroD] = useState();
  const [Eelectronically , setEelectronically] = useState()
  const[Tools,setTools] =useState()
  const[Tcollection,setTcollection] = useState()
  const[Budget, setBudget] =useState()
  const[Geocoordinate, setGeocoordinate] = useState()
  const[Groups, setGroups] = useState()
  const[Dsharing,setDsharing] =useState()
  const[Reasons,setReasons] = useState()
  const[file, setfile] = useState([])

  const[show,setShow] = useState(false)

  
   
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


const[isCheked,setisCheked] = useState(false)
/*const options = [
  { value: 'Electronic files', label: 'Electronic files' },
  { value: 'CD-ROM', label: 'CD-ROM' },
  { value: 'Computer/Server/Websites', label: 'Computer/Server/Websites' },
  { value: 'Other', label: 'Other' }
]*/

 const handleCheckboxChange = () =>{
  setisCheked(!isCheked)
 }



/////multiple selection---------------
const[SelectedOption,setSelectedOption] = useState([])
const options = [
  { value: 'Electronic files', label: 'Electronic files' },
  { value: 'CD-ROM', label: 'CD-ROM' },
  { value: 'Computer/Server/Websites', label: 'Computer/Server/Websites' },
  { value: 'Other', label: 'Other' }
]

 const handleChanges= (SelectedOptions) =>{
  setSelectedOption(SelectedOptions)
 }

/////checkbox/////////////////////////////
const[First,setFirst]= useState()
 const[Second,setSecond] =useState()
 const[Therd,setTherd]= useState()
 const[Fourth,setFourth] =useState()
 

const handleChange= (data) => 
{
  if(data=='1'){
    if(First==true){
    console.log(data, 'Electronic files')
  }
  setFirst(!First)
}
if(data=='2')
{
  if(Second==true){
    console.log(data,'CD-ROM')
  }
  setSecond(!Second)
}
if(data=='3'){
  if(Therd==true){
  console.log(data, 'Computer/Server/Websites')
}
setTherd(!Therd)
}
if(data=='4')
{
if(Fourth==true){
  console.log(data,'Other')
}
setFourth(!Fourth)
}

}

const [allImage, setAllImage] = useState(null);
const [titles, setTitles] = useState("");
const userRef = useRef();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

   

    useEffect(() => {
        setErrMsg('');
    }, [NCollege, Department])

    
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
  formData.append("NCollege", NCollege);
  formData.append("Department", Department);
  formData.append("StudyF", StudyF);
  formData.append("Nadvisor", Nadvisor);
  formData.append("email", email);
  formData.append("phone", phone);
  formData.append("PI", PI);
  formData.append("PIPhone", PIPhone);
  formData.append("PIemail", PIemail);
  formData.append("Title", Title);
  formData.append("FocusA", FocusA);
  formData.append("SPeriodB", SPeriodB);
  formData.append("SPeriodE", SPeriodE);
  formData.append("ConductS", ConductS);
  formData.append("Rmethods", Rmethods);
  formData.append("Study", Study);
  formData.append("Design", Design);
  formData.append("geographicA", geographicA);
  formData.append("Slocation", Slocation);
  formData.append("Gender", Gender);
  formData.append("populations", populations);
  formData.append("MicroD", MicroD);
  formData.append("Eelectronically", Eelectronically);
  formData.append("Tools", Tools);
  formData.append("Tcollection", Tcollection);
  formData.append("Budget", Budget);
  formData.append("Geocoordinate", Geocoordinate);
  formData.append("Groups", Groups);
  formData.append("Dsharing", Dsharing);
  formData.append("Reasons", Reasons);
  formData.append("file", file);
  console.log(titles, file);
  try {
  const result = await axios.post(
    "http://localhost:3000/ResearchP",
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
} catch (err) {
  if (!err?.result) {
      setErrMsg('No Server Response');
  } else if (err.result?.status === 400) {
      setErrMsg('Missing Username or Password');
  } else if (err.result?.status === 401) {
      setErrMsg('Unauthorized');
  } else {
      setErrMsg('Login Failed');
  }
  errRef.current.focus();
}
setNCollege('')
setDepartment('')
setStudyF('')
setNadvisor('')
setemail('')
setphone('')
setPI('')
setPIPhone('')
setPIemail('')
setTitle('')
setFocusA('')
setSPeriodB('')
setSPeriodE('')
setConductS('')
setRmethods('')
setStudy('')
setDesign('')
setgeographicA('')
setSlocation('')
setGender('')
setpopulations('')
setMicroD('')
setEelectronically('')
setTools('')
setTcollection('')
setBudget('')
setGeocoordinate('')
setGroups('')
setDsharing('')
setReasons('')
setfile('')
};

  ///////////upload/////////////////
  const Upload= (e) => {
  e.preventDefault(); 
  const formData = new FormData()
 formData.append('Proposal' , file)
  //for (let i = 0; i<file.length; i++){
  //formData.append(`PROPOSAL[${i}]` , file[0])}
  axios.post('http://localhost:3000/ResearchP',formData)
  .then(res =>console.log(res))
  .catch(er=>console.log(er))
  
}

////////////////////
  const handleSubmit = (e) =>{
    e.preventDefault();
    //alert("todate"+Date+ "form date"+Date)
    //formData.append('file' , file)
    axios.post('http://localhost:3000/ResearchA',{NCollege,Department,StudyF,Nadvisor,email,phone,PI,PIPhone,PIemail,Title,FocusA,SPeriodB,SPeriodE,ConductS,Rmethods,Study,Design,geographicA,Slocation,Gender,populations,MicroD,Eelectronically,Tools,Tcollection,Budget,Geocoordinate,Groups,Dsharing,Reasons})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
  }
  


  return (
    <><div></div><div className='d-flex bg-primary justify-content-center align-items-center vh-25 '>
      <div className='w-85 bg-white rounded p-4 '>

        <h2 className='border border-secondary bgcoll text-white rounded text-center'>Student Proposal Submission Form</h2>
        <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">{errMsg}</p>
        <form onSubmit={submitImage}>
          <table className=' table light padding table-responsive border border-danger '>
            <tr>
            <th>
                <div className="wrapdiv">
                 <h6> <label htmlFor="email">Name of College | University:</label>
                  <select type="text" className='form-control rounded-0 w-75' value={NCollege}  onChange={(e) => setNCollege(e.target.value)}>
                   <option value="" selected disabled >-- Select--</option>
                    <option value=" አዲስ አበባ ሜዲካልና ቢዝነስ ኮሌጅ"> አዲስ አበባ ሜዲካልና ቢዝነ ስ ኮሌጅ</option>
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
                    </select></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email"> Department</label>
                  <select type="text" className='form-control rounded-0 w-75' value={Department} onChange={(e) => setDepartment(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Nursing">Nursing</option>
                    <option value="Health Officer">Health Officer</option>
                    <option value="Laboratory Technology">Laboratory Technology</option>
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Health Education">Health Education</option>
                    <option value="Environmental Health">Environmental Health</option>
                    <option value="Anesthesia">Anesthesia</option>
                    <option value="Health Informatics">Health Informatics</option>
                    <option value="General Public Health">General Public Health</option>
                    <option value="Human Nutrition">Human Nutrition</option>
                    <option value="Health Service Management">Health Service Management</option>
                    <option value="Accelerated Medicine">Accelerated Medicine</option>
                    <option value="Field Epidemiology">Field Epidemiology</option>
                    <option value="Biostatistics">Biostatistics</option>
                    <option value="Dental Medicine">Dental Medicine</option>
                    <option value="Medical Radiology">Medical Radiology</option>
                    <option value="Adult Health Nursing">Adult Health Nursing</option>
                    <option value="Other:">Other:</option>
                    
                  </select></h6>
                </div>
              </th>
              <th>
                <div >
                <h6> <label htmlFor="email">The study fulfillment For ?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={StudyF} onChange={(e) => setStudyF(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="PHD Degree">PHD Degree</option>
                    <option value="Masters Degree">Masters Degree</option>
                    <option value="Bachelors Degree">Bachelors Degree</option>
                    <option value="Project">Project</option>
                    <option value="Survey">Survey</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">Name of advisor</label>
                  <input type="text" placeholder="Project Name" autoComplete="off" name="email" value={Nadvisor} className='form-control rounded-0 w-75'
                    onChange={(e) => setNadvisor(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6> <label htmlFor="email">Email address of advisor</label>
                  <input type="email" placeholder="Email of advisor" autoComplete="off" name="email" value={PIemail} className='form-control rounded-0 w-75'
                    onChange={(e) => setPIemail(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">Phone number of advisor </label>
                  <input type="number" placeholder="Enter Phone Number" autoComplete="off" name="email" value={phone} className='form-control rounded-0 w-75'
                    onChange={(e) => setphone(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr>
              <th>
                <div >
                <h6> <label htmlFor="email">Principal Investigator(PI)?</label>
                  <input type="text" placeholder="Name of Principal" autoComplete="off" name="email" value={PI} className='form-control rounded-0 w-75'
                    onChange={(e) => setPI(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div >
                <h6><label htmlFor="email">PI/Co-PI Phone number </label>
                  <input type="number" placeholder="Enter Phone Number" autoComplete="off" name="email" value={PIPhone} className='form-control rounded-0 w-75'
                    onChange={(e) => setPIPhone(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">PI/Co-PI email address:</label>
                  <input type="email" placeholder="Principal email" autoComplete="off" name="email" value={email} className='form-control rounded-0 w-75'
                    onChange={(e) => setemail(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6> <label htmlFor="email">Study Title:</label>
                  <input type="text" placeholder="Study Title" autoComplete="off" name="email" value={Title} className='form-control rounded-0 w-75'
                    onChange={(e) => setTitle(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div>
                <h6><label htmlFor="email">health focus area ?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={FocusA} onChange={e => setFocusA(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Food and nutrition">Food and nutrition</option>
                    <option value="Communicable diseases">Communicable diseases</option>
                    <option value="Non-communicable diseases">Non-communicable diseases</option>
                    <option value="Reproductive, maternal, newborn, and child health">Reproductive, maternal, newborn, and child health</option>
                    <option value="Neglected tropical diseases">Neglected tropical diseases</option>
                    <option value="Water, Sanitation & Hygiene">Water, Sanitation & Hygiene</option>
                    <option value="Water, Sanitation & Hygiene">Water, Sanitation & Hygiene</option>
                    <option value="Mental health and well-being">Mental health and well-being</option>
                    <option value="Environmental and workplace health"> Environmental and workplace health</option>
                    <option value="Health service planning & management">Health service planning & management</option>
                    <option value="Digital health technology">Digital health technology</option>
                    <option value="Prevention and detection of diseases/PHEM">Prevention and detection of diseases/PHEM</option>
                    <option value="Health and Human Services/Health Workforce">Health and Human Services/Health Workforce</option>
                    <option value=" Disability & Rehabilitation"> Disability & Rehabilitation</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
              </th>
              
              <th>
                <div >
                <h6><label htmlFor="email"> Study Period Begins</label><br></br>
                  <DatePicker selected={SPeriodB} onChange={date => setSPeriodB(date)} 
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
                <div >
                <h6><label htmlFor="email"> Study Period ends </label><br></br>
                  <DatePicker selected={SPeriodE} onChange={date => setSPeriodE(date)} 
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
              <th>
                <div >
                <h6><label htmlFor="email">Conduct this study ?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={ConductS} onChange={(e) => setConductS(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                    <option value="Annual and biannual">Annual and biannual</option>
                    <option value="OtReal-time/Near real- time/Continuousher">Real-time/Near real- time/Continuous</option>
                    <option value="Static/Single implementation">Static/Single implementation</option>
                    <option value="Unknown/ No info">Unknown/ No info</option>
                  </select></h6>
                </div>
              </th>
              
              <th>
                <div className=' w-75'>
                 <h6> <label htmlFor="email">research methods/approaches ?</label><br></br>
                  <th className='p-1'><h6>Yes</h6><input type="radio" name='methods' value='yes' onChange={(e) => setRmethods(e.target.value)} /> </th>
                  <th className='p-1'><h6>NO</h6><input type="radio" name='methods' value='No' onChange={(e) => setRmethods(e.target.value)} /> </th></h6>
                </div>
              </th>
              
              <th>
                <div className=' w-75'>
                <h6><label htmlFor="email"> of the study </label>
                  <input type="number" placeholder="Enter Sample size" autoComplete="off" name="email" value={Study} className='form-control rounded-0 w-75'
                    onChange={(e) => setStudy(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6> <label htmlFor="email">study design ?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={Design} onChange={(e) => setDesign(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Case report or case seriesbr">Case report or case seriesbr</option>
                    <option value="Cross-sectional study / Prevalence study">Cross-sectional study / Prevalence study</option>
                    <option value="Case-control study">Case-control study</option>
                    <option value="Cohort study / Prospective observational study">Cohort study / Prospective observational study</option>
                    <option value="Experimental study design">Experimental study design</option>
                    <option value="Qualitative research design">Qualitative research design</option>
                    <option value="Mixed methods">Mixed methods</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
              </th>
            
              <th>
                <div className=' w-75'>
                <h6> <label htmlFor="email">geographic areas ?</label><br></br>
                  <th className='p-1'><h6>Yes</h6><input type="radio" name='geographic' value='yes' onChange={(e) => setgeographicA(e.target.value)} /> </th>
                  <th className='p-1'><h6>No</h6><input type="radio" name='geographic' value='No' onChange={(e) => setgeographicA(e.target.value)} /> </th>
                  </h6></div>
              </th>
              </tr>
              <tr>
              <th>
                <div >
                <h6><label htmlFor="email">Study area location specific site </label>
                  <input type="text" placeholder="Study area/location" autoComplete="off" name="email" value={Slocation} className='form-control rounded-0 w-75'
                    onChange={(e) => setSlocation(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className=' w-75'>
                 <h6> <label htmlFor="email">sex/gender ?</label><br></br> 
                  <th className='p-1'><h6>Yes</h6><input type="radio" name='sex' value='yes' onChange={(e) => setGender(e.target.value)} /> </th>
                  <th className='p-1'><h6>No</h6><input type="radio" name='sex' value='No' onChange={(e) => setGender(e.target.value)} /> </th></h6>
                </div>
              </th>
              
              <th>
                <div >
                <h6><label htmlFor="email">target groups/populations ?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={populations} onChange={(e) => setpopulations(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Persons, individuals, and patients">Persons, individuals, and patients</option>
                    <option value="Aggregate-level data/ Macrodata">Health care providers/Doctors, nurses, etc</option>
                    <option value="Households">Households</option>
                    <option value="Healthcare sites and systems/Hospitals, ambulatory care facilities, provider offices, etc.">Healthcare sites and systems/Hospitals, ambulatory care facilities, provider offices, etc.</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
                </th>
              
              
              <th>
                <div >
                <h6><label htmlFor="email">micro (Individual-level data) ?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={MicroD} onChange={(e) => setMicroD(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Individual-level data/Microdata">Individual-level data/Microdata</option>
                    <option value="Aggregate-level data/ Macrodata">Aggregate-level data/ Macrodata</option>
                    <option value="Aggregate-level data/ Macrodata">Aggregate-level data/ Macrodata</option>
                    <option value="Both">Both</option>
                    <option value="Unknown/ No information">Unknown/ No information</option>
                  </select></h6>
                </div>
                </th>
              <th>
                <div className=' w-75 '>
                  <h6><label htmlFor="email">data collected electronically ?</label><br></br>
                  <th className='p-1'><h6>Yes</h6><input type="radio" name='Document' value='yes' onChange={(e) => setEelectronically(e.target.value)} /></th>
                  <th className='p-1'><h6>No</h6><input type="radio" name='Document' value='No' onChange={(e) => setEelectronically(e.target.value)} /> </th></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">tools for data collection?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={Tools} onChange={(e) => setTools(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Self-administered questionnaires">Self-administered questionnaires</option>
                    <option value="Paper-based face-to-face interviews">Paper-based face-to-face interviews</option>
                    <option value="In-person paper survey">In-person paper survey</option>
                    <option value="Telephone-based interviews">Telephone-based interviews</option>
                    <option value="Direct examinations">Direct examinations</option>
                    <option value="Electronic data collection">Electronic data collection</option>
                    <option value="Record review">Record review</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
                </th>
                </tr>
              <tr >
                <th>
                <div >
                <h6><label htmlFor="email"> tools data collection?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={Tcollection} onChange={(e) => setTcollection(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Public/Government">Public/Government</option>
                    <option value="Private | Non-governmental | organizations (NGOs) | Foundations">Private | Non-governmental | organizations (NGOs) | Foundations</option>
                    <option value="Both public and private">Both public and private</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
                </th>
                
              <th>
                <div >
                <h6><label htmlFor="email">budget in ETB ?</label>
                  <input type="number" placeholder="How much budget" autoComplete="off" name="email" value={Budget} className='form-control rounded-0 w-75'
                    onChange={(e) => setBudget(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div >
                 <h6> <label htmlFor="email">geo-coordinate data alongside survey data? </label><br></br>
                  <th className='p-1'><h6>Yes</h6><input type="radio" name='geo-coordinate' value='yes' onChange={(e) => setGeocoordinate(e.target.value)} /> </th>
                  <th className='p-1'><h6>No</h6><input type="radio" name='geo-coordinate' value='No' onChange={(e) => setGeocoordinate(e.target.value)} /> </th></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">target groups/populations ?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={Groups} onChange={(e) => setGroups(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Microsoft Excel files: .xls or .xlsx">Microsoft Excel files: .xls or .xlsx</option>
                    <option value="Delimited files: csv, .tsv, .tab, or .txt.">Delimited files: csv, .tsv, .tab, or .txt.</option>
                    <option value="SPSS: .sav">SPSS: .sav</option>
                    <option value="Stata: .dta">Stata: .dta</option>
                    <option value="R: .r">R: .r</option>
                    <option value="SAS: .sas7bdat, .xpt">SAS: .sas7bdat, .xpt</option>
                    <option value="Atlas.ti">Atlas.ti</option>
                    <option value="Open code">Open code</option>
                    <option value="Stata: .dta">Nvivo</option>
                    <option value="Other">Other</option>
                  </select></h6>
                </div>
                </th>
              <th>
                <div >
                <h6> <label htmlFor="email">data accessible/access ?</label>
                  <select type="text" className='form-control rounded-0 w-75' value={Dsharing} onChange={(e) => setDsharing(e.target.value)}>
                  <option value="" selected disabled >-- Select--</option>
                    <option value="Open access">Open access</option>
                    <option value="Accessible upon request">Accessible upon request</option>
                    <option value="Accessible upon request">Not accessible</option>
                  </select></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">The reasons for not accessible?</label>
                  <input type="text" placeholder="How much budget" autoComplete="off" name="email" value={Reasons} className='form-control rounded-0 w-75'
                    onChange={(e) => setReasons(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr>
            
              <th>
                <div >
                <h6> <label htmlFor="email"> Attach your Proposal&  word document</label></h6>
                <input
                  type="file"
                  class="form-control"
                  accept="application/pdf"
                  name='ResearchP' 
                  //multiple={true}
                  required
                  onChange={(e) => setfile(e.target.files[0])}
                   />
                </div>
              </th>
              </tr>
          </table>
          <div><button className='btn btn-info border rounded-3 text-white bgcoll' onClick={submitImage}>Submit</button>
          <button className='btn btn-info border w-15  rounded-3 text-white bgcoll' onClick={()=>setShow(true)}><h5>Proposal Responed date</h5></button>
          {
            show?
            <SimplePopup close={setShow}/>:''
        }</div>
          </form>
      </div>
    </div></>
  

  )
}

export default Proposal
