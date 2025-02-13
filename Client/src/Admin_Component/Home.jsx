
import React, { useEffect, useState } from "react";
import { BsFillArchiveFill, BsFillGrid3X3GapFill, BsPeopleFill, BsFillBellFill}from 'react-icons/bs'
 import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
 import { PieChart, Pie, Sector, } from 'recharts';
 import { pdfjs } from "react-pdf";

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
     <text x={x} y={y} fill="black" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
       {`${(percent * 100).toFixed(0)}%`},
       {`T=${value}`}
     </text>
   );
 };

function Home() {
  const [dataH, setDataH] = useState([]);
  const [dataL, setDataL] = useState([]);
  const [dataR, setDataR] = useState([]);
  const [searchQuery,setSearchQuery]=useState("")

  useEffect(() => {
    getAllMeseales();
  },[searchQuery]);

   //fetching all Meseales
   const getAllMeseales = () => {
    fetch(`http://localhost:3000/getAllUserH?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "MesealesData");
        setDataH(data.data);
      });
  };


  useEffect(() => {
    getAllUser();
  },[searchQuery]);

  //fetching all Login
  const getAllUser = () => {
    fetch(`http://localhost:3000/USERS?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "LoginData");
        setDataL(data.data);
      });
  };

  useEffect(() => {
    getAllUserRequest();
  },[searchQuery]);

  //fetching all Request
  const getAllUserRequest = () => {
    fetch(`http://localhost:3000/DatatRequest?search=${searchQuery}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "RequestData");
        setDataR(data.data);
      });
  };
  ///////////////////////////////////////////////////// reserch document number /////////////
  
const [datareserch, setDatareserch] = useState([]);
useEffect(() => {
  getAllreserch();
},[searchQuery]);

//fetching all reserch PDF number
const getAllreserch = () => {
  fetch(`http://localhost:3000/Masters?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "reserchData");
      setDatareserch(data.data);
    });
};


  ////////////////////////////////////////////////////////////////collumen graph user type///////////////////
 
const [dataUser, setDatadataUser] = useState([]);
useEffect(() => {
  getAlluser();
},[searchQuery]);

//fetching all cholera
const getAlluser = () => {
  fetch(`http://localhost:3000/Gete-User?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "UserData ");
      setDatadataUser(data.data);
    
    });
};
///////////////////////////Admin front///////////////////////////single record//////////////
const [dataAdmin, setDatadataAdmin] = useState([]);

useEffect(() => {
  getAllAdmin();
},[searchQuery]);

//fetching all cholera
const getAllAdmin = () => {
  fetch(`http://localhost:3000/Gete-Admin?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "AdminData ");
      setDatadataAdmin(data.data);
    
    });
};
///////////////////////////HFPhem front///////////////////////////single record//////////////
const [dataHFPhem, setDatadataHFPhem] = useState([]);

useEffect(() => {
  getAllHFPhem();
},[searchQuery]);

//fetching all cholera
const getAllHFPhem = () => {
  fetch(`http://localhost:3000/Gete-HFPhem?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "HFPhemData ");
      setDatadataHFPhem(data.data);
    
    });
};
///////////////////////////RegionalPhem front///////////////////////////single record//////////////
const [dataRegionalPhem, setDatadataRegionalPhem] = useState([]);

useEffect(() => {
  getAllRegionalPhem();
},[searchQuery]);

//fetching all cholera
const getAllRegionalPhem = () => {
  fetch(`http://localhost:3000/Gete-RegionalPhem?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "RegionalPhemData ");
      setDatadataRegionalPhem(data.data);
    
    });
};
///////////////////////////Reserch front///////////////////////////single record//////////////
const [dataReserch, setDatadataReserch] = useState([]);

useEffect(() => {
  getAllReserch();
},[searchQuery]);

//fetching all cholera
const getAllReserch= () => {
  fetch(`http://localhost:3000/Gete-Reserch?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "ReserchData ");
      setDatadataReserch(data.data);
    
    });
};
///////////////////////////IRB front///////////////////////////single record//////////////
const [dataIRB, setDatadataIRB] = useState([]);

useEffect(() => {
  getAllIRB();
},[searchQuery]);

//fetching all cholera
const getAllIRB= () => {
  fetch(`http://localhost:3000/Gete-IRB?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "IRBData ");
      setDatadataIRB(data.data);
    
    });
};

///////////////////////////SubCityPhem front///////////////////////////single record//////////////
const [dataSubCityPhem, setDatadataSubCityPhem] = useState([]);

useEffect(() => {
  getAllSubCityPhem();
},[searchQuery]);

//fetching all cholera
const getAllSubCityPhem= () => {
  fetch(`http://localhost:3000/Gete-SubCityPhem?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "SubCityPhemData ");
      setDatadataSubCityPhem(data.data);
    
    });
};
///////////////////////////Student front///////////////////////////single record//////////////
const [dataStudent, setDatadataStudent] = useState([]);

useEffect(() => {
  getAllStudent();
},[searchQuery]);

//fetching all cholera
const getAllStudent= () => {
  fetch(`http://localhost:3000/Gete-Student?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "StudentData ");
      setDatadataStudent(data.data);
    
    });
};

///////////////////////////////////////////////////cholera Risk Area data//////////////////////
const dataSystemUser  = [
{ UserType:'Admin', Number_of_User: parseInt(`${dataAdmin}`)},
{UserType:'RegionalPhem', Number_of_User: parseInt(`${dataRegionalPhem}`)}, 
{UserType:'HFPhem',Number_of_User:parseInt(`${dataHFPhem}`)},
{ UserType:'Reserch', Number_of_User: parseInt(`${dataReserch}`)},
{UserType:'IRB',Number_of_User: parseInt(`${dataIRB}`)},
{ UserType: 'dataSubCityPhem', Number_of_User: parseInt(`${dataSubCityPhem}`)},
{UserType:'dataStudent',Number_of_User: parseInt(`${dataStudent}`)},
{ UserType: 'User', Number_of_User: parseInt(`${dataUser}`)},]


 ///////////////////////////Reserch in PHD///////////////////////////single record//////////////
const [dataPHD, setdataPHD] = useState([]);

useEffect(() => {
  getAllPHD();
},[searchQuery]);

//fetching all Measles
const getAllPHD = () => {
  fetch(`http://localhost:3000/Gete-PHD?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "PHD ");
      setdataPHD(data.data);
    
    });
};
///////////////////////////Reserch in Msc///////////////////////////single record//////////////
const [dataMsc, setadataMsc] = useState([]);

useEffect(() => {
  getAllMsc();
},[searchQuery]);

//fetching all Measles
const getAllMsc = () => {
  fetch(`http://localhost:3000/Gete-Msc?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Msc ");
      setadataMsc(data.data);
    
    });
};
///////////////////////////Reserch in Bacheler///////////////////////////single record//////////////
const [dataBacheler, setdataBacheler] = useState([]);

useEffect(() => {
  getAllBacheler();
},[searchQuery]);

//fetching all Measles
const getAllBacheler = () => {
  fetch(`http://localhost:3000/Gete-Bacheler?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Bacheler ");
      setdataBacheler(data.data);
    
    });
};
///////////////////////////Reserch in Project///////////////////////////single record//////////////
const [dataProject, setdataProject] = useState([]);

useEffect(() => {
  getAllProject();
},[searchQuery]);

//fetching all Measles
const getAllProject = () => {
  fetch(`http://localhost:3000/Gete-Project?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Project ");
      setdataProject(data.data);
    
    });
};

///////////////////////////Reserch in Survey///////////////////////////single record//////////////
const [dataSurvey, setdataSurvey] = useState([]);

useEffect(() => {
  getAllSurvey();
},[searchQuery]);

//fetching all Measles
const getAllSurvey = () => {
  fetch(`http://localhost:3000/Gete-Survey?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Survey ");
      setdataSurvey(data.data);
    
    });
};
///////////////////////////Reserch in Other///////////////////////////single record//////////////
const [dataOther, setdataOther] = useState([]);

useEffect(() => {
  getAllOther();
},[searchQuery]);

//fetching all Measles
const getAllOther = () => {
  fetch(`http://localhost:3000/Gete-Other?search=${searchQuery}`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data, "Other ");
      setdataOther(data.data);
    
    });
};

  const reserchdata = [
    { name: 'PHD', Number_of_Reserch: parseInt(`${dataPHD}`)},
    { name: 'Msc', Number_of_Reserch: parseInt(`${dataMsc }`)},
    { name: 'Bacheler', Number_of_Reserch: parseInt(`${dataBacheler }`)},
    { name: 'Project', Number_of_Reserch: parseInt(`${dataProject}`)},
    {name: 'Survey', Number_of_Reserch: parseInt(`${dataSurvey}`)},
    { name: 'Other', Number_of_Reserch: parseInt(`${dataOther }`)},]
  ///////////////////////////////////////////////////MEASLES end////////////////////

    const data = [
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

      const style = {
        top: '50%',
        right: -15,
        transform: 'translate(0, -75%)',
        lineHeight: '24px',
      };

     

  return (
    <div className='main-container  BgcolorAdmin'>
     
        <div className='main-title'>
            <h3>DASHBOARD</h3>
        </div>

        <div className='main-cards'>
            <div className='card'>
                <div className='card-inner'>
                    <h3>USERS</h3>
                    <BsPeopleFill className='card_icon'/> 
                </div>
                <h3> <span 
                        style={{ position: "absolute", right: 10, top: 60, color: "rgb(11, 11, 11)" }}>
                        {searchQuery.length>0?`Records Found ${dataL.length}`:`Total  ${dataL.length}`} 
                      </span></h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>CATEGORIES</h3>
                    <BsFillGrid3X3GapFill className='card_icon'/>
                </div>
                <h3> <span 
                        style={{ position: "absolute", right: 10, top: 60, color: "rgb(11, 11, 11)" }}>
                        {searchQuery.length>0?`Records Found ${dataH.length}`:`Total  ${dataH.length}`} 
                      </span></h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Request</h3>
                    <BsFillArchiveFill className='card_icon'/>
                </div>
                <h3> <span 
                        style={{ position: "absolute", right: 10, top: 60, color: "rgb(11, 11, 11)" }}>
                        {searchQuery.length>0?`Records Found ${dataR.length}`:`Total  ${dataR.length}`} 
                      </span></h3>
            </div>
            <div className='card'>
                <div className='card-inner'>
                    <h3>Meta Data</h3>
                    <BsFillBellFill className='card_icon'/>
                    </div>
                <h3> <span 
                        style={{ position: "absolute", right: 10, top: 60, color: "rgb(11, 11, 11)" }}>
                        {searchQuery.length>0?`Records Found ${datareserch.length}`:`Total  ${datareserch.length}`} 
                      </span></h3>
            </div>
        </div>
        

        <div className='charts'>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart
            width={600}
            height={300}
            data={dataSystemUser}
            margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
            }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="UserType" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Number_of_User" fill="#8884d8" />
                
                </BarChart>
            </ResponsiveContainer>

          

            <ResponsiveContainer width="100%" height="100%">
            <PieChart width={500} height={300} >
                      <Pie
                        data={reserchdata}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={renderCustomizedLabel}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="Number_of_Reserch"
                      >
                        {data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Legend iconSize={5} layout="vertical" verticalAlign="Ri" wrapperStyle={style} />
                    </PieChart>
            </ResponsiveContainer>

            
                   

        </div>
        
    </div>
  )
}

export default Home