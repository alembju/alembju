import { useEffect, useState } from "react";
import axios from "axios";
import React  from 'react'
import { useNavigate, useParams } from "react-router-dom";
import Header from './Header'
import { pdfjs } from "react-pdf";
import {Link} from 'react-router-dom'
import DatePicker from "react-datepicker"
import './App.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();


function InsertImage() {
 const navigate = useNavigate()

  const [file, setfile] = useState(null);
  const[image,setimage] = useState()
  const [allImage, setAllImage] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const[Title,setTitle] =useState("")
  const[Description,setDescription] =useState("")
  //const[BGDate,setBGDate]=useState(new Date())
  const[EVENTS3,setEVENTS3] = useState()
  const[EVENTS2,setEVENTS2] = useState()
  const[EVENTS1,setEVENTS1] = useState()
  const[EVENTS1Date,setEVENTS1Date] = useState(new Date())
  const[EVENTS2Date,setEVENTS2Date] = useState(new Date())
  const[EVENTS3Date,setEVENTS3Date] = useState(new Date())
  const [title, settitle] = useState("");
  const [AllImage, setALlImage] = useState(null);
  const[users, getUser] = useState([])

  ///////////////////////////upload baner////////////
  useEffect(() => {
    getPdf();
  }, []);
  const getPdf = async () => {
    const result = await axios.get("http://localhost:3000/get-files");
    console.log(result.data.data);
    setALlImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    //formData.append("title", title);
    formData.append("Title", Title);
    formData.append("Description", Description);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:3000/upload-image",
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

  ///////////////////////////////upload baner//////

  useEffect(() => {
    getImage();
  }, []);
 /*const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("Image", file);
    const result = await axios.post(
      "http://localhost:3000/upload-image", formData)
      .then(res =>console.log(res))
      .catch(er=>console.log(er))
       alert('Upload File successful')
  }*/

  const onInputChange = (e) => {
    console.log(e.target.files[0]);
    setfile(e.target.files[0]);
  };

  const getImage = async () => {
    const result = await axios.get("http://localhost:3000/get-image")
    console.log(result)
    setAllImage(result.data.data)
  };
  ////////////////////////////upload description///////////
  const handleSubmit = (e) =>{
    e.preventDefault();
    axios.post('http://localhost:3000/IMG-Description',{Title,Description})
    .then(result =>console.log(result)) 
    .catch(err => console.log(err))
  }
  

  const onSelectFile = (event) => {
    const selectedFiles = event.target.files;
    const selectedFilesArray = Array.from(selectedFiles);

    const imagesArray = selectedFilesArray.map((file) => {
      return URL.createObjectURL(file);
    });

    setSelectedImages((previousImages) => previousImages.concat(imagesArray));

    // FOR BUG IN CHROME
    event.target.value = "";
  };

  function deleteHandler(image) {
    setSelectedImages(selectedImages.filter((e) => e !== image));
    URL.revokeObjectURL(image);
  }


    const [formData, setFormData] = useState({
       email: '',
       firstname: '',
       lastname: '',
       password: '',
    })
    const handleChange =(event) => {
      setFormData({...formData, [event.target.name]: event.target.value});
  }

  ////////////////////////////////////////////////////////
  const handleSubmite = (e,post) =>{
    e.preventDefault();
    if (window.confirm(`Are you sure you want to delete ${post}`)) {
    axios.post('http://localhost:3000/EVENTSUpload',{EVENTS1,EVENTS2,EVENTS3,EVENTS1Date,EVENTS2Date,EVENTS3Date})
    .then(result =>{console.log(result) 
    window.location.reload()})
    .catch(err => console.log(err))
  }
  }
  const HandleDelet = (id,EVENTS1) => {
    if (window.confirm(`Are you sure you want to delete ${EVENTS1}`)) {
    axios.delete('http://localhost:3000/deletEvent/'+id)
    .then(res => {console.log(res)
    window.location.reload()})
    .then(errr => console.log(errr))
  }
  }
  ///////////////////////////////////////////////delat baner//////////////
  const BannerDelet = (id,EVENTS1) => {
    if (window.confirm(`Are you sure you want to delete ${EVENTS1}`)) {
    axios.delete('http://localhost:3000/deletBaner/'+id)
    .then(res => {console.log(res)
    window.location.reload()})
    .then(errr => console.log(errr))
  }
  }
  ////////////////////////////////////////end/////////////
  ////////////////////////////get events//////////////
  useEffect(() => {
    axios.get('http://localhost:3000/EventHeadline')
    //.then(Response => Response.json())
    .then(users =>getUser(users.data)) 
    .catch(erer => console.log(erer))
    
  } , [])

  return (
    
    <><main className='main-container '><div className="row p-2 mb-3 border border-secondary-100 bg-white">
       <h4 className='border border-secondary bgcoll text-white text-center rounded '>Banner Image Insertion</h4>
      <div className="col">
        <form onSubmit={submitImage} className="col w-50 bg-white rounded  border border-secondary-100 p-1 mb-2">
          <p>Title</p>
          <input
            type="text"
            className='form-control rounded-2 w-50'
            onChange={(e) => setTitle(e.target.value)}
            value={Title} />
          <br></br>
          <p>Description</p>
          <input
            type="text"
            className='form-control rounded-2 w-50'
            onChange={(e) => setDescription(e.target.value)}
            value={Description} />
          <br></br>
          <br></br>
          <input type="file" accept="image/*" onChange={(e) => setfile(e.target.files[0]) }></input>
          
          <button className='btn btn-default border w-25 bgcoll text-white rounded-3  ' onClick={submitImage}><h5>Submit</h5></button>
        </form>

      </div>
      <div className="col w-50 bg-white rounded  border border-secondary-100 p-2 mb-2">
        {allImage == null
          ? ""
          : allImage.map((data) => {
            return (
              <><img
                src={(`./src/images/${data.pdf}`)}
                height={200}
                width={200}
                className=" img-thumbnail img-responsive mb-3" /><button type="Dlet" className='login-btn border bgcoll text-white' onClick={() => BannerDelet(data._id)}>Delet</button></>
            );
          })}
        
      </div>

    </div>
    <div></div>


    <div className="row p-2 mb-3 border border-secondary-100 bg-white">
    <h2 className='border border-secondary bgcoll text-white text-center rounded '>UPCOMING EVENTS</h2>
      <div className='w-50 bg-white rounded p-3 col' >
        
        <form onSubmit={handleSubmite} className='border border-secondary-100 rounded'>
          <table className=' table light padding '>
            <tr>
              <tr>
              <th>
                <div className='mb-0 '>
                  <label htmlFor="email"><strong>Date</strong></label><br></br>
                  <DatePicker selected={EVENTS1Date} onChange={(date) => setEVENTS1Date(date)} 
                     dateFormat='dd/mm/yyyy'                    
                   
                    isClearable 
                                    
                  />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>EVENTS 1</strong></label>
                  <input type="text" placeholder="EVENTS 1" autoComplete="off" name="EVENTS 1" className='form-control rounded-0'
                    onChange={(e) => setEVENTS1(e.target.value)} />
                </div>
                </th>
                
                
              </tr>
              <tr>
              <th>
                <div className='mb-0 '>
                  <label htmlFor="email"><strong>Date</strong></label><br></br>
                  <DatePicker selected={EVENTS2Date} onChange={(date) => setEVENTS2Date(date)} 
                     dateFormat='dd/mm/yyyy'                    
                   
                    isClearable 
                                    
                  />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>EVENTS 2</strong></label>
                  <input type="text" placeholder="EVENTS 2" autoComplete="off" name="EVENTS 2" className='form-control rounded-0'
                    onChange={(e) => setEVENTS2(e.target.value)} />
                </div>
                </th>
                
               
              </tr>
              <tr>
              <th>
                <div className='mb-0 '>
                  <label htmlFor="email"><strong>Date</strong></label><br></br>
                  <DatePicker selected={EVENTS3Date} onChange={(date) => setEVENTS3Date(date)} 
                     dateFormat='dd/mm/yyyy'                    
                   
                    isClearable 
                                    
                  />
                </div>
              </th>
              <th>
                <div className='mb-2'>
                  <label htmlFor="email"><strong>EVENTS 3 </strong></label>
                  <input type="text" placeholder="EVENTS 3" autoComplete="off" name="EVENTS 3" className='form-control rounded-0'
                    onChange={(e) => setEVENTS3(e.target.value)} />
                </div>
                
                </th>
                
                
                
              </tr>
              
            </tr>
            
          </table>
          
          <button className='btn btn-info border w-15 bgcoll text-white rounded-3 ' onClick={handleSubmite}><h5>POST</h5></button>
         
        </form>
        </div>
        <div className="col p-2 mb-3 border border-secondary-100 bg-white Scrol-Table">
        <table className=' table light padding' >
            <thead>
              <tr>
                <th>Schedul Events </th>
              </tr>
            </thead>
            <tbody>
              {users.map((filer, index) => {
                return <tr key={index}>
                  <th>{filer.EVENTS1},{filer.EVENTS1Date.slice(0,10)}</th>
                  <th>{filer.EVENTS2},{filer.EVENTS2Date.slice(0,10)}</th>
                  <th>{filer.EVENTS3},{filer.EVENTS3Date.slice(0,10)}</th>
                  
                
                  <th><button className='btn btn-default border w-100 bg-danger rounded-5 text-decoration-none' onClick={(e) => HandleDelet(filer._id)}>Dellet</button></th>
                  
                  

                </tr>
              })}
            </tbody>
          </table>

        </div>
      
      
    </div> <button onClick={() => { navigate("/Adminipage"); } } className='btn btn-info border w-15 bgcoll text-white rounded-3 border border-secondary-100 mb-3'>Back</button></main></>
  

    
    
  )
}

export default InsertImage