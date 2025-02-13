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
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`Total ${value}`},
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};
function PrenatalDeath_Report() {
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
 const [dataPrenatalDeathAkaki, setDatadataPrenatalDeathAkaki] = useState([]);
 const [searchQuery,setSearchQuery]=useState("")
 
 useEffect(() => {
   getAllPrenatalDeathAkaki();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathAkaki = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathAkaki?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathAkaki(data.data);
     
     });
 };
 ///////////////////////////AddisKetema front///////////////////////////single record//////////////
 const [dataPrenatalDeathAddisKetema, setDatadataPrenatalDeathAddisKetema] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathAddisKetema();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathAddisKetema = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathaAddisKetema?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AddisKetemaData ");
       setDatadataPrenatalDeathAddisKetema(data.data);
     
     });
 };
 ///////////////////////////Arada front///////////////////////////single record//////////////
 const [dataPrenatalDeathArada, setDatadataPrenatalDeathArada] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathArada();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathArada = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathArada?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AradaData ");
       setDatadataPrenatalDeathArada(data.data);
     
     });
 };
 ///////////////////////////Bole front///////////////////////////single record//////////////
 const [dataPrenatalDeathBole, setDatadataPrenatalDeathBole] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathBole();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathBole = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathBole?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "BoleData ");
       setDatadataPrenatalDeathBole(data.data);
     
     });
 };
 ///////////////////////////Gulele front///////////////////////////single record//////////////
 const [dataPrenatalDeathGulele, setDatadataPrenatalDeathGulele] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathGulele();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathGulele = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathGulele?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "GuleleData ");
       setDatadataPrenatalDeathGulele(data.data);
     
     });
 };
 
 ///////////////////////////Kirkos front///////////////////////////single record//////////////
 const [dataPrenatalDeathKirkos, setDatadataPrenatalDeathKirkos] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathKirkos();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathKirkos= () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathKirkos?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "KirkosData ");
       setDatadataPrenatalDeathKirkos(data.data);
     
     });
 };
 
 ///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
 const [dataPrenatalDeathkolife, setDatadataPrenatalDeathkolife] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathkolife();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathkolife= () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathkolife?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "kolifeData ");
       setDatadataPrenatalDeathkolife(data.data);
     
     });
 };
 
 ///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
 const [dataPrenatalDeathNifas_Silk_Lafto, setDatadataPrenatalDeathNifas_Silk_Lafto] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathNifas_Silk_Lafto();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathNifas_Silk_Lafto = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathNifas_Silk_Lafto?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Nifas_Silk_LaftoData ");
       setDatadataPrenatalDeathNifas_Silk_Lafto(data.data);
     
     });
 };
 
 ///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
 const [dataPrenatalDeathLemi_Kura, setDatadataPrenatalDeathLemi_Kura] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathLemi_Kura();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathLemi_Kura = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathLemi_Kura?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Lemi_KuraData ");
       setDatadataPrenatalDeathLemi_Kura(data.data);
     
     });
 };
 
 ///////////////////////////Lideta front///////////////////////////single record//////////////
 const [dataPrenatalDeathLideta, setDatadataPrenatalDeathLideta] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathLideta();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathLideta = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathLideta?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LidetaData ");
       setDatadataPrenatalDeathLideta(data.data);
     
     });
 };
 ///////////////////////////Yeka front///////////////////////////single record//////////////
 const [dataPrenatalDeathYeka, setDatadataPrenatalDeathYeka] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathYeka();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathYeka = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathYeka?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "YekaData ");
       setDatadataPrenatalDeathYeka(data.data);
     
     });
 };
 
 ////////////////////////////////////////////////////////////single/////////////////////////////////
 ///////////////////////////Female front///////////////////////////single record//////////////
 const [dataPrenatalDeathFemale, setDatadataPrenatalDeathFemale] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathFemale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathFemale = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathFemale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathFemale(data.data);
     
     });
 };
 ///////////////////////////Male front///////////////////////////single record//////////////
 const [dataPrenatalDeathMale, setDatadataPrenatalDeathMale] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathMale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathMale = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathMale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathMale(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataPai = [
     
     { name: 'Female', value: parseInt(`${dataPrenatalDeathFemale}`)},
     { name: 'Male', value: parseInt(`${dataPrenatalDeathMale}`)},
    
   ];
   /////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////single/////////////////////////////////
 ///////////////////////////Alive front///////////////////////////single record//////////////
 const [dataPrenatalDeathAlive, setDatadataPrenatalDeathAlive] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathAlive();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathAlive = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathAlive?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathAlive(data.data);
     
     });
 };
 ///////////////////////////Dead front///////////////////////////single record//////////////
 const [dataPrenatalDeathDead, setDatadataPrenatalDeathDead] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathDead();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathDead = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathDead?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathDead(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataPaiStatus = [
     
     { name: 'Alive / live birth', value: parseInt(`${dataPrenatalDeathAlive}`)},
     { name: 'Dead / Still birth', value: parseInt(`${dataPrenatalDeathDead}`)},
    
   ];
   /////////////////////////////////////////////////////
   ///////////////////////////Yes front///////////////////////////single record//////////////
 const [dataPrenatalDeathYes, setDatadataPrenatalDeathYes] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathYes();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathYes = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathYes?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathYes(data.data);
     
     });
 };
 ///////////////////////////No front///////////////////////////single record//////////////
 const [dataPrenatalDeathNo, setDatadataPrenatalDeathNo] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathNo();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathNo = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathNo?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathNo(data.data);
     
     });
 };
 ///////////////////////////Unknown front///////////////////////////single record//////////////
 const [dataPrenatalDeathUnknown, setDatadataPrenatalDeathUnknown] = useState([]);
 
 useEffect(() => {
   getAllPrenatalDeathUnknown();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathUnknown = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathUnknown?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathUnknown(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataPreventability = [
    { name: 'Yes', Number_of_patient: parseInt(`${dataPrenatalDeathYes}`)},
     { name: 'No', Number_of_patient: parseInt(`${dataPrenatalDeathNo}`)},
     { name: 'Unknown', Number_of_patient: parseInt(`${dataPrenatalDeathUnknown}`)},
    
   ];
   /////////////////////////////////////////////////////
   ///////////////////////////HealthCenter front///////////////////////////single record//////////////
const [dataPrenatalDeathHealthCenter, setDatadataPrenatalDeathHealthCenter] = useState([]);

useEffect(() => {
  getAllPrenatalDeathHealthCenter();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathHealthCenter = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathHealthCenter?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataPrenatalDeathHealthCenter(data.data);
    
    });
};
 ///////////////////////////clinic front///////////////////////////single record//////////////
 const [dataPrenatalDeathclinic, setDatadataPrenatalDeathclinic] = useState([]);

 useEffect(() => {
   getAllPrenatalDeathclinic();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPrenatalDeathclinic = () => {
   fetch(`http://localhost:3000/Gete-SinglePrenatalDeathclinic?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPrenatalDeathclinic(data.data);
     
     });
 };
///////////////////////////Hospital front///////////////////////////single record//////////////
const [dataPrenatalDeathHospital, setDatadataPrenatalDeathHospital] = useState([]);

useEffect(() => {
  getAllPrenatalDeathHospital();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathHospital = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataPrenatalDeathHospital(data.data);
    
    });
};
const datareportingFacility  = [
  {
    name: 'HealthCenter',
    Number_of_patient: `${dataPrenatalDeathHealthCenter}`,
  },
  {
    name: 'clinic',
    Number_of_patient: `${dataPrenatalDeathclinic}`,
  },
  {
    name: 'Hospital',
    Number_of_patient: `${dataPrenatalDeathHospital}`,
  },
]

///////////////////////////////////////////////////
   ///////////////////////////front///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataPrenatalDeathWeek1, setDatadataPrenatalDeathWeek1] = useState([]);
useEffect(() => {
  getAllPrenatalDeathWeek1();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataPrenatalDeathWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek2, setDatadataPrenatalDeathWeek2] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek2();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataPrenatalDeathWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek3, setDatadataPrenatalDeathWeek3] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek3();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataPrenatalDeathWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek4, setDatadataPrenatalDeathWeek4] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek4();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataPrenatalDeathWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek5, setDatadataPrenatalDeathWeek5] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek5();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataPrenatalDeathWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek6, setDatadataPrenatalDeathWeek6] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek6();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek6= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataPrenatalDeathWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek7, setDatadataPrenatalDeathWeek7] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek7();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek7= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataPrenatalDeathWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek8, setDatadataPrenatalDeathWeek8] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek8();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataPrenatalDeathWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek9, setDatadataPrenatalDeathWeek9] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek9();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataPrenatalDeathWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek10, setDatadataPrenatalDeathWeek10] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek10();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataPrenatalDeathWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek11, setDatadataPrenatalDeathWeek11] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek11();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataPrenatalDeathWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek12, setDatadataPrenatalDeathWeek12] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek12();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataPrenatalDeathWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek13, setDatadataPrenatalDeathWeek13] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek13();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataPrenatalDeathWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek14, setDatadataPrenatalDeathWeek14] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek14();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataPrenatalDeathWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek15, setDatadataPrenatalDeathWeek15] = useState([]);


useEffect(() => {
  getAllPrenatalDeathWeek15();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataPrenatalDeathWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek16, setDatadataPrenatalDeathWeek16] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek16();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataPrenatalDeathWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek17, setDatadataPrenatalDeathWeek17] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek17();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataPrenatalDeathWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek18, setDatadataPrenatalDeathWeek18] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek18();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataPrenatalDeathWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek19, setDatadataPrenatalDeathWeek19] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek19();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataPrenatalDeathWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek20, setDatadataPrenatalDeathWeek20] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek20();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek20= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataPrenatalDeathWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek21, setDatadataPrenatalDeathWeek21] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek21();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek21= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataPrenatalDeathWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek22, setDatadataPrenatalDeathWeek22] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek22();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataPrenatalDeathWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek23, setDatadataPrenatalDeathWeek23] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek23();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataPrenatalDeathWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek24, setDatadataPrenatalDeathWeek24] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek24();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataPrenatalDeathWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek25, setDatadataPrenatalDeathWeek25] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek25();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataPrenatalDeathWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek26, setDatadataPrenatalDeathWeek26] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek26();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataPrenatalDeathWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek27, setDatadataPrenatalDeathWeek27] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek27();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataPrenatalDeathWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek28, setDatadataPrenatalDeathWeek28] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek28();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataPrenatalDeathWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek29, setDatadataPrenatalDeathWeek29] = useState([]);
useEffect(() => {
  getAllPrenatalDeathWeek29();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataPrenatalDeathWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek30, setDatadataPrenatalDeathWeek30] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek30();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataPrenatalDeathWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek31, setDatadataPrenatalDeathWeek31] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek31();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataPrenatalDeathWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek32, setDatadataPrenatalDeathWeek32] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek32();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataPrenatalDeathWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek33, setDatadataPrenatalDeathWeek33] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek33();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataPrenatalDeathWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek34, setDatadataPrenatalDeathWeek34] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek34();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek34= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataPrenatalDeathWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek35, setDatadataPrenatalDeathWeek35] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek35();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek35= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataPrenatalDeathWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek36, setDatadataPrenatalDeathWeek36] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek36();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataPrenatalDeathWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek37, setDatadataPrenatalDeathWeek37] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek37();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataPrenatalDeathWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek38, setDatadataPrenatalDeathWeek38] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek38();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataPrenatalDeathWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek39, setDatadataPrenatalDeathWeek39] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek39();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataPrenatalDeathWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek40, setDatadataPrenatalDeathWeek40] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek40();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataPrenatalDeathWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek41, setDatadataPrenatalDeathWeek41] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek41();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataPrenatalDeathWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek42, setDatadataPrenatalDeathWeek42] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek42();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataPrenatalDeathWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek43, setDatadataPrenatalDeathWeek43] = useState([]);


useEffect(() => {
  getAllPrenatalDeathWeek43();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataPrenatalDeathWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek44, setDatadataPrenatalDeathWeek44] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek44();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataPrenatalDeathWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek45, setDatadataPrenatalDeathWeek45] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek45();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataPrenatalDeathWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek46, setDatadataPrenatalDeathWeek46] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek46();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataPrenatalDeathWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek47, setDatadataPrenatalDeathWeek47] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek47();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataPrenatalDeathWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek48, setDatadataPrenatalDeathWeek48] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek48();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek48= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataPrenatalDeathWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek49, setDatadataPrenatalDeathWeek49] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek49();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek49= () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataPrenatalDeathWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek50, setDatadataPrenatalDeathWeek50] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek50();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataPrenatalDeathWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek51, setDatadataPrenatalDeathWeek51] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek51();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataPrenatalDeathWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataPrenatalDeathWeek52, setDatadataPrenatalDeathWeek52] = useState([]);

useEffect(() => {
  getAllPrenatalDeathWeek52();
},[searchQuery]);

//fetching all cholera
const getAllPrenatalDeathWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SinglePrenatalDeathWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataPrenatalDeathWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLine = [{ Week: 'Week 1', Number_of_patient: `${dataPrenatalDeathWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataPrenatalDeathWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataPrenatalDeathWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataPrenatalDeathWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataPrenatalDeathWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataPrenatalDeathWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataPrenatalDeathWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataPrenatalDeathWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataPrenatalDeathWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataPrenatalDeathWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataPrenatalDeathWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataPrenatalDeathWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataPrenatalDeathWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataPrenatalDeathWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataPrenatalDeathWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataPrenatalDeathWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataPrenatalDeathWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataPrenatalDeathWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataPrenatalDeathWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataPrenatalDeathWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataPrenatalDeathWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataPrenatalDeathWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataPrenatalDeathWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataPrenatalDeathWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataPrenatalDeathWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataPrenatalDeathWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataPrenatalDeathWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataPrenatalDeathWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataPrenatalDeathWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataPrenatalDeathWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataPrenatalDeathWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataPrenatalDeathWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataPrenatalDeathWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataPrenatalDeathWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataPrenatalDeathWeek35}` },{Week:'Week 36',Number_of_patient: `${dataPrenatalDeathWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataPrenatalDeathWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataPrenatalDeathWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataPrenatalDeathWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataPrenatalDeathWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataPrenatalDeathWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataPrenatalDeathWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataPrenatalDeathWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataPrenatalDeathWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataPrenatalDeathWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataPrenatalDeathWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataPrenatalDeathWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataPrenatalDeathWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataPrenatalDeathWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataPrenatalDeathWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataPrenatalDeathWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataPrenatalDeathWeek52}`, },
                    ];

  ///////////////////////////////////////////////////
   const dataLin = [
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
     Number_of_patient: `${dataPrenatalDeathAkaki}`,
   },
   {
     name: 'Addis Ketema',
     Number_of_patient: `${dataPrenatalDeathAddisKetema}`,
   },
   {
     name: 'Arada',
     Number_of_patient: `${dataPrenatalDeathArada}`,
   },
   {
     name: 'Bole',
     Number_of_patient: `${dataPrenatalDeathBole}`,
   },
   {
     name: 'Gulele',
     Number_of_patient: `${dataPrenatalDeathGulele}`,
   },
   {
     name: 'Kirkos',
     Number_of_patient: `${dataPrenatalDeathKirkos}`,
   },
   {
     name: 'kolife',
     Number_of_patient: `${dataPrenatalDeathkolife}`,
   },
   {
     name: 'Nifas Silk Lafto',
     Number_of_patient: `${dataPrenatalDeathNifas_Silk_Lafto}`,
   },
   {
     name: 'Lemi Kura',
     Number_of_patient: `${dataPrenatalDeathLemi_Kura}`,
   },
   
   {
     name: 'Lideta',
     Number_of_patient: `${dataPrenatalDeathLideta}`,
   },
   {
     name: 'Yeka',
     Number_of_patient: `${dataPrenatalDeathYeka}`,
   },
 ];
 
 const getIntroOfPage = (label) => {
   
   if (label === 'Akaki') {
     return `The Number of patient in Addis Ketema is ${dataPrenatalDeathAkaki}`;
   }
   if (label === 'Addis Ketema') {
     return `The Number of patient in Addis Ketema is ${dataPrenatalDeathAddisKetema}`;
   }
   if (label === 'Arada') {
     return `The Number of patient in Arada is ${dataPrenatalDeathArada}`;
   }
   if (label === 'Bole') {
     return `The Number of patient in Bole is ${dataPrenatalDeathBole}`;
   }
   if (label === 'Gulele') {
     return `The Number of patient in Gulele is ${dataPrenatalDeathGulele}`;
   }
   if (label === 'Kirkos') {
     return `The Number of patient in Kirkos is ${dataPrenatalDeathKirkos}`;
   }
   if (label === 'kolife') {
     return `The Number of patient in kolife is ${dataPrenatalDeathkolife}`;
   }
   if (label === 'Nifas Silk Lafto') {
     return `The Number of patient in Nifas Silk Lafto is ${dataPrenatalDeathNifas_Silk_Lafto}`;
   }
   if (label === 'Lemi Kura') {
     return `The Number of patient in Lemi Kura is ${dataPrenatalDeathLemi_Kura}`;
   }
   if (label === 'Lideta') {
     return `The Number of patient in Lideta is ${dataPrenatalDeathLideta}`;
   }
   if (label === 'Yeka') {
     return `The Number of patient in Yeka is ${dataPrenatalDeathYeka}`;
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
///////////////////////////////////////////////////
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
  axios.get("http://localhost:3000/GetePrenatalDeath")
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
  setrecords(Data.filter(f => f.EPIWeek .toLowerCase().includes(event.target.value)))
}

  //////////////////////////// link component selection///////
  const PrenatalDeathINELIST = useRef(null);
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
        <th className='p-3'><li onClick={() => scrollToSection(PrenatalDeathINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        PrenatalDeath LINE LIST
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

     



    
    <div className="border border-black " ref={PrenatalDeathINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT PrenatalDeath LINE LIST </h4>
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
                <th><h6>Deceased ID (code)</h6></th>
                <th><h6>Age at Death (Days)</h6></th>
                <th><h6>Residence of Deceased | Parents</h6> </th>
                <th><h6>Deceased Residency Region</h6></th>
                <th> <h6>Residency Region </h6></th>
                <th><h6>Deceased Sub City</h6></th>
                <th><h6>Deceased Zone</h6></th>
                <th> <h6>Deceased Residency Woreda</h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th> <h6>Kebele | Ketena</h6></th>
                <th><h6>Date of birth</h6></th>
                <th><h6>Day | Night</h6></th>
                <th><h6>Time of berth</h6></th>
                <th><h6>Date and time of prinata death </h6></th>
                <th><h6>Day | Night</h6></th>
                <th><h6>Time of prinata death</h6></th>
                <th><h6>Sex of the deceased</h6></th>
                <th><h6>Estimated gestational age at delivery in weeks</h6> </th>
                <th> <h6>Place of death</h6></th>
                <th><h6>Is the mother of the deceased perinate alive</h6></th>
                <th><h6>Age of the mother (years)</h6></th>
                <th> <h6>Parity</h6></th>
                <th><h6>Number of alive children</h6></th>
                <th> <h6>Religion of the mother</h6></th>
                <th><h6>other, Religion</h6></th>
                <th><h6>Educational status</h6></th>
                <th><h6>Occupation of the mother</h6></th>
                <th><h6>other, Specify Occupation</h6></th>
                <th><h6>Reporting Health Facility Type</h6></th>
                <th> <h6>other, Specify Facility</h6></th>
                <th><h6>Reporting Health Facility Name</h6></th>
                <th> <h6>Specify if name of health facility</h6></th>
                <th><h6>name of health facility</h6></th>
                <th><h6>Region</h6></th>
                <th><h6>Health Facility Region</h6></th>
                <th><h6>Name of Sub City</h6></th>
                <th><h6>Health Facility Sub-City</h6></th>

                <th><h6>Name of Woreda </h6> </th>
                <th> <h6>Health Facility Woreda</h6></th>
                <th><h6>Date of Reporting</h6></th>
                <th><h6>PDRF is extracted from</h6></th>
                <th> <h6>Date of onset</h6></th>
                <th><h6>Date of onset of rash</h6></th>
                <th> <h6>Number of ANC visits in relation to the deceased case (report)</h6></th>
                <th><h6>Number of TT vaccine during the pregnancy of the deceased case</h6></th>
                <th><h6>Mode of delivery of the deceased baby </h6></th>
                <th><h6>Status of the baby at birth</h6></th>
                <th><h6>alive APGAR score at 5th minute</h6></th>
                <th><h6>Where was the deceased baby born</h6></th>
                <th> <h6>Maternal disease or condition identified</h6></th>
                <th><h6>Neonatal Cause of Death</h6></th>
                <th> <h6>other cause of death, please specify</h6></th>
                <th><h6>Maternal cause of death</h6></th>
                <th><h6>other maternal cause of death</h6></th>
                <th><h6>Timing of the death</h6></th>
                <th><h6>Is the death preventable</h6></th>
                <th><h6>Maternal cause of death</h6></th>

                <th><h6>Delay 1</h6> </th>
                <th> <h6>Delay 2</h6></th>
                <th><h6>Delay 3</h6></th>
                <th><h6>Shortage equipment's</h6></th>
                <th> <h6>Name of officer completing</h6></th>
                <th><h6>Phone number</h6></th>
                <th> <h6>EPI_Week</h6></th>
                <th><h6>photo</h6></th>
                

              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
,
                    <th><h6>{filer.ID}</h6></th>
                  <th ><h6>{filer.Age}</h6></th>
                  <th ><h6>{filer.Residence}</h6></th>
                  <th><h6>{filer.PRegion}</h6></th>
                  <th><h6>{filer.TRegion}</h6></th>
                  <th><h6>{filer.PSubCity}</h6></th>
                  <th ><h6>{filer.Zone}</h6></th>
                  <th ><h6>{filer.PWoreda}</h6></th>
                  <th><h6>{filer.pTWoreda}</h6></th>
                  <th><h6>{filer.Kebele}</h6></th>
                  <th><h6>{filer.BDate}</h6></th>
                  <th ><h6>{filer.DN}</h6></th>
                  <th><h6>{filer.Time}</h6></th>
                  <th><h6>{filer.PrinataDDate}</h6></th>
                  <th><h6>{filer.PDN}</h6></th>
                  <th><h6>{filer.TDTime}</h6></th>
                  <th ><h6>{filer.Sex}</h6></th>
                  <th ><h6>{filer.gestationalAge}</h6></th>
                  <th><h6>{filer.Pdeath}</h6></th>
                  <th><h6>{filer.Malive}</h6></th>
                  <th><h6>{filer.MAge}</h6></th>
                  <th ><h6>{filer.TParity}</h6></th>
                  <th ><h6>{filer.AliveChildren}</h6></th>
                  <th><h6>{filer.Religion}</h6></th>
                  <th><h6>{filer.TReligion}</h6></th>
                  <th><h6>{filer.Educational}</h6></th>
                  <th ><h6>{filer.POccupation}</h6></th>
            

                  <th><h6>{filer.TPOccupation}</h6></th>
                  <th><h6>{filer.FacilityT}</h6></th>
                  <th><h6>{filer.TFacilityT}</h6></th>
                  <th ><h6>{filer.FacilityN}</h6></th>
                  <th ><h6>{filer.HFTName}</h6></th>
                  <th><h6>{filer.SpecifyF}</h6></th>
                  <th><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.HTRegion}</h6></th>
                  <th ><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.HWoreda}</h6></th>

                  <th><h6>{filer.HFTworeda}</h6></th>
                  <th><h6>{filer.DReporting}</h6></th>
                  <th><h6>{filer.PDRF}</h6></th>
                  <th ><h6>{filer.OnsetDate}</h6></th>
                  <th ><h6>{filer.Orash}</h6></th>
                  <th><h6>{filer.ANC}</h6></th>
                  <th><h6>{filer.TTVaccine}</h6></th>
                  <th><h6>{filer.Mode}</h6></th>
                  <th ><h6>{filer.Status}</h6></th>
                  <th><h6>{filer.TAliveAPGAR}</h6></th>
                  
                  <th><h6>{filer.BabyBorn}</h6></th>
                  <th><h6>{filer.Maternal}</h6></th>
                  <th><h6>{filer.Neonatal}</h6></th>
                  <th ><h6>{filer.TNeonatal}</h6></th>
                  <th ><h6>{filer.CMaternal}</h6></th>
                  <th><h6>{filer.TCMaternal}</h6></th>
                  <th><h6>{filer.TimingD}</h6></th>
                  <th><h6>{filer.preventable}</h6></th>
                  <th ><h6>{filer.Ccause}</h6></th>
                  <th><h6>{filer.Delay1}</h6></th>

                  <th><h6>{filer.Delay2}</h6></th>
                  <th><h6>{filer.Delay3}</h6></th>
                  <th><h6>{filer.Supplies}</h6></th>
                  <th ><h6>{filer.FCName}</h6></th>
                  <th ><h6>{filer.Phone}</h6></th>
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Perinatal death distribution per Epi-Weeek</p>
      <LineChart
          width={800}
          height={300}
          data={dataLine}
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
          <Legend />
          <Line type="monotone" dataKey="Number_of_patient" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    </th>
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Perinatal death reported HF type </p>
        <BarChart
          width={800}
          height={300}
          data={datareportingFacility}
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
          <Tooltip />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
          <Bar dataKey="Number_of_patient" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Sex of deceased babies</p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataPai}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </PieChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Preventability of perinatal death </p>
        <BarChart
          width={800}
          height={300}
          data={dataPreventability}
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
          <Tooltip />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
          <Bar dataKey="Number_of_patient" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Status of deceased babies during delivery </p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataPaiStatus}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </PieChart>
        </th>
        
       
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">perinatal death By Subcity</p>
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

export default PrenatalDeath_Report

