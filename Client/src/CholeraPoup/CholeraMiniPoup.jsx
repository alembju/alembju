import React from 'react'
import './CholeraPoup.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRef } from "react";

function CholeraMiniPoup(props) {
    const [showhide, setShowhide]=useState('');
    const [visible, setVisible]=useState(false);
  const [visibles, setVisibles]=useState(false);
  const [visite, setvisite]=useState(false);
  const [visitez, setvisitez]=useState(false);
  return (
    <div>
        <div className='bg'>
                <div className='popupC'>
                    <span className='close' onClick={()=>props.close(false)}>x</span>
                    <span className='title'>Patient related Information<br></br>
                    <tr className='border border-secondary p-4 mb-4'>
                    <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Regular working (staying) place of the patient? (Specify)</label>
                  <input type="text" placeholder="staying.." autoComplete="on" name="staying" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setWStaying(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Monthly average family Income (birr)</label>
                  <input type="number" placeholder="Income.." autoComplete="on" name="Income" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setIncome(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Religion</label>
                  <select type="text" className='form-control rounded-3 w-50' onChange={(e)=>(handleshowhide(e),setReligion(e.target.value))}  >
                    <option value="Orthodox">Orthodox</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Chatholic">Chatholic</option>
                    <option value="Protestant">Protestant</option>
                    <option value="20">Other</option>
                  </select></h6>
                </div>
              
                {
                  showhide==='20' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">If other, Religion</label></h6>
                  <input type="text" placeholder="Religion.."  autoComplete="off" name="Religion" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setTReligion(e.target.value)} />
                    </div>
                  )}           

              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Educational status</label>
                  <select type="text" className='form-control rounded-3 w-50' onChange={(e)=>(handleshowhide(e),setEducational(e.target.value))}  >
                    <option value="OrUnder age (if ﹤ 4yrs)thodox">Under age (if ﹤ 4yrs)</option>
                    <option value="Kinder Garden (KG)">Kinder Garden (KG)</option>
                    <option value="Primary (grade 1-8)">Primary (grade 1-8)</option>
                    <option value="Secondary (grade 9-10)">Secondary (grade 9-10)</option>
                    <option value="Preparatory (11-12)">Preparatory (11-12)</option>
                    <option value="Higher level (above grade 12)">Higher level (above grade 12)</option>
                   
                  </select></h6>
                </div>
                </th>
                </tr>
              <tr className='border border-secondary'>
                <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Family size (including the patient)</label>
                  <input type="number" placeholder="Family.." autoComplete="on" name="Family" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setFamilyS(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">Number of under five children in family?</label>
                  <input type="number" placeholder="under five.." autoComplete="on" name="under five" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setUnderF(e.target.value)} /></h6>
                </div>
              </th>
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Do you have any information about cholera disease?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='information' value='Yes'onClick={ ()=>setVisible(true)} onChange={(e) => setInformation(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='information' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setInformation(e.target.value)} /></th>
                 </h6>
                </div>
                {
                  visible && (
                    <div className='mb-2'>
                    <h6><label htmlFor="email">If yes, what do you know?</label>
                      <select type="text" className='form-control rounded-3 w-50' onChange={(e)=>(handleshowhide(e),setTInformation(e.target.value))}  >
                        <option value="Transmision way">Transmision way</option>
                        <option value="Severity">Severity</option>
                        <option value="Cause/Risk factors of the disease">Cause/Risk factors of the disease</option>
                        <option value="Prevention methods">Prevention methods</option>
                        <option value="Clinical features">Clinical features</option>
                        <option value="28">Other</option>
                      </select></h6>
                    </div>
                  )}  
                  {
                  showhide==='28' && (
                  <div className="col-md-10 form-group">
                   <h6> <label htmlFor="email">If the answer for the above question is other, specify.</label></h6>
                  <input type="text" placeholder="specify.."  autoComplete="off" name="specify" className='form-control justify-center rounded-lg w-50 text-3x1'
                    onChange={(e) => setTTInformation(e.target.value)} />
                    </div>
                  )}   
                </th>
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Is there any elderly/bed ridden/comorbid family member?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='Co-Morbidity' value='Yes' required onClick={ ()=>setevisit(true)} onChange={(e) => setCoMorbidFM(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='Co-Morbidity' value='No' required onClick={ ()=>setevisit(false)} onChange={(e) => setCoMorbidFM(e.target.value)} /></th>
                 </h6>
                </div>
                { visite &&
                        <div className="col-md-10 form-group">
                        <h6><label htmlFor="email">If yes, number</label>
                      <input type="number" placeholder=" Co-Morbidity ..." autoComplete="off" name=" Co-Morbidity " className='form-control rounded-2 w-75'
                        onChange={(e) => setTsetCoMorbidFM(e.target.value)} /></h6>
                        </div>}
    
              </th> 
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Are there any family members with similar complaints?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='Co-Morbidity' value='Yes' required onClick={ ()=>setevisit(true)} onChange={(e) => setSimilarC(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='Co-Morbidity' value='No' required onClick={ ()=>setevisit(false)} onChange={(e) => setSimilarC(e.target.value)} /></th>
                 </h6>
                </div>
                { visibles &&
                          <div  className='form-check-inline'>
                          <h6><label htmlFor="email">If yes did he/she visit health facility for treatment?</label><br></br>
                         <th><h6> Yes</h6> <input type="radio" name='Co-Morbidity' value='Yes' required onClick={ ()=>setevisit(true)} onChange={(e) => setTreatmentF(e.target.value)} /></th>
                         <th><h6>No</h6><input type="radio" name='Co-Morbidity' value='No' required onClick={ ()=>setevisit(false)} onChange={(e) => setTreatmentF(e.target.value)} /></th>
                         </h6>
                        </div>
                        }
              </th> 
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Is there a latrine in the premise (residency area/Compound) of the patient?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='information' value='Yes'onClick={ ()=>setVisible(true)} onChange={(e) => setLatrine(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='information' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setLatrine(e.target.value)} /></th>
                 </h6>
                </div>
                {
                  visitez && (
                    <div className='mb-2'>
                    <h6><label htmlFor="email">If yes, what type of latrine the patient and his/her family members are using?</label>
                      <select type="text" className='form-control rounded-3 w-50' onChange={(e)=>(handleshowhide(e),setTLatrine(e.target.value))}  >
                        <option value="Traditional pit latrine (unimproved)">Traditional pit latrine (unimproved)</option>
                        <option value="Traditional pit latrine /improved/">Traditional pit latrine /improved/</option>
                        <option value="Traditional pit latrine /improved and ventilated/">Traditional pit latrine /improved and ventilated/</option>
                        <option value="Latrine with Flush (aqua privy)">Latrine with Flush (aqua privy)</option>
                        
                      </select></h6>
                    </div>
                  )}  
                  
                </th>
                <th>
                <div className='mb-2'>
                    <h6><label htmlFor="email">Latrine utilization status</label>
                      <select type="text" className='form-control rounded-3 w-50' onChange={(e)=>(handleshowhide(e),setLatrineU(e.target.value))}  >
                        <option value="Shared within compound">Shared within compound</option>
                        <option value="Private">Private</option>
                        <option value="Communal">Communal</option>
                        <option value="No latrine around">No latrine around</option>
                        
                      </select></h6>
                    </div>
                </th>
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Is there a leakage from the latrines to the immediate environment?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='information' value='Yes'onClick={ ()=>setVisible(true)} onChange={(e) => setLenvironment(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='information' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setLenvironment(e.target.value)} /></th>
                 </h6>
                </div>
                </th>
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Is there open defecation practice in the surrounding or neighborhood? (Please observe the immediate environment)</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='information' value='Yes'onClick={ ()=>setVisible(true)} onChange={(e) => setOdefecation(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='information' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setOdefecation(e.target.value)} /></th>
                 </h6>
                </div>
                </th>
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Is there proper waste disposal and collection site in the vicinity?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='information' value='Yes'onClick={ ()=>setVisible(true)} onChange={(e) => setWasteDisposal(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='information' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setWasteDisposal(e.target.value)} /></th>
                 </h6>
                </div>
                </th>
                </tr>
              <tr className='border border-secondary'>
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Are there flies in the residential environment? Observe</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='information' value='Yes'onClick={ ()=>setVisible(true)} onChange={(e) => setFlies(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='information' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setFlies(e.target.value)} /></th>
                 </h6>
                </div>
                </th>
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">During your observation, is the environment clean/hygienic?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='information' value='Yes'onClick={ ()=>setVisible(true)} onChange={(e) => setHygienic(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='information' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setHygienic(e.target.value)} /></th>
                 </h6>
                </div>
                </th>
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">How is hand washing practices of the patient and his family at critical times (Before/after eating, after toilets, after caring for children, before/after food preparation etc )</label><br></br>
                 <th><h6>Yes, always</h6> <input type="radio" name='information' value='Yes, always'onClick={ ()=>setVisible(true)} onChange={(e) => setHandWashing(e.target.value)} /></th>
                 <th><h6>Yes, sometimes</h6><input type="radio" name='information' value='Yes, sometimes'onClick={ ()=>setVisible(false)} onChange={(e) => setHandWashing(e.target.value)} /></th>
                 <th><h6>No</h6><input type="radio" name='information' value='No'onClick={ ()=>setVisible(false)} onChange={(e) => setHandWashing(e.target.value)} /></th>
                 </h6>
                </div>
                </th>
                <th>
                <h6><label htmlFor="email">Any other additional observations to be documented</label>
                <textarea
                id="message"
               value={messages}
               required
                onChange={(e) => setObservations(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="observations.."
              ></textarea></h6>
                
                </th>
                <th>
                <h6><label htmlFor="email">Any team recommendations and interventions requested by team</label>
                <textarea
                id="message"
               value={messages}
               required
                onChange={(e) => setRecommendations(e.target.value)}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="recommendations.."
              ></textarea></h6>
                <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">Any team recommendations and interventions requested by team</label>
                  <input type="text" placeholder=" Region.." autoComplete="off"  name="Facility Name" className='form-control rounded-0 w-50'
                    onChange={(e) => setRecommendations(e.target.value)} /></h6>
                    </div>
                </th>
              </tr>
              <button className='btn btn-info border w-15 bgcoll rounded-3 text-white ' ><h5>Submit</h5></button>
          <button className='btn btn-info border w-15 bgcoll rounded-3 text-white'><h5>Cancel</h5></button>
                    </span>
                </div>
            </div>
    </div>
  )
}

export default CholeraMiniPoup