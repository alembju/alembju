import { useState } from "react"
import React  from 'react'
import axios from 'axios';
import { useEffect } from 'react'
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import ReactPaginate from 'react-paginate';
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";


pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
  ).toString();

function RequestList() {
    const conponentPDF= useRef();
    const[Data,setdata]= useState([])
  const[records,setrecords] =useState([])

const navigate = useNavigate()

  const generatePDF= useReactToPrint({
    content: ()=>conponentPDF.current,
     documentTitle:"Userdata",
     onAfterPrint:()=>alert("Data saved in PDF")
    });

  
  
  useEffect(() => {
  axios.get("http://localhost:3000/get-requistlist")
  .then(res => {
   setdata(res.data)
   setrecords(res.data);
  })
  .catch(err => console.log(err));
 }, [])
 const Filter = (event) => {
   setrecords(Data.filter(f => f.Name .toLowerCase().includes(event.target.value)))
 }
 const FilterName = (event) => {
  setrecords(Data.filter(f => f.phone == (event.target.value)))
}
const FilterPhone = (event) => {
  setrecords(Data.filter(f => f.emaill .toLowerCase().includes(event.target.value)))
}
const FilterEmail = (event) => {
  setrecords(Data.filter(f => f.email .toLowerCase().includes(event.target.value)))
}
 /////////////////pagination//////
 const [values,setValues]=useState([])
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
 //////////////////////////// link component selection///////
 const RequestListLINELIST = useRef(null);

 const Chart = useRef(null)

 const scrollToSection = (elementRef) => {
   window.scrollTo({
     top: elementRef.current.offsetTop,
     behavior: "smooth",
   });
 };
  return (
    <><div className='w-100 h-50 BgcolorAdmin rounded p-0  border border-secondary-500 mb-3 p-3 '>
      <div className="border border-secondary-500 " ref={RequestListLINELIST}>
        <h4 className='border border-secondary-500 bgcoll text-secondary-500 text-center rounded '>ADDIS ABABA PUBLIC HEALTH EMERGENCY MANAGMENT MEASELS LINE LIST </h4>
        <ReactHTMLTableToExcel
          id="test-table-xls-button"
          className="download-table-xls-button bgcoll text-white mb-3"
          table="table-to-xls"
          filename="tablexls"
          sheet="tablexls"
          buttonText="Export Data to Excel Sheet" />

        <input
          className="form-controll border border-secondary-500 w-25"
          type='text'
          placeholder="Filter by Name ..."
          onChange={Filter} />
        <input
          className="form-controll border border-secondary-500 w-25"
          type='text'
          placeholder="Filter by phone..."
          onChange={FilterName} />
        <input
          className="form-controll border border-secondary-500 w-25"
          type='text'
          placeholder="Filter by Owener emaill..."
          onChange={FilterPhone} />
        <input
          className="form-controll border border-secondary-500 w-25"
          type='text'
          placeholder="Filter by Aplicant email..."
          onChange={FilterEmail} />

      </div>
      <div className='Scrol-Table'>
        <div ref={conponentPDF} style={{ width: '100%' }}>

          <table className='w-100 table-responsive  table light padding text-sm-left Table' id="table-to-xls">
            <thead className='text-sm-left '>
              <tr>
                <th><h6>Full name of Uploader</h6></th>
                <th><h6>Phone Number of Uploader:</h6></th>
                <th><h6>Email Address of Uploader:</h6> </th>
                <th><h6>Reserch Title</h6></th>
                <th> <h6>Reaseon </h6></th>
                <th><h6>Affiliation</h6></th>
                <th><h6>Contact E-mail Adress</h6></th>
                <th> <h6>Intended use of the data </h6></th>
                <th><h6>Agreed  </h6></th>


              </tr>
            </thead>
            <tbody>
              {records && records?.map((filer, index) => {
                return <tr key={index}>
                  <th><h6>{filer.Name}</h6></th>
                  <th><h6>{filer.phone.slice(0, 10)}</h6></th>
                  <th><h6>{filer.emaill}</h6></th>
                  <th><h6>{filer.Title}</h6></th>
                  <th><h6>{filer.Reaseon}</h6></th>
                  <th><h6>{filer.Affiliation}</h6></th>
                  <th><h6>{filer.email}</h6></th>
                  <th><h6>{filer.messages}</h6></th>
                  <th><h6>{filer.isCheked}</h6></th>

                </tr>;
              })}
            </tbody>
          </table>
        </div>
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
        activeClassName="active" />
      <input placeholder="Set Limit" onChange={e => setLimit(e.target.value)} />
      <button onClick={changeLimit}>Set Limit</button>
    </div><button onClick={() => { navigate("/Adminipage"); } } className='btn btn-info border w-15 bgcoll text-white rounded-3 border border-danger mb-3'>Back</button></>
  )
}

export default RequestList