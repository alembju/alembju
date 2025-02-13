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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,RadialBarChart, RadialBar } from 'recharts';

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
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,Number_of_patient }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" >
      {`${(percent * 100).toFixed(0)}%`},
      {`T=${Number_of_patient}`}
    </text>
  );
};
function MeselesReport() {
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
/////////////////pagination//////setState
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
const [dataMeselesAkaki, setDatadataMeselesAkaki] = useState([]);
const [searchQuery,setSearchQuery]=useState("")

useEffect(() => {
  getAllMeselesAkaki();
},[searchQuery]);

//fetching all cholera
const getAllMeselesAkaki = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesAkaki?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeselesAkaki(data.data);
    
    });
};
///////////////////////////AddisKetema front///////////////////////////single record//////////////
const [dataMeselesAddisKetema, setDatadataMeselesAddisKetema] = useState([]);

useEffect(() => {
  getAllMeselesAddisKetema();
},[searchQuery]);

//fetching all cholera
const getAllMeselesAddisKetema = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesaAddisKetema?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AddisKetemaData ");
      setDatadataMeselesAddisKetema(data.data);
    
    });
};
///////////////////////////Arada front///////////////////////////single record//////////////
const [dataMeselesArada, setDatadataMeselesArada] = useState([]);

useEffect(() => {
  getAllMeselesArada();
},[searchQuery]);

//fetching all cholera
const getAllMeselesArada = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesArada?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AradaData ");
      setDatadataMeselesArada(data.data);
    
    });
};
///////////////////////////Bole front///////////////////////////single record//////////////
const [dataMeselesBole, setDatadataMeselesBole] = useState([]);

useEffect(() => {
  getAllMeselesBole();
},[searchQuery]);

//fetching all cholera
const getAllMeselesBole = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesBole?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "BoleData ");
      setDatadataMeselesBole(data.data);
    
    });
};
///////////////////////////Gulele front///////////////////////////single record//////////////
const [dataMeselesGulele, setDatadataMeselesGulele] = useState([]);

useEffect(() => {
  getAllMeselesGulele();
},[searchQuery]);

//fetching all cholera
const getAllMeselesGulele = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesGulele?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "GuleleData ");
      setDatadataMeselesGulele(data.data);
    
    });
};

///////////////////////////Kirkos front///////////////////////////single record//////////////
const [dataMeselesKirkos, setDatadataMeselesKirkos] = useState([]);

useEffect(() => {
  getAllMeselesKirkos();
},[searchQuery]);

//fetching all cholera
const getAllMeselesKirkos= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesKirkos?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "KirkosData ");
      setDatadataMeselesKirkos(data.data);
    
    });
};

///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
const [dataMeseleskolife, setDatadataMeseleskolife] = useState([]);

useEffect(() => {
  getAllMeseleskolife();
},[searchQuery]);

//fetching all cholera
const getAllMeseleskolife= () => {
  fetch(`http://localhost:3000/Gete-SingleMeseleskolife?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "kolifeData ");
      setDatadataMeseleskolife(data.data);
    
    });
};

///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
const [dataMeselesNifas_Silk_Lafto, setDatadataMeselesNifas_Silk_Lafto] = useState([]);

useEffect(() => {
  getAllMeselesNifas_Silk_Lafto();
},[searchQuery]);

//fetching all cholera
const getAllMeselesNifas_Silk_Lafto = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesNifas_Silk_Lafto?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Nifas_Silk_LaftoData ");
      setDatadataMeselesNifas_Silk_Lafto(data.data);
    
    });
};

///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
const [dataMeselesLemi_Kura, setDatadataMeselesLemi_Kura] = useState([]);

useEffect(() => {
  getAllMeselesLemi_Kura();
},[searchQuery]);

//fetching all cholera
const getAllMeselesLemi_Kura = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesLemi_Kura?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Lemi_KuraData ");
      setDatadataMeselesLemi_Kura(data.data);
    
    });
};

///////////////////////////Lideta front///////////////////////////single record//////////////
const [dataMeselesLideta, setDatadataMeselesLideta] = useState([]);

useEffect(() => {
  getAllMeselesLideta();
},[searchQuery]);

//fetching all cholera
const getAllMeselesLideta = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesLideta?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LidetaData ");
      setDatadataMeselesLideta(data.data);
    
    });
};
///////////////////////////Yeka front///////////////////////////single record//////////////
const [dataMeselesYeka, setDatadataMeselesYeka] = useState([]);

useEffect(() => {
  getAllMeselesYeka();
},[searchQuery]);

//fetching all cholera
const getAllMeselesYeka = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesYeka?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "YekaData ");
      setDatadataMeselesYeka(data.data);
    
    });
};

////////////////////////////////////////////////////////////single/////////////////////////////////
///////////////////////////Female front///////////////////////////single record//////////////
const [dataMeselesFemale, setDatadataMeselesFemale] = useState([]);

useEffect(() => {
  getAllMeselesFemale();
},[searchQuery]);

//fetching all cholera
const getAllMeselesFemale = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesFemale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeselesFemale(data.data);
    
    });
};
///////////////////////////Male front///////////////////////////single record//////////////
const [dataMeselesMale, setDatadataMeselesMale] = useState([]);

useEffect(() => {
  getAllMeselesMale();
},[searchQuery]);

//fetching all cholera
const getAllMeselesMale = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesMale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMeselesMale(data.data);
    
    });
};
///////////////////////////Male front///////////////////////////single record//////////////
const [dataMeselesHfacility, setDatadataMeselesHfacility] = useState([]);

useEffect(() => {
  getAllMeselesHfacility();
},[searchQuery]);

//fetching all cholera
const getAllMeselesHfacility = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesHfacility?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "HfacilityLoginData ");
      setDatadataMeselesHfacility(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataPai = [
    
    { name: 'Female', Number_of_patient: parseInt(`${dataMeselesFemale}`)},
    { name: 'Male', Number_of_patient: parseInt(`${dataMeselesMale}`)},
   
  ];
  /////////////////////////line graph data////////////////////////////
      /////////////////////////////////////////////////////////front end/////////////////////////////////////
 ///////////////////////////front///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataMeselesWeek1, setDatadataMeselesWeek1] = useState([]);
useEffect(() => {
  getAllMeselesWeek1();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataMeselesWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataMeselesWeek2, setDatadataMeselesWeek2] = useState([]);

useEffect(() => {
  getAllMeselesWeek2();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataMeselesWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataMeselesWeek3, setDatadataMeselesWeek3] = useState([]);

useEffect(() => {
  getAllMeselesWeek3();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataMeselesWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataMeselesWeek4, setDatadataMeselesWeek4] = useState([]);

useEffect(() => {
  getAllMeselesWeek4();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataMeselesWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataMeselesWeek5, setDatadataMeselesWeek5] = useState([]);

useEffect(() => {
  getAllMeselesWeek5();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataMeselesWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataMeselesWeek6, setDatadataMeselesWeek6] = useState([]);

useEffect(() => {
  getAllMeselesWeek6();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataMeselesWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataMeselesWeek7, setDatadataMeselesWeek7] = useState([]);

useEffect(() => {
  getAllMeselesWeek7();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataMeselesWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataMeselesWeek8, setDatadataMeselesWeek8] = useState([]);

useEffect(() => {
  getAllMeselesWeek8();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataMeselesWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataMeselesWeek9, setDatadataMeselesWeek9] = useState([]);

useEffect(() => {
  getAllMeselesWeek9();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataMeselesWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataMeselesWeek10, setDatadataMeselesWeek10] = useState([]);

useEffect(() => {
  getAllMeselesWeek10();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataMeselesWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataMeselesWeek11, setDatadataMeselesWeek11] = useState([]);

useEffect(() => {
  getAllMeselesWeek11();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataMeselesWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataMeselesWeek12, setDatadataMeselesWeek12] = useState([]);

useEffect(() => {
  getAllMeselesWeek12();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataMeselesWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataMeselesWeek13, setDatadataMeselesWeek13] = useState([]);

useEffect(() => {
  getAllMeselesWeek13();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataMeselesWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataMeselesWeek14, setDatadataMeselesWeek14] = useState([]);

useEffect(() => {
  getAllMeselesWeek14();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataMeselesWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataMeselesWeek15, setDatadataMeselesWeek15] = useState([]);


useEffect(() => {
  getAllMeselesWeek15();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataMeselesWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataMeselesWeek16, setDatadataMeselesWeek16] = useState([]);

useEffect(() => {
  getAllMeselesWeek16();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataMeselesWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataMeselesWeek17, setDatadataMeselesWeek17] = useState([]);

useEffect(() => {
  getAllMeselesWeek17();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataMeselesWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataMeselesWeek18, setDatadataMeselesWeek18] = useState([]);

useEffect(() => {
  getAllMeselesWeek18();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataMeselesWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataMeselesWeek19, setDatadataMeselesWeek19] = useState([]);

useEffect(() => {
  getAllMeselesWeek19();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataMeselesWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataMeselesWeek20, setDatadataMeselesWeek20] = useState([]);

useEffect(() => {
  getAllMeselesWeek20();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataMeselesWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataMeselesWeek21, setDatadataMeselesWeek21] = useState([]);

useEffect(() => {
  getAllMeselesWeek21();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataMeselesWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataMeselesWeek22, setDatadataMeselesWeek22] = useState([]);

useEffect(() => {
  getAllMeselesWeek22();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataMeselesWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataMeselesWeek23, setDatadataMeselesWeek23] = useState([]);

useEffect(() => {
  getAllMeselesWeek23();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataMeselesWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataMeselesWeek24, setDatadataMeselesWeek24] = useState([]);

useEffect(() => {
  getAllMeselesWeek24();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataMeselesWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataMeselesWeek25, setDatadataMeselesWeek25] = useState([]);

useEffect(() => {
  getAllMeselesYeka();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataMeselesWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataMeselesWeek26, setDatadataMeselesWeek26] = useState([]);

useEffect(() => {
  getAllMeselesWeek26();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataMeselesWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataMeselesWeek27, setDatadataMeselesWeek27] = useState([]);

useEffect(() => {
  getAllMeselesWeek27();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataMeselesWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataMeselesWeek28, setDatadataMeselesWeek28] = useState([]);

useEffect(() => {
  getAllMeselesWeek28();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataMeselesWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataMeselesWeek29, setDatadataMeselesWeek29] = useState([]);
useEffect(() => {
  getAllMeselesWeek29();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataMeselesWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataMeselesWeek30, setDatadataMeselesWeek30] = useState([]);

useEffect(() => {
  getAllMeselesWeek30();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataMeselesWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataMeselesWeek31, setDatadataMeselesWeek31] = useState([]);

useEffect(() => {
  getAllMeselesWeek31();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataMeselesWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataMeselesWeek32, setDatadataMeselesWeek32] = useState([]);

useEffect(() => {
  getAllMeselesWeek32();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataMeselesWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataMeselesWeek33, setDatadataMeselesWeek33] = useState([]);

useEffect(() => {
  getAllMeselesWeek33();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataMeselesWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataMeselesWeek34, setDatadataMeselesWeek34] = useState([]);

useEffect(() => {
  getAllMeselesWeek34();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataMeselesWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataMeselesWeek35, setDatadataMeselesWeek35] = useState([]);

useEffect(() => {
  getAllMeselesWeek35();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataMeselesWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataMeselesWeek36, setDatadataMeselesWeek36] = useState([]);

useEffect(() => {
  getAllMeselesWeek36();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataMeselesWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataMeselesWeek37, setDatadataMeselesWeek37] = useState([]);

useEffect(() => {
  getAllMeselesWeek37();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataMeselesWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataMeselesWeek38, setDatadataMeselesWeek38] = useState([]);

useEffect(() => {
  getAllMeselesWeek38();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataMeselesWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataMeselesWeek39, setDatadataMeselesWeek39] = useState([]);

useEffect(() => {
  getAllMeselesWeek39();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataMeselesWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataMeselesWeek40, setDatadataMeselesWeek40] = useState([]);

useEffect(() => {
  getAllMeselesWeek40();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataMeselesWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataMeselesWeek41, setDatadataMeselesWeek41] = useState([]);

useEffect(() => {
  getAllMeselesWeek41();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataMeselesWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataMeselesWeek42, setDatadataMeselesWeek42] = useState([]);

useEffect(() => {
  getAllMeselesWeek42();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataMeselesWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataMeselesWeek43, setDatadataMeselesWeek43] = useState([]);


useEffect(() => {
  getAllMeselesWeek43();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataMeselesWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataMeselesWeek44, setDatadataMeselesWeek44] = useState([]);

useEffect(() => {
  getAllMeselesWeek44();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataMeselesWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataMeselesWeek45, setDatadataMeselesWeek45] = useState([]);

useEffect(() => {
  getAllMeselesWeek45();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataMeselesWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataMeselesWeek46, setDatadataMeselesWeek46] = useState([]);

useEffect(() => {
  getAllMeselesWeek46();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataMeselesWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataMeselesWeek47, setDatadataMeselesWeek47] = useState([]);

useEffect(() => {
  getAllMeselesWeek47();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataMeselesWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataMeselesWeek48, setDatadataMeselesWeek48] = useState([]);

useEffect(() => {
  getAllMeselesWeek48();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataMeselesWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataMeselesWeek49, setDatadataMeselesWeek49] = useState([]);

useEffect(() => {
  getAllMeselesWeek49();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataMeselesWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataMeselesWeek50, setDatadataMeselesWeek50] = useState([]);

useEffect(() => {
  getAllMeselesWeek50();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataMeselesWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataMeselesWeek51, setDatadataMeselesWeek51] = useState([]);

useEffect(() => {
  getAllMeselesWeek51();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataMeselesWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataMeselesWeek52, setDatadataMeselesWeek52] = useState([]);

useEffect(() => {
  getAllMeselesWeek52();
},[searchQuery]);

//fetching all cholera
const getAllMeselesWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataMeselesWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLine = [{ Week: 'Week 1', Number_of_patient: `${dataMeselesWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataMeselesWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataMeselesWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataMeselesWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataMeselesWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataMeselesWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataMeselesWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataMeselesWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataMeselesWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataMeselesWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataMeselesWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataMeselesWeek12}`,},{Week:' 13', Number_of_patient: `${dataMeselesWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataMeselesWeek14}`,},
                    { Week: ' 15', Number_of_patient: `${dataMeselesWeek15}`,},{ Week:' 16', Number_of_patient: `${dataMeselesWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataMeselesWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataMeselesWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataMeselesWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataMeselesWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataMeselesWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataMeselesWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataMeselesWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataMeselesWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataMeselesWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataMeselesWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataMeselesWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataMeselesWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataMeselesWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataMeselesWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataMeselesWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataMeselesWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataMeselesWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataMeselesWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataMeselesWeek35}` },{Week:'Week 36',Number_of_patient: `${dataMeselesWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataMeselesWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataMeselesWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataMeselesWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataMeselesWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataMeselesWeek41}`,},{Week:' 42',Number_of_patient: `${dataMeselesWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataMeselesWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataMeselesWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataMeselesWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataMeselesWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataMeselesWeek47}`,},{Week:' 48',Number_of_patient: `${dataMeselesWeek48}`,},{Week:' 49',Number_of_patient: `${dataMeselesWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataMeselesWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataMeselesWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataMeselesWeek52}`, },
                    ];

  ///////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////new pie chart///////////////////
  //////////////////////////LessFive front///////////////////////////single record//////////////
const [dataMeselesLessFive, setDatadataMeselesLessFive] = useState([]);

useEffect(() => {
  getAllMeselesLessFive();
},[searchQuery]);

//fetching all cholera
const getAllMeselesLessFive = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesLessFive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LessFiveData ");
      setDatadataMeselesLessFive(data.data);
    
    });
};
///////////////////////////Betweb5To14 front///////////////////////////single record//////////////
const [dataMeselesBetweb5To14, setDatadataMeselesBetweb5To14] = useState([]);

useEffect(() => {
  getAllMeselesBetweb5To14();
},[searchQuery]);

//fetching all cholera
const getAllMeselesBetweb5To14 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesBetweb5To14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb5To14Data ");
      setDatadataMeselesBetweb5To14(data.data);
    
    });
};
///////////////////////////Betweb15To29 front///////////////////////////single record//////////////
const [dataMeselesBetweb15To29, setDatadataMeselesBetweb15To29] = useState([]);

useEffect(() => {
  getAllMeselesBetweb15To29();
},[searchQuery]);

//fetching all cholera
const getAllMeselesBetweb15To29 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesBetweb15To29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb15To29Data ");
      setDatadataMeselesBetweb15To29(data.data);
    
    });
};

///////////////////////////Betweb30To49 front///////////////////////////single record//////////////
const [dataMeselesBetweb30To49, setDatadataMeselesBetweb30To49] = useState([]);

useEffect(() => {
  getAllMeselesBetweb30To49();
},[searchQuery]);

//fetching all cholera
const getAllMeselesBetweb30To49= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesBetweb30To49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb30To49Data ");
      setDatadataMeselesBetweb30To49(data.data);
    
    });
};

///////////////////////////Betweb50To59  front///////////////////////////single record//////////////
const [dataMeselesBetweb50To59, setDatadataMeselesBetweb50To59] = useState([]);

useEffect(() => {
  getAllMeselesBetweb50To59();
},[searchQuery]);

//fetching all cholera
const getAllMeselesBetweb50To59= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesBetweb50To59?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb50To59Data ");
      setDatadataMeselesBetweb50To59(data.data);
    
    });
};

///////////////////////////Betweb60To69 front///////////////////////////single record//////////////
const [dataMeselesBetweb60To69, setDatadataMeselesBetweb60To69] = useState([]);

useEffect(() => {
  getAllMeselesBetweb60To69();
},[searchQuery]);

//fetching all cholera
const getAllMeselesBetweb60To69 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesBetweb60To69?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb60To69Data ");
      setDatadataMeselesBetweb60To69(data.data);
    
    });
};

///////////////////////////Above70 front///////////////////////////single record//////////////
const [dataMeselesAbove70, setDatadataMeselesAbove70] = useState([]);

useEffect(() => {
  getAllMeselesAbove70();
},[searchQuery]);

//fetching all cholera
const getAllMeselesAbove70 = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesAbove70?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Above70Data ");
      setDatadataMeselesAbove70(data.data);
    
    });
};


  const datapi = [
    {
      name: '<5',
      uv: `${dataMeselesLessFive}`,
    
      fill: '#8884d8',
    },
    {
      name: '5-14',
      uv: `${dataMeselesBetweb5To14}`,
     
      fill: '#83a6ed',
    },
    {
      name: '15-29',
      uv: `${dataMeselesBetweb15To29}`,
      
      fill: '#8dd1e1',
    },
    {
      name: '30-49',
      uv: `${dataMeselesBetweb30To49}`,
      
      fill: '#82ca9d',
    },
    {
      name: '50-59',
      uv: `${dataMeselesBetweb50To59}`,
     
      fill: '#a4de6c',
    },
    {
      name: '60-69',
      uv: `${dataMeselesBetweb60To69}`,
      
      fill: '#d0ed57',
    },
    {
      name: '70+',
      uv: `${dataMeselesAbove70}`,
      
      fill: '#ffc658',
    },
  ];
  /////////////////////////////////////////Measles vaccine/TT doses received////////////////////
  //////////////////////////FirstDose front///////////////////////////single record//////////////
const [dataMeselesFirstDose, setDatadataMeselesFirstDose] = useState([]);

useEffect(() => {
  getAllMeselesFirstDose();
},[searchQuery]);

//fetching all cholera
const getAllMeselesFirstDose = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesFirstDose?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "FirstDoseData ");
      setDatadataMeselesFirstDose(data.data);
    
    });
};
///////////////////////////SecondDose front///////////////////////////single record//////////////
const [dataMeselesSecondDose, setDatadataMeselesSecondDose] = useState([]);

useEffect(() => {
  getAllMeselesSecondDose();
},[searchQuery]);

//fetching all cholera
const getAllMeselesSecondDose = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesSecondDose?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "SecondDoseData ");
      setDatadataMeselesSecondDose(data.data);
    
    });
};
///////////////////////////ThirdDose front///////////////////////////single record//////////////
const [dataMeselesThirdDose, setDatadataMeselesThirdDose] = useState([]);

useEffect(() => {
  getAllMeselesThirdDose();
},[searchQuery]);

//fetching all cholera
const getAllMeselesThirdDose = () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesThirdDose?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "ThirdDoseData ");
      setDatadataMeselesThirdDose(data.data);
    
    });
};

///////////////////////////Unknown front///////////////////////////single record//////////////
const [dataMeselesUnknown, setDatadataMeselesUnknown] = useState([]);

useEffect(() => {
  getAllMeselesUnknown();
},[searchQuery]);

//fetching all cholera
const getAllMeselesUnknown= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesUnknown?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "UnknownData ");
      setDatadataMeselesUnknown(data.data);
    
    });
};

///////////////////////////NotVaccinated  front///////////////////////////single record//////////////
const [dataMeselesNotVaccinated, setDatadataMeselesNotVaccinated] = useState([]);

useEffect(() => {
  getAllMeselesNotVaccinated();
},[searchQuery]);

//fetching all cholera
const getAllMeselesNotVaccinated= () => {
  fetch(`http://localhost:3000/Gete-SingleMeselesNotVaccinated?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "NotVaccinatedData ");
      setDatadataMeselesNotVaccinated(data.data);
    
    });
};




  const dataTTDoses = [
    {
      name: 'First Dose',
      patient: `${dataMeselesFirstDose}`,
    
      fill: '#8884d8',
    },
    {
      name: 'Second Dose',
      patient: `${dataMeselesSecondDose}`,
     
      fill: '#83a6ed',
    },
    {
      name: 'Third Dose',
      patient: `${dataMeselesThirdDose}`,
      
      fill: '#8dd1e1',
    },
    {
      name: 'Unknown',
      patient: `${dataMeselesUnknown}`,
      
      fill: '#82ca9d',
    },
    {
      name: 'Not Vaccinated',
      patient: `${dataMeselesNotVaccinated}`,
     
      fill: '#a4de6c',
    },
    
  ];
  

  const style = {
    top: '50%',
    right: -11,
    transform: 'translate(0, -75%)',
    lineHeight: '24px',
  };
  /////////////////////////////////////////////////////////////////////////
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
    Number_of_patient: `${dataMeselesAkaki}`,
  },
  {
    name: 'Addis Ketema',
    Number_of_patient: `${dataMeselesAddisKetema}`,
  },
  {
    name: 'Arada',
    Number_of_patient: `${dataMeselesArada}`,
  },
  {
    name: 'Bole',
    Number_of_patient: `${dataMeselesBole}`,
  },
  {
    name: 'Gulele',
    Number_of_patient: `${dataMeselesGulele}`,
  },
  {
    name: 'Kirkos',
    Number_of_patient: `${dataMeselesKirkos}`,
  },
  {
    name: 'kolife',
    Number_of_patient: `${dataMeseleskolife}`,
  },
  {
    name: 'Nifas Silk Lafto',
    Number_of_patient: `${dataMeselesNifas_Silk_Lafto}`,
  },
  {
    name: 'Lemi Kura',
    Number_of_patient: `${dataMeselesLemi_Kura}`,
  },
  
  {
    name: 'Lideta',
    Number_of_patient: `${dataMeselesLideta}`,
  },
  {
    name: 'Yeka',
    Number_of_patient: `${dataMeselesYeka}`,
  },
];

const getIntroOfPage = (label) => {
  
  if (label === 'Akaki') {
    return `The Number of patient in Addis Ketema is ${dataMeselesAkaki}`;
  }
  if (label === 'Addis Ketema') {
    return `The Number of patient in Addis Ketema is ${dataMeselesAddisKetema}`;
  }
  if (label === 'Arada') {
    return `The Number of patient in Arada is ${dataMeselesArada}`;
  }
  if (label === 'Bole') {
    return `The Number of patient in Bole is ${dataMeselesBole}`;
  }
  if (label === 'Gulele') {
    return `The Number of patient in Gulele is ${dataMeselesGulele}`;
  }
  if (label === 'Kirkos') {
    return `The Number of patient in Kirkos is ${dataMeselesKirkos}`;
  }
  if (label === 'kolife') {
    return `The Number of patient in kolife is ${dataMeseleskolife}`;
  }
  if (label === 'Nifas Silk Lafto') {
    return `The Number of patient in Nifas Silk Lafto is ${dataMeselesNifas_Silk_Lafto}`;
  }
  if (label === 'Lemi Kura') {
    return `The Number of patient in Lemi Kura is ${dataMeselesLemi_Kura}`;
  }
  if (label === 'Lideta') {
    return `The Number of patient in Lideta is ${dataMeselesLideta}`;
  }
  if (label === 'Yeka') {
    return `The Number of patient in Yeka is ${dataMeselesYeka}`;
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
  const MeselesReportLINELIST = useRef(null);
  const MeselesReportCasebasedReporting = useRef(null);
  const MeselesReportRisckAreaMapping = useRef(null);
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
        <th className='p-3'><li onClick={() => scrollToSection(MeselesReportLINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        Meseles LINE LIST
          </li></th>
          <th  className='p-3 '> <li onClick={() => scrollToSection(MeselesReportCasebasedReporting)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
          Meseles Case-based Reporting
          </li></th>
          <th  className='p-3 '><li onClick={() => scrollToSection(MeselesReportRisckAreaMapping)} className="link DashbordBG  p-1 text-secondary border border-white shadow-lg rounded">
          Meseles Risck-Area Mapping
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

     



    
    <div className="border border-black " ref={MeselesReportLINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT Meseles LINE LIST </h4>
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
     {dataMeselesHfacility}
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
                  <th><h6>{filer.Hfacility.slice(0,10) }</h6></th>
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

       
    <div className="border border-black" ref={MeselesReportCasebasedReporting}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Meseles Case-based Reporting Format (CRF)  </h4>
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

    <div className="border border-black" ref={MeselesReportRisckAreaMapping}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Meseles Risck Area Mapping  </h4>
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MESELES OUTBREAK TRAEND</p>
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MEASLES VACCINE/TT DOSES RECEIVED</p>
        <BarChart
          width={800}
          height={300}
          data={dataTTDoses}
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
          <Bar dataKey="patient" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
        </BarChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MESELES OUTBREAK PATIENT BY GENDER</p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataPai}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={140}
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MESELES OUTBREAK PATIENT BY AGE GROUP</p>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={datapi} width={800} height={500}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="uv"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
      
        </th>
        
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MESELES OUTBREAK PATIENT BY SUBCITY</p>
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

export default MeselesReport

