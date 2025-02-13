import React from 'react'
import './CholeraCasepopup.css'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRef } from "react";

function CholeraCasepopup(props) {
    const [showhide, setShowhide]=useState('');
    const [visible, setVisible]=useState(false);
  const [visibles, setVisibles]=useState(false);
  const [visite, setvisite]=useState(false);
  const [visitez, setvisitez]=useState(false);
  return (
    <div>
        <div className='bgCC'>
                <div className='popupCC'>
                    <span className='close' onClick={()=>props.close(false)}>x</span>
                    <span className='title'>Exposure/risk factor related information<br></br>
                    <tr>
                    <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Did the patient drink holy water during last five days before onset of the illness?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='holy water' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setHolywater(e.target.value)} /></th>
                 <th><h6>NO</h6><input type="radio" name='holy water' value='NO'onClick={ ()=>setvisitez(true)} onChange={(e) => setHolywater(e.target.value)} /></th>
                 </h6>
                </div>
            
                    {
                  visitez && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If the response for the above question is yes, mention specific location of the holy water?</label>
                  <input type="text" placeholder=" specific location " autoComplete="off"  name=" specific location " className='form-control rounded-0 w-50'
                    onChange={(e) => setTHolywater(e.target.value)} /></h6>
                    </div>
                  )}   
              </th> 
                  
              
                  <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">What types of containers used to store water for Food preparation?</label>
                  <select type="text" className='form-control rounded-2 w-75' onChange={(e)=>(handleshowhide(e), setFContainers(e.target.value))}>
                    <option value="Bucket">Bucket</option>
                    <option value="Pot">Pot</option>
                    <option value="Jerricans">Jerricans</option>
                    <option value="Barrel">Barrel</option>
                    <option value="Packed bottle">Packed bottle</option>
                    
                    <option value="12">Other</option>
                  </select></h6>
                </div>
                {
                  showhide==='12' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If container for food preparation water is other, specify.</label>
                  <input type="text" placeholder="setContainers" autoComplete="off" name="setContainers" className='form-control rounded-2 w-75'
                    onChange={(e) => setTFContainers(e.target.value)} /></h6>
                    </div>
                  )} 
                </th>
                  </tr>
              <tr className='border border-secondary'>
                  <th>
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">List all types of foods consumed during the last Five days before onset of illness</label>
                  <input type="text" placeholder="last Five days.." autoComplete="off" name="last Five days" className='form-control rounded-2 w-75'
                    onChange={(e) => setLastFiveDaysF(e.target.value)} /></h6>
                    </div>
                  </th>
                  <th>
                  <div className='mb-2'>
                <h6><label htmlFor="email">Cooking status of the food consumed during the last five days before onset of the illness?</label>
                  <select type="text" className='form-control rounded-2 w-75' onChange={(e)=>(handleshowhide(e), setCooking(e.target.value))}>
                    <option value="Pipe Water">Well Cooked</option>
                    <option value="River Water">Semi cooked</option>
                    <option value="Bottled Water">Not Cooked</option>
                  </select></h6>
                </div>
                  </th>
                  <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Did the patient consume leftover food during the last five days before onset of the illness?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='holy water' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setLeftoverFood(e.target.value)} /></th>
                 <th><h6>NO</h6><input type="radio" name='holy water' value='NO'onClick={ ()=>setvisitez(true)} onChange={(e) => setLeftoverFood(e.target.value)} /></th>
                 </h6>
                </div>
            
                    {
                  visitez && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If yes, specify the source & location of leftover food consumed (at home, Restaurant, elsewhere....)</label>
                  <input type="text" placeholder=" specific location " autoComplete="off"  name=" specific location " className='form-control rounded-0 w-50'
                    onChange={(e) => setTLeftoverFood(e.target.value)} /></h6>
                    </div>
                  )}   
              </th> 
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Was the patient consumed any food other than at home during the last five days before the onset of illness?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='holy water' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setOThome(e.target.value)} /></th>
                 <th><h6>NO</h6><input type="radio" name='holy water' value='NO'onClick={ ()=>setvisitez(true)} onChange={(e) => setOThome(e.target.value)} /></th>
                 </h6>
                </div>
            
                    {
                  visitez && (
                    <div className='mb-2'>
                    <h6><label htmlFor="email">If yes for the above question, where was it consumed from?</label>
                      <select type="text" className='form-control rounded-2 w-75' onChange={(e)=>(handleshowhide(e), setTOThome(e.target.value))}>
                        <option value="Street-vendor">Street-vendor</option>
                        <option value="Restaurant">Restaurant</option>
                        <option value="Social gathering">Social gathering</option>
                        <option value="24">Other</option>
                      </select></h6>
                    </div>
                  )} 
                  {
                  showhide==='12' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If yes, specify the actual location of food source you have consumed from out side</label>
                  <input type="text" placeholder="location" autoComplete="off" name="location" className='form-control rounded-2 w-75'
                    onChange={(e) => setActualLocation(e.target.value)} /></h6>
                    </div>
                  )}   
              </th> 
              </tr>
              <tr className='border border-secondary'>
              <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Did the patient consume raw food during the last five days before the onset of the illness?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='raw food' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setRawFood(e.target.value)} /></th>
                 <th><h6>NO</h6><input type="radio" name='raw food' value='NO'onClick={ ()=>setvisitez(true)} onChange={(e) => setRawFood(e.target.value)} /></th>
                 </h6>
                </div>
                    {
                  visitez && (
                    <div  className='form-check-inline'>
                  <h6><label htmlFor="email">If yes, was the food sufficiently washed?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='raw food' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setTRawFood(e.target.value)} /></th>
                 <th><h6>NO</h6><input type="radio" name='raw food' value='NO'onClick={ ()=>setvisitez(true)} onChange={(e) => setTRawFood(e.target.value)} /></th>
                 </h6>
                </div>)}
                {visitez && (
                            <div className='mb-2'>
                            <h6><label htmlFor="email">If yes to the above question, what was the source of water for washing?</label>
                              <select type="text" className='form-control rounded-2 w-75' onChange={(e)=>(handleshowhide(e), setTRawFoodwater(e.target.value))}>
                                <option value="Tap/Treated water">Tap/Treated water</option>
                                <option value="Bottled water">Bottled water</option>
                                <option value="River/Spring/Well water"> River/Spring/Well water</option>
                                <option value="12">Other</option>
                              </select></h6>
                            </div>
                          )}
                          {
                  showhide==='12' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If other, specify source of water used to wash raw food?</label>
                  <input type="text" placeholder="source of water" autoComplete="off" name="source of water" className='form-control rounded-2 w-75'
                    onChange={(e) => setTTRawFoodwater(e.target.value)} /></h6>
                    </div>
                  )} 
                     </th> 
                     <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Was the water consumed from outside(other than home) during the last five days before onset of the illness?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='raw food' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setWaterConsumed (e.target.value)} /></th>
                 <th><h6>NO</h6><input type="radio" name='raw food' value='NO'onClick={ ()=>setvisitez(true)} onChange={(e) => setWaterConsumed(e.target.value)} /></th>
                 </h6>
                </div>
                    {
                  visitez && (
                    <div className='mb-2'>
                <h6><label htmlFor="email">If yes, What is the source of water you consumed?</label>
                  <select type="text" className='form-control rounded-2 w-75' onChange={(e)=>(handleshowhide(e), setTWaterConsumed(e.target.value))}>
                    <option value="Restaurant(Bottled)">Restaurant(Bottled)</option>
                    <option value="Restaurant(unbottled)">Restaurant(unbottled)</option>
                    <option value="Bottled water from Shop">Bottled water from Shop</option>
                    <option value="Unprotected source such as (River, Spring or well)">Unprotected source such as (River, Spring or well)</option>
                    <option value="12">Other</option>
                  </select></h6>
                </div>)}
                {
                  showhide==='12' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If Yes, specify the actual location where you have consumed water outside.</label>
                  <input type="text" placeholder="source of water" autoComplete="off" name="source of water" className='form-control rounded-2 w-75'
                    onChange={(e) => setTTWaterConsumed(e.target.value)} /></h6>
                    </div>
                  )} 
                </th> 
                <th>
                <div  className='form-check-inline'>
                  <h6><label htmlFor="email">Do you treat (boil, add water guard, etc.) water before use?</label><br></br>
                 <th><h6> Yes</h6> <input type="radio" name='water' value='Yes'onClick={ ()=>setvisiting(true)} onChange={(e) => setWaterTreat (e.target.value)} /></th>
                 <th><h6>NO</h6><input type="radio" name='water' value='NO'onClick={ ()=>setvisitez(true)} onChange={(e) => setWaterTreat(e.target.value)} /></th>
                 </h6>
                </div>
                </th>
                <th>
                <div className='mb-2'>
                <h6><label htmlFor="email">What types of containers used to store drinking water?</label>
                  <select type="text" className='form-control rounded-2 w-75' onChange={(e)=>(handleshowhide(e), setDContainers(e.target.value))}>
                    <option value="Bucket">Bucket</option>
                    <option value="Pot">Pot</option>
                    <option value="Jerricans">Jerricans</option>
                    <option value="Barrel">Barrel</option>
                    <option value="Packed bottle">Packed bottle</option>
                    
                    <option value="12">Other</option>
                  </select></h6>
                </div>
                {
                  showhide==='12' && (
                  <div className="col-md-10 form-group">
                    <h6><label htmlFor="email">If the container for drinking water is other, specify it</label>
                  <input type="text" placeholder="setContainers" autoComplete="off" name="setContainers" className='form-control rounded-2 w-75'
                    onChange={(e) => setTDContainers(e.target.value)} /></h6>
                    </div>
                  )} 
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

export default CholeraCasepopup