import DatePicker from "react-datepicker"
import axios from 'axios'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import CommentSec from "./CommentSec";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
 
function ReviewReserchPaper() {
    const {id} = useParams()
    
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
  const[pdf, setfile] = useState([])

  const[show,setShow] = useState(false)

     
    useEffect(()=> {
        const fetchData = async() => {
            try {
                const response = await axios.get("http://localhost:3000/get/"+id);
                console.log(response);
                setNCollege(response.data.NCollege)
                setDepartment(response.data.Department)
                setStudyF(response.data.StudyF)
                setNadvisor(response.data.Nadvisor)
                setemail(response.data.email)
                setphone(response.data.phone)
                setPI(response.data.PI)
                setPIPhone(response.data.PIPhone)
                setPIemail(response.data.PIemail)
                setTitle(response.data.Title)
                setFocusA(response.data.FocusA)
                setSPeriodB(response.data.SPeriodB)
                setSPeriodE(response.data.SPeriodE)
                setConductS(response.data.ConductS)
                setRmethods(response.data.Rmethods)
                setStudy(response.data.Study)
                setDesign(response.data.Design)
                setgeographicA(response.data.geographicA)
                setSlocation(response.data.Slocation)
                setGender(response.data.Gender)
                setpopulations(response.data.populations)
                setMicroD(response.data.MicroD)
                setEelectronically(response.data.Eelectronically)
                setTools(response.data.Tools)
                setTcollection(response.data.Tcollection)
                setBudget(response.data.Budget)
                setGeocoordinate(response.data.Geocoordinate)
                setGroups(response.data.Groups)
                setDsharing(response.data.Dsharing)
                setReasons(response.data.Reasons)
                setfile(response.data.pdf)
            } catch(err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])
     
    const navigate = useNavigate()
 
    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/update/'+id, {NCollege,Department,StudyF,Nadvisor,email,phone,PI,PIPhone,PIemail,Title,FocusA,SPeriodB,SPeriodE,ConductS,Rmethods,Study,Design,geographicA,Slocation,Gender,populations,MicroD,Eelectronically,Tools,Tcollection,Budget,Geocoordinate,Groups,Dsharing,Reasons, pdf})
        .then(res => {
            console.log(res);
            navigate('/')
        })
        .catch(err => console.log(err))
    }
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:3000/get-Proposal");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", Title);
    formData.append("file", file);
    console.log(Title, file);

    const result = await axios.post(
      "http://localhost:3000/upload-files",
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
  const showPdf = (pdf) => {
     window.open(`http://localhost:3000/ReserchProposal/${pdf}`, "_blank", "noreferrer");
    setPdfFile(`http://localhost:3000/ReserchProposal/${pdf}`)
  };
 
    return ( 
        <div className="d-flex w-100 bg-primary justify-content-center align-items-center row">
      <div className="w-100 bg-white rounded p-3 Scrol-Table  mb-3 row">
        <form onSubmit={handleUpdate}>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH RESERCH PROPOSAL REVIEW </h4>
          <table className=' table light padding table-responsive border border-danger  mb-3'>
            <tr>
            <th>
              <div className="mb-2">
              <h6> <label htmlFor="">Name of College | University:</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={NCollege}
              disabled
              onChange={(e) => setNCollege(e.target.value)}
            /> </h6>
          </div>
               
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Department</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Department}
              disabled
              onChange={(e) => setDepartment(e.target.value)}
            /> </h6>
          </div>
                
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">The study fulfillment For ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={StudyF}
              disabled
              onChange={(e) => setStudyF(e.target.value)}
            /> </h6>
               </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">Name of advisor</label>
                  <input type="text" placeholder="Project Name" autoComplete="off" value={Nadvisor} disabled name="email" className='form-control rounded-0 w-75'
                    onChange={(e) => setNadvisor(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6> <label htmlFor="email">Email address of advisor</label>
                  <input type="email" placeholder="Email of advisor" autoComplete="off" name="email"  value={email} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setemail(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">Phone number of advisor </label>
                  <input type="number" placeholder="Enter Phone Number" autoComplete="off" value={phone} disabled name="email" className='form-control rounded-0 w-75'
                    onChange={(e) => setphone(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr>
              <th>
                <div >
                <h6> <label htmlFor="email">Principal Investigator(PI)?</label>
                  <input type="text" placeholder="Name of Principal" autoComplete="off" name="email" value={PI} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setPI(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div >
                <h6><label htmlFor="email">PI/Co-PI Phone number </label>
                  <input type="number" placeholder="Enter Phone Number" autoComplete="off" name="email" value={PIPhone} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setPIPhone(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">PI/Co-PI email address:</label>
                  <input type="email" placeholder="Principal email" autoComplete="off" name="email" value={PIemail} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setPIemail(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6> <label htmlFor="email">Study Title:</label>
                  <input type="text" placeholder="Study Title" autoComplete="off" name="email" value={Title} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setTitle(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">health focus area ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={FocusA}
              disabled
              onChange={(e) => setFocusA(e.target.value)}
            /> </h6>
               </div>
               
              </th>
              
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Study Period Begins</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={SPeriodB}
              disabled
              onChange={(e) => setSPeriodB(e.target.value)}
            /> </h6>
               </div>
              </th>
              </tr>
             <tr>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Study Period ends</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={SPeriodE}
              disabled
              onChange={(e) => setSPeriodE(e.target.value)}
            /> </h6>
               </div>

              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Conduct this study ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={ConductS}
              disabled
              onChange={(e) => setConductS(e.target.value)}
            /> </h6>
               </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">research methods/approaches ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Rmethods}
              disabled
              onChange={(e) => setRmethods(e.target.value)}
            /> </h6>
             </div>
              </th>
              
              <th>
                <div className=' w-75'>
                <h6><label htmlFor="email"> of the study </label>
                  <input type="number" placeholder="Enter Sample size"  value={Study} disabled autoComplete="off" name="email" className='form-control rounded-0 w-75'
                    onChange={(e) => setStudy(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">study design ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Design}
              disabled
              onChange={(e) => setDesign(e.target.value)}
            /> </h6>
             </div>
              </th>
            
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">geographic areas ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={geographicA}
              disabled
              onChange={(e) => setgeographicA(e.target.value)}
             /> 
            </h6>
             </div>
              </th>
              </tr>
              <tr>
              <th>
                <div >
                <h6><label htmlFor="email">Study area location specific site </label>
                  <input type="text" placeholder="Study area/location"  value={Slocation} disabled autoComplete="off" name="email" className='form-control rounded-0 w-75'
                    onChange={(e) => setSlocation(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">sex/gender ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Gender}
              disabled
              onChange={(e) => setGender(e.target.value)}
             /> 
            </h6>
             </div>
              </th>
              
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">target groups/populations ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={populations}
              disabled
              onChange={(e) => setpopulations(e.target.value)}
             /> 
            </h6>
            </div>
                </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">micro (Individual-level data) ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={MicroD}
              disabled
              onChange={(e) => setMicroD(e.target.value)}
             /> 
            </h6>
            </div>
                </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">data collected electronically ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Eelectronically}
              disabled
              onChange={(e) => setEelectronically(e.target.value)}
             /> 
            </h6>
            </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">tools for data collection?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Tools}
              disabled
              onChange={(e) => setTools(e.target.value)}
             /> 
            </h6>
            </div>
                </th>
                </tr>
              <tr >
                <th>
                <div className="mb-2">
              <h6><label htmlFor=""> tools data collection?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Tcollection}
              disabled
              onChange={(e) => setTcollection(e.target.value)}
             /> 
            </h6>
            </div>
                </th>
              <th>
                <div >
                <h6><label htmlFor="email">budget in ETB ?</label>
                  <input type="number" placeholder="How much budget"  value={Budget} disabled autoComplete="off" name="email" className='form-control rounded-0 w-75'
                    onChange={(e) => setBudget(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
              <div className="mb-2">
              <h6><label htmlFor=""> geo-coordinate data alongside survey data?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Geocoordinate}
              disabled
              onChange={(e) => setGeocoordinate(e.target.value)}
             /> 
            </h6>
            </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">target groups/populations ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Groups}
              disabled
              onChange={(e) => setGroups(e.target.value)}
             /> 
            </h6>
            </div>
            </th>
            <th>
            <div className="mb-2">
              <h6><label htmlFor="">Data accessible/access ?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Dsharing}
              disabled
              onChange={(e) => setDsharing(e.target.value)}
             /> 
            </h6>
            </div>
                </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">The reasons for not accessible?</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={Reasons}
              disabled
              onChange={(e) => setReasons(e.target.value)}
             /> 
            </h6>
            </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor=""> Attach your CV &  word document</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={pdf}
              disabled
              onChange={(e) => setfile(e.target.value)}
             /> 
            </h6>
            </div>
              </th>
              </tr>
          </table>
          <button onClick={() => {navigate("/CommentSec")}} className='btn btn-info border w-15 bgcoll text-white rounded-3 border border-danger mb-3'>Back</button>
           
        </form>
      </div>

      <div className='w-50 vh-15 bg-light rounded border border-danger vh-1 text-dark p-4 col mb-5 Scrol-Table'>
        <h4>Uploaded PDF:</h4>
       
        <div className="output-div mb-3 p-3">
        
          {allImage == null
            ? ""
            : allImage.map((data) => {
                return (
                  <div className=" col">
                    <h6>Title: {data.Title}</h6>
                    <th>
                    <button
                      className="btn btn-primary"
                      onClick={() => showPdf(data.pdf)}
                    >
                      Show Pdf
                    </button>
                    </th>
                  </div>
                  
                );
              })}
        </div>
      </div>
     <div className="Scrol-Table w-50 col mb-3 p-3">
      <PdfComp pdfFile={pdfFile}/>
      </div>

    </div>

    
     );
}
 
export default ReviewReserchPaper;

