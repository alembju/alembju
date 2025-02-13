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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,ComposedChart,RadialBarChart, RadialBar } from 'recharts';
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
function Meningits_Report() {
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
  /////////////////////////////////////////////////////////front end/////////////////////////////////////
 ///////////////////////////front///////////////////////////Akaki single record//////////////Gete-SingleCholeraAddisKetema
const [dataMeningitsAkaki, setDatadataMeningitsAkaki] = useState([]);
const [searchQuery,setSearchQuery]=useState("")

useEffect(() => {
  getAllMeningitsAkaki();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsAkaki = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsAkaki?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeningitsAkaki(data.data);
    
    });
};
///////////////////////////AddisKetema front///////////////////////////single record//////////////
const [dataMeningitsAddisKetema, setDatadataMeningitsAddisKetema] = useState([]);

useEffect(() => {
  getAllMeningitsAddisKetema();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsAddisKetema = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsaAddisKetema?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AddisKetemaData ");
      setDatadataMeningitsAddisKetema(data.data);
    
    });
};
///////////////////////////Arada front///////////////////////////single record//////////////
const [dataMeningitsArada, setDatadataMeningitsArada] = useState([]);

useEffect(() => {
  getAllMeningitsArada();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsArada = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsArada?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AradaData ");
      setDatadataMeningitsArada(data.data);
    
    });
};
///////////////////////////Bole front///////////////////////////single record//////////////
const [dataMeningitsBole, setDatadataMeningitsBole] = useState([]);

useEffect(() => {
  getAllMeningitsBole();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsBole = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsBole?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "BoleData ");
      setDatadataMeningitsBole(data.data);
    
    });
};
///////////////////////////Gulele front///////////////////////////single record//////////////
const [dataMeningitsGulele, setDatadataMeningitsGulele] = useState([]);

useEffect(() => {
  getAllMeningitsGulele();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsGulele = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsGulele?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "GuleleData ");
      setDatadataMeningitsGulele(data.data);
    
    });
};

///////////////////////////Kirkos front///////////////////////////single record//////////////
const [dataMeningitsKirkos, setDatadataMeningitsKirkos] = useState([]);

useEffect(() => {
  getAllMeningitsKirkos();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsKirkos= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsKirkos?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "KirkosData ");
      setDatadataMeningitsKirkos(data.data);
    
    });
};

///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
const [dataMeningitskolife, setDatadataMeningitskolife] = useState([]);

useEffect(() => {
  getAllMeningitskolife();
},[searchQuery]);

//fetching all cholera
const getAllMeningitskolife= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitskolife?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "kolifeData ");
      setDatadataMeningitskolife(data.data);
    
    });
};

///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
const [dataMeningitsNifas_Silk_Lafto, setDatadataMeningitsNifas_Silk_Lafto] = useState([]);

useEffect(() => {
  getAllMeningitsNifas_Silk_Lafto();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsNifas_Silk_Lafto = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsNifas_Silk_Lafto?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Nifas_Silk_LaftoData ");
      setDatadataMeningitsNifas_Silk_Lafto(data.data);
    
    });
};

///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
const [dataMeningitsLemi_Kura, setDatadataMeningitsLemi_Kura] = useState([]);

useEffect(() => {
  getAllMeningitsLemi_Kura();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsLemi_Kura = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsLemi_Kura?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Lemi_KuraData ");
      setDatadataMeningitsLemi_Kura(data.data);
    
    });
};

///////////////////////////Lideta front///////////////////////////single record//////////////
const [dataMeningitsLideta, setDatadataMeningitsLideta] = useState([]);

useEffect(() => {
  getAllMeningitsLideta();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsLideta = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsLideta?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LidetaData ");
      setDatadataMeningitsLideta(data.data);
    
    });
};
///////////////////////////Yeka front///////////////////////////single record//////////////
const [dataMeningitsYeka, setDatadataMeningitsYeka] = useState([]);

useEffect(() => {
  getAllMeningitsYeka();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsYeka = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsYeka?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "YekaData ");
      setDatadataMeningitsYeka(data.data);
    
    });
};

////////////////////////////////////////////////////////////single/////////////////////////////////
///////////////////////////Female front///////////////////////////single record//////////////
const [dataMeningitsFemale, setDatadataMeningitsFemale] = useState([]);

useEffect(() => {
  getAllMeningitsFemale();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsFemale = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsFemale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeningitsFemale(data.data);
    
    });
};
///////////////////////////Male front///////////////////////////single record//////////////
const [dataMeningitsMale, setDatadataMeningitsMale] = useState([]);

useEffect(() => {
  getAllMeningitsMale();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsMale = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsMale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeningitsMale(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataPai = [
    
    { name: 'Female', Number_of_patient: parseInt(`${dataMeningitsFemale}`)},
    { name: 'Male', Number_of_patient: parseInt(`${dataMeningitsMale}`)},
    
   
  ];
  /////////////////////////////////////////////////////
  ///////////////////////////Patient outcome front///////////////////////////single record//////////////
const [dataMeningitsImproved, setDatadataMeningitsImproved] = useState([]);

useEffect(() => {
  getAllMeningitsImproved();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsImproved = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsImproved?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeningitsImproved(data.data);
    
    });
};
///////////////////////////OnTreatment front///////////////////////////single record//////////////
const [dataMeningitsOnTreatment, setDatadataMeningitsOnTreatment] = useState([]);

useEffect(() => {
  getAllMeningitsOnTreatment();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsOnTreatment = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsOnTreatment?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeningitsOnTreatment(data.data);
    
    });
};
///////////////////////////Referred front///////////////////////////single record//////////////
const [dataMeningitsReferred, setDatadataMeningitsReferred] = useState([]);

useEffect(() => {
  getAllMeningitsReferred();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsReferred = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsReferred?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeningitsReferred(data.data);
    
    });
};
///////////////////////////Death front///////////////////////////single record//////////////
const [dataMeningitsDeath, setDatadataMeningitsDeath] = useState([]);

useEffect(() => {
  getAllMeningitsDeath();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsDeath = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsDeath?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeningitsDeath(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataPoutcome = [
    
    { name: 'Improved', Number_of_patient: parseInt(`${dataMeningitsImproved}`)},
    { name: 'On Treatment', Number_of_patient: parseInt(`${dataMeningitsOnTreatment}`)},
    { name: 'Referred', Number_of_patient: parseInt(`${dataMeningitsReferred}`)},
    { name: 'Death', Number_of_patient: parseInt(`${dataMeningitsDeath}`)},
  ];
  /////////////////////////////////////////////////////
  ///////////////////////////front Meningits///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataMeningitsWeek1, setDatadataMeningitsWeek1] = useState([]);
useEffect(() => {
  getAllMeningitsWeek1();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataMeningitsWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataMeningitsWeek2, setDatadataMeningitsWeek2] = useState([]);

useEffect(() => {
  getAllMeningitsWeek2();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataMeningitsWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataMeningitsWeek3, setDatadataMeningitsWeek3] = useState([]);

useEffect(() => {
  getAllMeningitsWeek3();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataMeningitsWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataMeningitsWeek4, setDatadataMeningitsWeek4] = useState([]);

useEffect(() => {
  getAllMeningitsWeek4();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataMeningitsWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataMeningitsWeek5, setDatadataMeningitsWeek5] = useState([]);

useEffect(() => {
  getAllMeningitsWeek5();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataMeningitsWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataMeningitsWeek6, setDatadataMeningitsWeek6] = useState([]);

useEffect(() => {
  getAllMeningitsWeek6();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataMeningitsWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataMeningitsWeek7, setDatadataMeningitsWeek7] = useState([]);

useEffect(() => {
  getAllMeningitsWeek7();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataMeningitsWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataMeningitsWeek8, setDatadataMeningitsWeek8] = useState([]);

useEffect(() => {
  getAllMeningitsWeek8();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataMeningitsWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataMeningitsWeek9, setDatadataMeningitsWeek9] = useState([]);

useEffect(() => {
  getAllMeningitsWeek9();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataMeningitsWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataMeningitsWeek10, setDatadataMeningitsWeek10] = useState([]);

useEffect(() => {
  getAllMeningitsWeek10();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataMeningitsWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataMeningitsWeek11, setDatadataMeningitsWeek11] = useState([]);

useEffect(() => {
  getAllMeningitsWeek11();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataMeningitsWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataMeningitsWeek12, setDatadataMeningitsWeek12] = useState([]);

useEffect(() => {
  getAllMeningitsWeek12();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataMeningitsWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataMeningitsWeek13, setDatadataMeningitsWeek13] = useState([]);

useEffect(() => {
  getAllMeningitsWeek13();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataMeningitsWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataMeningitsWeek14, setDatadataMeningitsWeek14] = useState([]);

useEffect(() => {
  getAllMeningitsWeek14();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataMeningitsWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataMeningitsWeek15, setDatadataMeningitsWeek15] = useState([]);


useEffect(() => {
  getAllMeningitsWeek15();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataMeningitsWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataMeningitsWeek16, setDatadataMeningitsWeek16] = useState([]);

useEffect(() => {
  getAllMeningitsWeek16();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataMeningitsWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataMeningitsWeek17, setDatadataMeningitsWeek17] = useState([]);

useEffect(() => {
  getAllMeningitsWeek17();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataMeningitsWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataMeningitsWeek18, setDatadataMeningitsWeek18] = useState([]);

useEffect(() => {
  getAllMeningitsWeek18();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataMeningitsWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataMeningitsWeek19, setDatadataMeningitsWeek19] = useState([]);

useEffect(() => {
  getAllMeningitsWeek19();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataMeningitsWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataMeningitsWeek20, setDatadataMeningitsWeek20] = useState([]);

useEffect(() => {
  getAllMeningitsWeek20();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataMeningitsWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataMeningitsWeek21, setDatadataMeningitsWeek21] = useState([]);

useEffect(() => {
  getAllMeningitsWeek21();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataMeningitsWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataMeningitsWeek22, setDatadataMeningitsWeek22] = useState([]);

useEffect(() => {
  getAllMeningitsWeek22();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataMeningitsWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataMeningitsWeek23, setDatadataMeningitsWeek23] = useState([]);

useEffect(() => {
  getAllMeningitsWeek23();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataMeningitsWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataMeningitsWeek24, setDatadataMeningitsWeek24] = useState([]);

useEffect(() => {
  getAllMeningitsWeek24();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataMeningitsWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataMeningitsWeek25, setDatadataMeningitsWeek25] = useState([]);

useEffect(() => {
  getAllMeningitsWeek25();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataMeningitsWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataMeningitsWeek26, setDatadataMeningitsWeek26] = useState([]);

useEffect(() => {
  getAllMeningitsWeek26();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataMeningitsWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataMeningitsWeek27, setDatadataMeningitsWeek27] = useState([]);

useEffect(() => {
  getAllMeningitsWeek27();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataMeningitsWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataMeningitsWeek28, setDatadataMeningitsWeek28] = useState([]);

useEffect(() => {
  getAllMeningitsWeek28();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataMeningitsWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataMeningitsWeek29, setDatadataMeningitsWeek29] = useState([]);
useEffect(() => {
  getAllMeningitsWeek29();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataMeningitsWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataMeningitsWeek30, setDatadataMeningitsWeek30] = useState([]);

useEffect(() => {
  getAllMeningitsWeek30();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataMeningitsWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataMeningitsWeek31, setDatadataMeningitsWeek31] = useState([]);

useEffect(() => {
  getAllMeningitsWeek31();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataMeningitsWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataMeningitsWeek32, setDatadataMeningitsWeek32] = useState([]);

useEffect(() => {
  getAllMeningitsWeek32();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataMeningitsWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataMeningitsWeek33, setDatadataMeningitsWeek33] = useState([]);

useEffect(() => {
  getAllMeningitsWeek33();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataMeningitsWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataMeningitsWeek34, setDatadataMeningitsWeek34] = useState([]);

useEffect(() => {
  getAllMeningitsWeek34();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataMeningitsWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataMeningitsWeek35, setDatadataMeningitsWeek35] = useState([]);

useEffect(() => {
  getAllMeningitsWeek35();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataMeningitsWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataMeningitsWeek36, setDatadataMeningitsWeek36] = useState([]);

useEffect(() => {
  getAllMeningitsWeek36();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataMeningitsWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataMeningitsWeek37, setDatadataMeningitsWeek37] = useState([]);

useEffect(() => {
  getAllMeningitsWeek37();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataMeningitsWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataMeningitsWeek38, setDatadataMeningitsWeek38] = useState([]);

useEffect(() => {
  getAllMeningitsWeek38();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataMeningitsWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataMeningitsWeek39, setDatadataMeningitsWeek39] = useState([]);

useEffect(() => {
  getAllMeningitsWeek39();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataMeningitsWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataMeningitsWeek40, setDatadataMeningitsWeek40] = useState([]);

useEffect(() => {
  getAllMeningitsWeek40();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataMeningitsWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataMeningitsWeek41, setDatadataMeningitsWeek41] = useState([]);

useEffect(() => {
  getAllMeningitsWeek41();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataMeningitsWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataMeningitsWeek42, setDatadataMeningitsWeek42] = useState([]);

useEffect(() => {
  getAllMeningitsWeek42();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataMeningitsWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataMeningitsWeek43, setDatadataMeningitsWeek43] = useState([]);


useEffect(() => {
  getAllMeningitsWeek43();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataMeningitsWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataMeningitsWeek44, setDatadataMeningitsWeek44] = useState([]);

useEffect(() => {
  getAllMeningitsWeek44();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataMeningitsWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataMeningitsWeek45, setDatadataMeningitsWeek45] = useState([]);

useEffect(() => {
  getAllMeningitsWeek45();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataMeningitsWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataMeningitsWeek46, setDatadataMeningitsWeek46] = useState([]);

useEffect(() => {
  getAllMeningitsWeek46();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataMeningitsWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataMeningitsWeek47, setDatadataMeningitsWeek47] = useState([]);

useEffect(() => {
  getAllMeningitsWeek47();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataMeningitsWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataMeningitsWeek48, setDatadataMeningitsWeek48] = useState([]);

useEffect(() => {
  getAllMeningitsWeek48();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataMeningitsWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataMeningitsWeek49, setDatadataMeningitsWeek49] = useState([]);

useEffect(() => {
  getAllMeningitsWeek49();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataMeningitsWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataMeningitsWeek50, setDatadataMeningitsWeek50] = useState([]);

useEffect(() => {
  getAllMeningitsWeek50();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataMeningitsWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataMeningitsWeek51, setDatadataMeningitsWeek51] = useState([]);

useEffect(() => {
  getAllMeningitsWeek51();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataMeningitsWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataMeningitsWeek52, setDatadataMeningitsWeek52] = useState([]);

useEffect(() => {
  getAllMeningitsWeek52();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataMeningitsWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLineMeningits = [{ Week: 'Week 1', Number_of_patient: `${dataMeningitsWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataMeningitsWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataMeningitsWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataMeningitsWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataMeningitsWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataMeningitsWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataMeningitsWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataMeningitsWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataMeningitsWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataMeningitsWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataMeningitsWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataMeningitsWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataMeningitsWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataMeningitsWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataMeningitsWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataMeningitsWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataMeningitsWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataMeningitsWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataMeningitsWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataMeningitsWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataMeningitsWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataMeningitsWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataMeningitsWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataMeningitsWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataMeningitsWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataMeningitsWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataMeningitsWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataMeningitsWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataMeningitsWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataMeningitsWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataMeningitsWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataMeningitsWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataMeningitsWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataMeningitsWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataMeningitsWeek35}` },{Week:'Week 36',Number_of_patient: `${dataMeningitsWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataMeningitsWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataMeningitsWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataMeningitsWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataMeningitsWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataMeningitsWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataMeningitsWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataMeningitsWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataMeningitsWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataMeningitsWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataMeningitsWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataMeningitsWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataMeningitsWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataMeningitsWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataMeningitsWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataMeningitsWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataMeningitsWeek52}`, },
                    ];

  ///////////////////////////////////////////////////
  ///////////////////////Meningits Age Group///LessFive front///////////////////////////single record//////////////
const [dataMeningitsLessFive, setDatadataMeningitsLessFive] = useState([]);

useEffect(() => {
  getAllMeningitsLessFive();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsLessFive = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsLessFive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LessFiveData ");
      setDatadataMeningitsLessFive(data.data);
    
    });
};
///////////////////////////Betweb5To14 front///////////////////////////single record//////////////
const [dataMeningitsBetweb5To14, setDatadataMeningitsBetweb5To14] = useState([]);

useEffect(() => {
  getAllMeningitsBetweb5To14();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsBetweb5To14 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsBetweb5To14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb5To14Data ");
      setDatadataMeningitsBetweb5To14(data.data);
    
    });
};
///////////////////////////Betweb15To29 front///////////////////////////single record//////////////
const [dataMeningitsBetweb15To29, setDatadataMeningitsBetweb15To29] = useState([]);

useEffect(() => {
  getAllMeningitsBetweb15To29();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsBetweb15To29 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsBetweb15To29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb15To29Data ");
      setDatadataMeningitsBetweb15To29(data.data);
    
    });
};

///////////////////////////Betweb30To49 front///////////////////////////single record//////////////
const [dataMeningitsBetweb30To49, setDatadataMeningitsBetweb30To49] = useState([]);

useEffect(() => {
  getAllMeningitsBetweb30To49();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsBetweb30To49= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsBetweb30To49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb30To49Data ");
      setDatadataMeningitsBetweb30To49(data.data);
    
    });
};

///////////////////////////Betweb50To59  front///////////////////////////single record//////////////
const [dataMeningitsBetweb50To59, setDatadataMeningitsBetweb50To59] = useState([]);

useEffect(() => {
  getAllMeningitsBetweb50To59();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsBetweb50To59= () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsBetweb50To59?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb50To59Data ");
      setDatadataMeningitsBetweb50To59(data.data);
    
    });
};

///////////////////////////Betweb60To69 front///////////////////////////single record//////////////
const [dataMeningitsBetweb60To69, setDatadataMeningitsBetweb60To69] = useState([]);

useEffect(() => {
  getAllMeningitsBetweb60To69();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsBetweb60To69 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsBetweb60To69?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb60To69Data ");
      setDatadataMeningitsBetweb60To69(data.data);
    
    });
};

///////////////////////////Above70 front///////////////////////////single record//////////////
const [dataMeningitsAbove70, setDatadataMeningitsAbove70] = useState([]);

useEffect(() => {
  getAllMeningitsAbove70();
},[searchQuery]);

//fetching all cholera
const getAllMeningitsAbove70 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeningitsAbove70?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Above70Data ");
      setDatadataMeningitsAbove70(data.data);
    
    });
};


  const dataAge = [
    {
      name: '<5',
      Number_of_patient: `${dataMeningitsLessFive}`,
      fill: '#8884d8',
    },
    {
      name: '5-14',
      Number_of_patient: `${dataMeningitsBetweb5To14}`,
      fill: '#83a6ed',
    },
    {
      name: '15-29',
      Number_of_patient: `${dataMeningitsBetweb15To29}`,
      fill: '#8dd1e1',
    },
    {
      name: '30-49',
      Number_of_patient: `${dataMeningitsBetweb30To49}`,
      fill: '#82ca9d',
    },
    {
      name: '50-59',
      Number_of_patient: `${dataMeningitsBetweb50To59}`,
      fill: '#a4de6c',
    },
    {
      name: '60-69',
      Number_of_patient: `${dataMeningitsBetweb60To69}`,
      fill: '#d0ed57',
    },
    {
      name: '70+',
      Number_of_patient: `${dataMeningitsAbove70}`,
      fill: '#ffc658',
    },
  ];
  

  ///////////////////////////////////////////////////
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
    name: 'Akaki',
    Number_of_patient: `${dataMeningitsAkaki}`,
  },
  {
    name: 'Addis Ketema',
    Number_of_patient: `${dataMeningitsAddisKetema}`,
  },
  {
    name: 'Arada',
    Number_of_patient: `${dataMeningitsArada}`,
  },
  {
    name: 'Bole',
    Number_of_patient: `${dataMeningitsBole}`,
  },
  {
    name: 'Gulele',
    Number_of_patient: `${dataMeningitsGulele}`,
  },
  {
    name: 'Kirkos',
    Number_of_patient: `${dataMeningitsKirkos}`,
  },
  {
    name: 'kolife',
    Number_of_patient: `${dataMeningitskolife}`,
  },
  {
    name: 'Nifas Silk Lafto',
    Number_of_patient: `${dataMeningitsNifas_Silk_Lafto}`,
  },
  {
    name: 'Lemi Kura',
    Number_of_patient: `${dataMeningitsLemi_Kura}`,
  },
  
  {
    name: 'Lideta',
    Number_of_patient: `${dataMeningitsLideta}`,
  },
  {
    name: 'Yeka',
    Number_of_patient: `${dataMeningitsYeka}`,
  },
];

const getIntroOfPage = (label) => {
  
  if (label === 'Akaki') {
    return `The Number of patient in Addis Ketema is ${dataMeningitsAkaki}`;
  }
  if (label === 'Addis Ketema') {
    return `The Number of patient in Addis Ketema is ${dataMeningitsAddisKetema}`;
  }
  if (label === 'Arada') {
    return `The Number of patient in Arada is ${dataMeningitsArada}`;
  }
  if (label === 'Bole') {
    return `The Number of patient in Bole is ${dataMeningitsBole}`;
  }
  if (label === 'Gulele') {
    return `The Number of patient in Gulele is ${dataMeningitsGulele}`;
  }
  if (label === 'Kirkos') {
    return `The Number of patient in Kirkos is ${dataMeningitsKirkos}`;
  }
  if (label === 'kolife') {
    return `The Number of patient in kolife is ${dataMeningitskolife}`;
  }
  if (label === 'Nifas Silk Lafto') {
    return `The Number of patient in Nifas Silk Lafto is ${dataMeningitsNifas_Silk_Lafto}`;
  }
  if (label === 'Lemi Kura') {
    return `The Number of patient in Lemi Kura is ${dataMeningitsLemi_Kura}`;
  }
  if (label === 'Lideta') {
    return `The Number of patient in Lideta is ${dataMeningitsLideta}`;
  }
  if (label === 'Yeka') {
    return `The Number of patient in Yeka is ${dataMeningitsYeka}`;
  }
  return '';
};
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
        <p className="intro">{getIntroOfPage(label)}</p>
       
      </div>
    );
  }
  return null;
};

const style = {
  top: '50%',
  right: -11,
  transform: 'translate(0, -75%)',
  lineHeight: '24px',
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
  axios.get("http://localhost:3000/Meningits")
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
  const MeningitisLINELIST = useRef(null);
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
        <th className='p-3'><li onClick={() => scrollToSection(MeningitisLINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        Meningitis Cases Line List
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

     



    
    <div className="border border-black " ref={MeningitisLINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT Meningitis Cases Line List</h4>
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
                <th><h6>Patient Full name</h6></th>
                <th><h6>MRN</h6> </th>
                <th><h6>Age</h6></th>
                <th> <h6>Sex </h6></th>
                <th><h6>Phone Number</h6></th>
                <th><h6>Patient Residency Region</h6></th>
                <th> <h6>Patient Zone | Sub City</h6></th>
                <th><h6>Patient Residency Woreda</h6></th>
                <th> <h6>Other Name of Woreda</h6></th>
                <th><h6>Ketena</h6></th>
                <th><h6>Patient House  Number </h6></th>
                <th><h6>Patient Current Occupation</h6></th>
                <th><h6>other, Occupation </h6></th>
                <th><h6>Facility Type</h6></th>
                <th><h6>Specify Facility</h6></th>
                <th><h6>Facility Name</h6></th>
                <th><h6>Pther,name of health facility </h6> </th>
                <th> <h6>Specific name</h6></th>
                <th><h6>Region</h6></th>
                <th><h6>Other,Facility Region</h6></th>
                <th> <h6>Sub City</h6></th>
                <th><h6>Other,Sub-City</h6></th>
                <th> <h6>Woreda </h6></th>
                <th><h6>Other,Woreda</h6></th>
                <th><h6>Date of Reporting</h6></th>
                <th><h6> Date seen at health facility </h6></th>
                <th><h6>Date of onset of disease </h6></th>
                <th> <h6>Presenting clinical feature</h6></th>
                <th><h6> Sample taken  </h6></th>
                <th> <h6>Date Specimen collected </h6></th>
                <th><h6>Types of tests</h6></th>
                <th><h6>test result</h6></th>
                <th><h6>types of organisms identified</h6></th>
                <th><h6> case category</h6></th>
                <th><h6> Patient referral status</h6></th>
                <th><h6>Patient referral status,Wher ?  </h6></th>
                <th><h6>Admission status</h6></th>
                <th><h6> Date of admission </h6></th>
                <th> <h6>Date of discharge</h6></th>
                <th><h6>Patient outcome</h6></th>
                <th><h6>comorbidity</h6></th>
                <th><h6>yes, test result</h6></th>
                <th><h6> name of data collector </h6></th>
                <th><h6>Phone number </h6></th>
                <th><h6>EPI_Week </h6></th>
                <th><h6>Any picture 1 </h6></th>
                
          
              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.StartDate}</h6></th>
                  <th ><h6>{filer.pname}</h6></th>
                  <th ><h6>{filer.MRN}</h6></th>
                  <th><h6>{filer.Age}</h6></th>
                  <th><h6>{filer.Sex}</h6></th>
                  <th><h6>{filer.PPhone}</h6></th>
                  <th><h6>{filer.PRegion}</h6></th>
                  <th ><h6>{filer.PSubCity}</h6></th>
                  <th ><h6>{filer.PWoreda}</h6></th>
                  <th><h6>{filer.pTWoreda}</h6></th>
                  <th><h6>{filer.Ketena}</h6></th>
                  <th ><h6>{filer.HNumber}</h6></th>
                  <th><h6>{filer.POccupation}</h6></th>
                  <th><h6>{filer.TPOccupation}</h6></th>
                  <th><h6>{filer.FacilityT}</h6></th>
                  <th><h6>{filer.TFacilityT}</h6></th>
                  <th ><h6>{filer.HFName}</h6></th>
                  <th ><h6>{filer.HFTName}</h6></th>
                  <th><h6>{filer.SpecifyF}</h6></th>
                  <th><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.HTRegion}</h6></th>
                  <th ><h6>{filer.HSubCity}</h6></th>
                  <th ><h6>{filer.THSubCity}</h6></th>
                  <th><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HFTworeda}</h6></th>
                  <th><h6>{filer.DReporting}</h6></th>

                  <th ><h6>{filer.seenDate}</h6></th>
                  <th><h6>{filer.Odisease}</h6></th>
                  <th><h6>{filer.Cfeature}</h6></th>
                  <th><h6>{filer.SampleT}</h6></th>
                  <th ><h6>{filer.DSampleT}</h6></th>
                  <th ><h6>{filer.SampleTT}</h6></th>
                  <th><h6>{filer.SampleTR}</h6></th>
                  <th><h6>{filer.SampleTPG}</h6></th>
                  <th><h6>{filer.Pcategory}</h6></th>
                  <th ><h6>{filer.Preferral}</h6></th>
                  <th><h6>{filer.TPreferral}</h6></th>
                  <th ><h6>{filer.AdmissionS}</h6></th>
                  <th ><h6>{filer.DAdmissionS}</h6></th>
                  <th><h6>{filer.AdmissionSDD}</h6></th>
                  <th><h6>{filer.Poutcome}</h6></th>
                  <th><h6>{filer.Comorbidity}</h6></th>
                  <th ><h6>{filer.TComorbidity}</h6></th>
                  <th><h6>{filer.FCName}</h6></th>
                  <th><h6>{filer.Phone}</h6></th>
                  <th><h6>{filer.EPIWeek}</h6></th>
                  <th><h6>{filer.pdf}</h6></th>
                  
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

       
   <br />
        


        <div ref={conponentPDF} style={{width:'100%'}}>
    <div className='w-100 h-100 row bg-white rounded p-0  border border-danger mb-5 Scrol-Table ' ref={Chart}>
    <table className='Scrol-Table table light padding table-responsive'>
    <tr className='border border-secondary'>  
    <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MENINGITS TREND </p>
      <LineChart
          width={800}
          height={300}
          data={dataLineMeningits}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="Week" />
          <YAxis />
          <Tooltip />
          <Legend iconSize={10} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
          <Line type="monotone" dataKey="Number_of_patient" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    </th>
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MENINGITS AGE GROUP </p>
    
        <ComposedChart
          layout="vertical"
          width={800}
          height={400}
          data={dataAge}
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
          
          <Bar dataKey="Number_of_patient" barSize={20} fill="#413ea0" />
      
        </ComposedChart>
      
    </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MENINGITS BY GENDER </p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataPai}
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
          <Legend iconSize={10} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
        </PieChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MENINGITS PATIENT OUTCOME </p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataPoutcome}
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
          <Legend iconSize={10} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
        </PieChart>
        </th>
      
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MENINGITS IN SUBCITY </p>
    <BarChart
          width={800}
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
          <Bar dataKey="Number_of_patient" barSize={20} fill="#8884d8" />
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

export default Meningits_Report

