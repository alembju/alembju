import React  from 'react'
import { useEffect } from 'react'
import {  useState } from 'react'
import Select from 'react-select'
import { useRef } from "react";
import axios from 'axios';
import IRBUpload from '../Admin_Component/IRBUpload';
import Navebar from '../Admin_Component/Navebar';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useReactToPrint } from "react-to-print";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { ScatterChart, Scatter, } from 'recharts';
import { BarChart, Bar, Rectangle } from 'recharts';
import { PieChart, Pie, Sector, Cell} from 'recharts';
import ReactPaginate from 'react-paginate';
import { pdfjs } from "react-pdf";
import PdfComp from "../PdfComp";
import ScrollToTop from "../components/ScrollToTop";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','##82ca9d','#8884d8'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function Acute_Report() {
  const conponentPDF= useRef();
  const generatePDF= useReactToPrint({
    content: ()=>conponentPDF.current,
     documentTitle:"Userdata",
     onAfterPrint:()=>alert("Data saved in PDF")
    });
  
  //const [Title, setTitle] = useState("");
  const [message, setMessages] = useState("");
  //const [values,setValues]=useState([])
 // const [options,setOptions]=useState()
  const [email, setEmails] = useState("");
  const [subject, setSubject] = useState("");
  const [messages, setMessage] = useState("");
  const [file, setFile] = useState(null);

 ///////////////////////////selection option from mongo/////////////
const [values,setValues]=useState([])
const [options,setOptions]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/RepDesease")
  .then((data)=>data.json())
  .then((val)=>setValues(val))
},[])

console.log(values,"values")

  useEffect(() => {
    currentPage.current=1;
    //getPdf();
    getPaginatedUsers();
  }, []);

  //////////////selection filter///////////////
 /* const[Product,setProduct] = useState([]);
  const [selectedCategory, setselectedCategory] = useState(null);
//const [category, setCategory] = useState('');

  useEffect(()=>{
    fetch("http://localhost:3000/RepDesease")
    .then((respons)=>respons.json())
    .then((val)=>setProduct(val))
  },[])
  const categories = Array.from(
 new Set(Product.map((res) => res.EPIWeek))
  )

  const categoryOption = categories.map((EPIWeek) =>({
    value:EPIWeek,
    label:EPIWeek
  }))
const filterProducts = selectedCategory ? Product.filter((Product) => Product.EPIWeek === selectedCategory.value):Product;
*/
/////////////////pagination//////
const [data, setData] = useState([]);
const [limit,setLimit]=useState(5);
const [pageCount,setPageCount]=useState(1);
const currentPage=useRef();

function handlePageClick(e) {
  console.log(e);
 currentPage.current=e.selected+1;
  getPaginatedUsers();
 

}
function changeLimit(){
  currentPage.current=1;
  getPaginatedUsers();
}

function getPaginatedUsers(){
  fetch(`http://localhost:3000/fetching-RepD?page=${currentPage.current}&limit=${limit}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "userData");
      setPageCount(data.pageCount);
      setData(data.result)
      
     
    });
  }
  console.log(values,"values")
  //////////////selection filter///////////////
 /* const categories = Array.from(
  new set(data.map((res) => res.EPIWeek))
  )

  const categoryOption = categories.map((EPIWeek) =>({
    value:EPIWeek,
    label:EPIWeek,
  }))
const filterValues = selectedCategory ? data.filter((dat) => dat.EPIWeek === selectedCategory.value):data;
*/
  const data01 = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ];
  const data02 = [
    { x: 300, y: 300, z: 200 },
    { x: 400, y: 500, z: 260 },
    { x: 200, y: 700, z: 400 },
    { x: 340, y: 350, z: 280 },
    { x: 560, y: 500, z: 500 },
    { x: 230, y: 780, z: 200 },
    { x: 500, y: 400, z: 200 },
    { x: 300, y: 500, z: 260 },
    { x: 240, y: 300, z: 400 },
    { x: 320, y: 550, z: 280 },
    { x: 500, y: 400, z: 500 },
    { x: 420, y: 280, z: 200 },
  ];
  //////////////////////////columen one line and bar chart
  const datas = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

const getIntroOfPage = (label) => {
  if (label === 'Page A') {
    return "Page A is about men's clothing";
  }
  if (label === 'Page B') {
    return "Page B is about women's dress";
  }
  if (label === 'Page C') {
    return "Page C is about women's bag";
  }
  if (label === 'Page D') {
    return 'Page D is about household goods';
  }
  if (label === 'Page E') {
    return 'Page E is about food';
  }
  if (label === 'Page F') {
    return 'Page F is about baby food';
  }
  return '';
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
        <p className="desc">Anything you want can be displayed here.</p>
      </div>
    );
  }
  return null;
};

const [title, setTitle] = useState("");
//const [file, setFile] = useState("");
const [allImage, setAllImage] = useState(null);
const [pdfFile, setPdfFile] = useState(null);

useEffect(() => {
  getPdf();
}, []);
const getPdf = async () => {
  const result = await axios.get("http://localhost:3000/Gete-Measel");
  console.log(result.data.data);
  setAllImage(result.data.data);
};

const submitImage = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);
  console.log(title, file);

  const result = await axios.post(
    "http://localhost:3000/MeaslesFile",
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
  // window.open(`http://localhost:5000/files/${pdf}`, "_blank", "noreferrer");
  setPdfFile(`http://localhost:3000/MeaslesStor/${pdf}`)
};
///////////////////////////////////////////////////////////////////////
const [category, setCategory] = useState('');
/*const [products, setProducts] = useState([]);
const [categories, setCategories] = useState([]);
const [category, setCategory] = useState('');
const [pageNumber, setPageNumber] = useState(1);
const [count, setCount] = useState(0);

const fetchProduct = () =>{
  axios.get(`http://localhost:3000/fetching-RepD?cat=${category}`)
  .then((prods)=>{
      //console.log("products", prods.data.products)
      setProducts(prods.data.products);
      setCount(prods.data.count);
  })
  .catch(error =>{
      console.log(error)
  })
}
  //fetch products category
  const fetchProductCategory = () =>{
    axios.get('http://localhost:3000/fetching-RepD')
    .then((cat)=>{
        console.log("categories", cat.data.categories)
        setCategories(cat.data.categories);
    })
    .catch(error =>{
        console.log(error)
    })
}

useEffect(()=>{
  fetchProduct();
}, [category])

useEffect(()=>{
  fetchProductCategory();
}, [])

console.log("filter", category);

//filter product
const filterProduct = (e) =>{
  e.preventDefault();
  fetchProduct();
}*/
////////////////////////////////////////////////////////////////
///////////////fetching data for line graph//////////
    const[datam, setdatam] = useState()
    

    useEffect(() => {
      const fetchdata = async() =>{
        const response = await fetch("http://localhost:3000/fetching-RepD/?limit=10")
        const datam = await response.json();
        console.log(datam,"datam");
        setdatam(datam.data);
      }
      fetchdata();
    })
////////////////////////////////////////////////////filter ////////
const [dataa, setDataa] = useState([]);
    const [query, setQuery] = useState(dataa);
 
 /*
   const Filter = (e) =>{
    setDataa(query.filter(f => f.EPIWeek.toLowerCase().includes(e.target.value)))
   }
   

   //const [query, setQuery] = useState("");
 

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`http://localhost:3000/Filter?q=${query}`);
      setDataa(res.data);
    };
    if (query.length === 0 || query.length > 2) fetchData();
  }, [query]);*/
  ////////////////////////////////////////////////////////
  const[Data,setdata]= useState([])
  const[records,setrecords] =useState([])
  
  
  useEffect(() => {
  axios.get("http://localhost:3000/RepDesease")
  .then(res => {
   setdata(res.data)
   setrecords(res.data);
  })
  .catch(err => console.log(err));
 }, [])
 const Filter = (event) => {
   setrecords(Data.filter(f => f.HFName .toLowerCase().includes(event.target.value)))
 }
 const Pname = (event) => {
  setrecords(Data.filter(f => f.pname .toLowerCase().startsWith(event.target.value)))
}
const Epiweek = (event) => {
  setrecords(Data.filter(f => f.EPIWeek == (event.target.value)))
}

  //////////////////////////// link component selection///////
  const CHOLERALINELIST = useRef(null);
  const CHOLERACasebasedReporting = useRef(null);
  const CHOLERARisckAreaMapping = useRef(null);
  const Chart = useRef(null)

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
/////////////////////////////////////////component selection////////////////////////////////////
const [selected,setSelected]=useState('CHOLERA LINE LIST')

const handleChange=(e)=>{
    console.log(e.target.value)
    setSelected(e.target.value)
}

  return (
    <> <ScrollToTop /><main className='main-containers '><div  className=' BgcolorAdmin rounded p-2  border border-DashbordBG mb-0 '>
      <form>
        <table className='table-responsive'>

          <tr>
  
      <div >
        <ul>
        <th className='p-3'><li onClick={() => scrollToSection(CHOLERALINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
         Cholera LINE LIST
          </li></th>
          <th  className='p-3 '> <li onClick={() => scrollToSection(CHOLERACasebasedReporting)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
          Contact Trace Information
          </li></th>
          <th  className='p-3 '><li onClick={() => scrollToSection(CHOLERARisckAreaMapping)} className="link DashbordBG  p-1 text-secondary border border-white shadow-lg rounded">
          Patient related Information
          </li></th>
          <th  className='p-3 '><li onClick={() => scrollToSection(CHOLERARisckAreaMapping)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
          Exposure/risk factor related information
          </li></th>
          <th  className='p-3 '><li onClick={() => scrollToSection(Chart)} className="link DashbordBG  p-1 text-secondary border border-white shadow-lg rounded">
          Chart
          </li></th>
        </ul>
      </div>
      
          </tr>
        </table>
      </form>
    </div>

     



    
    <div className="border border-black " ref={CHOLERALINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT Cholera LINE LIST </h4>
    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button bgcoll text-white mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet"/>
        
        <input
          className="form-controll border border-danger w-25"
          type='text'
          placeholder="Health facility name ..."
          onChange={Filter}
        />
         <input
          className="form-controll border border-danger w-25"
          type='text'
          placeholder="Patient name ..."
          onChange={Pname}
        />
        <input
          className="form-controll border border-danger w-25"
          type='text'
          placeholder="Epi-Week ..."
          onChange={Epiweek}
        />
     
    </div>
    <div className='Scrol-Table'>
    <div ref={conponentPDF} style={{width:'100%'}}>
    
    <table className='w-100 table-responsive  table light padding text-sm-left Table' id="table-to-xls" >
    <thead className='text-sm-left '>
              <tr>
                <th><h6>Date of form filled</h6></th>
                <th><h6>GPS / if patient at home</h6></th>
                <th><h6>GPS/if patient at Health Facility</h6> </th>
                <th><h6>EPI Week</h6></th>
                <th> <h6>Sub city </h6></th>
                <th><h6>Woreda </h6></th>
                <th><h6>Residental Area  </h6></th>
                <th> <h6>House number  </h6></th>
                <th><h6>Health Facility </h6></th>
                <th> <h6>patient Type</h6></th>
                <th><h6>Patient name</h6></th>
                <th><h6>Sex  </h6></th>
                <th><h6>Age  </h6></th>
                <th><h6> Child enrolled in school </h6></th>
                <th><h6>name of the school  </h6></th>
                <th><h6>Date seen at  health facility</h6></th>
                <th><h6>Date of onset  of rash</h6></th>
                <th><h6>Lab. Tests/sample taken</h6> </th>
                <th> <h6>Type of case </h6></th>
                <th><h6>Lab results </h6></th>
                <th><h6>Weight in Kg</h6></th>
                <th> <h6>Hight in cm  </h6></th>
                <th><h6>MUAC in cm </h6></th>
                <th> <h6>sign of measles </h6></th>
                <th><h6>No measles doses</h6></th>
                <th><h6>last vaccination date</h6></th>
                <th><h6>Isolated  </h6></th>
                <th><h6> vitamin A supplment  </h6></th>
                <th><h6>complication   </h6></th>
                <th> <h6>Admited Health Facility  </h6></th>
                <th><h6>Type of complication  </h6></th>
                <th> <h6>Potential risk factors </h6></th>
                <th><h6>Out come </h6></th>
                <th><h6>Phone Number</h6></th>
                <th><h6>Any picture 1 </h6></th>
                <th><h6> Any picture 2  </h6></th>
                <th><h6>Any observation   </h6></th>

              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.StartDate}</h6></th>
                  <th ><h6>{filer.Latitude}</h6></th>
                  <th ><h6>{filer.Longitude}</h6></th>
                  <th><h6>{filer.EPIWeek}</h6></th>
                  <th><h6>{filer.PSubCity}</h6></th>
                  <th><h6>{filer.PWoreda}</h6></th>
                  <th ><h6>{filer.PRegion}</h6></th>
                  <th ><h6>{filer.HNumber}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.PType}</h6></th>
                  <th><h6>{filer.pname}</h6></th>
                  <th ><h6>{filer.Sex}</h6></th>
                  <th><h6>{filer.Age}</h6></th>
                  <th><h6>{filer.Eschool}</h6></th>
                  <th><h6>{filer.SName}</h6></th>
                  <th><h6>{filer.Hfacility}</h6></th>
                  <th ><h6>{filer.Orash}</h6></th>
                  <th ><h6>{filer.sample}</h6></th>
                  <th><h6>{filer.TypeC}</h6></th>
                  <th><h6>{filer.Labresults}</h6></th>
                  <th><h6>{filer.Weight}</h6></th>
                  <th ><h6>{filer.Hight}</h6></th>
                  <th ><h6>{filer.MUAC}</h6></th>
                  <th><h6>{filer.SMeasles}</h6></th>
                  <th><h6>{filer.Nmeasles}</h6></th>
                  <th><h6>{filer.TNmeasles}</h6></th>
                  <th ><h6>{filer.Isolated}</h6></th>
                  <th><h6>{filer.vitaminA}</h6></th>
                  <th><h6>{filer.Complication}</h6></th>
                  <th><h6>{filer.AdmitedHF}</h6></th>
                  <th ><h6>{filer.Tcomplications}</h6></th>
                  <th ><h6>{filer.Pfactors}</h6></th>
                  <th><h6>{filer.Outcome}</h6></th>
                  <th><h6>{filer.Phone}</h6></th>
                  <th><h6>{filer.file}</h6></th>
                  <th ><h6>{filer.file}</h6></th>
                  <th><h6>{filer.vitaminA}</h6></th>
                  

                </tr>
              })}
            </tbody >
          </table>
          
          <div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="bgcoll text-white" onClick={generatePDF}>PDF</button>
      </div>
          </div> 
          <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
            
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
        
      />
        <input placeholder="Set Limit" onChange={e=>setLimit(e.target.value)}/>
        <button onClick={changeLimit}>Set Limit</button>
        </div>

       
    <div className="border border-black" ref={CHOLERACasebasedReporting}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Cholera Case-based Reporting Format (CRF)  </h4>
    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button bgcoll text-white mb-3"
                    table="table-to-xlss"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet"/><br/>
        
        <input
          className="form-controll border border-danger w-25"
          type='text'
          placeholder="Filter ..."
          onChange={Filter}
        />
     
    </div>
    <div className='Scrol-Table'>
    <div ref={conponentPDF} style={{width:'50%'}}>
    <table className='w-100 h-50 table-responsive  table light padding text-sm-left Table' id="table-to-xlss" >
    <thead className='text-sm-left'>
              <tr>
                <th><h6>Reporting Health Facility:</h6></th>
                <th><h6>Woreda </h6></th>
                <th><h6>Sub city/zone</h6> </th>
                <th> <h6>Region</h6></th>
                <th><h6>Name of Patient: </h6></th>
                <th><h6>Date of Birth (DOB): </h6></th>
                <th> <h6>Age  </h6></th>
                <th><h6>Sex</h6></th>
                <th><h6>Woreda</h6></th>
                <th><h6>House number:</h6></th>
                <th><h6>Zone:</h6></th>
                <th><h6>Region:  </h6></th>
                <th><h6>Location when symptom started: </h6></th>
                <th><h6>Current location:</h6> </th>
                <th> <h6>neonate or child full name of mother and father</h6></th>
                <th><h6>Date Seen at Health Facility:  </h6></th>
                <th><h6>Date Health Facility notified Woreda/zone:  </h6></th>
                <th> <h6>Date of Onset:  </h6></th>
                <th><h6>Number of vaccine/TT doses received: </h6></th>
                <th><h6>Date of last vaccination:</h6></th>
                <th><h6>Associated with epidemics?</h6></th>
                <th><h6>In/Out Patient</h6></th>
                <th><h6>Treatment given:</h6></th>
                <th><h6>If yes (specify):  </h6></th>
                <th><h6>Outcome </h6></th>
                <th><h6>Is sample collected </h6></th>
                <th> <h6>Date of speciemen collected   </h6></th>
                <th><h6>Date of speciemen sent to lab  </h6></th>
                <th> <h6>Type of specimen</h6></th>
                <th><h6>If other spe</h6></th>
                <th><h6>Please attache CRF photo</h6></th>
                <th><h6>Date sent to region/ submission to server </h6></th>
                <th><h6>Name of officer completing form</h6></th>
                <th><h6> Phone number of officer completing form</h6></th>

              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10).map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.HFName}</h6></th>
                  <th ><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.pname}</h6></th>
                  <th ><h6>{filer.BDate}</h6></th>
                  <th ><h6>{filer.Age}</h6></th>
                  <th><h6>{filer.Sex}</h6></th>
                  <th><h6>{filer.PWoreda}</h6></th>
                  <th><h6>{filer.HNumber}</h6></th>
                  <th ><h6>{filer.PSubCity}</h6></th>
                  <th><h6>{filer.PRegion}</h6></th>
                  <th><h6>{filer.Latitude}</h6></th>
                  <th><h6>{filer.Longitude}</h6></th>
                  <th><h6>{filer.PNeonat}</h6></th>
                  <th ><h6>{filer.Hfacility}</h6></th>
                  <th><h6>{filer.NotifiedDate}</h6></th>
                  <th><h6>{filer.OnsetDate}</h6></th>
                  <th><h6>{filer.MNumber}</h6></th>
                  <th ><h6>{filer.Vdate}</h6></th>
                  <th ><h6>{filer.Aepidemics}</h6></th>
                  <th><h6>{filer.PType}</h6></th>
                  <th><h6>{filer.Treatment}</h6></th>
                  <th><h6>{filer.TTreatment}</h6></th>
                  <th ><h6>{filer.Outcome}</h6></th>
                  <th><h6>{filer.SamColl}</h6></th>
                  <th><h6>{filer.Dspeciemen}</h6></th>
                  <th><h6>{filer.DspeciemenS}</h6></th>
                  <th><h6>{filer.Tspecimen}</h6></th>
                  <th><h6>{filer.TTspecimen}</h6></th>
                  <th><h6>{filer.file}</h6></th>
                  <th ><h6>{filer.DateSR}</h6></th>
                  <th><h6>{filer.FCName}</h6></th>
                  <th><h6>{filer.Phone}</h6></th>
                  
                  

                </tr>
              })}
            </tbody >
          </table>
         
          <div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="bgcoll text-white" onClick={generatePDF}>PDF</button>
      </div>
          </div>
          <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
            
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
        
      />
        <input placeholder="Set Limit" onChange={e=>setLimit(e.target.value)}/>
        <button onClick={changeLimit}>Set Limit</button>
        </div>

    <div className="border border-black" ref={CHOLERARisckAreaMapping}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Cholera Risck Area Mapping  </h4>
    <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button bgcoll text-white mb-3"
                    table="table-to-xlsy"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet"/><br/>
        
          
        <input
          className="form-controll border border-danger w-25"
          type='text'
          placeholder="Filter ..."
          onChange={Filter}
        />
     
    </div>
    
        <div className='Scrol-Table'>
        <div ref={conponentPDF} style={{width:'50%'}}>
    <table className='w-100 h-50 table-responsive  table light padding text-sm-left Table' id="table-to-xlsy" >
    <thead className='text-sm-left'>
              <tr>
                <th><h6>Risk Area Region</h6></th>
                <th><h6>Risk Area Sub city/zone</h6> </th>
                <th><h6>Risk Area Woreda </h6></th>
                <th> <h6>Name of Slum Area</h6></th>
                <th><h6>REason Whay you select as slum or risk area of infwction deases </h6></th>
                <th><h6>Any picture </h6></th>
                <th> <h6>Any picture in the aea URL  </h6></th>
                <th><h6>GPS of the area latitude</h6></th>
                <th><h6>GPS of the area Longitude</h6></th>
                

              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.HRegion}</h6></th>
                  <th ><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.pname}</h6></th>
                  <th ><h6>{filer.file}</h6></th>
                  <th ><h6>{filer.Latitude}</h6></th>
                  <th><h6>{filer.Longitude}</h6></th>
                  
                </tr>
              })}
            </tbody >
          </table>
         
          <div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="bgcoll text-white" onClick={generatePDF}>PDF</button>
      </div>
      </div>
          <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
        marginPagesDisplayed={2}
            
            containerClassName="pagination justify-content-center"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            activeClassName="active"
        
      />
        <input placeholder="Set Limit" onChange={e=>setLimit(e.target.value)}/>
        <button onClick={changeLimit}>Set Limit</button>
        </div>
        


        <div ref={conponentPDF} style={{width:'100%'}}>
    <div className='w-100 h-100 row bg-white rounded p-0  border border-danger mb-5 Scrol-Table ' ref={Chart}>
    <table className='Scrol-Table table light padding table-responsive'>
    <tr className='border border-secondary'>  
        <th>
      <LineChart
          width={500}
          height={300}
          data={records}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="EPIWeek" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="HNumber" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    </th>
    <th>
        <BarChart
          width={500}
          height={300}
          data={records}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="EPIWeek" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="HNumber" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="Hight" fill="##82ca9d" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          <Bar dataKey="MUAC" fill="#FFBB28" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </th>
        <th>
        <PieChart width={500} height={500}>
          <Pie
            data={records}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="EPIWeek"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        </th>
        <th>

          <ScatterChart
            width={500}
            height={400}
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: 20
            }}
    >
      <CartesianGrid />
      <XAxis type="number" dataKey="x" name="stature" unit="cm" />
      <YAxis
        yAxisId="left"
        type="number"
        dataKey="y"
        name="weight"
        unit="kg"
        stroke="#8884d8"
      />
      <YAxis
        yAxisId="right"
        type="number"
        dataKey="y"
        name="weight"
        unit="kg"
        orientation="right"
        stroke="#82ca9d"
      />
      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
      <Scatter yAxisId="left" name="A school" data={data01} fill="#8884d8" />
      <Scatter yAxisId="right" name="A school" data={data02} fill="#82ca9d" />
    </ScatterChart>
    </th>
    <th>
    <BarChart
          width={500}
          height={300}
          data={datas}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="pv" barSize={20} fill="#8884d8" />
        </BarChart>
    </th>
       
      </tr>
      < div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="bgcoll text-white" onClick={generatePDF}>PDF</button>
      </div>
      </table>
      </div>
      </div></main>

      </>
  )
}

export default Acute_Report

