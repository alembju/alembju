import React, { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from './Header'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'

export default function Dowenload() {
  const[users, getUser] = useState([])
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [items, setItems] = useState([]);
  const navigate = useNavigate();


  const getPdf = async () => {
    const result = await axios.get("http://localhost:3000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  /*const getImage = async () => {
    const result = await axios.get("http://localhost:3000/get-image");
    console.log(result);
    setAllImage(result.data.data);
  };
*/
 
  useEffect(() => {
    axios.get('http://localhost:3000/fetching')
    //.then(Response => Response.json())
    .then(users =>getUser(users.data)) 
    .catch(erer => console.log(erer))
    
  } , [])
  return (
    <><div><Header /></div><div className='d-flex bg-primary justify-content-center align-items-center vh-0'  >
      <div className='w-100 bg-white rounded p-3'  >
        <h3 className='border border-secondary bgcoll text-white text-center rounded '>Review & Send Your Request To US </h3>
        <div  >
          <table className=' table light padding' >
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
                  <th><Link to={`/DowenloadView/${filer._id}`} className="btn btn-sm btn-success me-2">View</Link></th>
                  <th><button onClick={() => {navigate("/TabsPage")}} className='btn btn-info border w-100 bgcoll rounded-5 mb-5 text-white'>Request</button> </th>
                </tr>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div></>
  );
}
