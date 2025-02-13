import React from 'react'
import './CholeraContact.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRef } from "react";
import DatePicker from "react-datepicker"

import ReactFlagsSelect from "react-flags-select";

function CholeraContactPopup(props) {
    const [showhide, setShowhide]=useState('');
    const [visible, setVisible]=useState(false);
  const [visibles, setVisibles]=useState(false);
  const [visite, setvisite]=useState(false);
  const [visitez, setvisitez]=useState(false);
  const [selected, setSelected] = useState("");
  const [startDate, setStartDate] = useState(new Date())
  const [currLocation, setCurrLocation] = useState({});
  const [CurrLocationJs, setCurrLocationJs] = useState({});
//show or hide selection box//
   //dropdowen//
   const handleshowhide=(event)=>{
    const getuser = event.target.value;    
    setShowhide(getuser);

  }
  //GPS//
  useEffect(() => {
    getLocation();
    getLocationJs();
  }, []);

  const getLocation = async () => {
    const location = await axios.get("https://ipapi.co/json");
    setCurrLocation(location.data);
  };

  const getLocationJs = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      const { latitude, longitude } = position.coords;
      setCurrLocationJs({ latitude, longitude });
    });
  };
  return (
    <div>
        <div className='bgCC'>
                <div className='popupCC'>
                    <span className='close' onClick={()=>props.close(false)}>x</span>
                    <span className='title'>Add Contact trace information<br></br>
                    <div className=' col bg-light rounded border border-danger vh-1 text-dark p-4'>
                    <h4 className='border border-secondary bgcoll text-white rounded text-center'>Add Contact trace information</h4>
          <table className='Scrol-Table table-responsive'>
        <tr className='border border-secondary'>
        <th>
                <div className='mb-2'>
                <h6><label htmlFor="email"> Name of Patient</label>
                  <input type="text" placeholder=" Name of Patient" autoComplete="off" name=" Name of Patient" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setpname(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Contact Name</label>
                  <input type="text" placeholder=" Name of Patient" autoComplete="off" name=" Name of Patient" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setCname(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Sex</label><br></br>
                 <th><h6> Male</h6> <input type="radio" name='Sex' value='Male'onClick={ ()=>setVisible(true)} onChange={(e) => setSex(e.target.value)} /></th>
                 <th><h6>Female</h6><input type="radio" name='Sex' value='Female'onClick={ ()=>setVisible(false)} onChange={(e) => setSex(e.target.value)} /></th>
                 </h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Age</label>
                  <input type="Decimal" placeholder="Age" autoComplete="off" name="Age" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setAge(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-0 '>
                <h6><label htmlFor="email">Last Contact Date</label><br></br>
                  <DatePicker selected={startDate} onChange={(date) => setLContactDate(date)} 
                    dateFormat='dd/mm/yyyy'                    
                    maxDate={new Date()}
                    isClearable 
                    readOnly                 
                  />
                  </h6>
                </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className='mb-0 '>
                <h6><label htmlFor="email">Enrolment date</label><br></br>
                  <DatePicker selected={startDate} onChange={(date) => setEnrolmentDate(date)} 
                    dateFormat='dd/mm/yyyy'                    
                    maxDate={new Date()}
                    isClearable 
                    readOnly                 
                  />
                  </h6>
                </div>
              </th>
              <th>
              <h6><label htmlFor="email">Country of Origin</label><br></br>
              <ReactFlagsSelect
                    selected={selected}
                    onSelect={(code) => setSelected(code)}
                />;</h6>
              </th>
              <th>
                <div className='mb-2'>
                <h6> <label htmlFor="email">Patient Residency Region</label>
                  <select type="text" className='form-control rounded-2 w-50' onChange={(e)=> setPRegion(e.target.value)}>
                    <option defaultValue="Addis Ababa">Addis Ababa</option>
                    <option value="Oromya">Oromya</option>
                    <option value="Dire Dawa"> Dire Dawa</option>
                    <option value="Afar Region">Afar Region</option>
                    <option value="Amhara Region">Amhara Region</option>
                    <option value="Benishangul-Gumuz Region">Benishangul-Gumuz Region</option>
                    <option value="Gambela Region">Gambela Region</option>
                    <option value="Harari Region">Harari Region</option>
                    <option value="Sidama Region">Sidama Region</option>
                    <option value="Somali Region">Somali Region</option>
                    <option value="South Ethiopia Regional State">South Ethiopia Regional State</option>
                    <option value="South West Ethiopia Peoples' Region">South West Ethiopia Peoples' Region</option>
                    <option value="Tigray Region">Tigray Region</option>
                    <option value="2">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='2' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Write Residency Region</label>
                  <input type="text" placeholder="Name of Region" autoComplete="off" name="Name of Region" className='form-control rounded-2 w-50'
                    onChange={(e) => setWRegion(e.target.value)} /></h6>
                    </div>
                  )}           
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Patient Zone | Sub City</label>
                  <select type="text" className='form-control rounded-2 w-50' onChange={(e)=> setPSubCity(e.target.value)}>
                    <option value="Akaki Sub City">Akaki Sub City</option>
                    <option value="Addis Ketema Sub city">Addis Ketema Sub city</option>
                    <option value="Arada Sub city">Arada Sub city</option>
                    <option value="Bole sub city">Bole sub city</option>
                    <option value="Gulele Sub city">Gulele Sub city</option>
                    <option value="kirkos sub city">kirkos sub city</option>
                    <option value="kolife keranio sub city">kolife keranio sub city</option>
                    <option value="Other">Nifas silik lafto sub city</option>
                    <option value="Nifas silik lafto sub city">lemi kura sub city</option>
                    <option value="lideta sub city">lideta sub city</option>
                    <option value="yeka sub city">yeka sub city</option>
                    
                  </select></h6>
                </div>
              </th>
              <th>
              <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">District</label></h6>
                  <input type="text" placeholder="District"  autoComplete="off" name="District" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Kebele/Got</label></h6>
                  <input type="number" placeholder="Kebele"  autoComplete="off" name="Kebele" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Contact House  Number </label>
                  <input type="number" placeholder="House Numbe Name" autoComplete="on" name="House Numbe" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setHNumber(e.target.value)} /></h6>
                </div>
              </th>
              
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Phone Number</label>
                  <input type="Number" placeholder="Enter Phone Number" autoComplete="off" name="Phone Number" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setPPhone(e.target.value)} /></h6>
                </div>
              </th>
              <th> <div className='mb-0'>
                <h6><label htmlFor="email">GPS Coordinate</label>
                  <p onChange={(e) => setLatitude(e.target.value)}>Latitude: {currLocation.latitude}</p>
                  <p onChange={(e) => setLongitude(e.target.value)}>Longitude: {currLocation.longitude}</p>
                  <p>City: {currLocation.city}</p></h6>
              </div>
              </th>
              <th>
                <div className=''>
                <h6><label htmlFor="email">Contact Current Occupation</label>
                  <select type="text" className='form-control rounded-3 w-70' onChange={(e)=>(handleshowhide(e),setPOccupation(e.target.value))}  >
                    <option value="Daily laborer">Daily laborer</option>
                    <option value="Driver">Driver</option>
                    <option value="Employed (Private & Government)">Employed (Private & Government)</option>
                    <option value="No Job">No Job</option>
                    <option value="Private (Self Employed)">Private (Self Employed)</option>
                    <option value="Street Children">Street Children</option>
                    <option value="Student">Student</option>
                    <option value="Petty Trader (ጉልት ሻጭ)">Petty Trader (ጉልት ሻጭ)</option>
                    <option value="Food Handler">Food Handler</option>
                    <option value="House wife">House wife</option>
                    <option value="20">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='20' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">If other, Specify Occupation</label></h6>
                  <input type="text" placeholder="Occupation.."  autoComplete="off" name="Occupation" className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setTCOccupation(e.target.value)} />
                    </div>
                  )}           
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
              <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Place of work</label></h6>
                  <input type="text" placeholder="Occupation.."  autoComplete="off" name="Occupation" className='form-control justify-center rounded-lg w-70 text-3x1'
                    onChange={(e) => setPwork(e.target.value)} />
                    </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Type of contact</label>
                  <select type="text" className='form-control rounded-3 w-50' onChange={(e)=>(handleshowhide(e),setTcontact(e.target.value))}  >
                    <option value="Household">Household</option>
                    <option value="Comman Exposure">Comman Exposure</option>
                  </select></h6>
                </div>
                </th>
                <th>
                <div className='mb-2 form-check-inline'>
                <h6> <label htmlFor="email">Syptomatic Contact</label><br></br>
                  <th><h6>Yes</h6><input type="radio" name='Contact' value='Yes' onClick={ ()=>setvisit(true)} onChange={(e) =>setSyptomatic(e.target.value)} /> </th>
                  <th><h6>No</h6><input type="radio" name='Contact' value='No'onClick={ ()=>setvisit(false)} onChange={(e) => setSyptomatic(e.target.value)} /> </th></h6>
                </div>
                </th>
                <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Expected date to Discharge</label><br></br>
                  <DatePicker selected={startDate} onChange={(date) => setExpectedDate(date)} 
                    dateFormat='dd/mm/yyyy'                    
                    maxDate={new Date()}
                    isClearable
                   /></h6>
                </div>
              </th>
              <th>
                <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Outcome</label></h6>
                  <input type="text" placeholder="Outcome"  autoComplete="off" name="Outcome" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
              </th>
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Age Category</label></h6>
                  <input type="text" placeholder="Age Category"  autoComplete="off" name="Age Category" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
              </th>
              <th>
                <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Epi week</label></h6>
                  <input type="number" placeholder="Epi week"  autoComplete="off" name="Epi week" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
              </th>
              <th>
                <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Tracer Team</label></h6>
                  <input type="text" placeholder="Tracer Team.."  autoComplete="off" name="Tracer Team" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
              </th>
              <th>
                <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">Remark</label></h6>
                  <input type="text" placeholder="Remark"  autoComplete="off" name="Remark" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setpTWoreda(e.target.value)} />
                    </div>
              </th>

              </tr>
              </table>
        </div>
                    </span>
                </div>
            </div>
    </div>
  )
}

export default CholeraContactPopup