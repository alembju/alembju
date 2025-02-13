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
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index ,Number_of_patient}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`},
      {`T=${Number_of_patient}`}
    </text>
  );
};
function Polio_Report() {
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
 const [dataPolioAkaki, setDatadataPolioAkaki] = useState([]);
 const [searchQuery,setSearchQuery]=useState("")
 
 useEffect(() => {
   getAllPolioAkaki();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioAkaki = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioAkaki?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioAkaki(data.data);
     
     });
 };
 ///////////////////////////AddisKetema front///////////////////////////single record//////////////
 const [dataPolioAddisKetema, setDatadataPolioAddisKetema] = useState([]);
 
 useEffect(() => {
   getAllPolioAddisKetema();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioAddisKetema = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioaAddisKetema?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AddisKetemaData ");
       setDatadataPolioAddisKetema(data.data);
     
     });
 };
 ///////////////////////////Arada front///////////////////////////single record//////////////
 const [dataPolioArada, setDatadataPolioArada] = useState([]);
 
 useEffect(() => {
   getAllPolioArada();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioArada = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioArada?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AradaData ");
       setDatadataPolioArada(data.data);
     
     });
 };
 ///////////////////////////Bole front///////////////////////////single record//////////////
 const [dataPolioBole, setDatadataPolioBole] = useState([]);
 
 useEffect(() => {
   getAllPolioBole();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioBole = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioBole?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "BoleData ");
       setDatadataPolioBole(data.data);
     
     });
 };
 ///////////////////////////Gulele front///////////////////////////single record//////////////
 const [dataPolioGulele, setDatadataPolioGulele] = useState([]);
 
 useEffect(() => {
   getAllPolioGulele();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioGulele = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioGulele?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "GuleleData ");
       setDatadataPolioGulele(data.data);
     
     });
 };
 
 ///////////////////////////Kirkos front///////////////////////////single record//////////////
 const [dataPolioKirkos, setDatadataPolioKirkos] = useState([]);
 
 useEffect(() => {
   getAllPolioKirkos();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioKirkos= () => {
   fetch(`http://localhost:3000/Gete-SinglePolioKirkos?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "KirkosData ");
       setDatadataPolioKirkos(data.data);
     
     });
 };
 
 ///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
 const [dataPoliokolife, setDatadataPoliokolife] = useState([]);
 
 useEffect(() => {
   getAllPoliokolife();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPoliokolife= () => {
   fetch(`http://localhost:3000/Gete-SinglePoliokolife?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "kolifeData ");
       setDatadataPoliokolife(data.data);
     
     });
 };
 
 ///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
 const [dataPolioNifas_Silk_Lafto, setDatadataPolioNifas_Silk_Lafto] = useState([]);
 
 useEffect(() => {
   getAllPolioNifas_Silk_Lafto();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioNifas_Silk_Lafto = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioNifas_Silk_Lafto?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Nifas_Silk_LaftoData ");
       setDatadataPolioNifas_Silk_Lafto(data.data);
     
     });
 };
 
 ///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
 const [dataPolioLemi_Kura, setDatadataPolioLemi_Kura] = useState([]);
 
 useEffect(() => {
   getAllPolioLemi_Kura();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioLemi_Kura = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioLemi_Kura?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Lemi_KuraData ");
       setDatadataPolioLemi_Kura(data.data);
     
     });
 };
 
 ///////////////////////////Lideta front///////////////////////////single record//////////////
 const [dataPolioLideta, setDatadataPolioLideta] = useState([]);
 
 useEffect(() => {
   getAllPolioLideta();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioLideta = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioLideta?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LidetaData ");
       setDatadataPolioLideta(data.data);
     
     });
 };
 ///////////////////////////Yeka front///////////////////////////single record//////////////
 const [dataPolioYeka, setDatadataPolioYeka] = useState([]);
 
 useEffect(() => {
   getAllPolioYeka();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioYeka = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioYeka?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "YekaData ");
       setDatadataPolioYeka(data.data);
     
     });
 };
 
 ////////////////////////////////////////////////////////////single/////////////////////////////////
 ///////////////////////////Female front///////////////////////////single record//////////////
 const [dataPolioFemale, setDatadataPolioFemale] = useState([]);
 
 useEffect(() => {
   getAllPolioFemale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioFemale = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioFemale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioFemale(data.data);
     
     });
 };
 ///////////////////////////Male front///////////////////////////single record//////////////
 const [dataPolioMale, setDatadataPolioMale] = useState([]);
 
 useEffect(() => {
   getAllPolioMale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioMale = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioMale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioMale(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataPai = [
     
     { name: 'Female', Number_of_patient:  parseInt(`${dataPolioFemale}`)},
     { name: 'Male', Number_of_patient: parseInt(`${dataPolioMale}`)},
    
   ];
   /////////////////////////////////////////////////////
   ///////////////////////////Yes front///////////////////////////single record//////////////
 const [dataPolioYes, setDatadataPolioYes] = useState([]);
 
 useEffect(() => {
   getAllPolioYes();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioYes = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioYes?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioYes(data.data);
     
     });
 };
 ///////////////////////////No front///////////////////////////single record//////////////
 const [dataPolioNo, setDatadataPolioNo] = useState([]);
 
 useEffect(() => {
   getAllPolioNo();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioNo = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioNo?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioNo(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataparalysis = [
     
     { name: 'Yes', Number_of_patient:   parseInt(`${dataPolioYes}`)},
     { name: 'No', Number_of_patient:   parseInt(`${dataPolioNo}`)},
    
   ];
   /////////////////////////////////////////////////////
    ///////////////////////////CV front///////////////////////////notifier record//////////////
 const [dataPolioCV, setDatadataPolioCV] = useState([]);
 
 useEffect(() => {
   getAllPolioCV();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioCV = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioCV?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioCV(data.data);
     
     });
 };
 ///////////////////////////HEW front///////////////////////////single record//////////////
 const [dataPolioHEW, setDatadataPolioHEW] = useState([]);
 
 useEffect(() => {
   getAllPolioHEW();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioHEW = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioHEW?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioHEW(data.data);
     
     });
 };
 ///////////////////////////Forceps front///////////////////////////single record//////////////
 const [dataPolioForceps, setDatadataPolioForceps] = useState([]);
 
 useEffect(() => {
   getAllPolioForceps();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioForceps = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioForceps?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioForceps(data.data);
     
     });
 };
 ///////////////////////////OHW front///////////////////////////single record//////////////
 const [dataPolioOHW, setDatadataPolioOHW] = useState([]);
 
 useEffect(() => {
   getAllPolioOHW();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllPolioOHW = () => {
   fetch(`http://localhost:3000/Gete-SinglePolioOHW?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataPolioOHW(data.data);
     
     });
 };
  ///////////////////////////Other front///////////////////////////single record//////////////
  const [dataPolioOther, setDatadataPolioOther] = useState([]);
 
  useEffect(() => {
    getAllPolioOther();
  },[searchQuery]);
  
  //fetching all cholera
  const getAllPolioOther = () => {
    fetch(`http://localhost:3000/Gete-SinglePolioOther?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "LoginData ");
        setDatadataPolioOther(data.data);
      
      });
  };
   //////////////selection filter///////////////
   const datanotifier = [
     
     { name: 'Community Volunteer', Number_of_patient:   parseInt(`${dataPolioCV}`)},
     { name: 'Health Extension Worker', Number_of_patient:   parseInt(`${dataPolioHEW}`)},
     { name: 'Forceps', Number_of_patient:   parseInt(`${dataPolioForceps}`)},
     { name: 'Other Health Worker', Number_of_patient:  parseInt(`${dataPolioOHW}`)},
     { name: 'Other', Number_of_patient:   parseInt(`${dataPolioOther}`)},
   ];
   /////////////////////////////////////////////////////
   ///////////////////////////front Polio///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataPolioWeek1, setDatadataPolioWeek1] = useState([]);
useEffect(() => {
  getAllPolioWeek1();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataPolioWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataPolioWeek2, setDatadataPolioWeek2] = useState([]);

useEffect(() => {
  getAllPolioWeek2();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataPolioWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataPolioWeek3, setDatadataPolioWeek3] = useState([]);

useEffect(() => {
  getAllPolioWeek3();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataPolioWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataPolioWeek4, setDatadataPolioWeek4] = useState([]);

useEffect(() => {
  getAllPolioWeek4();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataPolioWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataPolioWeek5, setDatadataPolioWeek5] = useState([]);

useEffect(() => {
  getAllPolioWeek5();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataPolioWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataPolioWeek6, setDatadataPolioWeek6] = useState([]);

useEffect(() => {
  getAllPolioWeek6();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek6= () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataPolioWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataPolioWeek7, setDatadataPolioWeek7] = useState([]);

useEffect(() => {
  getAllPolioWeek7();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek7= () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataPolioWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataPolioWeek8, setDatadataPolioWeek8] = useState([]);

useEffect(() => {
  getAllPolioWeek8();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataPolioWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataPolioWeek9, setDatadataPolioWeek9] = useState([]);

useEffect(() => {
  getAllPolioWeek9();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataPolioWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataPolioWeek10, setDatadataPolioWeek10] = useState([]);

useEffect(() => {
  getAllPolioWeek10();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataPolioWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataPolioWeek11, setDatadataPolioWeek11] = useState([]);

useEffect(() => {
  getAllPolioWeek11();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataPolioWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataPolioWeek12, setDatadataPolioWeek12] = useState([]);

useEffect(() => {
  getAllPolioWeek12();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataPolioWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataPolioWeek13, setDatadataPolioWeek13] = useState([]);

useEffect(() => {
  getAllPolioWeek13();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataPolioWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataPolioWeek14, setDatadataPolioWeek14] = useState([]);

useEffect(() => {
  getAllPolioWeek14();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataPolioWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataPolioWeek15, setDatadataPolioWeek15] = useState([]);


useEffect(() => {
  getAllPolioWeek15();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataPolioWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataPolioWeek16, setDatadataPolioWeek16] = useState([]);

useEffect(() => {
  getAllPolioWeek16();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataPolioWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataPolioWeek17, setDatadataPolioWeek17] = useState([]);

useEffect(() => {
  getAllPolioWeek17();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataPolioWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataPolioWeek18, setDatadataPolioWeek18] = useState([]);

useEffect(() => {
  getAllPolioWeek18();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataPolioWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataPolioWeek19, setDatadataPolioWeek19] = useState([]);

useEffect(() => {
  getAllPolioWeek19();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataPolioWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataPolioWeek20, setDatadataPolioWeek20] = useState([]);

useEffect(() => {
  getAllPolioWeek20();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek20= () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataPolioWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataPolioWeek21, setDatadataPolioWeek21] = useState([]);

useEffect(() => {
  getAllPolioWeek21();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek21= () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataPolioWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataPolioWeek22, setDatadataPolioWeek22] = useState([]);

useEffect(() => {
  getAllPolioWeek22();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataPolioWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataPolioWeek23, setDatadataPolioWeek23] = useState([]);

useEffect(() => {
  getAllPolioWeek23();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataPolioWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataPolioWeek24, setDatadataPolioWeek24] = useState([]);

useEffect(() => {
  getAllPolioWeek24();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataPolioWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataPolioWeek25, setDatadataPolioWeek25] = useState([]);

useEffect(() => {
  getAllPolioWeek25();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataPolioWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataPolioWeek26, setDatadataPolioWeek26] = useState([]);

useEffect(() => {
  getAllPolioWeek26();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataPolioWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataPolioWeek27, setDatadataPolioWeek27] = useState([]);

useEffect(() => {
  getAllPolioWeek27();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataPolioWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataPolioWeek28, setDatadataPolioWeek28] = useState([]);

useEffect(() => {
  getAllPolioWeek28();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataPolioWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataPolioWeek29, setDatadataPolioWeek29] = useState([]);
useEffect(() => {
  getAllPolioWeek29();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataPolioWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataPolioWeek30, setDatadataPolioWeek30] = useState([]);

useEffect(() => {
  getAllPolioWeek30();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataPolioWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataPolioWeek31, setDatadataPolioWeek31] = useState([]);

useEffect(() => {
  getAllPolioWeek31();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataPolioWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataPolioWeek32, setDatadataPolioWeek32] = useState([]);

useEffect(() => {
  getAllPolioWeek32();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataPolioWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataPolioWeek33, setDatadataPolioWeek33] = useState([]);

useEffect(() => {
  getAllPolioWeek33();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataPolioWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataPolioWeek34, setDatadataPolioWeek34] = useState([]);

useEffect(() => {
  getAllPolioWeek34();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek34= () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataPolioWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataPolioWeek35, setDatadataPolioWeek35] = useState([]);

useEffect(() => {
  getAllPolioWeek35();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek35= () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataPolioWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataPolioWeek36, setDatadataPolioWeek36] = useState([]);

useEffect(() => {
  getAllPolioWeek36();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataPolioWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataPolioWeek37, setDatadataPolioWeek37] = useState([]);

useEffect(() => {
  getAllPolioWeek37();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataPolioWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataPolioWeek38, setDatadataPolioWeek38] = useState([]);

useEffect(() => {
  getAllPolioWeek38();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataPolioWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataPolioWeek39, setDatadataPolioWeek39] = useState([]);

useEffect(() => {
  getAllPolioWeek39();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataPolioWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataPolioWeek40, setDatadataPolioWeek40] = useState([]);

useEffect(() => {
  getAllPolioWeek40();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataPolioWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataPolioWeek41, setDatadataPolioWeek41] = useState([]);

useEffect(() => {
  getAllPolioWeek41();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataPolioWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataPolioWeek42, setDatadataPolioWeek42] = useState([]);

useEffect(() => {
  getAllPolioWeek42();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataPolioWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataPolioWeek43, setDatadataPolioWeek43] = useState([]);


useEffect(() => {
  getAllPolioWeek43();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataPolioWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataPolioWeek44, setDatadataPolioWeek44] = useState([]);

useEffect(() => {
  getAllPolioWeek44();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataPolioWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataPolioWeek45, setDatadataPolioWeek45] = useState([]);

useEffect(() => {
  getAllPolioWeek45();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataPolioWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataPolioWeek46, setDatadataPolioWeek46] = useState([]);

useEffect(() => {
  getAllPolioWeek46();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataPolioWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataPolioWeek47, setDatadataPolioWeek47] = useState([]);

useEffect(() => {
  getAllPolioWeek47();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataPolioWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataPolioWeek48, setDatadataPolioWeek48] = useState([]);

useEffect(() => {
  getAllPolioWeek48();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek48= () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataPolioWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataPolioWeek49, setDatadataPolioWeek49] = useState([]);

useEffect(() => {
  getAllPolioWeek49();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek49= () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataPolioWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataPolioWeek50, setDatadataPolioWeek50] = useState([]);

useEffect(() => {
  getAllPolioWeek50();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataPolioWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataPolioWeek51, setDatadataPolioWeek51] = useState([]);

useEffect(() => {
  getAllPolioWeek51();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataPolioWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataPolioWeek52, setDatadataPolioWeek52] = useState([]);

useEffect(() => {
  getAllPolioWeek52();
},[searchQuery]);

//fetching all cholera
const getAllPolioWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SinglePolioWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataPolioWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLinePolio = [{ Week: 'Week 1', Number_of_patient: `${dataPolioWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataPolioWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataPolioWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataPolioWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataPolioWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataPolioWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataPolioWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataPolioWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataPolioWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataPolioWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataPolioWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataPolioWeek12}`,},{Week:' 13', Number_of_patient: `${dataPolioWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataPolioWeek14}`,},
                    { Week: ' 15', Number_of_patient: `${dataPolioWeek15}`,},{ Week:' 16', Number_of_patient: `${dataPolioWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataPolioWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataPolioWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataPolioWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataPolioWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataPolioWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataPolioWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataPolioWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataPolioWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataPolioWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataPolioWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataPolioWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataPolioWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataPolioWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataPolioWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataPolioWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataPolioWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataPolioWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataPolioWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataPolioWeek35}` },{Week:'Week 36',Number_of_patient: `${dataPolioWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataPolioWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataPolioWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataPolioWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataPolioWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataPolioWeek41}`,},{Week:' 42',Number_of_patient: `${dataPolioWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataPolioWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataPolioWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataPolioWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataPolioWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataPolioWeek47}`,},{Week:' 48',Number_of_patient: `${dataPolioWeek48}`,},{Week:' 49',Number_of_patient: `${dataPolioWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataPolioWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataPolioWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataPolioWeek52}`, },
                    ];

  ///////////////////////////////////////////////////
 
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
     Number_of_patient: `${dataPolioAkaki}`,
   },
   {
     name: 'Addis Ketema',
     Number_of_patient: `${dataPolioAddisKetema}`,
   },
   {
     name: 'Arada',
     Number_of_patient: `${dataPolioArada}`,
   },
   {
     name: 'Bole',
     Number_of_patient: `${dataPolioBole}`,
   },
   {
     name: 'Gulele',
     Number_of_patient: `${dataPolioGulele}`,
   },
   {
     name: 'Kirkos',
     Number_of_patient: `${dataPolioKirkos}`,
   },
   {
     name: 'kolife',
     Number_of_patient: `${dataPoliokolife}`,
   },
   {
     name: 'Nifas Silk Lafto',
     Number_of_patient: `${dataPolioNifas_Silk_Lafto}`,
   },
   {
     name: 'Lemi Kura',
     Number_of_patient: `${dataPolioLemi_Kura}`,
   },
   
   {
     name: 'Lideta',
     Number_of_patient: `${dataPolioLideta}`,
   },
   {
     name: 'Yeka',
     Number_of_patient: `${dataPolioYeka}`,
   },
 ];
 
 const getIntroOfPage = (label) => {
   
   if (label === 'Akaki') {
     return `The Number of patient in Akaki is ${dataPolioAkaki}`;
   }
   if (label === 'Addis Ketema') {
     return `The Number of patient in Addis Ketema is ${dataPolioAddisKetema}`;
   }
   if (label === 'Arada') {
     return `The Number of patient in Arada is ${dataPolioArada}`;
   }
   if (label === 'Bole') {
     return `The Number of patient in Bole is ${dataPolioBole}`;
   }
   if (label === 'Gulele') {
     return `The Number of patient in Gulele is ${dataPolioGulele}`;
   }
   if (label === 'Kirkos') {
     return `The Number of patient in Kirkos is ${dataPolioKirkos}`;
   }
   if (label === 'kolife') {
     return `The Number of patient in kolife is ${dataPoliokolife}`;
   }
   if (label === 'Nifas Silk Lafto') {
     return `The Number of patient in Nifas Silk Lafto is ${dataPolioNifas_Silk_Lafto}`;
   }
   if (label === 'Lemi Kura') {
     return `The Number of patient in Lemi Kura is ${dataPolioLemi_Kura}`;
   }
   if (label === 'Lideta') {
     return `The Number of patient in Lideta is ${dataPolioLideta}`;
   }
   if (label === 'Yeka') {
     return `The Number of patient in Yeka is ${dataPolioYeka}`;
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
  axios.get("http://localhost:3000/GetePolio")
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

  //////////////////////////// link component selection///////Polio_Report
  const PolioLINELIST = useRef(null);
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
        <th className='p-3'><li onClick={() => scrollToSection(PolioLINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        Polio/Acute Flaccid Paralysis Case Investigation
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

     



    
    <div className="border border-black " ref={PolioLINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT Acute Flaccid Paralysis Case Investigation</h4>
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
                <th><h6>Region</h6></th>
                <th><h6>Residency Region</h6></th>
                <th><h6>Sub City</h6> </th>
                <th><h6>Year onset (E.C)</h6></th>
                <th> <h6>Case Number</h6></th>
                <th><h6>Received Date</h6></th>
                <th><h6>Woreda</h6></th>
                <th> <h6>Name of Woreda</h6></th>
                <th><h6>Kebele | Ketena</h6></th>
                <th> <h6>Name of Village</h6></th>
                <th><h6>Name of Patient</h6></th>
                <th><h6>Father's name</h6></th>
                <th><h6>Grand Father</h6></th>
                <th><h6> Mother's Full Name</h6></th>
                <th><h6>Latitude</h6></th>
                <th><h6>Longitude</h6></th>
                <th><h6>Date of birth</h6></th>
                <th><h6>Age In years/ Months</h6> </th>
                <th> <h6>Sex</h6></th>
                <th><h6>Reporting Health Facility Type</h6></th>
                <th><h6>other, Specify Facility</h6></th>
                <th> <h6>Reporting Health Facility Name</h6></th>
                <th><h6>other, health facility</h6></th>
                <th> <h6>Region</h6></th>
                <th><h6>other, Region</h6></th>
                <th><h6>Name of Sub City</h6></th>
                <th><h6>other, Sub-City</h6></th>
                <th><h6> Name of Woreda </h6></th>
                <th><h6> other,  Woreda </h6></th>
                <th><h6>Date of Reporting</h6></th>
                <th> <h6>Notified by (Name)</h6></th>
                <th><h6>Who is the notifier</h6></th>
                <th> <h6>other,Specify</h6></th>
                <th><h6>Date District Notified</h6></th>
                <th><h6>Date Case Investigated</h6></th>
                <th><h6>Date of Admission </h6></th>
                <th><h6>Medical Record Number</h6></th>
                <th><h6>Name/address of Facility</h6></th>
                <th><h6>Date Onset of Paralysis</h6></th>
                <th><h6> Fever at onset of paralysis</h6></th>
                <th><h6>Paralysis progressed ﹤=3 days</h6></th>
                <th><h6>Flaccid & acute paralysis</h6></th>
                <th><h6>Asymmetrical</h6></th>
                <th><h6>Site of paralysis</h6> </th>
                <th> <h6>Tentative Diagnosis</h6></th>
                <th><h6>Name of officer completing the form</h6></th>

                <th><h6>Title</h6></th>
                <th> <h6>Phone number of officer completing form</h6></th>
                <th><h6>EPI_Week</h6></th>
                <th> <h6>photo</h6></th>
                <th> <h6>was this true AFP</h6></th>
                <th><h6>Has the child taken any dose of OPV during Supplemental Immunization</h6></th>
                <th><h6>total number of OPV doses</h6></th>
                <th><h6>Date of OPV Zero</h6></th>
                <th><h6>Date of OPV 1st</h6></th>
                <th><h6>Date of OPV 2nd</h6></th>
                <th> <h6>Date of OPV 3rd</h6></th>
                <th><h6>Date of OPV 4th</h6></th>
                <th> <h6>If ﹥ 4, date of last OPV dose</h6></th>
                <th><h6>Unknown</h6></th>
                <th><h6>Total OPV (bOPV/mOPV2) doses received (SIA)</h6></th>
                <th><h6>Total OPV (bOPV/mOPV2) doses received (RI) </h6></th>
                <th><h6>Total IPV doses received (RI and/or SIA)</h6></th>
                <th><h6>Date of last IPV dose received through RI or SIA</h6></th>
                <th><h6>Date 1st stool collected</h6></th>
                <th><h6>Date 2nd stool collected</h6></th>
                <th><h6>Date stool sent from field to national level</h6></th>
                <th><h6>Date stool specimen received by national lab</h6></th>
                <th><h6>Condition of stool</h6></th>
                <th><h6>Date result received by national surveillance/EPI</h6> </th>
                <th> <h6>Primary isolation result</h6></th>
                <th><h6>Date isolate sent from National Lab to Regional Lab.</h6></th>
                <th><h6>Date differentiation result sent by Regional Lab</h6></th>
                <th> <h6>Date differentiation result received by National EPI/surveillance</h6></th>
                <th><h6>W</h6></th>
                <th> <h6>Discordant sabin</h6></th>
                <th><h6>V</h6></th>
                <th><h6>(R)NP-ENT</h6></th>
                <th><h6>NEV</h6></th>
                <th><h6>Date follow-up Examination</h6></th>
                <th><h6>Residual Paralysis</h6></th>
                <th> <h6>Findings at Follow up</h6></th>
                <th><h6>Clinical Diagnosis of the Case on follow-up</h6></th>
                <th> <h6>Immunocompromised status suspected</h6></th>
                <th><h6>Final classification of the case</h6></th>
                <th><h6>Serotype</h6></th>
              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.PPRegion}</h6></th>
                  <th ><h6>{filer.TPPRegion}</h6></th>
                  <th ><h6>{filer.PPSubCity}</h6></th>
                  <th><h6>{filer.PYear}</h6></th>
                  <th><h6>{filer.PCNumber}</h6></th>
                  <th ><h6>{filer.PReceivedD}</h6></th>
                  <th ><h6>{filer.PPWoreda}</h6></th>
                  <th><h6>{filer.PPTWoreda}</h6></th>
                  <th><h6>{filer.PKebele}</h6></th>
                  <th><h6>{filer.PVillage}</h6></th>
                  <th ><h6>{filer.PPName}</h6></th>
                  <th><h6>{filer.PFather}</h6></th>
                  <th><h6>{filer.PGrandF}</h6></th>
                  <th><h6>{filer.PMother}</h6></th>
                  <th><h6>{filer.PLatitude}</h6></th>
                  <th ><h6>{filer.PLongitude}</h6></th>
                  <th ><h6>{filer.Pbirth}</h6></th>
                  <th><h6>{filer.PAge}</h6></th>
                  <th><h6>{filer.PPSex}</h6></th>
                  <th><h6>{filer.PFacilityT}</h6></th>
                  <th ><h6>{filer.TPFacilityT}</h6></th>
                  <th ><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.HFTName}</h6></th>
                  <th><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.HTRegion}</h6></th>
                  <th ><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.THSubCity}</h6></th>
                  <th><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HFTworeda}</h6></th>
                  <th ><h6>{filer.DPReporting}</h6></th>
                  <th ><h6>{filer.PNName}</h6></th>
                  <th><h6>{filer.PNotifier}</h6></th>
                  <th><h6>{filer.TPNotifier}</h6></th>
                  <th><h6>{filer.PDistrictN}</h6></th>
                  <th ><h6>{filer.PInvestigated}</h6></th>
                  <th><h6>{filer.PAdmission}</h6></th>
                  <th><h6>{filer.PRecordN}</h6></th>
                  <th><h6>{filer.PFName}</h6></th>
                  <th><h6>{filer.PParalysis}</h6></th>
                  <th ><h6>{filer.PFever}</h6></th>
                  <th ><h6>{filer.Pprogressed}</h6></th>
                  <th><h6>{filer.PFlaccid}</h6></th>
                  <th><h6>{filer.PAsymmetrical}</h6></th>
                  <th><h6>{filer.PSite}</h6></th>
                  <th ><h6>{filer.PTentative}</h6></th>
                  <th ><h6>{filer.PFCName}</h6></th>

                  <th><h6>{filer.PTitle}</h6></th>
                  <th><h6>{filer.PPhone}</h6></th>
                  <th><h6>{filer.EPIWeek}</h6></th>
                  <th ><h6>{filer.pdf}</h6></th>
                  <th ><h6>{filer.PTAFP}</h6></th>
                  <th><h6>{filer.POPV}</h6></th>
                  <th><h6>{filer.PNIDs}</h6></th>
                  <th ><h6>{filer.POPV0D}</h6></th>
                  <th><h6>{filer.POPV1D}</h6></th>
                  <th><h6>{filer.POPV2D}</h6></th>
                  <th><h6>{filer.POPV3D}</h6></th>
                  <th ><h6>{filer.POPV4D}</h6></th>

                 
                  <th><h6>{filer.Plast}</h6></th>
                  <th ><h6>{filer.PUnknown}</h6></th>
                  <th><h6>{filer.TPOPV}</h6></th>
                  <th><h6>{filer.POPVRI}</h6></th>
                  <th ><h6>{filer.PTotalIPV}</h6></th>
                  <th ><h6>{filer.PDIPV}</h6></th>
                  <th><h6>{filer.PScollected1}</h6></th>
                  <th><h6>{filer.PScollected2}</h6></th>
                  <th ><h6>{filer.PSnational}</h6></th>
                  <th><h6>{filer.PSnationalR}</h6></th>
                  <th><h6>{filer.PCondition}</h6></th>
                  <th><h6>{filer.DEPI}</h6></th>
                  <th ><h6>{filer.PPrimary}</h6></th>
                  <th><h6>{filer.PNtoL}</h6></th>
                  <th><h6>{filer.PDdifferentiation}</h6></th>
                  <th><h6>{filer.PDEPID}</h6></th>
                  <th ><h6>{filer.PW}</h6></th>
                  <th ><h6>{filer.PDiscordant}</h6></th>
                  <th><h6>{filer.PV}</h6></th>
                  <th><h6>{filer.PNPENT}</h6></th>
                  <th ><h6>{filer.PNEV}</h6></th>
                  <th><h6>{filer.PFollowUp}</h6></th>
                  <th><h6>{filer.PResidual}</h6></th>
                  <th><h6>{filer.PFindings}</h6></th>
                  <th ><h6>{filer.PDiagnosis}</h6></th>
                  <th><h6>{filer.PImmunocompromised}</h6></th>
                  <th ><h6>{filer.Pclassification}</h6></th>
                  <th><h6>{filer.PSerotype}</h6></th>
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">POLIO TREND </p>
      <LineChart
          width={800}
          height={300}
          data={dataLinePolio}
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">POLIO OUTBREAK DISTRIBUTION BY GENDER</p>
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
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </PieChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">POLIO DISTRIBUTION BY THE NOTIFIER</p>
        <PieChart width={800} height={500}>
          <Pie
            data={datanotifier}
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
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">POLIO DISTRIBUTION BY FLACCID & ACUTE PARALYSIS</p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataparalysis}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={160}
            fill="#8884d8"
            dataKey="Number_of_patient"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </PieChart>
        </th>
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">POLIO DISTRIBUTION BY SUBCITY</p>
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
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
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

export default Polio_Report

