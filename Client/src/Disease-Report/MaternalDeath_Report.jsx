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
function MaternalDeath_Report() {
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
const [dataMaternalDeathAkaki, setDatadataMaternalDeathAkaki] = useState([]);
const [searchQuery,setSearchQuery]=useState("")

useEffect(() => {
  getAllMaternalDeathAkaki();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathAkaki = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathAkaki?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathAkaki(data.data);
    
    });
};
///////////////////////////AddisKetema front///////////////////////////single record//////////////
const [dataMaternalDeathAddisKetema, setDatadataMaternalDeathAddisKetema] = useState([]);

useEffect(() => {
  getAllMaternalDeathAddisKetema();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathAddisKetema = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathaAddisKetema?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AddisKetemaData ");
      setDatadataMaternalDeathAddisKetema(data.data);
    
    });
};
///////////////////////////Arada front///////////////////////////single record//////////////
const [dataMaternalDeathArada, setDatadataMaternalDeathArada] = useState([]);

useEffect(() => {
  getAllMaternalDeathArada();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathArada = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathArada?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AradaData ");
      setDatadataMaternalDeathArada(data.data);
    
    });
};
///////////////////////////Bole front///////////////////////////single record//////////////
const [dataMaternalDeathBole, setDatadataMaternalDeathBole] = useState([]);

useEffect(() => {
  getAllMaternalDeathBole();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathBole = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathBole?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "BoleData ");
      setDatadataMaternalDeathBole(data.data);
    
    });
};
///////////////////////////Gulele front///////////////////////////single record//////////////
const [dataMaternalDeathGulele, setDatadataMaternalDeathGulele] = useState([]);

useEffect(() => {
  getAllMaternalDeathGulele();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathGulele = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathGulele?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "GuleleData ");
      setDatadataMaternalDeathGulele(data.data);
    
    });
};

///////////////////////////Kirkos front///////////////////////////single record//////////////
const [dataMaternalDeathKirkos, setDatadataMaternalDeathKirkos] = useState([]);

useEffect(() => {
  getAllMaternalDeathKirkos();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathKirkos= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathKirkos?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "KirkosData ");
      setDatadataMaternalDeathKirkos(data.data);
    
    });
};

///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
const [dataMaternalDeathkolife, setDatadataMaternalDeathkolife] = useState([]);

useEffect(() => {
  getAllMaternalDeathkolife();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathkolife= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathkolife?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "kolifeData ");
      setDatadataMaternalDeathkolife(data.data);
    
    });
};

///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
const [dataMaternalDeathNifas_Silk_Lafto, setDatadataMaternalDeathNifas_Silk_Lafto] = useState([]);

useEffect(() => {
  getAllMaternalDeathNifas_Silk_Lafto();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathNifas_Silk_Lafto = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathNifas_Silk_Lafto?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Nifas_Silk_LaftoData ");
      setDatadataMaternalDeathNifas_Silk_Lafto(data.data);
    
    });
};

///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
const [dataMaternalDeathLemi_Kura, setDatadataMaternalDeathLemi_Kura] = useState([]);

useEffect(() => {
  getAllMaternalDeathLemi_Kura();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathLemi_Kura = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathLemi_Kura?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Lemi_KuraData ");
      setDatadataMaternalDeathLemi_Kura(data.data);
    
    });
};

///////////////////////////Lideta front///////////////////////////single record//////////////
const [dataMaternalDeathLideta, setDatadataMaternalDeathLideta] = useState([]);

useEffect(() => {
  getAllMaternalDeathLideta();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathLideta = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathLideta?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LidetaData ");
      setDatadataMaternalDeathLideta(data.data);
    
    });
};
///////////////////////////Yeka front///////////////////////////single record//////////////
const [dataMaternalDeathYeka, setDatadataMaternalDeathYeka] = useState([]);

useEffect(() => {
  getAllMaternalDeathYeka();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathYeka = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathYeka?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "YekaData ");
      setDatadataMaternalDeathYeka(data.data);
    
    });
};

////////////////////////////////////////////////////////////single/////////////////////////////////
///////////////////////////Female front///////////////////////////single record//////////////
///////////////////////////front///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataMaternalDeathWeek1, setDatadataMaternalDeathWeek1] = useState([]);
useEffect(() => {
  getAllMaternalDeathWeek1();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataMaternalDeathWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek2, setDatadataMaternalDeathWeek2] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek2();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataMaternalDeathWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek3, setDatadataMaternalDeathWeek3] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek3();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataMaternalDeathWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek4, setDatadataMaternalDeathWeek4] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek4();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataMaternalDeathWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek5, setDatadataMaternalDeathWeek5] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek5();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataMaternalDeathWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek6, setDatadataMaternalDeathWeek6] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek6();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataMaternalDeathWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataMaternalDeathWeek7, setDatadataMaternalDeathWeek7] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek7();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataMaternalDeathWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek8, setDatadataMaternalDeathWeek8] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek8();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataMaternalDeathWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek9, setDatadataMaternalDeathWeek9] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek9();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataMaternalDeathWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek10, setDatadataMaternalDeathWeek10] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek10();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataMaternalDeathWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek11, setDatadataMaternalDeathWeek11] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek11();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataMaternalDeathWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek12, setDatadataMaternalDeathWeek12] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek12();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataMaternalDeathWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek13, setDatadataMaternalDeathWeek13] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek13();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataMaternalDeathWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek14, setDatadataMaternalDeathWeek14] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek14();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataMaternalDeathWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek15, setDatadataMaternalDeathWeek15] = useState([]);


useEffect(() => {
  getAllMaternalDeathWeek15();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataMaternalDeathWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek16, setDatadataMaternalDeathWeek16] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek16();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataMaternalDeathWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek17, setDatadataMaternalDeathWeek17] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek17();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataMaternalDeathWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek18, setDatadataMaternalDeathWeek18] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek18();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataMaternalDeathWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek19, setDatadataMaternalDeathWeek19] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek19();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataMaternalDeathWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek20, setDatadataMaternalDeathWeek20] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek20();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataMaternalDeathWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataMaternalDeathWeek21, setDatadataMaternalDeathWeek21] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek21();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataMaternalDeathWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek22, setDatadataMaternalDeathWeek22] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek22();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataMaternalDeathWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek23, setDatadataMaternalDeathWeek23] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek23();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataMaternalDeathWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek24, setDatadataMaternalDeathWeek24] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek24();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataMaternalDeathWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek25, setDatadataMaternalDeathWeek25] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek25();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataMaternalDeathWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek26, setDatadataMaternalDeathWeek26] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek26();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataMaternalDeathWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek27, setDatadataMaternalDeathWeek27] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek27();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataMaternalDeathWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek28, setDatadataMaternalDeathWeek28] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek28();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataMaternalDeathWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek29, setDatadataMaternalDeathWeek29] = useState([]);
useEffect(() => {
  getAllMaternalDeathWeek29();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataMaternalDeathWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek30, setDatadataMaternalDeathWeek30] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek30();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataMaternalDeathWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek31, setDatadataMaternalDeathWeek31] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek31();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataMaternalDeathWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek32, setDatadataMaternalDeathWeek32] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek32();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataMaternalDeathWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek33, setDatadataMaternalDeathWeek33] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek33();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataMaternalDeathWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek34, setDatadataMaternalDeathWeek34] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek34();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataMaternalDeathWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataMaternalDeathWeek35, setDatadataMaternalDeathWeek35] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek35();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataMaternalDeathWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek36, setDatadataMaternalDeathWeek36] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek36();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataMaternalDeathWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek37, setDatadataMaternalDeathWeek37] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek37();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataMaternalDeathWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek38, setDatadataMaternalDeathWeek38] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek38();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataMaternalDeathWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek39, setDatadataMaternalDeathWeek39] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek39();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataMaternalDeathWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek40, setDatadataMaternalDeathWeek40] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek40();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataMaternalDeathWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek41, setDatadataMaternalDeathWeek41] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek41();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataMaternalDeathWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek42, setDatadataMaternalDeathWeek42] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek42();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataMaternalDeathWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek43, setDatadataMaternalDeathWeek43] = useState([]);


useEffect(() => {
  getAllMaternalDeathWeek43();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataMaternalDeathWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek44, setDatadataMaternalDeathWeek44] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek44();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataMaternalDeathWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek45, setDatadataMaternalDeathWeek45] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek45();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataMaternalDeathWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek46, setDatadataMaternalDeathWeek46] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek46();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataMaternalDeathWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek47, setDatadataMaternalDeathWeek47] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek47();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataMaternalDeathWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek48, setDatadataMaternalDeathWeek48] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek48();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataMaternalDeathWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataMaternalDeathWeek49, setDatadataMaternalDeathWeek49] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek49();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataMaternalDeathWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek50, setDatadataMaternalDeathWeek50] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek50();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataMaternalDeathWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek51, setDatadataMaternalDeathWeek51] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek51();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataMaternalDeathWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataMaternalDeathWeek52, setDatadataMaternalDeathWeek52] = useState([]);

useEffect(() => {
  getAllMaternalDeathWeek52();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataMaternalDeathWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLine = [{ Week: 'Week 1', Number_of_patient: `${dataMaternalDeathWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataMaternalDeathWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataMaternalDeathWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataMaternalDeathWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataMaternalDeathWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataMaternalDeathWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataMaternalDeathWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataMaternalDeathWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataMaternalDeathWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataMaternalDeathWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataMaternalDeathWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataMaternalDeathWeek12}`,},{Week:' 13', Number_of_patient: `${dataMaternalDeathWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataMaternalDeathWeek14}`,},
                    { Week: ' 15', Number_of_patient: `${dataMaternalDeathWeek15}`,},{ Week:' 16', Number_of_patient: `${dataMaternalDeathWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataMaternalDeathWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataMaternalDeathWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataMaternalDeathWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataMaternalDeathWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataMaternalDeathWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataMaternalDeathWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataMaternalDeathWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataMaternalDeathWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataMaternalDeathWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataMaternalDeathWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataMaternalDeathWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataMaternalDeathWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataMaternalDeathWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataMaternalDeathWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataMaternalDeathWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataMaternalDeathWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataMaternalDeathWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataMaternalDeathWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataMaternalDeathWeek35}` },{Week:'Week 36',Number_of_patient: `${dataMaternalDeathWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataMaternalDeathWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataMaternalDeathWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataMaternalDeathWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataMaternalDeathWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataMaternalDeathWeek41}`,},{Week:' 42',Number_of_patient: `${dataMaternalDeathWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataMaternalDeathWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataMaternalDeathWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataMaternalDeathWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataMaternalDeathWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataMaternalDeathWeek47}`,},{Week:' 48',Number_of_patient: `${dataMaternalDeathWeek48}`,},{Week:' 49',Number_of_patient: `${dataMaternalDeathWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataMaternalDeathWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataMaternalDeathWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataMaternalDeathWeek52}`, },
                    ];

  ///////////////////////////////////////////////////


const [dataMaternalDeathFemale, setDatadataMaternalDeathFemale] = useState([]);

useEffect(() => {
  getAllMaternalDeathFemale();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathFemale = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathFemale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathFemale(data.data);
    
    });
};
///////////////////////////Male front///////////////////////////single record//////////////
const [dataMaternalDeathMale, setDatadataMaternalDeathMale] = useState([]);

useEffect(() => {
  getAllMaternalDeathMale();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathMale = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathMale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathMale(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataPai = [
    
    { name: 'Group A', value: `${dataMaternalDeathFemale}`},
    { name: 'Group B', value: `${dataMaternalDeathMale}`},
   
  ];
  /////////////////////////////////////////////////////
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
    Number_of_patient: `${dataMaternalDeathAkaki}`,
  },
  {
    name: 'Addis Ketema',
    Number_of_patient: `${dataMaternalDeathAddisKetema}`,
  },
  {
    name: 'Arada',
    Number_of_patient: `${dataMaternalDeathArada}`,
  },
  {
    name: 'Bole',
    Number_of_patient: `${dataMaternalDeathBole}`,
  },
  {
    name: 'Gulele',
    Number_of_patient: `${dataMaternalDeathGulele}`,
  },
  {
    name: 'Kirkos',
    Number_of_patient: `${dataMaternalDeathKirkos}`,
  },
  {
    name: 'kolife',
    Number_of_patient: `${dataMaternalDeathkolife}`,
  },
  {
    name: 'Nifas Silk Lafto',
    Number_of_patient: `${dataMaternalDeathNifas_Silk_Lafto}`,
  },
  {
    name: 'Lemi Kura',
    Number_of_patient: `${dataMaternalDeathLemi_Kura}`,
  },
  
  {
    name: 'Lideta',
    Number_of_patient: `${dataMaternalDeathLideta}`,
  },
  {
    name: 'Yeka',
    Number_of_patient: `${dataMaternalDeathYeka}`,
  },
];

const getIntroOfPage = (label) => {
  
  if (label === 'Akaki') {
    return `The Number of patient in Addis Ketema is ${dataMaternalDeathAkaki}`;
  }
  if (label === 'Addis Ketema') {
    return `The Number of patient in Addis Ketema is ${dataMaternalDeathAddisKetema}`;
  }
  if (label === 'Arada') {
    return `The Number of patient in Arada is ${dataMaternalDeathArada}`;
  }
  if (label === 'Bole') {
    return `The Number of patient in Bole is ${dataMaternalDeathBole}`;
  }
  if (label === 'Gulele') {
    return `The Number of patient in Gulele is ${dataMaternalDeathGulele}`;
  }
  if (label === 'Kirkos') {
    return `The Number of patient in Kirkos is ${dataMaternalDeathKirkos}`;
  }
  if (label === 'kolife') {
    return `The Number of patient in kolife is ${dataMaternalDeathkolife}`;
  }
  if (label === 'Nifas Silk Lafto') {
    return `The Number of patient in Nifas Silk Lafto is ${dataMaternalDeathNifas_Silk_Lafto}`;
  }
  if (label === 'Lemi Kura') {
    return `The Number of patient in Lemi Kura is ${dataMaternalDeathLemi_Kura}`;
  }
  if (label === 'Lideta') {
    return `The Number of patient in Lideta is ${dataMaternalDeathLideta}`;
  }
  if (label === 'Yeka') {
    return `The Number of patient in Yeka is ${dataMaternalDeathYeka}`;
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
///////////////////////////front///////////////////////////St_PeterGeneralHospital single record//////////////Gete-SingleCholeraAddisKetema
const [dataMaternalDeathSt_PeterGeneralHospital, setDatadataMaternalDeathSt_PeterGeneralHospital] = useState([]);


useEffect(() => {
  getAllMaternalDeathSt_PeterGeneralHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathSt_PeterGeneralHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathSt_PeterGeneralHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathSt_PeterGeneralHospital(data.data);
    
    });
};
///////////////////////////AlertGeneralHospital front///////////////////////////single record//////////////
const [dataMaternalDeathAlertGeneralHospital, setDatadataMaternalDeathAlertGeneralHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathAlertGeneralHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathAlertGeneralHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathaAlertGeneralHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AlertGeneralHospitalData ");
      setDatadataMaternalDeathAlertGeneralHospital(data.data);
    
    });
};
///////////////////////////GandhiMemorialHospital  front///////////////////////////single record//////////////
const [dataMaternalDeathGandhiMemorialHospital , setDatadataMaternalDeathGandhiMemorialHospital ] = useState([]);

useEffect(() => {
  getAllMaternalDeathGandhiMemorialHospital ();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathGandhiMemorialHospital  = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathGandhiMemorialHospital ?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "GandhiMemorialHospital Data ");
      setDatadataMaternalDeathGandhiMemorialHospital (data.data);
    
    });
};
///////////////////////////St. Paulo's  ComprehensiveSpecializedHospital front///////////////////////////single record//////////////
const [dataMaternalDeathSt_PauloHospital, setDatadataMaternalDeathSt_PauloHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathSt_PauloHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathSt_PauloHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathSt_PauloHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "St_PauloHospitalData ");
      setDatadataMaternalDeathSt_PauloHospital(data.data);
    
    });
};
///////////////////////////TikurAnbessaHospital front///////////////////////////single record//////////////
const [dataMaternalDeathTikurAnbessaHospital, setDatadataMaternalDeathTikurAnbessaHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathTikurAnbessaHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathTikurAnbessaHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathTikurAnbessaHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "TikurAnbessaHospitalData ");
      setDatadataMaternalDeathTikurAnbessaHospital(data.data);
    
    });
};

///////////////////////////TiruneshBejingHospital front///////////////////////////single record//////////////
const [dataMaternalDeathTiruneshBejingHospital, setDatadataMaternalDeathTiruneshBejingHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathTiruneshBejingHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathTiruneshBejingHospital= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathTiruneshBejingHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "TiruneshBejingHospitalData ");
      setDatadataMaternalDeathTiruneshBejingHospital(data.data);
    
    });
};

///////////////////////////YekaKotebeHospital  front///////////////////////////single record//////////////
const [dataMaternalDeathYekaKotebeHospital, setDatadataMaternalDeathYekaKotebeHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathYekaKotebeHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathYekaKotebeHospital= () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathYekaKotebeHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "YekaKotebeHospitalData ");
      setDatadataMaternalDeathYekaKotebeHospital(data.data);
    
    });
};

///////////////////////////ZewdituHospital front///////////////////////////single record//////////////
const [dataMaternalDeathZewdituHospital, setDatadataMaternalDeathZewdituHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathZewdituHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathZewdituHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathZewdituHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "ZewdituHospitalData ");
      setDatadataMaternalDeathZewdituHospital(data.data);
    
    });
};

///////////////////////////AbebechGobenaHospital front///////////////////////////single record//////////////
const [dataMaternalDeathAbebechGobenaHospital, setDatadataMaternalDeathAbebechGobenaHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathAbebechGobenaHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathAbebechGobenaHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathAbebechGobenaHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AbebechGobenaHospitalData ");
      setDatadataMaternalDeathAbebechGobenaHospital(data.data);
    
    });
};

///////////////////////////BetsegaMCCenter front///////////////////////////single record//////////////
const [dataMaternalDeathBetsegaMCCenter, setDatadataMaternalDeathBetsegaMCCenter] = useState([]);

useEffect(() => {
  getAllMaternalDeathBetsegaMCCenter();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathBetsegaMCCenter = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathBetsegaMCCenter?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "BetsegaMCCenterData ");
      setDatadataMaternalDeathBetsegaMCCenter(data.data);
    
    });
};
///////////////////////////ChurchillHC front///////////////////////////single record//////////////
const [dataMaternalDeathChurchillHC, setDatadataMaternalDeathChurchillHC] = useState([]);

useEffect(() => {
  getAllMaternalDeathChurchillHC();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathChurchillHC = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathChurchillHC?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "ChurchillHCData ");
      setDatadataMaternalDeathChurchillHC(data.data);
    
    });
};
///////////////////////////DagmawiMinilikHospital front///////////////////////////single record//////////////
const [dataMaternalDeathDagmawiMinilikHospital, setDatadataMaternalDeathDagmawiMinilikHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathDagmawiMinilikHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathDagmawiMinilikHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathDagmawiMinilikHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathDagmawiMinilikHospital(data.data);
    
    });
};
///////////////////////////KadiscoHospital front///////////////////////////single record//////////////
const [dataMaternalDeathKadiscoHospital, setDatadataMaternalDeathKadiscoHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathKadiscoHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathKadiscoHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathKadiscoHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathKadiscoHospital(data.data);
    
    });
};
//////////////////////////////////////////////////////////////DAta//////////////////////
 /////////////////////////////////////////////////////
 const dataHospital = [
  {
    name: 'St. Peter General Hospital',
    Number_of_patient: `${dataMaternalDeathSt_PeterGeneralHospital}`,
  },
  {
    name: 'Alert General  Hospital',
    Number_of_patient: `${dataMaternalDeathAlertGeneralHospital}`,
  },
  {
    name: 'Gandhi Memorial Hospital ',
    Number_of_patient: `${dataMaternalDeathGandhiMemorialHospital}`,
  },
  {
    name: 'St. Paulo  Comprehensive Specialized Hospital',
    Number_of_patient: `${dataMaternalDeathSt_PauloHospital}`,
  },
  {
    name: 'Tikur Anbessa Comprehensive Specialized Hospital',
    Number_of_patient: `${dataMaternalDeathTikurAnbessaHospital}`,
  },
  {
    name: 'Tirunesh Bejing General Hospital',
    Number_of_patient: `${dataMaternalDeathTiruneshBejingHospital}`,
  },
  {
    name: 'Yeka Kotebe General Hospital',
    Number_of_patient: `${dataMaternalDeathYekaKotebeHospital}`,
  },
  {
    name: 'Zewditu Memorial General Hospital',
    Number_of_patient: `${dataMaternalDeathZewdituHospital}`,
  },
  {
    name: 'Abebech Gobena MCH Hospital',
    Number_of_patient: `${dataMaternalDeathAbebechGobenaHospital}`,
  },

  {
    name: 'Betsega Mother and Child Center',
    Number_of_patient: `${dataMaternalDeathBetsegaMCCenter}`,
  },
  {
    name: 'Churchill Health Center',
    Number_of_patient: `${dataMaternalDeathChurchillHC}`,
  },
  {
    name: 'Dagmawi Minilik Comprehensive Specialized Hospital',
    Number_of_patient: `${dataMaternalDeathDagmawiMinilikHospital}`,
  },
  {
    name: 'Kadisco General Hospital',
    Number_of_patient: `${dataMaternalDeathKadiscoHospital}`,
  },
  
];

///////////////////////////Healthpost front///////////////////////////single record//////////////
const [dataMaternalDeathHealthpost, setDatadataMaternalDeathHealthpost] = useState([]);

useEffect(() => {
  getAllMaternalDeathHealthpost();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathHealthpost = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathHealthpost?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathHealthpost(data.data);
    
    });
};
///////////////////////////HealthCenter front///////////////////////////single record//////////////
const [dataMaternalDeathHealthCenter, setDatadataMaternalDeathHealthCenter] = useState([]);

useEffect(() => {
  getAllMaternalDeathHealthCenter();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathHealthCenter = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathHealthCenter?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathHealthCenter(data.data);
    
    });
};
///////////////////////////Hospital front///////////////////////////single record//////////////
const [dataMaternalDeathHospital, setDatadataMaternalDeathHospital] = useState([]);

useEffect(() => {
  getAllMaternalDeathHospital();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathHospital = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathHospital?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathHospital(data.data);
    
    });
};



///////////////////////////Privatclinic front///////////////////////////single record//////////////
const [dataMaternalDeathPrivatclinic, setDatadataMaternalDeathPrivatclinic] = useState([]);

useEffect(() => {
  getAllMaternalDeathPrivatclinic();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathPrivatclinic = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathPrivatclinic?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathKadiscoPrivatclinic(data.data);
    
    });
};
const datareportingFacility  = [
  {name: 'Health post',Number_of_patient:  parseInt(`${dataMaternalDeathHealthpost}`)},
  {name: 'Health center',Number_of_patient: parseInt(`${dataMaternalDeathHealthCenter}`) },
  {name: 'Hospital',Number_of_patient:  parseInt(`${dataMaternalDeathHospital}`)},
  {name: 'Privat clinic or hospital',Number_of_patient: parseInt(`${dataMaternalDeathPrivatclinic}`) },
]

///////////////////////////////////////////////////Preventability
///////////////////////////NO front///////////////////////////single record//////////////
const [dataMaternalDeathNO, setDatadataMaternalDeathNO] = useState([]);

useEffect(() => {
  getAllMaternalDeathNO();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathNO = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathNO?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "NOData ");
      setDatadataMaternalDeathNO(data.data);
    
    });
};
///////////////////////////Yes front///////////////////////////single record//////////////
const [dataMaternalDeathYes, setDatadataMaternalDeathYes] = useState([]);

useEffect(() => {
  getAllMaternalDeathYes();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathYes = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathYes?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "YesData ");
      setDatadataMaternalDeathYes(data.data);
    
    });
};
const dataPreventability  = [
  {
    name: 'NO',
    Number_of_patient:  parseInt(`${dataMaternalDeathNO}`),
  },
  {
    name: 'Yes',
    Number_of_patient:  parseInt(`${dataMaternalDeathYes}`),
  },
]

///////////////////////////Delay1 front///////////////////////////single record//////////////
const [dataMaternalDeathDelay1, setDatadataMaternalDeathDelay1] = useState([]);

useEffect(() => {
  getAllMaternalDeathDelay1();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathDelay1 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathDelay1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathDelay1(data.data);
    
    });
};

///////////////////////////Delay2 front///////////////////////////single record//////////////
const [dataMaternalDeathDelay2, setDatadataMaternalDeathDelay2] = useState([]);

useEffect(() => {
  getAllMaternalDeathDelay2();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathDelay2 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathDelay2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathDelay2(data.data);
    
    });
};
///////////////////////////Delay3 front///////////////////////////single record//////////////
const [dataMaternalDeathDelay3, setDatadataMaternalDeathDelay3] = useState([]);

useEffect(() => {
  getAllMaternalDeathDelay3();
},[searchQuery]);

//fetching all cholera
const getAllMaternalDeathDelay3 = () => {
  fetch(`http://localhost:3000/Gete-SingleMaternalDeathDelay3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMaternalDeathDelay3(data.data);
    
    });
};
const dataDelayType  = [
  {
    name: 'Delay1',
    Number_of_patient:  parseInt(`${dataMaternalDeathDelay1}`),
  },
  {
    name: 'Delay2',
    Number_of_patient:  parseInt(`${dataMaternalDeathDelay2}`),
  },
  {
    name: 'Delay3',
    Number_of_patient:  parseInt(`${dataMaternalDeathDelay3}`),
  },
]
///////////////////////////////////////////////////
const style = {
  top: '50%',
  right: -11,
  transform: 'translate(0, -75%)',
  lineHeight: '24px',
};

///////////////////////////////////////////////////////////////////////////////////////
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
  axios.get("http://localhost:3000/GeteMaternal")
  .then(res => {
   setdata(res.data)
   setrecords(res.data);
  })
  .catch(err => console.log(err));
 }, [])
 const Filter = (event) => {
   setrecords(Data.filter(f => f.Time .toLowerCase().includes(event.target.value)))
 }
 const Pname = (event) => {
  setrecords(Data.filter(f => f.TRegion .toLowerCase().startsWith(event.target.value)))
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
        MaternalDeath LINE LIST
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
                <th><h6>Deceased ID</h6></th>
                <th><h6>Time of berth</h6></th>
                <th><h6>Date and time of prinata death</h6> </th>
                <th><h6>Age at Death (Years)</h6></th>
                <th> <h6>Residence of Deceased </h6></th>
                <th><h6>Deceased Residency Region</h6></th>
                <th><h6>Other Residency Region</h6></th>
                <th> <h6>Deceased Sub City</h6></th>
                <th><h6>Deceased Zone</h6></th>
                <th> <h6>Deceased Residency Woreda</h6></th>
                <th><h6>Other  Name of Woreda</h6></th>
                <th><h6>Kebele | Ketena</h6></th>
                <th><h6>Place of death</h6></th>
                <th><h6>Marital status</h6></th>
                <th><h6>Religion </h6></th>
                <th><h6>other, Religion</h6></th>
                <th><h6>Ethnicity</h6></th>
                <th><h6>other, Ethnicity</h6> </th>
                <th> <h6>Educational status</h6></th>
                <th><h6>Gravidity</h6></th>
                <th><h6>Parity</h6></th>
                <th> <h6>Timing of death in relation to pregnancy</h6></th>
                <th><h6>If the deaths occur in post-partum/post-abortion, timing of death</h6></th>
                <th> <h6>Reporting Health Facility name & type</h6></th>
                <th><h6>other, Specify Facility</h6></th>
                <th><h6>Reporting Health Facility Name</h6></th>
                <th><h6>if name of health facility is not listed</h6></th>
                <th><h6>Specify name of health facility</h6></th>
                <th><h6>Region   </h6></th>
                <th> <h6>Other Region</h6></th>
                <th><h6>Name of Sub City</h6></th>
                <th> <h6>Other Name of Sub City </h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th><h6>Other Name of Woreda</h6></th>
                <th><h6>Date of Reporting</h6></th>
                <th><h6>This MDRF is extracted from</h6></th>
                <th><h6>Date of onset</h6></th>

                <th><h6>Attended ANC</h6></th>
                <th><h6>where is the ANC </h6></th>
                <th><h6>ANC, number of visits</h6></th>
                <th><h6> GA in months at the first ANC visits</h6></th>
                <th><h6>Mode of delivery</h6> </th>
                <th> <h6>Place of delivery or Abortion</h6></th>
                <th><h6>Date of delivery / Abortion</h6></th>
                <th><h6>who assisted the delivery/Abortion</h6></th>
                <th> <h6>Attended PNC/PAC</h6></th>
                <th><h6>number of visits</h6></th>
                <th> <h6>Cause of Death (Direct obstetric)</h6></th>
                <th><h6>other direct cause, specify</h6></th>
                <th><h6>Cause of Death (Indirect obstetric)</h6></th>
                <th><h6>other indirect cause, specify</h6></th>
                <th><h6>If delivered, what was the outcome </h6></th>
                <th><h6>Status of the baby at birth</h6></th>
                <th> <h6>If alive APGAR score at 5th minute</h6></th>
                <th><h6>Is the death preventable</h6></th>
                <th> <h6>Delay 1 </h6></th>
                <th><h6>Delay 2</h6></th>
                <th><h6>Delay 3</h6></th>
                <th><h6>Shortage equipment's / supplies name</h6></th>
                <th><h6>Name of officer completing the form</h6></th>
                <th><h6>Phone number of officer</h6></th>
                <th><h6>EPI_Week</h6></th>
                <th><h6>Take_a_photo</h6></th>


              </tr>
            </thead>
            <tbody > 
              {records && 
              records.map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.ID}</h6></th>
                  <th ><h6>{filer.Time}</h6></th>
                  <th ><h6>{filer.PrinataDDate.slice(0,10)}</h6></th>
                  <th><h6>{filer.Age}</h6></th>
                  <th><h6>{filer.Residence}</h6></th>
                  <th><h6>{filer.PRegion}</h6></th>
                  <th ><h6>{filer.TRegion}</h6></th>
                  <th ><h6>{filer.PSubCity}</h6></th>
                  <th><h6>{filer.Zone}</h6></th>
                  <th><h6>{filer.PWoreda}</h6></th>
                  <th><h6>{filer.pTWoreda}</h6></th>
                  <th ><h6>{filer.Kebele}</h6></th>
                  <th><h6>{filer.Pdeath}</h6></th>
                  <th><h6>{filer.PMarital}</h6></th>
                  <th><h6>{filer.Religion}</h6></th>
                  <th><h6>{filer.TReligion}</h6></th>
                  <th ><h6>{filer.Ethnicity}</h6></th>
                  <th ><h6>{filer.TEthnicity}</h6></th>
                  <th><h6>{filer.Educational}</h6></th>
                  <th><h6>{filer.TParity}</h6></th>
                  <th><h6>{filer.TDTime}</h6></th>
                  <th ><h6>{filer.PostPartum}</h6></th>
,
                  <th ><h6>{filer.FacilityT}</h6></th>
                  <th><h6>{filer.TFacilityT}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.HFTName}</h6></th>
                  <th ><h6>{filer.SpecifyF}</h6></th>
                  <th><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.HTRegion}</h6></th>
                  <th><h6>{filer.HSubCity}</h6></th>
                  <th ><h6>{filer.THSubCity}</h6></th>
                  <th ><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HFTworeda}</h6></th>
                  <th><h6>{filer.DReporting.slice(0,10)}</h6></th>
                  <th><h6>{filer.PDRF}</h6></th>
                  <th ><h6>{filer.OnsetDate.slice(0,10)}</h6></th>
                  <th><h6>{filer.ANC}</h6></th>

                  <th><h6>{filer.NWANC}</h6></th>
                  <th><h6>{filer.WANC}</h6></th>
                  <th><h6>{filer.GAANC}</h6></th>
                  <th ><h6>{filer.BabyBorn}</h6></th>
                  <th><h6>{filer.DBabyBorn.slice(0,10)}</h6></th>
                  <th><h6>{filer.Assisted}</h6></th>
                  <th><h6>{filer.PNC}</h6></th>
                  <th ><h6>{filer.TPNC}</h6></th>
                  <th ><h6>{filer.DirectCauseD}</h6></th>
                  <th><h6>{filer.TDirectCauseD}</h6></th>
                  <th><h6>{filer.IndirectCauseD}</h6></th>
                  <th><h6>{filer.TIndirectCauseD}</h6></th>
                  <th ><h6>{filer.Outcome}</h6></th>
                  <th><h6>{filer.Status}</h6></th>
                  
                  <th><h6>{filer.TAliveAPGAR}</h6></th>
                  <th><h6>{filer.preventable}</h6></th>
                  <th><h6>{filer.Ccause}</h6></th>
                  <th ><h6>{filer.Delay1}</h6></th>
                  <th><h6>{filer.Delay2}</h6></th>
                  <th><h6>{filer.Delay3}</h6></th>
                  <th><h6>{filer.Supplies}</h6></th>
                  <th ><h6>{filer.FCName}</h6></th>
                  <th ><h6>{filer.Phone}</h6></th>
                  <th><h6>{filer.EPIWeek}</h6></th>
                  <th><h6>{filer.file}</h6></th>

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
        <p class="text-center">Maternal death Trand with Epi-Week</p>
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50" >Maternal death reporting facility </p>
        <BarChart
          width={800}
          height={300}
          data={dataHospital}
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Types of MD reporting facility </p>
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Preventability of maternal death </p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataPreventability}
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Delay type of maternal death </p>
        <PieChart width={800} height={500}>
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
        </th>
        
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50 ">Maternal death By Subcity</p>
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

export default MaternalDeath_Report

