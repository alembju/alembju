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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,RadialBarChart, RadialBar } from 'recharts';
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
function YellowFever_Report() {
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
 const [dataYellowFeverAkaki, setDatadataYellowFeverAkaki] = useState([]);
 const [searchQuery,setSearchQuery]=useState("")
 
 useEffect(() => {
   getAllYellowFeverAkaki();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverAkaki = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverAkaki?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataYellowFeverAkaki(data.data);
     
     });
 };
 ///////////////////////////AddisKetema front///////////////////////////single record//////////////
 const [dataYellowFeverAddisKetema, setDatadataYellowFeverAddisKetema] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverAddisKetema();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverAddisKetema = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeveraAddisKetema?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AddisKetemaData ");
       setDatadataYellowFeverAddisKetema(data.data);
     
     });
 };
 ///////////////////////////Arada front///////////////////////////single record//////////////
 const [dataYellowFeverArada, setDatadataYellowFeverArada] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverArada();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverArada = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverArada?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AradaData ");
       setDatadataYellowFeverArada(data.data);
     
     });
 };
 ///////////////////////////Bole front///////////////////////////single record//////////////
 const [dataYellowFeverBole, setDatadataYellowFeverBole] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverBole();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverBole = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverBole?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "BoleData ");
       setDatadataYellowFeverBole(data.data);
     
     });
 };
 ///////////////////////////Gulele front///////////////////////////single record//////////////
 const [dataYellowFeverGulele, setDatadataYellowFeverGulele] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverGulele();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverGulele = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverGulele?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "GuleleData ");
       setDatadataYellowFeverGulele(data.data);
     
     });
 };
 
 ///////////////////////////Kirkos front///////////////////////////single record//////////////
 const [dataYellowFeverKirkos, setDatadataYellowFeverKirkos] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverKirkos();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverKirkos= () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverKirkos?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "KirkosData ");
       setDatadataYellowFeverKirkos(data.data);
     
     });
 };
 
 ///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
 const [dataYellowFeverkolife, setDatadataYellowFeverkolife] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverkolife();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverkolife= () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverkolife?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "kolifeData ");
       setDatadataYellowFeverkolife(data.data);
     
     });
 };
 
 ///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
 const [dataYellowFeverNifas_Silk_Lafto, setDatadataYellowFeverNifas_Silk_Lafto] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverNifas_Silk_Lafto();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverNifas_Silk_Lafto = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverNifas_Silk_Lafto?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Nifas_Silk_LaftoData ");
       setDatadataYellowFeverNifas_Silk_Lafto(data.data);
     
     });
 };
 
 ///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
 const [dataYellowFeverLemi_Kura, setDatadataYellowFeverLemi_Kura] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverLemi_Kura();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverLemi_Kura = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverLemi_Kura?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Lemi_KuraData ");
       setDatadataYellowFeverLemi_Kura(data.data);
     
     });
 };
 
 ///////////////////////////Lideta front///////////////////////////single record//////////////
 const [dataYellowFeverLideta, setDatadataYellowFeverLideta] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverLideta();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverLideta = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverLideta?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LidetaData ");
       setDatadataYellowFeverLideta(data.data);
     
     });
 };
 ///////////////////////////Yeka front///////////////////////////single record//////////////
 const [dataYellowFeverYeka, setDatadataYellowFeverYeka] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverYeka();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverYeka = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverYeka?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "YekaData ");
       setDatadataYellowFeverYeka(data.data);
     
     });
 };
 
 ////////////////////////////////////////////////////////////single/////////////////////////////////
 ///////////////////////////Female front///////////////////////////single record//////////////
 const [dataYellowFeverFemale, setDatadataYellowFeverFemale] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverFemale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverFemale = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverFemale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataYellowFeverFemale(data.data);
     
     });
 };
 ///////////////////////////Male front///////////////////////////single record//////////////
 const [dataYellowFeverMale, setDatadataYellowFeverMale] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverMale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverMale = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverMale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataYellowFeverMale(data.data);
     
     });
 };
 //////////////selection gender///////////////
 const dataPai = [
    
  { name: 'Female', Number_of_patient: parseInt(`${dataYellowFeverFemale}`)},
  { name: 'Male', Number_of_patient: parseInt(`${dataYellowFeverMale}`)},
 
];
/////////////////////////////////////////////////////
   ///////////////////////////front YellowFever///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataYellowFeverWeek1, setDatadataYellowFeverWeek1] = useState([]);
useEffect(() => {
  getAllYellowFeverWeek1();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataYellowFeverWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataYellowFeverWeek2, setDatadataYellowFeverWeek2] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek2();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataYellowFeverWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataYellowFeverWeek3, setDatadataYellowFeverWeek3] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek3();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataYellowFeverWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataYellowFeverWeek4, setDatadataYellowFeverWeek4] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek4();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataYellowFeverWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataYellowFeverWeek5, setDatadataYellowFeverWeek5] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek5();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataYellowFeverWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataYellowFeverWeek6, setDatadataYellowFeverWeek6] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek6();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataYellowFeverWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataYellowFeverWeek7, setDatadataYellowFeverWeek7] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek7();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataYellowFeverWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataYellowFeverWeek8, setDatadataYellowFeverWeek8] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek8();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataYellowFeverWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataYellowFeverWeek9, setDatadataYellowFeverWeek9] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek9();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataYellowFeverWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataYellowFeverWeek10, setDatadataYellowFeverWeek10] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek10();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataYellowFeverWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataYellowFeverWeek11, setDatadataYellowFeverWeek11] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek11();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataYellowFeverWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataYellowFeverWeek12, setDatadataYellowFeverWeek12] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek12();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataYellowFeverWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataYellowFeverWeek13, setDatadataYellowFeverWeek13] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek13();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataYellowFeverWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataYellowFeverWeek14, setDatadataYellowFeverWeek14] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek14();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataYellowFeverWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataYellowFeverWeek15, setDatadataYellowFeverWeek15] = useState([]);


useEffect(() => {
  getAllYellowFeverWeek15();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataYellowFeverWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataYellowFeverWeek16, setDatadataYellowFeverWeek16] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek16();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeveraWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataYellowFeverWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataYellowFeverWeek17, setDatadataYellowFeverWeek17] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek17();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataYellowFeverWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataYellowFeverWeek18, setDatadataYellowFeverWeek18] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek18();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataYellowFeverWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataYellowFeverWeek19, setDatadataYellowFeverWeek19] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek19();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataYellowFeverWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataYellowFeverWeek20, setDatadataYellowFeverWeek20] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek20();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataYellowFeverWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataYellowFeverWeek21, setDatadataYellowFeverWeek21] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek21();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataYellowFeverWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataYellowFeverWeek22, setDatadataYellowFeverWeek22] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek22();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataYellowFeverWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataYellowFeverWeek23, setDatadataYellowFeverWeek23] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek23();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataYellowFeverWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataYellowFeverWeek24, setDatadataYellowFeverWeek24] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek24();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataYellowFeverWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataYellowFeverWeek25, setDatadataYellowFeverWeek25] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek25();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataYellowFeverWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataYellowFeverWeek26, setDatadataYellowFeverWeek26] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek26();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataYellowFeverWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataYellowFeverWeek27, setDatadataYellowFeverWeek27] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek27();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataYellowFeverWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataYellowFeverWeek28, setDatadataYellowFeverWeek28] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek28();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataYellowFeverWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataYellowFeverWeek29, setDatadataYellowFeverWeek29] = useState([]);
useEffect(() => {
  getAllYellowFeverWeek29();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataYellowFeverWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataYellowFeverWeek30, setDatadataYellowFeverWeek30] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek30();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeveraWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataYellowFeverWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataYellowFeverWeek31, setDatadataYellowFeverWeek31] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek31();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataYellowFeverWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataYellowFeverWeek32, setDatadataYellowFeverWeek32] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek32();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataYellowFeverWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataYellowFeverWeek33, setDatadataYellowFeverWeek33] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek33();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataYellowFeverWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataYellowFeverWeek34, setDatadataYellowFeverWeek34] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek34();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataYellowFeverWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataYellowFeverWeek35, setDatadataYellowFeverWeek35] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek35();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataYellowFeverWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataYellowFeverWeek36, setDatadataYellowFeverWeek36] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek36();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataYellowFeverWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataYellowFeverWeek37, setDatadataYellowFeverWeek37] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek37();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataYellowFeverWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataYellowFeverWeek38, setDatadataYellowFeverWeek38] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek38();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataYellowFeverWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataYellowFeverWeek39, setDatadataYellowFeverWeek39] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek39();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataYellowFeverWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataYellowFeverWeek40, setDatadataYellowFeverWeek40] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek40();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataYellowFeverWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataYellowFeverWeek41, setDatadataYellowFeverWeek41] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek41();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataYellowFeverWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataYellowFeverWeek42, setDatadataYellowFeverWeek42] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek42();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataYellowFeverWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataYellowFeverWeek43, setDatadataYellowFeverWeek43] = useState([]);


useEffect(() => {
  getAllYellowFeverWeek43();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataYellowFeverWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataYellowFeverWeek44, setDatadataYellowFeverWeek44] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek44();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeveraWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataYellowFeverWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataYellowFeverWeek45, setDatadataYellowFeverWeek45] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek45();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataYellowFeverWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataYellowFeverWeek46, setDatadataYellowFeverWeek46] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek46();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataYellowFeverWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataYellowFeverWeek47, setDatadataYellowFeverWeek47] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek47();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataYellowFeverWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataYellowFeverWeek48, setDatadataYellowFeverWeek48] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek48();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataYellowFeverWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataYellowFeverWeek49, setDatadataYellowFeverWeek49] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek49();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataYellowFeverWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataYellowFeverWeek50, setDatadataYellowFeverWeek50] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek50();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataYellowFeverWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataYellowFeverWeek51, setDatadataYellowFeverWeek51] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek51();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataYellowFeverWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataYellowFeverWeek52, setDatadataYellowFeverWeek52] = useState([]);

useEffect(() => {
  getAllYellowFeverWeek52();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataYellowFeverWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLineYellowFever = [{ Week: 'Week 1', Number_of_patient: `${dataYellowFeverWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataYellowFeverWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataYellowFeverWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataYellowFeverWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataYellowFeverWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataYellowFeverWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataYellowFeverWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataYellowFeverWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataYellowFeverWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataYellowFeverWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataYellowFeverWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataYellowFeverWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataYellowFeverWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataYellowFeverWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataYellowFeverWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataYellowFeverWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataYellowFeverWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataYellowFeverWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataYellowFeverWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataYellowFeverWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataYellowFeverWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataYellowFeverWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataYellowFeverWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataYellowFeverWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataYellowFeverWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataYellowFeverWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataYellowFeverWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataYellowFeverWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataYellowFeverWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataYellowFeverWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataYellowFeverWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataYellowFeverWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataYellowFeverWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataYellowFeverWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataYellowFeverWeek35}` },{Week:'Week 36',Number_of_patient: `${dataYellowFeverWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataYellowFeverWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataYellowFeverWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataYellowFeverWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataYellowFeverWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataYellowFeverWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataYellowFeverWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataYellowFeverWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataYellowFeverWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataYellowFeverWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataYellowFeverWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataYellowFeverWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataYellowFeverWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataYellowFeverWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataYellowFeverWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataYellowFeverWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataYellowFeverWeek52}`, },
                    ];

  ///////////////////////////////////////////////////
 /////////////////////////////////////////////////////////////new pie chart///////////////////
  //////////////////////////LessFive front///////////////////////////single record//////////////
const [dataYellowFeverLessFive, setDatadataYellowFeverLessFive] = useState([]);

useEffect(() => {
  getAllYellowFeverLessFive();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverLessFive = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverLessFive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LessFiveData ");
      setDatadataYellowFeverLessFive(data.data);
    
    });
};
///////////////////////////Betweb5To14 front///////////////////////////single record//////////////
const [dataYellowFeverBetweb5To14, setDatadataYellowFeverBetweb5To14] = useState([]);

useEffect(() => {
  getAllYellowFeverBetweb5To14();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverBetweb5To14 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverBetweb5To14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb5To14Data ");
      setDatadataYellowFeverBetweb5To14(data.data);
    
    });
};
///////////////////////////Betweb15To29 front///////////////////////////single record//////////////
const [dataYellowFeverBetweb15To29, setDatadataYellowFeverBetweb15To29] = useState([]);

useEffect(() => {
  getAllYellowFeverBetweb15To29();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverBetweb15To29 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverBetweb15To29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb15To29Data ");
      setDatadataYellowFeverBetweb15To29(data.data);
    
    });
};

///////////////////////////Betweb30To49 front///////////////////////////single record//////////////
const [dataYellowFeverBetweb30To49, setDatadataYellowFeverBetweb30To49] = useState([]);

useEffect(() => {
  getAllYellowFeverBetweb30To49();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverBetweb30To49= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverBetweb30To49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb30To49Data ");
      setDatadataYellowFeverBetweb30To49(data.data);
    
    });
};

///////////////////////////Betweb50To59  front///////////////////////////single record//////////////
const [dataYellowFeverBetweb50To59, setDatadataYellowFeverBetweb50To59] = useState([]);

useEffect(() => {
  getAllYellowFeverBetweb50To59();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverBetweb50To59= () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverBetweb50To59?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb50To59Data ");
      setDatadataYellowFeverBetweb50To59(data.data);
    
    });
};

///////////////////////////Betweb60To69 front///////////////////////////single record//////////////
const [dataYellowFeverBetweb60To69, setDatadataYellowFeverBetweb60To69] = useState([]);

useEffect(() => {
  getAllYellowFeverBetweb60To69();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverBetweb60To69 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverBetweb60To69?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb60To69Data ");
      setDatadataYellowFeverBetweb60To69(data.data);
    
    });
};

///////////////////////////Above70 front///////////////////////////single record//////////////
const [dataYellowFeverAbove70, setDatadataYellowFeverAbove70] = useState([]);

useEffect(() => {
  getAllYellowFeverAbove70();
},[searchQuery]);

//fetching all cholera
const getAllYellowFeverAbove70 = () => {
  fetch(`http://localhost:3000/Gete-SingleYellowFeverAbove70?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Above70Data ");
      setDatadataYellowFeverAbove70(data.data);
    
    });
};


  const dataAgeGroup = [
    {
      name: '<5',
      uv: `${dataYellowFeverLessFive}`,
    
      fill: '#8884d8',
    },
    {
      name: '5-14',
      uv: `${dataYellowFeverBetweb5To14}`,
     
      fill: '#83a6ed',
    },
    {
      name: '15-29',
      uv: `${dataYellowFeverBetweb15To29}`,
      
      fill: '#8dd1e1',
    },
    {
      name: '30-49',
      uv: `${dataYellowFeverBetweb30To49}`,
      
      fill: '#82ca9d',
    },
    {
      name: '50-59',
      uv: `${dataYellowFeverBetweb50To59}`,
     
      fill: '#a4de6c',
    },
    {
      name: '60-69',
      uv: `${dataYellowFeverBetweb60To69}`,
      
      fill: '#d0ed57',
    },
    {
      name: '70+',
      uv: `${dataYellowFeverAbove70}`,
      
      fill: '#ffc658',
    },
  ];
  
   ///////////////////////////Outcome front///////////////////////////single record//////////////
 const [dataYellowFeverAlive, setDatadataYellowFeverAlive] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverAlive();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverAlive = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverAlive?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataYellowFeverAlive(data.data);
     
     });
 };
 ///////////////////////////Dead front///////////////////////////single record//////////////
 const [dataYellowFeverDead, setDatadataYellowFeverDead] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverDead();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverDead = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverDead?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataYellowFeverDead(data.data);
     
     });
 };
 ///////////////////////////On follow-up front///////////////////////////single record//////////////
 const [dataYellowFeverOnFollowUp, setDatadataYellowFeverOnFollowUp] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverOnFollowUp();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverOnFollowUp = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverOnFollowUp?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataYellowFeverOnFollowUp(data.data);
     
     });
 };
 ///////////////////////////Referred front///////////////////////////single record//////////////
 const [dataYellowFeverReferred, setDatadataYellowFeverReferred] = useState([]);
 
 useEffect(() => {
   getAllYellowFeverReferred();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllYellowFeverReferred = () => {
   fetch(`http://localhost:3000/Gete-SingleYellowFeverReferred?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataYellowFeverReferred(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataOutcome = [
    { name: 'Alive', Number_of_patient: parseInt(`${dataYellowFeverAlive}`)},
     { name: 'Dead', Number_of_patient: parseInt(`${dataYellowFeverDead}`)},
     { name: 'On follow-up', Number_of_patient: parseInt(`${dataYellowFeverOnFollowUp}`)},
     { name: 'Alive', Number_of_patient: parseInt(`${dataYellowFeverReferred}`)},
   ];
   ////////////////////////////Dead/////////////////////////
   const datas = [
   {
     name: 'Akaki',
     Number_of_patient: `${dataYellowFeverAkaki}`,
   },
   {
     name: 'Addis Ketema',
     Number_of_patient: `${dataYellowFeverAddisKetema}`,
   },
   {
     name: 'Arada',
     Number_of_patient: `${dataYellowFeverArada}`,
   },
   {
     name: 'Bole',
     Number_of_patient: `${dataYellowFeverBole}`,
   },
   {
     name: 'Gulele',
     Number_of_patient: `${dataYellowFeverGulele}`,
   },
   {
     name: 'Kirkos',
     Number_of_patient: `${dataYellowFeverKirkos}`,
   },
   {
     name: 'kolife',
     Number_of_patient: `${dataYellowFeverkolife}`,
   },
   {
     name: 'Nifas Silk Lafto',
     Number_of_patient: `${dataYellowFeverNifas_Silk_Lafto}`,
   },
   {
     name: 'Lemi Kura',
     Number_of_patient: `${dataYellowFeverLemi_Kura}`,
   },
   
   {
     name: 'Lideta',
     Number_of_patient: `${dataYellowFeverLideta}`,
   },
   {
     name: 'Yeka',
     Number_of_patient: `${dataYellowFeverYeka}`,
   },
 ];
 
 const getIntroOfPage = (label) => {
   
   if (label === 'Akaki') {
     return `The Number of patient in Addis Ketema is ${dataYellowFeverAkaki}`;
   }
   if (label === 'Addis Ketema') {
     return `The Number of patient in Addis Ketema is ${dataYellowFeverAddisKetema}`;
   }
   if (label === 'Arada') {
     return `The Number of patient in Arada is ${dataYellowFeverArada}`;
   }
   if (label === 'Bole') {
     return `The Number of patient in Bole is ${dataYellowFeverBole}`;
   }
   if (label === 'Gulele') {
     return `The Number of patient in Gulele is ${dataYellowFeverGulele}`;
   }
   if (label === 'Kirkos') {
     return `The Number of patient in Kirkos is ${dataYellowFeverKirkos}`;
   }
   if (label === 'kolife') {
     return `The Number of patient in kolife is ${dataYellowFeverkolife}`;
   }
   if (label === 'Nifas Silk Lafto') {
     return `The Number of patient in Nifas Silk Lafto is ${dataYellowFeverNifas_Silk_Lafto}`;
   }
   if (label === 'Lemi Kura') {
     return `The Number of patient in Lemi Kura is ${dataYellowFeverLemi_Kura}`;
   }
   if (label === 'Lideta') {
     return `The Number of patient in Lideta is ${dataYellowFeverLideta}`;
   }
   if (label === 'Yeka') {
     return `The Number of patient in Yeka is ${dataYellowFeverYeka}`;
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
  axios.get("http://localhost:3000/GetYellowFever")
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
  const YellowLINELIST = useRef(null);
  const Chart = useRef(null)

  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop,
      behavior: "smooth",
    });
  };
/////////////////////////////////////////component selection////////////////////////////////////YellowFeverMondel
const [selected,setSelected]=useState('YellowFever LINE LIST')

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
        <th className='p-3'><li onClick={() => scrollToSection(YellowLINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        Yellow Fever Line List
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

     



    
    <div className="border border-black " ref={YellowLINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT Yellow Fever Line List</h4>
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
                <th><h6>MRN</h6></th>
                <th><h6>Patient Category</h6></th>
                <th><h6>Name of patient</h6> </th>
                <th><h6>Patient Residency Region</h6></th>
                <th> <h6>Residency Region</h6></th>
                <th><h6>Patient Residency Sub City</h6></th>
                <th><h6>Patient Residency Woreda</h6></th>
                <th> <h6>Name of Woreda</h6></th>
                <th><h6>House Number</h6></th>
                <th> <h6>Kebele | Ketena</h6></th>
                <th><h6>Age</h6></th>
                <th><h6>Sex  </h6></th>
                <th><h6> Phone number of patient</h6></th>
                <th><h6>name of health facility</h6></th>
                <th><h6>Specify name of health facility</h6></th>
                <th><h6>Region</h6></th>
                <th><h6>Name of Sub City</h6></th>
                <th><h6>Health Facility Sub-City</h6> </th>
                <th> <h6>Name of Woreda</h6></th>
                <th><h6>Health Facility Woreda</h6></th>
                <th><h6>Date received at health facilit</h6></th>
                <th> <h6>Disease/Condition</h6></th>
                <th><h6>Date seen at health facility</h6></th>
                <th> <h6>Date of onset of disease</h6></th>
                <th><h6>Does the patient has developed either of the following symptoms</h6></th>
                <th><h6>Specimen taken</h6></th>
                <th><h6> date sample collected</h6></th>
                <th><h6>Laboratory Result </h6></th>
                <th><h6>Patient Outcome</h6></th>
                <th> <h6>Comments</h6></th>
                <th><h6>Name of officer completing the form</h6></th>
                <th> <h6>Phone number of officer</h6></th>
                <th><h6>EPI_Week </h6></th>
                <th><h6>photo</h6></th>
               
       
              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.YMRN}</h6></th>
                  <th ><h6>{filer.YPatient}</h6></th>
                  <th ><h6>{filer.YName}</h6></th>
                  <th><h6>{filer.YPRegion}</h6></th>
                  <th><h6>{filer.YTRegion}</h6></th>
                  <th><h6>{filer.YPSubCity}</h6></th>
                  <th ><h6>{filer.YPWoreda}</h6></th>
                  <th ><h6>{filer.YpTWoreda}</h6></th>
                  <th><h6>{filer.YHouse}</h6></th>
                  <th><h6>{filer.YKebele}</h6></th>
                  <th><h6>{filer.YAge}</h6></th>
                  <th ><h6>{filer.YSex}</h6></th>
                  <th><h6>{filer.YPPhone}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.YHFTName}</h6></th>
                  <th><h6>{filer.YSpecifyF}</h6></th>
                  <th ><h6>{filer.YHRegion}</h6></th>
                  <th ><h6>{filer.YHTRegion}</h6></th>
                  <th><h6>{filer.YHSubCity}</h6></th>
                  <th><h6>{filer.YTHSubCity}</h6></th>
                  <th><h6>{filer.YHWoreda}</h6></th>
                  <th ><h6>{filer.YHFTworeda}</h6></th>
                  <th ><h6>{filer.YDReceived}</h6></th>
                  <th><h6>{filer.YCondition}</h6></th>
                  <th><h6>{filer.YDSeen}</h6></th>
                  <th><h6>{filer.YDOnset}</h6></th>
                  <th ><h6>{filer.Ysymptoms}</h6></th>
                  <th><h6>{filer.YSpecimen}</h6></th>
                  <th><h6>{filer.YTSpecimen}</h6></th>
                  <th><h6>{filer.YResult}</h6></th>
                  <th ><h6>{filer.YOutcome}</h6></th>
                  <th ><h6>{filer.YComments}</h6></th>
                  <th><h6>{filer.YFCName}</h6></th>
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">YELLOWFEVER TREND</p>
      <LineChart
          width={800}
          height={300}
          data={dataLineYellowFever}
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">PREVENTABILITY OF YELLOWFEVER</p>
        <BarChart
          width={800}
          height={300}
          data={dataOutcome}
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">YELLOWFEVER BY GENDER</p>
        <PieChart width={800} height={500}>
          <Pie
            data={dataPai}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={150}
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">AGE GROUP OF YELLOWFEVER</p>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={dataAgeGroup} width={800} height={500}>
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">YELLOWFEVER IN SUBCITY</p>
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

export default YellowFever_Report

