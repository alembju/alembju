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
function AEFI_Report() {
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
const [dataAEFIAkaki, setDatadataAEFIAkaki] = useState([]);
const [searchQuery,setSearchQuery]=useState("")

useEffect(() => {
  getAllAEFIAkaki();
},[searchQuery]);

//fetching all cholera
const getAllAEFIAkaki = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIAkaki?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataAEFIAkaki(data.data);
    
    });
};
///////////////////////////AddisKetema front///////////////////////////single record//////////////
const [dataAEFIAddisKetema, setDatadataAEFIAddisKetema] = useState([]);

useEffect(() => {
  getAllAEFIAddisKetema();
},[searchQuery]);

//fetching all cholera
const getAllAEFIAddisKetema = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIaAddisKetema?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AddisKetemaData ");
      setDatadataAEFIAddisKetema(data.data);
    
    });
};
///////////////////////////Arada front///////////////////////////single record//////////////
const [dataAEFIArada, setDatadataAEFIArada] = useState([]);

useEffect(() => {
  getAllAEFIArada();
},[searchQuery]);

//fetching all cholera
const getAllAEFIArada = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIArada?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AradaData ");
      setDatadataAEFIArada(data.data);
    
    });
};
///////////////////////////Bole front///////////////////////////single record//////////////
const [dataAEFIBole, setDatadataAEFIBole] = useState([]);

useEffect(() => {
  getAllAEFIBole();
},[searchQuery]);

//fetching all cholera
const getAllAEFIBole = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIBole?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "BoleData ");
      setDatadataAEFIBole(data.data);
    
    });
};
///////////////////////////Gulele front///////////////////////////single record//////////////
const [dataAEFIGulele, setDatadataAEFIGulele] = useState([]);

useEffect(() => {
  getAllAEFIGulele();
},[searchQuery]);

//fetching all cholera
const getAllAEFIGulele = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIGulele?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "GuleleData ");
      setDatadataAEFIGulele(data.data);
    
    });
};

///////////////////////////Kirkos front///////////////////////////single record//////////////
const [dataAEFIKirkos, setDatadataAEFIKirkos] = useState([]);

useEffect(() => {
  getAllAEFIKirkos();
},[searchQuery]);

//fetching all cholera
const getAllAEFIKirkos= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIKirkos?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "KirkosData ");
      setDatadataAEFIKirkos(data.data);
    
    });
};

///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
const [dataAEFIkolife, setDatadataAEFIkolife] = useState([]);

useEffect(() => {
  getAllAEFIkolife();
},[searchQuery]);

//fetching all cholera
const getAllAEFIkolife= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIkolife?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "kolifeData ");
      setDatadataAEFIkolife(data.data);
    
    });
};

///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
const [dataAEFINifas_Silk_Lafto, setDatadataAEFINifas_Silk_Lafto] = useState([]);

useEffect(() => {
  getAllAEFINifas_Silk_Lafto();
},[searchQuery]);

//fetching all cholera
const getAllAEFINifas_Silk_Lafto = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFINifas_Silk_Lafto?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Nifas_Silk_LaftoData ");
      setDatadataAEFINifas_Silk_Lafto(data.data);
    
    });
};

///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
const [dataAEFILemi_Kura, setDatadataAEFILemi_Kura] = useState([]);

useEffect(() => {
  getAllAEFILemi_Kura();
},[searchQuery]);

//fetching all cholera
const getAllAEFILemi_Kura = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFILemi_Kura?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Lemi_KuraData ");
      setDatadataAEFILemi_Kura(data.data);
    
    });
};

///////////////////////////Lideta front///////////////////////////single record//////////////
const [dataAEFILideta, setDatadataAEFILideta] = useState([]);

useEffect(() => {
  getAllAEFILideta();
},[searchQuery]);

//fetching all cholera
const getAllAEFILideta = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFILideta?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LidetaData ");
      setDatadataAEFILideta(data.data);
    
    });
};
///////////////////////////Yeka front///////////////////////////single record//////////////
const [dataAEFIYeka, setDatadataAEFIYeka] = useState([]);

useEffect(() => {
  getAllAEFIYeka();
},[searchQuery]);

//fetching all cholera
const getAllAEFIYeka = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIYeka?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "YekaData ");
      setDatadataAEFIYeka(data.data);
    
    });
};

////////////////////////////////////////////////////////////single/////////////////////////////////
///////////////////////////Female front///////////////////////////single record//////////////
const [dataAEFIFemale, setDatadataAEFIFemale] = useState([]);

useEffect(() => {
  getAllAEFIFemale();
},[searchQuery]);

//fetching all cholera
const getAllAEFIFemale = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIFemale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataAEFIFemale(data.data);
    
    });
};
///////////////////////////Male front///////////////////////////single record//////////////
const [dataAEFIMale, setDatadataAEFIMale] = useState([]);

useEffect(() => {
  getAllAEFIMale();
},[searchQuery]);

//fetching all cholera
const getAllAEFIMale = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIMale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataAEFIMale(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataPai = [
    
    { name: 'Group A', value: `${dataAEFIFemale}`},
    { name: 'Group B', value: `${dataAEFIMale}`},
   
  ];
  /////////////////////////////////////////////////////
  ///////////////////////////front///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataAEFIWeek1, setDatadataAEFIWeek1] = useState([]);
useEffect(() => {
  getAllAEFIWeek1();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataAEFIWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataAEFIWeek2, setDatadataAEFIWeek2] = useState([]);

useEffect(() => {
  getAllAEFIWeek2();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataAEFIWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataAEFIWeek3, setDatadataAEFIWeek3] = useState([]);

useEffect(() => {
  getAllAEFIWeek3();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataAEFIWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataAEFIWeek4, setDatadataAEFIWeek4] = useState([]);

useEffect(() => {
  getAllAEFIWeek4();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataAEFIWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataAEFIWeek5, setDatadataAEFIWeek5] = useState([]);

useEffect(() => {
  getAllAEFIWeek5();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataAEFIWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataAEFIWeek6, setDatadataAEFIWeek6] = useState([]);

useEffect(() => {
  getAllAEFIWeek6();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataAEFIWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataAEFIWeek7, setDatadataAEFIWeek7] = useState([]);

useEffect(() => {
  getAllAEFIWeek7();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataAEFIWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataAEFIWeek8, setDatadataAEFIWeek8] = useState([]);

useEffect(() => {
  getAllAEFIWeek8();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataAEFIWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataAEFIWeek9, setDatadataAEFIWeek9] = useState([]);

useEffect(() => {
  getAllAEFIWeek9();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataAEFIWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataAEFIWeek10, setDatadataAEFIWeek10] = useState([]);

useEffect(() => {
  getAllAEFIWeek10();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataAEFIWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataAEFIWeek11, setDatadataAEFIWeek11] = useState([]);

useEffect(() => {
  getAllAEFIWeek11();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataAEFIWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataAEFIWeek12, setDatadataAEFIWeek12] = useState([]);

useEffect(() => {
  getAllAEFIWeek12();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataAEFIWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataAEFIWeek13, setDatadataAEFIWeek13] = useState([]);

useEffect(() => {
  getAllAEFIWeek13();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataAEFIWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataAEFIWeek14, setDatadataAEFIWeek14] = useState([]);

useEffect(() => {
  getAllAEFIWeek14();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataAEFIWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataAEFIWeek15, setDatadataAEFIWeek15] = useState([]);


useEffect(() => {
  getAllAEFIWeek15();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataAEFIWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataAEFIWeek16, setDatadataAEFIWeek16] = useState([]);

useEffect(() => {
  getAllAEFIWeek16();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataAEFIWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataAEFIWeek17, setDatadataAEFIWeek17] = useState([]);

useEffect(() => {
  getAllAEFIWeek17();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataAEFIWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataAEFIWeek18, setDatadataAEFIWeek18] = useState([]);

useEffect(() => {
  getAllAEFIWeek18();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataAEFIWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataAEFIWeek19, setDatadataAEFIWeek19] = useState([]);

useEffect(() => {
  getAllAEFIWeek19();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataAEFIWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataAEFIWeek20, setDatadataAEFIWeek20] = useState([]);

useEffect(() => {
  getAllAEFIWeek20();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataAEFIWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataAEFIWeek21, setDatadataAEFIWeek21] = useState([]);

useEffect(() => {
  getAllAEFIWeek21();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataAEFIWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataAEFIWeek22, setDatadataAEFIWeek22] = useState([]);

useEffect(() => {
  getAllAEFIWeek22();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataAEFIWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataAEFIWeek23, setDatadataAEFIWeek23] = useState([]);

useEffect(() => {
  getAllAEFIWeek23();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataAEFIWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataAEFIWeek24, setDatadataAEFIWeek24] = useState([]);

useEffect(() => {
  getAllAEFIWeek24();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataAEFIWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataAEFIWeek25, setDatadataAEFIWeek25] = useState([]);

useEffect(() => {
  getAllAEFIWeek25();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataAEFIWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataAEFIWeek26, setDatadataAEFIWeek26] = useState([]);

useEffect(() => {
  getAllAEFIWeek26();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataAEFIWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataAEFIWeek27, setDatadataAEFIWeek27] = useState([]);

useEffect(() => {
  getAllAEFIWeek27();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataAEFIWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataAEFIWeek28, setDatadataAEFIWeek28] = useState([]);

useEffect(() => {
  getAllAEFIWeek28();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataAEFIWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataAEFIWeek29, setDatadataAEFIWeek29] = useState([]);
useEffect(() => {
  getAllAEFIWeek29();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataAEFIWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataAEFIWeek30, setDatadataAEFIWeek30] = useState([]);

useEffect(() => {
  getAllAEFIWeek30();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataAEFIWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataAEFIWeek31, setDatadataAEFIWeek31] = useState([]);

useEffect(() => {
  getAllAEFIWeek31();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataAEFIWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataAEFIWeek32, setDatadataAEFIWeek32] = useState([]);

useEffect(() => {
  getAllAEFIWeek32();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataAEFIWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataAEFIWeek33, setDatadataAEFIWeek33] = useState([]);

useEffect(() => {
  getAllAEFIWeek33();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataAEFIWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataAEFIWeek34, setDatadataAEFIWeek34] = useState([]);

useEffect(() => {
  getAllAEFIWeek34();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataAEFIWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataAEFIWeek35, setDatadataAEFIWeek35] = useState([]);

useEffect(() => {
  getAllAEFIWeek35();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataAEFIWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataAEFIWeek36, setDatadataAEFIWeek36] = useState([]);

useEffect(() => {
  getAllAEFIWeek36();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataAEFIWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataAEFIWeek37, setDatadataAEFIWeek37] = useState([]);

useEffect(() => {
  getAllAEFIWeek37();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataAEFIWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataAEFIWeek38, setDatadataAEFIWeek38] = useState([]);

useEffect(() => {
  getAllAEFIWeek38();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataAEFIWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataAEFIWeek39, setDatadataAEFIWeek39] = useState([]);

useEffect(() => {
  getAllAEFIWeek39();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataAEFIWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataAEFIWeek40, setDatadataAEFIWeek40] = useState([]);

useEffect(() => {
  getAllAEFIWeek40();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataAEFIWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataAEFIWeek41, setDatadataAEFIWeek41] = useState([]);

useEffect(() => {
  getAllAEFIWeek41();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataAEFIWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataAEFIWeek42, setDatadataAEFIWeek42] = useState([]);

useEffect(() => {
  getAllAEFIWeek42();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataAEFIWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataAEFIWeek43, setDatadataAEFIWeek43] = useState([]);


useEffect(() => {
  getAllAEFIWeek43();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataAEFIWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataAEFIWeek44, setDatadataAEFIWeek44] = useState([]);

useEffect(() => {
  getAllAEFIWeek44();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataAEFIWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataAEFIWeek45, setDatadataAEFIWeek45] = useState([]);

useEffect(() => {
  getAllAEFIWeek45();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataAEFIWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataAEFIWeek46, setDatadataAEFIWeek46] = useState([]);

useEffect(() => {
  getAllAEFIWeek46();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataAEFIWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataAEFIWeek47, setDatadataAEFIWeek47] = useState([]);

useEffect(() => {
  getAllAEFIWeek47();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataAEFIWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataAEFIWeek48, setDatadataAEFIWeek48] = useState([]);

useEffect(() => {
  getAllAEFIWeek48();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataAEFIWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataAEFIWeek49, setDatadataAEFIWeek49] = useState([]);

useEffect(() => {
  getAllAEFIWeek49();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataAEFIWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataAEFIWeek50, setDatadataAEFIWeek50] = useState([]);

useEffect(() => {
  getAllAEFIWeek50();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataAEFIWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataAEFIWeek51, setDatadataAEFIWeek51] = useState([]);

useEffect(() => {
  getAllAEFIWeek51();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataAEFIWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataAEFIWeek52, setDatadataAEFIWeek52] = useState([]);

useEffect(() => {
  getAllAEFIWeek52();
},[searchQuery]);

//fetching all cholera
const getAllAEFIWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleAEFIWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataAEFIWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLineAEFI = [{ Week: 'Week 1', Number_of_patient: `${dataAEFIWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataAEFIWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataAEFIWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataAEFIWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataAEFIWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataAEFIWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataAEFIWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataAEFIWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataAEFIWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataAEFIWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataAEFIWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataAEFIWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataAEFIWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataAEFIWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataAEFIWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataAEFIWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataAEFIWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataAEFIWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataAEFIWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataAEFIWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataAEFIWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataAEFIWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataAEFIWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataAEFIWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataAEFIWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataAEFIWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataAEFIWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataAEFIWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataAEFIWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataAEFIWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataAEFIWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataAEFIWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataAEFIWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataAEFIWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataAEFIWeek35}` },{Week:'Week 36',Number_of_patient: `${dataAEFIWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataAEFIWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataAEFIWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataAEFIWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataAEFIWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataAEFIWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataAEFIWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataAEFIWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataAEFIWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataAEFIWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataAEFIWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataAEFIWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataAEFIWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataAEFIWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataAEFIWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataAEFIWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataAEFIWeek52}`, },
                    ];

  ///////////////////////////////////////////////////
    /////////////////////////Outcome//////////////////////////

const [dataRecovered, setDatadataRecovered] = useState([]);

useEffect(() => {
  getAllRecovered();
},[searchQuery]);

//fetching all cholera
const getAllRecovered = () => {
  fetch(`http://localhost:3000/Gete-SingleRecovered?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataRecovered(data.data);
    
    });
};
///////////////////////////RecoveredwithSequelae front///////////////////////////single record//////////////
const [dataRecoveredwithSequelae, setDatadataRecoveredwithSequelae] = useState([]);

useEffect(() => {
  getAllRecoveredwithSequelae();
},[searchQuery]);

//fetching all cholera
const getAllRecoveredwithSequelae = () => {
  fetch(`http://localhost:3000/Gete-SingleRecoveredwithSequelae?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataRecoveredwithSequelae(data.data);
    
    });
};
///////////////////////////Recovering front///////////////////////////single record//////////////
const [dataRecovering, setDatadataRecovering] = useState([]);

useEffect(() => {
  getAllRecovering();
},[searchQuery]);

//fetching all cholera
const getAllRecovering = () => {
  fetch(`http://localhost:3000/Gete-SingleRecovering?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataRecovering(data.data);
    
    });
};
///////////////////////////Fatal front///////////////////////////single record//////////////
const [dataFatal, setDatadataFatal] = useState([]);

useEffect(() => {
  getAllFatal();
},[searchQuery]);

//fetching all cholera
const getAllFatal = () => {
  fetch(`http://localhost:3000/Gete-SingleFatal?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataFatal(data.data);
    
    });
};
///////////////////////////Died front///////////////////////////single record//////////////
const [dataDied, setDatadataDied] = useState([]);

useEffect(() => {
  getAllDied();
},[searchQuery]);

//fetching all cholera
const getAllDied = () => {
  fetch(`http://localhost:3000/Gete-SingleDied?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataDied(data.data);
    
    });
};
///////////////////////////Unknown front///////////////////////////single record//////////////
const [dataUnknown, setDatadataUnknown] = useState([]);

useEffect(() => {
  getAllUnknown();
},[searchQuery]);

//fetching all cholera
const getAllUnknown = () => {
  fetch(`http://localhost:3000/Gete-SingleUnknown?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataUnknown(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataOutcome = [
    
    { name: 'Recovered', Number_of_patient: parseInt(`${dataRecovered}`)},
    { name: 'Recovered with sequelae', Number_of_patient:   parseInt(`${dataRecoveredwithSequelae}`)},
    { name: 'Recovering', Number_of_patient:   parseInt(`${dataRecovering}`)},
    { name: 'Fatal', Number_of_patient:  parseInt(`${dataFatal}`)},
    { name: 'Died', Number_of_patient:  parseInt(`${dataDied}`)},
    { name: 'Unknown', Number_of_patient:  parseInt(`${dataUnknown}`)},
  ];
  /////////////////////////////////////////////////////

  /////////////////////////Place of Vaccination//////////////////////////

const [dataHealthFacility, setDatadataHealthFacility] = useState([]);

useEffect(() => {
  getAllHealthFacility();
},[searchQuery]);

//fetching all cholera
const getAllHealthFacility = () => {
  fetch(`http://localhost:3000/Gete-SingleHealthFacility?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataHealthFacility(data.data);
    
    });
};
///////////////////////////Pharmacies front///////////////////////////single record//////////////
const [dataPharmacies, setDatadataPharmacies] = useState([]);

useEffect(() => {
  getAllPharmacies();
},[searchQuery]);

//fetching all cholera
const getAllPharmacies = () => {
  fetch(`http://localhost:3000/Gete-SinglePharmacies?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataPharmacies(data.data);
    
    });
};
///////////////////////////School front///////////////////////////single record//////////////
const [dataSchool, setDatadataSchool] = useState([]);

useEffect(() => {
  getAllSchool();
},[searchQuery]);

//fetching all cholera
const getAllSchool = () => {
  fetch(`http://localhost:3000/Gete-SingleSchool?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataSchool(data.data);
    
    });
};
///////////////////////////CommunityCenter front///////////////////////////single record//////////////
const [dataCommunityCenter, setDatadataCommunityCenter] = useState([]);

useEffect(() => {
  getAllCommunityCenter();
},[searchQuery]);

//fetching all cholera
const getAllCommunityCenter = () => {
  fetch(`http://localhost:3000/Gete-SingleCommunityCenter?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataCommunityCenter(data.data);
    
    });
};
///////////////////////////MobileClinics front///////////////////////////single record//////////////
const [dataMobileClinics, setDatadataMobileClinics] = useState([]);

useEffect(() => {
  getAllMobileClinics();
},[searchQuery]);

//fetching all cholera
const getAllMobileClinics = () => {
  fetch(`http://localhost:3000/Gete-SingleMobileClinics?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataMobileClinics(data.data);
    
    });
};
///////////////////////////Home front///////////////////////////single record//////////////
const [dataHome, setDatadataHome] = useState([]);

useEffect(() => {
  getAllHome();
},[searchQuery]);

//fetching all cholera
const getAllHome = () => {
  fetch(`http://localhost:3000/Gete-SingleHome?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataHome(data.data);
    
    });
};
///////////////////////////Other front///////////////////////////single record//////////////
const [dataOther, setDatadataOther] = useState([]);

useEffect(() => {
  getAllOther();
},[searchQuery]);

//fetching all cholera
const getAllOther = () => {
  fetch(`http://localhost:3000/Gete-SingleOther?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadataOther(data.data);
    
    });
};
  //////////////selection filter///////////////
  const dataPlaceV = [
    
    { name: 'Health facility', Number_of_patient: `${dataHealthFacility}`},
    { name: 'Pharmacies', Number_of_patient: `${dataPharmacies}`},
    { name: 'School', Number_of_patient: `${dataSchool}`},
    { name: 'CommunityCenter', Number_of_patient: `${dataCommunityCenter}`},
    { name: 'MobileClinics', Number_of_patient: `${dataMobileClinics}`},
    { name: 'Home', Number_of_patient: `${dataHome}`},
    { name: 'Other', Number_of_patient: `${dataOther}`},
  ];
  /////////////////////////////////////////////////////
  const dataLine = [
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
    Number_of_patient: `${dataAEFIAkaki}`,
  },
  {
    name: 'Addis Ketema',
    Number_of_patient: `${dataAEFIAddisKetema}`,
  },
  {
    name: 'Arada',
    Number_of_patient: `${dataAEFIArada}`,
  },
  {
    name: 'Bole',
    Number_of_patient: `${dataAEFIBole}`,
  },
  {
    name: 'Gulele',
    Number_of_patient: `${dataAEFIGulele}`,
  },
  {
    name: 'Kirkos',
    Number_of_patient: `${dataAEFIKirkos}`,
  },
  {
    name: 'kolife',
    Number_of_patient: `${dataAEFIkolife}`,
  },
  {
    name: 'Nifas Silk Lafto',
    Number_of_patient: `${dataAEFINifas_Silk_Lafto}`,
  },
  {
    name: 'Lemi Kura',
    Number_of_patient: `${dataAEFILemi_Kura}`,
  },
  
  {
    name: 'Lideta',
    Number_of_patient: `${dataAEFILideta}`,
  },
  {
    name: 'Yeka',
    Number_of_patient: `${dataAEFIYeka}`,
  },
];

const getIntroOfPage = (label) => {
  
  if (label === 'Akaki') {
    return `The Number of patient in Akaki is ${dataAEFIAkaki}`;
  }
  if (label === 'Addis Ketema') {
    return `The Number of patient in Addis Ketema is ${dataAEFIAddisKetema}`;
  }
  if (label === 'Arada') {
    return `The Number of patient in Arada is ${dataAEFIArada}`;
  }
  if (label === 'Bole') {
    return `The Number of patient in Bole is ${dataAEFIBole}`;
  }
  if (label === 'Gulele') {
    return `The Number of patient in Gulele is ${dataAEFIGulele}`;
  }
  if (label === 'Kirkos') {
    return `The Number of patient in Kirkos is ${dataAEFIKirkos}`;
  }
  if (label === 'kolife') {
    return `The Number of patient in kolife is ${dataAEFIkolife}`;
  }
  if (label === 'Nifas Silk Lafto') {
    return `The Number of patient in Nifas Silk Lafto is ${dataAEFINifas_Silk_Lafto}`;
  }
  if (label === 'Lemi Kura') {
    return `The Number of patient in Lemi Kura is ${dataAEFILemi_Kura}`;
  }
  if (label === 'Lideta') {
    return `The Number of patient in Lideta is ${dataAEFILideta}`;
  }
  if (label === 'Yeka') {
    return `The Number of patient in Yeka is ${dataAEFIYeka}`;
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
  axios.get("http://localhost:3000/AEFIDesease")
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
  const AEFILINELIST = useRef(null);
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
        <th className='p-3'><li onClick={() => scrollToSection(AEFILINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        AEFI LINE LIST
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

     



    
    <div className="border border-black " ref={AEFILINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT AEFI LINE LIST </h4>
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
                <th><h6>Reporting Date</h6></th>
                <th><h6>Reporting Health Facility Name</h6></th>
                <th><h6>name of health facility</h6> </th>
                <th><h6>Campaign</h6></th>
                <th> <h6>Routine Immunization</h6></th>
                <th><h6>AEFI Reporting ID</h6></th>
                <th><h6>Region</h6></th>
                <th> <h6>Residency Region</h6></th>
                <th><h6>Zone</h6></th>
                <th> <h6>Woreda</h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th><h6>Kebele | Ketena</h6></th>
                <th><h6>Age (YY.MM)</h6></th>
                <th><h6>Sex</h6></th>
                <th><h6>Pregnant</h6></th>
                <th><h6>Lactating</h6></th>
                <th><h6>Patient Phone Number</h6></th>
                <th><h6>Reporting Health Facility Type</h6> </th>
                <th> <h6>other, Specify Facility</h6></th>
                <th><h6>Reporting Health Facility Name</h6></th>
                <th><h6>name of health facility</h6></th>
                <th> <h6>Specify name of health facility</h6></th>
                <th><h6>Region</h6></th>
                <th> <h6>Health Facility Region</h6></th>
                <th><h6> Name of Sub City</h6></th>
                <th><h6>Health Facility Sub-City</h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th><h6>Health Facility Woreda</h6></th>
                <th><h6>Vaccine/s Brand</h6></th>
                <th> <h6>Manufacture Name</h6></th>
                <th><h6>Dose</h6></th>
                <th> <h6>Vaccine Batch No</h6></th>
                <th><h6>Diluent Batch No</h6></th>
                <th><h6>Route of Administration</h6></th>
                <th><h6>Expiry Date</h6></th>
                <th><h6>Concomitant Vaccine</h6></th>
                <th><h6>Place of Vaccination</h6></th>

                <th><h6>Date of Vaccination</h6></th>
                <th><h6>Date of onset</h6></th>
                <th> <h6>Date of Notification</h6></th>
                <th><h6>Date of Reporting</h6></th>
                <th> <h6>Serious</h6></th>
                <th><h6>Reason for Seriousness</h6></th>
                <th><h6>Outcome</h6></th>
                <th><h6>Investigation Done</h6></th>
                <th><h6>Reporter Region</h6></th>
                <th><h6>Other Reporter Region</h6></th>

                <th><h6>Reporter Sub City | ክ/ከተማ</h6></th>
                <th><h6>Other Sub City | ክ/ከተማ</h6></th>
                <th> <h6>Reporter Woreda |ወረዳ</h6></th>
                <th><h6>Other Woreda |ወረዳ</h6></th>
                <th> <h6>Reporter Kebele | Ketena</h6></th>
                <th><h6>Date Reported at National Level</h6></th>
                <th><h6>Name of Reporter</h6></th>
                <th><h6>Profession</h6></th>
                <th><h6>Phone number of officer completing form</h6></th>
                <th><h6>EPI_Week</h6></th>

              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>

                    <th><h6>{filer.DReporting}</h6></th>
                  <th ><h6>{filer.PHFName}</h6></th>
                  <th ><h6>{filer.PHFTName}</h6></th>
                  <th><h6>{filer.Campaign}</h6></th>
                  <th><h6>{filer.RImmunization}</h6></th>
                  <th><h6>{filer.ReportingID}</h6></th>
                  <th ><h6>{filer.PRegion}</h6></th>
                  <th ><h6>{filer.TRegion}</h6></th>
                  <th><h6>{filer.Zone}</h6></th>
                  <th><h6>{filer.PWoreda}</h6></th>
                  <th><h6>{filer.pTWoreda}</h6></th>
                  <th ><h6>{filer.Kebele}</h6></th>
                  <th><h6>{filer.Age}</h6></th>
                  <th><h6>{filer.Sex}</h6></th>
                  <th><h6>{filer.Pregnant}</h6></th>
                  <th><h6>{filer.Lactating}</h6></th>
                  <th ><h6>{filer.Phone}</h6></th>
                  <th ><h6>{filer.FacilityT}</h6></th>
                  <th><h6>{filer.TFacilityT}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.HFTName}</h6></th>
                  <th ><h6>{filer.SpecifyF}</h6></th>
                  <th ><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.HTRegion}</h6></th>
                  <th><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.THSubCity}</h6></th>
                  <th ><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HFTworeda}</h6></th>
                  <th><h6>{filer.Vaccine}</h6></th>
                  <th><h6>{filer.NManufacture}</h6></th>
                  <th ><h6>{filer.Dose}</h6></th>
                  <th ><h6>{filer.BVaccine}</h6></th>
                  <th><h6>{filer.DBatch}</h6></th>
                  <th><h6>{filer.RAdministration}</h6></th>
                  <th><h6>{filer.DExpiry}</h6></th>
                  <th ><h6>{filer.COVaccine}</h6></th>
                  <th><h6>{filer.PVaccination}</h6></th>
                  
                  <th ><h6>{filer.DVaccination}</h6></th>
                  <th><h6>{filer.Donset}</h6></th>
                  <th><h6>{filer.DNotification}</h6></th>
                  <th><h6>{filer.VDReporting}</h6></th>
                  <th ><h6>{filer.Serious}</h6></th>
                  <th ><h6>{filer.TextAReason}</h6></th>
                  <th><h6>{filer.Outcome}</h6></th>
                  <th><h6>{filer.Investigation}</h6></th>
                  <th><h6>{filer.RRegion}</h6></th>
                  <th ><h6>{filer.RTRegion}</h6></th>
                  <th><h6>{filer.RHSubCity}</h6></th>
                  <th><h6>{filer.RHWoreda}</h6></th>
                  <th><h6>{filer.RHFTworeda}</h6></th>
                  <th ><h6>{filer.RKebele}</h6></th>
                  <th ><h6>{filer.DNational}</h6></th>
                  <th><h6>{filer.NReporter}</h6></th>
                  <th><h6>{filer.Profession}</h6></th>
                  <th><h6>{filer.OfficerPhone}</h6></th>
                  <th ><h6>{filer.EPIWeek}</h6></th>
                 
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">AEFI TREAND</p>
      <LineChart
          width={800}
          height={300}
          data={dataLineAEFI}
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">AEFI By HEALTHFACLITY</p>
        <BarChart
          width={800}
          height={300}
          data={dataPlaceV}
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">AEFI By OUTCOME</p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataOutcome}
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">AEFI By Subcity</p>
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

export default AEFI_Report

