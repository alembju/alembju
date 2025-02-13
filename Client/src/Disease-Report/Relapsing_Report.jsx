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
function Relapsing_Report() {
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
////////////////////////////////////////////////////////front end/////////////////////////////////////
 ///////////////////////////front///////////////////////////Akaki single record//////////////Gete-SingleCholeraAddisKetema
 const [dataRelapsingAkaki, setDatadataRelapsingAkaki] = useState([]);
 const [searchQuery,setSearchQuery]=useState("")
 
 useEffect(() => {
   getAllRelapsingAkaki();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingAkaki = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingAkaki?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRelapsingAkaki(data.data);
     
     });
 };
 ///////////////////////////AddisKetema front///////////////////////////single record//////////////
 const [dataRelapsingAddisKetema, setDatadataRelapsingAddisKetema] = useState([]);
 
 useEffect(() => {
   getAllRelapsingAddisKetema();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingAddisKetema = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingaAddisKetema?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AddisKetemaData ");
       setDatadataRelapsingAddisKetema(data.data);
     
     });
 };
 ///////////////////////////Arada front///////////////////////////single record//////////////
 const [dataRelapsingArada, setDatadataRelapsingArada] = useState([]);
 
 useEffect(() => {
   getAllRelapsingArada();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingArada = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingArada?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "AradaData ");
       setDatadataRelapsingArada(data.data);
     
     });
 };
 ///////////////////////////Bole front///////////////////////////single record//////////////
 const [dataRelapsingBole, setDatadataRelapsingBole] = useState([]);
 
 useEffect(() => {
   getAllRelapsingBole();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingBole = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingBole?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "BoleData ");
       setDatadataRelapsingBole(data.data);
     
     });
 };
 ///////////////////////////Gulele front///////////////////////////single record//////////////
 const [dataRelapsingGulele, setDatadataRelapsingGulele] = useState([]);
 
 useEffect(() => {
   getAllRelapsingGulele();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingGulele = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingGulele?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "GuleleData ");
       setDatadataRelapsingGulele(data.data);
     
     });
 };
 
 ///////////////////////////Kirkos front///////////////////////////single record//////////////
 const [dataRelapsingKirkos, setDatadataRelapsingKirkos] = useState([]);
 
 useEffect(() => {
   getAllRelapsingKirkos();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingKirkos= () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingKirkos?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "KirkosData ");
       setDatadataRelapsingKirkos(data.data);
     
     });
 };
 
 ///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
 const [dataRelapsingkolife, setDatadataRelapsingkolife] = useState([]);
 
 useEffect(() => {
   getAllRelapsingkolife();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingkolife= () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingkolife?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "kolifeData ");
       setDatadataRelapsingkolife(data.data);
     
     });
 };
 
 ///////////////////////////Nifas_Silk_Lafto front///////////////////////////single record//////////////
 const [dataRelapsingNifas_Silk_Lafto, setDatadataRelapsingNifas_Silk_Lafto] = useState([]);
 
 useEffect(() => {
   getAllRelapsingNifas_Silk_Lafto();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingNifas_Silk_Lafto = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingNifas_Silk_Lafto?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Nifas_Silk_LaftoData ");
       setDatadataRelapsingNifas_Silk_Lafto(data.data);
     
     });
 };
 
 ///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
 const [dataRelapsingLemi_Kura, setDatadataRelapsingLemi_Kura] = useState([]);
 
 useEffect(() => {
   getAllRelapsingLemi_Kura();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingLemi_Kura = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingLemi_Kura?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "Lemi_KuraData ");
       setDatadataRelapsingLemi_Kura(data.data);
     
     });
 };
 
 ///////////////////////////Lideta front///////////////////////////single record//////////////
 const [dataRelapsingLideta, setDatadataRelapsingLideta] = useState([]);
 
 useEffect(() => {
   getAllRelapsingLideta();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingLideta = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingLideta?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LidetaData ");
       setDatadataRelapsingLideta(data.data);
     
     });
 };
 ///////////////////////////Yeka front///////////////////////////single record//////////////
 const [dataRelapsingYeka, setDatadataRelapsingYeka] = useState([]);
 
 useEffect(() => {
   getAllRelapsingYeka();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingYeka = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingYeka?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "YekaData ");
       setDatadataRelapsingYeka(data.data);
     
     });
 };
 
 ////////////////////////////////////////////////////////////single/////////////////////////////////
 ///////////////////////////Female front///////////////////////////single record//////////////
 const [dataRelapsingFemale, setDatadataRelapsingFemale] = useState([]);
 
 useEffect(() => {
   getAllRelapsingFemale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingFemale = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingFemale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRelapsingFemale(data.data);
     
     });
 };
 ///////////////////////////Male front///////////////////////////single record//////////////
 const [dataRelapsingMale, setDatadataRelapsingMale] = useState([]);
 
 useEffect(() => {
   getAllRelapsingMale();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingMale = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingMale?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRelapsingMale(data.data);
     
     });
 };
   //////////////selection filter///////////////
   const dataPai = [
     
     { name: 'Female', Number_of_patient: parseInt(`${dataRelapsingFemale}`)},
     { name: 'Male', Number_of_patient: parseInt(`${dataRelapsingMale}`)},
    
   ];
   /////////////////////////////////////////////////////
  ///////////////////////////front Relapsing///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataRelapsingWeek1, setDatadataRelapsingWeek1] = useState([]);
useEffect(() => {
  getAllRelapsingWeek1();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataRelapsingWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataRelapsingWeek2, setDatadataRelapsingWeek2] = useState([]);

useEffect(() => {
  getAllRelapsingWeek2();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataRelapsingWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataRelapsingWeek3, setDatadataRelapsingWeek3] = useState([]);

useEffect(() => {
  getAllRelapsingWeek3();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataRelapsingWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataRelapsingWeek4, setDatadataRelapsingWeek4] = useState([]);

useEffect(() => {
  getAllRelapsingWeek4();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataRelapsingWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataRelapsingWeek5, setDatadataRelapsingWeek5] = useState([]);

useEffect(() => {
  getAllRelapsingWeek5();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataRelapsingWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataRelapsingWeek6, setDatadataRelapsingWeek6] = useState([]);

useEffect(() => {
  getAllRelapsingWeek6();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataRelapsingWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataRelapsingWeek7, setDatadataRelapsingWeek7] = useState([]);

useEffect(() => {
  getAllRelapsingWeek7();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataRelapsingWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataRelapsingWeek8, setDatadataRelapsingWeek8] = useState([]);

useEffect(() => {
  getAllRelapsingWeek8();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataRelapsingWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataRelapsingWeek9, setDatadataRelapsingWeek9] = useState([]);

useEffect(() => {
  getAllRelapsingWeek9();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataRelapsingWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataRelapsingWeek10, setDatadataRelapsingWeek10] = useState([]);

useEffect(() => {
  getAllRelapsingWeek10();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataRelapsingWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataRelapsingWeek11, setDatadataRelapsingWeek11] = useState([]);

useEffect(() => {
  getAllRelapsingWeek11();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataRelapsingWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataRelapsingWeek12, setDatadataRelapsingWeek12] = useState([]);

useEffect(() => {
  getAllRelapsingWeek12();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataRelapsingWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataRelapsingWeek13, setDatadataRelapsingWeek13] = useState([]);

useEffect(() => {
  getAllRelapsingWeek13();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataRelapsingWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataRelapsingWeek14, setDatadataRelapsingWeek14] = useState([]);

useEffect(() => {
  getAllRelapsingWeek14();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataRelapsingWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataRelapsingWeek15, setDatadataRelapsingWeek15] = useState([]);


useEffect(() => {
  getAllRelapsingWeek15();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataRelapsingWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataRelapsingWeek16, setDatadataRelapsingWeek16] = useState([]);

useEffect(() => {
  getAllRelapsingWeek16();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataRelapsingWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataRelapsingWeek17, setDatadataRelapsingWeek17] = useState([]);

useEffect(() => {
  getAllRelapsingWeek17();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataRelapsingWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataRelapsingWeek18, setDatadataRelapsingWeek18] = useState([]);

useEffect(() => {
  getAllRelapsingWeek18();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataRelapsingWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataRelapsingWeek19, setDatadataRelapsingWeek19] = useState([]);

useEffect(() => {
  getAllRelapsingWeek19();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataRelapsingWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataRelapsingWeek20, setDatadataRelapsingWeek20] = useState([]);

useEffect(() => {
  getAllRelapsingWeek20();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataRelapsingWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataRelapsingWeek21, setDatadataRelapsingWeek21] = useState([]);

useEffect(() => {
  getAllRelapsingWeek21();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataRelapsingWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataRelapsingWeek22, setDatadataRelapsingWeek22] = useState([]);

useEffect(() => {
  getAllRelapsingWeek22();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataRelapsingWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataRelapsingWeek23, setDatadataRelapsingWeek23] = useState([]);

useEffect(() => {
  getAllRelapsingWeek23();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataRelapsingWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataRelapsingWeek24, setDatadataRelapsingWeek24] = useState([]);

useEffect(() => {
  getAllRelapsingWeek24();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataRelapsingWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataRelapsingWeek25, setDatadataRelapsingWeek25] = useState([]);

useEffect(() => {
  getAllRelapsingWeek25();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataRelapsingWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataRelapsingWeek26, setDatadataRelapsingWeek26] = useState([]);

useEffect(() => {
  getAllRelapsingWeek26();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataRelapsingWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataRelapsingWeek27, setDatadataRelapsingWeek27] = useState([]);

useEffect(() => {
  getAllRelapsingWeek27();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataRelapsingWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataRelapsingWeek28, setDatadataRelapsingWeek28] = useState([]);

useEffect(() => {
  getAllRelapsingWeek28();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataRelapsingWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataRelapsingWeek29, setDatadataRelapsingWeek29] = useState([]);
useEffect(() => {
  getAllRelapsingWeek29();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataRelapsingWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataRelapsingWeek30, setDatadataRelapsingWeek30] = useState([]);

useEffect(() => {
  getAllRelapsingWeek30();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataRelapsingWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataRelapsingWeek31, setDatadataRelapsingWeek31] = useState([]);

useEffect(() => {
  getAllRelapsingWeek31();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataRelapsingWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataRelapsingWeek32, setDatadataRelapsingWeek32] = useState([]);

useEffect(() => {
  getAllRelapsingWeek32();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataRelapsingWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataRelapsingWeek33, setDatadataRelapsingWeek33] = useState([]);

useEffect(() => {
  getAllRelapsingWeek33();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataRelapsingWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataRelapsingWeek34, setDatadataRelapsingWeek34] = useState([]);

useEffect(() => {
  getAllRelapsingWeek34();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataRelapsingWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataRelapsingWeek35, setDatadataRelapsingWeek35] = useState([]);

useEffect(() => {
  getAllRelapsingWeek35();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataRelapsingWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataRelapsingWeek36, setDatadataRelapsingWeek36] = useState([]);

useEffect(() => {
  getAllRelapsingWeek36();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataRelapsingWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataRelapsingWeek37, setDatadataRelapsingWeek37] = useState([]);

useEffect(() => {
  getAllRelapsingWeek37();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataRelapsingWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataRelapsingWeek38, setDatadataRelapsingWeek38] = useState([]);

useEffect(() => {
  getAllRelapsingWeek38();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataRelapsingWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataRelapsingWeek39, setDatadataRelapsingWeek39] = useState([]);

useEffect(() => {
  getAllRelapsingWeek39();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataRelapsingWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataRelapsingWeek40, setDatadataRelapsingWeek40] = useState([]);

useEffect(() => {
  getAllRelapsingWeek40();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataRelapsingWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataRelapsingWeek41, setDatadataRelapsingWeek41] = useState([]);

useEffect(() => {
  getAllRelapsingWeek41();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataRelapsingWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataRelapsingWeek42, setDatadataRelapsingWeek42] = useState([]);

useEffect(() => {
  getAllRelapsingWeek42();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataRelapsingWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataRelapsingWeek43, setDatadataRelapsingWeek43] = useState([]);


useEffect(() => {
  getAllRelapsingWeek43();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataRelapsingWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataRelapsingWeek44, setDatadataRelapsingWeek44] = useState([]);

useEffect(() => {
  getAllRelapsingWeek44();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataRelapsingWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataRelapsingWeek45, setDatadataRelapsingWeek45] = useState([]);

useEffect(() => {
  getAllRelapsingWeek45();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataRelapsingWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataRelapsingWeek46, setDatadataRelapsingWeek46] = useState([]);

useEffect(() => {
  getAllRelapsingWeek46();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataRelapsingWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataRelapsingWeek47, setDatadataRelapsingWeek47] = useState([]);

useEffect(() => {
  getAllRelapsingWeek47();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataRelapsingWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataRelapsingWeek48, setDatadataRelapsingWeek48] = useState([]);

useEffect(() => {
  getAllRelapsingWeek48();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataRelapsingWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataRelapsingWeek49, setDatadataRelapsingWeek49] = useState([]);

useEffect(() => {
  getAllRelapsingWeek49();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataRelapsingWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataRelapsingWeek50, setDatadataRelapsingWeek50] = useState([]);

useEffect(() => {
  getAllRelapsingWeek50();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataRelapsingWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataRelapsingWeek51, setDatadataRelapsingWeek51] = useState([]);

useEffect(() => {
  getAllRelapsingWeek51();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataRelapsingWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataRelapsingWeek52, setDatadataRelapsingWeek52] = useState([]);

useEffect(() => {
  getAllRelapsingWeek52();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataRelapsingWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataLineRelapsing = [{ Week: 'Week 1', Number_of_patient: `${dataRelapsingWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataRelapsingWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataRelapsingWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataRelapsingWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataRelapsingWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataRelapsingWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataRelapsingWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataRelapsingWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataRelapsingWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataRelapsingWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataRelapsingWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataRelapsingWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataRelapsingWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataRelapsingWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataRelapsingWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataRelapsingWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataRelapsingWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataRelapsingWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataRelapsingWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataRelapsingWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataRelapsingWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataRelapsingWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataRelapsingWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataRelapsingWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataRelapsingWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataRelapsingWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataRelapsingWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataRelapsingWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataRelapsingWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataRelapsingWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataRelapsingWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataRelapsingWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataRelapsingWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataRelapsingWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataRelapsingWeek35}` },{Week:'Week 36',Number_of_patient: `${dataRelapsingWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataRelapsingWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataRelapsingWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataRelapsingWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataRelapsingWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataRelapsingWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataRelapsingWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataRelapsingWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataRelapsingWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataRelapsingWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataRelapsingWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataRelapsingWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataRelapsingWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataRelapsingWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataRelapsingWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataRelapsingWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataRelapsingWeek52}`, },
                    ];

  ///////////////////////////////////////////////////

 ///////////////////////////Overcrowding front///////////////////////////Risk Factors record//////////////
 const [dataRelapsingOvercrowding, setDatadataRelapsingOvercrowding] = useState([]);
 
 useEffect(() => {
   getAllRelapsingOvercrowding();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingOvercrowding = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingOvercrowding?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRelapsingOvercrowding(data.data);
     
     });
 };
 ///////////////////////////PoorPersonalHygiene front///////////////////////////single record//////////////
 const [dataRelapsingPoorPersonalHygiene, setDatadataRelapsingPoorPersonalHygiene] = useState([]);
 
 useEffect(() => {
   getAllRelapsingPoorPersonalHygiene();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingPoorPersonalHygiene = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingPoorPersonalHygiene?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRelapsingPoorPersonalHygiene(data.data);
     
     });
 };
 ///////////////////////////Homeless front///////////////////////////single record//////////////
 const [dataRelapsingHomeless, setDatadataRelapsingHomeless] = useState([]);
 
 useEffect(() => {
   getAllRelapsingHomeless();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingHomeless = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingHomeless?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRelapsingHomeless(data.data);
     
     });
 };
 ///////////////////////////MassSleeping front///////////////////////////single record//////////////
 const [dataRelapsingMassSleeping, setDatadataRelapsingMassSleeping] = useState([]);
 
 useEffect(() => {
   getAllRelapsingMassSleeping();
 },[searchQuery]);
 
 //fetching all cholera
 const getAllRelapsingMassSleeping = () => {
   fetch(`http://localhost:3000/Gete-SingleRelapsingMassSleeping?search=${searchQuery}`, {
     method: "GET",
   })
     .then((res) => res.json())
     .then((data) => {
       console.log(data, "LoginData ");
       setDatadataRelapsingMassSleeping(data.data);
     
     });
 };
  ///////////////////////////Shelter front///////////////////////////single record//////////////
  const [dataRelapsingShelter, setDatadataRelapsingShelter] = useState([]);
 
  useEffect(() => {
    getAllRelapsingShelter();
  },[searchQuery]);
  
  //fetching all cholera
  const getAllRelapsingShelter = () => {
    fetch(`http://localhost:3000/Gete-SingleRelapsingShelter?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "LoginData ");
        setDatadataRelapsingShelter(data.data);
      
      });
  };
  ///////////////////////////Other front///////////////////////////single record//////////////
  const [dataRelapsingOther, setDatadataRelapsingOther] = useState([]);
 
  useEffect(() => {
    getAllRelapsingOther();
  },[searchQuery]);
  
  //fetching all cholera
  const getAllRelapsingOther = () => {
    fetch(`http://localhost:3000/Gete-SingleRelapsingOther?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "LoginData ");
        setDatadataRelapsingOther(data.data);
      
      });
  };
   //////////////selection filter///////////////
   const dataRisk = [
     
     { name: 'Overcrowding', Number_of_patient: `${dataRelapsingOvercrowding}`},
     { name: 'Poor personal hygiene', Number_of_patient: `${dataRelapsingPoorPersonalHygiene}`},
     { name: 'Homeless', Number_of_patient: `${dataRelapsingHomeless}`},
     { name: 'Mass Sleeping', Number_of_patient: `${dataRelapsingMassSleeping}`},
     { name: 'Shelter', Number_of_patient: `${dataRelapsingShelter}`},
     { name: 'Other', Number_of_patient: `${dataRelapsingOther}`},
   ];
   /////////////////////////////////////////////////////
   //////////////////////////LessFive front///////////////////////////single record//////////////
const [dataRelapsingLessFive, setDatadataRelapsingLessFive] = useState([]);

useEffect(() => {
  getAllRelapsingLessFive();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingLessFive = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingLessFive?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LessFiveData ");
      setDatadataRelapsingLessFive(data.data);
    
    });
};
///////////////////////////Betweb5To14 front///////////////////////////single record//////////////
const [dataRelapsingBetweb5To14, setDatadataRelapsingBetweb5To14] = useState([]);

useEffect(() => {
  getAllRelapsingBetweb5To14();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingBetweb5To14 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingBetweb5To14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb5To14Data ");
      setDatadataRelapsingBetweb5To14(data.data);
    
    });
};
///////////////////////////Betweb15To29 front///////////////////////////single record//////////////
const [dataRelapsingBetweb15To29, setDatadataRelapsingBetweb15To29] = useState([]);

useEffect(() => {
  getAllRelapsingBetweb15To29();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingBetweb15To29 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingBetweb15To29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb15To29Data ");
      setDatadataRelapsingBetweb15To29(data.data);
    
    });
};

///////////////////////////Betweb30To49 front///////////////////////////single record//////////////
const [dataRelapsingBetweb30To49, setDatadataRelapsingBetweb30To49] = useState([]);

useEffect(() => {
  getAllRelapsingBetweb30To49();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingBetweb30To49= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingBetweb30To49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb30To49Data ");
      setDatadataRelapsingBetweb30To49(data.data);
    
    });
};

///////////////////////////Betweb50To59  front///////////////////////////single record//////////////
const [dataRelapsingBetweb50To59, setDatadataRelapsingBetweb50To59] = useState([]);

useEffect(() => {
  getAllRelapsingBetweb50To59();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingBetweb50To59= () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingBetweb50To59?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb50To59Data ");
      setDatadataRelapsingBetweb50To59(data.data);
    
    });
};

///////////////////////////Betweb60To69 front///////////////////////////single record//////////////
const [dataRelapsingBetweb60To69, setDatadataRelapsingBetweb60To69] = useState([]);

useEffect(() => {
  getAllRelapsingBetweb60To69();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingBetweb60To69 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingBetweb60To69?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Betweb60To69Data ");
      setDatadataRelapsingBetweb60To69(data.data);
    
    });
};

///////////////////////////Above70 front///////////////////////////single record//////////////
const [dataRelapsingAbove70, setDatadataRelapsingAbove70] = useState([]);

useEffect(() => {
  getAllRelapsingAbove70();
},[searchQuery]);

//fetching all cholera
const getAllRelapsingAbove70 = () => {
  fetch(`http://localhost:3000/Gete-SingleRelapsingAbove70?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Above70Data ");
      setDatadataRelapsingAbove70(data.data);
    
    });
};


  const dataAgeGroup = [
    {
      name: '<5',
      Number_of_patient: `${dataRelapsingLessFive}`,
      fill: '#8884d8',
    },
    {
      name: '5-14',
      Number_of_patient: `${dataRelapsingBetweb5To14}`,
      fill: '#83a6ed',
    },
    {
      name: '15-29',
      Number_of_patient: `${dataRelapsingBetweb15To29}`, 
      fill: '#8dd1e1',
    },
    {
      name: '30-49',
      Number_of_patient: `${dataRelapsingBetweb30To49}`,
      fill: '#82ca9d',
    },
    {
      name: '50-59',
      Number_of_patient: `${dataRelapsingBetweb50To59}`,
      fill: '#a4de6c',
    },
    {
      name: '60-69',
      Number_of_patient: `${dataRelapsingBetweb60To69}`,
      fill: '#d0ed57',
    },
    {
      name: '70+',
      Number_of_patient: `${dataRelapsingAbove70}`,
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
     Number_of_patient: `${dataRelapsingAkaki}`,
   },
   {
     name: 'Addis Ketema',
     Number_of_patient: `${dataRelapsingAddisKetema}`,
   },
   {
     name: 'Arada',
     Number_of_patient: `${dataRelapsingArada}`,
   },
   {
     name: 'Bole',
     Number_of_patient: `${dataRelapsingBole}`,
   },
   {
     name: 'Gulele',
     Number_of_patient: `${dataRelapsingGulele}`,
   },
   {
     name: 'Kirkos',
     Number_of_patient: `${dataRelapsingKirkos}`,
   },
   {
     name: 'kolife',
     Number_of_patient: `${dataRelapsingkolife}`,
   },
   {
     name: 'Nifas Silk Lafto',
     Number_of_patient: `${dataRelapsingNifas_Silk_Lafto}`,
   },
   {
     name: 'Lemi Kura',
     Number_of_patient: `${dataRelapsingLemi_Kura}`,
   },
   
   {
     name: 'Lideta',
     Number_of_patient: `${dataRelapsingLideta}`,
   },
   {
     name: 'Yeka',
     Number_of_patient: `${dataRelapsingYeka}`,
   },
 ];
 
 const getIntroOfPage = (label) => {
   
   if (label === 'Akaki') {
     return `The Number of patient in Addis Ketema is ${dataRelapsingAkaki}`;
   }
   if (label === 'Addis Ketema') {
     return `The Number of patient in Addis Ketema is ${dataRelapsingAddisKetema}`;
   }
   if (label === 'Arada') {
     return `The Number of patient in Arada is ${dataRelapsingArada}`;
   }
   if (label === 'Bole') {
     return `The Number of patient in Bole is ${dataRelapsingBole}`;
   }
   if (label === 'Gulele') {
     return `The Number of patient in Gulele is ${dataRelapsingGulele}`;
   }
   if (label === 'Kirkos') {
     return `The Number of patient in Kirkos is ${dataRelapsingKirkos}`;
   }
   if (label === 'kolife') {
     return `The Number of patient in kolife is ${dataRelapsingkolife}`;
   }
   if (label === 'Nifas Silk Lafto') {
     return `The Number of patient in Nifas Silk Lafto is ${dataRelapsingNifas_Silk_Lafto}`;
   }
   if (label === 'Lemi Kura') {
     return `The Number of patient in Lemi Kura is ${dataRelapsingLemi_Kura}`;
   }
   if (label === 'Lideta') {
     return `The Number of patient in Lideta is ${dataRelapsingLideta}`;
   }
   if (label === 'Yeka') {
     return `The Number of patient in Yeka is ${dataRelapsingYeka}`;
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
  axios.get("http://localhost:3000/GetRelapsingFever")
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
  const  RelapsingFeverLINELIST = useRef(null);
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
        <th className='p-3'><li onClick={() => scrollToSection(RelapsingFeverLINELIST)} className="link DashbordBG p-1 text-secondary border border-white shadow-lg rounded">
        Relapsing Fever Cases Line List
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

     



    
    <div className="border border-black " ref={RelapsingFeverLINELIST}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT Relapsing Fever Cases Line List </h4>
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
                <th><h6>Patient residency region | የመኖሪያ ክልል</h6></th>
                <th><h6>Residency Region</h6> </th>
                <th><h6>Patient residency sub city | የመኖሪያ ክ/ከተማ</h6></th>
                <th> <h6>Patient residency woreda | የመኖሪያ ወረዳ</h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th><h6>Kebele | Ketena</h6></th>
                <th> <h6>House number  </h6></th>
                <th><h6>Region | ጤና ተቋሙ የሚገኝበት ክልል</h6></th>
                <th> <h6>Health Facility Region</h6></th>
                <th><h6>Name of Sub City | ጤና ተቋሙ የሚገኝበት ክ/ከተማ</h6></th>
                <th><h6>Health Facility Sub-City</h6></th>
                <th><h6>Name of Woreda | ጤና ተቋሙ የሚገኝበት ወረዳ</h6></th>
                <th><h6>Health Facility Woreda </h6></th>
                <th><h6>Reporting Health Facility Name | የጤና ተቋሙ ስም</h6></th>
                <th><h6>name of health facility</h6></th>
                <th><h6>Name Of Client/ Patient</h6></th>
                <th><h6>Sex</h6> </th>
                <th> <h6>Age </h6></th>
                <th><h6>Occupation </h6></th>
                <th><h6>other, Specify Occupation</h6></th>
                <th> <h6>Phone number</h6></th>
                <th><h6>Date of symptom onset</h6></th>
                <th> <h6>Date seen at health facility</h6></th>
                <th><h6>Date of admission</h6></th>
                <th><h6>Date of discharge</h6></th>
                <th><h6>Lab. Result  </h6></th>
                <th><h6> outcome  </h6></th>
                <th><h6>Contact with confirmed  </h6></th>
                <th> <h6>Delousing done  </h6></th>
                <th><h6>Insecticide spray status of the household</h6></th>
                <th> <h6>Major Possible Risk Factors</h6></th>
                <th><h6>Add presenting clinical feature</h6></th>
                <th><h6>other clinical feature</h6></th>
                <th><h6> patient transferred </h6></th>
                <th><h6> which Hospital </h6></th>
                <th><h6>patient transferred in</h6></th>

                
                <th><h6>from which health center</h6></th>
                <th><h6>Name of data collector</h6></th>
                <th><h6>EPI_Week  </h6></th>
                <th><h6> Phone number  </h6></th>
                
          
          
              </tr>
            </thead>
            <tbody > 
              {records && records.slice(0,10) .map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.MRN}</h6></th>
                  <th ><h6>{filer.PRegion}</h6></th>
                  <th ><h6>{filer.TRegion}</h6></th>
                  <th><h6>{filer.PSubCity}</h6></th>
                  <th><h6>{filer.PWoreda}</h6></th>
                  <th><h6>{filer.pTWoreda}</h6></th>
                  <th ><h6>{filer.Kebele}</h6></th>
                  <th ><h6>{filer.HNumber}</h6></th>
                  <th><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.HTRegion}</h6></th>
                  <th><h6>{filer.HSubCity}</h6></th>
                  <th ><h6>{filer.THSubCity}</h6></th>
                  <th><h6>{filer.HWoreda}</h6></th>
                  <th><h6>{filer.HFTworeda}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.HFTName}</h6></th>
                  <th ><h6>{filer.PPatient}</h6></th>
                  <th ><h6>{filer.Sex}</h6></th>
                  <th><h6>{filer.Age}</h6></th>
                  <th><h6>{filer.POccupation}</h6></th>
                  <th><h6>{filer.TPOccupation}</h6></th>
                  <th ><h6>{filer.Phone}</h6></th>
                  <th ><h6>{filer.OnsetDate}</h6></th>
                  <th><h6>{filer.SeenHF}</h6></th>
                  <th><h6>{filer.Admission}</h6></th>
                  <th><h6>{filer.Discharge}</h6></th>
                  <th ><h6>{filer.LabBorrelia}</h6></th>
                  <th><h6>{filer.Outcome}</h6></th>
                  <th><h6>{filer.RFCase}</h6></th>
                  <th><h6>{filer.Delousing}</h6></th>
                  <th ><h6>{filer.Insecticide}</h6></th>
                  <th ><h6>{filer.RiskFactors}</h6></th>
                  <th><h6>{filer.TRiskFactors}</h6></th>
                  <th><h6>{filer.Feature}</h6></th>
                  <th><h6>{filer.TFeature}</h6></th>
                  <th ><h6>{filer.Transferred}</h6></th>
                  <th><h6>{filer.TTransferred}</h6></th>
                  <th><h6>{filer.TransferredIn}</h6></th>
                  <th><h6>{filer.TTransferredIn}</h6></th>
                  <th><h6>{filer.FCName}</h6></th>
                  <th ><h6>{filer.EPIWeek}</h6></th>
                  <th ><h6>{filer.CPhone}</h6></th>
                 
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">RELAPSING FEVER TREND </p>
      <LineChart
          width={800}
          height={300}
          data={dataLineRelapsing}
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">Major Possible Risk Factors</p>
        <BarChart
          width={500}
          height={300}
          data={dataRisk}
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
          <Legend iconSize={10} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
          <Bar dataKey="Number_of_patient" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
          
        </BarChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">RELAPSING IN BY GENDER </p>
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
        <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">RELAPSING IN AGE GROUP</p>
        <ComposedChart
          layout="vertical"
          width={800}
          height={400}
          data={dataAgeGroup}
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
    <p class="text-center text-secondary border border-secondary bg-success-100 p-1 mb-1 w-50">RELAPSING IN SUBCITY</p>
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

export default Relapsing_Report

