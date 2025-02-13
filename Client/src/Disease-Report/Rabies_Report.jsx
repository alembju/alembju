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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,ComposedChart} from 'recharts';
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
function Rabies_Report() {
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


  ///////////////////////////front///////////////////////////Akaki single record//////////////Gete-SingleCholeraAddisKetema
 const [dataRabiesAkaki, setDatadataRabiesAkaki] = useState([]);
 const [searchQuery,setSearchQuery]=useState("")
 
 useEffect(() => {
   getAllRabiesAkaki();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesAkaki = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesAkaki?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRabiesAkaki(data.data);
     
     });
 };
 ///////////////////////////AddisKetema front///////////////////////////single record//////////////
 const [dataRabiesAddisKetema, setDatadataRabiesAddisKetema] = useState([]);
 
 useEffect(() => {
   getAllRabiesAddisKetema();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesAddisKetema = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesaAddisKetema?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AddisKetemaData ");
       setDatadataRabiesAddisKetema(data.data);
     
     });
 };
 ///////////////////////////Arada front///////////////////////////single record//////////////
 const [dataRabiesArada, setDatadataRabiesArada] = useState([]);
 
 useEffect(() => {
   getAllRabiesArada();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesArada = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesArada?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AradaData ");
       setDatadataRabiesArada(data.data);
     
     });
 };
 ///////////////////////////Bole front///////////////////////////single record//////////////
 const [dataRabiesBole, setDatadataRabiesBole] = useState([]);
 
 useEffect(() => {
   getAllRabiesBole();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesBole = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesBole?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "BoleData ");
       setDatadataRabiesBole(data.data);
     
     });
 };
 ///////////////////////////Gulele front///////////////////////////single record//////////////
 const [dataRabiesGulele, setDatadataRabiesGulele] = useState([]);
 
 useEffect(() => {
   getAllRabiesGulele();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesGulele = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesGulele?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "GuleleData ");
       setDatadataRabiesGulele(data.data);
     
     });
 };
 
 ///////////////////////////Kirkos front///////////////////////////single record//////////////
 const [dataRabiesKirkos, setDatadataRabiesKirkos] = useState([]);
 
 useEffect(() => {
   getAllRabiesKirkos();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesKirkos= () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesKirkos?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "KirkosData ");
       setDatadataRabiesKirkos(data.data);
     
     });
 };
 
 ///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
 const [dataRabieskolife, setDatadataRabieskolife] = useState([]);
 
 useEffect(() => {
   getAllRabieskolife();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabieskolife= () => {
   fetch(`http://localhost:3000/Gete-SingleRabieskolife?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "kolifeData ");
       setDatadataRabieskolife(data.data);
     
     });
 };
 
 ///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
 const [dataRabiesNifas_Silk_Lafto, setDatadataRabiesNifas_Silk_Lafto] = useState([]);
 
 useEffect(() => {
   getAllRabiesNifas_Silk_Lafto();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesNifas_Silk_Lafto = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesNifas_Silk_Lafto?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Nifas_Silk_LaftoData ");
       setDatadataRabiesNifas_Silk_Lafto(data.data);
     
     });
 };
 
 ///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
 const [dataRabiesLemi_Kura, setDatadataRabiesLemi_Kura] = useState([]);
 
 useEffect(() => {
   getAllRabiesLemi_Kura();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesLemi_Kura = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesLemi_Kura?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Lemi_KuraData ");
       setDatadataRabiesLemi_Kura(data.data);
     
     });
 };
 
 ///////////////////////////Lideta front///////////////////////////single record//////////////
 const [dataRabiesLideta, setDatadataRabiesLideta] = useState([]);
 
 useEffect(() => {
   getAllRabiesLideta();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesLideta = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesLideta?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LidetaData ");
       setDatadataRabiesLideta(data.data);
     
     });
 };
 ///////////////////////////Yeka front///////////////////////////single record//////////////
 const [dataRabiesYeka, setDatadataRabiesYeka] = useState([]);
 
 useEffect(() => {
   getAllRabiesYeka();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesYeka = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesYeka?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "YekaData ");
       setDatadataRabiesYeka(data.data);
     
     });
 };
 
 ////////////////////////////////////////////////////////////single/////////////////////////////////
 const datas = [
  {
    name: 'Akaki',
    Number_of_patient: `${dataRabiesAkaki}`,
  },
  {
    name: 'Addis Ketema',
    Number_of_patient: `${dataRabiesAddisKetema}`,
  },
  {
    name: 'Arada',
    Number_of_patient: `${dataRabiesArada}`,
  },
  {
    name: 'Bole',
    Number_of_patient: `${dataRabiesBole}`,
  },
  {
    name: 'Gulele',
    Number_of_patient: `${dataRabiesGulele}`,
  },
  {
    name: 'Kirkos',
    Number_of_patient: `${dataRabiesKirkos}`,
  },
  {
    name: 'kolife',
    Number_of_patient: `${dataRabieskolife}`,
  },
  {
    name: 'Nifas Silk Lafto',
    Number_of_patient: `${dataRabiesNifas_Silk_Lafto}`,
  },
  {
    name: 'Lemi Kura',
    Number_of_patient: `${dataRabiesLemi_Kura}`,
  },
  
  {
    name: 'Lideta',
    Number_of_patient: `${dataRabiesLideta}`,
  },
  {
    name: 'Yeka',
    Number_of_patient: `${dataRabiesYeka}`,
  },
];

const getIntroOfPage = (label) => {
  
  if (label === 'Akaki') {
    return `The Number of patient in Addis Ketema is ${dataRabiesAkaki}`;
  }
  if (label === 'Addis Ketema') {
    return `The Number of patient in Addis Ketema is ${dataRabiesAddisKetema}`;
  }
  if (label === 'Arada') {
    return `The Number of patient in Arada is ${dataRabiesArada}`;
  }
  if (label === 'Bole') {
    return `The Number of patient in Bole is ${dataRabiesBole}`;
  }
  if (label === 'Gulele') {
    return `The Number of patient in Gulele is ${dataRabiesGulele}`;
  }
  if (label === 'Kirkos') {
    return `The Number of patient in Kirkos is ${dataRabiesKirkos}`;
  }
  if (label === 'kolife') {
    return `The Number of patient in kolife is ${dataRabieskolife}`;
  }
  if (label === 'Nifas Silk Lafto') {
    return `The Number of patient in Nifas Silk Lafto is ${dataRabiesNifas_Silk_Lafto}`;
  }
  if (label === 'Lemi Kura') {
    return `The Number of patient in Lemi Kura is ${dataRabiesLemi_Kura}`;
  }
  if (label === 'Lideta') {
    return `The Number of patient in Lideta is ${dataRabiesLideta}`;
  }
  if (label === 'Yeka') {
    return `The Number of patient in Yeka is ${dataRabiesYeka}`;
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
 ///////////////////////////Female front///////////////////////////single record//////////////
 const [dataRabiesFemale, setDatadataRabiesFemale] = useState([]);
 
 useEffect(() => {
   getAllRabiesFemale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesFemale = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesFemale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRabiesFemale(data.data);
     
     });
 };
 ///////////////////////////Male front///////////////////////////single record//////////////
 const [dataRabiesMale, setDatadataRabiesMale] = useState([]);
 
 useEffect(() => {
   getAllRabiesMale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesMale = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesMale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRabiesMale(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataPai = [
     
     { name: 'Female', Total: parseInt(`${dataRabiesFemale}`)},
     { name: 'Male', Total: parseInt(`${dataRabiesMale}`)},
    
   ];
   /////////////////////////////////////////////////////
   ////////////////////////////////////////////////////////////single/////////////////////////////////
 //////////////////////////LessFive front///////////////////////////single record//////////////
const [dataRabiesLessFive, setDatadataRabiesLessFive] = useState([]);

useEffect(() => {
  getAllRabiesLessFive();
},[searchQuery]);

//fetching all cholera
const getAllRabiesLessFive = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesLessFive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LessFiveData ");
      setDatadataRabiesLessFive(data.data);
    
    });
};
///////////////////////////Betweb5To14 front///////////////////////////single record//////////////
const [dataRabiesBetweb5To14, setDatadataRabiesBetweb5To14] = useState([]);

useEffect(() => {
  getAllRabiesBetweb5To14();
},[searchQuery]);

//fetching all cholera
const getAllRabiesBetweb5To14 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesBetweb5To14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb5To14Data ");
      setDatadataRabiesBetweb5To14(data.data);
    
    });
};
///////////////////////////Betweb15To29 front///////////////////////////single record//////////////
const [dataRabiesBetweb15To29, setDatadataRabiesBetweb15To29] = useState([]);

useEffect(() => {
  getAllRabiesBetweb15To29();
},[searchQuery]);

//fetching all cholera
const getAllRabiesBetweb15To29 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesBetweb15To29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb15To29Data ");
      setDatadataRabiesBetweb15To29(data.data);
    
    });
};

///////////////////////////Betweb30To49 front///////////////////////////single record//////////////
const [dataRabiesBetweb30To49, setDatadataRabiesBetweb30To49] = useState([]);

useEffect(() => {
  getAllRabiesBetweb30To49();
},[searchQuery]);

//fetching all cholera
const getAllRabiesBetweb30To49= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesBetweb30To49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb30To49Data ");
      setDatadataRabiesBetweb30To49(data.data);
    
    });
};

///////////////////////////Betweb50To59  front///////////////////////////single record//////////////
const [dataRabiesBetweb50To59, setDatadataRabiesBetweb50To59] = useState([]);

useEffect(() => {
  getAllRabiesBetweb50To59();
},[searchQuery]);

//fetching all cholera
const getAllRabiesBetweb50To59= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesBetweb50To59?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb50To59Data ");
      setDatadataRabiesBetweb50To59(data.data);
    
    });
};

///////////////////////////Betweb60To69 front///////////////////////////single record//////////////
const [dataRabiesBetweb60To69, setDatadataRabiesBetweb60To69] = useState([]);

useEffect(() => {
  getAllRabiesBetweb60To69();
},[searchQuery]);

//fetching all cholera
const getAllRabiesBetweb60To69 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesBetweb60To69?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb60To69Data ");
      setDatadataRabiesBetweb60To69(data.data);
    
    });
};

///////////////////////////Above70 front///////////////////////////single record//////////////
const [dataRabiesAbove70, setDatadataRabiesAbove70] = useState([]);

useEffect(() => {
  getAllRabiesAbove70();
},[searchQuery]);

//fetching all cholera
const getAllRabiesAbove70 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesAbove70?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Above70Data ");
      setDatadataRabiesAbove70(data.data);
    
    });
};


  const datapi = [
    {
      name: '<5',
      Number_of_patient: `${dataRabiesLessFive}`,
    
      fill: '#8884d8',
    },
    {
      name: '5-14',
      Number_of_patient: `${dataRabiesBetweb5To14}`,
     
      fill: '#83a6ed',
    },
    {
      name: '15-29',
      Number_of_patient: `${dataRabiesBetweb15To29}`,
      
      fill: '#8dd1e1',
    },
    {
      name: '30-49',
      Number_of_patient: `${dataRabiesBetweb30To49}`,
      
      fill: '#82ca9d',
    },
    {
      name: '50-59',
      Number_of_patient: `${dataRabiesBetweb50To59}`,
     
      fill: '#a4de6c',
    },
    {
      name: '60-69',
      Number_of_patient: `${dataRabiesBetweb60To69}`,
      
      fill: '#d0ed57',
    },
    {
      name: '70+',
      Number_of_patient: `${dataRabiesAbove70}`,
      
      fill: '#ffc658',
    },
  ];
  /////////////////////////////////////////Measles vaccine/TT doses received////////////////////
   ///////////////////////////Employed front///////////////////////////Occupation//////////////
const [dataRabiesEmployed, setDatadataRabiesEmployed] = useState([]);

useEffect(() => {
  getAllRabiesEmployed();
},[searchQuery]);

//fetching all cholera
const getAllRabiesEmployed = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesEmployed?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataRabiesEmployed(data.data);
    
    });
};
 ///////////////////////////Not employed front///////////////////////////single record//////////////
 const [dataRabiesNotEmployed, setDatadataRabiesNotEmployed] = useState([]);

 useEffect(() => {
   getAllRabiesNotEmployed();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesNotEmployed = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesNotEmployed?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRabiesNotEmployed(data.data);
     
     });
 };
///////////////////////////Student front///////////////////////////single record//////////////
const [dataRabiesStudent, setDatadataRabiesStudent] = useState([]);

useEffect(() => {
  getAllRabiesStudent();
},[searchQuery]);

//fetching all cholera
const getAllRabiesStudent = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesStudent?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataRabiesStudent(data.data);
    
    });
};
/////////////////////////////////////Daily Laborer/////////////////////////////////////////////////
const [dataRabiesDailyLaborer, setDatadataRabiesDailyLaborer] = useState([]);

useEffect(() => {
  getAllRabiesDailyLaborer();
},[searchQuery]);

//fetching all cholera
const getAllRabiesDailyLaborer = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesDailyLaborer?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataRabiesDailyLaborer(data.data);
    
    });
};
 ///////////////////////////House wife front///////////////////////////single record//////////////
 const [dataRabiesHouseWife, setDatadataRabiesHouseWife] = useState([]);

 useEffect(() => {
   getAllRabiesHouseWife();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRabiesHouseWife = () => {
   fetch(`http://localhost:3000/Gete-SingleRabiesHouseWife?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRabiesHouseWife(data.data);
     
     });
 };
///////////////////////////Other front///////////////////////////single record//////////////
const [dataRabiesOther, setDatadataRabiesOther] = useState([]);

useEffect(() => {
  getAllRabiesOther();
},[searchQuery]);

//fetching all cholera
const getAllRabiesOther = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesOther?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataRabiesOther(data.data);
    
    });
};
const dataOccupation= [
  {
    name: 'Employed',
    Number_of_patient: `${dataRabiesEmployed}`,
  },
  {
    name: 'Not employed',
    Number_of_patient: `${dataRabiesNotEmployed}`,
  },
  {
    name: 'Student',
    Number_of_patient: `${dataRabiesStudent}`,
  },
  {
    name: 'Daily Laborer',
    Number_of_patient: `${dataRabiesDailyLaborer}`,
  },
  {
    name: 'House wife',
    Number_of_patient: `${dataRabiesHouseWife}`,
  },
  {
    name: 'Other',
    Number_of_patient: `${dataRabiesOther}`,
  },
]

///////////////////////////////////////////////////
   ///////////////////////////front///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataRabiesWeek1, setDatadataRabiesWeek1] = useState([]);
useEffect(() => {
  getAllRabiesWeek1();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataRabiesWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataRabiesWeek2, setDatadataRabiesWeek2] = useState([]);

useEffect(() => {
  getAllRabiesWeek2();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataRabiesWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataRabiesWeek3, setDatadataRabiesWeek3] = useState([]);

useEffect(() => {
  getAllRabiesWeek3();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataRabiesWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataRabiesWeek4, setDatadataRabiesWeek4] = useState([]);

useEffect(() => {
  getAllRabiesWeek4();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataRabiesWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataRabiesWeek5, setDatadataRabiesWeek5] = useState([]);

useEffect(() => {
  getAllRabiesWeek5();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataRabiesWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataRabiesWeek6, setDatadataRabiesWeek6] = useState([]);

useEffect(() => {
  getAllRabiesWeek6();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataRabiesWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataRabiesWeek7, setDatadataRabiesWeek7] = useState([]);

useEffect(() => {
  getAllRabiesWeek7();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataRabiesWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataRabiesWeek8, setDatadataRabiesWeek8] = useState([]);

useEffect(() => {
  getAllRabiesWeek8();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataRabiesWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataRabiesWeek9, setDatadataRabiesWeek9] = useState([]);

useEffect(() => {
  getAllRabiesWeek9();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataRabiesWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataRabiesWeek10, setDatadataRabiesWeek10] = useState([]);

useEffect(() => {
  getAllRabiesWeek10();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataRabiesWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataRabiesWeek11, setDatadataRabiesWeek11] = useState([]);

useEffect(() => {
  getAllRabiesWeek11();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataRabiesWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataRabiesWeek12, setDatadataRabiesWeek12] = useState([]);

useEffect(() => {
  getAllRabiesWeek12();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataRabiesWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataRabiesWeek13, setDatadataRabiesWeek13] = useState([]);

useEffect(() => {
  getAllRabiesWeek13();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataRabiesWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataRabiesWeek14, setDatadataRabiesWeek14] = useState([]);

useEffect(() => {
  getAllRabiesWeek14();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataRabiesWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataRabiesWeek15, setDatadataRabiesWeek15] = useState([]);


useEffect(() => {
  getAllRabiesWeek15();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataRabiesWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataRabiesWeek16, setDatadataRabiesWeek16] = useState([]);

useEffect(() => {
  getAllRabiesWeek16();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataRabiesWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataRabiesWeek17, setDatadataRabiesWeek17] = useState([]);

useEffect(() => {
  getAllRabiesWeek17();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataRabiesWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataRabiesWeek18, setDatadataRabiesWeek18] = useState([]);

useEffect(() => {
  getAllRabiesWeek18();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataRabiesWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataRabiesWeek19, setDatadataRabiesWeek19] = useState([]);

useEffect(() => {
  getAllRabiesWeek19();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataRabiesWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataRabiesWeek20, setDatadataRabiesWeek20] = useState([]);

useEffect(() => {
  getAllRabiesWeek20();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataRabiesWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataRabiesWeek21, setDatadataRabiesWeek21] = useState([]);

useEffect(() => {
  getAllRabiesWeek21();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataRabiesWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataRabiesWeek22, setDatadataRabiesWeek22] = useState([]);

useEffect(() => {
  getAllRabiesWeek22();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataRabiesWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataRabiesWeek23, setDatadataRabiesWeek23] = useState([]);

useEffect(() => {
  getAllRabiesWeek23();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataRabiesWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataRabiesWeek24, setDatadataRabiesWeek24] = useState([]);

useEffect(() => {
  getAllRabiesWeek24();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataRabiesWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataRabiesWeek25, setDatadataRabiesWeek25] = useState([]);

useEffect(() => {
  getAllRabiesWeek25();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataRabiesWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataRabiesWeek26, setDatadataRabiesWeek26] = useState([]);

useEffect(() => {
  getAllRabiesWeek26();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataRabiesWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataRabiesWeek27, setDatadataRabiesWeek27] = useState([]);

useEffect(() => {
  getAllRabiesWeek27();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataRabiesWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataRabiesWeek28, setDatadataRabiesWeek28] = useState([]);

useEffect(() => {
  getAllRabiesWeek28();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataRabiesWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataRabiesWeek29, setDatadataRabiesWeek29] = useState([]);
useEffect(() => {
  getAllRabiesWeek29();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataRabiesWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataRabiesWeek30, setDatadataRabiesWeek30] = useState([]);

useEffect(() => {
  getAllRabiesWeek30();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataRabiesWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataRabiesWeek31, setDatadataRabiesWeek31] = useState([]);

useEffect(() => {
  getAllRabiesWeek31();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataRabiesWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataRabiesWeek32, setDatadataRabiesWeek32] = useState([]);

useEffect(() => {
  getAllRabiesWeek32();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataRabiesWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataRabiesWeek33, setDatadataRabiesWeek33] = useState([]);

useEffect(() => {
  getAllRabiesWeek33();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataRabiesWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataRabiesWeek34, setDatadataRabiesWeek34] = useState([]);

useEffect(() => {
  getAllRabiesWeek34();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataRabiesWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataRabiesWeek35, setDatadataRabiesWeek35] = useState([]);

useEffect(() => {
  getAllRabiesWeek35();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataRabiesWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataRabiesWeek36, setDatadataRabiesWeek36] = useState([]);

useEffect(() => {
  getAllRabiesWeek36();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataRabiesWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataRabiesWeek37, setDatadataRabiesWeek37] = useState([]);

useEffect(() => {
  getAllRabiesWeek37();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataRabiesWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataRabiesWeek38, setDatadataRabiesWeek38] = useState([]);

useEffect(() => {
  getAllRabiesWeek38();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataRabiesWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataRabiesWeek39, setDatadataRabiesWeek39] = useState([]);

useEffect(() => {
  getAllRabiesWeek39();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataRabiesWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataRabiesWeek40, setDatadataRabiesWeek40] = useState([]);

useEffect(() => {
  getAllRabiesWeek40();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataRabiesWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataRabiesWeek41, setDatadataRabiesWeek41] = useState([]);

useEffect(() => {
  getAllRabiesWeek41();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataRabiesWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataRabiesWeek42, setDatadataRabiesWeek42] = useState([]);

useEffect(() => {
  getAllRabiesWeek42();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataRabiesWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataRabiesWeek43, setDatadataRabiesWeek43] = useState([]);


useEffect(() => {
  getAllRabiesWeek43();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataRabiesWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataRabiesWeek44, setDatadataRabiesWeek44] = useState([]);

useEffect(() => {
  getAllRabiesWeek44();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataRabiesWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataRabiesWeek45, setDatadataRabiesWeek45] = useState([]);

useEffect(() => {
  getAllRabiesWeek45();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataRabiesWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataRabiesWeek46, setDatadataRabiesWeek46] = useState([]);

useEffect(() => {
  getAllRabiesWeek46();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataRabiesWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataRabiesWeek47, setDatadataRabiesWeek47] = useState([]);

useEffect(() => {
  getAllRabiesWeek47();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataRabiesWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataRabiesWeek48, setDatadataRabiesWeek48] = useState([]);

useEffect(() => {
  getAllRabiesWeek48();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataRabiesWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataRabiesWeek49, setDatadataRabiesWeek49] = useState([]);

useEffect(() => {
  getAllRabiesWeek49();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataRabiesWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataRabiesWeek50, setDatadataRabiesWeek50] = useState([]);

useEffect(() => {
  getAllRabiesWeek50();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataRabiesWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataRabiesWeek51, setDatadataRabiesWeek51] = useState([]);

useEffect(() => {
  getAllRabiesWeek51();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataRabiesWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataRabiesWeek52, setDatadataRabiesWeek52] = useState([]);

useEffect(() => {
  getAllRabiesWeek52();
},[searchQuery]);

//fetching all cholera
const getAllRabiesWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleRabiesWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataRabiesWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLine = [{ Week: 'Week 1', Number_of_patient: `${dataRabiesWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataRabiesWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataRabiesWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataRabiesWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataRabiesWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataRabiesWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataRabiesWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataRabiesWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataRabiesWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataRabiesWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataRabiesWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataRabiesWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataRabiesWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataRabiesWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataRabiesWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataRabiesWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataRabiesWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataRabiesWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataRabiesWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataRabiesWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataRabiesWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataRabiesWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataRabiesWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataRabiesWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataRabiesWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataRabiesWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataRabiesWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataRabiesWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataRabiesWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataRabiesWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataRabiesWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataRabiesWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataRabiesWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataRabiesWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataRabiesWeek35}` },{Week:'Week 36',Number_of_patient: `${dataRabiesWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataRabiesWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataRabiesWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataRabiesWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataRabiesWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataRabiesWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataRabiesWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataRabiesWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataRabiesWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataRabiesWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataRabiesWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataRabiesWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataRabiesWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataRabiesWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataRabiesWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataRabiesWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataRabiesWeek52}`, },
                    ];

  ///////////////////////////////////////////////////

  ///////////////////////////////////////////////////
const style = {
  top: '50%',
  right: -11,
  transform: 'translate(0, -75%)',
  lineHeight: '24px',
};
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
  axios.get("http://localhost:3000/GeteRabies")
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
  setrecords(Data.filter(f => f.RpName .toLowerCase().startsWith(event.target.value)))
}
const Epiweek = (event) => {
  setrecords(Data.filter(f => f.REPIWeek == (event.target.value)))
}

  //////////////////////////// link component selection///////
  const RabiesLINELIST = useRef(null);
  const Chart = useRef(null)

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
/////////////////////////////////////////component selection////////////////////////////////////
const [selected,setSelected]=useState('Rabies LINE LIST')

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
        <th className='p-3'><li onClick={() => scrollToSection(RabiesLINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        Rabies LINE LIST
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
    
    <div className="border border-black " ref={RabiesLINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT Rabies or Dog Bite Cases Line List </h4>
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
                <th><h6>Name of the patient</h6></th>
                <th><h6>MRN</h6></th>
                <th><h6>Age</h6> </th>
                <th><h6>Sex</h6></th>
                <th> <h6>Phone number</h6></th>
                <th><h6>Marital status</h6></th>
                <th><h6>Occupation</h6></th>
                <th> <h6>Specify Occupation</h6></th>
                <th><h6>Region</h6></th>
                <th> <h6>Other Region</h6></th>
                <th><h6>Sub City</h6></th>
                <th><h6>Woreda  </h6></th>
                <th><h6>Other Woreda  </h6></th>
                <th><h6>Ketena</h6></th>
                <th><h6>House Number</h6></th>
                <th><h6>Region | ጤና ተቋሙ የሚገኝበት ክልል</h6></th>
                <th><h6>Other,Region</h6></th>
                <th><h6> Name of Sub City | ጤና ተቋሙ የሚገኝበት ክ/ከተማ</h6> </th>
                <th> <h6>Other,Sub City</h6></th>
                <th><h6>Name of Woreda | ጤና ተቋሙ የሚገኝበት ወረዳ</h6></th>
                <th><h6>Other,Woreda</h6></th>
                <th> <h6>Reporting Health Facility Name</h6></th>
                <th><h6>Other,Health Facility Name</h6></th>
                <th> <h6>Specify if name of health facility is not listed</h6></th>
                <th><h6>GPS | Location latitude</h6></th>
                <th><h6>GPS | Location longitude</h6></th>
                <th><h6>Exposure Date</h6></th>
                <th><h6>Date of first Health Facility Visit</h6></th>
                <th><h6>Site of Exposure? (Select all that apply)</h6></th>
                <th> <h6>Status of exposed site (Intact /Non-intact)</h6></th>
                <th><h6>Is the wound management done?</h6></th>
                <th> <h6>If yes, date of wound care done for the first time</h6></th>
                <th><h6>Is the patient started PEP Vaccination</h6></th>
                <th><h6>If yes, date of vaccination started</h6></th>
                <th><h6>If not started Vaccination, why</h6></th>
                <th><h6>mention the receiving health facility</h6></th>
                <th><h6>Types of Exposing animals</h6></th>
                <th><h6>Specify exposing animal type</h6></th>
                <th><h6>Owner of exposing animals</h6></th>
                <th><h6> Did exposing Dog / Animals vaccinate</h6> </th>
                <th> <h6>Is the animal under follow up</h6></th>
                <th><h6>health status of the animals</h6></th>
                <th><h6>Type of Exposure</h6></th>
                <th> <h6>Reason of exposure</h6></th>
                <th><h6>develop rabies sign and symptom</h6></th>
                <th><h6>list the Sign and Symptom</h6></th>
                <th><h6>Outcome</h6></th>
                <th><h6>Name of officer</h6></th>
                <th><h6>Phone number of officer</h6></th>
                <th><h6>EPI_Week</h6></th>
                <th><h6>photo</h6> </th>
              </tr>
            </thead>
            <tbody > 
              {records && records.map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.RpName}</h6></th>
                  <th ><h6>{filer.RPMRN}</h6></th>
                  <th ><h6>{filer.RPAge}</h6></th>
                  <th><h6>{filer.RPSex}</h6></th>
                  <th><h6>{filer.RPPhone}</h6></th>
                  <th><h6>{filer.RPMarital}</h6></th>
                  <th ><h6>{filer.RPOccupation}</h6></th>
                  <th ><h6>{filer.TRPOccupation}</h6></th>
                  <th><h6>{filer.RPRegion}</h6></th>
                  <th><h6>{filer.TRRegion}</h6></th>
                  <th><h6>{filer.RPSubCity}</h6></th>
                  <th ><h6>{filer.RPWoreda}</h6></th>
                  <th><h6>{filer.RpTWoreda}</h6></th>
                  <th><h6>{filer.RPKebele}</h6></th>
                  <th><h6>{filer.RPZone}</h6></th>
                  <th><h6>{filer.HRegion}</h6></th>
                  <th ><h6>{filer.RHTRegion}</h6></th>
                  <th ><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.TRHSubCity}</h6></th>
                  <th><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.RHFTworeda}</h6></th>
                  <th ><h6>{filer.HFName}</h6></th>
                  <th ><h6>{filer.RHFTName}</h6></th>
                  <th><h6>{filer.RLatitude}</h6></th>
                  <th><h6>{filer.RLongitude}</h6></th>
                  <th><h6>{filer.RExposureD}</h6></th>
                  <th ><h6>{filer.RFacility}</h6></th>
                  <th><h6>{filer.RSite}</h6></th>
                  <th><h6>{filer.RStatus}</h6></th>
                  <th><h6>{filer.RwoundM}</h6></th>
                  <th ><h6>{filer.RwoundMD}</h6></th>
                  <th ><h6>{filer.RPEPV}</h6></th>
                  <th><h6>{filer.TRPEPV}</h6></th>
                  <th><h6>{filer.RNVaccination}</h6></th>
                  <th><h6>{filer.TRNVaccination}</h6></th>
                  <th ><h6>{filer.RTypes}</h6></th>
                  <th><h6>{filer.TRTypes}</h6></th>
                  <th><h6>{filer.ROwner}</h6></th>
                  <th ><h6>{filer.RAnimals}</h6></th>
                  <th><h6>{filer.RAfollowup}</h6></th>
                  <th><h6>{filer.TRAfollowup}</h6></th>
                  <th><h6>{filer.RTypeE}</h6></th>
                  <th ><h6>{filer.RReason}</h6></th>
                  <th ><h6>{filer.Rdevelop}</h6></th>
                  <th><h6>{filer.TRdevelop}</h6></th>
                  <th><h6>{filer.ROutcome}</h6></th>
                  <th><h6>{filer.RFCName}</h6></th>
                  <th ><h6>{filer.RPhone}</h6></th>
                  <th><h6>{filer.REPIWeek}</h6></th>
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

       
   

        <div ref={conponentPDF} style={{width:'100%'}}>
    <div className='w-100 h-100 row bg-white rounded p-0  border border-danger mb-5 Scrol-Table ' ref={Chart}>
    <table className='Scrol-Table table light padding table-responsive'>
    <tr className='border border-secondary'>  
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">RABIES(DOG BITE) TRAINED per Epi-Weeek</p>
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-75">RABIES(DOG BITE) per Occupation</p>
        <BarChart
          width={500}
          height={300}
          data={dataOccupation}
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
          <Legend />
          <Bar dataKey="Number_of_patient" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </th>
        <th>
        <p class="text-left text-secondary border border-secondary bg-secondary-  w-75">RABIES(DOG BITE) AGE GROUP</p>
     <ComposedChart 
          layout="vertical"
          width={800}
          height={300}
          data={datapi}
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
          <Bar dataKey="Number_of_patient" barSize={20} fill="#00C49F" label={{ position: 'top' }}/>
        </ComposedChart>
        </th>
        <th>
        <PieChart width={500} height={500}>
          <Pie
            data={dataPai}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill="#8884d8"
            dataKey="Total"
          >
            
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </PieChart>
        </th>
       
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-75">RABIES(DOG BIT) BY SUBCITY</p>
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

export default Rabies_Report
