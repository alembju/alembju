import DatePicker from "react-datepicker"
import axios from 'axios'
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
 
function DowenloadReview() {
    
    const {id} = useParams()
    
    const [orgname, setorgname] = useState()
  const[title,settitle] = useState()
  const[principal,setprincipal] = useState()
  const [phone, setphone] = useState()
  const [dsharing, setDsharing] = useState()
  const [availability, setavailability] = useState()
 
  const [coverage, setcoverage] = useState()
  const [BGDate, setBGDate] = useState()
  const [LDate, setLDate] = useState()
  
  const [gender, setgender] = useState(new Date())
  const [type, settype] = useState(new Date())
  const [raw, setraw] = useState()
  const [cleaned, setcleaned] = useState()
  const [url, seturl] = useState()
  const [comments, setcomments] = useState()
  const [email, setEmail] = useState()
  const [Title, setTitle] = useState()
  const[pdf, setFile] = useState([])
  

  const[show,setShow] = useState(false)

     
    useEffect(()=> {
        const fetchData = async() => {
            try {
                const response = await axios.get("http://localhost:3000/Acces/"+id);
                console.log(response);
                setorgname(response.data.orgname)
                settitle(response.data.titletitle)
                setprincipal(response.data.principal)
                setphone(response.data.phone)
                setDsharing(response.data.dsharing)
                setavailability(response.data.availability)
                
                setcoverage(response.data.coverage)
                setBGDate(response.data.BGDate)
                setLDate(response.data.LDate)
                
                setgender(response.data.gender)
                settype(response.data.type)
                setraw(response.data.raw)
                setcleaned(response.data.cleaned)
                seturl(response.data.url)
                setcomments(response.data.comments)
                setEmail(response.data.email)
                setTitle(response.data.Title)
                setFile(response.data.pdf)
                
            } catch(err) {
                console.log(err)
            }
        }
        fetchData();
    }, [])
     
    const navigate = useNavigate()
 
    const handleUpdate = (e) => {
        e.preventDefault()
        axios.put('http://localhost:3000/updateDowenload/'+id, {orgname,title,principal,phone,dsharing,availability,coverage,BGDate,LDate,gender,type,raw,cleaned,url,comments,email,Title,pdf})
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
        <div className="d-flex vh-100 bg-primary justify-content-center align-items-center ">
      <div className="w-75 h-70 bg-white rounded p-3 Scrol-Table  mb-3">
        <form onSubmit={handleUpdate}>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH RESERCH PROPOSAL REVIEW </h4>
          <table className=' table light padding table-responsive border border-danger  mb-3'>
            <tr>
            <th>
              <div className="mb-2">
              <h6> <label htmlFor="">Name of Organization</label>
            <input
              type="text"
              placeholder="Enter Organization"
              className="form-control"
              value={orgname}
              disabled
              onChange={(e) => setorgname(e.target.value)}
            /> </h6>
          </div>
               
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Project/Study/Report/Survey Title</label>
            <input
              type="text"
              placeholder="Enter title"
              className="form-control"
              value={title}
              disabled
              onChange={(e) => settitle(e.target.value)}
            /> </h6>
          </div>
                
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Name of Principal Investigator/Data Owner</label>
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control"
              value={principal}
              disabled
              onChange={(e) => setprincipal(e.target.value)}
            /> </h6>
               </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">Phone Number of Principal Investigator</label>
                  <input type="text" placeholder="Phone Number" autoComplete="off" value={phone} disabled name="email" className='form-control rounded-0 w-75'
                    onChange={(e) => setphone(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6> <label htmlFor="email">Data Sharing Access to Others</label>
                  <input type="email" placeholder="Data Sharing" autoComplete="off" name="email"  value={dsharing} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setDsharing(e.target.value)} /></h6>
                </div>
              </th>
              </tr>
              <tr>
              <th>
                <div >
                <h6><label htmlFor="email">Document Availability(Proposal/Reports/Publications) </label>
                  <input type="number" placeholder="Document Availability" autoComplete="off" value={availability} disabled name="email" className='form-control rounded-0 w-75'
                    onChange={(e) => setavailability(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div >
                <h6><label htmlFor="email">Coverage Location </label>
                  <input type="number" placeholder="Coverage Location" autoComplete="off" name="email" value={coverage} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setcoverage(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6><label htmlFor="email">begining date</label>
                  <input type="email" placeholder="begining" autoComplete="off" name="email" value={BGDate} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setBGDate(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div >
                <h6> <label htmlFor="email">Last Date</label>
                  <input type="text" placeholder="Last Date" autoComplete="off" name="email" value={LDate} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setLDate(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Coverage Gender</label>
            <input
              type="text"
              placeholder="Enter Gender"
              className="form-control"
              value={gender}
              disabled
              onChange={(e) => setgender(e.target.value)}
            /> </h6>
               </div>
               
              </th>
              </tr>
              <tr>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Coverage Gender</label>
            <input
              type="text"
              placeholder="Enter Gender"
              className="form-control"
              value={gender}
              disabled
              onChange={(e) => setgender(e.target.value)}
            /> </h6>
               </div>
              </th>
              
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Type of The Data</label>
            <input
              type="text"
              placeholder="Enter Type"
              className="form-control"
              value={type}
              disabled
              onChange={(e) => settype(e.target.value)}
            /> </h6>
               </div>
              </th>
              
              <th>
                <div >
                <h6> <label htmlFor="email">Raw Data Format:</label>
                  <input type="text" placeholder="Raw" autoComplete="off" name="email" value={raw} disabled className='form-control rounded-0 w-75'
                    onChange={(e) => setraw(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Cleaned Data Format</label>
            <input
              type="text"
              placeholder="Enter Cleaned"
              className="form-control"
              value={cleaned}
              disabled
              onChange={(e) => setcleaned(e.target.value)}
            /> </h6>
               </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">URL or Link (if published)</label>
            <input
              type="text"
              placeholder="Enter URL"
              className="form-control"
              value={url}
              disabled
              onChange={(e) => seturl(e.target.value)}
            /> </h6>
             </div>
              </th>
              </tr>
             <tr>
              <th>
                <div className=' w-75'>
                <h6><label htmlFor="email">Comments</label>
                  <input type="number" placeholder="Comments"  value={comments} disabled autoComplete="off" name="email" className='form-control rounded-0 w-75'
                    onChange={(e) => setcomments(e.target.value)} /></h6>
                </div>
              </th>
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Enter Email"
              className="form-control"
              value={email}
              disabled
              onChange={(e) => setEmail(e.target.value)}
            /> </h6>
             </div>
              </th>
            
              <th>
              <div className="mb-2">
              <h6><label htmlFor="">Title</label>
            <input
              type="text"
              placeholder="Enter Title"
              className="form-control"
              value={Title}
              disabled
              onChange={(e) => setTitle(e.target.value)}
             /> 
            </h6>
             </div>
              </th>
              
              <th>
              <div className="mb-2">
              <h6><label htmlFor=""> Cleaned Data Format</label>
            <input
              type="text"
              placeholder="Enter Cleaned Data"
              className="form-control"
              value={pdf}
              disabled
              onChange={(e) => setFile(e.target.value)}
             /> 
            </h6>
            </div>
              </th>
              
              </tr>
          </table>
        </form>
        <th> <button onClick={() => {navigate("/Dowenload")}} className='btn btn-info border w-100 bgcoll text-white rounded-3 border border-danger mb-3'>Back</button><br></br> </th>
      </div>
      </div>

      

    
     );
}
 
export default DowenloadReview;



