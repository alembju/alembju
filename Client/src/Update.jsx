import React from 'react'
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

function Update() {
      const[HFName,setHFName] = useState()
          const {id} = useParams()
      const[Value,SetValue] = useState({
                    id:id,
                    HFName:"",
                })

                const Navigate = useNavigate()

      useEffect(()=> {
         axios.get("http://localhost:3000/HFUpdate/"+id)
                .then(res =>{
                    SetValue({... Value,HFName : res.data.HFName})
                })

           .catch(err =>console.log(err))
    }, [])

    const handleSubmite = (e) =>{
        e.preventDefault();
        alert("Uploaded Successfully!!!");
        axios.put("http://localhost:3000/HFUpdate/"+id, Value) 
        .then(res =>{
            console.log(res);
            Navigate('/FacilityInfo')
        })
        .catch(err =>console.log(err))
    }

  return (
    <div className='d-flex w-100 vh-75 justify-content-center alighn-items-center p-5'>
        <div className='w-50 border bg-secondary text-white p-5'>
        <form onSubmit={handleSubmite}>
        <div className='mb-2'>
             <h6><label htmlFor="email">Health Facility Name</label>
            <input type="text" placeholder="Facility Name" autoComplete="on" name="Facility" value={Value.HFName} className='form-control justify-center rounded-lg w-50 text-3x1'
            onChange={(e) => SetValue({... Value,HFName : e.target.value})} /></h6>
        </div>
        <button className='btn btn-info '>Update</button>
        </form>
        </div>
    </div>
  )
}

export default Update