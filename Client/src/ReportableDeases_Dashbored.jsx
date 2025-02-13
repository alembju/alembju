import React ,{ PureComponent } from 'react'
import { useEffect } from 'react'
import {  useState } from 'react'
import Select from 'react-select'
import { useRef } from "react";
import axios from 'axios';
import './App.css'

import IRBUpload from './Admin_Component/IRBUpload';
import Navebar from './Admin_Component/Navebar';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { useReactToPrint } from "react-to-print";
import {LineChart,Line,XAxis,YAxis,CartesianGrid,Tooltip,Legend,ResponsiveContainer,ComposedChart,Funnel, FunnelChart,LabelList} from 'recharts';
import { ScatterChart, Scatter, } from 'recharts';
import { BarChart, Bar, Rectangle } from 'recharts';
import { PieChart, Pie, Sector, Cell} from 'recharts';
import ReactPaginate from 'react-paginate';
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

import ScrollToTop from "./components/ScrollToTop";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}from 'react-icons/bs'
import { BiSolidDog } from "react-icons/bi";
import { FaBaby } from "react-icons/fa6";
import { FaMosquito } from "react-icons/fa6";
import { FaHeadSideCough } from "react-icons/fa";
import { GiWoodenPegleg } from "react-icons/gi";
import { GiFemaleLegs } from "react-icons/gi";
import { GiFetus } from "react-icons/gi";
import { FaHandsWash } from "react-icons/fa";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','##82ca9d','#8884d8'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`},
      {`T=${value}`}
    </text>
  );
};

/////////////////////////////////shap bar chart//////////////
const colors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink'];
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;

  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};


///////////////////////////////////end//////////////////////


function ReportableDeases_Dashbored() {
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

  //////////////////////////columen one line and bar chart
 



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
 

  //////////////////////////// link component selection///////
  const MEASELSLINELIST = useRef(null);
  const MeaslesCasebasedReporting = useRef(null);
  const MeaslesRisckAreaMapping = useRef(null);
  const Chart = useRef(null)

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
/////////////////////////////////////////component selection////////////////////////////////////
const [selected,setSelected]=useState('MEASELS LINE LIST')

const handleChange=(e)=>{
    console.log(e.target.value)
    setSelected(e.target.value)
}

///////////////////////////////////////////////////////////////////////////
const [datacholera, setDatadatacholera] = useState([]);
const [dataMeasles, setDatadataMeasles] = useState([]);
const [PrenatalDeath, setDatadataPrenatalDeath] = useState([]);
const [MaternalDeath, setMaternalDeath] = useState([]);
const [MeningitsDeath, setMeningitsDeath] = useState([]);
const [MalariaDeath, setMalariaDeath] = useState([]);
const [AFP, setAFP] = useState([]);
const [rabies, setDatadatarabies] = useState([]);
const [searchQuery,setSearchQuery]=useState("")

useEffect(() => {
  getAllcholera();
},[searchQuery]);

//fetching all cholera
const getAllcholera = () => {
  fetch(`http://localhost:3000/Gete-Cholera?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholera(data.data);
    });
};
/////////////////////////////////////// Measles /////////////////////////////////////////
useEffect(() => {
  getAllMeasles();
},[searchQuery]);

//fetching all Measles
const getAllMeasles = () => {
  fetch(`http://localhost:3000/Gete-Measel?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData Measles");
      setDatadataMeasles(data.data);
    });
};

/////////////////////////////////////// PrenatalDeath /////////////////////////////////////////
useEffect(() => {
  getAllPrenatalDeath();
},[searchQuery]);

//fetching all Measles
const getAllPrenatalDeath = () => {
  fetch(`http://localhost:3000/Gete-Prenatal?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData Measles");
      setDatadataPrenatalDeath(data.data);
    });
};
/////////////////////////////////////// MaternalDeath /////////////////////////////////////////
useEffect(() => {
  getAllMaternalDeath();
},[searchQuery]);

//fetching all Measles
const getAllMaternalDeath = () => {
  fetch(`http://localhost:3000/Gete-Maternal?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData Measles");
      setMaternalDeath(data.data);
    });
};
///////////////////////////////////////Meningits/////////////////////////////////////////
useEffect(() => {
  getAllMeningits();
},[searchQuery]);

//fetching all Measles
const getAllMeningits = () => {
  fetch(`http://localhost:3000/get-Meningits?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData Measles");
      setMeningitsDeath(data.data);
    });
};

///////////////////////////////////////Malaria///////////////////////////////////////// 
useEffect(() => {
  getAllMalaria();
},[searchQuery]);

//fetching all Measles
const getAllMalaria = () => {
  fetch(`http://localhost:3000/Gete-Malaria?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData Measles");
      setMalariaDeath(data.data);
    });
};
///////////////////////////////////////Polio(AFP)/////////////////////////////////////////AFP 
useEffect(() => {
  getAllAFP();
},[searchQuery]);

//fetching all Measles
const getAllAFP = () => {
  fetch(`http://localhost:3000/Gete-Polio?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData Measles");
      setAFP(data.data);
    });
};

///////////////////////////////////////rabies///////////////////////////////////////// 
useEffect(() => {
  getAllALERTS();
},[searchQuery]);

//fetching all Measles
const getAllALERTS = () => {
  fetch(`http://localhost:3000/Gete-Rabies?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData Measles");
      setDatadatarabies(data.data);
    });
};



///////////////////////////front risk area exposure ///////////////////////////single record//////////////
const [datacholeraSlumArea, setDatadatacholeraSlumArea] = useState([]);
useEffect(() => {
  getAllcholeraSlumArea();
},[searchQuery]);

//fetching all cholera
const getAllcholeraSlumArea = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraSlumArea?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chSlumAreaData ");
      setDatadatacholeraSlumArea(data.data);
    
    });
};
///////////////////////////HollyWater front///////////////////////////single record//////////////
const [datacholeraHollyWater, setDatadatacholeraHollyWater] = useState([]);

useEffect(() => {
  getAllcholeraHollyWater();
},[searchQuery]);

//fetching all cholera
const getAllcholeraHollyWater = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraHollyWater?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chHollyWaterData ");
      setDatadatacholeraHollyWater(data.data);
    
    });
};
///////////////////////////RefugeCamp front///////////////////////////single record//////////////
const [datacholeraRefugeCamp, setDatadatacholeraRefugeCamp] = useState([]);

useEffect(() => {
  getAllcholeraRefugeCamp();
},[searchQuery]);

//fetching all cholera
const getAllcholeraRefugeCamp = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraRefugeCamp?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chRefugeCampData ");
      setDatadatacholeraRefugeCamp(data.data);
    
    });
};
///////////////////////////RiverArea front///////////////////////////single record//////////////
const [datacholeraRiverArea, setDatadatacholeraRiverArea] = useState([]);

useEffect(() => {
  getAllcholeraRiverArea();
},[searchQuery]);

//fetching all cholera
const getAllcholeraRiverArea = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraRiverArea?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chRiverAreaData ");
      setDatadatacholeraRiverArea(data.data);
    
    });
};
///////////////////////////StagnantWater front///////////////////////////single record//////////////
const [datacholeraStagnantWater, setDatadatacholeraStagnantWater] = useState([]);

useEffect(() => {
  getAllcholeraStagnantWater();
},[searchQuery]);

//fetching all cholera
const getAllcholeraStagnantWater= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraStagnantWater?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chStagnantWaterData ");
      setDatadatacholeraStagnantWater(data.data);
    
    });
};
///////////////////////////Other front///////////////////////////single record//////////////
const [datacholeraOther, setDatadatacholeraOther] = useState([]);

useEffect(() => {
  getAllcholeraOther();
},[searchQuery]);

//fetching all cholera
const getAllcholeraOther= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraOther?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOtherData ");
      setDatadatacholeraOther(data.data);
    
    });
};



///////////////////////////////////////////////////cholera Risk Area data//////////////////////
const dataRiskArea  = [
{ Area: 'Slum Area', Number_of_Patient: parseInt(`${datacholeraSlumArea}`)},
{ Area:'HollyWater', Number_of_Patient: parseInt(`${datacholeraHollyWater}`)},
{Area:'RefugeCamp (StagnantWater & Government)',Number_of_Patient:parseInt(`${datacholeraRefugeCamp}`)},
{Area:'No Job', Number_of_Patient: parseInt(`${datacholeraRiverArea}`)}, 
{ Area:'StagnantWater (Self Employed)', Number_of_Patient: parseInt(`${datacholeraStagnantWater}`)},
{Area:'Street Children',Number_of_Patient: parseInt(`${datacholeraOther}`)},]
  
  ///////////////////////////Vegetable front///////////////////////////exposure record//////////////
const [datacholeraVegetable, setDatadatacholeraVegetable] = useState([]);

useEffect(() => {
  getAllcholeraVegetable();
},[searchQuery]);

//fetching all cholera
const getAllcholeraVegetable= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraVegetable?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chVegetableData ");
      setDatadatacholeraVegetable(data.data);
    
    });
};
///////////////////////////Fruit front///////////////////////////single record//////////////
const [datacholeraFruit, setDatadatacholeraFruit] = useState([]);

useEffect(() => {
  getAllcholeraFruit();
},[searchQuery]);

//fetching all cholera
const getAllcholeraFruit = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraFruit?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chFruitData ");
      setDatadatacholeraFruit(data.data);
    
    });
};
///////////////////////////Meat front///////////////////////////single record//////////////
const [datacholeraMeat, setDatadatacholeraMeat] = useState([]);

useEffect(() => {
  getAllcholeraMeat();
},[searchQuery]);

//fetching all cholera
const getAllcholeraMeat = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraMeat?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chMeatData ");
      setDatadatacholeraMeat(data.data);
    
    });
};

///////////////////////////Diary front///////////////////////////single record//////////////
const [datacholeraDiary, setDatadatacholeraDiary] = useState([]);

useEffect(() => {
  getAllcholeraDiary();
},[searchQuery]);

//fetching all cholera
const getAllcholeraDiary = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraDiary?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chDiaryData ");
      setDatadatacholeraDiary(data.data);
    
    });
};
 ///////////////////////////Hotel front///////////////////////////single record//////////////
 const [datacholeraHotel, setDatadatacholeraHotel] = useState([]);

 useEffect(() => {
   getAllcholeraHotel();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllcholeraHotel= () => {
   fetch(`http://localhost:3000/Gete-SingleCholeraHotel?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "chHotelData ");
       setDatadatacholeraHotel(data.data);
     
     });
 };
 ///////////////////////////Home front///////////////////////////single record//////////////
 const [datacholeraHome, setDatadatacholeraHome] = useState([]);
 
 useEffect(() => {
   getAllcholeraHome();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllcholeraHome = () => {
   fetch(`http://localhost:3000/Gete-SingleCholeraHome?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "chHomeData ");
       setDatadatacholeraHome(data.data);
     
     });
 };
 ///////////////////////////Street front///////////////////////////single record//////////////
 const [datacholeraStreet, setDatadatacholeraStreet] = useState([]);
 
 useEffect(() => {
   getAllcholeraStreet();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllcholeraStreet = () => {
   fetch(`http://localhost:3000/Gete-SingleCholeraStreet?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "chStreetData ");
       setDatadatacholeraStreet(data.data);
     
     });
 };
 
 ///////////////////////////Raw front///////////////////////////single record//////////////
 const [datacholeraRaw, setDatadatacholeraRaw] = useState([]);
 
 useEffect(() => {
   getAllcholeraRaw();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllcholeraRaw = () => {
   fetch(`http://localhost:3000/Gete-SingleCholeraRaw?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "chRawData ");
       setDatadatacholeraRaw(data.data);
     
     });
 };
  ///////////////////////////Left front///////////////////////////single record//////////////
const [datacholeraLeft, setDatadatacholeraLeft] = useState([]);

useEffect(() => {
  getAllcholeraLeft();
},[searchQuery]);

//fetching all cholera
const getAllcholeraLeft= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraLeft?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chLeftData ");
      setDatadatacholeraLeft(data.data);
    
    });
};
///////////////////////////Ceremonial front///////////////////////////single record//////////////
const [datacholeraCeremonial, setDatadatacholeraCeremonial] = useState([]);

useEffect(() => {
  getAllcholeraCeremonial();
},[searchQuery]);

//fetching all cholera
const getAllcholeraCeremonial = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraCeremonial?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chCeremonialData ");
      setDatadatacholeraCeremonial(data.data);
    
    });
};
///////////////////////////Poultry front///////////////////////////single record//////////////
const [datacholeraPoultry, setDatadatacholeraPoultry] = useState([]);

useEffect(() => {
  getAllcholeraPoultry();
},[searchQuery]);

//fetching all cholera
const getAllcholeraPoultry = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraPoultry?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chPoultryData ");
      setDatadatacholeraPoultry(data.data);
    
    });
};
///////////////////////////Otherss front///////////////////////////single record//////////////
const [datacholeraOthers, setDatadatacholeraOthers] = useState([]);

useEffect(() => {
  getAllcholeraOthers();
},[searchQuery]);

//fetching all cholera
const getAllcholeraOthers = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraOthers?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOthersData ");
      setDatadatacholeraOthers(data.data);
    
    });
};

  const dataexposure = [
    { name: 'Vegetable products', Number_of_Patient: `${datacholeraVegetable}`},
    { name: 'Fruit Products', Number_of_Patient: `${datacholeraFruit }`},
    { name: 'Meat & Fish Products', Number_of_Patient: `${datacholeraMeat}`},
    { name: 'Diary Products', Number_of_Patient: `${datacholeraDiary }`},
    { name: 'Any Hotel | Café Foods', Number_of_Patient: `${datacholeraHotel}`},
    { name: 'Home Made Foods', Number_of_Patient: `${datacholeraHome }`},
    { name: 'Fast Food', Number_of_Patient: `${datacholeraStreet}`},
    { name: 'Raw Foods', Number_of_Patient: `${datacholeraRaw }`},
    { name: 'Left over Foods', Number_of_Patient: `${datacholeraLeft}`},
    { name: 'Ceremonial Foods', Number_of_Patient: `${datacholeraCeremonial }`},
    { name: 'Poultry Products', Number_of_Patient: `${datacholeraPoultry }`},
    { name: 'Other', Number_of_Patient: `${datacholeraOthers}`},
  ];

  //////////////////////////////////////////////////////////////////////////legend//////////////////////
  ////////////////////////////////////////////////////Vacination status/////////////////////
   ///////////////////////////ZeroDose front///////////////////////////single record//////////////
const [datacholeraZeroDose, setDatadatacholeraZeroDose] = useState([]);

useEffect(() => {
  getAllcholeraZeroDose();
},[searchQuery]);

//fetching all cholera
const getAllcholeraZeroDose= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraZeroDose?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chZeroDoseData ");
      setDatadatacholeraZeroDose(data.data);
    
    });
};
///////////////////////////OneDose front///////////////////////////single record//////////////
const [datacholeraOneDose, setDatadatacholeraOneDose] = useState([]);

useEffect(() => {
  getAllcholeraOneDose();
},[searchQuery]);

//fetching all cholera
const getAllcholeraOneDose = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraOneDose?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOneDoseData ");
      setDatadatacholeraOneDose(data.data);
    
    });
};
///////////////////////////TwoDose front///////////////////////////single record//////////////
const [datacholeraTwoDose, setDatadatacholeraTwoDose] = useState([]);

useEffect(() => {
  getAllcholeraTwoDose();
},[searchQuery]);

//fetching all cholera
const getAllcholeraTwoDose = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraTwoDose?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chTwoDoseData ");
      setDatadatacholeraTwoDose(data.data);
    
    });
};
///////////////////////////NotEligible front///////////////////////////single record//////////////
const [datacholeraNotEligible, setDatadatacholeraNotEligible] = useState([]);

useEffect(() => {
  getAllcholeraNotEligible();
},[searchQuery]);

//fetching all cholera
const getAllcholeraNotEligible = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraNotEligible?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chNotEligibleData ");
      setDatadatacholeraNotEligible(data.data);
    
    });
};

  const datavaccination = [
    { name: 'Zero dose', Number_of_Patient: `${datacholeraZeroDose}`},
    { name: 'One dose', Number_of_Patient: `${datacholeraOneDose }`},
    { name: 'Two dose', Number_of_Patient: `${datacholeraTwoDose}`},
    { name: 'Not eligible (﹤1yr)', Number_of_Patient: `${datacholeraNotEligible }`},
  ]
  ////////////////////////////////////////////////////end///////////////////////////////
  ////////////////////////////////////////////////MEASLES PATIENT TYPE//////////////////
  ///////////////////////////Measeles Inpatient front///////////////////////////single record//////////////
const [dataMeaslesInpatient, setDatadataMeaslesInpatient] = useState([]);

useEffect(() => {
  getAllMeaslesInpatient();
},[searchQuery]);

//fetching all Measles
const getAllMeaslesInpatient = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesInpatient?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chInpatientData ");
      setDatadataMeaslesInpatient(data.data);
    
    });
};
///////////////////////////outpatient front///////////////////////////single record//////////////
const [dataMeaslesOutPatient, setDatadataMeaslesOutPatient] = useState([]);

useEffect(() => {
  getAllMeaslesOutPatient();
},[searchQuery]);

//fetching all Measles
const getAllMeaslesOutPatient = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesOutPatient?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOutPatientData ");
      setDatadataMeaslesOutPatient(data.data);
    
    });
};

  const dataPATIENTTYPE = [
    { name: 'Inpatient (I)', Number_of_Patient: parseInt(`${dataMeaslesInpatient}`)},
    { name: 'outpatient(O)', Number_of_Patient: parseInt(`${dataMeaslesOutPatient }`)},
  ]
  ///////////////////////////////////////////////////MEASLES end////////////////////
  ////////////////////////////////////////////////////MEASLES PATIENT RESIDENCY REGION////
///////////////////////////front///////////////////////////MeaslesAddisAbaba single record/////////////
const [dataMeaslesAddisAbaba, setDatadataMeaslesAddisAbaba] = useState([]);
useEffect(() => {
  getAllMeaslesAddisAbaba();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesAddisAbaba = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesAddisAbaba?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeaslesAddisAbaba(data.data);
    
    });
};
///////////////////////////Oromya front///////////////////////////single record//////////////
const [dataMeaslesOromya, setDatadataMeaslesOromya] = useState([]);

useEffect(() => {
  getAllMeaslesOromya();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesOromya = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsaAddisKetema?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AddisKetemaData ");
      setDatadataMeaslesOromya(data.data);
    
    });
};
///////////////////////////Dire Dawa front///////////////////////////single record//////////////
const [dataMeaslesDireDawa, setDatadataMeaslesDireDawa] = useState([]);

useEffect(() => {
  getAllMeaslesDireDawa();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesDireDawa = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesDireDawa?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AradaData ");
      setDatadataMeaslesDireDawa(data.data);
    
    });
};
///////////////////////////Afar front///////////////////////////single record//////////////
const [dataMeaslesAfar, setDatadataMeaslesAfar] = useState([]);

useEffect(() => {
  getAllMeaslesAfar();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesAfar = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesAfar?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AfarData ");
      setDatadataMeaslesAfar(data.data);
    
    });
};
///////////////////////////Amhara front///////////////////////////single record//////////////
const [dataMeaslesAmhara, setDatadataMeaslesAmhara] = useState([]);

useEffect(() => {
  getAllMeaslesAmhara();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesAmhara = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesAmhara?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AmharaData ");
      setDatadataMeaslesAmhara(data.data);
    
    });
};

///////////////////////////Benishangul-Gumuz front///////////////////////////single record//////////////
const [dataMeaslesBenishangul, setDatadataMeaslesBenishangul] = useState([]);

useEffect(() => {
  getAllMeaslesBenishangul();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesBenishangul= () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesBenishangul?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "BenishangulData ");
      setDatadataMeaslesBenishangul(data.data);
    
    });
};

///////////////////////////Gambela  front///////////////////////////single record//////////////
const [dataMeaslesGambela, setDatadataMeaslesGambela] = useState([]);

useEffect(() => {
  getAllMeaslesGambela();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesGambela= () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesGambela?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "GambelaData ");
      setDatadataMeaslesGambela(data.data);
    
    });
};

///////////////////////////Harari front///////////////////////////single record//////////////
const [dataMeaslesHarari, setDatadataMeaslesHarari] = useState([]);

useEffect(() => {
  getAllMeaslesHarari();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesHarari = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesHarari?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "HarariData ");
      setDatadataMeaslesHarari(data.data);
    
    });
};

///////////////////////////Sidama front///////////////////////////single record//////////////
const [dataMeaslesSidama, setDatadataMeaslesSidama] = useState([]);

useEffect(() => {
  getAllMeaslesSidama();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesSidama = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesSidama?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "SidamaData ");
      setDatadataMeaslesSidama(data.data);
    
    });
};

///////////////////////////Somali front///////////////////////////single record//////////////
const [dataMeaslesSomali, setDatadataMeaslesSomali] = useState([]);

useEffect(() => {
  getAllMeaslesSomali();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesSomali = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesSomali?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "SomaliData ");
      setDatadataMeaslesSomali(data.data);
    
    });
};
///////////////////////////South_Ethiopia front///////////////////////////single record//////////////
const [dataMeaslesSouth_Ethiopia, setDatadataMeaslesSouth_Ethiopia] = useState([]);

useEffect(() => {
  getAllMeaslesSouth_Ethiopia();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesSouth_Ethiopia = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesSouth_Ethiopia?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "South_EthiopiaData ");
      setDatadataMeaslesSouth_Ethiopia(data.data);
    
    });
};
///////////////////////////South_West_Ethiopia front///////////////////////////single record//////////////
const [dataMeaslesSouth_West_Ethiopia, setDatadataMeaslesSouth_West_Ethiopia] = useState([]);

useEffect(() => {
  getAllMeaslesSouth_West_Ethiopia();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesSouth_West_Ethiopia = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesSouth_West_Ethiopia?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "South_West_EthiopiaData ");
      setDatadataMeaslesSouth_West_Ethiopia(data.data);
    
    });
};
///////////////////////////Tigray front///////////////////////////single record//////////////
const [dataMeaslesTigray, setDatadataMeaslesTigray] = useState([]);

useEffect(() => {
  getAllMeaslesTigray();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesTigray = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesTigray?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "TigrayData ");
      setDatadataMeaslesTigray(data.data);
    
    });
};

////////////////////////////Data for meseles region/////////////
const dataRegion = [
  {
    name: 'Addis Ababa',
    patient: `${dataMeaslesAddisAbaba}`,
  },
  {
    name: 'Oromya',
    patient: `${dataMeaslesOromya}`,
  },
  {
    name: 'Dire Dawa',
    patient: `${dataMeaslesDireDawa}`,
  },
  {
    name: 'Afar',
    patient: `${dataMeaslesAfar}`,
  },
  {
    name: 'Amhara',
    Number_of_patient: `${dataMeaslesAmhara}`,
  },
  {
    name: 'Benishangul-Gumuz',
    patient: `${dataMeaslesBenishangul}`,
  },
  {
    name: 'Gambela',
    patient: `${dataMeaslesGambela}`,
  },
  {
    name: 'Harari',
    patient: `${dataMeaslesHarari}`,
  },
  {
    name: 'Sidama',
    patient: `${dataMeaslesSidama}`,
  },
  
  {
    name: 'Somali',
    patient: `${dataMeaslesSomali}`,
  },
  {
    name: 'South_Ethiopia',
    patient: `${dataMeaslesSouth_Ethiopia}`,
  },
   
  {
    name: 'South_West_Ethiopia',
    patient: `${dataMeaslesSouth_West_Ethiopia}`,
  },
  {
    name: 'Tigray',
    patient: `${dataMeaslesTigray}`,
  },
];

  /////////////////////////////////////////////////////////REGION end////////////////////

  ////////////////////////////////////////////////////////////LAb Result/////////////////////////////////
///////////////////////////Positive front///////////////////////////single record//////////////
const [dataMeaslesPositive, setDatadataMeaslesPositive] = useState([]);

useEffect(() => {
  getAllMeaslesPositive();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesPositive = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesPositive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "PositiveData ");
      setDatadataMeaslesPositive(data.data);
    
    });
};
///////////////////////////P_rubella front///////////////////////////single record//////////////
const [dataMeaslesP_rubella, setDatadataMeaslesP_rubella] = useState([]);

useEffect(() => {
  getAllMeaslesP_rubella();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesP_rubella = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesP_rubella?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "P_rubellaData ");
      setDatadataMeaslesP_rubella(data.data);
    
    });
};
///////////////////////////Negative front///////////////////////////single record//////////////
const [dataMeaslesNegative, setDatadataMeaslesNegative] = useState([]);

useEffect(() => {
  getAllMeaslesNegative();
},[searchQuery]);

//fetching all cholera
const getAllMeaslesNegative = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslesNegative?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "NegativeData ");
      setDatadataMeaslesNegative(data.data);
    
    });
};
///////////////////////////pending front///////////////////////////single record//////////////
const [dataMeaslespending, setDatadataMeaslespending] = useState([]);

useEffect(() => {
  getAllMeaslespending();
},[searchQuery]);

//fetching all cholera
const getAllMeaslespending = () => {
  fetch(`http://localhost:3000/Gete-SingleMeaslespending?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "pendingData ");
      setDatadataMeaslespending(data.data);
    
    });
};

////////////////////////////Data for meseles region/////////////
const dataLabesult = [
  {
    name: 'Positive for measele',
    patient: `${dataMeaslesPositive}`,
     "fill": "#8884d8",
  },
  {
    name: 'positive for rubella',
    patient: `${dataMeaslesP_rubella}`,
    "fill": "#a4de6c",
  },
  {
    name: 'Negative for both',
    patient: `${dataMeaslesNegative}`,
    "fill": "#82ca9d",
  },
  {
    name: 'pending',
    patient: `${dataMeaslespending}`,
    "fill": "#8dd1e1",
  },
]
  /////////////////////////////////////////////////////////////end of Lab result//////////////////////

  ///////////////////////////Yes MaternalDeath front///////////////////////////single record//////////////
const [dataMaternalDeathYes, setDatadataMaternalDeathYes] = useState([]);

useEffect(() => {
  getAllMaternalDeathYes();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathYes = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathANCYes?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathYes(data.data);
    
    });
};
///////////////////////////No MaternalDeath front///////////////////////////single record//////////////
const [dataMaternalDeathNo, setDatadataMaternalDeathNo] = useState([]);

useEffect(() => {
  getAllMaternalDeathNo();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathNo = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathANCNo?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathNo(data.data);
    
    });
};
///////////////////////////Not Known MaternalDeath front///////////////////////////single record//////////////
const [dataMaternalDeathNotKnown, setDatadataMaternalDeathNotKnown] = useState([]);

useEffect(() => {
  getAllMaternalDeathNotKnown();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathNotKnown = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathANCNotKnown?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathNotKnown(data.data);
    
    });
};

  //////////////selection filter///////////////
  const dataANC = [
    
    { name: 'Yes', patient: `${dataMaternalDeathYes}`},
    { name: 'No', patient: `${dataMaternalDeathNo}`},
    { name: 'Not Known', patient: `${dataMaternalDeathNotKnown}`},
  ];
  /////////////////////////////////////////////////////

  //////////////////////////Attended PNC/PAC///////////////////////////single record//////////////
const [dataMaternalDeathPNCYes, setDatadataMaternalDeathPNCYes] = useState([]);

useEffect(() => {
  getAllMaternalDeathPNCYes();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathPNCYes = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathPNCYes?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathPNCYes(data.data);
    
    });
};
///////////////////////////hPNC No front///////////////////////////single record//////////////
const [dataMaternalDeathPNCNo, setDatadataMaternalDeathPNCNo] = useState([]);

useEffect(() => {
  getAllMaternalDeathPNCNo();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathPNCNo = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathPNCNo?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathPNCNo(data.data);
    
    });
};
///////////////////////////Not Known PNC front///////////////////////////single record//////////////
const [dataMaternalDeathPNCNotKnown, setDatadataMaternalDeathPNCNotKnown] = useState([]);

useEffect(() => {
  getAllMaternalDeathPNCNotKnown();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathPNCNotKnown = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathPNCNotKnown?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathPNCNotKnown(data.data);
    
    });
};
///////////////////////////Not Applicable front///////////////////////////single record//////////////
const [dataMaternalDeathPNCNotApplicable, setDatadataMaternalDeathPNCNotApplicable] = useState([]);

useEffect(() => {
  getAllMaternalDeathPNCNotApplicable();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathPNCNotApplicable = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathPNCNotApplicable?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathPNCNotApplicable(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataPNC = [
    
    { name: 'Yes', patient: parseInt(`${dataMaternalDeathPNCYes}`)},
    { name: 'No', patient: parseInt(`${dataMaternalDeathPNCNo}`)},
    { name: 'Not Known', patient: parseInt(`${dataMaternalDeathPNCNotKnown}`)},
    { name: 'Not Applicable', patient: parseInt(`${dataMaternalDeathPNCNotApplicable}`)},
  ];
  /////////////////////////////////////////////////////

  ////////////////////////////////////////////////////Neonatal Cause of Death//////////////////////////
const [dataMaternalDeathHemorrhage, setDatadataMaternalDeathHemorrhage] = useState([]);
useEffect(() => {
  getAllMaternalDeathHemorrhage();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathHemorrhage = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathHemorrhage?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chDailylaborerData ");
      setDatadataMaternalDeathHemorrhage(data.data);
    
    });
};
///////////////////////////Obstructed labor front///////////////////////////single record//////////////
const [dataMaternalDeathObstructedLabor, setDatadataMaternalDeathObstructedLabor] = useState([]);

useEffect(() => {
  getAllMaternalDeathObstructedLabor();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathObstructedLabor = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathObstructedLabor?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chDriverData ");
      setDatadataMaternalDeathObstructedLabor(data.data);
    
    });
};
///////////////////////////HDP front///////////////////////////single record//////////////
const [dataMaternalDeathHDP, setDatadataMaternalDeathHDP] = useState([]);

useEffect(() => {
  getAllMaternalDeathHDP();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathHDP = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathHDP?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chEmployedData ");
      setDatadataMaternalDeathHDP(data.data);
    
    });
};
///////////////////////////Abortion front///////////////////////////single record//////////////
const [dataMaternalDeathAbortion, setDatadataMaternalDeathAbortion] = useState([]);

useEffect(() => {
  getAllMaternalDeathAbortion();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathAbortion = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathAbortion?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chNoJobData ");
      setDatadataMaternalDeathAbortion(data.data);
    
    });
};
///////////////////////////Sepsis front///////////////////////////single record//////////////
const [dataMaternalDeathSepsis, setDatadataMaternalDeathSepsis] = useState([]);

useEffect(() => {
  getAllMaternalDeathSepsis();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathSepsis= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathSepsis?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chPrivateData ");
      setDatadataMaternalDeathSepsis(data.data);
    
    });
};

///////////////////////////Other front///////////////////////////single record//////////////
const [dataMaternalDeathOther, setDatadataMaternalDeathOther] = useState([]);

useEffect(() => {
  getAllMaternalDeathOther();
},[searchQuery]);

//fetching all MaternalDeath
const getAllMaternalDeathOther = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathOther?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOtherData ");
      setDatadataMaternalDeathOther(data.data);
    
    });
};
///////////////////////////////////////////////////MaternalDeath Cause of Death//////////////////////
const dataCause = [
{ CAUSE: 'Hemorrhage', Number_of_Patient: `${dataMaternalDeathHemorrhage}`,},
{ CAUSE:'Obstructed labor', Number_of_Patient: `${dataMaternalDeathObstructedLabor}`, },
{CAUSE:'HDP',Number_of_Patient: `${dataMaternalDeathHDP}`, },
{CAUSE:'Abortion', Number_of_Patient: `${dataMaternalDeathAbortion}`,}, 
{ CAUSE:'Sepsis', Number_of_Patient: `${dataMaternalDeathSepsis}`,},
{ CAUSE:'Other',Number_of_Patient: `${dataMaternalDeathOther}`, },]
  
  ///////////////////////////Pregnant front///////////////////////////single record//////////////

  
  ////////////////////////////////////////////////////Hemorrhage Cause of Death//////////////////////////
const [dataPrenatalDeathAsphyxia, setDatadataPrenatalDeathAsphyxia] = useState([]);
useEffect(() => {
  getAllPrenatalDeathAsphyxia();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathAsphyxia = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathAsphyxia?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chDailylaborerData ");
      setDatadataPrenatalDeathAsphyxia(data.data);
    
    });
};
///////////////////////////Complicationsfront///////////////////////////single record//////////////
const [dataPrenatalDeathComplications, setDatadataPrenatalDeathComplications] = useState([]);

useEffect(() => {
  getAllPrenatalDeathComplications();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathComplications = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathComplications?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chDriverData ");
      setDatadataPrenatalDeathComplications(data.data);
    
    });
};
///////////////////////////congenital anomaly front///////////////////////////single record//////////////
const [dataPrenatalDeathcongenitalAnomaly, setDatadataPrenatalDeathcongenitalAnomaly] = useState([]);

useEffect(() => {
  getAllPrenatalDeathcongenitalAnomaly();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathcongenitalAnomaly = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathcongenitalAnomaly?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "congenitalData ");
      setDatadataPrenatalDeathcongenitalAnomaly(data.data);
    
    });
};
///////////////////////////Neonatal Tetanus front///////////////////////////single record//////////////
const [dataPrenatalDeathNeonatalTetanus, setdataPrenatalDeathNeonatalTetanus] = useState([]);

useEffect(() => {
  getAllPrenatalDeathNeonatalTetanus();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathNeonatalTetanus = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathNeonatalTetanus?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "NeonatalData ");
      setdataPrenatalDeathNeonatalTetanus(data.data);
    
    });
};
///////////////////////////SPM front///////////////////////////single record//////////////
const [dataPrenatalDeathSPM, setdataPrenatalDeathSPM] = useState([]);

useEffect(() => {
  getAllPrenatalDeathSPM();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathSPM= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathSPM?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "SPMData ");
      setdataPrenatalDeathSPM(data.data);
    
    });
};

///////////////////////////Other front///////////////////////////single record//////////////
const [dataPrenatalDeathNeonatalOther, setdataPrenatalDeathNeonatalOther] = useState([]);

useEffect(() => {
  getAllPrenatalDeathNeonatalOther();
},[searchQuery]);

//fetching all MaternalDeath
const getAllPrenatalDeathNeonatalOther = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathNeonatalOther?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "OtherData ");
      setdataPrenatalDeathNeonatalOther(data.data);
    
    });
};
///////////////////////////////////////////////////MaternalDeath Cause of Death//////////////////////
const dataNeonatalCause = [
{ CAUSE: 'Asphyxia', patient: `${dataPrenatalDeathAsphyxia}`,},
{ CAUSE:'Complications', patient: `${dataPrenatalDeathComplications}`, },
{CAUSE:'Lethal congenital anomaly',patient: `${dataPrenatalDeathcongenitalAnomaly}`, },
{CAUSE:'Neonatal Tetanus', patient: `${dataPrenatalDeathNeonatalTetanus}`,}, 
{ CAUSE:'Sepsis/pneumonia /meningitis', patient: `${dataPrenatalDeathSPM}`,},
{ CAUSE:'Other',patient: `${dataPrenatalDeathNeonatalOther}`, },]
  
  ///////////////////////////Pregnant front///////////////////////////single record//////////////
  ///////////////////////////Delay1 front///////////////////////////single record//////////////
const [dataprenataldeathDelay1, setDatadataprenataldeathDelay1] = useState([]);

useEffect(() => {
  getAllprenataldeathDelay1();
},[searchQuery]);

//fetching all cholera
const getAllprenataldeathDelay1 = () => {
  fetch(`http://localhost:3000/Gete-SingleprenataldeathDelay1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataprenataldeathDelay1(data.data);
    
    });
};

///////////////////////////Delay2 front///////////////////////////single record//////////////
const [dataprenataldeathDelay2, setDatadataprenataldeathDelay2] = useState([]);

useEffect(() => {
  getAllprenataldeathDelay2();
},[searchQuery]);

//fetching all cholera
const getAllprenataldeathDelay2 = () => {
  fetch(`http://localhost:3000/Gete-SingleprenataldeathDelay2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataprenataldeathDelay2(data.data);
    
    });
};
///////////////////////////Delay3 front///////////////////////////single record//////////////
const [dataprenataldeathDelay3, setDatadataprenataldeathDelay3] = useState([]);

useEffect(() => {
  getAllprenataldeathDelay3();
},[searchQuery]);

//fetching all cholera
const getAllprenataldeathDelay3 = () => {
  fetch(`http://localhost:3000/Gete-SingleprenataldeathDelay3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataprenataldeathDelay3(data.data);
    
    });
};
const dataDelayType  = [
  {
    name: 'Delay1',
    Number_of_patient:  parseInt(`${dataprenataldeathDelay1}`),
  },
  {
    name: 'Delay2',
    Number_of_patient:  parseInt(`${dataprenataldeathDelay2}`),
  },
  {
    name: 'Delay3',
    Number_of_patient:  parseInt(`${dataprenataldeathDelay3}`),
  },
]
/////////////////////////////////////////////////////////////////////

  ///////////////////////////////////////////////////PrenatalDeath Mode of delivery SVD of the deceased baby//////////////////////////
  const [dataPrenatalDeathSVD, setDatadataPrenatalDeathSVD] = useState([]);
  useEffect(() => {
    getAllPrenatalDeathSVD();
  },[searchQuery]);
  
  //fetching all cholera
  const getAllPrenatalDeathSVD = () => {
    fetch(`http://localhost:3000/Gete-SinglePrenatalDeathSVD?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "chDailylaborerData ");
        setDatadataPrenatalDeathSVD(data.data);
      
      });
  };
  ///////////////////////////vaginal front///////////////////////////single record//////////////
  const [dataPrenatalDeathvaginal, setDatadataPrenatalDeathvaginal] = useState([]);
  
  useEffect(() => {
    getAllPrenatalDeathvaginal();
  },[searchQuery]);
  
  //fetching all cholera
  const getAllPrenatalDeathvaginal = () => {
    fetch(`http://localhost:3000/Gete-SinglePrenatalDeathvaginal?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "chDriverData ");
        setDatadataPrenatalDeathvaginal(data.data);
      
      });
  };
  ///////////////////////////Vacuum front///////////////////////////single record//////////////
  const [dataPrenatalDeathVacuum, setDatadataPrenatalDeathVacuum] = useState([]);
  
  useEffect(() => {
    getAllPrenatalDeathVacuum();
  },[searchQuery]);
  
  //fetching all cholera
  const getAllPrenatalDeathVacuum = () => {
    fetch(`http://localhost:3000/Gete-SinglePrenatalDeathVacuum?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "chEmployedData ");
        setDatadataPrenatalDeathVacuum(data.data);
      
      });
  };
  ///////////////////////////Forceps front///////////////////////////single record//////////////
  const [dataPrenatalDeathForceps, setDatadataPrenatalDeathForceps] = useState([]);
  
  useEffect(() => {
    getAllPrenatalDeathForceps();
  },[searchQuery]);
  
  //fetching all cholera
  const getAllPrenatalDeathForceps = () => {
    fetch(`http://localhost:3000/Gete-SinglePrenatalDeathForceps?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "chNoJobData ");
        setDatadataPrenatalDeathForceps(data.data);
      
      });
  };
  ///////////////////////////C/S front///////////////////////////single record//////////////
  const [dataPrenatalDeathCS, setDatadataPrenatalDeathCS] = useState([]);
  
  useEffect(() => {
    getAllPrenatalDeathCS();
  },[searchQuery]);
  
  //fetching all cholera
  const getAllPrenatalDeathCS= () => {
    fetch(`http://localhost:3000/Gete-SinglePrenatalDeathCS?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "chPrivateData ");
        setDatadataPrenatalDeathCS(data.data);
      
      });
  };
  
  ///////////////////////////Not Known front///////////////////////////single record//////////////
  const [dataPrenatalDeathNotKnown, setDatadataPrenatalDeathNotKnown] = useState([]);
  
  useEffect(() => {
    getAllPrenatalDeathNotKnown();
  },[searchQuery]);
  
  //fetching all MaternalDeath
  const getAllPrenatalDeathNotKnown = () => {
    fetch(`http://localhost:3000/Gete-SinglePrenatalDeathNotKnown?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "chOtherData ");
        setDatadataPrenatalDeathNotKnown(data.data);
      
      });
  };
  ///////////////////////////////////////////////////MaternalDeath Cause of Death//////////////////////
  const dataMode = [
  { Mode: 'SVD', Number_of_MATHERS: `${dataPrenatalDeathSVD}`,},
  { Mode:'Operative vaginal delivery', Number_of_MATHERS: `${dataPrenatalDeathvaginal}`, },
  {Mode:'Vacuum',Number_of_MATHERS: `${dataPrenatalDeathVacuum}`, },
  {Mode:'Forceps', Number_of_MATHERS: `${dataPrenatalDeathForceps}`,}, 
  { Mode:'C/S', Number_of_MATHERS: `${dataPrenatalDeathCS}`,},
  { Mode:'Not Known or Still Birth',Number_of_MATHERS: `${dataPrenatalDeathNotKnown}`, },]
    
    ///////////////////////////Pregnant front///////////////////////////single record//////////////

     ///////////////////////////Malaria prophylaxis NO front///////////////////////////single record//////////////
const [dataMalariaNo, setdataMalariaNo] = useState([]);

useEffect(() => {
  getAllMalariaNo();
},[searchQuery]);

//fetching allMalaria
const getAllMalariaNo = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaNo?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "MalariaNoData ");
      setdataMalariaNo(data.data);
    
    });
};
///////////////////////////Malaria Serious Yes front///////////////////////////single record//////////////
const [dataMalariaYes, setdataMalariaYes] = useState([]);

useEffect(() => {
  getAllMalariaYes();
},[searchQuery]);

//fetching all Malaria
const getAllMalariaYes = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaYes?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "MalariaYesData ");
      setdataMalariaYes(data.data);
    
    });
};

  const dataprophylaxis = [
    { name: 'No', Number_of_Patient:  parseInt(`${dataMalariaNo}`)},
    { name: 'Yes', Number_of_Patient: parseInt(`${dataMalariaYes }`)},
  ]
  ///////////////////////////////////////////////////MEASLES end////////////////////
  ///////////////////////////Malaria case outbreak front///////////////////////////single record//////////////
const [dataMalariaoutbreak, setDatadataMalariaoutbreak] = useState([]);

useEffect(() => {
  getAllMalariaoutbreak();
},[searchQuery]);

//fetching all Measles
const getAllMalariaoutbreak = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaoutbreak?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chInpatientData ");
      setDatadataMalariaoutbreak(data.data);
    
    });
};
///////////////////////////Malaria case routine front///////////////////////////single record//////////////
const [dataMalariaroutine, setDatadataMalariaroutine] = useState([]);

useEffect(() => {
  getAllMalariaroutine();
},[searchQuery]);

//fetching all Measles
const getAllMalariaroutine = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaroutine?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOutPatientData ");
      setDatadataMalariaroutine(data.data);
    
    });
};

  const datacase = [
    { name: 'outbreak', Number_of_Patient: parseInt(`${dataMalariaoutbreak}`)},
    { name: 'routine', Number_of_Patient: parseInt(`${dataMalariaroutine }`)},
  ]
  ///////////////////////////////////////////////////Malaria end////////////////////
  ///////////////////////////Malaria Reporting Health Facility Type front///////////////////////////single record//////////////
const [dataMalariaHospital, setDatadataMalariaHospital] = useState([]);

useEffect(() => {
  getAllMalariaHospital();
},[searchQuery]);

//fetching all Measles
const getAllMalariaHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chInpatientData ");
      setDatadataMalariaHospital(data.data);
    
    });
};
///////////////////////////Malaria Health Center front///////////////////////////single record//////////////
const [dataMalariaHealthCenter, setDatadataMalariaHealthCenter] = useState([]);

useEffect(() => {
  getAllMalariaHealthCenter();
},[searchQuery]);

//fetching all Measles
const getAllMalariaHealthCenter = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaHealthCenter?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOutPatientData ");
      setDatadataMalariaHealthCenter(data.data);
    
    });
};
 ///////////////////////////Malaria Private Clinic front///////////////////////////single record//////////////
 const [dataMalariaPrivateClinic, setDatadataMalariaPrivateClinic] = useState([]);

 useEffect(() => {
   getAllMalariaPrivateClinic();
 },[searchQuery]);
 
 //fetching all Measles
 const getAllMalariaPrivateClinic = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaPrivateClinic?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "chInpatientData ");
       setDatadataMalariaPrivateClinic(data.data);
     
     });
 };
 ///////////////////////////Malaria Other front///////////////////////////single record//////////////
 const [dataMalariarOther, setDatadataMalariarOther] = useState([]);
 
 useEffect(() => {
   getAllMalariarOther();
 },[searchQuery]);
 
 //fetching all Measles
 const getAllMalariarOther = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariarOther?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "chOutPatientData ");
       setDatadataMalariarOther(data.data);
     
     });
 };

  const dataType = [
    { name: 'Hospital', Number_of_Patient: `${dataMalariaHospital}`},
    { name: 'Health Center', Number_of_Patient: `${dataMalariaHealthCenter }`},
    { name: 'PrivateClinic', Number_of_Patient: `${dataMalariaPrivateClinic}`},
    { name: 'rOther', Number_of_Patient:`${dataMalariarOther }`},
  ]
     ///////////////////////////Rabies PEP NO front///////////////////////////single record//////////////
const [dataRabiesNo, setDatadataRabiesNo] = useState([]);

useEffect(() => {
  getAllRabiesNo();
},[searchQuery]);

//fetching all Measles
const getAllRabiesNo = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesNo?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chInpatientData ");
      setDatadataRabiesNo(data.data);
    
    });
};
///////////////////////////Rabies Serious Yes front///////////////////////////single record//////////////
const [dataRabiesYes, setDatadataRabiesYes] = useState([]);

useEffect(() => {
  getAllRabiesYes();
},[searchQuery]);

//fetching all Measles
const getAllRabiesYes = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesYes?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOutPatientData ");
      setdataRabiesYes(data.data);
    
    });
};

  const dataPEP = [
    { name: 'No', Number_of_Patient: parseInt(`${dataRabiesNo}`)},
    { name: 'Yes', Number_of_Patient: parseInt(`${dataRabiesYes }`)},
  ]
  ///////////////////////////////////////////////////MEASLES end////////////////////

   ///////////////////////////Rabies Type of Exposure front///////////////////////////single record//////////////
const [dataRabiesLick, setDatadataRabiesLick] = useState([]);

useEffect(() => {
  getAllRabiesLick();
},[searchQuery]);

//fetching all Measles
const getAllRabiesLick = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesLick?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chInpatientData ");
      setDatadataRabiesLick(data.data);
    
    });
};
///////////////////////////Rabies Scratch front///////////////////////////single record//////////////
const [dataRabiesScratch, setDatadataRabiesScratch] = useState([]);

useEffect(() => {
  getAllRabiesScratch();
},[searchQuery]);

//fetching all Measles
const getAllRabiesScratch = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesScratch?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chInpatientData ");
      setDatadataRabiesScratch(data.data);
    
    });
};
///////////////////////////Rabies Bite front///////////////////////////single record//////////////
const [dataRabiesBite, setDatadataRabiesBite] = useState([]);

useEffect(() => {
  getAllRabiesBite();
},[searchQuery]);

//fetching all Measles
const getAllRabiesBite = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesBite?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOutPatientData ");
      setDatadataRabiesBite(data.data);
    
    });
};

  const dataRabiesExposure = [
    { name: 'Lick', Number_of_Patient: `${dataRabiesLick}`},
    { name: 'Scratch', Number_of_Patient: `${dataRabiesScratch}`},
    { name: 'Bite', Number_of_Patient: `${dataRabiesBite }`},
  ]
  ///////////////////////////////////////////////////MEASLES end////////////////////
  ///////////////////////////Rabies Did exposing Dog / Animals vaccinate front///////////////////////////single record//////////////
const [dataRabiesVaccinateYes, setDatadataRabiesVaccinateYes] = useState([]);

useEffect(() => {
  getAllRabiesVaccinateYes();
},[searchQuery]);

//fetching all Measles
const getAllRabiesVaccinateYes = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesVaccinateYes?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chInpatientData ");
      setDatadataRabiesVaccinateYes(data.data);
    
    });
};
///////////////////////////Rabies VaccinateNo front///////////////////////////single record//////////////
const [dataRabiesVaccinateNo, setDatadataRabiesVaccinateNo] = useState([]);

useEffect(() => {
  getAllRabiesVaccinateNo();
},[searchQuery]);

//fetching all Measles
const getAllRabiesVaccinateNo = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesVaccinateNo?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chInpatientData ");
      setDatadataRabiesVaccinateNo(data.data);
    
    });
};
///////////////////////////Rabies VaccinateUnknown front///////////////////////////single record//////////////
const [dataRabiesVaccinateUnknown, setDatadataRabiesVaccinateUnknown] = useState([]);

useEffect(() => {
  getAllRabiesVaccinateUnknown();
},[searchQuery]);

//fetching all Measles
const getAllRabiesVaccinateUnknown = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesVaccinateUnknown?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOutPatientData ");
      setDatadataRabiesVaccinateUnknown(data.data);
    
    });
};

  const dataAnimalsVaccinate = [
    { name: 'Yes', Number_of_Patient: `${dataRabiesVaccinateYes}`},
    { name: 'No', Number_of_Patient: `${dataRabiesVaccinateNo}`},
    { name: 'Unknown', Number_of_Patient: `${dataRabiesVaccinateUnknown }`},
  ]
  ///////////////////////////////////////////////////MEASLES end////////////////////
  //////////////////////////////////////////////////Malariya end////////////////////
  const style = {
    top: '50%',
    right: -15,
    transform: 'translate(0, -75%)',
    lineHeight: '24px',
  };

  const style1 = {
    top: '100%',
    right: -0,
    transform: 'translate(0, -75%)',
    lineHeight: '24px',
  };
  

  return (
    
      
    <div ref={conponentPDF} className='main-containers bgcoll'>
    <div className='w-500 vh-100   rounded p-0  border border-danger mb-2 Scrol-Table ' ref={Chart}>
    <table className='Scrol-Table BgcolorAdmin table-responsive '>
   
    <div className='main-container w-100 BgcolorAdmin'>
    <div className='main-cards vh-50'>
        
        <div className='cards '>
                <div className='cards-inner text-secondary' >
                    <h3>Cholera</h3>
                    <FaHandsWash className='cards_icon text-secondary' size={50} style={{ fill: 'black' }}/>
                    
                </div>
                <h3> <span 
                       style={{  color: "rgb(11, 11, 11)" }} className='text-secondary' >
                        {searchQuery.length>0?`Records Found ${datacholera.length}`:`Total Cholera ${datacholera.length}`} 
                      </span></h3>

            </div>
        <div className='cards '>
                <div className='cards-inner text-secondary'>
                    <h3>Measles</h3>
                    <FaBaby className='cards_icon text-secondary' size={50} style={{ fill: 'white' }}/>
                </div>
                <h3> <span 
                        style={{   color: "rgb(11, 11, 11)" }} className='text-secondary' >
                        {searchQuery.length>0?`Records Found ${dataMeasles.length}`:`Total Measles ${dataMeasles.length}`} 
                      </span></h3>

            </div>
        
        <div className='cards '>
                <div className='cards-inner text-secondary'>
                    <h3>PrenatalDeath</h3>
                    <GiFetus className='cards_icon text-secondary' size={50} style={{ fill: 'white' }}/>
                </div>
                <h3> <span 
                        style={{   color: "rgb(11, 11, 11)" }}  className='text-secondary'>
                        {searchQuery.length>0?`Records Found ${PrenatalDeath.length}`:`Total Prenatal ${PrenatalDeath.length}`} 
                      </span></h3>
            </div>
        
        <div className='cards '>
                <div className='cards-inner text-secondary'>
                    <h3>MaternalDeath</h3>
                    <GiFemaleLegs className='cards_icon text-secondary' size={50} style={{ fill: 'white' }}/>
                </div>
                <h3> <span 
                        style={{   color: "rgb(11, 11, 11)" }} className='text-secondary'>
                        {searchQuery.length>0?`Records Found ${MaternalDeath.length}`:`Total MaternalDeath ${MaternalDeath.length}`} 
                      </span></h3>

            </div>
            <div className='cards '>
                <div className='cards-inner text-secondary'>
                    <h3>Meningits</h3>
                    <FaHeadSideCough className='cards_icon text-secondary' size={50} style={{ fill: 'white' }}/>
                </div>
                <h3><span
            style={{  color: "rgb(11, 11, 11)" }}  className='text-secondary'>
                {searchQuery.length>0?`Records Found ${MeningitsDeath.length}`:`Total Meningits ${MeningitsDeath?.length}`} 
                </span></h3>
            </div>
            <div className='cards '>
                <div className='cards-inner text-secondary'>
                    <h3>Malaria</h3>
                    <FaMosquito className='cards_icon text-secondary' size={50} style={{ fill: 'white' }}/>
                </div>
                <h3><span
            style={{  color: "rgb(11, 11, 11)" }} className='text-secondary'>
                {searchQuery.length>0?`Records Found ${MalariaDeath.length}`:`Total Malaria ${MalariaDeath?.length}`} 
                </span></h3>
            </div>
            <div className='cards '>
                <div className='cards-inner text-secondary'>
                    <h3>Polio(AFP)</h3>
                    <GiWoodenPegleg className='cards_icon text-secondary' size={50} style={{ fill: 'white' }}/>
                   
                </div>
                <h3> <span
            style={{   color: "rgb(11, 11, 11)" }} className='text-secondary'>
                {searchQuery.length>0?`Records Found ${AFP.length}`:`Total Records ${AFP?.length}`} 
                </span></h3>
            </div>
            <div className='cards '>
                <div className='cards-inner text-secondary '>
                    <h3>RABIES</h3>
                    <BiSolidDog className='cards_icon text-secondary ' size={50} style={{ fill: 'white' }}/>
                </div>
               <h3> <span
            style={{  color: "rgb(11, 11, 11)" }} className='text-secondary'>
                {searchQuery.length>0?`Records Found ${rabies.length}`:`Total Records ${rabies?.length}`} 
                </span></h3>
            </div>
        </div>
        </div>
      
       
        <div className='charts '>
          <tr className='DashbordBG'>
          <th>
          <p class="text-center text-white border border-secondary bg-secondary w-50 border border-secondary-700 rounded" >CHOLERA RiskArea</p>
        <PieChart  width={400} height={300} className='border border-secondary-700 rounded shadow-lg bg-light'>
          <Pie
            dataKey="Number_of_Patient"
            startAngle={180}
            endAngle={0}
            data={dataRiskArea}
            cx="50%"
            cy="70%"
            outerRadius={120}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
        </PieChart>
        <br />
        <p class="border text-center text-white border border-secondary bg-secondary w-50 rounded">MEASLES PATIENT TYPE</p>
        <PieChart width={400} height={300} className='border border-secondary-700 rounded shadow-lg bg-light'>
          <Pie
            data={dataPATIENTTYPE}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="Number_of_Patient"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={5} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
        </PieChart>
        <br />
        <p class="text-center text-white border border-secondary bg-secondary  w-75 rounded">MATERNAL CAUSE OF DEATH</p>
        <BarChart 
          width={400}
          height={300}
          data={dataCause}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            
          }}
          className='border border-secondary-700 rounded shadow-lg bg-light rounded'
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="CAUSE" />
          <YAxis />
          <Tooltip />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style1} />
          <Bar dataKey="Number_of_Patient" fill="#0e1c6c" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        <br />
        <p class="text-center text-white border border-secondary bg-secondary  w-75 rounded">DELAY TYPE OF PRENATALDEATH</p>
        <PieChart width={400} height={300}  className='border border-secondary-700 rounded shadow-lg bg-light'>
          <Pie
         
            data={dataDelayType}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="Number_of_patient"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </PieChart>
        
       <br />
       <p class="text-center text-white border border-secondary bg-secondary  w-75 rounded">MALARIA PROPHYLAXIS </p>
        <PieChart width={400} height={300} className='border border-secondary-700 rounded shadow-lg bg-light'>
          <Pie
            data={dataprophylaxis}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="Number_of_Patient"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={5} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
        </PieChart>
        <br />
        <p class="text-center text-white border border-secondary bg-secondary  w-75 rounded">RABIES PEP VACCINATION</p>
        <PieChart width={400} height={300} className='border border-secondary-700 rounded shadow-lg bg-light'>
          <Pie
            data={dataPEP}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="Number_of_Patient"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={5} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
        </PieChart>
        </th>
        <th className=' p-4'>

        <p class="text-center text-white border border-secondary bg-secondary p-1 mb-1 w-50 rounded">CHOLERA EXPOSURE</p>
       
        <ComposedChart className='border border-secondary-700 rounded shadow-lg bg-light'
          layout="vertical"
          width={410}
          height={300}
          data={dataexposure}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Number_of_Patient" barSize={20} fill="#413ea0" />
        </ComposedChart>
     <br />
     <p class="text-center rounded text-white border border-secondary bg-secondary  w-75">MEASLES PATIENT REGION</p>
     <ComposedChart className='border border-secondary-700 rounded shadow-lg bg-light'
          layout="vertical"
          width={410}
          height={300}
          data={dataRegion}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="patient" barSize={20} fill="#00C49F" label={{ position: 'top' }}/>
        </ComposedChart>
      <br />
      <p class="text-center rounded text-white border border-secondary bg-secondary  w-75">MATERNAL ATTENDED PNC/PAC</p>
     <ComposedChart className='border border-secondary-700 rounded shadow-lg bg-light'
          layout="vertical"
          width={410}
          height={300}
          data={dataPNC}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="patient" barSize={20} fill="#61dafb" label={{ position: 'top' }}/>
        </ComposedChart>
       <br />
       <p class="text-center rounded text-white border border-secondary bg-secondary  w-75">PRINATAL MODE OF DELIVERY</p>
        <BarChart 
          width={410}
          height={300}
          data={dataMode}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
            
          }}
          className='border border-secondary-700 rounded shadow-lg bg-light'
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Mode" />
          <YAxis />
          <Tooltip />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style1} />
          <Bar dataKey="Number_of_MATHERS" fill="#0e1c6c" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
       <br />
       <p class="text-center rounded text-white border border-secondary bg-secondary  w-100">MALARIA CASE BY OUTBREAK OR ROUTINE</p>
     <ComposedChart className='border border-secondary-700 rounded shadow-lg bg-light'
          layout="vertical"
          width={400}
          height={300}
          data={datacase}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Number_of_Patient" barSize={20} fill="#00C49F" label={{ position: 'top' }}/>
        </ComposedChart>
        <br />
        <p class="text-center rounded text-white border border-secondary bg-secondary  w-75">RABIES PATIENT EXPOSURE TYPE </p>
     <ComposedChart className='border border-secondary-700 rounded shadow-lg bg-light'
          layout="vertical"
          width={410}
          height={300}
          data={dataRabiesExposure}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Number_of_Patient" barSize={20} fill="#00C49F" label={{ position: 'top' }}/>
        </ComposedChart>
        </th>
      <th className='p-0'>
      <p class="text-center rounded text-white border border-secondary bg-secondary  w-75">CHOLERA VACCINATION STATUS</p>
         <BarChart
         className='border border-secondary-700 rounded shadow-lg bg-light'
      width={500}
      height={300}
      data={datavaccination}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Number_of_Patient" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
        <br />
        <p class="text-center rounded text-white border border-secondary bg-secondary  w-50">MEASLES LAB RESULTS</p>
        <FunnelChart width={500} height={300} className='border border-secondary-700 rounded shadow-lg bg-light'>
         <Tooltip />
          <Funnel
           dataKey="patient"
          data={dataLabesult}
          isAnimationActive
  >
         <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
         </Funnel>
        </FunnelChart>
        <br />
        <p class="text-center rounded text-white border border-secondary bg-secondary  w-75">MATERNAL DEATH ATTENDED ANC</p>
         <BarChart
         className='border border-secondary-700 rounded shadow-lg bg-light'
          width={500}
          height={300}
          data={dataANC}
           margin={{
           top: 20,
           right: 30,
           left: 20,
           bottom: 5,
          }}
          >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="patient" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
        <br />
        <p class="text-center rounded text-white border border-secondary bg-secondary w-75">NEONATAL CAUSE OF DEATH</p>
         <BarChart
         className='border border-secondary-700 rounded shadow-lg bg-light'
          width={500}
          height={300}
          data={dataNeonatalCause}
           margin={{
           top: 20,
           right: 30,
           left: 20,
           bottom: 5,
          }}
          >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="CAUSE" />
      <YAxis />
      <Bar dataKey="patient" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
        <br />
        <p class="text-center rounded text-white border border-secondary bg-secondary  w-75">MALARIA BY HEALTH FACILITY TYPE</p>
         <BarChart
         className='border border-secondary-700 rounded shadow-lg bg-light'
      width={500}
      height={300}
      data={dataType}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Number_of_Patient" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    <br />
        <p class="text-center rounded text-white border border-secondary bg-secondary  w-75">EXPOSING DOG / ANIMALS VACCINATE</p>
         <BarChart
         className='border border-secondary-700 rounded shadow-lg bg-light'
      width={500}
      height={300}
      data={dataAnimalsVaccinate}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Bar dataKey="Number_of_Patient" fill="#8884d8" shape={<TriangleBar />} label={{ position: 'top' }}>
        {data.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={colors[index % 20]} />
        ))}
      </Bar>
    </BarChart>
    </th>
        
       < div className="d-grid d-md-flex justify-content-md-end mb-3 ">
      <button className="bgcoll text-white" onClick={generatePDF}>PDF</button>
      
      </div>
      </tr>
      </div>
      
      </table>
      </div>
      </div>
  )
}

export default ReportableDeases_Dashbored
