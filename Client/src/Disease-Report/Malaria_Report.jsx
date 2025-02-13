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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer ,ComposedChart,RadialBarChart, RadialBar} from 'recharts';
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
function Malaria_Report() {
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
 const [dataMalariaAkaki, setDatadataMalariaAkaki] = useState([]);
 const [searchQuery,setSearchQuery]=useState("")
 
 useEffect(() => {
   getAllMalariaAkaki();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaAkaki = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaAkaki?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataMalariaAkaki(data.data);
     
     });
 };
 ///////////////////////////AddisKetema front///////////////////////////single record//////////////
 const [dataMalariaAddisKetema, setDatadataMalariaAddisKetema] = useState([]);
 
 useEffect(() => {
   getAllMalariaAddisKetema();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaAddisKetema = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaaAddisKetema?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AddisKetemaData ");
       setDatadataMalariaAddisKetema(data.data);
     
     });
 };
 ///////////////////////////Arada front///////////////////////////single record//////////////
 const [dataMalariaArada, setDatadataMalariaArada] = useState([]);
 
 useEffect(() => {
   getAllMalariaArada();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaArada = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaArada?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AradaData ");
       setDatadataMalariaArada(data.data);
     
     });
 };
 ///////////////////////////Bole front///////////////////////////single record//////////////
 const [dataMalariaBole, setDatadataMalariaBole] = useState([]);
 
 useEffect(() => {
   getAllMalariaBole();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaBole = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaBole?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "BoleData ");
       setDatadataMalariaBole(data.data);
     
     });
 };
 ///////////////////////////Gulele front///////////////////////////single record//////////////
 const [dataMalariaGulele, setDatadataMalariaGulele] = useState([]);
 
 useEffect(() => {
   getAllMalariaGulele();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaGulele = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaGulele?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "GuleleData ");
       setDatadataMalariaGulele(data.data);
     
     });
 };
 
 ///////////////////////////Kirkos front///////////////////////////single record//////////////
 const [dataMalariaKirkos, setDatadataMalariaKirkos] = useState([]);
 
 useEffect(() => {
   getAllMalariaKirkos();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaKirkos= () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaKirkos?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "KirkosData ");
       setDatadataMalariaKirkos(data.data);
     
     });
 };
 
 ///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
 const [dataMalariakolife, setDatadataMalariakolife] = useState([]);
 
 useEffect(() => {
   getAllMalariakolife();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariakolife= () => {
   fetch(`http://localhost:3000/Gete-SingleMalariakolife?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "kolifeData ");
       setDatadataMalariakolife(data.data);
     
     });
 };
 
 ///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
 const [dataMalariaNifas_Silk_Lafto, setDatadataMalariaNifas_Silk_Lafto] = useState([]);
 
 useEffect(() => {
   getAllMalariaNifas_Silk_Lafto();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaNifas_Silk_Lafto = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaNifas_Silk_Lafto?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Nifas_Silk_LaftoData ");
       setDatadataMalariaNifas_Silk_Lafto(data.data);
     
     });
 };
 
 ///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
 const [dataMalariaLemi_Kura, setDatadataMalariaLemi_Kura] = useState([]);
 
 useEffect(() => {
   getAllMalariaLemi_Kura();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaLemi_Kura = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaLemi_Kura?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Lemi_KuraData ");
       setDatadataMalariaLemi_Kura(data.data);
     
     });
 };
 
 ///////////////////////////Lideta front///////////////////////////single record//////////////
 const [dataMalariaLideta, setDatadataMalariaLideta] = useState([]);
 
 useEffect(() => {
   getAllMalariaLideta();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaLideta = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaLideta?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LidetaData ");
       setDatadataMalariaLideta(data.data);
     
     });
 };
 ///////////////////////////Yeka front///////////////////////////single record//////////////
 const [dataMalariaYeka, setDatadataMalariaYeka] = useState([]);
 
 useEffect(() => {
   getAllMalariaYeka();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaYeka = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaYeka?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "YekaData ");
       setDatadataMalariaYeka(data.data);
     
     });
 };
 
 ////////////////////////////////////////////////////////////single/////////////////////////////////
 ///////////////////////////Female front///////////////////////////single record//////////////
 const [dataMalariaFemale, setDatadataMalariaFemale] = useState([]);
 
 useEffect(() => {
   getAllMalariaFemale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaFemale = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaFemale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataMalariaFemale(data.data);
     
     });
 };
 ///////////////////////////Male front///////////////////////////single record//////////////
 const [dataMalariaMale, setDatadataMalariaMale] = useState([]);
 
 useEffect(() => {
   getAllMalariaMale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllMalariaMale = () => {
   fetch(`http://localhost:3000/Gete-SingleMalariaMale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataMalariaMale(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataPai = [
     
     { name: 'Female', Number_of_patient: parseInt(`${dataMalariaFemale}`)},
     { name: 'Male', Number_of_patient: parseInt(`${dataMalariaMale}`)},
    
   ];
   /////////////////////////////////////////////////////
   ///////////////////////////front Malaria///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataMalariaWeek1, setDatadataMalariaWeek1] = useState([]);
useEffect(() => {
  getAllMalariaWeek1();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataMalariaWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataMalariaWeek2, setDatadataMalariaWeek2] = useState([]);

useEffect(() => {
  getAllMalariaWeek2();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataMalariaWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataMalariaWeek3, setDatadataMalariaWeek3] = useState([]);

useEffect(() => {
  getAllMalariaWeek3();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataMalariaWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataMalariaWeek4, setDatadataMalariaWeek4] = useState([]);

useEffect(() => {
  getAllMalariaWeek4();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataMalariaWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataMalariaWeek5, setDatadataMalariaWeek5] = useState([]);

useEffect(() => {
  getAllMalariaWeek5();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataMalariaWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataMalariaWeek6, setDatadataMalariaWeek6] = useState([]);

useEffect(() => {
  getAllMalariaWeek6();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataMalariaWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataMalariaWeek7, setDatadataMalariaWeek7] = useState([]);

useEffect(() => {
  getAllMalariaWeek7();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataMalariaWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataMalariaWeek8, setDatadataMalariaWeek8] = useState([]);

useEffect(() => {
  getAllMalariaWeek8();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataMalariaWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataMalariaWeek9, setDatadataMalariaWeek9] = useState([]);

useEffect(() => {
  getAllMalariaWeek9();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataMalariaWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataMalariaWeek10, setDatadataMalariaWeek10] = useState([]);

useEffect(() => {
  getAllMalariaWeek10();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataMalariaWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataMalariaWeek11, setDatadataMalariaWeek11] = useState([]);

useEffect(() => {
  getAllMalariaWeek11();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataMalariaWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataMalariaWeek12, setDatadataMalariaWeek12] = useState([]);

useEffect(() => {
  getAllMalariaWeek12();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataMalariaWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataMalariaWeek13, setDatadataMalariaWeek13] = useState([]);

useEffect(() => {
  getAllMalariaWeek13();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataMalariaWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataMalariaWeek14, setDatadataMalariaWeek14] = useState([]);

useEffect(() => {
  getAllMalariaWeek14();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataMalariaWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataMalariaWeek15, setDatadataMalariaWeek15] = useState([]);


useEffect(() => {
  getAllMalariaWeek15();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataMalariaWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataMalariaWeek16, setDatadataMalariaWeek16] = useState([]);

useEffect(() => {
  getAllMalariaWeek16();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataMalariaWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataMalariaWeek17, setDatadataMalariaWeek17] = useState([]);

useEffect(() => {
  getAllMalariaWeek17();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataMalariaWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataMalariaWeek18, setDatadataMalariaWeek18] = useState([]);

useEffect(() => {
  getAllMalariaWeek18();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataMalariaWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataMalariaWeek19, setDatadataMalariaWeek19] = useState([]);

useEffect(() => {
  getAllMalariaWeek19();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataMalariaWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataMalariaWeek20, setDatadataMalariaWeek20] = useState([]);

useEffect(() => {
  getAllMalariaWeek20();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataMalariaWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataMalariaWeek21, setDatadataMalariaWeek21] = useState([]);

useEffect(() => {
  getAllMalariaWeek21();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataMalariaWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataMalariaWeek22, setDatadataMalariaWeek22] = useState([]);

useEffect(() => {
  getAllMalariaWeek22();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataMalariaWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataMalariaWeek23, setDatadataMalariaWeek23] = useState([]);

useEffect(() => {
  getAllMalariaWeek23();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataMalariaWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataMalariaWeek24, setDatadataMalariaWeek24] = useState([]);

useEffect(() => {
  getAllMalariaWeek24();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataMalariaWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataMalariaWeek25, setDatadataMalariaWeek25] = useState([]);

useEffect(() => {
  getAllMalariaWeek25();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataMalariaWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataMalariaWeek26, setDatadataMalariaWeek26] = useState([]);

useEffect(() => {
  getAllMalariaWeek26();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataMalariaWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataMalariaWeek27, setDatadataMalariaWeek27] = useState([]);

useEffect(() => {
  getAllMalariaWeek27();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataMalariaWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataMalariaWeek28, setDatadataMalariaWeek28] = useState([]);

useEffect(() => {
  getAllMalariaWeek28();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataMalariaWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataMalariaWeek29, setDatadataMalariaWeek29] = useState([]);
useEffect(() => {
  getAllMalariaWeek29();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataMalariaWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataMalariaWeek30, setDatadataMalariaWeek30] = useState([]);

useEffect(() => {
  getAllMalariaWeek30();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataMalariaWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataMalariaWeek31, setDatadataMalariaWeek31] = useState([]);

useEffect(() => {
  getAllMalariaWeek31();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataMalariaWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataMalariaWeek32, setDatadataMalariaWeek32] = useState([]);

useEffect(() => {
  getAllMalariaWeek32();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataMalariaWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataMalariaWeek33, setDatadataMalariaWeek33] = useState([]);

useEffect(() => {
  getAllMalariaWeek33();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataMalariaWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataMalariaWeek34, setDatadataMalariaWeek34] = useState([]);

useEffect(() => {
  getAllMalariaWeek34();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataMalariaWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataMalariaWeek35, setDatadataMalariaWeek35] = useState([]);

useEffect(() => {
  getAllMalariaWeek35();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataMalariaWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataMalariaWeek36, setDatadataMalariaWeek36] = useState([]);

useEffect(() => {
  getAllMalariaWeek36();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataMalariaWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataMalariaWeek37, setDatadataMalariaWeek37] = useState([]);

useEffect(() => {
  getAllMalariaWeek37();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataMalariaWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataMalariaWeek38, setDatadataMalariaWeek38] = useState([]);

useEffect(() => {
  getAllMalariaWeek38();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataMalariaWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataMalariaWeek39, setDatadataMalariaWeek39] = useState([]);

useEffect(() => {
  getAllMalariaWeek39();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataMalariaWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataMalariaWeek40, setDatadataMalariaWeek40] = useState([]);

useEffect(() => {
  getAllMalariaWeek40();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataMalariaWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataMalariaWeek41, setDatadataMalariaWeek41] = useState([]);

useEffect(() => {
  getAllMalariaWeek41();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataMalariaWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataMalariaWeek42, setDatadataMalariaWeek42] = useState([]);

useEffect(() => {
  getAllMalariaWeek42();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataMalariaWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataMalariaWeek43, setDatadataMalariaWeek43] = useState([]);


useEffect(() => {
  getAllMalariaWeek43();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataMalariaWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataMalariaWeek44, setDatadataMalariaWeek44] = useState([]);

useEffect(() => {
  getAllMalariaWeek44();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataMalariaWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataMalariaWeek45, setDatadataMalariaWeek45] = useState([]);

useEffect(() => {
  getAllMalariaWeek45();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataMalariaWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataMalariaWeek46, setDatadataMalariaWeek46] = useState([]);

useEffect(() => {
  getAllMalariaWeek46();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataMalariaWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataMalariaWeek47, setDatadataMalariaWeek47] = useState([]);

useEffect(() => {
  getAllMalariaWeek47();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataMalariaWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataMalariaWeek48, setDatadataMalariaWeek48] = useState([]);

useEffect(() => {
  getAllMalariaWeek48();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataMalariaWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataMalariaWeek49, setDatadataMalariaWeek49] = useState([]);

useEffect(() => {
  getAllMalariaWeek49();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataMalariaWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataMalariaWeek50, setDatadataMalariaWeek50] = useState([]);

useEffect(() => {
  getAllMalariaWeek50();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataMalariaWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataMalariaWeek51, setDatadataMalariaWeek51] = useState([]);

useEffect(() => {
  getAllMalariaWeek51();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataMalariaWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataMalariaWeek52, setDatadataMalariaWeek52] = useState([]);

useEffect(() => {
  getAllMalariaWeek52();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataMalariaWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLineMalaria = [{ Week: 'Week 1', Number_of_patient: `${dataMalariaWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataMalariaWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataMalariaWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataMalariaWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataMalariaWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataMalariaWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataMalariaWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataMalariaWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataMalariaWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataMalariaWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataMalariaWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataMalariaWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataMalariaWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataMalariaWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataMalariaWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataMalariaWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataMalariaWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataMalariaWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataMalariaWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataMalariaWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataMalariaWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataMalariaWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataMalariaWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataMalariaWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataMalariaWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataMalariaWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataMalariaWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataMalariaWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataMalariaWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataMalariaWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataMalariaWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataMalariaWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataMalariaWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataMalariaWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataMalariaWeek35}` },{Week:'Week 36',Number_of_patient: `${dataMalariaWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataMalariaWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataMalariaWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataMalariaWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataMalariaWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataMalariaWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataMalariaWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataMalariaWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataMalariaWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataMalariaWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataMalariaWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataMalariaWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataMalariaWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataMalariaWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataMalariaWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataMalariaWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataMalariaWeek52}`, },
                    ];

  ///////////////////////////////////////////////////

  ///////////////////////////////////////////////income///////////////////
///////////////////////////Zero front///////////////////////////single record//////////////
const [dataMalariaZero, setDatadataMalariaZero] = useState([]);

useEffect(() => {
  getAllMalariaZero();
},[searchQuery]);

//fetching all cholera
const getAllMalariaZero = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaZero?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "ZeroData ");
      setDatadataMalariaZero(data.data);
    
    });
};
///////////////////////////Ten front///////////////////////////single record//////////////
const [dataMalariaTen, setDatadataMalariaTen] = useState([]);

useEffect(() => {
  getAllMalariaTen();
},[searchQuery]);

//fetching all cholera
const getAllMalariaTen = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaTen?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "TenData ");
      setDatadataMalariaTen(data.data);
    
    });
};
///////////////////////////Fiften front///////////////////////////single record//////////////
const [dataMalariaFiften, setDatadataMalariaFiften] = useState([]);

useEffect(() => {
  getAllMalariaFiften();
},[searchQuery]);

//fetching all cholera
const getAllMalariaFiften = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaFiften?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "FiftenData ");
      setDatadataMalariaFiften(data.data);
    
    });
};

///////////////////////////Tewenten front///////////////////////////single record//////////////
const [dataMalariaTewenten, setDatadataMalariaTewenten] = useState([]);

useEffect(() => {
  getAllMalariaTewenten();
},[searchQuery]);

//fetching all cholera
const getAllMalariaTewenten= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaTewenten?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "TewentenData ");
      setDatadataMalariaTewenten(data.data);
    
    });
};

///////////////////////////TewenteFive  front///////////////////////////single record//////////////
const [dataMalariaTewenteFive, setDatadataMalariaTewenteFive] = useState([]);

useEffect(() => {
  getAllMalariaTewenteFive();
},[searchQuery]);

//fetching all cholera
const getAllMalariaTewenteFive= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaTewenteFive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "TewenteFiveData ");
      setDatadataMalariaTewenteFive(data.data);
    
    });
};

///////////////////////////Therten front///////////////////////////single record//////////////
const [dataMalariaTherten, setDatadataMalariaTherten] = useState([]);

useEffect(() => {
  getAllMalariaTherten();
},[searchQuery]);

//fetching all cholera
const getAllMalariaTherten = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaTherten?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "ThertenData ");
      setDatadataMalariaTherten(data.data);
    
    });
};

///////////////////////////TherteFive front///////////////////////////single record//////////////
const [dataMalariaTherteFive, setDatadataMalariaTherteFive] = useState([]);

useEffect(() => {
  getAllMalariaTherteFive();
},[searchQuery]);

//fetching all cholera
const getAllMalariaTherteFive = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaTherteFive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "TherteFiveData ");
      setDatadataMalariaTherteFive(data.data);
    
    });
};

const dataincome = [
    
  { name: '0-600', Number_of_patient: `${dataMalariaZero}`},
  { name: '601-1650', Number_of_patient: `${dataMalariaTen}`},
  { name: '1,651-3,200', Number_of_patient: `${dataMalariaFiften}`},
  { name: '3,201-5,250', Number_of_patient: `${dataMalariaTewenten}`},
  { name: '5,251-7,800', Number_of_patient: `${dataMalariaTewenteFive}`},
  { name: '7,801-10,900', Number_of_patient: `${dataMalariaTherten}`},
  { name: 'Over 10,900', Number_of_patient: `${dataMalariaTherteFive}`},
];
  ////////////////////////////////////////end////////////////////////////
  ///////////////////////////////////////////////Marital status///////////////////
///////////////////////////NotMarried front///////////////////////////single record//////////////
const [dataMalariaNotMarried, setDatadataMalariaNotMarried] = useState([]);

useEffect(() => {
  getAllMalariaNotMarried();
},[searchQuery]);

//fetching all cholera
const getAllMalariaNotMarried = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaNotMarried?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "NotMarriedData ");
      setDatadataMalariaNotMarried(data.data);
    
    });
};
///////////////////////////Married front///////////////////////////single record//////////////
const [dataMalariaMarried, setDatadataMalariaMarried] = useState([]);

useEffect(() => {
  getAllMalariaMarried();
},[searchQuery]);

//fetching all cholera
const getAllMalariaMarried = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaMarried?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "MarriedData ");
      setDatadataMalariaMarried(data.data);
    
    });
};
///////////////////////////Divorced front///////////////////////////single record//////////////
const [dataMalariaDivorced, setDatadataMalariaDivorced] = useState([]);

useEffect(() => {
  getAllMalariaDivorced();
},[searchQuery]);

//fetching all cholera
const getAllMalariaDivorced = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaDivorced?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "DivorcedData ");
      setDatadataMalariaDivorced(data.data);
    
    });
};

///////////////////////////Widowed front///////////////////////////single record//////////////
const [dataMalariaWidowed, setDatadataMalariaWidowed] = useState([]);

useEffect(() => {
  getAllMalariaWidowed();
},[searchQuery]);

//fetching all cholera
const getAllMalariaWidowed= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaWidowed?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "WidowedData ");
      setDatadataMalariaWidowed(data.data);
    
    });
};

///////////////////////////Underage   front///////////////////////////single record//////////////
const [dataMalariaUnderage , setDatadataMalariaUnderage ] = useState([]);

useEffect(() => {
  getAllMalariaUnderage ();
},[searchQuery]);

//fetching all cholera
const getAllMalariaUnderage = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaUnderage?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Underage Data ");
      setDatadataMalariaUnderage (data.data);
    
    });
};



const datainMaritalS = [
    
  { name: 'Not married', Number_of_patient: parseInt(`${dataMalariaNotMarried}`)},
  { name: 'Married', Number_of_patient:  parseInt(`${dataMalariaMarried}`)},
  { name: 'Divorced', Number_of_patient:   parseInt(`${dataMalariaDivorced}`)},
  { name: 'Widowed', Number_of_patient:   parseInt(`${dataMalariaWidowed}`)},
  { name: 'NA (Underage Children)', Number_of_patient:   parseInt(`${dataMalariaUnderage}`)},
];
  ////////////////////////////////////////end////////////////////////////
  ///////////////////////Age Group///LessFive front///////////////////////////single record//////////////
const [dataMalariaLessFive, setDatadataMalariaLessFive] = useState([]);

useEffect(() => {
  getAllMalariaLessFive();
},[searchQuery]);

//fetching all cholera
const getAllMalariaLessFive = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaLessFive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LessFiveData ");
      setDatadataMalariaLessFive(data.data);
    
    });
};
///////////////////////////Betweb5To14 front///////////////////////////single record//////////////
const [dataMalariaBetweb5To14, setDatadataMalariaBetweb5To14] = useState([]);

useEffect(() => {
  getAllMalariaBetweb5To14();
},[searchQuery]);

//fetching all cholera
const getAllMalariaBetweb5To14 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaBetweb5To14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb5To14Data ");
      setDatadataMalariaBetweb5To14(data.data);
    
    });
};
///////////////////////////Betweb15To29 front///////////////////////////single record//////////////
const [dataMalariaBetweb15To29, setDatadataMalariaBetweb15To29] = useState([]);

useEffect(() => {
  getAllMalariaBetweb15To29();
},[searchQuery]);

//fetching all cholera
const getAllMalariaBetweb15To29 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaBetweb15To29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb15To29Data ");
      setDatadataMalariaBetweb15To29(data.data);
    
    });
};

///////////////////////////Betweb30To49 front///////////////////////////single record//////////////
const [dataMalariaBetweb30To49, setDatadataMalariaBetweb30To49] = useState([]);

useEffect(() => {
  getAllMalariaBetweb30To49();
},[searchQuery]);

//fetching all cholera
const getAllMalariaBetweb30To49= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaBetweb30To49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb30To49Data ");
      setDatadataMalariaBetweb30To49(data.data);
    
    });
};

///////////////////////////Betweb50To59  front///////////////////////////single record//////////////
const [dataMalariaBetweb50To59, setDatadataMalariaBetweb50To59] = useState([]);

useEffect(() => {
  getAllMalariaBetweb50To59();
},[searchQuery]);

//fetching all cholera
const getAllMalariaBetweb50To59= () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaBetweb50To59?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb50To59Data ");
      setDatadataMalariaBetweb50To59(data.data);
    
    });
};

///////////////////////////Betweb60To69 front///////////////////////////single record//////////////
const [dataMalariaBetweb60To69, setDatadataMalariaBetweb60To69] = useState([]);

useEffect(() => {
  getAllMalariaBetweb60To69();
},[searchQuery]);

//fetching all cholera
const getAllMalariaBetweb60To69 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaBetweb60To69?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb60To69Data ");
      setDatadataMalariaBetweb60To69(data.data);
    
    });
};

///////////////////////////Above70 front///////////////////////////single record//////////////
const [dataMalariaAbove70, setDatadataMalariaAbove70] = useState([]);

useEffect(() => {
  getAllMalariaAbove70();
},[searchQuery]);

//fetching all cholera
const getAllMalariaAbove70 = () => {
  fetch(`http://localhost:3000/Gete-SingleMalariaAbove70?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Above70Data ");
      setDatadataMalariaAbove70(data.data);
    
    });
};


  const datapi = [
    {
      name: '<5',
      Age: `${dataMalariaLessFive}`,
    
      fill: '#8884d8',
    },
    {
      name: '5-14',
      Age: `${dataMalariaBetweb5To14}`,
     
      fill: '#83a6ed',
    },
    {
      name: '15-29',
      Age: `${dataMalariaBetweb15To29}`,
      
      fill: '#8dd1e1',
    },
    {
      name: '30-49',
      Age: `${dataMalariaBetweb30To49}`,
      
      fill: '#82ca9d',
    },
    {
      name: '50-59',
      Age: `${dataMalariaBetweb50To59}`,
     
      fill: '#a4de6c',
    },
    {
      name: '60-69',
      Age: `${dataMalariaBetweb60To69}`,
      
      fill: '#d0ed57',
    },
    {
      name: '70+',
      Age: `${dataMalariaAbove70}`,
      
      fill: '#ffc658',
    },
  ];
  
    /////////////////////////Outcome//////////////////////////
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
     Number_of_patient: `${dataMalariaAkaki}`,
   },
   {
     name: 'Addis Ketema',
     Number_of_patient: `${dataMalariaAddisKetema}`,
   },
   {
     name: 'Arada',
     Number_of_patient: `${dataMalariaArada}`,
   },
   {
     name: 'Bole',
     Number_of_patient: `${dataMalariaBole}`,
   },
   {
     name: 'Gulele',
     Number_of_patient: `${dataMalariaGulele}`,
   },
   {
     name: 'Kirkos',
     Number_of_patient: `${dataMalariaKirkos}`,
   },
   {
     name: 'kolife',
     Number_of_patient: `${dataMalariakolife}`,
   },
   {
     name: 'Nifas Silk Lafto',
     Number_of_patient: `${dataMalariaNifas_Silk_Lafto}`,
   },
   {
     name: 'Lemi Kura',
     Number_of_patient: `${dataMalariaLemi_Kura}`,
   },
   
   {
     name: 'Lideta',
     Number_of_patient: `${dataMalariaLideta}`,
   },
   {
     name: 'Yeka',
     Number_of_patient: `${dataMalariaYeka}`,
   },
 ];
 
 const getIntroOfPage = (label) => {
   
   if (label === 'Akaki') {
     return `The Number of patient in Akaki is ${dataMalariaAkaki}`;
   }
   if (label === 'Addis Ketema') {
     return `The Number of patient in Addis Ketema is ${dataMalariaAddisKetema}`;
   }
   if (label === 'Arada') {
     return `The Number of patient in Arada is ${dataMalariaArada}`;
   }
   if (label === 'Bole') {
     return `The Number of patient in Bole is ${dataMalariaBole}`;
   }
   if (label === 'Gulele') {
     return `The Number of patient in Gulele is ${dataMalariaGulele}`;
   }
   if (label === 'Kirkos') {
     return `The Number of patient in Kirkos is ${dataMalariaKirkos}`;
   }
   if (label === 'kolife') {
     return `The Number of patient in kolife is ${dataMalariakolife}`;
   }
   if (label === 'Nifas Silk Lafto') {
     return `The Number of patient in Nifas Silk Lafto is ${dataMalariaNifas_Silk_Lafto}`;
   }
   if (label === 'Lemi Kura') {
     return `The Number of patient in Lemi Kura is ${dataMalariaLemi_Kura}`;
   }
   if (label === 'Lideta') {
     return `The Number of patient in Lideta is ${dataMalariaLideta}`;
   }
   if (label === 'Yeka') {
     return `The Number of patient in Yeka is ${dataMalariaYeka}`;
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

const style = {
  top: '50%',
  right: -11,
  transform: 'translate(0, -75%)',
  lineHeight: '24px',
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
  axios.get("http://localhost:3000/GeteMalaria")
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
  const MalariaINELIST = useRef(null);
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
        <th className='p-3'><li onClick={() => scrollToSection(MalariaINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        Malaria Outbreak Line List
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

     



    
    <div className="border border-black " ref={MalariaINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT Malaria Outbreak Line List </h4>
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
                <th><h6>Patient MRN</h6></th>
                <th><h6>Name of the patient</h6></th>
                <th><h6>Age</h6> </th>
                <th><h6>Sex</h6></th>
                <th> <h6>Sub city </h6></th>
                <th><h6>Occupation </h6></th>
                <th><h6>other, Specify Occupation</h6></th>
                <th> <h6>Marital status</h6></th>
                <th><h6>Family size</h6></th>
                <th> <h6>Family average monthly income? (ETB)</h6></th>
                <th><h6>Patient Residency Region</h6></th>
                <th><h6>Residency Region</h6></th>
                <th><h6>Patient Residency Sub City</h6></th>
                <th><h6>Deceased Residency Woreda</h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th><h6>Phone number</h6></th>
                <th><h6>Reporting Health Facility Type</h6></th>
                <th><h6>other, Specify Facility</h6> </th>
                <th> <h6>Reporting Health Facility Name </h6></th>
                <th><h6>name of health facility</h6></th>
                <th><h6>Region</h6></th>
                <th> <h6>Health Facility Region</h6></th>
                <th><h6>Name of Sub City </h6></th>
                <th> <h6>Health Facility Sub-City</h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th><h6>Health Facility Woreda</h6></th>
                <th><h6>Date of data collection</h6></th>
                <th><h6> Latitude  </h6></th>
                <th><h6>Longitude   </h6></th>
                <th> <h6>Clinical features  </h6></th>
                <th><h6>other sign and symptoms </h6></th>
                <th> <h6>Date of onset of the symptoms </h6></th>
                <th><h6>Date of Hospital / HF visit</h6></th>
                <th><h6>Did the patient hospitalized / admitted</h6></th>
                <th><h6>Did laboratory sample taken for the patient </h6></th>
                <th><h6> Date the sample taken </h6></th>
                <th><h6>Test type (RDT / Microscopic)   </h6></th>

                <th><h6>What is the result</h6></th>
                <th><h6>Does the patient have history of travel to malarias area</h6></th>
                <th><h6>specify the place</h6> </th>
                <th> <h6>did he/she take malaria prophylaxis</h6></th>
                <th><h6>Did this patient has history of previous malaria infection</h6></th>
                <th><h6>when did he/she is diagnosed to have malaria infection</h6></th>
                <th> <h6>comorbidity</h6></th>
                <th><h6>specify </h6></th>
                <th> <h6>complications</h6></th>
                <th><h6>develop complications</h6></th>
                <th><h6>any member of the household suffering from malaria currently</h6></th>
                <th><h6>Do you have/use bed nets</h6></th>
                <th><h6> Why?</h6></th>
                <th><h6>Are there any malaria risk factors around your residency area </h6></th>
                <th> <h6>pregnant</h6></th>
                <th><h6>final out come </h6></th>
                <th> <h6>outbreak or routine </h6></th>
                <th><h6>Name of officer</h6></th>
                <th><h6>Phone number of officer</h6></th>
                <th><h6>EPI_Week </h6></th>
                <th><h6> photo </h6></th>
                

             
              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.MMRN}</h6></th>
                  <th ><h6>{filer.MName}</h6></th>
                  <th ><h6>{filer.MAge}</h6></th>
                  <th><h6>{filer.MSex}</h6></th>
                  <th><h6>{filer.MPOccupation}</h6></th>
                  <th><h6>{filer.TMPOccupation}</h6></th>
                  <th ><h6>{filer.MMarital}</h6></th>
                  <th ><h6>{filer.MFsize}</h6></th>
                  <th><h6>{filer.MIncome}</h6></th>
                  <th><h6>{filer.MPRegion}</h6></th>
                  <th><h6>{filer.MTRegion}</h6></th>
                  <th ><h6>{filer.MPSubCity}</h6></th>
                  <th><h6>{filer.MPWoreda}</h6></th>
                  <th><h6>{filer.MpTWoreda}</h6></th>
                  <th><h6>{filer.MResidency}</h6></th>
                  <th><h6>{filer.MPhone}</h6></th>
                  <th ><h6>{filer.MFacilityT}</h6></th>
                  <th ><h6>{filer.MTFacilityT}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.HFTName}</h6></th>
                  <th><h6>{filer.HRegion}</h6></th>
                  <th ><h6>{filer.HTRegion}</h6></th>
                  <th ><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.THSubCity}</h6></th>
                  <th><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HFTworeda}</h6></th>
                  <th ><h6>{filer.MDCollection}</h6></th>
                  <th><h6>{filer.MLatitude}</h6></th>
                  <th><h6>{filer.MLongitude}</h6></th>
                  <th><h6>{filer.MCfeatures}</h6></th>
                  <th ><h6>{filer.TMCfeatures}</h6></th>
                  <th ><h6>{filer.MOnsetDate}</h6></th>
                  <th><h6>{filer.MDHospital}</h6></th>
                  <th><h6>{filer.MAdmitted}</h6></th>
                  <th><h6>{filer.MSampleT}</h6></th>
                  <th ><h6>{filer.MDSampleT}</h6></th>
                  <th><h6>{filer.MType}</h6></th>
                
                  <th><h6>{filer.MResult}</h6></th>
                  <th ><h6>{filer.Mhistory}</h6></th>
                  <th ><h6>{filer.TMhistory}</h6></th>
                  <th><h6>{filer.MProphylaxis}</h6></th>
                  <th><h6>{filer.MPinfection}</h6></th>
                  <th><h6>{filer.TMPinfection}</h6></th>
                  <th ><h6>{filer.MComorbidity}</h6></th>
                  <th ><h6>{filer.TMComorbidity}</h6></th>
                  <th><h6>{filer.MComplications}</h6></th>
                  <th><h6>{filer.TMComplications}</h6></th>
                  <th><h6>{filer.Msuffering}</h6></th>
                  <th ><h6>{filer.MBednets}</h6></th>
                  <th><h6>{filer.TMBednets}</h6></th>
                  <th><h6>{filer.MRiskFactors}</h6></th>
                  <th><h6>{filer.TMRiskFactors}</h6></th>
                  <th ><h6>{filer.MPregnant}</h6></th>
                  <th ><h6>{filer.MOutCome}</h6></th>
                  <th><h6>{filer.MOutbreak}</h6></th>
                  <th><h6>{filer.MFCName}</h6></th>
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
        <div ref={conponentPDF} style={{width:'100%'}}>
    <div className='w-100 h-100 row bg-white rounded p-0  border border-danger mb-5 Scrol-Table ' ref={Chart}>
    <table className='Scrol-Table table light padding table-responsive'>
    <tr className='border border-secondary'>  
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MALARIA OUTBREAK TREND </p>
      <LineChart
          width={800}
          height={300}
          data={dataLineMalaria}
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MALARIA OUTBREAK DISTRIBUTION BY INCOME</p>
        <ComposedChart
          layout="vertical"
          width={800}
          height={400}
          data={dataincome}
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
          <Line dataKey="Number_of_patient" stroke="#ff7300" />
        </ComposedChart>
      
    </th>
    <th>
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MALARIA OUTBREAK DISTRIBUTION BY AGE GROUP</p>
        <RadialBarChart cx="50%" cy="50%" innerRadius="10%" outerRadius="80%" barSize={10} data={datapi} width={800} height={500}>
          <RadialBar
            minAngle={15}
            label={{ position: 'insideStart', fill: '#fff' }}
            background
            clockWise
            dataKey="Age"
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
        </RadialBarChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MALARIA OUTBREAK DISTRIBUTION BY GENDER</p>
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MALARIA OUTBREAK DISTRIBUTION BY MARITAL STATUS</p>
        <PieChart width={800} height={500}>
          <Pie
            data={datainMaritalS}
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">MALARIA OUTBREAK DISTRIBUTION IN EACH SUB CITIES</p>
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

export default Malaria_Report

