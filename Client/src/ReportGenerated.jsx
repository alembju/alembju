import React, { useState, useEffect, useRef } from "react";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
//import XLSX from 'xlsx'
//import PrintIcon from '@material-ui/icons/Print'
import axios from 'axios'
import { useReactToPrint } from "react-to-print";
function ReportGenerated() {
    const conponentPDF= useRef();
    const [userData, setUserdata]= useState([]);
    const[users, getUser] = useState([])

     const generatePDF= useReactToPrint({
       content: ()=>conponentPDF.current,
        documentTitle:"Userdata",
        onAfterPrint:()=>alert("Data saved in PDF")
    });
    useEffect(() => {
      axios.get('http://localhost:3000/fetching')
      //.then(Response => Response.json())
      .then(users =>getUser(users.data)) 
      .catch(erer => console.log(erer))
      
    } , [])
    //////////////////////////////////////////////////////////////
   /* const downloadExcel = () => {
      const newData = users.map(row => {
        delete row.tableData
        return row
      })
      const workSheet = XLSX.utils.json_to_sheet(newData)
      const workBook = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(workBook, workSheet, "students")
      //Buffer
      XLSX.write(workBook, { bookType: "xlsx", type: "buffer" })
      //Binary string
      XLSX.write(workBook, { bookType: "xlsx", type: "binary" })
      //Download
      XLSX.writeFile(workBook, "StudentsData.xlsx")
  
  
    }
    const downloadPdf = () => {
      const doc = new jsPDF()
      doc.text("Student Details", 20, 10)
      doc.autoTable({
        theme: "grid",
        users: users.map(col => ({ ...col, dataKey: col.filer })),
        body: users
      })
      doc.save('table.pdf')
    }*/

    /////////////////////////////////////////////////////////////

  return (
    <div><div className='d-flex bg-primary justify-content-center align-items-center vh-0'>
      <div className='w-100 bg-white rounded p-3'>
        <h3>Send Request To The Selected Data </h3>
        <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Export Data to Excel Sheet"/>
        <div ref={conponentPDF} style={{width:'100%'}}>
          <table className=' table light padding' id="table-to-xls">
            <thead>
              <tr>
                <th>organization name</th>
                <th>title</th>
                <th>principal name </th>
                <th>Comments </th>
                <th>Email </th>
                <th>Title </th>
                <th>File </th>
              </tr>
            </thead>
            <tbody>
              {users.map((filer, index) => {
                return <tr key={index}>
                  <th>{filer.orgname}</th>
                  <th>{filer.title}</th>
                  <th>{filer.principal}</th>
                  <th>{filer.comments}</th>
                  <th>{filer.email}</th>
                  <th>{filer.Title}</th>
                  <th>{filer.file}</th>
                  
                </tr>;
              })}
            </tbody>
          </table>
          </div>
          <div className="d-grid d-md-flex justify-content-md-end mb-3">
      <button className="btn btn-success" onClick={generatePDF}>PDF</button>
    </div>
    
        </div>
      </div>
    </div>
  )
}

export default ReportGenerated