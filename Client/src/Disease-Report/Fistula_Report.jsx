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
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,Number_of_patient }) => {
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
function Fistula_Report() {
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
const [dataFistulaAkaki, setDatadataFistulaAkaki] = useState([]);
const [searchQuery,setSearchQuery]=useState("")

useEffect(() => {
  getAllFistulaAkaki();
},[searchQuery]);

//fetching all cholera
const getAllFistulaAkaki = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaAkaki?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataFistulaAkaki(data.data);
    
    });
};
///////////////////////////AddisKetema front///////////////////////////single record//////////////
const [dataFistulaAddisKetema, setDatadataFistulaAddisKetema] = useState([]);

useEffect(() => {
  getAllFistulaAddisKetema();
},[searchQuery]);

//fetching all cholera
const getAllFistulaAddisKetema = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaaAddisKetema?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AddisKetemaData ");
      setDatadataFistulaAddisKetema(data.data);
    
    });
};
///////////////////////////Arada front///////////////////////////single record//////////////
const [dataFistulaArada, setDatadataFistulaArada] = useState([]);

useEffect(() => {
  getAllFistulaArada();
},[searchQuery]);

//fetching all cholera
const getAllFistulaArada = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaArada?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AradaData ");
      setDatadataFistulaArada(data.data);
    
    });
};
///////////////////////////Bole front///////////////////////////single record//////////////
const [dataFistulaBole, setDatadataFistulaBole] = useState([]);

useEffect(() => {
  getAllFistulaBole();
},[searchQuery]);

//fetching all cholera
const getAllFistulaBole = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaBole?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "BoleData ");
      setDatadataFistulaBole(data.data);
    
    });
};
///////////////////////////Gulele front///////////////////////////single record//////////////
const [dataFistulaGulele, setDatadataFistulaGulele] = useState([]);

useEffect(() => {
  getAllFistulaGulele();
},[searchQuery]);

//fetching all cholera
const getAllFistulaGulele = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaGulele?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "GuleleData ");
      setDatadataFistulaGulele(data.data);
    
    });
};

///////////////////////////Kirkos front///////////////////////////single record//////////////
const [dataFistulaKirkos, setDatadataFistulaKirkos] = useState([]);

useEffect(() => {
  getAllFistulaKirkos();
},[searchQuery]);

//fetching all cholera
const getAllFistulaKirkos= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaKirkos?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "KirkosData ");
      setDatadataFistulaKirkos(data.data);
    
    });
};

///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
const [dataFistulakolife, setDatadataFistulakolife] = useState([]);

useEffect(() => {
  getAllFistulakolife();
},[searchQuery]);

//fetching all cholera
const getAllFistulakolife= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulakolife?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "kolifeData ");
      setDatadataFistulakolife(data.data);
    
    });
};

///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
const [dataFistulaNifas_Silk_Lafto, setDatadataFistulaNifas_Silk_Lafto] = useState([]);

useEffect(() => {
  getAllFistulaNifas_Silk_Lafto();
},[searchQuery]);

//fetching all cholera
const getAllFistulaNifas_Silk_Lafto = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaNifas_Silk_Lafto?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Nifas_Silk_LaftoData ");
      setDatadataFistulaNifas_Silk_Lafto(data.data);
    
    });
};

///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
const [dataFistulaLemi_Kura, setDatadataFistulaLemi_Kura] = useState([]);

useEffect(() => {
  getAllFistulaLemi_Kura();
},[searchQuery]);

//fetching all cholera
const getAllFistulaLemi_Kura = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaLemi_Kura?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Lemi_KuraData ");
      setDatadataFistulaLemi_Kura(data.data);
    
    });
};

///////////////////////////Lideta front///////////////////////////single record//////////////
const [dataFistulaLideta, setDatadataFistulaLideta] = useState([]);

useEffect(() => {
  getAllFistulaLideta();
},[searchQuery]);

//fetching all cholera
const getAllFistulaLideta = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaLideta?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LidetaData ");
      setDatadataFistulaLideta(data.data);
    
    });
};
///////////////////////////Yeka front///////////////////////////single record//////////////
const [dataFistulaYeka, setDatadataFistulaYeka] = useState([]);

useEffect(() => {
  getAllFistulaYeka();
},[searchQuery]);

//fetching all cholera
const getAllFistulaYeka = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaYeka?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "YekaData ");
      setDatadataFistulaYeka(data.data);
    
    });
};

////////////////////////////////////////////////////////////single/////////////////////////////////
///////////////////////////Female front///////////////////////////single record//////////////
const [dataFistulaFemale, setDatadataFistulaFemale] = useState([]);

useEffect(() => {
  getAllFistulaFemale();
},[searchQuery]);

//fetching all cholera
const getAllFistulaFemale = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaFemale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataFistulaFemale(data.data);
    
    });
};
///////////////////////////Male front///////////////////////////single record//////////////
const [dataFistulaMale, setDatadataFistulaMale] = useState([]);

useEffect(() => {
  getAllFistulaMale();
},[searchQuery]);

//fetching all cholera
const getAllFistulaMale = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaMale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataFistulaMale(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataPai = [
    
    { name: 'Female', Number_of_patient: parseInt(`${dataFistulaFemale}`)},
    { name: 'Male', Number_of_patient: parseInt(`${dataFistulaMale}`)},
   
  ];
  /////////////////////////////////////////////////////

  ///////////////////////////front Fistula///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataFistulaWeek1, setDatadataFistulaWeek1] = useState([]);
useEffect(() => {
  getAllFistulaWeek1();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataFistulaWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataFistulaWeek2, setDatadataFistulaWeek2] = useState([]);

useEffect(() => {
  getAllFistulaWeek2();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataFistulaWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataFistulaWeek3, setDatadataFistulaWeek3] = useState([]);

useEffect(() => {
  getAllFistulaWeek3();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataFistulaWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataFistulaWeek4, setDatadataFistulaWeek4] = useState([]);

useEffect(() => {
  getAllFistulaWeek4();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataFistulaWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataFistulaWeek5, setDatadataFistulaWeek5] = useState([]);

useEffect(() => {
  getAllFistulaWeek5();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataFistulaWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataFistulaWeek6, setDatadataFistulaWeek6] = useState([]);

useEffect(() => {
  getAllFistulaWeek6();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataFistulaWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataFistulaWeek7, setDatadataFistulaWeek7] = useState([]);

useEffect(() => {
  getAllFistulaWeek7();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataFistulaWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataFistulaWeek8, setDatadataFistulaWeek8] = useState([]);

useEffect(() => {
  getAllFistulaWeek8();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataFistulaWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataFistulaWeek9, setDatadataFistulaWeek9] = useState([]);

useEffect(() => {
  getAllFistulaWeek9();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataFistulaWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataFistulaWeek10, setDatadataFistulaWeek10] = useState([]);

useEffect(() => {
  getAllFistulaWeek10();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataFistulaWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataFistulaWeek11, setDatadataFistulaWeek11] = useState([]);

useEffect(() => {
  getAllFistulaWeek11();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataFistulaWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataFistulaWeek12, setDatadataFistulaWeek12] = useState([]);

useEffect(() => {
  getAllFistulaWeek12();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataFistulaWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataFistulaWeek13, setDatadataFistulaWeek13] = useState([]);

useEffect(() => {
  getAllFistulaWeek13();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataFistulaWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataFistulaWeek14, setDatadataFistulaWeek14] = useState([]);

useEffect(() => {
  getAllFistulaWeek14();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataFistulaWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataFistulaWeek15, setDatadataFistulaWeek15] = useState([]);


useEffect(() => {
  getAllFistulaWeek15();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataFistulaWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataFistulaWeek16, setDatadataFistulaWeek16] = useState([]);

useEffect(() => {
  getAllFistulaWeek16();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataFistulaWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataFistulaWeek17, setDatadataFistulaWeek17] = useState([]);

useEffect(() => {
  getAllFistulaWeek17();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataFistulaWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataFistulaWeek18, setDatadataFistulaWeek18] = useState([]);

useEffect(() => {
  getAllFistulaWeek18();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataFistulaWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataFistulaWeek19, setDatadataFistulaWeek19] = useState([]);

useEffect(() => {
  getAllFistulaWeek19();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataFistulaWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataFistulaWeek20, setDatadataFistulaWeek20] = useState([]);

useEffect(() => {
  getAllFistulaWeek20();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataFistulaWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataFistulaWeek21, setDatadataFistulaWeek21] = useState([]);

useEffect(() => {
  getAllFistulaWeek21();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataFistulaWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataFistulaWeek22, setDatadataFistulaWeek22] = useState([]);

useEffect(() => {
  getAllFistulaWeek22();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataFistulaWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataFistulaWeek23, setDatadataFistulaWeek23] = useState([]);

useEffect(() => {
  getAllFistulaWeek23();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataFistulaWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataFistulaWeek24, setDatadataFistulaWeek24] = useState([]);

useEffect(() => {
  getAllFistulaWeek24();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataFistulaWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataFistulaWeek25, setDatadataFistulaWeek25] = useState([]);

useEffect(() => {
  getAllFistulaWeek25();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataFistulaWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataFistulaWeek26, setDatadataFistulaWeek26] = useState([]);

useEffect(() => {
  getAllFistulaWeek26();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataFistulaWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataFistulaWeek27, setDatadataFistulaWeek27] = useState([]);

useEffect(() => {
  getAllFistulaWeek27();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataFistulaWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataFistulaWeek28, setDatadataFistulaWeek28] = useState([]);

useEffect(() => {
  getAllFistulaWeek28();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataFistulaWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataFistulaWeek29, setDatadataFistulaWeek29] = useState([]);
useEffect(() => {
  getAllFistulaWeek29();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataFistulaWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataFistulaWeek30, setDatadataFistulaWeek30] = useState([]);

useEffect(() => {
  getAllFistulaWeek30();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataFistulaWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataFistulaWeek31, setDatadataFistulaWeek31] = useState([]);

useEffect(() => {
  getAllFistulaWeek31();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataFistulaWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataFistulaWeek32, setDatadataFistulaWeek32] = useState([]);

useEffect(() => {
  getAllFistulaWeek32();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataFistulaWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataFistulaWeek33, setDatadataFistulaWeek33] = useState([]);

useEffect(() => {
  getAllFistulaWeek33();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataFistulaWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataFistulaWeek34, setDatadataFistulaWeek34] = useState([]);

useEffect(() => {
  getAllFistulaWeek34();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataFistulaWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataFistulaWeek35, setDatadataFistulaWeek35] = useState([]);

useEffect(() => {
  getAllFistulaWeek35();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataFistulaWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataFistulaWeek36, setDatadataFistulaWeek36] = useState([]);

useEffect(() => {
  getAllFistulaWeek36();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataFistulaWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataFistulaWeek37, setDatadataFistulaWeek37] = useState([]);

useEffect(() => {
  getAllFistulaWeek37();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataFistulaWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataFistulaWeek38, setDatadataFistulaWeek38] = useState([]);

useEffect(() => {
  getAllFistulaWeek38();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataFistulaWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataFistulaWeek39, setDatadataFistulaWeek39] = useState([]);

useEffect(() => {
  getAllFistulaWeek39();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataFistulaWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataFistulaWeek40, setDatadataFistulaWeek40] = useState([]);

useEffect(() => {
  getAllFistulaWeek40();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataFistulaWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataFistulaWeek41, setDatadataFistulaWeek41] = useState([]);

useEffect(() => {
  getAllFistulaWeek41();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataFistulaWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataFistulaWeek42, setDatadataFistulaWeek42] = useState([]);

useEffect(() => {
  getAllFistulaWeek42();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataFistulaWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataFistulaWeek43, setDatadataFistulaWeek43] = useState([]);


useEffect(() => {
  getAllFistulaWeek43();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataFistulaWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataFistulaWeek44, setDatadataFistulaWeek44] = useState([]);

useEffect(() => {
  getAllFistulaWeek44();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataFistulaWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataFistulaWeek45, setDatadataFistulaWeek45] = useState([]);

useEffect(() => {
  getAllFistulaWeek45();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataFistulaWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataFistulaWeek46, setDatadataFistulaWeek46] = useState([]);

useEffect(() => {
  getAllFistulaWeek46();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataFistulaWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataFistulaWeek47, setDatadataFistulaWeek47] = useState([]);

useEffect(() => {
  getAllFistulaWeek47();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataFistulaWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataFistulaWeek48, setDatadataFistulaWeek48] = useState([]);

useEffect(() => {
  getAllFistulaWeek48();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataFistulaWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataFistulaWeek49, setDatadataFistulaWeek49] = useState([]);

useEffect(() => {
  getAllFistulaWeek49();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataFistulaWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataFistulaWeek50, setDatadataFistulaWeek50] = useState([]);

useEffect(() => {
  getAllFistulaWeek50();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataFistulaWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataFistulaWeek51, setDatadataFistulaWeek51] = useState([]);

useEffect(() => {
  getAllFistulaWeek51();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataFistulaWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataFistulaWeek52, setDatadataFistulaWeek52] = useState([]);

useEffect(() => {
  getAllFistulaWeek52();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataFistulaWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLineFistula = [{ Week: 'Week 1', Number_of_patient: `${dataFistulaWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataFistulaWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataFistulaWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataFistulaWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataFistulaWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataFistulaWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataFistulaWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataFistulaWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataFistulaWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataFistulaWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataFistulaWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataFistulaWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataFistulaWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataFistulaWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataFistulaWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataFistulaWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataFistulaWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataFistulaWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataFistulaWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataFistulaWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataFistulaWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataFistulaWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataFistulaWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataFistulaWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataFistulaWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataFistulaWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataFistulaWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataFistulaWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataFistulaWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataFistulaWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataFistulaWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataFistulaWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataFistulaWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataFistulaWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataFistulaWeek35}` },{Week:'Week 36',Number_of_patient: `${dataFistulaWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataFistulaWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataFistulaWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataFistulaWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataFistulaWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataFistulaWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataFistulaWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataFistulaWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataFistulaWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataFistulaWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataFistulaWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataFistulaWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataFistulaWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataFistulaWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataFistulaWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataFistulaWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataFistulaWeek52}`, },
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
    Number_of_patient: `${dataFistulaAkaki}`,
  },
  {
    name: 'Addis Ketema',
    Number_of_patient: `${dataFistulaAddisKetema}`,
  },
  {
    name: 'Arada',
    Number_of_patient: `${dataFistulaArada}`,
  },
  {
    name: 'Bole',
    Number_of_patient: `${dataFistulaBole}`,
  },
  {
    name: 'Gulele',
    Number_of_patient: `${dataFistulaGulele}`,
  },
  {
    name: 'Kirkos',
    Number_of_patient: `${dataFistulaKirkos}`,
  },
  {
    name: 'kolife',
    Number_of_patient: `${dataFistulakolife}`,
  },
  {
    name: 'Nifas Silk Lafto',
    Number_of_patient: `${dataFistulaNifas_Silk_Lafto}`,
  },
  {
    name: 'Lemi Kura',
    Number_of_patient: `${dataFistulaLemi_Kura}`,
  },
  
  {
    name: 'Lideta',
    Number_of_patient: `${dataFistulaLideta}`,
  },
  {
    name: 'Yeka',
    Number_of_patient: `${dataFistulaYeka}`,
  },
];

const getIntroOfPage = (label) => {
  
  if (label === 'Akaki') {
    return `The Number of patient in Addis Ketema is ${dataFistulaAkaki}`;
  }
  if (label === 'Addis Ketema') {
    return `The Number of patient in Addis Ketema is ${dataFistulaAddisKetema}`;
  }
  if (label === 'Arada') {
    return `The Number of patient in Arada is ${dataFistulaArada}`;
  }
  if (label === 'Bole') {
    return `The Number of patient in Bole is ${dataFistulaBole}`;
  }
  if (label === 'Gulele') {
    return `The Number of patient in Gulele is ${dataFistulaGulele}`;
  }
  if (label === 'Kirkos') {
    return `The Number of patient in Kirkos is ${dataFistulaKirkos}`;
  }
  if (label === 'kolife') {
    return `The Number of patient in kolife is ${dataFistulakolife}`;
  }
  if (label === 'Nifas Silk Lafto') {
    return `The Number of patient in Nifas Silk Lafto is ${dataFistulaNifas_Silk_Lafto}`;
  }
  if (label === 'Lemi Kura') {
    return `The Number of patient in Lemi Kura is ${dataFistulaLemi_Kura}`;
  }
  if (label === 'Lideta') {
    return `The Number of patient in Lideta is ${dataFistulaLideta}`;
  }
  if (label === 'Yeka') {
    return `The Number of patient in Yeka is ${dataFistulaYeka}`;
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
///////////////////////////////////////////////Marital status///////////////////
///////////////////////////NotMarried front///////////////////////////single record//////////////
const [dataFistulaNotMarried, setDatadataFistulaNotMarried] = useState([]);

useEffect(() => {
  getAllFistulaNotMarried();
},[searchQuery]);

//fetching all cholera
const getAllFistulaNotMarried = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaNotMarried?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "NotMarriedData ");
      setDatadataFistulaNotMarried(data.data);
    
    });
};
///////////////////////////Married front///////////////////////////single record//////////////
const [dataFistulaMarried, setDatadataFistulaMarried] = useState([]);

useEffect(() => {
  getAllFistulaMarried();
},[searchQuery]);

//fetching all cholera
const getAllFistulaMarried = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaMarried?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "MarriedData ");
      setDatadataFistulaMarried(data.data);
    
    });
};
///////////////////////////Divorced front///////////////////////////single record//////////////
const [dataFistulaDivorced, setDatadataFistulaDivorced] = useState([]);

useEffect(() => {
  getAllFistulaDivorced();
},[searchQuery]);

//fetching all cholera
const getAllFistulaDivorced = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaDivorced?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "DivorcedData ");
      setDatadataFistulaDivorced(data.data);
    
    });
};

///////////////////////////Widowed front///////////////////////////single record//////////////
const [dataFistulaWidowed, setDatadataFistulaWidowed] = useState([]);

useEffect(() => {
  getAllFistulaWidowed();
},[searchQuery]);

//fetching all cholera
const getAllFistulaWidowed= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaWidowed?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "WidowedData ");
      setDatadataFistulaWidowed(data.data);
    
    });
};

///////////////////////////Underage   front///////////////////////////single record//////////////
const [dataFistulaUnderage , setDatadataFistulaUnderage ] = useState([]);

useEffect(() => {
  getAllFistulaUnderage ();
},[searchQuery]);

//fetching all cholera
const getAllFistulaUnderage = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaUnderage?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Underage Data ");
      setDatadataFistulaUnderage (data.data);
    
    });
};



const datainMaritalS = [
    
  { name: 'Single', Number_of_patient:  parseInt(`${dataFistulaNotMarried}`)},
  { name: 'Married', Number_of_patient:  parseInt(`${dataFistulaMarried}`)},
  { name: 'Divorced', Number_of_patient:  parseInt(`${dataFistulaDivorced}`)},
  { name: 'Widowed', Number_of_patient: parseInt(`${dataFistulaWidowed}`)},
  { name: 'NA (Underage Children)', Number_of_patient:   parseInt(`${dataFistulaUnderage}`)},
];
  ////////////////////////////////////////end////////////////////////////

  ///////////////////////////////////////////////Marital status///////////////////
///////////////////////////Educational status front///////////////////////////single record//////////////
const [dataFistulaNoFormalEducation, setDatadataFistulaNoFormalEducation] = useState([]);

useEffect(() => {
  getAllFistulaNoFormalEducation();
},[searchQuery]);

//fetching all cholera
const getAllFistulaNoFormalEducation = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaNoFormalEducation?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "NoFormalEducationData ");
      setDatadataFistulaNoFormalEducation(data.data);
    
    });
};
///////////////////////////Readandwrite front///////////////////////////single record//////////////
const [dataFistulaReadandwrite, setDatadataFistulaReadandwrite] = useState([]);

useEffect(() => {
  getAllFistulaReadandwrite();
},[searchQuery]);

//fetching all cholera
const getAllFistulaReadandwrite = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaReadandwrite?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "ReadandwriteData ");
      setDatadataFistulaReadandwrite(data.data);
    
    });
};
///////////////////////////Elementary front///////////////////////////single record//////////////
const [dataFistulaElementary, setDatadataFistulaElementary] = useState([]);

useEffect(() => {
  getAllFistulaElementary();
},[searchQuery]);

//fetching all cholera
const getAllFistulaElementary = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaElementary?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "ElementaryData ");
      setDatadataFistulaElementary(data.data);
    
    });
};

///////////////////////////HighSchool front///////////////////////////single record//////////////
const [dataFistulaHighSchool, setDatadataFistulaHighSchool] = useState([]);

useEffect(() => {
  getAllFistulaHighSchool();
},[searchQuery]);

//fetching all cholera
const getAllFistulaHighSchool= () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaHighSchool?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "HighSchoolData ");
      setDatadataFistulaHighSchool(data.data);
    
    });
};

///////////////////////////College   front///////////////////////////single record//////////////
const [dataFistulaCollege , setDatadataFistulaCollege ] = useState([]);

useEffect(() => {
  getAllFistulaCollege ();
},[searchQuery]);

//fetching all cholera
const getAllFistulaCollege = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaCollege?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "College Data ");
      setDatadataFistulaCollege (data.data);
    
    });
};
///////////////////////////HigherEDucation   front///////////////////////////single record//////////////
const [dataFistulaHigherEDucation , setDatadataFistulaHigherEDucation ] = useState([]);

useEffect(() => {
  getAllFistulaHigherEDucation ();
},[searchQuery]);

//fetching all cholera
const getAllFistulaHigherEDucation = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaHigherEDucation?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "HigherEDucation Data ");
      setDatadataFistulaHigherEDucation (data.data);
    
    });
};



const datainEducational = [
    
  { name: 'No Education', Number_of_patient: `${dataFistulaNoFormalEducation}`},
  { name: 'read and write', Number_of_patient: `${dataFistulaReadandwrite}`},
  { name: 'Elementary', Number_of_patient: `${dataFistulaElementary}`},
  { name: 'HighSchool', Number_of_patient: `${dataFistulaHighSchool}`},
  { name: 'College', Number_of_patient: `${dataFistulaCollege }`},
  { name: 'Higher level', Number_of_patient: `${dataFistulaHigherEDucation }`},
];
  ////////////////////////////////////////end////////////////////////////
///////////////////////////Delay1 front///////////////////////////single record//////////////
const [dataFistulaDelay1, setDatadataFistulaDelay1] = useState([]);

useEffect(() => {
  getAllFistulaDelay1();
},[searchQuery]);

//fetching all cholera
const getAllFistulaDelay1 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaDelay1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataFistulaDelay1(data.data);
    
    });
};

///////////////////////////Delay2 front///////////////////////////single record//////////////
const [dataFistulaDelay2, setDatadataFistulaDelay2] = useState([]);

useEffect(() => {
  getAllFistulaDelay2();
},[searchQuery]);

//fetching all cholera
const getAllFistulaDelay2 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaDelay2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataFistulaDelay2(data.data);
    
    });
};
///////////////////////////Delay3 front///////////////////////////single record//////////////
const [dataFistulaDelay3, setDatadataFistulaDelay3] = useState([]);

useEffect(() => {
  getAllFistulaDelay3();
},[searchQuery]);

//fetching all cholera
const getAllFistulaDelay3 = () => {
  fetch(`http://localhost:3000/Gete-SingleFistulaDelay3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataFistulaDelay3(data.data);
    
    });
};
const dataDelayType  = [
  {
    name: 'Delay1',
    Number_of_patient:  parseInt(`${dataFistulaDelay1}`),
  },
  {
    name: 'Delay2',
    Number_of_patient:  parseInt(`${dataFistulaDelay2}`),
  },
  {
    name: 'Delay3',
    Number_of_patient:  parseInt(`${dataFistulaDelay3}`),
  },
]
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
  axios.get("http://localhost:3000/GeteFistula")
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
  const ObstetricFistulaLINELIST = useRef(null);
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
        <th className='p-3'><li onClick={() => scrollToSection(ObstetricFistulaLINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        MPDSR and Obstetric Fistula Assesment Cheklist
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

     



    
    <div className="border border-black " ref={ObstetricFistulaLINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT MPDSR and Obstetric Fistula Assesment Cheklist </h4>
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
                <th><h6>Unique IDN</h6></th>
                <th><h6>Date of onset </h6></th>
                <th><h6>Age at Death (Days)</h6> </th>
                <th><h6>Residence of Deceased | Parents</h6></th>
                <th> <h6>Region</h6></th>
                <th><h6>Other Residency Region</h6></th>
                <th><h6>Sub City</h6></th>
                <th> <h6>Woreda</h6></th>
                <th><h6>Other Name of Woreda</h6></th>
                <th> <h6>Kebele | Ketena</h6></th>
                <th><h6>Marital status</h6></th>
                <th><h6>Religion  </h6></th>
                <th><h6>other, Religion</h6></th>
                <th><h6> Educational status</h6></th>
                <th><h6>Health Facility Name</h6></th>
                <th><h6>Other,Health Facility Name </h6></th>
                <th><h6>Health Facility Type</h6></th>
                <th><h6>other, Specify Facility</h6> </th>
                <th> <h6>Name of Woreda | ጤና ተቋሙ የሚገኝበት ወረዳ</h6></th>
                <th><h6>Other,Health Facility Woreda</h6></th>
                <th><h6>Name of Sub City | ጤና ተቋሙ የሚገኝበት ክ/ከተማ</h6></th>
                <th> <h6>Other,Health Facility Sub-City</h6></th>
                <th><h6>Region | ጤና ተቋሙ የሚገኝበት ክልል</h6></th>
                <th> <h6>Other,Health Facility Region</h6></th>
                <th><h6>Date of Reporting</h6></th>
                <th><h6>Gravidity</h6></th>
                <th><h6>Parity  </h6></th>
                <th><h6>Number of living children</h6></th>
                <th><h6>Place of delivery or Abortion</h6></th>
                <th> <h6>Mode of delivery</h6></th>
                <th><h6>Type of obstetrics fistula</h6></th>
                <th> <h6>Outcome of delivery</h6></th>
                <th><h6>Timing Obstetric fistula occur after index delivery </h6></th>
                <th><h6>Attended ANC</h6></th>
                <th><h6>yes, where is the ANC </h6></th>
                <th><h6>other specify</h6></th>
                <th><h6>number of ANC visits</h6></th>

                <th><h6>Cause of obstetric fistula</h6></th>
                <th> <h6>other specify</h6></th>
                <th><h6>Delay 1</h6></th>
                <th> <h6>Delay 2</h6></th>
                <th><h6>Delay 3</h6></th>
                <th><h6>Shortage equipment's / supplies name</h6></th>
                <th><h6>Name of officer completing the form</h6></th>
                <th><h6>Phone number of officer completing form</h6></th>
                <th><h6>EPI_Week</h6></th>
                <th><h6>photo</h6></th>
              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
               
                    <th><h6>{filer.ID}</h6></th>
                  <th ><h6>{filer.OnsetDate}</h6></th>
                  <th ><h6>{filer.Age}</h6></th>
                  <th><h6>{filer.Residence}</h6></th>
                  <th><h6>{filer.PRegion}</h6></th>
                  <th><h6>{filer.TRegion}</h6></th>
                  <th ><h6>{filer.PSubCity}</h6></th>
                  <th ><h6>{filer.PWoreda}</h6></th>
                  <th><h6>{filer.pTWoreda}</h6></th>
                  <th><h6>{filer.Kebele}</h6></th>
                  <th><h6>{filer.PMarital}</h6></th>
                  <th><h6>{filer.Religion}</h6></th>
                  <th><h6>{filer.TReligion}</h6></th>
                  <th><h6>{filer.Educational}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.HFTName}</h6></th>
                  <th ><h6>{filer.FacilityT}</h6></th>
                  <th ><h6>{filer.TFacilityT}</h6></th>
                  <th><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HFTworeda}</h6></th>
                  <th><h6>{filer.HSubCity}</h6></th>
                  <th ><h6>{filer.THSubCity}</h6></th>
                  <th ><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.HTRegion}</h6></th>
                  <th><h6>{filer.DReporting}</h6></th>
                  <th><h6>{filer.Gravidity}</h6></th>
                  <th ><h6>{filer.TParity}</h6></th>
                  <th><h6>{filer.NLivingC}</h6></th>
                  <th><h6>{filer.BabyBorn}</h6></th>
                  <th><h6>{filer.Mode}</h6></th>
                  <th ><h6>{filer.TypeF}</h6></th>
                  <th ><h6>{filer.Outcome}</h6></th>
                  <th><h6>{filer.TimingOF}</h6></th>
                  <th><h6>{filer.ANC}</h6></th>
                  <th><h6>{filer.ANCK}</h6></th>
                  <th ><h6>{filer.WANC}</h6></th>
                  <th><h6>{filer.TWANC}</h6></th>
                  <th ><h6>{filer.TANC}</h6></th>
                  <th><h6>{filer.Cause}</h6></th>
                  <th><h6>{filer.Delay1}</h6></th>
                  <th><h6>{filer.Delay2}</h6></th>
                  <th ><h6>{filer.Delay3}</h6></th>
                  <th ><h6>{filer.Supplies}</h6></th>
                  <th><h6>{filer.FCName}</h6></th>
                  <th><h6>{filer.Phone}</h6></th>
                  <th><h6>{filer.EPIWeek}</h6></th>
                  <th ><h6>{filer.pdf}</h6></th>
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">OBSTETRIC FISTULA TREND </p>
      <LineChart
          width={800}
          height={300}
          data={dataLineFistula}
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">OBSTETRIC FISTULA EDUCATIONAL STATUS </p>
        <BarChart
          width={800}
          height={300}
          data={datainEducational}
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">OBSTETRIC FISTULA MARITAL STATUS </p>
        <PieChart width={800} height={500}>
          <Pie
            data={datainMaritalS}
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
          <Legend iconSize={10} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
        </PieChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">OBSTETRIC FISTULA IN DELAY TYPE</p>
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">OBSTETRIC FISTULA IN SUBCITY</p>
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

export default Fistula_Report

