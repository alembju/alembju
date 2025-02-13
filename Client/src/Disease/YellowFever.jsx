import { useEffect, useState } from 'react'
//import '../Client/bootstrap/dist/css/bootstrap.min.css'
//import DateRangePickerComp from '../components/DateRangePickerComp.jsx'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
//import './App.css'
import '../Admin_Component/Navbar.css'
import { useRef } from "react";
import axios from 'axios'
import { pdfjs } from "react-pdf";
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
//import Dowenload from './Dowenload.jsx'
import Header from '../Header.jsx'
import MultiSelect from  'react-multiple-select-dropdown-lite'
import  'react-multiple-select-dropdown-lite/dist/index.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function YellowFever() {
    




  const [YMRN, setYMRN] = useState()
  const [YPatient, setYPatient]=useState("");
  const [YName, setYName] = useState("")
  const [YPRegion, setYPRegion] = useState("")
  const [YTRegion, setYTRegion] = useState("")
  const [YPSubCity, setYPSubCity] = useState("")
  const [YPWoreda, setYPWoreda] = useState("")
  const [YpTWoreda, setYpTWoreda] = useState("")
  const [YHouse,setYHouse] =useState("")
  const [YKebele, setYKebele] = useState("");
  const [YAge, setYAge]=useState()
  const [YSex, setYSex] = useState("")
  const [YPPhone, setYPPhone] = useState("");

  const [HFName, setHFName]=useState(new Date());
  const [HFTName,setHFTName]=useState()
  const [YSpecifyF,setYSpecifyF]=useState("")
  const [HRegion,setHRegion] = useState("")
  const [HTRegion, setHTRegion] = useState("")
  const [HSubCity,setHSubCity]=useState("")
  const [THSubCity,setTHSubCity]=useState("")
  const [HWoreda,setHWoreda]=useState("")
  const [HFTworeda,setHFTworeda]=useState("")
  const [YDReceived,setYDReceived]=useState(new Date())
  const [YCondition,setYCondition]=useState("")
  const [YDSeen,setYDSeen]=useState(new Date())
  const [YDOnset,setYDOnset]=useState(new Date())
  const [Ysymptoms,setYsymptoms]=useState("")
  const [YSpecimen,setYSpecimen]=useState("")
  const [YTSpecimen,setYTSpecimen]=useState(new Date())
  const [YResult,setYResult]=useState("")
  const [YOutcome,setYOutcome]=useState("")
  const [YComments,setYComments] =useState("")
  const [YFCName,setYFCName]=useState("")
  const [YPhone,setYPhone]=useState("")

  
  
  const [file , setfile] = useState("");
  
///////////////////////////////////////////////////////////
  const [visible, setVisible]=useState(false);
  const [visite,setevisit]=useState(false)
  const [visiblee, setVisiblee]=useState(false);

  const [visited,setvisited]=useState(false)
  const [HNumber , setHNumber] = useState("");
  const [visit,setvisit]=useState(false)
  const [TTspecimen,setTTspecimen] = useState("")
  const [Labresults,setLabresults]=useState("")
  const [Nmeasles,setNmeasles]=useState("")
  const [TNmeasles, setTNmeasles] = useState(new Date())
  const [visibleIso, setVisibleIso]=useState(false);
  const [Isolated,setIsolated]=useState("")
  const [visibles, setVisibles]=useState(false);
  const [vitaminA,setvitaminA]=useState("")
  const [visiting,setvisiting]=useState(false)
  const [Complication,setComplication]=useState("")
  const [AdmitedHF,setAdmitedHF]=useState("")
  const [Tcomplications,setTcomplications] = useState("")
  const [Pfactors,setPfactors]=useState("")
  const [WPfactors,setWPfactors]=useState("")
  const [CRFP,setCRFP] = useState("")
  const [DateSR, setDateSR] = useState(new Date())
  const[PNeonat,setPNeonat] = useState("")
  const [email, setEmail] = useState("")
 
 //const[date,setdate] =useState()
  //const [sampleTaken,setsampleTaken]=useState()
  //const [lastLvaccination,setlastLvaccination]=useState()
 // const [Tcomplication,setTcomplication]=useState()
  //const[DCleaned,setDCleaned]=useState()
  const [currLocation, setCurrLocation] = useState({});
  const [CurrLocationJs, setCurrLocationJs] = useState({});
//show or hide selection box//
  const [showhide, setShowhide]=useState('');
  const [allImage, setAllImage] = useState(null);

 

  const [ EPIWeek, setEPIWeek] = useState("");
  const EPI_Week = [
    
    {Week: 'Week-1'},{Week:'Week-2'},{Week:'Week-3'},{Week:'Week-4'},{Week:'Week-5'},{Week:'Week-6'},{Week:'Week-7'},{Week:'Week-8'},{Week:'Week-9'},{Week:'Week-10'},{Week:'Week-11'},{Week:'Week-12'},{Week:'Week-13'},{Week:'Week-14'},{Week:'Week-15'},{Week:'Week-16'},{Week:'Week-17'},{Week:'Week-18'},{Week:'Week-19'},{Week:'Week-20'},{Week:'Week-21'},{Week:'Week-22'},{Week:'Week-23'},{Week:'Week-24'},{Week:'Week-25'},{Week:'Week-26'},{Week:'Week-27'},{Week:'Week-28'},{Week:'Week-29'},{Week:'Week-30'},{Week:'Week-31'},{Week:'Week-32'},{Week:'Week-33'},{Week:'Week-34'},{Week:'Week-35'},{Week:'Week-36'},{Week:'Week-37'},{Week:'Week-38'},{Week:'Week-39'},{Week:'Week-40'},{Week:'Week-41'},{Week:'Week-42'},{Week:'Week-43'},{Week:'Week-44'},{Week:'Week-45'},{Week:'Week-46'},{Week:'Week-47'},{Week:'Week-48'},{Week:'Week-49'},{Week:'Week-50'},{Week:'Week-51'},{Week:'Week-52'}
    
  ]

  const [ SubCitie, setSubCitie] = useState("--SubCities--");
  const [ Woredas, setWoredas] = useState("--Woreda--");
  const [ HFs, setHFs] = useState("--Health Facility--");
  const [ Woreda, setWoreda] = useState([]);
  const [ HF, setHF] = useState([]);


  const changeSubcity= (event) =>{
    setSubCitie(event.target.value);
    setWoreda(Sub_Cities.find(Ctr => Ctr.name === event.target.value).Woreda);

  }
  const changeWoreda= (event) =>{
    setWoredas(event.target.value);
    setHF(Woreda.find(Woredas => Woredas.name === event.target.value).HF);

  }
   
   
  

  
  //radiobuton //

  //dropdowen//
  const handleshowhide=(event)=>{
    const getuser = event.target.value;    
    setShowhide(getuser);

  }
  //GPS//
  useEffect(() => {
    getLocation();
    getLocationJs();
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location.data);
  };

  const getLocationJs = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrLocationJs({ latitude, longitude });
    });
  };

function  multiply (){
var Hight = document.getElementById("Hight").value;
var Weight = document.getElementById("Weight").value;
var BMI = parseFloat(Weight)/parseFloat(Hight);
document.getElementById("BMI").value=BMI;

}
  
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
const [SamColl, setSamColl] = useState("");
const [title, setTitle] = useState("");
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
  formData.append("YMRN", YMRN);
  formData.append("YPatient", YPatient);
  formData.append("YName", YName);
  formData.append("YPRegion", YPRegion);
  formData.append("YTRegion", YTRegion);
  formData.append("YPSubCity", YPSubCity);
  formData.append("YPWoreda", YPWoreda);
  formData.append("YpTWoreda", YpTWoreda);
  formData.append("YHouse", YHouse);
  formData.append("YKebele", YKebele);
  formData.append("YAge", YAge);
  formData.append("YSex", YSex);
  formData.append("YPPhone", YPPhone);
  
  formData.append("HFName", HFName);
  formData.append("HFTName", HFTName);
  formData.append("YSpecifyF", YSpecifyF);
  formData.append("HRegion", HRegion);
  formData.append("HTRegion", HTRegion);
  formData.append("HSubCity", HSubCity);
  formData.append("THSubCity", THSubCity);
  formData.append("HWoreda", HWoreda);
  formData.append("HFTworeda", HFTworeda);
  formData.append("YDReceived", YDReceived);
  formData.append("YCondition", YCondition);
  formData.append("YDSeen", YDSeen);
  formData.append("YDOnset", YDOnset);
  formData.append("Ysymptoms", Ysymptoms);
  formData.append("YSpecimen", YSpecimen);
  formData.append("YTSpecimen", YTSpecimen);
  formData.append("YResult", YResult);
  formData.append("YOutcome", YOutcome);
  formData.append("YComments", YComments);
  formData.append("YFCName", YFCName);
  
  formData.append("EPIWeek", EPIWeek);
  formData.append("file", file);
  console.log(title, file);

  const result = await axios.post(
    "http://localhost:3000/YellowFever",
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
  setYMRN('')
setYPatient('')
setYName('')
setYPRegion('')
setYTRegion('')
setYPSubCity('')
setYPWoreda('')
setYpTWoreda('')
setYHouse('')
setYKebele('')
setYAge('')
setYSex('')
setYPPhone('')
setHFName('')
setHFTName('')
setYSpecifyF('')
setHRegion('')
setHTRegion('')
setHSubCity('')
setTHSubCity('')
setHWoreda('')
setHFTworeda('')
setYDReceived('')
setYCondition('')
setYDSeen('')
setYDOnset('')
setYsymptoms('')
setYSpecimen('')
setYTSpecimen('')
setYResult('')
setYOutcome('')
setYComments('')
setYFCName('')
setYPhone('')
setfile('')
setVisible('')
setevisit('')
setVisiblee('')
};


const Upload= (event) => {
  event.preventDefault();
  const formData = new FormData()
  formData.append('Measle' , file)
  axios.post('http://localhost:3000/MeaslesFile',formData)
  .then(res =>console.log(res))
  .catch(er=>console.log(er))
  alert('Upload File successful')

  
}
  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/Measles',{startDate,Latitude,Longitude,visible,Sex,Age,HNumber,PWoreda,pTWoreda,PSubCity,PRegion,WRegion,BDate,pname,visit,Eschool,SName,Hfacility,visite,PType,Weight,Hight,BMI,MUAC,PPhone,HRegion,HTRegion,HSubCity,HWoreda,HFTworeda,HFName,HFTName,NotifiedDate,OnsetDate,Orash,MNumber,Vdate,Aepidemics,visited,Treatment,TTreatment,visiblee,Dspeciemen,DspeciemenS,Tspecimen,TTspecimen,sample,TypeC,Labresults,SMeasles,Nmeasles,TNmeasles,visibleIso,Isolated,visibles,vitaminA,visiting,Complication,AdmitedHF,Tcomplications,Pfactors,WPfactors,DateSR,FCName,Phone,PNeonat,Outcome,email,EPIWeek})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
  }
  
///////////////////////////selection option from mongo/////////////
const currentPage=useRef();
const [values,setValues]=useState([])
const [options,setOptions]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/Facility-info")
  .then((data)=>data.json())
  .then((val)=>setValues(val))
},[])

console.log(values,"Cholera file is sent")

  useEffect(() => {
    currentPage.current=1;
    //getPdf();
    
  }, []);
  
  //////////////////////////////////////////multiple selection////////////////////////
  
  const  handleOnchange  =  val  => {
    setYsymptoms(val)
  }

  const  optionstest  = [
    { label:  'Fever', value:  'Fever'  },
    { label:  'Headache', value:  'Headache'  },
    { label:  'Jaundice', value:  'Jaundice'  },
    { label:  'Vomiting', value:  'Vomiting'  },
    { label:  'Bleeding', value:  'Bleeding'  },
  ]


  return (
    <>
    <div className=' bgcoll    main-containers  '>
    
      <form onSubmit={submitImage}>
      <div class='row'>
        <div className=' col bg-light rounded border border-danger vh-1 text-dark p-1'>
          <h4 className='border border-secondary bgcoll text-white rounded text-center'>Yellow fever patient information</h4>
          <table className='Scrol-Table Scrol-Table table light padding table-responsive'>
        <tr className='border border-secondary'>
        <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">MRN</label>
                  <input type="Text" placeholder="MRN" autoComplete="off" name="MRN" value={YMRN} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setYMRN(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">Patient Category</label><br></br>
                 <th className='p-1'><h6> Inpatient</h6> <input type="radio" name='Immunization' value='Inpatient'onClick={ ()=>setVisible(true)} onChange={(e) => setYPatient(e.target.value)} /></th>
                 <th className='p-1'><h6>Outpatient</h6><input type="radio" name='Immunization' value='Outpatient'onClick={ ()=>setVisible(false)} onChange={(e) => setYPatient(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email"> Name of patient</label>
                  <input type="text" placeholder="Name" autoComplete="off" name="Zone" value={YName} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setYName(e.target.value)} /></h6>
                </div>
              </th>
        <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Patient Residency Region</label>
                  <select type="text" className='form-control rounded-2 w-70' value={YPRegion} onChange={(e)=>(handleshowhide(e), setYPRegion(e.target.value))}>
                  <option value="" disabled>-- Select-- </option>
                    <option defaultValue="Addis Ababa">Addis Ababa</option>
                    <option value="Oromya">Oromya</option>
                    <option value="Dire Dawa"> Dire Dawa</option>
                    <option value="Afar Region">Afar Region</option>
                    <option value="Amhara Region">Amhara Region</option>
                    <option value="Benishangul-Gumuz Region">Benishangul-Gumuz Region</option>
                    <option value="Gambela Region">Gambela Region</option>
                    <option value="Harari Region">Harari Region</option>
                    <option value="Sidama Region">Sidama Region</option>
                    <option value="Somali Region">Somali Region</option>
                    <option value="South Ethiopia Regional State">South Ethiopia Regional State</option>
                    <option value="South West Ethiopia Peoples' Region">South West Ethiopia Peoples' Region</option>
                    <option value="Tigray Region">Tigray Region</option>
                    <option value="1">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='1' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Residency Region</label>
                  <input type="text" placeholder="Name of Region" autoComplete="off" name="Name of Region" value={YTRegion} className='form-control rounded-2 w-70'
                    onChange={(e) => setYTRegion(e.target.value)} /></h6>
                    </div>
                  )}           
              </th> </tr>
              <tr className='border border-secondary'>

              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient Residency Sub City</label>
                  <select type="text" className='form-control rounded-2 w-70' value={YPSubCity} onChange={(e)=> setYPSubCity(e.target.value)}>
                  <option value="" disabled>-- Select-- </option>
                    <option value="Akaki Sub City">Akaki Sub City</option>
                    <option value="Addis Ketema Sub city">Addis Ketema Sub city</option>
                    <option value="Arada Sub city">Arada Sub city</option>
                    <option value="Bole sub city">Bole sub city</option>
                    <option value="Gulele Sub city">Gulele Sub city</option>
                    <option value="kirkos sub city">kirkos sub city</option>
                    <option value="kolife keranio sub city">kolife keranio sub city</option>
                    <option value="Other">Nifas silik lafto sub city</option>
                    <option value="Nifas silik lafto sub city">lemi kura sub city</option>
                    <option value="lideta sub city">lideta sub city</option>
                    <option value="yeka sub city">yeka sub city</option>
                    
                  </select></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient Residency Woreda</label>
                  <select type="text" className='form-control rounded-3 w-70' value={YPWoreda} onChange={(e)=>(handleshowhide(e),setYPWoreda(e.target.value))}  >
                  <option value="" disabled>-- Select-- </option>
                    <option value="woreda 01">woreda 01</option>
                    <option value="woreda 02">woreda 02</option>
                    <option value="woreda 03">woreda 03</option>
                    <option value="woreda 04">woreda 04</option>
                    <option value="woreda 05">woreda 05</option>
                    <option value="woreda 06">woreda 06</option>
                    <option value="woreda 07">woreda 07</option>
                    <option value="woreda 08">woreda 08</option>
                    <option value="woreda 09">woreda 09</option>
                    <option value="woreda 10">woreda 10</option>
                    <option value="woreda 11">woreda 11</option>
                    <option value="woreda 12">woreda 12</option>
                    <option value="woreda 13">woreda 13</option>
                    <option value="woreda 14">woreda 14</option>
                    <option value="woreda 15">woreda 15</option>
                    <option value="2">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='2' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Name of Woreda</label></h6>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Name of Woreda" value={YpTWoreda} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setYpTWoreda(e.target.value)} />
                    </div>
                  )}           

              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">House Number</label>
                  <input type="text" placeholder="House Number" autoComplete="off" name="Ketena" value={YHouse} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setYHouse(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email">Kebele | Ketena</label>
                  <input type="text" placeholder="Ketena" autoComplete="off" name="Ketena" value={YKebele} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setYKebele(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
               <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Age </label>
                  <input type="Decimal" placeholder="Age" autoComplete="off" name="Age" value={YAge} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setYAge(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Sex </label><br></br>
                 <th className='p-1'><h6> Male</h6> <input type="radio" name='Sex' value='Male'onClick={ ()=>setVisiblee(true)} onChange={(e) => setYSex(e.target.value)} /></th>
                 <th className='p-1'><h6>Female</h6><input type="radio" name='Sex' value='Female'onClick={ ()=>setVisiblee(false)} onChange={(e) => setYSex(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              <th>
              <h6><label htmlFor="email"> Phone number of patient</label>
              <PhoneInput
                  placeholder="Enter phone number"
                  value={YPPhone}
                  onChange={setYPPhone}/></h6>
                
              </th>
              
              </tr>
              </table>
        </div>
        <div className='col-md-6 bg-light rounded p-0 border border-danger text-dark p-1 '>
          <h4 className='border border-secondary  rounded bgcoll text-white text-center'>Yellow fever Health Facility information</h4>
          <table className='border border-secondary Scrol-Table Scrol-Table table light padding table-responsive'>
            <tr>
            
              <th>
              <div>
            <label><h5>Reporting Health Facility Name | የጤና ተቋሙ ስም</h5></label>
            <select 
             id="HName"
             placeholder="select the title"
             value={HFName}
             required
            onChange={(e)=>(handleshowhide(e), setHFName(e.target.value))} className='form-control rounded-2 w-50'>
                <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HFName}</option>})
                }
                <option value="3">Other</option>
            </select>
            
            </div>
                {
                  showhide==='3' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Specify if name of health facility is not listed</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={HFTName} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setHFTName(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
                
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Specify name of health facility </label>
                  <input type="text" placeholder="name of health" autoComplete="off" name="name of health" value={YSpecifyF} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setYSpecifyF(e.target.value)} /></h6>
                </div>
              </th>
             
              <th>
                
            <div>
            <label><h5>Region | ጤና ተቋሙ የሚገኝበት ክልል</h5></label>
            <select 
             id="Region"
             placeholder="select the Region"
             value={HRegion}
             required
            onChange={(e)=>(handleshowhide(e), setHRegion(e.target.value))} className='form-control rounded-2 w-50'>
                <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HRegion}</option>})
                }
                <option value="4">Other</option>
            </select>
            </div>
                {
                  showhide==='4' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Region</label>
                  <input type="text" placeholder=" Region.." autoComplete="off"  name="Facility Name" value={HTRegion} className='form-control rounded-0 w-50'
                    onChange={(e) => setHTRegion(e.target.value)} /></h6>
                    </div>
                  )}           
              
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div>
                        <label><h5> Name of Sub City | ጤና ተቋሙ የሚገኝበት ክ/ከተማ</h5></label>
                        <select 
                        id="Sub City"
                        placeholder="select the Sub City"
                        value={HSubCity}
                        required
                        onChange={(e)=>(handleshowhide(e), setHSubCity(e.target.value))} className='form-control rounded-2 w-50'>
                            <option value="" selected disabled >-- Select--</option>
                            {
                                values.map((opts,i)=>{return <option key={i}>{opts.HSubCity}</option>})
                            }
                            <option value="5">Other</option>
                        </select>
                        </div>
                {
                  showhide==='5' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Sub-City</label>
                  <input type="text" placeholder=" Sub-City.." autoComplete="off"  name="Facility Name" value={THSubCity} className='form-control rounded-0 w-50'
                    onChange={(e) => setTHSubCity(e.target.value)} /></h6>
                    </div>
                  )}           
                
              </th>
              <th>
              <div>
            <label><h5> Name of Woreda | ጤና ተቋሙ የሚገኝበት ወረዳ</h5></label>
            <select 
             id="Woreda"
             placeholder="select Woreda"
             value={HWoreda}
             required
            onChange={(e)=>(handleshowhide(e), setHWoreda(e.target.value))} className='form-control rounded-2 w-50'>
                <option value="" selected disabled >-- Select--</option>
                {
                    values.map((opts,i)=>{return <option key={i}>{opts.HWoreda}</option>})
                }
                <option value="6">Other</option>
            </select>
            </div>
                
                {
                  showhide==='6' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Write Health Facility Woreda if not listed</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={HFTworeda} className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setHFTworeda(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
             
              <th>
                <div className='mb-2 p-4'>
                <h6> <label htmlFor="email">Date received at health facility</label><br></br>
                  <DatePicker selected={YDReceived} onChange={(date) => setYDReceived(date)} 
                     dateFormat='dd/mm/yyyy'                    
                    minDateDate={new Date()}
                    isClearable
                    showYearDropdown
                    showMonthDropdown
                    showIcon
                    className='form-control justify-center rounded-lg w-80 text-3x1'
                        
                  /></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
            <th>
            <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Disease/Condition</label>
                  <input type="text" placeholder="Name of Woreda" autoComplete="off" name="Facility Name" value={YCondition} className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setYCondition(e.target.value)} /></h6>
                    </div>
              </th>

            </tr>
          </table>
        </div>
        <div className=' col w-5 bg-white rounded p-3 border border-danger h6 text-dark '>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Yellow fever Reporting Format</h4>
          <table className='Scrol-Table Scrol-Table table light padding table-responsive'>
            <tr className='border border-secondary'>
            <th>
                <div className='mb-2 p-4'>
                <h6> <label htmlFor="email">Date seen at health facility</label><br></br>
                  <DatePicker selected={YDSeen} onChange={(date) => setYDSeen(date)} 
                     dateFormat='dd/mm/yyyy'                    
                    minDateDate={new Date()}
                    isClearable
                    showYearDropdown
                    showMonthDropdown
                    showIcon
                    className='form-control justify-center rounded-lg w-80 text-3x1'
                  /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2 p-4'>
                <h6> <label htmlFor="email">Date of onset of disease</label><br></br>
                  <DatePicker selected={YDOnset} onChange={(date) => setYDOnset(date)} 
                     dateFormat='dd/mm/yyyy'                    
                    minDateDate={new Date()}
                    isClearable
                    showYearDropdown
                    showMonthDropdown
                    showIcon
                    className='form-control justify-center rounded-lg w-80 text-3x1'
                  /></h6>
                </div>
              </th>
              <th>
                <div className="app">
                <div  className="preview-values">
               <h6>Does the patient has developed either of the following symptoms</h6>
                {Ysymptoms}
                </div>
                <MultiSelect
                value={Ysymptoms}
                Searchable
                onChange={(e)=>(handleOnchange(e), setYsymptoms(e.target.value))}
                options={optionstest}
                className='form-control justify-center rounded-lg w-75 text-3x1'
                />
                </div>
                </th>
              
                <th>
                <div  className='form-check-inline'>
                  <h6>< label htmlFor="email">Specimen taken</label><br></br>
                 <th className='p-1'><h6> Yes</h6> <input type="radio" name='Specimen' value='Yes'onClick={ ()=>setevisit(true)} onChange={(e) => setYSpecimen(e.target.value)} /></th>
                 <th className='p-1'><h6>No</h6><input type="radio" name='Specimen' value='No'onClick={ ()=>setevisit(false)} onChange={(e) => setYSpecimen(e.target.value)} /></th>
                 </h6>
                </div>
                { visite &&
                  <div className='mb-2'>
                 <h6> <label htmlFor="email"> If yes, date sample collected</label><br></br>
                  <DatePicker selected={YTSpecimen} onChange={(date) => setYTSpecimen(date)} 
                     dateFormat='dd/mm/yyyy'                    
                    minDateDate={new Date()}
                    isClearable
                    showYearDropdown
                    showMonthDropdown
                    showIcon
                    className='form-control justify-center rounded-lg w-80 text-3x1'
                  /></h6>
                </div>
                    }
                    { visited &&
                  <div className='mb-2'>
                <h6><label htmlFor="email">Laboratory Result</label>
                  <select type="text" className='form-control rounded-2 w-75' value={YResult} onChange={(e)=> setYResult(e.target.value)}>
                  <option value="" disabled>-- Select-- </option>
                    <option value="Positive">Positive</option>
                    <option value="Negative">Negative</option>
                    <option value="Intermidate">Intermidate</option>
                    <option value="Pending">Pending</option>
                  </select></h6>
                </div>
                    }
              </th>
              <th>
              <div className='mb-2'>
                <h6><label htmlFor="email"> Patient Outcome</label>
                  <select type="text" className='form-control rounded-2 w-70' value={YOutcome} onChange={(e)=> setYOutcome(e.target.value)}>
                  <option value="" disabled>-- Select-- </option>
                    <option value="Alive">Alive</option>
                    <option value="Dead">Dead</option>
                    <option value="On follow-up">On follow-up</option>
                    <option value="Referred">Referred</option>
                  </select></h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary '>
              <th>
              <div >
              <h6><label htmlFor="email">Comments</label>
              <textarea
                id="Comments"
               value={YComments}
               required
                onChange={(e) => setYComments(e.target.value)} 
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Place a comment to The Proposal..."
              ></textarea>
                </h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">Name of officer completing the form:</label>
                  <input type="text" placeholder="Enter Phone Number" autoComplete="off" name="Phone Number" value={YFCName} className='form-control justify-center rounded-lg w-75 text-3x1'
                    onChange={(e) => setYFCName(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
              <h6><label htmlFor="email">Phone number of officer completing form:</label>
              <PhoneInput
                  placeholder="Enter phone number"
                  value={YPhone}
                  onChange={setYPhone}/></h6>
                
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">EPI_Week</label>
                  <select type="text" className='form-control justify-center rounded-lg w-75 text-3x1' value={EPIWeek} onChange={(e)=>setYEPIWeek(e.target.value)}>
                  <option value="" disabled>-- EPI_Week-- </option>
                    { EPI_Week .map(Ctr => (
                      <option value={Ctr.Week}>{Ctr.Week}</option>
                    ))}
                  </select></h6>
                </div>
              </th>
              <th>
              <div >
              <h6><label htmlFor="email">Take_a_photo</label><br />
                  <input type='file' name='file' accept="application/pdf" onChange={(e) => setfile(e.target.files[0])} required multiple/><br></br>
                  
                  </h6></div>
              </th>
            </tr>
          </table>
          <button className='btn btn-info border w-15  rounded-3 bgcoll text-white' onClick={submitImage}><h5>Submit</h5></button>
         
           </div>
           </div>    
            </form>
           </div>
      
  
    </>
  )
}

export default YellowFever     
