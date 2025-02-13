import {useCallback,React } from 'react'
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

const COLORS = ['#0088FE', '#00C49F'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index,value }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`},{`T=${value}`}
    </text>
  );
};

///////////////////////////////////////////////////////top function////////////////////////////
///////////////////////////////////////////////////////////////////////////

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
 
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`Number of Patient ${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text>
    </g>
  );
};
////////////////////////////////////////////////////////////////end////////////////////////////////

function Cholera_Report() {
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

    ///////////////////////////front///////////////////////////single record//////////////
const [datacholera, setDatadatacholera] = useState([]);
const [searchQuery,setSearchQuery]=useState("")

useEffect(() => {
  getAllcholera();
},[searchQuery]);

//fetching all cholera
const getAllcholera = () => {
  fetch(`http://localhost:3000/Gete-SingleCholera?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholera(data.data);
    
    });
};


///////////////////////////front///////////////////////////Akaki single record//////////////Gete-SingleCholeraAddisKetema
const [datacholeraAkaki, setDatadatacholeraAkaki] = useState([]);


useEffect(() => {
  getAllcholeraAkaki();
},[searchQuery]);

//fetching all cholera
const getAllcholeraAkaki = () => {
  fetch(`http://localhost:3000/Gete-SinglecholeraAkaki?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraAkaki(data.data);
    
    });
};
///////////////////////////AddisKetema front///////////////////////////single record//////////////
const [datacholeraAddisKetema, setDatadatacholeraAddisKetema] = useState([]);

useEffect(() => {
  getAllcholeraAddisKetema();
},[searchQuery]);

//fetching all cholera
const getAllcholeraAddisKetema = () => {
  fetch(`http://localhost:3000/Gete-SinglecholeraaAddisKetema?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AddisKetemaData ");
      setDatadatacholeraAddisKetema(data.data);
    
    });
};
///////////////////////////Arada front///////////////////////////single record//////////////
const [datacholeraArada, setDatadatacholeraArada] = useState([]);

useEffect(() => {
  getAllcholeraArada();
},[searchQuery]);

//fetching all cholera
const getAllcholeraArada = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraArada?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraArada(data.data);
    
    });
};
///////////////////////////Bole front///////////////////////////single record//////////////
const [datacholeraBole, setDatadatacholeraBole] = useState([]);

useEffect(() => {
  getAllcholeraBole();
},[searchQuery]);

//fetching all cholera
const getAllcholeraBole = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraBole?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraBole(data.data);
    
    });
};
///////////////////////////Gulele front///////////////////////////single record//////////////
const [datacholeraGulele, setDatadatacholeraGulele] = useState([]);

useEffect(() => {
  getAllcholeraGulele();
},[searchQuery]);

//fetching all cholera
const getAllcholeraGulele = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraGulele?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraGulele(data.data);
    
    });
};
///////////////////////////Kirkos front///////////////////////////single record//////////////
const [datacholeraKirkos, setDatadatacholeraKirkos] = useState([]);

useEffect(() => {
  getAllcholeraKirkos();
},[searchQuery]);

//fetching all cholera
const getAllcholeraKirkos= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraKirkos?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraKirkos(data.data);
    
    });
};

///////////////////////////kolife keranio sub city front///////////////////////////single record//////////////
const [datacholerakolife, setDatadatacholerakolife] = useState([]);

useEffect(() => {
  getAllcholerakolife();
},[searchQuery]);

//fetching all cholera
const getAllcholerakolife= () => {
  fetch(`http://localhost:3000/Gete-Singlecholerakolife?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "kolifeData ");
      setDatadatacholerakolife(data.data);
    
    });
};
///////////////////////////Lideta front///////////////////////////single record//////////////
const [datacholeraNifas_Silk_Lafto, setDatadatacholeraNifas_Silk_Lafto] = useState([]);

useEffect(() => {
  getAllcholeraNifas_Silk_Lafto();
},[searchQuery]);

//fetching all cholera
const getAllcholeraNifas_Silk_Lafto = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraNifas_Silk_Lafto?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraNifas_Silk_Lafto(data.data);
    
    });
};
///////////////////////////Lemi_Kura front///////////////////////////single record//////////////
const [datacholeraLemi_Kura, setDatadatacholeraLemi_Kura] = useState([]);

useEffect(() => {
  getAllcholeraLemi_Kura();
},[searchQuery]);

//fetching all cholera
const getAllcholeraLemi_Kura = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraLemi_Kura?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraLemi_Kura(data.data);
    
    });
};
///////////////////////////Lideta front///////////////////////////single record//////////////
const [datacholeraLideta, setDatadatacholeraLideta] = useState([]);

useEffect(() => {
  getAllcholeraLideta();
},[searchQuery]);

//fetching all cholera
const getAllcholeraLideta = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraLideta?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraLideta(data.data);
    
    });
};
///////////////////////////Yeka front///////////////////////////single record//////////////
const [datacholeraYeka, setDatadatacholeraYeka] = useState([]);

useEffect(() => {
  getAllcholeraYeka();
},[searchQuery]);

//fetching all cholera
const getAllcholeraYeka = () => {
  fetch(`http://localhost:3000/Gete-SinglecholeraYeka?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "YekaData ");
      setDatadatacholeraYeka(data.data);
    
    });
};


////////////////////////////////////////////////////////////single/////////////////////////////////
///////////////////////////Female front///////////////////////////single record//////////////
const [datacholeraFemale, setDatadatacholeraFemale] = useState([]);

useEffect(() => {
  getAllcholeraFemale();
},[searchQuery]);

//fetching all cholera
const getAllcholeraFemale = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraFemale ?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraFemale(data.data);
    
    });
};
///////////////////////////Male front///////////////////////////single record//////////////
const [datacholeraMale, setDatadatacholeraMale] = useState([]);

useEffect(() => {
  getAllcholeraMale();
},[searchQuery]);

//fetching all cholera
const getAllcholeraMale = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraMale?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "LoginData ");
      setDatadatacholeraMale(data.data);
    
    });
};
//////////////selection filter///////////////
const dataPai = [
  { name: 'Female', value:  parseInt(`${datacholeraFemale}`)},
  { name: 'Male', value:  parseInt(`${datacholeraMale}`)},
  
];
///////////////////////////front///////////////////////////Week1 single record//////////////Gete-SingleCholeraAddisKetema
const [dataCholeraWeek1, setDatadataCholeraWeek1] = useState([]);
useEffect(() => {
  getAllCholeraWeek1();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek1 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek1?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week1Data ");
      setDatadataCholeraWeek1(data.data);
    
    });
};
///////////////////////////Week2 front///////////////////////////single record//////////////
const [dataCholeraWeek2, setDatadataCholeraWeek2] = useState([]);

useEffect(() => {
  getAllCholeraWeek2();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek2 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraaWeek2?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week2Data ");
      setDatadataCholeraWeek2(data.data);
    
    });
};
///////////////////////////Week3 front///////////////////////////single record//////////////
const [dataCholeraWeek3, setDatadataCholeraWeek3] = useState([]);

useEffect(() => {
  getAllCholeraWeek3();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek3 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek3?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week3Data ");
      setDatadataCholeraWeek3(data.data);
    
    });
};
///////////////////////////Week4 front///////////////////////////single record//////////////
const [dataCholeraWeek4, setDatadataCholeraWeek4] = useState([]);

useEffect(() => {
  getAllCholeraWeek4();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek4 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek4?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week4Data ");
      setDatadataCholeraWeek4(data.data);
    
    });
};
///////////////////////////Week5 front///////////////////////////single record//////////////
const [dataCholeraWeek5, setDatadataCholeraWeek5] = useState([]);

useEffect(() => {
  getAllCholeraWeek5();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek5 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek5?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week5Data ");
      setDatadataCholeraWeek5(data.data);
    
    });
};

///////////////////////////Week6 front///////////////////////////single record//////////////
const [dataCholeraWeek6, setDatadataCholeraWeek6] = useState([]);

useEffect(() => {
  getAllCholeraWeek6();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek6= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek6?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week6Data ");
      setDatadataCholeraWeek6(data.data);
    
    });
};

///////////////////////////Week7 keranio sub city front///////////////////////////single record//////////////
const [dataCholeraWeek7, setDatadataCholeraWeek7] = useState([]);

useEffect(() => {
  getAllCholeraWeek7();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek7= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek7?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week7Data ");
      setDatadataCholeraWeek7(data.data);
    
    });
};

///////////////////////////Week8 front///////////////////////////single record//////////////
const [dataCholeraWeek8, setDatadataCholeraWeek8] = useState([]);

useEffect(() => {
  getAllCholeraWeek8();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek8 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek8?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week8Data ");
      setDatadataCholeraWeek8(data.data);
    
    });
};

///////////////////////////Week9 front///////////////////////////single record//////////////
const [dataCholeraWeek9, setDatadataCholeraWeek9] = useState([]);

useEffect(() => {
  getAllCholeraWeek9();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek9 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek9?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week9Data ");
      setDatadataCholeraWeek9(data.data);
    
    });
};

///////////////////////////Week10 front///////////////////////////single record//////////////
const [dataCholeraWeek10, setDatadataCholeraWeek10] = useState([]);

useEffect(() => {
  getAllCholeraWeek10();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek10 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek10?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week10Data ");
      setDatadataCholeraWeek10(data.data);
    
    });
};
///////////////////////////Week11 front///////////////////////////single record//////////////
const [dataCholeraWeek11, setDatadataCholeraWeek11] = useState([]);

useEffect(() => {
  getAllCholeraWeek11();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek11 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek11?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week11Data ");
      setDatadataCholeraWeek11(data.data);
    
    });
};

///////////////////////////Week12 front///////////////////////////single record//////////////
const [dataCholeraWeek12, setDatadataCholeraWeek12] = useState([]);

useEffect(() => {
  getAllCholeraWeek12();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek12 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek12?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week12Data ");
      setDatadataCholeraWeek12(data.data);
    
    });
};
///////////////////////////Week13 front///////////////////////////single record//////////////
const [dataCholeraWeek13, setDatadataCholeraWeek13] = useState([]);

useEffect(() => {
  getAllCholeraWeek13();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek13 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek13?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week13Data ");
      setDatadataCholeraWeek13(data.data);
    
    });
};
///////////////////////////Week14 front///////////////////////////single record//////////////
const [dataCholeraWeek14, setDatadataCholeraWeek14] = useState([]);

useEffect(() => {
  getAllCholeraWeek14();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek14 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek14?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week14LoginData ");
      setDatadataCholeraWeek14(data.data);
    
    });
};
///////////////////////////Week15 front///////////////////////////single record//////////////
const [dataCholeraWeek15, setDatadataCholeraWeek15] = useState([]);


useEffect(() => {
  getAllCholeraWeek15();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek15 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek15?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week15Data ");
      setDatadataCholeraWeek15(data.data);
    
    });
};
///////////////////////////Week16 front///////////////////////////single record//////////////
const [dataCholeraWeek16, setDatadataCholeraWeek16] = useState([]);

useEffect(() => {
  getAllCholeraWeek16();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek16 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraaWeek16?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week16Data ");
      setDatadataCholeraWeek16(data.data);
    
    });
};
///////////////////////////Week17 front///////////////////////////single record//////////////
const [dataCholeraWeek17, setDatadataCholeraWeek17] = useState([]);

useEffect(() => {
  getAllCholeraWeek17();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek17 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek17?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week17Data ");
      setDatadataCholeraWeek17(data.data);
    
    });
};
///////////////////////////Week18 front///////////////////////////single record//////////////
const [dataCholeraWeek18, setDatadataCholeraWeek18] = useState([]);

useEffect(() => {
  getAllCholeraWeek18();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek18 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek18?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week18Data ");
      setDatadataCholeraWeek18(data.data);
    
    });
};
///////////////////////////Week19 front///////////////////////////single record//////////////
const [dataCholeraWeek19, setDatadataCholeraWeek19] = useState([]);

useEffect(() => {
  getAllCholeraWeek19();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek19 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek19?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week19Data ");
      setDatadataCholeraWeek19(data.data);
    
    });
};

///////////////////////////Week20 front///////////////////////////single record//////////////
const [dataCholeraWeek20, setDatadataCholeraWeek20] = useState([]);

useEffect(() => {
  getAllCholeraWeek20();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek20= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek20?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week20Data ");
      setDatadataCholeraWeek20(data.data);
    
    });
};

///////////////////////////Week21 keranio sub city front///////////////////////////single record//////////////
const [dataCholeraWeek21, setDatadataCholeraWeek21] = useState([]);

useEffect(() => {
  getAllCholeraWeek21();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek21= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek21?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week21Data ");
      setDatadataCholeraWeek21(data.data);
    
    });
};

///////////////////////////Week22 front///////////////////////////single record//////////////
const [dataCholeraWeek22, setDatadataCholeraWeek22] = useState([]);

useEffect(() => {
  getAllCholeraWeek22();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek22 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek22?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week22Data ");
      setDatadataCholeraWeek22(data.data);
    
    });
};

///////////////////////////Week23 front///////////////////////////single record//////////////
const [dataCholeraWeek23, setDatadataCholeraWeek23] = useState([]);

useEffect(() => {
  getAllCholeraWeek23();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek23 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek23?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week23Data ");
      setDatadataCholeraWeek23(data.data);
    
    });
};

///////////////////////////Week24 front///////////////////////////single record//////////////
const [dataCholeraWeek24, setDatadataCholeraWeek24] = useState([]);

useEffect(() => {
  getAllCholeraWeek24();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek24 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek24?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week24Data ");
      setDatadataCholeraWeek24(data.data);
    
    });
};
///////////////////////////Week25 front///////////////////////////single record//////////////
const [dataCholeraWeek25, setDatadataCholeraWeek25] = useState([]);

useEffect(() => {
  getAllCholeraWeek25();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek25 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek25?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week25Data ");
      setDatadataCholeraWeek25(data.data);
    
    });
};

///////////////////////////Week26 front///////////////////////////single record//////////////
const [dataCholeraWeek26, setDatadataCholeraWeek26] = useState([]);

useEffect(() => {
  getAllCholeraWeek26();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek26 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek26?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week26Data ");
      setDatadataCholeraWeek26(data.data);
    
    });
};
///////////////////////////Week27 front///////////////////////////single record//////////////
const [dataCholeraWeek27, setDatadataCholeraWeek27] = useState([]);

useEffect(() => {
  getAllCholeraWeek27();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek27 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek27?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week27Data ");
      setDatadataCholeraWeek27(data.data);
    
    });
};
///////////////////////////Week28 front///////////////////////////single record//////////////
const [dataCholeraWeek28, setDatadataCholeraWeek28] = useState([]);

useEffect(() => {
  getAllCholeraWeek28();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek28 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek28?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week28LoginData ");
      setDatadataCholeraWeek28(data.data);
    
    });
};
///////////////////////////Week29 front///////////////////////////single record//////////////
const [dataCholeraWeek29, setDatadataCholeraWeek29] = useState([]);
useEffect(() => {
  getAllCholeraWeek29();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek29 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek29?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week29Data ");
      setDatadataCholeraWeek29(data.data);
    
    });
};
///////////////////////////Week30 front///////////////////////////single record//////////////
const [dataCholeraWeek30, setDatadataCholeraWeek30] = useState([]);

useEffect(() => {
  getAllCholeraWeek30();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek30 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraaWeek30?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week30Data ");
      setDatadataCholeraWeek30(data.data);
    
    });
};
///////////////////////////Week31 front///////////////////////////single record//////////////
const [dataCholeraWeek31, setDatadataCholeraWeek31] = useState([]);

useEffect(() => {
  getAllCholeraWeek31();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek31 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek31?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week31Data ");
      setDatadataCholeraWeek31(data.data);
    
    });
};
///////////////////////////Week32 front///////////////////////////single record//////////////
const [dataCholeraWeek32, setDatadataCholeraWeek32] = useState([]);

useEffect(() => {
  getAllCholeraWeek32();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek32 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek32?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week32Data ");
      setDatadataCholeraWeek32(data.data);
    
    });
};
///////////////////////////Week33 front///////////////////////////single record//////////////
const [dataCholeraWeek33, setDatadataCholeraWeek33] = useState([]);

useEffect(() => {
  getAllCholeraWeek33();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek33 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek33?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week33Data ");
      setDatadataCholeraWeek33(data.data);
    
    });
};

///////////////////////////Week34 front///////////////////////////single record//////////////
const [dataCholeraWeek34, setDatadataCholeraWeek34] = useState([]);

useEffect(() => {
  getAllCholeraWeek34();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek34= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek34?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week34Data ");
      setDatadataCholeraWeek34(data.data);
    
    });
};

///////////////////////////Week35 keranio sub city front///////////////////////////single record//////////////
const [dataCholeraWeek35, setDatadataCholeraWeek35] = useState([]);

useEffect(() => {
  getAllCholeraWeek35();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek35= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek35?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week35ata ");
      setDatadataCholeraWeek35(data.data);
    
    });
};

///////////////////////////Week36 front///////////////////////////single record//////////////
const [dataCholeraWeek36, setDatadataCholeraWeek36] = useState([]);

useEffect(() => {
  getAllCholeraWeek36();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek36 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek36?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week36Data ");
      setDatadataCholeraWeek36(data.data);
    
    });
};

///////////////////////////Week37 front///////////////////////////single record//////////////
const [dataCholeraWeek37, setDatadataCholeraWeek37] = useState([]);

useEffect(() => {
  getAllCholeraWeek37();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek37 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek37?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week37Data ");
      setDatadataCholeraWeek37(data.data);
    
    });
};

///////////////////////////Week38 front///////////////////////////single record//////////////
const [dataCholeraWeek38, setDatadataCholeraWeek38] = useState([]);

useEffect(() => {
  getAllCholeraWeek38();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek38 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek38?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week38Data ");
      setDatadataCholeraWeek38(data.data);
    
    });
};
///////////////////////////Week39 front///////////////////////////single record//////////////
const [dataCholeraWeek39, setDatadataCholeraWeek39] = useState([]);

useEffect(() => {
  getAllCholeraWeek39();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek39 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek39?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week39Data ");
      setDatadataCholeraWeek39(data.data);
    
    });
};

///////////////////////////Week40 front///////////////////////////single record//////////////
const [dataCholeraWeek40, setDatadataCholeraWeek40] = useState([]);

useEffect(() => {
  getAllCholeraWeek40();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek40 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek40?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week40Data ");
      setDatadataCholeraWeek40(data.data);
    
    });
};
///////////////////////////Week41 front///////////////////////////single record//////////////
const [dataCholeraWeek41, setDatadataCholeraWeek41] = useState([]);

useEffect(() => {
  getAllCholeraWeek41();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek41 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek41?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week41Data ");
      setDatadataCholeraWeek41(data.data);
    
    });
};
///////////////////////////Week42 front///////////////////////////single record//////////////
const [dataCholeraWeek42, setDatadataCholeraWeek42] = useState([]);

useEffect(() => {
  getAllCholeraWeek42();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek42 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek42?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week42LoginData ");
      setDatadataCholeraWeek42(data.data);
    
    });
};
///////////////////////////Week43 front///////////////////////////single record//////////////
const [dataCholeraWeek43, setDatadataCholeraWeek43] = useState([]);


useEffect(() => {
  getAllCholeraWeek43();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek43 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek43?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week43Data ");
      setDatadataCholeraWeek43(data.data);
    
    });
};
///////////////////////////Week44 front///////////////////////////single record//////////////
const [dataCholeraWeek44, setDatadataCholeraWeek44] = useState([]);

useEffect(() => {
  getAllCholeraWeek44();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek44 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraaWeek44?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week44Data ");
      setDatadataCholeraWeek44(data.data);
    
    });
};
///////////////////////////Week45 front///////////////////////////single record//////////////
const [dataCholeraWeek45, setDatadataCholeraWeek45] = useState([]);

useEffect(() => {
  getAllCholeraWeek45();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek45 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek45?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week45Data ");
      setDatadataCholeraWeek45(data.data);
    
    });
};
///////////////////////////Week46 front///////////////////////////single record//////////////
const [dataCholeraWeek46, setDatadataCholeraWeek46] = useState([]);

useEffect(() => {
  getAllCholeraWeek46();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek46 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek46?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week46Data ");
      setDatadataCholeraWeek46(data.data);
    
    });
};
///////////////////////////Week47 front///////////////////////////single record//////////////
const [dataCholeraWeek47, setDatadataCholeraWeek47] = useState([]);

useEffect(() => {
  getAllCholeraWeek47();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek47 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek47?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week47Data ");
      setDatadataCholeraWeek47(data.data);
    
    });
};

///////////////////////////Week48 front///////////////////////////single record//////////////
const [dataCholeraWeek48, setDatadataCholeraWeek48] = useState([]);

useEffect(() => {
  getAllCholeraWeek48();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek48= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek48?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week48Data ");
      setDatadataCholeraWeek48(data.data);
    
    });
};

///////////////////////////Week49  front///////////////////////////single record//////////////
const [dataCholeraWeek49, setDatadataCholeraWeek49] = useState([]);

useEffect(() => {
  getAllCholeraWeek49();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek49= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek49?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week49Data ");
      setDatadataCholeraWeek49(data.data);
    
    });
};

///////////////////////////Week50 front///////////////////////////single record//////////////
const [dataCholeraWeek50, setDatadataCholeraWeek50] = useState([]);

useEffect(() => {
  getAllCholeraWeek50();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek50 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek50?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week50Data ");
      setDatadataCholeraWeek50(data.data);
    
    });
};

///////////////////////////Week51 front///////////////////////////single record//////////////
const [dataCholeraWeek51, setDatadataCholeraWeek51] = useState([]);

useEffect(() => {
  getAllCholeraWeek51();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek51 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek51?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week51Data ");
      setDatadataCholeraWeek51(data.data);
    
    });
};

///////////////////////////Week52 front///////////////////////////single record//////////////
const [dataCholeraWeek52, setDatadataCholeraWeek52] = useState([]);

useEffect(() => {
  getAllCholeraWeek52();
},[searchQuery]);

//fetching all cholera
const getAllCholeraWeek52 = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraWeek52?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Week52Data ");
      setDatadataCholeraWeek52(data.data);
    
    });
};


///////////////////////////////line graph fetching end//////////////////////////
  const dataCholeraLine = [{ Week: 'Week 1', Number_of_patient: `${dataCholeraWeek1}`,},{ Week:'Week 2', Number_of_patient: `${dataCholeraWeek2}`, },{Week:'Week 3',  Number_of_patient: `${dataCholeraWeek3}`, },{Week:'Week 4',  Number_of_patient: `${dataCholeraWeek4}`,}, { Week:'Week 5',  Number_of_patient: `${dataCholeraWeek5}`,},{Week:'Week 6', Number_of_patient: `${dataCholeraWeek6}`,},{Week:'Week 7', Number_of_patient: `${dataCholeraWeek7}`,},{Week:'Week 8', Number_of_patient: `${dataCholeraWeek8}`,},{ Week:'Week 9', Number_of_patient: `${dataCholeraWeek9}`, },{Week:'Week 10',  Number_of_patient: `${dataCholeraWeek10}`, },{Week:'Week 11', Number_of_patient: `${dataCholeraWeek11}`,}, { Week:'Week 12', Number_of_patient: `${dataCholeraWeek12}`,},{Week:'Week 13', Number_of_patient: `${dataCholeraWeek13}`,},{Week:'Week 14', Number_of_patient: `${dataCholeraWeek14}`,},
                    { Week: 'Week 15', Number_of_patient: `${dataCholeraWeek15}`,},{ Week:'Week 16', Number_of_patient: `${dataCholeraWeek16}`, },{Week:'Week 17', Number_of_patient: `${dataCholeraWeek17}`, },{Week:'Week 18', Number_of_patient: `${dataCholeraWeek18}`,}, { Week:'Week 19', Number_of_patient: `${dataCholeraWeek19}`,},{Week:'Week 20',Number_of_patient: `${dataCholeraWeek20}`,},{Week:'Week 21',Number_of_patient: `${dataCholeraWeek21}`, },{Week:'Week 22',Number_of_patient: `${dataCholeraWeek22}`,},{ Week:'Week 23',Number_of_patient: `${dataCholeraWeek23}`, },{Week:'Week 24', Number_of_patient: `${dataCholeraWeek24}`, },{Week:'Week 25', Number_of_patient: `${dataCholeraWeek25}`,}, { Week:'Week 26', Number_of_patient: `${dataCholeraWeek26}`,},{Week:'Week 27',Number_of_patient: `${dataCholeraWeek27}`,},{Week:'Week 28',Number_of_patient: `${dataCholeraWeek28}`, },
                    { Week: 'Week 29', Number_of_patient: `${dataCholeraWeek29}`,},{ Week:'Week 30', Number_of_patient: `${dataCholeraWeek30}`, },{Week:'Week 31', Number_of_patient: `${dataCholeraWeek31}`, },{Week:'Week 32', Number_of_patient: `${dataCholeraWeek32}`,}, { Week:'Week 33', Number_of_patient: `${dataCholeraWeek33}`,},{Week:'Week 34',Number_of_patient: `${dataCholeraWeek34}`,},{Week:'Week 35',Number_of_patient: `${dataCholeraWeek35}` },{Week:'Week 36',Number_of_patient: `${dataCholeraWeek36}`,},{ Week:'Week 37',Number_of_patient: `${dataCholeraWeek37}`, },{Week:'Week 38', Number_of_patient: `${dataCholeraWeek38}`, },{Week:'Week 39', Number_of_patient: `${dataCholeraWeek39}`,}, { Week:'Week 40',Number_of_patient: `${dataCholeraWeek40}`,},{Week:'Week 41',Number_of_patient: `${dataCholeraWeek41}`,},{Week:'Week 42',Number_of_patient: `${dataCholeraWeek42}`, },
                    { Week: 'Week 43', Number_of_patient: `${dataCholeraWeek43}`,},{ Week:'Week 44', Number_of_patient: `${dataCholeraWeek44}`, },{Week:'Week 45',Number_of_patient: `${dataCholeraWeek45}`, },{Week:'Week 46', Number_of_patient: `${dataCholeraWeek46}`,}, { Week:'Week 47', Number_of_patient: `${dataCholeraWeek47}`,},{Week:'Week 48',Number_of_patient: `${dataCholeraWeek48}`,},{Week:'Week 49',Number_of_patient: `${dataCholeraWeek49}`, },{Week:'Week 50',Number_of_patient: `${dataCholeraWeek50}`,},{ Week:'Week 51',Number_of_patient: `${dataCholeraWeek51}`, },{Week:'Week 52', Number_of_patient: `${dataCholeraWeek52}`, },
                    ];

///////////////////////////front ocupation///////////////////////////single record//////////////
const [datacholeraDailylaborer, setdatacholeraDailylaborer] = useState([]);
useEffect(() => {
  getAllcholeraDailylaborer();
},[searchQuery]);

//fetching all cholera
const getAllcholeraDailylaborer = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraDailylaborer?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chDailylaborerData ");
      setdatacholeraDailylaborer(data.data);
    
    });
};
///////////////////////////Driver front///////////////////////////single record//////////////
const [datacholeraDriver, setDatadatacholeraDriver] = useState([]);

useEffect(() => {
  getAllcholeraDriver();
},[searchQuery]);

//fetching all cholera
const getAllcholeraDriver = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraDriver?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chDriverData ");
      setDatadatacholeraDriver(data.data);
    
    });
};
///////////////////////////Employed front///////////////////////////single record//////////////
const [datacholeraEmployed, setDatadatacholeraEmployed] = useState([]);

useEffect(() => {
  getAllcholeraEmployed();
},[searchQuery]);

//fetching all cholera
const getAllcholeraEmployed = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraEmployed?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chEmployedData ");
      setDatadatacholeraEmployed(data.data);
    
    });
};
///////////////////////////NoJob front///////////////////////////single record//////////////
const [datacholeraNoJob, setDatadatacholeraNoJob] = useState([]);

useEffect(() => {
  getAllcholeraNoJob();
},[searchQuery]);

//fetching all cholera
const getAllcholeraNoJob = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraNoJob?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chNoJobData ");
      setDatadatacholeraNoJob(data.data);
    
    });
};
///////////////////////////Private front///////////////////////////single record//////////////
const [datacholeraPrivate, setDatadatacholeraPrivate] = useState([]);

useEffect(() => {
  getAllcholeraPrivate();
},[searchQuery]);

//fetching all cholera
const getAllcholeraPrivate= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraPrivate?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chPrivateData ");
      setDatadatacholeraPrivate(data.data);
    
    });
};
///////////////////////////StreetChildren front///////////////////////////single record//////////////
const [datacholeraStreetChildren, setDatadatacholeraStreetChildren] = useState([]);

useEffect(() => {
  getAllcholeraStreetChildren();
},[searchQuery]);

//fetching all cholera
const getAllcholeraStreetChildren= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraStreetChildren?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chStreetChildrenData ");
      setDatadatacholeraStreetChildren(data.data);
    
    });
};
///////////////////////////Student front///////////////////////////single record//////////////
const [datacholeraStudent, setDatadatacholeraStudent] = useState([]);

useEffect(() => {
  getAllcholeraStudent();
},[searchQuery]);

//fetching all cholera
const getAllcholeraStudent = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraStudent?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chStudentData ");
      setDatadatacholeraStudent(data.data);
    
    });
};
///////////////////////////Housewife front///////////////////////////single record//////////////
const [datacholeraHousewife, setDatadatacholeraHousewife] = useState([]);

useEffect(() => {
  getAllcholeraHousewife();
},[searchQuery]);

//fetching all cholera
const getAllcholeraHousewife = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraHousewife?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chHousewifeData ");
      setDatadatacholeraHousewife(data.data);
    
    });
};

///////////////////////////Other front///////////////////////////single record//////////////
const [datacholeraOther, setDatadatacholeraOther] = useState([]);

useEffect(() => {
  getAllcholeraOther();
},[searchQuery]);

//fetching all cholera
const getAllcholeraOther = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraOther?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chOtherData ");
      setDatadatacholeraOther(data.data);
    
    });
};
///////////////////////////////////////////////////cholera ocupation data//////////////////////
const dataocupation = [
{ ocupation: 'Daily laborer', Number_of_Worker: parseInt(`${datacholeraDailylaborer}`)},
{ ocupation:'Driver', Number_of_Worker: parseInt(`${datacholeraDriver}`)},
{ocupation:'Employed (Private & Government)',Number_of_Worker: parseInt(`${datacholeraEmployed}`)},
{ocupation:'No Job', Number_of_Worker: parseInt(`${datacholeraNoJob}`)}, 
{ ocupation:'Private (Self Employed)', Number_of_Worker: parseInt(`${datacholeraPrivate}`)},
{ocupation:'Street Children',Number_of_Worker: parseInt(`${datacholeraStreetChildren}`)},
{ocupation:'Student',Number_of_Worker: parseInt(`${datacholeraStudent}`) },
{ocupation:'House wife',Number_of_Worker: parseInt(`${datacholeraHousewife}`)},
{ ocupation:'Other',Number_of_Worker: parseInt(`${datacholeraOther}`)},]
  
  ///////////////////////////Pregnant front///////////////////////////single record//////////////
const [datacholeraPregnant, setDatadatacholeraPregnant] = useState([]);

useEffect(() => {
  getAllcholeraPregnant();
},[searchQuery]);

//fetching all cholera
const getAllcholeraPregnant= () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraPregnant?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chPregnantData ");
      setDatadatacholeraPregnant(data.data);
    
    });
};
///////////////////////////Lactating front///////////////////////////single record//////////////
const [datacholeraLactating, setDatadatacholeraLactating] = useState([]);

useEffect(() => {
  getAllcholeraLactating();
},[searchQuery]);

//fetching all cholera
const getAllcholeraLactating = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraLactating?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chLactatingData ");
      setDatadatacholeraLactating(data.data);
    
    });
};
///////////////////////////Notpregnant front///////////////////////////single record//////////////
const [datacholeraNotpregnant, setDatadatacholeraNotpregnant] = useState([]);

useEffect(() => {
  getAllcholeraNotpregnant();
},[searchQuery]);

//fetching all cholera
const getAllcholeraNotpregnant = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraNotpregnant?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chNotpregnantData ");
      setDatadatacholeraNotpregnant(data.data);
    
    });
};

///////////////////////////NA front///////////////////////////single record//////////////
const [datacholeraNA, setDatadatacholeraNA] = useState([]);

useEffect(() => {
  getAllcholeraNA();
},[searchQuery]);

//fetching all cholera
const getAllcholeraNA = () => {
  fetch(`http://localhost:3000/Gete-SingleCholeraNA?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "chNAData ");
      setDatadatacholeraNA(data.data);
    
    });
};
 
  const dataAge = [
    { name: 'Pregnant', Number_of_Worker: parseInt(`${datacholeraPregnant}`)},
    { name: 'Lactating', Number_of_Worker: parseInt(`${datacholeraLactating }`)},
    { name: 'Not pregnant', Number_of_Worker: parseInt(`${datacholeraNotpregnant}`)},
    { name: 'NA', Number_of_Worker: parseInt(`${datacholeraNA }`)},
  ];

  //////////////////////////////////////////////////////////////////////////legend//////////////////////
const style = {
  top: '50%',
  right: -11,
  transform: 'translate(0, -75%)',
  lineHeight: '24px',
};
/////////////////////////////////////////////
const [activeIndex, setActiveIndex] = useState(0);
const onPieEnter = useCallback(
  (_, index) => {
    setActiveIndex(index);
  },
  [setActiveIndex]
);
/////////////////////////////////////////////////////////////////////////end//////////////////////

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

  
  //////////////////////////columen one line and bar chart 
  const datas = [
    {
      name: 'Akaki',
      Number_of_patient: `${datacholeraAkaki}`,
    },
  {
    name: 'Addis Ketema',
    Number_of_patient: `${datacholeraAddisKetema}`,
  },
  
  {
    name: 'Arada',
    Number_of_patient: `${datacholeraArada}`,
  },
  {
    name: 'Bole',
    Number_of_patient: `${datacholeraBole}`,
  },
  {
    name: 'Gulele',
    Number_of_patient: `${datacholeraGulele}`,
  },
  {
    name: 'Kirkos',
    Number_of_patient: `${datacholeraKirkos}`,
  },
  {
    name: 'kolife',
    Number_of_patient: `${datacholerakolife}`,
  },
  {
    name: 'Nifas Silk Lafto',
    Number_of_patient: `${datacholeraNifas_Silk_Lafto}`,
  },
  {
    name: 'Lemi Kura',
    Number_of_patient: `${datacholeraLemi_Kura}`,
  },
  {
    name: 'Lideta',
    Number_of_patient: `${datacholeraLideta}`,
  },
  {
    name: 'Yeka',
    Number_of_patient: `${datacholeraYeka}`,
  },
];

const getIntroOfPage = (label) => {
  if (label === 'Akaki') {
    return `The Number of patient in Akaki is ${datacholeraAkaki}`;
  }
  if (label === 'Addis Ketema') {
    return `The Number of patient in Addis Ketema is ${datacholeraAddisKetema}`;
  }
  if (label === 'Arada') {
    return `The Number of patient in Arada is ${datacholeraArada}`;
  }
  if (label === 'Bole') {
    return `The Number of patient in Bole is ${datacholeraBole}`;
  }
  if (label === 'Gulele') {
    return `The Number of patient in Gulele is ${datacholeraGulele}`;
  }
  if (label === 'Nifas Silk Lafto') {
    return `The Number of patient in Nifas Silk Laftois ${datacholeraNifas_Silk_Lafto}`;
  }
  if (label === 'Kirkos') {
    return `The Number of patient in Kirkos is ${datacholeraKirkos}`;
  }
  if (label === 'kolife') {
    return `The Number of patient in kolife is ${datacholerakolife}`;
  }
  if (label === 'Lideta') {
    return `The Number of patient in Lideta is ${datacholeraLideta}`;
  }
  if (label === 'Lemi Kura') {
    return `The Number of patient in Lemi Kura is ${datacholeraLemi_Kura}`;
  }
  if (label === 'Yeka') {
    return `The Number of patient in Addis Ketema is ${datacholeraYeka}`;
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
  axios.get("http://localhost:3000/CholeraDesease")
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
  const CHOLERALINELIST = useRef(null);
  const CHOLERAContactINFO = useRef(null);
  const CHOLERARPatientINFO = useRef(null);
  const CHOLERARPExposureriskfactor = useRef(null);
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
        <th className='p-1'><li onClick={() => scrollToSection(CHOLERALINELIST)} className="link DashbordBG p-0 text-secondary border border-white shadow-lg rounded h6">
         Cholera LINE LIST
          </li></th>
          <th  className='p-1 '> <li onClick={() => scrollToSection(CHOLERARPatientINFO)} className="link DashbordBG h6 p-0 text-secondary border border-white shadow-lg rounded">
          Patient related Information
          </li></th>
          <th  className='p-1 '><li onClick={() => scrollToSection(CHOLERAContactINFO)} className="link DashbordBG h6  p-0 text-secondary border border-white shadow-lg rounded">
          Contact Trace Information
          </li></th>
          <th  className='p-1 '><li onClick={() => scrollToSection(CHOLERARPExposureriskfactor)} className="link DashbordBG h6 p-0 text-secondary border border-white shadow-lg rounded">
          Exposure/risk factor related information
          </li></th>
          <th  className='p-1 '><li onClick={() => scrollToSection(Chart)} className="link DashbordBG h6 p-0 text-secondary border border-white shadow-lg rounded">
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
     {datacholera}

     {datacholeraMale}
    </div>
    <div className='Scrol-Table'>
    <div ref={conponentPDF} style={{width:'100%'}}>
    
    <table className='w-100 table-responsive  table light padding text-sm-left Table' id="table-to-xls" >
    <thead className='text-sm-left '>
      
              <tr>
                <th><h6>Date of form filled</h6></th>
                <th><h6>Patient Full name</h6></th>
                <th><h6>MRN</h6> </th>
                <th><h6>Age(In Years & Months)</h6></th>
                <th> <h6>Sex</h6></th>
                <th> <h6>Pregnancy status if Female</h6></th>
                <th><h6>Phone Number</h6></th>
                <th><h6>Patient Residency Region</h6></th>
                <th> <h6>Patient Zone | Sub City</h6></th>
                <th><h6>Patient Residency Woreda</h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th> <h6>Specific Residency Area</h6></th>
                <th><h6>Ketena | Got</h6></th>
                <th><h6>Patient House Number</h6></th>
                <th><h6>Patient Current Occupation</h6></th>
                <th><h6>Specify Occupation</h6></th>
                <th><h6>Region</h6></th>
                <th><h6>Health Facility Region</h6></th>
                <th><h6>Name of Sub City</h6></th>
                <th><h6>Health Facility Sub-City</h6></th>
                <th><h6>Name of Woreda</h6></th>
                <th><h6>Health Facility Woreda</h6></th>
                <th><h6>Health Facility Name</h6></th>
                <th><h6>name of health facility</h6></th>
                <th><h6>latitude</h6> </th>
                <th> <h6>longitude</h6></th>
                <th><h6>Date Seen at Health Facility</h6></th>
                <th><h6>Date of onset of Disease</h6></th>
                <th> <h6>Presenting Clinical Feature</h6></th>
                <th> <h6>Specify additional clinical featu</h6></th>
                <th><h6>Dehydration status of the Patient</h6></th>
                <th> <h6>Is sample taken for the patient?</h6></th>
                <th> <h6>If yes, Date Specimen collected</h6></th>
                <th> <h6>lab test do not done specify the reason</h6></th>
                <th><h6>what type of test done</h6></th>
                <th><h6>test type is RDT or Culture, test Result</h6></th>
                <th><h6>test type is Both (RDT & Culture), test result</h6></th>
                <th><h6>Patient(case) category</h6></th>
                <th><h6>Living status of the patient (Housing status)</h6></th>
                <th><h6>"other" living status, specify</h6></th>
                <th><h6>Does the patient has history of travel to cholera outbreak area</h6></th>
                <th><h6>If "yes" where region</h6></th>
                <th> <h6>Write Region</h6></th>
                <th><h6>Do the patient has exposure to the following risk area</h6></th>
                <th> <h6>If "Other" area please specify</h6></th>
                <th><h6>Does the patient has Contact history with Suspected / Confirmed Cholera patient</h6></th>
                <th><h6>If yes, contact address</h6></th>
                <th><h6>If other specify</h6></th>
                <th><h6>Types of food exposure five days before onset of illness (specify the types of food the client take 5 days before onset of illness)</h6></th>
                <th><h6>If "other" exposure please specify</h6></th>

                <th><h6>Main Water source</h6></th>
                <th> <h6>If other source please specify</h6></th>
                <th> <h6>Mode of the patient's arrival</h6></th>
                <th><h6>Referral Source (status) of the patient on arrival</h6></th>
                <th><h6>Patient's Care & treatment status (Modality)</h6></th>
                <th><h6>the patient is admitted to CTC, admission site (Name of HF)</h6></th>
                <th><h6>If "Other" CTC specify</h6></th>
                <th><h6>Date of Admission</h6></th>
                <th><h6>Date of Discharge</h6></th>
                <th><h6>Patient outcome</h6></th>
                <th><h6>the patient is referred</h6></th>
                <th> <h6>Date the patient referred</h6></th>
                <th><h6>Do the patient has any other Co-Morbidity</h6></th>
                <th> <h6>If yes, specify any co-morbidities</h6></th>
                <th> <h6>If Other, specify any Co-Morbidity</h6></th>
                <th><h6>Is there any complications secondary to Cholera</h6></th>
                <th><h6>List of complications</h6></th>
                <th><h6>If Other, specify any complications</h6></th>
                <th><h6>Nutritional Status</h6></th>
                <th><h6>MUAC for under five children</h6></th>
                <th><h6>Disinfection Status of the Household</h6></th>

                <th><h6>Oral Cholera vaccination status</h6></th>
                <th> <h6>Name of data collector</h6></th>
                <th> <h6>Phone Number of Data Collector</h6></th>
                <th><h6>file to be uploaded</h6></th>

              </tr>
            </thead>
            <tbody > 

              {records && records.map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.startDate.slice(0,10)}</h6></th>
                  <th ><h6>{filer.pname}</h6></th>
                  <th ><h6>{filer.MRN}</h6></th>
                  <th><h6>{filer.Age}</h6></th>
                  <th><h6>{filer.Sex}</h6></th>
                  <th><h6>{filer.Pregnancy}</h6></th>
                  <th ><h6>{filer.PPhone}</h6></th>
                  <th ><h6>{filer.PRegion}</h6></th>
                 
                  <th><h6>{filer.PSubCity}</h6></th>
                  <th><h6>{filer.PWoreda}</h6></th>
                  <th><h6>{filer.pTWoreda}</h6></th>
                  <th ><h6>{filer.SpecificA}</h6></th>
                  <th><h6>{filer.Ketena}</h6></th>
                  <th><h6>{filer.HNumber}</h6></th>
                  <th><h6>{filer.POccupation}</h6></th>
                  <th ><h6>{filer.TPOccupation}</h6></th>
                  <th ><h6>{filer.HRegion}</h6></th>
                  <th><h6>{filer.HTRegion}</h6></th>
                  <th><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.THSubCity}</h6></th>
                  <th ><h6>{filer.HWoreda}</h6></th>
                  <th ><h6>{filer.HFTworeda}</h6></th>
                  <th><h6>{filer.HFName}</h6></th>
                  <th><h6>{filer.HFTName}</h6></th>
                  <th><h6>{filer.latitude}</h6></th>
                  <th ><h6>{filer.Longitude}</h6></th>
                  <th><h6>{filer.DSHfacility.slice(0,10)}</h6></th>
                  <th><h6>{filer.ODisease.slice(0,10)}</h6></th>
                  <th><h6>{filer.PClinical}</h6></th>
                  <th ><h6>{filer.TPClinical}</h6></th>
                  <th ><h6>{filer.Dehydration}</h6></th>
                  
                  <th><h6>{filer.Sample}</h6></th>
                  <th><h6>{filer.DSample}</h6></th>
                  <th ><h6>{filer.DTSample}</h6></th>
                  
                  <th ><h6>{filer.Ttest}</h6></th>
                  <th><h6>{filer.RDTTtest}</h6></th>
                  <th><h6>{filer.RTTtest}</h6></th>
                  
                 
                  <th ><h6>{filer.Ccategory}</h6></th>
                  <th><h6>{filer.PHstatus}</h6></th>
                  <th><h6>{filer.TPHstatus}</h6></th>
                  <th><h6>{filer.Travel}</h6></th>
                  <th ><h6>{filer.TTravel}</h6></th>
                  <th><h6>{filer.TTTravel}</h6></th>
                  <th><h6>{filer.Priskarea}</h6></th>
                  <th><h6>{filer.TPriskarea}</h6></th>
                  <th><h6>{filer.PChistory}</h6></th>
                  <th><h6>{filer.TPChistory}</h6></th>
                  <th ><h6>{filer.TTPChistory}</h6></th>

                  <th ><h6>{filer.Foodexposure}</h6></th>
                  <th><h6>{filer.TFoodexposure}</h6></th>
                  <th><h6>{filer.WaterS}</h6></th>
                  <th><h6>{filer.TWaterS}</h6></th>
                  <th ><h6>{filer.PModeA}</h6></th>
                  <th ><h6>{filer.Referral}</h6></th>
                 
                  <th><h6>{filer.Treatment}</h6></th>
                  <th><h6>{filer.ACTC}</h6></th>
                  <th ><h6>{filer.TACTC}</h6></th>
                  <th><h6>{filer.Adate.slice(0,10)}</h6></th>
                  <th><h6>{filer.Ddate.slice(0,10)}</h6></th>
                  <th><h6>{filer.Outcome}</h6></th>
                  <th><h6>{filer.TOutcome}</h6></th>
                  <th><h6>{filer.Rdate.slice(0,10)}</h6></th>
                  <th ><h6>{filer.CoMorbidity}</h6></th>
                  <th><h6>{filer.TCoMorbidity}</h6></th>
                  <th ><h6>{filer.TTCoMorbidity}</h6></th>
                  
                  <th><h6>{filer.STTCoMorbidity}</h6></th>
                  <th><h6>{filer.LComplication}</h6></th>
                  <th ><h6>{filer.Complication}</h6></th>
                 
                  <th><h6>{filer.Nutrition}</h6></th>
                  <th><h6>{filer.MUAC}</h6></th>
                  <th><h6>{filer.Disinfection}</h6></th>
                  <th ><h6>{filer.Vaccination}</h6></th>
                  <th><h6>{filer.DCName}</h6></th>
                  <th><h6>{filer.Phone}</h6></th>
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

        <div className="border border-black " ref={CHOLERARPatientINFO}>
        <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Cholera Additional Patient related Information </h4>
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
    <div ref={conponentPDF} style={{width:'50%'}}>
    <table className='w-100 h-50 table-responsive  table light padding text-sm-left Table' id="table-to-xlss" >
    <thead className='text-sm-left'>
              <tr>
                <th><h6>Regular working (staying) place of the patient? (Specify)</h6></th>
                <th><h6>Monthly average family Income (birr)</h6></th>
                <th><h6>Religion</h6> </th>
                <th> <h6>Educational status</h6></th>
                <th><h6>Family size (including the patient)</h6></th>
                <th><h6>Number of under five children in family?</h6></th>
                <th> <h6>Do you have any information about cholera disease?</h6></th>
                <th><h6>If yes, what do you know?</h6></th>
                <th><h6>If the answer for the above question is other, specify.</h6></th>
                <th><h6>Is there any elderly/bed ridden/comorbid family</h6></th>
                <th><h6>If yes, number</h6></th>
                <th><h6>Are there any family members with similar complaints?</h6></th>
                <th><h6>If yes did he/she visit health facility for treatment?</h6></th>
                <th><h6>Is there a latrine in the premise (residency area/Compound) of the patient?</h6> </th>
                <th> <h6>neonate or child full name of mother and father</h6></th>
                <th><h6>If yes, what type of latrine the patient and his/her family members are using?</h6></th>
                <th><h6>Latrine utilization status</h6></th>
                <th> <h6>Is there a leakage from the latrines to the immediate environment?</h6></th>
                <th><h6>Is there open defecation practice in the surrounding or neighborhood? (Please observe the immediate environment)</h6></th>
                <th><h6>Is there proper waste disposal and collection site in the vicinity?</h6></th>
                <th><h6>Are there flies in the residential environment? Observe</h6></th>
                <th><h6>During your observation, is the environment clean/hygienic?</h6></th>
                <th><h6>How is hand washing practices of the patient and his family at critical times (Before/after eating, after toilets, after caring for children, before/after food preparation etc )</h6></th>
                <th><h6>Any other additional observations to be documented</h6></th>
                <th><h6>Any team recommendations and interventions requested by team</h6></th>
                
               
             

              </tr>
            </thead>
            <tbody > 
              {records && records.map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.WStaying}</h6></th>
                  <th ><h6>{filer.Income}</h6></th>
                  <th><h6>{filer.Religion}</h6></th>
                  <th><h6>{filer.TReligion}</h6></th>
                  <th><h6>{filer.Educational}</h6></th>
                  <th ><h6>{filer.FamilyS}</h6></th>
                  <th ><h6>{filer.UnderF}</h6></th>
                  <th><h6>{filer.Information}</h6></th>
                  <th><h6>{filer.TInformation}</h6></th>
                  <th><h6>{filer.TTInformation}</h6></th>
                  <th ><h6>{filer.CoMorbidFM}</h6></th>
                  <th><h6>{filer.TsetCoMorbidFM}</h6></th>
                  <th><h6>{filer.SimilarC}</h6></th>
                  <th><h6>{filer.TreatmentF}</h6></th>
                  <th><h6>{filer.Latrine}</h6></th>
                  <th ><h6>{filer.TLatrine}</h6></th>
                  <th><h6>{filer.LatrineU}</h6></th>
                  <th><h6>{filer.Lenvironment}</h6></th>
                  <th><h6>{filer.Odefecation}</h6></th>
                  <th ><h6>{filer.WasteDisposal}</h6></th>
                  <th ><h6>{filer.Flies}</h6></th>
                  <th><h6>{filer.Hygienic}</h6></th>
                  <th ><h6>{filer.HandWashing}</h6></th>
                  <th><h6>{filer.Observations}</h6></th>
                  <th><h6>{filer.Recommendations}</h6></th>
                  
                  
                  

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

       
        <div className="border border-black" ref={CHOLERAContactINFO}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Cholera Add Contact trace information</h4>
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
        <div ref={conponentPDF} style={{width:'50%'}}>
    <table className='w-100 h-50 table-responsive  table light padding text-sm-left Table' id="table-to-xlsy" >
    <thead className='text-sm-left'>
              <tr>
                <th><h6>Name of Patient</h6></th>
                <th><h6>Contact Name</h6> </th>
                <th><h6>Contact Sex </h6></th>
                <th> <h6>Contact Age</h6></th>
                <th><h6>Last Contact Date</h6></th>
                <th><h6>Enrolment date </h6></th>
                <th> <h6>Country of Origin </h6></th>
                <th><h6>Patient Residency Region</h6></th>
                <th><h6> Residency Region</h6></th>
                <th><h6>Patient Zone | Sub City</h6></th>
                <th><h6>District</h6></th>
                <th><h6>Kebele/Got</h6> </th>
                <th><h6>Contact House Number</h6></th>
                <th> <h6>Phone Number</h6></th>
                <th><h6>Latitude</h6></th>
                <th><h6>Longitude</h6></th>
                <th> <h6>Contact Current Occupation</h6></th>
                <th> <h6>other Occupation</h6></th>
                <th><h6>Place of work</h6></th>
                <th><h6>Type of contact</h6></th>
                <th><h6>Syptomatic Contact</h6></th>
                <th><h6>Expected date to Discharge</h6> </th>
                <th><h6>Outcome</h6></th>
                <th> <h6>Age Category</h6></th>
                <th><h6>Epi week</h6></th>
                <th><h6>Tracer Team</h6></th>
                <th> <h6>Remark</h6></th>
                
              </tr>
            </thead>
            <tbody > 
              {records && records.map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.ppname}</h6></th>
                  <th ><h6>{filer.Cname}</h6></th>
                  <th><h6>{filer.CSex}</h6></th>
                  <th><h6>{filer.CAge}</h6></th>
                  <th><h6>{filer.LContactDate.slice(0,10)}</h6></th>
                  <th ><h6>{filer.EnrolmentDate.slice(0,10)}</h6></th>
                  <th ><h6>{filer.CRegion}</h6></th>
                  <th><h6>{filer.TCRegion}</h6></th>
                  <th><h6>{filer.CSubCity}</h6></th>
                  <th ><h6>{filer.HSubCity}</h6></th>
                  <th><h6>{filer.District}</h6></th>
                  <th><h6>{filer.CKebele}</h6></th>
                  <th><h6>{filer.CHNumber}</h6></th>
                  <th ><h6>{filer.CPhone}</h6></th>
                  <th ><h6>{filer.CLatitude}</h6></th>
                  <th><h6>{filer.Longitude}</h6></th>
                  <th><h6>{filer.CLongitude}</h6></th>
                  <th ><h6>{filer.COccupation}</h6></th>
                  <th><h6>{filer.TCOccupation}</h6></th>
                  <th><h6>{filer.Pwork}</h6></th>
                  <th><h6>{filer.Tcontact}</h6></th>
                  <th ><h6>{filer.Syptomatic}</h6></th>
                  <th ><h6>{filer.ExpectedDate.slice(0,10)}</h6></th>
                  <th><h6>{filer.COutcome}</h6></th>
                  <th><h6>{filer.AgeCategory}</h6></th>
                  <th ><h6>{filer.EpiWeek}</h6></th>
                  <th><h6>{filer.TracerTeam}</h6></th>
                  <th><h6>{filer.CRemark}</h6></th>
                  
                  
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

    <div className="border border-black" ref={CHOLERARPExposureriskfactor}>
    <h4 className='border border-secondary bgcoll text-white text-center rounded '>Addis Ababa Public Health Emergency Managment Cholera Exposure/risk factor related information</h4>
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
    <div ref={conponentPDF} style={{width:'50%'}}>
    <table className='w-100 h-50 table-responsive  table light padding text-sm-left Table' id="table-to-xlss" >
    <thead className='text-sm-left'>
              <tr>
                <th><h6>Did the patient drink holy water ?</h6></th>
                <th><h6>If the response for the above question is yes, mention specific location of the holy water?</h6></th>
                <th><h6>If the response for the above question is yes, mention specific location of the holy water?specific location What types of containers used to store water for Food preparation?</h6> </th>
                <th> <h6>If container for food preparation water is other, specify.</h6></th>
                <th><h6>List all types of foods consumed during the</h6></th>
                <th><h6>Cooking status of the food consumed during the ?</h6></th>
                <th> <h6>Did the patient consume leftover food during the ?</h6></th>
                <th><h6>If yes, specify the source & location of leftover food consumed (at home, Restaurant, elsewhere....)</h6></th>
                <th><h6>Was the patient consumed any food other than at home during the </h6></th>
                <th><h6>If yes for the above question, where was it consumed from?</h6></th>
                <th><h6>If yes, specify the actual location of food source you have consumed from out side</h6></th>
                <th><h6>Did the patient consume raw food?</h6></th>
                <th><h6>If yes, was the food sufficiently washed?</h6></th>
                <th><h6>If yes to the above question, what was the source of water for washing?</h6> </th>
                <th> <h6>If other, specify source of water used to wash raw food?</h6></th>
                <th><h6>Was the water consumed from outside(other than home)</h6></th>
                <th><h6>If yes, What is the source of water you consumed?</h6></th>
                <th> <h6>f Yes, specify the actual location where you have consumed water outside.</h6></th>
                <th><h6>Do you treat (boil, add water guard, etc.) water before use?</h6></th>
                <th><h6>What types of containers used to store drinking water?</h6></th>
                <th><h6>If the container for drinking water is other, specify it</h6></th>
               
              </tr>
            </thead>
            <tbody > 
              {records && records.map((filer, index) => {
                return <tr key={index}>
                    <th><h6>{filer.Holywater}</h6></th>
                  <th ><h6>{filer.THolywater}</h6></th>
                  <th><h6>{filer.FContainers}</h6></th>
                  <th><h6>{filer.TFContainers}</h6></th>
                  <th><h6>{filer.LastFiveDaysF}</h6></th>
                  <th ><h6>{filer.Cooking}</h6></th>
                  <th ><h6>{filer.LeftoverFood}</h6></th>
                  <th><h6>{filer.TLeftoverFood}</h6></th>
                  <th><h6>{filer.OThome}</h6></th>
                  <th><h6>{filer.TOThome}</h6></th>
                  <th ><h6>{filer.ActualLocation}</h6></th>
                  <th><h6>{filer.RawFood}</h6></th>
                  <th><h6>{filer.TRawFood}</h6></th>
                  <th><h6>{filer.TRawFoodwater}</h6></th>
                  <th><h6>{filer.TTRawFoodwater}</h6></th>
                  <th ><h6>{filer.WaterConsumed}</h6></th>
                  <th><h6>{filer.TWaterConsumed}</h6></th>
                  <th><h6>{filer.TTWaterConsumed}</h6></th>
                  <th><h6>{filer.WaterTreat}</h6></th>
                  <th ><h6>{filer.DContainers}</h6></th>
                  <th ><h6>{filer.TDContainers}</h6></th>
                  
                  
                  

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
        <p class="text-center text-secondary border border-secondary bg-warning p-1 mb-1 w-50">CHOLERA OUTBREAK TRAINED</p>
      <LineChart
          width={800}
          height={300}
          data={dataCholeraLine}
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
    <p class="text-center text-secondary border border-secondary bg-warning p-1 mb-1 w-50">CHOLERA OUTBREAK PATIENT BY OCCUPATION</p>
        <BarChart
          width={800}
          height={300}
          data={dataocupation}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="ocupation" />
          <YAxis />
          <Tooltip />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
          <Bar dataKey="Number_of_Worker" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />

        </BarChart>
        </th>
        <th>
        <p class="text-center text-secondary border border-secondary bg-warning p-1 mb-1 w-50">CHOLERA OUTBREAK PATIENT BY GENDER</p>
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
        <p class="text-center text-secondary border border-secondary bg-warning p-1 mb-1 w-50">CHOLERA OUTBREAK PATIENT BY PREGNANCY STATUS</p>
        <PieChart width={800} height={400}>
      <Pie
        activeIndex={activeIndex}
        activeShape={renderActiveShape}
        data={dataAge}
        cx={200}
        cy={200}
        innerRadius={60}
        outerRadius={80}
        fill="#8884d8"
        dataKey="Number_of_Worker"
        onMouseEnter={onPieEnter}
      />
      <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={style} />
    </PieChart>
        </th>

    <th>
    <p class="text-center text-secondary border border-secondary bg-warning p-1 mb-1 w-50">CHOLERA OUTBREAK PATIENT BY SUBCITY</p>
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

export default Cholera_Report

