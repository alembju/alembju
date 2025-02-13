import React from "react";
import { useEffect, useState } from 'react'
import "./App.css";
import { useRef } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import TabPane from "./tab-pane";
import TabsComponent from "./TabsComponent";
import ReactPaginate from 'react-paginate';

export default function TabsPage() {
  const navigate = useNavigate()
  const[isCheked,setisCheked] = useState(false)

  const handleCheckboxChange = () =>{
    setisCheked(!isCheked)
   }
   const [Name, setName] = useState("");
   const [emaill, setemaill] = useState("");
   const [Affiliation, setAffiliation] = useState("");
   const [email, setEmails] = useState("");
  const [phone, setphone] = useState("");
  const [Title, setTitle] = useState("");
  const [Reaseon, setReaseon] = useState("");
  const [messages, setMessage] = useState("");
  const [file, setFile] = useState(null);
  ////////////////////handle submit/////////
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
  formData.append("Name" , Name)
  formData.append("phone" , phone)
  formData.append("emaill" , emaill)
  formData.append("Title" , Title)
  formData.append("Reaseon" , Reaseon)
  formData.append("Affiliation" , Affiliation)
  formData.append("email", email)
  formData.append("messages", messages)
  formData.append("isCheked", isCheked)
 
   
  axios.post('http://localhost:3000/file-Request',formData)
  .then(res =>console.log(res))
  .catch(er=>console.log(er))
  alert('Recive your Request successfull !!')
  }
  ////////////////////////////handle submit////////////////

  ///////////////////////////selection option from mpngo/////////////
const [values,setValues]=useState([])
const [options,setOptions]=useState()

 useEffect(()=>{
  fetch("http://localhost:3000/fetching-option")
  .then((data)=>data.json())
  .then((val)=>setValues(val))
},[])

console.log(values,"values")
///////////////////////////////////////////////////////////////////////other tabs//////
const [toggleState,setToggleState] = useState()
const toggletab= (index) =>{
  setToggleState(index)
}
  
  return (
    <>
    <div className="Tabcontainer">
    <form onSubmit={handleSubmit}>
    <ul className="tabs active-tbs">
      <li className={toggleState == 1 ? "tabs active-tabs" : "tabs rounded-3"} onClick={() => toggletab(1)}>Requester Info</li>
      <li className={toggleState == 2 ? "tabs active-tabs" : "tabs"} onClick={() => toggletab(2)}>DataSet Information</li>
      <li className={toggleState == 3 ? "tabs active-tabs" : "tabs"} onClick={() => toggletab(3)}>Agreement</li>
    </ul>
    <div className="content-tabs">
      <div className={toggleState === 1 ? "active-content" : "content tab-content"}>
        <div className="tabchild">
      <h2>Requester Information</h2>
              <div className='mb-2 '>
                <label htmlFor="email"><strong>Full name of Uploader</strong></label>
                <input type="text" placeholder="Name" autoComplete="off" name="email" className='form-control rounded-1 w-50'
                  onChange={(e) => setName(e.target.value)} />
              </div>
              <div className='mb-2'>
                <label htmlFor="email"><strong>Phone Number of Uploader: </strong></label>
                <input type="number" placeholder="Enter Phone Number" autoComplete="off" name="email" className='form-control rounded-1 w-50'
                  onChange={(e) => setphone(e.target.value)} />
              </div>
              <div className='mb-2'>
                <label htmlFor="email"><strong>Email Address of Uploader:</strong></label>
                <input type="email" placeholder="email" autoComplete="off" name="email" className='form-control rounded-1 w-50'
                  onChange={(e) => setemaill(e.target.value)} />
              </div>
              <div>
              <label htmlFor="email"><strong>Official letter </strong></label>
              <input
                  type="file"
                  class="form-control w-50"
                  accept="application/pdf"
                  name='ResearchP' 
                   multiple={true}
                  required
                  onChange={(e) => setFile(e.target.files[0])}
                   />

              </div>
              </div>
              </div>

      <div className={toggleState === 2 ? " active-content" : "content"}>
      <div className="tabchild">
        <h2>DataSet Information</h2>

        <table className='table-responsive'>
                <tr>
                  <div>
                    <label><h5>Select Reserch Title</h5></label>
                    <select
                      id="Title"
                      placeholder="select the title"
                      value={Title}
                      onChange={(e) => setTitle(e.target.value)} className='form-control rounded-2 '>
                      <option value="">...Select Title ...</option>
                      {values.map((opts, i) => { return <option key={i}>{opts.Title}</option>; })}
                    </select>
                  </div>
                </tr>
                <tr>
                  <div className='mb-2'>
                    <h6><label htmlFor="email">Reaseon</label>
                      <select type="text" className='form-control rounded-0' onChange={e => setReaseon(e.target.value)}>
                        <option value="Select Reaseon...">Select Reaseon...</option>
                        <option value="For Program">For Program</option>
                        <option value="For Reserch">For Reserch</option>
                        <option value="Other">Other</option>
                      </select></h6>
                  </div>
                </tr>
                <tr>
                  <div className='mb-2'>
                    <h6><label htmlFor="email">Select Affiliation</label>
                      <select type="text" className='form-control rounded-0' onChange={e => setAffiliation(e.target.value)}>
                        <option value="Select Affiliation...">Select Affiliation...</option>
                        <option value="Acadamic Institution">Acadamic Institution</option>
                        <option value="International Organization">International Organization</option>
                        <option value="Other">Other</option>
                      </select></h6>
                  </div>
                </tr>
                <tr>

                  <div>
                    <label><h5>Select Contact E-mail Adress</h5></label>
                    <select id="recipient_email"
                      value={email}
                      placeholder="username@email.com"
                      onChange={(e) => setEmails(e.target.value)} className='form-control rounded-2 '>
                      <option value="">...Select E-mail ...</option>
                      {values.map((opts, i) => { return <option key={i}>{opts.email}</option>; })}
                    </select>
                  </div>
                </tr>
                <tr>
                  <div>
                    <label><h5>Intended use of the data...</h5></label>
                    <textarea
                      id="message"
                      value={messages}
                      onChange={(e) => setMessage(e.target.value)}
                      className="block p-2.5 w-100 text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                      placeholder="Leave a comment to The Proposal..."
                    >
                    </textarea></div>
                </tr>

                
              </table>
              </div>
              </div>
      <div className={toggleState === 3 ? " active-content" : "content"}>
      <div className="tabchild">
        <h2>Agreement</h2>
        <div className="Scrol-Agreement"> <p className="Agreement">Terms and conditions
                The AACDMC provides the data to recipient solely for the research or evaluation, and publication or distribution described in the data request form or research proposal submitted to the research review committee and for no other purpose. Recipient may not publish or distribute, or conduct any other research or evaluation involving the data in any way, without making a request to and procuring the consent of the AACDMC regarding such other research or evaluation. Recipient agrees to use appropriate safeguards to protect the data from misuse and unauthorized access or disclosure, including, without limitation, maintaining adequate physical controls and password protections for any server or system on which the data may reside and taking any other measures reasonably necessary to prevent any use or disclosure of the data other than as provided in this agreement. Data recipient agrees to report (within ten (10) days of discovery) to the AACDMC any use or disclosure of the data set (or components) not provided for by this agreement, including without limitation, any disclosure of the data set (or components) to an unauthorized subcontractor. All data transferred to shall remain the property of AACDMC and shall be returned / destroyed upon termination of the agreements. No personal identifiers included in the data set. If and when the recipient produces a written work, including but not limited to a research report, that uses the shared data, AACDMC shall be acknowledged. This agreement is expressly made subject to all laws and regulations of the Federal Democratic Republic of Ethiopia, without regard to any choice of law principles. The terms and provisions of this agreement represent the entire understanding of the parties with respect to the subject matter of this agreement. The undersigned individuals represent that they are fully authorized to execute this agreement on behalf of the respective parties, perform the obligations under this agreement, and make all representations, warranties, and grants as set forth here in. If you disagree with any part of the terms then you may not access the service
              </p>
              </div><br />
             <div className="form-check-inline"> <input type='checkbox' checked={isCheked} value={"Agreed"} onChange={handleCheckboxChange} />Agreed</div> <br />
              <div>
              
                <NavLink to='/3'><button className='btn btn-info border w-15 bg-primary rounded-3 text-decoration-none'><h5>Previous</h5></button></NavLink>
                <button className='rounded-3 py-1 px-3 m-10 text-sm font-medium text-center text-dark rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-2 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800' onClick={handleSubmit}><h5>Send Request</h5></button>

              </div>
              </div>
      </div>
      </div>
      </form>
      <th> <button onClick={() => {navigate("/Dowenload")}} className='btn btn-info border w-100 bgcoll text-white rounded-3 border border-danger mb-3'>Back</button><br></br> </th>
      </div>
      
      </>
  );
}